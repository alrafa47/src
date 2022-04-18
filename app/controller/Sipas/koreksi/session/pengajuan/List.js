Ext.define('SIPAS.controller.Sipas.koreksi.session.pengajuan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.koreksi.session.pengajuan.List'
    ],

    models: [
        'Sipas.koreksi.Masuk'
    ],
    
    views: [
        'Sipas.koreksi.session.pengajuan.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_koreksi_session_pengajuan_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_koreksi_session_pengajuan_list sipas_konsep_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_koreksi_session_pengajuan_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_koreksi_session_pengajuan_list #groupInfo' }
    ],

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.'
    },

    controllerProperty: 'Sipas.surat.Prop',

    modelDefault: 'Sipas.koreksi.Masuk',
    modelSurat: 'Sipas.Surat',
    controllerKoreksi: 'Sipas.koreksi.session.Prop',

    controllerKeluar : 'Sipas.keluar.agenda.Prop',
    controllerIKeluar : 'Sipas.internal.keluar.agenda.Prop',
    controllerIKeputusan : 'Sipas.internal.keputusan.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_koreksi_session_pengajuan_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_koreksi_session_pengajuan_list": {
                doreload: this.onMainview_DoReload,
                selectionchange: this.onGridpanel_SelectionChange
            },
            "sipas_koreksi_session_pengajuan_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }
        return view;
    },

    onMainview_DoReload: function(mainview){        
        this.refresh(mainview);
    },

    refresh: function(mainview) {
        var view = mainview || this.getMainview(),
            $this = this;
        view.getStore().load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerKeluar = $this.getController($this.controllerKeluar),
            controllerIKeluar = $this.getController($this.controllerIKeluar);
            controllerIKeputusan = $this.getController($this.controllerIKeputusan);

        view.setLoading(true);
        record.reading({
            callback: function(success, record){
                $this.refresh(view);
            }
        });
        record.getSurat(function(surat){
            /*KURANG READING!*/
            view.setLoading(false);
            if(surat.isKeluar()){
                controllerKeluar.launch({
                    propType: 'keluar',
                    unit: null,
                    model: surat.self.modelType().MODEL_KELUAR,
                    mode:'view',
                    record: surat
                });
            }else if(surat.isIKeluar()){
                controllerIKeluar.launch({
                    propType: 'ikeluar',
                    unit: surat.get('surat_unit'),
                    tipe: surat.get('surat_itipe'),
                    model: surat.self.modelType().MODEL_IKELUAR,
                    mode:'view',
                    record: surat
                });
            }else if(surat.isKeputusan()){
                controllerIKeputusan.launch({
                    propType: 'keputusan',
                    unit: surat.get('surat_unit'),
                    tipe: surat.get('surat_itipe'),
                    model: surat.self.modelType().MODEL_KEPUTUSAN,
                    mode:'view',
                    record: surat
                });
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    }
});