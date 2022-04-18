Ext.define('SIPAS.controller.Sipas.arsip.sdoc.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.arsip.sdoc.Prop'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_arsip_sdoc_prop'},
        { ref: 'form',              selector: 'sipas_arsip_sdoc_prop form'},
        { ref: 'cmpName',           selector: 'sipas_arsip_sdoc_prop form #txtName'},
        { ref: 'hiddenFile',        selector: 'sipas_arsip_sdoc_prop form #hiddenFile'},
        { ref: 'hiddenIspetikan',   selector: 'sipas_arsip_sdoc_prop form #hiddenIspetikan'},
        { ref: 'txtKlise',          selector: 'sipas_arsip_sdoc_prop form [name=dokumen_preview]'}
    ],

    messages: {
        'fieldRequire': ['Peringatan', 'Nama dan Template tidak boleh kosong']
    },

    api: {
        dokumen : 'server.php/sipas/dokumen/generateTemplate'
    },

    controllerLookup: 'Sipas.klise.Lookup',

    init: function()
    {
        this.control({
            'sipas_arsip_sdoc_prop': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_arsip_sdoc_prop sipas_com_button_edit': {
                click: this.onButtonEdit_Click
            },
            'sipas_arsip_sdoc_prop sipas_com_button_view': {
                click: this.onButtonView_Click
            },
            'sipas_arsip_sdoc_prop #btnChoose': {
                click: this.onButtonTemplate_Click
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            surat: surat,
            arsip: arsip,
            record: record,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            surat = config.surat,
            arsip = config.arsip,
            record = $this.createRecord(config.record),
            view = null;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    if(config.mode === 'add'){
                        c.removeComponents = ['sipas_com_button_view'];
                    }                    
                    if(config.mode === 'view'){
                        c.removeComponents = ['sipas_com_button_edit', '#containerTemplate'];
                        c.readonlyComponents = ['[name=dokumen_nama]','[name=dokumen_preview]'];
                    }
                    if(config.mode === 'edit'){
                        c.removeComponents = ['sipas_com_button_view'];
                    }
                    return c;
                })(config));
                
                var form = this.getForm({root:view});

                form.loadRecord(record);
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_AfterRender: function(mainview, eOpts)
    {
        if(mainview.mode || true)
        {
            // focus the textfield for first launch
            var cmpName = this.getCmpName({root:mainview});

            cmpName.focus();
        }
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            controllerEditor = $this.getController('Sipas.sdoc.editor.Popup'),
            mainview = $this.getMainview({from:button}),
            cmpName = $this.getCmpName({root:mainview}),
            hiddenFile = $this.getHiddenFile({root:mainview}),
            surat = mainview.surat,
            arsip = mainview.arsip,
            record = mainview.record,
            file = hiddenFile.getValue(),
            name = cmpName.getValue();

        mainview.close();
        controllerEditor.launch({
            sdoc: {
                name: name,
                value: Ext.util.Format.htmlDecode(file)
            },
            surat: surat,
            arsip: arsip,
            record: record,
            mode : 'view',
            callback: function(sdoc){
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts)
    {
        var $this = this,
            defaultName = new Date(),
            controllerEditor = $this.getController('Sipas.sdoc.editor.Popup'),
            mainview = $this.getMainview({from:button}),
            message = $this.getMessage('fieldRequire'),
            cmpName = $this.getCmpName({root:mainview}),
            klise = $this.getTxtKlise({root:mainview}),
            checkSession = this.getApplication().getSession().getResetSession(),
            hiddenFile = $this.getHiddenFile({root:mainview}),
            hiddenIspetikan = $this.getHiddenIspetikan({root:mainview}),
            surat = mainview.surat,
            arsip = mainview.arsip,
            record = mainview.record,
            file = hiddenFile.getValue(),
            ispetikan = hiddenIspetikan.getValue(),
            name = cmpName.getValue(),
            callback = mainview.callback || Ext.emptyFn,
            scope = mainview.scope || $this;

        if(name && file){
            if(mainview.mode === 'add'){
                name = name + '.sdoc'
            }
            else{
                file = Ext.util.Format.htmlDecode(file);
            }

            mainview.setLoading(true);
            Ext.Ajax.request({
                url: $this.getApi('dokumen'),
                params: {
                    'template'  : file,
                    'surat'     : surat && surat.getId()
                },
                success: function(response, eOpts){
                    mainview.setLoading(false);
                    mainview.close();
                    var objres = Ext.decode(response.responseText, 1) || {};

                    if(name === null){
                        name = defaultName;
                    }
                    controllerEditor.launch({
                        sdoc: {
                            name: name,
                            value: objres
                        },
                        surat: surat,
                        ispetikan: ispetikan,
                        arsip: arsip,
                        record: record,
                        mode : mainview.mode,
                        callback: function(sdoc){
                            Ext.callback(callback, scope, [sdoc]);
                        }
                    });
                }
            });
        }else{
            Ext.Msg.alert(message[0], message[1]);
        }
    },

    onButtonTemplate_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            controllerLookup = $this.getController($this.controllerLookup);

            controllerLookup.launch({
                multiselect: false,
                callback: function(selection){
                    $this.setTemplate(selection[0], mainview);
                }
            });
    },

    setTemplate: function(record, mainview){
        var $this = this,
            cmpName = $this.getCmpName({root:mainview}),
            hiddenFile = $this.getHiddenFile({root:mainview}),
            hiddenIspetikan = $this.getHiddenIspetikan({root:mainview}),
            txtKlise = $this.getTxtKlise({root:mainview});

        hiddenFile.setValue(record.get('klise_isi'));
        hiddenIspetikan.setValue(record.get('klise_ispetikan'));
        txtKlise.setValue(record.get('klise_nama'));
    }
});