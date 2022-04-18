Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.transfer.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    stores: [
        'Sipas.internal.masuk.agenda.Lookup',
        'Sipas.surat.scope.Combo'
    ],
    
    views: [
        'Sipas.internal.masuk.agenda.transfer.Popup'
    ],

    models: [
        'Sipas.Surat' 
    ],

    messages: {
        invalidMode: 'Mode tidak sesuai',
        transferSucces: 'Transfer Berkas Berhasil',
        transferFailure: 'Transfer Berkas Gagal',
        transferEmpty: 'Tidak Ada Berkas yang Ditransfer'
    }, 

    api: {
        duplicate     : 'server.php/sipas/arsip/arsip_duplicate',
        next_agenda   : 'server.php/sipas/surat_keluar/next/agenda',
        next_kode     : 'server.php/sipas/surat_keluar/next/kode',
        prioritas_hari: 'server.php/sipas/prioritas/getHari?id={id}',
        profile_image : 'server.php/sipas/staf/get_image/foto?id={id}'
    },

    refs: [
        { ref: 'mainview',               selector: 'sipas_internal_masuk_agenda_transfer_popup' },
        { ref: 'form',                   selector: 'sipas_internal_masuk_agenda_transfer_popup form' },
        { ref: 'cbBerkas',               selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_arsip]' },
        { ref: 'cbKorespondensi',        selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_korespondensi]' },
        { ref: 'txtKorespondensi',       selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_korespondensi]' },
        { ref: 'txtSuratKorespondensi',  selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_korespondensi_surat]' },
        { ref: 'txtKodeKorespondensi',   selector: 'sipas_internal_masuk_agenda_transfer_popup [name=korespondensi_kode]' },
        { ref: 'txtPerihal',             selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_perihal]' },
        { ref: 'txtTujuan',              selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_tujuan]' },
        { ref: 'txtJenis',               selector: 'sipas_internal_masuk_agenda_transfer_popup [name=jenis_id]' },
        { ref: 'txtSifat',               selector: 'sipas_internal_masuk_agenda_transfer_popup [name=sifat_id]' },
        { ref: 'txtPrioritas',           selector: 'sipas_internal_masuk_agenda_transfer_popup [name=prioritas_id]' },
        { ref: 'txtKlasifikasi',         selector: 'sipas_internal_masuk_agenda_transfer_popup [name=klasifikasi_id]' },
        { ref: 'txtMedia',               selector: 'sipas_internal_masuk_agenda_transfer_popup [name=media_id]' },
        { ref: 'txtLokasi',              selector: 'sipas_internal_masuk_agenda_transfer_popup [name=lokasi_id]' },
        { ref: 'cmpAgenda',              selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_agenda]' },
        { ref: 'cmpNomor',               selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_nomor]' },
        { ref: 'cmpUnit',                selector: 'sipas_internal_masuk_agenda_transfer_popup [name=surat_unit]' },
        { ref: 'compSurat',              selector: 'sipas_internal_masuk_agenda_transfer_popup sipas_com_surat_pane'},
        { ref: 'compPengirimSurat',      selector: 'sipas_internal_masuk_agenda_transfer_popup form #suratPengirim'},
        { ref: 'compJenisSurat',         selector: 'sipas_internal_masuk_agenda_transfer_popup sipas_com_surat_pane #jenisSurat'},
        { ref: 'compPengirimImage',      selector: 'sipas_internal_masuk_agenda_transfer_popup form sipas_com_surat_pembuat_pane #pengirimImg'},
        { ref: 'cmpPrioritasTgl',        selector: 'sipas_internal_masuk_agenda_transfer_popup form [name=prioritas_hari]' },
        { ref: 'cmpProses',              selector: 'sipas_internal_masuk_agenda_transfer_popup form sipas_com_button_process' },
        { ref: 'compDetailPembuat',      selector: 'sipas_internal_masuk_agenda_transfer_popup form #pembuatDetail'},
        { ref: 'compDetailSurat',        selector: 'sipas_internal_masuk_agenda_transfer_popup form #suratDetail'},
        { ref: 'cmpTransferKe',          selector: 'sipas_internal_masuk_agenda_transfer_popup form #transferKe' },
        { ref: 'cmpTransferSukses',      selector: 'sipas_internal_masuk_agenda_transfer_popup form #transferSukses' },
        { ref: 'cmpInfoHasilTransfer',   selector: 'sipas_internal_masuk_agenda_transfer_popup form #infoHasilTransfer' },
        { ref: 'cmpInfoSuratHasilTransfer', selector: 'sipas_internal_masuk_agenda_transfer_popup form #infoSuratHasilTransfer' }
    ],

    viewViewer: 'Sipas.Viewer',
    
    controllerSurat: 'Sipas.surat.Prop',
    controllerImasukLookup: 'Sipas.internal.masuk.agenda.Lookup',
    controllerKeluarProp: 'Sipas.keluar.agenda.Prop',
    controllerKonsepList: 'Sipas.konsep.agenda.List',

    modelSurat: 'Sipas.Surat',
    modelSuratKeluar: 'Sipas.Keluar',
    modelSuratBerkas: 'Sipas.surat.Berkas',

    recordKeluar : null,
    recordBerkas : null,

    init: function(application) {
        this.control({
            "sipas_internal_masuk_agenda_transfer_popup":{
                show: this.onMainview_Show,
                loadagenda  : this.onMainview_LoadAgenda,
                loadkode    : this.onMainview_LoadKode
            },
            "sipas_internal_masuk_agenda_transfer_popup form sipas_com_button_process": {
                click: this.onButtonProcess_Click
            },
            "sipas_internal_masuk_agenda_transfer_popup sipas_com_surat_pane" : {
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            "sipas_internal_masuk_agenda_transfer_popup sipas_com_surat_pembuat_pane" : {
                loadassociate: this.onSuratPembuatInfo_LoadAssociate
            },
            "sipas_internal_masuk_agenda_transfer_popup [name=prioritas_id]" : {
                change: this.onPrioritas_Change
            },
            "sipas_internal_masuk_agenda_transfer_popup form #suratUnit": {
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_internal_masuk_agenda_transfer_popup form sipas_com_button_view": {
                click: this.onButtonView_Click
            },
            'sipas_internal_masuk_agenda_transfer_popup triggerfield[name=surat_nomor]': {
                triggerclick: this.onInternalLookup_TriggerClick
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'transfer',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        }, config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = null,
            record = $this.createRecord(config.record);

        switch(config.mode)
        {
            case 'transfer' :
            view = $this.createView((function(c){
                c.readonlyComponents = [];
                c.requireComponents = [];
                c.removeComponents = [];
                c.removeComponents = ['sipas_com_surat_pane sipas_com_button_view'];
                // c.disableComponents = ['sipas_disposisi_session_prop sipas_disposisi_penerima_detail_form toolbar'];

                // if(c.mode === 'asistensi') {
                //     c.removeComponents.push('sipas_disposisi_session_prop sipas_disposisi_penerima_detail_form toolbar');
                // }
                
                return c;
            })(config));
            
            view.show();

            $helper.hideComponent({
                parent: view,
                items: {
                    '#transferSukses': true,
                    '#btnMore': true
                }
            });
            break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
        return view;  
    },

    onMainview_Show: function(mainview){
        var $this = this,
            form = $this.getForm({root:mainview}),
            record = $this.createRecord(mainview.record);

        form.loadRecord(record);
        $this.doProfileRead(record, mainview);
        mainview.fireEvent('loadagenda', mainview);
    },

    onPrioritas_Change: function(textfield, newValue, oldValue, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:textfield}),
            cmpPrioritasTgl = $this.getCmpPrioritasTgl({root:mainview});

        if(newValue){
            Ext.Ajax.request({
                url: $this.getApi('prioritas_hari', {id: newValue}),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {},
                        tgl = Ext.Date.add(new Date(), Ext.Date.DAY, objres.hari);
                    cmpPrioritasTgl && cmpPrioritasTgl.setValue(tgl);
                },
                failure: function(response, options){}
            });
        }
    },

    doProfileRead: function(record, mainview){
        var $this = this,
            view = mainview || $this.getMainview(),
            cmp = $this.getCompPengirimImage({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%; width:48px; height:48px;'/>");
        if(!record) return;
        cmp.update(t.apply({
            url: Ext.String.urlAppend($this.getApi('profile_image', {
                id: record.get('surat_properti_pembuat_id')
            }))
        }));
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            // cmpJenis = $this.getCompJenisSurat({root:mainview}),
            // compPengirimSurat = $this.getCompPengirimSurat({root:mainview}),
            compDetailSurat = $this.getCompDetailSurat({root:mainview}),
            surat_nomor = record.get('surat_nomor');

        cmp.setLoading(true);
        if (surat_nomor === null || surat_nomor === ''){
            surat_nomor = '<span class="alternative">Tidak Ada Nomor Surat</span>';
        }

        compDetailSurat.setValue('<div class="cell-visual cell-visual-left">'+
            '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-mail-open grey-600-i"></i></div></div>'+
            '<div class="cell-text">'+
            '<div class="subtext bold">'+record.get('surat_perihal')+'</div>'+
            '<div class="subtext">'+record.getPengirim()+' - <span class="blue-700-i">'+surat_nomor+'</span></div>'+
            '<div class="supporttext supporttext-dark">'+record.getModelDisplay()+'</div>'+
            '</div>');
        cmp.setLoading(false);

        // cmp.form && cmp.form.loadRecord(record);
        // cmpJenis && cmpJenis.setValue('<span style="color:grey;">'+record.getModelDisplay()+'</span>');
        // compPengirimSurat && compPengirimSurat.setValue(record.getPengirim());
    },

    onSuratPembuatInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            compDetailPembuat = $this.getCompDetailPembuat({root:mainview});

        cmp.setLoading(true);
        compDetailPembuat.setValue('<div class="cell-visual cell-visual-left">'+
            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id='+record.get('pengarah_id')+'"></div>'+
            '<div class="cell-text">'+
            '<div class="subtext bold">'+record.get('pengarah_nama')+'</div>'+
            '<div class="supporttext supporttext-dark">'+record.get('pengarah_jabatan_nama')+' - '+record.get('pengarah_unit_nama')+'</div>'+
            '</div>');
        cmp.setLoading(false);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setValue(profile.staf_unit);
            }
        });
    },

    onInternalLookup_TriggerClick: function(triggerfield){
        var $this = this,
            app = $this.getApplication(),
            controllerImasukLookup = $this.getController($this.controllerImasukLookup);

        controllerImasukLookup.launch({
            multiselect: false,
            afterload: function(records, success, store, viewInstance, grid){
                var currentSelected = triggerfield.getHiddenValue();
                if(currentSelected){
                    grid.getSelectionModel().select([currentSelected]);
                }
            },
            callback: function(selection){
                $this.setSurat(selection[0], $this.getMainview({from:triggerfield}));
            }
        });
    },

    onButtonProcess_Click: function(button, e, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            $session= $app.getSession(),
            profile = $session.getProfile(),
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            cmpProses = $this.getCmpProses({root:view}),
            cmpTrfKe = $this.getCmpTransferKe({root:view}),
            cmpTrfSukses = $this.getCmpTransferSukses({root:view}),
            cmpInfoHasilTransfer = $this.getCmpInfoHasilTransfer({root:view}),
            // cmpInfoSuratHasilTransfer = $this.getCmpInfoSuratHasilTransfer({root:view}),

            record = form.getRecord(),
            recordKeluar = $this.createRecord(),
            cbBerkas = $this.getCbBerkas({root:view}),
            cbKorespondensi = $this.getCbKorespondensi({root:view}),
            txtAgenda = $this.getCmpAgenda({root:view}),
            surat_agenda = txtAgenda.getValue(),
            cmpUnit = $this.getCmpUnit({root:view}),
            surat_unit = cmpUnit.getValue(),
            cmpPrioritasTgl = $this.getCmpPrioritasTgl({root:view}),
            prioritas_tgl = cmpPrioritasTgl && cmpPrioritasTgl.getValue(),

            surat_arsip = null,
            surat_korespondensi = null,
            korespondensi_kode = null,
            surat_korespondensi_surat = null,
            arsip_id_old = record.get('surat_arsip'),

            tplHasilTransfer = new Ext.XTemplate(['<div class="subtext info">',
                                                    '<span class="badge badge-solid margin-right-4">',
                                                        '<i class="icon ion-md-checkmark"></i>',
                                                    '</span>',
                                                    'Surat berhasil ditransfer ke {unit_nama}',
                                                '</div>']),
            tplHasilTransferWithBerkas = new Ext.XTemplate(['<div class="subtext info">',
                                                                '<span class="badge badge-solid margin-right-4">',
                                                                    '<i class="icon ion-md-checkmark"></i>',
                                                                '</span>Surat berhasil ditransfer ke {unit_nama}',
                                                            '</div>',
                                                            '<div class="subtext info">',
                                                                '<span class="badge badge-solid margin-right-4">',
                                                                    '<i class="icon ion-md-checkmark"></i>',
                                                                '</span>',
                                                                'Berkas pada surat berhasil ditransfer',
                                                            '</div>']);

        korespondensi = cbKorespondensi.getValue();
        if(korespondensi === 1){
            surat_korespondensi = record.get('surat_korespondensi');
            korespondensi_kode = record.get('surat_korespondensi_nomor');
            surat_korespondensi_surat = record.get('surat_id');
        }

        recordKeluar.set({
            // 'surat_arsip'   : surat_arsip,
            'surat_unit'    : surat_unit,
            'surat_tanggal' : new Date(), 
            'surat_model'   : record.self.modelType().MODEL_KELUAR, 
            // 'surat_agenda'  : surat_agenda, 
            'surat_perihal' : record.get('surat_perihal'), 

            'jenis_id'          : record.get('surat_jenis'), 
            'surat_jenis'       : record.get('surat_jenis'), 
            'prioritas_id'      : record.get('surat_prioritas'), 
            'surat_prioritas'   : record.get('surat_prioritas'),
            'surat_prioritas_tgl': Ext.util.Format.date(prioritas_tgl, 'Y-m-d H:i:s'),
            'kelas_id'    : record.get('surat_kelas'), 
            'surat_kelas' : record.get('surat_kelas'), 
            'lokasi_id'         : record.get('surat_lokasi'), 
            'surat_lokasi'      : record.get('surat_lokasi'), 
            'media_id'          : record.get('surat_media'), 
            'surat_media'       : record.get('surat_media'), 

            'korespondensi_kode'        : korespondensi_kode,
            'surat_korespondensi'       : surat_korespondensi,
            'surat_korespondensi_surat' : surat_korespondensi_surat,
            'korespondensi_isinternal'  : 0,

            'surat_properti_buat_tgl'   : new Date(),
            'surat_properti_pembuat_id' : profile.staf_id,
            'surat_properti_pembuat_nama': profile.staf_nama
        });


        $helper.saveRecord({
            record: recordKeluar,
            message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ingin memulai transfer surat ke '+cmpUnit.rawValue+' ?',
            confirmTitle: 'Konfirmasi Transfer Surat',
            wait: true,
            waitTitle: 'Menyiapkan Surat',
            waitText: 'Harap Tunggu Sebentar',
            callback: function(success, record, response){
                view.setLoading(false);
                if(!success){
                    $helper.showMsg({success:false, message:'Gagal menyiapkan surat. Silahkan tutup dan ulangi lagi !'});
                    return;
                }
                if(success){
                    arsip = cbBerkas.getValue();
                    if(arsip){
                        $this.duplicateArsip(record.get('surat_arsip'), arsip_id_old, record.get('surat_id'), view);
                        $this.recordKeluar = record;
                        cmpTrfKe.setDisabled(true);
                        cmpInfoHasilTransfer.setValue(tplHasilTransferWithBerkas.apply({unit_nama:$this.recordKeluar.get('unit_nama')}));
                    }else{
                        $this.recordKeluar = record;
                        cmpTrfKe.setDisabled(true);
                        cmpInfoHasilTransfer.setValue(tplHasilTransfer.apply({unit_nama:$this.recordKeluar.get('unit_nama')}));
                    }
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#transferSukses': false
                        }
                    });
                }
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    duplicateArsip: function(arsip_id_new, arsip_id_old , surat_id, view){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper();

        Ext.Ajax.request({
            url: $this.getApi('duplicate'),
            params: {
                'arsip_id_new': arsip_id_new, /*assigned arsip*/
                'arsip_id_old': arsip_id_old, /*yang di-duplicate*/
                'surat_id' : surat_id /*id surat baru dgn arsip baru*/
            },
            success: function(response, eOpts){
                // $helper.showMsg({success:true, message: $this.getMessage('transferSucces')});
                $helper.disableComponent({
                    parent: view,
                    items: {
                        '#hasilSurat': false
                    }
                }); 
            },
            failure: function(response, eOpts){
                // $helper.showMsg({success:false, message:$this.getMessage('transferFailure')});
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            record = $this.recordKeluar;
            controllerKeluarProp = $this.getController($this.controllerKeluarProp);

        controllerKeluarProp.launch({
            propType: 'keluar',
            model: record.self.modelType().MODEL_KELUAR,
            mode:'edit',
            unit: record.get('surat_unit'),
            record: record,
            callback: function(success, record){
                view.close();
            }
        });
    },

    setSurat: function(surat, view){
        if(!view) return;
        if(surat){
            var $this = this,
                form = $this.getForm({root:view});
            
            form.loadRecord(surat);
            // $this.fetchSuratMasuk(surat_draft, view);
            // $this.getLastPenyetuju(surat_draft, view);
        }
    },

    onMainview_LoadAgenda: function(view, e, eOpts){
        var $this = this,
            cmpAgenda = $this.getCmpAgenda({root:view});

        Ext.Ajax.request({
            url: this.getApi('next_agenda'),
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText, true) || {};
                cmpAgenda.setValue(res.next);
                
            }
        });
    },

    onMainview_LoadKode: function(view, e, eOpts){
        var $this = this,
            cmpNomor = $this.getCmpNomor({root: view});

        Ext.Ajax.request({
            url: this.getApi('next_kode'),
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText, true) || {};
                cmpNomor.setValue(res.next);
                
            }
        });
    }
});