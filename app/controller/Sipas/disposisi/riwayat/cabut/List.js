Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.cabut.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.penerima.Lookup'
    ],

    views: [
        'Sipas.disposisi.riwayat.cabut.List'
    ],

    models:[
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.disposisi.riwayat.cabut.List'
    ],
    
    messages:{
        receiver_exist: ['Error', 'Staf: {nama} sudah terdaftar']
    },

    refs:[
        { ref: 'mainview',  selector: 'sipas_disposisi_riwayat_cabut_list' }
    ],

    controllerStafLookup  : 'Sipas.staf.penerima.Lookup',
    storePenerima            : 'Sipas.disposisi.riwayat.cabut.List',

    init: function(application) {
        this.control({
            'sipas_disposisi_riwayat_cabut_list': {
                selectionchange: this.onGridpanel_SelectionChange,
                affterrender: this.launch
            },
            'sipas_disposisi_riwayat_cabut_list checkcolumn': {
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


    onGridpanel_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];

        // $helper.disableComponent({
        //     action: (selected.length != 1),
        //     parent: view,
        //     items: ['sipas_com_button_add', 'sipas_com_button_delete', 'sipas_com_button_action']
        // });
    },


    onCheckColumn_CheckChange: function(checkcolumn, rowIndex, checked, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:checkcolumn}), 
            store = mainview.getStore(),
            record = store.getAt(rowIndex),
            val = (checked)? 1 : 0;

        record.set(checkcolumn.dataIndex, val);
        record.commit();
    }
});