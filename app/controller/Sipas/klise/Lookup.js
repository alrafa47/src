Ext.define('SIPAS.controller.Sipas.klise.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    controllers: [
        'Sipas.klise.preview.Pane'
    ],

    stores: [
        'Sipas.klise.Lookup'
    ],
    
    views: [
        'Sipas.klise.Lookup'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_klise_lookup' },
        { ref: 'list',          selector: 'sipas_klise_lookup grid' },
        { ref: 'putin',         selector: 'sipas_klise_lookup sipas_com_button_putin' },
        { ref: 'preview',       selector: 'sipas_klise_lookup sipas_klise_preview_pane' }
    ],

    defaultStore: 'Sipas.klise.Lookup',

    init: function(application) {
        this.control({
            "sipas_klise_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_klise_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_SelectionChange: function(grid, selected, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: grid}),
            preview = this.getPreview({root:mainview}),
            record = selected && selected[0],
            putin = $this.getPutin({root:mainview});

        putin && putin.setDisabled(!selected.length);
        preview && preview.fireEvent('doload', preview, record);
    }
});