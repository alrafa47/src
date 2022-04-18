Ext.define('SIPAS.controller.Sipas.surat.berkasfisik.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.berkasfisik.Popup'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.surat.berkasfisik.Popup'
    ],

    api: {
        request_berkas : 'server.php/sipas/disposisi_masuk/request_berkas?id={id}',
    },

    refs: [
        { ref: 'mainview',  selector: 'sipas_surat_berkasfisik_popup' },
        { ref: 'list',      selector: 'sipas_surat_berkasfisik_popup grid' },
        { ref: 'colStatus', selector: 'sipas_surat_berkasfisik_popup grid #status' }
    ],

    controllerTolakBerkas: 'Sipas.surat.berkasfisik.tolak.Popup',

    init: function(application) {
        this.control({
            'sipas_surat_berkasfisik_popup': {
                afterrender: this.onMainview_AfterRender
            },
            'button#btnKonfirmasi': {
                click: this.onButtonKonfirmasi_Click
            },
            'button#btnTolak': {
                click: this.onButtonTolak_Click
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'view' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    
                    return c;
                })(config));
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_AfterRender: function(mainview)
    {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            masuk_rule = $session.getRuleAccess('masuk_konfirmasi_berkas'),
            // keluar_rule = $session.getRuleAccess('keluar_konfirmasi_berkas'),
            imasuk_rule = $session.getRuleAccess('imasuk_konfirmasi_berkas'),
            record = $this.createRecord(mainview.record),
            list = $this.getList({root:mainview}),
            useretensi = record.get('surat_useretensi'),
            retensi = new Date(Ext.Date.format(record.get('surat_retensi_tgl'), 'Y-m-d')),
            now = new Date(Ext.Date.format(new Date(), 'Y-m-d')),
            colStatus = $this.getColStatus({root:mainview}),
            model = record.get('surat_model'),
            disable_button = true;

        switch (model) {
            case 1:
                if (masuk_rule) disable_button = false;
            break;
            // case 2:
            //     if (keluar_rule) disable_button = false;
            // break;
            case 3:
                if (imasuk_rule) disable_button = false;
            break;
        }

        if (colStatus){
            colStatus.renderer = function(value, metaData, recs){
                if (value){
                    var iscabut = recs.get('disposisi_masuk_iscabut') == 1 ? true : false,
                        cabut_tgl = Ext.Date.format(recs.get('disposisi_masuk_cabut_tgl'), 'd M Y H:i'),
                        berkas_status_tgl = Ext.Date.format(recs.get('disposisi_masuk_berkas_status_tgl'), 'd M Y H:i'),
                        berkas_terima_tgl = Ext.Date.format(recs.get('disposisi_masuk_berkasterima_tgl'), 'd M Y H:i'),
                        komentar = recs.get('disposisi_masuk_berkas_komentar') ? recs.get('disposisi_masuk_berkas_komentar') : '<span class="supporttext">(Tidak ada komentar)</span>';

                    switch(value){
                        case recs.self.statusBerkas().BERKAS_APPROVE:
                            if (recs.get('disposisi_masuk_isberkasterima') == 1){
                                return '<div class="cell-row">'+
                                '<div class="cell-text">'+
                                '<div class="subtext info">'+
                                    '<span class="badge badge-solid margin-right-4">'+
                                        '<i class="icon ion-md-done-all"></i>'+
                                    '</span>Berkas diterima'+
                                '</div>'+
                                '<div class="supporttext supporttext-dark">Pada '+berkas_terima_tgl+'</div>'+
                                '</div>'+
                                '</div>';
                            } else {
                                return '<div class="cell-row">'+
                                '<div class="cell-text">'+
                                '<div class="subtext info">'+
                                    '<span class="badge badge-solid margin-right-4">'+
                                        '<i class="icon ion-md-checkmark"></i>'+
                                    '</span>Dikirim'+
                                '</div>'+
                                '<div class="supporttext supporttext-dark">Pada '+berkas_status_tgl+'</div>'+
                                '</div>'+
                                '</div>';
                            }
                            break;
                        case recs.self.statusBerkas().BERKAS_CANCEL:
                            return '<div class="cell-row">'+
                                '<div class="cell-text">'+
                                '<div class="subtext danger">'+
                                    '<span class="badge badge-solid margin-right-4">'+
                                        '<i class="icon ion-md-close"></i>'+
                                    '</span>Dibatalkan'+
                                '</div>'+
                                '<div class="supporttext supporttext-dark">Pada '+berkas_status_tgl+'</div>'+
                                '</div>'+
                                '</div>';
                            break;
                        case recs.self.statusBerkas().BERKAS_DECLINE:
                            return '<div class="cell-row">'+
                                '<div class="cell-text">'+
                                '<div class="subtext danger">'+
                                    '<span class="badge badge-solid margin-right-4">'+
                                        '<i class="icon ion-md-close"></i>'+
                                    '</span>Ditolak'+
                                '</div>'+
                                '<div class="supporttext supporttext-dark">'+komentar+'</div>'+
                                '<div class="supporttext supporttext-dark">Pada '+berkas_status_tgl+'</div>'+
                                '</div>'+
                                '</div>';
                            break;
                        case recs.self.statusBerkas().BERKAS_REQUEST:
                            var id = Ext.id(),
                                _return = '';

                            if (useretensi && now > retensi){
                                _return = '<span class="alternative">Surat tidak aktif</span>';
                            } else {
                                if (iscabut){
                                    _return = '<div class="cell-row">'+
                                        '<div class="cell-text">'+
                                        '<div class="subtext danger">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                                '<i class="icon ion-md-close"></i>'+
                                            '</span>Disposisi telah dicabut'+
                                        '</div>'+
                                        '<div class="supporttext supporttext-dark">Pada '+cabut_tgl+'</div>'+
                                        '</div>'+
                                        '</div>';
                                } else {
                                    Ext.defer(function () {
                                        Ext.widget('button', {
                                            renderTo: Ext.query("#"+id)[0],
                                            text: 'Setuju',
                                            record: recs,
                                            itemId: 'btnKonfirmasi',
                                            iconCls: '',
                                            cls: 'x-btn-fill x-btn-info x-btn-bordered margin-right-4',
                                            languageable: true,
                                            languageCode: 'disposisi_masuk_request_berkas_approve',
                                            languageMode: 'text',
                                            disabled: disable_button
                                        });
                                    }, 30);

                                    Ext.defer(function () {
                                        Ext.widget('button', {
                                            renderTo: Ext.query("#"+id)[0],
                                            text: 'Tolak',
                                            record: recs,
                                            itemId: 'btnTolak',
                                            iconCls: '',
                                            cls: 'x-btn-fill x-btn-danger x-btn-bordered',
                                            languageable: true,
                                            languageCode: 'disposisi_masuk_request_berkas_decline',
                                            languageMode: 'text',
                                            disabled: disable_button
                                        });
                                    }, 30);
                                    
                                    _return = Ext.String.format('<div id="{0}"></div>', id);
                                }
                            }

                            return _return;
                            break;
                    }
                } else {
                    return '<span class="alternative">-</span>';
                }
            };
        }
        
        $this.load(record, list);
    },

    load: function(record, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            store = cmp.getStore(),
            surat_id = record.get('surat_id');

        cmp.setLoading(true);
        store.removeAll();
        Ext.Ajax.request({
            url: $this.getApi('request_berkas', {id: surat_id}),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                store.addSorted(objres.data);
                cmp.setLoading(false);
            }
        });
    },

    onButtonKonfirmasi_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}) || $this.getMainview(),
            list = $this.getList({root:view}),
            surat = view.record,
            record = button.record;

        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Konfirmasi',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    record.doConfirmReqBerkas({
                        staf: me,
                        callback: function(success, records, operation){
                            view.setLoading(false);
                            record.getSurat(function(surat){
                                Ext.callback(view.callback, view, [success, surat, eOpts]);
                            });
                        }
                    });
                } else {
                    view.setLoading(false);
                }
            }
        });
    },

    onButtonTolak_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}) || $this.getMainview(),
            list = $this.getList({root:view}),
            surat = view.record,
            record = button.record,
            controllerTolak = $this.getController($this.controllerTolakBerkas);

        controllerTolak.launch({
            record: record,
            callback: function(success, records, operation){
                Ext.callback(view.callback, view, [success, records, eOpts]);
            }
        });
    }
});