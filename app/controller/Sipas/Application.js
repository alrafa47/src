Ext.define('SIPAS.controller.Sipas.Application', function(){

    var metadata = {

        ///////////////////////////////////////////
        // THESE ARE STATIC VALUE                //
        // DON'T HAND EDIT EXCEPT YOU KNOW IT!!! //
        ///////////////////////////////////////////
        product: 'SIPAS 5.2 Enterprise',
        productCode: 'SIPAS',
        productVersion: '5.27.21420.7',
        productVariant: 'Enterprise',
        productCaption: 'Sistem Informasi Pengelolaan Arsip Surat',
        productStart: 2013,
        productSite: 'www.sipas.id',
        productDescription: [
            '<div style="text-align:center">',
                '<p><a href="{productSiteLink}" target="_blank" style="font-size:16px; font-weight: bold; color:inherit; text-decoration: none;">{productCode} v{productVersion} {productVariant}</a></p>',
                '<p>Lisensi penggunaan aplikasi untuk:<br/><strong>{licensedDisplay}</strong></p>',
                // '<p>{codeName} ({caption}) Kelola Surat Dan Disposisi Lebih Mudah, Cepat dan Akurat</p>',
                '<p>Hak Cipta &copy;{productStart}-{year} <a href="{vendorSiteLink}" target="_blank" style="text-decoration:none; color:inherit">{vendor}</a></p>',
                '<p>',
                    '<a href="{productSiteLink}" target="_blank" style="text-decoration: none; color:inherit">{productSite}</a>',
                    ' | ',
                    '<a href="{vendorSiteLink}" target="_blank" style="text-decoration: none; color:inherit">{vendorSite}</a>',
                '</p>',
            '</div>'
        ],

        year: Ext.Date.format(new Date, 'Y'),

        vendor: 'PT. Sekawan Media Informatika',
        vendorEmail: 'info@sekawanmedia.co.id',
        vendorSite: 'www.sekawanmedia.co.id',

        licensedTo: 'Tidak Terdaftar',
        licensedDisplay: 'Tidak Terdaftar'
        // licensedEmail: null,
        // licensedSite: null,
        // licensedAt: null,
        // licensedProductCode: null,
        // licensedProductVersion: null,
        // licensedProductVariant: null,
        // licensedTill: null,
        // style: '',
        // feature: null
    };

return {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.util.MixedCollection',
        'Ext.layout.container.Border',
        'Ext.direct.PollingProvider',
        'Ext.ux.grid.FiltersFeature',
        'Ext.ux.grid.menu.ListMenu',
        'Ext.ux.RowExpander',
        'Ext.ux.CheckColumn',
        'Ext.ux.component.Manipulator',
        'Ext.ux.controller.Hasview',
        'Ext.ux.task.Tasklist',
        'Ext.ux.message.Popup',
        'Ext.ux.window.Notification',
        'Ext.ux.application.ModuleConnector',
        'Ext.ux.task.DelayedTaskRunner',
        'Ext.ux.queue.Manager'
    ],

    controllers: [
        // modules
        'Sipas.Override',
        'Sipas.base.Entity',
        'Sipas.sistem.Entity',
        'Sipas.Helper',
        'Sipas.Pengaturan',

        'Sipas.session.Entity',
        'Sipas.home.Entity',

        'Sipas.staf.Entity',
        'Sipas.akun.Entity',
        'Sipas.unit.Entity',
        'Sipas.akses.Entity',
        
        'Sipas.arsip.Entity',
        'Sipas.sdoc.Entity',
        'Sipas.klise.Entity',
        'Sipas.surat.Entity',
        'Sipas.bank.Entity',
        'Sipas.bebas.Entity',
        'Sipas.masuk.Entity',
        'Sipas.ekspedisi.Entity',
        'Sipas.keluar.Entity',
        'Sipas.korespondensi.Entity',
        'Sipas.internal.Entity',
        'Sipas.sla.Entity',
        'Sipas.pelaporan.Entity',
        
        'Sipas.beranda.Entity',
        'Sipas.tugassaya.Entity',
        'Sipas.disposisi.Entity',
        'Sipas.notadinas.Entity',
        'Sipas.riwayat.Entity',
        'Sipas.koreksi.Entity',
        'Sipas.kontak.Entity'
    ],

    LOG_ERROR: 4,
    LOG_WARNING: 3,
    LOG_INFO: 1,

    init: function(application)
    {
        Ext.apply(application, {
            Tasklist: Ext.ux.task.Tasklist,
            log: Ext.Function.alias(this, 'log')
        });
    },

    onLaunch: function()
    {
        var $this = this,
            $app = $this.getApplication(),
            $helper = this.getController('Sipas.Helper'),
            $runtime = this.getController('Sipas.sistem.Runtime'),
            $license = this.getController('Sipas.sistem.License'),
            $feature = this.getController('Sipas.sistem.featureable.Feature'),
            $language = this.getController('Sipas.sistem.languageable.Language'),
            $home = this.getController('Sipas.Home');

        Ext.applyIf($app, $this);

        $app.log('APP: Booting');

        // $app.log('APP: Initializing requirements');
        $app.fireEvent('sipas/requirement/init');
        $this.validateRequirements(function()
        {
            $app.log('APP: Initializing requirements, done');
            $app.fireEvent('sipas/requirement/ready');

            // $app.log('APP: Initializing runtime');
            $app.fireEvent('sipas/runtime/init');
            $runtime.loadConfig(function(runtimeConfig, $runtime)
            {
                $app.log('APP: Initializing runtime, done');
                $app.fireEvent('sipas/runtime/ready');

                // $app.log('APP: Initializing license');   
                $app.fireEvent('sipas/license/init');
                $license.loadLicense(function($license)
                {
                    $app.log('APP: Initializing license, done');
                    $app.fireEvent('sipas/license/ready');

                    // prepare metadata
                    var _localMetadata = Ext.clone(metadata),
                        _runtimeMetadata = Ext.clone(runtimeConfig),
                        _licenseMetadata = $license.getLicense().getData();

                    metadata = Ext.Object.merge({}, _runtimeMetadata, _localMetadata, _licenseMetadata);
                    Object.freeze(metadata);

                    // $app.log('APP: Initializing features');
                    $app.fireEvent('sipas/feature/init');
                    $feature.initFeatures(function(features, $feature)
                    {
                        $app.log('APP: Initializing features, done');
                        $app.fireEvent('sipas/feature/ready');

                        // $app.log('APP: initializing language');
                        $app.fireEvent('sipas/language/init');
                        $language.loadGrammar(function(gramar, $Language)
                        {
                            $app.log('APP: initializing language, done');
                            $app.fireEvent('sipas/language/ready');

                            // continue prepare app
                            // $app.log('APP: Initializing app');
                            $app.fireEvent('sipas/application/init');
                            $this.setupApp(function()
                            {
                                $app.log('APP: Initializing app, done');
                                $app.fireEvent('sipas/application/ready');

                                $home.launch();
                                $app.log('APP: Launch');
                            });
                        });
                    });
                });
            });
        });

        this.callParent(arguments);
    },

    getMetadata: function()
    {
        if(arguments.length == 1)
        {
            var key = arguments[0] || "",
                value;

            if(Ext.isString(key))
            {
                key = key.split('|');

                for (var i = 0; i < key.length; i++)
                {
                    v = key[i];
                    if(metadata.hasOwnProperty(v))
                    {
                        value = metadata[v];
                        break;
                    }
                }
            }
            else if(Ext.isObject(key))
            {
                var _value = {};
                Ext.Object.each(key, function(k,v,a)
                {
                    _value[k] = metadata[k];
                });

                value = Ext.applyIf(_value, key);
            }
            else if(Ext.isArray(key))
            {
                value = {};

                Ext.Array.each(key, function(v,i,a)
                {
                    value[v] = metadata[v];
                });
            }

            return value;
        }
        else if(arguments.length > 1)
        {
            var value = metadata[arguments[0]],
                data = arguments[1];

            if(data === false)
            {
                return value;
            }

            return (new Ext.Template(value)).apply(data);
        }
        return metadata;
    },

    // not implemented yet
    validateRequirements: function(callback, scope)
    {
        var callback = callback || Ext.emptyFn,
            scope = scope || this;

        var browserRequirements = {
            IE: "^10",
            Chrome: "^16",
            Firefox: "^16",
            Opera: "^11",
            Safari: "^6"
        };

        // Check browser and version
        // if(Ext.os.is){};

        Ext.callback(callback, scope, [true, this]); // force tru by now

        return this;
    },

    setupApp: function(callback, scope)
    {
        var callback = callback || Ext.emptyFn,
            scope = scope || this;   

        // sevelar task to be prepared
        this.setupFavicon();
        this.setupTitle();
        this.setupEventTracer();

        // send callback
        Ext.callback(callback, scope, [this]);
    },

    setupFavicon: function()
    {
        var urlFav = this.getMetadata('productIcon') || this.getMetadata('productLogo'),
            head = Ext.query('head')[0],
            fav = Ext.query('head link[rel="Shortcut Icon"]')[0] || (function(){
                var f = document.createElement('link');
                f.rel = "Shortcut Icon";
                head.appendChild(f);
                return f;
            })();

        fav.href = urlFav;
        return this;
    },

    setupTitle: function(title)
    {
        var titleConfig = this.getMetadata('productTitle'),
            title = (new Ext.XTemplate(titleConfig)).apply(this.getMetadata());

        if(document.title != title) document.title = title;
        return this;
    },

    setupEventTracer: function()
    {
        var $app = this.getApplication();

        // add tracing event feature
        // patch for ie8
        if (typeof Object.getPrototypeOf !== "function"){
            Object.getPrototypeOf = "".__proto__ === String.prototype ? function(object) {
                return object.__proto__;
            } : function(object) {
                // May break if the constructor has been tampered with
                return object.constructor.prototype;
            };
        }
        Object.getPrototypeOf($app).fireEvent = Ext.Function.createInterceptor(Object.getPrototypeOf($app).fireEvent, function()
        {    
            var tracer = $app.getMetadata('traceEvents');
            
            if(tracer)
            {
                if( Ext.isString(tracer) ){
                    tracer = new RegExp(tracer);
                }
                if( (tracer instanceof RegExp) && !tracer.test(arguments[0]) ){
                    return true;
                }

                ///////////////////////
                // logic of dev mode //
                ///////////////////////
                $app.log('App: Event', arguments);
            }

            return true;
        });
    },

    log: function()
    {
        try{
            Ext.global.console && Ext.global.console.log.apply(Ext.global.console, arguments);
        }catch(e){
            console && console.log(arguments);
        }
    }
}
});
