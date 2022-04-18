Ext.define('SIPAS.controller.Sipas.jabatan.tim.anggota.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jabatan.tim.anggota.List'
    ],
    
    views: [
        'Sipas.jabatan.tim.anggota.Form'
    ],

    stores: [
        'Sipas.jabatan.tim.anggota.List',
        'Sipas.jabatan.tim.anggota.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_jabatan_tim_anggota_form' },
        { ref: 'grid',      selector: 'sipas_jabatan_tim_anggota_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui']
    },

    init: function(application) {
        this.control({
            'sipas_jabatan_tim_anggota_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            },
            'sipas_jabatan_tim_anggota_form sipas_com_button_save': {
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
            newStore = record.fetchAnggota();

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
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:button}),
            grid = $this.getGrid({root:mainview}),
            message_success = $this.getMessage('message_success'),
            store = grid.getStore();
            
        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        grid.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(){
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

})