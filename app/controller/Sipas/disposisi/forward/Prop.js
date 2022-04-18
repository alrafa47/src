Ext.define('SIPAS.controller.Sipas.disposisi.forward.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.forward.Form'
    ],

    views: [
        'Sipas.disposisi.forward.Prop'
    ],

    models: [
        'Sipas.Disposisi'
    ],

    messages: {
        'receiver_exist': ['Staf dengan Nama:{id} sudah masuk dalam daftar']
    },

    refs : [
        { ref: 'mainview',      selector: 'sipas_disposisi_forward_prop' },
        { ref: 'form',          selector: 'sipas_disposisi_forward_prop > form' },
        { ref: 'listPenerima',  selector: 'sipas_disposisi_forward_prop > form sipas_disposisi_forward_penerima_list' },
        { ref: 'mode',          selector: 'sipas_disposisi_forward_prop > form #mode' },
        { ref: 'treepanel',     selector: 'sipas_disposisi_forward_prop > treepanel'},
        { ref: 'containerArsip',selector: 'sipas_disposisi_forward_prop > form sipas_arsip_pane'}
    ],

    defaultModel: 'Sipas.Disposisi',
    controllerTree: 'Sipas.disposisi.referensi.Treelist',

    refChild: 'disposisi_penerima_id',
    refParent: 'disposisi_induk',
    refSuratId: 'disposisi_surat',
    controllerStafLookup: 'Sipas.staf.penerima.disposisi.Lookup',
    
    init: function(application) {
        this.control({
            'sipas_disposisi_forward_prop > form sipas_arsip_pane': {
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_disposisi_forward_prop': {
                show: this.onMainview_Show,
                close: this.onMainview_Close,
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord,
                loadpenerima : this.onMainview_LoadPenerimaList
            },
            'sipas_disposisi_forward_prop > form': {
                loadrecord: this.onForm_LoadRecord,
                clearrecord: this.onForm_ClearRecord,
                recordsaved: this.onForm_Saved
            },
            'sipas_disposisi_forward_prop sipas_disposisi_forward_form #radioDisposisi': {
                change: this.onRadioButtonDisposisi_Change
            },
            'sipas_disposisi_forward_prop sipas_disposisi_forward_form sipas_disposisi_forward_penerima_list sipas_com_button_plus': {
                click: this.onButtonTambahPenerima_Click
            },
            'sipas_disposisi_forward_prop sipas_disposisi_forward_form #radioNota': {
                change: this.onRadioButtonNota_Change
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'forward',
            callback: Ext.emptyFn,
            record: this.getModel(this.defaultModel || this.models[0]).create({}),
            selfAsPenerima: config.selfAsPenerima,
            scope: this
        },config);

        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            view = null;

        switch(config.mode)
        {
            case 'disposisi' :
            case 'forward' :
            case 'notadinas' :
            case 'suratinternal' :

                view = $this.createView((function(c){
                    c.readonlyComponents    = [];
                    c.requireComponents     = ['[name=disposisi_perintah]'];
                    c.removeComponents      = ['[action=link]','[action=sdoc]'];

                    if(c.mode == 'forward'){
                        c.removeComponents = ['sipas_surat_ekspedisi_trace_treelist']
                    }

                    if(c.mode == 'suratinternal'){
                        c.removeComponents = ['#containerPerintah', '#printDisposisi', 'sipas_com_button_refperdis']
                    }

                    return c;
                })(config));
                view.show();
                break;
            
            default:
                Ext.Msg.alert("Gagal", "Kata Kunci Salah");
        }
    },

    onArsip_LoadAssociate: function(record, form, cmp){
        var view = this.getMainview({from:cmp});

        cmp.setLoading(true);
        if(record){
            record.getSurat(function(surat){
                surat.getArsip(function(arsip){
                    cmp.setLoading(false);
                    if(arsip){
                        cmp.fireEvent('load', cmp, surat, arsip, surat.get('surat_israhasia'), 'add_disposisi', record.get('disposisi_staf'));
                    }
                });
            });
        }
    },

    onButtonTambahPenerima_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            grid = $this.getListPenerima({root:mainview}),
            storePenerima = grid.getStore(),
            controllerLookup = $this.getController($this.controllerStafLookup);
        
        controllerLookup.launch({
            multiselect: true,
            record: mainview.record,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        $helper.showMsg({message:this.getMessage('receiver_exist', {id: selections[i].data.staf_nama})});
                    }
                }
            }
        })   
    },

    onMainview_Show: function(view){
        var $this = this,
            $app = this.getApplication(),
            $helper = $this.getApplication().Helper(),
            record = view.record || this.getModel(this.defaultModel || this.models[0]).create({}),
            recordInternal = view.selfAsPenerima,
            form = $this.getForm({root:view}),
            list = $this.getListPenerima({root:view}),
            setMode = $this.getMode({root:view});

        form.model_sub = $app.getGrammar('disposisi_masuk_forward_popup_disposisi');
        form.loadRecord(record);
    },

    onRadioButtonDisposisi_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            $app    = this.getApplication(),
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view});
        
        if(newValue){
            view.setTitle($app.getGrammar('disposisi_masuk_forward_popup_disposisi'));
            form.model_sub = $app.getGrammar('disposisi_masuk_forward_popup_disposisi');
        }

    },

    onRadioButtonNota_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            $app    = this.getApplication(),
            view    = view || $this.getMainview(),
            form    = $this.getForm({root:view});
        
        if(newValue){
            view.setTitle($app.getGrammar('disposisi_masuk_forward_popup_notadinas'));
            form.model_sub = $app.getGrammar('disposisi_masuk_forward_popup_notadinas');
        }

    },

    onMainview_Close: function(mainview){
        var form = this.getForm({root:mainview}),
            record = form.getRecord();

        record && record.reject();
        // Ext.callback(mainview.callback, mainview.scope);
    },

    onMainview_LoadRecord: function(mainview, record){
        var treeview = this.getTreepanel({root:mainview});
        treeview && treeview.fireEvent('loadrecord', treeview, record);
    },

    onMainview_ClearRecord: function(mainview, unbind){
        var treeview = this.getTreepanel({root:mainview});
        treeview && treeview.fireEvent('clearrecord', treeview, unbind);  
    },

    onForm_LoadRecord: function(record, form){
        var mainview = this.getMainview({from:form});
        mainview && mainview.fireEvent('loadrecord', mainview, record);
    },

    onForm_ClearRecord: function(form, unbind){
        var mainview = this.getMainview();
        mainview && mainview.fireEvent('clearrecord', mainview, unbind);
    },

    onForm_Saved: function(form){
        var mainview = this.getMainview({from:form}),
            checkSession = this.getApplication().getSession().getResetSession();
        mainview && mainview.close();
        Ext.callback(mainview.callback, mainview.scope);
    },

    onMainview_LoadPenerimaList: function(record, list){ /*onprogess*/
        var $this = this,
            storePenerima = list.getStore() || $this.getListPenerima().getStore(),
            store = record.fetchInternalUnitStaf();    

        storePenerima.removeAll();
        store.load(function(){
            store.each(function(record){
                record.getStaf(function(staf){
                    var find = storePenerima.findRecord('staf_id', staf.get('staf_id'));
                    if(!find){
                        storePenerima.addSorted(staf);
                    }
                });
            });
        });
    }
});