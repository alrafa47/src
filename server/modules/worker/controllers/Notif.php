<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(MODULEPATH . '/worker/controllers/BaseWorker.php');

use GuzzleHttp\Client;

class Notif extends BaseWorker
{
    function __construct()
    {
        parent::__construct();

        // $this->config->load('application_config');

        $this->setup(
            Config()->item('queueServer'),
            Config()->item('queueServer_notifType'),
            Config()->item('queueServer_formatTube')
        );
    }

    /**
     * one of these action should be executed
     * $job->delete() means done
     * $job->burry() means fail
     * $job->release() means will executed again later
     */
    protected function handleJob($job)
    {
        $deviceModel = $this->model('sipas/alat', true);
        $staf = $this->model('sipas/staf_view', true);
        // $unit = $this->model('sipas/unit', true);
        // $jabatan = $this->model('sipas/jabatan', true);
        $notifmodel = $this->model('sipas/notification', true);
        $message = $job->getBody(); // body is always array
        $akun = $staf->read($message['to']);
        $from = $staf->read($message['from']);
        $notifs = $notifmodel->get_notif_of_user('disposisi_masuk', $message['to']);
        $badge = $notifs['kotakmasuk_belumditindak'] + $notifs['draft_belumditindak'];
        $alat = $deviceModel->find(array(
                'alat_akun' => $akun['staf_akun'],
                'alat_data IS NOT NULL' => null));
        $now = date('Y-m-d H:i:s'); 

        $redis = new Redis(); 
        $redis->connect('10.2.9.177', 6379);
        $redis->auth("10timah10-redis");

        $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$message['to']);
        $pgs = json_decode($pgs, true);

