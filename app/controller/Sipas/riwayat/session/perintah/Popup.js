Ext.define('SIPAS.controller.Sipas.riwayat.session.perintah.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.riwayat.session.perintah.Popup'
    ],

    models: [
        'Sipas.disposisi.perintah.Log'
    ],

    stores: [
        'Sipas.perintah.Combo'
    ],

    refs: [
        { ref: 'mainview',              selector: 'sipas_riwayat_session_perintah_popup' },
        { ref: 'form',                  selector: 'sipas_riwayat_session_perintah_popup > form' },
        { ref: 'perintahCombo',         selector: 'sipas_riwayat_session_perintah_popup > form combobox[name=disposisi_perintah_log_perintah]' },
        { ref: 'perintahPesan',         selector: 'sipas_riwayat_session_perintah_popup > form #textPerintah' }
    ],

    init: function(application) {
        this.control({
            'sipas_riwayat_session_perintah_popup': {
                show: this.onMainview_Show
            },
            'sipas_riwayat_session_perintah_popup sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_riwayat_session_perintah_popup [name=disposisi_perintah_log_perintah]': {
                loadassociate: this.onComboParent_LoadAssociate,
                focus: this.onComboParent_Focus,
                select: this.onComboPerintah_Select
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            id: null,
            perintah: null,
            pesan: null,
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $settings = $app.LocalSetting(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            view = null;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = ['#comPerintah'];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    c.hideComponent         = [];
                    return c;
                })(config));
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(view){
        var $this = this,
            $app = $this.getApplication(),
            form = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            record = $this.getModel($this.defaultModel || $this.models[0]).create({}),
            comPerintah = $this.getPerintahCombo({root:view}),
            comPesan = $this.getPerintahPesan({root:view});

        // if((view.mode == 'edit')) {
        //     view.setTitle($app.getGrammar('perintah_prop_ubah'));
        // }

        record.set({
            'disposisi_perintah_log_perintah' : view.perintah,
            'disposisi_perintah_log_pesan'    : view.pesan
        });
        form.loadRecord(record);
    },

    // parent
    onComboParent_LoadAssociate: function(record, form, cmp){
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        record.getPerintah(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {   
        if(!combobox) return false;
        var store = combobox && combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    },
    
    onComboPerintah_Select: function(combo, selection, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:combo}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            value = combo.getValue();

        record.set({
            'perintah_id'       : selection[0].get('perintah_id'),
            'perintah_nama'     : selection[0].get('perintah_nama'),
            'perintah_kode'     : selection[0].get('perintah_kode')
        });
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            comPesan = $this.getPerintahPesan({root:view}),
            comPerintah = $this.getPerintahCombo({root:view}),
            pesan = comPesan.getValue() ? comPesan.getValue() : null,
            record = form && form.updateRecord().getRecord();

        if (comPerintah.getValue() == view.perintah && pesan == view.pesan){
            $helper.showMsg({success: false, message: 'Tidak Ada Perubahan'});
            return;
        }

        record.set({
            'disposisi_perintah_log_disposisi': view.id,
            'disposisi_perintah_log_tgl': new Date()
        })

        if (!comPerintah.getValue()){
            $helper.showMsg({success: false, message: 'Anda belum memilih arahan'});
        } else {
            if(!record) return;
            $helper.showConfirm({
                confirmTitle: 'Konfirmasi Beri Arahan',
                confirmText : 'Apakah anda yakin memberi arahan ?',
                callback: function(button){
                    if(button == 'yes'){
                        view.setLoading(true);
                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            message: true,
                            callback: function(success, record, eOpts){
                                record.set({
                                    'perintah_nama' : comPerintah.valueModels[0].data.perintah_nama
                                });
                                
                                view.setLoading(false);
                                if(success){
                                    view.close();
                                    Ext.callback(view.callback, view, [true, record, eOpts]);
                                }
                            }
                        });
                    }
                }
            });
        }
    }
});