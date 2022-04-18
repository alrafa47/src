Ext.define('SIPAS.controller.Sipas.session.profile.editor.pgs.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.session.profile.editor.pgs.List'
    ],
    
    views: [
        'Sipas.session.profile.editor.pgs.Form'
    ],

    stores: [
        'Sipas.staf.Combo'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_session_profile_editor_pgs_form' },
        { ref: 'grid',          selector: 'sipas_session_profile_editor_pgs_form grid' },
        { ref: 'btnKonfirm',    selector: 'sipas_session_profile_editor_pgs_form grid #btnKonfirm' },
        { ref: 'statusKonfirm', selector: 'sipas_session_profile_editor_pgs_form grid #statusKonfirm' },
        { ref: 'namaPgs',       selector: 'sipas_session_profile_editor_pgs_form grid #namaPgs' }
    ],

    api: {
        'read' : "server.php/sipas/staf_wakil_pgs/read?id={id}",
        'check' : "server.php/sipas/staf_wakil_pgs/check"
    },
    

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui'],
        'staf_overload': 'Pengganti sementara tidak boleh lebih dari satu',
        'date': 'Silahkan pilih tanggal berlaku terlebih dahulu'
    },

    defaultStore    : 'Sipas.staf.wakil.pgs.List',

    init: function(application) {
        this.control({
            'sipas_session_profile_editor_pgs_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            }
            // 'sipas_session_profile_editor_pgs_form #simpanAsisten': {
            //     click: this.onButtonSave_Click
            // }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            record = config.record,
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
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

    onMainview_LoadRecord: function(record, form){
        var $this = this,
            mainview = $this.getMainview({from:form}),
            grid = $this.getGrid({root:form}),
            store = grid.getStore(),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            storePgs = grid.getStore($this.defaultStore),
            proxy = storePgs.getProxy(),
            $data = grid.getStore().data.items;

            storePgs.removeAll();
            proxy.api.read = $this.getApi('read', {id: record.getId()});
            storePgs.reload();        
    },

    onMainview_ClearRecord: function(form, unbind){
        var grid = this.getGrid({root:form}),
            newStore = this.getStore(this.stores[0]);

        newStore.removeAll();
        grid.reconfigure(newStore);
    }

    // onButtonSave_Click: function(button, e, eOpts){
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         mainview = $this.getMainview({from:button}),
    //         grid = $this.getGrid({root:mainview}),
    //         store = grid.getStore(),
    //         message_success = $this.getMessage('message_success'),
    //         record = mainview.record;

    //     // if(store.getCount() > 1){
    //     //     $helper.showMsg({success:false, message:$this.getMessage('staf_overload')});
    //     //     return;
    //     // }
        
    //     if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
    //         $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
    //         return;
    //     }
    //     $helper.showConfirm({
    //         confirmTitle: 'Simpan Perubahan',
    //         confirmText : 'Apakah anda yakin ?',
    //         callback: function(button){
    //             grid.setLoading(true);
    //             if(button == 'yes'){
    //                 $helper.saveRecord({
    //                     record: record,
    //                     wait: true,
    //                     message: true,
    //                     callback: function(success, record, eOpts, response){
    //                         Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
    //                         grid.setLoading(false);
    //                         mainview.close();
    //                         // Ext.callback(view.callback, view, [success, record, eOpts]);
    //                     }
    //                 });
    //             } else {
    //                 grid.setLoading(false);
    //             }
    //         }
    //     });
    // }
})