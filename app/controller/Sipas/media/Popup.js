Ext.define('SIPAS.controller.Sipas.media.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.media.List'
    ],

    views: [
        'Sipas.media.Popup'
    ],

    models: [
        'Sipas.Media'
    ],

    stores: [
        'Sipas.media.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_media_popup' },
        { ref: 'grid',      selector: 'sipas_media_popup > grid' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    defaultModel: 'Sipas.Media',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.media.aktif.List',

    launch: function(config){
        config = Ext.applyIf(config || {},{
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            view = $this.getView('Sipas.media.Popup').create(config),
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