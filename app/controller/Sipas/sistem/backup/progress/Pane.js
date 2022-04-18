Ext.define('SIPAS.controller.Sipas.sistem.backup.progress.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sistem.backup.progress.List',
        'Sipas.sistem.backup.running.List'
    ],

    views: [
        'Sipas.sistem.backup.progress.Pane'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_sistem_backup_progress_pane'},
        { ref: 'listProgres',   selector: 'sipas_sistem_backup_progress_pane #gridProses'},
        { ref: 'listRunning',   selector: 'sipas_sistem_backup_progress_pane #gridRunning'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Backup anda berhasil'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },
    
    taskProvider: {
        autoConnect: true,
        baseParams: {},
        id: 'sipas-updater-backup-state',
        type:'polling',
        url: 'server.php/sipas/backup/read',
        interval: 7 * 1000
    },

    task: null,

    controllerProperty: 'Sipas.sistem.backup.Prop',

    init: function(application) {
        this.control({
            'sipas_sistem_backup_progress_pane': {
                stoppoll: this.onMainview_StopPoll
            },
            'sipas_sistem_backup_progress_pane #gridRunning': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_sistem_backup_progress_pane sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
            'sipas_sistem_backup_progress_pane sipas_com_button_refresh': {
                click: this.onButtonRefresh_Click
            }
        });
    },

    launch: function(config) 
    {
        var $this = this,
            view = $this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }
        return view;
    },

    Property: function(){
        return this.getController(this.controllerProperty)
    },
    
    onButtonAdd_Click: function(button, e, eOpts)
    {
        var $this = this,
            view = $this.getMainview({from:button}),
            listBackup = view.up('#daftarBackup').down('sipas_sistem_backup_pane'),
            listProgres = $this.getListProgres({root:view}),
            message = $this.getMessage('success'),
            store = listProgres.getStore();

        $this.Property().launch({
            mode:'add',
            callback: function(success, record){
                if(view){
                    listBackup.getStore().reload();
                    store.removeAll();
                    store.reload();
                    this.task = record;

                    $this.createPool({
                        baseParams: {
                            id: this.task.baseParams.id,
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
                                view.fireEvent('stoppoll',view);
                                delete this.task;
                                Ext.Msg.alert(message[0], message[1]);
                                listBackup.getStore().reload();
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            gridRunning = model.view.up('gridpanel,treepanel'),
            view = gridRunning.up('sipas_sistem_backup_progress_pane'),
            listProgres = gridRunning.up('sipas_sistem_backup_progress_pane').down('#gridProses'),
            store = listProgres.getStore(),
            record = selected && selected[0];

        if(record){
            if(this.task) delete this.task;
            
            store.removeAll();
            store.reload();
            $this.createPool({
                baseParams: {
                    id: record.getId(),
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
                        view.fireEvent('stoppoll',view);
                        delete this.task;
                    }
                }
            });
        }
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            listProgres = this.getListProgres({root:view}),
            listRunning = this.getListRunning({root:view});

        listProgres.getStore().removeAll();
        listRunning.getStore().reload();
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
    },

    onMainview_StopPoll: function(mainview)
    {
        this.task && this.task.stop();
    }
});