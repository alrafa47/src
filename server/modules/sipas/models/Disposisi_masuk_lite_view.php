<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_masuk_lite_view extends Base_model {
    
    public $table = 'v_disposisi_masuk_netral';

    static $field_isbaca = 'disposisi_masuk_isbaca';
    static $field_isterus = 'disposisi_masuk_isterus';
    static $field_iscabut = 'disposisi_masuk_iscabut';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_masuk_lite');
        $this->set_primary('disposisi_masuk_id');
        $this->set_fields(array(
            array('name' => 'disposisi_masuk_id'),
            array('name' => 'disposisi_masuk_parent_path'),
            array('name' => 'disposisi_id'),
            array('name' => 'disposisi_induk'),
            array('name' => 'disposisi_parent_path'),
        ));
    }

}