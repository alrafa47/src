<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/akun', true);

class Sipas_model_Account extends sipas_model_Akun 
{
    public $field_id        = 'akun_id';
    public $field_username  = 'akun_nama';
    public $field_staf      = 'akun_staf';
    public $field_password  = 'akun_sandi';
    public $field_isactive  = 'akun_isaktif';
    public $field_salt      = 'akun_garam';
    public $field_display   = 'akun_nama';

    function __construct(){
        parent::__construct();

        $this->config->load('application_config');
        
        $this->load->library('TokenAuth');
        $this->load->helper('http');

        $this->load->model(array(
            'sipas/akun',
            // 'sipas/akses_view',
            'sipas/staf',
            'sipas/staf_view',
            'sipas/surat',
            'sipas/disposisi_masuk_view',
            'sipas/unit'
        ));
    }

    function login($username = null, $password = null, $returnToken = false) {
        $this->reset_session();

        /*validate user*/
        if($password === false){ // false indicate skip password for auth
            $validuser = $this->read(array(
                $this->field_username => $username,
                'akun_staf IS NOT NULL' => null,
                $this->field_isactive => true
            ));
        } else {
            $ci = get_instance();
            $model = $ci->model('sipas/staf_hidup_view',true);
            
            $validuser = $this->read(array(
                $this->field_username => $username,
                'akun_staf IS NOT NULL' => null,
                $this->field_password => $this->password($password),
                $this->field_isactive => true
            ));
        }

        /*limitation feature*/
        if(!$returnToken) {
            if($this->use_limit) {
                if($validuser and !empty($validuser) ) {
                    $this->reset_limit();
                }else{
                    $this->next_limit();
                }
            }
        }

        if($validuser and !empty($validuser)) {
            /*updating last login into user*/
            $now = date('Y-m-d H:i:s');
            if($this->use_last_login_update) {
                $op = $this->update($validuser[$this->get_primary()], array(
                    $this->field_lastlogin => $now,
                ));
                
                if($op[$this->successProperty]){
                    $validuser[$this->field_lastlogin] = $now;
                    /*$validuser[$this->field_islogin] = true;*/
                }
            }
 
            if($returnToken) {
                /*use token*/
                $session_data = $this->prepare_session_data_token($validuser);
                $token_data = $this->prepare_token_data($session_data);
               
                $data_profile = $session_data['profile'];

                if(empty($data_profile)){
                    return array(
                        'success' => 'false',
                        'message' => 'Akun staf utama tidak aktif'
                    );
                }else{
                    $validuser['success'] = 'true';
                    return $this->create_token($token_data);
                }
            } else {
                /*use session*/
                $session_data = $this->prepare_session_data($validuser);
                $data_profile = $session_data['profiles'];

                $response = array(
                    'success' => 'false',
                    'message' => 'Akun staf utama tidak aktif'
                );
                
                if(empty($data_profile)){
                    return $response;
                }else{
                    $staf_eksis = false;
                    foreach ($session_data['profiles'] as $key => $value) {
                        $data_staf = $value['profile'];

                        if($data_staf['staf_id'] == $validuser['akun_staf']){
                            $staf_eksis = true;
                        }
                    }

                    if($staf_eksis == false){
                        return $response;
                    }else{
                        $validuser['success'] = 'true';
                        return $this->create_session($session_data);
                    }
                }
            }
            return true;
        }else{
            return false;
        }
    }

    function createTokens($akun_id = null){
        $CI = get_instance();
        $staf_model = $CI->model('sipas/staf_aktif_view',true);
        $profiles = $staf_model->find(array('staf_akun' => $akun_id));
        $data_session = array();

        foreach ($profiles as $key => $validuser) {
            /*use token*/
            $token = array();
            $session_data = $this->prepare_session_data_tokens($validuser);
            $token_data = $this->prepare_token_data($session_data);
           
            $token['staf_id'] = $validuser['staf_id'];
            $token['token'] = $this->create_token($token_data);

            array_push($data_session, $token);
        }

        return $data_session;
    }

