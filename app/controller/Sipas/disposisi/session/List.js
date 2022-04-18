Ext.define('SIPAS.controller.Sipas.disposisi.session.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    stores: [
        'Sipas.disposisi.session.List',
        'Sipas.disposisi.session.blmbaca.List',
        'Sipas.disposisi.session.baca.List',
        'Sipas.disposisi.session.terus.List',
        'Sipas.staf.wakil.monitoring.disposisi.List',
        'Sipas.staf.wakil.monitoring.disposisi.Blmbaca',
        'Sipas.staf.wakil.monitoring.disposisi.Baca',
        'Sipas.staf.wakil.monitoring.disposisi.Terus'
    ],

    models: [
        'Sipas.disposisi.Masuk',
        'Sipas.Surat',
        'Sipas.disposisi.masuk.Log' /*please do not remove, for list render*/
    ],

    views: [
        'Sipas.disposisi.session.List',
        'Sipas.Viewer'
    ],

    refs: [
        { ref: 'mainview',              selector: 'sipas_disposisi_session_list' },
        { ref: 'compApprovalDetail',    selector: 'sipas_disposisi_session_list sipas_surat_penyetujuan_detail_pane'},
        { ref: 'compApprovalInfo',      selector: 'sipas_disposisi_session_list sipas_disposisi_session_read_info_pane'},
        { ref: 'compApprovalDisposisi', selector: 'sipas_disposisi_session_list sipas_disposisi_session_read_pane' }
    ],

    defaultStore: 'Sipas.disposisi.session.List',

    controllerProperty: 'Sipas.disposisi.session.Prop',
    controllerReceiver: 'Sipas.disposisi.penerima.detail.Form',
    controllerSurat: 'Sipas.surat.Prop',
    viewViewer: 'Sipas.Viewer',

    modelReadinfo: 'Sipas.disposisi.session.read.Info',
    modelApproval: 'Sipas.surat.penyetujuan.Info',
    modelDefault: 'Sipas.disposisi.Masuk',

    init: function(application) {
        this.control({
            "sipas_disposisi_session_list": {
                afterrender: this.onMainview_AfterRender,
                doprint: this.onMainview_DoPrint,
                doview: this.onMainview_DoView
            },
            "sipas_disposisi_session_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_disposisi_session_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_disposisi_session_list > toolbar#toolbarControl button[action]": {
                click: this.onButtonAction_Click
            },
            "sipas_disposisi_session_list #Status": {
                select: this.onComboStatus_Select
            }
            // "sipas_disposisi_session_list #statusDisposisi": {
            //     select: this.onComboStatus_Select
            // }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }
        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();

        /*changing paging toolbar store based on mainview's store*/
        pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    },

    onMainview_AfterRender: function(mainview){
        
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/disposisi_blmbaca';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/disposisi_baca';
            break;
            case 3:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/disposisi_terus';
            break;
            case 4:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/disposisi_nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/disposisi';
            break;
        }
        
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onMainview_DoReload: function(mainview){
        this.refresh(mainview);
    },
    
    onButtonRefresh_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onMainview_DoPrint: function(mainview){
        var record = mainview && mainview.getSelectionModel().getSelection()[0],
            cReveiver = this.getController(this.controllerReceiver);
           
        cReveiver.printReport(record.getId(), null, null, 'Cetak Lembar Disposisi');
    },

    onMainview_DoView: function(mainview){
        var record = mainview && mainview.getSelectionModel().getSelection()[0],
            controllerProperty = this.getController(this.controllerProperty);

        record.reading();
        controllerProperty.launch({
            mode:'edit',
            record: record,
            callback: function(success, record){
                mainview.fireEvent('doreload',mainview);
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            record = selected,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $pengaturan = $app.LocalSetting(),
            asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            isAsistensi = view.isAsistensi,
            pegawaiId = $session.getProfileId(),
            controllerProperty = $this.getController($this.controllerProperty),
            log = $this.getModel($this.models[2]).create({});

        if((!isAsistensi) || (isAsistensi && asistensi_baca =="1")){
            if(record.get('disposisi_masuk_isbaca') === record.self.statusBaca().BACA_BACA){
                log.reading({
                    staf: pegawaiId,
                    masuk: record.get('disposisi_masuk_id'),
                    callback: function(staf, operation, success){
                        $this.refresh(view);
                    }
                });    
            }else{
                record.reading({
                    staf: pegawaiId,
                    callback: function(staf, operation, success){
                        $this.refresh(view);
                    }
                });
            }
        }

        if(record){
            controllerProperty.launch({
                mode:'edit',
                record: record,
                callback: function(success, record){
                    $this.refresh(view);
                }
            });
        }
    },

    onButtonAction_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        mainview && mainview.fireEvent(button.action, mainview);
    }

});