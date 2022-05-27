<?php
if (function_exists('search_array')) {
    function search_array($array, $key, $value)
    {
        $results = array();
        if (is_array($array)) {
            if (isset($array[$key]) && $array[$key] == $value) {
                $results[] = $array;
            }
            foreach ($array as $subarray) {
                $results = array_merge($results, search($subarray, $key, $value));
            }
        }
        return $results;
    }
}
