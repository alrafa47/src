Ext.define('SIPAS.controller.Sipas.staf.penerima.disposisi.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.penerima.available.Lookup',
        'Sipas.staf.penerima.recent.Lookup',
        'Sipas.staf.penerima.tim.Lookup',
        'Sipas.staf.penerima.staf.Lookup'
    ],

    models:[
        'Sipas.Staf'
    ],

    views: [
        'Sipas.staf.penerima.disposisi.Lookup'
    ],

    messages: {
        'receiver_exist': ['Staf dengan Nama:{id} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs: [
        { ref: 'gridView',          selector: 'sipas_disposisi_forward_penerima_list'},
        { ref: 'mainview',          selector: 'sipas_staf_penerima_disposisi_lookup'},
        { ref: 'listAvailable',     selector: 'sipas_staf_penerima_available_lookup'},
        { ref: 'listRecent',        selector: 'sipas_staf_penerima_recent_lookup'},
        { ref: 'listStaf',          selector: 'sipas_staf_penerima_staf_lookup'},
        { ref: 'listUnit',          selector: 'sipas_staf_penerima_unit_lookup'},
        { ref: 'listKelompok',      selector: 'sipas_staf_penerima_tim_disposisi_lookup'},
        { ref: 'listAnggota',       selector: 'sipas_staf_penerima_tim_disposisi_lookup sipas_staf_penerima_tim_anggota_list'},
        { ref: 'listPenerima',      selector: 'sipas_staf_penerima_list'},
        { ref: 'putin',             selector: 'sipas_staf_penerima_disposisi_lookup #pilih'}
    ],

    modelStaf :'sipas.Staf',
    controllerList: 'Sipas.staf.penerima.List',
    storePenerima: 'Sipas.staf.penerima.List',

    init: function(application) {
        this.control({
            'sipas_staf_penerima_disposisi_lookup': {
                show: this.onMainview_Show
            },
            'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_recent_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_staf_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_unit_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_available_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_tim_disposisi_lookup sipas_staf_penerima_tim_anggota_list': {
                itemclick: this.onTimAnggota_ItemClick
            },
            // 'sipas_staf_penerima_disposisi_lookup sipas_staf_penerima_tim_disposisi_lookup': {
            //     itemclick: this.onGridpanel_SelectionChange
            // },
            'sipas_staf_penerima_disposisi_lookup sipas_com_button_putin': {
                click: this.onButtonPutin_Click
            },
            'sipas_staf_penerima_list': {
                removerecord: this.onMainview_ActionRemoveRecord
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            multiselect: false,
            mode: 'disposisi',
            record:null,
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            aftershow: Ext.emptyFn,
            scope: this
        }, config);

        var $this = this,
            view = $this.createView(config);

        view.show();
    },

    onMainview_Show: function(view){
        var $this = this,
            btnPutin = $this.getPutin({root:view}),
            listRecent = $this.getListRecent({root:view}),
            storeRecent = listRecent.getStore(),
            listAvailable = $this.getListAvailable({root:view}),
            storeAvailable = listAvailable.getStore(),
            listAnggota = $this.getListAnggota({root:view}),
            listStaf = $this.getListStaf({root:view}),
            storeStaf = listStaf.getStore(),
            listUnit = $this.getListUnit({root:view}),
            storeUnit = listUnit.getStore(),
            listPenerima = $this.getListPenerima({root:view}),
            storePenerima = listPenerima.getStore(),
            record = view.record,
            id = record.get('disposisi_pengirim_id');

        storePenerima.removeAll();

        btnPutin && btnPutin.setDisabled(true);

        storeRecent.removeAll();
        storeRecent.getProxy().url = 'server.php/sipas/staf/penerima_disposisi/recent?id='+id;
        storeAvailable.removeAll();
        storeAvailable.getProxy().url = 'server.php/sipas/staf/penerima_disposisi/available?id='+id;
        storeStaf.removeAll();
        storeStaf.getProxy().url = 'server.php/sipas/staf/penerima_disposisi/staf?id='+id;
        storeUnit.removeAll();
        storeUnit.getProxy().url = 'server.php/sipas/staf/penerima_disposisi/unitkerja?id='+id;

        storeRecent.reload();
        storeAvailable.reload();
        storeStaf.reload();
        storeUnit.reload();
        listAnggota && listAnggota.fireEvent('load', listAnggota, record);

        Ext.callback(view.aftershow || Ext.emptyFn, $this, [view, $this]);
    },

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            mainview = $this.getMainview({from:view}),
            btnPutin = $this.getPutin({root:mainview}),
            $helper = $this.getApplication().Helper(),
            params = {
                'staf[]' : [],
            };

        view.getStore().remove(record);

        view.getStore().each(function(r){
            params['staf[]'].push(r.get('staf_id'));
        });

        if(!params['staf[]'].length){
            btnPutin && btnPutin.setDisabled(true);
        }
    },

    onGridpanel_ItemClick: function(grid, record, item, index, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:grid}),
            btnPutin = $this.getPutin({root:mainview}),
            list = $this.getListPenerima({root:mainview}),
            storePenerima = $this.getStore($this.storePenerima),
            find = storePenerima.findRecord('staf_id', record.get('staf_id'));

        btnPutin && btnPutin.setDisabled(false);

        if(!find){
            storePenerima.add(record);
        }else{  
            $helper.showMsg({message:$this.getMessage('receiver_exist', {id: record.get('staf_nama')})});
            return;
        }
    },

    onTimAnggota_ItemClick: function(grid, record, item, index, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:grid}),
            btnPutin = $this.getPutin({root:mainview}),
            list = $this.getListPenerima({root:mainview}),
            listAnggota = $this.getListAnggota({root:mainview}),
            store = listAnggota.getStore(),
            storePenerima = $this.getStore($this.storePenerima),
            find = storePenerima.findRecord('staf_id', record.get('staf_id'));

        record.set({
            'staf_id' : record.get('anggota_id'),
            'staf_profil' : record.get('anggota_profil'),
            'staf_kode' : record.get('anggota_kode'),
            'staf_nama' : record.get('anggota_nama'),
            'staf_isaktif' : record.get('anggota_isaktif'),
            'unit_id' : record.get('anggota_unit'),
            'unit_nama' : record.get('anggota_unit_nama'),
            'jabatan_id' : record.get('anggota_jabatan'),
            'jabatan_nama' : record.get('anggota_jabatan_nama'),
            'jabatan_isnomor' : record.get('anggota_jabatan_isnomor'),
            'jabatan_ispenerima' : record.get('anggota_jabatan_ispenerima')
        });
        
        btnPutin && btnPutin.setDisabled(false);
        if(!find){
            storePenerima.add(record);
        }else{  
            $helper.showMsg({message:$this.getMessage('receiver_exist', {id: record.get('staf_nama')})});
            return;
        }
    },

    // onGridpanel_SelectionChange: function(grid, record, item, index, e, eOpts){
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         mainview = $this.getMainview({from:grid}),
    //         btnPutin = this.getPutin({root:mainview}),
    //         list = $this.getListPenerima({root:mainview}),
    //         listKelompok = $this.getListKelompok({root:mainview}),
    //         listAnggota = $this.getListAnggota({root:mainview}),
    //         store = listAnggota.getStore(),
    //         custom = listAnggota.getSelectionModel().getSelection(),
    //         storePenerima = $this.getStore($this.storePenerima),
    //         find = storePenerima.findRecord('staf_id', record.get('staf_id')),
    //         modelStaf = $this.getModel($this.models[0]),
    //         selection = [];

    //     store.each(function(record) {
    //         record.set({
    //             'staf_id' : record.get('anggota_id'),
    //             'staf_profil' : record.get('anggota_profil'),
    //             'staf_kode' : record.get('anggota_kode'),
    //             'staf_nama' : record.get('anggota_nama'),
    //             'staf_isaktif' : record.get('anggota_isaktif'),
    //             'unit_id' : record.get('anggota_unit'),
    //             'unit_nama' : record.get('anggota_unit_nama'),
    //             'jabatan_id' : record.get('anggota_jabatan'),
    //             'jabatan_nama' : record.get('anggota_jabatan_nama'),
    //             'jabatan_isnomor' : record.get('anggota_jabatan_isnomor'),
    //             'jabatan_ispenerima' : record.get('anggota_jabatan_ispenerima')
    //         });
    //         selection.push(record);
    //     });

    //     if(!find){
    //         btnPutin && btnPutin.setDisabled(false);
    //         storePenerima.add(selection);
    //     }else{  
    //         $helper.showMsg({message:$this.getMessage('receiver_exist', {id: record.get('staf_nama')})});
    //         return;
    //     }
    // },

    onButtonPutin_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            grid = $this.getGridView({from:button}),
            list = $this.getListPenerima({root:mainview}),
            storePenerima = $this.getStore($this.storePenerima),
            selection = [];

        storePenerima.each(function(record) {
            selection.push(record);
        });

        mainview.close();
        Ext.callback(mainview.callback, mainview.scope || $this, [selection]);

        storePenerima.removeAll();
    }

});