<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sms_phones extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'phones',
                'primary'=>'IMEI',
                'fields'=> array(
                    array(
                        'name'=>'ID',
                        'display'=>'Id'
                    ),
                    array(
                        'name'=>'UpdatedInDB'
                    ),
                    array(
                        'name'=>'InsertIntoDB'
                    ),
                    array(
                        'name'=>'TimeOut'
                    ),
                    array(
                        'name'=>'Send'
                    ),
                    array(
                        'name'=>'Receive'
                    ),
                    array(
                        'name'=>'IMEI'
                    ),
                    array(
                        'name'=>'Client'
                    ),
                    array(
                        'name'=>'Battery'
                    ),
                    array(
                        'name'=>'Signal'
                    ),
                    array(
                        'name'=>'Sent'
                    ),
                    array(
                        'name'=>'Received'
                    )
                ),
                'limit'=>null,
            )
        ));
    }

    function get_modem_status($status, $tolerant)
    {
        // convert the date to unix timestamp
        list($date, $time) = explode(' ', $status);
        list($year, $month, $day) = explode('-', $date);
        list($hour, $minute, $second) = explode(':', $time);
        
        $timestamp = mktime($hour, $minute+$tolerant, $second, $month, $day, $year);
        $now = time();

        //$diff = abs($now-$timestamp);
        if($timestamp>$now)
        {
            return "connect";
        }
        else 
        {
            return "disconnect";
        }
    }

    public function get_status_modem(){
        $this->db->from('phones');
        $this->db->select('UpdatedInDB');   
        $this->db->order_by('UpdatedInDB', 'DESC');
        $this->db->limit('1');

        return $this->db->get();
    }
}