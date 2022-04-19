<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Report extends Base_model
{
    public $leftlogo_path = null; // set on constructor
    public $leftlogo_url = null; // set on constructor
    public $rightlogo_path = null; // set on constructor
    public $rightlogo_url = null; // set on constructor

    public $logo1_path      = null;    // set on constructor
    public $logo2_path      = null;    // set on constructor
    public $logo3_path      = null;    // set on constructor
    public $logo4_path      = null;    // set on constructor
    public $logo5_path      = null;    // set on constructor

    public $logo1_url       = null;    // set on constructor
    public $logo2_url       = null;    // set on constructor
    public $logo3_url       = null;    // set on constructor
    public $logo4_url       = null;    // set on constructor
    public $logo5_url       = null;    // set on constructor

    // key surat_color follow model surat
    static $surat_color = array(
        1  => array('color' => '#1976D2', 'surat_model' => 'Masuk Eksternal'), // masuk
        2  => array('color' => '#FBC02D', 'surat_model' => 'Keluar Eksternal'), // keluar
        3  => array('color' => '#2196F3', 'surat_model' => 'Masuk Internal'), // imasuk
        4  => array('color' => '#FFEB3B', 'surat_model' => 'Keluar Internal')  // ikeluar
    );

    static $prioritas_color = array(
        'Ekspres'   => '#F44336',
        'Segera'    => '#FF9800',
        'Lambat'    => '#FFEB3B'
    );

    protected $logopdf          = '_path';
    protected $logodefault      = '_url';
    protected $headertrigger    = '_useheader'; //flag header used //
    protected $logotrigger      = '_uselogo'; //flag logo used //
    protected $tabletrigger     = 'datatable';
    protected $headersetting    = 'template_header'; // to get all pengaturan header //

    protected $logo_template    = array(
        '{logo1}' => array('logo1_path', 'logo1_url'),
        '{logo2}' => array('logo2_path', 'logo2_url'),
        '{logo3}' => array('logo3_path', 'logo3_url'),
        '{logo4}' => array('logo4_path', 'logo4_url'),
        '{logo5}' => array('logo5_path', 'logo5_url')
    );

    protected $template_sign    = array(array('{', '}'));
    protected $table_template    = array('korespondensi' => 'sipas/korespondensi');

    protected $header_template  = array('{header1}', '{header2}', '{header3}', '{header4}', '{header5}');
    protected $header_convert   = array('header4' => 'header_umum', 'header5' => 'header_pelaporan');

    function __construct()
    {
        parent::__construct();
        $CI = get_instance();

        $this->m_setting    = $CI->model('sipas/pengaturan', true);
        $this->m_asset      = $CI->model('sipas/asset', true);
        $this->m_surat      = $CI->model('sipas/surat', true);

        $this->config->load('application_config');

        $this->load->helper(array('download', 'pdf', 'url', 'assets', 'csslib', 'chart', 'excel'));
        $this->load->config('csslib');
        $this->load->library('parser');

        $this->leftlogo_url     = site_url() . $this->config->item('leftlogo_url');
        $this->rightlogo_url    = site_url() . $this->config->item('rightlogo_url');
        $this->logo1_url        = site_url() . $this->config->item('logo1_url');
        $this->logo2_url        = site_url() . $this->config->item('logo2_url');
        $this->logo3_url        = site_url() . $this->config->item('logo3_url');
        $this->logo4_url        = site_url() . $this->config->item('logo4_url');
        $this->logo5_url        = site_url() . $this->config->item('logo5_url');
        $this->logo_draft_url        = site_url() . $this->config->item('logo_draft_url');

        $this->leftlogo_path    = BASEPATH . '../' . $this->config->item('leftlogo_path');
        $this->rightlogo_path   = BASEPATH . '../' . $this->config->item('rightlogo_path');
        $this->logo1_path       = BASEPATH . '../' . $this->config->item('logo1_path');
        $this->logo2_path       = BASEPATH . '../' . $this->config->item('logo2_path');
        $this->logo3_path       = BASEPATH . '../' . $this->config->item('logo3_path');
        $this->logo4_path       = BASEPATH . '../' . $this->config->item('logo4_path');
        $this->logo5_path       = BASEPATH . '../' . $this->config->item('logo5_path');
        $this->logo_draft_path  = BASEPATH . '../' . $this->config->item('logo_draft_path');
    }

    function getLocaleMonth($mont = 0)
    {
        $mont = (int)$mont;
        $month = array('', 'Januari', 'Pebruari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember');

        return $month[$mont];
    }

    function generateInstanceLogo($for_pdf = false)
    {
        if ($for_pdf === true) {
            return '<img src="' . $this->leftlogo_path . '">';
        } else {
            return '<img src="' . site_url() . '/sipas/asset/img/template_header_instancelogo.png">';
        }
    }

    function generateLeftLogo($for_pdf = false)
    {
        $html = '';
        $enableLeftlogo = $this->m_setting->getSettingByCode('template_header_useleftlogo');
        if ($enableLeftlogo) {
            $html = '<img src="' . ($for_pdf ? $this->leftlogo_path : $this->leftlogo_url) . '">';
        }
        return $html;
    }

    function generateRightLogo($for_pdf = false)
    {
        $html = '';
        $enableRightlogo = $this->m_setting->getSettingByCode('template_header_userightlogo');
        if ($enableRightlogo) {
            $html = '<img src="' . ($for_pdf ? $this->rightlogo_path : $this->rightlogo_url) . '">';
        }
        return $html;
    }

    function generateHeaderLetter()
    {
        $html = '';
        $headerletter = $this->m_setting->getSettingByCode('template_header');
        if ($headerletter) {
            // $html = $headerletter;
            $html = htmlspecialchars_decode($headerletter);
        }
        return $html;
    }

    function generateHeaderOld($for_pdf = false, $colspan = 0)
    {
        $colspan = ($colspan) ? 'colspan="' . ($colspan - 2) . '"' : ''; // colspan - 2 for header left and header right//
        $html = '<table cellspacing="0" cellpadding="0" style="margin:0px auto; width:100%;">';
        $html .= '<tr>';
        $html .= '<td width="100px" style="text-align:left; vertical-align:middle;">' . $this->generateLeftLogo($for_pdf) . '</td>';
        $html .= '<td ' . $colspan . ' style="text-align:center; vertical-align:middle;">' . $this->generateHeaderLetter() . '</td>';
        $html .= '<td width="100px" style="text-align:center; vertical-align:middle;">' . $this->generateRightLogo($for_pdf) . '</td>';
        $html .= '</tr>';
        $html .= '</table>';
        $html .= '<div style="margin: 10px 0px; height: 0px; border-top: 2px solid black; border-bottom: 0px solid black;"></div>';

        return $html;
    }

    function generateHeader($for_pdf = false, $colspan = 0, $mode = 'header5')
    {
        return $this->getHeader($mode, $for_pdf, $colspan);
    }

    function generatePeriode($periode = null, $value = null, $asfilename = false)
    {
        $return = null;

        switch ($periode) {
            case 'date':
                $return = "Tanggal " . date("d M Y", strtotime($value));
                break;

            case 'beforedate':
                $return = "Sebelum Tanggal " . date("d M Y", strtotime($value));
                break;

            case 'afterdate':
                $return = "Setelah Tanggal " . date("d M Y", strtotime($value));
                break;

            case 'daterange':
                $range = explode('|', $value);
                $return = date("d M Y", strtotime($range[0])) . " sampai " . date("d M Y", strtotime($range[1]));
                break;

            case 'month':
                $monthyear = explode('-', $value);
                $return = $this->getLocaleMonth($monthyear[1]) . " " . $monthyear[0];
                break;

            case 'year':
                $return = "Tahun " . $value;
                break;

            default:
                $return = "(Tanpa Filter)";
                break;
        }
        return ($asfilename) ? str_replace(' ', '_', $return) : $return;
    }

    function generateField($param_unit = null, $periode = null, $value = null)
    {
        $return = null;
        $surat = $this->m_surat;

        switch ($periode) {
            case 'date':
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'DATE(surat_tanggal)'   => $value
                );
                break;

            case 'beforedate':
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'DATE(surat_tanggal) < '   => $value
                );
                break;

            case 'afterdate':
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'DATE(surat_tanggal) > '   => $value
                );
                break;

            case 'daterange':
                $values = explode("|", $value);
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'DATE(surat_tanggal) >= ' => $values[0],
                    'DATE(surat_tanggal) <= ' => $values[1]
                );
                break;

            case 'month':
                $monthyear = explode('-', date("Y-m", strtotime($value)));
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'MONTH(surat_tanggal) ' => $monthyear[1],
                    'YEAR(surat_tanggal) ' => $monthyear[0]
                );
                break;

            case 'year':
                $return = array(
                    $surat::$field_unit    => $param_unit,
                    'YEAR(surat_tanggal) ' => $value
                );
                break;

            default:
                $return = array(
                    $surat::$field_unit    => $param_unit
                );
                break;
        }

        if (!$param_unit) {
            unset($return[$surat::$field_unit]);
        }
        return $return;
    }

    function generateFieldBy($periode = null, $value = null, $date_field = 'surat_tanggal')
    {
        $return = null;

        switch ($periode) {
            case 'date':
                $return = array(
                    'DATE(' . $date_field . ')'   => $value
                );
                break;

            case 'beforedate':
                $return = array(
                    'DATE(' . $date_field . ') < '   => $value
                );
                break;

            case 'afterdate':
                $return = array(
                    'DATE(' . $date_field . ') > '   => $value
                );
                break;

            case 'daterange':
                $values = explode("|", $value);
                $return = array(
                    'DATE(' . $date_field . ') >= ' => $values[0],
                    'DATE(' . $date_field . ') <= ' => $values[1]
                );
                break;

            case 'month':
                $monthyear = explode('-', date("Y-m", strtotime($value)));
                $return = array(
                    'MONTH(' . $date_field . ') ' => $monthyear[1],
                    'YEAR(' . $date_field . ') ' => $monthyear[0]
                );
                break;

            case 'year':
                $return = array(
                    'YEAR(' . $date_field . ') ' => $value
                );
                break;

            default:
                $return = array();
                break;
        }

        return $return;
    }

    function generateSelectField($periode, $value = null, $date_field = 'surat_tanggal')
    {
        $_filter = array();
        switch (strtolower($periode)) {
            case 'date':
                array_unshift($_filter, array('type' => 'custom', 'value' => "DATE(" . $date_field . ") = '" . $value . "'"));
                break;

            case 'daterange':
                $daterange = explode('|', $value);
                array_unshift($_filter, array('type' => 'custom', 'value' => "DATE(" . $date_field . ") >= '" . $daterange[0] . "'"));
                array_unshift($_filter, array('type' => 'custom', 'value' => "DATE(" . $date_field . ") <= '" . $daterange[1] . "'"));
                break;

            case 'beforedate':
                array_unshift($_filter, array('type' => 'custom', 'value' => "DATE(" . $date_field . ") < '" . $value . "'"));
                break;

            case 'afterdate':
                array_unshift($_filter, array('type' => 'custom', 'value' => "DATE(" . $date_field . ") > '" . $value . "'"));
                break;

            case 'month':
                $month = explode('-', $value);
                array_unshift($_filter, array('type' => 'custom', 'value' => "MONTH(" . $date_field . ") = '" . (int)$month[1] . "'"));
                array_unshift($_filter, array('type' => 'custom', 'value' => "YEAR(" . $date_field . ") = '" . (int)$month[0] . "'"));
                break;

            case 'year':
                array_unshift($_filter, array('type' => 'custom', 'value' => "YEAR(" . $date_field . ") = '" . $value . "'"));
                break;
            default:
                break;
        }

        return $_filter;
    }

    function getMarkedData($markupLib = array(), $dataInput = array(), $keepAllField = true)
    {
        $data = $dataInput;
        foreach ($markupLib as $key => $mark) {
            $data[$key] = array_key_exists($mark, $dataInput) ? $dataInput[$mark] : null;
        }

        $dataReturn = array();
        if (!$keepAllField) {
            foreach ($markupLib as $key => $mark) {
                $dataReturn[$key] = array_key_exists($key, $data) ? $data[$key] : null;
            }
        } else {
            $dataReturn = $data;
        }
        return $dataReturn;
    }

    function generateReport($template = null, $data = array(), $print = true, $load = false)
    {
        $ci = get_instance();
        $this->output->set_content_type('text/html');
        $parsed = "";
        if ($load) {
            $parsed = $this->parser->parse($template, $data, true);
        } else {
            $parsed = $this->parser->parse_string($template, $data, true);
        }
        /* for PHP under version 7
        $parsed = preg_replace_callback("/\{[a-zA-Z0-9\s-\+_\/\?]+\}/", function($matches){
            return "";
        }, $parsed); */
        $parsed = preg_replace_callback("/\{[a-zA-Z0-9\s\-\+_\/\?]+\}/", function ($matches) {
            return "";
        }, $parsed);
        if ($print) {
            echo $parsed;
        }

        return $parsed;
    }

    function generateReportPdf($template = null, $data = array(), $filename = 'report', $mode = 'D', $landscape = true, $watermark = null)
    {
        $content = $this->generateReport($template, $data, false);

        if ($watermark) $watermark = $this->logo_draft_path;

        create_pdf($content, $filename, $landscape, $mode, $watermark);
    }

    function generateChart($data = null, $base64mode = false)
    {
        if ($base64mode) {
            ob_clean();
            ob_start(); // Let's start output buffering.
            create_chart($data);
            $contents = ob_get_contents(); //Instead, output above is saved to $contents
            header('Content-Type:text/html'); // set to default buffer output type
            ob_end_clean(); //End the output buffer.

            return $dataUri = "data:image/jpg;base64," . base64_encode($contents);
        } else {
            ob_clean();
            create_chart($data);
        }
        return;
    }

    function generateExcel($template, $data, $file_name = 'report')
    {
        $content = $this->generateReport($template, $data, false);
        create_excel($content, $file_name);
    }

    function date_format($date, $format = 'd M Y H:i')
    {
        $obj_date = new DateTime($date);
        return $obj_date->format($format);
    }

    // NEW HEADER CREATOR //
    function getLogo($section = null, $for_pdf = false)
    {
        if (!$section) return;

        $template = $this->logo_template;
        $logoused = ($for_pdf) ? $template[$section][0] : $template[$section][1];
        if ($for_pdf) {
            $file = (file_exists($this->$logoused)) ? file_get_contents($this->$logoused) : '';
            if ($file) $base64mode = 'data:image/png;base64,' . base64_encode($file);
            return ($file) ? '<img src="' . $base64mode . '">' : '';
        } else {
            return (@getimagesize($this->$logoused)) ? '<img src="' . $this->$logoused . '">' : '';
        }
    }

    // New Header Setting //
    function getHeader($mode = 'header5', $for_pdf = false, $colspan = 0)
    {
        $pengaturan = $this->m_setting;
        $valuefield = $pengaturan->getValueField();
        $codefield  = $pengaturan->getCodeField();
        $listheader = null;
        $usedmode = $mode;
        $usedheader = '';

        $filter = array(
            array(
                'type'  => 'custom',
                'value' => "pengaturan_nama LIKE '%" . $this->headersetting . "%'",
            ),
            array(
                'type'  => 'custom',
                'value' => "(pengaturan_isi IS NOT NULL OR pengaturan_isi <> 0)"
            )
        );


        $sort = array(array('property' => $codefield, 'direction' => 'asc'));

        $listsetting = $pengaturan->select(array('filter' => json_encode($filter), 'sorter' => json_encode($sort)));
        $data        = $listsetting[$pengaturan->dataProperty];
        $listisi     = array_column($data, $valuefield);
        $listnama    = array_column($data, $codefield);

        if (!$usedmode) {
            if ($listsetting[$pengaturan->totalProperty] > 0) {

                foreach ($listnama as $key => $row) {
                    if (strpos($row, $this->headertrigger) > -1) {
                        $header_nama = str_replace($this->headertrigger, '', $row);
                        $keyheader = array_search($header_nama, $listnama);
                        $listheader[] = $data[$keyheader];
                    }
                }

                $mode = (!empty($listheader)) ? true : false;
            }
        } else {
            $usedmode = $this->headersetting . substr($usedmode, -1, 1);
            $keyused  = array_search($usedmode, $listnama);
            $listheader[] = $data[$keyused];
        }

        if ($mode) {
            $logos = array_keys($this->logo_template);
            foreach ($listheader as $row) {
                $header = $row[$valuefield];
                foreach ($logos as $logo) {
                    if (strpos($header, $logo) > -1) {
                        $checker    = $this->headersetting . $this->logotrigger . substr($logo, -2, 1);
                        $replacer   = (in_array($checker, $listnama)) ? $this->getlogo($logo, $for_pdf) : '';
                        $header     = str_replace($logo, $replacer, $header);
                    }
                }
                $usedheader = $header;
            }
        } else {
            $usedheader = $this->generateHeaderOld($for_pdf, $colspan);
        }

        return $usedheader;
    }

    function getHeaderMode($template = null)
    {
        if (!$template) return;
        $header_template = $this->header_template;
        $header_convert  = $this->header_convert;
        if (strpos($template, $header_template[0])) {
            $template_mode = trim($header_template[0], '{}');
            $template_mode = array($template_mode, $template_mode);
        } else if (strpos($template, $header_template[1])) {
            $template_mode = trim($header_template[1], '{}');
            $template_mode = array($template_mode, $template_mode);
        } else if (strpos($template, $header_template[2])) {
            $template_mode = trim($header_template[2], '{}');
            $template_mode = array($template_mode, $template_mode);
        } else if (strpos($template, '{header_pelaporan}')) {
            $template_mode = trim($header_template[4], '{}');
            $template_mode = array($header_convert[$template_mode], $template_mode);
        } else {
            // header umum
            $template_mode = trim($header_template[3], '{}');
            $template_mode = array($header_convert[$template_mode], $template_mode);
        }

        return $template_mode;
    }

    function parseData($template = null, $data = array())
    {
        if (!$template) return;
        if (!$data) return;

        $datatable      = $this->tabletrigger;
        $tables         = $this->table_template;
        $template_used  = array();
        $multi          = false;
        $outputkey      = '';
        $parsed         = '';

        // echo "<pre>";
        // print_r($data);
        // die();
        if (count($this->template_sign) > 1) {
            $sign = $this->template_sign;
            $multi = true;
        } else {
            $sign = $this->template_sign[0];
        }

        foreach ($tables as $table => $v_template) {
            if ($multi) {
            } else {
                $key = $sign[0] . $datatable . '_' . $table . $sign[1];
            }

            if (is_array($key)) {
            } else {
                if (strpos($template, $key) > -1) {
                    $template_used[$key] = $v_template;
                }
            }
        }

        foreach ($template_used as $key => $row) {
            if (empty($outputkey)) $outputkey = $key;

            $_template  = $this->load->view($row, null, true);
            $_parsed    = $this->parser->parse_string($_template, array('records' => $data), true);
            $parsed     .= $_parsed;
        }

        return array(trim($outputkey, '{}'), $parsed);
    }
}
