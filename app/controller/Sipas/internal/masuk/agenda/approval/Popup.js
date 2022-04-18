Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.approval.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.internal.masuk.agenda.approval.Popup'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.sla.aktif.Combo'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_internal_masuk_agenda_approval_popup' },
        { ref: 'form',              selector: 'sipas_internal_masuk_agenda_approval_popup > form' },
        { ref: 'cbSetuju',          selector: 'sipas_internal_masuk_agenda_approval_popup > form #setuju' },
        { ref: 'cbTolak',           selector: 'sipas_internal_masuk_agenda_approval_popup > form #tolak' },
        { ref: 'txtKomentar',       selector: 'sipas_internal_masuk_agenda_approval_popup > form [name=surat_setuju_komentar]' },
        { ref: 'txtKeterangan',     selector: 'sipas_internal_masuk_agenda_approval_popup > form #statusKeterangan' },
        { ref: 'txtUlasan',         selector: 'sipas_internal_masuk_agenda_approval_popup > form [name=surat_ulasan_komentar]' },
        { ref: 'compJenisSurat',    selector: 'sipas_internal_masuk_agenda_approval_popup sipas_com_surat_pane #jenisSurat'},
        { ref: 'compPengirimSurat', selector: 'sipas_internal_masuk_agenda_approval_popup sipas_com_surat_pane #suratPengirim'},
        { ref: 'compDetailSurat',   selector: 'sipas_internal_masuk_agenda_approval_popup sipas_com_surat_pane #suratDetail'},
        { ref: 'cbUseSla',          selector: 'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane checkbox[name=surat_usesla]'},
        { ref: 'comboSla',          selector: 'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane combobox[name=surat_sla]'},
        { ref: 'cbTolakSla',        selector: 'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane #tolakSLA'},
        { ref: 'cbTerimaSla',       selector: 'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane #setujuSLA'},
        { ref: 'txtRetensi',        selector: 'sipas_internal_masuk_agenda_approval_popup sipas_retensi_pane [name=surat_retensi_tgl]'},
        { ref: 'cbRating',          selector: 'sipas_internal_masuk_agenda_approval_popup sipas_surat_ulasan_pane [name=surat_userating]'},
        { ref: 'radioRating',       selector: 'sipas_internal_masuk_agenda_approval_popup sipas_surat_ulasan_pane [name=surat_ulasan_nilai]'},
        { ref: 'btnSave',           selector: 'sipas_internal_masuk_agenda_approval_popup sipas_com_button_save'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    controllerDistribusi: 'Sipas.internal.masuk.agenda.distribusi.Prop',
    controllerProperty: 'Sipas.internal.masuk.agenda.Prop',

    _click: 0,

    init: function(application) {
        this.control({
            'sipas_internal_masuk_agenda_approval_popup': {
                show: this.onMainview_Show
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_retensi_pane checkbox': {
                change: this.onCheckboxRetensi_Change
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane #setujuSLA': {
                change: this.onCheckboxsetujuSla_Change
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane #tolakSLA': {
                change: this.onCheckboxtolakSla_Change
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_com_surat_pane':{
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_com_surat_pane sipas_com_button_view' : {
                click: this.onButtonView_Click
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_internal_masuk_agenda_approval_popup > form checkboxfield#setuju': {
                change: this.onCheckboxSetuju_Change
            },
            'sipas_internal_masuk_agenda_approval_popup > form checkboxfield#tolak': {
                change: this.onCheckboxTolak_Change
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_surat_ulasan_pane [name=surat_ulasan_nilai]': {
                change: this.onRadioNilai_Change
            },
            'sipas_internal_masuk_agenda_approval_popup sipas_sla_pane [name=surat_sla]': {
                loadassociate: this.onComboSla_LoadAssociate,
                focus: this.onComboSla_Focus
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel(this.models[0]).create({}),
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = ['#btnAktifasi'];
                    c.readonlyComponents    = [];
                    
                    c.requireComponents = ['#status'];
                
                    return c;
                })(config));

                view.on({
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

                        record && record.reject();
                        Ext.callback(view.callback, view.scope, [view, $this]);
                    },
                    scope: $this
                });
                
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
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

    onMainview_Show: function(mainview){
        var $this   = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            form    = $this.getForm({root:mainview}),
            record  = mainview.record || $this.getModel($this.models[0]).create({});

        if(record && form){
            form.setLoading(true);
            
            if (record.get('surat_model_sub') == 2) {
                mainview.getHeader().setTitle('Penerimaan Surat Masuk Internal (Kolektif)');
            }else if (record.get('surat_model_sub') == 1) {
                mainview.getHeader().setTitle('Penerimaan Surat Masuk Internal (Perorangan)');
            }

            if(record.get('surat_usesla') === "1"){
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#tolakSLA' : false,
                        '#setujuSLA' : false,
                        '#pilihSLA' : true
                    }
                });
            }else{
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#tolakSLA' : true,
                        '#setujuSLA' : true,
                        '#pilihSLA' : false
                    }
                });
            }

            $helper.hideComponent({
                parent: mainview,
                items:{
                    '#btnMore' : true
                }
            });

            form.setLoading(false);
            form.loadRecord(record);

            $this.loadTanggapan(record, mainview);
            $this.loadSLA(record, mainview);

        }
    },

    loadSLA: function(record, mainview){
        var $this = this,
            comboSla = $this.getComboSla({root:mainview});
        comboSla && comboSla.getStore().reload();
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = $this.getMainview({from:cmp}),
            compDetailSurat = $this.getCompDetailSurat({root:mainview}),
            surat_nomor = record.get('surat_nomor'),
            jenis_nama = record.get('jenis_nama'),
            kelas_nama = record.get('kelas_nama'),
            sub = '';

        cmp.setLoading(true);
        if (surat_nomor === null || surat_nomor === ''){
            surat_nomor = '<span class="alternative">Tidak Ada Nomor Surat</span>';
        }
        if(record.get('surat_model_sub') == 2){
            sub = '(Kolektif)';
        }else if(record.get('surat_model_sub') == 1){
            sub = '(Perorangan)';
        }

        compDetailSurat.setValue('<div style="display:flex"><div class="cell-visual cell-visual-left">'+
            '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-mail-open grey-600-i"></i></div></div>'+
            '<div class="cell-text">'+
            '<div class="subtext bold">'+record.get('surat_perihal')+'</div>'+
            '<div class="subtext">'+record.getPengirim()+' - <span class="blue-700-i">'+surat_nomor+'</span></div>'+
            '<div class="supporttext supporttext-dark">'+record.getModelDisplay()+' '+sub+'</div>'+
            '<div class="supporttext supporttext-dark">Jenis: '+jenis_nama+'</div>'+
            '<div class="supporttext supporttext-dark">Klasifikasi: '+kelas_nama+'</div>'+
            '</div></div>');
        cmp.setLoading(false);
    },

    loadTanggapan: function(record, mainview){
        var $this   = this,
            view    = view || $this.getMainview(),
            $helper         = $this.getApplication().Helper(),
            txtKeterangan = $this.getTxtKeterangan({root:view}),
            txtKomentar     = $this.getTxtKomentar({root:view}),
            cbTolak = $this.getCbTolak({root:view}),
            status  = record.get('surat_setuju');
        
        if(status && status == record.self.statusPenyetujuan().PERSETUJUAN_APPROVE){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setuju' : true,
                    '#tolak' : true,
                    'sipas_retensi_pane' : true,
                    'sipas_sla_pane' : true,
                    'sipas_surat_ulasan_pane' : true
                }
            });
            txtKeterangan.setValue('<div><span><b>Surat telah diterima oleh '+record.get('penyetuju_nama')+'</b><span class="badge badge-solid margin-left-4"><i class="icon ion-md-checkmark green-600-i"></i></span></span></div><div><span class="subtext bigger">'+Ext.Date.format(record.get('surat_status_tgl'), 'd M Y H:i')+'</span></div>');
            txtKomentar.setReadOnly(true);
            txtKomentar.setValue(record.get('surat_setuju_komentar'));
        }else if(status && status == record.self.statusPenyetujuan().PERSETUJUAN_DECLINE){
            cbTolak.setValue(true);
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setuju' : true,
                    '#tolak' : false,
                    'sipas_retensi_pane' : true,
                    'sipas_sla_pane' : true,
                    'sipas_surat_ulasan_pane' : true
                }
            });
            // txtKeterangan.setValue('<div><span><b>Surat telah ditolak oleh '+record.get('penyetuju_nama')+'</b> <i class="fam cross"></i></span></div><div><span style="color:grey;">'+Ext.Date.format(record.get('surat_status_tgl'), 'd M Y H:i')+'</span></div>');
            // txtKomentar.setReadOnly(true);
            txtKomentar.setValue(record.get('surat_setuju_komentar'));
        }else{
            $helper.hideComponent({
                parent: view,
                items:{
                    'sipas_com_button_save' : true,
                    'sipas_sla_pane' : true,
                    'sipas_retensi_pane' : true,
                    '[name=surat_setuju_komentar]' : true,
                    'sipas_surat_ulasan_pane' : true
                }
            });
            txtKomentar.setReadOnly(false);
            $helper.removeComponent({
                parent: view,
                items:{
                    '#statusKeterangan' : true
                }
            });
        }
    },

    onCheckboxRetensi_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:checkbox}),
            txtRetensi = $this.getTxtRetensi({root:mainview});

        txtRetensi.setValue(Ext.Date.add(new Date(), Ext.Date.DAY, 30));
    },

    onCheckboxsetujuSla_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            record  = form && form.updateRecord().getRecord();        

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#tolakSLA' : true,
                    '#pilihSLA' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#tolakSLA' : false,
                    '#pilihSLA' : true
                }
            });
        }
    },

    onCheckboxtolakSla_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            stafId = $session.getProfileId(),
            $helper = $this.getApplication().Helper(),
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view}),
            record  = form && form.updateRecord().getRecord();        

        if(newValue === true){
            record.set({
                'surat_sla_tolak_staf' : stafId,
                'surat_sla_tolak_tgl' : new Date(),
                'surat_sla_tolak_baca_staf' : stafId,
                'surat_sla_tolak_baca_tgl' : new Date()
            });
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setujuSLA' : true,
                    '#komentarSLA' : false
                }
            });
        }else if(newValue === false){
            record.set({
                'surat_sla_tolak_staf' : null,
                'surat_sla_tolak_tgl' : null,
                'surat_sla_tolak_baca_staf' : null,
                'surat_sla_tolak_baca_tgl' : null
            });
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setujuSLA' : false,
                    '#komentarSLA' : true
                }
            });
        }
    },

    onCheckboxSetuju_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            record  = form && form.updateRecord().getRecord(),
            txtKomentar = $this.getTxtKomentar({root:view});        

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#tolak' : true,
                    'sipas_com_button_save' : false,
                    'sipas_retensi_pane' : false,
                    'sipas_sla_pane' : false,
                    '[name=surat_setuju_komentar]' : false,
                    'sipas_surat_ulasan_pane' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#tolak' : false,
                    'sipas_com_button_save' : true,
                    'sipas_retensi_pane' : true,
                    'sipas_sla_pane' : true,
                    '[name=surat_setuju_komentar]' : true,
                    'sipas_surat_ulasan_pane' : true
                }
            });
        }
    },

    onCheckboxTolak_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view}),
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            stafId = $session.getProfileId(),
            record  = form && form.updateRecord().getRecord(),
            txtKomentar = $this.getTxtKomentar({root:view});

        if(newValue === true){
            record.set({
                'surat_tolak_baca_staf' : stafId,
                'surat_tolak_baca_tgl' : new Date()
            });
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setuju' : true,
                    'sipas_com_button_save' : false,
                    'sipas_retensi_pane' : true,
                    'sipas_sla_pane' : true,
                    '[name=surat_setuju_komentar]' : false,
                    'sipas_surat_ulasan_pane' : false
                }
            });
        }else if(newValue === false){
            record.set({
                'surat_tolak_baca_staf' : null,
                'surat_tolak_baca_tgl' : null
            });
            $helper.hideComponent({
                parent: view,
                items:{
                    '#setuju' : false,
                    'sipas_com_button_save' : true,
                    'sipas_retensi_pane' : true,
                    'sipas_sla_pane' : true,
                    '[name=surat_setuju_komentar]' : true,
                    'sipas_surat_ulasan_pane' : true
                }
            });
        }
    },

    onRadioNilai_Change: function(radiofield, newValue, oldValue, eOpts){
        var $this   = this,
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            record  = form && form.updateRecord().getRecord(),
            txtUlasan = $this.getTxtUlasan({root:view});

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    // '#setuju' : true,
                    // 'sipas_com_button_save' : false,
                    // 'sipas_retensi_pane' : true,
                    // 'sipas_sla_pane' : true,
                    // '[name=surat_ulasan_komentar]' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    // '#setuju' : false,
                    // 'sipas_com_button_save' : true,
                    // 'sipas_retensi_pane' : true,
                    // 'sipas_sla_pane' : true,
                    // '[name=surat_ulasan_komentar]' : false
                }
            });
        }
    },

    onButtonView_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            propType: 'imasuk',
            unit: record && record.get('surat_unit'),
            tipe: record && record.get('surat_itipe'),
            model: record.self.modelType().MODEL_IMASUK,
            mode:'view',
            // mode: 'lihat',
            record: record
        });
    },

    onButtonSave_Click: function(button, e, eOpts, record) {
        var $this       = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            checkSession = $session.getResetSession(),
            stafId      = $session.getProfileId(),
            profile     = $session.getProfile(),
            mainview    = $this.getMainview({from:button}),
            form        = $this.getForm({root:mainview}),
            cbSetuju    = $this.getCbSetuju({root:mainview}),
            cbTolak     = $this.getCbTolak({root:mainview}),
            cbUseSla    = $this.getCbUseSla({root:mainview}),
            comboSla    = $this.getComboSla({root:mainview}),
            cbRating    = $this.getCbRating({root:mainview}),
            radioRating = $this.getRadioRating({root:mainview}),
            cbTerimaSla = $this.getCbTerimaSla({root:mainview}),
            cbTolakSla  = $this.getCbTolakSla({root:mainview}),
            txtKomentar = $this.getTxtKomentar({root:mainview}),
            btnSave     = $this.getBtnSave({root:mainview}),
            record      = form && form.updateRecord().getRecord();

        if(cbSetuju && cbSetuju.getValue() === true && cbUseSla && cbTolakSla && comboSla && cbUseSla.getValue() === true && cbTolakSla.getValue() === false && comboSla.getValue() === null){
            /*ketika menggunakan sla, tidak menolak sla tapi belum memilih SLA*/            
            $helper.showMessage({success:false, message: 'SLA belum dipilih'});
            return;
        }else{
            $this._click++;
            if($this._click <= 1){
                $helper.showConfirm({
                    confirmText: 'Apakah anda yakin ?',
                    confirmTitle: 'Simpan Surat',
                    callback: function(button){
                        if(button == 'yes'){
                            record.set({
                                'surat_setuju' : (cbSetuju.getValue()) ? record.self.statusPenyetujuan().PERSETUJUAN_APPROVE : (cbTolak.getValue()) ? record.self.statusPenyetujuan().PERSETUJUAN_DECLINE : NULL,
                                'surat_usesetuju' : 1,
                                'surat_setuju_staf' : stafId,
                                'surat_setuju_profil' : profile.staf_profil,
                                'surat_setuju_tgl' : new Date(),
                                'surat_setuju_komentar' : txtKomentar.getValue(),
                                'surat_usesla': null
                            });
                        
                        if(! record) return;
                        if(!form.getForm().isValid()){
                            $this._click = 0;
                            btnSave.setDisabled(false);
                        }
                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            params: {approval:true},
                            callback: function(success, record, eOpts, response){
                                $this._click = 0;
                                $helper.showMsg({success: true, message: 'Berhasil menyimpan data'});
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                                if(success){
                                    btnSave.setDisabled(false);
                                    $helper.showMsg ({success: true, message: 'Berhasil menyimpan surat'});
                                    mainview.close();
                                }
                            }
                        });

                        }else if (button == 'no'){
                            $this._click = 0;
                            btnSave.setDisabled(false);
                        }else{
                            /*when message box closed*/
                            $this._click = 0;
                            btnSave.setDisabled(false);
                        }
                    }
                });
                btnSave.setDisabled(true);
            }
        }
    },

    // parent
    onComboSla_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
        }
    },

    onComboSla_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    }
});