Ext.define('SIPAS.controller.Sipas.session.ganti.Akun', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    models: [
        'Sipas.session.Akun'
    ],

    stores: [
        'Sipas.session.Akun'
    ],

    api: {
        'session_info'              :'server.php/sipas/account/info/session'
    },

    // api: {
    //     'datasource':'server.php/sipas/surat_masuk/distribusi?scope={scope}'
    // },

    views: [
        'Sipas.session.ganti.Akun'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_session_ganti_akun'},
        { ref: 'grid',      selector: 'sipas_session_ganti_akun grid'}
    ],

    defaultStore: 'Sipas.session.Akun',
    controllerLogin: 'Sipas.Door',

    init: function(application) {
        this.control({
            "sipas_session_ganti_akun grid": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    launch: function(config) {
        var store = this.getStore(this.defaultStore);
        config = Ext.applyIf(config || {},{
            url: store && store.getProxy().url,
            multiselect: false,
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            aftershow: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            $app = $this.getApplication(),
            view = $this.createView(config),
            $localStorage = $app.LocalStorage(),
            accounts = $localStorage.getValue('loggedUser'),
            grid = view && view.down('treepanel,gridpanel'),
            store = grid && grid.getStore(),
            selectionModel = grid && grid.getSelectionModel();

        view.on('afterrender', function(){
            // $this.refresh();
            data = JSON.parse(accounts);
            store.loadData(data);
            Ext.callback(config.aftershow, $this, [view, grid, $this]);
        });

        view.show();
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $eventbrowser = $app.EventBrowser(),
            $localStorage = $app.LocalStorage(),
            accounts = $localStorage.getValue('loggedUser'),
            // urlSessInfo= $this.getApi('session_info'),
            record = selected;
            
        if(!record.get('isAktif')){
            accountArr = JSON.parse(accounts);
            $helper.showConfirm({
                confirmTitle: 'Ganti Profil',
                confirmText : 'Apakah anda yakin ?',
                callback: function(button){
                    if(button == 'yes'){
                        newArr = $helper.switchActiveAccount(accountArr, record.get('staf_id'));
                        $localStorage.setValue('loggedUser',JSON.stringify(newArr));
                        $helper.setCurrentUser(record.get('staf_id'));
                        // if(!$app.emitterConfigExist('staf', record.get('staf_id'))){
                        //     $app.fireEvent('msgbroker/requestChannel', {
                        //         channelType: "staf",
                        //         channel: record.get('staf_id')
                        //     });
                        // }

                        Ext.defer(function(){
                            window.location.reload()
                        }, 250);
                    }
                }
            });
        }
    }
});