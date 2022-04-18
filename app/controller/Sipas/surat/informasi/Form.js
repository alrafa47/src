Ext.define('SIPAS.controller.Sipas.surat.informasi.Form', { /*not used*/
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.surat.informasi.Form'
    ],
    api: {
        profile_image: 'server.php/sipas/staf/get_image/foto?id={id}&dc={dc}'
    },

    refs : [
        { ref: 'mainview',          selector: 'sipas_surat_informasi_form'},
        { ref: 'compPnyetjuImage',   selector: 'sipas_surat_informasi_form sipas_surat_informasi_penyetujuan_pane #pengirimImg2'},
        { ref: 'compPembuatImage',  selector: 'sipas_surat_informasi_form sipas_surat_informasi_pembuatan_pane #pengirimImg1'}
    ],

    modelSurat: 'Sipas.Surat',

    launch: function(config){
        var $this = this,
            ref = config.reference,// reference should be an instance of Sipas.Surat
            view = $this.createView(config);
        
        $this.load(ref, view);
        return view;
    },

    load: function(ref, view){
        view = view || this.getMainview();
        
        var $this = this,
            $helper = $this.getApplication().Helper(),
            form = view,
            model = $this.getModel($this.modelSurat),
            loadBySurat = function(surat){
                    surat.set({
                        'surat_properti_buat_tgl': surat.data.surat_properti_buat_tgl,
                        'surat_properti_pembuat_nama': surat.data.surat_properti_pembuat_nama,
                        'surat_properti_pembuat_unit_nama': surat.data.surat_properti_pembuat_unit_nama,

                        'surat_distribusi_tgl': surat.data.surat_distribusi_tgl,
                        'distributor_nama': status.data.distributor_nama,
                        'distributor_unit_nama': status.data.distributor_unit_nama
                    });
            };

        if(! (ref instanceof model)){
            form.setLoading(true);
            model.load(ref, {
                success: function(record){
                    form.setLoading(false);
                    form.loadRecord(record);
                    $this.doProfileRead(record, form);
                    $this.doProfileReadDis(record, form);
                }
            });
        }else{
            loadBySurat(ref);
        }
    },

    doProfileRead: function(record, mainview){
        var $this = this,
            view = mainview || $this.getMainview(),
            cmp = $this.getCompPembuatImage({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%; width:48px; height:48px;'/>");
        if(!record) return;
        cmp.update(t.apply({
            url: 'server.php/sipas/staf/get_image/foto?id='+record.get('pembuat_id')+'&dc='+Date.now()
            // url: Ext.String.urlAppend($this.getApi('profile_image', {
            //     id: record.get('pembuat_id')
            // }), '_dc='+Date.now())
        }));
    },

    doProfileReadDis: function(record, mainview){
        var $this = this,
            view = mainview || $this.getMainview(),
            cmp = $this.getCompDistriImage({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%; width:48px; height:48px;'/>");
        if(!record) return;
        cmp.update(t.apply({
            url: 'server.php/sipas/staf/get_image/foto?id='+record.get('surat_status_distribusi_staf')+'&dc='+Date.now()
            // url: Ext.String.urlAppend($this.getApi('profile_image', {
            //     id: record.get('pembuat_id')
            // }), '_dc='+Date.now())
        }));
    }

});
