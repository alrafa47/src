<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('create_chart')) {
    function create_chart($config= array()) {
        error_reporting(0);
        $CI = get_instance();
        $CI->load->library('PhpGraph');

        $allowed_type   = array('bar', 'line', 'pie', 'stacked');

        $_config = array(
                        // type chart config
                        'type'              => 'bar',
                        'filename'          => false, // true to create file image 
                        'width'             => '500',
                        'height'            => '350',
                        'data'              => array(), 

                        // show data value in chart
                        'usedatavalue'      => true,
                        'datavaluecolor'    => '#000000',

                        // config title
                        'title'             => ' ',
                        'titlecolor'        => '#000000',
                        'titlelocation'     => 'center',

                        // config bar chart
                        'usebar'            => false,
                        'barcolor'          => array('#0000FF'), // array for mulitiple data
                        'baroutlinecolor'   => '#000000',

                        // config line chart
                        'useline'           => false,
                        'linecolor'         => array('#000000'), // array for multiple data
                        'pointsize'         => 8,
                        'pointcolor'        => 'maroon',

                        // config goalline
                        'usegoalline'       => false,
                        'goallinevalue'     => 0,
                        'goallinecolor'     => '#000000',
                        'goallinetype'      => 'solid',

                        // config legend
                        'uselegend'         => false,
                        'legendtextcolor'   => '#000000',
                        'legendtitle'       => array() // array for multiple data
                    );

        $config = array_merge($_config, $config);

        $config['type'] = (in_array(strtolower($config['type']), $allowed_type)) ? $config['type'] : $allowed_type[0];
        
        if($config['type'] == $allowed_type[0] || $config['type'] == $allowed_type[1]){
            if($config['filename']){
                $graph = new PHPGraphLib($config['width'], $config['height'], $config['filename']);
            }else{
                $graph = new PHPGraphLib($config['width'], $config['height']);
            }
        }else if($config['type'] == $allowed_type[2]){
            require APPPATH . 'third_party/phpgraphlib/phpgraphlib_pie.php';
            if($config['filename']){
                $graph = new PHPGraphLibPie($config['width'], $config['height'], $config['filename']);
            }else{
                $graph = new PHPGraphLibPie($config['width'], $config['height']);
            }
        }else{
            require APPPATH . 'third_party/phpgraphlib/phpgraphlib_stacked.php';
            if($config['filename']){
                $graph = new PHPGraphLibStacked($config['width'], $config['height'], $config['filename']);
            }else{
                $graph = new PHPGraphLibStacked($config['width'], $config['height']);
            }
        }

        if(! is_array($config['data'])) $config['data'] = (array)$config['data'];

        if($config['data']){
            foreach($config['data'] as $dt){
                $graph->addData($dt);
            }
        }

        $graph->setTitle($config['title']);
        $graph->setTitleColor($config['titlecolor']);
        $graph->setTitleLocation($config['titlelocation']);

        if($config['type'] != $allowed_type[3]) $graph->setDataValues($config['usedatavalue']);
        if($config['usedatavalue']) $graph->setDataValueColor($config['datavaluecolor']);

        // config bar and line chart
        if($config['type'] == $allowed_type[0] || $config['type'] == $allowed_type[1]){

            $config['usebar']   = ($config['type'] == $allowed_type[0]) ? true : $config['usebar'];
            $config['useline']  = ($config['type'] == $allowed_type[1]) ? true : $config['useline'];

            $graph->setBars($config['usebar']); 
            $graph->setLine($config['useline']);

            // config bar chart
            if($config['usebar']){

                $config['barcolor'] = ( ! is_array($config['barcolor'])) ? (array)$config['barcolor'] : $config['barcolor'];
                foreach($config['barcolor'] as $conf_bar){
                    $graph->setBarColor($conf_bar);
                }
                $graph->setBarOutlineColor($config['baroutlinecolor']);
            }

            // config line chart
            if($config['useline']){
                $graph->setDataPoints(true);
                $graph->setDataPointColor($config['pointcolor']);
                $graph->setDataPointSize($config['pointsize']);

                $config['linecolor'] = ( ! is_array($config['linecolor'])) ? (array)$config['linecolor'] : $config['linecolor'];
                foreach($config['linecolor'] as $conf_lc){
                    $graph->setLineColor($conf_lc);
                }
            }
        }

        if($config['type'] == $allowed_type[3]){
            $config['barcolor'] = ( ! is_array($config['barcolor'])) ? (array)$config['barcolor'] : $config['barcolor'];
            foreach($config['barcolor'] as $conf_bar){
                $graph->setBarColor($conf_bar);
            }
            $graph->setBarOutlineColor($config['baroutlinecolor']);
        }

        if($config['usegoalline']){
            $graph->setGoalLine($config['goallinevalue'], $config['goallinecolor'], $config['goallinetype']);
        }

        if($config['uselegend']){
            $graph->setLegend(true);
            $graph->setLegendOutlineColor('white');

            $config['legendtitle'] = ( ! is_array($config['legendtitle'])) ? (array)$config['legendtitle'] : $config['legendtitle'];
            foreach($config['legendtitle'] as $lg){
                $graph->setLegendTitle($lg);
            }

            $graph->setlegendTextColor($config['legendtextcolor']);
        }else{
            $graph->setLegend(false);
        }

        $graph->createGraph();
    }

}