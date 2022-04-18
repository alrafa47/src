<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('isInBlackListNotif')) {
    
    function isInBlacklistNotif($section = 'email', $user = null){
        $CI = get_instance();
        $isId = (strpos($user, '@') === false AND strlen($user) === 32) ? true : false;
        $isBlacklisted = 0;

        if(!empty($user)){
            $modelsection = ($section === 'email') ? 'akun' : 'alat';
            $usedModel = $CI->model('sipas/'.$modelsection);
            $blConfig = ($section === 'email') ? 'email' : 'inapp';
            $blList = Config()->item('blacklist_notif_'.$blConfig);

            if($isId){
                $src1 = $user;
                $src2 = ($section === 'email') ? $usedModel->read($user)['akun_surel'] : null;
                if($src2 === null AND $section !== 'email') $src2 = $usedModel->read(array('alat_akun' => $user))['alat_id'];
                if($src2 === null AND $section !== 'email') $src2 = $usedModel->read($user)['alat_akun'];
            }else{
                $src1 = ($section === 'email') ? $usedModel->read(array('akun_surel' => $user))['akun_id'] : $user;
                $src2 = ($section === 'email') ? $user : null;
            }

            foreach($blList as $blacklisted){
                if(!empty($blacklisted)){
                    if(in_array($src1, $blacklisted)) $isBlacklisted = $isBlacklisted + 1;
                    if(!empty($src2)){
                        if(in_array($src2, $blacklisted)) $isBlacklisted = $isBlacklisted + 1;
                    }
                }
            }
        }
        return ($isBlacklisted > 0) ? true : false;
    }
}

if (!function_exists('isInBlackListAccess')) {
    
    function isInBlacklistAccess($user = null, $strict = false){
        $CI = get_instance();
        $access = Config()->item('access_route');
        $blList = Config()->item('blacklist_hakakses');
        $isBlacklisted = 0;

        if($strict){
            $akunInBlacklist = array_column($blList, 'akun');
            if(in_array($user, $akunInBlacklist)) $isBlacklisted += 1;
        }

        return ($isBlacklisted > 0) ? true : false;
    }
}