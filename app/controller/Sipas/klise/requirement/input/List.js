Ext.define('SIPAS.controller.Sipas.klise.requirement.input.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.klise.requirement.input.List'
    ],
    views: [
        'Sipas.klise.requirement.input.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_klise_requirement_input_list' }
    ],

    init: function(application) {
        this.control({
            "sipas_klise_requirement_input_list":{
                edit: this.onMainview_Edit,
                beforeedit: this.onMainview_BeforeEdit
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);
        return view;
    },

    onMainview_BeforeEdit: function(editor, e, eOpts){
        e.cancel = editor.disabled
    },

    onMainview_Edit: function(editor, e){
        e.record.commit();
    }
    
});