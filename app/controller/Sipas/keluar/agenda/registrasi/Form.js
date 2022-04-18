Ext.define('SIPAS.controller.Sipas.keluar.agenda.registrasi.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],

    views: [
        'Sipas.keluar.agenda.registrasi.Form'
    ],

    models: [
        'Sipas.Surat'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_keluar_agenda_registrasi_form' },
        { ref: 'form',          selector: 'sipas_keluar_agenda_registrasi_form' },
        { ref: 'cmpTipeSurat',  selector: 'sipas_keluar_agenda_registrasi_form combobox#tipeSurat' },
        { ref: 'grid',          selector: 'sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list' },
        { ref: 'cmpRegistrasi', selector: 'sipas_keluar_agenda_registrasi_form [name=surat_registrasi]' },
        { ref: 'cmpAgenda',     selector: 'sipas_keluar_agenda_registrasi_form [name=surat_keluar_agenda]' },
        { ref: 'compWithPrint', selector: 'sipas_keluar_agenda_registrasi_form #toolbarAction checkboxfield' },
        { ref: 'buttonTerima',  selector: 'sipas_keluar_agenda_registrasi_form button#buttonTerima' }
    ],

    defaultWindowReport: {
        height: 640, 
        width: 800,
        maximizable: true,
        modal: true
    },

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    suratModel: 'Sipas.Surat',
    controllerHelper: 'Sipas.Helper',
    controllerStatusPopup: 'Sipas.keluar.agenda.ekspedisi.Popup',

    defaultTypeSurat: 'ex', //default nomor agenda tipe surat (ex =external / in =internal) note: still not dynamic

    viewViewer: 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_keluar_agenda_registrasi_form':{
                init      : this.onMainview_Init
            },
            "sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list": {
                loadassociate: this.onEkspedisi_LoadAssociated
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        },config);

        return this.createView(config);
    },

    onMainview_Init: function(mainview, config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        },config);

        var $this = this,
            form = mainview,
            record = config.record,
            grid = $this.getGrid({root:mainview}),
            buttonTerima = $this.getButtonTerima({root:mainview});

        if(config.mode == 'view'){
            form.loadRecord(record);
            form.callback = config.callback;
            form.scope = config.scope;
        }        
    },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            form = mainview;
    },

    onMainview_Close: function(){
        var form = this.getForm({root:viewCmp}),
            record = form.getRecord();

        record && record.reject();
    },

    onButtonSave_Click: function(button, e, eOpts, record){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = view,
            record = form && form.updateRecord().getRecord(),
            compWithPrint = $this.getCompWithPrint({form:button}),
            printValue = compWithPrint.getValue();

        if(! record) return;
        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Ekspedisi',
            callback: function(success, record, eOpts, response){
                if(success) {       
                    if(printValue){
                        $this.printReportSender(record.getId(), null, null, 'Cetak Resi');
                    }
                }
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    printReportSender: function(id, callback, scope, title){
        var viewer = this.getView(this.viewViewer),
            view = viewer.create(Ext.apply(this.defaultWindowReport, {})).show().load(this.getApi('report', {
                id: id
            }));
        view.setTitle(title);
    },

    onEkspedisi_LoadAssociated: function(record, form, cmp){
        if(record){
            store = record.fetchLog();
            cmp.reconfigure(store);
            store.load({
                callback: function(){
                    store.each(function(record){
                    });
                }
            });
        }
    }
});