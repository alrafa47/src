<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

/**
 * # Base_Model
 *
 * @package     base_model
 * @author      eko dedy purnomo <eko.dedy.purnomo@gmail.com>
 * @copyright   PT Sekawan Media Informatika <www.sekawanmedia.co.id>
 * @version     5.0.0
 *
 * # CHANGELOG
 * 5.0.0
 * - Roulette flavour for Base_Model (backward compatibility support)
 */

class Base_Model extends Base_model4
{
	static protected $proto = null;

	static function prototype()
	{
		if (!static::$proto) {
			static::$proto = new static;
		}

		$proto = static::$proto;

		if (func_num_args() > 0) {
			return $proto->set_model(func_get_arg(1));
		} else {
			return $proto;
		}
	}

	static function create($data = array())
	{
		$record = new static;
		$record->data = $data;
		$record->raw = $data;

		return $record;
	}

	static function load($id, Closure $callback = null)
	{
		$proto = static::prototype();

		$rawRecord = $proto->read($id);

		if ($rawRecord) {
			return static::create($rawRecord);
		}

		return;
	}

	static function gain($condition = array(), $associated = false, $rendered = false, $mapped = true, $order = null)
	{
		// $proto = static::prototype();

		// $operation = $proto->find($condition, $associated, $rendered, $mapped, $order);

		// if($operation[$proto->successProperty])
		// {
		// 	$records = array();
		// 	foreach ($operation[$proto->dataProperty] as $key => $value)
		// 	{

		// 	}

		// 	// return $records;
		// }

		// return $operation;
	}

	////////////
	// RECORD //
	////////////

	protected $data = array();

	protected $raw = array();

	function set($fieldName, $value = null)
	{
		if (is_array($fieldName)) {
			foreach ($fieldName as $f => $v) {
				$this->set($f, $v);
			}
			return $this;
		}

		$this->data[$fieldName] = $value;

		return $this;
	}

	function get($fieldName, $raw = false)
	{
		if (is_array($fieldName)) {
			$data = array();
			foreach ($fieldName as $i => $f) {
				$data[$f] = $this->get($f, $raw);
			}
			return $data;
		}

		$source = $raw ? $this->raw : $this->data;

		if (!array_key_exists($fieldName, $source)) return null;

		return $source[$fieldName];
	}

	function getData($raw = false)
	{
		$proto = static::prototype();
		$fields = $proto->get_fields_name();
		$data = $this->get($fields);

		return $data;
	}

	function getPrimary()
	{
		$proto = static::prototype();
		$primary = $proto->get_primary();

		return $primary;
	}

	function getId()
	{
		$primary = $this->getPrimary();
		return $this->get($this->getPrimary());
	}

	function hasId()
	{
		return !empty($this->getId());
	}

	function revert()
	{
		$this->data = $this->raw;
		return $this;
	}

	function commit()
	{
		$this->raw = $this->data;
		return $this;
	}

	function isModified()
	{
		return $this->data == $this->raw;
	}

	function isAlive()
	{
		$proto = static::prototype();
		$id = $this->getId();
		$exist = $proto->exist($id);

		return $exist;
	}

	function save($callback = null)
	{
		$proto = static::prototype();
		$id = $this->getId();
		$data = $this->getData();

		$operation = $proto->insert_update($id, $data);

		if ($operation[$proto->successProperty]) {
			$this->set($operation[$proto->dataProperty]);
			$this->commit();
		}

		if (is_callable($callback)) {
			call_user_func_array($callback, array($this, $operation));
		}

		return $operation;
	}

	function destroy($callback = null)
	{
		$proto = static::prototype();
		$id = $this->getId();

		$operation = $proto->delete($id);

		if (is_callable($callback)) {
			call_user_func_array($callback, array($this, $operation));
		}

		return $operation;
	}

	function lookup($assocName = null)
	{
	}
}

/**
 * Base_model
 *
 * @package     base_model
 * @author      eko dedy purnomo <eko.dedy.purnomo@gmail.com>
 * @copyright   PT Sekawan Media Informatika <www.sekawanmedia.co.id>
 * @version     4.0.5
 *
 * changelog
 * 4.0.5
 * - bugfix for filter date use datetime
 * changelog
 * 4.0.4
 * - bugfix for unique field
 * 4.0.3
 * - bugfix for select with get_view() error
 */

class Base_model4 extends CI_Model
{

	protected $model = null;
	protected $model_default = array(
		'auto_id' => false,
		'table' => array(
			'name' => null,
			'primary' => null,
			'fields' => array(),
			'associations' => array(),
			'limit' => null,
			'view' => array(),
		),
		'response_message' => array(
			'request_invalid' => 'Server tidak bisa membaca permintaan.',
			'insert_success' => 'Berhasil menyimpan data.',
			'insert_failed' => 'Gagal menyimpan data.',
			'insert_isexist' => 'Data dengan <b>{primary}</b>=<b>{primary_value}</b> sudah ada terdafatar.',
			'insert_null' => 'Data tidak lengkap.<b>{fields_notnull}</b> tidak boleh kosong.',
			'update_success' => 'Berhasil mengubah data.',
			'update_failed' => 'Gagal mengubah data.',
			'update_null' => 'Gagal mengubah data. Data tersebut tidak tersedia.',
			'delete_success' => 'Berhasil menghapus data.',
			'delete_failed' => 'Gagal menghapus data.',
			'delete_null' => 'Gagal menghapus data. Data tersebut tidak tersedia.',
			'unique' => '<b>{field}</b> "{value}" sudah terpakai.',
		),
		'validation_message' => array(
			'format_message' => '<b>{field}</b> tidak sesuai format.',
			'inclusion_message' => '<b>{field}</b> harus termasuk diantara: <b>{inclusion}</b>.',
			'exclusion_message' => '<b>{field}</b> tidak boleh termasuk dari: <b>{exclusion}</b>.',
			'minvalue_message' => 'Nilai <b>{field}</b> minimal <b>{minvalue}</b>.',
			'maxvalue_message' => 'Nilai <b>{field}</b> minimal <b>{maxvalue}</b>.',
			'above_message' => 'Nilai <b>{field}</b> harus diatas <b>{above}</b>.',
			'below_message' => 'Nilai <b>{field}</b> harus dibawah <b>{below}</b>.',
			'minlength_message' => 'Panjang <b>{field}</b> minimal <b>{minlength}</b> karakter.',
			'maxlength_message' => 'Panjang <b>{field}</b> minimal <b>{maxlength}</b> karakter.',
		),
		'event_listener' => array(
			'before_select' => null,
			'after_select' => null,
			'before_get' => null,
			'after_get' => null,
			'before_find' => null,
			'after_find' => null,
			'before_insert' => null,
			'after_insert' => null,
			'before_update' => null,
			'after_update' => null,
			'before_delete' => null,
			'after_delete' => null,
		),
	);

	protected $_records = array();
	protected $_lastquery = null;
	protected $_affectedrows = 0;
	protected $_insertid = null;

	public $dataProperty = 'data';
	public $messageProperty = 'message';
	public $totalProperty = 'total';
	public $successProperty = 'success';

	/* initializing */

	/**
	 * Base_model::__construct()
	 *
	 * @return $this
	 */
	function __construct($model = array())
	{
		parent::__construct();
		$this->set_model($model);
		return $this;
	}

	function get_constant($name = null)
	{
		try {
			$a = self::$name;
			return $a;
		} catch (Exception $e) {
			return null;
		}
	}

