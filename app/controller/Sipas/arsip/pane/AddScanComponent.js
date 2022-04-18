Ext.define('SIPAS.controller.Sipas.arsip.pane.AddScanComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views:[
        'Sipas.arsip.Pane'
    ],
    
    refs : [
        { ref: 'mainview',      selector: 'sipas_arsip_pane'},
        { ref: 'list',          selector: 'sipas_arsip_pane dataview'}
    ],

    messages: {
        'prepare_script'        : 'Menyiapkan program ...',
        'prepare_script_failed' : ['Gagal', 'Gagal menyiapkan program. Silahkan hubungi administrator.'],
        'connect_device'        : 'Menghubungkan perangkat ...',
        'connect_device_failed' : ['Gagal', [
                                'Gagal menghubungkan perangkat.',
                                'Untuk menggunakan fitur ini silahkan pasang dan buka aplikasi <a href="resources/scannerjs/scanner.exe" target="_blank">Asprise ScanApp</a>',
                                '* info lebih lanjut kunjungi <a href="https://asprise.com" target="_blank">www.asprise.com</a>'
                                ].join('<br/>') 
                                ],
        'device_ready'          : 'Perangkat siap digunakan'
    },

    api: {
        script_source   : 'resources/scannerjs/scanner.js',
        create_scan     : 'server.php/sipas/dokumen/create_scan',
        update_scan     : 'server.php/sipas/dokumen/update_scan'
    },

    mainview: null,

    init: function(application) {
        this.control({
            'sipas_arsip_pane > toolbar #buttonAdd menu menuitem[action^=scan]' : {
                click: this.onButtonScan_Click
            }
        });
    },

    getScanner: function(callback, scope)
    {
        var $this = this,
            callback = callback || Ext.emptyFn,
            scope = scope || $this,
            mainview = $this.mainview,
            initScanner = function(c, s){
                Ext.Msg.wait($this.getMessage('connect_device'));

                // initialize scanner
                var delay = (scanner.isInitialized && scanner.isConnectedToScanWebSocket()) ? 0 : 300;
                scanner.initialize();
                Ext.Function.defer(function(){
                    if(scanner.isConnectedToScanWebSocket()){
                        Ext.Msg.hide();
                        
                    }else{
                        var msg = $this.getMessage('connect_device_failed');
                        Ext.Msg.alert(msg[0], msg[1]);
                    }
                    Ext.callback(c || Ext.emptyFn, s || $this, [scanner, scanner.isConnectedToScanWebSocket()]);
                }, delay);
            };

        if(Ext.global.scanner)
        {
            initScanner(callback, scope);
            return $this;
        }

        Ext.Msg.wait($this.getMessage('prepare_script'));
        Ext.Loader.loadScript({
            url: $this.getApi('script_source'),
            onLoad: function(){
                initScanner(callback, scope);
            },
            onError: function(){
                var msg = $this.getMessage('prepare_script_failed');
                Ext.Msg.alert(msg[0], msg[1]);
                Ext.callback(callback, scope, []);
            }
        });
        return $this;
    },

    processScannedImage: function(scannedImage)
    {
        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.mainview,
            mode = mainview.mode,
            store = mainview.store,
            cmpNama = mainview.down('[name=dokumen_nama]').getValue(),
            param_fk = mainview.arsip.modelName == 'SIPAS.model.Sipas.Arsip' ? 'arsip_id' : 'dokumen_arsip',
            url = $this.getApi('create_scan'),
            imageData = scannedImage.src;

        var record = store.model.create({
                'dokumen_nama': cmpNama,
                param_fk : mainview.arsip && mainview.arsip.getId()
            }),
            status = record.self.uploadStatus(),
            params = {};
        
        params[param_fk] = mainview.arsip && mainview.arsip.getId();

        store.insert(0, record);
        record.set('dokumen_progress', status.PROGRESS);
        record.commit();
        
        if(mode === 'add'){
            Ext.Ajax.request({
                url: url,
                method: 'post',
                disableCaching: true,
                params: params,
                header: {'Content-Type': 'application/json'},
                jsonData: {
                    mime: scannedImage.mimeType,
                    userfile: scannedImage.src,
                    dokumen_nama: record.get('dokumen_nama'),
                    dokumen_arsip: mainview.arsip && mainview.arsip.getId()
                },
                success: function(response){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    record.set(objres.data);
                    record.set('dokumen_progress', status.SUCCESS);
                    record.commit();
                },
                failure: function(response){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    record.set('dokumen_progress', status.FAILED);
                    record.commit();
                    $helper.showMessage({success:false, message: objres.message});
                }
            });
            store.reload();
        }
        else{
            
            url = $this.getApi('update_scan');
            arsip = mainview.arsip;
            surat = mainview.surat;
            record = mainview.record;
            dokumenInduk = record.get('dokumen_induk');
            if(dokumenInduk === null){
                dokumenInduk = record.get('dokumen_id');
            }

            Ext.Ajax.request({
                url: url,
                method: 'post',
                disableCaching: true,
                params: params,
                header: {'Content-Type': 'application/json'},
                jsonData: {
                    mime: scannedImage.mimeType,
                    userfile: scannedImage.src,
                    dokumen_nama      : cmpNama,
                    dokumen_arsip     : arsip.get('arsip_id'),
                    dokumen_previous  : record.get('dokumen_id'),
                    dokumen_induk     : dokumenInduk
                },
                success: function(response){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    record.set(objres.data);
                    record.set('dokumen_progress', status.SUCCESS);
                    record.commit();
                    store.reload();
                },
                failure: function(response){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    record.set('dokumen_progress', status.FAILED);
                    record.commit();
                    $helper.showMessage({success:false, message: objres.message});
                }
            });
        }
    },

    onButtonScan_Click: function(button, mainview)
    {
        var $this = this,
            format = button.scanFormat;

        $this.mainview = mainview;
        $this.getScanner(function(scanner){
            if(!scanner) return;
            scanner.scan(function(success, msg, response) {
                // On error
                if(!success) return;
                // User cancelled.
                if(success && msg != null && msg.toLowerCase().indexOf('user cancel') >= 0) { return; }

                // returns an array of ScannedImage
                var scannedImages = scanner.getScannedImages(response, true, false);
                for(var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
                    var scannedImage = scannedImages[i];
                    $this.processScannedImage(scannedImage);
                }
            },{
                "output_settings": [{
                    "type": "return-base64",
                    "format": format
                }]
            });
        });
    }
});