    function isMyUserId($identifier, $callback = null)
    {
        $match = ($identifier == $this->get_user_id());
        if($match and is_callable($callback)){
            call_user_func_array($callback, array());
        }
        return $match;
    }

    function isMyProfileId($identifier, $callback = null)
    {
        $match = ($identifier == $this->get_profile_id());
        if($match and is_callable($callback)){
            call_user_func_array($callback, array());
        }
        return $match;
    }

    /*LOGIN LIMIT FEATURE*/

    /*options for limitation login feature*/
    public $use_limit = true;
    public $limit_max = 3;
    public $limit_delay = 10; /*in second*/
    protected $sess_limit_timer = 'login_timer';
    protected $sess_limit_counter = 'login_counter';

    function check_is_on_limit(){
        if($this->use_limit){
            if($this->is_over_limit()){
                if($this->remain_limit_time() > 0){
                    return true;
                }else{
                    $this->reset_limit();
                    return false;
                }
            }
        }
        return false;
    }
    function is_over_limit(){
        $limit_counter = (int) $this->session->userdata($this->sess_limit_counter);
        $limit_max = (int) $this->limit_max;
        return $limit_counter >= $limit_max;
    }
    function remain_limit_time(){
        $now = microtime(true);
        $last_timer = $this->session->userdata($this->sess_limit_timer);
        $diff = $now - ($last_timer);
        $remain = round($this->limit_delay - $diff);
        return $remain;
    }
    function next_limit(){
        $limit_counter = (int)$this->session->userdata($this->sess_limit_counter);
        $this->session->set_userdata(array(
            $this->sess_limit_counter=> ($limit_counter + 1),
            $this->sess_limit_timer=> microtime(true)
        ));
    }
    function reset_limit(){
        $this->session->set_userdata(array(
            $this->sess_limit_counter=> 0,
            $this->sess_limit_timer=> 0
        ));
    }
    /*END LOGIN LIMIT FEATURE*/

    /*LOGOUT FEATURE*/
    function logout(){
        /*need remove data manually*/
        $this->reset_session();
        $this->reset_limit();

        // $this->session->sess_destroy();
        // $this->session->sess_regenerate(true);
        return true;
    }

    function reset_session(){
        $this->session->unset_userdata(array(
            $this->sess_islogin,
            $this->sess_user,
            // $this->sess_rules,
            $this->sess_logintime,
            'profiles',
        ));
    }
    /*END LOGOUT SESSION*/



    /*TOKENIZE FEATURE*/
    function create_token($data = null)
    {
        $ci =& get_instance();
        $cipher = $ci->config->item('token_cipher');
        
        $token = $ci->tokenauth->with($data, $cipher);

        return $token->getTokenString();
    }

    function is_using_token()
    {
        return isHttpRequestHave($this->config->item('token_key'));
    }

    function get_token()
    {
        $tokenKey = $this->config->item('token_key');
        $tokenString = getHttpRequestHeader($tokenKey);

        if(strtolower($tokenKey) == 'authorization')
        {
            if(!empty($tokenString))
            {
                $tokenStringArray = explode(' ', $tokenString);
                $tokenString = isset($tokenStringArray[1]) ? $tokenStringArray[1] : "";
            }
        }
        $token = $this->tokenauth->with($tokenString);
        return $token;
    }

    function get_token_value($key = null)
    {
        $token = $this->get_token();

        $data = (array)$token->getPayload();
        return array_key_exists($key, $data) ? $data[$key] : null ;
    }
    // END TOKENIZE FEATURE



    // PASSWORD FEATURE
    function password($password=null, $salt = ''){
        $query = $this->db->query("SELECT PASSWORD('".md5($password.$salt)."') AS PASSWORD");
        if($row = $query->row_array()){
            return $row['PASSWORD'];
        }
    }

