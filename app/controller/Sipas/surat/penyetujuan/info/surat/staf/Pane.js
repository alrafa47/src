Ext.define('SIPAS.controller.Sipas.surat.penyetujuan.info.surat.staf.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        //'Sipas.surat.penyetujuan.info.surat.staf.Pane'
    ],

    controllerProperty: 'Sipas.surat.penyetujuan.info.surat.staf.Pane',
    modelSuratStaf: 'Sipas.disposisi.Masuk',

    launch: function(config) {        
        config = Ext.apply({
            record: this.getModel(this.modelSuratStaf).create({})
        }, config);

        var $this = this,
            view = this.createView(config),
            controllerProperty = $this.getController($this.controllerProperty);

        view && view.on('afterrender', function(){
            view.down($this.refToolbarInfo).add(controllerProperty.launch());
        });
        return view;
    },
    
    updateApprovalDetail: function(record) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            paneApproval = $this.getCompApproval();

        record = record || $this.getModel($this.modelSuratStaf).create({});

        switch( record.get('disposisi_status') ){
            case record.self.statusPenyetujuan().PENYETUJUAN_INIT:
                approval="Belum Disetujui"; break;
            case record.self.statusPenyetujuan().PENYETUJUAN_PROCESS:
                approval="Diajukan"; break;
            case record.self.statusPenyetujuan().PENYETUJUAN_DECLINE: 
                approval="Revisi"; break;
            case record.self.statusPenyetujuan().PENYETUJUAN_APPROVE:
                approval="Disetujui"; break;
        }

        $helper.applyValue({
            parent: paneApproval,
            items:{
                '#textfieldStatus': approval,
                '#textfieldTanggal': record.get('surat_penyetujuan_tanggal'),
                '#textfieldNip': record.get('pembuat_nip'),
                '#textfieldNama': record.get('pembuat_nama')
            }
        });
    }
});