	/**
	 * Base_model::construct_field()
	 *
	 * prepare field for suitable config needed
	 * field attribute are
	 * <pre>
	 * name         string      default null    // field name (attribute name of the table from database)
	 * display      string      default $name   // field will show with this attribute on message response
	 * map          string      default $name   // field will output as this attribute (for I/O operation)
	 * public       bool        default true    // set this to false if the field is doesn't showable for client
	 * update       bool        default true    // set false if the field doesn't updateable
	 * insert       bool        default true    // set false if the field doens't insertable
	 * render       function    default null    // will modify the value before it goes to show to client, triggered manual
	 * convert      function    default null    // will modify the value before it goes to show to client, triggered automatic
	 * prepare      function    default null    // will modify the value before it goes to insert/update operation
	 * validation   array       default null    // array of the validation, for detail please see validation class
	 * usenull		bool 		default true 	// will be null if passed an empty string (trimed)
	 * notnull		bool 		default false 	// not allowed if value is null
	 * secure		bool 		default true 	// will be parse with secureValue function if true
	 * </pre>
	 *
	 * @param array $field fields config
	 * @return array $field_constructed the constructed field with true config
	 *
	 * @see Validation Class
	 */
	protected function construct_field($field = null)
	{
		$field_name = (array_key_exists('name', $field)) ? $field['name'] : null;
		$field = $this->construct_field_deprecated($field);

		$field_constructed = array_merge(array(
			'name' 		=> $field_name,
			'map' 		=> $field_name,
			'display' 	=> $field_name,
			'public' 	=> true,
			'update' 	=> true,
			'insert' 	=> true,
			'render' 	=> null,
			'prepare'	=> null,
			'convert'	=> null,
			'validation' => array(),
			'unique' 	=> false,
			'uniqueOnNull' => false,
			'usenull'	=> true,
			'notnull'	=> false,
			'secure'	=> true
		), $field);
		if (is_string($field_constructed['render'])) {
			$field_constructed['render'] = preg_replace('/(self|\{class\})/', get_class($this), $field_constructed['render']);
		}
		if (is_string($field_constructed['prepare'])) {
			$field_constructed['prepare'] = preg_replace('/(self|\{class\})/', get_class($this), $field_constructed['prepare']);
		}
		if (empty($field_constructed['name'])) {
			throw new Exception("Failed initializing field, field must be have a name");
		}
		return $field_constructed;
	}
	protected function construct_field_deprecated($field = null)
	{
		if (is_array($field)) {
			if (!array_key_exists('validation', $field) or !is_array($field['validation'])) {
				$field['validation'] = array();
			}

			if (array_key_exists('notnull', $field) and !array_key_exists('notnull', $field['validation'])) {
				$field['validation']['notnull'] = $field['notnull'];
			}
		}
		return $field;
	}

	/**
	 * Base_model::construct_fields()
	 *
	 * construct many fields with the true attribute
	 *
	 * @param array $fields array of the fields with its config attribute
	 * @return array $constructed_fields the constructed fields
	 */
	protected function construct_fields($fields = null)
	{
		$fields_consructed = array();
		foreach ((array) $fields as $index => $field) {
			if (is_array($field)) {
				if (!empty($field['name'])) {
					$fkey = $field['name'];
				} else {
					$fkey = $index;
				}
			} else {
				$fkey = (string) $field;
				$field = array();
			}
			$fields_consructed[$fkey] = $this->construct_field($field);
		}
		return $fields_consructed;
	}

	/**
	 * Base_model::construct_association()
	 *
	 * construct true association config
	 *
	 * @param array $association association config
	 * @return array $constructed_association the true association config
	 */
	protected function construct_association($association = null)
	{
		$association_constructed = array_merge(array(
			'type' => 'has_many', // available type are has_many|has_one|belongs_to
			'model' => null,
			'primary' => null,
			'foreign' => null,
			'autoload' => false
		), $association);
		if (!empty($association_constructed['model'])) {
			$CI = &get_instance();
			$model_associated = $association_constructed['model'] . '_associated';
			if (!isset($CI->{$model_associated})) {
				$CI->load->model($association_constructed['model'], $model_associated);
			}
			if (empty($association_model['primary'])) {
				$CI->{$model_associated}->get_primary();
			}
			if (empty($association_model['foreign'])) {
				$CI->{$model_associated}->get_primary();
			}
		} else {
			throw new Exception("Failed initializing association, model can not null");
		}
		return $association_constructed;
	}

	/**
	 * Base_model::construct_associations()
	 *
	 * construct fields with the true config
	 *
	 * @param array $associations many fields with its attribute
	 * @return array $associations_constructed multiple fields with the true config
	 */
	protected function construct_associations($associations = null)
	{
		$associations_constructed = array();
		foreach ((array) $associations as $index => $association) {
			$associations_constructed[$index] = $this->construct_association($association);
		}
		return $associations_constructed;
	}

	/**
	 * Base_model::construct_tablename()
	 *
	 * will guess the table name by this model name if $tablename is empty
	 *
	 * @param string $tablename the name of the table
	 * @return string $tablename
	 */
	protected function construct_tablename($tablename = null)
	{
		if (empty($tablename)) {
			$tablename = preg_replace('/(_m|_model)?$/', '', strtolower(get_class($this)));
		}
		return $tablename;
	}

	/**
	 * Base_model::construct_table()
	 *
	 * construct table before it goes deep
	 *
	 * @param mixed $table
	 * @return array $table table constructed (include associations and fields also tablename)
	 */
	protected function construct_table($table = null)
	{
		$table_constructed = array_merge($this->model_default['table'], $table);
		$table_constructed['name'] = $this->construct_tablename($table['name']);
		$table_constructed['fields'] = $this->construct_fields($table['fields']);
		//$table_constructed['associations'] = $this->construct_associations($table['associations']);
		return $table_constructed;
	}

	/** self initialized setter function */

	/**
	 * Base_model::get_model()
	 *
	 * get the model
	 *
	 * @return array current model config
	 */
	function get_model()
	{
		return $this->model;
	}

	/**
	 * Base_model::set_model()
	 *
	 * set the current model
	 *
	 * @param array $model model config
	 * @return array current model config
	 */
	function set_model($model = null)
	{
		$model = array_merge($this->model_default, (array) $model);
		foreach ($model as $key => $value) {
			if (array_key_exists($key, $this->model_default) and is_array($model[$key])) {
				$model[$key] = array_merge($this->model_default[$key], $model[$key]);
			}
		}
		$model['table'] = $this->construct_table($model['table']);
		$this->model = $model;
		return $this->get_model();
	}

	/**
	 * Base_model::get_tablename()
	 *
	 * get the current table name
	 *
	 * @return string current table name
	 */
	function get_tablename()
	{
		return $this->model['table']['name'];
	}

	/**
	 * Base_model::get_table_name()
	 *
	 * alias of the Base_model::get_tablename()
	 */
	function get_table_name()
	{
		return $this->get_tablename();
	}

	/**
	 * Base_model::set_tablename()
	 *
	 * set the current table name
	 *
	 * @param string $tablename
	 * @return string current table name
	 */
	function set_tablename($tablename = null)
	{
		$this->model['table']['name'] = $this->construct_tablename($tablename);
		return $this->get_tablename();
	}

	/**
	 * Base_model::set_table_name()
	 *
	 * alias Base_model::set_tablename()
	 */
	function set_table_name($tablename = null)
	{
		return $this->set_tablename($tablename);
	}

	/**
	 * Base_model::get_table()
	 *
	 * get the current table config
	 *
	 * @return array current table config
	 */
	function get_table()
	{
		return $this->model['table'];
	}

	/**
	 * Base_model::set_table()
	 *
	 * set the current table config
	 *
	 * @param array $table config
	 * @return array current table config
	 */
	function set_table($table = null)
	{
		$this->model['table'] = $this->construct_table($table);
		return $this->get_table();
	}

	/**
	 * Base_model::get_primary()
	 *
	 * get the primary key
	 *
	 * @return string $primary current primary key/field
	 */
	function get_primary()
	{
		return $this->model['table']['primary'];
	}

	/**
	 * Base_model::set_primary()
	 *
	 * set the primary key
	 *
	 * @param string $primary_field it have to be a valid name of the primary in the table
	 * @return string primary
	 */
	function set_primary($primary_field = null)
	{
		$this->model['table']['primary'] = $primary_field;
		return $this->get_primary();
	}

	/**
	 * Base_model::get_view_limit()
	 *
	 * get limit config of the table
	 *
	 * @return integer limit of the table
	 */
	function get_limit()
	{
		if (array_key_exists('table', $this->model) and array_key_exists('limit', $this->model['table'])) {
			return $this->model['table']['limit'];
		}
	}

	/**
	 * Base_model::set_view_limit()
	 *
	 * set limit config
	 * limit by default used for Base_model::select() config
	 * its adjusted for ExtJS need
	 *
	 * @param integer $limit
	 * @return integer limit of the table
	 */
	function set_limit($limit = null)
	{
		$this->model['table']['limit'] = (int) $limit;
		return $this->get_view_limit();
	}

	/**
	 * Base_model::get_view_mode()
	 *
	 * get the view mode,
	 * based on the view items, and will return the (array) value of the matched view mode
	 *
	 * @param mixed $viewmode
	 * @return array field on matched view mode
	 */
	function get_view($viewmode = null)
	{
		if (!empty($this->model['table']['view'][$viewmode])) {
			return $this->model['table']['view'][$viewmode];
		}
		return null;
	}
	function get_view_model($viewmode = null)
	{
		return $this->get_view($viewmode);
	}

