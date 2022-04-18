Ext.define('SIPAS.controller.Sipas.sla.unit.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sla.unit.List'
    ],
    
    views: [
        'Sipas.sla.unit.Form'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_sla_unit_form' },
        { ref: 'grid', selector: 'sipas_sla_unit_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' Data berhasil diperbarui'],
        'receiver_empty': 'SLA Default Tidak Boleh Lebih Dari 1'
    },

    init: function(application) {
        this.control({
            'sipas_sla_unit_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            }
            // 'sipas_sla_unit_form sipas_com_button_save': {
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
            newStore = record.fetchSLAUnit();

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

    // onButtonSave_Click: function(button, e, eOpts){
    //     var mainview = this.getMainview({from:button}),
    //         grid = this.getGrid({root:mainview}),
    //         helper = this.getApplication().Helper(),
    //         store = grid.getStore(),
    //         temporary= 1,
    //         message_success = this.getMessage('message_success'),
    //         params = {
    //             'temporary' : 0
    //         };

    //     store.each(function(r){
    //         if(r.get('sla_unit_default')){
    //             params['temporary'] += 1;     
    //         }
    //     });
    //     if(params['temporary'] > 1){
    //         helper.showMsg({success:false, message:this.getMessage('receiver_empty')});
    //         return;
    //     }
    //     grid.setLoading(true);
    //     debugger;
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

});