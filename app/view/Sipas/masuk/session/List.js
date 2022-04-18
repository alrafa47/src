/*
 * File: app/view/Sipas/masuk/session/List.js
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

Ext.define('SIPAS.view.Sipas.masuk.session.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_masuk_session_list',

    requires: [
        'SIPAS.view.Sipas.disposisi.session.read.info.Pane',
        'SIPAS.view.Sipas.surat.penyetujuan.detail.Pane',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Disposisi',
        'SIPAS.view.Sipas.com.button.revision.List',
        'SIPAS.view.Sipas.com.button.Expedition',
        'SIPAS.view.Sipas.com.button.Correspondent',
        'SIPAS.view.Sipas.com.button.Print',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.container.ButtonGroup',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    isAsistensi: false,
    languageCode: 'suratmasuk_list',
    languageMode: 'title',
    languageable: true,
    autoScroll: true,
    title: 'Surat Masuk',
    titleAlign: 'left',
    allowDeselect: true,
    columnLines: false,
    emptyText: 'Tidak ada data',
    store: 'Sipas.masuk.session.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                me.processToolbarApproval({
                    xtype: 'toolbar',
                    dock: 'right',
                    hidden: true,
                    itemId: 'toolbarInfo',
                    autoScroll: true,
                    vertical: true,
                    items: [
                        {
                            xtype: 'sipas_disposisi_session_read_info_pane'
                        },
                        {
                            xtype: 'sipas_surat_penyetujuan_detail_pane'
                        }
                    ]
                }),
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'toolbarProperties',
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
                            xtype: 'sipas_com_button_refresh',
                            action: 'reload'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            action: 'view',
                            disabled: true,
                            hidden: true,
                            text: 'Lihat Surat'
                        },
                        {
                            xtype: 'sipas_com_button_disposisi',
                            action: 'disposisi',
                            disabled: true,
                            hidden: true,
                            text: 'Disposisikan'
                        },
                        {
                            xtype: 'sipas_com_button_revision_list',
                            action: 'riwayat',
                            roleName: 'surat_masuk_penerima_riwayat',
                            roleable: true,
                            disabled: true,
                            hidden: true,
                            text: 'Riwayat Disposisi'
                        },
                        {
                            xtype: 'sipas_com_button_expedition',
                            action: 'ekspedisi',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_ekspedisi',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'sipas_com_button_correspondent',
                            action: 'korespondensi',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_korespondensi',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'sipas_com_button_print',
                            action: 'resi',
                            roleable: true,
                            roleName: 'surat_masuk_resi',
                            disabled: true,
                            hidden: true,
                            text: 'Cetak Resi'
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
                        me.processStatus({
                            xtype: 'combobox',
                            cls: 'x-field-toolbar',
                            itemId: 'Status',
                            width: 200,
                            value: 'Semua Surat Masuk',
                            emptyText: 'Status',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'nama',
                            store: {
                                fields: [
                                    'value',
                                    'nama'
                                ],
                                data: [
                                    {
                                        value: 0,
                                        nama: 'Semua Surat Masuk'
                                    },
                                    {
                                        value: 1,
                                        nama: 'Surat Masuk Belum Dibaca'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Surat Masuk Dibaca'
                                    },
                                    {
                                        value: 3,
                                        nama: 'Surat Masuk Didisposisikan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }),
                        me.processStatusMasuk({
                            xtype: 'combobox',
                            cls: 'x-field-toolbar',
                            itemId: 'statusMasuk',
                            width: 200,
                            value: 'Semua Surat Masuk',
                            emptyText: 'Status',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'nama',
                            store: {
                                fields: [
                                    'value',
                                    'nama'
                                ],
                                data: [
                                    {
                                        value: 1,
                                        nama: 'Semua Surat Masuk'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Surat Masuk Belum Dibaca'
                                    },
                                    {
                                        value: 3,
                                        nama: 'Surat Masuk Dibaca'
                                    },
                                    {
                                        value: 4,
                                        nama: 'Surat Masuk Didisposisikan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }),
                        me.processStatusMasuk1({
                            xtype: 'combobox',
                            hidden: true,
                            itemId: 'statusMasuk1',
                            fieldLabel: 'Tampilkan',
                            labelAlign: 'right',
                            value: 'Semua',
                            emptyText: 'Status',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'nama',
                            store: {
                                fields: [
                                    'value',
                                    'nama'
                                ],
                                data: [
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.masuk.List',
                                        nama: 'Semua'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.masuk.Blmbaca',
                                        nama: 'Belum Dibaca'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.masuk.Baca',
                                        nama: 'Dibaca'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.masuk.Terus',
                                        nama: 'Didisposisikan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        })
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.masuk.session.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = value;
                        if(record.get('disposisi_masuk_isbaca') === 1){
                            return val;
                        }else{
                            return '<span class="bold">' + val + '</span>';
                        }
                    },
                    width: 140,
                    sortable: false,
                    dataIndex: 'surat_tipe',
                    text: 'Tipe Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = Ext.util.Format.date(value, 'd M Y'),
                            jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";
                        if(record.get('disposisi_masuk_isbaca') === 1){
                            return '<div class="subtext">'+val+'</div>'+jam;
                        }else{
                            return '<div class="subtext"><span class="bold">' + val + '</span></div>'+ jam;
                        }
                    },
                    filter: {
                        type: 'date'
                    },
                    filterable: true,
                    width: 100,
                    sortable: true,
                    dataIndex: 'disposisi_tgl',
                    text: 'Tgl.Terima',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'No.Registrasi');
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
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
                    dataIndex: 'surat_registrasi',
                    text: 'No.Registrasi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = Ext.util.Format.date(value, 'd M Y'),
                            jam = '<div class="supporttext supporttext-dark">'+Ext.util.Format.date(value, 'H:i')+'</div>';
                        if(record.get('disposisi_masuk_isbaca') === 1){
                            return '<div class="subtext">'+val+'</div>'+jam;
                        }else{
                            return '<div class="subtext"><span class="bold">'+val+'</span></div>'+jam;
                        }
                    },
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Registrasi',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        modelDP = Ext.ModelManager.getModel('SIPAS.model.Sipas.disposisi.Masuk');
                        return modelDP.renderStatusBaca(value, record.get('disposisi_masuk_isterus'));
                    },
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_isbaca',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = value,
                            badge = '<span class="badge badge-light margin-right-4" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                            subtext = "<div class='supporttext supporttext-dark'>"+record.get('surat_registrasi')+"</div>",
                            isBaca = record.get('disposisi_masuk_isbaca'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            valRender = modelSurat.renderBaca(isBaca, val, 'Perihal');

                        if(record.get('sifat_color')){
                            return badge + valRender + subtext;
                        }else{
                            return valRender + subtext;
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
                                }
                        }
                    },
                    width: 300,
                    sortable: true,
                    dataIndex: 'surat_perihal',
                    text: 'Perihal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = (value)? value : record.get('unit_source_nama'),
                            subtext = "<div class='supporttext blue-700-i'>"+record.get('surat_nomor')+"</div>",
                            isBaca = record.get('disposisi_masuk_isbaca'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            valRender = modelSurat.renderBaca(isBaca, val, 'Pengirim');
                        if(record.get('surat_nomor')){
                            return '<div class="subtext">'+valRender+'</div>'+subtext;
                        }else{
                            return valRender;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Surat Dari',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                }
                        }
                    },
                    width: 300,
                    sortable: true,
                    dataIndex: 'surat_pengirim',
                    text: 'Dari'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Tujuan');
                    },
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
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Perihal');
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
                    width: 80,
                    sortable: true,
                    dataIndex: 'surat_agenda',
                    text: 'No.Agenda'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'No.Surat');
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
                                }
                        }
                    },
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_nomor',
                    text: 'No.Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = Ext.util.Format.date(value, 'd M Y');
                        if(record.get('disposisi_masuk_isbaca') === 1){
                            return val;
                        }else{
                            return '<span class="bold">' + val + '</span>';
                        }
                    },
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    sortable: true,
                    dataIndex: 'surat_tanggal',
                    text: 'Tgl.Surat',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Jenis');
                    },
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
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat 	= Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            val			= modelSurat.renderPrioritas(record.get('surat_prioritas'), value, record.get('surat_isselesai'), record);
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), val, 'Prioritas');
                    },
                    filterable: true,
                    languageable: true,
                    languageMode: 'text',
                    languageCode: 'prioritas_suratmasuk_list',
                    filter: {
                        type: 'date'
                    },
                    width: 140,
                    sortable: true,
                    dataIndex: 'surat_prioritas_tgl',
                    text: 'Urgensi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Media');
                    },
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
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Lokasi');
                    },
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
                }
            ]
        });

        me.processSipasmasuksessionList(me);
        me.callParent(arguments);
    },

    processToolbarApproval: function(config) {
        if(this.withoutControl)
                        {
                            return null;
                        }
                        return config;
    },

    processStatus: function(config) {
        if(this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processStatusMasuk: function(config) {
        if(!this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processStatusMasuk1: function(config) {
        if(!this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processSipasmasuksessionList: function(config) {
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

        return config;
    }

});