	/**
	 * Base_model::get_view_modes()
	 *
	 * get the view config
	 *
	 * @return array view mode config
	 */
	function get_views()
	{
		return $this->model['view']['mode'];
	}

	/**
	 * Base_model::set_view_mode()
	 *
	 * set the items for view, any same view mode will be replaced with the new one
	 *
	 * @param mixed $viewmode
	 * @param bool $purge
	 * @return array views
	 */
	function set_view($viewmode = null, $purge = false)
	{
		if ($purge === true) {
			$this->model['table']['view'] = null;
		}
		if (is_array($viewmode)) {
			foreach ($viewmode as $mode => $fields) {
				$this->model['table']['view'][$mode] = $fields;
			}
		}
		return $this->get_views();
	}

	/**
	 * Base_model::get_associations()
	 *
	 * get list of associations in the config
	 *
	 * @return array associations
	 */
	function get_associations()
	{
		if (array_key_exists('table', $this->model) and array_key_exists('associations', $this->model['table'])) {
			return $this->model['table']['associations'];
		}
	}

	/**
	 * Base_model::get_associations_model()
	 *
	 * get model name of associations in the config
	 *
	 * @return array model name
	 */
	function get_associations_model()
	{
		$associations_config = $this->construct_associations($this->get_associations());
		$associations = array();
		foreach ($associations_config as $association_index => $association) {
			$associations[] = $association['model'];
		}
		return $associations;
	}

	/**
	 * Base_model::get_associations_autoload()
	 *
	 * get model name of associations in the config
	 *
	 * @return array model name within autoload is true
	 */
	function get_associations_autoload()
	{
		$associations_config = $this->construct_associations($this->get_associations());
		$associations = array();
		foreach ($associations_config as $association_index => $association) {
			if ($association['autoload'] === true) {
				$associations[] = $association['model'];
			}
		}
		return $associations;
	}

	/**
	 * Base_model::get_field()
	 *
	 * get the field with the matched name given on parameter
	 *
	 * @param mixed $fieldname
	 * @return arrya $field config
	 */
	function get_field($fieldname = null)
	{
		if (array_key_exists($fieldname, $this->model['table']['fields'])) {
			return $this->model['table']['fields'][$fieldname];
		} else {
			return null;
		}
	}

	function add_field($field = array())
	{
		if (is_array($field) and array_key_exists($field, 'name')) {
			return $this->set_field($field['name'], $field);
		}
	}

	function add_fields($fields = array())
	{
		$added = array();
		if (is_array($fields)) {
			foreach ($fields as $index => $field) {
				$_added = $this->add_field($field);
				if ($_added) {
					$added[] = $_added;
				}
			}
		}
		return $added;
	}

	/**
	 * Base_model::set_fields()
	 *
	 * set the selected field
	 *
	 * @return array fields config
	 */
	function set_field($fieldname, $attributes = null)
	{
		$field_constructed = $this->construct_field($attributes);
		$field_constructed['name'] = $fieldname;
		$this->model['table']['fields'][$fieldname] = $field_constructed;
		return $field_constructed;
	}

	/**
	 * Base_model::get_fields()
	 *
	 * get all fields
	 *
	 * @return array fields
	 */
	function get_fields()
	{
		return $this->model['table']['fields'];
	}

	/**
	 * Base_model::set_fields()
	 *
	 * set the fields attibute
	 *
	 * @param mixed $fields
	 * @return mixed field just edited
	 */
	function set_fields($fields = null, $purge = false)
	{
		$fields_consructed = $this->construct_fields($fields);
		if ($purge) $this->model['table']['fields'] = array();
		foreach ($fields_consructed as $fkey => $field) {
			if (array_key_exists($fkey, $this->model['table']['fields'])) {
				$this->model['table']['fields'][$fkey] = array_merge($this->model['table']['fields'][$fkey], $field);
			} else {
				$this->model['table']['fields'][$fkey] = $field;
			}
		}
	}

	/**
	 * Base_model::get_fields_name()
	 *
	 * get the name attribute of the fields in the config
	 *
	 * @return array fields name
	 */
	function get_fields_name()
	{
		return array_keys($this->model['table']['fields']);
	}

	/**
	 * Base_model::get_fields_map()
	 *
	 * get the map attribute of the fields in the config
	 *
	 * @return array fields map
	 */
	function get_fields_map()
	{
		$fields = array();
		foreach ($this->model['table']['fields'] as $index => $field) {
			$fields[$index] = $field['map'];
		}
		return $fields;
	}

	/**
	 * Base_model::get_fields_display()
	 *
	 * get the display attribute of the fields in the config
	 *
	 * @return array fields display
	 */
	function get_fields_display()
	{
		$fields = array();
		foreach ($this->model['table']['fields'] as $index => $field) {
			$fields[$index] = $field['display'];
		}
		return $fields;
	}

	/**
	 * Base_model::get_fields_private()
	 *
	 * get fields within public attribute is false
	 *
	 * @return array private fields
	 */
	function get_fields_private()
	{
		$fields = array_keys(array_filter(
			$this->model['table']['fields'],
			function ($field) {
				return ($field['public'] === false);
			}
		));
		return $fields;
	}

	/**
	 * Base_model::get_fields_public()
	 *
	 * get fields within public attribute is true
	 *
	 * @return array public fields
	 */
	function get_fields_public()
	{
		$fields = array_keys(array_filter(
			$this->model['table']['fields'],
			function ($field) {
				return ($field['public'] === true);
			}
		));
		return $fields;
	}

	/**
	 * Base_model::get_fields_notnull()
	 *
	 * get fields within notnull validation is true
	 *
	 * @return array notnull fields
	 */
	function get_fields_notnull()
	{
		$fields = array_keys(array_filter(
			$this->model['table']['fields'],
			function ($field) {
				return (array_key_exists('notnull', $field['validation']) and $field['validation']['notnull'] === true);
			}
		));
		return $fields;
	}

	/**
	 * Base_model::get_fields_insert()
	 *
	 * get fields within insert attribute is true
	 *
	 * @return array fields insert
	 */
	function get_fields_insert()
	{
		$fields = array_keys(array_filter(
			$this->model['table']['fields'],
			function ($field) {
				return ($field['insert'] === true);
			}
		));
		return $fields;
	}

	/**
	 * Base_model::get_fields_update()
	 *
	 * get fields within update attribute is true
	 *
	 * @return array fields update
	 */
	function get_fields_update()
	{
		$fields = array_keys(array_filter(
			$this->model['table']['fields'],
			function ($field) {
				return ($field['update'] === true);
			}
		));
		return $fields;
	}

	/**
	 * Base_model::get_response()
	 *
	 * get a defined response message
	 *
	 * @param mixed $response
	 * @return string response message
	 */
	function get_response($response)
	{
		if (isset($this->model['response_message'][$response])) {
			return $this->model['response_message'][$response];
		} else {
			return null;
		}
	}

	/**
	 * Base_model::get_field_attribute()
	 *
	 * get the array of the value mathed attribute of the field
	 *
	 * @param mixed $attribute
	 * @param mixed $field
	 * @return array field within matched attibute
	 */
	function get_field_attribute($attribute = null, $field = null)
	{
		if (array_key_exists($field, $this->model['table']['fields'])) {
			if (array_key_exists($attribute, $this->model['table']['fields'][$field])) {
				return $this->model['table']['fields'][$field][$attribute];
			}
		}
		return null;
	}

	/**
	 * Base_model::get_fields_attribute()
	 *
	 * get the array of the value mathed attribute of the fields
	 *
	 * @param mixed $attribute
	 * @param mixed $fields
	 * @return array fields within matched attibute
	 */
	function get_fields_attribute($attribute = null, $fields = null)
	{
		if (is_array($fields)) {
			$return_fields = array();
			foreach ((array) $fields as $idx => $field) {
				$return_fields[$field] = $this->get_field_attribute($attribute, $field);
			}
			return $return_fields;
		} else {
			return $this->get_field_attribute($attribute, $fields);
		}
	}

	/**
	 * Base_model::get_id()
	 *
	 * get the id of (array)record
	 *
	 * @param array $record
	 * @return mixed integer|string id
	 */
	function get_id($record)
	{
		$key_id = $this->get_primary();
		if (array_key_exists($key_id, $record)) {
			return $record[$key_id];
		}
	}

	/** Data Utilization */

	/**
	 * Generate new unique id 32 char.
	 */
	function generate_id($salt = null)
	{
		$id = UUID::v4();

		return str_replace('-', '', $id);
	}

