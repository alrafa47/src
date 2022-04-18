Ext.define('SIPAS.controller.Sipas.riwayat.session.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],
    
    views: [
        'Sipas.riwayat.session.Prop'
    ],

    models: [
        'Sipas.disposisi.Riwayat'
    ],

    stores: [
        'Sipas.perintah.Combo'
    ],

    messages: {
        'retract_confirm'   : ['Konfirmasi','Disposisi yang dicabut tidak bisa dibatalkan.<br/>Apakah anda yakin untuk melanjutkan ?'],
        'retracting'        : 'Memproses Pencabutan',
        'retract_failure'   : 'Gagal Mencabut Disposisi. Disposisi tidak tersedia.',
        'retract_success'   : 'Berhasil mencabut Disposisi.'
    },

    refs: [
        { ref: 'mainview',              selector: 'sipas_riwayat_session_prop' },
        { ref: 'form',                  selector: 'sipas_riwayat_session_prop > form' },
        { ref: 'text',                  selector: 'sipas_riwayat_session_prop > form #text' },
        { ref: 'compSurat',             selector: 'sipas_riwayat_session_prop sipas_com_surat_pane'},
        { ref: 'compRetract',           selector: 'sipas_riwayat_session_prop #buttonCabutDisposisi'},
        { ref: 'compPrint',             selector: 'sipas_riwayat_session_prop sipas_com_button_print'},
        { ref: 'compPengirimImage',     selector: 'sipas_riwayat_session_prop sipas_com_disposisi_pengirim_pane #pengirimImg'},
        { ref: 'perintahCombo',         selector: 'sipas_riwayat_session_prop combobox[name=disposisi_perintah]'},
        { ref: 'compJenisSurat',        selector: 'sipas_riwayat_session_prop sipas_com_surat_pane #jenisSurat'},
        { ref: 'compPengirimSurat',     selector: 'sipas_riwayat_session_prop sipas_com_surat_pane #suratPengirim'},
        { ref: 'toolbar',               selector: 'sipas_riwayat_session_prop sipas_disposisi_riwayat_detail_penerima_list #toolbarAction'},
        { ref: 'compDetailSurat',       selector: 'sipas_riwayat_session_prop sipas_com_surat_pane #suratDetail'},
        { ref: 'compDetailPerintah',    selector: 'sipas_riwayat_session_prop sipas_com_perintah_pane #perintahDetail'},
        { ref: 'comDetailSurat',        selector: 'sipas_riwayat_session_prop > form sipas_surat_informasi_detail_pane'},
        { ref: 'containerInformasi',    selector: 'sipas_riwayat_session_prop > form sipas_surat_informasi_pane'},
        { ref: 'txtPengirim',           selector: 'sipas_riwayat_session_prop > form #txtPengirim'},
        { ref: 'txtArahan',             selector: 'sipas_riwayat_session_prop > form #txtArahan'},
        { ref: 'cmpLogArahan',          selector: 'sipas_riwayat_session_prop > form #logArahan'},
        { ref: 'txtLogArahan',          selector: 'sipas_riwayat_session_prop > form #txtLogArahan'},
        { ref: 'txtDetailArahan',       selector: 'sipas_riwayat_session_prop > form #txtDetailArahan'},
        { ref: 'txtPenerima',           selector: 'sipas_riwayat_session_prop > form #txtPenerima'},
        { ref: 'txtCabut',              selector: 'sipas_riwayat_session_prop > form #txtCabut'},
        { ref: 'comSuratSelesai',       selector: 'sipas_riwayat_session_prop > form #containerSelesai'},
        { ref: 'textSelesai',           selector: 'sipas_riwayat_session_prop sipas_surat_informasi_selesai_pane #textSelesai'},
        { ref: 'comSuratBalasan',       selector: 'sipas_riwayat_session_prop > form #containerBalasan'},
        { ref: 'textBalasan',           selector: 'sipas_riwayat_session_prop sipas_surat_informasi_balasan_pane #balasanInfo'},
        { ref: 'txtPgsAktif',           selector: 'sipas_riwayat_session_prop #txtPgsAktif'},
        { ref: 'txtProfil',             selector: 'sipas_riwayat_session_prop > form #txtProfil'}
    ],

    api: {
        print_approval      : 'server.php/sipas/surat/printApproval?id={id}',
        surat_balas         : 'server.php/sipas/surat_keluar/getBalas?id={id}'
    },

    defaultStoreRiwayat : 'Sipas.disposisi.riwayat.List',

    controllerSurat                 : 'Sipas.surat.Prop',
    controllerMasuk                 : 'Sipas.masuk.agenda.Prop',
    controllerIMasuk                : 'Sipas.internal.masuk.agenda.Prop',
    controllerForward               : 'Sipas.disposisi.forward.Form',
    controllerCabut                 : 'Sipas.disposisi.riwayat.cabut.Popup',
    controllerEkspedisi             : 'Sipas.surat.ekspedisi.Popup',
    controllerPopupEkspedisiKeluar  : 'Sipas.surat.ekspedisi.keluar.Popup',
    controllerPropPenyetuju         : 'Sipas.surat.penyetuju.Prop',
    controllerPropRiwayat           : 'Sipas.surat.penyetuju.riwayat.Popup',
    controllerPopupTembusan         : 'Sipas.surat.tembusan.Popup',
    controllerPopupTembusanStack    : 'Sipas.surat.tembusan.stack.Popup',
    controllerArahan                : 'Sipas.riwayat.session.perintah.Popup',

    viewViewer : 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_riwayat_session_prop' : {
                show: this.onMainview_Show,
                close: this.onMainview_Close
            },
            'sipas_riwayat_session_prop > form sipas_arsip_pane' : {
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_riwayat_session_prop > form #containerSurat' : {
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_riwayat_session_prop > form #containerArahan' : {
                loadassociate: this.onArahan_LoadAssociate
            },
            'sipas_riwayat_session_prop > form #containerPenerima' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_riwayat_session_prop > form #containerCabut' : {
                loadassociate: this.onRiwayatCabut_LoadAssociate
            },
            'sipas_riwayat_session_prop #buttonCabutDisposisi': {
                click: this.onButtonRetract_Click
            },
            'sipas_riwayat_session_prop sipas_com_button_print': {
                click: this.onButtonPrint_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane sipas_com_button_expedition': {
                click: this.onButtonExpedition_Click
            },
            "sipas_riwayat_session_prop sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane #btnEkspedisiKeluar": {
                click: this.onButtonEkspedisiKeluar_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_pane #buttonLihatRating':{
                click: this.onButtonLihatRating_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju': {
                click: this.onButtonPenyetuju_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayatPenyetujuan_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]' : {
                click: this.onButtonPrintApproval_Click
            },
            'sipas_riwayat_session_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarTembusan': {
                click: this.onButtonPenerimaTembusan_Click
            },
            'sipas_riwayat_session_prop > form #buttonBalasan': {
                click: this.onButtonBalasan_Click
            },
            'sipas_riwayat_session_prop > form #logArahan': {
                expand: this.onLogArahan_Expand
            },
            'sipas_riwayat_session_prop #buttonArahan' : {
                click: this.onButtonArahan_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            type: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel($this.defaultModel || $this.models[0]).create({}),
            view = null,
            type = config.type,
            disposisi_mode = record.get('disposisi_mode'),
            disposisi_prop_title = $app.getGrammar('disposisi_masuk_forward_popup_disposisi'),
            notadinas_prop_title = $app.getGrammar('disposisi_masuk_forward_popup_notadinas'),
            role_asistensi              = $session.getRuleAccess('asistensi'),
            role_asistensi_selesai      = $session.getRuleAccess('asistensi_selesai'),
            role_asistensi_ekspedisi    = $session.getRuleAccess('asistensi_ekspedisi'),
            role_asistensi_arahan       = $session.getRuleAccess('asistensi_arahan'),
            role_pgs                    = $session.getRuleAccess('pgs'),
            role_pgs_selesai            = $session.getRuleAccess('pgs_selesai'),
            role_pgs_ekspedisi          = $session.getRuleAccess('pgs_ekspedisi'),
            role_pgs_arahan             = $session.getRuleAccess('pgs_arahan'),
            role_ubah_arahan            = $session.getRuleAccess('riwayat_perintah_ubah');
            
        switch(config.mode)
        {
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.disableComponents     = [];
                    c.removeComponents      = ['#buttonAdd','#buttonTujuan','#buttonUbah','#reuploadWarning','#reuploadWarningMasuk', '#buttonResendKeputusan',
                                                '#buttonResend','#buttonRating','#btndaftarPenerima', '#comSuratSelesai', '#buttonSelesai'];
                    c.readonlyComponents    = [];
                    
                    if(c.record.get('disposisi_iscabut') === 1){
                        c.removeComponents.push('sipas_disposisi_riwayat_detail_penerima_list #buttonCabutDisposisi');
                    }

                    if (c.record.get('surat_usebalas') == 1) {
                        c.removeComponents.push('#containerSelesai'); 
                    }else{
                        c.removeComponents.push('#containerBalasan');
                    }

                    if (c.record.get('disposisi_jumlah_penerima_baca') > 0) {
                        c.removeComponents.push('#buttonArahan');
                    }
                    
                    if (c.record.get('disposisi_profil_isganti') == 1) {
                        c.removeComponents.push('#buttonArahan');
                    }else{
                        c.removeComponents.push('#containerProfil');
                    }
                    /*ketika pgs aktif*/
                    if (c.record.get('disposisi_masuk_plt') == 1) {
                        c.disableComponents.push('#buttonCabutDisposisi','#daftarPenyetuju', '#btnMore', 'sipas_com_button_print',
                             '#buttonSelesai', '#buttonLihatKorespondensi', 'sipas_com_button_expedition');
                    }else{
                        c.removeComponents.push('#containerPgsAktif');
                    }
                    
                    if (!role_ubah_arahan) {
                        c.removeComponents.push('#buttonArahan'); 
                    }
                    if (c.type == 'asisten') {
                       // c.removeComponents.push('#buttonCabutDisposisi','#daftarPenyetuju', '#btnMore', 'sipas_com_button_print',
                       //      '#buttonSelesai', '#buttonLihatKorespondensi', 'sipas_com_button_expedition');

                        if (role_asistensi) {
                            if (!role_asistensi_selesai) {
                                c.removeComponents.push('#buttonSelesai'); 
                            }
                            if (!role_asistensi_arahan) {
                                c.removeComponents.push('#buttonArahan'); 
                            }
                            if (!role_asistensi_ekspedisi) {
                                c.removeComponents.push('sipas_com_button_expedition'); 
                            }                        
                        }
                    }else if(c.type == 'pgs'){
                        c.removeComponents.push('#buttonPengingat');

                        if (role_pgs) {
                            if (!role_pgs_selesai) {
                                c.removeComponents.push('#buttonSelesai'); 
                            }
                            if (!role_pgs_arahan) {
                                c.removeComponents.push('#buttonArahan'); 
                            }
                            if (!role_pgs_ekspedisi) {
                                c.removeComponents.push('sipas_com_button_expedition'); 
                            }
                        }
                    }

                    if (c.record.get('staf_hide') == 1) {
                        c.disableComponents.push('#buttonArahan');
                    }

                    return c;
                })(config));

                if (disposisi_mode === 'Disposisi'){
                    view.setTitle(disposisi_prop_title);
                } else if (disposisi_mode === 'Nota Dinas'){
                    view.setTitle(notadinas_prop_title);
                }

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
                    com9 = comInformasiSurat.down('sipas_surat_informasi_musnah_pane');
                    com10 = comInformasiSurat.down('sipas_surat_informasi_arsip_pane');
                    com11 = comInformasiSurat.down('sipas_surat_informasi_balasan_pane');

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
                if (com11) { com11.associated = false; }
                
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                });
                break;

            case 'lihat' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.readonlyComponents    = [];
                    c.removeComponents      = ['#buttonAdd','#buttonTujuan','#buttonUbah','#reuploadWarning', '#infoBatalNomor', '#infoMusnahSurat', '#infoArsipSurat',
                                                '#buttonSelesai','#buttonResend','#buttonRating','#btndaftarPenerima', '#comSuratSelesai', '#buttonSelesai'];
                    
                    if(c.record.get('disposisi_iscabut') === 1){
                        c.removeComponents.push('sipas_disposisi_riwayat_detail_penerima_list #toolbarAction');
                    }

                    if (c.record.get('surat_usebalas') == 1) {
                        c.removeComponents.push('#containerSelesai'); 
                    }else{
                        c.removeComponents.push('#containerBalasan');
                    }

                    if (c.record.get('disposisi_profil_isganti') == 1) {
                        c.removeComponents.push('#buttonArahan');
                    }else{
                        c.removeComponents.push('#containerProfil');
                    }
                    /*ketika pgs aktif*/
                    if (c.record.get('disposisi_masuk_plt') == 1) {
                        c.disableComponents.push('#buttonCabutDisposisi','#daftarPenyetuju', '#btnMore', 'sipas_com_button_print',
                             '#buttonSelesai', '#buttonLihatKorespondensi', 'sipas_com_button_expedition');
                    }else{
                        c.removeComponents.push('#containerPgsAktif');
                    }
                    
                    return c;
                })(config));

                if (disposisi_mode === 'Disposisi'){
                    view.setTitle(disposisi_prop_title);
                } else if (disposisi_mode === 'Nota Dinas'){
                    view.setTitle(notadinas_prop_title);
                }

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
                    com9 = comInformasiSurat.down('sipas_surat_informasi_musnah_pane');

                if (com1) { com1.associated = false; }
                if (com2) { com2.associated = false; }
                if (com3) { com3.associated = false; }
                if (com4) { com4.associated = false; }
                if (com5) { com5.associated = false; }
                if (com6) { com6.associated = false; }
                if (com7) { com7.associated = false; }
                if (com8) { com8.associated = false; }
                if (com9) { com9.associated = false; }
                
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            form = $this.getForm({root:mainview}),
            record = mainview.record || $this.getModel(this.models[0]).create({}),
            cmpJenis = $this.getCompJenisSurat({root:mainview}),
            toolbar = $this.getToolbar({root:mainview}),
            txtPgsAktif = $this.getTxtPgsAktif({root:mainview}),
            txtProfil = $this.getTxtProfil({root:mainview}),
            $label = '';

        if (record.get('disposisi_profil_isganti') == 1){
            if (mainview.type == 'asisten') {
                $label = $language.getGrammar('profil_asisten_nonaktif', false);
            } else if (mainview.type == 'pgs') {
                $label = $language.getGrammar('profil_pgs_nonaktif', false);
            } else {
                $label = $language.getGrammar('profil_nonaktif', false);
            }
            var tplProfil = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">'+
                '<div class="subtext">'+$label+'</div>'+
            '</div>';
            txtProfil && txtProfil.setValue(tplProfil);
        }

        if (record.get('disposisi_masuk_plt') == 1){
            var tplPgsAktif = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">'+
                '<div class="subtext">'+$language.getGrammar('disposisi_pgs_aktif', false)+'</div>'+
            '</div>';
            txtPgsAktif && txtPgsAktif.setValue(tplPgsAktif);
        }

        form.loadRecord(record);
    },

    onMainview_Close: function(mainview, eOpts)
    {
        var $this = this,
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord();
        
        record && record.reject();
        Ext.callback(mainview.callback, mainview.scope, [mainview, $this]);
    },

    onArsip_LoadAssociate: function(record, form, cmp){
        var view = this.getMainview({from:cmp}),
            $app = this.getApplication(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId();

        cmp.setLoading(true);
        if(record){
            record.getSurat(function(surat){
                surat.getArsip(function(arsip){
                    cmp.setLoading(false);
                    if(arsip){
                        cmp.fireEvent('load', cmp, surat, arsip, surat.get('surat_israhasia'), 'lihat', pegawaiId);
                    }
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
            detailSurat = $this.getComDetailSurat({root:mainview}),
            suratSelesai = $this.getComSuratSelesai({root:mainview}),
            suratBalasan = $this.getComSuratBalasan({root:mainview}),
            infoSurat = $this.getContainerInformasi({root:mainview});

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                var hideComps = {},
                    model = surat && surat.get('surat_model'),
                    balas = surat && surat.get('surat_usebalas');

                if (model == 1 || model == 3){
                    hideComps['#containerPenyetuju'] = true;
                }
                if (model != 3){
                    hideComps['#infoRating'] = true;
                    hideComps['#infoTerima'] = true;
                }
                if (model != 2){
                    hideComps['#btndaftarTembusan'] = true;
                }
                // if (model == 2){// fase 2 memunculkan lacak untuk SKE
                //     hideComps['sipas_com_button_expedition'] = true;
                // }

                if (balas) {
                    $this.onSuratBalasan_Render(surat, form, suratBalasan);
                }else{
                    $this.onSuratSelesai_Render(surat, form, suratSelesai);
                }

                $helper.hideComponent({
                    parent: infoSurat,
                    items: hideComps
                });

                detailSurat && detailSurat.fireEvent('load', detailSurat, surat, record);
                infoSurat && infoSurat.fireEvent('load', infoSurat, surat, form);
                cmp.setLoading(false);
            });
        });
    },

    onArahan_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            record = form.updateRecord().getRecord(),
            txtPengirim = $this.getTxtPengirim({root:mainview}),
            txtArahan = $this.getTxtArahan({root:mainview}),
            txtDetailArahan = $this.getTxtDetailArahan({root:mainview}),
            pengirim_id = record.get('disposisi_pengirim_id'),
            pengirim_nama = record.get('disposisi_pengirim_nama'),
            pengirim_jabatan_nama = record.get('disposisi_pengirim_jabatan_nama'),
            pengirim_unit_nama = record.get('disposisi_pengirim_unit_nama'),
            staf_id = record.get('disposisi_pelaku_id'),
            staf_nama = record.get('disposisi_pelaku_nama'),
            jabatan_nama = record.get('disposisi_pelaku_jabatan_nama'),
            unit_nama = record.get('disposisi_pelaku_unit_nama'),
            arahan_nama = record.get('perintah_nama') ? record.get('perintah_nama') : '<span class="alternative">(Tidak Ada Arahan)</span>' ,
            uraian_arahan = record.get('disposisi_pesan') ? record.get('disposisi_pesan') : '<span class="alternative">(Tidak Ada Uraian)</span>' ,
            tgl_disposisi = Ext.Date.format(record.get('disposisi_tgl'), 'd M Y H:i'),
            tplPengirim = '',
            tplArahan = '',
            tplDetail = '';

        tplPengirim = new Ext.XTemplate([
            '<div class="margin-left-12 margin-right-12 margin-bottom-12">'+
                '<tpl if="values.staf_id != values.pengirim_id">'+
                    '<div class="padding-top-12">'+
                        '<div style="display:flex"><div class="cell-visual cell-visual-left">'+
                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={staf_id}">'+
                        '</div>'+
                        '<div class="cell-text">'+
                            '<div class="maintext">{staf_nama}</div>'+
                            '<div class="supporttext supporttext-dark">{jabatan_nama} - {unit_nama}</div>'+
                            '<div class="supporttext supporttext-dark">Via asistensi ({pengirim_nama})</div>'+
                        '</div></div>'+
                    '</div>'+
                '<tpl else>'+
                    '<div class="padding-top-12">'+
                        '<div style="display:flex"><div class="cell-visual cell-visual-left">'+
                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={staf_id}">'+
                        '</div>'+
                        '<div class="cell-text">'+
                            '<div class="maintext">{staf_nama}</div>'+
                            '<div class="supporttext supporttext-dark">{jabatan_nama} - {unit_nama}</div>'+
                        '</div></div>'+
                    '</div>'+
                '</tpl>'+
            '</div>']);

        txtPengirim.setValue(tplPengirim.apply({
            model: record.get('disposisi_model_sub'),
            pengirim_id: staf_id,
            pengirim_nama: staf_nama,
            staf_id: pengirim_id,
            staf_nama: pengirim_nama,
            jabatan_nama: pengirim_jabatan_nama,
            unit_nama: pengirim_unit_nama
        }));

        tplArahan = new Ext.XTemplate([
            '<div class="margin-left-12 margin-right-12 margin-bottom-12">'+
                '<div class="padding-top-12">'+
                    '<div class="cell-visual cell-visual-left">'+
                        '<div class="img img-circle img-32 bg-yellow-200-i">'+
                            '<i class="bigger-1-25 icon ion-md-quote grey-600"></i>'+
                        '</div>'+
                    '</div>'+
                    '<div class="cell-text">'+
                        '<div class="maintext">{arahan_nama}</div>'+
                        '<div class="supporttext supporttext-dark">{uraian_arahan}</div>'+
                    '</div>'+
                '</div>'+
            '</div>']);

        txtArahan.setValue(tplArahan.apply({
            model: record.get('disposisi_model_sub'),
            arahan_nama: arahan_nama,
            uraian_arahan: uraian_arahan
        }));

        tplDetail = new Ext.XTemplate([
            '<div class="margin-left-12 margin-right-12 margin-bottom-12">'+
                '<div class="padding-top-12">'+
                    '<div class="cell-visual cell-visual-left">'+
                        '<tpl if="values.model == 1">'+
                            '<div class="img img-icon img-icon-20 img-circle img-icon-mailuserforward bg-cyan-500-i"></div>'+
                        '<tpl else>'+
                            '<div class="img img-icon img-icon-20 img-circle img-icon-mailusertree bg-red-500-i"></div>'+
                        '</tpl>'+
                    '</div>'+
                    '<div class="cell-text">'+
                        '<tpl if="values.model == 1">'+
                            '<div class="maintext">Dikirim sebagai Nota Dinas</div>'+
                        '<tpl else>'+
                            '<div class="maintext">Dikirim sebagai Disposisi</div>'+
                        '</tpl>'+
                        '<div class="supporttext supporttext-dark">Pada {tgl_disposisi}</div>'+
                    '</div>'+
                '</div>'+
            '</div>']);
        txtDetailArahan.setValue(tplDetail.apply({
            model: record.get('disposisi_model_sub'),
            tgl_disposisi: tgl_disposisi
        }));
        cmp.setLoading(false);
    },
    
    onPenerima_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            mainview = $this.getMainview({from:cmp}),
            record = form.updateRecord().getRecord(),
            store = record.fetchRiwayatPenerima(),
            txtPenerima = $this.getTxtPenerima({root:mainview}),
            template = '';

        store.load(function(){
            store.each(function(record){
                template = new Ext.XTemplate([
                            '<div class="margin-top-8 margin-right-16">'+
                                '<div class="padding-top-12 padding-right-12 padding-bottom-12 padding-left-12">'+
                                    '<div class="cell-visual cell-visual-left">'+
                                        '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={disposisi_masuk_penerima_id}">'+
                                    '</div>'+
                                    '<div class="cell-text">'+
                                        '<div class="maintext">{disposisi_masuk_penerima_nama}</div>'+
                                        '<div class="supporttext supporttext-dark">{disposisi_masuk_penerima_jabatan_nama} - {disposisi_masuk_penerima_unit_nama}</div>'+
                                        '<tpl if="values.disposisi_masuk_isberkas == 1">'+
                                            '<div class="subtext margin-top-4">'+
                                                '<span class="badge badge-light bg-grey-300-i">'+
                                                    '<span class="grey-700">'+
                                                        '<i class="bigger-1-25 icon ion-md-copy margin-right-4"></i>Disertai berkas fisik'+
                                                    '</span>'+
                                                '</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_israhasia == 1">'+
                                            '<div class="subtext margin-top-4">'+
                                                '<span class="badge badge-danger">'+
                                                    '<i class="bigger-1-25 icon ion-md-lock margin-right-4"></i>{language_rahasia}'+
                                                '</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_istembusan == 1">'+
                                            '<div class="subtext margin-top-4 margin-bottom-4">'+
                                                '<span class="badge badge-info">'+
                                                    '<i class="bigger-1-25 icon ion-logo-closed-captioning margin-right-4"></i>{language_tembusan}'+
                                                '</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_iscabut == 1">'+
                                            '<div class="supporttext supporttext-dark">'+
                                                '<i class="bigger-1-25 icon ion-md-document margin-right-4 danger"></i>'+
                                                '<span class="danger">{language_cabut} pada {[Ext.util.Format.date(values.disposisi_masuk_cabut_tgl,\'d M Y H:i\')]}</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_isbaca">'+
                                            '<div class="supporttext supporttext-dark">'+
                                                '<i class="bigger-1-25 icon ion-md-checkmark margin-right-4 info"></i>'+
                                                '<span class="info">Dibaca pada {[Ext.util.Format.date(values.disposisi_masuk_baca_tgl,\'d M Y H:i\')]}</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_isberkasterima == 1">'+
                                            '<div class="supporttext supporttext-dark">'+
                                                '<i class="bigger-1-25 icon ion-md-copy margin-right-4 info"></i>'+
                                                '<span class="info">Berkas diterima pada {[Ext.util.Format.date(values.disposisi_masuk_berkasterima_tgl,\'d M Y H:i\')]}</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_aksi">'+
                                            '<div class="supporttext supporttext-dark">'+
                                                '<i class="bigger-1-25 icon ion-md-text margin-right-4 grey-600"></i>'+
                                                '<tpl if="values.aksi_nama">'+
                                                    '{aksi_nama}, '+
                                                '<tpl else>'+
                                                    '<span class="alternative">(Tidak ada respon), </span>'+
                                                '</tpl>'+
                                                '<tpl if="values.disposisi_masuk_pesan">'+
                                                    '{disposisi_masuk_pesan}'+
                                                '<tpl else>'+
                                                    ''+
                                                '</tpl>'+
                                                '<tpl if="values.disposisi_masuk_aksi_tgl">'+
                                                    '<span class="alternative smaller-0-75 margin-left-8">({[Ext.util.Format.date(values.disposisi_masuk_aksi_tgl,\'d M Y H:i\')]})</span>'+
                                                '</tpl>'+
                                            '</div>'+
                                        '</tpl>'+
                                        '<tpl if="values.disposisi_masuk_isterus">'+
                                            '<div class="supporttext supporttext-dark">'+
                                                '<i class="bigger-1-25 icon ion-md-send margin-right-4 info"></i>'+
                                                '<span class="info">Telah diteruskan pada {[Ext.util.Format.date(values.disposisi_masuk_terus_tgl,\'d M Y H:i\')]}</span>'+
                                            '</div>'+
                                        '</tpl>'+
                                    '</div>'+
                                '</div>'+
                            '</div>']);

                record.data['language_cabut']       = $app.getGrammar('riwayat_disposisi_list_cabut', false);
                record.data['language_tembusan']    = $app.getGrammar('as_tembusan', false);
                record.data['language_rahasia']     = $app.getGrammar('disposisi_rahasia_tooltip', false);

                txtPenerima.setValue(txtPenerima.getValue()+template.apply(record.data));
            });
            cmp.setLoading(false);
        });
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var mainview = this.getMainview({from:button}),
            form = this.getForm({root:mainview}),
            record = form && form.getForm().getRecord(),
            c = this.getController(this.controllerForward);

        if(! record) return;
        c && c.printReportSender(record.getId(), null, null, 'Cetak Lembar Disposisi');
    },

    onButtonRetract_Click: function(button, e, eOpts){
        var $this = this,
            view        = $this.getMainview({from:button}),
            form        = $this.getForm({root:view}),
            record      = form && form.getRecord(),
            $checkSession = $this.getApplication().getSession().getResetSession(),
            controllerCabut = $this.getController($this.controllerCabut);

        controllerCabut.launch({
            record: record,
            mode:'cabut',
            selfAsPenerima: record,
            callback: function(record, operation, success){
                view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        // view.close();
    },

    onRiwayatCabut_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            $language = $app.Language(),
            mainview = $this.getMainview({from:cmp}),
            is_cabut = record.get('disposisi_iscabut') == 1 ? true : false,
            tgl_cabut = Ext.util.Format.date(record.get('disposisi_cabut_tgl'), 'd M Y H:i'),
            txtCabut = $this.getTxtCabut({root:mainview}),
            languageCabut = $language.getGrammar('disposisi_iscabut_danger', false);

        if (is_cabut){
            txtCabut.setValue('<div class="cell-text">'+
                            '<div class="subtext">'+languageCabut+'</div>'+
                            '<div class="supporttext supporttext-dark">Pada '+tgl_cabut+'</div>'+
                         '</div>');
        } else {
            cmp.hide(true);
        }
    },

    onButtonExpedition_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerEkspedisi = $this.getController($this.controllerEkspedisi);

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                if (surat.get('surat_model') == '2') {
                    Ext.Ajax.request({
                        url: 'server.php/sipas/surat_ekspedisi/checkTembusan',
                        params: {
                            'id' : surat.get('surat_id')
                        },
                        success : function(response, eOpts){
                            var objres = Ext.decode(response.responseText, true) || {};
                            if(objres.exist == 0){
                                $helper.showMsg({success:false, message:'Tidak dapat melacak penerima tembusan, surat ini tidak memiliki penerima tembusan'});
                                return;
                            }else{
                                controllerEkspedisi.launch({
                                    record: surat,
                                    mode: 'disposisi',
                                    callback: function(success){
                                    }
                                });
                            }
                        }
                    });
                } else {
                    controllerEkspedisi.launch({
                        record: surat,
                        mode: 'disposisi',
                        callback: function(success){
                        }
                    });
                }
            });
        });
    },

    onButtonEkspedisiKeluar_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerPopup = $this.getController($this.controllerPopupEkspedisiKeluar),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                controllerPopup.launch({
                    mode:'view',
                    record: surat
                });
            });
        });
    },

    onButtonLihatRating_Click: function(button, e, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            record  = form && form.updateRecord().getRecord(),
            controllerRating = $this.getController($this.controllerRating);

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                controllerRating.launch({
                    propType: 'imasuk',
                    unit: view.unit,
                    mode: 'view',
                    model: surat.self.modelType().MODEL_IMASUK,
                    record: surat
                });
            });
        });
    },

    onButtonPenyetuju_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropPenyetuju),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                controllerProp.launch({
                    mode:'view',
                    record: surat,
                    callback: function(success, surat, eOpts){
                        // if(success)view.close();
                        Ext.callback(view.callback, view, [success, surat, eOpts]);
                    }
                });
            });
        });
        // view.close(); important do not remove
    },

    onButtonRiwayatPenyetujuan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                if (surat.get('surat_model') === 2){
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

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                if(surat){
                    if (surat.get('surat_model') === 2){
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

    onButtonPenerimaTembusan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupTembusan),
            controllerPropStack = $this.getController($this.controllerPopupTembusanStack),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                if (surat.get('surat_setuju') == '2'){
                    controllerProp.launch({
                        mode:'view',
                        record: surat,
                        callback: function(success, surat, eOpts){
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                    // view.close(); important do not remove
                } else {
                    controllerPropStack.launch({
                        mode:'view',
                        record: surat,
                        callback: function(success, surat, eOpts){
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                    // view.close(); important do not remove
                }
            });
        });
    },

    onSuratSelesai_Render: function(record, form, cmp){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:cmp}),
            txtSelesai = $this.getTextSelesai({root:mainview}),
            selesai = record && record.get('surat_isselesai'),
            penyelesai_id = record && record.get('penyelesai_id'),
            penyelesai_nama = record && record.get('penyelesai_nama'),
            penyelesai_unit = record && record.get('penyelesai_unit_nama'),
            tgl_selesai = record && Ext.Date.format(record.get('surat_selesai_tgl'), 'd M Y H:i'),
            tpl = '';

        if (selesai == '1'){
            tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
            '</div>',
            '<div class="cell-text">',
                '<div class="subtext bold">Surat ditandai selesai oleh :</div>',
                '<div class="subtext">{nama} - {unit}</div>',
                '<div class="supporttext">Pada {tgl}</div>',
            '</div>']).apply({
                id: penyelesai_id,
                nama: penyelesai_nama,
                unit: penyelesai_unit,
                tgl: tgl_selesai
            });
        } else {
            tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<div class="img img-circle img-32">',
                    '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="subtext bold margin-top-8">{template}</div>',
            '</div>']).apply({template:'Surat belum selesai'});
        }
        txtSelesai && txtSelesai.setValue(tpl);
    },

    onSuratBalasan_Render: function(record, form, cmp){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:cmp}),
            txtBalasan = $this.getTextBalasan({root:mainview}),
            mode = mainview.mode,
            id = record.get('surat_id'),
            selesai = record.get('surat_isselesai');

            Ext.Ajax.request({
                url: this.getApi('surat_balas', {id:id}),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {},
                        data = objres.data;

                    if (selesai == '1'){
                        tpl = $this.renderBalasanTemplate(data);
                    }else{
                        $helper.hideComponent({
                            parent: form,
                            items:{
                                '#buttonBalasan' : true
                            }
                        });
                        tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                            '<div class="img img-circle img-32">',
                                '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                            '</div>',
                            '</div>',
                            '<div class="cell-text">',
                                '<div class="subtext bold margin-top-8">{message}</div>',
                            '</div>']).apply({
                            message: 'Surat Belum Dibalas'
                        });
                    }
                    if (txtBalasan) {
                        txtBalasan.setValue(tpl);
                    }
                }
            });
    },

    renderBalasanTemplate: function(record){
            var instansi_pengirim = record.surat_pengirim,
                tujuan            = record.surat_tujuan,
                unit_pengirim     = record.unit_source_nama,
                surat_perihal     = record.surat_perihal,
                surat_nomor       = record.surat_nomor,
                nomor             = record.korespondensi_nomor,
                surat_model       = record.surat_model,
                in_pengirim       = instansi_pengirim === null || instansi_pengirim === '' ? '<span class="alternative">(Tidak ada pengirim)</span>' : instansi_pengirim,
                un_pengirim       = unit_pengirim === null || unit_pengirim === '' ? '<span class="alternative">(Tidak ada pengirim)</span>' : unit_pengirim,
                kores_surat_nomor = surat_nomor === null || surat_nomor === '' ? '<span class="alternative">(Tidak ada nomor)</span>' : 'No.Surat: '+surat_nomor,
                kores_perihal     = surat_perihal === null || surat_perihal === '' ? '<span class="alternative">(Tidak ada perihal)</span>' : surat_perihal,
                kores_nomor       = nomor === null || nomor === '' ? '<span class="alternative">(Tidak ada nomor)</span>' : 'No.Korespondensi: '+nomor;


        if(surat_model == 1){
            kores_pengirim = 'Dari: '+in_pengirim;
        } else if (surat_model == 2){
            kores_pengirim = 'Tujuan: '+tujuan;
        } else if (surat_model == 3){
            kores_pengirim = 'Dari: '+un_pengirim;
        } else if (surat_model == 4 || surat_model == 6){
            kores_pengirim = 'Tujuan: Internal';
        }

        return new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
            '<div class="img img-circle img-32">',
                '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
            '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="subtext bold">Surat sudah dibalas dengan surat :</div>',
                '<div class="subtext">{perihal}</div>',
                '<div class="subtext">{pengirim}</div>',
                '<div class="supporttext supporttext-dark margin-top-4">',
                    '<span class="badge badge-outline badge-primary margin-right-8">',
                        '{surat_nomor}',
                    '</span>',
                    '<span class="badge badge-outline margin-right-8">',
                        '{nomor}',
                    '</span>',
                '</div>',
            '</div>']).apply({
            perihal: kores_perihal,
            pengirim: kores_pengirim,
            surat_nomor: kores_surat_nomor,
            nomor: kores_nomor
        });
    },

    onButtonBalasan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerKorespondesi = $this.getController($this.controllerKorespondesi),
            controllerKorespondesiInternal = $this.getController($this.controllerKorespondesiInternal);
        
        record.getKorespondensi(function(korespondensi){
            if(korespondensi.get('korespondensi_isinternal')){
                controllerKorespondesiInternal.launch({
                    record: korespondensi,
                    callback: function(success){
                    }
                });
            }else{
                controllerKorespondesi.launch({
                    record: korespondensi,
                    callback: function(success){
                    }
                });
            }
        });
    },

    onLogArahan_Expand: function(cmp, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:cmp}) || $this.getMainview(),
            form = $this.getForm({root:mainview}),
            txtLogArahan = $this.getTxtLogArahan({root:mainview}),
            record = form && form.updateRecord().getRecord(),
            arahanLogs = record.fetchArahanLog(),
            logs_tpl = '';

        cmp.setLoading(true);
        arahanLogs.load(function(){
            arahanLogs.each(function(log){
                var tpl = new Ext.XTemplate(['<div class="supporttext supporttext-dark margin-bottom-8">'+
                        '<span class="badge badge-solid margin-right-4">'+
                            '<i class="icon ion-md-text grey-700"></i>'+
                        '</span>{arahan}, {uraian} <span class="alternative smaller-0-75 margin-left-8">{date}</span>'+
                    '</div>']);

                logs_tpl = logs_tpl + tpl.apply({
                    arahan: log.get('perintah_nama') ? log.get('perintah_nama') : '<span class="alternative">(Tidak ada arahan)</span>',
                    uraian: log.get('disposisi_perintah_log_pesan') ? log.get('disposisi_perintah_log_pesan') : '<span class="alternative">(Tidak ada uraian)</span>',
                    date: log.get('perintah_nama') ? Ext.util.Format.date(log.get('disposisi_perintah_log_tgl'), 'd M Y H:i') : ''
                });
            });
            txtLogArahan.setValue('<div class="cell-text">'+logs_tpl+'</div>');
            cmp.setLoading(false);
            // do not remove this
            if (txtLogArahan.getValue().search('supporttext') < 0){
                txtLogArahan.setValue('<span class="supporttext">(Belum ada arahan)</span>');
            }
        });
    },

    onButtonArahan_Click: function(button, e, eOpts){
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            logArahan = $this.getCmpLogArahan({root:view}),
            txtArahan = $this.getTxtArahan({root:view}),
            controllerArahan = $this.getController($this.controllerArahan),
            tplArahan = '';

        view.setLoading(true);
        controllerArahan.launch({
            mode:'add',
            id: record.get('disposisi_id'),
            perintah: record.get('disposisi_perintah'),
            pesan: record.get('disposisi_pesan'),
            callback: function(success, records, eOpts){
                if (!logArahan.collapsed){
                    $this.onLogArahan_Expand(logArahan);
                }

                tplArahan = new Ext.XTemplate([
                    '<div class="margin-left-12 margin-right-12 margin-bottom-12">'+
                        '<div class="padding-top-12">'+
                            '<div class="cell-visual cell-visual-left">'+
                                '<div class="img img-circle img-32 bg-yellow-200-i">'+
                                    '<i class="bigger-1-25 icon ion-md-quote grey-600"></i>'+
                                '</div>'+
                            '</div>'+
                            '<div class="cell-text">'+
                                '<div class="maintext">{arahan_nama}</div>'+
                                '<div class="supporttext supporttext-dark">{uraian_arahan}</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>']);

                record.set({
                    'disposisi_perintah': records.get('disposisi_perintah_log_perintah'),
                    'disposisi_pesan': records.get('disposisi_perintah_log_pesan')
                });
                
                // form.loadRecord(record);

                txtArahan.setValue(tplArahan.apply({
                    arahan_nama: records.get('perintah_nama'),
                    uraian_arahan: records.get('disposisi_perintah_log_pesan')
                }));

                // Ext.callback(view.callback, view.scope, [records]);
            }
        });
        view.setLoading(false);
    }
});