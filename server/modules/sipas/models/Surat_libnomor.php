<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_libnomor extends Base_model {
    
    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat_libnomor',
                'primary'=>'surat_libnomor_id',
                'fields'=> array(
                    array('name'=>'surat_libnomor_id',                  'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'surat_libnomor_model',               'display'=>'Arsip Surat'),
                    array('name'=>'surat_libnomor_tahun',               'display'=>'Model Surat'),
                    array('name'=>'surat_libnomor_unit_pembuat',        'display'=>'Tipe Surat'),
                    array('name'=>'surat_libnomor_jenis',               'display'=>'Nomor Surat'),
                    array('name'=>'surat_libnomor_value',               'display'=>'Surat Backdate'),
                    array('name'=>'surat_libnomor_booking',             'display'=>'Booking'),
                    array('name'=>'surat_libnomor_last_generated',      'display'=>'Agenda Surat')
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function generate_code($config = null, $digit = null, $updated = true, $mode = null){
        $CI = get_instance();
        $model = $CI->model('sipas/surat', true);

        $me = $this;
        $now = date('Y-m-d H:i:s');
        $data = $me->read($config);
        
        if($data){
            $val_booking = $data['surat_libnomor_booking'];
            $urut = $data['surat_libnomor_value'];
            $no = $urut + 1;
            if($val_booking){
                $booking = explode(",",$val_booking);

                if($booking[0] == $urut){
                    $no = (int)$booking[0] + 1;
                    unset($booking[0]);
                    $val_booking = implode(",", $booking);
                }
            }
            
            if($updated){
                $me->update($data['surat_libnomor_id'], array(
                    'surat_libnomor_value' => $no,
                    'surat_libnomor_booking' => $val_booking,
                    'surat_libnomor_last_generated' => $now
                ));
            }
        }else{
            $urut = 1;
            if($updated){
                $config['surat_libnomor_last_generated'] = $now;
                $config['surat_libnomor_value'] = 2;

                $me->insert($config);
            }
        }
        $no_urut = str_pad($urut, strlen($digit),'0',STR_PAD_LEFT);
        $next = array('urut' => $no_urut, 'config' => $config);
        return $next;
    }

    function update_code($config = null){
        $me = $this;
        $now = date('Y-m-d H:i:s');

        $data = $me->read($config);        

        if($data){
            $val_booking = $data['surat_libnomor_booking'];
            $urut = $data['surat_libnomor_value'];
            $val = $urut + 1;
            if($val_booking){
                $booking = explode(",",$val_booking);

                if($booking[0] >= $urut){
                    unset($booking[0]);
                    $val_booking = implode(",", $booking);
                }
            }
            $operation = $me->update($data['surat_libnomor_id'], array(
                'surat_libnomor_booking' => $val_booking,
                'surat_libnomor_value' => $val,
                'surat_libnomor_last_generated' => $now
            ));
        }else{
            $config['surat_libnomor_last_generated'] = $now;
            $config['surat_libnomor_value'] = 2;
            $operation = $me->insert($config);
        }
        
        return $operation;
    }

    function update_booking($config = null, $urut = null){
        $me = $this;
        $now = date('Y-m-d H:i:s');

        $data = $me->read($config);
        $val_urut = ltrim($urut, '0');
        if($data){
            $operation = $me->update($data['surat_libnomor_id'], array(
                'surat_libnomor_value' => $data['surat_libnomor'].$val.','
            ));
        }else{
            $config['surat_libnomor_last_generated'] = $now;
            $config['surat_libnomor_value'] = 1;
            $config['surat_libnomor_booking'] = $val_urut.',';
            $operation = $me->insert($config);
        }
        
        return $operation;
    }

    function delete_code($config = null){
        $me = $this;
        $now = date('Y-m-d H:i:s');

        $data = $me->read($config);
        
        $urut = $data['surat_libnomor_value'];
        $val = $urut - 1;
        $operation = $me->update($data['surat_libnomor_id'], array(
            'surat_libnomor_value' => $val,
            'surat_libnomor_last_generated' => $now
        ));
        
        return $operation;
    }
}