<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_jumlah_penerima_disposisi_sama_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_jumlah_penerima_disposisi_sama');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'surat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'disposisi_masuk_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah_penerima')
        ));
    }
}