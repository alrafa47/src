Ext.define('SIPAS.controller.Sipas.Helper', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.ux.component.Manipulator',
        'Ext.ux.window.Notification'
    ],

    views: [
        'Ext.ux.window.Notification'
    ],

    init: function(application)
    {
        var $this = this;
        Ext.apply(application, {
            Helper: function(){
                return $this;
            }
        })
    },

    findComponents: function(){
        var ux = Ext.ux.component.Manipulator;
        return ux.find.apply(ux, arguments);
    },

    queryComponent: function(query, parent, fn){
        return this.findComponents(query, parent, fn);
    },

    requireComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.requireComponents.apply(ux, arguments);
    },

    removeComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.removeComponents.apply(ux, arguments);
    },

    hideComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.hideComponents.apply(ux, arguments);
    },

    destroyComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.destroyComponents.apply(ux, arguments);
    },

    disableComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.disableComponents.apply(ux, arguments);
    },

    readonlyComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.readonlyComponents.apply(ux, arguments);
    },

    editableComponent: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.editableComponents.apply(ux, arguments);
    },

    applyValue: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.applyValue.apply(ux, arguments);
    },

    getValue: function() {
        var ux = Ext.ux.component.Manipulator;
        return ux.getValue.apply(ux, arguments);
    },

    cleanStore: function(store){
        if(! store) return;
        
        for(var i=store.data.items.length-1; i>=0; i-- ){
            var record = store.data.items[i];
            if( ! Boolean(record.getId()) ){
                store.remove(record);
            }
        }
    },
    
    showNotification: function(title, message)
    {
        var config;
        if(Ext.isObject(title))
        {
            config = title;
        }else
        {
            config = {
                title: title,
                message: message
            };
        }

        var $this = this,
            $app = this.getApplication();

        var notifExt = function(c)
        {
            var config = {
                title:'', 
                message:'', 
                closable: false, 
                position: 'br',
                cls: 'x-window-notification',
                manager: 'sipas-notification'
                // iconCls: 'ux-notification-icon-information'
            };
            Ext.apply(config, c);

            var localConfig = {
                bodyPadding: 16,
                position: config.position,
                useYAxis: true,
                manager: config.manager,
                cls: config.cls,
                iconCls: config.iconCls,
                closable: config.closable,
                title: config.title,
                html: config.message,
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'bounceOut',
                slideBackAnimation: 'easeIn'
            };

            Ext.create('Ext.ux.window.Notification', localConfig).show();
        }
        var notifChrome = function(config)
        {
            config = Ext.applyIf(config || {}, {
                message: "",
                title: null
            }, config);

            var notif = function(c){
                var notification = new Notification((c.message || "").replace(/<\/?[^>]+(>|$)/g, ""), {
                    icon: $app.getMetadata('productIcon') || $app.getMetadata('productLogo')
                });
            }

            // Let's check if the user is okay to get some notification
            if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                notif(config);
            }

            // force to use native Ext
            else if(Notification.permission == 'denied')
            {
                notifExt(config);
            }

            // Otherwise, we need to ask the user for permission
            // Note, Chrome does not implement the permission static property
            // So we have to check for NOT 'denied' instead of 'default'
            else if (Notification.permission !== 'denied')
            {
                Notification.requestPermission(function(permission) {
                    // Whatever the user answers, we make sure we store the information
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    // If the user is okay, let's create a notification
                    if (permission === "granted") {
                        notif(config);
                    }
                });
            }
        }

        // Let's check if the browser supports notifications
        if (("Notification" in window) && Notification.requestPermission)
        {
            notifChrome(config);
        }else
        {
            notifExt(config);
        }

        // At last, if the user already denied any notification, and you 
        // want to be respectful there is no need to bother him any more.
    },

    showMessage: function(config) {
        //config:{success:@boolean, message:@string, callback:@function}
        config = config || {};
        if(Ext.isBoolean(config)){
            config = {success:config, message:arguments[1]||''}
        }
        Ext.applyIf(config,{
            closable: true,
            title: null,
            success: false,
            callback: function(){},
            message: "Tidak ada pesan",
            buttons: Ext.MessageBox.OK
        });
        Ext.MessageBox.show({
            closable: config.closable,
            title: config.title || (config.success ? 'Berhasil': 'Gagal'),
            msg: config.message,
            buttons: config.buttons,
            fn: config.callback,
            icon: (config.success ? Ext.MessageBox.INFO : Ext.MessageBox.ERROR)
        });
    },

    showMsg: function(config){
        return this.showMessage(config);
    },

    showMessageResponse: function(config) {
        //config:{success:@boolean, action:@Ext.form.action, func:@function};
        config = config || {};
        var $this = this;
        var showError = function(message){
            if($this.getApplication().environment == 'development' && typeof message != 'undefined'){
                $this.showMsg({ success: false, message: message});
            }else{
                $this.showMsg({
                    success: false,
                    message: 'Maaf, terjadi kesalahan sistem.'+
                    '<br/>Server tidak memberikan respon yang valid.'+
                    '<br>Silahkan <b>muat ulang</b> aplikasi atau hubungi <b>Administrator</b>'
                });
            }
        };

        if(config.success){
            $this.showMsg({
                success: true,
                message: config.action.result.message,
                callback: config.callback
            });
        }else{
            if(status = config.action.status){
                if(status != 200 || status !== 0){
                    showError(config.action.statusText);
                }
            }
            if(typeof config.action.error != 'undefined'){
                status = config.action.error.status;
                if(status != 200 || status !== 0){
                    showError(config.action.error.statusText);
                }
            }
            if(typeof config.action.failureType != 'undefined'){
                switch (config.action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                    $this.showMsg({
                        success: false,
                        message: "Data yang dikirim tidak valid"
                    });
                    break;

                    case Ext.form.action.Action.CONNECT_FAILURE:
                    $this.showMsg({
                        success: false,
                        message: "Gagal berkomunikasi dengan server"
                    });
                    break;

                    default:
                    var objres = Ext.decode(config.action.response.responseText, true);
                    if(objres && typeof objres.message != 'undefined'){
                        $this.showMsg({ success: false, message: objres.message });
                    }else{
                        showError(config.action.response.responseText);
                    }
                    break;
                }
            }
        }
    },

    showMsgResponse: function(config){
        return this.showMessageResponse(config);
    },

    showConfirm: function(config) {
        //config:{confirmTitle:@string, confirmText:@string, callback:@function}
        config = config || {};
        Ext.applyIf(config, {
            confirmTitle: null,
            confirmText : null,
            callback : {}
        });
        // return Ext.MessageBox.show({
        return Ext.MessageBox.show({
            buttons: Ext.MessageBox.YESNO,
            buttonText: {yes:'Ya', no:'Tidak'},
            title: config.confirmTitle,
            msg: config.confirmText,    
            fn: config.callback
        });
    },

    showConfirmSave: function(config) {
        //config:{confirmTitle:@string, confirmText:@string, callback:@function}
        var $this = this;
        config = config || {};
        Ext.applyIf(config, {
            confirmTitle: "Simpan data",
            confirmText : "Lanjutkan menyimpan data ?",
            callback : {}
        });
        return $this.showConfirm(config);
    },

    showConfirmDelete: function(config) {
        //config:{confirmTitle:@string, confirmText:@string, callback:@function}
        var $this = this;
        config = config || {};
        Ext.applyIf(config, {
            confirmTitle: "Hapus data",
            confirmText : "Apakah anda yakin ingin menghapus data tersebut ?",
            callback : {}
        });
        return $this.showConfirm(config);
    },

    formSubmit: function(config) {
        //config:{form:@objectForm, url:@string, params:@object, callback:@function}
        var $this = this;
        Ext.applyIf(config,{
            url:'',
            params:{},
            callback:function(){},
            invalid:null
        });
        if(config.form.getForm().isValid()){
            config.form.getForm().submit({
                url : config.url,
                params: config.params,
                submitEmptyText : false,
                waitTitle: 'Proses',
                waitMsg: 'Penyimpanan data.',
                timeout: 120,
                success: function(form, action){
                    if(objres = Ext.decode(action.response.responseText, true)){
                        if(objres.success === true){
                            $this.showMsg({
                                success: true,
                                message: objres.message,
                                callback: Ext.Function.pass(config.callback, [action.response])
                            });
                        }else{
                            $this.showMsg({
                                success: false,
                                message: objres.message
                            });
                        }
                    }else{
                        $this.showMsg({
                            success: false,
                            message: 'Server does not reply a valid response'
                        });
                    }
                },
                failure: function(form, action){
                    $this.showMsgResponse({
                        success : false,
                        action : action
                    });
                }
            });
        }else{
            if(config.invalid && Ext.isFunction(config.invalid)){
                Ext.callback(config.invalid);
            }else{
                $helper.showNotification('Error', 'Form isian tidak valid. \n\rPastikan field yang <b>wajib diisi</b> tidak kosong');
            }
        }
    },

    formDelete: function(config) {
        //config:{url:@string, params:@object, callback:@function}
        config = config || {};
        var $this = this;
        var executeAction = function(config){
            Ext.MessageBox.wait('Proses','Pemrosesan data . . .');
            Ext.Ajax.request({
                url: config.url,
                params: config.params,
                callback: function(options, success, response){
                    if(objres = Ext.decode(response.responseText,true)){
                        $this.showMsg({
                            success: objres.success, 
                            message: objres.message || 'Server tidak memberikan response', 
                            callback: config.callback,
                            scope: config.scope
                        });
                    }else{
                        if($this.getApplication().environment == 'development'){
                            $this.showMsg({success:false, message:'Server tidak memberikan respon.' });
                        }else{
                            $this.showMsg({success:false, message:response.responseText });
                        }
                    }
                }
            });
        }

        Ext.applyIf(config, {
            url: "",
            params: {},
            scope: null,
            callback: null
        });
        $this.showConfirmDelete({
            callback: function(button){
                if(button == 'yes'){
                    executeAction(config);
                }
            }
        });
    },

    saveRecord: function(config){
        var $this = this;
        config = config || {};
        Ext.applyIf(config, {
            root:'record',
            params:{},
            // jsonData: {},
            form: undefined,
            record: {},
            confirm: false,
            confirmText: 'Lanjutkan menyimpan data ?',
            confirmTitle: 'Simpan',
            message: true,
            messageSuccess: undefined,
            messageFailure: undefined,
            wait: true,
            waitText: 'Menyimpan data . . .',
            waitTitle: undefined,
            dirtyText: 'Silahkan lengkapi kolom berwarna merah pada form',
            scope: $this,
            success: undefined,
            failure: undefined,
            callback: undefined
        });
        if(config.validateForm){
            config.form = config.validateForm;
        }

        var executeAction = function(){
            if(config.wait === true){
                Ext.MessageBox.wait(config.waitText, config.waitTitle);
            }
            if( config.form instanceof Ext.form.Panel && !config.form.getForm().isValid() ){
                $this.showMessage({success:false, message:config.dirtyText});
                return;
            }

            config.record.save({
                params:config.params,
                success: function(record, operation){
                    var data = Ext.decode(operation.response.responseText, true);
                    record.set(data && data[config.root]);
                    Ext.callback(config.success, config.scope, arguments);
                },
                failure: config.failure,
                callback: function(record, operation, success){
                    // var responseObject = operation.request.scope.reader.jsonData || {success:false, message:'Server error'};
                    var responseObject;
                    // if(operation.request.scope.reader.jsonData){
                    //     if(operation.success){
                    //         responseObject = operation.request.scope.reader.jsonData;
                    //     }
                    //     else{
                            if(operation.error){
                                if(Ext.isObject(operation.error)){
                                    responseObject = {success:false, message:'Koneksi dengan server terputus'};
                                }else{
                                    responseObject = {success:false, message:'Server error'};
                                }    
                            }else{
                                responseObject = operation.request.scope.reader.jsonData;
                            }
                    //     }
                    // }else{
                    //     if(Ext.isObject(operation.error)){
                    //         responseObject = {success:false, message:'Koneksi dengan server terputus'};
                    //     }else{
                    //         responseObject = {success:false, message:'Server error'};
                    //     }
                    // }
                    if(responseObject){
                        var data = responseObject.data || responseObject.record;
                        if(data){
                            config.record.set(data);
                        }
                    }
                    if(config.message === true){
                        var msg = responseObject.success ? config.messageSuccess || responseObject.message : config.messageFailure || responseObject.message;
                        msg = (new Ext.Template(msg)).apply(config.record.getData());
                        $this.showMessage({
                            success: responseObject.success,
                            message: msg,
                            callback: function(){
                                Ext.callback(config.callback, config.scope, [responseObject.success, record, operation]);
                            }
                        });
                    }else{
                        if(config.wait === true){
                            Ext.MessageBox.hide();
                        }
                        Ext.callback(config.callback, config.scope, [responseObject.success, record, operation]);
                    }
                }
            });
        }
        if(config.confirm === true){
            $this.showConfirmSave({
                confirmTitle: config.confirmTitle,
                confirmText: config.confirmText,
                callback: function(button){
                    if(button == 'yes'){
                        executeAction();
                        return;
                    }
                }
            });
            return;
        }else{
            executeAction();
            return;
        }
    },

    destroyRecord: function(config){
        var $this = this;
        config = config || {};
        Ext.applyIf(config, {
            record: {},
            confirm: false,
            confirmText: 'Apakah anda yakin ingin menghapus data ?',
            confirmTitle: 'Hapus data',
            message: true,
            messageSuccess: undefined,
            messageFailure: undefined,
            wait: true,
            waitText: 'Menghapus data . . .',
            waitTitle: undefined,
            callback: undefined,
            scope: $this
        });
        var executeAction = function(){
            if(config.wait === true){
                Ext.MessageBox.wait(config.waitText, config.waitTitle);
            }
            config.record.destroy({
                callback: function(records, operation){
                    var responseObject;
                    // if(operation.request.scope.reader.jsonData){
                    //     if(operation.success){
                    //         responseObject = operation.request.scope.reader.jsonData;
                    //     }
                    //     else{
                            if(operation.error){
                                if(Ext.isObject(operation.error)){
                                    responseObject = {success:false, message:'Koneksi dengan server terputus'};
                                }else{
                                    responseObject = {success:false, message:'Server error'};
                                }    
                            }else{
                                responseObject = operation.request.scope.reader.jsonData;
                            }
                    //     }
                    // }else{
                    //     if(Ext.isObject(operation.error)){
                    //         responseObject = {success:false, message:'Koneksi dengan server terputus'};
                    //     }else{
                    //         responseObject = {success:false, message:'Server error'};
                    //     }
                    // }
                    if(config.message === true){
                        $this.showMessage({
                            success: responseObject.success,
                            message: responseObject.success ? config.messageSuccess || responseObject.message : config.messageFailure || responseObject.message,
                            callback: function(){
                                Ext.callback(config.callback, config.scope, [responseObject.success, records[0], operation]);
                            }
                        });
                    }else{
                        if(config.wait === true){
                            Ext.MessageBox.hide();
                        }
                        Ext.callback(config.callback, config.scope, [responseObject.success, records[0], operation]);
                    }
                }
            })
        }
        if(config.confirm === true){
            $this.showConfirmDelete({
                confirmTitle: config.confirmTitle,
                confirmText: config.confirmText,
                callback: function(button){
                    if(button == 'yes'){
                        executeAction();
                    }
                }
            });
        }else{
            executeAction();
        }
    },

    storeRawdata: function(store, encode, isTree) {
        var localdata = [];
        var fetchRawTreenode = function(node){
            var rawdata = node.raw;
            if(node.childNodes.length > 0) rawdata.children = [];
            for (var i=0; i < node.childNodes.length; i++) {
                rawdata.children.push( fetchRawTreenode(node.childNodes[i]) );
            }
            return rawdata;
        }

        if(isTree === true){
            localdata = fetchRawTreenode(store.getRootNode());
        }else{
            for(item in store.data.items){
                localdata[item] = store.data.items[item].getData();
            }
        }
        if(encode === true){
            return Ext.JSON.encode(localdata);
        }else{
            return localdata;
        }
    },

    recordRawdata: function(records, encode) {
        var localdata = [];
        for(item in records){
            localdata[item] = records[item].data;
        }
        if(encode === true){
            return Ext.JSON.encode(localdata);
        }else{
            return localdata;
        }
    },

    recordsRawdata: function(records, encode){
        return this.record_rawdata(records, encode);
    },

    transformObject: function(config, obj){
        config = config || {};
        Ext.applyIf(config, {
            transform: 'value', // value | key | both
            suffix: '',
            prefix: '',
            strict: true,
            byref: false
        });
        obj = obj || {};
        obj_ret = {};

        Ext.Object.each(obj, function(key, value, myself){
            if(config.transform == 'value'){
                if(config.strict === true ){
                    if( typeof value == 'string' ){                      
                        obj_ret[key] = config.prefix + value.toString() + config.suffix;
                    }else{
                        obj_ret[key] = value;
                    }
                }else{
                    obj_ret[key] = config.prefix + value + config.suffix;
                }
            }else if(config.transform == 'key'){
                obj_ret[config.prefix + key + config.suffix] = value;
            }else if(config.transform == 'both'){
                obj_ret[config.prefix + key + config.suffix] = config.prefix + value + config.suffix;
            }
        });
        return obj_ret;
    },

    getKeys: function(object) {
        // object:@object
        var keys = [];

        for(key in object){
            keys.push(key);
        }

        return keys;
    },

    toMoney: function(value, gridRender){
        if(gridRender){
            return "Rp<span style='float:right'>"+Ext.util.Format.currency(value, '&nbsp;')+"</span>";
        }else{
            return Ext.util.Format.currency(value, '&nbsp;');
        }
    },

    getUrlParams: function(paramname) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(paramname).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    },

    addLoggedUser: function(data){
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage(),
            accounts = $localStorage.getValue('loggedUser'),
            dataArr  = [];

        // if(accounts){
        //     dataArr = JSON.parse(accounts);
        //     isNonExist = $this.findExistToken(dataArr, akunId);
        // }
        Object.keys(data).forEach(function(eL){
            var apiProfile = 'server.php/sipas/staf/get_image/foto',
                stafId = data[eL].profile.staf_id,
                preview_staf = apiProfile+'?id='+stafId;
            if(data[eL].profile.staf_id == data[eL].profile.akun_staf){
                var newArr= {
                    staf_id : data[eL].profile.staf_id,
                    staf_preview: preview_staf,
                    staf_nama : data[eL].profile.staf_nama,
                    jabatan_nama: data[eL].profile.jabatan_nama,
                    unit_nama : data[eL].profile.unit_nama,
                    isAktif : true
                };
                dataArr.push(newArr);
            }else{
                var newArr= {
                    staf_id : data[eL].profile.staf_id,
                    staf_preview: preview_staf,
                    staf_nama : data[eL].profile.staf_nama,
                    jabatan_nama: data[eL].profile.jabatan_nama,
                    unit_nama : data[eL].profile.unit_nama
                };
                dataArr.push(newArr);
            }
        })
        
        // var currentUser = $this.getCurrentUser();
        //     if(dataArr){
        //         newData = $this.switchActiveAccount(dataArr, akunId);
        //     }else{
        //         newData = [];
        //     }
        //     if(isNonExist){
        //         newData.push(newArr);
        //     }
            $localStorage.setValue('loggedUser',JSON.stringify(dataArr));
            // if(!firstLogin){
            //     Ext.defer(function(){
            //         window.location.reload()
            //     }, 250);
            // }
        return dataArr;

        // if (Ext.isFunction(callback)) {
            // Ext.callback(callback, this, [akunId]);
        // }
    },

    findExistToken:function(dataArr, akunId){
        var condition = true;        
        
        dataArr.forEach(function(el){            
            if(el.akun_id == akunId){
                condition = false;
            }                                
        });
        
        return condition;
    },

    switchActiveAccount:function(dataArray,idActive){
        dataArray.forEach(function(el){          
            if(el.staf_id != idActive){
                el.isAktif = false;        
            }else{
                el.isAktif = true;        
            }
        });
        
        return dataArray;
    },

    getLoggedUser: function(){
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage(),
            loggedUser = $localStorage.getValue('loggedUser'),
            accounts = JSON.parse(loggedUser);

            return accounts;
    },

    removeLoggeduser: function(){
        var $this = this,
            $app = $this.getApplication(),
            $local = $app.LocalStorage();
            // akunId = $local.getValue('currentUser'),
            // akun = $local.getValue('loggedUser'),
            // accounts = JSON.parse(akun);
            // forceReload = false;

        // accounts.forEach(function(el,ix) {
        //     if(el.akun_id == akunId){
        //         accounts.splice(ix,1);
        //     }
        // });
        $local.setValue('loggedUser','');
        $local.setValue('currentUser','');
        $local.setValue('pimpinan','');
        //if the remove account is the current used account, the app must reloaded
        // if(accounts[0]){
        //     var newData = $this.switchActiveAccount(accounts,accounts[0].akun_id);
        //     $local.setValue('loggedUser',JSON.stringify(newData));
        //     $local.setValue('currentUser',accounts[0].akun_id);
        //     if(accounts.length > 0){
        //         window.location.reload();
        //     }
        // }
    },

    setCurrentUser: function(akunid) {
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage();
        
        $localStorage.setValue('currentUser', akunid);
    },

    getCurrentUser: function() {
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage();
        
        return $localStorage.getValue('currentUser');
    },

    setPimpinan: function(akunid) {
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage();
        
        $localStorage.setValue('pimpinan', akunid);
    },

    getPimpinan: function() {
        var $this = this,
            $app = $this.getApplication(),
            $localStorage = $app.LocalStorage();
        
        return $localStorage.getValue('pimpinan');
    },

    getRedirect: function(){

        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profil = $session.getProfileId(),
            controllerProperty = $this.getController('Sipas.koreksi.session.Prop');
        
        try{
            var url = window.location.href,
                lastSegment = url.substring(url.lastIndexOf("/") + 1) || false;
            
            if(!lastSegment)return;

            var data = lastSegment.split('?'),
                tipe = data[0],
                strparams = data[1].split('&') || data[1],
                params = {};

            strparams.forEach(function(el){
                var d = el.split('=');
                params[d[0]] = d[1];
            });

            // Replace window.location.href
            window.history.pushState('TEO', 'TEO Timah Electroic Office', window.location.pathname);

            if(profil != params.staf){ // Jika profil user tidak sama dengan profile penerima surat
                Ext.defer(function(){
                    alert('Profil tidak sama dengan profil pemilik surat');
                },3000);
                return;
            }
            
            // Cari dan kirim record berdasarkan id parameter ke launch prop
            Ext.Ajax.request({
                url: 'server.php/sipas/koreksi_masuk?id=' + params.id,
                success: function(response, eOpts){
                    var res = Ext.decode(response.responseText),
                        success = res.success,
                        recordKeluar = $this.getModel('Sipas.koreksi.Masuk').create(res.data),
                        recordLog = $this.getModel('Sipas.disposisi.masuk.Log').create({});
                    // view.setLoading(false);
                    // console.log('masuk ajax');
                    // console.log(recordKeluar);

                    if(recordKeluar.get('disposisi_masuk_isbaca') === 1){
                        // console.log('masuk isbaca');
                        recordLog.reading({
                            staf: profil,
                            masuk: recordKeluar.get('disposisi_masuk_id'),
                            callback: function(staf, operation, success){
                                // if(success){
                                //     $this.refresh(view);
                                // }
                            }
                        });    
                    }else{
                        // console.log('masuk bukan isbaca');
                        recordKeluar.reading({
                            staf: profil,
                            callback: function(staf, operation, success){
                                // if(success){
                                //     $this.refresh(view);
                                // }
                            }
                        });
                    }

                    controllerProperty.launch({
                        mode: 'edit',
                        record: recordKeluar,
                        callback: function(success, record){                    
                        }
                    });
                }
            });

        }catch(e){
            // console.log("Error redirect : ", e);
        }
    }
});