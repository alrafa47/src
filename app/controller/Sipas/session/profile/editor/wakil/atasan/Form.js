Ext.define('SIPAS.controller.Sipas.session.profile.editor.wakil.atasan.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.session.profile.editor.wakil.atasan.List'
    ],
    
    views: [
        'Sipas.session.profile.editor.wakil.atasan.Form'
    ],

    stores: [
        'Sipas.jabatan.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_session_profile_editor_wakil_atasan_form' },
        { ref: 'grid',      selector: 'sipas_session_profile_editor_wakil_atasan_form grid' }
    ],

    init: function(application) {
        this.control({
            'sipas_session_profile_editor_wakil_atasan_form': {
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
            newStore = record.fetchAtasan();

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