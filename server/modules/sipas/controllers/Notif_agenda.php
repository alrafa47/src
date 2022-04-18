<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notif_agenda extends Base_Controller {

	function __construct(){
		parent::__construct();

		$this->m_account = $this->model('sipas/account', true);

		$this->m_surat_masuk_blmarah_view 				= $this->model('sipas/surat_masuk_blm_arah_view',				true);
		$this->m_notif_agenda_masuk_blmdistribusi_view 	= $this->model('sipas/notif_agenda_masuk_blmdistribusi_view',	true);
		$this->m_notif_agenda_masuk_aktif7_view 		= $this->model('sipas/notif_agenda_masuk_aktif7_view',			true);
		$this->m_notif_agenda_masuk_aktif3_view 		= $this->model('sipas/notif_agenda_masuk_aktif3_view',			true);
		$this->m_notif_agenda_masuk_aktif1_view 		= $this->model('sipas/notif_agenda_masuk_aktif1_view',			true);
		$this->m_notif_agenda_masuk_reqberkas_view 		= $this->model('sipas/notif_agenda_masuk_request_berkas_view',	true);

		$this->m_notif_agenda_keluar_blmkirim_view 		= $this->model('sipas/notif_agenda_keluar_blmkirim_view',		true);
		$this->m_notif_agenda_keluar_blmnomor_view 		= $this->model('sipas/notif_agenda_keluar_blmnomor_view',		true);
		$this->m_notif_agenda_keluar_reqberkas_view		= $this->model('sipas/notif_agenda_keluar_request_berkas_view',	true);

		$this->m_notif_agenda_imasuk_pending_view 		= $this->model('sipas/notif_agenda_imasuk_pending_view',		true);
		$this->m_notif_agenda_imasuk_aktif7_view 		= $this->model('sipas/notif_agenda_imasuk_aktif7_view',			true);
		$this->m_notif_agenda_imasuk_aktif3_view 		= $this->model('sipas/notif_agenda_imasuk_aktif3_view',			true);
		$this->m_notif_agenda_imasuk_aktif1_view 		= $this->model('sipas/notif_agenda_imasuk_aktif1_view',			true);
		$this->m_notif_agenda_imasuk_reqberkas_view 	= $this->model('sipas/notif_agenda_imasuk_request_berkas_view',	true);

		$this->m_notif_agenda_ikeluar_tolak_view 		= $this->model('sipas/notif_agenda_ikeluar_tolak_view',		true);

		$this->m_notif_agenda_ikeluar_blmnomor_view 	= $this->model('sipas/notif_agenda_ikeluar_blmnomor_view',		true);
	}

	function index(){
		$this->response('OK');
	}

	function eksternal($section = null){
		$account = $this->m_account->get_profile();

		$limit 	= varGet('limit');
        $start 	= varGet('start',0);
        $sorter = json_decode(varGet('sort', '[]'));
        $filter = json_decode(varGet('filter', '[]'));
        $scope 	= varGet('scope');

		$staf_unit 		= $account['staf_unit'];
		$staf_jabatan 	= $account['staf_jabatan'];
		
		switch ($section) {
			case 'masuk_blmarah':
				$model = $this->m_surat_masuk_blmarah_view;
				break;
			case 'masuk_blmdistribusi':
				$model = $this->m_notif_agenda_masuk_blmdistribusi_view;
				break;
			case 'masuk_reqberkas':
				$model = $this->m_notif_agenda_masuk_reqberkas_view;
				break;
			case 'masuk_aktif7':
				$model = $this->m_notif_agenda_masuk_aktif7_view;
				break;
			case 'masuk_aktif3':
				$model = $this->m_notif_agenda_masuk_aktif3_view;
				break;
			case 'masuk_aktif1':
				$model = $this->m_notif_agenda_masuk_aktif1_view;
				break;
			case 'keluar_blmkirim':
				$model = $this->m_notif_agenda_keluar_blmkirim_view;
				break;
			case 'keluar_blmnomor':
				$model = $this->m_notif_agenda_keluar_blmnomor_view;
				break;
			case 'keluar_reqberkas':
				$model = $this->m_notif_agenda_keluar_reqberkas_view;
				break;
		}

		if ($section != 'masuk_blmarah'){
			if(!$scope){
                $scope = $account['staf_unit'];
            }

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {
                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }
                $filter = array_merge($costumFilter, $nonCustomFilter);
            }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scope
            ));
		}

		$records = $model->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filter'    => json_encode($filter),
            'sorter'    => $sorter,
        ));

		$this->response($records);
	}

	function internal($section = null){
		$account = $this->m_account->get_profile();

		$limit 	= varGet('limit');
        $start 	= varGet('start',0);
        $sorter = json_decode(varGet('sort', '[]'));
        $filter = json_decode(varGet('filter', '[]'));
        $scope 	= varGet('scope');

		$staf_unit 		= $account['staf_unit'];
		$staf_jabatan 	= $account['staf_jabatan'];

		switch ($section) {
			case 'masuk_baru':
				$model = $this->m_notif_agenda_imasuk_pending_view;
				break;
			case 'masuk_reqberkas':
				$model = $this->m_notif_agenda_imasuk_reqberkas_view;
				break;
			case 'masuk_aktif7':
				$model = $this->m_notif_agenda_imasuk_aktif7_view;
				break;
			case 'masuk_aktif3':
				$model = $this->m_notif_agenda_imasuk_aktif3_view;
				break;
			case 'masuk_aktif1':
				$model = $this->m_notif_agenda_imasuk_aktif1_view;
				break;
			case 'keluar_tolak':
				$model = $this->m_notif_agenda_ikeluar_tolak_view;
				break;
			case 'keluar_blmnomor':
				$model = $this->m_notif_agenda_ikeluar_blmnomor_view;
				break;
		}

		if(!$scope){
            $scope = $account['staf_unit'];
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {
                if($val->field == 'surat_perihal'){
                    $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }
            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        array_unshift($filter, (object)array(
            'type'  => 'exact',
            'field' => 'surat_unit',
            'value' => $scope
        ));

		$records = $model->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filter'    => json_encode($filter),
            'sorter'    => $sorter,
        ));
        
		$this->response($records);
	}

}