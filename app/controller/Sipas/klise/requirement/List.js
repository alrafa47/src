Ext.define('SIPAS.controller.Sipas.klise.requirement.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.klise.requirement.List'
    ],
    
    views: [
        'Sipas.klise.requirement.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_klise_requirement_list' }
    ],

    init: function(application) {
        this.control({
            "sipas_klise_requirement_list":{
                loaddata: this.onMainview_LoadData,
                runadd: this.onMainview_RunAdd,
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown,
                edit: this.onMainview_Edit
            },
            "sipas_klise_requirement_list toolbar button[action]": {
                click: this.onButtonPlus_Click
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);
        return view;
    },

    onMainview_LoadData: function(view, data, e, eOpts){
        view.getStore().loadData(data);
    },

    onMainview_RunAdd: function(view, e, eOpts){
        var added = view.getStore().add({});
        view.getPlugin('roweditor').startEdit(added[0]);
    },

    onMainview_Edit: function(editor, e){
        e.record.commit();
    },

    onMainview_RunDelete: function(view, record, row, item, e){
        view.getStore().removeAt(record);
    },

    onMainview_RunMoveUp: function(view, record, row, item, e){
        var $this = this,
            store = $this.getMainview().getStore(),
            editor = $this.getMainview().getPlugin('roweditor'),
            editorStatus = editor.disabled,
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == 0) return;

        editor.disable();
        store.removeAt(record);
        store.insert(record-1,getRecord);
        editor.disabled = editorStatus;
    },

    onMainview_RunMoveDown: function(view, record, row, item, e){
        var $this = this,
            store = $this.getMainview().getStore(),
            editor = $this.getMainview().getPlugin('roweditor'),
            editorStatus = editor.disabled,
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == (store.getCount() - 1)) return;

        editor.disable();
        store.removeAt(record);
        store.insert(record+1,getRecord);
        editor.disabled = editorStatus;
    },

    onButtonPlus_Click: function(component, e, eOpts){
        var view = this.getMainview({from:component});
        view && view.fireEvent(component.action, view, e, eOpts);
    }
});