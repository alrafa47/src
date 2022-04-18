Ext.define('SIPAS.controller.Sipas.disposisi.forward.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.forward.penerima.List',
        'Sipas.surat.ekspedisi.trace.Popup'
    ],
    
    views: [
        'Sipas.disposisi.forward.Form',
        'Sipas.surat.ekspedisi.trace.Popup'
    ],

    models: [
        'Sipas.Disposisi'
    ],

    stores: [
        'Sipas.perintah.Combo',
        'Sipas.disposisi.forward.penerima.List'
    ],

    api: {
        'report'            : 'server.php/sipas/disposisi_masuk/report?id={id}',
        'next_code'         : 'server.php/sipas/disposisi/next/code',
        'available'         : 'server.php/sipas/disposisi/available?id={id}',
        'prioritas_hari'    : 'server.php/sipas/prioritas/getHari?id={id}',
        'isexist'           : 'server.php/sipas/disposisi_masuk/isexist_session/'
    },

    messages:{
        receiver_invalid    : '<b>Penerima Disposisi</b> tidak boleh kosong!',
        receiver_exist      : ['Error', 'Staf: {nama} sudah terdaftar'],
        prioritas_null      : 'Prioritas disposisi belum dipilih',
        perintah_null       : 'Anda belum memilih arahan',
        perintah_pesan_null : 'Anda belum mengisi uraian arahan'
    },

    refs: [
        { ref: 'mainview',             selector: 'sipas_disposisi_forward_form' },
        { ref: 'grid',                 selector: 'sipas_disposisi_forward_form sipas_disposisi_forward_penerima_list' },
        { ref: 'compWithPrint',        selector: 'sipas_disposisi_forward_form #toolbarAction checkboxfield' },
        { ref: 'compSurat',            selector: 'sipas_disposisi_forward_form sipas_com_surat_pane'},
        { ref: 'compPenerima',         selector: 'sipas_disposisi_forward_form sipas_disposisi_forward_penerima_list'},
        { ref: 'compCode',             selector: 'sipas_disposisi_forward_form #fieldCode'},
        { ref: 'compRefper',           selector: 'sipas_disposisi_forward_form sipas_ekspedisi_trace_treelist'},
        { ref: 'compPerintahCombo',    selector: 'sipas_disposisi_forward_form combobox[name=disposisi_perintah]'},
        { ref: 'cmpPerintahPesan',     selector: 'sipas_disposisi_forward_form [name=disposisi_pesan]' },
        { ref: 'cmpPrioritasTgl',      selector: 'sipas_disposisi_forward_form [name=disposisi_prioritas_tgl]' },
        { ref: 'compPrioritas',        selector: 'sipas_disposisi_forward_form [name=disposisi_useprioritas]' },
        { ref: 'compPrioritasCombo',   selector: 'sipas_disposisi_forward_form [name=disposisi_prioritas]' },
        { ref: 'containerArsip',       selector: 'sipas_disposisi_forward_form > form sipas_arsip_pane'}
    ],

    defaultWindowReport: {
        height: 640, 
        width: 800,
        maximizable: true,
        modal: true
    },

    defaultModel: 'Sipas.Disposisi',
    controllerSurat: 'Sipas.surat.Prop',
    controllerRefper: 'Sipas.surat.ekspedisi.trace.Popup',
    controllerGear: 'Sipas.prioritas.Popup',

    viewViewer: 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_disposisi_forward_form': {
                afterrender: this.onMainview_AfterRender,
                loadcode: this.onMainview_LoadCode,
                dosave: this.onMainview_DoSave,
                dosaveprint: this.onMainview_DoSavePrint
            },
            'sipas_disposisi_forward_form sipas_com_button_view' : {
                click: this.onButtonViewSurat_Click
            },
            'sipas_disposisi_forward_form sipas_com_disposisi_pengirim_pane' : {
                loadassociate: this.onPengirim_LoadAssociate
            },
            'sipas_disposisi_forward_form sipas_com_surat_pane' : {
                loadassociate: this.onSurat_LoadAssociate
            },
            'sipas_disposisi_forward_form sipas_disposisi_forward_penerima_list' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_disposisi_forward_form #toolbarAction button[action]': {
                click: this.onButtonAction_Click
            },
            'sipas_disposisi_forward_form sipas_com_button_refperdis': {
                click: this.onButtonRefper_Click
            },
            'sipas_disposisi_forward_form combobox[name=disposisi_perintah],sipas_disposisi_forward_form combobox[name=disposisi_aksi]': {
                expand: this.onCombobox_Expand
            },
            'sipas_disposisi_forward_prop #prioritas_kode': {
                loadassociate: this.onComboPrioritas_LoadAssociate,
                focus: this.onComboParent_Focus,
                select: this.onComboPrioritas_Select
            },
            'sipas_disposisi_forward_form #btnGear': {
                click: this.onButtonGear_Click
            }
        });
    },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            penerimaList = $this.getCompPenerima({root:mainview}),
            compPerintahCombo = $this.getCompPerintahCombo({root:mainview}),
            record  = mainview.record || $this.getModel($this.defaultModel || $this.models[0]).create({}),
            $app    = $this.getApplication(),
            $helper     = $app.Helper(),
            $session     = $app.Session();

        if(!$session.getRuleAccess('kirim_disposisi')){
            $helper.hideComponent({
                parent: mainview,
                items:{
                    '#radioDisposisi' : true
                }
            });
        }
        if(!$session.getRuleAccess('kirim_notadinas')){
            $helper.hideComponent({
                parent: mainview,
                items:{
                    '#radioNota' : true
                }
            });
        }
        penerimaList.getStore().removeAll();
        compPerintahCombo && compPerintahCombo.getStore().clearFilter();
        compPerintahCombo && compPerintahCombo.getStore().reload();

        mainview.setLoading(true);
        record.getSurat(function(s){
            mainview.setLoading(false);
            mainview.fireEvent('loadcode', mainview);
        });

    },

    onComboPrioritas_LoadAssociate: function(record, form, cmp)
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
    },

    onComboPrioritas_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            cmpPrioritasTgl = $this.getCmpPrioritasTgl({root:mainview}),
            store = combo.getStore(),
            value = combo.getValue();

        Ext.Ajax.request({
            url: $this.getApi('prioritas_hari', {id: value}),
            callback: function(options, success, response){
                cmpPrioritasTgl && cmpPrioritasTgl.setLoading(false);
            },
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {},
                    hari = Ext.Date.add(new Date(), Ext.Date.DAY, objres.hari);

                cmpPrioritasTgl && cmpPrioritasTgl.setValue(hari);
            },
            failure: function(response, options){}
        });
    },

    onMainview_DoSave: function(mainview, button, e, eOpts){
        mainview.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $checkSession = $app.getSession().getResetSession(),
            mainview = mainview,
            form = mainview,
            record = form && form.updateRecord().getRecord(),
            listPenerima = $this.getCompPenerima({root:mainview}),
            comboPerintah = $this.getCompPerintahCombo({root:mainview}),
            compPerintahPesan = $this.getCmpPerintahPesan({root:mainview}),
            compPrioritas = $this.getCompPrioritas({root:mainview}),
            comboPrioritas = $this.getCompPrioritasCombo({root:mainview}),
            storePenerima = listPenerima.getStore(),
            invalidMsg = $this.getMessage('receiver_invalid'),
            compWithPrint = $this.getCompWithPrint({from:button}),
            printValue = compWithPrint && compWithPrint.getValue(),
            count_exist = 0,
            name_exist = '',
            isAsistensi = mainview.up('sipas_disposisi_forward_prop').isAsistensi ? mainview.up('sipas_disposisi_forward_prop').isAsistensi : null,
            pimpinan = $helper.getPimpinan(),
            params = {
                'user[]' : [], //user
                'nama[]' : [], //user_nama
                't[]': [], //tembusan
                // 'b[]': [], //berkas
                'induk' : true, /*if induk true then it's disposisi not surat*/
                'model_sub' : record && record.get('disposisi_model_sub'),
                'surat_id' : record && record.get('surat_id'),
                'is_asistensi' : isAsistensi,
                'pimpinan' : pimpinan
            };

        if (storePenerima.getCount() <= 0){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_invalid')});
            mainview.setLoading(false);
        } else {
            if (!comboPerintah.getValue()){
                $helper.showMsg({success:false, message:$this.getMessage('perintah_null')});
                mainview.setLoading(false);
                return;
            }
            if (compPrioritas && compPrioritas.getValue() === true){
                if (comboPrioritas && comboPrioritas.getValue() === null){
                    $helper.showMsg({success:false, message:$this.getMessage('prioritas_null')});
                    mainview.setLoading(false);
                    return;
                }
            }
            
            storePenerima.each(function(r){
                params['user[]'].push(r.get('staf_id'));
                params['nama[]'].push(r.get('staf_nama'));
                params['t[]'].push(r.get('disposisi_masuk_istembusan'));
                // params['b[]'].push(r.get('disposisi_masuk_isberkas'));
            });

            if (!record){
                mainview.setLoading(false);
                return;
            }

            Ext.Ajax.request({
                url: $this.getApi('isexist'),
                params: params,
                success: function(response, eOpts){
                    mainview.setLoading(false);
                    var objres = Ext.decode(response.responseText, 1) || {};

                    if(objres.exist > 0){

                        Ext.Array.each(objres.exist_name, function(rec) {
                            name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                        });

                        $helper.showConfirm({
                            confirmTitle: 'Konfirmasi Penerima '+mainview.model_sub,
                            confirmText : name_exist+' sudah pernah mendapatkan surat ini. Lanjutkan ?',
                            callback: function(button){
                                if(button == 'yes'){
                                    $helper.saveRecord({
                                        record: record,
                                        form: form,
                                        wait: true,
                                        waitText: 'Mengirim disposisi...',
                                        params: params,
                                        message: false,
                                        callback: function(success, record, eOpts, response){
                                            if(success) {
                                                mainview.fireEvent('recordsaved', mainview);
                                                $helper.showMsg({success: true, message: 'Berhasil Mengirim '+mainview.model_sub});
                                            }else{
                                                $helper.showMsg({success: false, message: 'Gagal Mengirim '+mainview.model_sub});
                                            }
                                            // mainview.close();
                                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                                        }
                                    });
                                }
                            }
                        })
                    }else{
                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            waitTitle: 'Mengirim disposisi...',
                            waitText: 'Harap tunggu',
                            params: params,
                            message: false,
                            confirm: true,
                            confirmTitle: 'Konfirmasi Kirim Disposisi',
                            confirmText : 'Apakah anda yakin ?',
                            callback: function(success, record, eOpts, response){
                                if(success) {
                                    mainview.fireEvent('recordsaved', mainview);
                                    $helper.showMsg({success: true, message: 'Berhasil Mengirim '+mainview.model_sub});
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal Mengirim '+mainview.model_sub});
                                }
                                // mainview.close();
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                            }
                        });
                    }
                    
                }
            });
        }
    },
    
    onMainview_DoSavePrint: function(mainview, button, e, eOpts){
        mainview.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            mainview = mainview,
            form = mainview,
            record = form && form.updateRecord().getRecord(),
            listPenerima = $this.getCompPenerima({root:mainview}),
            comboPerintah = $this.getCompPerintahCombo({root:mainview}),
            compPerintahPesan = $this.getCmpPerintahPesan({root:mainview}),
            compPrioritas = $this.getCompPrioritas({root:mainview}),
            comboPrioritas = $this.getCompPrioritasCombo({root:mainview}),
            storePenerima = listPenerima.getStore(),
            invalidMsg = $this.getMessage('receiver_invalid'),
            compWithPrint = $this.getCompWithPrint({from:button}),
            count_exist = 0,
            name_exist = '',
            params = {
                'user[]' : [],
                'nama[]' : [],
                't[]': [],
                // 'b[]': [],
                'induk' : true, /*if induk true then it's disposisi not surat*/
                'model_sub' : record && record.get('disposisi_model_sub'),
                'surat_id' : record && record.get('surat_id')
            };

        if(storePenerima.getCount() <= 0){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_invalid')});
            mainview.setLoading(false);
        } else {
            if (!comboPerintah.getValue()){
                $helper.showMsg({success:false, message:$this.getMessage('perintah_null')});
                mainview.setLoading(false);
                return;
            }
            // if (compPrioritas.getValue() === true){
            //     if (comboPrioritas.getValue() === null){
            //         $helper.showMsg({success:false, message:$this.getMessage('prioritas_null')});
            //         return;
            //     }
            // }
            
            storePenerima.each(function(r){
                params['user[]'].push(r.get('staf_id'));
                params['nama[]'].push(r.get('staf_nama'));
                params['t[]'].push(r.get('disposisi_masuk_istembusan'));
                // params['b[]'].push(r.get('disposisi_masuk_isberkas'));
            });

            if (!record){
                mainview.setLoading(false);
                return;
            }

            Ext.Ajax.request({
                url: $this.getApi('isexist'),
                params: params,
                success: function(response, eOpts){
                    mainview.setLoading(false);
                    var objres = Ext.decode(response.responseText, 1) || {};

                    if(objres.exist > 0){

                        Ext.Array.each(objres.exist_name, function(rec) {
                            name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                        });

                        $helper.showConfirm({
                            confirmTitle: 'Konfirmasi Penerima '+mainview.model_sub,
                            confirmText : name_exist+' sudah pernah mendapatkan surat ini. Lanjutkan ?',
                            callback: function(button){
                                if(button == 'yes'){
                                    $helper.saveRecord({
                                        record: record,
                                        form: form,
                                        wait: true,
                                        waitTitle: 'Mengirim disposisi...',
                                        waitText: 'Harap tunggu',
                                        params: params,
                                        message: false,
                                        callback: function(success, record, eOpts, response){
                                            if(success) {
                                                mainview.fireEvent('recordsaved', mainview);
                                                $helper.showMsg({success: true, message: 'Berhasil Mengirim '+mainview.model_sub});
                                                $this.printReportSender(record.get('disposisi_id'), null, null, 'Cetak Lembar Disposisi');
                                            }else{
                                                $helper.showMsg({success: false, message: 'Gagal Mengirim '+mainview.model_sub});
                                            }
                                            // mainview.close();
                                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                                        }
                                    });
                                }
                            }
                        })
                    }else{
                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            waitTitle: 'Mengirim disposisi...',
                            waitText: 'Harap tunggu',
                            params: params,
                            message: false,
                            confirm: true,
                            confirmTitle: 'Konfirmasi Kirim Disposisi',
                            confirmText : 'Apakah anda yakin ?',
                            callback: function(success, record, eOpts, response){
                                if(success) {
                                    mainview.fireEvent('recordsaved', mainview);
                                    $helper.showMsg({success: true, message: 'Berhasil Mengirim '+mainview.model_sub});
                                    $this.printReportSender(record.get('disposisi_id'), null, null, 'Cetak Lembar Disposisi');
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal Mengirim '+mainview.model_sub});
                                }
                                // mainview.close();
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                            }
                        });
                    }
                    
                }
            });
        }
    },

    onMainview_LoadCode: function(mainview){
        var field = this.getCompCode({root:mainview});
        if(!field) return;

        field.setLoading(true);
        Ext.Ajax.request({
            url: this.getApi('next_code'),
            callback: function(){
                field.setLoading(false); 
            },
            success: function(response){
                var res = Ext.decode(response.responseText, true) || {};
                field.setValue(res.next);
            }
        });
    },

    onPengirim_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        record.getSurat(function(pengirim){
            cmp.setLoading(false); 
            if(pengirim){
                cmp.form.loadRecord(pengirim);
            }
        });
    },

    onSurat_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        record.getSurat(function(surat){
            if(surat){
                cmp.setLoading(false); 
                cmp.form.loadRecord(record);
            }
        });
    },

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchPenerima();
        cmp.reconfigure(store);
        cmp.record = record;
        record.getId() && store.reload();
    },

    printReportSender: function(id, callback, scope, title){
        var viewer = this.getView(this.viewViewer),
            view = viewer.create(Ext.apply(this.defaultWindowReport, {})).show().load(this.getApi('report', {
                id: id
            }));
        view.setTitle(title);
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = view,
            record = form && form.updateRecord().getRecord(),
            controllerSurat = $this.getController($this.controllerSurat);

        view.setLoading(true);
        record.getSurat(function(surat){
            if(surat){
                view.setLoading(false);
                controllerSurat.launch(surat, function(){
                });
            }
        });
    },

    onButtonAction_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            checkSession = this.getApplication().getSession().getResetSession();
        mainview && mainview.fireEvent(button.action, mainview);
    },

    onButtonRefper_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = view,
            record = form.getRecord(),
            controllerRefper = $this.getController($this.controllerRefper);

        controllerRefper.launch({
            record: record
            // selfAsPenerima: record
        });
    },

    onCombobox_Expand: function(field){
        var store = field.getStore();
        if( !store.isLoading() && !store.data.getCount()){
            store.reload();
        }
    },

    onButtonGear_Click: function(button, e, eOpts) {
        // var $this = this,
        //     gear = $this.getController($this.controllerGear),
        //     view = $this.getMainview({from:button}),
        //     form = $this.getForm({root:view}),
        //     record = form && form.updateRecord().getRecord();

        // gear.launch({
        //     record: record
        //     // selfAsPenerima: record
        // });

        var $this = this,
            view = $this.getMainview({from:button}),
            form = view,
            record = form.getRecord(),
            controllerGear = $this.getController($this.controllerGear);

        controllerGear.launch({
            record: record
            // selfAsPenerima: record
        });
    }
});