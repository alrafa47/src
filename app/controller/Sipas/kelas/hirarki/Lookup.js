Ext.define('SIPAS.controller.Sipas.kelas.hirarki.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.kelas.hirarki.Lookup'
    ],

    views: [
        'Sipas.kelas.hirarki.Lookup'
    ],
    
    refs: [
        { ref: 'mainview',          selector: 'sipas_kelas_hirarki_lookup' },
        { ref: 'list',              selector: 'sipas_kelas_hirarki_lookup gridpanel, sipas_kelas_hirarki_lookup treepanel' },
        { ref: 'putin',             selector: 'sipas_kelas_hirarki_lookup sipas_com_button_putin' },
        { ref: 'containerKelas',    selector: 'sipas_surat_agenda_prop form #containerInduk' },
        { ref: 'comboKelas',        selector: 'sipas_surat_agenda_prop form #kelas_kode' }
    ],

    defaultStore: 'Sipas.kelas.hirarki.Lookup',

    init: function(application) {
        this.control({
            "sipas_kelas_hirarki_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_kelas_hirarki_lookup treepanel": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onButtonPutin_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            selection = view.down('gridpanel,treepanel').getSelectionModel().getSelection();
        
        if(selection[0].get('kelas_jumlah_anak') != 0){
            $helper.showMsg({success:false, message:'Induk klasifikasi tidak dapat dipilih.'});
            return;
        }
        view.close();
        Ext.callback(view.callback, view.scope || $this, [selection]);
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var $this = this,
            grid = component,
            view = $this.getMainview({from:grid}),
            store = grid.getStore();

        store.filters.removeAtKey('filtersId');
        grid.setLoading(true);
        store.load({
            url: view.url || store.getProxy().url,
            callback: function(records, operation, success) {
                // grid.getSelectionModel().select([store.getRootNode()]);
                Ext.callback(view.afterload || Ext.emptyFn, view.scope || $this, [records, success, store, view, grid]);
            }
        });
        grid.setLoading(false);
    }

});
