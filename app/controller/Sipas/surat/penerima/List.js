Ext.define('SIPAS.controller.Sipas.surat.penerima.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.surat.penerima.List'
    ],

    models: [
        'Sipas.Staf'
    ],

    stores:[
        'Sipas.surat.penerima.List'
    ],

    messages: {
        'receiver_exist': ['Info','Staf dengan nama {id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_surat_penerima_list' }
        // { ref: 'form',     selector: 'sipas_surat_penerima_list > form' },
    ],

    defaultModel: 'Sipas.disposisi.Masuk',

    controllerLookupPenerima: 'Sipas.staf.penerima.Lookup',

    storePenerima: 'Sipas.surat.penerima.List',

    init: function(application){
        this.control({
            'sipas_surat_penerima_list': {
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown
            },
            // 'sipas_surat_penerima_list sipas_com_button_add': {
            //     click: this.onButtonAdd_Click
            // },
            'sipas_surat_penerima_list grid': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_surat_penerima_list checkcolumn': {
                checkchange: this.onCheckColumn_CheckChange
            }
        });
    },

    launch: function(config) {
        var $this =         this,
            $app =          $this.getApplication(),
            $session =      $app.getSession(),
            $helper =       $this.getApplication().Helper(),
            reference =     config.reference,
            storeStaf =  $this.getStore($this.storePenerima),
            sessionId =     $session.getProfileId(),
            view =          $this.createView(config);

        return view;
    },

    onGridpanel_Load: function(grid, record){
        var load = function(r){
            var s = r.fetchPenerima(); // assume record is Surat
            grid.reconfigure(s);

            s.reload({
                callback: function(){
                } 
            });
        }

        if(record && record.isModel){
            load(record);
        }else{
            this.getModel('Sipas.Surat').load(record, {
                callback: function(r){
                    load(r);
                }
            });
        }
    },

    // onButtonAdd_Click: function(button, e, eOpts){
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         storePenerima = $this.getStore($this.storePenerima),
    //         controllerLookup = $this.getController($this.controllerLookupPenerima);

    //     controllerLookup.launch({
    //         multiselect: true,
    //         callback:function(selections){
    //             for(var i in selections){
    //                 var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
    //                 if(!find){
    //                     storePenerima.add(selections[i].data);
    //                 }else{
    //                     var msg = $this.getMessage('receiver_exits',{id: selections[i].data.staf_id});
    //                     $helper.showNotification(msg[0],msg[1]);
    //                 }
    //             }
    //         }
    //     })
    // },

    onGridpanel_SelectionChange: function(model, Selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_add', 'sipas_com_button_delete', 'sipas_com_button_action']
        });
    },

    onMainview_RunDelete: function (view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            store = view.getStore(),
            mainview = $this.getMainview({from:view}),
            form = view.up('form'),
            recordsurat = form && form.updateRecord().getRecord(),
            model = recordsurat.get('surat_model');

        if(record.get('surat_stack_status_tgl') && record.get('surat_setuju') !== "4"){
            return;
        }
        store.removeAt(rowIdx);

        var records = Ext.Array.clone(store.data.items);
        Ext.Array.forEach(records, function(value, key) {
          value.index = key;
        });

        store.removeAll();
        Ext.Array.each(records, function(r){
            store.add(r);
        });

        if(model == 6) mainview.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+store.data.length+')</b>');
    },

    refresh: function(view) {
        var view = view || this.getMainview();
            $this = this;
            
        view.getStore().load({
            callback: function(record, operation, success){
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    },

    onCheckColumn_CheckChange: function(checkcolumn, rowIndex, checked, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:checkcolumn}), 
            store = mainview.getStore(),
            record = store.getAt(rowIndex),
            val = (checked)? 1 : 0;

        record.set(checkcolumn.dataIndex, val);
        record.commit();
    },

    onMainview_RunMoveUp: function(view, rowIdx, colIdx, item, e, record, row){        
        var store = view.getStore();

        if(rowIdx == 0) return;

        var prevIndex = rowIdx - 1,
            prevRecord = store.getAt(prevIndex);

        if((prevRecord.get('surat_stack_status_tgl') || record.get('surat_stack_status_tgl')) && record.get('surat_setuju') !== "4"){
            return;
        }

        store.removeAt(rowIdx);
        store.removeAt(prevIndex);

        record.index = prevIndex;
        store.insert(prevIndex, record);

        prevRecord.index = rowIdx;
        store.insert(rowIdx, prevRecord);
    },

    onMainview_RunMoveDown: function(view, rowIdx, colIdx, item, e, record, row){
        var store = view.getStore();
        
        if(rowIdx == (store.getCount() - 1)) return;

        var nextIndex = rowIdx + 1,
            nextRecord = store.getAt(nextIndex);

        if((nextRecord.get('surat_stack_status_tgl') || record.get('surat_stack_status_tgl')) && record.get('surat_setuju') !== "4"){
            return;
        }

        store.removeAt(nextIndex);
        store.removeAt(rowIdx);

        nextRecord.index = rowIdx;
        store.insert(rowIdx, nextRecord);
        
        record.index = nextIndex;
        store.insert(nextIndex, record);
    }
});