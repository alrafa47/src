Ext.define('SIPAS.controller.Sipas.surat.berkas.paneview.ScanComponent', {
    extend: 'Ext.app.Controller',

    mixins:{
        template: 'Ext.ux.controller.Template'
    },

    views:[
        'Sipas.surat.berkas.Paneview'
    ],
    
    refs : [
        { ref: 'mainview',      selector: 'sipas_surat_berkas_paneview'},
        { ref: 'list',          selector: 'sipas_surat_berkas_paneview dataview'}
    ],

    messages: {
        'prepare_script'        : 'Menyiapkan program ...',
        'prepare_script_failed' : ['Gagal', 'Gagal menyiapkan program. Silahkan hubungi administrator.'],
        'connect_device'        : 'Menghubungkan perangkat ...',
        'connect_device_failed' : ['Gagal', 'Gagal menghubungkan perangkat. <br/>Silahkan unduh dan pasang aplikasi <a href="resources/scannerjs/scanner.exe" target="_blank">Asprise ScanApp</a><br/>untuk menggunakan fitur ini.<br/>* info lebih lanjut<a href="https://asprise.com" target="_blank">www.asprise.com</a>'],
        'device_ready'          : 'Perangkat siap digunakan'
    },

    api: {
        script_source           : 'resources/scannerjs/scanner.js',
        create_scan            : 'server.php/sipas/surat_berkas/create_scan'
    },

    init: function(application) {
        this.control({
            'sipas_surat_berkas_paneview button#btnScan, sipas_surat_berkas_paneview button#btnScan menu [scanFormat]' : {
                click: this.onButtonScan_Click
            }
        });
    },

    getScanner: function(callback, scope){
        var callback = callback || Ext.emptyFn,
            scope = scope || this,
            $this = this,
            mainview = this.getMainview(),
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

    processScannedImage: function(scannedImage){
        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview(),
            list = $this.getList({root:mainview}),
            store = list && list.getStore(),
            param_fk = mainview.record.modelName == 'SIPAS.model.Sipas.Template' ? 'surat_berkas_template' : 'surat_berkas_surat',
            url = $this.getApi('create_scan'),
            imageData = scannedImage.src;

        var record = store.model.create({
                'surat_berkas_nama': 'file scan '+ Ext.util.Format.date(new Date(), 'Y-m-d H:i:s'),
                param_fk : mainview.record && mainview.record.getId()
            }),
            status = record.self.uploadStatus(),
            params = {};
        
        params[param_fk] = mainview.record && mainview.record.getId();

        store.insert(0, record);
        record.set('surat_berkas_progress', status.PROGRESS);
        record.commit();
            
        Ext.Ajax.request({
            url: url,
            method: 'post',
            disableCaching: true,
            params: params,
            header: {'Content-Type': 'application/json'},
            jsonData: {
                mime: scannedImage.mimeType,
                userfile: scannedImage.src,
                surat_berkas_nama: record.get('surat_berkas_nama'),
                surat_berkas_surat: mainview.record && mainview.record.getId()
            },
            success: function(response){
                var objres = Ext.decode(response.responseText, 1) || {};
                record.set(objres.data);
                record.set('surat_berkas_progress', status.SUCCESS);
                record.commit();
                list.refresh();
            },
            failure: function(response){
                var objres = Ext.decode(response.responseText, 1) || {};
                record.set('surat_berkas_progress', status.FAILED);
                record.commit();
                $helper.showMessage({success:false, message: objres.message});
            }
        });
    },

    onButtonScan_Click: function(button, e, eOpts){
        var $this = this,
            mainview = this.getMainview({from:button}),
            format = button.scanFormat;

        $this.getScanner(function(scanner){
            if(!scanner) return;
            scanner.scan(function(success, msg, response) {
                if(!success) { // On error
                    return;
                }
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