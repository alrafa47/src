Ext.define('SIPAS.controller.Sipas.sistem.EmitterClient', {
    extend: 'Ext.app.Controller',
    
    messages: {
        'connection_failed': ['Gagal', 'Gagal melakukan koneksi ke server Messaging'],
        'disconnected': ['Perhatian', 'Koneksi ke server massaging terputus'],
        'reconnected': ['Perhatian', 'Anda sudah tersambung kembali dengan server messaging']
    },

    emitterClient: null,
    emitterInit: false,
    emitterSubscribed: [],
    
    status: {
        offline: 0,
        disconnect: 1,
        connected: 2,
        error: 3
    },

    connectionStatus : 0,

    init: function(application){
        var $this = this;
        Ext.apply(application, {
            Emitter: function(){
                return $this;
            },
            EmitterClient: function(){
                return $this.emitterClient;
            },
            getEmitterLocalConfig: Ext.Function.alias(this, 'getEmitterLocalConfig'),
            removeEmitterConfig: Ext.Function.alias(this, 'removeEmitterConfig'),
            emitterConfigIsExist: Ext.Function.alias(this, 'emitterConfigExist')
        });

        application.on({
            'emitter/connect': this.onEmitter_Ready,
           // 'emitter/disconnect': this.onEmitter_Closed,
            'msgbroker/requestChannel': this.doRequestChannelKey,
            'emitterClient/subscribeToChannel': this.doSubscribeToChannel,
            'emitterClient/unSubscribeFromChannel': this.unSubscribeFromChannel,
            scope: this
        });
        
    },
    
    onEmitter_Ready: function(config, callback)
    {
        this.initEmitter(config, callback);
    },

    initEmitter: function(config, callback){
        var $this = this,
            app = $this.getApplication(),
            runtime = app.Runtime(),
            localSetting = app.LocalSetting(),
            ConnectionConfig = config[0] ? config[0] : config;

        if(!Ext.isEmpty(ConnectionConfig)){
            $this.emitterClient = emitter.connect({ host: ConnectionConfig.host, port: ConnectionConfig.port });

            $this.emitterClient.on('connect', function (connack) {
                $this.connectionStatus = $this.status.connected;
                $this.getEmitterLocalConfig(function (emitterConfig) {
                    app.fireEvent('emitterClient/subscribeToChannel', emitterConfig, function () {});
                }, true, $this)
            });

            $this.emitterClient.on('disconnect', function (connack) {
                $this.connectionStatus = $this.status.disconnect;
                app.fireEvent('home/emitterConnectionChange', $this.connectionStatus);
            });

            $this.emitterClient.on('offline', function (connack) {
                $this.connectionStatus = $this.status.offline;
                app.fireEvent('home/emitterConnectionChange', $this.connectionStatus);
            });

            $this.emitterClient.on('error', function (connack) {
                $this.connectionStatus = $this.status.error;
                app.fireEvent('home/emitterConnectionChange', $this.connectionStatus);
            });

            $this.emitterClient.on('message', function (msg_) {
                var payload = msg_.asObject(),
                    msg = payload.message;

                app.fireEvent('eventWorker/dispatch', msg, function () {
                    console.log('emitter ', 'callback');
                });

            });
        }

        if(callback && Ext.isFunction(callback)) Ext.callback(callback);
    },

    doRequestChannelKey: function(config, callback){
        var $this = this,
            app = $this.getApplication(),
            runtime = app.Runtime(),
            config = Ext.merge({}, config);

        $this.requestChannelKey(config, function (config) {
            app.fireEvent('emitter/connect', config, function () {
                // app.fireEvent('emitterClient/subscribeToChannel', config, function () { });
            });
        });

        if (callback && Ext.isFunction(callback)) Ext.callback(callback, {}, {}, 10);
    },

    doSubscribeToChannel: function(config, callback){
        var $this = this,
            app = $this.getApplication();

        $this.subscribeToChannel(config, callback);
    },

    requestChannelKey: function(config, callback){
        var $this = this,
            app = $this.getApplication(),
            helper = app.Helper(),
            config = Ext.merge({}, config),
            localSetting = app.LocalSetting(),
            runtime = app.Runtime();

        if(config.channelType){
            var reqProtocol = runtime.getValue('protocol')+'://',
                reqHost = runtime.getValue('emitterKeygenChannelHost'),
                reqPort = runtime.getValue('emitterKeygenChannelPort') ? ':' + runtime.getValue('emitterKeygenChannelPort') : '',
                reqApi = runtime.getValue('emitterServiceApi'),
                reqUrl = reqProtocol+reqHost+reqPort+reqApi+'/'+config.channel,
                additionalConfig = {};

            Ext.Ajax.request(Ext.merge({
                url: reqUrl,
                method: 'GET',
                params: { channeltype: config.channelType },
                success: function (response) {
                    var data = response.responseText,
                        dataparsed = Ext.decode(data);

                    $this.addToEmitterConfig(config.channelType, config.channel, dataparsed);
                    if (callback && Ext.isFunction(callback)) Ext.callback(callback, $this, [dataparsed], 10);
                },
                failure: function () {
                    console.log('RequestChannel', 'Gagal saat request channel');
                }
            }, additionalConfig));
        }else{
            app.show('Gagal', 'Gagal melakukan request channel ke server');
        }
    },

    subscribeToChannel: function(conf, callback){
        var $this = this,
            app = $this.getApplication(),
            emitterClient = $this.emitterClient || {};

        if(conf){
            Ext.each(conf, function(config){
                if ($this.emitterSubscribed.indexOf(config.channel) < 0){
                    console.log('subscribe to : ', config);
                    $this.emitterSubscribed.push(config.channel);
                    emitterClient.subscribe({
                        key: config.key,
                        channel: config.channel
                    });
                }
            });
        }else{
            console.log('Subscribe Channel', 'tidak memiliki config emitter');
        }

        if (callback && Ext.isFunction(callback)) Ext.callback(callback, {}, {}, 10);
    },

    getEmitterLocalConfig: function(callback, scope){
        var $this = this,
            app = $this.getApplication(),
            runtime = app.Runtime(),
            channels = runtime.getValue('groupToSubsribe'),
            localsetting = app.LocalStorage(),
            configs = [];

        Ext.each(channels, function (channel) {
            var config = localsetting.getValue(channel + '-emitterconfig');
            if (config) {
                config = Ext.decode(config);
                configs = configs.concat(Object.values(config));
            }
        });

        Ext.callback(callback, scope, [configs]);
    },

    useToken: function(){
        return (this.getApplication().getTokenData !== undefined) ? true : false;
    },

    isConnected: function(){
        return $this.connectionStatus === $this.status.connected ? true : false;
    },

    removeEmitterConfig: function(){
        var $this = this,
            app = $this.getApplication(),
            runtime = app.Runtime(),
            localsetting = app.LocalStorage(),
            groups = runtime.getValue('groupToSubsribe');
        
        $this.emitterSubscribed = [];
        Ext.each(groups, function(group){
            if(localsetting.getValue(group+'-emitterconfig')){
                localsetting.remove(group+'-emitterconfig');
            }
        })
    },

    unSubscribeFromChannel: function(config, callback){
        var $this = this,
            emitterClient = $this.emitterClient;
        if (config) {
            Ext.each(config, function (conf) {
                console.log('unsubscribe from : ', conf );
                emitterClient.unsubscribe({
                    key: conf.key,
                    channel: conf.channel
                });
            });
        }
        if (callback && Ext.isFunction(callback)) Ext.callback(callback, {}, {}, 10);
    },

    addToEmitterConfig: function(group, channel, newConfig){
        var $this = this,
            app = $this.getApplication(),
            localsetting = app.LocalStorage(),
            configs = localsetting.getValue(group+'-emitterconfig');

        if(configs){    
            var groupconfig = Ext.decode(configs);
            groupconfig[channel] = newConfig;
            groupconfig = Ext.encode(groupconfig);
            localsetting.setValue(group+'-emitterconfig', groupconfig);
        }else{
            var groupconfig = {};
            groupconfig[channel] = newConfig;
            groupconfig = Ext.encode(groupconfig);
            localsetting.setValue(group+'-emitterconfig', groupconfig);
        }
    },

    emitterConfigExist: function(group, channel){
        var $this = this,
            app = $this.getApplication(),
            localsetting = app.LocalStorage(),
            config = localsetting.getValue(group+'-emitterconfig'),
            config = Ext.decode(config);
        
        return (config && config[channel]) ? true : false;
    }
});