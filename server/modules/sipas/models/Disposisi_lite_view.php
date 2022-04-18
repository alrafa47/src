<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

$CI = get_instance();
$CI->model('sipas/disposisi', true);

class Sipas_model_Disposisi_lite_view extends Sipas_model_Disposisi {

	function __construct() {
		parent::__construct();
		$this->set_table_name('v_disposisi_lite');
		$this->set_primary('disposisi_id');
	}
}