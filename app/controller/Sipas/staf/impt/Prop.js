Ext.define('SIPAS.controller.Sipas.staf.impt.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Staf'
    ],

    views: [
        'Sipas.staf.impt.Prop'
    ],

    stores: [
        'Sipas.staf.impt.List'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_staf_impt_prop'},
        { ref: 'form',          selector: 'sipas_staf_impt_prop > form'},
        { ref: 'list',          selector: 'sipas_staf_impt_prop gridpanel#listImpt'}
    ],

    api: {
        upload      : 'server.php/sipas/staf/import_staf'
    },

    messages: {
        invalidlink: ['Tautan tidak valid', 'Silahkan masukkan alamat tautan yang valid'],
        upload_failed_max : 'Gagal mengunggah dokumen karena File terlalu Besar.',
        upload_failed_ext : 'File tidak termasuk dalam tipe file yang di izinkan untuk di unggah'
    },

    init: function()
    {
        this.control({
            'sipas_staf_impt_prop' :{
                show: this.onMainview_Show
            },
            'sipas_staf_impt_prop form filefield#fileUpload' : {
                change: this.onFileUpload_Change
            },
            'sipas_staf_impt_prop gridpanel button#btnClear' : {
                click: this.onBtnClear_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: null,
            arsip: null,
            surat: null,
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
                    
                    // if(config.mode === 'view'){
                    //     c.readonlyComponents = ['[name=dokumen_nama]','#upload','#picture','#pdf'];
                    // }
                    return c;
                })(config));

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

    onMainview_Show: function(mainview){},

    onFileUpload_Change: function(filefield, value, eOpts)
    {
        var $this = this,
            dokumenInduk = null,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:filefield}),
            form = $this.getForm({root:view}),
            list = $this.getList({root:view});
        
        view.setLoading(true);
        form.getForm().submit({
            url: $this.getApi('upload'),
            success: function(form, action){
                var data = Ext.decode(action.response.responseText)
                    store = list.getStore();

                if(data.total > 0){
                    store.removeAll();
                    Ext.Object.each(data.data, function(key, records){
                        store.add(records);
                    });
                }

                view.setLoading(false);
            },
            failure: function(form, action){
                var result = action.result;
                view.setLoading(false);
                view.close();
                
                if(result) $helper.showMsg({success:false, message: result.message});
                else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
            }
        });
    },

    onBtnClear_Click: function(button, e, eOpts){
        var $this = this,
            view  = $this.getMainview({from:button}),
            list  = $this.getList({root:view}),
            store = list.getStore();

            if(store){
                store.removeAll();
            }
    }
});