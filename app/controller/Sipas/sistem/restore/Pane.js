Ext.define('SIPAS.controller.Sipas.sistem.restore.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sistem.restore.List',
        'Sipas.sistem.restore.running.List'
    ],

    views: [
        'Sipas.sistem.restore.Pane'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_sistem_restore_pane' },
        { ref: 'listRunning',   selector: 'sipas_sistem_restore_pane #gridRunning' },
        { ref: 'listProgres',   selector: 'sipas_sistem_restore_pane #gridProses' }
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
        id: 'sipas-updater-restore-state',
        type:'polling',
        url: 'server.php/sipas/restore/read',
        interval: 7 * 1000
    },

    task: null,

    init: function(application) {
        this.control({
            'sipas_sistem_restore_pane': {
                stoppoll: this.onMainview_StopPoll
            },
            'sipas_sistem_restore_pane #gridRunning': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_sistem_restore_pane sipas_com_button_refresh': {
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
            gridRunning = model.view.up('gridpanel,treepanel'),
            view = gridRunning.up('sipas_sistem_restore_pane'),
            listProgres = view.down('#gridProses'),
            lokasi = view.down('#txtLok'),
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
                        lokasi.setText('Info Lokasi : '+tasks.clean.info);
                        view.fireEvent('stoppoll',view);
                        delete this.task;
                    }
                }
            });
        }
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            listRunning = this.getListRunning({root:view}),
            listProgres = this.getListProgres({root:view});

        listRunning.getStore().reload();
        listProgres.getStore().removeAll();
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