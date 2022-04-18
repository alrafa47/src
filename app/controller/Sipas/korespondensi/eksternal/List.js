Ext.define('SIPAS.controller.Sipas.korespondensi.eksternal.List', {
    extend: 'SIPAS.controller.Sipas.korespondensi.List',

    views: [
        'Sipas.korespondensi.eksternal.List'
    ],
    
    models:[
        'Sipas.Korespondensi'
    ],

    stores: [
        'Sipas.korespondensi.eksternal.List',
        'Sipas.surat.kontak.Combo'
    ],

    refs: [
        {ref: 'mainview',   selector: 'sipas_korespondensi_eksternal_list'},
        {ref: 'comboInst',  selector: 'sipas_korespondensi_eksternal_list #koresInstansi'}
    ],

    api: {
        datasource: 'server.php/sipas/korespondensi/eksternal/list?instansi={instansi}'
    },

    controllerProperty: 'Sipas.korespondensi.eksternal.Popup',

    init: function(application) {
        this.control({
            "sipas_korespondensi_eksternal_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_korespondensi_eksternal_list > toolbar sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_korespondensi_eksternal_list > toolbar #koresInstansi": {
                select: this.onComboInstansi_Select
            },
            "sipas_korespondensi_eksternal_list sipas_com_button_minus": {
                click: this.onMinusButton_Click
            }
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
        });
    },

    onComboInstansi_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: combo}),
            store = mainview.getStore(),
            valueInstansi = combo.getValue(),
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = $this.getApi('datasource',{instansi:valueInstansi});

        store.clearFilter(true);
        store.reload();
    }
});