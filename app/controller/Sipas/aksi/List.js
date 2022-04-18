Ext.define('SIPAS.controller.Sipas.aksi.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    controllers: [
        'Sipas.aksi.Prop'
    ],

    stores: [
        'Sipas.aksi.semua.List',
        'Sipas.aksi.aktif.List',
        'Sipas.aksi.nonaktif.List',
        'Sipas.aksi.Combo'
    ],
    
    models: [
        'Sipas.Aksi'
    ],

    views: [
        'Sipas.aksi.List'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_aksi_list' },
        { ref: 'form',          selector: 'sipas_aksi_list sipas_disposisi_aksi_form' },
        { ref: 'buttonSave',    selector: 'sipas_aksi_list sipas_disposisi_aksi_form sipas_com_button_save' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    controllerProperty: 'Sipas.aksi.Prop',

    init: function(application) {
        this.control({
            "sipas_aksi_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_aksi_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_aksi_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_aksi_list": {
                selectionchange: this.onGridpanel_SelectionChange,
                itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_aksi_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_aksi_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                    // $this.refresh(view);
                }
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record,
            callback: function(success, record){
                if(success && view){
                    $this.refresh(view);
                }
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
            // callback: function(success, record){
            //     if(success && view){
            //         $this.refresh(view);
            //     }
            // }
        });
    },

    launch: function(config) {
        var $this = this,
            view = $this.createView(config);

        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            $session = $this.getApplication().getSession();
            
        view.getStore().reload();
    },

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if($session.getRuleAccess('aksi_update')){
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'edit',
                record: record
                // callback: function(success, record){
                //     if(success && view){
                //         $this.refresh(view);
                //     }
                // }
            });
        }else{
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'view',
                record: record
                // callback: function(success, record){
                //     if(success && view){
                //         $this.refresh(view);
                //     }
                // }
            });
        }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/aksi/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/aksi/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/aksi/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    }
});