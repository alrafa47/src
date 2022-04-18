Ext.define('SIPAS.controller.Sipas.staf.wakil.monitoring.Mainview', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Staf'
    ],

    stores: [
        'Sipas.staf.wakil.monitoring.tugassaya.List',
        'Sipas.staf.wakil.monitoring.kotak.List',
        'Sipas.staf.wakil.monitoring.masuk.List',
        'Sipas.staf.wakil.monitoring.disposisi.List',
        'Sipas.staf.wakil.monitoring.notadinas.List',
        'Sipas.staf.wakil.monitoring.koreksi.List',
        'Sipas.staf.wakil.monitoring.draf.List',
        'Sipas.staf.wakil.monitoring.disposisi.riwayat.Aktif',
        'Sipas.staf.wakil.monitor.Combo'
    ],

    views: [
        'Sipas.staf.wakil.monitoring.Mainview'
    ],

    api: {
        'profile_image'     : 'server.php/sipas/staf/get_image/foto?id={id}&dc={dc}',
        'profile_record'    : 'server.php/sipas/account/monitored_staf?id={id}'
    },
    
    refs:[
        { ref : 'mainview',             selector: 'sipas_staf_wakil_monitoring_mainview'},
        { ref : 'form',                 selector: 'sipas_staf_wakil_monitoring_mainview form'},
        { ref : 'comboStaf',            selector: 'sipas_staf_wakil_monitoring_mainview form #comboStaf'},
        { ref : 'cmpTugasSaya',         selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_tugassaya_list'},
        { ref : 'cmpKotakMasuk',        selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_masuk_list'},
        { ref : 'cmpTerkirim',          selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_riwayat_list'},
        { ref : 'cmpDraft',             selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_koreksi_list'},
        { ref : 'cmpProfilePicture',    selector: 'sipas_staf_wakil_monitoring_mainview form #containerImage'},
        { ref : 'nama',                 selector: 'sipas_staf_wakil_monitoring_mainview form [name=staf_nama]'},
        { ref : 'unit',                 selector: 'sipas_staf_wakil_monitoring_mainview form [name=unit_nama]'},
        { ref : 'jabatan',              selector: 'sipas_staf_wakil_monitoring_mainview form [name=jabatan_nama]'},
        { ref : 'plt',                  selector: 'sipas_staf_wakil_monitoring_mainview form [name=staf_wakil_plt]'},
        { ref : 'cmpEmptyProfile',      selector: 'sipas_staf_wakil_monitoring_mainview form #conKosong'},
        { ref : 'containerProfile',     selector: 'sipas_staf_wakil_monitoring_mainview form #containerProfile'},
        { ref : 'panelMonitoring',      selector: 'sipas_staf_wakil_monitoring_mainview #panelMonitoring'},
        { ref : 'comTugasSaya',         selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_tugassaya_list #statusMasuk'},
        { ref : 'comKotakMasuk',        selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_masuk_list #statusMasuk'},
        { ref : 'comTerkirim',          selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_riwayat_list #AktifAsisten'},
        { ref : 'comDraft',             selector: 'sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_koreksi_list #statusKoreksi'}
    ],

    stafModel: 'Sipas.Staf',
    controllerPengaturan: 'Sipas.Pengaturan',

    featureAsistensiDisposisi: 'asistensi_disposisi',
    featureAsistensiNotadinas: 'asistensi_notadinas',

    roleAsistensiDisposisi: 'asistensi_disposisi',
    roleAsistensiNotadinas: 'asistensi_notadinas',

    lgTugasAll          : 'cmb_tugas_all',
    lgTugasDisposisi    : 'cmb_tugas_disposisi',
    lgTugasEksternal    : 'cmb_tugas_eks',
    lgTugasInternal     : 'cmb_tugas_int',
    lgTugasDraf         : 'cmb_tugas_draf',

    lgKMasukAll         : "cmb_kmasuk_all",
    lgKMasukDisposisi   : "cmb_kmasuk_disposisi",
    lgKMasukNotaDinas   : "cmb_kmasuk_notadinas",
    lgKMasukEks         : "cmb_kmasuk_eks",
    lgKMasukInt         : "cmb_kmasuk_int",
    lgKMasukTembusan    : "cmb_kmasuk_tembusan",
    lgKMasukBerkas      : "cmb_kmasuk_berkas",
    lgKMasukTerus       : "cmb_kmasuk_terus",

    lgRiwayatAll                : "cmb_terkirim_all",
    lgRiwayatDisposisi          : "cmb_terkirim_disposisi",
    lgRiwayatNotaDinas          : "cmb_terkirim_notadinas",
    lgRiwayatEksternal          : "cmb_terkirim_eksternal",
    lgRiwayatInternal           : "cmb_terkirim_internal",
    lgRiwayatAllCabut           : "cmb_terkirim_all_cabut",

    lgDrafAll           : "cmb_draf_all",
    lgDrafBlmTindak     : "cmb_draf_blm_tindaklanjut",
    lgDrafSetuju        : "cmb_draf_setuju",
    lgDrafTolak         : "cmb_draf_tolak",

    init: function(application) {
        this.control({
            "sipas_staf_wakil_monitoring_mainview": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_staf_wakil_monitoring_mainview #comboStaf": {
                afterrender: this.onComboStaf_AfterRender,
                select: this.onComboStaf_Select
            },
            "sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_tugassaya_list #statusMasuk": {
                select: this.onComboStatusTugas_Select
            },
            "sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_masuk_list #statusMasuk": {
                select: this.onComboStatusKotakMasuk_Select
            },
            "sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_koreksi_list #statusKoreksi": {
                select: this.onComboStatusDraft_Select
            },
            "sipas_staf_wakil_monitoring_mainview sipas_staf_wakil_monitoring_riwayat_list #AktifAsisten": {
                select: this.onComboStatusTerkirim_Select
            }
        });
    },

    launch: function(config) {
        var selectionComboTugas = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgTugasAll
                },
                {
                    value: 1, nama: null,
                    featureable: true, featureName: this.featureAsistensiDisposisi,
                    roleable: false, roleName: this.roleAsistensiDisposisi,
                    languageable: true, languageCode: this.lgTugasDisposisi
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: this.roleNotadinas,
                    languageable: true, languageCode: this.lgTugasEksternal
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgTugasInternal
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgTugasDraf
                }
            ];

        var selectionComboMasuk = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgKMasukAll
                },
                {
                    value: 1, nama: null,
                    featureable: true, featureName: this.featureAsistensiDisposisi,
                    roleable: false, roleName: this.roleAsistensiDisposisi,
                    languageable: true, languageCode: this.lgKMasukDisposisi
                },
                {
                    value: 2, nama: null,
                    featureable: true, featureName: this.featureAsistensiNotadinas,
                    roleable: false, roleName: this.roleAsistensiNotadinas,
                    languageable: true, languageCode: this.lgKMasukNotaDinas
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgKMasukEks
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgKMasukInt
                },
                // {
                //     value: 5, nama: null,
                //     featureable: false, featureName: null,
                //     roleable: false, roleName: null,
                //     languageable: true, languageCode: this.lgKMasukTembusan
                // },
                // {
                //     value: 6, nama: null,
                //     featureable: false, featureName: null,
                //     roleable: false, roleName: null,
                //     languageable: true, languageCode: this.lgKMasukBerkas
                // },
                {
                    value: 7, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgKMasukTerus
                }
            ];

        var selectionComboTerkirim = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatDisposisi
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatNotaDinas
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatEksternal
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatInternal
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatAllCabut
                }
            ];

        var selectionComboDraft = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgDrafAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgDrafBlmTindak
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgDrafSetuju
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgDrafTolak
                }
            ];

        var $this = this,
            view = $this.createView(config),
            $app = this.getApplication(),
            $session = $app.getSession(),
            $helper = $app.Helper(),
            $feature = $app.Feature(),
            $language = $app.Language(),
            comboStaf = $this.getComboStaf({root:view}),
            cmpTugasSaya = $this.getCmpTugasSaya({root:view}),
            cmpKotakMasuk = $this.getCmpKotakMasuk({root:view}),
            cmpDraft = $this.getCmpDraft({root:view}),
            cmpTerkirim = $this.getCmpTerkirim({root:view}),

            comTugasSaya = $this.getComTugasSaya({root:view}),
            comboStoreTugas = comTugasSaya && comTugasSaya.getStore(),
            selectionComboTugasList = Ext.clone(selectionComboTugas),

            comKotakMasuk = $this.getComKotakMasuk({root:view}),
            comboStoreMasuk = comKotakMasuk && comKotakMasuk.getStore(),
            selectionComboMasukList = Ext.clone(selectionComboMasuk),

            comTerkirim = $this.getComTerkirim({root:view}),
            comboStoreTerkirim = comTerkirim && comTerkirim.getStore(),
            selectionComboTerkirimList = Ext.clone(selectionComboTerkirim),

            comDraft = $this.getComDraft({root:view}),
            comboStoreDraft = comDraft && comDraft.getStore(),
            selectionComboDraftList = Ext.clone(selectionComboDraft);

            $helper.setPimpinan($this.wakil);

        if(view){
            view.on('afterrender', function(){
                
            });
        }
        // comboStaf.setValue();
        
        Ext.each(selectionComboTugasList, function(item, index, all)
        {
            if(item.featureable){
                if (!$feature.getFeatureAccess(item.featureName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.roleable){
                if (!$session.getRuleAccess(item.roleName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        Ext.each(selectionComboMasukList, function(item, index, all)
        {
            if(item.featureable){
                if (!$feature.getFeatureAccess(item.featureName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.roleable){
                if (!$session.getRuleAccess(item.roleName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        Ext.each(selectionComboTerkirimList, function(item, index, all)
        {
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        Ext.each(selectionComboDraftList, function(item, index, all)
        {
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        comboStoreTugas.getProxy().data = selectionComboTugasList;
        comTugasSaya.setValue($language.getGrammar(this.lgTugasAll, false));

        comboStoreMasuk.getProxy().data = selectionComboMasukList;
        comKotakMasuk.setValue($language.getGrammar(this.lgKMasukAll, false));

        comboStoreTerkirim.getProxy().data = selectionComboTerkirimList;
        comTerkirim.setValue($language.getGrammar(this.lgRiwayatAll, false));

        comboStoreDraft.getProxy().data = selectionComboDraftList;
        comDraft.setValue($language.getGrammar(this.lgDrafAll, false));

        return view;
    },

    onComboStatusTugas_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            wakil = $this.wakil,
            value = combo.getValue(),
            cmpTugasSaya = $this.getCmpTugasSaya({root:mainview}),
            storeTugasSaya = cmpTugasSaya && cmpTugasSaya.getStore(),
            comTugasSaya = $this.getComTugasSaya({root:mainview}),
            storeCombo = comTugasSaya && comTugasSaya.getStore(),
            proxyCombo = storeCombo && storeCombo.getProxy(),
            storeComboList = Ext.clone(proxyCombo.data);

        switch(value){
            case 0:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+wakil;
            break;
            case 1:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=disposisi&asisten='+wakil;
            break;
            case 2:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=eksternal&asisten='+wakil;
            break;
            case 3:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=internal&asisten='+wakil;
            break;
            case 4:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=draf&asisten='+wakil;
            break;
            default:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+wakil;
            break;
        }
        $this.getController('Sipas.tugassaya.session.List').refresh(cmpTugasSaya);
    },

    onComboStatusKotakMasuk_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            wakil = $this.wakil,
            value = combo.getValue(),
            cmpKotakMasuk = $this.getCmpKotakMasuk({root:mainview}),
            storeKotakMasuk = cmpKotakMasuk && cmpKotakMasuk.getStore(),
            comKotakMasuk = $this.getComKotakMasuk({root:mainview}),
            storeCombo = comKotakMasuk && comKotakMasuk.getStore(),
            proxyCombo = storeCombo && storeCombo.getProxy(),
            storeComboList = Ext.clone(proxyCombo.data),
            withDisposisi = false,
            withNotadinas = false;

        // Ext.each(storeComboList, function(item, index, all)
        // {
        //     if (item.roleName === $this.roleAsistensiDisposisi){
        //         withDisposisi = true;
        //     }
        //     if (item.roleName === $this.roleAsistensiNotadinas){
        //         withNotadinas = true;
        //     }
        // }, this, true);

        switch(value){
            case 0:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            case 1:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/disposisimasuk?asisten='+wakil;
            break;
            case 2:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/notadinas?asisten='+wakil;
            break;
            case 3:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/suratmasuk_eks?asisten='+wakil;
            break;
            case 4:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/suratmasuk_int?asisten='+wakil;
            break;
            case 5:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tembusan?asisten='+wakil;
            break;
            case 6:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/terimaberkas?asisten='+wakil;
            break;
            case 7:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/teruskan?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/teruskan?asisten='+wakil+'&?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            default:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
        }
        $this.getController('Sipas.masuk.session.kotak.List').refresh(cmpKotakMasuk);
    },

    onComboStatusTerkirim_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            wakil = $this.wakil,
            value = combo.getValue(),
            cmpTerkirim = $this.getCmpTerkirim({root:mainview}),
            storeTerkirim = cmpTerkirim && cmpTerkirim.getStore();

        switch(value){
            case 0:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/read?asisten='+wakil;
            break;
            case 1:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/disposisi?asisten='+wakil;
            break;
            case 2:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/notadinas?asisten='+wakil;
            break;
            case 3:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/eksternal?asisten='+wakil;
            break;
            case 4:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/internal?asisten='+wakil;
            break;
            case 5:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/tercabut?asisten='+wakil;
            break;
            default:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/read?asisten='+wakil;
            break;
        }
        $this.getController('Sipas.riwayat.session.List').refresh(cmpTerkirim);
    },

    onComboStatusDraft_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            wakil = $this.wakil,
            value = combo.getValue(),
            cmpDraft = $this.getCmpDraft({root:mainview}),
            storeDraft = cmpDraft && cmpDraft.getStore();

        switch(value){
            case 0:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/read?asisten='+wakil;
            break;
            case 1:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/blmtindak?asisten='+wakil;
            break;
            case 2:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/setuju?asisten='+wakil;
            break;
            case 3:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/tolak?asisten='+wakil;
            break;
            default:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/read?asisten='+wakil;
            break;
        }
        $this.getController('Sipas.koreksi.session.List').refresh(cmpDraft);
    },

    refresh: function(mainview) {
        var $this = this,
            wakil = $this.wakil,
            // tugas
            cmpTugasSaya = $this.getCmpTugasSaya({root:mainview}),
            storeTugasSaya = cmpTugasSaya && cmpTugasSaya.getStore(),
            // masuk
            cmpKotakMasuk = $this.getCmpKotakMasuk({root:mainview}),
            storeKotakMasuk = cmpKotakMasuk && cmpKotakMasuk.getStore(),
            // terkirim
            cmpTerkirim = $this.getCmpTerkirim({root:mainview}),
            storeTerkirim = cmpTerkirim && cmpTerkirim.getStore(),
            // draf
            cmpDraft = $this.getCmpDraft({root:mainview}),
            storeDraft = cmpDraft && cmpDraft.getStore(),
            // combo
            comTugasSaya = $this.getComTugasSaya({root:mainview}),
            comKotakMasuk = $this.getComKotakMasuk({root:mainview}),
            comDraft = $this.getComDraft({root:mainview}),
            comTerkirim = $this.getComTerkirim({root:mainview}),

            storeComKotakMasuk = comKotakMasuk && comKotakMasuk.getStore(),
            proxyComKotakMasuk = storeComKotakMasuk.getProxy(),

            storeComboList = Ext.clone(proxyComKotakMasuk.data),
            withDisposisi = false,
            withNotadinas = false;

        // Ext.each(storeComboList, function(item, index, all)
        // {
        //     if (item.roleName === $this.roleAsistensiDisposisi){
        //         withDisposisi = true;
        //     }
        //     if (item.roleName === $this.roleAsistensiNotadinas){
        //         withNotadinas = true;
        //     }
        // }, this, true);
        
        switch(comTugasSaya && comTugasSaya.getValue()){
            case 0:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+wakil;
            break;
            case 1:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=disposisi&asisten='+wakil;
            break;
            case 2:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=eksternal&asisten='+wakil;
            break;
            case 3:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=internal&asisten='+wakil;
            break;
            case 4:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?mode=draf&asisten='+wakil;
            break;
            default:
                storeTugasSaya.removeAll();
                storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+wakil;
            break;
        }
        // storeTugasSaya.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;

        switch(comKotakMasuk && comKotakMasuk.getValue()){
            case 0:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            case 1:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/disposisimasuk?asisten='+wakil;
            break;
            case 2:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/notadinas?asisten='+wakil;
            break;
            case 3:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/suratmasuk_eks?asisten='+wakil;
            break;
            case 4:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/suratmasuk_int?asisten='+wakil;
            break;
            case 5:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tembusan?asisten='+wakil;
            break;
            case 6:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/terimaberkas?asisten='+wakil;
            break;
            case 7:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/teruskan?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/teruskan?asisten='+wakil+'&?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            default:
                storeKotakMasuk.removeAll();
                storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil;
                // storeKotakMasuk.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
        }

        switch(comTerkirim && comTerkirim.getValue()){
            case 0:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/read?asisten='+wakil;
            break;
            case 1:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/disposisi?asisten='+wakil;
            break;
            case 2:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/notadinas?asisten='+wakil;
            break;
            case 3:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/eksternal?asisten='+wakil;
            break;
            case 4:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/internal?asisten='+wakil;
            break;
            case 5:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/tercabut?asisten='+wakil;
            break;
            default:
                storeTerkirim.removeAll();
                storeTerkirim.getProxy().url = 'server.php/sipas/terkirim/asistensi/read?asisten='+wakil;
            break;
        }
        
        switch(comDraft && comDraft.getValue()){
            case 0:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/read?asisten='+wakil;
            break;
            case 1:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/blmtindak?asisten='+wakil;
            break;
            case 2:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/setuju?asisten='+wakil;
            break;
            case 3:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/tolak?asisten='+wakil;
            break;
            default:
                storeDraft.removeAll();
                storeDraft.getProxy().url = 'server.php/sipas/draft/asistensi/read?asisten='+wakil;
            break;
        }

        $this.getController('Sipas.tugassaya.session.List').refresh(cmpTugasSaya);
        $this.getController('Sipas.masuk.session.kotak.List').refresh(cmpKotakMasuk);
        $this.getController('Sipas.riwayat.session.List').refresh(cmpTerkirim);
        $this.getController('Sipas.koreksi.session.List').refresh(cmpDraft);
    },

    doProfileRead: function(mainview, record){
        var $this = this,
            view = mainview || $this.getMainview(),
            form = $this.getForm({root:view}),
            cmp = $this.getCmpProfilePicture({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%; width:100%; height:100%; left:4px; top:4px;'/>");

        if(record){
            form && form.loadRecord(record);
            record = record && record.get('staf_id');
        }
        else record = $this.wakil;

        cmp && cmp.update(t.apply({
            url: $this.getApi('profile_image',{
                id: record,
                dc: Date.now()
            })
        }));
        $this.refresh(view);
    },

    onMainview_AfterRender: function(mainview, eOpts){
        var $this = this,
            form = $this.getForm({root:mainview}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $pengaturan = $app.LocalSetting(),
            containerProfile = $this.getContainerProfile({root:mainview}),
            nama = $this.getNama({root:mainview}),
            jabatan = $this.getJabatan({root:mainview}),
            unit = $this.getUnit({root:mainview}),
            plt = $this.getPlt({root:mainview}),
            cmpTugasSaya = $this.getCmpTugasSaya({root:mainview}),
            useMultiAsisten = $pengaturan.get('use_multiasistensi'),
            defaultAsisten = $pengaturan.get('default_asisten'),
            cmpProfilePicture = $this.getCmpProfilePicture({root:mainview}),
            panelMonitoring = this.getPanelMonitoring({root:mainview}),
            comboStaf = $this.getComboStaf({root:mainview});

        // $this.wakil = defaultAsisten;
        if(comboStaf.getValue()){
            panelMonitoring.setDisabled(false);

        }
        $this.wakil = null;
        Ext.Ajax.request({
            url: $this.getApi('profile_record', {
                id: $this.wakil
            }),
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText, true) || {},
                    data = res.data;

                if(res.data.monitored_staf){
                    comboStaf.hide();
                    nama.show();
                    nama.setValue('Tidak ada pegawai yang dimonitor')
                    cmpProfilePicture.hide();
                    unit.hide();
                    jabatan.hide();
                    plt.hide();
                }else{
                    comboStaf.setValue(data.staf_id);
                    comboStaf.getStore().reload();
                    unit.setValue(data.unit_nama);
                    jabatan.setValue(data.jabatan_nama);
                    plt.setValue(data.staf_wakil_plt);
                    cmpTugasSaya.getStore().removeAll();
                }
            }
        });
        // $this.doProfileRead(mainview);
        // $this.refresh(mainview);
    },

    onComboStaf_AfterRender: function(mainview){
        var $this = this,
            modelStaf = $this.getModel($this.stafModel),
            record = modelStaf.load(this.wakil);
        // mainview.setValue(this.wakil);
    },

    onComboStaf_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = this.getMainview({from:combo}),
            $app = this.getApplication(),
            $helper = $app.Helper(),
            $localStorage = $app.LocalStorage(),
            accounts = $localStorage.getValue('loggedUser'),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $feature = $app.Feature(),
            $language = $app.Language(),
            panelMonitoring = this.getPanelMonitoring({root:mainview}),
            record = selection && selection[0],
            cmpTugasSaya = $this.getCmpTugasSaya({root:mainview}),
            cmpKotakMasuk = $this.getCmpKotakMasuk({root:mainview}),
            cmpTerkirim = $this.getCmpTerkirim({root:mainview}),
            cmpDraft = $this.getCmpDraft({root:mainview}),
            comKotakMasuk = $this.getComKotakMasuk({root:mainview}),
            comboStore = comKotakMasuk.getStore(),
            comboProxy = comboStore.getProxy(),
            storeComboList = Ext.clone(comboProxy.data),
            tugasSayaStore = cmpTugasSaya.getStore(),
            kotakMasukStore = cmpKotakMasuk.getStore(),
            terkirimStore = cmpTerkirim.getStore(),
            draftStore = cmpDraft.getStore(),
            withDisposisi = false,
            withNotadinas = false;
        $helper.setPimpinan(record.get('staf_wakil_staf'));
        
        $app.fireEvent('msgbroker/requestChannel', {
            channelType: "asistensi",
            channel: record.get('staf_wakil_staf')
        });

        this.wakil = record.get('staf_wakil_staf');
        panelMonitoring.setDisabled(false);
        if(record.get('staf_wakil_plt')){
            mainview.setTitle($app.getGrammar('pgs_list'));
        } else{
            mainview.setTitle($app.getGrammar('monitoring_list'));
        }

        // Ext.each(storeComboList, function(item, index, all)
        // {
        //     if (item.roleName === $this.roleAsistensiDisposisi){
        //         withDisposisi = true;
        //     }
        //     if (item.roleName === $this.roleAsistensiNotadinas){
        //         withNotadinas = true;
        //     }
        // }, this, true);
        tugasSayaStore.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+this.wakil;
        kotakMasukStore.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+this.wakil;
        // tugasSayaStore.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/tugassaya?asisten='+this.wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
        // kotakMasukStore.getProxy().url = 'server.php/sipas/kotak_masuk/asistensi/surat_all?asisten='+this.wakil+'&disposisi='+withDisposisi+'&notadinas='+withNotadinas;
        terkirimStore.getProxy().url = 'server.php/sipas/terkirim/asistensi/read?asisten='+this.wakil;
        draftStore.getProxy().url = 'server.php/sipas/draft/asistensi/read?asisten='+this.wakil;

        this.doProfileRead(mainview, record);
    }
});