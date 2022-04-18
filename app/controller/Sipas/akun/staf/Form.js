Ext.define('SIPAS.controller.Sipas.akun.staf.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.akun.staf.List'
    ],
    
    views: [
        'Sipas.akun.staf.Form'
    ],

    stores: [
        'Sipas.akun.staf.List',
        'Sipas.akun.staf.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_akun_staf_form' },
        { ref: 'grid',      selector: 'sipas_akun_staf_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui']
    },

    init: function(application) {
        this.control({
            'sipas_akun_staf_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            },
            'sipas_akun_staf_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onMainview_LoadRecord: function(record, form){
        var grid = this.getGrid({root:form}),
            store = grid.getStore(),
            newStore = record.fetchStaf();

        grid.reconfigure(newStore);
        newStore.load({
            callback: function(records, operation, success){
            }
        });        
    },

    onMainview_ClearRecord: function(form, unbind){
        var grid = this.getGrid({root:form}),
            newStore = this.getStore(this.stores[0]);

        grid.reconfigure(newStore);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $helper = this.getApplication().Helper(),
            checkSession = this.getApplication().getSession().getResetSession(),
            mainview = this.getMainview({from:button}),
            grid = this.getGrid({root:mainview}),
            message_success = this.getMessage('message_success'),
            store = grid.getStore(),
            isdefault = [];

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }

        store.each(function(r){
            if(r.get('staf_akun_isdefault')){
                isdefault.push(r.get('staf_asli_id'));
            }
        });

        var length = isdefault.length;

        if(length > 1){
            $helper.showMessage({success: false, message: 'Pilihan pegawai utama tidak boleh lebih dari 1.'});
        }else{
            grid.setLoading(true);
            $helper.showConfirm({
                confirmTitle: 'Simpan Perubahan',
                confirmText : 'Apakah anda yakin ?',
                callback: function(button){
                    if(button == 'yes'){
                        store.sync({
                            callback: function(success, response){
                                var record = Ext.decode(response.responseText, true);
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                                grid.setLoading(false);
                                store.reload();
                            },
                            success: function(){
                                grid.setLoading(false);
                                $helper.showMessage({success: true, message: message_success});
                            }
                        });
                    } else {
                        grid.setLoading(false);
                    }
                }
            });
        }
    }

})