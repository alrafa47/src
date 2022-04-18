Ext.define('SIPAS.controller.Sipas.keluar.agenda.registrasi.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.keluar.agenda.registrasi.Form',
        'Sipas.keluar.agenda.registrasi.List'
    ],

    views: [
        'Sipas.keluar.agenda.registrasi.Compact'
    ],

    controllerStatusPopup: 'Sipas.keluar.agenda.ekspedisi.Popup',
    controllerPropKeluar: 'Sipas.keluar.agenda.Prop',

    refs:[
        { ref: 'mainview',  selector: 'sipas_keluar_registrasi_compact' },
        { ref: 'paneForm',  selector: 'sipas_keluar_registrasi_compact #paneForm' },
        { ref: 'form',      selector: 'sipas_keluar_registrasi_compact #paneForm form' },
        { ref: 'grid',      selector: 'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list' },
        { ref: 'list',      selector: 'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_list' },
        { ref: 'btnTerima', selector: 'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list #buttonTerima' }
    ],

    modelKeluarEkspedisi : 'Sipas.keluar.Ekspedisi',

    init: function(application) {
        this.control({
            'sipas_keluar_registrasi_compact #paneForm > toolbar sipas_com_button_add': {
                toggle: this.onButtonAdd_Toggle
            },
            'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_list': {
                selectionchange: this.onGridpanel_SelectionChange,
                itemdblclick: this.onMainview_DoubleClickShow
            },
            'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list #buttonTerima': {
                click : this.onButtonTerima_Click
            },
            'sipas_keluar_registrasi_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list': {
                itemclick: this.onMainview_DoubleClick
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onButtonAdd_Toggle: function(button, pressed, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            list = $this.getList({root:mainview});

        form && form.setDisabled(!pressed);

        if(pressed){
            form.fireEvent('init', form, {
                mode: 'add',
                callback: function(success){
                    if(success){
                        Ext.each(Ext.ComponentQuery.query('[toggleGroup='+button.toggleGroup+']', mainview), function(item){
                            item.toggle();
                        });
                        list.fireEvent('reload', list);
                        form.reset();
                    }
                }
            });
        }else{
            form.reset();
        }
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:model}),
            form = $this.getForm({root:mainview}),
            paneform = $this.getPaneForm({root:mainview}),
            btnTerima = $this.getBtnTerima({root:mainview}),
            list = $this.getList({root:mainview}),
            grid = $this.getGrid({root:mainview}),
            record = selected && selected[0];

        if(selected.length){
            paneform && paneform.setDisabled(!selected);
            btnTerima && btnTerima.setDisabled(!selected);

            form.fireEvent('init', form, {
                mode: 'view',
                record: record,
                callback: function(success){
                    if(success){
                        list.fireEvent('reload', list);
                        paneform.reset();
                        paneform.setDisabled(selected);
                        btnTerima.setDisabled(selected);
                    }
                }
            });
        }else{
            // grid.getStore().each(function(record){
            //     grid.getStore().remove(record);
            // });
            grid.getStore().removeAll();
            // grid.getStore().reload();
            paneform && paneform.setDisabled(selected);
            btnTerima && btnTerima.setDisabled(selected);
        }

        // $helper.disableComponent({
        //     action: (selected.length != 1),
        //     parent: list,
        //     items: ['sipas_com_button_view']
        // });
    },

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerStatusPopup);

        controllerProperty.launch({
            mode:'view',
            record: record
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.Session(),
            $helper = $app.Helper(),
            role_lihat = $session.getRuleAccess('keluar_lihat'),
            view = $this.getMainview({from:model.view}),
            record = selected,
            tanggal = new Date(),
            useretensi = record.get('surat_useretensi'),
            inaktif_tgl = record.get('surat_inaktif_tgl'),
            inaktif_display = Ext.util.Format.date(inaktif_tgl, 'd M Y') ? Ext.util.Format.date(inaktif_tgl, 'd M Y') : '',
            controllerProperty = $this.getController($this.controllerPropKeluar);

        if(useretensi && is_inaktif){
            $helper.showMsg({success: false, message: 'Surat telah melewati masa inaktif'});
        }else{
            if (role_lihat){
                controllerProperty.launch({
                    propType: 'keluar',
                    mode:'view',
                    model:2,
                    record: record,
                    is_ekspedisi_eks: true
                });
            } else {
                $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
            }
        }
    },

    onButtonTerima_Click: function(button, e, eOpts){
        var $this = this,
            controllerStatusPopup = $this.getController($this.controllerStatusPopup),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            grid = $this.getGrid({root:view}),
            list = $this.getList({root:view}),
            record = form && form.updateRecord().getRecord(),
            // statusProto = $this.getModel($this.modelKeluarEkspedisi).create({}),
            // statusField = record && record.get('surat_terima_status'),
            mode=null;

        // if(statusField == statusProto.self.status().INIT || statusField == statusProto.self.status().SENDING){
            mode='add';
        // }else{
            // mode='done';
        // }
        // if (record.get('surat_terima_status') == 4) {
        // }else if (record.get('surat_terima_status') == 3) {
        //     mode='done';
        // }else if (record.get('surat_terima_status') == 2) {
        //     mode='done';
        // }else {
        // }
        
        controllerStatusPopup.launch({
            mode:mode,
            record: record,
            callback: function(success, record){
                list.getStore().reload();
                grid.getStore().reload();
            }
        });
    }
});