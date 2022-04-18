Ext.define('SIPAS.controller.Sipas.staf.wakil.atasan.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.staf.wakil.atasan.Form'
    ],

    store:[
        'Sipas.staf.wakil.atasan.List',
        'Sipas.staf.wakil.asisten.Combo'
    ],

    views: [
        'Sipas.staf.wakil.atasan.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_wakil_atasan_popup' },
        { ref: 'form',      selector: 'sipas_staf_wakil_atasan_popup sipas_staf_wakil_atasan_form' },
        { ref: 'grid',      selector: 'sipas_staf_wakil_atasan_popup sipas_staf_wakil_atasan_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil mengubah pimpinan untuk dimonitor']
    },

    // controllerstafList: 'Sipas.staf.List',

    init: function(application) {
        this.control({
            'sipas_staf_wakil_atasan_popup': {
                show: this.onMainview_Show
            },
            'sipas_staf_wakil_atasan_popup sipas_staf_wakil_atasan_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var form = this.getForm({root:mainview}),
            grid = this.getGrid({root:mainview}),
            record = mainview.record;

        grid.record = mainview.record;

        if(!form) return;
    
        form.loadRecord(record);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = this.getMainview({from:button}),
            grid = this.getGrid({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_success');

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        grid.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, response){
                            var record = Ext.decode(response.responseText, true);
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                            grid.setLoading(false);
                            mainview.close();
                        },
                        success: function(){
                            grid.setLoading(false);
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    }

});