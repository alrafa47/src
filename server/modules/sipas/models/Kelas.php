<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Kelas extends Base_model {
    protected $parent_field = 'kelas_induk';
    protected $children_field = 'children';
    protected $total_field = 'total';
    protected $root_field = 'root';
    protected $root_field_value = '.';
    protected $leaf_field = 'leaf';
    protected $sorter = array('kelas_kode'=>'asc', 'kelas_nama'=>'asc');
    protected $_count_temp = 0;

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'kelas',
                'primary'=>'kelas_id',
                'fields'=> array(
                    array(
                        'name'=>'kelas_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'kelas_induk',
                        'display'=>'Induk',
                    ),
                    array(
                        'name'=>'kelas_parent_path',
                        'display'=>'Induk',
                    ),
                    array(
                        'name'=>'kelas_jenis',
                        'display'=>'Jenis',
                    ),
                    array(
                        'name'=>'kelas_kode',
                        'display'=>'Kode',
                        'notnull'=>true,
                        'unique'=>true
                    ),
                    array(
                        'name'=>'kelas_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'kelas_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'kelas_ishapus',
                        'display'=>'Hapus'
                    ),
                    array(
                        'name'=>'kelas_properti',
                        'display'=>'Properti'
                    ),
                    array(
                        'name'=>'kelas_retensi',
                        'display'=>'Retensi'
                    ),
                    array(
                        'name'=>'kelas_limitdays',
                        'display'=>'Inaktif'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    public function tree($root = null, $filter = array() ){
        
        $this->_count_temp = 0;
        $counter = 0;
        $tree_filter = empty($filter) ? false : true;
        $data = $this->collectchild($tree_filter, $root, $filter, true);
        $record = array(
            $this->total_field => $this->_count_temp,
            $this->root_field => $root ? $root : $this->root_field_value,
            $this->children_field => $data
        );
        $this->_count_temp = 0;
        return $record;
    }

    public function collectchild($tree_filter = false, $root = null, $filter = array(), $recursive = true, $count_record = true){
        $filter_with_root = $filter;
        if($tree_filter){ //true = ada filternya, for unit kerja
            if($root == null){ }else{ $filter_with_root[$this->parent_field] = $root; }
        }else{ //false = no filter, for jabatan
            $filter_with_root[$this->parent_field] = $root;
        }        

        $records = $this->find($filter_with_root, null, null, false, $this->sorter);

        if($count_record){
            $this->_count_temp = $this->_count_temp + (count($records));
        }
        foreach ($records as $idx => $rec) {
            $id = $this->get_id($rec);
            $rec[$this->leaf_field] = $this->isleaf($id, $filter);
            if($recursive){
                $rec[$this->children_field] = $this->collectchild($tree_filter, $id, $filter, $recursive, $count_record);
            }
            $records[$idx] = $rec;
        }
        return $records;
    }

    public function isleaf( $id = null, $filter = array() ){
        $filter_with_id = $filter;
        $filter_with_id[$this->parent_field] = $id;
        $count = $this->db->where($filter_with_id)->from($this->get_table_name())->count_all_results();
        return !$count;
    }
}