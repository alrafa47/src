<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI =& get_instance();
$CI->load->library('email');

class Sipas_model_Notifikasi_email_view extends Sipas_model_Notifikasi_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notifikasi_email');
        $this->set_primary('notifikasi_id');
    }
    public function set_status($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Get
     *
     * Get queue emails.
     * @return  mixed
     */
    public function get($limit = NULL, $offset = NULL)
    {
        if ($this->status != FALSE)
            $this->CI->db->where('q.status', $this->status);

        $query = $this->CI->db->get("{$this->table_email_queue} q", $limit, $offset);

        return $query->result();
    }

    /**
     * Save
     *
     * Add queue email to database.
     * @return  mixed
     */
    public function send($skip_job = FALSE)
    {
        if ( $skip_job === TRUE ) {
            return parent::send();
        }
        else{
            $date = date("Y-m-d H:i:s");

            $to = is_array($this->_recipients) ? implode(", ", $this->_recipients) : $this->_recipients;
            $cc = implode(", ", $this->_cc_array);
            $bcc = implode(", ", $this->_bcc_array);

            $dbdata = array(
                'to' => $to,
                'cc' => $cc,
                'bcc' => $bcc,
                'message' => $this->_body,
                'headers' => serialize($this->_headers),
                'status' => 'pending',
                'date' => $date
            );
            if($dbdata['to'] == ""){
                return false;
            }
            else{
                return $this->CI->db->insert($this->table_email_queue, $dbdata);
            }
        }
    }

    // /**
    //  * Start process
    //  *
    //  * Start php process to send emails
    //  * @return  mixed
    //  */
    // public function start_process()
    // {
    //     $filename = FCPATH . 'index.php';
    //     $exec = shell_exec("{$this->phpcli} {$filename} {$this->main_controller} > /dev/null &");

    //     return $exec;
    // }

    /**
     * Send queue
     *
     * Send queue emails.
     * @return  void
     */
    public function send_queue($config=null, $limit=null)
    {
        $this->set_status('pending');
        $emails = $this->get($limit, 0);
        foreach ($emails as $email)
        {
            $this->initialize($config['init']);
            $this->clear(true);

            $recipients = explode(",", $email->to);

            $cc = !empty($email->cc) ? explode(",", $email->cc) : array();
            $bcc = !empty($email->bcc) ? explode(",", $email->bcc) : array();

            $this->_headers = unserialize($email->headers);

            $this->to($recipients);
            $this->cc($cc);
            $this->bcc($bcc);

            $this->subject($email->subject);
            $this->message(htmlspecialchars_decode($email->message));
            // print_r($email->message);
            // echo "<pre>";
            // print_r(html_entity_decode($email->message));
            // die();
            $this->from($config['email']['from'], $config['email']['name']);

            $this->CI->db->where('id', $email->id);
            $this->CI->db->set('status', 'sending');
            $this->CI->db->set('date', date("Y-m-d H:i:s"));
            $this->CI->db->update($this->table_email_queue);

            if ($this->send(TRUE)) {
                $status = 'sent';
            } else {
                $status = 'failed';
            }

            $this->CI->db->where('id', $email->id);
            $this->CI->db->set('status', $status);
            $this->CI->db->set('date', date("Y-m-d H:i:s"));
            $this->CI->db->update($this->table_email_queue);
        }
    }

    /**
     * Retry failed emails
     *
     * Resend failed or expired emails
     * @return void
     */
    public function retry_queue()
    {
        $expire = (time() - $this->expiration);
        $date_expire = date("Y-m-d H:i:s", $expire);

        $this->CI->db->set('status', 'pending');
        $this->CI->db->where("(date < '{$date_expire}' AND status = 'sending')");
        $this->CI->db->or_where("status = 'failed'");

        $this->CI->db->update($this->table_email_queue);

        log_message('debug', 'Email queue retrying...');
    }
}