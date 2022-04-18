Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.riwayat.List'
    ],

    views:[
        'Sipas.disposisi.riwayat.Popup'
    ],

    stores:[
        'Sipas.disposisi.riwayat.List',
        'Sipas.perintah.Combo',
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_disposisi_riwayat_popup' },
        { ref: 'list',          selector: 'sipas_disposisi_riwayat_popup sipas_disposisi_riwayat_list' },
        { ref: 'form',          selector: 'sipas_disposisi_riwayat_popup > form' },
        { ref: 'listDetail',    selector: 'sipas_disposisi_riwayat_popup > form > sipas_disposisi_riwayat_detail_penerima_list' },
        { ref: 'buttonArahan',  selector: 'sipas_disposisi_riwayat_detail_form #buttonArahan'}
    ],

    controllerCabut     : 'Sipas.disposisi.riwayat.cabut.Popup',
    controllerArahan    : 'Sipas.riwayat.session.perintah.Popup',

    init: function(application) {
        this.control({
            'sipas_disposisi_riwayat_popup sipas_disposisi_riwayat_detail_form': {
                afterretract: this.onGridpanel_AfterRetract
            },
            'sipas_disposisi_riwayat_popup sipas_disposisi_riwayat_list': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_disposisi_riwayat_popup sipas_disposisi_riwayat_detail_form #buttonCabutDisposisi': {
                click: this.onButtonRetract_Click
            },
            'sipas_disposisi_riwayat_detail_form #buttonArahan' : {
                click: this.onButtonArahan_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            config = config || {},
            record = config.record, // use id instead of record
            type = config.type,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            role_asistensi              = $session.getRuleAccess('asistensi'),
            role_asistensi_arahan       = $session.getRuleAccess('asistensi_arahan'),
            role_pgs                    = $session.getRuleAccess('pgs'),
            role_pgs_arahan             = $session.getRuleAccess('pgs_arahan'),
            role_ubah_arahan            = $session.getRuleAccess('riwayat_perintah_ubah'),
            controllerRiwayat = $this.getController('Sipas.disposisi.riwayat.List'),
            mainview = this.createView((function(c){
                c.removeComponents      = [];
                if(c.record.get('disposisi_cabut') === 1){
                    c.removeComponents.push('sipas_disposisi_riwayat_detail_penerima_list #toolbarAction');
                }
                if (!role_ubah_arahan) {
                    c.removeComponents.push('#buttonArahan'); 
                }
                if (type == 'asisten') {
                    if (role_asistensi) {
                        if (!role_asistensi_arahan) {
                            c.removeComponents.push('#buttonArahan'); 
                        }
                    }
                }else if(type == 'pgs'){
                    if (role_pgs) {
                        if (!role_pgs_arahan) {
                            c.removeComponents.push('#buttonArahan'); 
                        }
                    }
                }

                return c;
            })(config));            
            
        mainview.show(null, function(){
            var list = $this.getList({root: mainview});
            list.fireEvent('load', list, record);
        });
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_disposisi_riwayat_detail_form']
        });
        
        if(record){
            var form = $this.getForm({root:view});
            form && form.loadRecord(record);
        }else{
            form && form.reset(true);
        }
    },

    onButtonRetract_Click: function(button, e, eOpts){
        var $this = this,
            $checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = this.getForm({root:view}),
            record      = form && form.getRecord(),
            controllerCabut = $this.getController($this.controllerCabut),
            list = this.getList({root:view}),
            listDetail = this.getListDetail({root:view});

        controllerCabut.launch({
            record: record,
            mode:'cabut',
            selfAsPenerima: record,
            callback: function(record, operation, success){
                list.getStore().reload();
                listDetail.getStore().reload();
            }
        });
        
    },

    onGridpanel_AfterRetract: function(form){
        var mainview = this.getMainview({from:form}),
            list = this.getList({root:mainview}),
            listDetail = this.getListDetail({root:mainview});

        list.getStore().reload();
        listDetail.getStore().removeAll();
    },

    onButtonArahan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            list = $this.getList({root:view}),
            form = $this.getForm({root:view}),
            $checkSession = this.getApplication().getSession().getResetSession(),
            record = form && form.updateRecord().getRecord(),
            controllerArahan = $this.getController($this.controllerArahan);

        view.setLoading(true);
        controllerArahan.launch({
            mode:'add',
            id: record.get('disposisi_id'),
            perintah: record.get('disposisi_perintah'),
            pesan: record.get('disposisi_pesan'),
            callback: function(success, records, eOpts){
                list.getStore().reload();
                record.set({
                    'disposisi_perintah' : records.get('disposisi_perintah_log_perintah'),
                    'disposisi_pesan'    : records.get('disposisi_perintah_log_pesan')
                });
                form && form.loadRecord(record);
            }
        });
        view.setLoading(false);
    }

});