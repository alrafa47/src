Ext.define('SIPAS.controller.Sipas.surat.agenda.korespondensi.atur.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',
    
    views: [
        'Sipas.surat.agenda.korespondensi.atur.Popup'
    ],

    models: [
        'Sipas.Surat'
    ],

    refs : [
        { ref: 'mainview',              selector: 'sipas_surat_agenda_korespondensi_atur_popup' },
        { ref: 'form',                  selector: 'sipas_surat_agenda_korespondensi_atur_popup form' },
        { ref: 'hiddenfield',           selector: 'sipas_surat_agenda_korespondensi_atur_popup form [name=surat_korespondensi_surat]' },
        { ref: 'txtKoresp',             selector: 'sipas_surat_agenda_korespondensi_atur_popup form [name=surat_korespondensi]' },
        { ref: 'txtNomor',              selector: 'sipas_surat_agenda_korespondensi_atur_popup form [name=surat_induk_nomor]' },
        { ref: 'txtSurat',              selector: 'sipas_surat_agenda_korespondensi_atur_popup form #infoSurat' },
        { ref: 'txtReferensiSurat',     selector: 'sipas_surat_agenda_korespondensi_atur_popup form #infoReferensiSurat' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },
    
    api: {
        'aturKorespondensi' : 'server.php/sipas/korespondensi/reSetting'
    },

    defaultModel: 'Sipas.Surat',
    controllerHelper: 'Sipas.Helper',
    controllerLookupSuratKeluar : 'Sipas.keluar.agenda.Lookup',
    controllerLookupSuratMasuk  : 'Sipas.masuk.agenda.Lookup',
    controllerLookupSuratIMasuk : 'Sipas.internal.masuk.agenda.Lookup',
    // controllerLookupSuratIKeluar : 'Sipas.internal.masuk.agenda.Lookup',
    
    init: function(application) {
        this.control({
            'sipas_surat_agenda_korespondensi_atur_popup': {
                show: this.onMainview_Show
            },
            'sipas_surat_agenda_korespondensi_atur_popup #pilihKorespondensi': {
                click: this.onButtonPilih_Click
            },
            "sipas_surat_agenda_korespondensi_atur_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
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
            record = $this.createRecord(config.record),
            view = null;

        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = ['[name=surat_induk_nomor]', '[name=korespondensi_pengirim]', 
                    '[name=korespondensi_penerima]', '[name=korespondensi_perihal]', '[name=korespondensi_nomor]'];
                    c.requireComponents = [];
                    c.removeComponents = [];

                    return c;
                })(config));
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#fieldContainer': true
                    }
                });
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            form = $this.getForm({root:mainview}),
            txtNomor =$this.getTxtNomor({root:mainview}),
            record = mainview.record;

        form && form.loadRecord(record);
        
        if(txtNomor.getValue() === ''){
            txtNomor && txtNomor.setValue(record.get('surat_nomor'));
        }
        $this.renderThumbInfo(mainview, record, false);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from: button}),
            form = $this.getForm({root: mainview}),
            surat_id = $this.getHiddenfield({root:mainview}),
            surat_korespondensi = $this.getTxtKoresp({root:mainview}),
            record = mainview.record;

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    mainview.setLoading(true);
                    Ext.Ajax.request({
                        url: $this.getApi('aturKorespondensi'),
                        params: {
                            id: record.getId(),
                            surat_id: surat_id.getValue(),
                            surat_korespondensi: surat_korespondensi.getValue(),
                            log: 13
                        },
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText, true);
                            mainview.setLoading(false);
                            mainview.close();
                            record.reload();
                            Ext.callback(mainview.callback, mainview, [true, record, eOpts]);
                            $helper.showMsg({success: true, message: res.message});
                        },
                        failure: function(response, eOpts){
                            var res = Ext.decode(response.responseText, true);
                            mainview.setLoading(false);
                            mainview.close();
                            // Ext.callback(mainview.callback, mainview, [true, record, eOpts]);
                            $helper.showMsg({success: false, message: res.message});
                        }
                    });
                }
            }
        });
    },

    onButtonPilih_Click: function(button, e, eOpts)
    {
        var $this = this,
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            modelSurat = $this.getModel($this.models[0]),
            record = mainview.record;

        switch(record.get('surat_model')){
            case 1:
                controllerLookup = $this.getController($this.controllerLookupSuratKeluar); 
            break;
            case 2:
                controllerLookup = $this.getController($this.controllerLookupSuratMasuk);
            break;
            case 4:
                controllerLookup = $this.getController($this.controllerLookupSuratIMasuk);
            break;
        }
    
        controllerLookup.launch({
            multiselect: false,
            afterload: function(records, success, store, viewInstance, grid){
               
            },
            callback: function(selection){
                $this.setKorespondensi(selection[0], form);
                $this.renderThumbInfo(mainview, selection[0], true);
            }
        });
    },

    setKorespondensi: function(surat, form){
        var hiddenfield = form.down('[name=surat_korespondensi_surat]'),
            surat_nomor = form.down('[name=surat_induk_nomor]'),
            pengirim = form.down('[name=korespondensi_pengirim]'),
            surat_korespondensi = form.down('[name=surat_korespondensi]'),
            penerima = form.down('[name=korespondensi_penerima]'),
            korespondensi_nomor = form.down('[name=korespondensi_nomor]'),
            surat_perihal = form.down('[name=korespondensi_perihal]');

        hiddenfield && hiddenfield.setValue(surat && surat.get('surat_id'));
        surat_nomor && surat_nomor.setValue(surat && surat.get('surat_nomor'));
        surat_korespondensi && surat_korespondensi.setValue(surat && surat.get('surat_korespondensi'));
        pengirim && pengirim.setValue(surat && surat.get('surat_pengirim'));
        penerima && penerima.setValue(surat && surat.get('surat_tujuan'));
        korespondensi_nomor && korespondensi_nomor.setValue(surat && surat.get('korespondensi_nomor'));
        surat_perihal && surat_perihal.setValue(surat && surat.get('korespondensi_perihal'));
    },

    renderThumbInfo: function(mainview, record, renderOnlyRef){
        var $this = this,
            infoSurat = $this.getTxtSurat({root:mainview}),
            infoReferensiSurat = $this.getTxtReferensiSurat({root:mainview}),
            modelSurat = $this.getModel($this.models[0]),
            model = record.get('surat_model'),
            tplSurat1 = '',
            tplSurat2 = '';

            if (model === 1){
                tplSurat1 = modelSurat.renderSurat(record.get('surat_perihal'), record, 1);
            } else if (model === 2){
                tplSurat1 = modelSurat.renderSurat(record.get('surat_perihal'), record, 2);
            } else if (model === 3){
                tplSurat1 = modelSurat.renderSurat(record.get('surat_perihal'), record, 3);
            } else if (model === 4){
                tplSurat1 = modelSurat.renderSurat(record.get('surat_perihal'), record, 4);
            }

        if (!renderOnlyRef){
            record.getKorespondensiSurat(function(surat){
                var modelRef = surat.get('surat_model');
                if (modelRef == 1){
                    tplSurat2 = modelSurat.renderSurat(surat.get('surat_perihal'), surat, 1);
                } else if (modelRef == 2){
                    tplSurat2 = modelSurat.renderSurat(surat.get('surat_perihal'), surat, 2);
                } else if (modelRef == 3){
                    tplSurat2 = modelSurat.renderSurat(surat.get('surat_perihal'), surat, 3);
                } else if (modelRef == 4){
                    tplSurat2 = modelSurat.renderSurat(surat.get('surat_perihal'), surat, 4);
                }
            });
            infoSurat.setValue(tplSurat1);
            infoReferensiSurat.setValue(tplSurat2);
        } else {
            infoReferensiSurat.setValue(tplSurat1);
        }
    }
});