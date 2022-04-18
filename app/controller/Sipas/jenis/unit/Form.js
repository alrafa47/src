Ext.define('SIPAS.controller.Sipas.jenis.unit.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jenis.unit.List'
    ],
    
    views: [
        'Sipas.jenis.unit.Form'
    ],

    stores: [
        'Sipas.jenis.unit.List',
        'Sipas.jenis.unit.Combo'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_jenis_unit_form' },
        { ref: 'grid', selector: 'sipas_jenis_unit_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' Data berhasil diperbarui']
    },

    init: function(application) {
        this.control({
            'sipas_jenis_unit_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            }
            // 'sipas_jenis_unit_form sipas_com_button_save': {
            //     click: this.onButtonSave_Click
            // }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onMainview_LoadRecord: function(record, form){
        var grid = this.getGrid({root:form}),
            newStore = record.fetchUnit();

        grid.reconfigure(newStore);
        newStore.load({
            // callback: function(){
            //     newStore.each(function(record){
            //     });
            // }
        });
    },

    onMainview_ClearRecord: function(form, unbind){
        var grid = this.getGrid({root:form}),
            newStore = this.getStore(this.stores[0]);

        newStore.removeAll();
        grid.reconfigure(newStore);
    }

    // onButtonSave_Click: function(button, e, eOpts){
    //     var mainview = this.getMainview({from:button}),
    //         grid = this.getGrid({root:mainview}),
    //         helper = this.getApplication().Helper(),
    //         store = grid.getStore(),
    //         message_success = this.getMessage('message_success');
        
    //     grid.setLoading(true);
    //     store.sync({
    //         callback: function(success, record, eOpts){
    //             grid.setLoading(false);
    //             store.reload();
    //         },
    //         success: function(){
    //             helper.showMessage({success: true, message: message_success});
    //         }
    //     });
    // }

})