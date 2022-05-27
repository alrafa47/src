<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bank extends Base_Controller
{
    private $delete_letter_message = 'Berhasil menghapus Surat';

    public function __construct()
    {
        parent::__construct();
        $this->m_surat          = $this->model('sipas/surat',       true);
        $this->m_surat_view     = $this->model('sipas/surat_view',  true);
    }

    public function index()
    {
        $this->read();
    }

    public function read($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => (int)$tipe
            ));
        }

        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $filter = $this->filter_unit_bagian($filter);
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function aktif($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => '(IFNULL(surat_ishapus, 0) =  0)'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }

        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => '(surat_ishapus = 1)'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }
        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function batal_nomor($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'IFNULL(surat_nomor_isbatal, 0) = 1'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }
        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function salin_nomor($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'IFNULL(surat_nomor_issalin, 0) = 1'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }
        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function musnah($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'IFNULL(surat_ismusnah, 0) = 1'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }

        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function arsip($tipe = null)
    {
        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $filter    = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        $limit     = varGet('limit', null);
        $start     = varGet('start', 0);
        $sorter    = json_decode(varGet('sort', '[]'));

        $id = varGet('id');

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'IFNULL(surat_isarsip, 0) = 1'
        ));

        if ($tipe) {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_model',
                'value' => $tipe
            ));
        }

        if (array_key_exists('id', $_GET)) {
            $record = $model->read($_GET['id']);
            $this->response_record($record);
        } else {
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            $this->response($records);
        }
    }

    public function filter_unit_bagian($filter)
    {
        $unit = varGet('unit');
        $bagianUnit = varGet('bagian_unit');
        if ($unit != 'semua') {
            if ($bagianUnit == 'semua') {
                array_unshift($filter, (object)array(
                    'type'  => 'custom',
                    // 'value' => "unit_id = '$unit' || unit_induk_id = '$unit'"
                    'value' => "unit_parent_path LIKE '%$unit%'"
                ));
            } else if ($bagianUnit != 'semua') {
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'unit_id',
                    'value' => $bagianUnit
                ));
            }
        }
        return $filter;
    }
}
