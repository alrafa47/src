<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan extends Base_model {
    protected $parent_field = 'jabatan_induk';
    protected $unit_field = 'jabatan_unit';
    protected $children_field = 'children';
    protected $total_field = 'total';
    protected $root_field = 'root';
    protected $root_field_value = '.';
    protected $leaf_field = 'leaf';
    protected $sorter = array('jabatan_kode'=>'asc', 'jabatan_nama'=>'asc');
    protected $_count_temp = 0;

    public function __construct($model = null){

        $CI = get_instance();
        $this->m_unit   = $CI->model('sipas/unit', true);
        $this->m_unit_cakupan   = $CI->model('sipas/unit_cakupan', true);
        $this->m_unit_cakupan_view  = $CI->model('sipas/unit_cakupan_view', true);
        $this->m_unit_cakupan_hidup_view  = $CI->model('sipas/unit_cakupan_hidup_view', true);
        
        if(empty($model)){
            $model = array(
                'table' =>array(
                    'name'=>'jabatan',
                    'primary'=>'jabatan_id',
                    'fields'=> array(
                        array(
                            'name'=>'jabatan_id',
                            'update'=>false,
                            'unique'=>true,
                            'notnull'=>true
                        ),
                        array(
                            'name'=>'jabatan_kode',
                            'display'=>'Kode Jabatan'
                            //'unique'=>true
                        ),
                        array(
                            'name'=>'jabatan_pos_code',
                            'display'=>'Jabatan Pos Code',
                            'unique'=>true
                        ),
                        array(
                            'name'=>'jabatan_nama',
                            'display'=>'Nama Jabatan'
                        ),
                        array(
                            'name'=>'jabatan_induk',
                            'display'=>'Induk Jabatan'
                        ),
                        array(
                            'name'=>'jabatan_isaktif',
                            'display'=>'Jabatan Aktif'
                        ),
                        array(
                            'name'=>'jabatan_isnomor',
                            'display'=>'Kode Eselon'
                        ),
                        array(
                            'name'=>'jabatan_ispenerima',
                            'display'=>'Kode Eselon Penerima'
                        ),
                        array(
                            'name'=>'jabatan_unit',
                            'display'=>'Unit Kerja'
                        ),
                        array(
                            'name'=>'jabatan_parent_path',
                            'display'=>'Parent Path'
                        ),
                        array(
                            'name'=>'jabatan_properti',
                            'display'=>'Properti'
                        ),
                        array(
                            'name'=>'jabatan_ishapus',
                            'display'=>'Hapus'
                        )
                    ),
                    'limit'=>null,
                ),
                'auto_id'=>true
            );
        }
        parent::__construct($model);
    }

    public function tree($root = null, $filter = array(), $recursive = false){
        
        $this->_count_temp = 0;
        $counter = 0;
        $tree_filter = empty($filter) ? false : true;
        $data = $this->collectchild($tree_filter, $root, $filter, $recursive);
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

    public function count_scope($staf_jabatan = null, $staf_unit = null){
        $unit = $this->m_unit;
        $unit_cakupan_view = $this->m_unit_cakupan_hidup_view;

        $unit_scope = array();
        $scope_record   = $unit_cakupan_view->find(array('unit_cakupan_jabatan'=>$staf_jabatan));
        $currentUnit = $unit->read($staf_unit);
        
        if($currentUnit){
            array_unshift($scope_record, $currentUnit);
        }
        if($scope_record){
            foreach ($scope_record as $index => $unit_) {
                $temp = $unit_['unit_id'];
                array_push($unit_scope, $temp);
            }
            $unit_scope = array_unique($unit_scope);
        }
        return $unit_scope;
    }
}