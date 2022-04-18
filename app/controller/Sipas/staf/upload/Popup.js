Ext.define('SIPAS.controller.Sipas.staf.upload.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views:[
        'Sipas.staf.upload.Popup'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_staf_upload_popup'}
    ],

    controllerPane: 'Sipas.staf.upload.Pane',

    init: function(){
        this.control({
            "sipas_staf_upload_popup sipas_com_button_save":{
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config || {},{
            reference: null,
            calback: Ext.emptyFn,
            scope: this
        });
        var $this = this,
            controllerPane = $this.getController($this.controllerPane),
            view = this.createView(config);
            
        view.add(controllerPane.launch({
            reference: config.reference
        }));
        view.on('close', function(){
            Ext.callback(config.callback, config.scope, []);
        });
        view.show();
    },

    onButtonSave_Click: function (button, e, eOpts){
        this.getMainview({from:button}).close();
    }

});
