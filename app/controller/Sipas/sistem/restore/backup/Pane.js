Ext.define('SIPAS.controller.Sipas.sistem.restore.backup.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sistem.restore.backup.List'
    ],

    views: [
        'Sipas.sistem.restore.backup.Pane'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_sistem_restore_backup_pane' }
    ],

    api: {
        'download': 'server.php/sipas/backup/download/{file}'
    },

    taskProvider: {
        autoConnect: true,
        baseParams: {},
        id: 'sipas-updater-restore-state',
        type:'polling',
        url: 'server.php/sipas/restore/read',
        interval: 7 * 1000
    },

    task: null,

    controllerPropRestore: 'Sipas.sistem.restore.Prop',

    init: function(application) {
        this.control({
            'sipas_sistem_restore_backup_pane': {
                selectionchange: this.onGridpanel_SelectionChange,
                stoppoll: this.onMainview_StopPoll
            },
            'sipas_sistem_restore_backup_pane[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_sistem_restore_backup_pane sipas_com_button_refresh': {
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

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];
        
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: []
        });
    },


    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            controllerPropRestore = $this.getController($this.controllerPropRestore),
            view = $this.getMainview({from:model.view}),
            listRunning = view.up('#daftarRestore').down('#gridRunning'),
            listProses = view.up('#daftarRestore').down('#gridProses'),
            lokasi = view.up('#daftarRestore').down('#txtLok'),
            store = listProses.getStore(),
            record = selected;

        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [{
                text: "Download",
                handler: function () {
                    dialog.hide();
                    window.open(window.location.href+$this.getApi('download', {file:record.getId()}), '_blank');
                }
            },{
                text: "Restore",
                handler: function () {
                    dialog.hide();
                    controllerPropRestore.launch({
                        mode: 'add',
                        record: record,
                        callback: function(success, record){
                            if(view){
                                view.getStore().reload();
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
                                            lokasi.setText('Info Lokasi : '+tasks.clean.info);
                                            view.fireEvent('stoppoll',view);
                                            delete this.task;
                                            
                                            listRunning.getStore().reload();
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }]
        });

        dialog.show({
            title: 'Download File / Restore',
            msg: 'Apakah anda ingin Download / Restore File',
            icon: Ext.MessageBox.WARNING
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
    },

    onMainview_StopPoll: function(mainview)
    {
        this.task && this.task.stop();
    }
});