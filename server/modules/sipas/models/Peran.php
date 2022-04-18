<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* 
*/
class sipas_model_Peran extends Base_Model
{
    
    function __construct()
    {
        $modelling = array(
            'table' => array(
                'name' => 'peran',
                'primary' => 'peran_id',
                'fields' => array(
                    array(
                        'name' => 'peran_id',
                        'display' => 'Id peran',
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'peran_nama',
                        'display' => 'Nama',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'peran_isaktif',
                        'display' => 'aktif'
                    ),
                    array(
                        'name' => 'peran_ishapus',
                        'display' => 'aktif'
                    ),
                    array(
                        'name' => 'peran_akses',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }
                    ),
                    array(
                        'name' => 'peran_properti',
                        'display' => 'Properti'
                    )
                )
            ),
            'auto_id' => true
        );
        parent::__construct($modelling);
    }
}