<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(MODULEPATH . '/worker/controllers/BaseWorker.php');

use GuzzleHttp\Client;

class Notif_redis extends BaseWorker
{
    function __construct()
    {
        parent::__construct();

        // $this->load->driver('cache');

        // $this->config->load('application_config');

        $this->setup(
            Config()->item('queueServer'),
            Config()->item('queueServer_notifTypeRedis'),
            Config()->item('queueServer_formatTubeRedis')
        );
    }

    /**
     * one of these action should be executed
     * $job->delete() means done
     * $job->bury() means fail
     * $job->release() means will executed again later
     */
    protected function handleJob($job)
    {
        $model = $this->model('sipas/notification', true);
        $message = $job->getBody(); // body is always array
        $redis = new Redis(); 
        $redis->connect('127.0.0.1', 6379);
        $redis->auth("password");

        if($message['staf_id']){
            $staf_id = $message['staf_id'];
            $notif_disposisi = $model->get_notif_of_user('disposisi', $val['staf_wakil_staf']);
            $notif_disposisi_masuk = $model->get_notif_of_user('disposisi_masuk', $val['staf_wakil_staf']);

            $notif_user = array(
                'disposisi_status_baca_tindakan'     => $notif_disposisi['disposisi_status_baca_tindakan'],
                'kotakmasuk_belumditindak'           => $notif_disposisi_masuk['kotakmasuk_belumdibaca'],
                'draft_belumditindak'                => $notif_disposisi_masuk['draft_belumdibaca'],
                'tugassaya_belumditindak'            => $notif_disposisi_masuk['draft_belumditindak'] + $notif_disposisi_masuk['kotakmasuk_belumditindak']
              );

            $redis->delete(Config()->item('redisPrefix').'notif_staf:'.$staf_id);
            $redis->set(Config()->item('redisPrefix').'notif_staf:'.$staf_id, json_encode($notif_user));

            echo json_encode($message) . "\n";
            $this->log(array(
                'status'=>'SENT', // SENT- success sent to firebase|SKIP|FAIL
                'payload'=>json_encode($notif_user)
            ));
            $job->delete();
        }

        if($message['unit_id']){
            $unit_id = $message['unit_id'];
            $notif_unit_db = $model->get_notif_of_unit('notif_unit', $staf['staf_unit']);
            $notif_unit = array(
               'agmasuk_pendistribusian'    => $notif_unit_db['agmasuk_pendistribusian'],
               'agmasuk_request_berkas'     => $notif_unit_db['agmasuk_request_berkas'],
               'agkeluar_blmekspedisi'      => $notif_unit_db['agkeluar_blmekspedisi'],
               'agkeluar_blmnomor'          => $notif_unit_db['agkeluar_blmnomor'],
               'agkeluar_request_berkas'    => $notif_unit_db['agkeluar_request_berkas'],
               'agmasukinternal_pending'    => $notif_unit_db['agmasukinternal_pending'],
               'agkeluarinternal_tolak'      => $notif_unit_db['agkeluarinternal_tolak'],
               'agmasukinternal_request_berkas' => $notif_unit_db['agmasukinternal_request_berkas'],
               // 'agkeluarinternal_ulasan'    => $notif_unit_db['agkeluarinternal_ulasan'],
               'agkeluarinternal_blmnomor'  => $notif_unit_db['agkeluarinternal_blmnomor'],
               'agmasuk_reminder_7'         => $notif_unit_db['agmasuk_reminder_7'],
               'agmasuk_reminder_3'         => $notif_unit_db['agmasuk_reminder_3'],
               'agmasuk_reminder_1'         => $notif_unit_db['agmasuk_reminder_1'],
               'agmasukinternal_reminder_7' => $notif_unit_db['agmasukinternal_reminder_7'],
               'agmasukinternal_reminder_3' => $notif_unit_db['agmasukinternal_reminder_3'],
               'agmasukinternal_reminder_1' => $notif_unit_db['agmasukinternal_reminder_1']
            );
            $redis->set(Config()->item('redisPrefix').'notif_unit:'.$unit_id, json_encode($notif_unit));
            
            $notif_arah = array(
                'agmasuk_pengarahan'        => $model->get_notif_of_unit('agmasuk_pengarahan', $unit_id)
            );

            $redis->delete(Config()->item('redisPrefix').'notif_unit_pengarahan');
            $redis->set(Config()->item('redisPrefix').'notif_unit_pengarahan', json_encode($notif_arah));

            echo json_encode($message) . "\n";
            $this->log(array(
                'status'=>'SENT', // SENT- success sent to firebase|SKIP|FAIL
                'payload'=>json_encode($notif_unit)
            ));
            $job->delete();
        }
    }

    protected function handleJobException($job, $e)
    {   
        $message = $job->getBody(); // body is always array
        // $job->reserve();

        echo json_encode($message) . "\n";
        $this->log(array(
            'status'=>'FAIL', // SENT- success sent to firebase|SKIP|FAIL
            'payload'=>json_encode($message)
        ));
        $job->release();
    }
}