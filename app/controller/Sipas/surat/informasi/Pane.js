Ext.define('SIPAS.controller.Sipas.surat.informasi.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models:[
        'Sipas.Surat'
    ],

    views: [
        'Sipas.surat.informasi.Pane'
    ],

    api: {
        profile_image: 'server.php/sipas/staf/get_image/foto?id={id}'
    },

    refs : [
        { ref: 'mainview',                  selector: 'sipas_surat_informasi_pane'},
        { ref: 'distribusiTxtInit',         selector: 'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane #textInit'},
        { ref: 'distribusiTxtDistribusi',   selector: 'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane #textDistribusi'},
        { ref: 'distribusiTxtJumlah',       selector: 'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane #textJumlah'},
        { ref: 'distribusiImage',           selector: 'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane #suratImage'},
        { ref: 'setujuTxtInit',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #textInit'},
        { ref: 'setujuTxtSetuju',           selector: 'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #textSetuju'},
        { ref: 'textPenerimaan',            selector: 'sipas_surat_informasi_pane sipas_surat_informasi_terima_pane #textPenerima'},
        { ref: 'buatTxtBuat',               selector: 'sipas_surat_informasi_pane sipas_surat_informasi_pembuatan_pane #textPembuatan'},
        { ref: 'buatImage',                 selector: 'sipas_surat_informasi_pane sipas_surat_informasi_pembuatan_pane #suratImage'},
        { ref: 'setujuImage',               selector: 'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #suratImage'},
        { ref: 'textRating',                selector: 'sipas_surat_informasi_pane #infoRating #textRating'},
        { ref: 'suratStatus',               selector: 'sipas_surat_informasi_pane #infoRating #suratStatus'},
        { ref: 'btnLihatRating',            selector: 'sipas_surat_informasi_pane #infoRating #buttonLihatRating'},
        { ref: 'textSelesai',               selector: 'sipas_surat_informasi_pane sipas_surat_informasi_selesai_pane #textSelesai'},
        { ref: 'txtSuratStatus',            selector: 'sipas_surat_informasi_pane #toolbarStatusSurat #suratStatus'},
        { ref: 'textEkspedisi',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane #textEkspedisi'},
        { ref: 'menuPrint',                 selector: 'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]'},
        { ref: 'comDistribusi',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane'},
        { ref: 'comPenyetujuan',            selector: 'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane'},
        { ref: 'comPenerimaan',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_terima_pane'},
        { ref: 'comPembuatan',              selector: 'sipas_surat_informasi_pane sipas_surat_informasi_pembuatan_pane'},
        { ref: 'comSuratSelesai',           selector: 'sipas_surat_informasi_pane sipas_surat_informasi_selesai_pane'},
        { ref: 'comRating',                 selector: 'sipas_surat_informasi_pane #infoRating'},
        { ref: 'comEkspedisKeluar',         selector: 'sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane'},
        { ref: 'comBatalNomor',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_batal_pane'},
        { ref: 'textBatalNomor',            selector: 'sipas_surat_informasi_pane sipas_surat_informasi_batal_pane #textBatalNomor'},
        { ref: 'comMusnahSurat',            selector: 'sipas_surat_informasi_pane sipas_surat_informasi_musnah_pane'},
        { ref: 'textMusnah',                selector: 'sipas_surat_informasi_pane sipas_surat_informasi_musnah_pane #textMusnah'},
        { ref: 'comArsipSurat',             selector: 'sipas_surat_informasi_pane sipas_surat_informasi_arsip_pane'},
        { ref: 'textArsip',                 selector: 'sipas_surat_informasi_pane sipas_surat_informasi_arsip_pane #textArsip'},
        { ref: 'comBerkas',                 selector: 'sipas_surat_informasi_pane sipas_surat_informasi_berkas_pane'},
        { ref: 'textBerkas',                selector: 'sipas_surat_informasi_pane sipas_surat_informasi_berkas_pane #textBerkas'}
    ],

    init: function(application){
        this.control({
            'sipas_surat_informasi_pane' :{
                load: this.onMainview_Load
            },
            'sipas_surat_informasi_pane #toolbarStatusSurat' :{
                loadassociate: this.onSuratStatus_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane' :{
                loadassociate: this.onDistribusi_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane' :{
                loadassociate: this.onPenyetujuan_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_terima_pane' :{
                loadassociate: this.onPenerimaan_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_pembuatan_pane' :{
                loadassociate: this.onPembuatan_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_selesai_pane' :{
                loadassociate: this.onSuratSelesai_LoadAssociate
            },
            'sipas_surat_informasi_pane #infoRating' :{
                loadassociate: this.onRating_LoadAssociate
            },
            "sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane":{
                loadassociate: this.onEkspedisKeluar_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_batal_pane' :{
                loadassociate: this.onBatalNomor_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_musnah_pane' :{
                loadassociate: this.onMusnahSurat_LoadAssociate
            },
            'sipas_surat_informasi_pane sipas_surat_informasi_arsip_pane' :{
                loadassociate: this.onArsipSurat_LoadAssociate
            },
            "sipas_surat_informasi_pane sipas_surat_informasi_berkas_pane":{
                loadassociate: this.onBerkas_LoadAssociate
            }
        });
    },

    onMainview_Load: function(mainview, record, form){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            suratStatus = $this.getSuratStatus({root:mainview}),
            comDistribusi = $this.getComDistribusi({root:mainview}),
            comPenyetujuan = $this.getComPenyetujuan({root:mainview}),
            comPenerimaan = $this.getComPenerimaan({root:mainview}),
            comPembuatan = $this.getComPembuatan({root:mainview}),
            comSuratSelesai = $this.getComSuratSelesai({root:mainview}),
            comRating = $this.getComRating({root:mainview}),
            comEkspedisKeluar = $this.getComEkspedisKeluar({root:mainview}),
            comBatalNomor = $this.getComBatalNomor({root:mainview}),
            comMusnahSurat = $this.getComMusnahSurat({root:mainview}),
            comArsipSurat = $this.getComArsipSurat({root:mainview}),
            comBerkas = $this.getComBerkas({root:mainview});

        $helper.hideComponent({
            parent: mainview,
            items: {
                '#toolbarStatusSurat': true
                // '#buttonBerkasFisik': true,
                // 'sipas_surat_informasi_berkas_pane': true
            }
        });

        $this.onDistribusi_LoadAssociate(record, form, comDistribusi);
        $this.onPenyetujuan_LoadAssociate(record, form, comPenyetujuan);
        $this.onPenerimaan_LoadAssociate(record, form, comPenerimaan);
        $this.onPembuatan_LoadAssociate(record, form, comPembuatan);
        $this.onSuratSelesai_LoadAssociate(record, form, comSuratSelesai);
        $this.onRating_LoadAssociate(record, form, comRating);
        $this.onEkspedisKeluar_LoadAssociate(record, form, comEkspedisKeluar);
        $this.onBerkas_LoadAssociate(record, form, comBerkas);
        
        if (record.get('surat_nomor_isbatal')) {
            $this.onBatalNomor_LoadAssociate(record, form, comBatalNomor);
        }else{
            if (comBatalNomor) {
                comBatalNomor.hide(true);
            }
        }
        if (record.get('surat_ismusnah')) {
            $this.onMusnahSurat_LoadAssociate(record, form, comMusnahSurat);
        }else{
            if (comMusnahSurat) {
                comMusnahSurat.hide(true);
            }
        }
        if (record.get('surat_isarsip')) {
            $this.onArsipSurat_LoadAssociate(record, form, comArsipSurat);
        }else{
            if (comArsipSurat) {
                comArsipSurat.hide(true);
            }
        }
        if (record.get('surat_useberkas')) {
            $this.onBerkas_LoadAssociate(record, form, comBerkas);
        }else{
            if (comBerkas) {
                comBerkas.hide(true);
            }
        }
    },

    onSuratStatus_LoadAssociate: function(record, form, cmp){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from:cmp}) || $this.getMainview(),
            suratStatus = $this.getTxtSuratStatus({root:mainview}) || mainview.down('#suratStatus'),
            model = record.get('surat_model'),
            model_sub = record.get('surat_model_sub'),
            setuju = record.get('surat_setuju'),
            setujuPetikan = record.get('surat_petikan_setuju'),
            isbatal = record.get('surat_nomor_isbatal'),
            is_distribusi = record.get('surat_isdistribusi'),
            ismusnah = record.get('surat_ismusnah'),
            isarsip = record.get('surat_isarsip'),
            distribusi_iscabut = record.get('surat_distribusi_iscabut');
        
        switch (model) {
            case 1:
                if (ismusnah == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_musnah'));
                }else if (isarsip == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_arsip'));
                }else if (is_distribusi == 0){
                    cmp.addCls('x-toolbar-alternative');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_draft'));
                } else if (is_distribusi == 1){
                    if (distribusi_iscabut) {
                        cmp.addCls('x-toolbar-warning');
                        suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi_cabut'));
                    }else{
                        cmp.addCls('x-toolbar-info');
                        suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi'));
                    }
                } else {
                    cmp.hide(true);
                }
            break;
            case 2:
                if (ismusnah == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_musnah'));
                }else if (isarsip == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_arsip'));
                }else if(isbatal) {
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_batal_nomor'));
                } else {
                    switch (setuju) {
                        case 0:
                            cmp.addCls('x-toolbar-alternative');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_draft'));
                        break;
                        case 1:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju'));
                        break;
                        case 2:
                            if (record.get('ekspedisi_nama')){
                                cmp.addCls('x-toolbar-info');
                                suratStatus.setValue($app.getGrammar('surat_prop_badge_ekspedisi'));
                            } else {
                                cmp.addCls('x-toolbar-info');
                                suratStatus.setValue($app.getGrammar('surat_prop_badge_setuju'));
                            }
                        break;
                        case 3:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju_ulang'));
                        break;
                        case 4:
                            cmp.addCls('x-toolbar-danger');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_revisi'));
                        break;
                        default:
                            cmp.hide(true);
                        break;
                    }
                }
            break;
            case 3:
                if (ismusnah == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_musnah'));
                }else if (isarsip == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_arsip'));
                }else {
                    switch (setuju) {
                        case 0:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_pending'));
                        break;
                        case 1:
                            if (is_distribusi == 0){
                                cmp.addCls('x-toolbar-alternative');
                                suratStatus.setValue($app.getGrammar('surat_prop_badge_draft'));
                            } else if (is_distribusi == 1){
                                if (distribusi_iscabut) {
                                    cmp.addCls('x-toolbar-warning');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi_cabut'));
                                }else{
                                    cmp.addCls('x-toolbar-info');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi'));
                                }
                            } else {
                                cmp.hide(true);
                            }
                        break;
                        case 2:
                            if (is_distribusi == 0){
                                cmp.addCls('x-toolbar-warning');
                                suratStatus.setValue($app.getGrammar('surat_prop_badge_imasuk_blm_distribusi'));
                            } else if (is_distribusi == 1){
                                if (distribusi_iscabut) {
                                    cmp.addCls('x-toolbar-warning');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi_cabut'));
                                }else{
                                    cmp.addCls('x-toolbar-info');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi'));
                                }
                            } else {
                                cmp.hide(true);
                            }
                        break;
                        case 4:
                            cmp.addCls('x-toolbar-danger');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_imasuk_tolak'));
                        break;
                        default:
                            cmp.hide(true);
                        break;
                    }
                }
            break;
            case 4:
                if (ismusnah == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_musnah'));
                }else if (isarsip == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_arsip'));
                }else if(isbatal) {
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_batal_nomor'));
                } else {
                    switch (setuju) {
                        case 0:
                            cmp.addCls('x-toolbar-alternative');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_draft'));
                        break;
                        case 1:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju'));
                        break;
                        case 2:
                            cmp.addCls('x-toolbar-info');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_setuju'));
                        break;
                        case 3:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju_ulang'));
                        break;
                        case 4:
                            cmp.addCls('x-toolbar-danger');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_revisi'));
                        break;
                        default:
                            cmp.hide(true);
                        break;
                    }
                }
            break;
            case 6:
                if (ismusnah == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_musnah'));
                }else if (isarsip == 1){
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_arsip'));
                }else if(isbatal) {
                    cmp.addCls('x-toolbar-danger');
                    suratStatus.setValue($app.getGrammar('surat_prop_badge_batal_nomor'));
                } else {
                    switch (setuju) {
                        case 0:
                            cmp.addCls('x-toolbar-alternative');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_draft'));
                        break;
                        case 1:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju'));
                        break;
                        case 2:
                            if(model_sub == 1) {
                                if (is_distribusi == 1){
                                    cmp.addCls('x-toolbar-info');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi'));
                                } else {
                                    cmp.addCls('x-toolbar-info');
                                    suratStatus.setValue($app.getGrammar('surat_prop_badge_setuju'));
                                }
                            } else {
                                switch (setujuPetikan) {
                                    case 1:
                                        cmp.addCls('x-toolbar-warning');
                                        suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju_petikan'));
                                    break;
                                    case 2:
                                        if (is_distribusi == 1){
                                            cmp.addCls('x-toolbar-info');
                                            suratStatus.setValue($app.getGrammar('surat_prop_badge_distribusi'));
                                        } else {
                                            cmp.addCls('x-toolbar-info');
                                            suratStatus.setValue($app.getGrammar('surat_prop_badge_setuju'));
                                        }
                                    break;
                                    case 3:
                                        cmp.addCls('x-toolbar-warning');
                                        suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju_ulang'));
                                    break;
                                    case 4:
                                        cmp.addCls('x-toolbar-danger');
                                        suratStatus.setValue($app.getGrammar('surat_prop_badge_revisi_petikan'));
                                    break;
                                }
                            }
                        break;
                        case 3:
                            cmp.addCls('x-toolbar-warning');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_proses_setuju_ulang'));
                        break;
                        case 4:
                            cmp.addCls('x-toolbar-danger');
                            suratStatus.setValue($app.getGrammar('surat_prop_badge_revisi'));
                        break;
                        default:
                            cmp.hide(true);
                        break;
                    }
                }
            break;
            default:
                cmp.hide(true);
            break;
        }
    },

    onSuratSelesai_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
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

        if (record.get('surat_isdistribusi') == '1'){
            if (selesai == '1'){
                tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">Surat ditandai selesai oleh :</div>',
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
                    '<div class="maintext margin-top-8">{template}</div>',
                '</div>']).apply({template:'Surat belum selesai'});
            }
            txtSelesai && txtSelesai.setValue(tpl);
        } else {
            cmp.hide(true);
        }
        cmp.setLoading(false);
    },

    onDistribusi_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this   = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:cmp}),
            distribusiImage = $this.getDistribusiImage({root:mainview}),
            txtInit = $this.getDistribusiTxtInit({root:mainview}),
            txtDistribusi = $this.getDistribusiTxtDistribusi({root:mainview}),
            txtJumlah = $this.getDistribusiTxtJumlah({root:mainview}),
            distributor = record && record.get('distributor_nama'),
            distributor_unit = record && record.get('distributor_unit_nama'),
            distributor_id = record && record.get('distributor_id'),
            penerima_total = record && record.get('surat_imasuk_total'),
            penerima_setuju = record && record.get('surat_imasuk_setuju'),
            isdistribusi = (record && record.get('surat_isdistribusi') === 1)? true: false,
            distribusi_iscabut = record && record.get('surat_distribusi_iscabut'),
            distribusi_tgl = (record && record.get('surat_distribusi_tgl'))? Ext.Date.format(record.get('surat_distribusi_tgl'), 'd M Y H:i'): '',
            distribusi_cabut_tgl = (record && record.get('surat_distribusi_cabut_tgl'))? Ext.Date.format(record.get('surat_distribusi_cabut_tgl'), 'd M Y H:i'): '',
            pencabut_id = record && record.get('surat_cabut_staf'),
            pencabut_pelaku_id = record && record.get('surat_cabut_pelaku'),
            pencabut_pelaku_nama = record && record.get('pencabut_pelaku_nama');
        
        if(distribusi_iscabut){
            $helper.hideComponent({
                // action: !isdistribusi,
                parent: cmp,
                items: [
                    '#containerDistribusi',
                    '#suratImage'
                ]
            });

            var info_init_distribusi = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext margin-top-8">{template}</div>',
                '</div>']).apply({
                    template: 'Surat belum didistribusikan'
                });

            txtInit && txtInit.setValue(info_init_distribusi);
        }else if(isdistribusi){
            $helper.hideComponent({
                action: isdistribusi,
                parent: cmp,
                items: [
                    '#containerInit',
                    '#suratImage'
                ]
            });

            var info_distribusi = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">Surat didistribusikan oleh :</div>',
                    '<div class="subtext">{nama} - {unit}</div>',
                    '<div class="supporttext">Pada {tgl}</div>',
                '</div>']).apply({
                    id: distributor_id,
                    nama: distributor,
                    unit: distributor_unit,
                    tgl: distribusi_tgl
                });

            var info_jumlah = new Ext.XTemplate(['<div>{setuju} dari {total} sudah diterima</div>']).apply({
                                setuju: penerima_setuju,
                                total: penerima_total
                            });

            txtDistribusi && txtDistribusi.setValue(info_distribusi);
            txtJumlah && txtJumlah.setValue(info_jumlah);
        }else{
            $helper.hideComponent({
                action: !isdistribusi,
                parent: cmp,
                items: [
                    '#containerDistribusi',
                    '#suratImage'
                ]
            });

            var info_init_distribusi = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext margin-top-8">{template}</div>',
                '</div>']).apply({
                    template: 'Surat belum didistribusikan'
                });

            txtInit && txtInit.setValue(info_init_distribusi);
        }
        cmp.setLoading(false);
    },

    onPembuatan_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this   = this,
            $helper = $this.getApplication().Helper(),
            mainview    = $this.getMainview({from:cmp}),
            txtBuat     = $this.getBuatTxtBuat({root:mainview}),
            buatImage   = $this.getBuatImage({root:mainview}),
            pembuat     = record && record.get('surat_properti_pembuat_nama'),
            pembuat_unit   = record && record.get('surat_properti_pembuat_unit_nama'),
            pembuat_id     = record && record.get('surat_properti_pembuat_id'),
            properti_buat_tgl = (record && record.get('surat_properti_buat_tgl'))? Ext.Date.format(record.get('surat_properti_buat_tgl'), 'd M Y H:i'): '';
        
        var info_pembuatan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">Surat diinput oleh :</div>',
                '<div class="subtext">{nama} - {unit}</div>',
                '<div class="supporttext">Pada {tgl}</div>',
            '</div>']).apply({
                id: pembuat_id,
                nama: pembuat,
                unit: pembuat_unit,
                tgl: properti_buat_tgl
            });

        txtBuat && txtBuat.setValue(info_pembuatan);
        cmp.setLoading(false);
    },

    onRating_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from:cmp}),
            txtRating = $this.getTextRating({root:mainview}),
            btnLihatRating = $this.getBtnLihatRating({root:mainview}),
            nilai = record && record.get('surat_ulasan_nilai_rata'),
            jumlah = record && record.get('surat_ulasan_jumlah'),
            info_rating = '';

        if (jumlah != 0){
            info_rating = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-star-outline grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="subtext bold margin-top-8">',
                        '<span class="badge badge-solid margin-right-4 margin-left-4">',
                            '<span class="bigger-1-5 bold-300">{rating}</span>',
                        '</span>',
                        '<span >dari {total} {grammar}</span>',
                    '</div>',
                '</div>']).apply({
                    rating: nilai,
                    total: jumlah,
                    grammar: $app.getGrammar('surat_prop_rating_info')
                });
        } else {
            info_rating = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                       '<i class="bigger-1-25 icon ion-md-star-outline grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext margin-top-8">{template}</div>',
                '</div>']).apply({
                    template: 'Surat ini belum diberi '+$app.getGrammar('surat_prop_rating_info')
                });
            btnLihatRating && btnLihatRating.hide(true);
        }
        txtRating && txtRating.setValue(info_rating);
        cmp.setLoading(false);
    },

    onPenyetujuan_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this   = this,
            $helper = $this.getApplication().Helper(),
            mainview    = $this.getMainview({from:cmp}),
            setujuImage = $this.getSetujuImage({root:mainview}),
            txtInit     = $this.getSetujuTxtInit({root:mainview}),
            txtSetuju   = $this.getSetujuTxtSetuju({root:mainview}),
            menuPrint   = $this.getMenuPrint({root:mainview}),
            init        = record && record.get('surat_setuju') == 0 ? true: false,
            proses      = record && record.get('surat_setuju') == 1 ? true: false,
            setuju      = record && record.get('surat_setuju') == 2 ? true: false,
            revisi      = record && record.get('surat_setuju') == 3 ? true: false,
            tolak       = record && record.get('surat_setuju') == 4 ? true: false,
            setuju_tgl  = (record && record.get('surat_setuju_tgl')) ? Ext.Date.format(record.get('surat_setuju_tgl'), 'd M Y H:i'): '',
            penyetuju_total     = record && record.get('surat_setuju_total'),
            urut = record && record.get('surat_setuju_isurut'),
            urutText = '',
            penyetuju_setuju    = record && record.get('surat_setuju_setuju');

        if(urut){
            urutText = 'Penyetujuan Urut';
        }else{
            urutText = 'Penyetujuan Tidak Urut';
        }

        if(setuju){
            $helper.hideComponent({
                action: setuju,
                parent: cmp,
                items: [
                    '#containerInit',
                    '#suratImage'
                ]
            });

            var info_penyetujuan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-checkmark grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">Surat telah disetujui.</div>',
                    '<div class="supporttext">Pada {tgl_setuju} dengan {is_urut}</div>',
                '</div>']).apply({
                    tgl_setuju: setuju_tgl,
                    is_urut: urutText
                }),
            comp = txtSetuju;
        }else if(tolak){
            $helper.hideComponent({
                action: tolak,
                parent: cmp,
                items: [
                    // '#daftarPenyetuju',
                    // '#btnMore',
                    '#printApproval',
                    '#containerInit',
                    '#suratImage'
                ]
            });

            var info_penyetujuan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-close grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">{template}</div>',
                    '<div class="supporttext">Pada tanggal {tgl_setuju}</div>',
                    '<div class="supporttext">{is_urut}</div>',
                '</div>']).apply({
                    template: 'Surat direvisi.',
                    tgl_setuju: setuju_tgl,
                    is_urut: urutText
                }),
            comp = txtSetuju;
        }else if(init){
            $helper.hideComponent({
                action: init,
                parent: cmp,
                items: [
                    '#containerSetuju',
                    '#suratImage'
                ]
            });

            var info_penyetujuan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext margin-top-8">{template}</div>',
                '</div>']).apply({
                    template: 'Surat belum diajukan ke penyetuju'
                }),
            comp = txtInit;
        }else if(proses){
            $helper.hideComponent({
                action: proses,
                parent: cmp,
                items: [
                    '#containerInit',
                    '#suratImage'
                ]
            });

            var info_penyetujuan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">{template}</div>',
                    '<div class="subtext">{jumlah} dari {total}</div>',
                    '<div class="supporttext">{is_urut}</div>',
                '</div>']).apply({
                    template: 'Surat dalam proses penyetujuan',
                    jumlah: penyetuju_setuju,
                    total: penyetuju_total,
                    is_urut: urutText
                }),
            comp = txtSetuju;
            menuPrint && menuPrint.hide(true);
        }else if(revisi){
            $helper.hideComponent({
                action: revisi,
                parent: cmp,
                items: [
                    '#containerInit',
                    '#suratImage'
                ]
            });

            var info_penyetujuan = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<div class="maintext">{template}</div>',
                    '<div class="subtext">{jumlah} dari {total}</div>',
                    '<div class="supporttext">{is_urut}</div>',
                '</div>']).apply({
                    template: 'Surat dalam proses pengajuan ulang',
                    jumlah: penyetuju_setuju,
                    total: penyetuju_total,
                    is_urut: urutText
                }),
            comp = txtSetuju;
            menuPrint && menuPrint.hide(true);
        }
        comp && comp.setValue(info_penyetujuan);
        cmp.setLoading(false);
    },

    onPenerimaan_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from:cmp}),
            txtTerima = $this.getTextPenerimaan({root:mainview}),
            setuju = record.get('surat_setuju'),
            setuju_tgl = Ext.util.Format.date(record.get('surat_setuju_tgl'), 'd M Y H:i'),
            setuju_staf = record.get('penyetuju_id'),
            setuju_nama = record.get('penyetuju_nama'),
            setuju_unit = record.get('penyetuju_unit_nama');

        // txtTerima.hide(true);
        if (setuju == 0){
            setuju = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                        '<div class="img img-circle img-32">',
                            '<i class="bigger-1-25 icon ion-md-mail grey-600-i"></i>',
                        '</div>',
                    '</div>',
                    '<div class="cell-text">',
                        '<div class="maintext margin-top-8">{template}</div>',
                    '</div>']).apply({template:'Surat belum diterima'});
        } else if (setuju == 4){
            setuju = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                        '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
                    '</div>',
                    '<div class="cell-text">',
                        '<div class="maintext">Surat ditolak oleh :</div>',
                        '<div class="subtext">{nama} - {unit}</div>',
                        '<div class="supporttext">Pada {tgl}</div>',
                    '</div>']).apply({
                        id: setuju_staf,
                        nama: setuju_nama,
                        unit: setuju_unit,
                        tgl: setuju_tgl
                    });
        } else {
            setuju = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                        '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
                    '</div>',
                    '<div class="cell-text">',
                        '<div class="maintext">Surat diterima oleh :</div>',
                        '<div class="subtext">{nama} - {unit}</div>',
                        '<div class="supporttext">Pada {tgl}</div>',
                    '</div>']).apply({
                        id: setuju_staf,
                        nama: setuju_nama,
                        unit: setuju_unit,
                        tgl: setuju_tgl
                    });
        }
        txtTerima && txtTerima.setValue(setuju);
        cmp.setLoading(false);
    },

    onEkspedisKeluar_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        cmp.setLoading(true);
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:cmp}),
            txtEkspedisi = $this.getTextEkspedisi({root:mainview}),
            ekspedisi_tgl = record.get('surat_ekspedisi_tgl'),
            tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<div class="img img-circle img-32">',
                    '<i class="bigger-1-25 icon ion-md-cube grey-600-i"></i>',
                '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">{message}</div>',
                '<div class="supporttext">{sub}</div>',
            '</div>']);

        if (ekspedisi_tgl !== null){
            txtEkspedisi && txtEkspedisi.setValue(tpl.apply({
                message: 'Surat sudah diekspedisi',
                sub: 'Pada '+Ext.util.Format.date(ekspedisi_tgl, 'd M Y')
            }));
            cmp.setLoading(false);
        } else {
            cmp.setLoading(false);
            cmp.hide(true);
        }
    },

    onBatalNomor_LoadAssociate:function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;

        cmp.setLoading(true);
        var $this      = this,
            $app       = $this.getApplication(),
            $helper    = $app.Helper(),
            mainview   = $this.getMainview({from:cmp}),
            txtBatal   = $this.getTextBatalNomor({root:mainview}),
            batal_tgl  = Ext.util.Format.date(record.get('surat_nomor_batal_tgl'), 'd M Y H:i'),
            batal_id   = record.get('pembatal_id'),
            batal_nama = record.get('pembatal_nama'),
            batal_unit = record.get('pembatal_unit_nama');

        var batal = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={id}">',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">Surat dibatalkan oleh :</div>',
                '<div class="subtext">{nama} - {unit}</div>',
                '<div class="supporttext">Pada {tgl}</div>',
            '</div>']).apply({
                id    : batal_id,
                nama  : batal_nama,
                unit  : batal_unit,
                tgl   : batal_tgl
            });
        txtBatal && txtBatal.setValue(batal);
        cmp.setLoading(false);
    },

    onMusnahSurat_LoadAssociate:function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;

        cmp.setLoading(true);
        var $this      = this,
            $app       = $this.getApplication(),
            $helper    = $app.Helper(),
            mainview   = $this.getMainview({from:cmp}),
            txtMusnah   = $this.getTextMusnah({root:mainview}),
            musnah_tgl  = Ext.util.Format.date(record.get('surat_musnah_tgl'), 'd M Y H:i'),
            musnah_id   = record.get('pemusnah_id'),
            musnah_nama = record.get('pemusnah_nama');

        var musnah = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<div class="img img-circle img-32">',
                    '<i class="bigger-1-25 icon ion-md-filing grey-600-i"></i>',
                '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">Surat telah dimusnahkan</div>',
                '<div class="supporttext">Pada {tgl}</div>',
            '</div>']).apply({
                tgl   : musnah_tgl
            });
        txtMusnah && txtMusnah.setValue(musnah);
        cmp.setLoading(false);
    },

    onArsipSurat_LoadAssociate:function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;

        cmp.setLoading(true);
        var $this      = this,
            $app       = $this.getApplication(),
            $helper    = $app.Helper(),
            mainview   = $this.getMainview({from:cmp}),
            txtArsip   = $this.getTextArsip({root:mainview}),
            arsip_tgl  = Ext.util.Format.date(record.get('surat_arsip_tgl'), 'd M Y H:i'),
            arsip_id   = record.get('pengarsip_id'),
            arsip_nama = record.get('pengarsip_nama');

        var arsip = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<div class="img img-circle img-32">',
                    '<i class="bigger-1-25 icon ion-md-filing grey-600-i"></i>',
                '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">Surat telah diarsipkan</div>',
                '<div class="supporttext">Pada {tgl}</div>',
            '</div>']).apply({
                tgl   : arsip_tgl
            });
        txtArsip && txtArsip.setValue(arsip);
        cmp.setLoading(false);
    },

    onBerkas_LoadAssociate: function(record, form, cmp){
        if (!record) return;
        if (!cmp) return;
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from:cmp}),
            textBerkas = $this.getTextBerkas({root:mainview}),
            jumlah_request = record.get('disposisi_jumlah_berkas_request'),
            tpl = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                    '<div class="img img-circle img-32">',
                        '<i class="bigger-1-25 icon ion-md-copy grey-600"></i>',
                    '</div>',
                '</div>',
                '<div class="cell-text">',
                    '<tpl if="values.jumlah &gt; 0">',
                        '<div class="maintext">{text}</div>',
                        '<div class="supporttext">',
                            '<span class="warning">Terdapat {jumlah} permintaan untuk disetujui</span>',
                        '</div>',
                    '<tpl else>',
                        '<tpl if="values.only_text">',
                            '<div class="maintext margin-top-8">{text}</div>',
                        '<tpl else>',
                            '<div class="maintext">{text}</div>',
                            '<div class="supporttext">Tidak ada permintaan berkas untuk ditanggapi</div>',
                        '</tpl>',
                    '</tpl>',
                '</div>']);

        cmp.setLoading(true);
        if (record.get('surat_isdistribusi') == 1 && record.get('surat_model') !== 4){
            textBerkas && textBerkas.setValue(tpl.apply({
                text: 'Surat disertai berkas fisik',
                jumlah: jumlah_request,
                only_text: false
            }));
            cmp.setLoading(false);
        } else {
            if (record.get('surat_isdistribusi') == 1){
                textBerkas && textBerkas.setValue(tpl.apply({
                    text: 'Surat disertai berkas fisik',
                    jumlah: 0,
                    only_text: false
                }));
            } else {
                textBerkas && textBerkas.setValue(tpl.apply({
                    text: 'Surat disertai berkas fisik',
                    jumlah: 0,
                    only_text: true
                }));
            }
            $helper.hideComponent({
                parent: mainview,
                items: {
                    '#buttonBerkasFisik': true
                }
            });
            cmp.setLoading(false);
        }
    }
});