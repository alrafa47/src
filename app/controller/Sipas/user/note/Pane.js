Ext.define('SIPAS.controller.Sipas.user.note.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Usernote'
    ],
    
    stores: [
        'Sipas.user.note.List'
    ],
    
    views: [
        'Sipas.user.note.Pane'
    ],
    
    refs: [
        {ref: 'pane', selector: '#paneSipasUserNote'},
        {ref: 'grid', selector: '#paneSipasUserNote > grid'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    delegateView: 'Sipas.user.note.Pane',
    delegateViewSelector: '#paneSipasUserNote',
    defaultModel: 'Sipas.Usernote',

    controllerProperty: 'Sipas.user.note.Prop',

    init: function(application) {
        this.control({
            "#paneSipasUserNote sipas_com_button_add": {
                click: this.onButtonAdd_Click
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getDelegateView(button),
            controllerProperty = $this.controllerProperty;

        $this.getController(controllerProperty).launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                }
            }
        });
    },

    launch: function(container) {
       var $this = this,
            view = this.getView($this.delegateView || $this.views[0]);
            viewInstance = view && view.create();

        if(viewInstance){
            viewInstance.on('afterrender', function(){
                viewInstance.getStore().load();
            });
        }
        return viewInstance;
    }

});