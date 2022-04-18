Ext.define('SIPAS.controller.Sipas.beranda.surat.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    messages: {
    	'invalid': 'Referensi tidak valid'
	},

    defaultModel: 'Sipas.beranda.Notification',
    controllerSuratMasuk: 'Sipas.masuk.Prop',
    controllerSuratDraft: 'Sipas.konsep.staf.Prop',
    controllerSuratEdaran: 'Sipas.surat.edaran.Prop',
    controllerSuratStaf: 'Sipas.disposisi.session.Prop',
    controllerMemo: 'Sipas.memo.Prop',

    modelDisposisi: 'Sipas.disposisi.Masuk',
    modelSuratMasuk: 'Sipas.masuk.Penerima',
    modelSuratDraft: 'Sipas.koreksi.Masuk',
    modelSuratEdaran: 'Sipas.surat.edaran.Penerima',
    modelMemo: 'Sipas.Memo',

    init: function(){},

    launch: function(reference, onlaunch, scope){
    	var $this = this,
            controllerSuratMasuk = $this.getController($this.controllerSuratMasuk),
            controllerSuratStaf = $this.getController($this.controllerSuratStaf),
            controllerSuratEdaran = $this.getController($this.controllerSuratEdaran),
            // controllerSuratTelaah = $this.getController($this.controllerSuratTelaah),
            controllerSuratDraft = $this.getController($this.controllerSuratDraft),
            controllerMemo = $this.getController($this.controllerMemo),
            refRecord = reference.record;

    	onlaunch = onlaunch || Ext.emptyFn;
    	scope = scope || this;

    	if(refRecord.isMasuk()){
            refRecord.getMasuk(function(record){
                if(!record) return;
                
                if(record.get('disposisi_penerima_status') == 0){ record.reading();}
                controllerSuratMasuk.launch({
                    mode: 'view',
                    record: record,
                    callback: function(success, record){
                        
                    }
                });
                Ext.callback(onlaunch, scope, [!!record, record, $this]);
            });       
        }else if(refRecord.isDisposisi()){
            refRecord.getDisposisi(function(record){
                if(!record) return;
                
                if(record.get('disposisi_penerima_status') == 0){ record.reading();}
                controllerSuratStaf.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        
                    }
                });
                Ext.callback(onlaunch, scope, [!!record, record, $this]);
            });           
        }else if(refRecord.isKonsep()){
            refRecord.getDraft(function(record){
                if(!record) return;
                
                if(record.getStatus() == record.statics.readStatus.UNREAD){ record.reading();}
                controllerSuratDraft.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        
                    }
                });
                Ext.callback(onlaunch, scope, [!!record, record, $this]);
            });
        }else if(refRecord.isEdaran()){
            refRecord.getEdaran(function(record){
                if(!record) return;
                
                record.reading();
                controllerSuratEdaran.launch({
                    mode: 'view',
                    record: record,
                    callback: function(success, record){
                        
                    }
                });
                Ext.callback(onlaunch, scope, [!!record, record, $this]);
            });
        }else if(refRecord.isMemo()){
            refRecord.getMemo(function(record){
                if(!record) return;
                
                if(record.get('memo_status') == 0){ record.reading();}
                controllerMemo.launch({
                    mode: 'view',
                    record: record,
                    callback: function(success, record){
                        
                    }
                });
                Ext.callback(onlaunch, scope, [!!record, record, $this]);
            });
        }else
        {
            Ext.callback(onlaunch, scope, [false, undefined, $this]);
        }
    }
})