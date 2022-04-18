<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Systembackup extends Base_Model
{
	const PROCESS_INITIATE = 0;
	const PROCESS_EXECUTE = 1;
	const PROCESS_DONE = 2;
	const PROCESS_FAIL = 4;

	const TASK_EXECUTEABLE = true;

	protected $meta = null;

	protected $metaDefault = array(
		'id'=>null,
		'date'=>null,
		'current'=>null,
		'status'=>0, //0-notyet, 1-executing, 2-done, 3-[not implement by far], 4-fail,
		'tasks'=>array( 
			// name: backupitem name, 
			// exec: will be executed or not, 
			// status: 0-notyet, 1-executing, 2-done, 3-[not implement by far], 4-fail
			// pid: current progress pid
			'app'=>array(
				'title'=>'Backup application and asset',
				'name'=>'app',
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'database'=>array(
				'title'=>'Backup database',
				'name'=>'database',
				'exec'=>true,'status'=>0,'pid'=>null
			),
			// 'asset'=>array(
			// 	'name'=>'asset',
			// 	'exec'=>true,'status'=>0,'pid'=>null
			// ),
			'archive'=>array(
				'title'=>'Pack all backup',
				'name'=>'archive',
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'completion'=>array(
				'title'=>'Cleaning',
				'name'=>'completion',
				'exec'=>true,'status'=>0,'pid'=>null
			),
			'clean'=>array(
				'title'=>'Finishing backup',
				'name'=>'clean',
				'exec'=>true,'status'=>0,'pid'=>null
			)
		),
		'lastSeen'=>null
	);

	function getBasePath()
	{
		return Config()->item('backup_basepath');
	}
	// 
	// ALL BACKUP
	// 
	function getList()
	{
		$basepath = Config()->item('backup_basepath');
		$temp = basename(Config()->item('backup_temppath'));

		$list = array_values(array_diff(
			scandir($basepath), 
			array('.','..',$temp, '.htaccess') // remove these from list of backup
		));

		return $list;
	}

	function getListProcess()
	{
		$temp = Config()->item('backup_temppath');

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

	function init($backupId = null, $exclusive = true) // $exclusive meant will be created if not found
	{
		$this->loadMeta($backupId, $exclusive);

		return $this;
	}

	function loadMeta($backupId = null, $exclusive = false)
	{
		if($this->initMeta($backupId, $exclusive))
		{
			$metapath = Config()->item('backup_temppath') . "/{$backupId}/metadata.json";

			$metaContent = trim(file_get_contents($metapath));

			$this->meta = json_decode($metaContent);
			$this->meta->lastSeen = date('Y-m-d H:i:s');

			$this->updateTask($this->meta->current);
		}
	
		return $this;
	}

	function initMeta($backupId = null, $exclusive = false) // $exclusive meant will be created if not found
	{
		$metapath = Config()->item('backup_temppath') . "/{$backupId}/metadata.json";

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
				$defaultMetaContent['id'] = $backupId;
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
		return Config()->item('backup_temppath') . "/{$backupId}";
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
			case "app":
				$this->startBackupApp();
				break;
			
			case "database":
				$this->startBackupDatabase();
				break;
			
			case "archive":
				$this->startArchive();
				break;

			case "completion":
				$this->startCompletion();
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
	function startBackupApp()
	{
		$task = $this->meta->tasks->app;

		// backup logic
		$sourcepath = Config()->item('backup_apppath');
		$outputdir = $this->getOutputPath();
		$outputpath = $this->getOutputPath() . "/app.tar.gz";
		$command = "tar -zcvf {$outputpath} -C {$sourcepath} . ";
		// $outputpath = $this->getOutputPath() . "/app";
		// $command = "cp {$sourcepath} {$outputpath}";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	// database task
	function startBackupDatabase()
	{
		$task = $this->meta->tasks->database;

		// backup logic
		$outputpath = $this->getOutputPath() . "/database.sql";
		$db = App()->db;

		$command = "mysqldump -u{$db->username} -p{$db->password} -h{$db->hostname} {$db->database}";
		$taskId = run($command, $outputpath);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;

		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	// archive task
	function startArchive()
	{
		$task = $this->meta->tasks->archive;
		$backupId = $this->meta->id;

		// backup logic
		$sourcepath = implode(' ', array(
			$this->getOutputPath() . "/metadata.json",
			$this->getOutputPath() . "/app.tar.gz",
			$this->getOutputPath() . "/database.sql"
		));
		// var_dump($this->getOutputPath());
		$outputpath = $this->getOutputPath() . "/archive.tar.gz";

		$command = "tar -zcvf {$outputpath} {$sourcepath}";
		// $command = "ls";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startCompletion()
	{
		$task = $this->meta->tasks->completion;
		$backupId = $this->meta->id;
		$backupDate = $this->meta->date;

		// backup logic
		$sourcepath = $this->getOutputPath() . "/archive.tar.gz";
		$outputpath = Config()->item('backup_basepath') . "/backup_{$backupDate}_{$backupId}.tar.gz";

		$command = "mv {$sourcepath} {$outputpath}";
		// $command = "ls";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}

	function startClean()
	{
		$task = $this->meta->tasks->clean;
		$backupId = $this->meta->id;

		// backup logic
		$sourcepath = $this->getOutputPath();

		$fileApp = $sourcepath."/app.tar.gz";
		$fileDb = $sourcepath."/database.sql";
		// $fileArchive = $sourcepath."/archive.tar.gz";
		
		// $file_to_search = "archive.tar.gz";
		// $search = $this->cari_file('.',$file_to_search);
		$command = "rm -R {$fileApp} {$fileDb}";
		// var_dump($search);
		// $command = "ls";
		$taskId = run($command);
		// end backup logic

		$task->status = 1;
		$task->pid = $taskId;
		$this->meta->current = $task->name;

		$this->saveMeta();

		return $this;
	}
}