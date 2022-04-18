<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Account extends Base_Controller {

    function __construct() {
		parent::__construct();

    }

    function index(){
        // $this->info();
        print_r('Load Index');
    }

    function login($useToken = null) {
        $model = $this->model('dms/account', true);
        $setting = $this->model('sipas/pengaturan', true);

        $username = varReq('username');
        $password = varReq('password');

        // username: admin
        // password: 5f4dcc3b5aa765d61d8327deb882cf99

        if ($model->check_is_on_limit()) {
            $this->response(array(
                'success' => false,
                'message' => $this->get_message('login_limit', array(
                    'count' => $this->limit_max,
                    'delay' => $model->remain_limit_time(),
                )),
            ));
            return;
        }

        // $auth = $model->login($username, $password, $useToken);
        $auth = null;
        $useSSO = (bool) $setting->getSettingByCode('sso_usessoldap');
        if ($useSSO) {
            $key = $setting->getSettingByCode('sso_apikey'); // uFURLSSnSEUkv24NxZ7KFG8d7z
            $url = Template::compile($setting->getSettingByCode('sso_url'))->apply(array(
                'username' => $username,
                'password' => urlencode($password),
                'key' => $key,
            )); //"http://sso.pttimah.co.id/ldap/auth/{$username}/{$password}/{$key}";

            $sso = file_get_contents($url);

            if (strtolower($sso) == 'true') {
                $auth = $model->login($username, false, $useToken);
                if(!empty($auth['success']) == 'false'){
                    $pesan = $auth['message'];
                    $auth = null;
                }else{
                    $pesan = $this->get_message($auth ? 'login_success' : 'login_failed');
                }
            }else{
                $pesan = 'Login gagal, username/password salah. Jika terjadi 5 kali silahkan hubungi Administrator';
            }
        } else {
            // some hack for compatibility with client
            $auth = $model->login($username, $password, $useToken);

            if(!empty($auth['success']) == 'false'){
                $pesan = $auth['message'];
                $auth = null;
            }else{
                $pesan = $this->get_message($auth ? 'login_success' : 'login_failed');              
            }
        }

        $response = array(
            'success' => !!$auth,
            'message' => $pesan,
        );
        $user = $model->read(array(
            $model->field_username => $username,
            $model->field_isactive => 1
        ));
        if ($response[$model->successProperty]) {
            if ($useToken) {
                $response['token'] = $auth;
                $response['tokens'] = $model->createTokens($user['akun_id']);
                $response['access_token'] = null;
                $response['refresh_token'] = null;
                $response['token_type'] = 'Bearer';
                $response['mobile_version'] = $this->config->item('mobile_version');
            } else {
                $response['session'] = $auth;
                $response['session']['profile'] = $auth['profiles'][$user['akun_staf']]['profile'] ? $auth['profiles'][$user['akun_staf']]['profile'] : [];
                $response['islogin'] = !!$auth;
            }
        }
        $this->response($response);
    }

    function logout() {
        $this->response(array(
            'success' => $this->model('dms/account', true)->logout(),
        ));
    }
}