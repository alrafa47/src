Ext.define('SIPAS.controller.Sipas.klise.list.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.klise.List',
        'Sipas.klise.preview.Pane'
    ],

    stores:[
        'Sipas.klise.List'
    ],

    views: [
        'Sipas.klise.list.Compact'
    ],
    
    refs:[
        { ref : 'mainview', selector: 'sipas_klise_list_compact' },
        { ref : 'list',     selector: 'sipas_klise_list_compact sipas_klise_list' },
        { ref : 'preview',  selector: 'sipas_klise_list_compact sipas_com_ckeditor' }
    ],

    init: function(application){
        this.control({
            'sipas_klise_list': {
                selectionchange: this.onList_SelectionChange
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);

        return view;
    },

    onList_SelectionChange: function(grid, selected, eOpts){
        var record = selected && selected[0],
            preview = this.getPreview({root:this.getMainview({from:grid})});

        // preview && preview.fireEvent('doload', preview, record);
        preview && preview.setValue(record && record.get('surat_klise_isi'))
    }

});
