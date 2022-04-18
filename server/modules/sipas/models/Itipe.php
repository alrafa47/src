<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Itipe extends Base_model {

    public $tipe_internal = array(
        'tipe_surat_internal' => 'itipe_kode',
        'nama_surat_internal' => 'itipe_nama'
    );
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'itipe',
                'primary'=>'itipe_id',
                'fields'=> array(
                    array(
                        'name'=>'itipe_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'itipe_kode',
                        'display'=>'Kode',
                    ),
                    array(
                        'name'=>'itipe_nama',
                        'display'=>'Nama',
                        'notnull'=>true,
                    ),
                    array(
                        'name'=>'itipe_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'itipe_properti',
                        'display'=>'Properties'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function getCompiledTipe($id = null){
        $CI = get_instance();
        $setting = $CI->model('sipas/pengaturan', true);

        $record = $this->read($id);
        
        $data = $setting->getMarkedData($this->tipe_internal,
            array_merge(
                (array)$record
            )
        );
        return $data;
    }
}