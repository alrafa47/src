Ext.define('SIPAS.controller.Sipas.surat.penyetujuan.info.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        'Sipas.surat.penyetujuan.info.Pane'
    ],


    controllerProperty: 'Sipas.surat.penyetujuan.info.Pane',

    modelSurat: 'Sipas.Surat',

    launch: function(config) {
        config = Ext.apply({
            record: this.getModel(this.modelSurat).create({})
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

        record = record || $this.getModel($this.modelSurat).create({});

        if(!record) {
            $helper.applyValue({
                parent: paneApproval,
                items:{
                    '#textfieldStatus': null,
                    '#textfieldTanggal': null,
                    '#textfieldNip': null,
                    '#textfieldNama': null
                }
            });
            return;
        }
        switch( record.get('surat_penyetujuan_status') ){
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