Ext.define('SIPAS.controller.Sipas.disposisi.forward.penerima.jabatan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jabatan.penerima.Lookup'
    ],

    views: [
        'Sipas.disposisi.forward.penerima.jabatan.List'
    ],

    models:[
        'Sipas.Jabatan'
    ],

    stores: [
        'Sipas.disposisi.forward.penerima.jabatan.List'
    ],
    
    messages:{
        receiver_exist: ['Error', 'Jabatan: {nama} sudah terdaftar']
    },

    refs:[
        { ref: 'mainview',  selector: 'sipas_disposisi_forward_penerima_jabatan_list' }
    ],

    controllerJabatanLookup  : 'Sipas.jabatan.penerima.disposisi.Lookup',
    storePenerima            : 'Sipas.disposisi.forward.penerima.jabatan.List',

    init: function(application) {
        this.control({
            'sipas_disposisi_forward_penerima_jabatan_list': {
                selectionchange: this.onGridpanel_SelectionChange,
                affterrender: this.launch,
                edit: this.onGridPenerima_Edit,
                rundelete: this.onMainview_RunDelete
            },
            'sipas_disposisi_forward_penerima_jabatan_list checkcolumn': {
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