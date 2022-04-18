<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Disposisi_referensi extends Base_Controller {

	public function __construct(){
        parent::__construct();
        $this->m_surat_staf_view = $this->model('sipas/disposisi_masuk_netral_view',    true);
        $this->m_referensi          = $this->model('sipas/disposisi_referensi',     true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->model('sipas/disposisi_referensi', true);
        // $id = varReq('id');
        $child = varReq('child');
        $parent = varReq('parent');
        $surat = varReq('surat');
        $start = varGet('start');
        $filter = varGet('filter');
        $sorter = varGet('sort');

        $records = $model->referensi($child, $parent, $surat);

        $this->response($records);
    }
}