    function check_current_user_password($password = null){
        if($this->islogin()){
            $loggeduser = $this->read(array( // read for password, password doesnt stored
                $this->field_id => $this->get_user_id(),
                $this->field_password => $this->password($password)
            ));
            return (boolean) $loggeduser;
        }
        return false;
    }

    function update_current_user_password($newpassword = null){
        if($this->islogin()){
            return $this->update($this->get_user_id(), array($this->field_password => $this->password($newpassword)));
        }
        return false;
    }
    // END PASSWORD FEATURE



    // SESSION FEATURE
    protected $sess_id = 'session_id';
    protected $sess_islogin = 'islogin';

    // options for last_login_updater feature
    public $use_last_login_update = true;
    public $field_lastlogin = 'akun_lastmasuk';
    public $field_islogin = 'islogin';

    function islogin()
    {
        if($this->is_using_token())
        {
            return $this->get_token()->isValid();
        }else{
            $akun = $this->input->get_request_header('Akun-Id');
            if($akun !== 'null'){
            // if(!empty($akun)){
                return $this->session->userdata($this->sess_islogin);
            }else{
                return null;
            }
        }
    }

    function prepare_session_data_tokens($validuser = null) {
        if(!$validuser) return;

        $now = date('Y-m-d H:i:s');
        $session_data = array();

        // update sess login time
        $session_data[$this->sess_logintime] = $now;

        // update sess user 
        // remove storing password
        if(array_key_exists($this->field_password, $validuser)) {
            unset($validuser[$this->field_password]);
        }
        if(array_key_exists($this->field_salt, $validuser)) {
            unset($validuser[$this->field_salt]);
        }
        $session_data[$this->sess_user] = $validuser;

        // update sess profile
        $CI = get_instance();
        $staf_model = $CI->model('sipas/staf_view',true);
        // $profile = $staf_model->read($validuser['akun_staf']);
        // removing storing direct access
        $peran_akses = null;
        if(array_key_exists('peran_akses', $validuser)) {
            $peran_akses = $validuser['peran_akses'];
            unset($validuser['peran_akses']);
        }
        $session_data[$this->sess_profile] = $validuser;

        // update sess rules
        $rules = array();

        if(!$peran_akses) {
            $CI = get_instance();
            $peran_model = $CI->model('sipas/peran_view',true);
            if(array_key_exists($staf_model->field_peran, $validuser))
            {
                $peran = $peran_model->read($validuser[$staf_model->field_peran]);
                if($peran)
                {
                    $peran_akses = $peran['peran_akses'];
                }
            }
        }
        if($peran_akses) {
            try {
                $peran_akses = htmlspecialchars_decode($peran_akses);
                $peran_akses = json_decode($peran_akses);
                $rules = $peran_akses;
            } catch (Exception $e) {}
        }
        $session_data[$this->sess_rules] = $rules;

        return $session_data;
    }

    function prepare_session_data_token($validuser = null)
    {
        if(!$validuser) return;

        $now = date('Y-m-d H:i:s');
        $session_data = array();

        // update sess login time
        $session_data[$this->sess_logintime] = $now;

        // update sess user 
        // remove storing password
        if(array_key_exists($this->field_password, $validuser)) {
            unset($validuser[$this->field_password]);
        }
        if(array_key_exists($this->field_salt, $validuser)) {
            unset($validuser[$this->field_salt]);
        }
        $session_data[$this->sess_user] = $validuser;

        // update sess profile
        $CI = get_instance();
        $staf_model = $CI->model('sipas/staf_aktif_view',true);
        $profile = $staf_model->read($validuser['akun_staf']);

        if(!empty($profile)){
            // removing storing direct access
            $peran_akses = null;
            if(array_key_exists('peran_akses', $profile)) {
                $peran_akses = $profile['peran_akses'];
                unset($profile['peran_akses']);
            }
            $session_data[$this->sess_profile] = $profile;

            // update sess rules
            $rules = array();

            if(!$peran_akses){
                $CI = get_instance();
                $peran_model = $CI->model('sipas/peran_view',true);
                
                if(array_key_exists($staf_model->field_peran, $profile)){
                    $peran = $peran_model->read($profile[$staf_model->field_peran]);
                    if($peran){
                        $peran_akses = $peran['peran_akses'];
                    }
                }
            }
            if($peran_akses) {
                try {
                    $peran_akses = htmlspecialchars_decode($peran_akses);
                    $peran_akses = json_decode($peran_akses);
                    $rules = $peran_akses;
                } catch (Exception $e) {}
            }
            $session_data[$this->sess_rules] = $rules;
        }else{
            $session_data['profile'] = [];
        }
        return $session_data;
    }

