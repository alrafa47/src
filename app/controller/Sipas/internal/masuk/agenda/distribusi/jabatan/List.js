Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.distribusi.jabatan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.penerima.jabatan.Lookup'
    ],

    views: [
        'Sipas.internal.masuk.agenda.distribusi.jabatan.List'
    ],

    models:[
        'Sipas.Jabatan'
    ],

    stores: [
        'Sipas.internal.masuk.agenda.distribusi.jabatan.List'
    ],
    
    messages:{
        receiver_exist: ['Info', 'Jabatan dengan Nama: {id} sudah masuk dalam daftar']
    },

    refs:[
        { ref: 'mainview',  selector: 'sipas_internal_masuk_agenda_distribusi_jabatan_list' }
    ],

    controllerJabatanLookup  : 'Sipas.jabatan.penerima.Lookup',
    storePenerima         : 'Sipas.internal.masuk.agenda.distribusi.jabatan.List',

    init: function(application) {
        this.control({
            'sipas_internal_masuk_agenda_distribusi_jabatan_list': {
                selectionchange: this.onGridpanel_SelectionChange,
                affterrender: this.launch,
                edit: this.onGridPenerima_Edit,
                rundelete: this.onMainview_RunDelete
            },
            'sipas_internal_masuk_agenda_distribusi_jabatan_list sipas_com_button_plus': {
                click: this.onButtonTambahPenerima_Click
            },
            'sipas_internal_masuk_agenda_distribusi_jabatan_list checkcolumn': {
                checkchange: this.onCheckColumn_CheckChange
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'disposisi',
            scope: this
        },config);

        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            storeStaf = $this.getStore($this.storePenerima),
            sessionId = $app.getSession().getProfileId(),
            view = $this.createView(config);

        return view;
    },

    onGridPenerima_Edit: function(editor, e){
        e.record.commit();
    },

    onButtonTambahPenerima_Click: function(button, e, eOpts){
        console.log('tambah penerima');
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            storePenerima = mainview.getStore(),
            controllerLookup = $this.getController($this.controllerJabatanLookup);

        controllerLookup.launch({
            multiselect: true,
            mode: mainview.mode,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('jabatan_id', selections[i].data.jabatan_id);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        var msg = $this.getMessage('receiver_exist',{id: selections[i].data.jabatan_id});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        })    
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
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

    onMainview_RunDelete: function (view, record, row, item, e){
        var $this = this,
            store = view.getStore(),
            getRecord = store.getAt(record);
        
        store.removeAt(record);
        view.refresh();
    },

    onCheckColumn_CheckChange: function(checkcolumn, rowIndex, checked, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:checkcolumn}), 
            store = mainview.getStore(),
            record = store.getAt(rowIndex),
            val = (checked) ? 1 : 0;

        record.set(checkcolumn.dataIndex, val);
        record.commit();
    }
});