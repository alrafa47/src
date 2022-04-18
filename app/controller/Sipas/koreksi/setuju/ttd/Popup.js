Ext.define('SIPAS.controller.Sipas.koreksi.setuju.ttd.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',
    
    views: [
        'Sipas.koreksi.setuju.ttd.Popup'
    ],

    models: [
        'Sipas.koreksi.Masuk'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_koreksi_setuju_ttd_popup' },
        { ref: 'form',      selector: 'sipas_koreksi_setuju_ttd_popup > form' },
        { ref: 'ttd',       selector: 'sipas_koreksi_setuju_ttd_popup #ttd' }
    ],

    api: {
        ttd : 'server.php/sipas/koreksi_masuk/get_ttd'
    },

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel:       'Sipas.Media',
    controllerHelper:   'Sipas.Helper',
    signaturepad : '',
    
    init: function(application) {
        this.control({
            'sipas_koreksi_setuju_ttd_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_koreksi_setuju_ttd_popup #ttd':{
                afterrender: this.onTtd_AfterRender
            },
            "sipas_koreksi_setuju_ttd_popup #btnSimpan": {
                click: this.onButtonSave_Click
            },
            "sipas_koreksi_setuju_ttd_popup #btnClear": {
                click: this.onBtnClear_Click
            }
        });
    },

    launch: function(config){
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
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    // c.requireComponents = ['[name=media_kode]', '[name=media_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('#btnSimpan', '#btnClear');
                    }

                    // if(c.mode === 'edit') {
                    //     c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete');
                    // }

                    // if(c.mode === 'add') {
                    //     c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete');
                    // }
                    return c;
                })(config));
                
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            now     = new Date(),
            record = form && form.updateRecord().getRecord();
            wait = $this.getMessage('wait'); 

        if(!$this.signaturepad.isEmpty()){
            var data = $this.signaturepad.toDataURL();

            var koreksi = record.getKoreksi(),
                surat = koreksi.getSurat();
                record.set({
                    'disposisi_masuk_status_ttd' : data
                });
                
            record.setStatus({
                pengubah : $session.getProfile().staf_id,
                status : surat.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                tgl : now,
                success: Ext.emptyFn,
                failure: Ext.emptyFn,
                callback: Ext.emptyFn,
                scope: $this
            });

            if(! record) return;
            $helper.saveRecord({
                record: record,
                // params: params,
                form: form,
                wait: true,
                message: false,
                confirm: true,
                confirmText: 'Apakah anda yakin ?',
                confirmTitle: 'Konfirmasi',
                callback: function(success, record, eOpts, response){
                    view.close();
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }else{
            $helper.showMsg({success: false, message: 'Anda belum memberi tanda tangan'});
        }
        
    },

    onTtd_AfterRender: function(container){
        var $this = this,
            view = $this.getMainview({from:container});

        if(view.mode == 'view'){

            var record = view.record;

            Ext.Ajax.request({
                url: $this.getApi('ttd'),
                params: {
                    'id': record.get('disposisi_masuk_id')
                },
                callback: function(options, success, response){
                },
                success: function(response, options){
                    view.setLoading(false);
                    var objres = Ext.decode(response.responseText, 1) || {};

                    if(objres.exist > 0){
                        var t = new Ext.Template("<img src='{url}'/>");
                        container.update(t.apply({
                            url: objres.ttd
                        }));
                    }
                },
                failure: function(response, options){}
            });
        }else{
            var canvas = document.getElementById('ttd');
                ratio =  Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
            // var context = canvas.getContext('2d');
            this.signaturepad = new SignaturePad(canvas);
        }
    },

    onBtnClear_Click: function(button, e, eOpts) {
        this.signaturepad.clear();
    }
});