    function prepare_session_data($validuser = null)
    {
        if(!$validuser) return;
        $now = date('Y-m-d H:i:s');
        $session_data = array();

        // update sess login time
        $session_data[$this->sess_logintime] = $now;

        // update sess user 
        // remove storing password
        if(array_key_exists($this->field_password, $validuser)) {
            unset($validuser[$this->field_password]);
        }
        if(array_key_exists($this->field_salt, $validuser)) {
            unset($validuser[$this->field_salt]);
        }
        $session_data[$this->sess_user] = $validuser;

        // update sess profile
        $CI = get_instance();
        $staf_model = $CI->model('sipas/staf_aktif_view',true);
        $profiles = $staf_model->find(array('staf_akun' => $validuser['akun_id']));

        if(!empty($profiles)){
            foreach ($profiles as $i => $profile) {
                // removing storing direct access
                $peran_akses = null;
                if(array_key_exists('peran_akses', $profile)) {
                    $peran_akses = $profile['peran_akses'];
                    unset($profile['peran_akses']);
                }
                $session_data['profiles'][$profile['staf_id']][$this->sess_profile] = $profile;

                // update sess rules
                $rules = array();

                if(!$peran_akses){
                    $CI = get_instance();
                    $peran_model = $CI->model('sipas/peran_view',true);
                    if(array_key_exists($staf_model->field_peran, $profile))
                    {
                        $peran = $peran_model->read($profile[$staf_model->field_peran]);
                        if($peran)
                        {
                            $peran_akses = $peran['peran_akses'];
                        }
                    }
                }
                if($peran_akses){
                    try {
                        $peran_akses = htmlspecialchars_decode($peran_akses);
                        $peran_akses = json_decode($peran_akses);
                        $rules = $peran_akses;
                    } catch (Exception $e) {}
                }
                $session_data['profiles'][$profile['staf_id']][$this->sess_rules] = $rules;
            }
        }else{
            $session_data['profiles'] = [];
        }
        return $session_data;
    }

    function prepare_token_data($session_data = null)
    {
        $data = $session_data;

        // clean akun
        $akun = $data['akun'];
        $akun_remove_keys = array(
            'staf_properti',
            'staf_isaktif',
            'staf_wakil_jumlah',
            'staf_atasan_jumlah',
            'staf_pgs_jumlah',
            'jabatan_isaktif',
            'jabatan_unit',
            'jabatan_induk',
            'jabatan_properti',
            //'jabatan_asisten_jumlah',
            //'jabatan_atasan_jumlah',
            'unit_rubrik',
            'unit_isaktif',
            'unit_manager',
            'unit_induk',
            'unit_properti',
            'akun_sandi',
            'akun_garam',
            'akun_lastmasuk',
            'akun_properti',
            'akun_isaktif',
            'peran_isaktif',
            'peran_properti'
        );

        foreach ($akun_remove_keys as $key){
            if(array_key_exists($key, $akun)){
                unset($akun[$key]);
            }
        }
        $data['akun'] = $akun;

        // clean profile
        $profile = $data['profile'];

        if(!empty($profile)){
            $profile_remove_keys = $akun_remove_keys;
            foreach ($profile_remove_keys as $key) {
                if(array_key_exists($key, $profile) ) {
                    unset($profile[$key]);
                }
            }
            $data['profile'] = $profile;

            // clean rules
            $_rules = $data['rules'];
            $rules = array();
            foreach ($_rules as $key => $value) {
                if($value == true) {
                    $key = sprintf("%u",crc32($key));
                    $rules[] = $key;
                }
            }
            $rules = implode(' ', $rules);
            $data['rules'] = $rules;

            // prepere for future use
            unset($data['akun']);
            unset($data['logintime']);
            $data['iss'] = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : null;
            $data['iat'] = strtotime(date('Y-m-d H:i:s'));
            $data['exp'] = strtotime(date('Y-m-d H:i:s', strtotime('+8 hours')));
            $data['sub'] = $data['profile']['staf_id'];
            $data['aud'] = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
            $data['name'] = $data['profile']['staf_nama'];
            $data['email'] = $data['profile']['akun_surel'];
        }

        return $data;
    } 

