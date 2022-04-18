Ext.define('SIPAS.controller.Sipas.masuk.registrasi.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.masuk.registrasi.Form',
        'Sipas.arsip.Pane',
        'Sipas.surat.penerima.List'
    ],

    views: [
        'Sipas.masuk.registrasi.Popup'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.media.Combo',
        'Sipas.surat.tipe.List',
        'Sipas.surat.penerima.List'
    ],

    api: {
        'next_register' : 'server.php/sipas/surat/next',
        'next_agenda'   : 'server.php/sipas/surat_masuk/next/agenda'
    },

    refs : [
        { ref: 'mainview',      selector: 'sipas_masuk_registrasi_popup' },
        { ref: 'form',          selector: 'sipas_masuk_registrasi_popup > form' },
        { ref: 'cmpTipeSurat',  selector: 'sipas_masuk_registrasi_popup > form combobox#tipeSurat' },
        { ref: 'cmpRegistrasi', selector: 'sipas_masuk_registrasi_popup > form [name=surat_registrasi]' },
        { ref: 'cmpAgenda',     selector: 'sipas_masuk_registrasi_popup > form [name=surat_masuk_agenda]' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    defaultModel: 'Sipas.Masuk',
    controllerHelper: 'Sipas.Helper',
    controllerPenerima: 'Sipas.surat.penerima.List',

    storeComboMedia: 'Sipas.media.Combo',
    storePenerima: 'Sipas.surat.penerima.List',
    storeComboTipe: 'Sipas.surat.tipe.List',

    init: function(application) {
        this.control({
            'sipas_masuk_registrasi_popup':{
                show: this.onMainview_Show
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config,{
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            view = null;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView( (function(c){
                    c.requireComponents = [];

                    if(c.mode === 'view') {
                        c.removeComponents = ['#toolbarAction'];
                    }

                    return c;
                })(config) );

                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp});
                        
                        form.loadRecord(record);
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
                    confirm: true
                })
                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(view){
        var $this = this,
            $app = this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            controllerPenerima = $this.getController($this.controllerPenerima),
            record = view.record || this.getModel(this.defaultModel || this.models[0]).create({}),
            form = $this.getForm({root:view});

        // reset penerima
        if(Ext.Array.contains(['add','edit'], view.mode)) {
            $this.getStore($this.storePenerima).removeAll();
        }
        form.loadRecord(record);
    }
});