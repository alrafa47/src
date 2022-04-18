Ext.define('SIPAS.controller.Sipas.sla.rumus.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.sla.rumus.List'
    ],

    models: [
        'Sipas.sla.Rumus'
    ],
    
    stores:[
        'Sipas.sla.rumus.List'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_sla_rumus_list' }
    ],

    init: function(application){
        this.control({
            'sipas_sla_rumus_list':{
                runadd: this.onMainview_RunAdd,
                // rundelete: this.onMainview_RunDelete,
                edit: this.onMainview_Edit,
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown
            },
            'sipas_sla_rumus_list toolbar button[action]': {
                click: this.onButtonAction_Click
            }
        });
    },

    launch: function(config) {
        var $this   = this,
            $app    = $this.getApplication(),
            $session    = $app.getSession(),
            $helper     = $this.getApplication().Helper(),
            reference   = config.reference,
            storeStaf   = $this.getStore($this.storePenyetuju),
            sessionId   = $session.getProfileId(),
            view    = $this.createView(config);

        return view;
    },

    onMainview_RunAdd: function(view, e, eOpts){
        var store = view.getStore(),
            grid = view;

        store.insert(0, {});
        grid.editingPlugin.startEdit(
            store.getAt(0), grid.columns[0]
        );
    },

    onMainview_Edit: function(editor, e){
        e.record.commit();
    },

    // onMainview_RunDelete: function(view, record, row, item, e){
    //     var store = view.getStore();
    //         record = view.getSelectionModel().getSelection()[0];

    //     store.remove(record);
    // },

    onButtonAction_Click: function(component, e, eOpts){
        var view = this.getMainview({from:component});
        view && view.fireEvent(component.action, view, e, eOpts);
    },

    onMainview_RunDelete: function (view, record, row, item, e){
        var $this = this,
            store = view.getStore(),
            getRecord = store.getAt(record);
        
        store.removeAt(record);
        view.refresh();
    },

    onMainview_RunMoveUp: function(view, record, row, item, e){
        var $this = this,
            store = view.getStore(),
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == 0) return;

        store.removeAt(record);
        store.insert(record-1,getRecord);
    },

    onMainview_RunMoveDown: function(view, record, row, item, e){
        var $this = this,
            store = view.getStore(),
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == (store.getCount() - 1)) return;

        store.removeAt(record);
        store.insert(record+1,getRecord);
    }
   
});