        if($pgs){
            if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] > $now){
                if($alat){
                    foreach ($alat as $key => $value) {
                        if($message['type'] == 'Masuk'){
                            $message['type'] = 'Surat Masuk';
                        }

                        $staf_nama = $akun['staf_nama'];
                        $nama = explode(' ', $staf_nama);

                        $body = $from['staf_nama'].': '.$message['data'];
                        // $title = $nama[0].'('.$akun['jabatan_nama'].') Menerima '.$message['type'];
                        $title = $nama[0].' Menerima '.$message['type'];

                        $staf_id = $akun['staf_id'];

                        $access_token = Config()->item('notif_token');
                        
                        $messages = array(
                            array(
                                'priority' => 'high',
                                'notification' => array(
                                    'title' => $title,
                                    'body' => $body,
                                    'sound' => 'default',
                                    'icon' => 'notification_icon',
                                    'click_action' => 'FCM_PLUGIN_ACTIVITY',
                                    'badge' => $badge,
                                    'staf'=> $staf_id
                                ),
                                'data' => array(
                                    'type' => $message['type'],
                                    'id' => $message['id'],
                                    'content-available' => 1,
                                    'badge' => $badge,
                                    'staf'=> $staf_id,
                                    'message'=> $message['data']
                                ),
                                'to' => $value['alat_data']
                            ),
                            array(
                                'priority' => 'high',
                                'data' => array(
                                    'type' => $message['type'],
                                    'id' => $message['id'],
                                    'content-available' => 1,
                                    'badge' => $badge,
                                    'staf'=> $staf_id,
                                    'mode'=> 1,
                                    'message'=> $message['data']
                                ),
                                'to' => $value['alat_data']
                            )
                        );
                        
                        $client = new GuzzleHttp\Client([
                            'version' => '2',
                            'headers' => [
                                'Content-Type' => 'application/json',
                                'Authorization' => 'key='.$access_token,
                            ],
                            'curl' => [
                                CURLOPT_SSL_VERIFYPEER => 'false'
                            ]
                        ]);

                        foreach($messages as $payload) {
                            $response = $client->post(Config()->item('notif_url'),
                                ['body' => json_encode($payload)]
                            );
                            echo $response->getBody() . "\n";

                            $body = json_decode($response->getBody());               
                            if($body->success == 1){
                                $this->log(array(
                                    'status'=>'SENT ' , // SENT- success sent to firebase| SKIP - user doesnt have notif token
                                    'payload'=>json_encode($message)
                                ));
                            }else{

                                $error =  $body->results[0]->error;

                                $this->log(array(
                                    'status'=>'FAILED '.$error , // FAILED - the message failed send to user / callback from google fcm
                                    'payload'=>json_encode($message)
                                ));
                            }
                        }

                        // $this->log(array(
                        //     'status'=>'SENT', // SENT- success sent to firebase| SKIP - user doesnt have notif token
                        //     'payload'=>json_encode($message)
                        // ));
                    }
                }else{
                    echo json_encode($message) . "\n";
                    $this->log(array(
                        'status'=>'SKIP', // SENT- success sent to firebase| SKIP - user doesnt have notif token
                        'payload'=>json_encode($message)
                    ));
                }
            } else {
                echo json_encode($message) . "\n";
                $this->log(array(
                    'status'=>'SKIP', // SENT- success sent to firebase| SKIP - user doesnt have notif token
                    'payload'=>json_encode($message)
                ));
            }   
        }else{
            if($alat){
                foreach ($alat as $key => $value) {
                    if($message['type'] == 'Masuk'){
                        $message['type'] = 'Surat Masuk';
                    }

                    $staf_nama = $akun['staf_nama'];
                    $nama = explode(' ', $staf_nama);

                    $body = $from['staf_nama'].': '.$message['data'];
                    // $title = $nama[0].'('.$akun['jabatan_nama'].') Menerima '.$message['type'];
                    $title = $nama[0].' Menerima '.$message['type'];

                    $staf_id = $akun['staf_id'];

                    $access_token = Config()->item('notif_token');
                    
                    $messages = array(
                        array(
                            'priority' => 'high',
                            'notification' => array(
                                'title' => $title,
                                'body' => $body,
                                'sound' => 'default',
                                'icon' => 'notification_icon',
                                'click_action' => 'FCM_PLUGIN_ACTIVITY',
                                'badge' => $badge,
                                'staf'=> $staf_id
                            ),
                            'data' => array(
                                'type' => $message['type'],
                                'id' => $message['id'],
                                'content-available' => 1,
                                'badge' => $badge,
                                'staf'=> $staf_id,
                                'message'=> $message['data']
                            ),
                            'to' => $value['alat_data']
                        ),
                        array(
                            'priority' => 'high',
                            'data' => array(
                                'type' => $message['type'],
                                'id' => $message['id'],
                                'content-available' => 1,
                                'badge' => $badge,
                                'staf'=> $staf_id,
                                'mode'=> 1,
                                'message'=> $message['data']
                            ),
                            'to' => $value['alat_data']
                        )
                    );
                    
                    $client = new GuzzleHttp\Client([
                        'version' => '2',
                        'headers' => [
                            'Content-Type' => 'application/json',
                            'Authorization' => 'key='.$access_token,
                        ],
                        'curl' => [
                            CURLOPT_SSL_VERIFYPEER => 'false'
                        ]
                    ]);

                    foreach($messages as $payload) {
                        $response = $client->post(Config()->item('notif_url'),
                            ['body' => json_encode($payload)]
                        );
                        echo $response->getBody() . "\n";

                        $body = json_decode($response->getBody());               
                        if($body->success == 1){
                            $this->log(array(
                                'status'=>'SENT ' , // SENT- success sent to firebase| SKIP - user doesnt have notif token
                                'payload'=>json_encode($message)
                            ));
                        }else{

                            $error =  $body->results[0]->error;

                            $this->log(array(
                                'status'=>'FAILED '.$error , // FAILED - the message failed send to user / callback from google fcm
                                'payload'=>json_encode($message)
                            ));
                        }
                    }

                    // $this->log(array(
                    //     'status'=>'SENT', // SENT- success sent to firebase| SKIP - user doesnt have notif token
                    //     'payload'=>json_encode($message)
                    // ));
                }
            }else{
                echo json_encode($message) . "\n";
                $this->log(array(
                    'status'=>'SKIP', // SENT- success sent to firebase| SKIP - user doesnt have notif token
                    'payload'=>json_encode($message)
                ));
            }
        }
        
        $job->delete();
    }

    protected function handleJobException($job, $e)
    {
        $message = $job->getBody(); // body is always array
        $job->reserve();

        $this->log(array(
            'status'=>'FAIL', // SENT- success sent to firebase|SKIP|FAIL
            'payload'=>json_encode($message)
        ));
        $job->release();
    }
}