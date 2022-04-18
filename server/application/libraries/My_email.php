<?php defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * CodeIgniter Email Queue
 *
 * A CodeIgniter library to queue e-mails.
 *
 * @package     CodeIgniter
 * @category    Libraries
 * @author      Thaynã Bruno Moretti
 * @link    http://www.meau.com.br/
 * @license http://www.opensource.org/licenses/mit-license.html
 */
$CI =& get_instance();
$CI->load->library('email');
// $CI->load->library('Base_Model');

class My_email extends CI_Email
{
    // DB table
    private $table_email_queue = 'notifikasi';
    private $table_email_queue_view = 'v_notifikasi_email';

    // Main controller
    private $main_controller = 'sys/queue_email/send_pending_emails';

    // PHP Nohup command line
    private $phpcli = 'nohup php';
    private $expiration = NULL;

    // Status (pending, sending, sent, failed)
    private $status;

    /**
     * Constructor
     */
    public function __construct($config = array())
    {
        parent::__construct($config);

        log_message('debug', 'Email Queue Class Initialized');

        $this->expiration = 60*5;
        $this->CI = & get_instance();

        $this->CI->load->database('default');
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
        // if ($this->status != FALSE)
        // $this->CI->db->where('q.notifikasi_status', $this->status);
        $this->CI->db->where_not_in('q.notifikasi_status', 2);
        $query = $this->CI->db->get("{$this->table_email_queue_view} q", $limit, $offset);

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
                'notifikasi_id'         => $this->generate_id(),
                'notifikasi_model'      => 1,
                'notifikasi_tgl'        => $date,
                'notifikasi_pengirim'   => $from,
                'notifikasi_penerima'   => $to,
                'notifikasi_isi'        => $this->_body,
                'notifikasi_data'       => serialize($this->_headers),
                'notifikasi_status'     => 0
            );
            if($dbdata['notifikasi_penerima'] == ""){
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
        $this->set_status('0');
        $emails = $this->get($limit, 0);
        echo "<pre>";
        var_dump($config);
        die();
        foreach ($emails as $email)
        {
            $this->initialize($config['init']);
            $this->clear(true);

            $recipients = explode(",", $email->penerima_surel);

            // $this->_headers = unserialize($email->headers);

            $this->to($recipients);

            $this->subject($email->notifikasi_perihal);
            $this->message(htmlspecialchars_decode($email->notifikasi_isi));
            $this->from($config['email']['from'], $config['email']['name']);

            $this->CI->db->where('notifikasi_id', $email->notifikasi_id);
            $this->CI->db->set('notifikasi_status', '1');
            $this->CI->db->set('notifikasi_tgl', date("Y-m-d H:i:s"));
            $this->CI->db->update($this->table_email_queue);

            if ($this->send(TRUE)) {
                $status = '2';
            } else {
                $status = '3';
            }

            $this->CI->db->where('notifikasi_id', $email->notifikasi_id);
            $this->CI->db->set('notifikasi_status', $status);
            $this->CI->db->set('notifikasi_tgl', date("Y-m-d H:i:s"));
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

        $this->CI->db->set('notifikasi_status', '0');
        $this->CI->db->where("(notifikasi_tgl < '{$date_expire}' AND notifikasi_status = '1')");
        $this->CI->db->or_where("notifikasi_status = '3'");

        $this->CI->db->update($this->table_email_queue);

        log_message('debug', 'Email queue retrying...');
    }

}