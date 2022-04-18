Ext.define('SIPAS.controller.Sipas.disposisi.session.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.forward.Prop',
        'Sipas.disposisi.riwayat.Popup'
    ],

    views: [
        'Sipas.disposisi.session.Prop'
    ],

    models: [
        'Sipas.disposisi.Masuk', /*default model*/
        'Sipas.Disposisi',
        'Sipas.Surat',
        'Sipas.disposisi.Riwayat'
    ],

    stores: [
        'Sipas.aksi.Combo',
        'Sipas.perintah.Combo'
    ],

    api: {
        report: 'server.php/sipas/disposisi_masuk/report?id={id}',
        linier_ekspedisi: 'server.php/sipas/surat_ekspedisi/linier_ekspedisi?id={id}',
        print_approval: 'server.php/sipas/surat/printApproval?id={id}',
        surat_balas: 'server.php/sipas/surat_keluar/getBalas?id={id}',
        pengingat_asisten: 'server.php/sipas/disposisi_masuk/pengingat_asisten'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_disposisi_session_prop' },
        { ref: 'form', selector: 'sipas_disposisi_session_prop #formDisposisi' },
        { ref: 'compSurat', selector: 'sipas_disposisi_session_prop sipas_com_surat_pane' },
        { ref: 'sttsBerkas', selector: 'sipas_disposisi_session_prop #sttsBerkas' },
        { ref: 'compPengirimImage', selector: 'sipas_disposisi_session_prop #formDisposisi sipas_com_disposisi_pengirim_pane #pengirimImg' },
        { ref: 'compJenisSurat', selector: 'sipas_disposisi_session_prop sipas_com_surat_pane #jenisSurat' },
        { ref: 'perintahCombo', selector: 'sipas_disposisi_session_prop combobox[name=disposisi_perintah]' },
        { ref: 'aksiCombo', selector: 'sipas_disposisi_session_prop combobox[name=disposisi_masuk_aksi]' },
        { ref: 'aksiPesan', selector: 'sipas_disposisi_session_prop > form #textAksi' },
        { ref: 'compJenisSurat', selector: 'sipas_disposisi_session_prop > form #jenisSurat' },
        { ref: 'compPengirimSurat', selector: 'sipas_disposisi_session_prop > form #suratPengirim' },
        { ref: 'compDetailPengirim', selector: 'sipas_disposisi_session_prop > form #pengirimDetail' },
        { ref: 'compDetailSurat', selector: 'sipas_disposisi_session_prop > form #suratDetail' },
        { ref: 'compDetailPerintah', selector: 'sipas_disposisi_session_prop > form #perintahDetail' },
        { ref: 'compDetailBerkas', selector: 'sipas_disposisi_session_prop > form #suratBerkas' },
        { ref: 'iconTembusan', selector: 'sipas_disposisi_session_prop > form #isTembusan' },
        { ref: 'iconRahasia', selector: 'sipas_disposisi_session_prop > form #isRahasia' },
        { ref: 'buttonPenerima', selector: 'sipas_disposisi_session_prop #buttonPenerima' },
        { ref: 'txtCabut', selector: 'sipas_disposisi_session_prop > form #txtCabut' },
        { ref: 'txtThumbInfoSurat', selector: 'sipas_disposisi_session_prop > form #thumbInfoSurat' },
        { ref: 'txtInfoSurat', selector: 'sipas_disposisi_session_prop > form #infoSurat' },
        { ref: 'txtInfoPengirim', selector: 'sipas_disposisi_session_prop > form #txtInfoPengirim' },
        { ref: 'txtInfoArahan', selector: 'sipas_disposisi_session_prop > form #txtInfoArahan' },
        { ref: 'txtInfoPenerimaan', selector: 'sipas_disposisi_session_prop > form #txtInfoPenerimaan' },
        { ref: 'txtPenerima', selector: 'sipas_disposisi_session_prop > form #txtPenerima' },
        { ref: 'txtInfoTglPenerima', selector: 'sipas_disposisi_session_prop > form #txtInfoTglPenerima' },
        { ref: 'txtTimeline', selector: 'sipas_disposisi_session_prop > form #txtTimeline' },
        { ref: 'cmpLogRespon', selector: 'sipas_disposisi_session_prop > form #fieldLogRespon' },
        { ref: 'txtLogRespon', selector: 'sipas_disposisi_session_prop > form #txtLogRespon' },
        { ref: 'txtRespon', selector: 'sipas_disposisi_session_prop > form #txtRespon' },
        { ref: 'cmpLogArahan', selector: 'sipas_disposisi_session_prop > form #logArahan' },
        { ref: 'txtLogArahan', selector: 'sipas_disposisi_session_prop > form #txtLogArahan' },
        { ref: 'txtBerkas', selector: 'sipas_disposisi_session_prop > form #txtBerkas' },
        { ref: 'comDetailSurat', selector: 'sipas_disposisi_session_prop > form sipas_surat_informasi_detail_pane' },
        { ref: 'comArahan', selector: 'sipas_disposisi_session_prop > form sipas_disposisi_session_informasi_arahan_pane' },
        { ref: 'containerArsip', selector: 'sipas_disposisi_session_prop > form sipas_arsip_pane' },
        { ref: 'containerSurat', selector: 'sipas_disposisi_session_prop > form #containerSurat' },
        { ref: 'containerInformasi', selector: 'sipas_disposisi_session_prop > form sipas_surat_informasi_pane' },
        { ref: 'containerPengirim', selector: 'sipas_disposisi_session_prop > form #containerPengirim' },
        { ref: 'containerPenerima', selector: 'sipas_disposisi_session_prop > form #containerPenerima' },
        { ref: 'containerUrutanArahan', selector: 'sipas_disposisi_session_prop > form #containerUrutanArahan' },
        { ref: 'comSuratSelesai', selector: 'sipas_disposisi_session_prop > form #containerSelesai' },
        { ref: 'textSelesai', selector: 'sipas_disposisi_session_prop sipas_surat_informasi_selesai_pane #textSelesai' },
        { ref: 'comSuratBalasan', selector: 'sipas_disposisi_session_prop > form #containerBalasan' },
        { ref: 'textBalasan', selector: 'sipas_disposisi_session_prop sipas_surat_informasi_balasan_pane [name=balasan_info]' },
        { ref: 'buttonPengingat', selector: 'sipas_disposisi_session_prop #buttonPengingat' },
        { ref: 'txtPgsAktif', selector: 'sipas_disposisi_session_prop > form #txtPgsAktif' },
        { ref: 'txtProfil', selector: 'sipas_disposisi_session_prop > form #txtProfil' },
        { ref: 'txtInfoDisposisi', selector: 'sipas_disposisi_session_prop > form #txtInfoDisposisi' },
        { ref: 'btnReqBerkas', selector: 'sipas_disposisi_session_prop > form #btnReqBerkas' }
    ],

    defaultWindowReport: {
        height: 640,
        width: 800,
        maximizable: true,
        modal: true
    },

    controllerMasuk: 'Sipas.masuk.agenda.Prop',
    controllerKeluar: 'Sipas.keluar.agenda.Prop',
    controllerIMasuk: 'Sipas.internal.masuk.agenda.Prop',
    controllerRiwayat: 'Sipas.disposisi.riwayat.Popup',
    controllerPopupEkspedisiKeluar: 'Sipas.surat.ekspedisi.keluar.Popup',
    controllerLog: 'Sipas.disposisi.log.Popup',
    controllerPenerima: 'Sipas.disposisi.session.penerima.Popup',
    controllerPenerimaJabatan: 'Sipas.disposisi.session.penerima.jabatan.Popup',
    controllerDetail: 'Sipas.disposisi.session.detail.Popup',
    controllerRespon: 'Sipas.disposisi.session.respon.Popup',
    controllerEkspedisi: 'Sipas.surat.ekspedisi.Popup',
    controllerRating: 'Sipas.internal.masuk.agenda.rating.Popup',
    controllerPopupTembusan: 'Sipas.surat.tembusan.Popup',
    controllerPopupTembusanStack: 'Sipas.surat.tembusan.stack.Popup',
    controllerPropPenyetuju: 'Sipas.surat.penyetuju.Prop',
    controllerPropRiwayat: 'Sipas.surat.penyetuju.riwayat.Popup',

    controllerForwardProperty: 'Sipas.disposisi.forward.Prop',
    controllerMasukList: 'Sipas.masuk.session.kotak.List',
    controllerDisposisiList: 'Sipas.disposisi.session.List',
    controllerNotaList: 'Sipas.notadinas.session.List',

    controllerKorespondesi: 'Sipas.korespondensi.eksternal.Popup',
    controllerKorespondesiInternal: 'Sipas.korespondensi.internal.Popup',

    viewViewer: 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_disposisi_session_prop': {
                show: this.onMainview_Show,
                loadrecord: this.onMainview_LoadRecord,
                doprint: this.onMainview_DoPrint,
                close: this.onMainview_Close
            },
            'sipas_disposisi_session_prop > form sipas_arsip_pane': {
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_disposisi_session_prop > form #containerSurat': {
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_disposisi_session_prop > form #containerPengirim': {
                loadassociate: this.onPengirim_LoadAssociate
            },
            'sipas_disposisi_session_prop > form sipas_disposisi_session_informasi_arahan_pane': {
                loadassociate: this.onArahan_LoadAssociate
            },
            'sipas_disposisi_session_prop > form #containerPenerima': {
                loadassociate: this.onContainerPenerima_LoadAssociate
            },
            'sipas_disposisi_session_prop > #toolbarAction button[action]': {
                click: this.onButtonAction_Click
            },
            'sipas_disposisi_session_prop > #toolbarActionMasuk button[action]': {
                click: this.onButtonAction_Click
            },
            'sipas_disposisi_session_prop > #toolbarActionNotadinas button[action]': {
                click: this.onButtonAction_Click
            },
            'sipas_disposisi_session_prop #btnTeruskan': {
                click: this.onButtonDisposisi_Click
            },
            'sipas_disposisi_session_prop #btnTeruskanNota': {
                click: this.onButtonNota_Click
            },
            'sipas_disposisi_session_prop button#btnKonfBerkas': {
                click: this.onButtonConfirmBerkas_Click
            },
            'sipas_disposisi_session_prop #btnRiwDis': {
                click: this.onButtonRiwayat_Click
            },
            'sipas_disposisi_session_prop #buttonLog': {
                click: this.onButtonViewLog_Click
            },
            'sipas_disposisi_session_prop #buttonPenerima': {
                click: this.onButtonPenerima_Click
            },
            'sipas_disposisi_session_prop #buttonRespon': {
                click: this.onButtonRespon_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane sipas_com_button_expedition': {
                click: this.onButtonExpedition_Click
            },
            "sipas_disposisi_session_prop sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane #btnEkspedisiKeluar": {
                click: this.onButtonEkspedisiKeluar_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_pane #buttonLihatRating': {
                click: this.onButtonLihatRating_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju': {
                click: this.onButtonPenyetuju_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]': {
                click: this.onButtonRiwayatPenyetujuan_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]': {
                click: this.onButtonPrintApproval_Click
            },
            'sipas_disposisi_session_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarTembusan': {
                click: this.onButtonPenerimaTembusan_Click
            },
            'sipas_disposisi_session_prop > form #fieldLogRespon': {
                expand: this.onLogRespon_Expand
            },
            'sipas_disposisi_session_prop > form #logArahan': {
                expand: this.onLogArahan_Expand
            },
            'sipas_disposisi_session_prop > form #buttonSelesai': {
                click: this.onButtonSelesai_Click
            },
            'sipas_disposisi_session_prop > form #buttonLihatKorespondensi': {
                click: this.onButtonLihatKorespondensi_Click
            },
            'sipas_disposisi_session_prop #buttonPengingat': {
                click: this.onButtonPengingat_Click
            },
            'sipas_disposisi_session_prop #buttonDetailPenerima': {
                click: this.onButtonDetail_Click
            },
            'sipas_disposisi_session_prop > form #btnReqBerkas': {
                click: this.onButtonRequestBerkas_Click
            },
            'sipas_disposisi_session_prop > form #btnBatalBerkas': {
                click: this.onButtonBatalBerkas_Click
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'view',
            record: this.getModel(this.defaultModel || this.models[0]).create({}),
            type: null,
            callback: Ext.emptyFn,
            scope: this
        }, config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            feature_request_berkas = $feature.getFeatureAccess('disposisi_masuk_request_berkas'),
            // profile = $session.getProfile(),
            stafId = $session.getProfileId(),
            jabatanId = $session.getProfile().jabatan_id,
            type = config.type,
            view = null,
            role_asistensi = $session.getRuleAccess('asistensi'),
            role_asistensi_selesai = $session.getRuleAccess('asistensi_selesai'),
            role_asistensi_ekspedisi = $session.getRuleAccess('asistensi_ekspedisi'),
            role_asistensi_respon = $session.getRuleAccess('asistensi_respon'),
            role_asistensi_teruskan = $session.getRuleAccess('asistensi_teruskan'),
            role_asistensi_minta_berkas = $session.getRuleAccess('asistensi_konfirm_berkas'),
            role_asistensi_riwayat = $session.getRuleAccess('asistensi_riwayat'),
            role_asistensi_pengingat = $session.getRuleAccess('asistensi_pengingat'),
            role_pgs = $session.getRuleAccess('pgs'),
            role_pgs_selesai = $session.getRuleAccess('pgs_selesai'),
            role_pgs_ekspedisi = $session.getRuleAccess('pgs_ekspedisi'),
            role_pgs_respon = $session.getRuleAccess('pgs_respon'),
            role_pgs_teruskan = $session.getRuleAccess('pgs_teruskan'),
            role_pgs_minta_berkas = $session.getRuleAccess('pgs_konfirm_berkas'),
            role_pgs_riwayat = $session.getRuleAccess('pgs_riwayat');

        switch (config.mode) {
            case 'add':
            case 'edit':
            case 'view':
            case 'asistensi':
            case 'lihat':

                view = $this.createView((function(c) {
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.disableComponents = [];
                    c.removeComponents = ['#buttonAdd', '#buttonHapus', '#buttonEdit', '#reuploadWarning',
                        '#buttonResend', '#buttonResendKeputusan', '#buttonRating', '#btndaftarPenerima', '#buttonTujuan', '#buttonUbah', '#comSuratSelesai'
                    ];

                    if(c.record && c.record.get('surat_model_sub') != 2) {
                        c.removeComponents.push('#btndaftarPetikan');
                    }

                    if (c.record && c.record.get('surat_model') == 2 || c.record && c.record.get('surat_usebalas') == 1 || c.record && c.record.get('surat_isselesai') == 1) {
                        c.removeComponents.push('#buttonSelesai');
                    }
                    if (c.record && c.record.get('surat_model') == 2) {
                        c.removeComponents.push('#containerBerkas');
                    }
                    if (c.record && c.record.get('surat_model') != 2) {
                        c.removeComponents.push('sipas_surat_informasi_ekspedisi_keluar_pane');
                    }

                    // c.disableComponents = ['sipas_disposisi_session_prop sipas_disposisi_penerima_detail_form toolbar'];
                    if (c.record.get('disposisi_masuk_iscabut') == 1) {
                        c.removeComponents.push('#toolbarAction', '#toolbarActionNotadinas', '#toolbarControlMasuk', '#buttonRespon',
                            '#buttonSelesai', '#btnKonfBerkas', '#btnBatalBerkas', '#btnReqBerkas', 'sipas_com_button_disposisi');
                    }
                    if (c.record.get('disposisi_masuk_iscabut') != 1) {
                        c.removeComponents.push('#containerCabut');
                    }
                    if (!c.record.get('disposisi_induk')) {
                        c.removeComponents.push('#containerUrutanArahan', '#txtInfoArahan', 'sipas_disposisi_session_informasi_arahan_pane');
                    }
                    if (!feature_request_berkas && c.record.get('disposisi_masuk_isberkas') != 1) {
                        c.removeComponents.push('#containerBerkas');
                    }
                    if (c.record.get('surat_usebalas') == 1) {
                        c.removeComponents.push('#containerSelesai');
                    } else {
                        c.removeComponents.push('#containerBalasan');
                    }

                    //if (((!c.record.get('disposisi_induk') && c.record.get('disposisi_masuk_staf') == stafId) || (c.record.get('disposisi_induk') && c.record.get('disposisi_masuk_jabatan') == jabatanId)) || c.record.get('disposisi_masuk_ispengingat') == 1 || (c.record.get('disposisi_masuk_istembusan') == 1 && c.record.get('disposisi_masuk_isbaca') == 1) || (c.record.get('disposisi_masuk_istembusan') == 0 && (c.record.get('disposisi_masuk_isterus') == 1 || c.record.get('disposisi_masuk_aksi') != null))) {
                    if (c.record.get('disposisi_masuk_staf') == stafId || c.record.get('disposisi_masuk_ispengingat') == 1 || (c.record.get('disposisi_masuk_istembusan') == 1 && c.record.get('disposisi_masuk_isbaca') == 1) || (c.record.get('disposisi_masuk_istembusan') == 0 && (c.record.get('disposisi_masuk_isterus') == 1 || c.record.get('disposisi_masuk_aksi') != null))) {
                        c.removeComponents.push('#buttonPengingat');
                    }

                    /*ketika pgs aktif*/
                    if (c.record.get('disposisi_masuk_plt') == 1) {
                        c.disableComponents.push('#buttonLog', '#buttonPengingat', '#daftarPenyetuju', '#btnMore', '#btnCetak', '#buttonLihatKorespondensi',
                            '#buttonRespon', '#buttonSelesai', '#btnKonfBerkas', '#btnBatalBerkas', '#btnReqBerkas', '#btnRiwDis', '#btnTeruskan', '#btnTeruskanNota', '#buttonPenerima',
                            'sipas_com_button_disposisi', 'sipas_com_button_expedition', '#buttonLihatRating', '#buttonSelesai', '#btnEkspedisiKeluar');
                    } else {
                        c.removeComponents.push('#containerPgsAktif');
                    }

                    if (c.type == 'asisten') {
                        // c.removeComponents.push('#daftarPenyetuju', '#btnMore','#btnCetak', '#buttonLihatKorespondensi',
                        //     '#buttonRespon', '#buttonSelesai', '#btnKonfBerkas', '#btnBatalBerkas', '#btnReqBerkas', '#btnRiwDis', '#btnTeruskan','#btnTeruskanNota', '#buttonPenerima',
                        //     'sipas_com_button_disposisi', 'sipas_com_button_expedition', '#buttonLihatRating', '#buttonSelesai', '#btnEkspedisiKeluar');

                        if (role_asistensi) {
                            if (!role_asistensi_selesai) {
                                c.removeComponents.push('#buttonSelesai');
                            }
                            if (!role_asistensi_ekspedisi) {
                                c.removeComponents.push('sipas_com_button_expedition');
                            }
                            if (!role_asistensi_respon) {
                                c.removeComponents.push('#buttonRespon');
                            }
                            if (!role_asistensi_teruskan) {
                                c.removeComponents.push('#btnTeruskan', '#btnTeruskanNota');
                            }
                            if (!role_asistensi_minta_berkas) {
                                c.removeComponents.push('#cmpBerkasFisik');
                            }
                            if (!role_asistensi_riwayat) {
                                c.removeComponents.push('#btnRiwDis');
                            }
                            if (!role_asistensi_pengingat) {
                                c.removeComponents.push('#buttonPengingat');
                            }
                        }
                    } else if (c.type == 'pgs') {
                        c.removeComponents.push('#buttonPengingat');

                        if (role_pgs) {
                            if (!role_pgs_selesai) {
                                c.removeComponents.push('#buttonSelesai');
                            }
                            if (!role_pgs_ekspedisi) {
                                c.removeComponents.push('sipas_com_button_expedition');
                            }
                            if (!role_pgs_respon) {
                                c.removeComponents.push('#buttonRespon');
                            }
                            if (!role_pgs_teruskan) {
                                c.removeComponents.push('#btnTeruskan', '#btnTeruskanNota');
                            }
                            if (!role_pgs_minta_berkas) {
                                c.removeComponents.push('#cmpBerkasFisik');
                            }
                            if (!role_pgs_riwayat) {
                                c.removeComponents.push('#btnRiwDis');
                            }
                        }
                    }

                    if (c.record.get('disposisi_masuk_profil_isganti') == 1) {
                        c.removeComponents.push('#btnTeruskan', '#btnTeruskanNota');
                        if (c.record.get('disposisi_masuk_istembusan') == 1 && c.record.get('disposisi_masuk_isbaca') == 1 || c.record.get('disposisi_masuk_isterus') == 1) {
                            c.removeComponents.push('#buttonRespon');
                        }
                    } else {
                        c.removeComponents.push('#containerProfil');
                    }
                    //if ((!c.record.get('disposisi_induk') && ((c.record.get('disposisi_masuk_jabatan') && c.record.get('disposisi_masuk_jumlah_penerima_sama') < 1) || (c.record.get('disposisi_masuk_staf') && c.record.get('disposisi_masuk_jumlah_disposisi_sama') < 1)) ) || (c.record.get('disposisi_induk') && c.record.get('disposisi_masuk_jumlah_disposisi_sama') < 1 ) ) {
                    if (c.record.get('disposisi_masuk_jumlah_penerima_sama') < 1) {
                        c.removeComponents.push('#containerInfoDisposisi');
                    }

                    if (c.record.get('staf_hide') == 1) {
                        c.disableComponents.push('#buttonRespon', '#btnKonfBerkas', '#btnBatalBerkas', '#btnReqBerkas', '#buttonPengingat', '#btnTeruskan', '#btnTeruskanNota', '#buttonSelesai');
                    }

                    return c;
                })(config));

                // do not remove this
                var comInformasiSurat = $this.getContainerInformasi({ root: view }),
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

                view.isAsistensi = config.isAsistensi;
                view.show();
                break;

            case 'destroy':
                $helper.destroyRecord({
                    record: config.record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(view) {
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            $helper = $app.Helper(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            feature_request_berkas = $feature.getFeatureAccess('disposisi_masuk_request_berkas'),
            form = $this.getForm({ root: view }),
            record = view.record || $this.models[0].create({}),
            is_berkas = record.get('disposisi_masuk_isberkas') == 1 ? true : false,
            is_berkasterima = record.get('disposisi_masuk_isberkasterima') == 1 ? true : false,
            berkas_status = record.get('disposisi_masuk_berkas_status'),
            useretensi = record.get('surat_useretensi') == 1 ? true : false,
            retensi = Ext.Date.format(record.get('surat_retensi_tgl'), 'Y-m-d'),
            now = Ext.Date.format(new Date(), 'Y-m-d'),
            form = $this.getForm({ root: view }),
            txtCabut = $this.getTxtCabut({ root: view }),
            txtPgsAktif = $this.getTxtPgsAktif({ root: view }),
            txtProfil = $this.getTxtProfil({ root: view }),
            txtInfoDis = $this.getTxtInfoDisposisi({ root: view }),
            btnReq = $this.getBtnReqBerkas({ root: view }),
            jumlah_penerima = record.get('disposisi_masuk_jumlah_penerima_sama'),
            jumlah_disposisi = record.get('disposisi_masuk_jumlah_disposisi_sama'),
            $label = '';
        /*patch title*/
        if (record.get('disposisi_model_sub') === record.self.subType().MODEL_NOTADINAS) {
            view.setTitle($app.getGrammar('notadinas_prop'));
            $helper.hideComponent({
                parent: view,
                items: {
                    '#toolbarActionNotadinas': false,
                    // '#toolbarActionMasuk' : true,
                    '#toolbarControlMasuk': true,
                    '#toolbarAction': true
                }
            });
        } else {
            if (record.get('disposisi_induk')) {
                view.setTitle($app.getGrammar('disposisi_masuk_prop'));
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#toolbarActionNotadinas': true,
                        // '#toolbarActionMasuk' : true,
                        '#toolbarControlMasuk': true,
                        '#toolbarAction': false
                    }
                });
            } else {
                view.setTitle($app.getGrammar('suratmasuk_prop'));
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#toolbarActionNotadinas': true,
                        // '#toolbarActionMasuk' : false,
                        '#toolbarControlMasuk': false,
                        '#toolbarAction': true
                    }
                });
            }
        }

        if (record.get('disposisi_masuk_iscabut') == 1) {
            var tplCabut = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">' +
                '<div class="subtext">' + $language.getGrammar('disposisi_iscabut_danger', false) + '</div>' +
                '<div class="subtext">Pada ' + Ext.util.Format.date(record.get('disposisi_cabut_tgl'), 'd M Y H:i') + '</div>' +
                '</div>';
            txtCabut && txtCabut.setValue(tplCabut);
        }
        if (record.get('disposisi_masuk_plt') == 1) {
            var tplPgsAktif = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">' +
                '<div class="subtext">' + $language.getGrammar('disposisi_pgs_aktif', false) + '</div>' +
                '</div>';
            txtPgsAktif && txtPgsAktif.setValue(tplPgsAktif);
        }
        if (record.get('disposisi_masuk_profil_isganti') == 1) {
            if (view.type == 'asisten') {
                $label = $language.getGrammar('profil_asisten_nonaktif', false);
            } else if (view.type == 'pgs') {
                $label = $language.getGrammar('profil_pgs_nonaktif', false);
            } else {
                $label = $language.getGrammar('profil_nonaktif', false);
            }
            var tplProfil = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">' +
                '<div class="subtext">' + $label + '</div>' +
                '</div>';
            txtProfil && txtProfil.setValue(tplProfil);
        }

        //if (record.get('disposisi_masuk_jumlah_penerima_sama') || record.get('disposisi_masuk_jumlah_disposisi_sama')) {
        //    if (record.get('disposisi_induk')) {
        //        var info = 'surat disposisi/notadinas',
        //            jumlah = jumlah_disposisi;
        //    } else {
                if (record.get('disposisi_masuk_jumlah_penerima_sama')) {
        //            var info = 'surat masuk',
        //                jumlah = jumlah_penerima;
        //        } else {
        //            var info = 'surat masuk',
        //                jumlah = jumlah_disposisi;
        //        }
        //    }

            var tplInfoDis = '<div class="cell-text margin-top-4 margin-right-4 margin-bottom-4 margin-left-4">' +
                '<div class="subtext">Anda mendapat <b>' + jumlah + '</b> surat/disposisi yang sama</div>' +
                '</div>';
            txtInfoDis && txtInfoDis.setValue(tplInfoDis);
        }


        // for berkas request feature
        if (feature_request_berkas && record.get('surat_useberkas') == 1) {
            switch (berkas_status) {
                case record.self.statusBerkas().BERKAS_REQUEST:
                    /*request in progress - berkas fisik*/
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': false,
                            '#btnKonfBerkas': true,
                            '#btnReqBerkas': true
                        }
                    });
                    break;
                case record.self.statusBerkas().BERKAS_APPROVE:
                    /*approve request berkas fisik*/
                    if (is_berkas) { /*disposisi_masuk_isberkas must 1 or true*/
                        if (is_berkasterima) {
                            $helper.hideComponent({
                                parent: view,
                                items: {
                                    '#btnBatalBerkas': true,
                                    '#btnKonfBerkas': true,
                                    '#btnReqBerkas': true
                                }
                            });
                        } else {
                            $helper.hideComponent({
                                parent: view,
                                items: {
                                    '#btnBatalBerkas': true,
                                    '#btnKonfBerkas': false,
                                    '#btnReqBerkas': true
                                }
                            });
                        }
                    } else {
                        $helper.hideComponent({
                            parent: view,
                            items: {
                                '#containerBerkas': true
                            }
                        });
                    }
                    break;
                case record.self.statusBerkas().BERKAS_CANCEL:
                    /*canceled request berkas fisik*/
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': true,
                            '#btnKonfBerkas': true,
                            '#btnReqBerkas': false
                        }
                    });
                    break;
                case record.self.statusBerkas().BERKAS_DECLINE:
                    /*decline request berkas fisik*/
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': true,
                            '#btnKonfBerkas': true,
                            '#btnReqBerkas': false
                        }
                    });
                    $language.getGrammar('auto_nomor_int_0_desc', false)
                    btnReq && btnReq.setText($app.getGrammar('disposisi_session_prop_request_ulang_berkas'));
                    break;
                default:
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': true,
                            '#btnKonfBerkas': true,
                            '#btnReqBerkas': false
                        }
                    });
                    break;
            }

            // if surat not active
            if (useretensi && now > retensi) {
                // if surat berkas can to be request or request has been canceled
                if (berkas_status == 0 || berkas_status == record.self.statusBerkas().BERKAS_CANCEL || berkas_status == record.self.statusBerkas().BERKAS_DECLINE) {
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnReqBerkas': true
                        }
                    });
                }
            }
        } else {
            if (is_berkas) {
                if (is_berkasterima) {
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': true,
                            '#btnKonfBerkas': true,
                            '#btnReqBerkas': true
                        }
                    });
                } else {
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#btnBatalBerkas': true,
                            '#btnKonfBerkas': false,
                            '#btnReqBerkas': true
                        }
                    });
                }
            } else {
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#containerBerkas': true
                    }
                });
            }
        }

        view && view.fireEvent('loadrecord', view, record);
    },

    onMainview_Close: function(mainview, eOpts) {
        var $this = this,
            form = $this.getForm({ root: mainview }),
            record = form && form.updateRecord().getRecord();

        record && record.reject();
        Ext.callback(mainview.callback, mainview.scope, [mainview, $this]);
    },

    onMainview_LoadRecord: function(mainview, record) {
        var $this = this,
            $helper = this.getApplication().Helper(),
            form = $this.getForm({ root: mainview }),
            record = record || form && form.updateRecord().getRecord(),
            isBerkas = (record && record.get('disposisi_masuk_isberkas')) ? true : false,
            isRahasia = (record.get('disposisi_israhasia')) ? true : false,
            isTerima = (record && record.get('disposisi_masuk_isberkasterima')) ? true : false;

        if (isBerkas && isTerima) {
            $helper.hideComponent({
                parent: mainview,
                items: {
                    'disposisi_masuk_berkasterima_tgl': !isBerkas,
                    '#btnKonfBerkas': isTerima
                }
            });
        }

        form.loadRecord(record);
    },

    onMainview_DoPrint: function(mainview) {
        var mainview = mainview || this.getMainview( /*{root:mainview}*/ ),
            form = this.getForm({ root: mainview }),
            record = form.getRecord();

        this.printReport(record.getId(), 'Cetak Lembar Disposisi');
    },

    printReport: function(id, title) {
        var viewer = this.getView(this.viewViewer),
            view = viewer.create(Ext.apply(this.defaultWindowReport, {})).show().load(this.getApi('report', {
                id: id
            }));
        view.setTitle(title);
    },

    onButtonConfirmBerkas_Click: function(button, e, eOpts) {
        var $this = this,
            mainview = $this.getMainview({ from: button }),
            form = $this.getForm({ from: button }),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            pegawaiId = $session.getProfileId(),
            record = form && form.updateRecord().getRecord(),
            containerBottom = $this.getContainerPenerima({ root: mainview }),
            isTerima = record.get('disposisi_masuk_isberkasterima') == 1 ? true : false;

        if (isTerima === true) {
            // form.getForm().reset();
            $helper.showMsg({ success: false, message: 'Berkas Sudah Dikonfirmasi' });
        } else {
            $helper.showConfirm({
                confirmTitle: 'Konfirmasi Penerimaan Berkas',
                confirmText: 'Apakah anda yakin untuk mengkonfirmasi penerimaan berkas ?',
                callback: function(button) {
                    if (button == 'yes') {
                        mainview.setLoading(true);
                        record.isTerimaBerkas({
                            staf: pegawaiId,
                            callback: function(staf, operation, success) {
                                if (success) {
                                    // form.loadRecord(staf);
                                    // record.reload();
                                    mainview.fireEvent('loadrecord', mainview, staf);
                                    $helper.showMsg({ success: true, message: 'Berhasil Mengkonfirmasi' });
                                    mainview.setLoading(false);
                                } else {
                                    $helper.showMsg({ success: false, message: 'Gagal Mengkonfirmasi' });
                                    mainview.setLoading(false);
                                }
                            }
                        });
                        // form.getForm().reset();
                    }
                }
            });
        }
    },

    onButtonDisposisi_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            mainview = $this.getMainview({ from: button }),
            form = $this.getForm({ root: mainview }),
            property = $this.getController($this.controllerForwardProperty),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            pegawaiId = $session.getProfileId(),
            record = form && form.updateRecord().getRecord(),
            recordForward = $this.getModel($this.models[1]).create({
                'disposisi_induk': record.getId(),
                'disposisi_tgl': new Date(),
                'disposisi_staf': record.get('disposisi_masuk_penerima_id'),
                'disposisi_pelaku': pegawaiId,
                'disposisi_model_sub': record.self.subType().MODEL_DISPOSISI,
                'disposisi_surat': record.get('disposisi_surat'),
                'disposisi_pengirim_id': record.get('disposisi_masuk_penerima_id'),
                'disposisi_pengirim_nama': record.get('disposisi_masuk_penerima_nama'),
                'disposisi_pengirim_unit_nama': record.get('disposisi_masuk_penerima_unit_nama'),
                'disposisi_masuk_staf': record.get('disposisi_masuk_staf'),
                'surat_id': record.get('surat_id'),
                'surat_agenda': record.get('surat_agenda'),
                'surat_nomor': record.get('surat_nomor')
            });

        mainview.close();

        // $app.fireEvent('eventWorker/doDispatch');

        // recordForward.setInduk(record);
        property.launch({
            mode: 'disposisi',
            record: recordForward,
            isAsistensi: mainview.isAsistensi,
            selfAsPenerima: record,
            callback: function(success, records, eOpts) {
                if (record && record.get('disposisi_masuk_id')) {
                    record.forwarding({
                        staf: pegawaiId,
                        callback: function(staf, operation, success) {
                            if (success) {}
                        }
                    });
                } else {
                    record.getDisposisiPenerima(function(dispen) {
                        dispen.forwarding({
                            staf: pegawaiId,
                            callback: function(staf, operation, success) {
                                if (success) {}
                            }
                        });
                    });
                }

                $this.launch({
                    mode: 'view',
                    record: record,
                    callback: function(success, message, record) {
                        Ext.callback(mainview.callback, mainview.scope, [record]);
                    }
                });
            }
        });
    },

    onButtonNota_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            mainview = $this.getMainview({ from: button }),
            form = $this.getForm({ root: mainview }),
            property = $this.getController($this.controllerForwardProperty),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            pegawaiId = $session.getProfileId(),
            record = form && form.updateRecord().getRecord(),
            recordForward = $this.getModel($this.models[1]).create({
                'disposisi_induk': record.getId(),
                'disposisi_tgl': new Date(),
                'disposisi_staf': record.get('disposisi_masuk_penerima_id'),
                'disposisi_pelaku': pegawaiId,
                'disposisi_model_sub': record.self.subType().MODEL_NOTADINAS,
                'disposisi_surat': record.get('disposisi_surat'),
                'disposisi_pengirim_id': record.get('disposisi_masuk_penerima_id'),
                'disposisi_pengirim_nama': record.get('disposisi_masuk_penerima_nama'),
                'disposisi_pengirim_unit_nama': record.get('disposisi_masuk_penerima_unit_nama'),
                'disposisi_masuk_staf': record.get('disposisi_masuk_staf'),
                'surat_id': record.get('surat_id'),
                'surat_agenda': record.get('surat_agenda'),
                'surat_nomor': record.get('surat_nomor')
            });

        // recordForward.setInduk(record);
        mainview.close();

        property.launch({
            mode: 'notadinas',
            record: recordForward,
            selfAsPenerima: record,
            callback: function() {
                if (record && record.get('disposisi_masuk_id')) {
                    record.forwarding({
                        staf: pegawaiId,
                        callback: function(staf, operation, success) {
                            if (success) {}
                        }
                    });
                } else {
                    record.getDisposisiPenerima(function(dispen) {
                        dispen.forwarding({
                            staf: pegawaiId,
                            callback: function(staf, operation, success) {
                                if (success) {}
                            }
                        });
                    });
                }
                $this.launch({
                    mode: 'view',
                    record: record,
                    callback: function(success, message, record) {
                        Ext.callback(mainview.callback, mainview.scope, [record]);
                    }
                });
            }
        });
    },

    onButtonViewLog_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            controllerLog = $this.getController($this.controllerLog);

        view.setLoading(true);
        controllerLog.launch({
            mode: 'view',
            record: record
        });
        view.setLoading(false);
    },

    onButtonPenerima_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            controllerPenerima = $this.getController($this.controllerPenerima);
            controllerPenerimaJabatan = $this.getController($this.controllerPenerimaJabatan);

        view.setLoading(true);
        controllerPenerima.launch({
            mode: 'view',
            record: record
        });
        view.setLoading(false);
    },

    onButtonRiwayat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            type = view.type,
            controllerRiwayat = $this.getController($this.controllerRiwayat);

        controllerRiwayat.launch({
            record: record,
            type: type,
            selfAsPenerima: record
        });
    },

    onButtonAction_Click: function(button, e, eOpts) {
        var mainview = this.getMainview({ form: button });
        mainview && mainview.fireEvent(button.action, mainview);
    },

    onButtonSelesai_Click: function(button, e, eOpts, record) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            profile = $session.getProfile(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            infoSurat = $this.getContainerInformasi({ root: view }),
            record = form.getRecord();

        record.getDisposisi(function(dispo) {
            dispo.getSurat(function(surat) {
                $helper.showConfirm({
                    confirmTitle: 'Ubah Status Selesai Surat',
                    confirmText: 'Apakah anda yakin ?',
                    callback: function(btn) {
                        if (btn == 'yes') {
                            surat.set({
                                'surat_log_tipe': 8,
                                'surat_log_tgl': new Date(),
                                'surat_selesai_staf': profile.staf_id,
                                'surat_selesai_profil': profile.staf_profil,
                                'surat_selesai_tgl': new Date()
                            });
                            if (!surat) return;
                            $helper.saveRecord({
                                form: form,
                                record: surat,
                                message: false,
                                wait: true,
                                callback: function(success, surat, eOpts, response) {
                                    $helper.showMsg({ success: true, message: 'Berhasil Merubah Status Selesai Surat' });
                                    // if(success)view.close();
                                    if (success) {
                                        infoSurat && infoSurat.fireEvent('load', infoSurat, surat, form);
                                        button.hide(true);
                                        Ext.callback(view.callback, view, [success, surat, eOpts]);
                                    }
                                }
                            });
                        }
                    }
                });
            })
        });
    },

    onArsip_LoadAssociate: function(record, form, cmp) {
        var view = this.getMainview({ from: cmp }),
            $app = this.getApplication(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            penerima = record.get('disposisi_masuk_staf');

        cmp.setLoading(true);
        if (record) {
            record.getSurat(function(surat) {
                surat.getArsip(function(arsip) {
                    cmp.setLoading(false);
                    if (arsip) {
                        cmp.fireEvent('load', cmp, surat, arsip, surat.get('surat_israhasia'), 'lihat', pegawaiId, penerima);
                    }
                });
            });
        }
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp) {
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({ from: cmp }),
            detailSurat = $this.getComDetailSurat({ root: mainview }),
            suratSelesai = $this.getComSuratSelesai({ root: mainview }),
            suratBalasan = $this.getComSuratBalasan({ root: mainview }),
            infoSurat = $this.getContainerInformasi({ root: mainview });

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                var hideComps = {},
                    model = surat && surat.get('surat_model'),
                    balas = surat && surat.get('surat_usebalas');

                if (model == 1 || model == 3) {
                    hideComps['#containerPenyetuju'] = true;
                }
                if (model != 3) {
                    hideComps['#infoRating'] = true;
                    hideComps['#infoTerima'] = true;
                }
                if (model != 2) {
                    hideComps['#btndaftarTembusan'] = true;
                }
                // if (model == 2){ // fase 2 memunculkan lacak untuk SKE
                //     hideComps['sipas_com_button_expedition'] = true;
                // }

                if (balas) {
                    $this.onSuratBalasan_Render(surat, form, suratBalasan);
                } else {
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

    onArahan_LoadAssociate: function(record, form, cmp) {
        cmp.setLoading(true);
        var id = record.get('disposisi_masuk_id');

        Ext.Ajax.request({
            url: this.getApi('linier_ekspedisi', { id: id }),
            success: function(response, options) {
                var objres = Ext.decode(response.responseText, true) || {},
                    data = objres.data;

                cmp.fireEvent('load', cmp, data, id);
                cmp.setLoading(false);
            }
        });
    },

    onPengirim_LoadAssociate: function(record, form, cmp) {
        cmp.setLoading(true);
        var $this = this,
            mainview = $this.getMainview({ from: cmp }),
            containerUrutanArahan = $this.getContainerUrutanArahan({ root: mainview }),
            txtInfoPengirim = $this.getTxtInfoPengirim({ root: mainview }),
            txtInfoArahan = $this.getTxtInfoArahan({ root: mainview }),
            txtInfoPenerimaan = $this.getTxtInfoPenerimaan({ root: mainview }),
            pengirim_id = record.get('disposisi_pengirim_id'),
            pengirim_nama = record.get('disposisi_pengirim_nama'),
            pengirim_jabatan_nama = record.get('disposisi_pengirim_jabatan_nama') ? record.get('disposisi_pengirim_jabatan_nama') : '(Tidak ada jabatan)',
            pengirim_unit_nama = record.get('disposisi_pengirim_unit_nama') ? record.get('disposisi_pengirim_unit_nama') : '(Tidak ada unit)',
            pelaku_id = record.get('disposisi_pelaku_id'),
            pelaku_nama = record.get('disposisi_pelaku_nama'),
            // pelaku_jabatan_nama = record.get('disposisi_pelaku_jabatan_nama') ? record.get('disposisi_pelaku_jabatan_nama') : '(Tidak ada jabatan)',
            // pelaku_unit_nama = record.get('disposisi_pelaku_unit_nama') ? record.get('disposisi_pelaku_unit_nama') : '(Tidak ada unit)',
            isTembusan = (record.get('disposisi_masuk_istembusan') == '1') ? true : false,
            isRahasia = (record.get('disposisi_israhasia') == '1') ? true : false,
            disposisi_tgl = Ext.util.Format.date(record.get('disposisi_tgl'), 'd M Y H:i'),
            arahan_id = record.get('disposisi_perintah'),
            arahan = record.get('perintah_nama'),
            uraian_arahan = record.get('disposisi_pesan'),
            tpl_arahan = '<div class="subtext alternative margin-top-8">(Tidak ada arahan)</div>',
            display = '';

        // if(record.get('disposisi_model_sub') === record.self.subType().MODEL_NOTADINAS){
        //     display = 'Nota Dinas';
        // } else{
        //    if(record.get('disposisi_induk')){
        //         display = 'Disposisi';
        //     } else{
        //         display = 'Surat';
        //     }
        // }

        if (!containerUrutanArahan) {
            cmp.addCls('x-dataview-timeline-node-start');
        }
        if (record.get('disposisi_model_sub') === record.self.subType().MODEL_NOTADINAS) {
            display = 'Nota Dinas';
        } else {
            if (record.get('disposisi_induk')) {
                display = 'Disposisi';
            } else {
                switch (record.get('surat_model')) {
                    case 1:
                        display = 'Surat Masuk Eksternal';
                        break;
                    case 2:
                        display = 'Surat Keluar Eksternal';
                        break;
                    case 3:
                        display = 'Surat Masuk Internal';
                        break;
                }
            }
        }

        if (arahan) {
            if (uraian_arahan) {
                tpl_arahan = '<div class="subtext bold">' + arahan + '</div>' +
                    '<div class="supporttext supporttext-dark">' + uraian_arahan + '</div>';
            } else {
                tpl_arahan = '<div class="subtext bold">' + arahan + '</div>' +
                    '<div class="supporttext alternative">(Tidak ada uraian arahan)</div>';
            }
        }

        if (pelaku_id) {
            if (pengirim_id != pelaku_id) {
                txtInfoPengirim && txtInfoPengirim.setValue(
                    '<div class="margin-bottom-8"><span class="blue-700">Pengirim ' + display + ' :</span></div>' +
                    '<div style="display:flex"><div class="cell-visual cell-visual-left">' +
                    '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id=' + pengirim_id + '">' +
                    '</div>' +
                    '<div class="cell-text">' +
                    '<div class="maintext">' + pengirim_nama + '</div>' +
                    '<div class="supporttext supporttext-dark">' + pengirim_jabatan_nama + ' - ' + pengirim_unit_nama + '</div>' +
                    '<div class="supporttext supporttext-dark">Via asistensi oleh <span class="bold">' + pelaku_nama + '</span></div>' +
                    '</div></div>');
            } else {
                txtInfoPengirim && txtInfoPengirim.setValue(
                    '<div class="margin-bottom-8"><span class="blue-700">Pengirim ' + display + ' :</span></div>' +
                    '<div style="display:flex"><div class="cell-visual cell-visual-left">' +
                    '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id=' + pengirim_id + '">' +
                    '</div>' +
                    '<div class="cell-text">' +
                    '<div class="maintext">' + pengirim_nama + '</div>' +
                    '<div class="supporttext supporttext-dark">' + pengirim_jabatan_nama + ' - ' + pengirim_unit_nama + '</div>' +
                    '</div></div>');
            }
        } else {
            txtInfoPengirim && txtInfoPengirim.setValue(
                '<div class="margin-bottom-8"><span class="blue-700">Pengirim ' + display + ' :</span></div>' +
                '<div style="display:flex"><div class="cell-visual cell-visual-left">' +
                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id=' + pengirim_id + '">' +
                '</div>' +
                '<div class="cell-text">' +
                '<div class="maintext">' + pengirim_nama + '</div>' +
                '<div class="supporttext supporttext-dark">' + pengirim_jabatan_nama + ' - ' + pengirim_unit_nama + '</div>' +
                '</div></div>');
        }


        txtInfoArahan && txtInfoArahan.setValue('<div class="cell-visual cell-visual-left">' +
            '<div class="img img-circle img-32 bg-yellow-200-i">' +
            '<i class="bigger-1-25 icon ion-md-quote grey-600"></i>' +
            '</div>' +
            '</div>' +
            '<div class="cell-text">' + tpl_arahan + '</div>');

        txtInfoPenerimaan && txtInfoPenerimaan.setValue('<span class="supporttext supporttext-dark margin-left-40">mengirim <span class="bold">' + display + '</span> pada ' + disposisi_tgl + '</span>');

        cmp.setLoading(false);
    },

    onContainerPenerima_LoadAssociate: function(record, form, cmp) {
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            feature_request_berkas = $feature.getFeatureAccess('disposisi_masuk_request_berkas'),
            mainview = $this.getMainview({ from: cmp }),
            txtPenerima = $this.getTxtPenerima({ root: mainview }),
            txtInfoTglPenerima = $this.getTxtInfoTglPenerima({ root: mainview }),
            txtRespon = $this.getTxtRespon({ root: mainview }),
            txtBerkas = $this.getTxtBerkas({ root: mainview }),
            btnPenerima = $this.getButtonPenerima({ root: mainview }),
            pelaku = record.get('berkas_id'),
            pelaku_nama = record.get('berkas_nama'),
            konfirmpelaku = record.get('penerimaberkas_id'),
            konfirmpelaku_nama = record.get('penerimaberkas_nama'),
            penerima_id = record.get('disposisi_masuk_penerima_id'),
            penerima_nama = record.get('disposisi_masuk_penerima_nama'),
            penerima_jabatan_nama = record.get('disposisi_masuk_penerima_jabatan_nama') ? record.get('disposisi_masuk_penerima_jabatan_nama') : '(Tidak ada jabatan)',
            penerima_unit_nama = record.get('disposisi_masuk_penerima_unit_nama') ? record.get('disposisi_masuk_penerima_unit_nama') : '(Tidak ada unit)',
            disposisi_masuk_baca_tgl = Ext.util.Format.date(record.get('disposisi_masuk_baca_tgl'), 'd M Y H:i'),
            is_berkas = record.get('disposisi_masuk_isberkas') == 1 ? true : false,
            is_berkasterima = record.get('disposisi_masuk_isberkasterima') == 1 ? true : false,
            terima_berkas_tgl = record.get('disposisi_masuk_berkasterima_tgl'),
            respon = record.get('disposisi_masuk_aksi'),
            respon_nama = record.get('aksi_nama'),
            uraian_respon = record.get('disposisi_masuk_pesan'),
            isTembusan = (record.get('disposisi_masuk_istembusan') == '1') ? true : false,
            isRahasia = (record.get('disposisi_israhasia') == '1') ? true : false,
            additionalTembusan = '',
            additionalRahasia = '',
            suratDisplay = '',
            useretensi = record.get('surat_useretensi') == 1 ? true : false,
            retensi = Ext.Date.format(record.get('surat_retensi_tgl'), 'Y-m-d'),
            now = Ext.Date.format(new Date(), 'Y-m-d'),
            tpl_respon = '<div class="subtext alternative margin-top-8">(Belum ada respon)</div>',
            tpl_berkas = '',
            via_asistensi = '',
            berkas_text_color = ' grey-700-i',
            grammar_useberkas = $app.getGrammar('disposisi_prop_surat_useberkas', false);

        if (record.get('disposisi_model_sub') === record.self.subType().MODEL_NOTADINAS) {
            suratDisplay = 'Nota Dinas';
        } else {
            if (record.get('disposisi_induk')) {
                suratDisplay = 'Disposisi';
            } else {
                switch (record.get('surat_model')) {
                    case 1:
                        suratDisplay = 'Surat Masuk Eksternal';
                        break;
                    case 2:
                        suratDisplay = 'Surat Keluar Eksternal';
                        break;
                    case 3:
                        suratDisplay = 'Surat Masuk Internal';
                        break;
                }
            }
        }

        if (isTembusan) {
            additionalTembusan = '<span class="badge badge-info margin-right-8">' +
                '<i class="bigger-1-25 icon ion-logo-closed-captioning margin-right-4"></i>' +
                $app.getGrammar('tembusan_tooltip', false) + '</span>';
        }

        if (isRahasia) {
            additionalRahasia = '<span class="badge badge-danger">' +
                '<i class="bigger-1-25 icon ion-md-lock margin-right-4"></i>' +
                $app.getGrammar('disposisi_rahasia_tooltip', false) + '</span>';
        }

        btnPenerima && btnPenerima.setText(record.get('disposisi_masuk_jumlah_penerima') + ' Penerima');

        if(record.get('disposisi_masuk_jabatan')) {
            txtPenerima && txtPenerima.setValue('<div class="margin-bottom-8"><span class="blue-700-i">Anda :</span></div>'+
            '<div style="display:flex"><div class="cell-visual cell-visual-left">'+
                '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-ribbon grey-600-i"></i></div>'+
            '</div>'+
            '<div class="cell-text margin-top-8">'+
                '<div class="maintext">'+record.get('jabatan_penerima_nama')+'</div>'+
                // '<div class="supporttext supporttext-dark">'+penerima_jabatan_nama+' - '+penerima_unit_nama+'</div>'+
                '<div class="subtext margin-top-4">'+additionalTembusan + additionalRahasia+'</div>'+
            '</div></div>');
        } else {
            txtPenerima && txtPenerima.setValue('<div class="margin-bottom-8"><span class="blue-700-i">Anda :</span></div>' +
            '<div style="display:flex"><div class="cell-visual cell-visual-left">' +
            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id=' + penerima_id + '">' +
            '</div>' +
            '<div class="cell-text">' +
            '<div class="maintext">' + penerima_nama + '</div>' +
            '<div class="supporttext supporttext-dark">' + penerima_jabatan_nama + ' - ' + penerima_unit_nama + '</div>' +
            '<div class="subtext margin-top-4">' + additionalTembusan + additionalRahasia + '</div>' +
            '</div></div>');
        }

        txtInfoTglPenerima && txtInfoTglPenerima.setValue('<span class="supporttext supporttext-dark margin-left-40">membaca <span class="bold">' + suratDisplay + '</span> pada ' + disposisi_masuk_baca_tgl + '</span>');

        if (respon) {
            if (uraian_respon) {
                tpl_respon = '<div class="subtext bold">' + respon_nama + '</div>' +
                    '<div class="supporttext supporttext-dark">' + uraian_respon + '</div>' +
                    '<div class="supporttext supporttext-dark margin-top-4">Terakhir diubah pada ' + Ext.util.Format.date(record.get('disposisi_masuk_aksi_tgl'), 'd M Y H:i') + '</div>';

            } else {
                tpl_respon = '<div class="subtext bold">' + respon_nama + '</div>' +
                    '<div class="supporttext supporttext-dark margin-top-4">Terakhir diubah pada ' + Ext.util.Format.date(record.get('disposisi_masuk_aksi_tgl'), 'd M Y H:i') + '</div>';
            }
        }

        txtRespon && txtRespon.setValue('<div class="cell-visual cell-visual-left">' +
            '<div class="img img-circle img-32 bg-grey-50-i">' +
            '<i class="bigger-1-25 icon ion-md-text grey-600-i"></i>' +
            '</div>' +
            '</div>' +
            '<div class="cell-text">' + tpl_respon + '</div>');


        // for berkas
        var tplBerkas = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">' +
            '<div class="img img-circle img-32 bg-grey-50-i"><i class="bigger-1-25 icon ion-md-copy grey-600"></i></div></div>' +
            '<div class="cell-text">' +
            '<div class="maintext{margin_cls}">{title}</div>' +
            '<div class="supporttext supporttext-dark"><span class="{color}">{subtitle}</span></div>' +
            '<div class="supporttext supporttext-dark">{coment}</div>' +
            '<div class="supporttext supporttext-dark margin-top-8 margin-left-18">{via_asistensi}</div>' +
            '</div>'
        ]);

        //if ((penerima_id != pelaku) && record.get('disposisi_induk')) {
        if (penerima_id != pelaku) {
            via_asistensi = 'Via asistensi oleh <span class="bold">' + pelaku_nama + '</span>';
        //}else if(!record.get('disposisi_induk') && (record.get('jabatan_penerima_id') != record.get('berkas_jabatan_id'))){
        //    via_asistensi = 'Via asistensi oleh <span class="bold">' + pelaku_nama + '</span>';
        }

        if (feature_request_berkas && record.get('surat_useberkas') == 1) {
            var berkas_status_tgl = Ext.util.Format.date(record.get('disposisi_masuk_berkas_status_tgl'), 'd M Y H:i'),
                used_tpl = '';
                konfirm_asisten = '';

            //if ((penerima_id != konfirmpelaku) && record.get('disposisi_induk')) {
            if (penerima_id != konfirmpelaku) {
                konfirm_asisten = 'Via asistensi oleh <span class="bold">' + konfirmpelaku_nama + '</span>';
            //}else if(record.get('disposisi_masuk_jabatan') != record.get('penerimaberkas_jabatan_id')){
            //    konfirm_asisten = 'Via asistensi oleh <span class="bold">' + konfirmpelaku_nama + '</span>';
            }
            
            switch (record.get('disposisi_masuk_berkas_status')) {
                case record.self.statusBerkas().BERKAS_REQUEST:
                    /*request berkas fisik*/
                    used_tpl = tplBerkas.apply({
                        color: 'warning',
                        title: grammar_useberkas,
                        subtitle: $app.getGrammar('disposisi_prop_request_berkas', false),
                        via_asistensi: via_asistensi
                    });
                    break;
                case record.self.statusBerkas().BERKAS_APPROVE:
                    /*approve request berkas fisik*/
                    if (is_berkas) { /*disposisi_masuk_isberkas must 1 or true*/
                        if (is_berkasterima) {
                            used_tpl = tplBerkas.apply({
                                color: 'info',
                                title: grammar_useberkas,
                                subtitle: $app.getGrammar('disposisi_prop_confirm_berkas', false) + ' pada ' + Ext.util.Format.date(terima_berkas_tgl, 'd M Y H:i'),
                                via_asistensi: konfirm_asisten
                            });
                        } else {
                            used_tpl = tplBerkas.apply({
                                color: 'info',
                                title: grammar_useberkas,
                                subtitle: $app.getGrammar('disposisi_prop_approved_berkas', false) + ' pada ' + berkas_status_tgl
                            });
                        }
                    }
                    break;
                case record.self.statusBerkas().BERKAS_CANCEL:
                    /*canceled request berkas fisik*/
                    used_tpl = tplBerkas.apply({
                        color: 'danger',
                        title: grammar_useberkas,
                        margin_cls: ' margin-top-8',
                        subtitle: ''
                        /*$app.getGrammar('disposisi_prop_canceled_berkas', false)+' pada '+berkas_status_tgl*/
                    });
                    break;
                case record.self.statusBerkas().BERKAS_DECLINE:
                    /*decline request berkas fisik*/
                    used_tpl = tplBerkas.apply({
                        color: 'danger',
                        title: grammar_useberkas,
                        coment: record.get('disposisi_masuk_berkas_komentar') ? record.get('disposisi_masuk_berkas_komentar') : '',
                        subtitle: $app.getGrammar('disposisi_prop_declined_berkas', false) + ' pada ' + berkas_status_tgl
                    });
                    break;
                default:
                    used_tpl = tplBerkas.apply({
                        title: grammar_useberkas,
                        margin_cls: ' margin-top-8',
                        subtitle: ''
                    });
                    break;
            }

            // if surat not active
            if (useretensi && now > retensi) {
                // if surat berkas can to be request or request has been canceled
                if (record.get('disposisi_masuk_berkas_status') == 0 || record.get('disposisi_masuk_berkas_status') == 3) {
                    used_tpl = tplBerkas.apply({
                        color: '',
                        title: grammar_useberkas,
                        subtitle: $app.getGrammar('disposisi_prop_useberkas_surat_nonactive', false)
                    });
                }
            }
            txtBerkas && txtBerkas.setValue(used_tpl);

        } else {
            if (is_berkas) {
                if (is_berkasterima) {
                    berkas_text_color = ' green-500-i';
                    tpl_berkas = 'Dikonfirmasi pada ' + Ext.util.Format.date(terima_berkas_tgl, 'd M Y H:i');
                } else {
                    berkas_text_color = ' orange-500-i';
                    tpl_berkas = 'Berkas belum diterima';
                }

                txtBerkas && txtBerkas.setValue('<div class="cell-visual cell-visual-left">' +
                    '<div class="img img-circle img-32 bg-grey-50-i"><i class="bigger-1-25 icon ion-md-copy grey-600-i"></i></div></div>' +
                    '<div class="cell-text">' +
                    '<div class="maintext">' + grammar_useberkas + '</div>' +
                    '<div class="supporttext' + berkas_text_color + '">' + tpl_berkas + via_asistensi + '</div>' +
                    '</div>');
            }
        }
        cmp.setLoading(false);
    },

    onButtonRespon_Click: function(button, e, eOpts) {
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            logRespon = $this.getCmpLogRespon({root: view}),
            btnPengingat = $this.getButtonPengingat({root: view}),
            containerBottom = $this.getContainerPenerima({ root: view }),
            controllerRespon = $this.getController($this.controllerRespon);

        view.setLoading(true);
        controllerRespon.launch({
            mode: 'view',
            record: record,
            callback: function(success, resRecord) {
                view.fireEvent('loadrecord', view, resRecord);
                if (!logRespon.collapsed) {
                    $this.onLogRespon_Expand(logRespon);
                }
                Ext.callback(view.callback, view.scope, [record]);

                if (btnPengingat) {
                    btnPengingat && btnPengingat.hide();
                }
                // form.loadRecord(resRecord);
                // record.reload();
            }
        });
        view.setLoading(false);
    },


    onButtonExpedition_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            controllerEkspedisi = $this.getController($this.controllerEkspedisi);

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                if (surat.get('surat_model') == '2') {
                    Ext.Ajax.request({
                        url: 'server.php/sipas/surat_ekspedisi/checkTembusan',
                        params: {
                            'id': surat.get('surat_id')
                        },
                        success: function(response, eOpts) {
                            var objres = Ext.decode(response.responseText, true) || {};
                            if (objres.exist == 0) {
                                $helper.showMsg({ success: false, message: 'Tidak dapat melacak penerima tembusan, surat ini tidak memiliki penerima tembusan' });
                                return;
                            } else {
                                controllerEkspedisi.launch({
                                    record: surat,
                                    mode: 'disposisi',
                                    callback: function(success) {}
                                });
                            }
                        }
                    });
                } else {
                    controllerEkspedisi.launch({
                        record: surat,
                        mode: 'disposisi',
                        callback: function(success) {}
                    });
                }
            });
        });
    },

    onButtonEkspedisiKeluar_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            controllerPopup = $this.getController($this.controllerPopupEkspedisiKeluar),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                controllerPopup.launch({
                    mode: 'view',
                    record: surat
                });
            });
        });
    },

    onButtonLihatRating_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form && form.updateRecord().getRecord(),
            controllerRating = $this.getController($this.controllerRating);

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
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

    onButtonPenyetuju_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            controllerProp = $this.getController($this.controllerPropPenyetuju),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                controllerProp.launch({
                    mode: 'view',
                    record: surat,
                    callback: function(success, surat, eOpts) {
                        // if(success)view.close();
                        Ext.callback(view.callback, view, [success, surat, eOpts]);
                    }
                });
            });
        });
        // view.close(); important do not remove
    },

    onButtonRiwayatPenyetujuan_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                if (surat.get('surat_model') === 2) {
                    controllerProp.launch({
                        mode: 'view',
                        record: surat,
                        callback: function(success, surat, eOpts) {
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                }
            });
        });
        // view.close(); important do not remove
    },

    onButtonPrintApproval_Click: function(button, e, eOpts) {
        var $this = this,
            mainview = $this.getMainview({ from: button }),
            form = $this.getForm({ root: mainview }),
            viewer = $this.getView($this.viewViewer),
            record = form.getRecord();

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                if (surat) {
                    if (surat.get('surat_model') === 2) {
                        link = window.location.href + $this.getApi('print_approval', { id: surat.getId() });
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

    onButtonPenerimaTembusan_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            controllerProp = $this.getController($this.controllerPopupTembusan),
            controllerPropStack = $this.getController($this.controllerPopupTembusanStack),
            record = form && form.updateRecord().getRecord();

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                if (surat.get('surat_setuju') == '2') {
                    controllerProp.launch({
                        mode: 'view',
                        record: surat,
                        callback: function(success, surat, eOpts) {
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                    // view.close(); important do not remove
                } else {
                    controllerPropStack.launch({
                        mode: 'view',
                        record: surat,
                        callback: function(success, surat, eOpts) {
                            // if(success)view.close();
                            Ext.callback(view.callback, view, [success, surat, eOpts]);
                        }
                    });
                    // view.close(); important do not remove
                }
            });
        });
    },

    onLogRespon_Expand: function(cmp, eOpts) {
        var $this = this,
            mainview = $this.getMainview({ from: cmp }) || $this.getMainview(),
            form = $this.getForm({ root: mainview }),
            txtLogRespon = $this.getTxtLogRespon({ root: mainview }),
            record = form && form.updateRecord().getRecord(),
            responLogs = record.fetchResponLog(),
            logs_tpl = '';

        cmp.setLoading(true);
        responLogs.load(function() {
            responLogs.each(function(log) {
                var tpl = new Ext.XTemplate(['<div class="supporttext supporttext-dark margin-bottom-8">' +
                    '<span class="badge badge-solid margin-right-4">' +
                    '<i class="icon ion-md-text grey-700"></i>' +
                    '</span>{respon}, {uraian} <span class="alternative smaller-0-75 margin-left-8">({date})</span>' +
                    '</div>'
                ]);

                logs_tpl = logs_tpl + tpl.apply({
                    respon: log.get('aksi_nama') ? log.get('aksi_nama') : '<span class="alternative">(Tidak ada respon)</span>',
                    uraian: log.get('disposisi_masuk_log_pesan') ? log.get('disposisi_masuk_log_pesan') : '<span class="alternative">(Tidak ada uraian)</span>',
                    date: Ext.util.Format.date(log.get('disposisi_masuk_log_tgl'), 'd M Y H:i')
                });
            });
            txtLogRespon.setValue('<div class="cell-text">' + logs_tpl + '</div>');
            cmp.setLoading(false);
            // do not remove this
            if (txtLogRespon.getValue().search('supporttext') < 0) {
                txtLogRespon.setValue('<span class="supporttext">(Belum ada respon)</span>');
            }
        });
    },

    onLogArahan_Expand: function(cmp, eOpts) {
        var $this = this,
            mainview = $this.getMainview({ from: cmp }) || $this.getMainview(),
            form = $this.getForm({ root: mainview }),
            txtLogRespon = $this.getTxtLogArahan({ root: mainview }),
            record = form && form.updateRecord().getRecord(),
            disRiwayat = $this.getModel($this.models[3]),
            log = disRiwayat.create(record.getData()),
            arahanLogs = log.fetchArahanLog(),
            logs_tpl = '';

        cmp.setLoading(true);
        arahanLogs.load(function() {
            arahanLogs.each(function(log) {
                var tpl = new Ext.XTemplate(['<div class="supporttext supporttext-dark margin-bottom-8">' +
                    '<span class="badge badge-solid margin-right-4">' +
                    '<i class="icon ion-md-text grey-700"></i>' +
                    '</span>{perintah}, {uraian} <span class="alternative smaller-0-75 margin-left-8">{date}</span>' +
                    '</div>'
                ]);

                logs_tpl = logs_tpl + tpl.apply({
                    perintah: log.get('perintah_nama') ? log.get('perintah_nama') : '<span class="alternative">(Tidak ada arahan)</span>',
                    uraian: log.get('disposisi_perintah_log_pesan') ? log.get('disposisi_perintah_log_pesan') : '<span class="alternative">(Tidak ada uraian)</span>',
                    date: log.get('perintah_nama') ? Ext.util.Format.date(log.get('disposisi_perintah_log_tgl'), 'd M Y H:i') : ''
                });
            });
            txtLogRespon.setValue('<div class="cell-text">' + logs_tpl + '</div>');
            cmp.setLoading(false);
            // do not remove this
            if (txtLogRespon.getValue().search('supporttext') < 0) {
                txtLogRespon.setValue('<span class="supporttext">(Belum ada arahan)</span>');
            }
        });
    },

    onSuratSelesai_Render: function(record, form, cmp) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({ from: cmp }),
            txtSelesai = $this.getTextSelesai({ root: mainview }),
            selesai = record && record.get('surat_isselesai'),
            penyelesai_id = record && record.get('penyelesai_id'),
            penyelesai_nama = record && record.get('penyelesai_nama'),
            penyelesai_unit = record && record.get('penyelesai_unit_nama'),
            tgl_selesai = record && Ext.Date.format(record.get('surat_selesai_tgl'), 'd M Y H:i'),
            tpl = '';

        if (selesai == '1') {
            tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
                '</div>',
                '<div class="cell-text">',
                '<div class="subtext bold">Surat ditandai selesai oleh :</div>',
                '<div class="subtext">{nama} - {unit}</div>',
                '<div class="supporttext">Pada {tgl}</div>',
                '</div>'
            ]).apply({
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
                '</div>'
            ]).apply({ template: 'Surat belum selesai' });
        }
        txtSelesai && txtSelesai.setValue(tpl);
    },

    onSuratBalasan_Render: function(record, form, cmp) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({ from: cmp }),
            txtBalasan = $this.getTextBalasan({ root: mainview }),
            mode = mainview.mode,
            id = record.get('surat_id'),
            selesai = record.get('surat_isselesai');

        Ext.Ajax.request({
            url: this.getApi('surat_balas', { id: id }),
            success: function(response, options) {
                var objres = Ext.decode(response.responseText, true) || {},
                    data = objres.data;

                if (selesai) {
                    tpl = $this.renderBalasanTemplate(data);
                } else {
                    $helper.hideComponent({
                        parent: form,
                        items: {
                            '#buttonLihatKorespondensi': true
                        }
                    });
                    tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                        '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                        '</div>',
                        '</div>',
                        '<div class="cell-text">',
                        '<div class="subtext bold margin-top-8">{message}</div>',
                        '</div>'
                    ]).apply({
                        message: 'Surat Belum Dibalas'
                    });
                }
                if (txtBalasan) {
                    txtBalasan.setValue(tpl);
                }
            }
        });
    },

    renderBalasanTemplate: function(record) {
        var instansi_pengirim = record.surat_pengirim,
            tujuan = record.surat_tujuan,
            unit_pengirim = record.unit_source_nama,
            surat_perihal = record.surat_perihal,
            surat_nomor = record.surat_nomor,
            nomor = record.korespondensi_nomor,
            surat_model = record.surat_model,
            in_pengirim = instansi_pengirim === null || instansi_pengirim === '' ? '<span class="alternative">(Tidak ada pengirim)</span>' : instansi_pengirim,
            un_pengirim = unit_pengirim === null || unit_pengirim === '' ? '<span class="alternative">(Tidak ada pengirim)</span>' : unit_pengirim,
            kores_surat_nomor = surat_nomor === null || surat_nomor === '' ? '<span class="alternative">(Tidak ada nomor)</span>' : 'No.Surat: ' + surat_nomor,
            kores_perihal = surat_perihal === null || surat_perihal === '' ? '<span class="alternative">(Tidak ada perihal)</span>' : surat_perihal,
            kores_nomor = nomor === null || nomor === '' ? '<span class="alternative">(Tidak ada nomor)</span>' : 'No.Korespondensi: ' + nomor;


        if (surat_model == 1) {
            kores_pengirim = 'Dari: ' + in_pengirim;
        } else if (surat_model == 2) {
            kores_pengirim = 'Tujuan: ' + tujuan;
        } else if (surat_model == 3) {
            kores_pengirim = 'Dari: ' + un_pengirim;
        } else if (surat_model == 4 || surat_model == 6) {
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
            '</div>'
        ]).apply({
            perihal: kores_perihal,
            pengirim: kores_pengirim,
            surat_nomor: kores_surat_nomor,
            nomor: kores_nomor
        });
    },

    onButtonLihatKorespondensi_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            controllerKorespondesi = $this.getController($this.controllerKorespondesi),
            controllerKorespondesiInternal = $this.getController($this.controllerKorespondesiInternal);

        record.getDisposisi(function(disposisi) {
            disposisi.getSurat(function(surat) {
                surat.getKorespondensi(function(korespondensi) {
                    if (korespondensi.get('korespondensi_isinternal')) {
                        controllerKorespondesiInternal.launch({
                            record: korespondensi,
                            callback: function(success) {}
                        });
                    } else {
                        controllerKorespondesi.launch({
                            record: korespondensi,
                            callback: function(success) {}
                        });
                    }
                });
            });
        });
    },

    onButtonPengingat_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

        $helper.showConfirm({
            confirmTitle: 'Pengingat Surat',
            confirmText: 'Apakah anda yakin untuk mengingatkan pimpinan ?',
            callback: function(button) {
                if (button == 'yes') {
                    Ext.Ajax.request({
                        url: $this.getApi('pengingat_asisten'),
                        params: params,
                        success: function(response, eOpts) {
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if (!success) {
                                $helper.showMsg({ success: false, message: 'Gagal mengingatkan pimpinan' });
                                return;
                            }
                            if (success) {
                                $helper.showMsg({ success: true, message: 'Berhasil mengingatkan pimpinan' });
                                view.close();
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonDetail_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form.getRecord(),
            controllerDetail = $this.getController($this.controllerDetail);

        view.setLoading(true);
        controllerDetail.launch({
            mode: 'view',
            record: record
        });
        view.setLoading(false);
    },

    onButtonRequestBerkas_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form && form.updateRecord().getRecord();

        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Konfirmasi',
            confirmText: 'Apakah anda yakin ingin mengajukan permintaan berkas fisik ?',
            callback: function(button) {
                if (button == 'yes') {
                    record.doReqBerkas({
                        staf: me,
                        callback: function(new_record, operation, success) {
                            if (success) {
                                view.setLoading(false);
                                view.record = new_record;
                                view.fireEvent('show', view);
                                $helper.showMsg({ success: true, message: 'Berkas fisik dalam proses permintaan' });
                            } else {
                                view.setLoading(false);
                                $helper.showMsg({ success: false, message: 'Gagal mengajukan permintaan berkas fisik' });
                            }
                        }
                    });
                } else {
                    view.setLoading(false);
                }
            }
        });
    },

    onButtonBatalBerkas_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            view = $this.getMainview({ from: button }),
            form = $this.getForm({ root: view }),
            record = form && form.updateRecord().getRecord();

        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Konfirmasi',
            confirmText: 'Apakah anda yakin ingin membatalkan permintaan berkas fisik ?',
            callback: function(button) {
                if (button == 'yes') {
                    record.doCancelReqBerkas({
                        staf: me,
                        callback: function(new_record, operation, success) {
                            if (success) {
                                view.setLoading(false);
                                view.record = new_record;
                                view.fireEvent('show', view);
                                $helper.showMsg({ success: true, message: 'Permintaan berkas fisik dibatalkan' });
                            } else {
                                view.setLoading(false);
                                $helper.showMsg({ success: false, message: 'Gagal membatalkan permintaan berkas fisik' });
                            }
                        }
                    });
                } else {
                    view.setLoading(false);
                }
            }
        });
    }
});