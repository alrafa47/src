<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config['backup_basepath'] 			= dirname(dirname(dirname(BASEPATH))) . '/backup';
$config['backup_metapath'] 			= $config['backup_basepath'] . '/metadata.json';
$config['backup_temppath'] 			= $config['backup_basepath'] . '/temp';
$config['backup_outputpath'] 		= $config['backup_basepath'] . '/archive';
$config['backup_apppath'] 			= dirname(dirname(BASEPATH));

//restore
$config['restore_basepath'] 		= dirname(dirname(dirname(BASEPATH))) . '/restore';
$config['restore_metapath'] 		= $config['restore_basepath'] . '/metadata.json';
$config['restore_temppath'] 		= $config['restore_basepath'] . '/temp';
$config['restore_outputpath'] 		= $config['restore_basepath'] . '/archive';
$config['restore_apppath'] 			= dirname(dirname(BASEPATH));