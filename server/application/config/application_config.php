<?php
defined('BASEPATH') or exit('No direct script access allowed');

$CI = get_instance();
$pengaturan = $CI->model('sipas/pengaturan', true);

// Penomoran
$config['urutan_penomoran'] = 'surat_tanggal'; // surat_tanggal or surat_setuju_tgl
$config['backdate_value'] = 'huruf_besar'; // huruf_besar, huruf_kecil, angka, romawi

// penomoran strict
$config['penomoran_urut_internal'] = 1; // 1 = urut OR 0 = bebas 
$config['penomoran_urut_eksternal'] = 1; // 1 = urut OR 0 = bebas
// Redis
$config['redisPrefix'] = 'sipas_5_28_master_src:';

$config['upload_staf_config'] = array(
    'imagePath' => './data/staf/',
    'imageDefaultPath' => './assets/staf_default/',
    'imageSmallName' => 'thumb',
    'imageSmallSizeWidth' => '32',
    'imageSmallSizeHeight' => '32',
    'imageBigSizeWidth' => '200',
    'imageBigSizeHeight' => '200',
    'imageExt' => 'jpg'
);

$config['upload_staf_ttd_config'] = array(
    'imagePath' => './data/staf_ttd/',
    'imageDefaultPath' => './assets/staf_default/',
    'imageSmallName' => 'thumb',
    'imageSmallSizeWidth' => '32',
    'imageSmallSizeHeight' => '32',
    'imageBigSizeWidth' => '200',
    'imageBigSizeHeight' => '200',
    'imageExt' => 'png'
);

$config['worker_mode'] = 'local'; // local = worker tidak aktif, prod = worker aktif

$config['queueServer'] = array(
    // 'host'=>'sipassoho.sekawanmedia.co.id',
    // 'host'=> null,
    'host' => null,
    'port' => '11300'
);

$config['useredis'] = 0; // 1 = true OR 0 = false

if ($config['useredis']  == 1) {
    $config['redis'] = new Redis();
    $config['redis']->connect('127.0.0.1', 6379);
    $config['redis']->auth("password");
} else {
    $config['redis'] = null;
}

$config['queueServer_notifType'] = array(
    'notif_sipas_publish_5_28_timah' //notif_v4_0
);
$config['queueServer_notifTypeRedis'] = array(
    'redis_sipas_publish_5_28_timah'
);

$config['queueServer_typeDisposisi'] = array(
    'disposisi_publish_5_28_timah'
);

$config['queueServer_typeImasuk'] = array(
    'imasuk_publish_5_28_timah'
);

$config['queueServer_tubeKoreksi'] = array(
    'disposisi_publish_5_28_timah'
);

$config['queueServer_tubeKeputusan'] = array(
    'keputusan_publish_5_28_timah'
);

$config['bug_reporting_mobile'] = APPPATH . 'logs/mobile/';
$config['mobile_version'] = array(
    '5.01',
    '5.10',
    '5.20',
    '5.21',
    '5.22',
    '5.23',
    '5.24',
    '5.25',
    '5.26',
    '5.30'
);

// ------======== Redis Cache Config ========--------- //
$config['useRedisCache'] = false;
$config['debugCache'] = false;
$config['redisHost'] = '127.0.0.1';
$config['redisPort'] = '6379';
$config['redisAuth'] = 'password';
$config['redisMasterDbCachePrefix'] = 'sipas_5_28_master_src';
$config['redisMasterDbCache'] = 1;
$config['redisNsSeparator'] = ':';
// ------========--------------------========--------- //

// ---------------- Emitter Config DB ---------------- //
$config['redisEmitterConfigDb'] = '2';
$config['redisEmitterConfigPrefix'] = 'teo_5_dev';

// --------==================================--------- //

// --------====== Emitter Server Config ======-------- //
$config['emitterServiceScheme'] = 'https://';
$config['emitterServiceHost'] = 'sse-sipaslab.sekawanmedia.co.id';
$config['emitterServicePort'] = '';
$config['emitterPushEventApi'] = '/push-event';
$config['useSSE'] = false;

// --------==================================--------- //

// --------====== Emitter Config ======-------- //
$config['emitterEventGroup'] = array('Unit', 'staf', 'asistensi');
$config['emitterEventSeparator'] = '/';
$config['emitterReceiveEventName'] = 'receive';

// --------==================================--------- //

$config['queueServer_formatTube'] = array(
    'logMessageFormat' => 'NOTIF {status} {payload}',
    'logPath' => APPPATH . 'logs/notif/',
    'logStrategy' => 'daily'
);
$config['queueServer_formatTubeRedis'] = array(
    'logMessageFormat' => 'REDIS {status} {payload}',
    'logPath' => APPPATH . 'logs/redis/',
    'logStrategy' => 'daily'
);
$config['queueServer_formatTubeDisposisi'] = array(
    'logMessageFormat' => 'DISPOSISI {status} {payload}',
    'logPath' => APPPATH . 'logs/disposisi/',
    'logStrategy' => 'daily'
);
$config['queueServer_formatTubeImasuk'] = array(
    'logMessageFormat' => 'DISPOSISI {status} {payload}',
    'logPath' => APPPATH . 'logs/imasuk/',
    'logStrategy' => 'daily'
);
$config['queueServer_formatTubeKoreksi'] = array(
    'logMessageFormat' => 'DISPOSISI {status} {payload}',
    'logPath' => APPPATH . 'logs/koreksi/',
    'logStrategy' => 'daily'
);
$config['queueServer_formatTubeKeputusan'] = array(
    'logMessageFormat' => 'KEPUTUSAN {status} {payload}',
    'logPath' => APPPATH . 'logs/keputusan/',
    'logStrategy' => 'daily'
);
$config['queueServer_notifTube'] = 'notif_sipas_publish_5_28_timah'; //notif_v4_0
$config['queueServer_notifTubeRedis'] = 'redis_sipas_publish_5_28_timah';
$config['queueServer_tubeDisposisi'] = 'disposisi_publish_5_28_timah';
$config['queueServer_tubeImasuk'] = 'imasuk_publish_5_28_timah';
$config['queueServer_tubeKoreksi'] = 'koreksi_publish_5_28_timah';
$config['queueServer_tubeKeputusan'] = 'keputusan_publish_5_28_timah';
$config['queueServer_mailTube'] = 'mail';
$config['queueServer_smsTube'] = 'sms';
//=======================================//
//         Blacklist Notifikasi          //
//=======================================//
$config['blacklist_notif_email'] = array(
    'akun' => array(),
    'email' => array()
);

$config['blacklist_notif_inapp'] = array(
    'akun' => array(),
    'alat' => array()
);

$config['blacklist_hakakses'] = array(
    array(
        'akun' => null,
        'hakakses' => array()
    )
);
//---------------------------------------//

//=======================================//
//          Worker notif Email           //
//=======================================//
$config['queueServer_tubeName_notifEmail'] = 'notif_email_v5';
$config['queueServer_logConfig_notifEmail'] = array(
    'logMessageFormat' => 'notif email {status} {payload}',
    'logPath' => APPPATH . 'logs/notif_email/',
    'logStrategy' => 'daily'
);
//---------------------------------------//

$config['notif_token'] = 'AAAAlCG7Zq4:APA91bFZxlviV8ci5QvR8LCZyDrXEz3769bIg5_bggxB48vhP0DHvlEqBA94fi0EUFANU9xRHECDUVvCPtVn_hMIu__QL8EEc4pQoeaDyMq4JeeuwSr56vX3WLZA0thEKTLn3lB0B1T-';
$config['notif_url'] = 'https://fcm.googleapis.com/fcm/send';

$config['upload_config'] = array(
    'upload_path'   => './data/dokumen/',
    'allowed_types' => 'gif|jpg|jpeg|png|bmp|tiff|doc|docx|xls|xlsx|pdf|rtf|txt|ppt|pptx|pps|zip|rar|7z',
    'allowed_types_penerima' => 'xls|xlsx',
    'max_size'      => 200000,
    'encrypt_name'  => TRUE,
    'overwrite'     => TRUE
);
$config['preview_config'] = array(
    'maintain_ratio'    => TRUE,
    'width'             => 220,
    'height'            => 300
);

$config['mime_previewable'] = array(
    'image/jpg',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/x-png',
);

$config['mime_imageconstructor'] = array(
    'image/jpeg'            => 'imagecreatefromjpeg',
    'image/pjpeg'           => 'imagecreatefromjpeg',
    'image/png'             => 'imagecreatefrompng',
    'image/x-png'           => 'imagecreatefrompng',
    'image/gif'             => 'imagecreatefromgif',
    'image/bmp'             => 'imagecreatefromwbmp',
    'image/x-windows-bmp'   => 'imagecreatefromwbmp',
);

$config['previewUrl'] = 'server.php/sipas/dokumen/preview/{dokumen_id}';
$config['viewUrl'] = 'server.php/sipas/dokumen/view/{dokumen_id}';
$config['downloadUrl'] = 'server.php/sipas/dokumen/download/{dokumen_id}';
$config['extPath'] = 'assets/surat_default/ext{ext}.png';
$config['extDefaultPath'] = 'assets/surat_default/ext.default.png';

$config['logopath'] = './data/sistem/';
$config['leftlogo_url'] = '/sipas/asset/inst_logo/template_header_leftlogo.png';
$config['rightlogo_url'] = '/sipas/asset/inst_logo/template_header_rightlogo.png';
$config['logo1_url'] = '/sipas/asset/inst_logo/template_header_logo1.png';
$config['logo2_url'] = '/sipas/asset/inst_logo/template_header_logo2.png';
$config['logo3_url'] = '/sipas/asset/inst_logo/template_header_logo3.png';
$config['logo4_url'] = '/sipas/asset/inst_logo/template_header_logo4.png';
$config['logo5_url'] = '/sipas/asset/inst_logo/template_header_logo5.png';

