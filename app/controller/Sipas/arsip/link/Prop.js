Ext.define('SIPAS.controller.Sipas.arsip.link.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.arsip.link.Prop'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_arsip_link_prop'},
        { ref: 'form',          selector: 'sipas_arsip_link_prop > form'},
        { ref: 'cmpLink',       selector: 'sipas_arsip_link_prop > form [name=dokumen_file]'},
    	{ ref: 'cmpNama',       selector: 'sipas_arsip_link_prop > form [name=dokumen_nama]'}
    ],

    api: {
        upload : 'server.php/sipas/dokumen/create/link',
        update : 'server.php/sipas/dokumen/update/link'
    },

    messages: {
        invalidlink: ['Tautan tidak valid', 'Silahkan masukkan alamat tautan yang valid']
    },

    init: function()
    {
        this.control({
            'sipas_arsip_link_prop': {
                dosave: this.onMainview_DoSave,
                doedit: this.onMainview_DoEdit
            },
            'sipas_arsip_link_prop toolbar button[action]': {
                click: this.onMainview_Action
            },
            'sipas_arsip_link_prop textfield[name=dokumen_file]': {
                specialkey: this.onTextLink_SpecialKey
            },
            'sipas_arsip_link_prop #buttonOpenLink': {
                click: this.onButtonOpenLink_Click
            },
            'sipas_arsip_link_prop sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            surat: null,
            arsip: null,
            record: null,
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
                    
                    if(config.mode === 'view'){
                        c.removeComponents = ['#toolbarBottom'];
                        c.readonlyComponents = ['[name=dokumen_nama]','[name=dokumen_file]'];
                    }
                    if(config.mode === 'add'){
                        c.removeComponents = ['sipas_com_button_edit'];
                    }
                    if(config.mode === 'edit'){
                        c.removeComponents = ['sipas_com_button_save'];
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

    validateLink: function(link)
    {
        var urlReg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if( urlReg.test(link) )
        {
            return true;
        }

        var $this = this,
            $helper = $this.getApplication().Helper(),
            msg = $this.getMessage('invalidlink');

        $helper.showMessage({title:msg[0], message:msg[1]});

        return false;
    },

    onMainview_DoSave: function(mainview)
    {
        var $this = this,
            cmpLink = $this.getCmpLink({root:mainview}),
            cmpNama = $this.getCmpNama({root:mainview}),
            value = cmpLink.getValue(),
            form = $this.getForm({root:mainview}),
            surat = mainview.surat,
            arsip = mainview.arsip,
            record = mainview.record,
            callback = mainview.callback || Ext.emptyFn,
            scope = mainview.scope || $this;

        if($this.validateLink(value))
        {
            mainview.setLoading(true);
            Ext.Ajax.request({
                url: $this.getApi('upload'),
                params: {
                    'surat_id'      : surat && surat.get('surat_id'),
                    'dokumen_arsip' : arsip && arsip.get('arsip_id'),
                    'dokumen_nama'  : cmpNama.getValue(),
                    'dokumen_file'  : value,
                    'dokumen_isactive'  : true
                },
                success: function(response, eOpts){
                    mainview.setLoading(false);
                    mainview.close();
                    Ext.callback(callback, scope, [cmpNama.getValue()]);
                }
            });
        }
    },

    onMainview_DoEdit: function(mainview)
    {
        var $this = this,
            cmpLink = $this.getCmpLink({root:mainview}),
            cmpNama = $this.getCmpNama({root:mainview}),
            linkValue = cmpLink.getValue(),
            namaValue = cmpNama.getValue(),
            form = $this.getForm({root:mainview}),
            record = mainview.record,
            dokumenInduk = record.get('dokumen_induk'),
            callback = mainview.callback || Ext.emptyFn,
            scope = mainview.scope || $this;

        if($this.validateLink(linkValue))
        {
            if(dokumenInduk === null){
                dokumenInduk = record.get('dokumen_id');
            }
            mainview.setLoading(true);
            Ext.Ajax.request({
                url: $this.getApi('update'),
                params: {
                    'dokumen_arsip'     : record.get('dokumen_arsip'),
                    'dokumen_previous'  : record.get('dokumen_id'),
                    'dokumen_induk'     : dokumenInduk,
                    'dokumen_nama'      : namaValue,
                    'dokumen_file'      : linkValue
                },
                success: function(response, eOpts){
                    mainview.setLoading(false);
                    mainview.close();
                    Ext.callback(callback, scope, [namaValue]);
                }
            });
        }
    },

    onTextLink_SpecialKey: function(field, e)
    {
        if (e.getKey() == e.ENTER)
        {
            var $this = this,
                mainview = $this.getMainview({from:field});
            mainview.fireEvent('dosave',mainview);
        }
    },

    onButtonOpenLink_Click: function(mainview)
    {
        var $this = this,
            view = $this.getMainview({from:mainview}),
            cmpLink = $this.getCmpLink({root:view}),
            urlLink = cmpLink.getValue();

        if($this.validateLink(urlLink))
        {
            if (urlLink.indexOf("http://") >= 0 || urlLink.indexOf("https://") >= 0)
            {
                window.open(urlLink, '_blank');
            } else {
                window.open('http://'+urlLink, '_blank');
            }
        }
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}) || $this.getMainview();
        mainview.fireEvent('dosave',mainview);
    }
});