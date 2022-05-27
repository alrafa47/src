<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_tim extends Base_model
{
    public function __construct()
    {
        parent::__construct(array(
            'table' => array(
                'name' => 'staf_tim',
                'primary' => 'staf_tim_id',
                'fields' => array(
                    array(
                        'name' => 'staf_tim_id',
                        'display' => 'Id',
                        'update' => false,
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'staf_tim_nama',
                        'display' => 'Nama',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'staf_tim_unit',
                        'display' => 'unit',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'staf_tim_unit_nama',
                        'display' => 'Nama Unit',
                    ),
                    array(
                        'name' => 'staf_tim_unit_parent_path',
                        'display' => 'Parent Path Unit',
                    ),
                    array(
                        'name' => 'staf_tim_properti',
                        'display' => 'Properti',
                    ),
                    array(
                        'name' => 'staf_tim_ishapus',
                        'display' => 'Hapus',
                    )
                ),
                'limit' => null,
            ),
            'auto_id' => true
        ));
    }
}
