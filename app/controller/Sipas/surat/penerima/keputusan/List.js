Ext.define('SIPAS.controller.Sipas.surat.penerima.keputusan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.surat.penerima.keputusan.List',
        'Sipas.staf.Lookup',
        'Sipas.golongan.Combo',
        'Sipas.jabatan.Combo'
    ],

    models: [
        'Sipas.surat.Penerimask'
    ],

    views: [
        'Sipas.surat.penerima.keputusan.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_surat_penerima_keputusan_list'},
        { ref: 'namaPegawai', selector: 'sipas_surat_penerima_keputusan_list #namaPegawai'},
        { ref: 'nip', selector: 'sipas_surat_penerima_keputusan_list #nip'},
        { ref: 'jabatanLama', selector: 'sipas_surat_penerima_keputusan_list #jabatanLama'},
        { ref: 'jabatanBaru', selector: 'sipas_surat_penerima_keputusan_list #jabatanBaru'},
        { ref: 'golLama', selector: 'sipas_surat_penerima_keputusan_list #golLama'},
        { ref: 'golBaru', selector: 'sipas_surat_penerima_keputusan_list #golBaru'},
        { ref: 'sgLama', selector: 'sipas_surat_penerima_keputusan_list #sgLama'},
        { ref: 'sgBaru', selector: 'sipas_surat_penerima_keputusan_list #sgBaru'},
        { ref: 'gpLama', selector: 'sipas_surat_penerima_keputusan_list #gpLama'},
        { ref: 'gpBaru', selector: 'sipas_surat_penerima_keputusan_list #gpBaru'},
        { ref: 'jenjangLama', selector: 'sipas_surat_penerima_keputusan_list #jenjangLama'},
        { ref: 'jenjangBaru', selector: 'sipas_surat_penerima_keputusan_list #jenjangBaru'},
        { ref: 'keterangan', selector: 'sipas_surat_penerima_keputusan_list #keterangan'},
        { ref: 'colDelete', selector: 'sipas_surat_penerima_keputusan_list #columnDelete'}
    ],

    messages: {
        'receiver_exist': ['Info', 'Staf dengan Nama:{nama} sudah masuk dalam daftar'],
        'anggota_limit': ['Info', 'Jumlah staf yang dipilih sudah melebihi batas maksimal']
    },

    api: {
        'staf_aktif' : "server.php/sipas/staf/read"
    },

    controllerStafLookup: 'Sipas.staf.Lookup',

    init: function(application) {
        this.control({
            "sipas_surat_penerima_keputusan_list": {
                show: this.onMainview_Show,
                beforeedit: this.onList_BeforeEdit,
                validateedit: this.onList_ValidateEdit,
                rundelete: this.onMainview_RunDelete,
                appendrecord: this.onMainview_AppendRecord
            },
            'sipas_surat_penerima_keputusan_list sipas_com_button_download': {
                click: this.onMainview_buttonExport_Click
            },
            'sipas_surat_penerima_keputusan_list sipas_com_button_upload': {
                click: this.onMainview_buttonImport_Click
            },
            'sipas_surat_penerima_keputusan_list #fieldSearch': {
                focus: this.onFieldSearch_Focus,
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_surat_penerima_keputusan_list #buttonManual': {
                click: this.onMainview_buttonManual_Click
            },
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().clearFilter(true);
                $this.refresh(view);
            });
        }
        return view;
    },

    onMainview_Show: function(mainview){
        var $this = this,
            popupView = mainview.up('sipas_surat_penerima_keputusan_popup'),
            jabatanLama = $this.getJabatanLama({root:mainview}),
            jabatanBaru = $this.getJabatanBaru({root:mainview}),
            golLama = $this.getGolLama({root:mainview}),
            sgLama = $this.getSgLama({root:mainview}),
            gpLama = $this.getGpLama({root:mainview}),
            golBaru = $this.getGolBaru({root:mainview}),
            sgBaru = $this.getSgBaru({root:mainview}),
            gpBaru = $this.getGpBaru({root:mainview}),
            jenjangLama = $this.getJenjangLama({root:mainview}),
            jenjangBaru = $this.getJenjangBaru({root:mainview}),
            cmbGolLama = golLama.getEditor(),
            cmbSgLama = sgLama.getEditor(),
            cmbGolBaru = golBaru.getEditor(),
            cmbSgBaru = sgBaru.getEditor(),
            dl = $this.getColDelete();
        
        if(popupView.sub_tipe == 0) { // jabatan
            jabatanLama.setText('Jabatan');
            jenjangLama.setText('Jenjang Jabatan');
            jabatanBaru.setVisible(false);
            jenjangBaru.setVisible(false);
            golLama.setVisible(false);
            sgLama.setVisible(false);
            sgBaru.setVisible(false);
            gpLama.setVisible(false);
            gpBaru.setVisible(false);
        } else if(popupView.sub_tipe == 1 || popupView.sub_tipe == 2) { // golongan & sgt
            jabatanLama.setText('Jabatan');
            jenjangLama.setText('Jenjang Jabatan');
            jabatanBaru.setVisible(false);
            jenjangBaru.setVisible(false);
        } else if(popupView.sub_tipe == 3) { // demosi
            // show all
        } else if(popupView.sub_tipe == 4) { // pengangkatan jabatan
            golLama.setVisible(false);
            sgLama.setVisible(false);
            sgBaru.setVisible(false);
            gpLama.setVisible(false);
            gpBaru.setVisible(false);
        } else if(popupView.sub_tipe == 5) { // penyesuaian jenjang jabatan
            jabatanLama.setText('Jabatan');
            jabatanBaru.setVisible(false);
            golLama.setVisible(false);
            sgLama.setVisible(false);
            sgBaru.setVisible(false);
            gpLama.setVisible(false);
            gpBaru.setVisible(false);
        }

        // if(popupView.mode === 'view' || popupView.mode === 'ubah' || popupView.mode == 'bank' || popupView.mode == 'lihat') {
        //     dl.metaData.style = 'display: none';
        // }

        cmbGolLama.on('change', function(cmb, newValue, oldValue, eOpts) {
            if(popupView.sub_tipe == 1) {
                if(newValue) {
                    var recGolLama = cmbGolLama.getStore().findRecord('golongan_level', newValue);

                    if(recGolLama) {
                        cmbGolLama.setValue(recGolLama);
                    }
                    cmbGolBaru.setValue(parseInt(newValue) + 1);
                } else {
                    cmbGolBaru.setValue(null);
                }
            } else if (popupView.sub_tipe == 2) {
                cmbGolBaru.setValue(newValue);
            }
        });
        cmbSgLama.on('change', function(cmb, newValue, oldValue, eOpts) {
            if(popupView.sub_tipe == 1) {
                cmbSgBaru.setRawValue(newValue);
            } else if (popupView.sub_tipe == 2) {
                cmbSgBaru.setRawValue(parseInt(newValue) + 1);
            }
        });
    },

    onMainview_buttonExport_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            store = mainview.getStore(),
            popupView = mainview.up('sipas_surat_penerima_keputusan_popup'),
            recSurat = popupView.recSurat,
            suratId = popupView.idsurat,
            jenis_sub = popupView.sub_tipe,
            exportApi = 'server.php/sipas/surat_keputusan/get_template_kolektif?id=' + suratId + '&jenis_sub=' + jenis_sub;

        if(store.getModifiedRecords().length || store.getRemovedRecords().length || store.getUpdatedRecords().length){
            mainview.setLoading(true);
            store.sync({
                callback: function(success, response){
                    var record = Ext.decode(response.responseText, true);
                    Ext.callback(popupView.callback, popupView, [success, record, eOpts]);
                    mainview.setLoading(false);
                    location.assign(exportApi);
                },
                success: function(){
                    mainview.setLoading(false);
                }
            });
        } else {
            location.assign(exportApi);
        }
    },

    onMainview_buttonImport_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            controllerUnggah = $this.getController('Sipas.surat.penerima.keputusan.unggah.Prop'),
            store = mainview.getStore(),
            popupView = mainview.up('sipas_surat_penerima_keputusan_popup'),
            recSurat = popupView.recSurat,
            suratId = popupView.idsurat,
            golLama = $this.getGolLama({root:mainview}),
            cmbGolLama = golLama.getEditor(),
            storeGolongan = cmbGolLama.getStore().reload();

        controllerUnggah.launch({
            mode: 'add',
            callback: function(result) {
                if(result.data.surat_id == suratId) {
                    Ext.each(result.data.penerima, function(item, index){
                        // find store record by id surat_penerimask_id
                        var record = store.getById(item.surat_penerimask_id);
                        //set record property with new one from file

                        if(record) {
                            if(popupView.sub_tipe < 3) {
                                record.set({
                                    'jabatan_lama_nama' : item.jabatan_lama_nama,
                                    'jabatan_baru_nama' : item.jabatan_lama_nama,
                                    'surat_penerimask_sglama' : item.surat_penerimask_sglama,
                                    'surat_penerimask_sgbaru' : item.surat_penerimask_sgbaru,
                                    'surat_penerimask_gplama' : item.surat_penerimask_gplama,
                                    'surat_penerimask_gpbaru' : item.surat_penerimask_gpbaru,
                                    'surat_penerimask_tmt' : item.surat_penerimask_tmt ? new Date(item.surat_penerimask_tmt) : null,
                                    'surat_penerimask_jenjang_jabatan_lama' : item.surat_penerimask_jenjang_jabatan_lama,
                                    'surat_penerimask_jenjang_jabatan_baru' : item.surat_penerimask_jenjang_jabatan_lama,
                                    'surat_penerimask_keterangan' : item.surat_penerimask_keterangan,
                                    'surat_penerimask_jabatan_lama' : item.surat_penerimask_jabatan_lama,
                                    'surat_penerimask_jabatan_baru' : item.surat_penerimask_jabatan_lama,
                                });
                            } else if(popupView.sub_tipe == 3 || popupView.sub_tipe == 4) {
                                record.set({
                                    'jabatan_lama_nama' : item.jabatan_lama_nama,
                                    'jabatan_baru_nama' : item.jabatan_baru_nama,
                                    'surat_penerimask_sglama' : item.surat_penerimask_sglama,
                                    'surat_penerimask_sgbaru' : item.surat_penerimask_sgbaru,
                                    'surat_penerimask_gplama' : item.surat_penerimask_gplama,
                                    'surat_penerimask_gpbaru' : item.surat_penerimask_gpbaru,
                                    'surat_penerimask_tmt' : item.surat_penerimask_tmt ? new Date(item.surat_penerimask_tmt) : null,
                                    'surat_penerimask_jenjang_jabatan_lama' : item.surat_penerimask_jenjang_jabatan_lama,
                                    'surat_penerimask_jenjang_jabatan_baru' : item.surat_penerimask_jenjang_jabatan_baru,
                                    'surat_penerimask_keterangan' : item.surat_penerimask_keterangan,
                                    'surat_penerimask_jabatan_lama' : item.surat_penerimask_jabatan_lama,
                                    'surat_penerimask_jabatan_baru' : item.surat_penerimask_jabatan_baru,
                                });
                            } else if(popupView.sub_tipe == 5)  {
                                record.set({
                                    'jabatan_lama_nama' : item.jabatan_lama_nama,
                                    'jabatan_baru_nama' : item.jabatan_lama_nama,
                                    'surat_penerimask_tmt' : item.surat_penerimask_tmt ? new Date(item.surat_penerimask_tmt) : null,
                                    'surat_penerimask_jenjang_jabatan_lama' : item.surat_penerimask_jenjang_jabatan_lama,
                                    'surat_penerimask_jenjang_jabatan_baru' : item.surat_penerimask_jenjang_jabatan_baru,
                                    'surat_penerimask_keterangan' : item.surat_penerimask_keterangan,
                                    'surat_penerimask_jabatan_lama' : item.surat_penerimask_jabatan_lama,
                                    'surat_penerimask_jabatan_baru' : item.surat_penerimask_jabatan_lama,
                                });
                            }

                            var dataGolLama = storeGolongan.findRecord('golongan_level', item.surat_penerimask_gollama),
                                dataGolBaru = storeGolongan.findRecord('golongan_level', item.surat_penerimask_golbaru);

                            if(dataGolLama) {
                                record.set({
                                    'surat_penerimask_gollama'  : dataGolLama.get('golongan_id'),
                                    'golongan_lama_level'       : dataGolLama.get('golongan_level'),
                                    'golongan_lama_sgt'         : dataGolLama.get('golongan_sgt'),
                                    'golongan_lama_gaji_pokok'  : dataGolLama.get('golongan_gaji_pokok'),
                                });
                            }

                            if(dataGolBaru) {
                                record.set({
                                    'surat_penerimask_golbaru'  : dataGolBaru.get('golongan_id'),
                                    'golongan_baru_level'       : dataGolBaru.get('golongan_level'),
                                    'golongan_baru_sgt'         : dataGolBaru.get('golongan_sgt'),
                                    'golongan_baru_gaji_pokok'  : dataGolBaru.get('golongan_gaji_pokok'),
                                });
                            }
                        }
                    });
                } else {
                    $helper.showMsg({success:false, message: 'Template yang diimport tidak sama dengan template yang diexport'});
                }
            }
        });
    },

    onList_BeforeEdit: function(editor, context, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:editor}),
            popupView = mainview.up('sipas_surat_penerima_keputusan_popup'),
            golLama = $this.getGolLama({root:mainview}),
            cmbGolLama = golLama.getEditor(),
            storeGolLama = cmbGolLama.getStore(),
            golBaru = $this.getGolBaru({root:mainview}),
            cmbGolBaru = golBaru.getEditor(),
            sgBaru = $this.getSgBaru({root:mainview}),
            cmbSgBaru = sgBaru.getEditor(),
            gpLama = $this.getGpLama({root:mainview}),
            cmbGpLama = gpLama.getEditor(),
            gpBaru = $this.getGpBaru({root:mainview}),
            cmbGpBaru = gpBaru.getEditor();

        if(popupView.mode === 'view' || popupView.mode === 'ubah' || popupView.mode === 'bank' || popupView.mode == 'lihat') {
            return false;
        }

        cmbGpLama.setReadOnly(true);
        cmbGpBaru.setReadOnly(true);

        if(popupView.sub_tipe == 1 || popupView.sub_tipe == 2) {
            cmbGolBaru.setReadOnly(true);
            cmbSgBaru.setReadOnly(true);
        } else {
            cmbGolBaru.setReadOnly(false);
            cmbSgBaru.setReadOnly(false);
        }

        if(!context.record.get('surat_penerimask_gollama')) {
            cmbGolLama.setValue(null);
        }

        if(!context.record.get('surat_penerimask_golbaru')) {
            cmbGolBaru.setValue(null);
        }

        cmbGolLama.setLoading(true);
        storeGolLama && storeGolLama.load(function(){
            cmbGolLama.setLoading(false);
        });
    },

    onList_ValidateEdit: function(editor, e){
        var $this = this,
            mainview = $this.getMainview({from:editor}),
            popupView = mainview.up('sipas_surat_penerima_keputusan_popup'),
            recSurat = popupView.recSurat,
            record = editor.context.record,
            jabatanLama = $this.getJabatanLama({root:mainview}),
            jabatanBaru = $this.getJabatanBaru({root:mainview}),
            jenjangLama = $this.getJenjangLama({root:mainview}),
            jenjangBaru = $this.getJenjangBaru({root:mainview}),
            cmbJabatanLama = jabatanLama.getEditor(),
            cmbJabatanBaru = jabatanBaru.getEditor(),
            golLama = $this.getGolLama({root:mainview}),
            cmbGolLama = golLama.getEditor(),
            sgLama = $this.getSgLama({root:mainview}),
            cmbSgLama = sgLama.getEditor(),
            golBaru = $this.getGolBaru({root:mainview}),
            cmbGolBaru = golBaru.getEditor(),
            sgBaru = $this.getSgBaru({root:mainview}),
            cmbSgBaru = sgBaru.getEditor(),
            gpLama = $this.getGpLama({root:mainview}),
            cmbGpLama = gpLama.getEditor(),
            gpBaru = $this.getGpBaru({root:mainview}),
            cmbGpBaru = gpBaru.getEditor(),
            cmbJenjangLama = jenjangLama.getEditor(),
            cmbJenjangBaru = jenjangBaru.getEditor();

        if(cmbJabatanLama.valueModels.length > 0) {
            if(popupView.sub_tipe == 3 || popupView.sub_tipe == 4) {
                record.set({
                    'surat_penerimask_jabatan_lama' : cmbJabatanLama.valueModels[0].data.jabatan_id,
                    'jabatan_lama_nama' : cmbJabatanLama.valueModels[0].data.jabatan_nama,
                });
            } else {
                record.set({
                    'surat_penerimask_jabatan_lama' : cmbJabatanLama.valueModels[0].data.jabatan_id,
                    'jabatan_lama_nama' : cmbJabatanLama.valueModels[0].data.jabatan_nama,
                    'surat_penerimask_jabatan_baru' : cmbJabatanLama.valueModels[0].data.jabatan_id,
                    'jabatan_baru_nama' : cmbJabatanLama.valueModels[0].data.jabatan_nama,
                });
            }
        }

        if(cmbJenjangLama.getRawValue() && popupView.sub_tipe < 3) {
            cmbJenjangBaru.setValue(cmbJenjangLama.getValue());
        }

        if(cmbJabatanBaru.valueModels.length > 0 && (popupView.sub_tipe == 3 || popupView.sub_tipe == 4)) {
            record.set({
                'surat_penerimask_jabatan_baru' : cmbJabatanBaru.valueModels[0].data.jabatan_id,
                'jabatan_baru_nama' : cmbJabatanBaru.valueModels[0].data.jabatan_nama,
            });
        }

        if(cmbGolLama.valueModels.length > 0) {
            record.set({
                'surat_penerimask_gollama'  : cmbGolLama.valueModels[0].data.golongan_id,
                'golongan_lama_level'       : cmbGolLama.valueModels[0].data.golongan_level,
                'golongan_lama_sgt'         : cmbGolLama.valueModels[0].data.golongan_sgt,
                'golongan_lama_gaji_pokok'  : cmbGolLama.valueModels[0].data.golongan_gaji_pokok
            });
        }

        if(cmbSgLama.getValue()) {
            record.set({
                'surat_penerimask_sglama' : cmbSgLama.getValue()
            });
        }

        if(cmbSgBaru.getValue()) {
            record.set({
                'surat_penerimask_sgbaru' : cmbSgBaru.getValue()
            });
        }

        if(popupView.sub_tipe == 1) {
            var levelGolBaru = parseInt(record.get('golongan_lama_level')) + 1,
                recGolBaru = cmbGolLama.getStore().findRecord('golongan_level', levelGolBaru);

            if(recGolBaru) {
                record.set({
                    'surat_penerimask_golbaru'  : recGolBaru.get('golongan_id'),
                    'golongan_baru_level'       : recGolBaru.get('golongan_level'),
                    'golongan_baru_sgt'         : recGolBaru.get('golongan_sgt'),
                    'golongan_baru_gaji_pokok'  : recGolBaru.get('golongan_gaji_pokok'),
                });
                // cmbGolBaru.setRawValue(recGolBaru.get('golongan_level'));
            }

            // if(record.get('surat_penerimask_sglama')) {
            //     record.set({
            //         'surat_penerimask_sgbaru' : record.get('surat_penerimask_sglama')
            //     });
            //     cmbSgBaru.setRawValue(record.get('surat_penerimask_sglama'));
            // }
        } else if(popupView.sub_tipe == 2) {
            if(record.get('surat_penerimask_gollama')) {
                record.set({
                    'surat_penerimask_golbaru'  : record.get('surat_penerimask_gollama'),
                    'golongan_baru_level'       : record.get('golongan_lama_level'),
                    'golongan_baru_sgt'         : record.get('golongan_lama_sgt'),
                    'golongan_baru_gaji_pokok'  : record.get('golongan_lama_gaji_pokok'),
                });
                cmbGolBaru.setRawValue(record.get('golongan_lama_level'));
            }

            // if(record.get('surat_penerimask_sglama')) {
            //     record.set({
            //         'surat_penerimask_sgbaru' : parseInt(record.get('surat_penerimask_sglama')) + 1
            //     });
            //     cmbSgBaru.setRawValue(record.get('surat_penerimask_sgbaru'));
            // }
        } else {
            if(cmbGolBaru.valueModels.length > 0) {
                record.set({
                    'surat_penerimask_golbaru'  : cmbGolBaru.valueModels[0].data.golongan_id,
                    'golongan_baru_level'       : cmbGolBaru.valueModels[0].data.golongan_level,
                    'golongan_baru_sgt'         : cmbGolBaru.valueModels[0].data.golongan_sgt,
                    'golongan_baru_gaji_pokok'  : cmbGolBaru.valueModels[0].data.golongan_gaji_pokok
                });
            }
        }

        if(popupView.sub_tipe > 0 && record.get('surat_penerimask_golbaru') && record.get('surat_penerimask_sgbaru')) {
            var gpLamaVal = parseInt(record.get('golongan_lama_gaji_pokok')),
                sgtLamaVal = parseInt(record.get('surat_penerimask_sglama')),
                sgtLamaNominal = parseInt(record.get('golongan_lama_sgt')),
                gpBaruVal = parseInt(record.get('golongan_baru_gaji_pokok')),
                sgtBaruVal = parseInt(record.get('surat_penerimask_sgbaru')),
                sgtBaruNominal = parseInt(record.get('golongan_baru_sgt'));

            record.set({
                'surat_penerimask_gplama' : gpLamaVal + (sgtLamaVal * sgtLamaNominal),
                'surat_penerimask_gpbaru' : gpBaruVal + (sgtBaruVal * sgtBaruNominal),
            });
            cmbGpLama.setRawValue(record.get('surat_penerimask_gplama'));
            cmbGpBaru.setRawValue(record.get('surat_penerimask_gpbaru'));
        }
    },

    onFieldSearch_Focus: function(cmp, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $profile = $session.getProfile(),
            mainview = $this.getMainview({from:cmp}),
            store = cmp.getStore();

        store.getProxy().url = $this.getApi('staf_aktif');
    },

    onMainview_fieldSearch_Select: function(combo, selection, eOpts){
        var $this    = this,
            $helper = $this.getApplication().Helper(),
            view = this.getMainview({from:combo}),
            popupView = view.up('sipas_surat_penerima_keputusan_popup'),
            store = view.getStore();

        if(popupView.recSurat.get('surat_model_sub') == 1 && store.data.length > 0) {
            $helper.showMsg({success:false, message: 'Hanya dapat memilih 1 penerima pada SK Perorangan'});
            return;
        }

        if(selection.length){
            view && view.fireEvent('appendrecord', view, selection[0]);   
            combo.setValue();
        }
    },

    refresh: function(grid, record){
        var $this    = this,
            newStore = record.fetchPenerimask();

        grid.reconfigure(newStore);
        newStore.reload();
    },

    onMainview_AppendRecord: function(view, record){
        if(! record) return;

        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            store = view.getStore(),
            popupView = view.up('sipas_surat_penerima_keputusan_popup'),
            suratId = popupView.idsurat,
            find = store.findRecord('surat_penerimask_staf', record.get('staf_id')),
            golLama = $this.getGolLama({root:view}),
            cmbGolLama = golLama.getEditor(),
            storeCmbGolLama = cmbGolLama.getStore();

        if(storeCmbGolLama.getCount() == 0) {
            storeCmbGolLama.reload();
        }
    
        if(!find){
            var idJabatanBaru = null,
                namaJabatanBaru = null,
                levelGolBaru = null,
                idGolBaru = null,
                recGolBaru = null,
                sgtBaru = null,
                gpLama = null,
                gpBaru = null;

            if(popupView.sub_tipe == 1) {
                levelGolBaru = parseInt(record.get('golongan_level')) + 1;
                recGolLama = storeCmbGolLama.findRecord('golongan_id', record.get('staf_golongan'));
                recGolBaru = storeCmbGolLama.findRecord('golongan_level', levelGolBaru);
                idGolBaru = recGolBaru ? recGolBaru.get('golongan_level') : null;
                sgtBaru = record.get('staf_sgt');
            } else if(popupView.sub_tipe == 2) {
                levelGolBaru = record.get('golongan_level');
                recGolLama = storeCmbGolLama.findRecord('golongan_id', record.get('staf_golongan'));
                recGolBaru = storeCmbGolLama.findRecord('golongan_level', levelGolBaru);
                idGolBaru = record.get('golongan_id');
                sgtBaru = parseInt(record.get('staf_sgt')) + 1;
            }

            if(levelGolBaru && sgtBaru) {
                gpLama = parseInt(recGolLama.get('golongan_gaji_pokok')) + (parseInt(recGolLama.get('golongan_sgt')) * parseInt(record.get('staf_sgt')));
                gpBaru = parseInt(recGolBaru.get('golongan_gaji_pokok')) + (parseInt(recGolBaru.get('golongan_sgt')) * parseInt(sgtBaru));
            }

            if(popupView.sub_tipe == 1 || popupView.sub_tipe == 2 || popupView.sub_tipe == 5) {
                idJabatanBaru = record.get('jabatan_id');
                namaJabatanBaru = record.get('jabatan_nama');
            }

            if(popupView.sub_tipe == 0 || popupView.sub_tipe == 4 || popupView.sub_tipe == 5) {
                store.add({
                    'staf_id': record.get('staf_id'),
                    'staf_nama': record.get('staf_nama'),
                    'staf_kode': record.get('staf_kode'),
                    'surat_penerimask_surat': suratId,
                    'surat_penerimask_staf': record.get('staf_id'),
                    'surat_penerimask_profil': record.get('staf_profil'),
                    'surat_penerimask_jabatan_lama': record.get('jabatan_id'),
                    'jabatan_lama_nama': record.get('jabatan_nama'),
                    'surat_penerimask_jabatan_baru': idJabatanBaru,
                    'jabatan_baru_nama': namaJabatanBaru,
                    'surat_penerimask_gollama': record.get('golongan_id'),
                    'golongan_lama_level': record.get('golongan_level'),
                    'surat_penerimask_golbaru': record.get('golongan_id'),
                    'golongan_baru_level': record.get('golongan_level'),
                    'surat_penerimask_sglama': record.get('staf_sgt'),
                    'surat_penerimask_sgbaru': sgtBaru,
                    'surat_penerimask_gplama': gpLama,
                    'surat_penerimask_gpbaru': gpBaru,
                });
            } else {
                store.add({
                    'staf_id': record.get('staf_id'),
                    'staf_nama': record.get('staf_nama'),
                    'staf_kode': record.get('staf_kode'),
                    'surat_penerimask_surat': suratId,
                    'surat_penerimask_staf': record.get('staf_id'),
                    'surat_penerimask_profil': record.get('staf_profil'),
                    'surat_penerimask_jabatan_lama': record.get('jabatan_id'),
                    'jabatan_lama_nama': record.get('jabatan_nama'),
                    'surat_penerimask_jabatan_baru': idJabatanBaru,
                    'jabatan_baru_nama': namaJabatanBaru,
                    'surat_penerimask_gollama': record.get('golongan_id'),
                    'golongan_lama_level': record.get('golongan_level'),
                    'surat_penerimask_golbaru': idGolBaru,
                    'golongan_baru_level': levelGolBaru,
                    'surat_penerimask_sglama': record.get('staf_sgt'),
                    'surat_penerimask_sgbaru': sgtBaru,
                    'surat_penerimask_gplama': gpLama,
                    'surat_penerimask_gpbaru': gpBaru,
                });
            }

        }else{
            var msg = $this.getMessage('receiver_exist',{nama: record.get('staf_nama')});
            $helper.showNotification(msg[0],msg[1]);
        }
    },

    onMainview_RunDelete: function(view, rowIdx, colIdx, item, e, record, row){
        view.getStore().remove(record);
    },

    onMainview_buttonManual_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $profile = $session.getProfile(),
            $helper = $app.Helper(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            view = $this.getMainview({from:button}),
            popupView = view.up('sipas_surat_penerima_keputusan_popup'),
            suratId = popupView.idsurat,
            controllerLookup = $this.getController($this.controllerStafLookup),
            store = view.getStore(),
            multiselect = true,
            golLama = $this.getGolLama({root:view}),
            cmbGolLama = golLama.getEditor(),
            storeCmbGolLama = cmbGolLama.getStore();

        if(storeCmbGolLama.getCount() == 0) {
            storeCmbGolLama.reload();
        }

        if(popupView.recSurat.get('surat_model_sub') == 1) {
            multiselect = false;

            if(store.data.length > 0) {
                $helper.showMsg({success:false, message: 'Hanya dapat memilih 1 penerima pada SK Perorangan'});
                return;
            }
        }
        
        var config = {
            multiselect: multiselect,
            keputusan: true,
            callback:function(selections){
                for(var i in selections){
                    var rec = selections[i],
                        find = store.findRecord('surat_penerimask_staf', rec.get('staf_id'));

                    if(!find){
                        var count_before = store.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            var idJabatanBaru = null,
                                namaJabatanBaru = null,
                                levelGolBaru = null,
                                idGolBaru = null,
                                recGolBaru = null,
                                sgtBaru = null,
                                gpLama = null,
                                gpBaru = null;

                            if(popupView.sub_tipe == 1) {
                                levelGolBaru = parseInt(rec.get('golongan_level')) + 1;
                                recGolLama = storeCmbGolLama.findRecord('golongan_id', rec.get('staf_golongan'));
                                recGolBaru = storeCmbGolLama.findRecord('golongan_level', levelGolBaru);
                                idGolBaru = recGolBaru ? recGolBaru.get('golongan_level') : null;
                                sgtBaru = rec.get('staf_sgt');
                            } else if(popupView.sub_tipe == 2) {
                                levelGolBaru = rec.get('golongan_level');
                                recGolLama = storeCmbGolLama.findRecord('golongan_id', rec.get('staf_golongan'));
                                recGolBaru = storeCmbGolLama.findRecord('golongan_level', levelGolBaru);
                                idGolBaru = rec.get('golongan_id');
                                sgtBaru = parseInt(record.get('staf_sgt')) + 1;
                            }

                            if(levelGolBaru && sgtBaru) {
                                gpLama = parseInt(recGolLama.get('golongan_gaji_pokok')) + (parseInt(recGolLama.get('golongan_sgt')) * parseInt(rec.get('staf_sgt')));
                                gpBaru = parseInt(recGolBaru.get('golongan_gaji_pokok')) + (parseInt(recGolBaru.get('golongan_sgt')) * parseInt(sgtBaru));
                            }

                            if(popupView.sub_tipe == 1 || popupView.sub_tipe == 2 || popupView.sub_tipe == 5) {
                                idJabatanBaru = rec.get('jabatan_id');
                                namaJabatanBaru = rec.get('jabatan_nama');
                            }

                            if(popupView.sub_tipe == 0 || popupView.sub_tipe == 4 || popupView.sub_tipe == 5) {
                                store.add({
                                    'staf_id': rec.get('staf_id'),
                                    'staf_nama': rec.get('staf_nama'),
                                    'staf_kode': rec.get('staf_kode'),
                                    'surat_penerimask_surat': suratId,
                                    'surat_penerimask_staf': rec.get('staf_id'),
                                    'surat_penerimask_profil': rec.get('staf_profil'),
                                    'surat_penerimask_jabatan_lama': rec.get('jabatan_id'),
                                    'jabatan_lama_nama': rec.get('jabatan_nama'),
                                    'surat_penerimask_jabatan_baru': idJabatanBaru,
                                    'jabatan_baru_nama': namaJabatanBaru,
                                    'surat_penerimask_gollama': rec.get('golongan_id'),
                                    'golongan_lama_level': rec.get('golongan_level'),
                                    'surat_penerimask_golbaru': rec.get('golongan_id'),
                                    'golongan_baru_level': rec.get('golongan_level'),
                                    'surat_penerimask_sglama': rec.get('staf_sgt'),
                                    'surat_penerimask_sgbaru': sgtBaru,
                                    'surat_penerimask_gplama': gpLama,
                                    'surat_penerimask_gpbaru': gpBaru,
                                });
                            } else {
                                store.add({
                                    'staf_id': rec.get('staf_id'),
                                    'staf_nama': rec.get('staf_nama'),
                                    'staf_kode': rec.get('staf_kode'),
                                    'surat_penerimask_surat': suratId,
                                    'surat_penerimask_staf': rec.get('staf_id'),
                                    'surat_penerimask_profil': rec.get('staf_profil'),
                                    'surat_penerimask_jabatan_lama': rec.get('jabatan_id'),
                                    'jabatan_lama_nama': rec.get('jabatan_nama'),
                                    'surat_penerimask_jabatan_baru': idJabatanBaru,
                                    'jabatan_baru_nama': namaJabatanBaru,
                                    'surat_penerimask_gollama': rec.get('golongan_id'),
                                    'golongan_lama_level': rec.get('golongan_level'),
                                    'surat_penerimask_golbaru': idGolBaru,
                                    'golongan_baru_level': levelGolBaru,
                                    'surat_penerimask_sglama': rec.get('staf_sgt'),
                                    'surat_penerimask_sgbaru': sgtBaru,
                                    'surat_penerimask_gplama': gpLama,
                                    'surat_penerimask_gpbaru': gpBaru,
                                });
                            }
                        }
                    }else{
                        var msg = $this.getMessage('receiver_exist',{nama: rec.get('staf_nama')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        }
        
        controllerLookup.launch(config);
    }
});
