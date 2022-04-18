Ext.define('SIPAS.controller.Sipas.korespondensi.eksternal.Popup', {
    extend: 'SIPAS.controller.Sipas.korespondensi.Popup',

    stores:[
        'Sipas.korespondensi.eksternal.List',
        'Sipas.korespondensi.eksternal.surat.List'
    ],

    views: [
        'Sipas.korespondensi.eksternal.Popup'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_korespondensi_eksternal_popup' },
        { ref: 'grid',          selector: 'sipas_korespondensi_eksternal_popup > grid' },
        { ref: 'form',          selector: 'sipas_korespondensi_eksternal_popup > form' },
        { ref: 'koresInfo',     selector: 'sipas_korespondensi_eksternal_popup > form #korespondensiInfo' },
        { ref: 'koresLegend',   selector: 'sipas_korespondensi_eksternal_popup > form #korespondensiLegenda' }
    ],

    api: {
        'report': 'server.php/sipas/korespondensi/report?surat_korespondensi={surat_korespondensi}',
        'korespondensi': 'server.php/sipas/surat/read?filter={filter}'
    },

    controllerMasuk: 'Sipas.masuk.agenda.Prop',
    controllerKeluar: 'Sipas.keluar.agenda.Prop',

    init: function(application){
        this.control({
            "sipas_korespondensi_eksternal_popup":{
                show: this.onMainview_Show
            },
            "sipas_korespondensi_eksternal_popup > gridpanel":{
                itemclick: this.onMainview_ClickShow
            },
            "sipas_korespondensi_eksternal_popup sipas_com_button_print":{
                click: this.onButtonPrint_Click
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.Session(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty1 = $this.getController($this.controllerMasuk),
            controllerProperty2 = $this.getController($this.controllerKeluar);
            
        if($session.getRuleAccess('korespondensi_surat_eksternal_view')){
            if(record.isMasuk()){
                controllerProperty1.launch({
                    propType: 'masuk',
                    unit: record.get('surat_unit'),
                    model: record.self.modelType().MODEL_MASUK,
                    mode:'lihat',
                    record: record
                });
            }else if(record.isKeluar()){
                controllerProperty2.launch({
                    propType: 'keluar',
                    unit: record.get('surat_unit'),
                    status_kor : 2,
                    model: record.self.modelType().MODEL_KELUAR,
                    mode:'lihat',
                    record: record
                });
            }
        }
    }

    // onMainview_ClickShow: function(model, selected, eOpts) {
    //     var $this = this,
    //         mainview = $this.getMainview({from:model.view}),
    //         record = selected && selected[0];

    //     // if(record.isMasuk()){
    //     //     controllerProperty.launch({
    //     //         propType: 'masuk',
    //     //         unit: record.get('surat_unit'),
    //     //         model: record.self.modelType().MODEL_MASUK,
    //     //         mode:'view',
    //     //         record: record
    //     //     });
    //     // }else if(record.isKeluar()){
    //     //     controllerProperty.launch({
    //     //         propType: 'keluar',
    //     //         unit: record.get('surat_unit'),
    //     //         model: record.self.modelType().MODEL_KELUAR,
    //     //         mode:'view',
    //     //         record: record
    //     //     });
    //     // }

    // }
});