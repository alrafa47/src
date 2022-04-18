Ext.define('SIPAS.controller.Sipas.session.notification.Entity', {
	extend: 'Ext.app.Controller',

    requires: [
        'Ext.ux.task.DelayedTaskRunner'
    ],

	controllers: [
        'Sipas.session.notification.Pane',
        'Sipas.session.notification.List',
		'Sipas.session.notification.Sound'
	],

    notifMap: {
        'masuk_belumdibaca'                 : 'masuk_belumdibaca',
        'masuk_belumditanggap'              : 'masuk_belumditanggap',
        'disposisi_belumdibaca'             : 'disposisi_belumdibaca',
        'disposisi_belumditanggap'          : 'disposisi_belumditanggap',
        'koreksi_belumdibaca'               : 'koreksi_belumdibaca',
        'koreksi_belumditanggap'            : 'koreksi_belumditanggap'
    },

	taskNotifProvider: {
        autoConnect: false,
        id: 'SIPAS-updater-notif',
        type:'polling',
        url: 'server.php/sipas/account/notification',
        interval: 1/*minute*/ * 60/*second*/ * 1000/*milis*/ // in millisecond // already configured by runtime.json
    },

	init: function(application){
		Ext.apply(application, {
			pushNotification: Ext.Function.alias(this, 'pushNotification')
		});

		application.on({
			'sipas/session/start': this.onApp_SessionStart,
			'sipas/session/terminate': this.onApp_SessionTerminate,
            'sipas/session/notification/start': this.onApp_StartNotif,
            'sipas/session/notification/stop': this.onApp_StopNotif,
            'sipas/session/notification/pause': this.onApp_PauseNotif,
            'sipas/session/notification/push': this.onApp_PushNotif,
            'sipas/session/notification/message': this.onApp_MessageNotif,
            scope: this
        });
	},

	onApp_SessionStart: function(){
        this.getApplication().fireEvent('sipas/session/notification/start');
    },

    onApp_SessionTerminate: function(){
        this.getApplication().fireEvent('sipas/session/notification/stop');
    },

    onApp_StartNotif: function(){
        var $this = this,
        $feature = $this.getController('Sipas.sistem.featureable.Feature'),
        notifUser = $feature.getFeatureAccess('notif_user');

        if(notifUser) this.getNotifUpdater().start();
    },

    onApp_StopNotif: function(){
        var notif = this.getNotifUpdater();

        notif.stop();
        notif.newData = notif.oldData = null;
    },

    onApp_PauseNotif: function(){
        this.getNotifUpdater().stop();  
    },

    onApp_PushNotif: function(){
        this.pushNotification.apply(this, arguments);
    },

    onApp_MessageNotif: function(message, title){
        $helper.showNotification(message || '', title || '');
    },

    checkNotification: function(newData, oldData){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            newData = newData || {},
            oldData = oldData || {},
            map = $this.notifMap;
        
        Ext.Object.each(newData, function(k, v){
        	var oldV = oldData[k] || 0;
        	
            if( (v != oldV) || (oldV == 0) ){ // use != instead of >, improve notify each changes 
        		$this.pushNotification({
        			name: map[k] || k,
        			newValue: v,
        			oldValue: oldV,
        			value: v
        		});
        	}
        });
    },

    getNotifUpdater: function(){
        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper();

        if( ! ($this.notifTask instanceof Ext.direct.PollingProvider) ){
            Ext.apply($this.taskNotifProvider, {
                interval: $app.getMetadata('notifInterval')
            });
            $this.notifTask = Ext.create('Ext.direct.PollingProvider', $this.taskNotifProvider);
            $this.notifTask.oldData = {};
            if($this.taskNotifProvider.autoConnect !== true){
                $this.notifTask.disconnect();
            }
            $this.notifTask.start = $this.notifTask.connect;
            $this.notifTask.stop = $this.notifTask.disconnect;
            
            $this.notifTask.on('data', function(provider, e){
                var newData = e.getData(),
                    oldData = $this.notifTask.oldData;
                if(!newData){
                    if(e.xhr.status == 403){
                        Ext.Msg.alert('Info', 'Akun anda telah direset.');
                        window.location.reload(false);
                        // Ext.callback(fn, scope, [$this.isAuth(), $this.getSession(), response]);
                    }
                }else{
                    $this.notifTask.oldData = newData || $this.notifTask.oldData;
                    $this.checkNotification(newData, oldData);
                }
            });
        }

        return $this.notifTask;
    },

	getTaskRunner: function(){
		if( ! (this.taskRunner instanceof Ext.ux.task.DelayedTaskRunner) ){
			this.taskRunner = new Ext.create('Ext.ux.task.DelayedTaskRunner', {
	     		delay: 500,
	     		fifo: true
	     	});
		}

		return this.taskRunner;
	},

	pushNotification: function(config){
		config = Ext.applyIf(config || {}, {
			name: 'notification',
			newValue: 0,
			oldValue: 0,
			value: 0,
			message: '' // will be overriden on down level
		});

		var $this = this,
			$app = $this.getApplication(),
			runner = this.getTaskRunner();
		
		runner.addTask(function(){
			$app.fireEvent('sipas/session/notification/notify', config);
			$app.fireEvent('sipas/session/notification/notify/'+ config.name, config);
		});
	}
	
});