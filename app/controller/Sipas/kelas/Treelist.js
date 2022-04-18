Ext.define('SIPAS.controller.Sipas.kelas.Treelist', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.kelas.aktif.Treelist',
        'Sipas.kelas.nonaktif.Treelist',
        'Sipas.kelas.semua.Treelist'
    ],
    models: [
        'Sipas.Kelas'
    ],
    views: [
        'Sipas.kelas.Treelist'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_kelas_treelist'}
    ],

    defaultStore: 'Sipas.kelas.semua.Treelist',

    controllerProperty: 'Sipas.kelas.Prop',

    init: function(application) {
        this.control({
            "sipas_kelas_treelist sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_kelas_treelist sipas_com_button_view": {
                click: this.onButtonView_Click
            },
            "sipas_kelas_treelist sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_kelas_treelist sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            "sipas_kelas_treelist sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_kelas_treelist #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_kelas_treelist": {
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_kelas_treelist[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_kelas_treelist[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().load();
            });
        }
        return view;
    },

    refresh: function() {
        this.getStore(this.stores[0]).reload();
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record,
            callback: function(success, record){
                if(success && view){
                    $this.refresh();
                }
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.controllerProperty,
            selectionModel = view.getSelectionModel(),
            parentRecord = selectionModel.getSelection()[0] || view.getStore().getRootNode();

        $this.getController(controllerProperty).launch({
            mode:'add',
            parentRecord: parentRecord,
            callback: function(success, record){
                if(success && view){
                    $this.refresh();
                }
                // if(success && view){
                //     parentRecord.appendChild(record);
                //     parentRecord.set('leaf', false);
                //     parentRecord.expand();
                //     record.set('leaf', true);
                //     selectionModel.select(record);
                // }
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview(),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'edit',
            record: record,
            callback: function(success, record){
                if(success && view){
                    $this.refresh();
                }
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview(),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'view',
            record: record
        });
    },

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if($session.getRuleAccess('kelas_update')){
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'edit',
                record: record,
                callback: function(success, record){
                    if(success && view){
                        $this.refresh();
                    }
                }
            });
        }else{
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'view',
                record: record,
                callback: function(success, record){
                    if(success && view){
                        $this.refresh();
                    }
                }
            });
        }
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview(),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                if(success && view){
                    view.getView().refresh();
                }
            }
        });
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                // store.removeAll();
                store.getProxy().url = 'server.php/sipas/kelas/aktif/tree';
            break;
            case 2:
                // store.removeAll();
                store.getProxy().url = 'server.php/sipas/kelas/nonaktif/tree';
            break;
            default:
                // store.removeAll();
                store.getProxy().url = 'server.php/sipas/kelas/read/tree';
            break;
        }
        // mainview.down('pagingtoolbar').moveFirst();
        store.reload();
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button})

        view.getStore().reload();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];

        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    }

});