    function create_session($data = null)
    {
        if(!$data) return;

        // patch for several information
        $this->session->set_userdata($this->sess_islogin, !!$data);

        // update login time
        $now = date('Y-m-d H:i:s');
        $this->session->set_userdata($this->sess_logintime, $now);

        // update setting
        $CI = get_instance();
        $setting = $CI->model('sipas/pengaturan',true);
        $this->session->set_userdata($this->sess_setting, $setting->getSettings(false));

        // now create the real session
        $this->session->set_userdata($data);
        
        return $data;
    }

    function get_session()
    {    
        if($this->is_using_token())
        {
            $token = $this->get_token();
            return $data = (array)$token->getPayload();
        }else{
            return array(
                $this->sess_id      => session_id(),
                $this->sess_islogin => (boolean)$this->islogin()
            );
        }
    }
    // END SESSION FEATURE

    // From Now On, these could be use in token too
    // INFO-SESSION
    function get_info(){
        if(func_num_args() == 0)
        {
            return array_merge(
                (array) $this->get_info_logintime(),
                (array) $this->get_info_user(),
                (array) $this->get_info_profile(),
                (array) $this->get_info_rules(),
                (array) $this->get_info_setting()
            );
        }else
        {
            $section = func_get_arg(0);

            $session = $this->get_session();
        
            $info = sprintf('get_info_%s', $section);

            if(method_exists($this, $info)){
                $session = array_merge(
                    $session,
                    $this->{$info}()
                );
            }

            return $session;
        }
    }

    // it just an alias
    function info()
    {
        return call_user_func_array(array($this, 'get_info'), func_get_args());
    }

    function get_info_session()
    {
        return array_merge(
            (array) $this->get_info_logintime(),
            (array) $this->get_info_user(),
            (array) $this->get_info_profile(),
            (array) $this->get_info_rules(),
            (array) $this->get_info_setting()
        );
    }
    // END INFO-SESSION
    // INFO-LOGINTIME
    protected $sess_logintime = 'logintime';

    function get_info_logintime()
    {
        return array(
            $this->sess_logintime => $this->get_logintime()
        );
    }

    function get_logintime()
    {
        return $this->is_using_token() ? 
                $this->get_token_value($this->sess_logintime) : 
                $this->session->userdata($this->sess_logintime);
    }
    // END INFO-LOGINTIME

    // INFO-USER
    protected $sess_user = 'akun';
    protected $sess_user_id = 'akun_id';

    function get_info_user()
    {
        return array(
            $this->sess_user => $this->get_user()
        );
    }

    function get_user()
    {
        // echo $this->session->userdata($this->sess_user);
        if($this->is_using_token()){
            return (array)$this->get_token_value($this->sess_user);
        }else{
            return $this->session->userdata($this->sess_user);
        }
                
    }

