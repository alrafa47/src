Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.Prop', {
	extend: 'SIPAS.controller.Sipas.surat.agenda.Prop',

	views: [
		'Sipas.surat.agenda.Prop'
	],

	stores: [
        'Sipas.internal.masuk.agenda.Lookup',
        'Sipas.surat.unit.source.Combo',
		'Sipas.unit.Combo'
	],

    api: {
        delete : 'server.php/sipas/surat_imasuk/destroy',
        musnah : 'server.php/sipas/surat/musnahSurat',
        arsip  : 'server.php/sipas/surat/arsipSurat'
    },

    modelDisposisi: 'Sipas.Disposisi',
    controllerDistribusi: 'Sipas.internal.masuk.agenda.distribusi.Prop',
    //controllerDistribusiJabatan: 'Sipas.internal.masuk.agenda.distribusi.jabatan.Prop',
    controllerTransfer : 'Sipas.internal.masuk.agenda.transfer.Popup',
    controllerRating : 'Sipas.internal.masuk.agenda.rating.Popup',
    
    _click: 0,

    init: function(application){
        this.control({
            "sipas_surat_agenda_prop sipas_com_button_save[propType=imasuk]": {
                click: this.onButtonSave_Click
            },
            "sipas_surat_agenda_prop #buttonSaveSend[propType=imasuk]": {
                click: this.onButtonSaveSend_Click
            },
            "sipas_surat_agenda_prop #perubahan[propType=imasuk]": {
                click: this.onButtonEdit_Click
            },
            "sipas_surat_agenda_prop #buttonDelete[propType=imasuk]": {
                click: this.onButtonDelete_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_disposisi[propType=imasuk]": {
                click: this.onButtonDistribusi_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_process[propType=imasuk]": {
                click: this.onButtonTransfer_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=imasuk]":{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=imasuk]':{
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_surat_agenda_prop #buttonRating':{
                click: this.onButtonRating_click
            },
            'sipas_surat_agenda_prop #buttonLihatRating':{
                click: this.onButtonLihatRating_click
            },
            "sipas_surat_agenda_prop #buttonDeletePermanen[propType=imasuk]": {
                click: this.onButtonDeletePermanen_Click
            },
            'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=imasuk]':{
                loadassociate: this.onPenerima_LoadAssociate
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=imasuk]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=imasuk]": {
                click: this.onButtonArsip_Click
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts, record){
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            useretensi  = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenerima = $this.getStore($this.storePenerima);
            params = {
                'user[]' : [],
                't[]': [], //tembusan
                // 'b[]': [], //berkas
                'temp' : 1,
                'log' : 2
            };

        storePenerima.each(function(r){
            params['user[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }   

        if(params['user[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }
        if(! record) return;
        $helper.saveRecord({
            form: form,
            record: record,
            params: params,
            wait: true,
            message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Surat',
            callback: function(success, record, eOpts, response){
                if(success)view.close();
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonSaveSend_Click: function(button, e, eOpts, record){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            storePenerima = $this.getStore($this.storePenerima),
            stafId = $session.getProfileId(),
            $feature    = $this.getController('Sipas.sistem.featureable.Feature'),
            selesai   = $feature.getFeatureAccess('surat_selesai'),
            useretensi  = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            cmpBerkasExist = $this.getCmpBerkasExist({root:view}),
            params = {
                'user[]' : [],
                't[]': [],
                // 'b[]': [],
                'log' : 3
            };

        storePenerima.each(function(r){
            params['user[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        } 

        /*validate receiver on add mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && !params['user[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }else if(Ext.Array.contains(['add','edit'], view.mode) && params['user[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }

        $this._click++;
        if($this._click <= 1){
            $helper.showConfirm({
                confirmTitle: 'Distribusi Surat',
                confirmText : 'Apakah anda yakin ?',
                callback: function(button){
                    if(button == 'yes'){
                        if(selesai){
                            record.set({
                                'surat_distribusi_staf' : stafId,
                                'surat_distribusi_tgl' : new Date()
                            });
                        }else{
                            record.set({
                                'surat_distribusi_staf' : stafId,
                                'surat_distribusi_tgl' : new Date(),
                                'surat_selesai_staf' : stafId,
                                'surat_selesai_tgl' : new Date()
                            });
                        }

                        if(! record) return;
                        if(!form.getForm().isValid()){
                            $this._click = 0;
                            btnKirim.setDisabled(false);
                        }
                        $helper.saveRecord({
                            form: form,
                            record: record,
                            params: params,
                            message: false,
                            wait: true,
                            callback: function(success, record, eOpts, response){    
                                $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                $this._click = 0;

                                btnKirim.setDisabled(false);
                                if(success)view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        });
                    }else if (button == 'no'){
                        $this._click = 0;
                        btnKirim.setDisabled(false);
                    }else{
                        /*when message box closed*/
                        $this._click = 0;
                        btnKirim.setDisabled(false);
                    }
                }
            });
            btnKirim.setDisabled(true);
        }
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'imasuk',
            unit: view.unit,
            mode:'edit',
            model: record.self.modelType().MODEL_IMASUK,
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'imasuk',
            unit: view.unit,
            mode:'destroy',
            model: record.self.modelType().MODEL_IMASUK,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonTransfer_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerTransfer = $this.getController($this.controllerTransfer);

        controllerTransfer.launch({
            propType: 'imasuk',
            unit: view.unit,
            mode:'transfer',
            model: record.self.modelType().MODEL_IMASUK,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
                /*view.close();*/ /*important do not remove*/
            }
        });
    },

    onButtonRating_click: function(button, e, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            record  = form && form.updateRecord().getRecord(),
            controllerRating = $this.getController($this.controllerRating);

        controllerRating.launch({
            propType: 'imasuk',
            unit: view.unit,
            mode: 'rating',
            model: record.self.modelType().MODEL_IMASUK,
            record: record,
            callback: function(success, scope, response){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                // form.reset();
                scope.getSurat(function(surat){
                    form.loadRecord(surat);
                });
                // view.close();
            }
        });
    },

    onButtonDeletePermanen_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'permanen' : 1,
                'id': record.getId(),
                'properti': record.get('surat_properti'),
                'korespon': record.get('surat_korespondensi_surat'),
                'kores': record.get('surat_korespondensi')
            };

        $helper.showConfirm({
            confirmTitle: 'Hapus Surat',
            confirmText : 'Apakah anda yakin hapus surat ini secara permanen ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('delete'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal hapus surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil hapus surat'});
                                view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        })
    },

    onButtonLihatRating_click: function(button, e, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            view    = $this.getMainview({from:button}),
            form    = $this.getForm({root:view}),
            record  = form && form.updateRecord().getRecord(),
            controllerRating = $this.getController($this.controllerRating);

        controllerRating.launch({
            propType: 'imasuk',
            unit: view.unit,
            mode: 'view',
            model: record.self.modelType().MODEL_IMASUK,
            record: record,
            callback: function(success, scope, response){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                // form.reset();
                scope.getSurat(function(surat){
                    form.loadRecord(surat);
                });
                // view.close();
            }
        });
    },

    onButtonMusnah_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

            $helper.showConfirm({
            confirmTitle: 'Musnahkan Surat',
            confirmText : 'Apakah anda yakin ingin memusnahkan surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('musnah'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal musnah surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil musnah surat'});
                                view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonArsip_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

            $helper.showConfirm({
            confirmTitle: 'Arsipkan Surat',
            confirmText : 'Apakah anda yakin ingin mengarsipkan surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('arsip'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal mengarsipkan surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil mengarsipkan surat'});
                                view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    }
});