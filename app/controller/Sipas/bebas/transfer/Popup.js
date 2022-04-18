Ext.define('SIPAS.controller.Sipas.bebas.transfer.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },
    
    views: [
        'Sipas.bebas.transfer.Popup'
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
        duplicate     : 'server.php/sipas/dokumen/duplicate',
        transfer      : 'server.php/sipas/surat/createImport',
        next_agenda   : 'server.php/sipas/surat_keluar/next/agenda',
        next_kode     : 'server.php/sipas/surat_keluar/next/kode'
    },

    refs: [
        { ref: 'mainview',          selector: 'sipas_bebas_transfer_popup' },
        { ref: 'arsip',             selector: 'sipas_bebas_transfer_popup [name=arsip_nama]' },
        { ref: 'form',              selector: 'sipas_bebas_transfer_popup form' },
        { ref: 'cmpDetailTransfer', selector: 'sipas_bebas_transfer_popup form #detailTransfer' },
        { ref: 'txtHasilTransfer',  selector: 'sipas_bebas_transfer_popup form #txtHasilTransfer' }
    ],

    viewViewer: 'Sipas.Viewer',
    
    controllerArsip: 'Sipas.arsip.Lookup',
    controllerKeluarProp: 'Sipas.keluar.agenda.Prop',

    modelSurat: 'Sipas.Surat',

    recordDup : null,
    recordBerkas : null,

    init: function(application) {
        this.control({
            "sipas_bebas_transfer_popup":{
                show: this.onMainview_Show
            },
            "sipas_bebas_transfer_popup form sipas_com_button_process": {
                click: this.onButtonProcess_Click
            },
            "sipas_bebas_transfer_popup form sipas_com_button_view": {
                click: this.onButtonView_Click
            },
            'sipas_bebas_transfer_popup triggerfield[name=arsip_nama]': {
                triggerclick: this.onArsipLookup_TriggerClick
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'view',
            record: null,
            model: null,
            propType: null,
            unit: null,
            tipe: null,
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

                view = $this.createView(config);
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#hasilTransfer': true
                    }
                });

                view.show();

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
    },

    onArsipLookup_TriggerClick: function(triggerfield){
        var $this = this,
            app = $this.getApplication(),
            session = app.getSession(),
            controllerArsip = $this.getController($this.controllerArsip);

        controllerArsip.launch({
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
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            arsip = $this.getArsip({root:view}).getValue(),
            cmpDetailTransfer = $this.getCmpDetailTransfer({root:view}),
            txtHasilTransfer = $this.getTxtHasilTransfer({root:view}),
            model = view.model,
            unit = view.unit,
            tipe = view.tipe,
            record = form.getRecord(),
            recordDup = $this.createRecord(),
            tpl = new Ext.XTemplate(['<div class="subtext info">',
                                        '<span class="badge badge-solid margin-right-4">',
                                            '<i class="icon ion-md-checkmark"></i>',
                                        '</span>{template}',
                                    '</div>']);

        if(!arsip){
            $helper.showMsg({success:false, message:$this.messages['transferEmpty']});
            return;
        }

        view.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('transfer'),
            params: {
                'arsip' : record.getId(),
                'surat_model'   : model,
                'surat_unit'    : unit,
                'surat_itipe'   : tipe
            },
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText),
                    success = res.success;
                view.setLoading(false);
                if(!success){
                    $helper.showMsg({success:false, message:$this.messages['transferFailure']});
                    return;
                }
                if(success){
                    $this.recordDup = res.data;
                    $helper.showMsg({success:true, message:$this.messages['transferSucces']});
                    cmpDetailTransfer.setDisabled(true);
                    $helper.hideComponent({
                        parent: view,
                        items: {
                            '#hasilTransfer': false
                        }
                    });
                    txtHasilTransfer.setValue(tpl.apply({template:'Arsip berhasil ditransfer'}));
                }
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            record = $this.recordDup;
            controllerKeluarProp = $this.getController($this.controllerKeluarProp);

        controllerKeluarProp.launch({
            propType: view.propType,
            model: view.model,
            mode:'edit',
            unit: record.surat_unit,
            record: record
        });
        view.close();
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