<?php
/**
 * Collection is a class for helps in manipulating an array as an object.
 */
class Collection
{
	protected $_items = array();

	function __construct($iterable = null)
	{
		if(is_object($iterable)) $iterable = (array) $iterable;

		if(empty($iterable)) $iterable = array();
		
		if(!is_array($iterable)) $iterable = array($iterable);

		$this->_items = $iterable;

		return $this;
	}
	
	/**
	 * Create new intance of Collection.
	 * New instance will be returned.
	 *
	 *		$collection = Collection::create(array(
	 *			'one'=>1,'two'=>2,'three'=>3,'four'=>4
	 *		));
	 *		// now $collection is intance of Collection
	 *		// and able to use any function of Collection
	 *		$collection->get('one'); // will return 1
	 * 
	 * @param  array|string $iterable An array of item.
	 * @return Collection
	 */
	static function create($iterable = null)
	{
		return new self($iterable);
	}
	
	/**
	 * Form 
	 * @return [type] [description]
	 */
	static function from()
	{
		return call_user_func_array(array('self','create'), func_get_args());
	}

	/**
	 * [get description]
	 * @param  [type]  $key      [description]
	 * @param  [type]  $default  [description]
	 * @param  boolean $nullable [description]
	 * @return [type]            [description]
	 */
	function get($key = null, $default = null, $nullable = false)
	{
		if((is_string($key) or is_numeric($key)) and array_key_exists($key, $this->_items))
		{
			$value = $this->_items[$key];
			if($nullable){
				return $value;
			}else{
				if(is_null($value)){
					return $default;
				}else{
					return $value;
				}
			}
		}
		else if(is_array($key))
		{
			$data = array();
			foreach ($key as $i => $itemKey) {
				$data[$itemKey] = $this->get($itemKey);
			}
			return $data;
		}
		else
		{
			return $default;
		}
	}

	/**
	 * [set description]
	 * @param [type] $key  [description]
	 * @param [type] $item [description]
	 */
	function set($key = null, $item = null)
	{
		if(!is_array($this->_items)) $this->_items = array();
	
		$added = array();	
		if(!is_array($key)){
			$key = array($key=>$item);
		}
		foreach ($key as $k => $v) {
			$this->_items[$k] = $v;
			$added[$k] = $v;
		}

		return $added;
	}

	/**
	 * Inserts an item at the specified index in the collection.
	 * 
	 * @param  array|string  $item  An array of item
	 * @param  integer $index An
	 * @return Collection
	 */
	function insert($item = null, $index = 0)
	{
		if(!is_array($this->_items)) $this->_items = array();

		return array_unshift($this->_items, $item);	
	}

	/**
	 * Add an item to the collection
	 */
	function add()
	{
		if(!is_array($this->_items)) $this->_items = array();
		$added = array();
		foreach (func_get_args() as $key => $item) {
			$added[] = $this->_items[] = $item;
		}
		return $added;
	}

	/**
	 * [addAll description]
	 * @param [type] $items [description]
	 */
	function addAll($items = null)
	{
		if(!is_array($this->_items)) $this->_items = array();
		if(is_array($items)) $item = array($item);
		return call_user_func_array(array($this, 'add'), $items);
	}

	function getCount()
	{
		return count($this->_items);
	}

	function getKeys()
	{
		return array_keys($this->_items);
	}

	function getValues()
	{
		return array_values($this->_items);
	}

	function getAll()
	{
		if(!is_array($this->_items)) $this->_items = array();
		return $this->_items;
	}

	function toArray()
	{
		return $_items;
	}

	function toJson($assoc = false, $depth = 512, $options = 0)
	{
		return json_encode($_items, $assoc, $depth, $options);
	}

	function clear()
	{
		$this->_items = array();
		return $this;	
	}

