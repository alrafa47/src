Ext.define('SIPAS.controller.Sipas.perintah.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.perintah.Prop'
    ],
    
    stores: [
        'Sipas.perintah.semua.List',
        'Sipas.perintah.aktif.List',
        'Sipas.perintah.nonaktif.List',
        'Sipas.perintah.Combo'
    ],
    
    models: [
        'Sipas.Perintah'
    ],
    
    views: [
        'Sipas.perintah.List'
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_perintah_list' },
        { ref: 'form',          selector: 'sipas_perintah_list sipas_perintah_form' },
        { ref: 'buttonSave',    selector: 'sipas_perintah_list sipas_perintah_form sipas_com_button_save' }
    ],

    defaultStore: 'Sipas.perintah.semua.List',
    defaultModel: 'Sipas.Perintah',
    controllerProperty: 'Sipas.perintah.Prop',

    init: function(application) {
        this.control({
            "sipas_perintah_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_perintah_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_perintah_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_perintah_list": {
                selectionchange: this.onGridpanel_SelectionChange,
                itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_perintah_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_perintah_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
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

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
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
            view = this.createView(config);

        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
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

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if($session.getRuleAccess('perintah_update')){
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

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        // var $this = this,
        //     $helper = $this.getApplication().Helper(),
        //     view = $this.getMainview({from:model.view}),
        //     form = $this.getForm({root:view}),
        //     record = selected && selected[0];
        
        // form.setDisabled(false);
        // form.loadRecord(record || view.getStore().create({}));
        // $helper.disableComponent({
        //     action: (selected.length != 1),
        //     parent: view,
        //     items: ['sipas_com_button_delete']
        // });

        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/perintah/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/perintah/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/perintah/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    }
});