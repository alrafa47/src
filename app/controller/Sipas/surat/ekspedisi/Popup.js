Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    stores: [
        'Sipas.surat.ekspedisi.Treelist'
    ],
    
    views: [
        'Sipas.surat.ekspedisi.Popup'
    ],

    models: [
        'Sipas.surat.Ekspedisi'
    ],

    messages: {
        invalidMode: 'Mode tidak sesuai'
    }, 

    refs: [
        { ref: 'mainview', selector: 'sipas_surat_ekspedisi_popup' },
        { ref: 'form', selector: 'sipas_surat_ekspedisi_popup form' }
    ],

    api: {
        'report': 'server.php/sipas/surat_ekspedisi/report?id={id}&withrahasia={rahasia}'
    },

    viewViewer: 'Sipas.Viewer',
    
    controllerPesan  : 'Sipas.surat.ekspedisi.batal.Popup',

    controllerMasuk : 'Sipas.masuk.agenda.Prop',

    defaultWindowReport: {
        modal: true,
        height: 600,
        width: 800,
        maximizable:true,
        maximized: true
    },

    init: function(application) {
        this.control({
            "sipas_surat_ekspedisi_popup": {
                show: this.onMainview_Show
            },
            "sipas_surat_ekspedisi_popup sipas_com_button_view": {
                click: this.onButtonViewSurat_Click
            },
            "sipas_surat_ekspedisi_popup sipas_com_button_print" : {
                click : this.onButtonPrint_Click
            },
            "sipas_surat_ekspedisi_popup #btnCabutDistribusi" : {
                click : this.onButtonCabut_Click
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        }, config);

        var $this = this,
            $app                    = $this.getApplication(),
            $helper                 = $app.Helper(),
            $session                = $app.getSession(),
            $feature                = $this.getController('Sipas.sistem.featureable.Feature'),
            fitur_tampil_rahasia    = $feature.getFeatureAccess('ekspedisi_tampil_rahasia'),
            rule_tampil_rahasia     = $session.getRuleAccess('ekspedisi_tampil_rahasia'),
            rule_cabut_dis_masuk    = $session.getRuleAccess('masuk_batal_distribusi'),
            rule_cabut_dis_imasuk   = $session.getRuleAccess('imasuk_batal_distribusi'),
            rule_bank_cabut_dis     = $session.getRuleAccess('bank_batal_distribusi'),
            record                  = $this.createRecord(config.record),
            view = null;

        switch(config.mode)
        {
            case 'view' :
            case 'bank' :
            case 'disposisi' :
            case 'notif' :

                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.disableComponents = [];
                    c.readonlyComponents = [];
                    c.hideComponent = [];

                    if (fitur_tampil_rahasia && rule_tampil_rahasia){
                        c.removeComponents.push('#treeWithoutRahasia');
                    } else {
                        c.removeComponents.push('#treeWithRahasia');
                    }

                    if (c.record.get('surat_model') === 1 && !rule_cabut_dis_masuk) {
                        c.removeComponents.push('#btnCabutDistribusi');
                    }else if (c.record.get('surat_model') === 3 && !rule_cabut_dis_imasuk) {
                        c.removeComponents.push('#btnCabutDistribusi');
                    }

                    if (c.record.get('surat_distribusi_iscabut') || c.record.get('surat_model') === 2) {
                        c.removeComponents.push('#btnCabutDistribusi');
                    }
                    if (c.mode === 'bank' && !rule_bank_cabut_dis) {
                        c.removeComponents.push('#btnCabutDistribusi');
                    }
                    if (c.mode === 'disposisi') {
                        c.removeComponents.push('#btnCabutDistribusi');
                    }

                    return c;
                })(config));

                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
        return view;  
    },

    onMainview_Show: function(mainview){
        var $this = this,
            form = $this.getForm({root:mainview}),
            record = mainview.record || $this.createRecord(mainview.record);

        mainview.setLoading(true);
        form.loadRecord(record);
        $this.loadTree(record, mainview);
        // mainview.setLoading(false);
    },

    loadTree: function(record, view){
        view = view || this.getMainview();
        
        var $this = this,
            tree = view.down('treepanel'),
            store = tree.getStore();
            
        store.load({
            params: {
                id: record.get('surat_id')
            },
            scope: this,
            callback: function(store,construct,bool){
                // view.setLoading(true);
                tree.getView().refresh();
                view.setLoading(false);
                var resp = Ext.JSON.decode(construct.response.responseText,true),
                    rentangTpl = new Ext.XTemplate(['<div class="grey-600"><span class="badge badge-solid margin-right-8">',
                                                        '<i class="icon ion-md-calendar"></i>',
                                                    '</span>{start:date("d M Y")} s/d {end:date("d M Y")}</div>']);
                // $this.getMainview().down('displayfield#txtJumlahPenerima').setValue(resp.metainfo.count);
                // $this.getMainview().down('datefield#txtTanggalMulai').setValue(new Date(resp.metainfo.startdate));
                // $this.getMainview().down('datefield#txtTanggalSelesai').setValue(new Date(resp.metainfo.enddate));
                $this.getMainview().down('displayfield#txtRentangTgl').setValue(rentangTpl.apply({
                    start: resp.metainfo.startdate,
                    end: resp.metainfo.enddate
                }));
            }
        });
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerMasuk = $this.getController($this.controllerMasuk);

        view.setLoading(true);
        record.forward && record.forward();

        view.setLoading(true);
        if(record.get('surat_model') === record.self.modelType().MODEL_MASUK){
            view.setLoading(false);
            controllerMasuk.launch({
                propType: 'masuk',
                unit: null,
                model: record.self.modelType().MODEL_MASUK,
                mode:'view',
                record: record
            });
        }
    },

    onButtonPrint_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            fitur_tampil_rahasia = $feature.getFeatureAccess('ekspedisi_tampil_rahasia'),
            rule_tampil_rahasia = $session.getRuleAccess('ekspedisi_tampil_rahasia'),
            view = $this.getMainview({from:button}),
            form = this.getForm({root:view}),
            show_rahasia = 0,
            record = form.getRecord();

        if (fitur_tampil_rahasia && rule_tampil_rahasia){
            show_rahasia = 1;
        }
        
        $this.printReport(record.get('surat_id'), null, null, 'Cetak Ekspedisi Surat', show_rahasia);
    },

    printReport: function(id, callback, scope, title, show_rahasia){
        var viewer = this.getView(this.viewViewer).create(Ext.apply(this.defaultWindowReport, {}))
        var url = this.getApi('report', {id: id, rahasia:show_rahasia});
        viewer.show().load(url);
        viewer.setTitle(title);
    },

    onButtonCabut_Click: function(button, e, eOpts){
        var $this       = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            mainview    = $this.getMainview({from:button}),
            pegawai     = $session.getProfile(),
            pegawaiId   = $session.getProfileId(),
            form        = $this.getForm({root:mainview}),
            record      = form && form.getRecord(),
            controllerPesan = $this.getController($this.controllerPesan);

        mainview.setLoading(true);
        controllerPesan.launch({
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                // if(success){
                    Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                    mainview.close();
                // }
            }
        });
        mainview.setLoading(false);
    }
});