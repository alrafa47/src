Ext.define('SIPAS.controller.Sipas.koreksi.session.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.surat.penyetuju.List',
        'Sipas.koreksi.session.riwayat.List'
    ],

    api: {
        profile_image       : 'server.php/sipas/staf/get_image/foto?id={id}&dc={dc}',
        urutan_setuju       : 'server.php/sipas/surat_stack/status_urutan_setuju?sort={sorter}&filter={filter}',
        print_approval      : 'server.php/sipas/surat/printApproval?id={id}',
        penyetuju           : 'server.php/sipas/draft/penyetuju?id={id}',
        petikan             : 'server.php/sipas/draft/petikan?id={id}',
        check               : 'server.php/sipas/koreksi_masuk/checkImage?staf_id={staf_id}',
        pengingat_asisten   : 'server.php/sipas/disposisi_masuk/pengingat_asisten'
    },

    views: [
        'Sipas.koreksi.session.Prop'
    ],

    models: [
        'Sipas.koreksi.Masuk',
        'Sipas.Surat',
        'Sipas.disposisi.masuk.Log'
    ],

    stores: [
		'Sipas.koreksi.session.penyetuju.Popup',
		'Sipas.koreksi.session.petikan.Popup'
	],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        receiver_empty: 'Penerima surat tidak boleh kosong',
        empty_coment: 'Komentar tidak boleh kosong'
    },

    refs : [
        { ref: 'mainview',              selector: 'sipas_koreksi_session_prop' },
        { ref: 'form',                  selector: 'sipas_koreksi_session_prop > form' },
        { ref: 'txtKomentar',           selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_tanggapan_pane [name=surat_stack_komentar]' },
        { ref: 'cmpAdditionalStatus',   selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_tanggapan_pane [name=keterangan_status]' },
        { ref: 'btnSave',               selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_tanggapan_pane sipas_com_button_savesend' },
        { ref: 'btnUbah',               selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_tanggapan_pane #ubah' },
        { ref: 'cmpButtonDecline',      selector: 'sipas_koreksi_session_prop > form #buttonRevision' },
        { ref: 'cmpButtonApprove',      selector: 'sipas_koreksi_session_prop > form #buttonApprove' },
        { ref: 'compPengirimImage',     selector: 'sipas_koreksi_session_prop > form sipas_com_disposisi_pengirim_pane #pengirimImg'},
        { ref: 'cbUrut',                selector: 'sipas_koreksi_session_prop > form sipas_surat_penyetuju_list [name=surat_setuju_isurut]'},
        { ref: 'paneSurat',             selector: 'sipas_koreksi_session_prop > form sipas_com_surat_pane'},
        { ref: 'compJenisSurat',        selector: 'sipas_koreksi_session_prop > form #jenisSurat'},
        { ref: 'compPengirimSurat',     selector: 'sipas_koreksi_session_prop > form #suratPengirim'},
        { ref: 'compDetailPengirim',    selector: 'sipas_koreksi_session_prop > form #pengirimDetail'},
        { ref: 'compDetailSurat',       selector: 'sipas_koreksi_session_prop > form #suratDetail'},
        { ref: 'compTanggapan',         selector: 'sipas_koreksi_session_prop sipas_surat_informasi_tanggapan_pane'},
        { ref: 'btnPenyetuju',          selector: 'sipas_koreksi_session_prop #buttonPenyetuju'},
        { ref: 'comDetailSurat',        selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_detail_pane'},
        { ref: 'containerInformasi',    selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_pane'},
        { ref: 'txtInfoTerima',         selector: 'sipas_koreksi_session_prop > form #txtInfoTerima'},
        { ref: 'txtPenerima',           selector: 'sipas_koreksi_session_prop > form #txtPenerima'},
        { ref: 'txtUrutanSetuju',       selector: 'sipas_koreksi_session_prop > form sipas_koreksi_session_informasi_penyetujuan_pane #txtUrutanSetuju'},
        { ref: 'cmpUrutanSetuju',       selector: 'sipas_koreksi_session_prop > form sipas_koreksi_session_informasi_penyetujuan_pane'},
        { ref: 'btnTujuan',             selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_detail_pane #buttonTujuan'},
        { ref: 'containerArsip',        selector: 'sipas_koreksi_session_prop > form sipas_arsip_pane'},
        { ref: 'containerSurat',        selector: 'sipas_koreksi_session_prop > form #containerSurat'},
        { ref: 'containerUrutanSetuju', selector: 'sipas_koreksi_session_prop > form #containerUrutanSetuju'},
        { ref: 'containerInfoKoreksi',  selector: 'sipas_koreksi_session_prop > form #containerInfoKoreksi'},
        { ref: 'containerTanggapan',    selector: 'sipas_koreksi_session_prop > form sipas_surat_informasi_tanggapan_pane'},
        { ref: 'penyetujuList',         selector: 'sipas_koreksi_session_prop > form #list'},
        { ref: 'petikanList',           selector: 'sipas_koreksi_session_prop > form #listPetikan'},
        { ref: 'buttonPengingat',       selector: 'sipas_koreksi_session_prop #buttonPengingat'},
        { ref: 'txtPgsAktif',           selector: 'sipas_koreksi_session_prop #txtPgsAktif'},
        { ref: 'txtProfil',             selector: 'sipas_koreksi_session_prop #txtProfil'}
    ],

    defaultModel                    : 'Sipas.koreksi.Masuk',
    modelSurat                      : 'Sipas.Surat',
    controllerSurat                 : 'Sipas.surat.agenda.Prop',
    controllerSuratKeluar           : 'Sipas.keluar.agenda.Prop',
    controllerSuratIKeluar          : 'Sipas.internal.keluar.agenda.Prop',
    controllerSuratIKeputusan       : 'Sipas.internal.keputusan.agenda.Prop',
    controllerLog                   : 'Sipas.koreksi.log.Popup',
    controllerPenyetuju             : 'Sipas.koreksi.session.penyetuju.Popup',
    controllerPropPenyetuju         : 'Sipas.surat.penyetuju.Prop',
    controllerPropPetikan           : 'Sipas.surat.petikan.Prop',
    controllerPropRiwayat           : 'Sipas.surat.penyetuju.riwayat.Popup',
    controllerPopupTembusan         : 'Sipas.surat.tembusan.Popup',
    controllerPopupTembusanStack    : 'Sipas.surat.tembusan.stack.Popup',
    controllerPopupPenerima         : 'Sipas.surat.penyetuju.Popup',
    controllerPopupTtd              : 'Sipas.koreksi.setuju.ttd.Popup',

    viewViewer : 'Sipas.Viewer',

    _click: 0,

    init: function(application){
        this.control({
            'sipas_koreksi_session_prop': {
                show : this.onMainview_Show,
                loadrecord : this.onMainview_Load,
                close: this.onMainview_Close
            },
            'sipas_koreksi_session_prop sipas_arsip_pane':{
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_koreksi_session_prop > form #containerSurat':{
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_koreksi_session_prop > form #containerInfoKoreksi':{
                loadassociate: this.onInfoKoreksi_LoadAssociate
            },
            'sipas_koreksi_session_prop > form sipas_koreksi_session_informasi_penyetujuan_pane':{
                loadassociate: this.onUrutanPenyetujuan_LoadAssociate
            },
            // 'sipas_koreksi_session_prop > form sipas_koreksi_session_informasi_penyetujuan_status_pane':{
            //     loadassociate: this.onStatusPenyetujuan_LoadAssociate
            // },
            'sipas_koreksi_session_prop > form #list':{
                loadassociate: this.onPenyetujuList_LoadAssociate
            },
            'sipas_koreksi_session_prop > form #listPetikan':{
                loadassociate: this.onPetikanList_LoadAssociate
            },
            'sipas_koreksi_session_prop sipas_surat_informasi_tanggapan_pane':{
                loadassociate: this.onTanggapan_LoadAssociate
            },
            'sipas_koreksi_session_prop sipas_surat_informasi_tanggapan_pane [name=surat_stack_komentar]':{
                change: this.onTanggapan_Change
            },
            'sipas_koreksi_session_prop #buttonLog' : {
                click: this.onButtonViewLog_Click
            },
            'sipas_koreksi_session_prop #btnTtd': {
                click: this.onBtnTtd_Click
            },
            'sipas_koreksi_session_prop > form #buttonApprove': {
                click: this.onButtonSaveSetuju_Click
            },
            'sipas_koreksi_session_prop > form #buttonRevision': {
                click: this.onButtonSaveRevisi_Click
            },
            'sipas_koreksi_session_prop > form sipas_koreksi_session_informasi_penyetujuan_status_pane #btnDetailPenyetuju': {
                click: this.onButtonDetailPenyetuju_Click
            },
            "sipas_koreksi_session_prop > form sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju": {
                click: this.onButtonPenyetuju_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayat_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_detail_pane #buttonTujuan': {
                click: this.onButtonTujuan_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarTembusan': {
                click: this.onButtonDaftarTembusan_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_detail_pane #buttonUbah': {
                click: this.onButtonUbahSurat_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayatPenyetujuan_Click
            },
            'sipas_koreksi_session_prop > form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]' : {
                click: this.onButtonPrintApproval_Click
            },
            "sipas_koreksi_session_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarPenerima": {
                click: this.onButtonPenerima_Click
            },
            "sipas_koreksi_session_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarPetikan": {
                click: this.onButtonPetikan_Click
            },
            'sipas_koreksi_session_prop #buttonPengingat' : {
                click: this.onButtonPengingat_Click
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config,{
            mode: 'edit',
            record: null,
            type: null,
            callback: Ext.emptyFn,
            scope: this
        });

        var $this    = this,
            $app     = $this.getApplication(),
            $helper  = $app.Helper(),
            $session = $app.getSession(),
            profile  = $session.getProfile(),
            stafId   = $session.getProfileId(),
            type     = config.type,
            view     = null,
            role_asistensi              = $session.getRuleAccess('asistensi'),
            role_asistensi_ubah         = $session.getRuleAccess('asistensi_ubah'),
            role_asistensi_revisi       = $session.getRuleAccess('asistensi_revisi'),
            role_asistensi_setuju       = $session.getRuleAccess('asistensi_setuju'),
            role_asistensi_pengingat    = $session.getRuleAccess('asistensi_pengingat'),
            role_pgs                    = $session.getRuleAccess('pgs'),
            role_pgs_ubah               = $session.getRuleAccess('pgs_ubah'),
            role_pgs_revisi             = $session.getRuleAccess('pgs_revisi'),
            role_pgs_setuju             = $session.getRuleAccess('pgs_setuju')

        switch(config.mode)
        {
            case 'view' :
            case 'edit' :

                view = $this.createView( (function(c){
                    c.requireComponents = [];
                    c.disableComponents = [];
                    c.readonlyComponents = ['[name=surat_setuju_isurut]'];
                    c.removeComponents = ['#buttonAdd','#reuploadWarning','sipas_com_button_delete', 
                                        'sipas_com_button_add','#columnDelete','#columnMoveUp','#columnMoveDown',
                                        '#buttonSelesai','#buttonResend','#buttonResendKeputusan','sipas_com_button_expedition','#btnEkspedisiKeluar'];

                    if (c.record.get('surat_model') == 2){
                        c.removeComponents.push('#btndaftarPenerima');
                    }
                    if (c.record.get('surat_model') == 4){
                        c.removeComponents.push('#btndaftarTembusan');
                    }
                    if (c.record.get('surat_model') == 6) {
                        c.removeComponents.push('#btndaftarPenerima');
                    }
                    if (c.record.get('surat_model') != 4 && c.record.get('surat_model') != 6){
                        c.removeComponents.push('#buttonTujuan');
                    }
                    if (c.record.get('surat_model') != 6 || (c.record.get('surat_model') == 6 && c.record.get('surat_model_sub') == 1)){
                        c.removeComponents.push('#containerPetikan', '#btndaftarPetikan');
                    }
                    if  (c.record.get('disposisi_masuk_status') == 2 || c.record.get('disposisi_masuk_status') == 4){
                        c.removeComponents.push('#buttonUbah');
                    }
                    if(c.record.get('disposisi_masuk_staf') == stafId || c.record.get('disposisi_masuk_ispengingat') == 1 
                        || c.record.get('disposisi_masuk_status') == 2 || c.record.get('disposisi_masuk_status') == 4){
                        c.removeComponents.push('#buttonPengingat');
                    }
                    
                    if (c.record.get('surat_petikan_setuju') != 2){
                        c.removeComponents.push('#printApproval');
                    }

                    /*ketika pgs aktif*/
                    if (c.record.get('disposisi_masuk_plt') == 1) {
                        c.disableComponents.push('#buttonPenyetuju', '#buttonTtd', '#buttonLog', '#buttonPengingat','#buttonUbah',
                            '#daftarPenyetuju', '#btnMore', '#buttonTujuan', 'sipas_surat_informasi_tanggapan_pane');
                    }else{
                        c.removeComponents.push('#containerPgsAktif');
                    }

                    if (c.type == 'asisten') {
                        if (role_asistensi) {
                            if (!role_asistensi_ubah) {
                                c.removeComponents.push('#buttonUbah'); 
                            }
                            if (!role_asistensi_setuju) {
                                c.removeComponents.push('#buttonApprove'); 
                            }
                            if (!role_asistensi_revisi) {
                                c.removeComponents.push('#buttonRevision'); 
                            }
                            if (!role_asistensi_revisi && !role_asistensi_setuju) {
                                c.removeComponents.push('sipas_surat_informasi_tanggapan_pane'); 
                            }
                            if (!role_asistensi_pengingat) {
                                c.removeComponents.push('#buttonPengingat'); 
                            }
                        }
                    }else if(c.type == 'pgs'){
                        c.removeComponents.push('#buttonPengingat');

                        if (role_pgs) {
                            if (!role_pgs_ubah) {
                                c.removeComponents.push('#buttonUbah'); 
                            }
                            if (!role_pgs_setuju) {
                                c.removeComponents.push('#buttonApprove'); 
                            }
                            if (!role_pgs_revisi) {
                                c.removeComponents.push('#buttonRevision'); 
                            }
                            if (!role_pgs_revisi && !role_pgs_setuju) {
                                c.removeComponents.push('sipas_surat_informasi_tanggapan_pane'); 
                            }
                        }
                    }
                    
                    if (c.record.get('disposisi_masuk_profil_isganti') == 1) {
                        c.removeComponents.push('#buttonApprove', '#buttonUbah');
                    }else{
                        c.removeComponents.push('#containerProfil');
                    }

                    if (c.record.get('staf_hide') == 1) {
                        c.disableComponents.push('#buttonApprove', '#buttonUbah', '#buttonRevision', '#buttonPengingat');
                    }

                    return c;
                })(config) );

                // do not remove this
                var comInformasiSurat = $this.getContainerInformasi({root:view}),
                    com1 = comInformasiSurat.down('sipas_surat_informasi_pembuatan_pane'),
                    com2 = comInformasiSurat.down('sipas_surat_informasi_penyetujuan_pane'),
                    com3 = comInformasiSurat.down('sipas_surat_informasi_terima_pane'),
                    com4 = comInformasiSurat.down('sipas_surat_informasi_distribusi_pane'),
                    com5 = comInformasiSurat.down('sipas_surat_informasi_ekspedisi_keluar_pane'),
                    com6 = comInformasiSurat.down('sipas_surat_informasi_selesai_pane'),
                    com7 = comInformasiSurat.down('sipas_surat_informasi_rating_pane'),
                    com8 = comInformasiSurat.down('sipas_surat_informasi_batal_pane'),
                    com9 = comInformasiSurat.down('sipas_surat_informasi_musnah_pane'),
                    com10 = comInformasiSurat.down('sipas_surat_informasi_arsip_pane');

                if (com1) { com1.associated = false; }
                if (com2) { com2.associated = false; }
                if (com3) { com3.associated = false; }
                if (com4) { com4.associated = false; }
                if (com5) { com5.associated = false; }
                if (com6) { com6.associated = false; }
                if (com7) { com7.associated = false; }
                if (com8) { com8.associated = false; }
                if (com9) { com9.associated = false; }
                if (com10) { com10.associated = false; }

                view.show();
                break;

            case 'destroy' :
                $helper.destroyRecord({
                    record: config.record,
                    callback: config.callback,
                    confirm: true
                })
                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(view){
        var $this   = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile(),
            $language = $app.Language(),
            form    = $this.getForm({root:view}),
            $helper = $app.Helper(),
            record  = view.record || $this.getModel($this.defaultModel || $this.models[0]).create({}),
            btnTujuan = $this.getBtnTujuan({root:view}),
            paneSurat = $this.getPaneSurat({root:view}),
            txtPgsAktif = $this.getTxtPgsAktif({root:view}),
            txtProfil = $this.getTxtProfil({root:view}),
            $label = '';
            
        if(record && form){
            form.setLoading(true);
            record.getKoreksi(function(koreksi){
                koreksi.getSurat(function(surat){
                    form.setLoading(false);
                    view.fireEvent('loadrecord', view, record);
                });
            });
        }

        if (btnTujuan){
            btnTujuan.setText($app.getGrammar('sipas_koreksi_session_buttontujuan', false));
        }

        if (record.get('disposisi_masuk_plt') == 1){
            var tplPgsAktif = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">'+
                '<div class="subtext">'+$language.getGrammar('disposisi_pgs_aktif', false)+'</div>'+
            '</div>';
            txtPgsAktif && txtPgsAktif.setValue(tplPgsAktif);
        }

        if (record.get('disposisi_masuk_profil_isganti') == 1){
            if (view.type == 'asisten') {
                $label = $language.getGrammar('profil_asisten_nonaktif', false);
            }else if (view.type == 'pgs') {
                $label = $language.getGrammar('profil_pgs_nonaktif', false);
            } else {
                $label = $language.getGrammar('profil_nonaktif', false);
            }
            var tplProfil = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">'+
                '<div class="subtext">'+$label+'</div>'+
            '</div>';
            txtProfil && txtProfil.setValue(tplProfil);
        }
    },

    onMainview_Load: function(mainview, record){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            form = $this.getForm({root:mainview});

        if(record){
            form.loadRecord(record);
        }
    },

    onMainview_Close: function(mainview, eOpts){
        var form = this.getForm({root:mainview}),
            record = form && form.getRecord();

        record && record.reject();
        Ext.callback(mainview.callback, mainview.scope, [record]);
    },

    onArsip_LoadAssociate: function(record, form, cmp){
        var view = this.getMainview({from:cmp}),
            $app = this.getApplication(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            penerima = record.get('disposisi_masuk_staf');

        cmp.setLoading(true);
        if(record){
            record.getKoreksi(function(koreksi){
                koreksi.getSurat(function(surat){
                    surat.getArsip(function(arsip){
                        cmp.setLoading(false);
                        if(arsip){
                            cmp.fireEvent('load', cmp, surat, arsip, surat.get('surat_israhasia'), 'lihat', pegawaiId, penerima);
                        }
                    });
                });
            });
        }
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:cmp}),
            form = $this.getForm({root:mainview}),
            record = form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat(),
            detailSurat = $this.getComDetailSurat({root:mainview}),
            infoSurat = $this.getContainerInformasi({root:mainview});

        var hideComps = {},
            model = surat && surat.get('surat_model');

        if (model == 1 || model == 3){
            hideComps['#containerPenyetuju'] = true;
        }
        if (model != 3){
            hideComps['#infoRating'] = true;
            hideComps['#infoTerima'] = true;
        }
        if (model != 2 && model != 6){
            hideComps['#btndaftarTembusan'] = true;
        }
        if (model == 2){
            hideComps['sipas_com_button_expedition'] = true;
        }

        $helper.hideComponent({
            parent: infoSurat,
            items: hideComps
        });

        detailSurat && detailSurat.fireEvent('load', detailSurat, surat, record);
        infoSurat && infoSurat.fireEvent('load', infoSurat, surat, form);
        cmp.setLoading(false);
    },

    onTanggapan_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            view    = view || $this.getMainview(),
            $app = $this.getApplication(),
            $language = $app.Language(),
            $helper = $this.getApplication().Helper(),
            cmpAdditionalStatus = $this.getCmpAdditionalStatus({root:view}),
            cmpUrutanSetuju = $this.getCmpUrutanSetuju({root:view}),
            txtKomentar = $this.getTxtKomentar({root:view}),
            btnSave = $this.getBtnSave({root:view}),
            // btnUbah = $this.getBtnUbah({root:view}),
            is_urut = record.get('surat_setuju_isurut') == 1? true : false,
            status  = record.get('disposisi_masuk_status'),
            tgl_koreksi = Ext.Date.format(record.get('disposisi_masuk_status_tgl'), 'd M Y H:i'),
            iconCls = 'ion-md-checkmark',
            word = $language.getGrammar('draft_setuju_text', false),
            tpl = new Ext.XTemplate([
                    '<div class="margin-bottom-8"><span class="blue-700-i">Tanggapan :</span></div>',
                    '<div class="cell-visual cell-visual-left">',
                        '<div class="img img-circle img-32 {bg_color}">',
                            '<i class="bigger-1-25 icon {icon} grey-100-i"></i>',
                        '</div>',
                    '</div>',
                    '<div class="cell-text">',
                        '<div class="subtext {text_color}">{word}</div>',
                        '<div class="supporttext supporttext-dark">{tgl}</div>',
                    '</div>',
                    '<div class="margin-top-12">{komentar}</div>']);

        var koreksi = record.getKoreksi(),
            surat = koreksi.getSurat();
        
        if(status && status == surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE){
            if (is_urut){
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#containerInfoKoreksi': true,
                        '#containerTanggapan': true
                    }
                });
            } else {
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#buttonRevision': true,
                        '#buttonApprove': true,
                        '[name=surat_stack_komentar]': true
                    }
                });
                cmpAdditionalStatus.setValue(tpl.apply({
                    bg_color: 'bg-green-500-i',
                    word: word,
                    tgl: 'Pada '+tgl_koreksi,
                    icon: iconCls,
                    text_color: 'green-500-i',
                    komentar: record.get('disposisi_masuk_pesan') ? record.get('disposisi_masuk_pesan') : '<span class="alternative">(Tidak ada komentar)</span>'
                }));
                // btnSave.hide(false);
                // btnUbah.hide(false);
                // txtKomentar.setReadOnly(true);
                // txtKomentar.setValue(record.get('disposisi_masuk_pesan'));
            }
        }else if(status && status == surat.self.statusPenyetujuan().PERSETUJUAN_DECLINE){
            if (is_urut){
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#containerInfoKoreksi': true,
                        '#containerTanggapan': true
                    }
                });
            } else {
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#buttonRevision': true,
                        '#buttonApprove': true,
                        '[name=surat_stack_komentar]': true
                    }
                });
                cmpAdditionalStatus.setValue(tpl.apply({
                    bg_color: 'bg-red-500-i',
                    word: $language.getGrammar('draft_revisi_text', false),
                    tgl: 'Pada '+tgl_koreksi,
                    icon: 'ion-md-close',
                    text_color: 'red-500-i',
                    komentar: record.get('disposisi_masuk_pesan') ? record.get('disposisi_masuk_pesan') : '<span class="alternative">(Tidak ada komentar)</span>'
                }));
                // btnSave.hide(false);
                // btnUbah.hide(false);
                // txtKomentar.setReadOnly(true);
                // txtKomentar.setValue(record.get('disposisi_masuk_pesan'));
            }

        }else{
            // cmpAdditionalStatus.setValue('<b>'+$language.getGrammar('draft_blm_tanggap', false)+'</b>');
            cmpAdditionalStatus.setValue('<div class="margin-bottom-8"><span class="blue-700-i">Tanggapan :</span></div>');
            txtKomentar.setReadOnly(false);
            if (!is_urut){
                cmpUrutanSetuju.hide(true);   
            }
        }
    },

    onTanggapan_Change: function(textfield, newValue, oldValue, eOpts ){
        var $this = this,
            $app    = $this.getApplication(),
            use_disable_approve = $app.LocalSetting().get('use_disable_approve'),
            view = $this.getMainview({from:textfield}),
            btnRevisi = $this.getCmpButtonDecline({root:view}),
            btnSetuju = $this.getCmpButtonApprove({root:view});

        if (!use_disable_approve) {
            if(newValue.length){
                btnSetuju.setDisabled(true);
            }else{
                btnSetuju.setDisabled(false);
            }
        }
    },

    onInfoKoreksi_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            mainview = $this.getMainview({from:cmp}),
            form = $this.getForm({root:mainview}),
            txtInfoTerima = $this.getTxtInfoTerima({root:mainview}),
            txtPenerima = $this.getTxtPenerima({root:mainview}),
            jabatan = record.get('disposisi_masuk_penerima_jabatan_nama') ? record.get('disposisi_masuk_penerima_jabatan_nama') : '(Tidak ada jabatan)',
            unit = record.get('disposisi_masuk_penerima_unit_nama') ? record.get('disposisi_masuk_penerima_unit_nama') : '(Tidak ada unit)',
            penyetujuTitle = '';


        if(record.get('surat_model') == 6 && record.get('surat_model_sub') != 1) {
            if(record.get('disposisi_model_sub') == 0) {
                penyetujuTitle = '<div><div class="maintext margin-bottom-4">Kolektif :</div>';
            } else {
                penyetujuTitle = '<div><div class="maintext margin-bottom-4">Petikan :</div>';
            }
        }
        
        txtInfoTerima.setValue('<span class="supporttext supporttext-dark margin-left-40">menerima <span class="bold">'+$app.getGrammar('draft_session', false)+'</span> pada '+Ext.Date.format(record.get('disposisi_tgl'), 'd M Y H:i')+'</span>');
        txtPenerima.setValue(penyetujuTitle + '<div style="display:flex"><div class="cell-visual cell-visual-left">'+
            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id='+record.get('disposisi_masuk_penerima_id')+'"></div>'+
            '<div class="cell-text">'+
            '<div class="maintext">'+record.get('disposisi_masuk_penerima_nama')+'</div>'+
            '<div class="supporttext supporttext-black">'+jabatan+' - '+unit+'</div>'+
            '</div></div></div>');
        cmp.setLoading(false);
    },

    onUrutanPenyetujuan_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            containerUrutanSetuju = $this.getContainerUrutanSetuju({root:mainview}),
            containerInfoKoreksi = $this.getContainerInfoKoreksi({root:mainview}),
            txtUrutanSetuju = $this.getTxtUrutanSetuju({root:mainview}),
            is_urut = record && record.get('surat_setuju_isurut') == 1 ? true : false,
            status = record && record.get('disposisi_masuk_status'),
            storeRiwayat = $this.getStore('Sipas.koreksi.session.riwayat.List');

        txtUrutanSetuju.setValue(''); /*do not remove this*/

        if (is_urut){
            cmp.setLoading(true);
            record.getKoreksi(function(koreksi){
                koreksi.getSurat(function(surat){
                    var koreksi = surat.fetchKoreksiRiwayat();
                    storeRiwayat.removeAll();
                    koreksi.load(function(rec_koreksi){
                        var data_count = rec_koreksi.length,
                            _index = 0;
                        koreksi.each(function(rec){
                            var find = storeRiwayat.findRecord('disposisi_id', rec.get('disposisi_id')),
                                data = rec.getData();

                            data['_last_index'] = data_count - 1;
                            data['_index'] = _index;

                            if(!find){
                                if (status == 0){
                                    if (rec.get('disposisi_masuk_id') != record.get('disposisi_masuk_id')){
                                        cmp.fireEvent('load', cmp, data, record);
                                    }
                                } else {
                                    cmp.fireEvent('load', cmp, data, record);
                                }
                                cmp.setLoading(false);
                            }
                            _index++;
                        });
                        // do not remove this
                        if ((txtUrutanSetuju.getValue().match(/row-wrap/g) || []).length < 2 && status != 0){
                            txtUrutanSetuju.removeCls('x-dataview-timeline');
                        }
                        // do not remove this
                        if (txtUrutanSetuju.getValue().search('cell') < 0){
                            containerUrutanSetuju && containerUrutanSetuju.hide();
                            containerInfoKoreksi && containerInfoKoreksi.addCls('x-dataview-timeline-node-start');
                        }
                    });
                });
            });
        } else {
            containerUrutanSetuju.hide();
            containerInfoKoreksi && containerInfoKoreksi.addCls('x-dataview-timeline-node-start');
        }
    },

    onStatusPenyetujuan_LoadAssociate: function(record, form ,cmp){
        cmp.setLoading(true);
        var $this = this,
            disposisi_surat = record && record.get('disposisi_surat'),
            is_urut = record && record.get('surat_setuju_isurut') == 1 ? true : false,
            filters = [
                { "property" : "surat_stack_surat", "value" : disposisi_surat }
            ],
            sorters = [
                { "property" : "surat_stack_level", "direction" : "ASC" }
            ];

        if (is_urut){
            Ext.Ajax.request({
                url: $this.getApi('urutan_setuju', { sorter: Ext.encode(sorters), filter: Ext.encode(filters) }),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {},
                        data = objres.data;

                    cmp.fireEvent('load', cmp, data, record, is_urut);
                    cmp.setLoading(false);
                }
            });
        } else {
            Ext.Ajax.request({
                url: $this.getApi('urutan_setuju', { filter: Ext.encode(filters) }),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {},
                        data = objres.data;

                    cmp.fireEvent('load', cmp, data, record, is_urut);
                    cmp.setLoading(false);
                }
            });
        }
    },

    onPenyetujuList_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenyetuju = cmp.getStore(),
            is_urut = record && record.get('surat_setuju_isurut') == 1 ? true : false,
            id = record.get('surat_id');

        cmp.setLoading(true);
        // storePenyetuju.removeAll();

        if (is_urut){
            cmp.setTitle("Status penyetujuan (Penyetujuan urut)");
        } else {
            cmp.setTitle("Status penyetujuan (Penyetujuan tidak urut)");
        }

        Ext.Ajax.request({
            url: $this.getApi('penyetuju', {id: id}),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                storePenyetuju.removeAll();
                storePenyetuju.add(objres);
                cmp.setLoading(false);
            }
        });
    },

    onPetikanList_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePetikan = cmp.getStore(),
            is_urut = record && record.get('surat_petikan_setuju_isurut') == 1 ? true : false,
            id = record.get('surat_id');

        cmp.setLoading(true);
        // storePetikan.removeAll();

        if (is_urut){
            cmp.setTitle("Status petikan (Petikan urut)");
        } else {
            cmp.setTitle("Status petikan (Petikan tidak urut)");
        }

        Ext.Ajax.request({
            url: $this.getApi('petikan', {id: id}),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                storePetikan.removeAll();
                storePetikan.add(objres);
                cmp.setLoading(false);
            }
        });
    },

    onButtonUbahSurat_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            checkSession = $app.getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerKeluar = $this.getController($this.controllerSuratKeluar),
            controllerIKeluar = $this.getController($this.controllerSuratIKeluar),
            controllerIKeputusan = $this.getController($this.controllerSuratIKeputusan);


        button.setDisabled(true);
        $this._click++;
        if ($this._click <= 1) {
        view.setLoading(true);
        // record.forward && record.forward();
        record.getKoreksi(function(koreksi){
            koreksi.getSurat(function(surat){
                view.setLoading(false);
                if(surat){
                    if(surat.isKeluar()){
                        if(!surat) return;
                        controllerKeluar.launch({
                            propType: 'keluar',
                            model: 2,
                            mode: 'ubah',
                            via_session: true,
                            record: surat,
                            callback: function(success, records, eOpts){
                                $this._click = 0;
                                $this.launch({
                                    mode: 'edit',
                                    record: record,
                                    callback: function(success, record){
                                        // record && record.reject();
                                        Ext.callback(view.callback, view.scope, [record]);
                                    }
                                });
                            }
                        });
                        view.close();
                    }else if(surat.isIKeluar()){
                        if(!surat) return;
                        controllerIKeluar.launch({
                            propType: 'ikeluar',
                            model: 4,
                            mode: 'ubah',
                            via_session: true,
                            record: surat,
                            callback: function(success, records, eOpts){
                                $this._click = 0;
                                $this.launch({
                                    mode: 'edit',
                                    record: record,
                                    callback: function(success, message, record){
                                        // record && record.reject();
                                        Ext.callback(view.callback, view.scope, [record]);
                                    }
                                });

                            }
                        });
                        view.close();
                    }else if(surat.isKeputusan()){
                        if(!surat) return;
                        controllerIKeputusan.launch({
                            propType: 'keputusan',
                            model: 6,
                            model_sub: record.get('surat_model_sub'),
                            mode: 'ubah',
                            via_session: true,
                            record: surat,
                            callback: function(success, records, eOpts){
                                $this._click = 0;
                                $this.launch({
                                    mode: 'edit',
                                    record: record,
                                    callback: function(success, message, record){
                                        // record && record.reject();
                                        Ext.callback(view.callback, view.scope, [record]);
                                    }
                                });

                            }
                        });
                        view.close();
                    }
                }
            });
        });
        }
    },

    onButtonViewLog_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerLog = $this.getController($this.controllerLog);

        view.setLoading(true);
        controllerLog.launch({
            mode:'view',
            record: record
        });
        view.setLoading(false);
    },

    onBtnTtd_Click: function(button, e, eOpts, record){
        var $this   = this,
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            record      = form && form.updateRecord().getRecord(),
            controllerPopupTtd = $this.getController($this.controllerPopupTtd);

        controllerPopupTtd.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record,
            callback: function(success, records){
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },
    
    onButtonSaveSetuju_Click: function(button, e, eOpts, record){
        var $this   = this,
            $app    = $this.getApplication(),
            use_ttd = $app.LocalSetting().get('use_signature'),
            ttd_akhir = $app.LocalSetting().get('use_ttd_penyetuju_akhir'),
            $session = $app.getSession(),
            stafId  = $session.getProfileId(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            now     = new Date(),
            record  = form && form.updateRecord().getRecord(),
            log = $this.getModel($this.models[2]).create({}),
            btnSetuju = button,
            txtKomentar = $this.getTxtKomentar({root:view}),
            jenis_ttd = record && record.get('jenis_ttd'),
            dm_staf = record && record.get('disposisi_masuk_staf'),
            staf_akhir = record && record.get('surat_setuju_akhir_staf'),
            controllerPopupTtd = $this.getController($this.controllerPopupTtd);
            
        var koreksi = record.getKoreksi(),
            surat = koreksi.getSurat();

        $this._click++;
        if ($this._click <= 1){
            $helper.showConfirm({
                confirmText: 'Apakah anda yakin ?',
                confirmTitle: 'Konfirmasi',
                callback: function(button){
                    if(button == 'yes'){
                        record.set({
                            'disposisi_masuk_pesan' : txtKomentar.getValue(),
                            'baca' : 0
                        });
                        if (jenis_ttd == true) {
                            if (use_ttd) {
                                if (ttd_akhir) {
                                    if (staf_akhir == dm_staf) {
                                        controllerPopupTtd.launch({
                                            mailValue: view.mailValue,
                                            mode:'add',
                                            record: record,
                                            callback: function(success, records){
                                                $this._click = 0;
                                                btnSetuju.setDisabled(false);
                                                view.close();
                                                log.status({
                                                    staf: $session.getProfile().staf_id,
                                                    masuk: records.get('disposisi_masuk_id'),
                                                    status: 2,
                                                    pesan: records.get('disposisi_masuk_pesan'),
                                                    callback: function(staf, operation, success){
                                                        $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                    }
                                                });
                                                Ext.callback(view.callback, view, [success, record, eOpts]);
                                            }
                                        });
                                    } else {
                                        record.setStatus({
                                            pengubah : $session.getProfile().staf_id,
                                            status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                            tgl : now,
                                            success: Ext.emptyFn,
                                            failure: Ext.emptyFn,
                                            callback: Ext.emptyFn,
                                            scope: $this
                                        });

                                        if(! record) return;
                                        if(!form.getForm().isValid()){
                                            $this._click = 0;
                                            btnAjukan.setDisabled(false);
                                        }
                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            message: false,
                                            confirm: false,
                                            callback: function(success, record, eOpts, response){
                                                $this._click = 0;
                                                btnSetuju.setDisabled(false);
                                                view.close();
                                                log.status({
                                                    staf: $session.getProfile().staf_id,
                                                    masuk: record.get('disposisi_masuk_id'),
                                                    status: 2,
                                                    pesan: record.get('disposisi_masuk_pesan'),
                                                    callback: function(staf, operation, success){
                                                        $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                        // if(success){
                                                        //     $this.refresh(view);
                                                        // }
                                                    }
                                                });
                                                Ext.callback(view.callback, view, [success, record, eOpts]);
                                            }
                                        });
                                    }
                                } else {
                                    controllerPopupTtd.launch({
                                        mailValue: view.mailValue,
                                        mode:'add',
                                        record: record,
                                        callback: function(success, records){
                                            $this._click = 0;
                                            btnSetuju.setDisabled(false);
                                            view.close();
                                            log.status({
                                                staf: $session.getProfile().staf_id,
                                                masuk: records.get('disposisi_masuk_id'),
                                                status: 2,
                                                pesan: records.get('disposisi_masuk_pesan'),
                                                callback: function(staf, operation, success){
                                                    $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                }
                                            });
                                            Ext.callback(view.callback, view, [success, record, eOpts]);
                                        }
                                    });
                                }
                            } else {
                                if (ttd_akhir) {
                                    if (staf_akhir == dm_staf) {
                                        Ext.Ajax.request({
                                            url: $this.getApi('check', {
                                                staf_id: stafId }),
                                            success: function(response, eOpts){
                                            var objres = Ext.decode(response.responseText, 1) || {};

                                            if(objres.exist == 1){
                                                record.setStatus({
                                                    pengubah : $session.getProfile().staf_id,
                                                    status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                                    tgl : now,
                                                    success: Ext.emptyFn,
                                                    failure: Ext.emptyFn,
                                                    callback: Ext.emptyFn,
                                                    scope: $this
                                                });

                                                if(! record) return;
                                                if(!form.getForm().isValid()){
                                                    $this._click = 0;
                                                    btnAjukan.setDisabled(false);
                                                }
                                                $helper.saveRecord({
                                                    record: record,
                                                    form: form,
                                                    wait: true,
                                                    message: false,
                                                    confirm: false,
                                                    callback: function(success, record, eOpts, response){
                                                        $this._click = 0;
                                                        btnSetuju.setDisabled(false);
                                                        view.close();
                                                        log.status({
                                                            staf: $session.getProfile().staf_id,
                                                            masuk: record.get('disposisi_masuk_id'),
                                                            status: 2,
                                                            pesan: record.get('disposisi_masuk_pesan'),
                                                            callback: function(staf, operation, success){
                                                                $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                            }
                                                        });
                                                        Ext.callback(view.callback, view, [success, record, eOpts]);
                                                    }
                                                });
                                            } else {
                                                controllerPopupTtd.launch({
                                                    mailValue: view.mailValue,
                                                    mode:'add',
                                                    record: record,
                                                    callback: function(success, records){
                                                        $this._click = 0;
                                                        btnSetuju.setDisabled(false);
                                                        view.close();
                                                        log.status({
                                                            staf: $session.getProfile().staf_id,
                                                            masuk: records.get('disposisi_masuk_id'),
                                                            status: 2,
                                                            pesan: records.get('disposisi_masuk_pesan'),
                                                            callback: function(staf, operation, success){
                                                                $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                            }
                                                        });
                                                        Ext.callback(view.callback, view, [success, record, eOpts]);
                                                    }
                                                });
                                            }
                                        }});
                                    } else {
                                        record.setStatus({
                                            pengubah : $session.getProfile().staf_id,
                                            status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                            tgl : now,
                                            success: Ext.emptyFn,
                                            failure: Ext.emptyFn,
                                            callback: Ext.emptyFn,
                                            scope: $this
                                        });

                                        if(! record) return;
                                        if(!form.getForm().isValid()){
                                            $this._click = 0;
                                            btnAjukan.setDisabled(false);
                                        }
                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            message: false,
                                            confirm: false,
                                            callback: function(success, record, eOpts, response){
                                                $this._click = 0;
                                                btnSetuju.setDisabled(false);
                                                view.close();
                                                log.status({
                                                    staf: $session.getProfile().staf_id,
                                                    masuk: record.get('disposisi_masuk_id'),
                                                    status: 2,
                                                    pesan: record.get('disposisi_masuk_pesan'),
                                                    callback: function(staf, operation, success){
                                                        $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                        // if(success){
                                                        //     $this.refresh(view);
                                                        // }
                                                    }
                                                });
                                                Ext.callback(view.callback, view, [success, record, eOpts]);
                                            }
                                        });
                                    }
                                }else{
                                    Ext.Ajax.request({
                                        url: $this.getApi('check', {
                                            staf_id: stafId }),
                                        success: function(response, eOpts){
                                        var objres = Ext.decode(response.responseText, 1) || {};

                                        if(objres.exist == 1){
                                            record.setStatus({
                                                pengubah : $session.getProfile().staf_id,
                                                status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                                tgl : now,
                                                success: Ext.emptyFn,
                                                failure: Ext.emptyFn,
                                                callback: Ext.emptyFn,
                                                scope: $this
                                            });

                                            if(! record) return;
                                            if(!form.getForm().isValid()){
                                                $this._click = 0;
                                                btnAjukan.setDisabled(false);
                                            }
                                            $helper.saveRecord({
                                                record: record,
                                                form: form,
                                                wait: true,
                                                message: false,
                                                confirm: false,
                                                callback: function(success, record, eOpts, response){
                                                    $this._click = 0;
                                                    btnSetuju.setDisabled(false);
                                                    view.close();
                                                    log.status({
                                                        staf: $session.getProfile().staf_id,
                                                        masuk: record.get('disposisi_masuk_id'),
                                                        status: 2,
                                                        pesan: record.get('disposisi_masuk_pesan'),
                                                        callback: function(staf, operation, success){
                                                            $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                        }
                                                    });
                                                    Ext.callback(view.callback, view, [success, record, eOpts]);
                                                }
                                            });
                                        } else {
                                            controllerPopupTtd.launch({
                                                mailValue: view.mailValue,
                                                mode:'add',
                                                record: record,
                                                callback: function(success, records){
                                                    $this._click = 0;
                                                    btnSetuju.setDisabled(false);
                                                    view.close();
                                                    log.status({
                                                        staf: $session.getProfile().staf_id,
                                                        masuk: records.get('disposisi_masuk_id'),
                                                        status: 2,
                                                        pesan: records.get('disposisi_masuk_pesan'),
                                                        callback: function(staf, operation, success){
                                                            $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                                        }
                                                    });
                                                    Ext.callback(view.callback, view, [success, record, eOpts]);
                                                }
                                            });
                                        }
                                    }});
                                }
                            }
                        } else {
                            record.setStatus({
                                pengubah : $session.getProfile().staf_id,
                                status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                tgl : now,
                                success: Ext.emptyFn,
                                failure: Ext.emptyFn,
                                callback: Ext.emptyFn,
                                scope: $this
                            });

                            if(! record) return;
                            if(!form.getForm().isValid()){
                                $this._click = 0;
                                btnAjukan.setDisabled(false);
                            }
                            $helper.saveRecord({
                                record: record,
                                form: form,
                                wait: true,
                                message: false,
                                confirm: false,
                                callback: function(success, record, eOpts, response){
                                    $this._click = 0;
                                    btnSetuju.setDisabled(false);
                                    view.close();
                                    log.status({
                                        staf: $session.getProfile().staf_id,
                                        masuk: record.get('disposisi_masuk_id'),
                                        status: 2,
                                        pesan: record.get('disposisi_masuk_pesan'),
                                        callback: function(staf, operation, success){
                                            $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                            // if(success){
                                            //     $this.refresh(view);
                                            // }
                                        }
                                    });
                                    Ext.callback(view.callback, view, [success, record, eOpts]);
                                }
                            });
                        }
        
                    }else if (button == 'no'){
                        $this._click = 0;
                        btnSetuju.setDisabled(false);
                    }else{
                        /*when message box closed*/
                        $this._click = 0;
                        btnSetuju.setDisabled(false);
                    }
                }
            });
            btnSetuju.setDisabled(true);
        }
    },

    onButtonSaveRevisi_Click: function(button, e, eOpts, record){
        var $this   = this,
            $app    = $this.getApplication(),
            $session= $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            now     = new Date(),
            record  = form && form.updateRecord().getRecord(),
            log = $this.getModel($this.models[2]).create({}),
            btnRevisi   = button,
            txtKomentar = $this.getTxtKomentar({root:view});

        var koreksi = record.getKoreksi(),
            surat = koreksi.getSurat();

        if (!txtKomentar.getValue()){
            $helper.showMsg({success:false, message:$this.getMessage('empty_coment')});
        } else {
            $this._click++;
            if ($this._click <= 1) {
                $helper.showConfirm({
                    confirmText: 'Apakah anda yakin ?',
                    confirmTitle: 'Konfirmasi',
                    callback: function(button){
                        if(button == 'yes'){
                            record.set({
                                'disposisi_masuk_pesan' : txtKomentar.getValue(),
                                'baca' : 0
                            });
                            
                            record.setStatus({
                                pengubah : $session.getProfile().staf_id,
                                status : surat.self.statusPenyetujuan().PERSETUJUAN_DECLINE,
                                tgl : now,
                                success: Ext.emptyFn,
                                failure: Ext.emptyFn,
                                callback: Ext.emptyFn,
                                scope: $this
                            });

                            if(! record) return;
                            if(!form.getForm().isValid()){
                                $this._click = 0;
                                btnRevisi.setDisabled(false);
                            }
                            $helper.saveRecord({
                                record: record,
                                form: form,
                                wait: true,
                                message: false,
                                confirm: false,
                                // confirmText: 'Apakah anda yakin ?',
                                // confirmTitle: 'Konfirmasi',
                                callback: function(success, record, eOpts, response){
                                    $this._click = 0;
                                    btnRevisi.setDisabled(false);
                                    view.close();
                                    log.status({
                                        staf: $session.getProfile().staf_id,
                                        masuk: record.get('disposisi_masuk_id'),
                                        status: 4,
                                        pesan: record.get('disposisi_masuk_pesan'),
                                        callback: function(staf, operation, success){
                                            $helper.showMsg({success: true, message: 'Berhasil menyimpan tanggapan'});
                                            // if(success){
                                            //     $this.refresh(view);
                                            // }
                                        }
                                    });
                                    Ext.callback(view.callback, view, [success, record, eOpts]);
                                }
                            });

                        }else if (button == 'no'){
                            $this._click = 0;
                            btnRevisi.setDisabled(false);
                        }else{
                            /*when message box closed*/
                            $this._click = 0;
                            btnRevisi.setDisabled(false);
                        }
                    }
                });
                btnRevisi.setDisabled(true);
            }
        }
    },

    onButtonPenyetuju_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropPenyetuju),
            record = form && form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat();

        controllerProp.launch({
            mode:'view',
            record: surat,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonPetikan_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropPetikan),
            record = form && form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat();

        controllerProp.launch({
            mode:'view',
            record: surat,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonDetailPenyetuju_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat(),
            controllerPenyetuju = $this.getController($this.controllerPenyetuju);

        view.setLoading(true);
        controllerPenyetuju.launch({
            mode:'view',
            record: surat
        });
        view.setLoading(false);
    },

    onButtonRiwayat_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat(),
            controllerProp = $this.getController($this.controllerPropRiwayat);

        if (record.get('surat_model') == 2){
            controllerProp.launch({
                mode:'view',
                record: surat,
                callback: function(success, record, eOpts){
                    // if(success)view.close();
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
    },

    onButtonTujuan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerPropPenerima = $this.getController($this.controllerPopupPenerima),
            record = form && form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat(),
            model = surat.get('surat_model'),
            model_sub = surat.get('surat_model_sub'),
            surat_setuju = surat.get('surat_setuju');

        // if(model == 6 && model_sub != 1) {
            controllerPropPenerima.launch({
                mode:'view',
                record: surat,
                model: model,
                callback: function(success, record, eOpts){
                }
            });
        // } else {
        //     controllerPropPenerimaJabatan.launch({
        //         mode:'view',
        //         record: surat,
        //         callback: function(success, record, eOpts){
        //         }
        //     });
        // }
    },

    onButtonDaftarTembusan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupTembusan),
            controllerPropStack = $this.getController($this.controllerPopupTembusanStack),
            controllerPopupPenerima = $this.getController($this.controllerPopupPenerima),
            record = form && form.updateRecord().getRecord(),
            koreksi = record.getKoreksi(),
            surat = koreksi.getSurat(),
            surat_setuju = surat.get('surat_setuju');

        if(surat.get('surat_model') == 6) {
            controllerPopupPenerima.launch({
                mode:'view',
                record: surat,
                type: 'tembusan',
                callback: function(success, record, eOpts){                
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        } else {
            if (surat_setuju == 2){
                controllerProp.launch({
                    mode:'view',
                    record: surat,
                    callback: function(success, record, eOpts){
                    }
                });
            } else {
                controllerPropStack.launch({
                    mode:'view',
                    record: surat,
                    callback: function(success, record, eOpts){
                    }
                });
            }
        }
    },

    onButtonRiwayatPenyetujuan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        record.getKoreksi(function(koreksi){
            koreksi.getSurat(function(surat){
                if (surat.get('surat_model') == 2 || surat.get('surat_model') == 4 || surat.get('surat_model') == 6){
                    controllerProp.launch({
                        mode:'view',
                        record: surat,
                        callback: function(success, surat, eOpts){
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                }
            });
        });
        // view.close(); important do not remove
    },

    onButtonPrintApproval_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            viewer = $this.getView($this.viewViewer),
            record = form.getRecord();

        record.getKoreksi(function(koreksi){
            koreksi.getSurat(function(surat){
                if(surat){
                    if (surat.get('surat_model') == 2 || surat.get('surat_model') == 4 || surat.get('surat_model') == 6){
                        link = window.location.href+$this.getApi('print_approval', {id:surat.getId()});
                        var view = viewer.create({
                            modal: true,
                            height: 600,
                            width: 1024,
                            maximizable: true
                        }).show().load(link);
                        view.setTitle('Cetak Lembar Penyetujuan');
                    }
                }
            });
        });
    },

    onButtonPenerima_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupPenerima),
            record = form && form.updateRecord().getRecord(),
            model = record.get('surat_model'),
            model_sub = record.get('surat_model_sub');

        record.getKoreksi(function(koreksi){
            koreksi.getSurat(function(surat){
                // if(model == 6 && model_sub != 1) {
                    controllerProp.launch({
                        mode:'view',
                        record: surat,
                        callback: function(success, surat, eOpts){
                        }
                    });
                // } else {
                //     controllerPropJabatan.launch({
                //         mode:'view',
                //         record: surat,
                //         callback: function(success, surat, eOpts){
                //         }
                //     });
                // }
                // view.close(); important do not remove
            });
        });

    },

    onButtonPengingat_Click: function(button, e, eOpts){
        var $this    = this,
            $app        = $this.getApplication(),
            $session    = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper     = $app.Helper(),
            view     = $this.getMainview({from:button}),
            form     = $this.getForm({root:view}),
            record   = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

        $helper.showConfirm({
            confirmTitle: 'Pengingat Surat',
            confirmText : 'Apakah anda yakin untuk mengingatkan pimpinan ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('pengingat_asisten'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal mengingatkan pimpinan'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil mengingatkan pimpinan'});
                                view.close();
                            }
                        }
                    });
                }
            }
        });
    }
});