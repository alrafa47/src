Ext.define('SIPAS.controller.Sipas.koreksi.stack.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Staf'
    ],
    
    stores:[
        'Sipas.surat.penyetuju.List',
        'Sipas.staf.Lookup'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_koreksi_stack_list' }
    ],

    controllerLookupPenerima: 'Sipas.staf.penerima.Lookup',

    storePenerima: 'Sipas.surat.penyetuju.List',

    init: function(application){
        this.control({
            'sipas_koreksi_stack_list':{
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown
            },
            'sipas_koreksi_stack_list sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
            'sipas_koreksi_stack_list sipas_com_button_delete': {
                click: this.onButtonDelete_Click
            },
            'sipas_koreksi_stack_list grid': {
                selectionchange: this.onGridpanel_SelectionChange
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

    onButtonAdd_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            storePenerima = $this.getStore($this.storePenerima),
            controllerLookup = $this.getController($this.controllerLookupPenerima);

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('staf_nip', selections[i].data.staf_nip);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        var msg = $this.getMessage('receiver_exits',{id: selections[0].data.staf_nip});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        })
    },

    onMainview_RunDelete: function(view, record, row, item, e){
        view.getStore().removeAt(record);
    },

    onMainview_RunMoveUp: function(view, record, row, item, e){
        var $this = this,
            store = $this.getMainview().getStore(),
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == 0) return;

        store.removeAt(record);
        store.insert(record-1,getRecord);
    },

    onMainview_RunMoveDown: function(view, record, row, item, e){
        var $this = this,
            store = $this.getMainview().getStore(),
            getRecord = store.getAt(record),
            rowPosition = record;
        
        if(rowPosition == (store.getCount() - 1)) return;

        store.removeAt(record);
        store.insert(record+1,getRecord);
    },

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

    onButtonDelete_Click: function (button, e, eOpts){
        var $this = this,
            selection = $this.getMainview({from:button}).getSelectionModel().getSelection(),
            storePenerima = $this.getStore($this.storePenerima);
        
        storePenerima.remove(selection);
        $this.getMainview().getView().refresh();
    }
});