<?php 

class Post_controller {
    
    var $ci;

    function __construct() {

    }

    function index()
    {
        $this->ci =& get_instance();
        $class = $this->ci->router->fetch_class();
        if($class === 'account') {
            // Hook procedures
        }
    }
}

/* End of file post_controller_constructor.php */
/* Location: ./application/hooks/post_controller_constructor.php */