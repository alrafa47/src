Ext.define('SIPAS.controller.Sipas.staf.penerima.Lookup', {
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
        'Sipas.staf.penerima.Lookup'
    ],

    messages: {
        // 'invalid_jabatan' : 'Satu atau lebih penerima tidak memiliki akses menjadi penerima. Mohon mengganti penerima.',
        'invalid_jabatan' : 'Staf yang anda pilih tidak memiliki akses menjadi penerima. Mohon mengganti pilihan anda',
        'receiver_exist': ['Staf dengan Nama:{id} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs: [
        { ref: 'gridView',          selector: 'sipas_disposisi_forward_penerima_list'},
        { ref: 'mainview',          selector: 'sipas_staf_penerima_lookup'},
        { ref: 'listAvailable',     selector: 'sipas_staf_penerima_available_lookup'},
        { ref: 'listRecent',        selector: 'sipas_staf_penerima_recent_lookup'},
        { ref: 'listStaf',          selector: 'sipas_staf_penerima_staf_lookup'},
        { ref: 'listKelompok',      selector: 'sipas_staf_penerima_tim_lookup'},
        { ref: 'listAnggota',       selector: 'sipas_staf_penerima_tim_lookup sipas_staf_penerima_tim_anggota_list'},
        { ref: 'listPenerima',      selector: 'sipas_staf_penerima_list'},
        { ref: 'putin',             selector: 'sipas_staf_penerima_lookup #pilih'}
    ],

    modelStaf :'sipas.Staf',
    controllerList: 'Sipas.staf.penerima.List',
    storePenerima: 'Sipas.staf.penerima.List',

    init: function(application) {
        this.control({
            'sipas_staf_penerima_lookup': {
                show: this.onMainview_Show
            },
            'sipas_staf_penerima_lookup sipas_staf_penerima_recent_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_lookup sipas_staf_penerima_staf_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_lookup sipas_staf_penerima_unit_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_lookup sipas_staf_penerima_available_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_staf_penerima_lookup sipas_staf_penerima_tim_lookup sipas_staf_penerima_tim_anggota_list': {
                itemclick: this.onTimAnggota_ItemClick
            },
            // 'sipas_staf_penerima_lookup sipas_staf_penerima_tim_lookup': {
            //     itemclick: this.onGridpanel_SelectionChange
            // },
            'sipas_staf_penerima_lookup sipas_com_button_putin': {
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
            listAvailable = $this.getListAvailable({root:view}),
            listAnggota = $this.getListAnggota({root:view}),
            listStaf = $this.getListStaf({root:view}),
            listPenerima = $this.getListPenerima({root:view}),
            storePenerima = listPenerima.getStore(),
            record = null;

            storePenerima.removeAll();
            // storePenerima.reload();
            btnPutin && btnPutin.setDisabled(true);

            listRecent && listRecent.fireEvent('load', listRecent, record);
            listAvailable && listAvailable.fireEvent('load', listAvailable, record);
            listAnggota && listAnggota.fireEvent('load', listAnggota, record);
            listStaf && listStaf.fireEvent('load', listStaf, record);         
            listPenerima && listPenerima.fireEvent('load', listPenerima, record);         
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

        if(mainview.mode == 'ikeluar'){
            if(!record.get('jabatan_ispenerima')){
                $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
                return;
            }
        }
        
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
    //         btnPutin = $this.getPutin({root:mainview}),
    //         list = $this.getListPenerima({root:mainview}),
    //         listKelompok = $this.getListKelompok({root:mainview}),
    //         listAnggota = $this.getListAnggota({root:mainview}),
    //         store = listAnggota.getStore(),
    //         custom = listAnggota.getSelectionModel().getSelection(),
    //         storePenerima = $this.getStore($this.storePenerima),
    //         find = storePenerima.findRecord('staf_id', record.get('staf_id')),
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

    //     if(mainview.mode == 'ikeluar'){
    //         invalid = [];

    //         if(list == listKelompok){
    //             Ext.Array.each(selection, function(record){
    //                 if(!record.data.jabatan_ispenerima){
    //                     invalid.push(record);
    //                 }
    //             });
    //         }else{
    //             Ext.Array.each(selection, function(record){
    //                 if(!record.get('jabatan_ispenerima')){
    //                     invalid.push(record);
    //                 }
    //             });
    //         }

    //         if(invalid.length > 0){
    //             $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
    //             return;
    //         }
    //     }

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


    // onGridpanel_SelectionChange: function(grid, record, item, index, e, eOpts){
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         mainview = $this.getMainview({from:grid}),
    //         list = $this.getListPenerima({root:mainview}),
    //         listAnggota = $this.getListAnggota({root:mainview}),
    //         storePenerima = listAnggota.getStore($this.storePenerima),
    //         find = storePenerima.findRecord('staf_id', record.get('staf_id'));

    //     if(!find){
    //         storePenerima.add(record);
    //     }else{  
    //         $helper.showMsg({message:this.getMessage('receiver_exist', {id: record.get('staf_nama')})});
    //         return;
    //     }
    // }

    // onButtonPutin_Click: function(button, e, eOpts){
    //     var $this = this,
    //         $app = $this.getApplication(),
    //         $helper = $app.Helper(),
    //         view = $this.getMainview({from:button}),
    //         grid = $this.getGridView({from:button}),
    //         listKelompok = $this.getListKelompok({root:view}),
    //         listAnggota = $this.getListAnggota({root:view}),
    //         list = button.up('gridpanel'),
    //         selection = list.getSelectionModel().getSelection(),

    //     if(list == listKelompok){
    //         selection = [];
            
    //         if(custom.length > 0){
    //             Ext.Array.each(custom, function(record) {
    //                 records = {
    //                     data : {
    //                         'staf_id':record.get('anggota_id'),
    //                         'staf_kode':record.get('anggota_kode'),
    //                         'staf_nama':record.get('anggota_nama'),
    //                         'unit_nama':record.get('anggota_unit_nama'),
    //                         'jabatan_nama':record.get('anggota_jabatan_nama'),
    //                         'jabatan_isnomor':record.get('anggota_jabatan_isnomor'),
    //                         'jabatan_ispenerima':record.get('anggota_jabatan_ispenerima'),
    //                         'staf_profil' : record.get('anggota_profil'),
    //                         'staf_isaktif' : record.get('anggota_isaktif')
    //                     }
    //                 };
    //                 selection.push(records);
    //             });
    //         }else{
    //             var store = listAnggota.getStore();
    //             store.each(function(record) {
    //                 records = {
    //                     data : {
    //                         'staf_id':record.get('anggota_id'),
    //                         'staf_kode':record.get('anggota_kode'),
    //                         'staf_nama':record.get('anggota_nama'),
    //                         'unit_nama':record.get('anggota_unit_nama'),
    //                         'jabatan_nama':record.get('anggota_jabatan_nama'),
    //                         'jabatan_isnomor':record.get('anggota_jabatan_jabatan_isnomor'),
    //                         'jabatan_ispenerima':record.get('anggota_jabatan_jabatan_ispenerima'),
    //                         'staf_profil' : record.get('anggota_profil'),
    //                         'staf_isaktif' : record.get('anggota_isaktif')
    //                     }
    //                 };
    //                 selection.push(records);
    //             });
    //         }
    //     }

    //     if(view.mode == 'ikeluar'){
    //         invalid = [];

    //         if(list == listKelompok){
    //             Ext.Array.each(selection, function(record){
    //                 if(!record.data.jabatan_ispenerima){
    //                     invalid.push(record);
    //                 }
    //             });
    //         }else{
    //             Ext.Array.each(selection, function(record){
    //                 if(!record.get('jabatan_ispenerima')){
    //                     invalid.push(record);
    //                 }
    //             });
    //         }

    //         if(invalid.length > 0){
    //             $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
    //             return;
    //         }
    //     }

    //     view.close();
    //     Ext.callback(view.callback, view.scope || $this, [selection]);
    // }

});