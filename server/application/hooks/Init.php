<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    class Init {

        function start() {
            if(strtolower($_SERVER['REQUEST_METHOD']) == 'options') die();
            $ci =& get_instance();
            $session = $ci->load->library('session');
            $tokenAuth = $ci->load->library('tokenAuth');
        }
    }

/* End of file init.php */
/* Location: ./application/hooks/init.php */