	/**
	 * Remove null item on the Collection
	 * @return Collection
	 */
	function clean()
	{
		foreach ($this->_items as $key => $item) {
			if(is_null($item)) unset($this->_items[$key]);
		}
		return $this;
	}

	/**
	 * [contains description]
	 * @param  [type]  $item   [description]
	 * @param  boolean $strict [description]
	 * @return [type]          [description]
	 */
	function contains($item = null, $strict = false)
	{
		return in_array($item, $this->_items, $strict);
	}

	/**
	 * [containsKey description]
	 * @param  [type] $key [description]
	 * @return [type]      [description]
	 */
	function containsKey( $key = null )
	{
		if(is_string($key) or is_numeric($key))
		{
			return array_key_exists($key, $this->_items);
		}
		return false;
	}

	/**
	 * 
	 */

	function has()
	{
		return call_user_func_array(array($this, 'contains'), func_get_args());
	}

	/**
	 * [hasKey description]
	 * @return boolean [description]
	 */
	function hasKey()
	{
		return call_user_func_array(array($this, 'containsKey'), func_get_args());
	}

	/**
	 * Calls the passed function for each element in this composite.
	 * 
	 * [each description]
	 * @param  [type]  $callback [description]
	 * @param  boolean $reverse  [description]
	 * @return [type]            [description]
	 */
	function each($callback = null, $reverse = false)
	{
		if(is_callable($callback))
		{
			if(!is_array($this->_items)) $this->_items = array();
			$collection = $reverse ? array_reverse($this->_items) : $this->_items;
			foreach ($collection as $key => $item) {
				$result = call_user_func_array($callback, array($key, $item, $collection, $this));
				if($result === false) return $this;
			}
		}
		return $this;
	}

	function every($assetion = null)
	{
		return $this;
	}


	function some($assetion = null)
	{
		return $this;
	}

	function sort()
	{

	}

	function suffle()
	{
		
	}

	/**
	 * Cretting filter data
	 * 		
	 * [filter description]
	 * @param  [type]  $filter [description]
	 * @param  boolean $strict [description]
	 * @return [type]          [description]
	 */
	function filter($filter = null, $strict = false)
	{
		$collection = array();

		if(is_callable($filter))
		{
			foreach ($this->_items as $key => $item)
			{
				$result = call_user_func_array($filter, array($key, $item, $this->_items, $this));
				if($result)
				{
					$collection[] = $item;
				}
			}
			return $collection;
		}

		if(is_null($filter) or (is_array($filter) and empty($filter)))
		{
			return $this->_items;
		}

		if(is_array($filter)){
			$_items = $this->_items;
			foreach ($key as $k => $v) {
				$_items = $this->filter($_items);
			}
			return $_items;
		}

		foreach ($this->_items as $k => $item) 
		{
			// check if value is regex
			if( preg_match("/^\/.+\/[a-z]*$/i", $item))
			{
				if(is_string($item) and preg_match($value, $item))
				{
					$collection[] = $item;
				}
			}
			else // doing default
			{
				if($strict)
				{
					if($item === $item)
					{
						$collection[] = $item;
					}	
				}
				else
				{
					if($item == $item)
					{
						$collection[] = $item;
					}
				}
			}
		}
		return $collection;
	}

	function reject($condition = null)
	{

	}

	/**
	 * [first description]
	 * @return [type] [description]
	 */
	function first()
	{
		return reset($this->_items);
	}

	/**
	 * [last description]
	 * @return [type] [description]
	 */
	function last()
	{
		return end($this->_items);
	}

	/**
	 * [remove description]
	 * @param  [type]  $item   [description]
	 * @param  boolean $strict [description]
	 * @return [type]          [description]
	 */
	function remove($item = null, $strict = false)
	{
		$removedKey = null; 
		foreach ($this->_items as $key => $value) 
		{
			$passed = false;
			if($strict)
			{
				$passed = ($item === $value);
			}
			else
			{
				$passed = ($item == $value);
			}

			if($passed){
				$removedKey = $key;
				unset($this->_items[$key]);
				break;				
			}
		}
		return $removedKey;
	}

