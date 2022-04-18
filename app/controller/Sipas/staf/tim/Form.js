Ext.define('SIPAS.controller.Sipas.staf.tim.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        'Sipas.staf.tim.Form'
    ],

    stores: [
        'Sipas.staf.tim.anggota.tim.List',
        'Sipas.staf.tim.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_tim_form' },
        { ref: 'grid',      selector: 'sipas_staf_tim_form grid' }
    ],

    init: function(application) {
        this.control({
            'sipas_staf_tim_form': {
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
            newStore = record.fetchTim();

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