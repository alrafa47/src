Ext.define('SIPAS.controller.Sipas.klise.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.klise.List',
        'Sipas.klise.preview.Pane'
    ],

    stores:[
        'Sipas.klise.List'
    ],

    views: [
        'Sipas.klise.Compact'
    ],
    
    refs:[
        { ref : 'mainview', selector: 'sipas_klise_compact' },
        { ref : 'list',     selector: 'sipas_klise_compact sipas_klise_list' },
        { ref : 'preview',  selector: 'sipas_klise_compact sipas_klise_preview_pane' }
    ],

    defaultStore: 'Sipas.klise.List',
    controllerProperty: 'Sipas.klise.Prop',

    init: function(application){
        this.control({
            'sipas_klise_list': {
                selectionchange: this.onList_SelectionCnange
            },
            'sipas_klise_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);

        return view;
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:model.view}),
            list = $this.getList({root:view}),
            preview = $this.getPreview({root:view});
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: list.mailValue,
            mode:'view',
            record: record,
            callback: function(success, record){
                if(success && view){
                    list.getView().refresh();
                    preview && preview.fireEvent('doload', preview, record);
                }
            }
        })
    },

    onList_SelectionCnange: function(grid, selected, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: grid}),
            preview = this.getPreview({root:mainview});
            record = selected && selected[0],

        preview && preview.fireEvent('doload', preview, record);
    }

});