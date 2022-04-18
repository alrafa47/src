Ext.define('SIPAS.controller.Sipas.jenis.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jenis.List'
    ],

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },
    
    views: [
        'Sipas.jenis.Popup'
    ],

    models: [
        'Sipas.Jenis'
    ],

    stores: [
        'Sipas.jenis.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_jenis_popup' },
        { ref: 'grid',      selector: 'sipas_jenis_popup > grid' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    defaultModel: 'Sipas.Jenis',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.jenis.aktif.List',


    launch: function(config){
        config = Ext.applyIf(config || {},{
            mode: null,
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            view = $this.getView('Sipas.jenis.Popup').create(config),
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
        view.show();
        return view;
    }
});