<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_user extends Base_Model {

    /*  
    1 Aksi (respon)
    */

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'notif_user',
                'primary'=>'notif_user_id',
                'fields'=> array(
                    array(
                        'name'=>'notif_user_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'notif_user_tipe',
                        'display'=>'Tipe'
                    ),
                    array(
                        'name'=>'notif_user_model',
                        'display'=>'Model'
                    ),
                    array(
                        'name'=>'notif_user_tgl',
                        'display'=>'Tanggal'
                    ),
                    array(
                        'name'=>'notif_user_penerima',
                        'display'=>'Penerima'
                    ),
                    array(
                        'name'=>'notif_user_penerima_profil',
                        'display'=>'Penerima Profil'
                    ),
                    array(
                        'name'=>'notif_user_pengirim',
                        'display'=>'Pengirim'
                    ),
                    array(
                        'name'=>'notif_user_pengirim_profil',
                        'display'=>'Pengirim Profil'
                    ),
                    array(
                        'name'=>'notif_user_referensi',
                        'display'=>'referensi'
                    ),
                    array(
                        'name'=>'notif_user_isnew',
                        'display'=>'Isnew'
                    ),
                    array(
                        'name'=>'notif_user_isbaca',
                        'display'=>'Isbaca'
                    ),
                    array(
                        'name'=>'notif_user_isi',
                        'display'=>'Isi'
                    )

                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function select($config = null, $fn = null)
    {
        $result = call_user_func_array('parent::select', func_get_args());
        $date  = date('d M Y');

        if(is_array($result) and !empty($result['data']))
        {
            foreach ($result['data'] as $key => &$value)
            {
                $value['notif_user_tanggal'] = $value['notif_user_tgl'];
                
                $tgl = new DateTime($value['notif_user_tgl']);
                $tgl_date = $tgl->format('d M Y');


                if($tgl_date == $date){
                    $value['notif_user_tgl'] = $tgl->format('H:i');
                }else{
                    $value['notif_user_tgl'] = $tgl->format('d M Y');
                }

                $value['staf_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['notif_user_pengirim'];
            }
        }
        return $result;
    }
}