Ext.define('SIPAS.controller.Sipas.kelas.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.kelas.List'
    ],

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },
    
    views: [
        'Sipas.kelas.Popup'
    ],

    models: [
        'Sipas.Kelas'
    ],

    stores: [
        'Sipas.kelas.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_kelas_popup' },
        { ref: 'grid',      selector: 'sipas_kelas_popup > grid' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel: 'Sipas.Kelas',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.kelas.aktif.List',


    launch: function(config){
        config = Ext.applyIf(config || {},{
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            view = $this.getView('Sipas.kelas.Popup').create(config),
            store = $this.getStore($this.storeList);
            store.reload();
        view.on('close', function(){
            Ext.callback(config.callback || Ext.emptyFn, config.scope || $this, [view]);
        }, $this);
        view.show(null, function(){
            store.load({
                callback: function(records, operation, success) {
                    Ext.callback(config.afterload || Ext.emptyFn, config.scope || $this, [records, success, store, view]);
                }
            });
        }, $this);
        return view;
    }
});