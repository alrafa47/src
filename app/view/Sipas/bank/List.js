/*
 * File: app/view/Sipas/bank/List.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SIPAS.view.Sipas.bank.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_bank_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Setting',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    languageCode: 'bank_surat_list',
    languageMode: 'title',
    languageable: true,
    title: 'Bank Surat',
    allowDeselect: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.bank.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store)
            	{
                    var use_retensi = record.get('surat_useretensi'),
                        tanggal = new Date(),
                        retensi_tgl = record.get('surat_retensi_tgl'),
                        tanggal_display = Ext.util.Format.date(retensi_tgl, 'd M Y'),
                        ishapus = record.get('surat_properti_ishapus');
                        
                    if (use_retensi){
                        retensi_tgl.setHours(0,0,0,0);
                        tanggal.setHours(0,0,0,0);
                        var isretensi = (retensi_tgl < tanggal)? 1 : 0;
            
                        if(isretensi){
                            return "x-grid-row-alternative";
                        }
                    }
                    
                    if(ishapus === '1'){
                       return "x-grid-row-alternative";
                    }
            	}
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        }
                    },
                    items: [
                        {
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            disabled: true,
                            hidden: true,
                            text: 'Lihat Surat'
                        },
                        {
                            xtype: 'sipas_com_button_delete',
                            rolename: 'surat_retensi_hapus',
                            disabled: true,
                            hidden: true,
                            text: 'Hapus Surat'
                        },
                        {
                            xtype: 'sipas_com_button_setting',
                            roleable: true,
                            roleName: 'surat_retensi_setting',
                            disabled: true,
                            hidden: true,
                            text: 'Setting Masa Retensi'
                        },
                        {
                            xtype: 'sipas_com_button_togglefilter',
                            toggleHandler: function(button, state) {
                                button.up('grid').query('gridcolumn textfield').forEach(function(field){
                                    state ? field.show():field.hide();
                                });
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboTipeSurat',
                            width: 250,
                            emptyText: 'Tipe Surat',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'tipe_nama',
                            store: 'Sipas.bank.Combo',
                            valueField: 'tipe_id'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboStatus',
                            width: 200,
                            emptyText: 'Status Surat',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'status_nama',
                            store: 'Sipas.bank.status.Combo',
                            valueField: 'status_id'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.bank.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(record.get('surat_properti_buat_tgl'), 'd M Y H:i') +"</div>";
                        if(value){
                            return '<div class="subtext">'+value+'</div>'+jam;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari No Registrasi',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    width: 140,
                    sortable: true,
                    dataIndex: 'surat_registrasi',
                    text: 'No.Registrasi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            var val = value,
                                modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');

                            return modelPegawai.renderPegawaiList(record.get('surat_properti_pembuat_id'), val, record.get('surat_properti_pembuat_jabatan_nama'), record.get('surat_properti_pembuat_unit_nama'), record);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Pembuat Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_properti_pembuat_nama',
                    text: 'Pembuat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var type = '',
                            model = record.get('surat_model');

                        if (model === 1){
                            type = 'Masuk Eksternal';
                        } else if (model === 2){
                            type = 'Keluar Eksternal';
                        } else if (model === 3){
                            type = 'Masuk Internal';
                        } else if (model === 4){
                            type = 'Keluar Internal';
                        } else if (model === 6){
                            type = 'Keputusan Internal';
                        }

                        if(value){
                            return '<div class="cell-text"><div class="subtext">'+value+'</div><div class="supporttext supporttext-dark">'+type+'</div></div>';
                        }else{
                            return '<div class="cell-text"><div class="subtext">-</div><div class="supporttext supporttext-dark">'+type+'</div></div>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Unit Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    width: 160,
                    sortable: true,
                    dataIndex: 'unit_nama',
                    text: 'Unit'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = '<div class="subtext">'+Ext.util.Format.date(value, 'd M Y')+'</div>',
                            jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";

                        return val +jam;
                    },
                    filter: {
                        type: 'date'
                    },
                    filterable: true,
                    hidden: true,
                    width: 100,
                    sortable: true,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Registrasi',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var surat_model = record.get('surat_model'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                        if (surat_model === 1){
                            return modelSurat.renderSurat(value, record, 1);
                        } else if (surat_model === 2){
                            return modelSurat.renderSurat(value, record, 2);
                        } else if (surat_model === 3){
                            return modelSurat.renderSurat(value, record, 3);
                        } else if (surat_model === 4){
                            return modelSurat.renderSurat(value, record, 4);
                        } else if (surat_model === 6){
                            return modelSurat.renderSurat(value, record, 6);
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                }
                        }
                    },
                    width: 420,
                    sortable: true,
                    dataIndex: 'surat_perihal',
                    text: 'Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var surat_model = record.get('surat_model'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                        if (surat_model == '1'){
                            return modelSurat.renderStatusDistribusi(record.get('surat_isdistribusi'), record);
                        } else if (surat_model == '2' || surat_model == '4' || surat_model == '6'){
                            return modelSurat.renderStatusPenyetujuan(value, record);
                        } else if (surat_model == '3'){
                            return modelSurat.renderStatusDistribusiInternal(record.get('surat_isdistribusi'), record);
                        }
                    },
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_setuju',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderPrioritas(record.get('surat_prioritas'), value, record.get('surat_isselesai'), record);
                    },
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    featureable: true,
                    featureName: 'prioritas',
                    languageCode: 'prioritas_agenda_surat_masuk_eksternal_list',
                    languageMode: 'text',
                    languageable: true,
                    width: 140,
                    sortable: true,
                    dataIndex: 'surat_prioritas_tgl',
                    text: 'Urgensi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderRetensi(record.get('surat_useretensi'), value, record);
                    },
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    featureable: true,
                    featureName: 'retensi',
                    width: 140,
                    sortable: true,
                    dataIndex: 'surat_retensi_tgl',
                    text: 'Masa Aktif'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var rec = record;

                        if(value === rec.self.modelType().MODEL_MASUK){
                            return rec.self.modelType().MODEL_MASUK_DISPLAY;
                        }else if (value === rec.self.modelType().MODEL_KELUAR){
                            return rec.self.modelType().MODEL_KELUAR_DISPLAY;
                        }else if (value === rec.self.modelType().MODEL_IKELUAR){
                            return rec.self.modelType().MODEL_IKELUAR_DISPLAY;
                        }else if (value === rec.self.modelType().MODEL_IMASUK){
                            return rec.self.modelType().MODEL_IMASUK_DISPLAY;
                        }else if (value === rec.self.modelType().MODEL_BEBAS){
                            return rec.self.modelType().MODEL_BEBAS_DISPLAY;
                        }else if (value === rec.self.modelType().MODEL_KEPUTUSAN){
                            return rec.self.modelType().MODEL_KEPUTUSAN_DISPLAY;
                        }
                    },
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'surat_model',
                    text: 'Tipe Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){return '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-attach grey-700-i"></i></span>'+value;}
                    },
                    hidden: true,
                    width: 60,
                    dataIndex: 'surat_jumlah_dokumen',
                    text: '<i class="icon ion-md-attach grey-700-i"></i>'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var badge = '<span class="badge badge-light margin-right-4" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                            perihal = '';
                        if(record.get('surat_jumlah_dokumen') != 0){
                            perihal = ' - ('+record.get('surat_jumlah_dokumen') + ' berkas)';
                        }
                        var subtext = "<div class='supporttext supporttext-dark'>"+record.get('surat_registrasi')+perihal+"</div>";
                        if(value){
                            if(record.get('sifat_color')){
                                return '<div class="subtext">'+badge + value + '</div>' + subtext;
                            }else{
                                return '<div class="subtext">'+value + '</div>' + subtext;
                            }
                        }else{
                            return '<div class="alternative">-</div>' + subtext;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Perihal Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 300,
                    sortable: true,
                    dataIndex: 'surat_perihal',
                    text: 'Perihal'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Surat Dari',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 300,
                    sortable: true,
                    dataIndex: 'surat_pengirim',
                    text: 'Dari'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Surat Kepada',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 300,
                    sortable: true,
                    dataIndex: 'surat_tujuan',
                    text: 'Kepada'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var sub = record.get('surat_masuk_agenda_sub');
                        return (sub) ? value+'.'+sub : value;
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari No Agenda',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'surat_agenda',
                    text: 'No.Agenda'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value){
                            return '<span class="blue-700-i">'+value+'</span>';
                        } else {
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari No Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_nomor',
                    text: 'No.Surat'
                },
                {
                    xtype: 'datecolumn',
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    sortable: true,
                    dataIndex: 'surat_tanggal',
                    text: 'Tgl.Surat',
                    format: 'd M Y'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Jenis',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    sortable: true,
                    dataIndex: 'jenis_nama',
                    text: 'Jenis'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Klasifikasi',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    featureable: true,
                    featureName: 'klasifikasi',
                    hidden: true,
                    width: 130,
                    sortable: true,
                    dataIndex: 'kelas_nama',
                    text: 'Klasifikasi'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Sifat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    sortable: true,
                    dataIndex: 'sifat_nama',
                    text: 'Sifat'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Media',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    sortable: true,
                    dataIndex: 'media_nama',
                    text: 'Media'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Lokasi',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    sortable: true,
                    dataIndex: 'lokasi_nama',
                    text: 'Lokasi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value){
                            return Ext.util.Format.date(value, 'd M Y H:i');
                        } else {
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: false,
                    hidden: true,
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Buat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value){
                            return Ext.util.Format.date(value, 'd M Y H:i');
                        } else {
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: false,
                    hidden: true,
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_setuju_tgl',
                    text: 'Tgl.Setuju'
                }
            ]
        });

        me.processSipasbankList(me);
        me.callParent(arguments);
    },

    processSipasbankList: function(config) {
        var filters = {
            ftype: 'filters',
            encode: true,
            local: false
        };

        if (! config.features) {
            config.features=filters;
        } else {
            config.features.push(filters);
        }
        //test
        return config;
    }

});