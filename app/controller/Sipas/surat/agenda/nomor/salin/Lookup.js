Ext.define('SIPAS.controller.Sipas.surat.agenda.nomor.salin.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.surat.salin.Lookup'
    ],

    api: {
        'salinNomor' : 'server.php/sipas/surat/salinNomor?model={model}&jenis={jenis}&unit={unit}'
    },

    views: [
        'Sipas.surat.agenda.nomor.salin.Lookup'
    ], 

    refs: [
        { ref: 'mainview',  selector: 'sipas_surat_agenda_nomor_salin_lookup'},
        { ref: 'grid',      selector: 'sipas_surat_agenda_nomor_salin_lookup grid'},
        { ref: 'putin',     selector: 'sipas_surat_agenda_nomor_salin_lookup sipas_com_button_putin'}
    ],

    defaultStore: 'Sipas.surat.salin.Lookup',

    init: function(application) {
        this.control({
            "sipas_surat_agenda_nomor_salin_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_surat_agenda_nomor_salin_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onButtonPutin_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            selection = view.down('gridpanel,treepanel').getSelectionModel().getSelection();

        $helper.showConfirm({
            confirmTitle: 'Pilih Nomor',
            confirmText : 'Apakah anda yakin memilih nomor?',
            callback: function(button){
                if(button == 'yes'){
                    view.close();
                    Ext.callback(view.callback, view.scope || $this, [selection]);
                }
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var $this = this,
            grid = component,
            view = $this.getMainview({from:grid}),
            store = grid.getStore(),
            proxy = store.getProxy(),
            record = view.record;

        proxy.url = $this.getApi('salinNomor',{model: record.get('surat_model'), jenis: record.get('surat_jenis'), unit: record.get('surat_unit')});
        store.reload();
    }

});