	/**
	 * Generate new formated code using comparing from database 
	 * @param  array  $config 	Set of configs
	 *                         	Available config are: `pattern`,`date_format`,`field`,`index_format`,`index_mask`
	 *                         	pattern: template format
	 *                         	date_format: formated code could use date value on it by the date_format
	 *                         	field: field to comparing as last code
	 *                         	index_format: formated code use incremental index and by this format
	 *                         	index_mask: any masked character will be replace with current index number
	 * @return string    		Formated code
	 */
	function generate_code($config = array())
	{
		$config = array_merge(array(
			'pattern'       => null,
			'date_format'   => 'ymd',
			'field'         => $this->get_primary(),
			'index_format'  => '000000',
			'index_mask'    => false,
			'index_date'  	=> date('Y-m-d H:i:s'),
			'index_year'    => date('Y'),
			'index_change'	=> 'month',
			'index_pattern'	=> null,
			'index_int'		=> null,
			'custom_filter'  => array()
		), $config);

		// $tpl used for reformat the output
		$tpl = new Template($config['pattern']);
		$tpl = new Template($tpl->apply(array(
			'date' => date($config['date_format'])
		)));
		// $tpl_query is used for query search
		$tpl_query = $tpl->apply(array('#' => '%'));

		// need to explode for calculating substring length
		$capsuled_string = explode('%', $tpl_query);
		$query_max = "substr({$config['field']},instr({$config['field']},'{$capsuled_string[0]}')+length('{$capsuled_string[0]}'))";
		$query_max = (isset($capsuled_string[1]) and ($capsuled_string[1] != "")) ? "cast(substring_index({$query_max},'{$capsuled_string[1]}',1) as unsigned)" : "cast(" . $query_max . " as unsigned)";
		$this->db->select_max($query_max, $config['field']);

		// processing the custom where
		if (is_string($config['custom_filter'])) {
			$config['custom_filter'] = array($config['custom_filter']);
		}

		if ($config['index_change'] === 'year') {
			$query = $this->db->get_where($this->get_table_name(), array_merge(array(
				'YEAR(' . $config['index_date'] . ') = ' . $config['index_year'] => null
			), $config['custom_filter']));
		} else {
			$query = $this->db->get_where($this->get_table_name(), array_merge(array(
				$config['field'] . ' like' => $tpl_query
			), $config['custom_filter']));
		}

		// increment the number, by default is 1, so if the max number is exit will add for it
		$next_number = 1;

		$row = $query->row_array();

		if ($row and !empty($row[$config['field']])) {
			$diff = $row[$config['field']];
			$next_number += (int)$diff;
		}

		// reformat as user requested format

		$next = str_pad($next_number, strlen($config['index_format']), '0', STR_PAD_LEFT);

		if ($config['index_mask'] === false) {
			$next = substr($next, (strlen($next) - strlen($config['index_format'])), strlen($next));
			return $tpl->apply(array('#' => $next));
		} else if ($config['index_mask'] === true) {
			return $next;
		} else {
			return $tpl->apply(array('#' => $config['index_mask']));
		}
	}

	/**
	 * Base_model::trigger()
	 *
	 * trigger matched in the defined event in event listener config
	 *
	 * @param mixed $event
	 * @return callback function
	 */
	function trigger($event)
	{
		if (!empty($this->model['event_listener'][$event])) {
			return callback($this->model['event_listener'][$event]);
		}
	}

	/**
	 * Base_model::display()
	 *
	 * transform each fields into its display attribute
	 * if no attribute setted it will be returned the plain value
	 *
	 * @param mixed $fields
	 * @return array display fields attribute
	 */
	function display($fields = null)
	{
		if (is_array($fields)) {
			$display = $this->get_fields_display();
			return transform_value($fields, $display);
		} else {
			$fields_display = $this->get_field_attribute('display', $fields);
			if (!empty($fields_display)) {
				return $fields_display;
			} else {
				return $fields;
			}
		}
	}

	/**
	 * Base_model::alias()
	 *
	 * create alias (for SQL purpose) of the given fields
	 *
	 * @param mixed $fields
	 * @return array fields with its alias (each)
	 */
	function alias($fields = null, $sql_mode = false)
	{
		$alias = $this->get_fields_map();
		foreach ((array) $fields as $key => $value) {
			if (!empty($alias[$value])) {
				$fields[$key] = $value . ' AS `' . $alias[$value] . '`';
			}
		}
		if ($sql_mode === true) {
			$fields = implode(', ', $fields);
		}
		return $fields;
	}

	/**
	 * Base_model::map_fields()
	 *
	 * alias map_fields_out
	 */
	function map_fields($field)
	{
		return $this->map_fields_out($field);
	}

	/**
	 * Base_model::map_fields_in()
	 *
	 * transform each key into matched field key based on its map attribute
	 * it is reverse of the map_fields_out
	 *
	 * @param mixed $fields
	 * @return array mapped fields
	 */
	function map_fields_in($fields)
	{
		if (is_array($fields)) {
			$transformator = $this->get_fields_map();
			$fields = transform_key($fields, $transformator);
		} else {
			$map = $this->get_field_attribute('map', $fields);
			if (!empty($map)) {
				$fields = $map;
			}
		}
		return $fields;
	}

	/**
	 * Base_model::map_fields_out()
	 *
	 * transform each key into map value, based on field key
	 * if not setted it will be returned the plain value
	 * it is reverse of the map_fields_out
	 *
	 * @param mixed $fields
	 * @return array mapped fields
	 */
	function map_fields_out($fields)
	{
		if (is_array($fields)) {
			$transformator = $this->get_fields_map();
			$fields = transform_key($fields, array_flip($transformator));
		} else {
			$map = array_flip($this->get_fields_map());
			if (!empty($map[$fields])) {
				$fields = $map[$fields];
			}
		}
		return $fields;
	}



	/**
	 * Base_model::validate()
	 *
	 * check validity of the fields value based on its fields validation config
	 * $fields = {
	 *   'fieldname1' => fieldsvalue1,
	 *   'fieldname2' => fieldsvalue2,
	 * }
	 * $this->validate($fields)
	 *
	 * @param mixed $fieldsvalue
	 * @return array [bool valid, string message]
	 */
	function validate($fieldsvalue = null)
	{
		$response = array('valid' => true, 'message' => array());
		$fieldsvalidator = $this->get_fields_attribute('validation', $this->get_fields_name());
		foreach ($fieldsvalue as $field_key => $field_value) {
			if (!empty($fieldsvalidator[$field_key]) and is_array($fieldsvalidator[$field_key])) {
				$validation = new Validation(
					array(
						'validator' => $fieldsvalidator[$field_key],
						'validation_message' => $this->model['validation_message']
					)
				);
				$validation_result = $validation->validate($field_value);
				$tpl = new Template(array('template' => $validation_result['message']));
				$validation_result['message'] = $tpl->apply(array('field' => $this->display($field_key)));
				if ($validation_result['valid'] === false) {
					$response['valid'] = false;
					$response['message'] = array_merge((array) $response['message'], (array) $validation_result['message']);
				}
			}
		}
		return $response;
	}

	/**
	 * Base_model::prepare()
	 *
	 * prepare data before it goes to insert/update operation
	 *
	 * @param mixed $values
	 * @param mixed $preparer (array of function) custom preparer
	 * @return array values already preparer
	 */
	function prepare($values, $preparer = null)
	{
		if (empty($preparer)) {
			$preparer = $this->get_fields_attribute('prepare', $this->get_fields_name());
		}
		if (!empty($preparer) and is_callable($preparer)) {
			// string mode or a function
			if (is_array($values)) {
				$values = array_map($preparer, $values);
			} else {
				$values = call_user_func_array($preparer, array($values));
			}
		} else if (is_array($preparer) and is_array($values)) {
			// array of function
			foreach ($values as $key => $value) {
				if (array_key_exists($key, $preparer) and is_callable($preparer[$key])) {
					$values[$key] = call_user_func_array($preparer[$key], array($value));
				}
			}
		}
		return $values;
	}

