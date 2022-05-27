<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk_netral_view', true);

class Sipas_model_Disposisi_masuk_view extends Sipas_model_Disposisi_masuk_netral_view
{

    public $table = 'v_disposisi_masuk';

    function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_disposisi_masuk');
        $this->set_primary('disposisi_masuk_id');
    }
}