$config['leftlogo_path'] = 'data/sistem/template_header_leftlogo.png';
$config['rightlogo_path'] = 'data/sistem/template_header_rightlogo.png';
$config['logo1_path'] = 'data/sistem/template_header_logo1.png';
$config['logo2_path'] = 'data/sistem/template_header_logo2.png';
$config['logo3_path'] = 'data/sistem/template_header_logo3.png';
$config['logo4_path'] = 'data/sistem/template_header_logo4.png';
$config['logo5_path'] = 'data/sistem/template_header_logo5.png';
$config['logo_draft_path'] = 'data/sistem/draft-logo.png';


$config['chiper'] = 'sekawanmediainformatika';
// patch for v3.1 security concept 
$config['token_chiper'] = 'sekawanmediainformatika';
// $config['token_key'] = 'Client-Security-Token';
$config['token_key'] = 'Authorization';

$config['access_route'] = array(
    // 0 = public
    // 1 = only for authenticated user
    // 2 = only for authorized user
    // 3 = only for current user
    // 4 = only for system
    //

    //account
    array('session',                                        1, array(
        'sipas/account',
        'sipas/account/index',
        'sipas/account/wakil',
        'sipas/account/profile_update', /*new*/
        'sipas/account/surat_keluar',
        'sipas/account/surat_keluar/scope',
        'sipas/account/surat_keluar/read',
        'sipas/account/surat_ikeluar/read',
        'sipas/account/surat_keputusan/read',
        'sipas/account/masuk',
        'sipas/account/masuk_blmbaca',
        'sipas/account/masuk_baca',
        'sipas/account/masuk_terus',
        'sipas/account/koreksi',
        'sipas/account/koreksi_blmtindak',
        'sipas/account/koreksi_setuju',
        'sipas/account/koreksi_tolak',
        'sipas/account/disposisi',
        'sipas/account/disposisi_blmbaca',
        'sipas/account/disposisi_baca',
        'sipas/account/disposisi_terus',
        'sipas/account/notadinas',
        'sipas/account/notadinas_blmbaca',
        'sipas/account/notadinas_baca',
        'sipas/account/notadinas_terus',
        'sipas/account/pengajuan_koreksi',
        'sipas/account/monitored_staf',
        'sipas/account/asistensi',
        'sipas/account/asistensi/masuk',
        'sipas/account/asistensi/disposisi',
        'sipas/account/asistensi/disposisi_blmbaca',
        'sipas/account/asistensi/disposisi_baca',
        'sipas/account/asistensi/disposisi_terus',
        'sipas/account/asistensi/notadinas',
        'sipas/account/asistensi/notadinas/notadinas_blmbaca',
        'sipas/account/asistensi/notadinas/notadinas_baca',
        'sipas/account/asistensi/notadinas/notadinas_terus',
        'sipas/account/asistensi/masuk_baca',
        'sipas/account/asistensi/masuk_blmbaca',
        'sipas/account/asistensi/masuk_terus',
        'sipas/account/asistensi/riwayat_aktif',
        'sipas/account/asistensi/koreksi',
        'sipas/account/asistensi/koreksi_blmtindak',
        'sipas/account/asistensi/koreksi_setuju',
        'sipas/account/asistensi/koreksi_tolak',
        'sipas/account/riwayat',
        'sipas/account/riwayat_aktif',
        'sipas/account/riwayat_nonaktif',
        'sipas/account/verify_token',
        'sipas/account/requestDevice',
        'sipas/account/changepassword',
        'sipas/account/gen_password',
        'sipas/account/scope',
        'sipas/account/scope/1',
        'sipas/account/notification', /*checked-m*/
        'sipas/account/notification/mobile',
        'sipas/account/newmail',
        'sipas/account/owner'
    )),

    array('session',                                        0, array(
        'sipas/account/login/token',
        'sipas/account/login',
        'sipas/account/logout',
        'sipas/account/registerToken',
        'sipas/account/removeDevice',
        'sipas/account/checkToken',
        'sipas/account/deviceLogin',
        'sipas/account/reset_login/web',
        'sipas/account/reset_login/mobile',
        'sipas/account/info/logintime',
        'sipas/account/info/user',
        'sipas/account/info/profile',
        'sipas/account/info/rules',
        'sipas/account/info',
        'sipas/account/pimpinan', //tom get pimpinan
        'sipas/account/info/session'
    )), /*checked-m*/

    //addon
    //akses
    array('hakakses',                                       1, array(
        'sipas/akses',
        'sipas/akses/index',
        'sipas/akses/read'
    )), /*checked-m*/
    array('hakakses_update',                                2, array('sipas/akses/update')), /*checked-m*/
    //aksi
    array('aksi_insert',                                    2, array('sipas/aksi/create')),
    array('aksi_update',                                    2, array('sipas/aksi/update')),
    array('aksi_delete',                                    2, array('sipas/aksi/destroy')),
    array('aksi',                                           1, array(
        'sipas/aksi',
        'sipas/aksi/index',
        'sipas/aksi/read',
        'sipas/aksi/aktif',
        'sipas/aksi/nonaktif'
    )),/*has been checked by Luqni Maulana*/
    //akun
    array('staf_insert',                                    2, array('sipas/akun/create')),
    array('staf_update',                                    2, array('sipas/akun/update')),
    array('staf_delete',                                    2, array('sipas/akun/destroy')),
    array('staf',                                           1, array(
        'sipas/akun',
        'sipas/akun/index',
        'sipas/akun/read', /*checked-m*/
        'sipas/akun/aktif',
        'sipas/akun/nonaktif'
    )),
    //api
    array('api_info',                                       0, array(
        'sipas/api',
        'sipas/api/index',
        'sipas/api/info',
        'sipas/kotak_masuk/tugassaya_admin'
    )), /*checked-m*/
    //arsip
    array('arsip',                                          1, array('sipas/arsip/create')), /*checked-m*/
    array('arsip',                                          1, array('sipas/arsip/update')), /*checked-m*/
    array('arsip',                                          1, array('sipas/arsip/destroy')), /*checked-m*/
    array('arsip',                                          0, array(
        'arsipbebas',
        'sipas/arsip/link'
    )),
    array('arsip',                                          1, array(
        'sipas/arsip',
        'sipas/arsip/index',
        'sipas/arsip/read',
        'sipas/arsip/hidup',
        'sipas/arsip/bagi',
        'sipas/arsip/umum',
        'sipas/arsip/arsip_auth',
        'sipas/arsip/arsip_duplicate',
        'sipas/arsip/report',
        'sipas/arsip/report_rekap',
        'sipas/arsip/generateField'
    )),/*has been checked by Luqni Maulana*/
    //asset
    array('asset',                                          1, array(
        'sipas/asset/css',
        'sipas/asset/img',
        'sipas/asset/js',
        'sipas/asset/inst_logo/template_header_logo1.png',
        'sipas/asset/inst_logo/template_header_logo2.png',
        'sipas/asset/inst_logo/template_header_logo3.png',
        'sipas/asset/inst_logo/template_header_logo4.png',
        'sipas/asset/inst_logo/template_header_logo5.png',
        'sipas/asset'
    )),/*has been checked by Luqni Maulana*/
    //backup
    array('backup',                                         1, array('sipas/backup/create')),
    array('backup',                                         1, array('sipas/backup/update')),
    array('backup',                                         1, array(
        'sipas/backup',
        'sipas/backup/index',
        'sipas/backup/read'
    )), /*checked-m*/
    //bank
    array('bank',                                           1, array(
        'sipas/bank',
        'sipas/bank/index',
        'sipas/bank/read',
        'sipas/bank/read/0',
        'sipas/bank/read/1',
        'sipas/bank/read/2',
        'sipas/bank/read/3',
        'sipas/bank/read/4',
        'sipas/bank/read/6',
        'sipas/bank/aktif/0',
        'sipas/bank/aktif/1',
        'sipas/bank/aktif/2',
        'sipas/bank/aktif/3',
        'sipas/bank/aktif/4',
        'sipas/bank/nonaktif/0',
        'sipas/bank/nonaktif/1',
        'sipas/bank/nonaktif/2',
        'sipas/bank/nonaktif/3',
        'sipas/bank/nonaktif/4',/*has been checked by Luqni Maulana*/
        'sipas/bank/batal_nomor/0',
        'sipas/bank/batal_nomor/1',
        'sipas/bank/batal_nomor/2',
        'sipas/bank/batal_nomor/3',
        'sipas/bank/batal_nomor/4',
        'sipas/bank/salin_nomor/0',
        'sipas/bank/salin_nomor/1',
        'sipas/bank/salin_nomor/2',
        'sipas/bank/salin_nomor/3',
        'sipas/bank/salin_nomor/4',
        'sipas/bank/musnah/0',
        'sipas/bank/musnah/1',
        'sipas/bank/musnah/2',
        'sipas/bank/musnah/3',
        'sipas/bank/musnah/4',
        'sipas/bank/arsip/0',
        'sipas/bank/arsip/1',
        'sipas/bank/arsip/2',
        'sipas/bank/arsip/3',
        'sipas/bank/arsip/4'
    )),
    //beranda
    array('beranda',                                        1, array(
        'sipas/beranda',
        'sipas/beranda/index',
        'sipas/beranda/surat_masuk',
        'sipas/beranda/suratcount',
        'sipas/beranda/suratcount/chart'
    )),/*has been checked by Luqni Maulana*/
    //buktikirim
    array('buktikirim',                                     2, array('sipas/buktikirim/create')),
    array('buktikirim',                                     2, array('sipas/buktikirim/update')),
    array('buktikirim',                                     2, array('sipas/buktikirim/destroy')),
    array('buktikirim',                                     1, array(
        'sipas/buktikirim',
        'sipas/buktikirim/index',
        'sipas/buktikirim/read'
    )), /*checked-m*/
    //dasbor
    array('rekap_dashboard',                                1, array(
        'sipas/dasbor',
        'sipas/dasbor/index',
        'sipas/dasbor/surat_masuk',
        'sipas/dasbor/surat_keluar',
        'sipas/dasbor/disposisi_masuk',
        'sipas/dasbor/chart',
        'sipas/dasbor/get_dashboard'
    )),/*has been checked by Luqni Maulana*/
    //disposisi
    array('disposisi',                                      1, array('sipas/disposisi/create')),
    array('disposisi',                                      1, array('sipas/disposisi/update')),
    array('disposisi',                                      1, array(
        'sipas/disposisi',
        'sipas/disposisi/index',
        'sipas/disposisi/read',
        'sipas/disposisi/riwayat',
        'sipas/disposisi/cabut_trace',
        'sipas/disposisi/cabut_all',
        'sipas/disposisi/cabut_unread',
        'sipas/disposisi/report',
        'sipas/disposisi/next',
        'sipas/disposisi/baca_aksi',
        'sipas/disposisi/next/code'
    )), /*checked-m*/
    //disposisi_masuk
    array('disposisi',                                      1, array('sipas/disposisi_masuk/update')), /*checked-m*/
    array('disposisi',                                      1, array(
        'sipas/disposisi_masuk',
        'sipas/disposisi_masuk/index',
        'sipas/disposisi_masuk/read',
        'sipas/disposisi_masuk/report',
        'sipas/disposisi_masuk/isexist',
        'sipas/disposisi_masuk/isexist_penerima',
        'sipas/disposisi_masuk/isexist_session', /*checked-m*/
        'sipas/disposisi_masuk/pengingat_asisten',
        'sipas/disposisi_masuk/request_berkas'
    )),
    //disposisi_masuk_log
    array('disposisi',                                      1, array('sipas/disposisi_masuk_log/create')), /*checked-m*/
    array('disposisi',                                      1, array(
        'sipas/disposisi_masuk_log',
        'sipas/disposisi_masuk_log/index',
        'sipas/disposisi_masuk_log/generate_id',
        'sipas/disposisi_masuk_log/respon',
        'sipas/disposisi_masuk_log/read'
    )), /*checked-m*/
    //disposisi_referensi
    array('disposisi',                                      1, array(
        'sipas/disposisi_referensi',
        'sipas/disposisi_referensi/index',
        'sipas/disposisi_referensi/read'
    )), /*checked-m*/
    //disposisi_riwayat
    array('riwayat_disposisi',                              1, array(
        'sipas/disposisi_riwayat',
        'sipas/disposisi_riwayat/index',
        'sipas/disposisi_riwayat/read'
    )), /*checked-m*/
    //dokumen
    array('dokumen',                                        1, array(
        'sipas/dokumen/create',
        'sipas/dokumen/create/disposisi',
        'sipas/dokumen/create/dokumen',
        'sipas/dokumen/create/link',
        'sipas/dokumen/create/sdoc',
        'sipas/dokumen/generateTemplate',
        'sipas/dokumen/dokumen',
        'sipas/dokumen/duplicate_dok',
        'sipas/dokumen/link',
        'sipas/dokumen/preview_sdoc',
        'sipas/dokumen/sdoc'
    )), /*checked-m*/
    array('dokumen',                                        1, array(
        'sipas/dokumen/update',
        'sipas/dokumen/update/dokumen',
        'sipas/dokumen/update/disposisi',
        'sipas/dokumen/update/link',
        'sipas/dokumen/update/sdoc', /*checked-m*/
        'sipas/dokumen/update/rename'
    )),
    array('dokumen',                                        1, array('sipas/dokumen/create_scan')), /*checked-m*/
    array('dokumen',                                        1, array('sipas/dokumen/update_scan')), /*checked-m*/
    array('dokumen',                                        1, array(
        'sipas/dokumen/destroy',
        'sipas/dokumen/destroy/dokumen',
        'sipas/dokumen/destroy/link',
        'sipas/dokumen/destroy/sdoc'
    )), /*checked-m*/
    array('dokumen',                                        0, array(
        'sipas/dokumen/preview',
        'sipas/dokumen/printSdoc'
    )),
    array('dokumen',                                        1, array(
        'sipas/dokumen',
        'sipas/dokumen/index',
        'sipas/dokumen/read',
        'sipas/dokumen/view',
        'sipas/dokumen/download',
        'sipas/dokumen/dokumen',
        'sipas/dokumen/link',
        'sipas/dokumen/sdoc',
        'sipas/dokumen/duplicate',
        'sipas/dokumen/read_docs_kolektif',
        'sipas/dokumen/isMaxs'
    )), /*checked-m*/
    //dokumen_log
    array('dokumen',                                        1, array(
        'sipas/dokumen_log',
        'sipas/dokumen_log/index',
        'sipas/dokumen_log/read',
        'sipas/dokumen_log/read/trace',
        'sipas/dokumen_log/report'
    )),/*has been checked by Luqni Maulana*/
    //ekspedisi
    array('ekspedisi_insert',                               2, array('sipas/ekspedisi/create')),
    array('ekspedisi_update',                               2, array('sipas/ekspedisi/update')),
    array('ekspedisi_delete',                               2, array('sipas/ekspedisi/destroy')),
    array('ekspedisi',                                      1, array(
        'sipas/ekspedisi',
        'sipas/ekspedisi/index',
        'sipas/ekspedisi/read',
        'sipas/ekspedisi/aktif',
        'sipas/ekspedisi/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //email
    array('email_queue',                                    1, array(
        'sipas/email/send_queue',
        'sipas/email/retry_queue'
    )),
    array('email_queue',                                    1, array(
        'sipas/email/index',
        'sipas/email/getEmailConfig',
        'sipas/email/test'
    )), /*checked-m*/
    //fitur
    array('fitur',                                          1, array('sipas/fitur/create')),
    array('fitur',                                          1, array('sipas/fitur/update')),
    array('fitur',                                          1, array('sipas/fitur/destroy')),
    array('fitur',                                          1, array(
        'sipas/fitur',
        'sipas/fitur/index',
        'sipas/fitur/read'
    )), /*checked-m*/
    //help
    array('support',                                        1, array(
        'sipas/help',
        'sipas/help/index',
        'sipas/help/help'
    )), /*checked-m*/
    //itipe
    array('tipe_surat_internal',                            1, array(
        'sipas/itipe',
        'sipas/itipe/index',
        'sipas/itipe/read',
        'sipas/itipe/combo',
        'sipas/itipe/aktif',
        'sipas/itipe/nonaktif'
    )), /*checked-m*/

    //jabatan
    array('jabatan_insert',                                 2, array('sipas/jabatan/create')),
    array('jabatan_update',                                 2, array('sipas/jabatan/update')),
    array('jabatan_delete',                                 2, array('sipas/jabatan/destroy')),
    array('jabatan',                                        1, array(
        'sipas/jabatan',
        'sipas/jabatan/index',
        'sipas/jabatan/read',
        'sipas/jabatan/read/tree',
        'sipas/jabatan/aktif',
        'sipas/jabatan/aktif/tree',
        'sipas/jabatan/nonaktif',
        'sipas/jabatan/nonaktif/tree', /*has been checked by Luqni Maulana*/
        'sipas/jabatan/wakil',
        'sipas/jabatan/penerima',
        'sipas/jabatan/penerima/recent',
        'sipas/jabatan/penerima/jabatan',
        'sipas/jabatan/penerima/available'
    )),

    //jabatan_tim
    array('jabatan_tim_insert',                                2, array('sipas/jabatan_tim/create')),
    array('jabatan_tim_update',                                2, array('sipas/jabatan_tim/update')),
    array('jabatan_tim_delete',                                2, array('sipas/jabatan_tim/destroy')),
    array('jabatan_tim',                                       1, array(
        'sipas/jabatan_tim',
        'sipas/jabatan_tim/index',
        'sipas/jabatan_tim/read'
    )),/*has been checked by Luqni Maulana*/

    //jabatan_tim_anggota
    array('jabatan_tim',                                       1, array('sipas/jabatan_tim_anggota/create')),
    array('jabatan_tim',                                       1, array('sipas/jabatan_tim_anggota/update')),
    array('jabatan_tim',                                       1, array('sipas/jabatan_tim_anggota/destroy')),
    array('jabatan_tim',                                       1, array(
        'sipas/jabatan_tim_anggota',
        'sipas/jabatan_tim_anggota/index',
        'sipas/jabatan_tim_anggota/read',/*has been checked by Luqni Maulana*/
        'sipas/jabatan_tim_anggota/readKelompok'
    )),

    //jabatan_wakil
    array('jabatan_wakil',                                  1, array('sipas/jabatan_wakil/create')),
    array('jabatan_wakil',                                  1, array('sipas/jabatan_wakil/update')),
    array('jabatan_wakil',                                  1, array('sipas/jabatan_wakil/destroy')),
    array('jabatan_wakil',                                  1, array(
        'sipas/jabatan_wakil',
        'sipas/jabatan_wakil/index',
        'sipas/jabatan_wakil/read',
        'sipas/jabatan_wakil/combo',
        'sipas/jabatan_wakil/combo/available',
        'sipas/jabatan_wakil/atasan',
        'sipas/jabatan_wakil/asisten'
    )),

    //jenis
    array('jenis_insert',                                   2, array('sipas/jenis/create')),
    array('jenis_update',                                   2, array('sipas/jenis/update')),
    array('jenis_delete',                                   2, array('sipas/jenis/destroy')),
    array('jenis',                                          1, array(
        'sipas/jenis',
        'sipas/jenis/is_useawal',
        'sipas/jenis/index',
        'sipas/jenis/read',
        'sipas/jenis/aktif',
        'sipas/jenis/perunit_aktif',
        'sipas/jenis/perunit',
        'sipas/jenis/jenis_perunit',
        'sipas/jenis/combo',
        'sipas/jenis/nonaktif',
        'sipas/jenis/masterSubJenis'
    )),/*has been checked by Luqni Maulana*/

    //jenis_telaah
    array('jenis_telaah_insert',                            2, array('sipas/jenis_telaah/create')),
    array('jenis_telaah_delete',                            2, array('sipas/jenis_telaah/destroy')),
    array('jenis_telaah_update',                            2, array('sipas/jenis_telaah/update')),
    array('jenis_telaah',                                   1, array(
        'sipas/jenis_telaah',
        'sipas/jenis_telaah/index',
        'sipas/jenis_telaah/read'
    )), /*checked-m*/
    //kelas
    array('kelas_insert',                                   2, array('sipas/kelas/create')),
    array('kelas_update',                                   2, array('sipas/kelas/update')),
    array('kelas_delete',                                   2, array('sipas/kelas/destroy')),
    array('kelas',                                          1, array(
        'sipas/kelas',
        'sipas/kelas/index',
        'sipas/kelas/read',
        'sipas/kelas/readJenis',
        'sipas/kelas/read/tree',
        'sipas/kelas/aktif',
        'sipas/kelas/aktif/tree',
        'sipas/kelas/nonaktif',
        'sipas/kelas/nonaktif/tree'
    )),/*has been checked by Luqni Maulana*/

    //golongan
    array('golongan_insert',                               2, array('sipas/golongan/create')),
    array('golongan_update',                               2, array('sipas/golongan/update')),
    array('golongan_delete',                               2, array('sipas/golongan/destroy')),
    array('golongan',                                      1, array(
        'sipas/golongan',
        'sipas/golongan/index',
        'sipas/golongan/read',
        'sipas/golongan/aktif',
        'sipas/golongan/nonaktif'
    )),

    //klise
    array('template_insert',                                2, array('sipas/klise/create')),
    array('template_update',                                2, array('sipas/klise/update')),
    array('template_delete',                                2, array('sipas/klise/destroy')),
    array('surat_template',                                 1, array(
        'sipas/klise',
        'sipas/klise/transporter',
        'sipas/klise/index',
        'sipas/klise/read',
        'sipas/klise/aktif',
        'sipas/klise/nonaktif',
        'sipas/klise/template',
        'sipas/klise/preview',
        'sipas/klise/download'
    )),/*has been checked by Luqni Maulana*/

    //klise_kelompok
    array('surat_template',                                 1, array('sipas/klise_kelompok/create')),
    array('surat_template',                                 1, array('sipas/klise_kelompok/update')),
    array('surat_template',                                 1, array('sipas/klise_kelompok/destroy')),
    array('surat_template',                                 1, array(
        'sipas/klise_kelompok',
        'sipas/klise_kelompok/index',
        'sipas/klise_kelompok/read'
    )), /*checked-m*/
    //kontak
    array('kontak_insert',                                  2, array('sipas/kontak/create')),
    array('kontak_update',                                  2, array('sipas/kontak/update')),
    array('kontak_delete',                                  2, array('sipas/kontak/destroy')),
    array('kontak',                                         1, array(
        'sipas/kontak',
        'sipas/kontak/index',
        'sipas/kontak/read',
        'sipas/kontak/aktif',
        'sipas/kontak/nonaktif'
    )), /*checked-m*/
    //koreksi
    array('koreksi',                                        1, array('sipas/koreksi/update')),
    array('koreksi',                                        1, array(
        'sipas/koreksi',
        'sipas/koreksi/index',
        'sipas/koreksi/read'
    )), /*checked-m*/
    //koreksi_masuk
    array('koreksi',                                        1, array('sipas/koreksi_masuk/update')),
    array('koreksi',                                        1, array('sipas/koreksi_masuk/updateKoreksi')),
    array('koreksi',                                        1, array(
        'sipas/koreksi_masuk',
        'sipas/koreksi_masuk/index',
        'sipas/koreksi_masuk/read',
        'sipas/koreksi_masuk/riwayat',
        'sipas/koreksi_masuk/get_ttd',
        'sipas/koreksi_masuk/saveTtd',
        'sipas/koreksi_masuk/checkImage',
        'sipas/koreksi_masuk/report',
        'sipas/koreksi_masuk/penerima',
        'sipas/koreksi_masuk/getIndex',
        'sipas/koreksi_masuk/traceKoreksi',
        'sipas/koreksi_masuk/traceIdKoreksi'
    )),/*has been checked by Luqni Maulana*/
    //korespondensi
    array('korespondensi_surat',                            1, array('sipas/korespondensi/create')),
    array('korespondensi_surat',                            1, array(
        'sipas/korespondensi',
        'sipas/korespondensi/index',
        'sipas/korespondensi/read',
        'sipas/korespondensi/read/list',
        'sipas/korespondensi/eksternal',
        'sipas/korespondensi/eksternal/list',
        'sipas/korespondensi/internal',
        'sipas/korespondensi/internal/list',
        'sipas/korespondensi/report',
        'sipas/korespondensi/report/all',
        'sipas/korespondensi/reSetting',
        'sipas/korespondensi/perihal'
    )), /*checked-m*/
    //lacak_surat
    /*
    array('lacak_surat',                                    1, array('sipas/lacak_surat',
                                                                     'sipas/lacak_surat/index',
                                                                     'sipas/lacak_surat/read',
                                                                     'sipas/lacak_surat/report')), */
    //lokasi
    array('lokasi_insert',                                  2, array('sipas/lokasi/create')),
    array('lokasi_update',                                  2, array('sipas/lokasi/update')),
    array('lokasi_delete',                                  2, array('sipas/lokasi/destroy')),
    array('lokasi',                                         1, array(
        'sipas/lokasi',
        'sipas/lokasi/index',
        'sipas/lokasi/read',
        'sipas/lokasi/aktif',
        'sipas/lokasi/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //media
    array('media_insert',                                   2, array('sipas/media/create')),
    array('media_update',                                   2, array('sipas/media/update')),
    array('media_delete',                                   2, array('sipas/media/destroy')),
    array('media',                                          1, array(
        'sipas/media',
        'sipas/media/index',
        'sipas/media/read',
        'sipas/media/aktif',
        'sipas/media/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //mobile
    array('mobile',                                         1, array(
        'sipas/mobile',
        'sipas/mobile/index',
        'sipas/mobile/info'
    )),/*has been checked by Luqni Maulana*/
    array('mobile',                                         0, array('sipas/mobile/download_manualbook')),
    //notifikasi
    array('notifikasi',                                     1, array('sipas/notifikasi/create')),
    array('notifikasi',                                     1, array('sipas/notifikasi/update')),
    array('notifikasi',                                     1, array(
        'sipas/notifikasi',
        'sipas/notifikasi/index',
        'sipas/notifikasi/notifikasi_test',
        'sipas/notifikasi/notifikasi_test/email',
        'sipas/notifikasi/getEmailConfig',
        'sipas/notifikasi/notifikasi_queue',
        'sipas/notifikasi/notifikasi_retry'
    )), /*checked-m*/
    //pelaporan
    array('pelaporan',                                      1, array(
        'sipas/pelaporan',
        'sipas/pelaporan/index',
        'sipas/pelaporan/chart_surat_masuk',
        'sipas/pelaporan/chart_surat_tindaklanjut',
        'sipas/pelaporan/chart_surat_topurgent',
        'sipas/pelaporan/rekap_surat_masuk',
        'sipas/pelaporan/rekap_surat_keluar',
        'sipas/pelaporan/rekap_retensi',
        'sipas/pelaporan/chart_eksternal_bulanan',
        'sipas/pelaporan/chart_eksternal_harian',
        'sipas/pelaporan/dashboard',
        'sipas/pelaporan/get_last_date',
        'sipas/pelaporan/get_week',
        'sipas/pelaporan/get_date_range'
    )),/*has been checked by Luqni Maulana*/
    //pelaporan_sla
    array('pelaporan',                                      1, array(
        'sipas/pelaporan_sla',
        'sipas/pelaporan_sla/report_sla_request',
        'sipas/pelaporan_sla/report_sla_proses',
        'sipas/pelaporan_sla/report_sla_selesai',
        'sipas/pelaporan_sla/report_sla_tolak',
        'sipas/pelaporan_sla/report_sla_kumulatif',
        'sipas/pelaporan_sla/get_last_date',
        'sipas/pelaporan_sla/get_week',
        'sipas/pelaporan_sla/next_date',
        'sipas/pelaporan_sla/get_date_range'
    )),/*has been checked by Luqni Maulana*/
    //pengaturan
    array('pengaturan_sistem',                              1, array(
        'sipas/pengaturan',
        'sipas/pengaturan/index',
        'sipas/pengaturan/get_setting',
        'sipas/pengaturan/set_setting',
        'sipas/pengaturan/get_image',
        'sipas/pengaturan/get_image_logo',
        'sipas/pengaturan/get_image/template_header_leftlogo',
        'sipas/pengaturan/get_image/template_header_rightlogo',
        'sipas/pengaturan/set_image',
        'sipas/pengaturan/set_image/template_header_logo1',
        'sipas/pengaturan/set_image/template_header_logo2',
        'sipas/pengaturan/set_image/template_header_logo3',
        'sipas/pengaturan/set_image/template_header_logo4',
        'sipas/pengaturan/set_image/template_header_logo5',
        'sipas/pengaturan/get_surat_penomoran_legenda',
        'sipas/pengaturan/get_image/template_header_logo1',
        'sipas/pengaturan/get_image/template_header_logo2',
        'sipas/pengaturan/get_image/template_header_logo3',
        'sipas/pengaturan/get_image/template_header_logo4',
        'sipas/pengaturan/get_image/template_header_logo5',
        'sipas/pengaturan/getSettingByCode'
    )),/*has been checked by Luqni Maulana*/
    //peran
    array('hakakses_insert',                                2, array('sipas/peran/create')),
    array('hakakses_update',                                2, array('sipas/peran/update')),
    array('hakakses_delete',                                2, array('sipas/peran/destroy')),
    array('hakakses',                                       1, array(
        'sipas/peran',
        'sipas/peran/index',
        'sipas/peran/generate_id',
        'sipas/peran/read',
        'sipas/peran/aktif',
        'sipas/peran/nonaktif'
    )),/*has been checked by Luqni Maulana*/
    //perintah
    array('perintah_insert',                                2, array('sipas/perintah/create')),
    array('perintah_update',                                2, array('sipas/perintah/update')),
    array('perintah_delete',                                2, array('sipas/perintah/destroy')),
    array('perintah',                                       1, array(
        'sipas/perintah',
        'sipas/perintah/index',
        'sipas/perintah/read',
        'sipas/perintah/aktif',
        'sipas/perintah/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //prioritas
    array('prioritas_insert',                               2, array('sipas/prioritas/create')),
    array('prioritas_update',                               2, array('sipas/prioritas/update')),
    array('prioritas_delete',                               2, array('sipas/prioritas/destroy')),
    array('prioritas',                                      1, array(
        'sipas/prioritas',
        'sipas/prioritas/index',
        'sipas/prioritas/read',
        'sipas/prioritas/getHari',
        'sipas/prioritas/aktif',
        'sipas/prioritas/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //properti
    array('properti',                                       1, array(
        'sipas/properti',
        'sipas/properti/index',
        'sipas/properti/read'
    )), /*checked-m*/
    //properti_log
    array('properti',                                       1, array(
        'sipas/properti_log',
        'sipas/properti_log/index',
        'sipas/properti_log/read'
    )),/*has been checked by Luqni Maulana*/
    //report
    array('pelaporan',                                      1, array(
        'sipas/report',
        'sipas/report/index',
        'sipas/report/generate_report'
    )),/*has been checked by Luqni Maulana*/
    //retensi
    array('retensi_insert',                                 2, array('sipas/retensi/create')),
    array('retensi_update',                                 2, array('sipas/retensi/update')),
    array('retensi_delete',                                 2, array('sipas/retensi/destroy')),
    array('retensi',                                        1, array(
        'sipas/retensi',
        'sipas/retensi/index',
        'sipas/retensi/read',
        'sipas/retensi/aktif',
        'sipas/retensi/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //sifat
    array('sifat_insert',                                   2, array('sipas/sifat/create')),
    array('sifat_update',                                   2, array('sipas/sifat/update')),
    array('sifat_delete',                                   2, array('sipas/sifat/destroy')),
    array('sifat',                                          1, array(
        'sipas/sifat',
        'sipas/sifat/readrahasia',
        'sipas/sifat/index',
        'sipas/sifat/read',
        'sipas/sifat/aktif',
        'sipas/sifat/aktif/tree',
        'sipas/sifat/nonaktif',
        'sipas/sifat/nonaktif/tree'
    )),/*has been checked by Luqni Maulana*/

    //sipas_main
    /*
    array('',                                               1, array('sipas/sipas_main',
                                                                     'sipas/sipas_main/index',
                                                                     'sipas/sipas_main/unauth',
                                                                     'sipas/sipas_main/notfound')), */
    //sla
    array('sla_insert',                                     2, array('sipas/sla/create')),
    array('sla_update',                                     2, array('sipas/sla/update')),
    array('sla_delete',                                     2, array('sipas/sla/destroy')),
    array('sla',                                            1, array(
        'sipas/sla',
        'sipas/sla/index',
        'sipas/sla/read',
        'sipas/sla/aktif',
        'sipas/sla/nonaktif'
    )),/*has been checked by Luqni Maulana*/

    //sla_kuis
    array('sla_kuis',                                       1, array('sipas/sla_kuis/create')),
    array('sla_kuis',                                       1, array('sipas/sla_kuis/update')),
    array('sla_kuis',                                       1, array('sipas/sla_kuis/destroy')),
    array('sla_kuis',                                       1, array(
        'sipas/sla_kuis',
        'sipas/sla_kuis/index',
        'sipas/sla_kuis/read'
    )), /*checked-m*/

    //sla_rumus
    array('sla_rumus',                                      1, array('sipas/sla_rumus/create')),
    array('sla_rumus',                                      1, array('sipas/sla_rumus/update')),
    array('sla_rumus',                                      1, array('sipas/sla_rumus/destroy')),
    array('sla_rumus',                                      1, array(
        'sipas/sla_rumus',
        'sipas/sla_rumus/index',
        'sipas/sla_rumus/read'
    )),/*has been checked by Luqni Maulana*/
    //sla_ujian
    array('sla_ujian',                                      1, array('sipas/sla_ujian/create')),
    array('sla_ujian',                                      1, array('sipas/sla_ujian/update')),
    array('sla_ujian',                                      1, array('sipas/sla_ujian/destroy')),
    array('sla_ujian',                                      1, array(
        'sipas/sla_ujian',
        'sipas/sla_ujian/index',
        'sipas/sla_ujian/read'
    )), /*checked-m*/
    //sla_unit
    array('sla_unit_insert',                                2, array('sipas/sla_unit/create')),
    array('sla_unit',                                       1, array('sipas/sla_unit/update')),
    array('sla_unit',                                       1, array('sipas/sla_unit/destroy')),
    array('sla_unit',                                       1, array(
        'sipas/sla_unit',
        'sipas/sla_unit/index',
        'sipas/sla_unit/read',
        'sipas/sla_unit/default'
    )), /*has been checked by Luqni Maulana*/
    //sms_phones
    array('sms_phones',                                     1, array(
        'sipas/sms_phones',
        'sipas/sms_phones/index',
        'sipas/sms_phones/status',
        'sipas/sms_phones/check_status'
    )), /*checked-m*/
    //sms_test
    array('sms_test',                                       1, array(
        'sipas/sms_test',
        'sipas/sms_test/index',
        'sipas/sms_test/send_sms'
    )), /*checked-m*/
    //staf
    array('staf_insert',                                    2, array('sipas/staf/create')),
    array('staf_update',                                    2, array('sipas/staf/update')),
    array('staf_delete',                                    2, array('sipas/staf/destroy')),
    array('staf',                                           0, array(
        'sipas/staf/get_image',
        'sipas/staf/get_image/foto',
        'sipas/staf/get_image/ttd',
        'sipas/staf/get_image_logo_new',
        'sipas/staf/transporter_profil'
    )),
    array('staf',                                           1, array(
        'sipas/staf',
        'sipas/staf/index',
        'sipas/staf/read',
        'sipas/staf/aktif',
        'sipas/staf/nonaktif',
        'sipas/staf/penerima',
        'sipas/staf/penerima/recent',
        'sipas/staf/penerima/staf',
        'sipas/staf/penerima/unitkerja',
        'sipas/staf/penerima/available',
        'sipas/staf/penerima/jabatan',
        'sipas/staf/penerima_disposisi/recent',
        'sipas/staf/penerima_disposisi/staf',
        'sipas/staf/penerima_disposisi/unitkerja',
        'sipas/staf/penerima_disposisi/available',
        'sipas/staf/penerima_disposisi/jabatan',
        'sipas/staf/get_image_logo',
        'sipas/staf/get_image_logo_new',
        'sipas/staf/url_image',
        'sipas/staf/url_image/foto',
        'sipas/staf/url_image/ttd',
        'sipas/staf/set_image',
        'sipas/staf/set_image/foto',
        'sipas/staf/set_image/ttd',
        'sipas/staf/import_staf',
        'sipas/staf/import_read',
        'sipas/staf/randomize',
        'sipas/staf/transporter',
        'sipas/staf/pegawai_jumlah_report',
        'sipas/staf/pegawai_akun_report',
        'sipas/staf/penerima_disposisi_custom/recent',
        'sipas/staf/penerima_disposisi_custom/staf',
        'sipas/staf/penerima_disposisi_custom/available',/*has been checked by Luqni Maulana*/
        'sipas/staf/akunRead',
        'sipas/staf/getTtd',
        'sipas/staf/get_ttd',
        'sipas/staf/wakil'
    )),

    //staf_akun
    array('akun_insert',                                    2, array('sipas/staf_akun/create')),
    array('akun_update',                                    2, array('sipas/staf_akun/update')),
    array('akun_delete',                                    2, array('sipas/staf_akun/destroy')),
    array('akun',                                           1, array(
        'sipas/staf_akun',
        'sipas/staf_akun/index',
        'sipas/staf_akun/read'
    )),
    //staf_tim
    array('staf_tim_insert',                                2, array('sipas/staf_tim/create')),
    array('staf_tim_update',                                2, array('sipas/staf_tim/update')),
    array('staf_tim_delete',                                2, array('sipas/staf_tim/destroy')),
    array('staf_tim',                                       1, array(
        'sipas/staf_tim',
        'sipas/staf_tim/index',
        'sipas/staf_tim/read'
    )),/*has been checked by Luqni Maulana*/

    //staf_tim_anggota
    array('staf_tim',                                       1, array('sipas/staf_tim_anggota/create')),
    array('staf_tim',                                       1, array('sipas/staf_tim_anggota/update')),
    array('staf_tim',                                       1, array('sipas/staf_tim_anggota/destroy')),
    array('staf_tim',                                       1, array(
        'sipas/staf_tim_anggota',
        'sipas/staf_tim_anggota/index',
        'sipas/staf_tim_anggota/read',/*has been checked by Luqni Maulana*/
        'sipas/staf_tim_anggota/readKelompok'
    )),
    //staf_wakil
    array('staf_wakil_monitoring_save',                     2, array('sipas/staf_wakil/create')),
    array('staf_wakil',                                     1, array('sipas/staf_wakil/update')),
    array('staf_wakil',                                     1, array('sipas/staf_wakil/destroy')),
    array('staf_wakil',                                     1, array(
        'sipas/staf_wakil',
        'sipas/staf_wakil/index',
        'sipas/staf_wakil/atasan',
        'sipas/staf_wakil/read', /*checked-m*/
        'sipas/staf_wakil/asisten',
        'sipas/staf_wakil/check_isexist'
    )),
    //staf_wakil
    array('staf_pgs_monitoring_save',                       2, array('sipas/staf_wakil_pgs/create')),
    array('staf_pgs',                                       1, array('sipas/staf_wakil_pgs/update')),
    array('staf_pgs',                                       1, array('sipas/staf_wakil_pgs/destroy')),
    array('staf_pgs',                                       1, array(
        'sipas/staf_wakil_pgs',
        'sipas/staf_wakil_pgs/index',
        'sipas/staf_wakil_pgs/read',
        'sipas/staf_wakil_pgs/check',
        'sipas/staf_wakil_pgs/konfirmasi'
    )),
    //staf_wakil_asisten
    array('staf_wakil',                                     1, array(
        'sipas/staf_wakil_asisten',
        'sipas/staf_wakil_asisten/index',
        'sipas/staf_wakil_asisten/read',
        'sipas/staf_wakil_asisten/read/available'
    )), /*checked-m*/
    //support
    array('support',                                        1, array(
        'sipas/support',
        'sipas/support/doc'
    )), /*checked-m*/
    //surat lib nomor
    array('surat',      1, array(
        'sipas/surat_libnomor/create',
        'sipas/surat_libnomor/read',
        'sipas/surat_libnomor/update',
        'sipas/surat_libnomor/destroy'
    )),

    //surat => role not found, punya role msg2 sesuai model
    array('surat',                                          1, array('sipas/surat/create')),
    array('surat',                                          1, array('sipas/surat/createImport')),
    array('surat',                                          1, array('sipas/surat/simpanLokasi')),
    array('surat',                                          1, array('sipas/surat/update')),
    array('surat',                                          1, array('sipas/surat/destroy')),
    array('surat',                                          1, array(
        'sipas/surat',
        'sipas/surat/index',
        'sipas/surat/read',
        'sipas/surat/check_nomor',
        'sipas/surat/next',
        'sipas/surat/next/nomor',
        'sipas/surat/next/agenda',
        'sipas/surat/next/registrasi',
        'sipas/surat/resi',
        'sipas/surat/resi/surat',
        'sipas/surat/transporter',
        'sipas/surat/report',
        'sipas/surat/report_eksternal',
        'sipas/surat/report_internal',
        'sipas/surat/report_jenis',
        'sipas/surat/grafik_bulanan',
        'sipas/surat/printApproval',
        'sipas/surat/checkqrcode',
        'sipas/surat/generateNomor',/*checked-m*/
        'sipas/surat/batalSurat',
        'sipas/surat/salinNomor',
        'sipas/surat/batasReupload',
        'sipas/surat/musnahSurat',
        'sipas/surat/arsipSurat',
        'sipas/surat/batalDistribusi'
    )),
    //surat_ekspedisi
    array('masuk_ekspedisi',                                1, array(
        'sipas/surat_ekspedisi',
        'sipas/surat_ekspedisi/index',
        'sipas/surat_ekspedisi/linier_ekspedisi',
        'sipas/surat_ekspedisi/read',
        'sipas/surat_ekspedisi/read/tree',
        'sipas/surat_ekspedisi/report', /*checked-m*/
        'sipas/surat_ekspedisi/checkTembusan'
    )),

    //surat_ikeluar
    array('surat_internal_keluar_insert',                   1, array('sipas/surat_ikeluar/create')),
    array('surat_internal_keluar_update',                   1, array('sipas/surat_ikeluar/update')),
    array('surat_internal_keluar_delete',                   1, array('sipas/surat_ikeluar/destroy')),
    array('surat_internal_keluar',                          1, array(
        'sipas/surat_ikeluar',
        'sipas/surat_ikeluar/index',
        'sipas/surat_ikeluar/read',
        'sipas/surat_ikeluar/draft',
        'sipas/surat_ikeluar/setuju',
        'sipas/surat_ikeluar/referensi',
        'sipas/surat_ikeluar/setuju_list',
        'sipas/surat_ikeluar/dlm_setuju',
        'sipas/surat_ikeluar/revisi',
        'sipas/surat_ikeluar/blm_nomor',
        'sipas/surat_ikeluar/blm_terima',
        'sipas/surat_ikeluar/terima',
        'sipas/surat_ikeluar/tolak',
        'sipas/surat_ikeluar/resend',
        'sipas/surat_ikeluar/setuju',
        'sipas/surat_ikeluar/aktif',
        'sipas/surat_ikeluar/nonaktif',
        'sipas/surat_ikeluar/terlewat_nonaktif',
        'sipas/surat_ikeluar/disposisi',
        'sipas/surat_ikeluar/scope',
        'sipas/surat_ikeluar/internal_report',
        'sipas/surat_ikeluar/internal_report_unprocessed',
        'sipas/surat_ikeluar/report_rekap',
        'sipas/surat_ikeluar/report_retensi',
        'sipas/surat_ikeluar/next',
        'sipas/surat_ikeluar/cek_rule',/*has been checked by Luqni Maulana*/
        'sipas/surat_ikeluar/batal_nomor',
        'sipas/surat_ikeluar/salin_nomor',
        'sipas/surat_ikeluar/musnah',
        'sipas/surat_ikeluar/arsip',
        'sipas/surat_ikeluar/internal_report_kewenangan',
        'sipas/surat_ikeluar/internal_report_semua',
        'sipas/surat_ikeluar/internal_report_blmsetuju_semua',
        'sipas/surat_ikeluar/internal_report_blmsetuju_kewenangan',
        'sipas/surat_ikeluar/internal_report_blmsetuju'
    )),
    //surat_imasuk
    array('surat_internal_masuk_insert',                    2, array('sipas/surat_imasuk/create')),
    array('surat_internal_masuk',                           1, array('sipas/surat_imasuk/update')),
    array('surat_internal_masuk',                           1, array('sipas/surat_imasuk/destroy')),
    array('surat_internal_masuk',                           1, array(
        'sipas/surat_imasuk',
        'sipas/surat_imasuk/index',
        'sipas/surat_imasuk/read',
        'sipas/surat_imasuk/draft',
        'sipas/surat_imasuk/unapproved',
        'sipas/surat_imasuk/pending',
        'sipas/surat_imasuk/terima',
        'sipas/surat_imasuk/tolak',
        'sipas/surat_imasuk/blm_distribusi',
        'sipas/surat_imasuk/batal_distribusi',
        'sipas/surat_imasuk/distribusi',
        'sipas/surat_imasuk/approved',
        'sipas/surat_imasuk/aktif',
        'sipas/surat_imasuk/aktif_list',
        'sipas/surat_imasuk/aktif7',
        'sipas/surat_imasuk/aktif3',
        'sipas/surat_imasuk/aktif1',
        'sipas/surat_imasuk/nonaktif',
        'sipas/surat_imasuk/terlewat_nonaktif',
        'sipas/surat_imasuk/internal_report',
        'sipas/surat_imasuk/internal_report_tunda',
        'sipas/surat_imasuk/report_rekap',
        'sipas/surat_imasuk/next',
        'sipas/surat_imasuk/get_latest_penyetuju',
        'sipas/surat_imasuk/internal_report_tolak_kewenangan',
        'sipas/surat_imasuk/internal_report_semua',
        'sipas/surat_imasuk/internal_report_kewenangan',
        'sipas/surat_imasuk/internal_report_tunda_semua',
        'sipas/surat_imasuk/internal_report_tunda_kewenangan',
        'sipas/surat_imasuk/internal_report_tolak_semua',
        'sipas/surat_imasuk/internal_report_tolak',/*has been checked by Luqni Maulana*/
        'sipas/surat_imasuk/musnah',
        'sipas/surat_imasuk/arsip'
    )),
    //surat_internal
    array('surat_internal',                                 2, array('sipas/surat_internal/create')),
    array('surat_internal',                                 2, array('sipas/surat_internal/update')),
    array('surat_internal',                                 2, array('sipas/surat_internal/destroy')),
    array('surat_internal',                                 1, array(
        'sipas/surat_internal',
        'sipas/surat_internal/index',
        'sipas/surat_internal/read',
        'sipas/surat_internal/disposisi',
        'sipas/surat_internal/internal_report',
        'sipas/surat_internal/internal_report_unprocessed',
        'sipas/surat_internal/next',
        'sipas/surat_internal/get_latest_penyetuju'
    )), /*checked-m*/
    //surat_keluar
    array('keluar_insert',                                  1, array('sipas/surat_keluar/create')),
    array('keluar_update',                                  1, array('sipas/surat_keluar/update')),
    array('keluar_delete',                                  1, array('sipas/surat_keluar/destroy')),
    array('keluar',                                         1, array(
        'sipas/surat_keluar',
        'sipas/surat_keluar/index',
        'sipas/surat_keluar/read',
        'sipas/surat_keluar/draft',
        'sipas/surat_keluar/getBalas',
        'sipas/surat_keluar/dlm_setuju',
        'sipas/surat_keluar/setuju',
        'sipas/surat_keluar/referensi',
        'sipas/surat_keluar/setuju_list',
        'sipas/surat_keluar/revisi',
        'sipas/surat_keluar/blm_nomor',
        'sipas/surat_keluar/blm_ekspedisi',
        'sipas/surat_keluar/ekspedisi',
        'sipas/surat_keluar/aktif',
        'sipas/surat_keluar/nonaktif',
        'sipas/surat_keluar/terlewat_nonaktif',
        'sipas/surat_keluar/next',
        'sipas/surat_keluar/next/agenda',
        'sipas/surat_keluar/next/code',
        'sipas/surat_keluar/report',
        'sipas/surat_keluar/report_blmdisetujui',
        'sipas/surat_keluar/report_rekap',
        'sipas/surat_keluar/report_backdate',
        'sipas/surat_keluar/report_retensi',  /*checked-m*/
        'sipas/surat_keluar/batal_nomor',
        'sipas/surat_keluar/salin_nomor',
        'sipas/surat_keluar/musnah',
        'sipas/surat_keluar/arsip',
        'sipas/surat_keluar/report_semua',
        'sipas/surat_keluar/report_kewenangan'
    )),
    //surat_keputusan
    array('surat_keputusan',                                   0, array(
        'sipas/surat_keputusan/get_template_kolektif',
        'sipas/surat_keputusan/set_template_kolektif'
    )),
    array('surat_internal_keputusan_insert',                   1, array('sipas/surat_keputusan/create')),
    array('surat_internal_keputusan_update',                   1, array('sipas/surat_keputusan/update')),
    array('surat_internal_keputusan_delete',                   1, array('sipas/surat_keputusan/destroy')),
    array('surat_internal_keputusan',                          1, array(
        'sipas/surat_keputusan',
        'sipas/surat_keputusan/index',
        'sipas/surat_keputusan/read',
        'sipas/surat_keputusan/draft',
        'sipas/surat_keputusan/setuju',
        'sipas/surat_keputusan/setuju_list',
        'sipas/surat_keputusan/dlm_setuju',
        'sipas/surat_keputusan/revisi',
        'sipas/surat_keputusan/blm_nomor',
        'sipas/surat_keputusan/blm_terima',
        'sipas/surat_keputusan/terima',
        'sipas/surat_keputusan/tolak',
        'sipas/surat_keputusan/resend',
        'sipas/surat_keputusan/distribute',
        'sipas/surat_keputusan/setuju',
        'sipas/surat_keputusan/aktif',
        'sipas/surat_keputusan/nonaktif',
        'sipas/surat_keputusan/terlewat_nonaktif',
        'sipas/surat_keputusan/disposisi',
        'sipas/surat_keputusan/scope',
        'sipas/surat_keputusan/next',
        'sipas/surat_keputusan/cek_rule',/*has been checked by Luqni Maulana*/
        'sipas/surat_keputusan/batal_nomor',
        'sipas/surat_keputusan/salin_nomor',
        'sipas/surat_keputusan/musnah',
        'sipas/surat_keputusan/arsip',
        'sipas/surat_keputusan/internal_report',
        'sipas/surat_keputusan/internal_report_semua',
        'sipas/surat_keputusan/internal_report_kewenangan',

        'sipas/surat_keputusan/internal_report_blmsetuju',
        'sipas/surat_keputusan/internal_report_blmsetuju_semua',
        'sipas/surat_keputusan/internal_report_blmsetuju_kewenangan',

        'sipas/surat_keputusan/internal_report_unprocessed',
        'sipas/surat_keputusan/report_rekap',
        'sipas/surat_keputusan/report_retensi'
    )),
    //surat_keluar_ekspedisi
    array('ekspedisi_surat_keluar_add',                     2, array('sipas/surat_keluar_ekspedisi/create')),
    array('ekspedisi_surat_keluar',                         2, array('sipas/surat_keluar_ekspedisi/update')),
    array('ekspedisi_surat_keluar',                         1, array(
        'sipas/surat_keluar_ekspedisi',
        'sipas/surat_keluar_ekspedisi/index',
        'sipas/surat_keluar_ekspedisi/read'
    )), /*checked-m*/
    //surat_kontak
    array('surat_kontak',                                   1, array(
        'sipas/surat_kontak',
        'sipas/surat_kontak/index',
        'sipas/surat_kontak/read'
    )), /*checked-m*/
    //surat_log
    array('ekspedisi_surat_keluar_add',                     1, array('sipas/surat_log/create')),
    array('surat',                                          1, array('sipas/surat_log/update')),
    array('surat',                                          1, array(
        'sipas/surat_log',
        'sipas/surat_log/index',
        'sipas/surat_log/ekspedisi',
        'sipas/surat_log/read'
    )), /*checked-m*/
    //surat_masuk
    array('masuk_insert',                                   1, array('sipas/surat_masuk/create')),
    array('masuk_update',                                   1, array('sipas/surat_masuk/update')),
    array('masuk_delete',                                   2, array('sipas/surat_masuk/destroy')),
    array('registrasi_add',                                 1, array('sipas/surat_masuk/create')),
    array('pengarahanmasuk',                                1, array('sipas/surat_masuk/update')),
    array('registrasi_resi',                                1, array('sipas/surat_masuk/resi')),
    array('registrasi',                                     1, array(
        'sipas/surat_masuk',
        'sipas/surat_masuk/index',
        'sipas/surat_masuk/read',
        'sipas/surat_masuk/aktif',
        'sipas/surat_masuk/aktif/tree',
        'sipas/surat_masuk/aktif7',
        'sipas/surat_masuk/aktif3',
        'sipas/surat_masuk/aktif1',
        'sipas/surat_masuk/registrasi',
        'sipas/surat_masuk/arah',
        'sipas/surat_masuk/blm_arah',
        'sipas/surat_masuk/nonaktif',
        'sipas/surat_masuk/terlewat_nonaktif',
        'sipas/surat_masuk/distribusi',
        'sipas/surat_masuk/blm_distribusi',
        'sipas/surat_masuk/batal_distribusi',
        'sipas/surat_masuk/next',
        'sipas/surat_masuk/next/agenda',
        'sipas/surat_masuk/next/registrasi',
        'sipas/surat_masuk/resi',
        'sipas/surat_masuk/report',
        'sipas/surat_masuk/report_aktif',
        'sipas/surat_masuk/report_nonaktif',
        'sipas/surat_masuk/report_init',
        'sipas/surat_masuk/report_rekap', /*checked-m*/
        'sipas/surat_masuk/musnah',
        'sipas/surat_masuk/arsip',
        'sipas/surat_masuk/report_semua',
        'sipas/surat_masuk/report_kewenangan',
        'sipas/surat_masuk/report_init_kewenangan',
        'sipas/surat_masuk/report_retensi',
        'sipas/surat_masuk/report_init_semua',
    )),

    //surat_stack
    array('surat_stack',                                    1, array('sipas/surat_stack/create')),
    array('surat_stack',                                    1, array('sipas/surat_stack/update')),
    array('surat_stack',                                    1, array('sipas/surat_stack/destroy')),

    array('surat_stack',                                    0, array('sipas/surat_stack/print_tujuan_penerima')),

    array('surat_stack',                                    1, array(
        'sipas/surat_stack',
        'sipas/surat_stack/index',
        'sipas/surat_stack/read',
        'sipas/surat_stack/tujuan_penerima',
        'sipas/surat_stack/tujuan_tembusan',
        'sipas/surat_stack/tujuan_tembusan_stack',
        'sipas/surat_stack/print_tujuan_penerima',
        'sipas/surat_stack/tujuan_tembusansk_stack',
        'sipas/surat_stack/disposisi',
        'sipas/surat_stack/disposisi/tembusan',
        'sipas/surat_stack/disposisi/penerima',
        'sipas/surat_stack/disposisi/penerimakeluar',
        'sipas/surat_stack/koreksi',
        'sipas/surat_stack/petikan',
        'sipas/surat_stack/penerima_stack'
    )), /*checked-m*/
    //surat_penerimask
    array('surat_penerimask',                                    1, array('sipas/surat_penerimask/create')),
    array('surat_penerimask',                                    1, array('sipas/surat_penerimask/update')),
    array('surat_penerimask',                                    1, array('sipas/surat_penerimask/destroy')),
    array('surat_penerimask',                                    1, array(
        'sipas/surat_penerimask',
        'sipas/surat_penerimask/index',
        'sipas/surat_penerimask/read',
        'sipas/surat_penerimask/penerima_list',
        'sipas/surat_penerimask/reset_penerimask',
        'sipas/surat_penerimask/tujuan_penerima',
        'sipas/surat_penerimask/tujuan_tembusan',
        'sipas/surat_penerimask/tujuan_tembusan_penerimask',
        'sipas/surat_penerimask/print_tujuan_penerima'
    )), /*checked-m*/
    //surat_status
    array('surat_status',                                   1, array('sipas/surat_status/create')),
    array('surat_status',                                   1, array('sipas/surat_status/update')),
    array('surat_status',                                   1, array('sipas/surat_status/destroy')),
    array('surat_status',                                   1, array(
        'sipas/surat_status',
        'sipas/surat_status/index',
        'sipas/surat_status/read'
    )), /*checked-m*/
    //surat_ulasan
    array('surat_internal_masuk_rating',                    1, array('sipas/surat_ulasan/create')),
    array('surat_internal_masuk_rating',                    1, array('sipas/surat_ulasan/update')),
    array('surat_internal_masuk_rating',                    1, array('sipas/surat_ulasan/destroy')),
    array('surat_internal_masuk_rating',                    1, array(
        'sipas/surat_ulasan',
        'sipas/surat_ulasan/index',
        'sipas/surat_ulasan/read',
        'sipas/surat_ulasan/report_penerima',
        'sipas/surat_ulasan/report_pengirim',
        'sipas/surat_ulasan/rating_generator'
    )), /*checked-m*/
    //surat_unit
    array('surat_unit',                                     1, array(
        'sipas/surat_unit',
        'sipas/surat_unit/index',
        'sipas/surat_unit/read'
    )), /*checked-m*/
    //system
    array('system',                                         1, array(
        'sipas/system',
        'sipas/system/index',
        'sipas/system/backup_create',
        'sipas/system/backup_state'
    )), /*checked-m*/
    //unit
    array('unitkerja_insert',                               2, array('sipas/unit/create')),/*check - D*/
    array('unitkerja_update',                               2, array('sipas/unit/update')),/*check - D*/
    array('unitkerja_delete',                               2, array('sipas/unit/destroy')),/*check - D*/
    array('unitkerja',                                      1, array(
        'sipas/unit',
        'sipas/unit/index',
        'sipas/unit/read',
        'sipas/unit/read/tree',
        'sipas/unit/aktif',
        'sipas/unit/aktif/tree',
        'sipas/unit/nonaktif',
        'sipas/unit/nonaktif/tree',/*check - D*//*has been checked by Luqni Maulana*/
        'sipas/unit/owner',
        'sipas/unit/combounit',
        'sipas/unit/combobagian',
        'sipas/unit/transporter_path',
    )),

    //unit_cakupan
    array('unitkerja_scope_insert',                         2, array('sipas/unit_cakupan/create')),
    array('unitkerja_scope_insert',                         2, array('sipas/unit_cakupan/update')),
    array('unitkerja_scope_insert',                         2, array('sipas/unit_cakupan/destroy')),
    array('unitkerja_kewenangan',                           1, array(
        'sipas/unit_cakupan',
        'sipas/unit_cakupan/index',
        'sipas/unit_cakupan/read'
    )),/*has been checked by Luqni Maulana*/
    //user_note
    array('user_note',                                      2, array('sipas/user_note/create')),
    array('user_note',                                      2, array('sipas/user_note/mark')),
    array('user_note',                                      2, array('sipas/user_note/destroy')),
    array('user_note',                                      1, array(
        'sipas/user_note',
        'sipas/user_note/index',
        'sipas/user_note/read'
    )), /*checked-m*/
    //user_log
    array('user_log',                                       2, array('sipas/user_log/create')),
    array('user_log',                                       2, array('sipas/user_log/update')),
    array('user_log',                                       2, array('sipas/user_log/destroy')),
    array('user_log',                                       1, array(
        'sipas/user_log',
        'sipas/user_log/index',
        'sipas/user_log/read'
    )), /*checked-m*/
    //usermail
    array('usermail',                                       1, array(
        'sipas/usermail',
        'sipas/usermail/index',
        'sipas/usermail/select',
        'sipas/usermail/read',
        'sipas/usermail/openmail'
    )), /*checked-m*/

    //staf_import
    array('staf_import',                                    2, array('sipas/staf/import_staf')),

    //backuprestore 
    array('backuprestore',                                  2, array('sipas/backup/create')),
    array('backuprestore',                                  2, array('sipas/restore/create')),

    array('kotak_masuk',                                    1, array(
        'sipas/kotak_masuk',
        'sipas/kotak_masuk/tugassaya',
        'sipas/kotak_masuk/tugassaya/disposisi',
        'sipas/kotak_masuk/tugassaya/eksternal',
        'sipas/kotak_masuk/tugassaya/internal',
        'sipas/kotak_masuk/tugassaya/draf',
        'sipas/kotak_masuk/teruskan',
        'sipas/kotak_masuk/tercabut',
        'sipas/kotak_masuk/notadinas',
        'sipas/kotak_masuk/disposisimasuk',
        'sipas/kotak_masuk/suratmasuk_eks',
        'sipas/kotak_masuk/suratmasuk_int',
        'sipas/kotak_masuk/surat_all', /*checked-m*/
        'sipas/kotak_masuk/penerima',
        'sipas/kotak_masuk/penerima_new',
        'sipas/kotak_masuk/asistensi/tugassaya',
        'sipas/kotak_masuk/asistensi/teruskan',
        'sipas/kotak_masuk/asistensi/tercabut',
        'sipas/kotak_masuk/asistensi/notadinas',
        'sipas/kotak_masuk/asistensi/disposisimasuk',
        'sipas/kotak_masuk/asistensi/suratmasuk_eks',
        'sipas/kotak_masuk/asistensi/suratmasuk_int',
        'sipas/kotak_masuk/asistensi/surat_all',
        'sipas/kotak_masuk/disposisiSama'
    )),

    array('terkirim',                                       1, array(
        'sipas/terkirim',
        'sipas/terkirim/read',
        'sipas/terkirim/tercabut',
        'sipas/terkirim/disposisi',
        'sipas/terkirim/notadinas',
        'sipas/terkirim/eksternal',
        'sipas/terkirim/internal',
        'sipas/terkirim/asistensi/read',
        'sipas/terkirim/asistensi/tercabut',
        'sipas/terkirim/asistensi/disposisi',
        'sipas/terkirim/asistensi/notadinas',
        'sipas/terkirim/asistensi/eksternal',
        'sipas/terkirim/asistensi/internal'
    )),

    array('draft',                                          1, array(
        'sipas/draft',
        'sipas/draft/read',
        'sipas/draft/blmtindak',
        'sipas/draft/setuju',
        'sipas/draft/tolak',
        'sipas/draft/penyetuju',
        'sipas/draft/petikan',
        'sipas/draft/asistensi/read',
        'sipas/draft/asistensi/blmtindak',
        'sipas/draft/asistensi/setuju',
        'sipas/draft/asistensi/tolak'
    )),

    array('notif_agenda',                                   1, array(
        'sipas/notif_agenda',
        'sipas/notif_agenda/eksternal',
        'sipas/notif_agenda/internal',
        'sipas/notif_agenda/eksternal/masuk_blmarah',
        'sipas/notif_agenda/eksternal/masuk_blmdistribusi',
        'sipas/notif_agenda/eksternal/masuk_reqberkas',
        'sipas/notif_agenda/eksternal/masuk_aktif7',
        'sipas/notif_agenda/eksternal/masuk_aktif3',
        'sipas/notif_agenda/eksternal/masuk_aktif1',
        'sipas/notif_agenda/eksternal/keluar_blmkirim',
        'sipas/notif_agenda/eksternal/keluar_blmnomor',
        'sipas/notif_agenda/eksternal/keluar_reqberkas',
        'sipas/notif_agenda/internal/masuk_baru',
        'sipas/notif_agenda/internal/masuk_reqberkas',
        'sipas/notif_agenda/internal/masuk_aktif7',
        'sipas/notif_agenda/internal/masuk_aktif3',
        'sipas/notif_agenda/internal/masuk_aktif1',
        'sipas/notif_agenda/internal/keluar_tolak',
        'sipas/notif_agenda/internal/keluar_slatolak',
        'sipas/notif_agenda/internal/keluar_ulasan',
        'sipas/notif_agenda/internal/keluar_blmnomor'
    )),

    array('notif_user',                                     1, array(
        'sipas/notif_user',
        'sipas/notif_user/update',
        'sipas/notif_user/news',
        'sipas/notif_user/reading',
        'sipas/notif_user/all',
        'sipas/notif_user/read'
    )),

    array('disposisi_perintah_log',                         1, array(
        'sipas/disposisi_perintah_log',
        'sipas/disposisi_perintah_log/index',
        'sipas/disposisi_perintah_log/read',
        'sipas/disposisi_perintah_log/create'
    )),

    array('worker',                                         0, array(
        'worker/disposisi',
        'worker/imasuk',
        'worker/koreksi'
    )),

    array('dms_dokumen',                                    5, array(
        'dms/dokumen',
        'dms/dokumen/read',
        'dms/dokumen/selesai',
        'dms/dokumen/download',
        'dms/dokumen/setImport'
    )),

    array('dms_staf',                                       5, array(
        'dms/staf',
        'dms/staf/read'
    )),

    array('dms_unit',                                       5, array(
        'dms/unit',
        'dms/unit/read'
    )),

    array('dms_jabatan',                                    5, array(
        'dms/jabatan',
        'dms/jabatan/read'
    ))
);
