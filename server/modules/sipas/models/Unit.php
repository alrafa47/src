<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Unit extends Base_model
{

    protected $parent_field = 'unit_induk';
    protected $manager_field = 'unit_manager';
    protected $children_field = 'children';
    protected $total_field = 'total';
    protected $root_field = 'root';
    protected $root_field_value = '.';
    protected $leaf_field = 'leaf';
    protected $sorter = array('unit_kode' => 'asc', 'unit_nama' => 'asc');
    protected $_count_temp = 0;
    protected $_count_loop = 0;

    public function __construct($model = null)
    {

        if (empty($model)) {
            $model = array(
                'table' => array(
                    'name' => 'unit',
                    'primary' => 'unit_id',
                    'fields' => array(
                        array(
                            'name' => 'unit_id',
                            'display' => 'Id',
                            'update' => false,
                            'unique' => true,
                            'notnull' => true
                        ),
                        array(
                            'name' => 'unit_kode',
                            'display' => 'Kode unit',
                            'notnull' => true,
                            'unique' => true
                        ),
                        array(
                            'name' => 'unit_pos_code',
                            'display' => 'Unit pos code',
                            'unique' => true
                        ),
                        array(
                            'name' => 'unit_induk',
                            'display' => 'Induk unit'
                        ),
                        array(
                            'name' => 'unit_parent_path',
                            'display' => 'Induk unit'
                        ),
                        array(
                            'name' => 'unit_nama',
                            'display' => 'Nama unit',
                            'notnull' => true
                        ),
                        array(
                            'name' => 'unit_manager',
                            'display' => 'Manager unit'
                        ),
                        array(
                            'name' => 'unit_rubrik',
                            'display' => 'Kode Rubrik unit',
                            'unique' => false
                        ),
                        array(
                            'name' => 'unit_isaktif',
                            'display' => 'Aktif unit'
                        ),
                        array(
                            'name' => 'unit_ishapus',
                            'display' => 'Aktif unit'
                        ),
                        array(
                            'name' => 'unit_properti',
                            'display' => 'Properti'
                        ),
                        array(
                            'name' => 'unit_isbuatsurat',
                            'display' => 'buat surat unit'
                        )
                    ),
                    'limit' => null,
                ),
                'auto_id' => true
            );
        }
        parent::__construct($model);
    }

    // public function tree($root = null, $filter = array(), $recursive = false, $status  = 'read')
    // {
    //     $this->_count_temp = 0;
    //     $counter = 0;
    //     $this->_count_loop = 0;
    //     $data = $this->collectchild($root, $filter, $recursive, true, $status);
    //     $record = array(
    //         $this->total_field => $this->_count_temp,
    //         $this->root_field => $root ? $root : $this->root_field_value,
    //         $this->children_field => $data
    //     );
    //     $this->_count_temp = 0;
    //     return $record;
    // }

    public function tree($root = null, $filter = array(), $recursive = false)
    {
        $this->_count_temp = 0;
        $counter = 0;
        $data = $this->collectchild($root, $filter, $recursive, true);
        $record = array(
            $this->total_field => $this->_count_temp,
            $this->root_field => $root ? $root : $this->root_field_value,
            $this->children_field => $data
        );
        $this->_count_temp = 0;
        return $record;
    }

    // public function collectchild($root = null, $filter = array(), $recursive = true, $count_record = true, $status = 'read')
    // {
    //     $CI = get_instance();
    //     $aktif = $CI->model('sipas/unit_aktif_view', true);
    //     $nonaktif = $CI->model('sipas/unit_nonaktif_view', true);
    //     if ($this->_count_loop == 0) {
    //         $field = 'unit_id';
    //         $filter_with_root[$field] = $root;
    //         $records = $this->find($filter_with_root, null, null, false, $this->sorter);
    //     } else {
    //         $field = 'unit_induk';
    //         $filter_with_root[$field] = $root;
    //         switch ($status) {
    //             case 'read':
    //                 $records = $this->find($filter_with_root, null, null, false, $this->sorter);
    //                 break;
    //             case 'nonaktif':
    //                 $filter_with_root['unit_isaktif'] = null;
    //                 $records = $this->find($filter_with_root, null, null, false, $this->sorter);
    //                 break;
    //             case 'aktif':
    //                 $records = $aktif->find($filter_with_root, null, null, false, $this->sorter);
    //                 break;
    //         }
    //     }
    //     $this->_count_loop++;
    //     if ($count_record) {
    //         $this->_count_temp = $this->_count_temp + (count($records));
    //     }
    //     foreach ($records as $idx => $rec) {
    //         $id = $this->get_id($rec);
    //         $rec[$this->leaf_field] = $this->isleaf($id, $filter);
    //         if (!$rec[$this->leaf_field]) {
    //             $rec[$this->children_field] = $this->collectchild($id, $filter, $recursive, $count_record);
    //         }
    //         $this->_count_loop = 0;
    //         $records[$idx] = $rec;
    //     }
    //     return $records;
    // }

    public function collectchild($root = null, $filter = array(), $recursive = true, $count_record = true)
    {
        if (is_null($root)) {
            $filter_with_root = $filter;
        } else {
            $filter_with_root[$this->parent_field] = $root;
        }
        $records = $this->find($filter_with_root, null, null, false, $this->sorter);
        if ($count_record) {
            $this->_count_temp = $this->_count_temp + (count($records));
        }
        foreach ($records as $idx => $rec) {
            // echo '<pre>';
            // print_r($rec);
            // echo '</pre>';
            // echo '<br>';
            $id = $this->get_id($rec);
            $rec[$this->leaf_field] = $this->isleaf($id, $filter);
            if ($recursive) {
                $rec[$this->children_field] = $this->collectchild($id, $filter, $recursive, $count_record);
            }
            $records[$idx] = $rec;
        }
        // die;
        return $records;
    }

    public function isleaf($id = null, $filter = array())
    {
        // $filter_with_id = $filter;
        $filter_with_id[$this->parent_field] = $id;
        $count = $this->db->where($filter_with_id)->from($this->get_table_name())->count_all_results();
        return !$count;
    }

    // public function isleaf($record)
    // {
    //     $is_leaf = true;
    //     if (!$record['unit_induk']) {
    //         $is_leaf = false;
    //     } else if ($record['unit_parent_path']) {
    //         $explode = explode('/', $record['unit_parent_path']);
    //         // jika bagian akhir path == id unitnya sendiri maka dia adalah leaf/ujung dari tree
    //         if (end($explode) == $record['unit_id']) {
    //             $is_leaf = true;
    //         } else {
    //             $is_leaf = false;
    //         }
    //     }
    //     return $is_leaf;
    // }
}
