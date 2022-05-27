<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk_view', true);

class Sipas_model_Koreksi_masuk_view extends Sipas_model_Disposisi_masuk_view
{

    public $table = 'v_koreksi_masuk';

    public $icon        = 'fam user';
    public $icon_parent = 'fam user';
    public $icon_leaf   = 'fam user';

    static $field_status    = 'disposisi_masuk_status';

    protected $field_parent = 'disposisi_induk';
    protected $field_disposisi = 'disposisi_surat';
    protected $field_text   = 'text';
    protected $field_meta   = 'metainfo';
    protected $field_children = 'children';
    protected $field_total  = 'total';
    protected $field_root   = 'root';
    protected $field_root_value = '.';
    protected $field_leaf   = 'leaf';

    public $value_root = 'Koreksi Surat';

    function __construct()
    {
        parent::__construct();
        $this->load->model('sipas/disposisi', 'disposisi_model');

        $this->set_table_name('v_koreksi_masuk');
        $this->set_primary('disposisi_masuk_id');
    }

    function select($config = NULL, $fn = NULL)
    {
        $records = call_user_func_array("parent::select", func_get_args());
        $query = $this->get_lastquery();

        if (is_array($records) and !empty($records['data'])) {
            foreach ($records['data'] as $key => &$value) {
                $value['pengirim_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $value['disposisi_pengirim_id'];
                $value['penerima_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $value['disposisi_masuk_penerima_id'];
            }
        }

        $this->set_lastquery($query);
        return $records;
    }

    public function readInfo()
    {
        $response = array();

        $CI = get_instance();
        $m = $CI->model('sipas/account', true);

        $user = $m->get_user();
        $filter = array(
            $this->field_receiver_id    => $user['akun_staf'],
            $this->field_status_surat   => 3,
            $this->field_disposisi          => NULL,
            'disposisi_isdisposisi' => 1
        );

        $response[$this->field_readinfo_total] = $this->count_exist(array_merge(
            $filter,
            array(
                'IFNULL(' . $this->field_disposisi_retract . ',' . self::ACTIVE . ')' => self::ACTIVE
            )
        ));

        $response[$this->field_readinfo_init] = $this->count_exist(array_merge(
            $filter,
            array(
                'IFNULL(' . $this->field_readinfo_lookup . ',' . self::BACA_INIT . ')' => self::BACA_INIT,
                'IFNULL(' . $this->field_disposisi_retract . ',' . self::ACTIVE . ')' => self::ACTIVE
            )
        ));
        $response[$this->field_readinfo_read] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_readinfo_lookup => self::BACA_ISBACA,
                'IFNULL(' . $this->field_disposisi_retract . ',' . self::ACTIVE . ')' => self::ACTIVE
            )
        ));
        $response[$this->field_readinfo_forward] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_readinfo_lookup => self::FORWARD_ISFORWARDED,
                'IFNULL(' . $this->field_disposisi_retract . ',' . self::ACTIVE . ')' => self::ACTIVE
            )
        ));

        $response[$this->field_count_disposisi_retract] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_disposisi_retract => self::RETRACT
            )
        ));

        return $response;
    }

    function penerimasurat($id)
    {
        $config = array(
            'table' => $this->table,
            'filters' => array(
                array('property' => 'surat_masuk', 'data' => array('type' => 'exact', 'value' => $id)),
                array('property' => 'disposisi_staf', 'data' => array('type' => 'exact', 'value' => NULL))
            ),
            'fields' => array('penerima_nip', 'penerima_nama', 'penerima_jabatan_nama', 'penerima_unit_nama'),
            'fields_map' => array(
                'penerima_nip' => 'staf_kode',
                'penerima_nama' => 'staf_nama',
                'penerima_jabatan_nama' => 'jabatan_nama',
                'penerima_unit_nama' => 'unit_nama'
            )
        );
        return $this->select($config);
    }

    function getTraceKoreksi($id = null)
    {
        $korModel = $this->disposisi_model;
        $korPenModel = $this;

        $data = array(
            $this->field_text => $this->value_root,
            $this->field_children => array()
        );

        $data[$this->field_children] = $this->traceKoreksi($id, null);

        return $data;
    }

    function traceKoreksi($id = null, $children = null) // id is always read as disposisi_masuk
    {
        $korModel = $this->disposisi_model;
        $korPenModel = $this;

        $root = $children; // default root node

        // find disposisi_masuk record
        $disposisi_masuk_record = $korPenModel->read($id);

        // find koreksi record
        if ($disposisi_masuk_record) {
            $eks_penerima_rec = array(
                'disposisi_masuk' => true,
                'disposisi_masuk_id' => $disposisi_masuk_record['disposisi_masuk_id'],
                'leaf' => empty($children),
                'disposisi_masuk_record' => $disposisi_masuk_record,
                'children' => empty($children) ? null : array($children)
            );


            $disposisi_record = $korModel->read($disposisi_masuk_record['disposisi_masuk_disposisi']);

            if ($disposisi_record) {
                $eks_koreksi_rec = array(
                    'disposisi' => true,
                    'disposisi_id' => $disposisi_record['disposisi_id'],
                    'leaf' => empty($eks_penerima_rec),
                    'disposisi_record' => $disposisi_record,
                    $this->field_children => empty($eks_penerima_rec) ? null : array($eks_penerima_rec)
                );

                // do the recursif before goes deep
                $root = $this->traceKoreksi($disposisi_record['disposisi_induk'], $eks_koreksi_rec);
            }
        }

        return $root;
    }

    function create_koreksi($data)
    {
        $CI = get_instance();
        $staf_model             = $CI->model('sipas/staf',                  true);
        $properti               = $CI->model('sipas/properti',              true);
        $disposisi_masuk        = $CI->model('sipas/disposisi_masuk',       true);
        $koreksi_masuk_view     = $CI->model('sipas/koreksi_masuk_view',    true);
        $notifikasi             = $CI->model('sipas/notifikasi',            true);

        $now = date('Y-m-d H:i:s');
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $staf_profil = '';

        if (empty($data['petikan_awal'])) $data['petikan_awal'] = NULL;
        if (empty($data['penyetuju_akhir'])) $data['penyetuju_akhir'] = NULL;
        if (empty($data['dispo_parent_path'])) $data['dispo_parent_path'] = NULL;
        if (empty($data['dispo_masuk_parent_path'])) $data['dispo_masuk_parent_path'] = NULL;
        if (empty($data['pengirim_nama'])) $data['pengirim_nama'] = NULL;
        if (empty($data['pengirim_id'])) $data['pengirim_id'] = NULL;
        if (empty($data['penerima_id'])) $data['penerima_id'] = NULL;

        if (empty($data['use_notif_email'])) {
            $data['use_notif_email'] = (bool)false;
        } else {
            $data['use_notif_email'] = (bool)true;
        }

        if (empty($data['use_notif_email_draft'])) {
            $data['use_notif_email_draft'] = (bool)false;
        } else {
            $data['use_notif_email_draft'] = (bool)true;
        }

        if ($data['penerima_id'] != NULL) {
            if (array_key_exists("penerima_profil", $data)) {
                $staf_profil = $data['penerima_profil'];
            } else {
                $staf = $staf_model->read($data['penerima_id']);
                $staf_profil = $staf['staf_profil'];
            }
        } else {
            $staf_profil = NULL;
        }


        if ($data['petikan_awal'] != NULL) {
            $find_before = $koreksi_masuk_view->read(array(
                'disposisi_masuk_staf' => $data['penerima_id'],
                'disposisi_surat' => $data['surat_id'],
                'disposisi_model_sub' => 1,
                'disposisi_masuk_koreksi_status' => 0
            ));
        } elseif ($data['penyetuju_akhir'] != NULL) {
            $find_before = $koreksi_masuk_view->read(array(
                'disposisi_masuk_staf' => $data['penerima_id'],
                'disposisi_surat' => $data['surat_id'],
                'disposisi_model_sub' => 0,
                'disposisi_masuk_koreksi_status' => 0
            ));
        } else {
            $find_before = $koreksi_masuk_view->read(array(
                'disposisi_masuk_staf' => $data['penerima_id'],
                'disposisi_surat' => $data['surat_id'],
                'disposisi_masuk_koreksi_status' => 0
            ));
        }

        if ($find_before) {
            $update_dm_before = $disposisi_masuk->update($find_before['disposisi_masuk_id'], array(
                'disposisi_masuk_koreksi_status' => 1
            ), NULL, function ($response) {
            });
        }

        $disposisi_masuk->insert(array(
            'disposisi_masuk_disposisi'     => $data['disposisi_id'],
            'disposisi_masuk_staf'          => $data['penerima_id'],
            'disposisi_masuk_profil'        => $staf_profil,
            'disposisi_masuk_terima_staf'   => $data['penerima_id'],
            'disposisi_masuk_terima_profil' => $staf_profil,
            'disposisi_masuk_terima_tgl'    => $now
        ), NULL, function ($response) use ($data, $queueTube, $queueTubeRedis, $properti, $disposisi_masuk, $notifikasi) {
            $inserted_data = $response['data'];
            $disposisi_id = $inserted_data['disposisi_masuk_id'];

            if (empty($data['dispo_masuk_parent_path'])) {
                $updated_data = $disposisi_masuk->update($disposisi_id, array('disposisi_masuk_parent_path' => '/' . $disposisi_id));
            } else {
                $updated_data = $disposisi_masuk->update($disposisi_id, array('disposisi_masuk_parent_path' => $data['dispo_masuk_parent_path'] . '/' . $disposisi_id));
            }

            $op = $properti->created($data['pengirim_id'], $inserted_data, 'disposisi_masuk', $inserted_data['disposisi_masuk_id'], $inserted_data['disposisi_masuk_nomor']);
            if ($op) {
                $disposisi_masuk->update($inserted_data['disposisi_masuk_id'], array(
                    'disposisi_masuk_properti' => $op['properti_id']
                ));
            }

            if (Config()->item('queueServer')['host']) {
                $data_fcm = array(
                    'id' => $disposisi_id,
                    'type' => 'Draf',
                    'from' => $data['pengirim_id'],
                    'to' => $data['penerima_id'],
                    'data' => $data['surat_perihal']
                );
                $addJob = create_job($queueTube, $data_fcm);

                $data_redis = array(
                    'type' => $data['type'],
                    'staf_id' => $data['penerima_id'],
                    'jabatan_id' => null,
                    'unit_id' => null,
                    'data' => $data['penerima_id']
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }

            pushEvent(array(
                'to' => $data['penerima_id'],
                'data' => array(
                    'api' => 'koreksi_masuk',
                    'id' => $disposisi_id
                ),
                'group' => array('staf', 'asistensi'),
                'type' => 'draf'
            ));

            if ($data['use_notif_email'] && $data['use_notif_email_draft']) {
                if ($inserted_data['disposisi_masuk_id']) {
                    $notifikasi->created('email', $data, $data['penerima_id'], NULL, 'draf', $inserted_data['disposisi_masuk_id']);
                }
            }
        });
    }
}
