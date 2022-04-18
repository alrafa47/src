Ext.define('SIPAS.controller.Sipas.sistem.License', function(){

	var savedLicense = null,
		dayToWarning = 7;

return {
	extend: 'Ext.app.Controller',
	
	requires: [
		'Ext.util.CSS'
	],

	licenseUrl: 'license.json',

	messages: {
		licenseLoadFailed: [
			'Gagal verifikasi aplikasi', 
			'Server tidak memberikan respon, silahkan cek koneksi jaringan anda.'
		],
		licenseExpired: [
			'Lisensi Telah Berakhir',
			[
				'Mohon maaf lisensi anda sudah Berakhir.',
				'Info lebih lanjut hubungi administrator'
			].join('<br/>')
		],
		licenseAlmostExpired: [
			'Lisensi akan segera berakhir',
			[
				'Mohon maaf lisensi anda Segera Berakhir dalam {remainDays} hari lagi !.',
				'Info lebih lanjut hubungi administrator'
			].join('<br/>')
		],
		licenseInvalidVersion: [
			'Lisensi Tidak Valid',
			[
				'Mohon maaf versi lisensi anda Tidak Sesuai.',
				'Info lebih lanjut hubungi administrator'
			].join('<br/>')
		],
		licenseInvalid: [
			'Lisensi Tidak Valid',
			[
				'Mohon maaf lisensi anda Tidak Sesuai.',
				'<b>* PEMBAJAKAN APLIKASI TERMASUK TINDAK PIDANA !!!</b>'
			].join('<br/>')
		]
	},

	constructor: function (config)
	{
		this.callParent(arguments);

		Object.freeze(this);
		Object.freeze(Object.getPrototypeOf(this));
    },

    init: function(application)
    {
    	var $this = this;
    	Ext.apply(application, {
    		License: function(){
    			return $this;
    		}
    	});
    },

    getMessage: function(messageCode, data)
    {
    	var msgTpl = this.messages[messageCode];
    	if(Ext.isString(msgTpl))
    	{
    		return (new Ext.Template(this.messages[messageCode])).apply(data);
    	}
    	else if(Ext.isArray(msgTpl))
    	{
    		var msg = [];
    		Ext.each(msgTpl, function(v, i){
    			msg[i] = (new Ext.Template(v)).apply(data);
    		});
    		return msg;
    	}
    	else if(Ext.isObject(msgTpl))
    	{
    		var msg = {};
    		Ext.Object.each(msgTpl, function(i, v){
    			msg[i] = (new Ext.Template(v)).apply(data);
    		});
    		return msg;
    	}
    },

	loadLicense: function(callback, scope) // callback(valid, $license)
	{
        callback = callback || Ext.emptyFn;
        scope = scope || this;

        var $this = this,
            $app = this.getApplication();

        this.getLicense(function(license)
        {
            /////////////////////
            // INVALID LICENSE //
            /////////////////////

            // invalid license
            if(!license.isValid())
            {
            	var msg = $this.getMessage('licenseInvalid', $app);
                Ext.MessageBox.show({
					title: msg[0],
                    msg: msg[1],
                    closable: false
                });
                license.pingVendor();
                return;
            }

            // obsolete version license
            if(!(new Ext.Version($app.getMetadata('productVersion'))).match(license.get('licensedProductVersion'))){
            	var msg = $this.getMessage('licenseInvalidVersion', $app);
                Ext.MessageBox.show({
					title: msg[0],
                    msg: msg[1],
                    closable: false
                });
                license.pingVendor();
                return;
            }

            ///////////////////
            // VALID LICENSE //
            ///////////////////

            // apply style
            Ext.util.CSS.createStyleSheet(license.get('style') || '', 'SipasLicense');

            // check trial
            if( license.isTrial() )
            {
            	// expired
				if( license.isExpired() ){
					var msg = $this.getMessage('licenseExpired',$app);
					Ext.MessageBox.show({
						title: msg[0],
						msg: msg[1],
						closable: false
					});
					license.pingVendor();
					return;
				}

            	// almost expired license
            	else if( license.getTrialRemainDays() < dayToWarning ) 
				{
					var msg = $this.getMessage('licenseAlmostExpired', Ext.apply(
						{remainDays: license.getTrialRemainDays()}, $app
					));
					Ext.MessageBox.show({
						title: msg[0],
						msg: msg[1],
						buttons: Ext.Msg.OK,
						closable: true,
						callback: function(){
							Ext.callback(callback, scope, [$this]);
						}
					});
					license.pingVendor();
				}

				// trial still on
				else{
					Ext.callback(callback, scope, [$this]);
				}

				return true;
            }

            // no trial
			Ext.callback(callback, scope, [$this]);
			return true;
        });
    },

	getLicense: function(callback, scope)
	{
		if(savedLicense)
		{
			Ext.callback(callback || Ext.emptyFn, scope || this, [savedLicense]);
			return savedLicense;
		}

		var $this = this,
			url = this.licenseUrl;
			
		Ext.Ajax.request({
			url: url,
			success: function(response, operation){
				savedLicense = $this.createLicense(JSON.parse(response.responseText), true);

				if (typeof savedLicense == 'string') {
					savedLicense = JSON.parse(savedLicense);
				}
				
				Ext.callback(callback || Ext.emptyFn, scope || $this, [savedLicense]);
			},
			failure: function(){
				var msg = $this.getMessage('licenseLoadFailed');
				Ext.Msg.alert(msg[0], msg[1]);
			}
		});
	},

	createLicense: function(licenseData)
	{
		return Object.freeze(new (function(data)
		{
			var chiper = '\x53\x65\x6B\x61\x77\x61\x6E\x4D\x65\x64\x69\x61\x49\x6E\x66\x6F\x72\x6D\x61\x74\x69\x6B\x61\x53\x6F\x66\x74\x77\x61\x72\x65\x48\x6F\x75\x73\x65\x26\x49\x54\x43\x6F\x6E\x73\x75\x6C\x74\x61\x6E\x74', //SekawanMediaInformatikaSoftwareHouse&ITConsultant
				urlReportVendor = '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x69\x70\x61\x73\x2E\x69\x64\x2F\x6C\x69\x63\x65\x6E\x73\x65\x2E\x70\x68\x70',//'https://www.sipas.id/license.php',
				license = (typeof data == "string" ? Ext.decode(data, true) : data) || {};

			var isValid = function(){
				var licCopy = Ext.clone(license) || {},
					signature = (license || {})['signature'];

				if(licCopy.hasOwnProperty('signature')) delete licCopy['signature'];

				var licCopyEncrypted = CryptoJS.SHA512(Ext.encode(licCopy, true) + chiper);
				return (licCopyEncrypted.toString() == signature && !Ext.isEmpty(licCopyEncrypted));
			};

			this.get = function(param){
				return license[param] || null;
			};
			this.getData = function(includeSignature){
				var licCopy = Ext.clone(license) || {};
				if(licCopy.hasOwnProperty('signature') && !includeSignature)
				{
					delete licCopy['signature'];
				}
				return licCopy;
			};
			this.isValid = function(){
				return isValid();
			};
			this.isTrial = function(){
				return !!this.get('licensedTill');
			};
			this.isExpired = function(){
				return 0 > this.getTrialRemain();
			};
			this.getExpiredDate = function(){
				var expired = new Date(this.get('licensedTill'));
				return expired || Date.now();
			},
			this.getTrialRemain = function(){
  		        return Number(this.getExpiredDate().getTime()) - Number(Date.now());
			};
			this.getTrialRemainDays = function(){
  		        return Math.round(this.getTrialRemain()/(1000*60*60*24));
			};
			this.pingVendor = function(){
				Ext.Ajax.request({
					url: urlReportVendor,
					headers: {
				        'Content-type': 'application/json'
				    },
				    jsonData: license
				});
			}
		})(licenseData));
	}
}
});

