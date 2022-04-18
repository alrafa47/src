how to use model patch:

1. copy and replace all folder ./server

2. load model
	# like usual
	\> $this->load->model('model_name');
	\> $this->load->model('package/model_name');
	\> $this->load->model('package/folder_inside_model/model_name');
	
	# load model using array is working well
	\> $this->load->model(array(
			'model_name',
			'package/model_name',
			'package/folder_inside_model/model_name'
		));

3. retrieve model
	# like usual
	\> $this->$model_name

	# new method (controller must be extend base_controller)
	\> $this->model('model_name') // get global model, not module model
	\> $this->model('package/model_name')
	\> $this->model('package/folder_inside_model/model_name')

	# new method using loader
	\> $this->load->get_model('model_name')

	# get model safe mode
	\> $this->model('model_name', true);
		// if model_name doesnt loaded already, so it loader will load it and returned back

4. naming model class
	- eg: 
		we have module `satu` and inside it there a `dua` model
		so we have to place `dua.php` just like `module\satu\models\dua.php`
		and `dua.php` must containt class with name 'Satu_model_Dua'
	- eg:
		we have module `satu` and inside it there a `tiga` model but in a folder called `dua`
		so we have to place `tiga.php` just like `module\satu\models\dua\tiga.php`
		and `tiga.php` must containt class with name 'Satu_model_dua_Tiga'
	- eg:
		global model, for example `account_model` doesnt include in any modules
		so it can be place in `account_model.php` just like `application\models\account_model.php`