	/**
	 * Base_model::render()
	 *
	 * render data before it goes to view operation
	 *
	 * @param mixed $records
	 * @param mixed $renderer (array of function) custom renderer
	 * @return array renderer records
	 */
	function convert($records, $converter = null)
	{
		if (empty($converter) and !is_array($converter)) {
			$converter = $this->get_fields_attribute('convert', $this->get_fields_name());
		}

		if (is_array($records)) {
			// if the record is not fake record

			if (isAssoc($records)) {
				// if $record is single record
				foreach ($records as $record_key => $record_value) {
					if (array_key_exists($record_key, $converter) and is_callable($converter[$record_key])) {
						$records[$record_key] = call_user_func_array($converter[$record_key], array($record_value, $records));
					}
				}
			} else {
				//check if $records are multiple records
				foreach ($records as $record_index => $record) {
					$records[$record_index] = $this->render($record, $converter);
				}
			}
		}
		return $records;
	}

	/**
	 * Base_model::render()
	 *
	 * render data before it goes to view operation
	 *
	 * @param mixed $records
	 * @param mixed $renderer (array of function) custom renderer
	 * @return array renderer records
	 */
	function render($records, $renderer = null)
	{
		if (empty($renderer) and !is_array($renderer)) {
			$renderer = $this->get_fields_attribute('render', $this->get_fields_name());
		}

		if (is_array($records)) {
			// if the record is not fake record
			if (isAssoc($records)) {
				// if $record is single record
				foreach ($records as $record_key => $record_value) {
					if (array_key_exists($record_key, $renderer) and is_callable($renderer[$record_key])) {
						$records[$record_key] = call_user_func_array($renderer[$record_key], array($record_value, $records));
					}
				}
			} else {
				//check if $records are multiple records
				foreach ($records as $record_index => $record) {
					$records[$record_index] = $this->render($record, $renderer);
				}
			}
		}
		return $records;
	}

	function map($records, $mapper = null)
	{
	}

	/**
	 * Base_model::get_insertid()
	 *
	 * get the insert id from latest query operation
	 *
	 * @return integer latest insert id
	 */
	function get_insertid()
	{
		return $this->_insertid;
	}

	/**
	 * Base_model::set_insertid()
	 *
	 * set insert id
	 *
	 * @param mixed $id
	 * @return integer insert_id
	 */
	protected function set_insertid($id = null)
	{
		$this->_insertid = $id;
		return $this->get_insertid();
	}

	/**
	 * Base_model::get_lastquery()
	 *
	 * get the last query executed
	 *
	 * @return string query
	 */
	function get_lastquery()
	{
		return $this->_lastquery;
	}

	/**
	 * Base_model::set_lastquery()
	 *
	 * set last query
	 *
	 * @param mixed $query
	 * @return string query
	 */
	protected function set_lastquery($query = null)
	{
		$this->_lastquery = $query;
		return $this->get_lastquery();
	}

	/**
	 * Base_model::get_lastquery()
	 *
	 * get affected rows of last query executed
	 *
	 * @return integer affected rows
	 */
	function get_affectedrows()
	{
		return $this->_affectedrows;
	}

	/**
	 * Base_model::set_lastquery()
	 *
	 * set affected rows on last query
	 *
	 * @param mixed $query
	 * @return integer affected rows
	 */
	protected function set_affectedrows($affected_rows = null)
	{
		$this->_affectedrows = $affected_rows;
		return $this->get_affectedrows();
	}

	/**
	 * Base_model::get_records()
	 *
	 * get last fetced record
	 *
	 * @return array records
	 */
	function get_records()
	{
		return $this->_records;
	}

	/**
	 * Base_model::set_records()
	 *
	 * set last fetch record
	 *
	 * @param mixed $query
	 * @return array records
	 */
	protected function set_records($records = null)
	{
		$this->_records = $records;
		return $this->get_records();
	}

