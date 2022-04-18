Ext.define('SIPAS.controller.Sipas.sistem.log.audit.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    stores: [
        'Sipas.sistem.log.audit.Buat',
        'Sipas.sistem.log.audit.Ubah',
        'Sipas.sistem.log.audit.Hapus'
    ],

    views: [
        'Sipas.sistem.log.audit.Prop'
    ],

    models: [
        'Sipas.Properti'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_sistem_log_audit_prop' },
        { ref: 'form',              selector: 'sipas_sistem_log_audit_prop > form' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },    

    controllerPopup : 'Sipas.sistem.log.audit.Popup',
    controllerStaf : 'Sipas.staf.Prop',

    init: function(application) {
        this.control({
            'sipas_sistem_log_audit_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_sistem_log_audit_prop': {
                show: this.onMainview_Show
            },
            'sipas_sistem_log_audit_prop #pembuatan': {
                loadassociate: this.onPembuatan_LoadAssociate,
                beforeitemclick: this.onMainview_BeforeClickShow,
                itemclick: this.onMainview_ClickShow
            },
            'sipas_sistem_log_audit_prop #perubahan': {
                loadassociate: this.onPerubahan_LoadAssociate,
                beforeitemclick: this.onMainview_BeforeClickShow,
                itemclick: this.onMainview_ClickShow
            },
            'sipas_sistem_log_audit_prop #penghapusan': {
                loadassociate: this.onPenghapusan_LoadAssociate,
                beforeitemclick: this.onMainview_BeforeClickShow,
                itemclick: this.onMainview_ClickShow
            },
            'button#btnPegawai':{
                click: this.onBtnPegawai_Click
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
            
        config.record = record;
        switch(config.mode)
        {
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    
                    return c;
                })(config));
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var view    = this.getMainview(),
            form    = this.getForm({root:view}),
            record  = mainview.record;

        form.setLoading(true);
        record.getProperti(function(properti){
            if(properti){
                if(! Ext.isEmpty(properti.get('properti_hapus_tgl'))) {
                    properti.set('properti_hapus_tgl', Ext.util.Format.date(properti.get('properti_hapus_tgl'), 'd M Y H:i'));
                }
                if(! Ext.isEmpty(properti.get('properti_ubah_tgl'))) {
                    properti.set('properti_ubah_tgl', Ext.util.Format.date(properti.get('properti_ubah_tgl'), 'd M Y H:i'));
                }
                form.loadRecord(properti);
            }
            form.setLoading(false);
        });
    },

    onPembuatan_LoadAssociate: function(record, form, cmp){
        var store = cmp.getStore(),
            raw_data_buat = form.getRecord().get('properti_buat_data');
            column = cmp.columns;
            if(column){
                column[1].renderer = function(v, m, r){
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('button', {
                            renderTo: Ext.query("#"+id)[0],
                            text: 'Lihat Pegawai',
                            record: r,
                            itemId:'btnPegawai',
                            width: 120
                        });
                    }, 30);
                    return Ext.String.format('<div id="{0}"></div>', id);
                };
            }

        if(! Ext.isEmpty(raw_data_buat)){
            if(Ext.typeOf(raw_data_buat) == 'string'){
                raw_data_buat = Ext.decode(raw_data_buat,true);
            }
            if(Ext.typeOf(raw_data_buat) == 'object'){
                raw_data_buat.data = Ext.encode(raw_data_buat.data);
                store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        raw_data_buat['at'] = Ext.util.Format.date(raw_data_buat['at'], 'd M Y H:i');
                        store.add(raw_data_buat);
                    }
                });
            }
        }else{
            store.removeAll();
        }
    },

    onPerubahan_LoadAssociate: function(record, form, cmp){
        var store = cmp.getStore(),
            raw_data_ubah = form.getRecord().get('properti_ubah_data'),
            column = cmp.columns;
            if(column){
                column[1].renderer = function(v, m, r){
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('button', {
                            renderTo: Ext.query("#"+id)[0],
                            text: 'Lihat Pegawai',
                            record: r,
                            itemId:'btnPegawai',
                            width: 120
                        });
                    }, 30);
                    return Ext.String.format('<div id="{0}"></div>', id);
                };
            }

        if(! Ext.isEmpty(raw_data_ubah)){
            if(Ext.typeOf(raw_data_ubah) == 'string'){
                raw_data_ubah = Ext.decode(raw_data_ubah,true);
            }
            if(Ext.typeOf(raw_data_ubah) == 'object'){
                raw_data_ubah.data = Ext.encode(raw_data_ubah.data);
                store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        raw_data_ubah['at'] = Ext.util.Format.date(raw_data_ubah['at'], 'd M Y H:i');
                        store.add(raw_data_ubah);
                    }
                });
            }
            if(Ext.typeOf(raw_data_ubah) == 'array'){
                Ext.Array.each(raw_data_ubah, function(record) {
                    record.data = Ext.encode(record.data);
                });
                store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        Ext.Array.each(raw_data_ubah, function(record) {
                            record['at'] = Ext.util.Format.date(record['at'], 'd M Y H:i');
                            store.add(record);
                        });
                    }
                });
            }
        }else{
            store.removeAll();
        }
    },

    onPenghapusan_LoadAssociate: function(record, form, cmp){
        var store = cmp.getStore(),
            raw_data_hapus = form.getRecord().get('properti_hapus_data'),
            column = cmp.columns;
            if(column){
                column[1].renderer = function(v, m, r){
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('button', {
                            renderTo: Ext.query("#"+id)[0],
                            text: 'Lihat Pegawai',
                            record: r,
                            itemId:'btnPegawai',
                            width: 120
                        });
                    }, 30);
                    return Ext.String.format('<div id="{0}"></div>', id);
                };
            }

        if(! Ext.isEmpty(raw_data_hapus)){
            if(Ext.typeOf(raw_data_hapus) == 'string'){
                raw_data_hapus = Ext.decode(raw_data_hapus,true);
            }
            if(Ext.typeOf(raw_data_hapus) == 'object'){
                raw_data_hapus.data = Ext.encode(raw_data_hapus.data);
                store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        raw_data_hapus['at'] = Ext.util.Format.date(raw_data_hapus['at'], 'd M Y H:i');
                        store.add(raw_data_hapus);
                    }
                });
            }
            
            if(Ext.typeOf(raw_data_hapus) == 'array'){
                Ext.Array.each(raw_data_hapus, function(record) {
                    record.data = Ext.encode(record.data);
                });
                store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        Ext.Array.each(raw_data_hapus, function(record) {
                            record['at'] = Ext.util.Format.date(record['at'], 'd M Y H:i');
                            store.add(record);
                        });
                    }
                });
            }
        }else{
            store.removeAll();
        }
    },

    onMainview_BeforeClickShow: function(view, record, index, item, event){
        // return event.target.tagName != 'SPAN';
    },

    onMainview_ClickShow: function(model, selected, item, index, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerPopup = $this.getController($this.controllerPopup);
        controllerPopup.launch({
            record : record,
            mode : 'view',
            callback: function(success, record){
            }
        });
    },

    onBtnPegawai_Click: function(button, e, eOpts){
        var $this   = this,
            view    = $this.getMainview({from:button}),
            record  = button.record,
            controllerStaf  = $this.getController($this.controllerStaf);

        e.stopPropagation();
        controllerStaf.launch({record:record, mode:'auditview'});
    }

});