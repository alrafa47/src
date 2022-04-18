<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Klise_view extends Sipas_model_Klise {
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_klise');
        $this->set_fields(array(
            array('name'=>'klise_id'),
            array('name'=>'klise_nama'),
            array('name'=>'klise_kelompok'),
            array(
                'name'=>'klise_isi',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }
            ),
            array('name'=>'klise_ispetikan'),
            array('name'=>'klise_isaktif'),
            array('name'=>'klise_properti'),

        ));
    }
}