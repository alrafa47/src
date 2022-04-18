Ext.define('SIPAS.controller.Sipas.korespondensi.internal.Popup', {
    extend: 'SIPAS.controller.Sipas.korespondensi.Popup',

    stores:[
        'Sipas.korespondensi.internal.List',
        'Sipas.korespondensi.internal.surat.List'
    ],

    views: [
        'Sipas.korespondensi.internal.Popup'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_korespondensi_internal_popup' },
        { ref: 'grid',          selector: 'sipas_korespondensi_internal_popup > grid' },
        { ref: 'form',          selector: 'sipas_korespondensi_internal_popup > form' },
        { ref: 'koresInfo',     selector: 'sipas_korespondensi_internal_popup > form #korespondensiInfo' },
        { ref: 'koresLegend',   selector: 'sipas_korespondensi_internal_popup > form #korespondensiLegenda' }
    ],

    api: {
        'report': 'server.php/sipas/korespondensi/report?surat_korespondensi={surat_korespondensi}',
        'korespondensi': 'server.php/sipas/surat/read?filter={filter}'
    },

    controllerIMasuk: 'Sipas.internal.masuk.agenda.Prop',
    controllerIKeluar: 'Sipas.internal.keluar.agenda.Prop',
    controllerIKeputusan: 'Sipas.internal.keputusan.agenda.Prop',

    init: function(application){
        this.control({
            "sipas_korespondensi_internal_popup":{
                show: this.onMainview_Show
            },
            "sipas_korespondensi_internal_popup gridpanel":{
                itemclick: this.onMainview_ClickShow
            },
            "sipas_korespondensi_internal_popup sipas_com_button_print":{
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
            controllerProperty1 = $this.getController($this.controllerIMasuk),
            controllerProperty2 = $this.getController($this.controllerIKeluar);
            controllerProperty3 = $this.getController($this.controllerIKeputusan);
            
        if($session.getRuleAccess('korespondensi_surat_internal_view')){
            if(record.isIMasuk()){
                controllerProperty1.launch({
                    propType: 'imasuk',
                    unit: record.get('surat_unit'),
                    tipe: record.get('surat_itipe'),
                    model: record.self.modelType().MODEL_IMASUK,
                    mode:'lihat',
                    record: record
                });
            }else if(record.isIKeluar()){
                controllerProperty2.launch({
                    propType: 'ikeluar',
                    unit: record.get('surat_unit'),
                    status_kor : 2,
                    tipe: record.get('surat_itipe'),
                    model: record.self.modelType().MODEL_IKELUAR,
                    mode:'lihat',
                    record: record
                });
            }else if(record.isKeputusan()){
                controllerProperty3.launch({
                    propType: 'keputusan',
                    unit: record.get('surat_unit'),
                    status_kor : 2,
                    tipe: record.get('surat_itipe'),
                    model: record.self.modelType().MODEL_KEPUTUSAN,
                    mode:'lihat',
                    record: record
                });
            }
        }
    }
});