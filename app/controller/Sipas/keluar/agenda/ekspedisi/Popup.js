Ext.define('SIPAS.controller.Sipas.keluar.agenda.ekspedisi.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],

    views: [
        'Sipas.keluar.agenda.ekspedisi.Popup'
    ],

    models: [
        'Sipas.surat.Log'
    ],

    stores: [
        'Sipas.ekspedisi.aktif.Combo'
    ],

    api: {
        'next_agenda'       : 'server.php/sipas/surat_keluar/next/agenda',
        'next_kode'         : 'server.php/sipas/surat_keluar/next/kode',
        'resi'              : 'server.php/sipas/surat_keluar/resi_keluar?id={id}'
    },

    refs : [
        { ref: 'mainview',          selector: 'sipas_keluar_agenda_ekspedisi_popup'},
        { ref: 'form',              selector: 'sipas_keluar_agenda_ekspedisi_popup form'},
        { ref: 'cmpPengirim',       selector: 'sipas_keluar_agenda_ekspedisi_popup form [name=surat_keluar_ekspedisi_petugas_pengirim]'},
        { ref: 'cmpPenerima',       selector: 'sipas_keluar_agenda_ekspedisi_popup form [name=surat_keluar_ekspedisi_petugas_penerima]'},
        { ref: 'buttonStatus',      selector: 'sipas_keluar_agenda_ekspedisi_popup #buttonStatus' },
        { ref: 'comStts',           selector: 'sipas_keluar_agenda_ekspedisi_popup #statusEkspedisi' },
        { ref: 'buttonTambahkan',   selector: 'sipas_keluar_agenda_ekspedisi_popup sipas_com_button_edit'},
        { ref: 'cmpPaneDetailEks',  selector: 'sipas_keluar_agenda_ekspedisi_popup #paneDetailEks'}
    ],

    defaultModel: 'Sipas.surat.Log',
    viewViewer: 'Sipas.Viewer',
    suratModel: 'Sipas.Surat',

    init: function(application){
        this.control({
            "sipas_keluar_agenda_ekspedisi_popup": {
                show : this.onMainview_Show
            },
            "sipas_keluar_agenda_ekspedisi_popup sipas_com_button_edit": {
                click: this.onButtonSave_Click
            },
            'sipas_keluar_agenda_ekspedisi_popup #statusEkspedisi': {
                loadassociate: this.onComboParent_LoadAssociate,
                focus: this.onComboParent_Focus
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
            case 'done' :
            case 'view' :

                view = $this.createView( (function(c){
                    c.requireComponents = ['#statusEkspedisi'];

                    if(c.mode === 'view') {
                        c.removeComponents = ['#toolbarControl', '#buttonStatus'];
                    }

                    if (c.mode === 'done') {
                        c.removeComponents = ['#toolbarControl'];
                    }

                    return c;
                })(config) );

                view.show();
                break;

            case 'destroy' :
                $helper.destroyRecord({
                    record: config.record,
                    callback: config.callback,
                    confirm: true
                })
                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(view){
        var $this = this,
            $app = $this.getApplication(),
            form = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            recordKeluar = view.record,
            record = $this.getModel($this.defaultModel || $this.models[0]).create({}),
            buttonTambahkan = $this.getButtonTambahkan({root:view}),
            cmpPaneDetailEks = $this.getCmpPaneDetailEks({root:view}),
            comStts = $this.getComStts({root:view}),
            now = new Date(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));

        record.set({
            'surat_log_tipe'             : 9,
            'surat_log_tgl'              : now,
            'surat_log_surat'            : recordKeluar.getId(),
            'surat_nomor'                : recordKeluar.get('surat_nomor'),
            'surat_tanggal'              : recordKeluar.get('surat_tanggal'),
            'surat_properti_pembuat_nama': recordKeluar.get('surat_properti_pembuat_nama')
        });
        
        // for extend from keluar prop button ekspedisi will hide panedetaileks
        // if (record.get('surat_keluar_ekspedisi_status') == 3) {
        //     buttonTambahkan.disable(true);
        // }
        comStts.getStore().reload();
        if(view.mode === 'view'){
            form.loadRecord(recordKeluar);
        }else{
            form.loadRecord(record);
        }
    },

    onButtonSave_Click: function(button, e, eOpt){
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            comStts = $this.getComStts({root:view}),
            // grid = $this.getGrid({root:view}),
            record = form && form.updateRecord().getRecord(),
            now = new Date(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));

        if (!comStts.getValue()){
            $helper.showMsg({succes: false, message: 'Anda belum memilih status ekspedisi'});
        } else {
            if(! record) return;
            record.set({
                'surat_log_tipe'             : 9,
                'surat_log_tgl'              : now
            });
            $helper.saveRecord({
                record: record,
                form: form,
                wait: true,
                confirm: true,
                confirmText: 'Apakah anda yakin ?',
                confirmTitle: 'Ekspedisi Surat',
                message: true,
                callback: function(success, record, eOpts, response){
                    if(success){
                        record.set({
                            'surat_keluar_ekspedisi_id': null
                        });
                    }

                    view.close();
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
    },

    onStatusPengiriman_LoadAssociated: function(record, form, cmp){
        var $this = this,
            storeEkspedisi = cmp.getStore();

        // storeEkspedisi.removeAll();
        // record.getKeluar(function(eks){
        //     if(eks){
        //         var store = eks.fetchEkspedisiKeluar();

        //     }
        // });
    },

    // parent
    onComboParent_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
        }
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    }

});