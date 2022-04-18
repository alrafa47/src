Ext.define('SIPAS.controller.Sipas.bank.List', {
	extend: 'SIPAS.controller.Sipas.base.List',

    stores: [
        'Sipas.bank.List',
        'Sipas.bank.Combo',
        'Sipas.bank.status.Combo'
    ],

    models: [
        'Sipas.Surat'
    ],

    views: [
        'Sipas.bank.List'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_bank_list' },
        { ref: 'comboTipe',     selector: 'sipas_bank_list #comboTipeSurat' },
        { ref: 'comboStatus',   selector: 'sipas_bank_list #comboStatus' }
    ],

    api : {
        semua       : 'server.php/sipas/bank/read/{tipe}',
        aktif       : 'server.php/sipas/bank/aktif/{tipe}',
        nonaktif    : 'server.php/sipas/bank/nonaktif/{tipe}',
        batal_nomor : 'server.php/sipas/bank/batal_nomor/{tipe}',
        salin_nomor : 'server.php/sipas/bank/salin_nomor/{tipe}',
        musnah      : 'server.php/sipas/bank/musnah/{tipe}',
        arsip       : 'server.php/sipas/bank/arsip/{tipe}'
    },

    defaultStore: 'Sipas.bank.List',
    controllerSurat: 'Sipas.surat.Prop',

    controllerMasuk : 'Sipas.masuk.agenda.Prop',
    controllerIMasuk : 'Sipas.internal.masuk.agenda.Prop',

    controllerKeluar : 'Sipas.keluar.agenda.Prop',
    controllerIKeluar : 'Sipas.internal.keluar.agenda.Prop',
    controllerIKeputusan : 'Sipas.internal.keputusan.agenda.Prop',
    
    init: function(application) {
        this.control({
            "sipas_bank_list": {
                afterrender: this.onGridpanel_AfterRender
            },
            "sipas_bank_list sipas_com_button_refresh" : {
                click : this.onButtonRefresh_Click
            },
            "sipas_bank_list #comboTipeSurat" : {
                select : this.onComboTipe_Select,
                afterrender: this.onComboTipe_AfterRender
            },
            "sipas_bank_list #comboStatus" : {
                select : this.onComboStatus_Select,
                afterrender: this.onComboStatus_AfterRender
            },
            'sipas_bank_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    onButtonView_Click : function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerSurat = $this.getController($this.controllerSurat);

        record.getSurat(function(surat){
            controllerSurat.launch(surat);
        });
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    launch: function(config) {    	
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
            });
        }
        return view;
    },

    onGridpanel_AfterRender: function(mainview, eOpts){
        var $this = this,
            comboTipe = $this.getComboTipe({root:mainview}),
            comboStatus = $this.getComboStatus({root:mainview}),
            tipe = comboTipe.getValue(),
            status = comboStatus.getValue();

        $this.updateList(tipe, status, mainview);
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerMasuk = $this.getController($this.controllerMasuk),
            controllerIMasuk = $this.getController($this.controllerIMasuk),
            controllerKeluar = $this.getController($this.controllerKeluar),
            controllerIKeluar = $this.getController($this.controllerIKeluar);
            controllerIKeputusan = $this.getController($this.controllerIKeputusan);

        view.setLoading(true);
        if(record.get('surat_model') === record.self.modelType().MODEL_MASUK){
            view.setLoading(false);
            controllerMasuk.launch({
                propType: 'masuk',
                unit: null,
                model: record.self.modelType().MODEL_MASUK,
                mode:'bank',
                record: record,
                callback: function(){
                    $this.refresh(view);
                }
            });
            
        }else if(record.get('surat_model') === record.self.modelType().MODEL_IMASUK){
            view.setLoading(false);
            controllerIMasuk.launch({
                propType: 'imasuk',
                unit: record.get('surat_unit'),
                // tipe: record.get('surat_itipe'),
                model: record.self.modelType().MODEL_IMASUK,
                mode:'bank',
                record: record,
                callback: function(){
                    $this.refresh(view);
                }
            });
            
        }else if(record.get('surat_model') === record.self.modelType().MODEL_KELUAR){
            view.setLoading(false);
            controllerKeluar.launch({
                propType: 'keluar',
                unit: null,
                status_kor : 2,
                model: record.self.modelType().MODEL_KELUAR,
                mode:'bank',
                record: record,
                callback: function(){
                    $this.refresh(view);
                }
            });
            
        }else if(record.get('surat_model') === record.self.modelType().MODEL_IKELUAR){
            view.setLoading(false);
            controllerIKeluar.launch({
                propType: 'ikeluar',
                unit: record.get('surat_unit'),
                status_kor : 2,
                //tipe: record.get('surat_itipe'),
                model: record.self.modelType().MODEL_IKELUAR,
                mode:'bank',
                record: record,
                callback: function(){
                    $this.refresh(view);
                }
            });
        }else if(record.get('surat_model') === record.self.modelType().MODEL_KEPUTUSAN){
            view.setLoading(false);
            controllerIKeputusan.launch({
                propType: 'keputusan',
                unit: record.get('surat_unit'),
                status_kor : 2,
                //tipe: record.get('surat_itipe'),
                model: record.self.modelType().MODEL_KEPUTUSAN,
                mode:'bank',
                record: record,
                callback: function(){
                    $this.refresh(view);
                }
            });
        }
    },

    onComboStatus_AfterRender: function(combo){
        var $this = this,
            mainview = $this.getMainview({from:combo});

        combo.getStore().load({
            callback: function(record, operation, success){
                combo.setValue('0');
            }
        });
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            comboTipe = $this.getComboTipe({root:mainview}),
            tipe = comboTipe.getValue(),
            status = combo.getValue();

        $this.updateList(tipe, status, mainview);
    },

    onComboTipe_AfterRender: function(combo, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo});

        combo.getStore().load({
            callback: function(record, operation, success){
                combo.setValue('0');
            }
        });
    },

    onComboTipe_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            comboStatus = $this.getComboStatus({root:mainview}),
            status = comboStatus.getValue(),
            tipe = combo.getValue();

        $this.updateList(tipe, status, mainview);
    },

    updateList: function(tipe, status, mainview){
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            pagingtoolbar = mainview.down('pagingtoolbar'),
            store = mainview.getStore(),
            proxy = store.getProxy();

        store.removeAll();
        if(status === '1'){
            proxy.url = $this.getApi('aktif',{tipe:tipe});
        }
        else if(status === '2'){
            proxy.url = $this.getApi('nonaktif',{tipe:tipe});
        }
        else if(status === '3'){
            proxy.url = $this.getApi('batal_nomor',{tipe:tipe});
        }
        else if(status === '4'){
            proxy.url = $this.getApi('salin_nomor',{tipe:tipe});
        }
        else if(status === '5'){
            proxy.url = $this.getApi('arsip',{tipe:tipe});
        }
        else if(status === '6'){
            proxy.url = $this.getApi('musnah',{tipe:tipe});
        }
        else{
            proxy.url = $this.getApi('semua',{tipe:tipe});
        }

        mainview.reconfigure(store);
        pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        pagingtoolbar.moveFirst();

        // var filters = {
        //     ftype: 'filters',
        //     encode: true,
        //     local: false
        // };
        // store.filter(filters);
        // store.reload();
    }
})