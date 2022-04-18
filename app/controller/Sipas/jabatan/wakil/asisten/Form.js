Ext.define('SIPAS.controller.Sipas.jabatan.wakil.asisten.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jabatan.wakil.asisten.List'
    ],
    
    views: [
        'Sipas.jabatan.wakil.asisten.Form'
    ],

    stores: [
        'Sipas.jabatan.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_jabatan_wakil_asisten_form' },
        { ref: 'grid',      selector: 'sipas_jabatan_wakil_asisten_form grid' }
    ],

    // messages: {
    //     'message_success': ['Berhasil',' data berhasil diperbarui']
    // },

    init: function(application) {
        this.control({
            'sipas_jabatan_wakil_asisten_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
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
            newStore = record.fetchAsistensi();

        grid.reconfigure(newStore);
        newStore.load({
            callback: function(){
                newStore.each(function(record){
                });
            }
        });
    },

    onMainview_ClearRecord: function(form, unbind){
        var grid = this.getGrid({root:form}),
            newStore = this.getStore(this.stores[0]);

        newStore.removeAll();
        grid.reconfigure(newStore);
    }

})