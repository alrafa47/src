Ext.define('SIPAS.controller.Sipas.session.profile.editor.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views:[
        'Sipas.session.profile.editor.Pane'
    ],

    api: {
        set_image_foto  : 'server.php/sipas/staf/set_image/foto?id={id}',
        get_image_foto  : 'server.php/sipas/staf/get_image/foto?id={id}',
        set_image_ttd   : 'server.php/sipas/staf/set_image/ttd?id={id}',
        get_image_ttd   : 'server.php/sipas/staf/get_image/ttd?id={id}',
        get_kelompok    : 'server.php/sipas/staf_tim_anggota/read?query={id}',
        check           : 'server.php/sipas/staf_wakil_pgs/check',
        check_isexist   : 'server.php/sipas/staf_wakil/check_isexist'
    },

    messages: {
        upload_success              : 'Upload berhasil',
        upload_failed               : 'Upload gagal',
        response_invalid            : 'Server tidak memberikan valid response',
        message_invalid             : 'Gagal menampilkan pesan',
        image_uploading             : 'Mengupload gambar',
        update_success              : 'Berhasil mengubah Profil,<br /> Silahkan Logout Dan Login Kembali',
        message_pgs_success         : 'Berhasil mengubah pengganti sementara',
        message_asisten_success     : 'Berhasil mengubah asisten',
        message_pimpinan_success    : 'Berhasil mengubah pimpinan untuk dimonitor',
        message_unitkewenangan_success    : 'Berhasil mengubah Unit Kewenangan'
    },

    refs : [
        { ref: 'mainview',          selector: 'sipas_session_profile_editor_pane'},
        { ref: 'form',              selector: 'sipas_session_profile_editor_pane > form'},
        { ref: 'fieldNama',         selector: 'sipas_session_profile_editor_pane #fieldNama'},
        { ref: 'compNewPass',       selector: 'sipas_session_profile_editor_pane textfield[name=akun_sandi]'},
        { ref: 'compNewPassRepeat', selector: 'sipas_session_profile_editor_pane textfield[name=akun_sandi_ulang]'},
        { ref: 'compNewPassLama',   selector: 'sipas_session_profile_editor_pane textfield[name=akun_sandi_lama]'},
        { ref: 'checkboxPass',      selector: 'sipas_session_profile_editor_pane checkbox[name=akun_sandi_edit]'},
        { ref: 'compSurel',         selector: 'sipas_session_profile_editor_pane textfield[name=akun_surel]'},
        { ref: 'compPonsel',        selector: 'sipas_session_profile_editor_pane textfield[name=akun_ponsel]'},
        { ref: 'compAkunNama',      selector: 'sipas_session_profile_editor_pane textfield[name=akun_nama]'},
        { ref: 'compLabelMatch',    selector: 'sipas_session_profile_editor_pane label#labelMatch'},
        { ref: 'compLabelNotMatch', selector: 'sipas_session_profile_editor_pane label#labelNotMatch'},
        { ref: 'imgQrProfile',      selector: 'sipas_session_profile_editor_pane #imgQrProfile'},
        // Container //
        { ref: 'containerHeader',   selector: 'sipas_session_profile_editor_pane #containerHeader'},
        { ref: 'containerContent',  selector: 'sipas_session_profile_editor_pane #containerContent'},
        // tab Profil //
        { ref: 'tabProfil',         selector: 'sipas_session_profile_editor_pane #containerContent #tabProfil'},
        // tab Pgs //
        { ref: 'tabPgs',            selector: 'sipas_session_profile_editor_pane #containerContent #tabPgs'},
        { ref: 'tabPgsList',        selector: 'sipas_session_profile_editor_pane #tabPgs grid'},
        // tab Asisten //
        { ref: 'tabAsisten',        selector: 'sipas_session_profile_editor_pane #containerContent #tabAsisten'},
        { ref: 'tabAsistenList',    selector: 'sipas_session_profile_editor_pane #tabAsisten grid'},
        // tab Pimpinan //
        { ref: 'tabPimpinan',       selector: 'sipas_session_profile_editor_pane #containerContent #tabPimpinan'},
        { ref: 'tabPimpinanList',   selector: 'sipas_session_profile_editor_pane #tabPimpinan grid'},
        // Other //
        { ref: 'tabUnitKewenangan',         selector: 'sipas_session_profile_editor_pane #containerContent #tabUnitKewenangan'},
        { ref: 'tabUnitKewenanganList',     selector: 'sipas_session_profile_editor_pane #tabUnitKewenangan grid'},

        { ref: 'tabKelompok',       selector: 'sipas_session_profile_editor_pane #containerContent #tabKelompok'},
        { ref: 'tabStafKelompok',   selector: 'sipas_session_profile_editor_pane #containerContent #tabStafKelompok'},
        { ref: 'tabStaf',           selector: 'sipas_session_profile_editor_pane #containerContent #tabStaf'}

    ],

    modelStaf: 'Sipas.Staf',
    modelStafTim: 'Sipas.staf.Tim',
    modelJabatan :'Sipas.Jabatan',

    controllerAsisten: 'Sipas.staf.wakil.Popup',
    controllerAtasan: 'Sipas.staf.wakil.atasan.Popup',
    //controllerAsisten: 'Sipas.jabatan.wakil.asisten.Popup',
    //controllerAtasan: 'Sipas.jabatan.wakil.atasan.Popup',
    controllerPgs: 'Sipas.staf.wakil.pgs.Popup',

    headerLabel : ['Wakil', 'Atasan', 'Kelompok'],

    init: function(){
        this.control({
            'sipas_session_profile_editor_pane': {
                loadqrprofile: this.onMainview_LoadQrProfile,
                afterrender: this.onMainview_AfterRender
            },
            'sipas_session_profile_editor_pane container#containerImage': {
                afterrender: this.onCntImage_AfterRender
            },
            'sipas_session_profile_editor_pane #uploadPane':{
                afterrender: this.onMainviewImage_AfterRender
            },
            'sipas_session_profile_editor_pane container#imgQrProfile': {
                afterrender: this.onImgQrProfile_AfterRender
            },
            'sipas_session_profile_editor_pane container#tabPgs': {
                afterrender: this.onTabPgs_AfterRender
            },
            'sipas_session_profile_editor_pane #btnMobileDownload': {
                click: this.onButtonMobileDownload_Click
            },
            'sipas_session_profile_editor_pane #tabProfil sipas_com_button_save':{
                click: this.onButtonSave_Click
            },
            'sipas_session_profile_editor_pane button#buttonLogout':{
                click: this.onButtonLogout_Click
            },
            'sipas_session_profile_editor_pane button#btnPgs':{
                click: this.onButtonPgs_Click
            },
            'sipas_session_profile_editor_pane button#btnAsisten':{
                click: this.onButtonAsisten_Click
            },
            'sipas_session_profile_editor_pane button#btnAtasan':{
                click: this.onButtonAtasan_Click
            },
            'sipas_session_profile_editor_pane filefield[cls*=setImage]': {
                change: this.onFilefieldChange
            },
            'sipas_session_profile_editor_pane checkbox[name=akun_sandi_edit]': {
                change: this.onCheckbox_Change
            },
            'sipas_session_profile_editor_pane textfield[name=akun_sandi_ulang]': {
                change: this.onTextFieldRepeat_Change
            },
            'sipas_session_profile_editor_pane #tabPgs sipas_com_button_save':{
                click: this.ontabPgsButtonSave_Click
            },
            'sipas_session_profile_editor_pane #tabAsisten sipas_com_button_save':{
                click: this.ontabAsistanButtonSave_Click
            },
            'sipas_session_profile_editor_pane #tabPimpinan sipas_com_button_save':{
                click: this.onTabPimpinanButtonSave_Click
            },
            'sipas_session_profile_editor_pane #tabUnitKewenangan sipas_com_button_save':{
                click: this.ontabUnitKewenanganButtonSave_Click
            }
        });
    },

    launch: function(config) {
        config = Ext.applyIf(config || {},{
            reference: null,
            calback: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            $helper = $this.getApplication().Helper(),
            $session = $this.getApplication().Session(),
            view = this.createView((function(c){                    
                        c.removeComponents      = ['#colDeleteUnit', '#tabAsisten [name=staf_nama]', '#tabAsisten [name=unit_nama]', '#tabAsisten [name=jabatan_nama]', 
                                                    '#tabPgs [name=staf_nama]', '#tabPgs [name=unit_nama]', '#tabPgs [name=jabatan_nama]',
                                                    '#tabPimpinan [name=staf_nama]', '#tabPimpinan [name=unit_nama]', '#tabPimpinan [name=jabatan_nama]',
                                                    '#tabUnitKewenangan [name=jabatan_nama]', '#tabUnitKewenangan sipas_com_button_save' , 
                                                    '#tabUnitKewenangan toolbar', '#tabKelompok #toolbarProperties', '#tabStafKelompok #columnDelete'];
                        c.readonlyComponents    = [];
                        c.hideComponents        = [];
                        return c;

                    })(config)),
            profileRecord       = $session.getProfile(),
            record              = $this.getModel(this.modelStaf).create(profileRecord),
            recordUnitCakupan   = $this.getModel(this.modelJabatan).create(profileRecord),
            recordStafTim       = $this.getModel(this.modelStafTim).create(profileRecord),
            tabPgs              = $this.getTabPgs({root:view}),
            tabAsisten          = $this.getTabAsisten({root:view}),
            tabPimpinan         = $this.getTabPimpinan({root:view}),
            tabUnitKewenangan   = $this.getTabUnitKewenangan({root:view}),
            //tabKelompok         = $this.getTabKelompok({root:view}),
            tabStafKelompok     = $this.getTabStafKelompok({root:view}),
            // pagingkelompok      = tabKelompok.down('pagingtoolbar'),
            form                = view.down('form'),
            fieldNama           = this.getFieldNama({root:view});

            var infoProfile = new Ext.XTemplate(['<div class="cell-text">',
                '<div class="bigger-3 margin-bottom-4" style="line-height: 1;">',
                        '{profile_nama}',
                    '</div>',
                    '<div class="bigger-1-5" style="line-height: 1;">',
                        '{profile_jabatan} - {profile_unit}',
                    '</div>',
                    '<div class="subtext margin-top-8" style="line-height: 20px;">',
                        '<span class="margin-right-16">',
                            '<span class="badge badge-circle badge-inverse margin-right-4">',
                                '<i class="icon ion-md-navigate"></i>',
                            '</span>Sebagai {profile_akses}',
                        '</span>',
                        '<span class="margin-right-16">',
                            '<span class="badge badge-circle badge-inverse margin-right-4">',
                                '<i class="icon ion-md-person"></i>',
                            '</span>{jumlah_wakil} Asisten',
                        '</span>',
                        // '<span class="margin-right-16">',
                        //     '<span class="badge badge-circle badge-inverse margin-right-4">',
                        //         '<i class="icon ion-md-person"></i>',
                        //     '</span>{jumlah_pgs} Pgs',
                        // '</span>',
                        '<span class="margin-right-16">',
                            '<span class="badge badge-circle badge-inverse margin-right-4">',
                                '<i class="icon ion-md-person"></i>',
                            '</span>{jumlah_atasan} Pimpinan',
                        '</span>',
                        '<span class="margin-right-16">',
                            '<span class="badge badge-circle badge-inverse margin-right-4">',
                                '<i class="icon ion-md-business"></i>',
                            '</span>{jumlah_unit_kewenangan} Unit Kewenangan',
                        '</span>',
                        '<span class="margin-right-16">',
                            '<span class="badge badge-circle badge-inverse margin-right-4">',
                                '<i class="icon ion-md-people"></i>',
                            '</span>{jumlah_kelompok} Kelompok',
                        '</span>',
                    '</div>',
                '</div>']).apply({
                    profile_nama: profileRecord.staf_nama,
                    profile_jabatan: profileRecord.jabatan_nama,
                    profile_unit: profileRecord.unit_nama,
                    profile_akses: profileRecord.peran_nama,
                    jumlah_pgs: profileRecord.staf_pgs_jumlah,
                    //jumlah_wakil: profileRecord.jabatan_asisten_jumlah,
                    //jumlah_atasan: profileRecord.jabatan_atasan_jumlah,
                    jumlah_wakil: profileRecord.staf_wakil_jumlah,
                    jumlah_atasan: profileRecord.staf_atasan_jumlah,
                    jumlah_unit_kewenangan: (profileRecord.staf_jabatan_unit_jumlah) ? profileRecord.staf_jabatan_unit_jumlah : '0',
                    jumlah_kelompok: profileRecord.staf_kelompok_jumlah
                });

            fieldNama.setValue(infoProfile);
            //tabAsisten.loadRecord(recordUnitCakupan);
            //tabPimpinan.loadRecord(recordUnitCakupan);
            tabAsisten.loadRecord(record);
            tabPimpinan.loadRecord(record);
            tabStafKelompok.loadRecord(record);
            tabUnitKewenangan.loadRecord(recordUnitCakupan);
            // tabKelompok.load({url:this.getApi('get_kelompok', {id:record.get('staf_id')})});
            form.loadRecord(record);
            $this.applyLabel(record);
            view.show();
    },

    onFilefieldChange: function(filefield, value, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview(),
            record = view.record,
            id = $this.getApplication().getSession().getProfileId(),
            filename = filefield.getName(),
            imageContainer = filefield.getContainerImage(),
            url = $this.getApi('set_image_'+filename, {
                id: id
            });
            
        imageContainer.setLoading(true);
        filefield.up('form').getForm().submit({
            url : url,
            success: function ( result, request ) {
                imageContainer.setLoading(false);
                $this.loadImage(filename, view);
            },
            failure: function ( result, request ) {
                imageContainer.setLoading(false);
                var objres = Ext.decode(request.response.responseText, true) || {};
                $helper.showMsg({
                    success:false,
                    message:objres.message || $this.getMessage('message_invalid')
                });
            }
        });
    },

    onMainviewImage_AfterRender: function(mainview, e, eOpts){
        this.loadImage('foto', mainview);
        this.loadImage('ttd', mainview);
    },

    onMainview_AfterRender: function(mainview, e, eOpts){
        mainview.fireEvent('loadqrprofile');
    },

    onCntImage_AfterRender: function(component, e, eOpts){
        var filefield = component.up().down('filefield');

        component.getEl().dom.onclick = function()
        {
            filefield.button.fileInputEl.dom.click();
        }
    },

    onMainview_LoadQrProfile: function(mainview){
        var img = this.getImgQrProfile({root:mainview});

        img && img.setLoading(true);
        Ext.Ajax.request({
            url: 'server.php/sipas/account/requestDevice',
            success: function(response, eOpts){
                var objres = Ext.decode(response.responseText, 1) || {},
                    id = objres && objres.data && objres.data['alat_id'],
                    text = btoa(Ext.encode({url:window.location.href, deviceId:id}));

                if(!img.qr)
                {
                    img.qr = new QRCode(img.getEl().dom, {
                        text: text,
                        width: img.getWidth(),
                        height: img.getHeight()
                    });
                }else
                {
                    img.qr.clear();
                    img.qr.makeCode(text);
                }

            },
            callback: function(options, success, response){
                img.setLoading(false);
            }
        });
    },

    onImgQrProfile_AfterRender: function(component, e, eOpts){
        var mainview = this.getMainview({from:component}),
            clickFn = function(){
                mainview.fireEvent('loadqrprofile', mainview);
            };

        component.getEl().dom.onclick = clickFn;
    },

    onButtonMobileDownload_Click:  function(button, e, eOpts){
        this.getController('Sipas.sistem.mobile.Popup').launch();
    },

    loadImage: function(section, view){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = view || $this.getMainview(),
            id = $this.getApplication().getSession().getProfileId();

        Ext.ComponentQuery.query('[name=container_'+section+']', view).forEach(function(comp){
            var size = comp.getSize(),
                t = new Ext.Template("<img src='{url}' style='width:{width}px; height:{height}px; border-radius:100%;'/>");
            comp.update(t.apply({
                url: Ext.String.urlAppend($this.getApi('get_image_'+section, {
                    id: id
                }), '_dc='+Date.now()),
                width: size.width,
                height: size.height
            }));
        });
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = view.down('form'),
            compPass = $this.getCompNewPass({root:view}),
            compPassLama = $this.getCompNewPassLama({root:view}),
            compSurel = $this.getCompSurel({root:view}),
            compPonsel = $this.getCompPonsel({root:view}),
            compAkunNama = $this.getCompAkunNama({root:view}),
            record = profile = form && form.updateRecord().getRecord(),
            profile = record.data,
            checkboxPass = $this.getCheckboxPass({root:view}).getValue(),
            pass = CryptoJS.MD5(compPass.getValue()).toString(),
            passLama = CryptoJS.MD5(compPassLama.getValue()).toString(),
            wait = $this.getMessage('wait');
        
        if(! record) return;

        if(checkboxPass === true){
            Ext.Ajax.request({
                url: 'server.php/sipas/account/profile_update',
                params: {
                    'id'            : record && record.get('akun_id'),
                    'pass'          : pass,
                    'pass_lama'     : passLama,
                    'user'          : compAkunNama.getValue(),
                    'ponsel'        : compPonsel.getValue(),
                    'surel'         : compSurel.getValue()
                },
                success : function(response, eOpts) {
                    Ext.Msg.alert("Success", 'Berhasil Mengubah Data');
                },
                failure : function(response, eOpts) {
                    Ext.Msg.alert("Error", 'Gagal Mengubah Data');
                },
                callback: function(success, record, eOpts){
                    view.close();
                }
            });
        }else{
            Ext.Ajax.request({
                url: 'server.php/sipas/account/profile_update',
                params: {
                    'id'            : record && record.get('akun_id'),
                    'user'          : compAkunNama.getValue(),
                    'ponsel'        : compPonsel.getValue(),
                    'surel'         : compSurel.getValue()
                },
                success : function(response, eOpts) {
                    Ext.Msg.alert("Success", 'Berhasil Menggubah Data');
                },
                failure : function(response, eOpts) {
                    Ext.Msg.alert("Error", 'Gagal Menggubah Data');
                },
                callback: function(success, record, eOpts){
                    view.close();
                }
            });
        }

        // $helper.saveRecord({
        //     record: record,
        //     form: form,
        //     wait: true,
        //     message: true,
        //     messageSuccess: $this.messages.update_success,
        //     callback: function(success, record, eOpts){
        //         if(success)view.close();
        //     }
        // });
    },

    onButtonPgs_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            pgs = $this.getController($this.controllerPgs);

        pgs.launch({
            mode:'edit',
            record: record
        });
        view.setLoading(false);
    },

    onButtonAsisten_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            asisten = $this.getController($this.controllerAsisten);

        asisten.launch({
            mode:'edit',
            record: record
        });
        view.setLoading(false);
    },

    onButtonAtasan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            atasan = $this.getController($this.controllerAtasan);

        atasan.launch({
            mode:'edit',
            record: record
        });
        view.setLoading(false);
    },

    onButtonLogout_Click: function(button, e, eOpts){
        this.getApplication().fireEvent('sipas/session/doterminate', false);
    },

    onCheckbox_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:checkbox}),
            compNewPass = $this.getCompNewPass({root:mainview}),
            compNewPassRepeat = $this.getCompNewPassRepeat({root:mainview});

        $helper.disableComponent({
            action: !newValue,
            parent: mainview,
            items: ['[name=akun_sandi_lama]','[name=akun_sandi]','[name=akun_sandi_ulang]']
        });

        if(newValue == false){
            compNewPass.reset();
            compNewPassRepeat.reset();

            $helper.hideComponent({
                parent: mainview,
                items: {
                    '#labelMatch': true,
                    '#labelNotMatch': true
                }
            });
        }
    },

    onTextFieldRepeat_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:checkbox}),
            compNewPass = $this.getCompNewPass({root:mainview}),
            compNewPassRepeat = $this.getCompNewPassRepeat({root:mainview}),
            compLabelMatch = $this.getCompLabelMatch({root:mainview}),
            compLabelNotMatch = $this.getCompLabelNotMatch({root:mainview}),
            matchValue = (newValue == compNewPass.getValue());

        $helper.hideComponent({
            parent: mainview,
            items: {
                '#labelMatch': !matchValue,
                '#labelNotMatch': matchValue
            }
        });

        $helper.disableComponent({
            parent: mainview,
            items: {
                'sipas_com_button_save' : !matchValue
            }
        });
    },

    // Apply Label Header //
    applyLabel:function(record){
        var $this       = this,
            mainview    = $this.getMainview(),
            header      = $this.getContainerHeader({root:mainview}),
            headerLabel = $this.headerLabel;
            
            Ext.each(headerLabel, function(label, index){
                var cmplabel    = header.down('displayfield#'+'label'+label),
                    oldvalue    = cmplabel.getValue(),
                    recordvalue = record.get('staf_'+label.toLowerCase()+'_jumlah'),
                    newvalue    = oldvalue.replace('[jumlah]', recordvalue);
                cmplabel.setValue(newvalue);
            })
    },

    // save tab pgs //
    // ontabPgsButtonSave_Click: function(button, e, eOpts){
    //     var mainview = this.getMainview({from:button}),
    //         checkSession = this.getApplication().getSession().getResetSession(),
    //         grid = this.getTabPgsList({root:mainview}),
    //         $helper = this.getApplication().Helper(),
    //         store = grid.getStore(),
    //         message_success = this.getMessage('message_pgs_success');

    //     if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
    //         $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
    //         return;
    //     }
    //     $helper.showConfirm({
    //         confirmTitle: 'Simpan Perubahan',
    //         confirmText : 'Apakah anda yakin ?',
    //         callback: function(button){
    //             grid.setLoading(true);
    //             if(button == 'yes'){
    //                 store.sync({
    //                     callback: function(){
    //                         grid.setLoading(false);
    //                         store.reload();
    //                     },
    //                     success: function(){
    //                         $helper.showMessage({success: true, message: message_success});
    //                     }
    //                 });
    //             } else {
    //                 grid.setLoading(false);
    //             }
    //         }
    //     });
    // },

    // // save tab asisten //
    // ontabAsistanButtonSave_Click: function(button, e, eOpts){
    //     var mainview = this.getMainview({from:button}),
    //         checkSession = this.getApplication().getSession().getResetSession(),
    //         grid = this.getTabAsistenList({root:mainview}),
    //         $helper = this.getApplication().Helper(),
    //         store = grid.getStore(),
    //         message_success = this.getMessage('message_asisten_success');

    //     if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
    //         $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
    //         return;
    //     }
    //     $helper.showConfirm({
    //         confirmTitle: 'Simpan Perubahan',
    //         confirmText : 'Apakah anda yakin ?',
    //         callback: function(button){
    //             grid.setLoading(true);
    //             if(button == 'yes'){
    //                 store.sync({
    //                     callback: function(){
    //                         grid.setLoading(false);
    //                         store.reload();
    //                     },
    //                     success: function(){
    //                         $helper.showMessage({success: true, message: message_success});
    //                     }
    //                 });
    //             } else {
    //                 grid.setLoading(false);
    //             }
    //         }
    //     });
    // },
    // save tab pgs //
    ontabPgsButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            $app = this.getApplication(),
            $helper = $app.Helper(),
            grid = this.getTabPgsList({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_pgs_success'),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            name_exist = '',
            params = {
                'user[]' : [],
                'user_nama[]' : [],
                'profilId' : pegawaiId,
                'mode' : 'pgs'
            };

        store.each(function(r){
            params['user[]'].push(r.get('staf_id'));
            params['user_nama[]'].push(r.get('staf_nama'));
        });

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }

        Ext.Ajax.request({
            url: this.getApi('check_isexist'),
            params: params,
            success : function(response, eOpts){
                var objres = Ext.decode(response.responseText, 1) || {};

                if(objres.exist > 0){
                    Ext.Array.each(objres.exist_name, function(rec) {
                        name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                    });
                    $helper.showMsg({success:false, message:name_exist+' telah menjadi Asisten, mohon ganti pilihan anda'});
                    return;
                }else{
                    $helper.showConfirm({
                        confirmTitle: 'Simpan Perubahan',
                        confirmText : 'Apakah anda yakin ?',
                        callback: function(button){
                            grid.setLoading(true);
                            if(button == 'yes'){
                                store.sync({
                                    callback: function(){
                                        grid.setLoading(false);
                                        store.reload();
                                    },
                                    success: function(){
                                        $helper.showMessage({success: true, message: message_success});
                                    }
                                });
                            } else {
                                grid.setLoading(false);
                            }
                        }
                    });
                }
            }
        });
    },

    // save tab asisten //
    ontabAsistanButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            grid = this.getTabAsistenList({root:mainview}),
            $app = this.getApplication(),
            $helper = $app.Helper(),
            store = grid.getStore(),
            message_success = this.getMessage('message_asisten_success'),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            name_exist = '',
            params = {
                'user[]' : [],
                'user_nama[]' : [],
                'profilId' : pegawaiId,
                'mode' : 'asisten'
            };

        store.each(function(r){
            params['user[]'].push(r.get('staf_wakil_asisten'));
            params['user_nama[]'].push(r.get('staf_wakil_asisten_nama'));
        });

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        Ext.Ajax.request({
            url: this.getApi('check_isexist'),
            params: params,
            success : function(response, eOpts){
                var objres = Ext.decode(response.responseText, 1) || {};

                if(objres.exist > 0){
                    Ext.Array.each(objres.exist_name, function(rec) {
                        name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                    });
                    $helper.showMsg({success:false, message:name_exist+' telah menjadi PGS, mohon ganti pilihan anda'});
                    return;
                }else{
                    $helper.showConfirm({
                        confirmTitle: 'Simpan Perubahan',
                        confirmText : 'Apakah anda yakin ?',
                        callback: function(button){
                            grid.setLoading(true);
                            if(button == 'yes'){
                                store.sync({
                                    callback: function(){
                                        grid.setLoading(false);
                                        store.reload();
                                    },
                                    success: function(){
                                        $helper.showMessage({success: true, message: message_success});
                                    }
                                });
                            } else {
                                grid.setLoading(false);
                            }
                        }
                    });
                }
            }
        });
    },
    // save tab atasan / pimpinan / monitoring //
    onTabPimpinanButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            checkSession = this.getApplication().getSession().getResetSession(),
            grid = this.getTabPimpinanList({root:mainview}),
            $helper = this.getApplication().Helper(),
            store = grid.getStore(),
            message_success = this.getMessage('message_pimpinan_success');

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                grid.setLoading(true);
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, response){
                            var record = Ext.decode(response.responseText, true);
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                            grid.setLoading(false);
                        },
                        success: function(){
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    },

    // save tab unit kewenangan //
    ontabUnitKewenanganButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            grid = this.getTabUnitKewenanganList({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_unitkewenangan_success');


        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                grid.setLoading(true);
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, record, eOpts){
                            grid.setLoading(false);
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                        },
                        success: function(){
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    },

    onTabPgs_AfterRender: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfile(),
            grid = mainview.down('sipas_session_profile_editor_pgs_list'),
            cari = grid.down('#fieldSearch'),
            tambah = grid.down('#buttonManual'),
            simpan = mainview.down('#simpanAsisten'),
            namaPgs = grid.down('#namaPgs'),
            langNamaPgsKu = $language.getGrammar('daftar_pgsku', false),
            langNamaDiPgs = $language.getGrammar('daftar_dipgs', false),
            record = $this.getModel($this.modelStaf).create(pegawaiId);

        grid.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('check'),
            params: {
                'id' : record.getId()   
            },
            success: function(response, eOpts){
                var res = Ext.decode(response.responseText);
                
                if (res.checkPgs == 1) {
                    grid.setLoading(false);
                    grid.columns[4].destroy(); //btnKonfirm
                    namaPgs.setText(langNamaPgsKu);
                } else {
                    simpan.hide();
                    tambah.hide();
                    cari.hide();
                    grid.setLoading(false);
                    grid.columns[5].destroy(); //statusKonfirm
                    grid.columns[0].destroy(); //delete
                    namaPgs.setText(langNamaDiPgs);
                }
                mainview.loadRecord(record);
            }
        });
    }
    
});
