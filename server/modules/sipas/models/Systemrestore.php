<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Systemrestore extends Base_Model
{
	const PROCESS_INITIATE = 0;
	const PROCESS_EXECUTE = 1;
	const PROCESS_DONE = 2;
	const PROCESS_FAIL = 4;

	const TASK_EXECUTEABLE = true;

	protected $meta = null;

	protected $metaDefault = array(
		'id'=>null,
		'name_file'=>null,
		'date'=>null,
		'current'=>null,
		'status'=>0, //0-notyet, 1-executing, 2-done, 3-[not implement by far], 4-fail,
		'tasks'=>array( 
			// name: backupitem name, 
			// exec: will be executed or not, 
			// status: 0-notyet, 1-executing, 2-done, 3-[not implement by far], 4-fail
			// pid: current progress pid
			'create'=>array(
				'title'=>'Creating folder',
				'name'=>'create',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'copy'=>array(
				'title'=>'Copying archive backup to restore',
				'name'=>'copy',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'extract'=>array(
				'title'=>'Extract archive',
				'name'=>'extract',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'moveApp'=>array(
				'title'=>'Moving APP from temp to restore folder',
				'name'=>'moveApp',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'moveDatabase'=>array(
				'title'=>'Moving Database from temp to restore folder',
				'name'=>'moveDatabase',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'moveMeta'=>array(
				'title'=>'Moving metadata.json from temp to restore folder',
				'name'=>'moveMeta',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'createApp'=>array(
				'title'=>'Create folder APP in restore',
				'name'=>'createApp',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'extractApp'=>array(
				'title'=>'Extract Application',
				'name'=>'extractApp',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'clean'=>array(
				'title'=>'Finishing backup',
				'name'=>'clean',
				'info'=>null,
				'exec'=>true,'status'=>0,'pid'=>null
			)
		),
		'lastSeen'=>null
	);

	function getBasePath()
	{
		return Config()->item('restore_basepath');
	}
	// 
	// ALL BACKUP
	// 
	function getList()
	{
		$basepath = Config()->item('backup_basepath');
		$temp = basename(Config()->item('restore_temppath'));

		$list = array_values(array_diff(
			scandir($basepath), 
			array('.','..',$temp, '.htaccess') // remove these from list of backup
		));

		return $list;
	}

	function getListProcess()
	{
		$temp = Config()->item('restore_temppath');

		$list = array_values(array_diff(scandir($temp), array('.','..','.htaccess')));

		return $list;
	}

	function downloadFile($fullPath)
	{ 
		// Must be fresh start 
		if( headers_sent() ) 
		die('Headers Sent'); 

		// Required for some browsers 
		if(ini_get('zlib.output_compression')) 
		ini_set('zlib.output_compression', 'Off'); 

		// File Exists? 
		if( file_exists($fullPath) ){ 

		// Parse Info / Get Extension 
		$fsize = filesize($fullPath); 
		$path_parts = pathinfo($fullPath); 
		$ext = strtolower($path_parts["extension"]); 

		// Determine Content Type 
		switch ($ext) { 
		   case "zip": $ctype="application/zip"; break;
		   case "tar": $ctype="application/tar"; break;
		   case "tar.gz": $ctype="application/tar+gzip"; break;
		   default: $ctype="application/force-download"; 
		} 

		header("Pragma: public"); // required 
		header("Expires: 0"); 
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
		header("Cache-Control: private",false); // required for certain browsers 
		header("Content-Type: $ctype"); 
		header("Content-Disposition: attachment; filename=\"".basename($fullPath)."\";" ); 
		header("Content-Transfer-Encoding: binary"); 
		header("Content-Length: ".$fsize); 
		ob_clean(); 
		flush(); 
		readfile( $fullPath ); 

		} else die('File Not Found'); 
	}

	// 
	// CURRENT BACKUP / RECORD
	// 

	function init($backupId = null, $file = null, $exclusive = true) // $exclusive meant will be created if not found
	{
		$this->loadMeta($backupId, $file, $exclusive);

		return $this;
	}

	function loadMeta($restoreId = null, $file = null, $exclusive = false)
	{
		if($this->initMeta($restoreId, $file ,$exclusive))
		{
			$metapath = Config()->item('restore_temppath') . "/{$restoreId}/metadata.json";

			$metaContent = trim(file_get_contents($metapath));

			$this->meta = json_decode($metaContent);
			$this->meta->lastSeen = date('Y-m-d H:i:s');

			$this->updateTask($this->meta->current);
		}
	
		return $this;
	}

	function initMeta($restoreId = null, $file = null, $exclusive = false) // $exclusive meant will be created if not found
	{
		$metapath = Config()->item('restore_temppath') . "/{$restoreId}/metadata.json";

		if($exclusive and !file_exists($metapath))
    	{
    		$dir = dirname($metapath);
    		if(!is_dir($dir))
    		{
    			mkdir($dir, 0777, true);
    		}
    		if(is_dir($dir) && touch($metapath))
    		{
				$defaultMetaContent = $this->metaDefault;
				$defaultMetaContent['id'] = $restoreId;
				$defaultMetaContent['name_file'] = $file;
				$defaultMetaContent['date'] = date('Y-m-d');
				$defaultMetaContent['lastSeen'] = date('Y-m-d H:i:s');

				file_put_contents($metapath, json_encode($defaultMetaContent));
    		}
    	}

		return is_file($metapath);
	}

	function saveMeta()
	{
		if($this->initMeta($this->meta->id))
		{
			$metapath = $this->getOutputPath() . "/metadata.json";
			$metaContent = json_encode($this->meta);

			return file_put_contents($metapath, $metaContent);
		}

		return false;
	}

	function getMeta()
	{
		return $this->meta;
	}

	function getOutputPath()
	{
		if(func_num_args() > 0)
		{
			$backupId = func_get_arg(0);
		}else
		{
			$backupId = $this->meta->id;
		}
		return Config()->item('restore_temppath') . "/{$backupId}";
	}

	// 
	// TASK
	// 

	function getTask($taskName = null)
	{
		if($taskName && property_exists($this->meta->tasks, $taskName))
		{
			return $this->meta->tasks->$taskName;
		}
	}

	function startTask($task = null)
	{
		if(is_object($task))
		{
			$task = $task->name;
		}
		switch($task)
		{
			case "create":
				$this->startCreateFolder();
				break;
			
			case "copy":
				$this->startCopy();
				break;
			
			case "extract":
				$this->startExtract();
				break;

			case "moveApp":
				$this->startMoveApp();
				break;

			case "moveDatabase":
				$this->startMoveDatabase();
				break;

			case "moveMeta":
				$this->startMoveMeta();
				break;

			case "createApp":
				$this->startCreateFolderApp();
				break;

			case "extractApp":
				$this->startextractApp();
				break;

			case "clean":
				$this->startClean();
				break;
		}

		return $this;
	}

	function updateTask($taskName = null)
	{
		$task = $this->getTask($taskName);

		if($task)
		{
			$isRunning = system_is_running($task->pid);
				
			$task->status = $isRunning ? 1 : 2;

			$this->saveMeta();		
		}

		return $this;
	}

	function stopTask($taskName = null)
	{
		$task = $this->getTask($taskName);

		if($task)
		{
			$stoped = posix_kill(intval($task->pid), 15); // 15=SIGTERM

			$task->pid = null;
			$task->status = 2;

			return $stoped;
		}

		return false;
	}

	function startCurrentTask()
	{
		return $this->startTask($this->meta->current);
	}

	function updateCurrentTask()
	{
		return $this->updateTask($this->meta->current);
	}

	function stopCurrentTask()
	{
		return $this->stopTask($this->meta->current);
	}

	function getCurrentTask()
	{
		return $this->getTask($this->meta->current);
	}

	function isRunning()
	{
		$task = $this->getCurrentTask();

		if($task)
		{
			return $isRunning = system_is_running($task->pid);
		}

		return false;
	}

	//////////////////
	// backup tasks //
	//////////////////

	// app task
	function startCreateFolder()
	{
		$task = $this->meta->tasks->create;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		$metapath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}";

		$command = "mkdir {$metapath}";
		$taskId = run($command);

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	// database task
	function startCopy()
	{
		$task = $this->meta->tasks->copy;
		$name_file = $this->meta->name_file;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		// backup logic
		$sourcepath = Config()->item('backup_basepath') . "/{$name_file}";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/{$restoreId}.tar.gz";

		$command = "cp -R {$sourcepath} {$outputpath}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	// archive task
	function startExtract()
	{
		$task = $this->meta->tasks->extract;
		$backupId = $this->meta->id;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		$sourcepath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/{$restoreId}.tar.gz";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}";

		$command = "tar -xzvf {$sourcepath} -C {$outputpath}";
		$taskId = run($command);

		$task->status = 1;
		$task->pid = $taskId;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startMoveApp()
	{
		$task = $this->meta->tasks->moveApp;
		$name_file = $this->meta->name_file;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		// backup logic
		$sourcepathbackup = Config()->item('backup_temppath') . "/{$restoreId}";
		$sourcepath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/{$sourcepathbackup}/app.tar.gz";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}";

		$command = "mv {$sourcepath} {$outputpath}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startMoveDatabase()
	{
		$task = $this->meta->tasks->moveDatabase;
		$name_file = $this->meta->name_file;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		// backup logic
		$sourcepathbackup = Config()->item('backup_temppath') . "/{$restoreId}";
		$sourcepath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/{$sourcepathbackup}/database.sql";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}";

		$command = "mv {$sourcepath} {$outputpath}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startMoveMeta()
	{
		$task = $this->meta->tasks->moveMeta;
		$name_file = $this->meta->name_file;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		// backup logic
		$sourcepathbackup = Config()->item('backup_temppath') . "/{$restoreId}";
		$sourcepath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/{$sourcepathbackup}/metadata.json";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}";

		$command = "mv {$sourcepath} {$outputpath}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startCreateFolderApp()
	{
		$task = $this->meta->tasks->createApp;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		$metapath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/app";

		$command = "mkdir {$metapath}";
		$taskId = run($command);

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startextractApp()
	{
		$task = $this->meta->tasks->extractApp;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		$sourcepath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/app.tar.gz";
		$outputpath = Config()->item('restore_basepath') . "/restore_{$restoreDate}_{$restoreId}/app";

		$command = "tar -xzvf {$sourcepath} -C {$outputpath}";
		$taskId = run($command);

		$task->status = 1;
		$task->pid = $taskId;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startClean()
	{
		$task = $this->meta->tasks->clean;
		$restoreId = $this->meta->id;
		$restoreDate = $this->meta->date;

		// backup logic
		$sourcepath = Config()->item('restore_basepath');

		$folder = $sourcepath."/restore_{$restoreDate}_{$restoreId}/var";
		$fileArchive = $sourcepath."/restore_{$restoreDate}_{$restoreId}/{$restoreId}.tar.gz";
		$fileApp = $sourcepath."/restore_{$restoreDate}_{$restoreId}/app.tar.gz";
		
		$location = $sourcepath."/restore_{$restoreDate}_{$restoreId}";
		$command = "rm -rf {$folder} {$fileArchive} {$fileApp}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;
		$task->info = $location;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}
}