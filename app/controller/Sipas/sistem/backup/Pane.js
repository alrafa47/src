Ext.define('SIPAS.controller.Sipas.sistem.backup.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sistem.backup.List'
    ],

    views: [
        'Sipas.sistem.backup.Pane'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_sistem_backup_pane' }
    ],

    api: {
        'download': 'server.php/sipas/backup/download/{file}'
    },

    controllerProperty: 'Sipas.sistem.backup.Prop',
    controllerPropRestore: 'Sipas.sistem.restore.Prop',

    init: function(application) {
        this.control({
            'sipas_sistem_backup_pane': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_sistem_backup_pane[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_sistem_backup_pane sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
            'sipas_sistem_backup_pane sipas_com_button_refresh': {
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
            listBackup = $this.getListBackup({root:view}),
            listProgres = $this.getListProgres({root:view}),
            message = $this.getMessage('success'),
            store = listProgres.getStore();

        $this.Property().launch({
            mode:'add',
            callback: function(success, record){
                if(view){
                    listBackup.getStore().reload();
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
            record = selected;

        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [{
                text: "Download",
                handler: function () {
                    dialog.hide();
                    window.open(window.location.href+$this.getApi('download', {file:record.getId()}), '_blank');
                }
            }]
        });

        dialog.show({
            title: 'Download',
            msg: 'Apakah anda ingin Download?',
            icon: Ext.MessageBox.WARNING
        });
    }
});