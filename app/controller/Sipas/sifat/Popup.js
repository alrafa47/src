Ext.define('SIPAS.controller.Sipas.sifat.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sifat.List'
    ],

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },
    
    views: [
        'Sipas.sifat.Popup'
    ],

    models: [
        'Sipas.Sifat'
    ],

    stores: [
        'Sipas.sifat.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_sifat_popup' },
        { ref: 'grid',      selector: 'sipas_sifat_popup > grid' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    defaultModel: 'Sipas.sifat',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.sifat.aktif.List',
    


    launch: function(config){
        config = Ext.applyIf(config || {},{
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            view = $this.getView('Sipas.sifat.Popup').create(config),
            store = $this.getStore($this.storeList);
            
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