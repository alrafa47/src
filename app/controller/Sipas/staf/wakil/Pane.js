Ext.define('SIPAS.controller.Sipas.staf.wakil.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.wakil.Form',
        'Sipas.staf.List'
    ],

    views: [
        'Sipas.staf.wakil.Pane'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_wakil_pane' },
        { ref: 'form',      selector: 'sipas_staf_wakil_pane sipas_staf_wakil_form' },
        { ref: 'grid',      selector: 'sipas_staf_wakil_pane sipas_staf_list' },
        { ref: 'list',      selector: 'sipas_staf_wakil_pane sipas_staf_wakil_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' berhasil menambah pelaksana harian']
    },

    controllerstafList: 'Sipas.staf.List',

    init: function(application) {
        this.control({
            'sipas_staf_wakil_pane sipas_staf_list': {
                selectionchange: this.onGridstaf_SelectionChange
            },
            'sipas_staf_wakil_pane sipas_staf_wakil_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        $this.getController($this.controllerstafList).refresh();

        return view;
    },

    onButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            grid = this.getList({root:mainview}),
            $helper = this.getApplication().Helper(),
            store = grid.getStore(),
            message_success = this.getMessage('message_success');

        grid.setLoading(true);
        store.sync({
            callback: function(){
                grid.setLoading(false);
                store.reload();
            },
            success: function(){
                $helper.showMessage({success: true, message: message_success});
            }
        });
    },

    onGridstaf_SelectionChange: function(grid, selection, eOpts){
        var form = this.getForm({
            root:this.getMainview('grid')
        });
        if(!form) return;
        
        form.setDisabled(selection.length != 1);
        if(selection.length){
            form.loadRecord(selection[0]);
        }else{
            form.reset(true);
        }
    }

});