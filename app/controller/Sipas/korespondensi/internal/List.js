Ext.define('SIPAS.controller.Sipas.korespondensi.internal.List', {
    extend: 'SIPAS.controller.Sipas.korespondensi.List',

    views: [
        'Sipas.korespondensi.internal.List'
    ],
    
    models:[
        'Sipas.Korespondensi'
    ],

    stores: [
        'Sipas.korespondensi.internal.List',
        'Sipas.surat.unit.Combo'
    ],

    refs: [
        {ref: 'mainview',   selector: 'sipas_korespondensi_internal_list'},
        {ref: 'comboInst',  selector: 'sipas_korespondensi_internal_list #koresInstansi'}
    ],

    api: {
        datasource: 'server.php/sipas/korespondensi/internal/list?instansi={instansi}'
    },

    controllerProperty: 'Sipas.korespondensi.internal.Popup',

    init: function(application) {
        this.control({
            "sipas_korespondensi_internal_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_korespondensi_internal_list > toolbar sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_korespondensi_internal_list > toolbar #koresInstansi": {
                select: this.onComboInstansi_Select
            },
            "sipas_korespondensi_internal_list sipas_com_button_minus": {
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
    }
});