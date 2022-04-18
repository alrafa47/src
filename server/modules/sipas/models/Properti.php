<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Properti extends Base_model {

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'properti',
                'primary'=>'properti_id',
                'fields'=> array(
                    array('name'=>'properti_id',         'display'=>'Id','update'=>false,'unique'=>true,'notnull'=>true),
                    array('name'=>'properti_buat_tgl',   'display'=>'Buat Tanggal'),
                    array('name'=>'properti_buat_staf',  'display'=>'Pembuat'),
                    array('name'=>'properti_buat_data',  'display'=>'Data Buat',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }),
                    array('name'=>'properti_ubah_tgl',   'display'=>'Ubah Tanggal'),
                    array('name'=>'properti_ubah_staf',  'display'=>'Pengubah'),
                    array('name'=>'properti_isubah',     'display'=>'IS UBAH'),
                    array('name'=>'properti_ubah_data',  'display'=>'Data Ubah',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }),
                    array('name'=>'properti_hapus_tgl',  'display'=>'Hapus Tanggal'),
                    array('name'=>'properti_hapus_staf', 'display'=>'Penghapus'),
                    array('name'=>'properti_ishapus',    'display'=>'IS HAPUS'),
                    array('name'=>'properti_hapus_data', 'display'=>'Data Hapus',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }),
                    array('name'=>'properti_pulih_tgl',  'display'=>'Pemulihan Tgl'),
                    array('name'=>'properti_pulih_staf', 'display'=>'Pemulih'),
                    array('name'=>'properti_pulih_data', 'display'=>'Data Pemulih',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }),
                    array('name'=>'properti_data',       'display'=>'Data'),
                    array('name'=>'properti_slug',       'display'=>'Alias'),
                    array('name'=>'properti_entitas',    'display'=>'Entitas'),
                    array('name'=>'properti_entitas_id', 'display'=>'Id Entitas'),
                    array('name'=>'properti_iseksekusi', 'display'=>'is eksekusi')
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }

    function created($peg = null, $data = array(), $entitas = null, $entitas_id = null, $slug = null){
        $CI = get_instance();
        $m_staf = $CI->model('sipas/staf');

        $model = $this;
        $now = date('Y-m-d H:i:s');

        $new_data = array(
            'at'        => $now,
            'by'        => $peg,
            'data'      => $data
        );

        /*default process*/
        $data['properti_buat_data'] = json_encode($new_data);
        $data['properti_buat_tgl'] = $now;
        $data['properti_buat_staf'] = $peg;
        $data['properti_entitas'] = $entitas;
        $data['properti_entitas_id'] = $entitas_id;
        $data['properti_slug'] = $slug;

        $op = $model->insert($data);
        return $op['data'];
    }

    function updated($id = null, $peg = null, $data = array(), $slug = null){
        if(empty($id)) return;
        $CI = get_instance();
        $m_staf = $CI->model('sipas/staf');

        $model = $this;
        $now = date('Y-m-d H:i:s');

        $property = $model->read($id);        
        $ubah_data = json_decode($property['properti_ubah_data']);

        if(empty($ubah_data))
        {
            $ubah_data = array();
        }
        else if(is_object($ubah_data))
        {
            $ubah_data = (array) $ubah_data;
        }

        $new_data = array(
            'at' => $now,
            'by' => $peg,
            'data' => $data
        );
        $ubah_data[] = $new_data;
        $ubah_data = json_encode($ubah_data);
        
        /*default process*/
        $data['properti_ubah_tgl'] = date('Y-m-d H:i:s');
        $data['properti_ubah_staf'] = $peg;
        $data['properti_isubah'] = 1;
        $data['properti_slug'] = $slug;
        $data['properti_ubah_data'] = $ubah_data;

        $op = $model->update($id, $data);
        return $op['data'];
    }

    function deleted($id = null, $peg = null, $data = array()){
        $CI = get_instance();
        $m_staf = $CI->model('sipas/staf');

        $model = $this;
        $now = date('Y-m-d H:i:s');

        $property = $model->read($id);        
        $hapus_data = json_decode($property['properti_hapus_data']);

        if(empty($hapus_data))
        {
            $hapus_data = array();
        }
        else if(is_object($hapus_data))
        {
            $hapus_data = (array) $hapus_data;
        }

        $new_data = array(
            'at' => $now,
            'by' => $peg,
            'data' => $data
        );
        $hapus_data[] = $new_data;
        $hapus_data = json_encode($hapus_data);
        
        $data['properti_hapus_tgl'] = $now;
        $data['properti_hapus_staf'] = $peg;
        $data['properti_hapus_data'] = $hapus_data;
        $data['properti_ishapus']   = 1;

        if(empty($id)) return;

        $op = $model->update($id, $data);
        if($op['success']){
            $op['message'] = 'Berhasil Menghapus Data';
        }
        return $op['data'];
    }

    function restore($id = null, $peg = null, $data = array(), $slug = null){
        $CI = get_instance();
        $m_staf = $CI->model('sipas/staf');

        $model = $this;
        $now = date('Y-m-d H:i:s');

        $property = $model->read($id);        
        $pulih_data = json_decode($property['properti_pulih_data']);

        if(empty($pulih_data))
        {
            $pulih_data = array();
        }
        else if(is_object($pulih_data))
        {
            $pulih_data = (array) $pulih_data;
        }

        $new_data = array(
            'at' => $now,
            'by' => $peg,
            'data' => $data
        );
        $pulih_data[] = $new_data;
        $pulih_data = json_encode($pulih_data);
        
        $data['properti_pulih_tgl'] = date('Y-m-d H:i:s');
        $data['properti_pulih_staf'] = $peg;
        $data['properti_slug'] = $slug;
        $data['properti_pulih_data'] = $pulih_data;

        if(empty($id)) return;

        $op = $model->update($id, $data);
        if($op['success']){
            $op['message'] = 'Berhasil Mengembalikan Data';
        }
        return $op['data'];
    }
}