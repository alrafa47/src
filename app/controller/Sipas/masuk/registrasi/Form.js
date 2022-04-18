Ext.define('SIPAS.controller.Sipas.masuk.registrasi.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.masuk.registrasi.Form'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.media.Combo',
        'Sipas.surat.tipe.List',
        'Sipas.surat.kontak.Combo'
    ],

    api: {
        'next_register' : 'server.php/sipas/surat/next',
        'report'        : 'server.php/sipas/surat/resi?id={id}'
    },

    refs : [
        { ref: 'mainview',      selector: 'sipas_masuk_registrasi_form' },
        { ref: 'form',          selector: 'sipas_masuk_registrasi_form' },
        { ref: 'cmpTipeSurat',  selector: 'sipas_masuk_registrasi_form combobox#tipeSurat' },
        { ref: 'cmpRegistrasi', selector: 'sipas_masuk_registrasi_form [name=surat_registrasi]' },
        { ref: 'cmpAgenda',     selector: 'sipas_masuk_registrasi_form [name=surat_agenda]' },
        { ref: 'compWithPrint', selector: 'sipas_masuk_registrasi_form #toolbarAction checkboxfield' }
    ],

    defaultWindowReport: {
        height: 640, 
        width: 670,
        maximizable: true,
        modal: true
    },

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    controllerHelper: 'Sipas.Helper',

    storeComboMedia: 'Sipas.media.Combo',
    storeComboTipe: 'Sipas.surat.tipe.List',

    defaultTypeSurat: 'ex', //default nomor agenda tipe surat (ex =external / in =internal) note: still not dynamic

    viewViewer: 'Sipas.Viewer',

    controllerProp: 'Sipas.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            'sipas_masuk_registrasi_form':{
                init            : this.onMainview_Init,
                loadRegistrasi  : this.onMainview_LoadRegister,
                afterrender     : this.onMainview_AfterRender
            },
            'sipas_masuk_registrasi_form #toolbarAction sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_masuk_registrasi_form [name=surat_pengirim]': {
                loadassociate: this.onComboDari_LoadAssociate,
                focus: this.onComboDari_Focus
            },
            'sipas_masuk_registrasi_form [name=surat_media]': {
                loadassociate: this.onComboMedia_LoadAssociate,
                focus: this.onComboDari_Focus
            }
            // "sipas_masuk_registrasi_form #unit":{
            //     loadassociate: this.onTextPenerima_LoadAssociate
            // }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'add',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        },config);
        
        return this.createView(config);
    },

    onMainview_Init: function(mainview, config){
        config = config || {};
        var $this = this,
            $session = $this.getApplication().getSession(),
            now = new Date(),
            form = mainview,
            record = config.record || $this.getModel($this.models[0]).create({});

        if(config.mode == 'add'){
            record.set({
                'surat_model'                   : record.self.modelType().MODEL_MASUK,
                'surat_properti_buat_tgl'       : now,
                'surat_properti_pembuat_nama'   : $session.getProfile().staf_nama
            });

            form.loadRecord(record);
            form.callback = config.callback;
            form.scope = config.scope;
            form.fireEvent('loadRegistrasi', form);
        }
    },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            form = mainview;

        // $this.getStore($this.storeComboMedia).reload();
        // $this.getStore($this.storeComboTipe).reload();
    },

    onMainview_Close: function(){
        var form = this.getForm({root:viewCmp}),
            record = form.getRecord();

        record && record.reject();
    },

    onButtonSave_Click: function(button, e, eOpts, record){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            view = $this.getMainview({from:button}),
            form = view,
            record = form && form.updateRecord().getRecord(),
            compWithPrint = $this.getCompWithPrint({form:button}),
            printValue = compWithPrint.getValue(),
            cReveiver = this.getController(this.controllerProp);

        if(! record) return;
        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Surat',
            message: true,
            callback: function(success, record, eOpts, response){
                if(success) {                    
                    if(printValue){
                        cReveiver.printReport(record.getId(), 'Cetak Resi');
                    }
                }
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onMainview_LoadRegister: function(view, e, eOpts){
        var $this = this,
            cmp = $this.getCmpRegistrasi({root: view});

        cmp.setLoading(true);
        Ext.Ajax.request({
            url: this.getApi('next_register'),
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText, true) || {};
                cmp.setValue(res.next);
                cmp.setLoading(false);
            }
        });
    },

    printReportSender: function(id, callback, scope){
        var viewer = this.getView(this.viewViewer);
        viewer.create(Ext.apply(this.defaultWindowReport, {})).show().load(this.getApi('report', {
            id: id
        }));
    },

    // parent
    onComboDari_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);
        
        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
        }
    },

    onComboMedia_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);
        
        record.getMedia(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboDari_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    }
});