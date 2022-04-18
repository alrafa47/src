Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.riwayat.detail.Form'
    ],

    stores:[
        'Sipas.disposisi.riwayat.List'
    ],

    views:[
        'Sipas.disposisi.riwayat.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_disposisi_riwayat_list' },
        { ref: 'form',      selector: 'sipas_disposisi_riwayat_list > form' }
    ],

    defaultStore: 'Sipas.disposisi.riwayat.List',

    init: function(application) {
        this.control({
            'sipas_disposisi_riwayat_list': {
                load: this.onMainview_Load,
                loadbyrecord: this.onMainview_LoadByRecord,
                doreload: this.onMainview_DoReload
            },
            'sipas_disposisi_riwayat_list > #toolbarControl button[action]': {
                click: this.onButtonAction_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().load();
            });
        }
        return view;
    },

    onMainview_Load: function(mainview, record){
        if(record && record.isModel){
            mainview.fireEvent('loadbyrecord', mainview, record);
        }else{
            this.getModel('Sipas.disposisi.Masuk').load(record, {
                callback: function(r){
                    mainview.fireEvent('loadbyrecord', mainview, r);
                }
            });
        }
    },

    onMainview_LoadByRecord: function(mainview, record){
        var s = record.fetchRiwayat(),
            sorters1 = [{
                    property: 'disposisi_tgl',
                    direction: 'DESC'
                }];

        mainview.record = record;
        mainview.reconfigure(s);
        s.sort(sorters1);
        s.reload();
    },

    onMainview_DoReload: function(mainview){
        var store = mainview.getStore();
        store && store.reload();
    },

    onButtonAction_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});

        mainview && mainview.fireEvent('do'+button.action, mainview);
    }

});