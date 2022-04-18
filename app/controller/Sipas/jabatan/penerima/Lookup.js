Ext.define('SIPAS.controller.Sipas.jabatan.penerima.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jabatan.penerima.available.Lookup',
        'Sipas.jabatan.penerima.recent.Lookup',
        'Sipas.jabatan.penerima.jabatan.Lookup'
    ],

    models:[
        'Sipas.Jabatan'
    ],

    views: [
        'Sipas.jabatan.penerima.Lookup'
    ],

    messages: {
        'invalid_jabatan' : 'Jabatan yang anda pilih tidak memiliki akses menjadi penerima. Mohon mengganti pilihan anda',
        'receiver_exist': ['Jabatan dengan Nama:{id} sudah masuk dalam daftar'],
        'not_multiselect': ['Hanya bisa memilih 1 Jabatan'],
    },

    refs: [
        { ref: 'mainview',          selector: 'sipas_jabatan_penerima_lookup'},
        { ref: 'listAvailable',     selector: 'sipas_jabatan_penerima_available_lookup'},
        { ref: 'listRecent',        selector: 'sipas_jabatan_penerima_recent_lookup'},
        { ref: 'listJabatan',       selector: 'sipas_jabatan_penerima_jabatan_lookup'},
        { ref: 'listAnggota',       selector: 'sipas_jabatan_penerima_tim_lookup sipas_jabatan_penerima_tim_anggota_list'},
        { ref: 'listPenerima',      selector: 'sipas_jabatan_penerima_list'},
        { ref: 'putin',             selector: 'sipas_jabatan_penerima_lookup #pilih'}
    ],

    modelJabatan :'Sipas.Jabatan',
    controllerList: 'Sipas.jabatan.penerima.List',
    storePenerima: 'Sipas.jabatan.penerima.List',

    init: function(application) {
        this.control({
            'sipas_jabatan_penerima_lookup': {
                show: this.onMainview_Show
            },
            'sipas_jabatan_penerima_lookup sipas_jabatan_penerima_recent_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_jabatan_penerima_lookup sipas_jabatan_penerima_jabatan_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_jabatan_penerima_lookup sipas_jabatan_penerima_available_lookup': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_jabatan_penerima_lookup sipas_jabatan_penerima_tim_lookup sipas_jabatan_penerima_tim_anggota_list': {
                itemclick: this.onTimAnggota_ItemClick
            },
            'sipas_jabatan_penerima_lookup sipas_com_button_putin': {
                click: this.onButtonPutin_Click
            },
            'sipas_jabatan_penerima_list': {
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
            listJabatan = $this.getListJabatan({root:view}),
            listAnggota = $this.getListAnggota({root:view}),
            listPenerima = $this.getListPenerima({root:view}),
            storePenerima = listPenerima.getStore(),
            record = null;

        storePenerima.removeAll();
        // storePenerima.reload();
        btnPutin && btnPutin.setDisabled(true);

        listRecent && listRecent.fireEvent('load', listRecent, record);
        listAvailable && listAvailable.fireEvent('load', listAvailable, record);
        listJabatan && listJabatan.fireEvent('load', listJabatan, record);
        listAnggota && listAnggota.fireEvent('load', listAnggota, record);
        listPenerima && listPenerima.fireEvent('load', listPenerima, record);
        Ext.callback(view.aftershow || Ext.emptyFn, $this, [view, $this]);
    },

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            mainview = $this.getMainview({from:view}),
            btnPutin = $this.getPutin({root:mainview}),
            $helper = $this.getApplication().Helper(),
            params = {
                'jabatan[]' : [],
            };

        view.getStore().remove(record);

        view.getStore().each(function(r){
            params['jabatan[]'].push(r.get('jabatan_id'));
        });

        if(!params['jabatan[]'].length){
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
            find = storePenerima.findRecord('jabatan_id', record.get('jabatan_id'));
        
        btnPutin && btnPutin.setDisabled(false);

        if(!mainview.multiselect && storePenerima.data.length > 0) {
            $helper.showMsg({message:$this.getMessage('not_multiselect')});
            return;
        }
        
        if(!find){
            storePenerima.add(record);
        }else{  
            $helper.showMsg({message:$this.getMessage('receiver_exist', {id: record.get('jabatan_nama')})});
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
            find = storePenerima.findRecord('jabatan_id', record.get('jabatan_id') ? record.get('jabatan_id') : record.get('anggota_id'));

        record.set({
            'jabatan_id' : record.get('anggota_id'),
            'jabatan_kode' : record.get('anggota_kode'),
            'jabatan_nama' : record.get('anggota_nama'),
            'jabatan_isaktif' : record.get('anggota_isaktif'),
            'unit_id' : record.get('anggota_unit'),
            'unit_nama' : record.get('anggota_unit_nama'),
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
            $helper.showMsg({message:$this.getMessage('receiver_exist', {id: record.get('jabatan_nama')})});
            return;
        }
    },

    onButtonPutin_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
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