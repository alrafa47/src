Ext.define('SIPAS.controller.Sipas.bebas.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.bebas.unit.List',
        'Sipas.arsip.Pane'
    ],

    models: [
        'Sipas.Arsip'
    ],

    views: [
        'Sipas.bebas.Prop'
    ],

    messages: {
        'receiver_empty': 'Unit tidak boleh kosong'
    },

    refs: [
        { ref : 'mainview', selector: 'sipas_bebas_prop'},
        { ref : 'form',     selector: 'sipas_bebas_prop > form'},
        { ref : 'listUnit', selector: 'sipas_bebas_prop > form sipas_bebas_unit_list'},
        { ref : 'cbIsUmum', selector: 'sipas_bebas_prop > form [name=arsip_isumum]'},
        { ref : 'cbIsBagi', selector: 'sipas_bebas_prop > form [name=arsip_isbagi]'},
        { ref : 'textLink', selector: 'sipas_bebas_prop > form #textLink'}
    ],

    init: function(application){
        this.control({
            'sipas_bebas_prop': {
                show : this.onMainview_Show
            },
            'sipas_bebas_prop [name=arsip_isumum]': {
                change: this.onUmumCheckbox_Change
            },
            'sipas_bebas_prop [name=arsip_isbagi]': {
                change: this.onBagiCheckbox_Change
            },
            'sipas_bebas_prop sipas_bebas_unit_list': {
                loadassociate: this.onUnitList_LoadAssociate
            },
            "sipas_bebas_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_bebas_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_bebas_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            'sipas_bebas_prop sipas_arsip_pane':{
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_bebas_prop #btnImport':{
                click: this.onButtonImport_Click
            },
            // 'sipas_bebas_prop #textLink':{
            //     focus: this.onTextLink_Focus
            // },
            'sipas_bebas_prop #buttonLink':{
                click: this.onButtonLink_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            section: null,
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = $this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :
            case 'lihat' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = ['#reuploadWarning'];
                    c.hideComponent         = [];
                    c.disableComponents     = [];
                    c.readonlyComponent     = [];
                    
                    c.requireComponents = ['[name=arsip_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save', '#toolbarUnit', '#clmAction');
                        c.readonlyComponent.push('#clmHapus', '#clmUbah', '#clmTambah');
                        c.disableComponents.push('sipas_bebas_unit_list');
                        if(c.record.get('arsip_isumum') && c.section === 'umum'){
                            c.removeComponents.push('#toolbarControl', '#toolbarControlBottom');
                        }
                        if(!c.record.isBagi()){
                            c.removeComponents.push('sipas_arsip_pane #buttonAdd');
                        }
                        if(c.record.isBagi()){
                            c.removeComponents.push('#clmHapus', '#clmUbah', '#clmTambah', '#perubahan', '#buttonDelete', '#toolbarControlBottom');
                            if(!c.record.bolehUbah()){
                                c.removeComponents.push('sipas_arsip_pane #buttonEdit');
                            }
                            if(!c.record.bolehHapus()){
                                c.removeComponents.push('sipas_arsip_pane #buttonHapus');
                            }
                            if(!c.record.bolehTambah()){
                                c.removeComponents.push('sipas_arsip_pane #buttonAdd');
                            }
                        }
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_delete', 'sipas_com_button_edit', '#btnImport');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete', '#btnImport');
                    }

                    if(c.mode === 'lihat') {
                        c.removeComponents.push('sipas_com_button_save', '#toolbarUnit', '#clmAction', 'sipas_arsip_pane #buttonAdd');
                        c.readonlyComponent.push('#clmHapus', '#tanggal', '#clmUbah', '#clmTambah', 'container #namaArsip', 'container #tanggal', 'container [name=arsip_isumum]',
                            'container [name=arsip_isbagi]');
                    }

                    return c;
                })(config));
                
                view.show();
                break;

            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            form = $this.getForm({root: mainview}),
            textLink = $this.getTextLink({root: mainview}),
            record = this.createRecord(mainview.record),
            val = 'server.php/sipas/arsip/link?id ='+record.get('arsip_id');

        // textLink.setValue(val);
        switch(mainview.mode){
            case 'add':
                record.set({
                    'arsip_unit'    : mainview.unit
                });
                /*make sure to register surat*/
                mainview.setLoading(true);
                $helper.saveRecord({
                    record: record,
                    message: false,
                    wait: true,
                    waitTitle: 'Menyiapkan Surat',
                    waitText: 'Harap Tunggu Sebentar',
                    callback: function(success, record, response){
                        mainview.setLoading(false);
                        if(!success){
                            $helper.showMsg({success:false, message:'Gagal menyiapkan arsip. Silahkan tutup dan ulangi lagi !'});
                            return;
                        }
                        form.loadRecord(record);
                    }
                });
            break;
            default:
                form.loadRecord(record);
        }
    },

    onButtonLink_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: button}),
            textLink = $this.getTextLink({root:mainview});


        window.open(textLink.getValue(), '_blank');
    },

    // onTextLink_Focus: function(textfield, e, eOpts){
    //     var $this = this,
    //         mainview = $this.getMainview({from: textfield}),
    //         textLink = $this.getTextLink({root:mainview});


    //     window.open(textLink.getValue(), '_blank');
    //     textfield.focus(false);
    // },

    onButtonImport_Click: function(button, e, eOpts){
        var $this = this,
            controllerImport = $this.getController('Sipas.bebas.trf.Prop'),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord();

        controllerImport.launch({
            mode: 'import',
            arsip: record.getId()
        });
    },

    onUmumCheckbox_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: checkbox}),
            cbIsBagi = $this.getCbIsBagi({root:mainview}),
            listUnit = $this.getListUnit({root:mainview});

        if(newValue){
            cbIsBagi.setValue(0);
            cbIsBagi.setDisabled(true);
            listUnit.setDisabled(true);
        }else{
            cbIsBagi.setDisabled(false);
        }
    },

    onBagiCheckbox_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: checkbox}),
            mode = mainview.mode,
            cbIsUmum = $this.getCbIsUmum({root:mainview}),
            listUnit = $this.getListUnit({root:mainview});

        if(mode != 'view'){
            if(newValue){
            cbIsUmum.setValue(0);
            cbIsUmum.setDisabled(true);
            listUnit.setDisabled(false);
        }else{
            cbIsUmum.setDisabled(false);
            listUnit.setDisabled(true);
        }
        }
    },

    onUnitList_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        if(record){

            cmp.setLoading(false);
            cmp.fireEvent('load', cmp, record);
        }
    },

    onButtonSave_Click: function(button, e, eOpts, record) {
        var $this =       this,
            $app =        $this.getApplication(),
            $session =    $app.getSession(),
            $helper =     $this.getApplication().Helper(),
            view =        $this.getMainview({from:button}),
            form =        $this.getForm({root:view}),
            record =      form && form.updateRecord().getRecord(),
            storeUnit =   $this.getListUnit({root:view}).getStore(),
            params =      {
                'id': view && view.mode == 'edit' && record && record.getId(),
                'units[]' : [],
                'ubah[]'  : [],
                'hapus[]'  : [],
                'tambah[]'  : []
            };

        storeUnit.each(function(r){
            params['units[]'].push(r.get('arsip_bagi_unit'));
            params['ubah[]'].push(r.get('arsip_bagi_bolehubah'));
            params['hapus[]'].push(r.get('arsip_bagi_bolehhapus'));
            params['tambah[]'].push(r.get('arsip_bagi_bolehtambah'));
        });

        if(! record) return;        

        if(record.get('arsip_isbagi')){
            /*validate receiver on add mode*/
            if(Ext.Array.contains(['add','edit'], view.mode) && !params['units[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                return;
            }
        }

        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            message: true,
            params: params,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Menyimpan Arsip',
            callback: function(success, record, eOpts, response){
                view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            unit: view.unit,
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            unit: view.unit,
            mode:'destroy',
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onArsip_LoadAssociate: function(record, form, cmp){
        var view = this.getMainview({from:cmp}),
            mode = view.mode,
            $app = this.getApplication(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId();

        cmp.setLoading(true);
        if(record.isBagi()){
            cmp.setLoading(false);
            record.getArsip(function(arsip){
                cmp.fireEvent('load', cmp, null, arsip, null, mode, pegawaiId);
            });
        }else{
            cmp.setLoading(false);
            cmp.fireEvent('load', cmp, null, record, null, mode, pegawaiId);
        }
    }
});