	/**
	 * Base_model::exist()
	 *
	 * check if the current record with the id (input of param) is already exist
	 *
	 * @param mixed $id
	 * @return bool existense status
	 */
	function exist($id = null, $numeric = false)
	{
		if (is_array($id)) {
			$result = $this->db->get_where($this->get_table_name(), $id);
		} else {
			$result = $this->db->get_where($this->get_table_name(), array($this->get_primary() =>
			$id));
		}
		$this->set_lastquery($this->db->last_query());
		if ($numeric === true) {
			return $result->num_rows();
		}
		if ($result->num_rows() > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Base_model::isexist()
	 *
	 * alias exist
	 */
	function isexist($id = null)
	{
		return $this->exist($id);
	}

	/**
	 * Base_model::count_exist()
	 *
	 * count of the existence record with the where config
	 *
	 * @param array $where where config (based CI where)
	 * @return integer record exist
	 */
	function count_exist($where = null)
	{
		$result = $this->db->get_where($this->get_table_name(), $where);
		$this->set_lastquery($this->db->last_query());
		return $result->num_rows();
	}

	/** Data Operation */

	/**
	 * Base_model::read()
	 *
	 * check count of the existence record with the where config
	 *
	 * @param mixed $id
	 * @param bool $rendered record rendered with its function
	 * @param bool $mapped fields will show with map attribute
	 * @return array record object as array
	 */
	function read($id = null, $associated = false, $rendered = false, $mapped = true)
	{
		$this->trigger('before_get');
		$record = null;

		if (empty($id)) {
			$this->trigger('after_get');
			return $record;
		}

		$filter = array();
		if (is_array($id)) {
			foreach ($id as $filter_field => $filter_value) {
				$filter[$this->map_fields_in($filter_field)] = $filter_value;
			}
		} else {
			$filter = array($this->map_fields_in($this->get_primary()) => $id);
		}

		$fields = $this->get_fields_name();
		$fields_mapper = $this->get_fields_map();
		$mapped_fields = array();
		foreach ($fields as $i => $f) {
			if (array_key_exists($f, $fields_mapper) and $fields_mapper[$f] != $f) {
				$mapped_fields[] = sprintf('%s AS `%s`', $fields_mapper[$f], $f);
			} else {
				$mapped_fields[] = $f;
			}
		}
		$sql_fields = implode(', ', $mapped_fields);
		$this->db->select($sql_fields);

		$query = $this->db->get_where($this->get_table_name(), $filter);

		$this->set_lastquery($this->db->last_query());
		$this->set_affectedrows($this->db->affected_rows());

		if ($record = $query->row_array()) {
			$records = array($record);
		} else {
			$records = array();
		}

		// fetch associated data
		if ($associated === true) {
			$associated = $this->get_associations_model();
		} else if (is_null($associated)) {
			$associated = $this->get_associations_autoload();
		} else if (is_array($associated)) {
			$associated = $associated;
		} else {
			$associated = array((string) $associated);
		}

		// convert the output
		foreach ($records as $record_index => $record) {
			$records[$record_index] = $this->convert($record, null, $mapped);
		}

		// fetch associated data
		if (!empty($associated)) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->associate_with($associated, $record, $mapped);
			}
		}

		// render output record
		if ($rendered === true) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->render($record, null, $mapped);
			}
		}
		foreach ($records as $record_index => $record) {
			$records[$record_index] = $this->render($record, null, $mapped);
		}

		$this->set_records(array($record));

		$this->trigger('after_get');
		return $record;
	}

	/**
	 * Base_model::find()
	 *
	 * find matched record with given condition
	 * condition is CI condition form
	 *
	 * @param mixed condition
	 * @param mix $associated it can be boolean or string or array of model name
	 * @param bool $rendered record rendered with its function
	 * @param bool $mapped fields will show with map attribute
	 * @return array records
	 */
	function find($condition = array(), $associated = false, $rendered = false, $mapped = true, $order = null)
	{
		$this->trigger('before_find');
		$records = null;

		if ($mapped) {
			if (is_array($condition)) {
				$condition = $this->map_fields_in($condition);
			}

			$this->db->select($this->alias($this->get_fields_name(), true));
		} else {
			$this->db->select(implode(' ,', $this->get_fields_name()));
		}

		if (!is_array($order)) {
			$order = array();
		}

		foreach ($order as $sorter => $direction) {
			$direction = strtolower($direction);
			if (!in_array($direction, array('asc', 'desc'))) {
				$direction = 'asc';
			}

			$this->db->order_by($sorter, $direction);
		}

		if (!is_null($condition)) {
			$this->db->where($condition);
		}
		$query = $this->db->get($this->get_table_name());

		$this->set_lastquery($this->db->last_query());
		$this->set_affectedrows($this->db->affected_rows());

		if ($query) {
			$records = $query->result_array();
		} else {
			$records = array();
		}

		// convert the output
		foreach ($records as $record_index => $record) {
			$records[$record_index] = $this->convert($record, null, $mapped);
		}

		// fetch associated data
		if ($associated === true) {
			$associated = $this->get_associations_model();
		} else if (is_string($associated) or is_array($associated)) {
			$associated = $associated;
		} else if (is_null($associated)) {
			$associated = $this->get_associations_autoload();
		} else {
			$associated = array((string) $associated);
		}
		if (!empty($associated)) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->associate_with($associated, $record, $mapped);
			}
		}
		// render output record
		if ($rendered === true) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->render($record, null, $mapped);
			}
		}

		$this->set_records($records);

		$this->trigger('after_find');
		return $records;
	}

	/**
	 * Base_model::find_by()
	 *
	 * shorthand for find record by single field and value.
	 * it mean fetch all record in the database without filtering
	 *
	 * @param string $field field filter
	 * @param mix $value condition
	 * @param mix $associated it can be boolean or string or array of model name
	 * @param bool $rendered record rendered with its function
	 * @param bool $mapped fields will show with map attribute
	 * @return array records
	 */
	function find_by($field, $value, $associated = false, $rendered = false, $mapped = true)
	{
		return $this->find(array($field => $value), $associated, $rendered, $mapped);
	}

	/**
	 * Base_model::get_all()
	 *
	 * shorthand for find with empty condition.
	 * it mean fetch all record in the database without filtering
	 *
	 * @param mixed $id
	 * @param bool $rendered record rendered with its function
	 * @param bool $mapped fields will show with map attribute
	 * @return array record object as array
	 */
	function find_all($associated = false, $rendered = false, $mapped = true, $order = null)
	{
		return $this->find(array(), $associated = false, $rendered = false, $mapped, $order);
	}

	/**
	 * Base_model::associate()
	 *
	 * get associated data
	 * based on association config
	 *
	 * @param array $record
	 * @return array record with associated data
	 */
	function associate($record = null)
	{
		if (empty($record)) $record = array();

		$associations = $this->model['table']['associations'];
		foreach ($associations as $association) {
			$record = $this->associate_by($association, $record);
		}
		return $record;
	}

	/**
	 * Base_model::associate_with()
	 *
	 * get associated data
	 * based on association config
	 *
	 * @param string $model defined associated model
	 * @param array $record
	 * @param bool $mapped tell if the record is mapped
	 * @return array record with associated data
	 */
	function associate_with($model, $record = null, $ismapped = true)
	{
		$associations = $this->model['table']['associations'];
		if (!is_array($model)) {
			$model = array((string) $model);
		}
		foreach ($associations as $association) {
			if (in_array($association['model'], $model)) {
				$record = $this->associate_by($association, $record, $ismapped);
			}
		}
		return $record;
	}

	/**
	 * Base_model::associate_by()
	 *
	 * get associated data
	 * based on association config
	 *
	 * @param array $association_config association config
	 * @param array $record
	 * @return array record with associated data
	 */
	function associate_by($association_config, $record = null, $mapped = true)
	{
		$association_config = $this->construct_association($association_config);
		$assoc_model = $association_config['model'] . '_associated';
		if ($association_config['type'] == 'has_one') {
			//$fkey = ($mapped === true) ? $this->map_fields_out($this->get_primary()) : $this->get_primary();
			$record[$association_config['foreign']] = $this->{$assoc_model}->get($record[$association_config['foreign']]);
		}
		if ($association_config['type'] == 'has_many') {
			$pkey = ($mapped === true) ? $this->map_fields_out($this->get_primary()) : $this->get_primary();
			$record[$association_config['foreign']] = $this->{$assoc_model}->find_by($this->get_primary(), $record[$pkey], false, false, $mapped);
		}
		if ($association_config['type'] == 'belongs_to') {
			$pkey = ($mapped === true) ? $this->map_fields_out($this->get_primary()) : $this->get_primary();
			$record[$association_config['foreign']] = $this->{$assoc_model}->get($record[$pkey]);
		}
		return $record;
	}

	/**
	 * Marked up given array into valid Base_model record
	 * @return Object
	 */
	function from($data = null)
	{
		$record = null;
		if (is_object($data)) {
			$record = (array) $data;
		}
		if (is_array($data)) {
			$record = array();
			$fields_name = $this->get_fields_name();
			foreach ($data as $key => $value) {
				if (in_array($key, $fields_name)) {
					$record[$key] = $value;
				}
			}
		}
		return $record;
	}

	/**
	 * Base_model::insert()
	 *
	 * insert operation
	 *
	 * @param mixed $id / $data     if it is array will be executed as data then
	 * @param mixed $data
	 * @param mixed $fn             callback
	 * @return array [bool succes status, string message response]
	 */
	function insert($id = null, $data = null, $fn = null)
	{
		$this->trigger('before_insert');

		$successProperty = $this->successProperty;
		$messageProperty = $this->messageProperty;
		$dataProperty = $this->dataProperty;

		$response = array(
			$successProperty => false,
			$messageProperty => $this->get_response('insert_failed'),
			$dataProperty => null,
		);
		$replacer = array();

		// initializing data and id
		if (is_array($id) or is_object($id)) {
			if (is_object($id)) {
				$id = (array) $id;
			}

			$data = $id;

			if (array_key_exists($this->get_primary(), $data)) {
				$id = $data[$this->get_primary()];
			} else {
				$id = null;
			}
		} else {
			if (!is_array($data) and !is_array($data)) {
				$data = array();
			}
			$data[$this->get_primary()] = $id;
		}

		if ($this->model['auto_id'] === true) {
			$data[$this->get_primary()] = $this->generate_id();
		}

		// mapping field before it goes deep execution
		$data = $this->map_fields_in($data);

		// execute procces
		if (isNull($data, $this->get_fields_notnull(), true)) {
			$response[$successProperty] = false;
			$response[$messageProperty] = $this->get_response('insert_null');

			$replacer['fields_notnull'] = implode(', ', transform_value($this->get_fields_notnull(), $this->get_fields_display()));
		} else {
			if ($this->exist($id)) {
				$response[$successProperty] = false;
				$response[$messageProperty] = $this->get_response('insert_isexist');

				$replacer['primary'] = $this->get_primary();
				$replacer['primary_value'] = $id;
			} else {
				$data = varMatch($data, $this->get_fields_insert());

				foreach ($data as $k => $v) {
					if (is_string($v) and trim($v) == "") {
						$data[$k] = null;
					}
				}

				$validation = $this->validate($data);
				if ($validation['valid'] === true) {

					$data = $this->prepare($data);
					$data = $this->secureFieldValue($data);
					$data = $this->convert_empty_string_to_null($data);

					$id = array_key_exists($this->get_primary(), $data) ? $data[$this->get_primary()] : null;
					$run_query = true;
					foreach ($data as $data_key => $data_value) {

						$unique = $this->get_field_attribute('unique', $data_key);
						if ($unique === true) {

							$uniqueOnNull = $this->get_field_attribute('uniqueOnNull', $data_key);

							if ($uniqueOnNull and !isset($data_value)) {
								continue;
							}

							if ($this->exist(array($data_key => $data_value))) {
								$response[$successProperty] = false;
								$response[$messageProperty] = $this->get_response('unique');

								$replacer['field'] = $this->display($data_key);
								$replacer['value'] = $data_value;
								$run_query = false;
								break;
							}
						}
					}
					if ($run_query === true) {
						$query = $this->db->insert($this->get_table_name(), $data);
						$last_query = $this->db->last_query();
						if ($query) {
							if ($id) {
								$this->set_insertid($id);
							} else {
								$id = $this->set_insertid($this->db->insert_id());
							}

							$this->set_affectedrows($this->db->affected_rows());
							$response[$successProperty] = true;
							$response[$messageProperty] = $this->get_response('insert_success');
							$response[$dataProperty] = $this->read($id);
						} else {
							$response[$successProperty] = false;
							$response[$messageProperty] = $this->get_response('insert_failed');
						}
						$this->set_lastquery($last_query);
					}
				} else {
					$response[$successProperty] = false;
					$response[$messageProperty] = $this->get_response('insert_failed') . "<br/>" . implode(
						'<br/>',
						$validation['message']
					);
				}
			}
		}
		$tpl = new Template($response[$messageProperty]);
		$response[$messageProperty] = $tpl->apply($replacer);

		$this->trigger('after_insert');

		if (is_callable($fn)) {
			call_user_func_array($fn, array($response));
		}
		return $response;
	}

	/**
	 * Base_model::update()
	 *
	 * update operation
	 *
	 * @param mixed $id
	 * @param mixed $data
	 * @param mixed $fn     callback
	 * @return array [bool success status, string message response]
	 */
	function update($id = null, $data = null, $fn = null, $force_update = false)
	{
		$this->trigger('before_update');

		$successProperty = $this->successProperty;
		$messageProperty = $this->messageProperty;
		$dataProperty = $this->dataProperty;

		$response = array(
			$successProperty => false,
			$messageProperty => $this->get_response('update_failed'),
			$dataProperty => null,
		);
		$replacer = array();

		// initializing data and id
		if (is_array($id) or is_object($id)) {
			if (is_object($id)) {
				$id = (array) $id;
			}

			$sql_where = $id;
		} else {
			$sql_where = array($this->get_primary() => $id);
		}

		// parsing with the match field
		$data = $this->map_fields_in($data);

		// execute procces
		if (isNull($data, $this->get_fields_notnull(), false)) {
			$response[$successProperty] = false;
			$response[$messageProperty] = $this->get_response('update_null');
		} else {
			if ($force_update === true) {
				$exist = true;
			} else {
				$exist = $this->exist($id);
			}

			if ($exist) {
				$data = varMatch($data, $this->get_fields_update(), false);

				foreach ($data as $k => $v) {
					if (is_string($v) and trim($v) == "") {
						$data[$k] = null;
					}
				}

				$validation = $this->validate($data);
				if ($validation['valid'] === true) {

					$data = $this->prepare($data);
					$data = $this->secureFieldValue($data);
					$data = $this->convert_empty_string_to_null($data);

					$run_query = true;

					foreach ($data as $data_key => $data_value) {
						$unique = $this->get_field_attribute('unique', $data_key);
						if ($unique === true) {
							$where_count = $sql_where;
							$where_count[$data_key] = $data_value;

							if (array_key_exists($this->get_primary(), $sql_where) and !is_array($sql_where[$this->get_primary()])) {
								unset($where_count[$this->get_primary()]);
								$where_count[$this->get_primary() . ' !='] = $sql_where[$this->get_primary()];
							}
							if ($this->count_exist($where_count) > 0) {
								if ($this->map_fields_in($this->get_primary()) != $data_key) {
									$response[$successProperty] = false;
									$response[$messageProperty] = $this->get_response('unique');
									$replacer['field'] = $this->display($data_key);
									$replacer['value'] = $data_value;
									$run_query = false;
									break;
								}
							}
						}
					}
					if ($run_query === true) {
						$query = $this->db->update($this->get_table_name(), $data, $sql_where);
						$last_query = $this->db->last_query();
						if ($query) {
							$this->set_affectedrows($this->db->affected_rows());
							$response[$successProperty] = true;
							$response[$messageProperty] = $this->get_response('update_success');
							$response[$dataProperty] = $this->read($sql_where);
							$this->set_lastquery($last_query);
						} else {
							$response[$successProperty] = false;
							$response[$messageProperty] = $this->get_response('update_failed');
						}
					}
				} else {
					$response[$successProperty] = false;
					$response[$messageProperty] = $this->get_response('update_failed') . "<br/>" . implode(
						'<br/>',
						$validation['message']
					);
				}
			} else {
				$response[$successProperty] = false;
				$response[$messageProperty] = $this->get_response('update_null');
			}
		}
		$tpl = new Template($response[$messageProperty]);
		$response[$messageProperty] = $tpl->apply($replacer);

		$this->trigger('after_update');
		if (is_callable($fn)) {
			call_user_func_array($fn, array($response));
		}
		// callback($fn, $response);

		return $response;
	}

	/**
	 * Base_model::insert_update()
	 *
	 * insert  operation or update (when record with the same id is already exist)
	 *
	 * @param mixed $id
	 * @param mixed $data
	 * @param mixed $fn     callback
	 * @return array [bool success status, string message response]
	 */
	function insert_update($id = null, $data = null, $fn = null)
	{
		if ($this->exist($id)) {
			return $this->update($id, $data, $fn, true);
		} else {
			return $this->insert($id, $data, $fn);
		}
	}

	/**
	 * Base_model::delete()
	 *
	 * delete operation
	 *
	 * @param mixed $id
	 * @param mixed $fn
	 * @return array [bool success status, string message response]
	 */
	function delete($id, $fn = null, $force_delete = false)
	{
		$this->trigger('before_delete');

		$successProperty = $this->successProperty;
		$messageProperty = $this->messageProperty;
		$dataProperty = $this->dataProperty;

		$response = array(
			$successProperty => false,
			$messageProperty => $this->get_response('delete_failed'),
			$dataProperty => null,
		);
		$replacer = array();

		// initializing id is single value or array
		if (is_array($id)) {
			$sql_where = $id = $this->map_fields_in($id);
		} else {
			$sql_where = array($this->get_primary() => (string) $id);
		}

		if ($force_delete === true) {
			$exist = true;
		} else {
			$exist = $this->exist($id);
		}
		if ($exist) {
			$record = $this->read($sql_where);
			$query = $this->db->delete($this->get_table_name(), $sql_where);
			$this->set_lastquery($this->db->last_query());
			if ($query) {
				$this->set_affectedrows($this->db->affected_rows());
				$response[$successProperty] = true;
				$response[$messageProperty] = $this->get_response('delete_success');
				$response[$dataProperty] = $record;
			} else {
				$response[$successProperty] = false;
				$response[$messageProperty] = $this->get_response('delete_failed');
				$response[$dataProperty] = $record;
			}
		} else {
			$response[$successProperty] = false;
			$response[$messageProperty] = $this->get_response('delete_null');
		}

		$tpl = new Template($response[$messageProperty]);
		$response[$messageProperty] = $tpl->apply($replacer);

		$this->trigger('after_delete');
		if (is_callable($fn)) {
			call_user_func_array($fn, array($response));
		}
		// callback($fn, $response);
		return $response;
	}

	/**
	 * Base_model::select()
	 *
	 * select operation
	 * config are
	 * <pre>
	 *  start@integer,
	 *  limit@integer,
	 *  sort@mix#json_string|array(assoc),
	 *  filters@mix#json_string|array(assoc),
	 *  table@string,
	 *  fields@mix[array(assoc), array(numeric), string],
	 *  rendered@bolean
	 * </pre>
	 *
	 * @param mixed $config
	 * @param mixed $fn
	 * @return
	 */
	function select($config = null, $fn = null)
	{
		$this->trigger('before_select');

		// initializing variables
		$sql = $sql_table = $sql_fields = $sql_where = $sql_sort = $sql_limit = null;

		$successProperty = $this->successProperty;
		$messageProperty = $this->messageProperty;
		$dataProperty = $this->dataProperty;
		$totalProperty = $this->totalProperty;

		$response = array(
			$successProperty => false,
			$totalProperty => null,
			$dataProperty => null,
		);

		if (is_string($config)) {
			$config = array('fields' => $this->get_view_mode($config));
		}

		// table init
		if (array_key_exists('table', $config) and !empty($config['table'])) {
			$sql_table = $config['table'];
		} else {
			$sql_table = $this->get_table_name();
		}

		// fields init
		$fields = $fields_public = $this->get_fields_public();
		$fields_mapper = $this->get_fields_map();
		if (!empty($config['fields'])) {
			if (is_string($config['fields'])) {
				$config['fields'] = explode(',', $config['fields']);
			}
			if (is_array($config['fields'])) {
				if (isAssoc($config['fields'])) {
					$fields_mapper = $fields = varMatch($config['fields'], $fields_public);
					$fields = array_keys($fields);
				} else {
					$fields = $config['fields'];
				}
			}
		} elseif (!empty($config['view_mode'])) {
			$fields = $this->get_view_mode($config['view_mode']);
		}

		$fields = array_intersect($fields, $fields_public);
		$mapped_fields = array();
		foreach ($fields as $i => $f) {
			if (array_key_exists($f, $fields_mapper) and $fields_mapper[$f] != $f) {
				$mapped_fields[] = sprintf('%s AS `%s`', $fields_mapper[$f], $f);
			} else {
				$mapped_fields[] = $f;
			}
		}
		$sql_fields = implode(', ', $mapped_fields);

		// sort init
		if (!empty($config['sorter'])) {
			$config['sort'] = $config['sorter'];
		}
		if (!empty($config['sort'])) {
			if (!is_array($config['sort'])) {
				$sort = json_decode($config['sort']);
			} else {
				$sort = $config['sort'];
			}
			if (is_array($sort) and !empty($sort)) {
				$sql_sort_temp = array();
				foreach ($sort as $key => $order) {
					$sql_sort_temp[] = $this->map_fields($order->property) . " " . ($order->direction ? $order->direction : 'ASC');
				}
				$sql_sort = " ORDER BY " . implode(', ', $sql_sort_temp);
			}
		}

		// limit init
		if (!empty($config['start']) and is_int((int) $config['start'])) {
			$sql_limit_start = $config['start'];
		} else {
			$sql_limit_start = 0;
		}
		if (!empty($config['limit']) and is_int((int) $config['limit'])) {
			$sql_limit_finish = $config['limit'];
		} else {
			$sql_limit_finish = $this->get_limit();
		}
		if (!empty($sql_limit_finish)) {
			$sql_limit = " LIMIT " . $sql_limit_start . "," . $sql_limit_finish;
		}

		// filters init
		$encoded = false;
		$sql_where = ' 0 = 0';
		if (!empty($config['filter'])) {
			$config['filters'] = $config['filter'];
		}

		if (!array_key_exists('filters', $config)) {
			$config['filters'] = null;
		}
		if (!is_array($config['filters'])) {
			$encoded = true;
			$config['filters'] = json_decode($config['filters']);
		}
		if (is_array($config['filters'])) {
			$qs = '';
			for ($i = 0; $i < count($config['filters']); $i++) {
				$filter = $config['filters'][$i];
				if ($encoded) {
					$field = property_exists($filter, 'field') ? $filter->field : (property_exists($filter, 'property') ? $filter->property : null);
					$value = property_exists($filter, 'value') ? $filter->value : "";
					$compare = property_exists($filter, 'comparison') ? $filter->comparison : null;
					$filterType = property_exists($filter, 'type') ? $filter->type : "string";
				} else {
					$field = array_key_exists('field', $filter) ? $filter['field'] : $filter['property'];
					$value = array_key_exists('value', $filter) ? $filter['value'] : (array_key_exists('value', $filter['data']) ? $filter['data']['value'] : "");
					$compare = array_key_exists('comparison', $filter) ? $filter['comparison'] : (array_key_exists('comparison', $filter['data']) ? $filter['data']['comparison'] : null);
					$filterType = array_key_exists('type', $filter) ? $filter['type'] : (array_key_exists('type', $filter['data']) ? $filter['data']['type'] : 'string');
				}

				// begin patch map
				$field = $this->map_fields_in($field);
				// end patch map

				switch ($filterType) {
					case 'custom':
						$qs .= " AND " . $value;
						break;

					case 'string':
						if ($value === "") {
							$qs .= " AND " . $field . " = ''";
						} else if (strpos($value, '%') !== FALSE) {
							$qs .= " AND " . $field . " LIKE '" . $value . "'";
						} else if (count(explode(' ', $value)) > 1) {
							$qs .= " AND " . $field . " LIKE '%" . implode('%', explode(' ', preg_replace_callback("/\s{2,}/", function ($match) {
								return ' ';
							}, trim($value)))) . "%'";
							// $qs .= " AND " . $field . " LIKE '%" . $value . "%'";
						} else {
							$qs .= " AND " . $field . " LIKE '%" . $value . "%'";
						}
						break;

					case 'boolean':
						$qs .= " AND " . $field . " = " . ((bool) $value ? '1' : '0');
						break;

					case 'exact':
						if (empty($value)) {
							$qs .= " AND " . $field . " IS NULL";
						} else {
							$qs .= " AND " . $field . " = '" . $value . "'";
						}
						break;

					case 'list':
						if (is_array($value)) {
							for ($q = 0; $q < count($value); $q++) {
								if ($value[$q] === null) {
									$value[$q] = 'NULL';
								}
							}
							$value = implode(',', $value);
							$qs .= " AND " . $field . " IN (" . $value . ")";
						} else
						if (strstr($value, ',')) {
							$fi = explode(',', $value);
							for ($q = 0; $q < count($fi); $q++) {
								$fi[$q] = "'" . $fi[$q] . "'";
							}
							$value = implode(',', $fi);
							$qs .= " AND " . $field . " IN (" . $value . ")";
						} else {
							$qs .= " AND " . $field . " = '" . $value . "'";
						}
						break;

					case 'numeric':
						switch ($compare) {
							case 'eq':
								$qs .= " AND " . $field . " = " . $value;
								break;
							case 'lt':
								$qs .= " AND " . $field . " < " . $value;
								break;
							case 'gt':
								$qs .= " AND " . $field . " > " . $value;
								break;
						}
						break;

					case 'date':
						switch ($compare) {
							case 'eq':
								$qs .= " AND DATE_FORMAT(" . $field . ",'%Y-%m-%d') = '" . date('Y-m-d', strtotime($value)) . "'";
								break;
							case 'lt':
								$qs .= " AND DATE_FORMAT(" . $field . ",'%Y-%m-%d') < '" . date('Y-m-d', strtotime($value)) . "'";
								break;
							case 'gt':
								$qs .= " AND DATE_FORMAT(" . $field . ",'%Y-%m-%d') > '" . date('Y-m-d', strtotime($value)) . "'";
								break;
						}
						break;
				}
			}
			$sql_where .= $qs;
		}

		// fetching record
		// $sql = "SELECT " . $sql_fields . " FROM " . $sql_table . " WHERE " . $sql_where . " " . $sql_sort;
		$sql = sprintf('SELECT %s FROM %s WHERE %s %s', $sql_fields, $sql_table, $sql_where, $sql_sort);

		$result = $this->db->query($sql);
		$count = $result->num_rows();
		if (!empty($sql_limit)) {
			$result = $this->db->query($sql . $sql_limit);
		}
		if ($result) {
			$response[$successProperty] = true;
		}
		$records = $result->result_array();
		$this->set_lastquery($this->db->last_query());

		// convert the output
		foreach ($records as $record_index => $record) {
			$records[$record_index] = $this->convert($record);
		}

		// fetch associated data
		if (array_key_exists('associated', $config)) {
			if ($config['associated'] === true) {
				$config['associated'] = $this->get_associations_model();
			} else if (is_string($config['associated']) or is_array($config['associated'])) {
				$config['associated'] = $config['associated'];
			} else {
				$config['associated'] = (string) $config['associated'];
			}
		} else {
			$config['associated'] = $this->get_associations_autoload();
		}
		if (!empty($config['associated'])) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->associate_with($config['associated'], $record);
			}
		}

		// rendering output
		if (array_key_exists('rendered', $config) and $config['rendered'] == true) {
			foreach ($records as $record_index => $record) {
				$records[$record_index] = $this->render($record);
			}
		}

		$response[$totalProperty] = $count;
		$response[$dataProperty] = $records;

		$this->trigger('after_select');
		if (is_callable($fn)) {
			call_user_func_array($fn, array($response));
		}
		// callback($fn, $response);

		return $response;
	}

	function secureFieldValue($data = array())
	{
		$secured = array();

		if (is_array($data)) {
			foreach ($data as $key => $value) {
				if ($this->get_field_attribute('secure', $key)) {
					$value = $this->secure($value);
				}
				$secured[$key] = $value;
			}
		}
		return $secured;
	}

	function secure($data = null)
	{
		if (is_array($data)) {
			foreach ($data as $key => $value) {
				$data[$key] = $this->secure($value);
			}
			return $data;
		}

		// $data = htmlspecialchars($data, ENT_QUOTES);
		$data = htmlspecialchars_decode($data);
		return $data;
	}

	function convert_empty_string_to_null($data)
	{
		if (is_array($data)) {
			foreach ($data as $key => $value) {
				if ($this->get_field_attribute('usenull', $key)) {
					$data[$key] = $this->convert_empty_string_to_null($value);
				}
			}
			return $data;
		}

		if (is_string($data) and trim($data) == "") $data = null;
		return $data;
	}

	function math($aggregate = null, $field = '*', $condition = array())
	{
		$this->db->reset_query();

		switch ($aggregate) {
			case 'max':
				$this->db->select_max($field);
				break;

			case 'min':
				$this->db->select_min($field);
				break;

			case 'sum':
				$this->db->select_sum($field);
				break;

			case 'avg':
				$this->db->select_avg($field);
				break;

			default:
				return;
		}

		$result = $this->db->get_where($this->get_table_name(), $condition);
		$row = $result->row_array();
		if ($row) {
			return $row[$field];
		}
	}

	function max($field = '*', $condition = array())
	{
		return $this->math('max', $field, $condition);
	}

	function min($field = '*', $condition = array())
	{
		return $this->math('min', $field, $condition);
	}

	function sum($field = '*', $condition = array())
	{
		return $this->math('sum', $field, $condition);
	}

	function avg($field = '*', $condition = array())
	{
		return $this->math('avg', $field, $condition);
	}
}
