Ext.define('SIPAS.controller.Sipas.surat.penerima.keputusan.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.surat.penerima.keputusan.List'
    ],

    views: [
        'Sipas.surat.penerima.keputusan.Popup'
    ],

    models: [
        'Sipas.surat.Penerimask'
    ],

    stores: [
        'Sipas.surat.penerima.keputusan.List'
    ],

    api: {
        save    : 'server.php/sipas/surat_penerimask/save'
    },

    refs : [
        { ref: 'mainview',              selector: 'sipas_surat_penerima_keputusan_popup' },
        { ref: 'list',                  selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list' },
        { ref: 'golLama',               selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list #golLama'},
        { ref: 'golBaru',               selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list #golBaru'},
        { ref: 'sgLama',                selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list #sgLama'},
        { ref: 'sgBaru',                selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list #sgBaru'},
        { ref: 'btnExport',             selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list sipas_com_button_download'},
        { ref: 'btnImport',             selector: 'sipas_surat_penerima_keputusan_popup sipas_surat_penerima_keputusan_list sipas_com_button_download'},
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data'],
        'response_invalid': 'Server tidak memberikan valid response',
        'message_invalid': 'Gagal menampilkan pesan',
        'receiver_exist': ['Info', 'Staf dengan Nama:{id} sudah masuk dalam daftar']
    },

    init: function(application) {
        this.control({
            'sipas_surat_penerima_keputusan_popup': {
                show: this.onMainview_Show,
            },
            "sipas_surat_penerima_keputusan_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'add',
            record: null,
            idsurat: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app = $this.getApplication(),
            record = this.createRecord(config.record),
            $session = $app.Session(),
            $helper = $app.Helper(),
            view = null;        

        config.record = record;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'ubah' :
            case 'view' :
            case 'lihat' :
            case 'bank' :

                view = $this.createView( (function(c){
                    c.removeComponents = [];
                    if(c.mode === 'view' || c.mode === 'ubah' || c.mode === 'bank' || c.mode === 'lihat') {
                        c.removeComponents = ['#fieldSearch', '#buttonManual', 'sipas_com_button_download', 'sipas_com_button_upload', 'sipas_com_button_save'];
                    }

                    if(c.recSurat.get('surat_model_sub') == 1) {
                        c.removeComponents.push('sipas_com_button_download', 'sipas_com_button_upload');
                    }
                    return c;
                })(config) );
                view.show();
                break;

            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                });
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            record = mainview.record,
            recSurat = mainview.recSurat,
            list = $this.getList({root:mainview}),
            newStore = recSurat.fetchPenerimask();

        record.set({
            'surat_penerimask_surat' : recSurat.get('surat_id')
        });
        record.commit();
        
        list.reconfigure(newStore);
        list.setLoading(true);
        newStore.load({
            callback: function(){
                list.setLoading(false);
                newStore.each(function(record){
                });
            }
        });

        list.fireEvent('show', list);
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            list = $this.getList({root:mainview}),
            store = list.getStore(),
            level = 0,
            msgBerhasil = $this.getMessage('success');

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }

        store.each(function(record){
            record.set({
                'surat_penerimask_level' : level,
                'surat_penerimask_surat' : mainview.idsurat
            });
            level++;
        });


        list.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, response){
                            var record = Ext.decode(response.responseText, true);
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                            list.setLoading(false);
                            mainview.close();
                        },
                        success: function(){
                            list.setLoading(false);
                            $helper.showMessage({success: true, message: msgBerhasil[1]});
                        }
                    });
                } else {
                    list.setLoading(false);
                }
            }
        });
    }
});
