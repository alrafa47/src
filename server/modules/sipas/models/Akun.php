<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 
 */
class Sipas_model_Akun extends Base_Model
{
    public $field_id = 'akun_id';
    public $field_username = 'akun_nama';
    public $field_password = 'akun_sandi';
    public $field_lastlogin = 'akun_lastmasuk';
    public $field_isactive = 'akun_isaktif';
    public $field_staf = 'akun_staf';
    public $messages = array(
        'change_password_failed' => 'Gagal merubah password',
        'change_password_success' => 'Berhasil merubah password',
        'change_password_notmatch' => 'Password lama tidak sesuai',
        'change_password_unregistered' => 'User tidak terregistrasi'
    );

    const USER_ACTIVE = 1;
    const USER_INACTIVE = 0;

    function __construct()
    {
        $modelling = array(
            'table' => array(
                'name' => 'akun',
                'primary' => 'akun_id',
                'fields' => array(
                    array('name' => 'akun_id',          'display' => 'Id User',     'unique' => true, 'update' => false),
                    array('name' => 'akun_staf',     'display' => 'Id Pegawai'),
                    array('name' => 'akun_ponsel',        'display' => 'Phone'),
                    array('name' => 'akun_nama',        'display' => 'Username',    'unique' => true),
                    array('name' => 'akun_sandi',    'display' => 'Password',    'public' => false),
                    array('name' => 'akun_garam',        'display' => 'Salt',        'public' => false),
                    array('name' => 'akun_lastmasuk',   'display' => 'Aktifitas Terakhir'),
                    array('name' => 'akun_surel',       'display' => 'Email'),
                    array('name' => 'akun_isaktif',    'display' => 'Hak Akses'),
                    array('name' => 'akun_ishapus',    'display' => 'Hak Akses'),
                    array('name' => 'akun_properti',    'display' => 'User Aktif'),
                    array('name' => 'akun_unit_id',    'display' => 'Unit Id'),
                )
            ),
            'auto_id' => true
        );
        parent::__construct($modelling);
    }

    function insert($id = null, $data = null, $fn = null)
    {
        // fetch the id
        if (is_array($id)) {
            $data = $id;
        } else {
            if (is_object($data)) $data = (array) $data;
            if (!is_array($data)) $data = array();
            if (empty($id)) {
                $data[$this->get_primary()] = $id = $this->generate_id();
            } else {
                $data[$this->get_primary()] = $id;
            }
        }

        // make sure for blank password to be still blank
        if (empty($data[$this->field_password])) {
            // $data[$this->field_password] = $this->password($data[$this->field_password]);
            unset($data[$this->field_password]);
        }

        // give id for none id data        
        if (empty($data[$this->get_primary()])) {
            $data[$this->get_primary()] = $this->generate_id();
        }
        return parent::insert($id, $data, $fn);
    }

    function update($id = null, $data = null, $fn = null, $nocheck = false)
    {
        if (empty($data[$this->field_password])) {
            // $data[$this->field_password] = $this->password($data[$this->field_password]);
            unset($data[$this->field_password]);
        }
        return parent::update($id, $data, $fn);
    }

    function set_staf($akun_id = null, $staf_id = null)
    {
        $result = false;
        if (!empty($akun_id)) {
            $op = $this->update($akun_id, array(
                $this->field_staf => $staf_id
            ));
            $result = $op[$model->successProperty];
        }
        return $result;
    }

    function get_staf($record = null)
    {
        if (is_string($record)) {
            $record = $this->read($record);
        }
        if (is_array($record) and isset($record[$this->field_staf])) {
            return $record[$this->field_staf];
        }
    }
}
