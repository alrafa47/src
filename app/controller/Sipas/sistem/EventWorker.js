Ext.define('SIPAS.controller.Sipas.sistem.EventWorker', {
    extend: 'Ext.app.Controller',
    
    messages: {
        'connection_failed': ['Gagal', 'Gagal melakukan koneksi ke server Messaging'],
        'disconnected': ['Perhatian', 'Koneksi ke server messaging terputus'],
        'reconnected': ['Perhatian', 'Anda sudah tersambung kembali dengan server messaging']
    },

    stores: {
        'staf/receive/disposisi_masuk': ['Sipas.tugassaya.session.List', 'Sipas.masuk.session.kotak.List'],
        'staf/receive/draf': ['Sipas.tugassaya.session.List', 'Sipas.koreksi.session.draf.List'],
        'staf/receive/terkirim': ['Sipas.riwayat.session.terkirim.List'],
        'asistensi/receive/disposisi_masuk': ['Sipas.staf.wakil.monitoring.tugassaya.List', 'Sipas.staf.wakil.monitoring.kotak.List'],
        'asistensi/receive/draf': ['Sipas.staf.wakil.monitoring.tugassaya.List', 'Sipas.staf.wakil.monitoring.draf.List'],
        'asistensi/receive/terkirim': ['Sipas.staf.wakil.monitoring.disposisi.riwayat.Aktif'],
        'unit/receive/surat_imasuk': ['Sipas.internal.masuk.agenda.list.approved.semua.List'],
        'unit/receive/surat_ikeluar': ['Sipas.internal.keluar.agenda.List'],
        'unit/receive/surat_masuk': ['Sipas.masuk.agenda.aktif.List'],
        'unit/receive/surat_keluar': ['Sipas.keluar.agenda.List']
    },

    init: function(application){
        application.on({
            'eventWorker/dispatch': this.onDispatch_Message,
            'eventWorker/doDispatch': this.onDoDispatch,
            scope: this
        });
        
    },
    
    onDispatch_Message: function (msg, callback) {
        console.log('dispatcher', msg);
        if (!msg) return false;

        var $this = this,
            app = $this.getApplication(),
            event = msg.event,
            data = msg.data,
            scopes = msg.scopes;

        app.fireEvent('eventWorker/doDispatch', msg, function () {
            console.log('do dispatch callback');
        });
    },

    onDoDispatch: function (payload, callback) {
        var $this = this,
            app = $this.getApplication(),
            $localStorage = $app.LocalStorage(),
            cureentUser = $localStorage.getValue('currentUser'),
            pimpinan = $localStorage.getValue('pimpinan'),
            stores = $this.stores[payload.event];

        if(payload.to == cureentUser){
            console.log(payload.data.id);
            var api = payload.data.api;
            params = {
                id: payload.data.id
            };
            Ext.Ajax.request({
                url: 'server.php/sipas/'+api+'/read',
                method: 'get',
                params: params,
                callback: function(options, success, response){
                    var res = Ext.decode(response.responseText, true) || {};
                    Ext.each(stores, function (item) {
                        var store = Ext.StoreManager.get(item);
                        store.insert(0, res.data);

                        var records = Ext.Array.clone(store.data.items);
                        Ext.Array.forEach(records, function(value, key) {
                          value.index = key;
                        });

                        store.removeAll();
                        Ext.Array.each(records, function(r){
                            store.add(r);
                        });
                    });                
                }
            });
        }else if(payload.to == pimpinan){
            console.log(payload.data.id);
            var api = payload.data.api;
            params = {
                id: payload.data.id
            };
            Ext.Ajax.request({
                url: 'server.php/sipas/'+api+'/read',
                method: 'get',
                params: params,
                callback: function(options, success, response){
                    var res = Ext.decode(response.responseText, true) || {};
                    Ext.each(stores, function (item) {
                        var store = Ext.StoreManager.get(item);
                        store.insert(0, res.data);

                        var records = Ext.Array.clone(store.data.items);
                        Ext.Array.forEach(records, function(value, key) {
                          value.index = key;
                        });

                        store.removeAll();
                        Ext.Array.each(records, function(r){
                            store.add(r);
                        });
                    });         
                }
            });   
        }

        if (callback && Ext.isFunction(callback)) Ext.callback(callback, {}, {}, 10);
    }
});