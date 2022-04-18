Ext.define('SIPAS.controller.Sipas.staf.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.staf.Prop'
    ],

    models: [
        'Sipas.Staf'
    ],

    stores: [
        'Sipas.jabatan.Combo',
        'Sipas.peran.Combo',
        'Sipas.staf.unit.Combo',
        'Sipas.staf.tim.Combo'
    ],

    api: {
        set_image_foto  : 'server.php/sipas/staf/set_image/foto?id={id}',
        get_image_foto  : 'server.php/sipas/staf/get_image/foto?id={id}',
        set_image_ttd   : 'server.php/sipas/staf/set_image/ttd?id={id}',
        get_image_ttd   : 'server.php/sipas/staf/get_image/ttd?id={id}',
        staf_read       : 'server.php/sipas/staf/read?id={id}' // api for audit trail //
    },

    refs : [
        { ref: 'mainview',      selector: 'sipas_staf_prop' },
        { ref: 'form',          selector: 'sipas_staf_prop > form' },
        { ref: 'compPeran',     selector: 'sipas_staf_prop > form #comboPeran' },
        { ref: 'compUnit',      selector: 'sipas_staf_prop > form #unitkerja_kode' },
        { ref: 'compJabatan',   selector: 'sipas_staf_prop > form #jabatan_kode' },
        { ref: 'compAkun',      selector: 'sipas_staf_prop > form #comboAkun' },
        { ref: 'compActive',    selector: 'sipas_staf_prop > form [name=akun_isaktif]' },
        { ref: 'btnSignature',  selector: 'sipas_staf_prop > form #btnSignature' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data'],
        'upload_success': 'Upload berhasil',
        'upload_failed':  'Upload gagal',
        'response_invalid': 'Server tidak memberikan valid response',
        'message_invalid': 'Gagal menampilkan pesan',
        'image_uploading': 'Mengupload gambar'
    },

    controllerHelper:   'Sipas.Helper',
    controllerJabatan:  'Sipas.jabatan.Prop',
    controllerUnit:     'Sipas.unit.Prop',
    controllerProperty: 'Sipas.staf.Prop',
    controllerPgs:      'Sipas.staf.wakil.pgs.Popup',
    controllerAsisten:  'Sipas.staf.wakil.Popup',
    controllerAtasan:   'Sipas.staf.wakil.atasan.Popup',
    // controllerAsisten:  'Sipas.jabatan.wakil.asisten.Popup',
    // controllerAtasan:   'Sipas.jabatan.wakil.atasan.Popup',
    controllerKelompok: 'Sipas.staf.tim.Popup',
    controllerAkun:     'Sipas.staf.akun.Lookup',
    controllerUploadSignature: 'Sipas.staf.upload.tandatangan.Popup',

    akunId: '',

    init: function(application) {
        this.control({
            'sipas_staf_prop': {
                setakun: this.onMainview_SetAkun
            },
            'sipas_staf_prop filefield[cls*=setImage]': {
                change: this.onFilefieldChange
            },
            "sipas_staf_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_staf_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_staf_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            'sipas_staf_prop container#containerImage': {
                afterrender: this.onCntImage_AfterRender
            },
            'sipas_staf_prop container#containerImageSignature': {
                afterrender: this.onCntImageSignature_AfterRender
            },
            "sipas_staf_prop sipas_com_button_plus": {
                click: this.onButtonPlusAttribute_Click,
                afterrender: this.onButtonPlusAttribute_Afterrender
            },
            "sipas_staf_prop combobox": {
                runadd: this.onComboAttribute_RunAdd,
                focus: this.onCombo_Focus
            },
            'sipas_staf_prop button#btnSignature':{
                click: this.onButtonSignature_Click
            },
            'sipas_staf_prop button#btnPgs':{
                click: this.onButtonPgs_Click
            },
            'sipas_staf_prop button#btnAsisten':{
                click: this.onButtonAsisten_Click
            },
            'sipas_staf_prop button#btnAtasan':{
                click: this.onButtonAtasan_Click
            },
            'sipas_staf_prop button#btnKelompok':{
                click: this.onButtonKelompok_Click
            },
            "sipas_staf_prop combobox[name=staf_unit]": {
                loadassociate: this.onComboUnit_LoadAssociate
            },
            "sipas_staf_prop combobox[name=staf_jabatan]": {
                loadassociate: this.onComboJabatan_LoadAssociate
            },
            "sipas_staf_prop combobox[name=staf_golongan]": {
                loadassociate: this.onComboGolongan_LoadAssociate
            },
            "sipas_staf_prop combobox[name=staf_peran]": {
                loadassociate: this.onComboPeran_LoadAssociate
            },
            'sipas_staf_prop container#containerAkun triggerfield#comboAkun': {
                loadassociate: this.onTriggerField_LoadAssociate,
                triggerclick: this.onComboAkun_TriggerClick
            },
            'sipas_staf_prop container#containerAkun sipas_com_button_cross': {
                click: this.onButtonAkunClear_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app = $this.getApplication(),
            record = config.record || $this.getModel(this.models[0]).create({}),
            $session = $app.Session(),
            $helper = $app.Helper(),
            view = null;
        config.record = record;

        $this.akunId = config.record.get('staf_akun');

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :
                
                view = $this.createView( (function(c){
                    c.requireComponents = ['[name=staf_nama]'];
                    if(c.mode === 'view') {
                        // c.removeComponents = ['#toolbarAction','#containerPassword', '#fileUpload'];
                        c.removeComponents = ['#btnSignature','#fileUpload','sipas_com_button_save','sipas_com_button_plus'];
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents = ['#btnKelompok', '#btnAsisten', '#btnAtasan', '#btnPgs', 'sipas_com_button_edit', 'sipas_com_button_delete','sipas_com_button_plus'];
                    }

                    if(c.mode === 'add') {
                        c.removeComponents = ['#btnKelompok', '#btnAsisten', '#btnAtasan', '#btnPgs', 'sipas_com_button_edit', 'sipas_com_button_delete','sipas_com_button_plus'];
                    }

                    return c;
                })(config) );

                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            jabatan = $this.getCompJabatan({root:viewCmp}),
                            unit = $this.getCompUnit({root:viewCmp});

                        // save staf
                        if(viewCmp.mode === 'add'){
                            $helper.saveRecord({
                                record: record,
                                // form: form,
                                wait: true,
                                message: false,
                                callback: function(success, record, eOpts){
                                    if(!success){
                                        $helper.showMsg({success:false, message:'Gagal menyiapkan data staf !'});
                                        return;
                                    }
                                }
                            });
                        }
                        form.loadRecord(record);
                        $this.loadImage('foto', viewCmp);
                        $this.loadImage('ttd', viewCmp);
                    },
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

                        record && record.reject();
                    },
                    scope: $this
                });
                view.show();
                break;
            case 'auditview': 
                view = $this.createView( (function(c){
                    c.requireComponents = [];
                    c.removeComponents  = ['#containerSignature','#btnSignature','#fileUpload','sipas_com_button_save','sipas_com_button_plus','#toolbarAction'];
                    c.readonlyComponents = ['#unitkerja_kode', '#jabatan_kode', '#comboRole', '#staf_nama', '#staf_kode', '#comboAkun', '#jenis_kelamin_L', '#jenis_kelamin_P', '#comboGolongan', '#comboSgt'];

                    return c;
                })(config) );
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            jabatan = $this.getCompJabatan({root:viewCmp}),
                            unit = $this.getCompUnit({root:viewCmp}),
                            fieldakun = form.down('fieldset'),
                            staf_id = record && record.get('by') || record && record.get('staf_id');

                        viewCmp.setLoading(true);
                        Ext.Ajax.request({
                            url: $this.getApi('staf_read', {id:staf_id}),
                            method: 'GET',
                            scope: $this,
                            success: function(response){
                                var recs = Ext.decode(response.responseText);
                                if(recs.data){
                                    _record = $this.getModel(this.models[0]).create(recs.data);
                                    form.loadRecord(_record);
                                    this.loadImage('foto', viewCmp);
                                }
                                viewCmp.setLoading(false);
                            },
                            failure: function(){viewCmp.setLoading(false);}
                        })

                        fieldakun.removeAll();
                        fieldakun.hide();
                    },
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

                        record && record.reject();
                    },
                    scope: $this
                });
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
    
    onButtonPgs_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            pgs = $this.getController($this.controllerPgs);

        pgs.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonAsisten_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            asisten = $this.getController($this.controllerAsisten);

        asisten.launch({
            mode:'edit',
            record: record,
            //record: record.getJabatan(),
            //staf: record.get('staf_nama'),
            //unit: record.get('unit_nama'),
            //jabatan: record.get('jabatan_nama'),
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonAtasan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            asisten = $this.getController($this.controllerAtasan);

        asisten.launch({
            mode:'edit',
            record: record,
            //record: record.getJabatan(),
            //staf: record.get('staf_nama'),
            //unit: record.get('unit_nama'),
            //jabatan: record.get('jabatan_nama'),
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonSignature_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            signature = $this.getController($this.controllerUploadSignature);

        signature.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonKelompok_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            kelompok = $this.getController($this.controllerKelompok);

        kelompok.launch({
            mode:'add',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onCntImage_AfterRender: function(component, e, eOpts)
    {
        var filefield = component.up().down('filefield'),
            view = this.getMainview({from:component});
        if(view.mode != 'view'){
            component.addCls('stafPicture' );
            component.getEl().dom.onclick = function()
            {
                filefield.button.fileInputEl.dom.click();
            }
        }
    },

    onCntImageSignature_AfterRender: function(component, e, eOpts)
    {
        var filefield = component.up().down('filefield'),
            view = this.getMainview({from:component});
        if(view.mode != 'view'){
            component.addCls('stafSignaturePicture' );
            component.getEl().dom.onclick = function()
            {
                filefield.button.fileInputEl.dom.click();
            }
        }
    },

    onFilefieldChange: function(filefield, value, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview(),
            form = $this.getForm({root:view}),
            record = form && form.getRecord(),
            id = record.getId(),
            filename = filefield.getName(),
            imageContainer = filefield.getContainerImage(),
            url = $this.getApi('set_image_'+filename, {
                id: id
            });

        imageContainer.setLoading(true);
        form.submit({
            url : url,
            success: function ( result, request ) {
                imageContainer.setLoading(false);
                $this.loadImage(filename, view);
            },
            failure: function ( result, request ) {
                imageContainer.setLoading(false);
                var objres = Ext.decode(request.response.responseText, true) || {};
                $helper.showMsg({
                    success:false,
                    message:objres.message || $this.getMessage('message_invalid')
                });
            }
        });
    },

    loadImage: function(section, view) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = view || $this.getMainview(),
            form = $this.getForm({root:view}),
            border_radius = 'border-radius:100%; ',
            record = form && form.getRecord();

        if (section == 'ttd'){
            border_radius = '';
        }

        if(!record) return;
        Ext.ComponentQuery.query('[name=container_'+section+']', view).forEach(function(comp){
            var t = new Ext.Template("<img src='{url}' style='"+border_radius+" height:128px; width:128px;'/>");
            comp.update(t.apply({
                url: Ext.String.urlAppend($this.getApi('get_image_'+section, {
                    id: record.getId()
                }), '_dc='+Date.now())
            }));
        });
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            jabatan = $this.getCompJabatan({root:view}),
            unit = $this.getCompUnit({root:view}),
            record = form && form.updateRecord().getRecord(),
            compActive = $this.getCompActive({root:view}),
            compAkun = $this.getCompAkun({root:view}),
            wait = $this.getMessage('wait'),
            params = {'akun': $this.akunId},
            txtConfirm = '';

        if ((compAkun.getValue() == '') || (compAkun.getValue() == null)) {
            txtConfirm = 'Anda belum memilih akun untuk pegawai. Pegawai tidak akan bisa login aplikasi jika tidak mempunyai akun. Apakah anda yakin ?';
        }else{
            txtConfirm = 'Apakah anda yakin ?';
        }

        if(! record) return;
        $helper.showConfirm({
            confirmTitle: 'Konfirmasi Simpan',
            confirmText : txtConfirm,
            callback: function(button){
                if(button == 'yes'){
                    $helper.saveRecord({
                        record: record,
                        form: form,
                        wait: true,
                        params: params,
                        message: true,
                        callback: function(success, record, eOpts){
                            Ext.callback(view.callback, view, [success, record, eOpts]);
                            if(success)view.close();
                        }
                    });
                }
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord();

        this.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
        view.close();
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord();

        this.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
    },

    onButtonPlusAttribute_Afterrender: function(component, e, eOpts){
        var use = !component.prev('combobox').readOnly;
        if(!use){
            component.up('container').remove(component, true);
        }
    },

    onButtonPlusAttribute_Click: function(button, e, eOpts){
        var combo = button.prev('combobox');
        combo && combo.fireEvent('runadd', combo, e, eOpts);
    },

    onComboAttribute_RunAdd: function(combo, e, eOpts){
        var c = this.getController(combo.bootstrapProperty);
        c && c.launch({
            mode:'add',
            callback:function(){
                combo.getStore().reload();
            }
        });
    },

    onComboUnit_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;
        
        cmp.setLoading(true);
        record.getUnit(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboJabatan_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;
        
        cmp.setLoading(true);
        record.getJabatan(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboGolongan_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;
        
        cmp.setLoading(true);
        record.getGolongan(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboPeran_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;
        
        cmp.setLoading(true);
        record.getPeran(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onCombo_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    },

    // akun
    onMainview_SetAkun: function(mainview, record)
    {
        var triggerfield = mainview.down('container#containerAkun triggerfield#comboAkun'),
            hiddenfield = mainview.down('container#containerAkun hiddenfield#hiddenAkun');

        triggerfield.setHiddenValue(record);
        hiddenfield.setValue(record && record.get('akun_id'));
        triggerfield.setValue(record && record.get('akun_nama'));
    },

    onTriggerField_LoadAssociate: function(record, form, cmp)
    {
        if (record){
            cmp.setLoading(true);
            cmp.setValue(record.get('akun_nama'));
            cmp.setLoading(false);
        }
    },

    onComboAkun_TriggerClick: function(triggerfield)
    {
        var $this = this,
            controllerLookup = $this.getController($this.controllerAkun)

        controllerLookup.launch({
            multiselect: false,
            title: 'Pilih Akun',
            afterload: function(records, success, store, viewInstance, grid){
                var currentSelected = triggerfield.getHiddenValue();
                if(currentSelected){
                    grid.getSelectionModel().select([currentSelected]);
                }
            },
            callback: function(selection){
                var mainview = $this.getMainview({from:triggerfield});
                mainview.fireEvent('setakun', mainview, selection[0]);
            }
        });
    },

    onButtonAkunClear_Click: function(button, e, eOpts) 
    {
        var mainview = this.getMainview({from:button});
        mainview.fireEvent('setakun', mainview, null);
    }
});