    function get_user_id(){
        $user = $this->get_user();
        return ($user and array_key_exists($this->sess_user_id, $user)) ? $user[$this->sess_user_id] : null;
    }
    // END INFO-USER

    // INFO-PROFILE
    protected $sess_profile = 'profile';
    protected $sess_profile_id = 'staf_id';
    protected $sess_jabatan_id = 'staf_jabatan';
    protected $sess_unitkerja_id = 'staf_unit';

    function get_info_profile()
    {
        return array(
            $this->sess_profile => $this->get_profile()
        );
    }

    function get_profile()
    {
        $akun = $this->input->get_request_header('Akun-Id');
        // echo $this->session->userdata($this->sess_user);
        if($this->is_using_token()){
            return (array)$this->get_token_value($this->sess_profile);
        }else{
            if($akun !== null){
                $dataAkun =@ $this->session->userdata('profiles');
                if (empty($dataAkun)) {
                    return null;
                }
                return $dataAkun[$akun][$this->sess_profile];
            }else{
                return null;
            }
        }
    }

    function get_profile_id(){
        $profile = $this->get_profile();
        return ($profile and array_key_exists($this->sess_profile_id, $profile)) ? $profile[$this->sess_profile_id] : null;
    }

    function get_jabatan_id(){
        $profile = $this->get_profile();
        return ($profile and array_key_exists($this->sess_jabatan_id, $profile)) ? $profile[$this->sess_jabatan_id] : null;
    }

    function get_unitkerja_id(){
        $profile = $this->get_profile();
        return ($profile and array_key_exists($this->sess_unitkerja_id, $profile)) ? $profile[$this->sess_unitkerja_id] : null;
    }
    // END INFO-PROFILE

    // INFO-RULE
    protected $sess_rules = 'rules';

    function get_info_rules()
    {
        return array(
            $this->sess_rules => $this->get_rules()
        );
    }

    function get_rules()
    {
        $akun = $this->input->get_request_header('Akun-Id');
        // echo $this->session->userdata($this->sess_user);
        if($this->is_using_token()){
            $rules = $this->get_token_value($this->sess_rules);
        }else{
            if($akun !== null){
                $dataAkun = $this->session->userdata('profiles');
                $rules = $dataAkun[$akun][$this->sess_rules];
            }else{
                return null;
            }
        }
        
        if(is_string($rules))
        {
            $rules = explode(' ', $rules);
            $_rules = array_flip($rules);
            foreach ($_rules as $key => $value) {
                $_rules[$key] = true;
            }
            $rules = $_rules;
        }
        if(is_object($rules))
        {
            $rules = (array) $rules;
        }

        return $rules;
    }

    function get_rule_access($ruleCode = null)
    {
        $rules = (array)$this->get_rules();
        if(is_array($rules) and array_key_exists($ruleCode, $rules) OR (is_array($rules) and array_key_exists(crc32($ruleCode), $rules)))
        {
           return isset($rules[$ruleCode]) ? $rules[$ruleCode] : $rules[crc32($ruleCode)];
        }else
        {
            return false;
        }
    }
    // END INFO-RULE

    // INFO-SETTING
    protected $sess_setting = 'setting';

    function get_info_setting()
    {
        return array(
            $this->sess_setting => $this->get_setting()
        );
    }

    function get_setting()
    {
        return $this->is_using_token() ? 
                $this->get_token_value($this->sess_setting) : 
                $this->session->userdata($this->sess_setting);
    }
    // END INFO-SETTING

    function do_auth_sso($username, $password){
        $ci =& get_instance();
        $setting = $ci->model('sipas/pengaturan',true);
        $host = $setting->getSettingByCode('sso_url');
        $token = $setting->getSettingByCode('sso_apikey');
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $host,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => 'username='.$username.'&password='.$password,
            CURLOPT_HTTPHEADER => array(
            'sso-key: '.$token.'',
            'Content-Type: application/x-www-form-urlencoded'
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        return json_decode($response, true);
    }
}