// var _0xb021=["\x53\x49\x50\x41\x53\x2E\x63\x6F\x6E\x74\x72\x6F\x6C\x6C\x65\x72\x2E\x53\x69\x70\x61\x73\x2E\x73\x69\x73\x74\x65\x6D\x2E\x4C\x69\x63\x65\x6E\x73\x65","\x45\x78\x74\x2E\x61\x70\x70\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x6C\x65\x72","\x45\x78\x74\x2E\x75\x74\x69\x6C\x2E\x43\x53\x53","\x6C\x69\x63\x65\x6E\x73\x65\x2E\x6A\x73\x6F\x6E","\x47\x61\x67\x61\x6C\x20\x76\x65\x72\x69\x66\x69\x6B\x61\x73\x69\x20\x61\x70\x6C\x69\x6B\x61\x73\x69","\x53\x65\x72\x76\x65\x72\x20\x74\x69\x64\x61\x6B\x20\x6D\x65\x6D\x62\x65\x72\x69\x6B\x61\x6E\x20\x72\x65\x73\x70\x6F\x6E\x2C\x20\x73\x69\x6C\x61\x68\x6B\x61\x6E\x20\x63\x65\x6B\x20\x6B\x6F\x6E\x65\x6B\x73\x69\x20\x6A\x61\x72\x69\x6E\x67\x61\x6E\x20\x61\x6E\x64\x61\x2E","\x4C\x69\x73\x65\x6E\x73\x69\x20\x54\x65\x6C\x61\x68\x20\x42\x65\x72\x61\x6B\x68\x69\x72","\x3C\x62\x72\x2F\x3E","\x6A\x6F\x69\x6E","\x4D\x6F\x68\x6F\x6E\x20\x6D\x61\x61\x66\x20\x6C\x69\x73\x65\x6E\x73\x69\x20\x61\x6E\x64\x61\x20\x73\x75\x64\x61\x68\x20\x42\x65\x72\x61\x6B\x68\x69\x72\x2E","\x49\x6E\x66\x6F\x20\x6C\x65\x62\x69\x68\x20\x6C\x61\x6E\x6A\x75\x74\x20\x68\x75\x62\x75\x6E\x67\x69\x20\x61\x64\x6D\x69\x6E\x69\x73\x74\x72\x61\x74\x6F\x72","\x4C\x69\x73\x65\x6E\x73\x69\x20\x61\x6B\x61\x6E\x20\x73\x65\x67\x65\x72\x61\x20\x62\x65\x72\x61\x6B\x68\x69\x72","\x4D\x6F\x68\x6F\x6E\x20\x6D\x61\x61\x66\x20\x6C\x69\x73\x65\x6E\x73\x69\x20\x61\x6E\x64\x61\x20\x53\x65\x67\x65\x72\x61\x20\x42\x65\x72\x61\x6B\x68\x69\x72\x20\x64\x61\x6C\x61\x6D\x20\x7B\x72\x65\x6D\x61\x69\x6E\x44\x61\x79\x73\x7D\x20\x68\x61\x72\x69\x20\x6C\x61\x67\x69\x20\x21\x2E","\x4C\x69\x73\x65\x6E\x73\x69\x20\x54\x69\x64\x61\x6B\x20\x56\x61\x6C\x69\x64","\x4D\x6F\x68\x6F\x6E\x20\x6D\x61\x61\x66\x20\x76\x65\x72\x73\x69\x20\x6C\x69\x73\x65\x6E\x73\x69\x20\x61\x6E\x64\x61\x20\x54\x69\x64\x61\x6B\x20\x53\x65\x73\x75\x61\x69\x2E","\x4D\x6F\x68\x6F\x6E\x20\x6D\x61\x61\x66\x20\x6C\x69\x73\x65\x6E\x73\x69\x20\x61\x6E\x64\x61\x20\x54\x69\x64\x61\x6B\x20\x53\x65\x73\x75\x61\x69\x2E","\x3C\x62\x3E\x2A\x20\x50\x45\x4D\x42\x41\x4A\x41\x4B\x41\x4E\x20\x41\x50\x4C\x49\x4B\x41\x53\x49\x20\x54\x45\x52\x4D\x41\x53\x55\x4B\x20\x54\x49\x4E\x44\x41\x4B\x20\x50\x49\x44\x41\x4E\x41\x20\x21\x21\x21\x3C\x2F\x62\x3E","\x63\x61\x6C\x6C\x50\x61\x72\x65\x6E\x74","\x66\x72\x65\x65\x7A\x65","\x67\x65\x74\x50\x72\x6F\x74\x6F\x74\x79\x70\x65\x4F\x66","\x61\x70\x70\x6C\x79","\x6D\x65\x73\x73\x61\x67\x65\x73","\x69\x73\x53\x74\x72\x69\x6E\x67","\x69\x73\x41\x72\x72\x61\x79","\x65\x61\x63\x68","\x69\x73\x4F\x62\x6A\x65\x63\x74","\x4F\x62\x6A\x65\x63\x74","\x65\x6D\x70\x74\x79\x46\x6E","\x67\x65\x74\x41\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E","\x69\x73\x56\x61\x6C\x69\x64","\x6C\x69\x63\x65\x6E\x73\x65\x49\x6E\x76\x61\x6C\x69\x64","\x67\x65\x74\x4D\x65\x73\x73\x61\x67\x65","\x73\x68\x6F\x77","\x4D\x65\x73\x73\x61\x67\x65\x42\x6F\x78","\x70\x69\x6E\x67\x56\x65\x6E\x64\x6F\x72","\x6C\x69\x63\x65\x6E\x73\x65\x64\x50\x72\x6F\x64\x75\x63\x74\x56\x65\x72\x73\x69\x6F\x6E","\x67\x65\x74","\x6D\x61\x74\x63\x68","\x70\x72\x6F\x64\x75\x63\x74\x56\x65\x72\x73\x69\x6F\x6E","\x67\x65\x74\x4D\x65\x74\x61\x64\x61\x74\x61","\x6C\x69\x63\x65\x6E\x73\x65\x49\x6E\x76\x61\x6C\x69\x64\x56\x65\x72\x73\x69\x6F\x6E","\x73\x74\x79\x6C\x65","","\x53\x69\x70\x61\x73\x4C\x69\x63\x65\x6E\x73\x65","\x63\x72\x65\x61\x74\x65\x53\x74\x79\x6C\x65\x53\x68\x65\x65\x74","\x43\x53\x53","\x75\x74\x69\x6C","\x69\x73\x54\x72\x69\x61\x6C","\x69\x73\x45\x78\x70\x69\x72\x65\x64","\x6C\x69\x63\x65\x6E\x73\x65\x45\x78\x70\x69\x72\x65\x64","\x67\x65\x74\x54\x72\x69\x61\x6C\x52\x65\x6D\x61\x69\x6E\x44\x61\x79\x73","\x6C\x69\x63\x65\x6E\x73\x65\x41\x6C\x6D\x6F\x73\x74\x45\x78\x70\x69\x72\x65\x64","\x4F\x4B","\x4D\x73\x67","\x63\x61\x6C\x6C\x62\x61\x63\x6B","\x67\x65\x74\x4C\x69\x63\x65\x6E\x73\x65","\x6C\x69\x63\x65\x6E\x73\x65\x55\x72\x6C","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x63\x72\x65\x61\x74\x65\x4C\x69\x63\x65\x6E\x73\x65","\x6C\x69\x63\x65\x6E\x73\x65\x4C\x6F\x61\x64\x46\x61\x69\x6C\x65\x64","\x61\x6C\x65\x72\x74","\x72\x65\x71\x75\x65\x73\x74","\x41\x6A\x61\x78","\x53\x65\x6B\x61\x77\x61\x6E\x4D\x65\x64\x69\x61\x49\x6E\x66\x6F\x72\x6D\x61\x74\x69\x6B\x61\x53\x6F\x66\x74\x77\x61\x72\x65\x48\x6F\x75\x73\x65\x26\x49\x54\x43\x6F\x6E\x73\x75\x6C\x74\x61\x6E\x74","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x69\x70\x61\x73\x2E\x69\x64\x2F\x6C\x69\x63\x65\x6E\x73\x65\x2E\x70\x68\x70","\x73\x74\x72\x69\x6E\x67","\x64\x65\x63\x6F\x64\x65","\x63\x6C\x6F\x6E\x65","\x73\x69\x67\x6E\x61\x74\x75\x72\x65","\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79","\x65\x6E\x63\x6F\x64\x65","\x69\x73\x45\x6D\x70\x74\x79","\x67\x65\x74\x44\x61\x74\x61","\x74\x72\x69\x61\x6C","\x67\x65\x74\x54\x72\x69\x61\x6C\x52\x65\x6D\x61\x69\x6E","\x67\x65\x74\x45\x78\x70\x69\x72\x65\x64\x44\x61\x74\x65","\x6E\x6F\x77","\x67\x65\x74\x54\x69\x6D\x65","\x72\x6F\x75\x6E\x64","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E","\x64\x65\x66\x69\x6E\x65"];Ext[_0xb021[80]](_0xb021[0],function(){var _0x3e32x1=null,_0x3e32x2=7;return {extend:_0xb021[1],requires:[_0xb021[2]],licenseUrl:_0xb021[3],messages:{licenseLoadFailed:[_0xb021[4],_0xb021[5]],licenseExpired:[_0xb021[6],[_0xb021[9],_0xb021[10]][_0xb021[8]](_0xb021[7])],licenseAlmostExpired:[_0xb021[11],[_0xb021[12],_0xb021[10]][_0xb021[8]](_0xb021[7])],licenseInvalidVersion:[_0xb021[13],[_0xb021[14],_0xb021[10]][_0xb021[8]](_0xb021[7])],licenseInvalid:[_0xb021[13],[_0xb021[15],_0xb021[16]][_0xb021[8]](_0xb021[7])]},constructor:function(_0x3e32x3){this[_0xb021[17]](arguments);Object[_0xb021[18]](this);Object[_0xb021[18]](Object[_0xb021[19]](this))},init:function(_0x3e32x4){var _0x3e32x5=this;Ext[_0xb021[20]](_0x3e32x4,{License:function(){return _0x3e32x5}})},getMessage:function(_0x3e32x6,_0x3e32x7){var _0x3e32x8=this[_0xb021[21]][_0x3e32x6];if(Ext[_0xb021[22]](_0x3e32x8)){return ( new Ext.Template(this[_0xb021[21]][_0x3e32x6]))[_0xb021[20]](_0x3e32x7)}else {if(Ext[_0xb021[23]](_0x3e32x8)){var _0x3e32x9=[];Ext[_0xb021[24]](_0x3e32x8,function(_0x3e32xa,_0x3e32xb){_0x3e32x9[_0x3e32xb]= ( new Ext.Template(_0x3e32xa))[_0xb021[20]](_0x3e32x7)});return _0x3e32x9}else {if(Ext[_0xb021[25]](_0x3e32x8)){var _0x3e32x9={};Ext[_0xb021[26]][_0xb021[24]](_0x3e32x8,function(_0x3e32xb,_0x3e32xa){_0x3e32x9[_0x3e32xb]= ( new Ext.Template(_0x3e32xa))[_0xb021[20]](_0x3e32x7)});return _0x3e32x9}}}},loadLicense:function(_0x3e32xc,_0x3e32xd){_0x3e32xc= _0x3e32xc|| Ext[_0xb021[27]];_0x3e32xd= _0x3e32xd|| this;var _0x3e32x5=this,_0x3e32xe=this[_0xb021[28]]();this[_0xb021[55]](function(_0x3e32xf){if(!_0x3e32xf[_0xb021[29]]()){var _0x3e32x9=_0x3e32x5[_0xb021[31]](_0xb021[30],_0x3e32xe);Ext[_0xb021[33]][_0xb021[32]]({title:_0x3e32x9[0],msg:_0x3e32x9[1],closable:false});_0x3e32xf[_0xb021[34]]();return};if(!( new Ext.Version(_0x3e32xe[_0xb021[39]](_0xb021[38])))[_0xb021[37]](_0x3e32xf[_0xb021[36]](_0xb021[35]))){var _0x3e32x9=_0x3e32x5[_0xb021[31]](_0xb021[40],_0x3e32xe);Ext[_0xb021[33]][_0xb021[32]]({title:_0x3e32x9[0],msg:_0x3e32x9[1],closable:false});_0x3e32xf[_0xb021[34]]();return};Ext[_0xb021[46]][_0xb021[45]][_0xb021[44]](_0x3e32xf[_0xb021[36]](_0xb021[41])|| _0xb021[42],_0xb021[43]);if(_0x3e32xf[_0xb021[47]]()){if(_0x3e32xf[_0xb021[48]]()){var _0x3e32x9=_0x3e32x5[_0xb021[31]](_0xb021[49],_0x3e32xe);Ext[_0xb021[33]][_0xb021[32]]({title:_0x3e32x9[0],msg:_0x3e32x9[1],closable:false});_0x3e32xf[_0xb021[34]]();return}else {if(_0x3e32xf[_0xb021[50]]()< _0x3e32x2){var _0x3e32x9=_0x3e32x5[_0xb021[31]](_0xb021[51],Ext[_0xb021[20]]({remainDays:_0x3e32xf[_0xb021[50]]()},_0x3e32xe));Ext[_0xb021[33]][_0xb021[32]]({title:_0x3e32x9[0],msg:_0x3e32x9[1],buttons:Ext[_0xb021[53]][_0xb021[52]],closable:true,callback:function(){Ext[_0xb021[54]](_0x3e32xc,_0x3e32xd,[_0x3e32x5])}});_0x3e32xf[_0xb021[34]]()}else {Ext[_0xb021[54]](_0x3e32xc,_0x3e32xd,[_0x3e32x5])}};return true};Ext[_0xb021[54]](_0x3e32xc,_0x3e32xd,[_0x3e32x5]);return true})},getLicense:function(_0x3e32xc,_0x3e32xd){if(_0x3e32x1){Ext[_0xb021[54]](_0x3e32xc|| Ext[_0xb021[27]],_0x3e32xd|| this,[_0x3e32x1]);return _0x3e32x1};var _0x3e32x5=this,_0x3e32x10=this[_0xb021[56]];Ext[_0xb021[62]][_0xb021[61]]({url:_0x3e32x10,success:function(_0x3e32x11,_0x3e32x12){_0x3e32x1= _0x3e32x5[_0xb021[58]](_0x3e32x11[_0xb021[57]],true);Ext[_0xb021[54]](_0x3e32xc|| Ext[_0xb021[27]],_0x3e32xd|| _0x3e32x5,[_0x3e32x1])},failure:function(){var _0x3e32x9=_0x3e32x5[_0xb021[31]](_0xb021[59]);Ext[_0xb021[53]][_0xb021[60]](_0x3e32x9[0],_0x3e32x9[1])}})},createLicense:function(_0x3e32x13){return Object[_0xb021[18]]( new (function(_0x3e32x7){var _0x3e32x14=_0xb021[63],_0x3e32x15=_0xb021[64],_0x3e32xf=( typeof _0x3e32x7== _0xb021[65]?Ext[_0xb021[66]](_0x3e32x7,true):_0x3e32x7)|| {};var _0x3e32x16=function(){var _0x3e32x17=Ext[_0xb021[67]](_0x3e32xf)|| {},_0x3e32x18=(_0x3e32xf|| {})[_0xb021[68]];if(_0x3e32x17[_0xb021[69]](_0xb021[68])){delete _0x3e32x17[_0xb021[68]]};var _0x3e32x19=CryptoJS.SHA512(Ext[_0xb021[70]](_0x3e32x17,true)+ _0x3e32x14);return (_0x3e32x19.toString()== _0x3e32x18&&  !Ext[_0xb021[71]](_0x3e32x19))};this[_0xb021[36]]= function(_0x3e32x1a){return _0x3e32xf[_0x3e32x1a]|| null};this[_0xb021[72]]= function(_0x3e32x1b){var _0x3e32x17=Ext[_0xb021[67]](_0x3e32xf)|| {};if(_0x3e32x17[_0xb021[69]](_0xb021[68])&&  !_0x3e32x1b){delete _0x3e32x17[_0xb021[68]]};return _0x3e32x17};this[_0xb021[29]]= function(){return _0x3e32x16()};this[_0xb021[47]]= function(){return !!this[_0xb021[36]](_0xb021[73])};this[_0xb021[48]]= function(){return 0> this[_0xb021[74]]()};this[_0xb021[75]]= function(){var _0x3e32x1c= new Date(this[_0xb021[36]](_0xb021[73]));return _0x3e32x1c|| Date[_0xb021[76]]()},this[_0xb021[74]]= function(){return Number(this[_0xb021[75]]()[_0xb021[77]]())- Number(Date[_0xb021[76]]())};this[_0xb021[50]]= function(){return Math[_0xb021[78]](this[_0xb021[74]]()/ (1000* 60* 60* 24))};this[_0xb021[34]]= function(){Ext[_0xb021[62]][_0xb021[61]]({url:_0x3e32x15,headers:{"\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65":_0xb021[79]},jsonData:_0x3e32xf})}})(_0x3e32x13))}}});