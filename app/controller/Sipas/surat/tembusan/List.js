Ext.define('SIPAS.controller.Sipas.surat.tembusan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.surat.tembusan.List'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack' 
    ],
    
    stores:[
        'Sipas.surat.tembusan.List'
    ],

    messages: {
        'receiver_exist': ['Info','Staf dengan nama {id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_surat_tembusan_list' }
    ],

    storeTembusan: 'Sipas.surat.tembusan.List',
    controllerLookupPenerima: 'Sipas.staf.penerima.Lookup',

    init: function(application){
        this.control({
            'sipas_surat_tembusan_list':{
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown
            },
            'sipas_surat_tembusan_list sipas_com_button_add': {
                click: this.onButtonAdd_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,            
            view = $this.createView(config);

        return view;
    },

    onGridpanel_Load: function(grid, record){
        var load = function(r){
            var s = r.fetchPenerima(); 
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

    onButtonAdd_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            $helper = $this.getApplication().Helper(),
            storeTembusan = $this.getStore($this.storeTembusan),
            controllerLookup = $this.getController($this.controllerLookupPenerima),
            form = view.up('form'),
            record = form && form.updateRecord().getRecord(),
            model = record.get('surat_model');

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storeTembusan.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storeTembusan.add(selections[i].data);
                    }else{                 
                        var msg = $this.getMessage('receiver_exist',{id: selections[i].data.staf_nama});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }

                if(model == 6) view.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+storeTembusan.data.length+')</b>');
            }
        })
    },

    onMainview_RunDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var $this= this,
            mainview = $this.getMainview({from:view}),
            store = view.getStore(),
            form = view.up('form'),
            recordsurat = form && form.updateRecord().getRecord(),
            model = recordsurat.get('surat_model');

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

    onMainview_RunMoveUp: function(view, rowIdx, colIdx, item, e, record, row){
        var $this= this,
            mainview = $this.getMainview({from:view}),
            store = view.getStore(),
            form = view.up('form'),
            recordsurat = form && form.updateRecord().getRecord(),
            model = recordsurat.get('surat_model'),
            prevIndex = rowIdx - 1,
            prevRecord = store.getAt(prevIndex);

        if(rowIdx == 0) return;        

        store.removeAt(rowIdx);
        store.removeAt(prevIndex);

        record.index = prevIndex;
        store.insert(prevIndex, record);

        prevRecord.index = rowIdx;
        store.insert(rowIdx, prevRecord);

        if(model == 6) mainview.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+store.data.length+')</b>');
    },

    onMainview_RunMoveDown: function(view, rowIdx, colIdx, item, e, record, row){
        var $this= this,
            mainview = $this.getMainview({from:view}),
            store = view.getStore(),
            form = view.up('form'),
            recordsurat = form && form.updateRecord().getRecord(),
            model = recordsurat.get('surat_model'),
            nextIndex = rowIdx + 1,
            nextRecord = store.getAt(nextIndex);
        
        if(rowIdx == (store.getCount() - 1)) return;

        store.removeAt(nextIndex);
        store.removeAt(rowIdx);

        nextRecord.index = rowIdx;
        store.insert(rowIdx, nextRecord);
        
        record.index = nextIndex;
        store.insert(nextIndex, record);

        if(model == 6) mainview.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+store.data.length+')</b>');
    }
});