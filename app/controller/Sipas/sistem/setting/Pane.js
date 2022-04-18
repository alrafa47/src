Ext.define('SIPAS.controller.Sipas.sistem.setting.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sistem.setting.surat.penomoran.legenda.List'
    ],

    views: [
        'Sipas.sistem.setting.Pane'
    ],

    api: {
        'set_setting'                     : 'server.php/sipas/pengaturan/set_setting',
        'get_setting'                     : 'server.php/sipas/pengaturan/get_setting',
        'getSettingByCode'                : 'server.php/sipas/pengaturan/getSettingByCode',
        'set_instance_logo'               : 'server.php/sipas/pengaturan/set_image/instance_logo',
        'set_template_header_leftlogo'    : 'server.php/sipas/pengaturan/set_image/template_header_leftlogo',
        'set_template_header_rightlogo'   : 'server.php/sipas/pengaturan/set_image/template_header_rightlogo',
        'get_instance_logo'               : 'server.php/sipas/pengaturan/get_image/instance_logo',
        'get_template_header_leftlogo'    : 'server.php/sipas/pengaturan/get_image/template_header_leftlogo',
        'get_template_header_rightlogo'   : 'server.php/sipas/pengaturan/get_image/template_header_rightlogo',
        'loadstatusmodem'                 : 'server.php/sipas/sms_phones/check_status',
        'testsms'                         : 'server.php/sipas/sms_test/send_sms?nomor={nomor}&pesan={pesan}',
        'notifikasi_test'                 : 'server.php/sipas/notifikasi/notifikasi_test/{section}',

        'set_template_header_logo1'       : 'server.php/sipas/pengaturan/set_image/template_header_logo1',
        'set_template_header_logo2'       : 'server.php/sipas/pengaturan/set_image/template_header_logo2',
        'set_template_header_logo3'       : 'server.php/sipas/pengaturan/set_image/template_header_logo3',
        'set_template_header_logo4'       : 'server.php/sipas/pengaturan/set_image/template_header_logo4',
        'set_template_header_logo5'       : 'server.php/sipas/pengaturan/set_image/template_header_logo5',
        'get_template_header_logo1'       : 'server.php/sipas/pengaturan/get_image/template_header_logo1',
        'get_template_header_logo2'       : 'server.php/sipas/pengaturan/get_image/template_header_logo2',
        'get_template_header_logo3'       : 'server.php/sipas/pengaturan/get_image/template_header_logo3',
        'get_template_header_logo4'       : 'server.php/sipas/pengaturan/get_image/template_header_logo4',
        'get_template_header_logo5'       : 'server.php/sipas/pengaturan/get_image/template_header_logo5'
    },

    refs: [
        { ref: 'mainview',          selector: 'sipas_sistem_setting_pane' },
        { ref: 'cmpStatusModem',    selector: 'sipas_sistem_setting_pane #statusModem' },
        { ref: 'cmpEmailName',      selector: 'sipas_sistem_setting_pane [name=email_name]' },
        { ref: 'cmpEmailProtocol',  selector: 'sipas_sistem_setting_pane [name=email_protocol]' },
        { ref: 'cmpEmailHost',      selector: 'sipas_sistem_setting_pane [name=email_host]' },
        { ref: 'cmpEmailAddress',   selector: 'sipas_sistem_setting_pane [name=email_address]' },
        { ref: 'cmpEmailPassword',  selector: 'sipas_sistem_setting_pane [name=email_password]' },
        { ref: 'cmpEmailPort',      selector: 'sipas_sistem_setting_pane [name=email_port]' },

        { ref: 'cmpKeluarDefault',     selector: 'sipas_sistem_setting_pane [name=template_nomor_keluar_perjenis_unit]' },
        { ref: 'cmpInternalDefault',   selector: 'sipas_sistem_setting_pane [name=template_nomor_internal_perjenis_unit]' },

        { ref: 'cmpNomorTelepon',   selector: 'sipas_sistem_setting_pane [name=nomor_telepon]' },
        { ref: 'cmpPesanSms',       selector: 'sipas_sistem_setting_pane [name=pesan_sms]' },
        { ref: 'cmpEmailTo',        selector: 'sipas_sistem_setting_pane [name=email_to]' },
        { ref: 'cmpEmailSubject',   selector: 'sipas_sistem_setting_pane [name=email_subject]' },
        { ref: 'cmpEmailMessage',   selector: 'sipas_sistem_setting_pane [name=email_message]' },
        { ref: 'cmpUnitPenerima',   selector: 'sipas_sistem_setting_pane [name=unit_penerima]' }
    ],

    messages: {
        response_invalid: 'Server tidak memberikan valid response',
        message_invalid: 'Gagal menampilkan pesan',
        image_uploading: 'Mengupload gambar'
    },

    acceptableImageSetting: ['instance_logo','template_header_leftlogo','template_header_rightlogo', 'template_header_logo1', 
                              'template_header_logo2', 'template_header_logo3', 'template_header_logo4', 'template_header_logo5'],
    controllerSLAUnitDefault: 'Sipas.sla.unit.def.Prop',
    controllerJenisPopup: 'Sipas.jenis.Popup',

    init: function(application) {
        this.control({
            'sipas_sistem_setting_pane': {
                afterrender: this.onMainview_AfterRender,
                loadstatusmodem: this.onMainview_LoadStatusModem
            },
            'sipas_sistem_setting_pane sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_sistem_setting_pane #buttonTestSMS': {
                click: this.onButtonTestSMS_Click
            },
            'sipas_sistem_setting_pane #buttonTestEmail': {
                click: this.onButtonTestEmail_Click
            },
            'sipas_sistem_setting_pane filefield[cls*=settingsistem_image]': {
                change: this.onFilefieldChange
            },
            'sipas_sistem_setting_pane #buttonSLADefault': {
                click: this.onButtonSLADefault_Click
            },
            'sipas_sistem_setting_pane sipas_com_button_view': {
                click: this.onButtonLihatJenis_Click
            }
        });
    },

    launch: function(config)
    {
        return this.createView(config);
    },

    onMainview_AfterRender: function(mainview, e, eOpts)
    {
        var unitPenerima = this.getCmpUnitPenerima({root:mainview});
        this.loadSetting();
        unitPenerima.getStore().reload();
        mainview.fireEvent('loadstatusmodem', mainview);
    },

    onMainview_LoadStatusModem: function(mainview, e, eOpts){
        var $this = this,
            cmp = $this.getCmpStatusModem({root: mainview});

        Ext.Ajax.request({
            url: this.getApi('loadstatusmodem'),
            success: function(response, eOpts){
                var status = response.responseText;
                if(status=='connect') cmp.setText('Tersambung');
                else cmp.setText('Terputus');
            }
        });
    },

    onButtonSLADefault_Click: function(){
        this.getController(this.controllerSLAUnitDefault).launch({
            mode: "view",
            callback: function(success, record, eOpts){
            }
        });
    },

    onButtonLihatJenis_Click: function(){
        this.getController(this.controllerJenisPopup).launch({
            mode: "view",
            callback: function(success, record, eOpts){
            }
        });
    },

    onButtonTestSMS_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            cmpNomor = $this.getCmpNomorTelepon({root:view}),
            cmpPesan = $this.getCmpPesanSms({root:view}),
            nomor = cmpNomor.getValue();
            pesan = cmpPesan.getValue();

        view.setLoading(true);
        if(nomor == null){
            $helper.showMsg({success:false, message:"Harap Diisi lengkap", callback: function(){
                view.setLoading(false);
            }});            
        }
        else{
            Ext.Ajax.request({
                url: $this.getApi('testsms',{nomor:nomor,pesan:pesan}),
                success: function(response, eOpts) {
                    $helper.showMsg({success:true, message:'Berhasil melakukan test SMS', callback: function(){
                        view.setLoading(false);
                    }});
                }, 
                failure: function(response, eOpts){
                    $helper.showMsg({success:false, message:'Gagal!!! melakukan test SMS', callback: function(){
                        view.setLoading(false);
                    }});
                }
            });
        }
    },

    onButtonTestEmail_Click: function(button, e, eOpts){
        var $this           = this,
            $helper         = $this.getApplication().Helper(),
            view            = $this.getMainview({from:button}),
            cmpEmailName    = $this.getCmpEmailName({root:view}).getValue(),
            cmpEmailProtocol= $this.getCmpEmailProtocol({root:view}).getValue(),
            cmpEmailHost    = $this.getCmpEmailHost({root:view}).getValue(),
            cmpEmailAddress = $this.getCmpEmailAddress({root:view}).getValue(),
            cmpEmailPassword= $this.getCmpEmailPassword({root:view}).getValue(),
            cmpEmailPort    = $this.getCmpEmailPort({root:view}).getValue(),

            cmpEmailTo      = $this.getCmpEmailTo({root:view}).getValue(),
            cmpSubject      = $this.getCmpEmailSubject({root:view}).getValue(),
            cmpMessage      = $this.getCmpEmailMessage({root:view}).getValue();

        view.setLoading(true);
        if(cmpEmailTo == "" || cmpSubject == ""){
            $helper.showMsg({success:false, message:"Harap Diisi lengkap", callback: function(){
                view.setLoading(false);
            }});            
        }
        else{
            Ext.Ajax.request({
                url: $this.getApi('notifikasi_test', {section: 'email'}),
                params: {
                    email_name:     cmpEmailName,
                    email_protocol: cmpEmailProtocol,
                    email_host:     cmpEmailHost,
                    email_from:     cmpEmailAddress,
                    email_password: cmpEmailPassword,
                    email_port:     cmpEmailPort,
                    email_to:       cmpEmailTo,
                    email_subject:  cmpSubject,
                    email_message:  cmpMessage
                },
                success: function(response, eOpts){
                    $helper.showMsg({success:true, message:"Berhasil melakukan test EMAIL, Silahkan Cek Email Dalam 1 menit lagi.", 
                        callback: function(){
                        view.setLoading(false);
                    }});
                }
            });
        }
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            waitmessage = Ext.Msg.wait('Menyimpan konfigurasi','Proses');

        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: "Simpan Perubahan",
            confirmText: "Apakah anda yakin ?",
            callback: function(button){
                if (button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('set_setting'),
                        params: {
                            setting: Ext.encode($this.retrieveSetting())
                        },
                        callback: function(){
                            waitmessage.close();
                            view.setLoading(false);
                            $helper.showMsg({success: true, message: 'Berhasil Mengubah Data'});
                        },
                        success: function(response){
                            if(objres = Ext.decode(response.responseText, true)){
                                $helper.showMsg({
                                    success:true, 
                                    message: objres.message,
                                    callback: function(){
                                        $this.loadSetting(view);
                                    }
                                });
                            }else{
                                $helper.showMsg({success:false, message: $this.getMessage('response_invalid')});
                            }
                        },
                        failure: function(response){
                            $helper.showMsgResponse({success:true, action:response});
                        }
                    });
                } else {
                    view.setLoading(false);
                }
            }
        });
    },

    onFilefieldChange: function(filefield, value, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            filelist = $this.acceptableImageSetting,
            filename = filefield.getName(),
            imageContainer = filefield.getContainerImage();
            // waitmessage = Ext.MessageBox.wait(this.getApi('image_uploading'));
        if( !Ext.Array.contains(filelist, filename) ) return;
        imageContainer.setLoading(true);
        filefield.up('form').getForm().submit({
            url : $this.getApi('set_'+filename),
            success: function ( result, request ) {
                imageContainer.setLoading(false);
                $this.loadImage(filename);
            },
            failure: function ( result, request ) {
                imageContainer.setLoading(false);
                var objres = Ext.decode(request.response.responseText, true);
                if(objres){
                    $helper.showMsg({
                        success:false,
                        message:objres.message || $this.getMessage('message_invalid')
                    });
                }else{
                    $helper.showMsg({
                        success:false,
                        message:$this.getMessage('response_invalid')
                    });
                }
            }
        });
    },

    retrieveSetting: function(view) {
        view = view || this.getMainview();
        var $this = this,
            $helper = $this.getApplication().Helper(),
            settings = {};
        Ext.ux.component.Manipulator.findComponents('field,htmleditor', view, function(cmp){
            cmp && cmp.getValue && cmp.getName && (settings[cmp.getName()] = cmp.getValue());
        });

        return settings;
    },

    applySetting: function(setting, view) {
        view = view || this.getMainview();
        var $this = this,
            $helper = $this.getApplication().Helper();

        $helper.applyValue({
            parent: view,
            items: setting
        });
    },

    getSettingByCode: function(value){
        Ext.Ajax.request({
            url : this.getApi('getSettingByCode'),
            params: {
                value: value
            }
        });
    },

    loadSetting: function(view) {
        view = view || this.getMainview();
        var $this = this,
            $helper = $this.getApplication().Helper(),
            $manipulator = Ext.ux.component.Manipulator,
            filelist = $this.acceptableImageSetting,
            $app    = this.getApplication(),
            $helper     = $app.Helper(),
            session     = $app.getSession(),
            keluar_default = this.getCmpKeluarDefault({root:view}),
            internal_default = this.getCmpInternalDefault({root:view});

        view.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('get_setting'),
            callback: function(){
                view.setLoading(false);
            },
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true),
                    internal_perjenis = objres.template_nomor_internal_perjenis_terpusat,
                    internal_perjenis_unit = objres.template_nomor_internal_perjenis_unit,
                    internal_perunit = objres.template_nomor_internal_perunit,
                    internal_terpusat = objres.template_nomor_internal_terpusat,
                    keluar_perjenis = objres.template_nomor_keluar_perjenis_terpusat,
                    keluar_perjenis_unit = objres.template_nomor_keluar_perjenis_unit,
                    keluar_perunit = objres.template_nomor_keluar_perunit,
                    keluar_terpusat = objres.template_nomor_keluar_terpusat;
                if(objres){
                    // applying setting to native fieldComponent
                    Ext.Object.each(objres, function(key, value){
                        $manipulator.findComponents('[name='+key+']',view, function(cmp){
                            cmp && cmp.setValue(value);
                        });
                    });
                    // applying setting for each image
                    Ext.Array.each(filelist, function(item){
                        $this.loadImage(item, view);
                    });
                }else{
                    $helper.showMsg({success:false, message:$this.getMessage('response_invalid')});
                }

                if(keluar_perjenis != '1' && keluar_perjenis_unit != '1' && keluar_perunit != '1' && keluar_terpusat != '1'){
                    keluar_default.setValue(true);
                }

                if(internal_perjenis != '1' && internal_perjenis_unit != '1' && internal_perunit != '1' && internal_terpusat != '1'){
                    internal_default.setValue(true);
                }
            },
            failure: function(response, options){
                $helper.showMsgResponse({success:false, action:response});
            }
        });
    },

    loadImage: function(section, view) {
        var $this           = this,
            $helper         = $this.getApplication().Helper(),
            filelist        = $this.acceptableImageSetting,
            manipulator     = Ext.ux.component.Manipulator,
            view            = view || $this.getMainview();

        if(!Ext.Array.contains(filelist, section)) return;
        Ext.ComponentQuery.query('[name=container_'+section+']', view).forEach(function(comp){
            var t = new Ext.Template("<img src='{url}' />");
            comp.update(t.apply({
                url: Ext.String.urlAppend($this.getApi('get_'+section), '_dc='+Date.now())
            }));
        });
    }

});
