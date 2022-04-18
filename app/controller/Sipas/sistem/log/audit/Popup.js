Ext.define('SIPAS.controller.Sipas.sistem.log.audit.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.sistem.log.audit.Popup'
    ],

    models: [
        'Sipas.Properti'
    ],

    refs : [
        { ref: 'mainview', selector: 'sipas_sistem_log_audit_popup' },
        { ref: 'form',     selector: 'sipas_sistem_log_audit_popup > form' },
        { ref: 'textarea', selector: 'sipas_sistem_log_audit_popup > form #auditData' }
    ],

    init: function(application) {
        this.control({
            'sipas_sistem_log_audit_popup': {
                show: this.onMainview_Show
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            record: null,
            callback: Ext.emptyFn,
            mode : 'view'
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel(this.models[0]).create({}),
            view = null,
            constrainParent = config.constrainTo || $this.getApplication().moduleView;

        switch(config.mode)
        {
            case 'view' :
                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    return c;
                })(config));
                view.show();
                break;
            
            case 'destroy' :
                
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this   = this,
            form    = $this.getForm({root:mainview}),
            textarea= $this.getTextarea({root:mainview}),
            record  = mainview.record,
            html    = [],
            exception  = ['dokumen_path', 'peran_akses'];

        // form.setLoading(true);
        data = Ext.decode(record.get('data'));
        Ext.Object.each(data, function(key, val){
            if(exception.indexOf(key) < 0){
                html.push(key+' : '+val+"\n");
            }
        });
        textarea.setValue(html.join(''));
        var codeMirror = CodeMirror.fromTextArea(textarea.getEl().down('textarea').dom, {
            mode: { 
              name: "text/javascript", json:true
            },
            theme: 'zenburn',
            lineNumbers: true,
            readOnly: true,
            anchor: '100% -20',
            styleActiveLine: true,
            matchBrackets: true
        });
        // form.setLoading(false);
    }
});