Ext.define('SIPAS.controller.Sipas.surat.agenda.List',{
    extend: 'SIPAS.controller.Sipas.base.Base',

    messages: {
        approving        : 'Memproses penyetujuan surat',
        approval_failure : 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success : 'Berhasil menyetujui surat.',
        scope_null       : ['Gagal Menambah', 'Unitkerja harus dipilih terlebih dahulu'],
        scope_tipe_null  : ['Gagal Menambah', 'Unitkerja dan Tipe Internal harus dipilih terlebih dahulu']
    },

    stores: [],

    models: [
        'Sipas.Surat'
    ],

    views: [],

    api: {},

    defaultStore: null,
    controllerProperty: null,
    modelSurat: 'Sipas.Surat',
    modelDisposisi: 'Sipas.Disposisi',

    /*Featureable Batal Nomor*/
    batalNomor                  : 'surat_batal_nomor',

    /*Combo Selection Agenda Masuk Language*/
    lgMasukAll                  : 'cmb_masuk_all',
    lgMasukBelumDistribusi      : 'cmb_masuk_blm_distribusi',
    lgMasukSudahDistribusi      : 'cmb_masuk_sdh_distribusi',
    lgMasukBatalDistribusi      : 'cmb_masuk_batal_distribusi',
    lgMasukAktif                : 'cmb_masuk_aktif',
    lgMasukAktif7               : 'cmb_masuk_aktif_7',
    lgMasukAktif3               : 'cmb_masuk_aktif_3',
    lgMasukAktif1               : 'cmb_masuk_aktif_1',
    lgMasukTidakAktif           : 'cmb_masuk_tdk_aktif',
    lgMasukTerlewatTidakAktif   : 'cmb_masuk_terlewat_tdk_aktif',
    lgMasukMusnah               : 'cmb_masuk_musnah',
    /*Combo Prioritas*/
    lgMasukPrioritasAll         : 'cmb_masuk_prioritas_all',
    lgMasukPrioritasBlmSelesai  : 'cmb_masuk_prioritas_blm_selesai',
    lgMasukPrioritasSelesai     : 'cmb_masuk_prioritas_sdh_selesai',
    lgMasukTanpaPrioritas       : 'cmb_masuk_tanpa_prioritas',

    /*Combo Selection Agenda Keluar Language*/
    lgKeluarAll                 : 'cmb_keluar_all',
    lgKeluarAktif               : 'cmb_keluar_aktif',
    lgKeluarNonaktif            : 'cmb_keluar_nonaktif',
    lgKeluarTerlewatNonaktif    : 'cmb_keluar_terlewat_nonaktif',
    lgKeluarAll                 : 'cmb_keluar_all',
    lgKeluarDraft               : 'cmb_keluar_draft',
    lgKeluarDlmSetuju           : 'cmb_keluar_dlm_setuju',
    lgKeluarSetuju              : 'cmb_keluar_setuju',
    lgKeluarRevisi              : 'cmb_keluar_revisi',
    lgKeluarBlmNomor            : 'cmb_keluar_blm_nomor',
    lgKeluarBlmEkspedisi        : 'cmb_keluar_blm_ekspedisi',
    lgKeluarSdhEkspedisi        : 'cmb_keluar_sdh_ekspedisi',
    lgKeluarBatalNomor          : 'cmb_keluar_batal_nomor',
    lgKeluarSalinNomor          : 'cmb_keluar_salin_nomor',
    lgKeluarMusnah              : 'cmb_keluar_musnah',

    /*Combo Selection Agenda IMasuk Language*/
    lgImasukAll                 : 'cmb_imasuk_all',
    lgImasukDraft               : 'cmb_imasuk_draft',
    lgImasukPending             : 'cmb_imasuk_pending',
    lgImasukTerima              : 'cmb_imasuk_terima',
    lgImasukTolak               : 'cmb_imasuk_tolak',
    lgImasukBlmDistribusi       : 'cmb_imasuk_blm_distribusi',
    lgImasukSdhDistribusi       : 'cmb_imasuk_sdh_distribusi',
    lgImasukBatalDistribusi     : 'cmb_imasuk_batal_distribusi',
    lgImasukAktif               : 'cmb_imasuk_aktif',
    lgImasukAktif7              : 'cmb_imasuk_aktif_7',
    lgImasukAktif3              : 'cmb_imasuk_aktif_3',
    lgImasukAktif1              : 'cmb_imasuk_aktif_1',
    lgImasukTidakAktif          : 'cmb_imasuk_tdk_aktif',
    lgImasukTerlewatTidakAktif  : 'cmb_imasuk_terlewat_tdk_aktif',
    lgImasukMusnah              : 'cmb_imasuk_musnah',

    /*Combo Selection Agenda IKeluar Language*/
    lgIkeluarAll                : 'cmb_ikeluar_all',
    lgIkeluarAktif              : 'cmb_ikeluar_aktif',
    lgIkeluarNonaktif           : 'cmb_ikeluar_nonaktif',
    lgIkeluarTerlewatNonaktif   : 'cmb_ikeluar_terlewat_nonaktif',
    lgIkeluarDraft              : 'cmb_ikeluar_draft',
    lgIkeluarDlmSetuju          : 'cmb_ikeluar_dlm_setuju',
    lgIkeluarSetuju             : 'cmb_ikeluar_setuju',
    lgIkeluarRevisi             : 'cmb_ikeluar_revisi',
    lgIkeluarBlmNomor           : 'cmb_ikeluar_blm_nomor',
    lgIkeluarBlmTerima          : 'cmb_ikeluar_blm_terima',
    lgIkeluarSdhTerima          : 'cmb_ikeluar_sdh_terima',
    lgIkeluarTolak              : 'cmb_ikeluar_tolak',
    lgIkeluarBatalNomor         : 'cmb_ikeluar_batal_nomor',
    lgIkeluarSalinNomor         : 'cmb_ikeluar_salin_nomor',
    lgIkeluarMusnah             : 'cmb_ikeluar_musnah',
   
    /*Combo Selection Agenda IKeluar Language*/
    lgIkeputusanAll                : 'cmb_keputusan_all',
    lgIkeputusanAktif              : 'cmb_keputusan_aktif',
    lgIkeputusanNonaktif           : 'cmb_keputusan_nonaktif',
    lgIkeputusanTerlewatNonaktif   : 'cmb_keputusan_terlewat_nonaktif',
    lgIkeputusanDraft              : 'cmb_keputusan_draft',
    lgIkeputusanDlmSetuju          : 'cmb_keputusan_dlm_setuju',
    lgIkeputusanSetuju             : 'cmb_keputusan_setuju',
    lgIkeputusanRevisi             : 'cmb_keputusan_revisi',
    lgIkeputusanBlmNomor           : 'cmb_keputusan_blm_nomor',
    lgIkeputusanBlmTerima          : 'cmb_keputusan_blm_terima',
    lgIkeputusanSdhTerima          : 'cmb_keputusan_sdh_terima',
    lgIkeputusanTolak              : 'cmb_keputusan_tolak',
    lgIkeputusanBatalNomor         : 'cmb_keputusan_batal_nomor',
    lgIkeputusanSalinNomor         : 'cmb_keputusan_salin_nomor',
    lgIkeputusanMusnah             : 'cmb_keputusan_musnah',
    
    init: function(){},
    
    launch: function(config) {
        var $this = this,
            view = $this.createView(config);
        return view;
    },

    onGridpanel_AfterRender: function(component, eOpts) {
        
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
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            unit: null,
            model: null,
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                }
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from: button});
        $this.refresh(mainview);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        component.setLoading(true);
        var $this       = this,
            $app        = $this.getApplication(),
            $session    = $app.getSession(),
            profile     = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
            }
        });
    },

    updateList: function(valueScope, valueStatus, mainview){
        var store = mainview.getStore(),
            valueT = valueStatus,
            value = valueScope,
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:value, tipe:valueT});

        store.clearFilter(true);
        store.reload();
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        /*changing paging toolbar store based on mainview's store*/
        pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    }
});