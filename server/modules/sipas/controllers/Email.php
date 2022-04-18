<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email extends Base_Controller
{
	public function __construct()
	{
		parent::__construct();

		// #for bad request will show 404
		// if (! $this->input->is_cli_request())
		// 	show_404();

        $this->load->model(array(
        	'sipas/pengaturan',
        ));
		$this->load->library(array(
			'my_email'
		));
		$this->email = $this->my_email;

	}
	
	/*
	Default value for message 404 access this controller
	 */
 	
	public function index()
	{
		show_404();
	}

    function getEmailConfig(){
        $setting = $this->model('sipas/pengaturan');

        $config = array('init'=>array(),'email'=>array());
        
        $config['init']['protocol']     = $setting->getSettingByCode('email_protocol');
        $config['init']['smtp_host']    = $setting->getSettingByCode('email_host');
        $config['init']['smtp_port']    = $setting->getSettingByCode('email_port');
        $config['init']['smtp_user']    = $setting->getSettingByCode('email_address');
        $config['init']['smtp_pass']    = $setting->getSettingByCode('email_password');
        
        $config['init']['smtp_timeout'] = "10";
        $config['init']['charset']      = "utf-8";
        $config['init']['newline']      = "\r\n";
        $config['init']['mailtype']     = "html";
        $config['init']['validate']     = true;
                
        $config['email']['name']     	= $setting->getSettingByCode('email_name');
        $config['email']['from']     	= $setting->getSettingByCode('email_address');
        $config['email']['subject']     = null;
        $config['email']['message']     = null;

        return $config;
    }

	public function send_queue($limit=20)
	{	
		$config = $this->getEmailConfig();

		$this->email->send_queue($config, $limit);
	}

	public function retry_queue()
	{
		$config = $this->getEmailConfig();
		$this->email->retry_queue($config);
	}

	public function test(){
		$now = date('Y-m-d H:i:s');
		$mail = $this->model('sipas/mail',true);

		// config email
		$emailName = varReq('emailName');
		$emailProtocol = varReq('emailProtocol');
		$emailHost = varReq('emailHost');
		$emailAddress = varReq('emailAddress');
		$emailPassword = varReq('emailPassword');
		$emailPort = varReq('emailPort');

		// message for user
		$email = varReq('email');
		$subject = varReq('subject');
		$message = varReq('message');

        $config = array('init'=>array(),'email'=>array());
        
        $config['init']['protocol']     = $emailProtocol;
        $config['init']['smtp_host']    = $emailHost;
        $config['init']['smtp_port']    = $emailPort;
        $config['init']['smtp_user']    = $emailAddress;
        $config['init']['smtp_pass']    = $emailPassword;
        
        $config['init']['smtp_timeout'] = "10";
        $config['init']['charset']      = "utf-8";
        $config['init']['newline']      = "\r\n";
        $config['init']['mailtype']     = "html";
        $config['init']['validate']     = true;
        
		$mail->sendmail(array_merge(
		    $config,
		    array(
		        'email' => array(
		            'name'		=> $emailName,
		            'from'		=> $emailAddress,
		            'subject' 	=> $subject,
		            'to' 		=> $email,
		            'message' 	=> $message,
		        )
		    )
		));
	}
}