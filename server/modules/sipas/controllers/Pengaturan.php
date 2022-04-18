<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Pengaturan extends Base_Controller {

	function __construct() {
		parent::__construct();
		$this->load->model(array(
			'sipas/pengaturan',
		));
		$this->m_pengaturan = $this->model('sipas/pengaturan', true);
		$islogin = $this->session->userdata('userid');
	}

	function index() {
		$this->get_setting();
	}

	function get_setting() {
		$model = $this->m_pengaturan;
		$response = $model->getSettings();
		$this->response($response);
	}

	function set_setting() {
		$model = $this->m_pengaturan;
		$response = $model->setSettings(json_decode(varPost('setting')));
		$this->response($response);
	}

	function get_image($section = null) {
		$model = $this->m_pengaturan;
		$content = $model->getImage($section);

		ob_clean();
		$this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
		$this->output->set_header("Cache-Control: post-check=0, pre-check=0");
		$this->output->set_header("Pragma: no-cache");
		$this->output->set_content_type('jpeg');
		$this->output->set_output($content);
	}

	function set_image($section = null) {
		$model = $this->m_pengaturan;
		$response = $model->setImage($section);
		$this->response($response);

	}
	// start custom
	function get_surat_penomoran_legenda(){
		$model = $this->m_pengaturan;
		$data = array('metaData'=>array('root'=>'data'),'total'=>count($model->template_penomoran_legenda), 'data'=>array());
		foreach ($model->template_penomoran_legenda as $key => $value) {
			$group = explode("-", $value);
			$data['data'][] = array('legend_name'=>$value, 'legend_code'=>$key, 'legend_group'=>reset($group));
		}
		
		$this->response($data);
	}

	function getSettingByCode(){
		$model = $this->m_pengaturan;

		$value = varPost('value');
		if(!$value) return false;
		
		$operation = $model->getSettingByCode($value);
		return $operation;
	}

}