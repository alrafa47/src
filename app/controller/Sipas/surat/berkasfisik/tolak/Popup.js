Ext.define('SIPAS.controller.Sipas.surat.berkasfisik.tolak.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',
    
    views: [
        'Sipas.surat.berkasfisik.tolak.Popup'
    ],

    models: [
        'Sipas.disposisi.Masuk'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_surat_berkasfisik_tolak_popup' },
        { ref: 'form',          selector: 'sipas_surat_berkasfisik_tolak_popup form' },
        { ref: 'comment',       selector: 'sipas_surat_berkasfisik_tolak_popup form [name=disposisi_masuk_berkas_komentar]' }
    ],

    defaultModel: 'Sipas.disposisi.Masuk',
    controllerHelper: 'Sipas.Helper',
    
    init: function(application) {
        this.control({
            'sipas_surat_berkasfisik_tolak_popup': {
                show: this.onMainview_Show
            },
            "sipas_surat_berkasfisik_tolak_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = $this.createRecord(config.record),
            view = null;

        view = $this.createView((function(c){
            c.removeComponents = [];
            c.readonlyComponents = [];
            c.requireComponents = ['[name=disposisi_masuk_berkas_komentar]'];
            c.removeComponents = [];

            return c;
        })(config));
        view.show();
    },

    onMainview_Show: function(mainview){
        var $this = this,
            form = $this.getForm({root:mainview}),
            record = mainview.record;

        // form.loadRecord(record);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            profil = $session.getProfile(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            record = mainview.record,
            // record = form.updateRecord().getRecord(),
            comment = $this.getComment({root:mainview});

        if (!comment.getValue()){
            $helper.showMsg({success: false, message: 'Anda belum memberi komentar'});
        } else {
            mainview.setLoading(true);
            $helper.showConfirm({
                confirmTitle: 'Konfirmasi',
                confirmText : 'Apakah anda yakin ?',
                callback: function(button){
                    if(button == 'yes'){
                        record.doDeclineReqBerkas({
                            staf: $session.getProfileId(),
                            comment: comment.getValue(),
                            callback: function(success, records, operation){
                                record.getSurat(function(surat){
                                    Ext.callback(mainview.callback, mainview, [success, surat, eOpts]);
                                });
                                mainview.close();

                            }
                        });
                    } else {
                        mainview.setLoading(false);
                    }
                }
            });
        }
    }
});