	/**
	 * 
	 */

	function removeIf($item, $strict = false)
	{
		$removed = array(); 
		foreach ($this->_items as $key => $value) 
		{
			$passed = false;
			if($strict)
			{
				$passed = ($item === $value);
			}
			else
			{
				$passed = ($item == $value);
			}

			if($passed){
				$removed[$key] = $this->_items[$key];
				unset($this->_items[$key]);
			}
		}
		return $removed;	
	}
	/**
	 * [removeIfNot description]
	 * @param  [type]  $item   [description]
	 * @param  boolean $strict [description]
	 * @return [type]          [description]
	 */
	function removeIfNot($item, $strict = false)
	{
		$removed = array(); 
		foreach ($this->_items as $key => $value) 
		{
			$passed = false;
			if($strict)
			{
				$passed = ($item !== $value);
			}
			else
			{
				$passed = ($item != $value);
			}

			if($passed){
				$removed[$key] = $this->_items[$key];
				unset($this->_items[$key]);
			}
		}
		return $removed;	
	}

	/**
	 * [removeOn description]
	 * @param  [type] $key [description]
	 * @return [type]      [description]
	 */
	function removeOn($key = null)
	{
		$removedValue = null;
		if(array_key_exists($key, $this->_items))
		{
			$removedValue = $this->_items[$key];
			unset($this->_items[$key]);
		}
		return $removedValue;
	}

	/**
	 * [removeIn description]
	 * @param  array   $condition [description]
	 * @param  boolean $strict    [description]
	 * @return [type]             [description]
	 */
	function removeIn($condition = array(), $strict = false)
	{
		if(!is_array($condition)) $condition = array($condition);

		$removed = array();
		foreach ($this->_items as $key => $item) 
		{
			if(in_array($item, $condition))
			{
				$removed[$key] = $item;
				unset($this->_items[$key]);
			}
		}
		return $removed;
	}

	/**
	 * [removeEx description]
	 * @param  array   $condition [description]
	 * @param  boolean $strict    [description]
	 * @return [type]             [description]
	 */
	function removeEx($condition = array(), $strict = false)
	{
		if(!is_array($condition)) $condition = array($condition);

		$removed = array();
		foreach ($this->_items as $key => $item) 
		{
			if(!in_array($item, $condition))
			{
				$removed[$key] = $item;
				unset($this->_items[$key]);
			}
		}
		return $removed;
	}

	/**
	 * [map description]
	 * @param  array  $map [description]
	 * @return [type]      [description]
	 */
	function map(Array $map)
	{
		$data = array();
		foreach ($this->_items as $key => $value) 
		{
			if(array_key_exists($key, $map) )
			{
				$data[$map[$key]] = $value;
			}
			else
			{
				$data[$key] = $value;
			}
		}
		return $data;
	}

	/**
	 * Its kinda map but changed items will be set into the Collection replacing the old.
	 * @param  array  $map A Set of keys map
	 * @return [type]      [description]
	 */
	function reorder(Array $map)
	{
		return $this->_items = $this->map($map);
	}

	/**
	 * Calculates the sum of items in the Collection.
	 * @return number Sum value.
	 */
	function sum()
	{
		return array_sum($this->_items);
	}

	/**
	 * Returns average value from the Collection.
	 * @return number Average value.
	 */
	function average()
	{
		if($this->getCount())
		{
			$avg = $this->sum() / $this->getCount();
			return $avg;	
		}
		return null;
	}

	/**
	 * Returns the maximum value in the Collection.
	 * @return number Maximum value in the Collection.
	 */	
	function max()
	{
		return max($this->_items);
	}

	/**
	 * Returns the minimum value in the Collection.
	 * @return number Minimum value in the Collection.
	 */
	function min()
	{
		return min($this->_items);
	}

}