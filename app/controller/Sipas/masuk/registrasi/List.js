Ext.define('SIPAS.controller.Sipas.masuk.registrasi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.masuk.registrasi.List'
    ],

    stores: [
        'Sipas.masuk.registrasi.List',
        'Sipas.unit.Combo',
        'Sipas.masuk.pengarahan.registrasi.List',
        'Sipas.masuk.pengarahan.registrasi.Arah',
        'Sipas.masuk.pengarahan.registrasi.Blmarah'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_masuk_registrasi_list' }
    ],

    controllerProp: 'Sipas.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            'sipas_masuk_registrasi_list': {
                reload: this.onMainview_Reload,
                afterrender: this.onMainview_AfterRender
            },
            'sipas_masuk_registrasi_list sipas_com_button_refresh': {
                click: this.onButtonRefresh_Click
            },
            'sipas_masuk_registrasi_list sipas_com_button_edit': {
                click: this.onButtonEdit_Click
            },
            'sipas_masuk_registrasi_list sipas_com_button_delete': {
                click: this.onButtonDelete_Click
            },
            "sipas_masuk_registrasi_list #Status": {
                select: this.onComboStatus_Select
            }
        });
    },

    launch: function(config) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = this.createView(config);
            
        return view;
    },


    onMainview_AfterRender: function(mainview){
        var store = mainview.getStore();
        
        store.removeAll();
        store.getProxy().url = 'server.php/sipas/surat_masuk/blm_arah';
        mainview.fireEvent('reload', mainview);
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore(),
            cmpCompact = mainview.up('sipas_masuk_registrasi_compact'),
            cmpPengarahan = cmpCompact.down('sipas_masuk_pengarahan_form'),
            comUnitPengarahan = cmpPengarahan.down('#form #comboUnit');
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/surat_masuk/arah';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/surat_masuk/blm_arah';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/surat_masuk/registrasi';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        cmpPengarahan.setDisabled(true);
        comUnitPengarahan.setValue(null);
        // store.reload();
    },

    onMainview_Reload: function(grid){
        grid.getStore().reload();
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button});
        view.fireEvent('reload', view);
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProp = $this.getController($this.controllerProp);

        controllerProp.launch({
            mode: 'resepsionis',
            record: record,
            callback: function(success, record){}
        });
    },

    onButtonDelete_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProp = $this.getController($this.controllerProp);
        
        controllerProp.launch({
            mode: 'destroy',
            record: record,
            callback: function(success, record){
                view.getStore().reload();
            }
        });
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];

        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view', 'sipas_com_button_edit', 'sipas_com_button_delete','sipas_com_button_print']
        });
    }
});