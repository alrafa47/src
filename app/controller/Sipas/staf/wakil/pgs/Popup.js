Ext.define('SIPAS.controller.Sipas.staf.wakil.pgs.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.staf.wakil.pgs.Form'
    ],

    store:[
        'Sipas.staf.wakil.pgs.List',
        'Sipas.staf.wakil.pgs.Combo'
    ],

    views: [
        'Sipas.staf.wakil.pgs.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_wakil_pgs_popup' },
        { ref: 'form',      selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form' },
        { ref: 'grid',      selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form grid' },
        { ref: 'cari',      selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form grid #fieldSearch' },
        { ref: 'tambah',    selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form grid #buttonManual' },
        { ref: 'simpan',    selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form #simpanAsisten' },
        { ref: 'btnHapus',  selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_list #btnHapus' },
        { ref: 'namaPgs',   selector: 'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_list #namaPgs' }
    ],

    api: {
        'check' : "server.php/sipas/staf_wakil_pgs/check"
    },
    messages: {
        'message_success': ['Berhasil mengubah pengganti sementara'],
        'staf_overload': 'Pengganti sementara tidak boleh lebih dari satu',
        'date': 'Silahkan pilih tanggal berlaku terlebih dahulu'
    },

    defaultStore    : 'Sipas.staf.wakil.pgs.List',
    
    init: function(application) {
        this.control({
            'sipas_staf_wakil_pgs_popup': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_staf_wakil_pgs_popup sipas_staf_wakil_pgs_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = $this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = ['[action=removerecord]'];

                    return c;
                })(config));
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            simpan = $this.getSimpan({root:mainview}),
            tambah = $this.getTambah({root:mainview}),
            cari = $this.getCari({root:mainview}),
            form = $this.getForm({root:mainview}),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            grid = $this.getGrid({root:mainview}),
            namaPgs = $this.getNamaPgs({root:mainview}),
            btnHapus = $this.getBtnHapus({root:mainview}),
            langNamaPgsKu = $language.getGrammar('daftar_pgsku', false),
            langNamaDiPgs = $language.getGrammar('daftar_dipgs', false),
            record = mainview.record;

        if(!form) return;
        grid.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('check'),
            params: {
                'id' : record.getId()   
            },
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText);

                if (res.checkPgs == 1) {
                    grid.setLoading(false);
                    grid.columns[4].destroy(); //btnKonfirm
                    namaPgs.setText(langNamaPgsKu);
                } else {
                    grid.setLoading(false);

                    btnHapus.hide();
                    simpan.hide();
                    tambah.hide();
                    cari.hide();
                    grid.columns[5].destroy(); //statusKonfirm
                    namaPgs.setText(langNamaDiPgs);
                }
                form.loadRecord(record);
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            grid = $this.getGrid({root:mainview}),
            store = grid.getStore(),
            message_success = $this.getMessage('message_success'),
            record = mainview.record;

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                grid.setLoading(true);
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
                    // $helper.saveRecord({
                    //     record: record,
                    //     form: form,
                    //     wait: true,
                    //     message: true,
                    //     callback: function(success, record, eOpts, response){
                    //         Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                    //         grid.setLoading(false);
                    //         mainview.close();
                    //         // Ext.callback(view.callback, view, [success, record, eOpts]);
                    //     }
                    // });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    }

});