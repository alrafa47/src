Ext.define('SIPAS.controller.Sipas.session.Session', function(){

    var sessionData = null,
        roleCollection = null;

    var updateSession = function(data) 
    {
        sessionData = data;
        updateRoleCollection((data || {}).rules);
    };

    var updateRoleCollection = function(collection) 
    {
        var $this = this,
            validateVal = function(val) {
                result = Boolean(val);
                if (Ext.isString(val)) {
                    result = !Ext.isEmpty(val) && !Ext.Array.contains(['null', '0', 'undefined', 'false'], val.toLowerCase())
                }
                if (Ext.isNumber(val)) {
                    result = Boolean(val)
                }
                if (Ext.isObject(val) || Ext.isArray(val)) {
                    result = !Ext.Object.isEmpty(val)
                }
                return result;
            },
            applyRoleCollection = function(_rulesServer) {
                _rulesServer = _rulesServer || {};
                _rules = getRules();
                Ext.Object.each(_rulesServer, function(key, value) {
                    _rules.add(key, validateVal(value));
                });
            };
        
        if(!collection)
        {
            getRules().removeAll();
        }
        if (Ext.isArray(collection))
        {
            var collectionObj = {}
            Ext.Array.each(collection, function(v, i, all){
                collectionObj[v] = true;
            });
            collection = collectionObj;
        }
        if (Ext.isObject(collection)) {
            applyRoleCollection(collection);
        }
    };

    var getRules = function()
    {
        return (roleCollection = roleCollection || Ext.create('Ext.util.MixedCollection'));
    };

    var getSession = function()
    {
        return Ext.clone(sessionData || {});
    }

return {
    extend: 'Ext.app.Controller',    

    mixins: {
        template: 'Ext.ux.controller.Template'
    },

    api: {
        'session_info'              :'server.php/sipas/account/info/session',
        'session_info_access'       :'server.php/sipas/account/info/rules',
        'session_auth'              :'server.php/sipas/account/login',
        'session_terminate'         :'server.php/sipas/account/logout',
        'session_changepassword'    :'server.php/sipas/account/changePassword'
    },
    messages: {
        'session_validate'          :'Validasi akun ...',
        'session_changepassword'    :'Memproses ...',
        'session_invalid'           :'Akun tidak valid, silahkan coba lagi.',
        'session_init'              :'Cek sesi ..',
        'session_terminate'         :'Mengakhiri sesi',
        'session_terminate_confirm' :['Keluar Aplikasi', 'Apakah anda yakin ingin keluar aplikasi?'],
        'auth_failed'               :['Gagal','Gagal melakukan validasi user. User tidak terdaftar']
    },

    profileIdProperty: 'staf_id',
    userIdProperty: 'user_id',

    init: function(application) 
    {
        var $this = this;
        Ext.apply(application, {
            getSession: function(){
                // var $app = $this.getApplication(),
                //     urlSessInfo= $this.getApi('session_info'),
                //     session= Ext.Object.isEmpty($this.getSession());

                // if(session == false){
                //     Ext.Ajax.request({
                //         url: urlSessInfo,
                //         callback: function(options, success, response) {
                //             var _sessData = Ext.decode(response.responseText, true) || {};
                //             if(!_sessData.islogin){
                //                 Ext.Msg.alert('Info', 'Akun anda telah direset.');
                //                 window.location.reload(false);
                //             }
                //         }
                //     });
                // }
                return $this;
            },
            Session: function(){
                return $this;
            }
        });
        application.on({
            'sipas/session/doterminate': this.onApp_DoTerimate,
            scope: this
        });
    },

    onApp_DoTerimate: function(silent)
    {
        this.terminate(silent);
    },

    /**
     * Get the authed user status
     * @return {Boolean} Authed status
     */
    isAuth: function() {
        return this.getSession().islogin === true ;
    },

    getProfile: function(){
        return this.getSession().profile || {};
    },

    getProfileId: function(){
        return this.getProfile()[this.profileIdProperty];
    },

    getUser: function(){
        return this.getProfile();
    },

    getUserId: function() {
        return this.getUser()[this.userIdProperty];
    },

    getRuleAccess: function(ruleName)
    {
        return getRules().get(ruleName);
    },

    /**
     * Return session object form server
     * @return {object} session Object
     */
    getSession: function() {
        // need to clone real value to avoid edited by other
        return getSession();
    },
    
    getResetSession: function() {
        // need for detect session when reset account
        var urlSessInfo= this.getApi('session_info'),
            session= Ext.Object.isEmpty(this.getSession());

        if(session == false){
            Ext.Ajax.request({
                url: urlSessInfo,
                callback: function(options, success, response) {
                    var _sessData = Ext.decode(response.responseText, true) || {};
                    if(!_sessData.islogin){
                        Ext.Msg.alert('Info', 'Akun anda telah direset.');
                        window.location.reload(false);
                    }
                }
            });
        }
    },

    /**
     * Make a requrest to ceck session
     *
     *      Example:
     *      app.getController('Sipas.Session').check(function(success, isLogin, session, response){
     *          if(isLogin === false){
     *              this.terminate();
     *          }
     *      }, null, true);
     * 
     * @param  {Function} fn A valid function callack
     * @param  {Object} scope Object where the function will be executed
     * @param  {Boolean} waitMessage `True` to show a waiting message when request is active
     * @return {Ext.app.Controller} SIPAS.controller.Sipas.Session
     */
    check: function(fn, scope, waitMessage) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            fn = fn || Ext.emptyFn,
            scope = scope || $this,
            msgAuthFailed = $this.getMessage('auth_failed'),
            msgSessInit = $this.getMessage('session_init'),
            urlSessInfo= $this.getApi('session_info');

        if(waitMessage === true){
            Ext.Msg.wait(msgSessTerminate);
        }

        if($app.fireEvent('sipas/session/beforecheck') === false) return;

        Ext.Ajax.request({
            url: urlSessInfo,
            callback: function(options, success, response) {
                var _sessData = Ext.decode(response.responseText, true) || {};
                if(_sessData.islogin){
                    updateSession(_sessData);
                }

                Ext.log('APP: Session check');
                $app.fireEvent('sipas/session/check', $this.isAuth(), $this.getSession());
                
                if($this.isAuth()){
                   $helper.getRedirect();
                }

                Ext.callback(fn, scope, [$this.isAuth(), $this.getSession(), response]);
            }
        });
    },

    /**
     * Make an authentication request
     *
     *      Example:
     *      app.getController('Sipas.Session').auth('user','secret',function(success, session, response){
     *          if(success === false){
     *              Ext.Msg.alert('User or password is invalid');
     *          }
     *      }, this);
     * 
     * @param  {[type]} config [description]
     * @return {Ext.app.Controller} SIPAS.controller.Sipas.Session
     */
    auth: function(config){
        config = Ext.applyIf(config || {},{
            username: null, 
            password: null,
            callback: Ext.emptyFn,
            scope: this,
            url: this.getApi('session_auth'),
            wait: false,
            waitMessage: this.getMessage('session_validate')
        })
        var $this = this,
            $app = $this.getApplication(),
            $eventbrowser = $app.EventBrowser(),
            wait = null,
            params = {
                username: config.username, 
                password: $app.getMetadata('useHashLoginPassword') ? $this.generatePassword(config.password) : config.password
            };

        $app.fireEvent('sipas/session/auth');
        if(config.wait) wait = Ext.Msg.wait(config.waitMessage);
        Ext.Ajax.request({
            url: config.url,
            method: 'post',
            params: params,
            callback: function(options, success, response){
                if(config.wait) wait.close();
                var res = Ext.decode(response.responseText, true) || {};
                updateSession(res.session);

                if(res.success && res.session && res.islogin){
                    Ext.log('APP: Session initialized');
                    $app.fireEvent('sipas/session/auth/success');
                    $eventbrowser.fireEvent('sipas/session/auth/success');
                }else{
                    $app.fireEvent('sipas/session/auth/failed');
                }   
                
                Ext.callback(config.callback, config.scope, [res.success, $this.getSession(), response]);
            }
        });
    },

    /**
     * Make an changePassword request
     *
     *      Example:
     *      app.getController('Sipas.Session').changePassword({
     *          callback: function(success, session, response){
     *              if(success === false){
     *                  Ext.Msg.alert('User or password is invalid');
     *              }
     *          }
     *      });
     * 
     * @param  {[type]} config [description]
     * @return {Ext.app.Controller} SIPAS.controller.Sipas.Session
     */
    changePassword: function(config){
        config = Ext.apply({
            oldpassword: null, 
            newpassword: null,
            callback: Ext.emptyFn,
            scope: this,
            wait: false,
            url: this.getApi('session_changepassword'),
            waitMessage: this.getMessage('session_changepassword')
        }, config);

        var $this = this,
            $app = $this.getApplication(),
            wait = null;

        if($app.fireEvent('sipas/session/changepassword', config.oldpassword, config.newpassword) === false) return;

        if(config.wait) wait = Ext.Msg.wait(config.waitMessage);
        
        Ext.Ajax.request({
            url: config.url,
            method: 'post',
            params: {
                oldpassword: $this.generatePassword(config.oldpassword), 
                newpassword: $this.generatePassword(config.newpassword)
            },
            callback: function(options, success, response){
                if(config.wait) wait.close();
                var res = Ext.decode(response.responseText, true) || {};

                $app.fireEvent('sipas/session/changepassword', res.success, res, response);
                Ext.callback(config.callback, config.scope, [res.success, res, response]);
            }
        });
    },

    generatePassword: function(password){
        return CryptoJS.MD5(password).toString()
    },

    /**
     * [terminate description]
     * @param  {[type]}   silent [description]
     * @param  {Function} fn     [description]
     * @param  {[type]}   scope  [description]
     * @return {[type]}          [description]
     */
    terminate: function(silent, fn, scope) {
        var $this = this,
            $app = $this.getApplication(),
            $eventbrowser = $app.EventBrowser(),
            $helper = $app.Helper(),
            msgConfirm = $this.getMessage('session_terminate_confirm'),
            msgSessTerminate = $this.getMessage('session_terminate'),
            urlSessTerminate = $this.getApi('session_terminate'),
            app = $this.getApplication(),
            fn = fn || Ext.emptyFn, 
            scope = scope || $this,
            doTerminate = function() {
                
                if($app.fireEvent('sipas/session/beforeterminate') === false) return;
                
                if(silent !== true) Ext.Msg.wait(msgSessTerminate);
                Ext.Ajax.request({
                    url: urlSessTerminate,
                    callback: function(options, success, response) {
                        
                        if(silent !== true) Ext.Msg.hide();
                        var res = Ext.decode(response.responseText, true) || {};
                        if(res.success)
                        {
                            updateSession(null);
                            Ext.log('APP: Session terminated');
                            $app.fireEvent('sipas/session/terminate');
                            $eventbrowser.fireEvent('sipas/session/terminate');
                        }
                        Ext.callback(fn, scope, [res.success, res, response]);
                    }
                });
            };

        if (silent) {
            doTerminate();
        } else {
            Ext.Msg.show({
                title: msgConfirm[0],
                msg: msgConfirm[1],
                buttons: Ext.Msg.OKCANCEL,
                icon: Ext.window.MessageBox.QUESTION,
                fn: function(btn) {
                    if (btn === 'ok') {
                        doTerminate();
                    }
                }
            });
        }
    }

}
});