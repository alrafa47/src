<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf_tim', true);

class Sipas_model_Staf_tim_view extends Sipas_model_Staf_tim
{

    public function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_staf_tim');
        $this->set_fields(array(
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
                'display' => 'Unit',
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
                'name' => 'staf_tim_jumlah',
                'display' => 'Jumlah',
            )
        ));
    }
}
