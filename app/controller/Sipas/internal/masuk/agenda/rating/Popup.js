Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.rating.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.internal.masuk.agenda.rating.Popup'
    ],

    models: [
        'Sipas.surat.Ulasan'
    ],

    stores: [
        'Sipas.internal.masuk.agenda.rating.List'
    ],

    messages: {
        invalidMode: ['Error', 'Mode tidak sesuai']
    },

    api: {
        profile_image: 'server.php/sipas/staf/get_image/foto?id={id}'
    },

    refs : [
        { ref: 'mainview',      selector: 'sipas_internal_masuk_agenda_rating_popup' },
        { ref: 'form',          selector: 'sipas_internal_masuk_agenda_rating_popup > form' },
        { ref: 'btnSave',       selector: 'sipas_internal_masuk_agenda_rating_popup sipas_com_button_save' },
        { ref: 'grid',          selector: 'sipas_internal_masuk_agenda_rating_popup form grid'},
        { ref: 'nilai',          selector: 'sipas_internal_masuk_agenda_rating_popup form #ratingNilai'},
        { ref: 'nama',          selector: 'sipas_internal_masuk_agenda_rating_popup form #stafNama'},
        { ref: 'tanggal',          selector: 'sipas_internal_masuk_agenda_rating_popup form #tglRating'},
        { ref: 'komentar',          selector: 'sipas_internal_masuk_agenda_rating_popup form [name=surat_ulasan_komentar]'}
    ],

    defaultStore : 'Sipas.internal.masuk.agenda.rating.List',

    init: function(application){
        this.control({
            'sipas_internal_masuk_agenda_rating_popup': {
                show    : this.onMainview_Show,
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_internal_masuk_agenda_rating_popup sipas_com_button_save': {
                click   : this.onButtonSave_click
            },
            'sipas_internal_masuk_agenda_rating_popup form #listRating': {
                loadassociate: this.onList_LoadAssociated
            },
            'sipas_internal_masuk_agenda_rating_popup form #listRatingLihat': {
                loadassociate: this.onList_LoadAssociated
            }
        });
    },

    launch: function(config){

        config = Ext.applyIf(config,{
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            view = null;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'rating' :
            case 'view' :

                view = $this.createView((function(c){
                    c.removeComponents = [];

                    switch(c.mode){
                        case 'rating':
                            c.removeComponents.push('#listRatingLihat');
                        break;
                        case 'view':
                            c.removeComponents.push('#fieldsetRating', '#nilaiRating', '#stafNama', '#btnRating', '#tglRating', '#komentar');
                        break;
                    }

                    return c;
                })(config) );

                view.show();
                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this           = this,
            nama            = $this.getNama({root:mainview}),
            tgl            = $this.getTanggal({root:mainview}),
            $app = $this.getApplication(),
            $session = $app.Session(),
            $helper = $app.Helper(),
            pegawai = $session.getProfile(),
            record = mainview.record,
            ulasan = record.fetchUlasan();

        mainview.setLoading(true);
        ulasan.load({
            callback: function(){
                ulasan.each(function(rec){
                    if (rec.get('pengulas_id') === $session.getProfileId()){
                        $helper.hideComponent({ 
                            parent: mainview,
                            items: {
                                '#txtWarning': false,
                                '#nilaiRating': true,
                                '#komentar': true,
                                '#btnRating': true
                            }
                        });
                    }
                });
            }
        });

        nama && nama.setValue(pegawai.staf_nama);
        tgl && tgl.setValue(new Date());
        if(mainview.mode === 'view'){
            mainview.setTitle($app.getGrammar('internal_masuk_rating_popup_fieldset'));
        }else{
            mainview.setTitle($app.getGrammar('surat_prop_rating'));
        }
        mainview.setLoading(false);
    },

    onButtonSave_click: function(button, e, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            checkSession = $session.getResetSession(),
            record_ulasan = $this.getModel($this.models[0]).create({}),
            view    = $this.getMainview({from: button}),
            nilai = $this.getNilai({root:view}).getValue(),
            komentar = $this.getKomentar({root:view}).getValue(),
            tgl = $this.getTanggal({root:view}).getValue(),
            form    = $this.getForm({root:view}),
            record  = form && form.updateRecord().getRecord(),
            params = {
                'log' : 17
            };
            
        record_ulasan.set({
            'surat_ulasan_tgl' : tgl,
            'surat_ulasan_surat' : record.get('surat_id'),
            'surat_ulasan_staf' : pegawaiId,
            'surat_ulasan_nilai' : nilai.surat_ulasan_nilai,
            'surat_ulasan_komentar' : komentar 
        });

        $helper.saveRecord({
            record: record_ulasan,
            params: params,
            message: true,
            wait: true,
            waitTitle: 'Menyimpan Rating',
            waitText: 'Harap Tunggu Sebentar',
            callback: function(success, record, operation){
                if(success){
                    response = Ext.decode(operation.response.responseText, true);
                    view.close();
                    Ext.callback(view.callback, view.scope, [success, record, response]);
                }
            }
        });
    },

    onList_LoadAssociated: function(record, form, cmp){
        store = record.fetchUlasan();
        cmp.reconfigure(store);
        store.load({
            callback: function(){
                store.each(function(record){
                });
            }
        });
    }
});

