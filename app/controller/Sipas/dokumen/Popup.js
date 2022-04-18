Ext.define('SIPAS.controller.Sipas.surat.berkas.Popup', {
    extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views:[
        'Sipas.surat.berkas.Popup'
    ],

    controllerPane: 'Sipas.surat.berkas.Pane',

    init: function(){
        this.control({
            "sipas_surat_berkas_popup #buttonDone":{
                click: this.onButtonDone_Click
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

    onButtonDone_Click: function (button, e, eOpts){
        this.getMainview({from:button}).close();
    }

});
