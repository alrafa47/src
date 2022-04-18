Ext.define('SIPAS.controller.Sipas.sistem.backup.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.sistem.backup.Prop'
    ],

    stores: [
        'Sipas.sistem.backup.process.List'
    ],

    models: [
        'Sipas.sistem.backup.Process'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_sistem_backup_prop'},
        { ref: 'list',          selector: 'sipas_sistem_backup_prop > #gridProses'},
        { ref: 'form',          selector: 'sipas_sistem_backup_prop > form'},
        { ref: 'btnBackup',     selector: 'sipas_sistem_backup_prop #buttonBackup'},
        { ref: 'checkApp',      selector: 'sipas_sistem_backup_prop > form [name=app]'},
        { ref: 'checkDatabase', selector: 'sipas_sistem_backup_prop > form [name=database]'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Backup anda berhasil'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    api: {
        'create': 'server.php/sipas/backup/create',
        'read': 'server.php/sipas/backup/read'
    },

    controllerHelper:   'Sipas.Helper',

    taskProvider: {
        autoConnect: true,
        baseParams: {},
        id: 'sipas-updater-backup-state',
        type:'polling',
        url: 'server.php/sipas/backup/read',
        interval: 7 * 1000
    },

    task: null,

    init: function(application) {
        this.control({
            'sipas_sistem_backup_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close,
                startpoll: this.onMainview_StartPoll,
                stoppoll: this.onMainview_StopPoll
            },
            'sipas_sistem_backup_prop > button': {
                click: this.onButtonBackup_Click
            }
        });
    },
    
    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c)
                {
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    return c;
                })(config));
                
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
        }
    },

    onMainview_AfterRender: function(mainview)
    {
        var list = this.getList({root:mainview}),
            store = list.getStore();

        store.removeAll();
    },

    onMainview_Close: function(mainview)
    {
        if(this.task)
        {
            this.task.stop();
            Ext.callback(mainview.callback, mainview, [true, this.task]);
        }
    },

    onMainview_StartPoll: function(mainview)
    {
        var $this = this,
            form = $this.getForm({root:mainview}),
            list = $this.getList({root:mainview}),
            store = list.getStore(),
            message = $this.getMessage('success'),
            btnBackup = $this.getBtnBackup({root:mainview});

        $this.createPool({
            baseParams: {
                id: mainview.backupId,
                autoUpdate: true,
                pollingFormat: true
            }
        }, function(provider, e)
        {
            var data = e.getData() || {},
                tasks = data.tasks;

            if(tasks)
            {
                store.removeAll();
                Ext.Object.each(tasks, function(k, v)
                {
                    store.add({
                        'process_id': v.name,
                        'process_nama': v.title || v.name,
                        'process_status': v.status,
                        'process_exec': v.exec
                    });
                });
                if(tasks.clean.status === 2){
                    Ext.Msg.alert(message[0], message[1]);

                    mainview.fireEvent('stoppoll',mainview);
                    delete this.task;
                    mainview.close();
                }
            }
        });
    },

    onMainview_StopPoll: function(mainview)
    {
        this.task && this.task.stop();
    },

    onButtonBackup_Click: function(button, e, eOpts)
    {
        var $this = this,
            view = $this.getMainview({from:button}),
            cmpApp = $this.getCheckApp({root:view}),
            cmpDb = $this.getCheckDatabase({root:view});

        view.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('create'),
            params:{
                app: cmpApp.getValue(),
                database: cmpDb.getValue()
            },
            success: function(response)
            {
                var objres = Ext.decode(response.responseText, 1);
                if(objres && objres.id)
                {
                    view.backupId = objres.id;

                    view.fireEvent('startpoll',view);
                }
            },
            callback: function()
            {
                view.setLoading(false);
            }
        });
    },

    createPool: function(config, action)
    {
        var $this = this;

        if( ! (this.task instanceof Ext.direct.PollingProvider) )
        {
            var config = Ext.apply(this.taskProvider, config || {}),
                task = this.task = Ext.create('Ext.direct.PollingProvider', config);

            task.oldData = {};
            if(this.taskProvider.autoConnect !== true){
                task.disconnect();
            }else
            {
                task.connect();
            }
            task.start = task.connect;
            task.stop = task.disconnect;

            task.on('data', action);
        }
        return this.task;
    }

});