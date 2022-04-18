/*
 * File: app/view/Sipas/notadinas/session/List.js
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

Ext.define('SIPAS.view.Sipas.notadinas.session.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_notadinas_session_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Print',
        'SIPAS.view.Sipas.com.button.Expedition',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'SIPAS.view.Sipas.disposisi.session.read.info.Pane',
        'SIPAS.view.Sipas.disposisi.session.read.Pane',
        'SIPAS.view.Sipas.surat.penyetujuan.detail.Pane',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    isAsistensi: false,
    languageCode: 'notadinas_list',
    languageMode: 'title',
    languageable: true,
    isNotadinas: false,
    itemId: 'listSipasSuratPegawai1',
    autoScroll: true,
    title: 'Nota Dinas',
    allowDeselect: true,
    columnLines: false,
    emptyText: 'Tidak ada data',
    store: 'Sipas.notadinas.session.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store)
            	{
                    if(record.get("disposisi_masuk_iscabut") === 1){
                    
                        return "x-grid-row-alternative";
                    }
            	}
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    border: false,
                    itemId: 'toolbarControl',
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
                            action: 'doreload'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            action: 'doview',
                            disabled: true,
                            hidden: true,
                            itemId: 'buttonViewDisposisi',
                            text: 'Lihat Disposisi'
                        },
                        {
                            xtype: 'sipas_com_button_print',
                            action: 'doprint',
                            disabled: true,
                            hidden: true,
                            text: 'Surat Keterangan Penerima Disposisi'
                        },
                        {
                            xtype: 'sipas_com_button_expedition',
                            disabled: true,
                            hidden: true
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
                            value: 'Semua Nota Dinas',
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
                                        nama: 'Semua Nota Dinas'
                                    },
                                    {
                                        value: 1,
                                        nama: 'Nota Dinas Belum Dibaca'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Nota Dinas Dibaca'
                                    },
                                    {
                                        value: 3,
                                        nama: 'Nota Dinas Didisposisikan'
                                    },
                                    {
                                        value: 4,
                                        nama: 'Nota Dinas Dibatalkan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }),
                        me.processStatusNotadinas({
                            xtype: 'combobox',
                            cls: 'x-field-toolbar',
                            itemId: 'statusNotadinas',
                            width: 200,
                            value: 'Semua Nota Dinas',
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
                                        nama: 'Semua Nota Dinas'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Nota Dinas Belum Dibaca'
                                    },
                                    {
                                        value: 3,
                                        nama: 'Nota Dinas Dibaca'
                                    },
                                    {
                                        value: 4,
                                        nama: 'Nota Dinas Didisposisikan'
                                    },
                                    {
                                        value: 5,
                                        nama: 'Nota Dinas Dibatalkan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }),
                        me.processStatusNotadinas1({
                            xtype: 'combobox',
                            hidden: true,
                            itemId: 'statusNotadinas1',
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
                                        value: 'Sipas.staf.wakil.monitoring.notadinas.List',
                                        nama: 'Semua'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.notadinas.Blmbaca',
                                        nama: 'Belum Dibaca'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.notadinas.Baca',
                                        nama: 'Dibaca'
                                    },
                                    {
                                        value: 'Sipas.staf.wakil.monitoring.notadinas.Terus',
                                        nama: 'Didisposisikan'
                                    }
                                ]
                            },
                            valueField: 'value'
                        })
                    ]
                },
                me.processToolbarInfo({
                    xtype: 'toolbar',
                    dock: 'right',
                    hidden: true,
                    itemId: 'toolbarInfo',
                    vertical: true,
                    items: [
                        {
                            xtype: 'sipas_disposisi_session_read_info_pane'
                        },
                        {
                            xtype: 'sipas_disposisi_session_read_pane'
                        },
                        {
                            xtype: 'sipas_surat_penyetujuan_detail_pane'
                        }
                    ]
                }),
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.notadinas.session.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = '<div class="subtext">'+Ext.util.Format.date(value, 'd M Y')+'</div>',
                            jam = "<div class='supporttext'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";
                        if(record.get('disposisi_masuk_isbaca') === 1){
                            return val +jam;
                        }else{
                            return '<span class="bold">' + val + '</span>'+ jam;
                        }
                    },
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    width: 100,
                    sortable: true,
                    dataIndex: 'disposisi_tgl',
                    text: 'Tgl.Terima',
                    tooltip: '(Tahun-Bulan-Tanggal Jam:Menit:Detik)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        modelDM = Ext.ModelManager.getModel('SIPAS.model.Sipas.disposisi.Masuk');
                        return modelDM.renderStatusBaca(value, record.get('disposisi_masuk_isterus'));
                    },
                    filterable: false,
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_isbaca',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');
                        return modelPegawai.renderRead(record.get('disposisi_pengirim_id'), record.get('disposisi_pengirim_nama'), record.get('disposisi_pengirim_jabatan_nama'), record.get('disposisi_pengirim_unit_nama'), record);
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Pengirim',
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
                    dataIndex: 'disposisi_pengirim_nama',
                    text: 'Pengirim'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = (value)? value : record.get('unit_source_nama'),
                            subtext = "<div class='supporttext blue-700-i'>"+record.get('surat_nomor')+"</div>",
                            isBaca = record.get('disposisi_masuk_isbaca'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            valRender = '<div class="subtext">'+modelSurat.renderBaca(isBaca, val, 'Pengirim')+'</div>';
                        if(record.get('surat_nomor')){
                            return valRender+subtext;
                        }else{
                            return valRender;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Dari',
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
                        var val = value,
                            badge = '<span class="badge badge-light" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                            subtext = "<div class='supporttext'>"+record.get('surat_registrasi')+"</div>",
                            isBaca = record.get('disposisi_masuk_isbaca'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            valRender = modelSurat.renderBaca(isBaca, val, 'Perihal');

                        if(record.get('sifat_color')){
                            return badge+valRender+subtext;
                        }else{
                            return valRender+subtext;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Perihal',
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
                        var modelPerintah = Ext.ModelManager.getModel('SIPAS.model.Sipas.Perintah'),
                            valRender = modelPerintah.renderBaca(record.get('disposisi_masuk_isbaca'), value, record.get('disposisi_pesan')),
                            subtext = "<div class='supporttext ellipsis'>"+ record.get('disposisi_pesan')+"</div>";
                        if( record.get('disposisi_pesan')){
                            return valRender+subtext;
                        }else{
                            return valRender;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Perintah',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                }
                        }
                    },
                    languageable: true,
                    languageMode: 'text',
                    languageCode: 'perintah_list_kolom',
                    width: 300,
                    sortable: true,
                    dataIndex: 'perintah_nama',
                    text: 'Perintah'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat 		= Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            modelDisposisi 	= Ext.ModelManager.getModel('SIPAS.model.Sipas.Disposisi'),
                            val 			= modelDisposisi.renderPrioritas(record.get('disposisi_useprioritas'), value, record.get('disposisi_masuk_aksi'));
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), val, 'Prioritas');
                    },
                    filterable: false,
                    filter: {
                        type: 'date'
                    },
                    languageable: true,
                    languageMode: 'text',
                    languageCode: 'prioritas_disposisi_masuk_list',
                    width: 200,
                    sortable: true,
                    dataIndex: 'disposisi_prioritas_tgl',
                    text: 'Urgensi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Kode Terima');
                    },
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
                    dataIndex: 'disposisi_masuk_nomor',
                    text: 'Kode Terima'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Kode Disposisi');
                    },
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
                    dataIndex: 'disposisi_nomor',
                    text: 'Kode Disposisi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelAksi = Ext.ModelManager.getModel('SIPAS.model.Sipas.Aksi'),
                            valRender = modelAksi.renderBaca(record.get('disposisi_masuk_isbaca'), value, record.get('disposisi_masuk_pesan')),
                            subtext = "<div class='supporttext ellipsis'>"+record.get('disposisi_masuk_pesan')+"</div>";
                        if( record.get('disposisi_masuk_pesan')){
                            return valRender+subtext;
                        }else{
                            return valRender;
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Tindakan',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                }
                        }
                    },
                    languageCode: 'tindakan_list_kolom',
                    languageMode: 'text',
                    languageable: true,
                    width: 300,
                    sortable: true,
                    dataIndex: 'aksi_nama',
                    text: 'Tindakan'
                },
                {
                    xtype: 'datecolumn',
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 120,
                    sortable: true,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Registrasi',
                    tooltip: '(Tahun-Bulan-Tanggal Jam:Menit:Detik)',
                    format: 'd M Y H:i'
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
                        var modelDM = Ext.ModelManager.getModel('SIPAS.model.Sipas.disposisi.Masuk');
                        return modelDM.renderTembusan(record.get('disposisi_masuk_isbaca'), value);
                    },
                    filterable: true,
                    filter: {
                        type: 'list',
                        ppMode: true,
                        options: [
                            [
                                0,
                                '<span style="color:grey;">(Bukan Tembusan)</span>'
                            ],
                            [
                                1,
                                '<i class="icon ion-md-people grey-700-i"></i>Tembusan'
                            ]
                        ]
                    },
                    width: 40,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_istembusan',
                    text: '<i class=\'icon ion-md-people grey-700-i\'></i>',
                    tooltip: 'Tembusan'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelDM = Ext.ModelManager.getModel('SIPAS.model.Sipas.disposisi.Masuk');
                        return modelDM.renderBerkas(record.get('disposisi_masuk_isbaca'), value);
                    },
                    filterable: true,
                    filter: {
                        type: 'list',
                        ppMode: true,
                        options: [
                            [
                                0,
                                '<span style="color:grey;">(Tidak Disertai Berkas)</span>'
                            ],
                            [
                                1,
                                '<i class="icon ion-md-folder blue-700-i"></i>Disertai Berkas'
                            ]
                        ]
                    },
                    width: 40,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_isberkas',
                    text: '<i class="icon ion-md-folder blue-700-i"></i>',
                    tooltip: 'Berkas'
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
                        var sub = record.get('surat_agenda_sub');
                        var val = (sub) ? value+'.'+sub : value;

                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), val, 'No.Agenda');
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
                    width: 120,
                    sortable: true,
                    dataIndex: 'surat_tanggal',
                    text: 'Tgl.Surat',
                    tooltip: '(Tahun-Bulan-Tanggal Jam:Menit:Detik)',
                    format: 'd M Y H:i'
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
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_masuk_isbaca'), value, 'Media');
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

        me.processSipasdisposisisessionList(me);
        me.callParent(arguments);
    },

    processStatus: function(config) {
        if(this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processStatusNotadinas: function(config) {
        if(!this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processStatusNotadinas1: function(config) {
        if(!this.isAsistensi)
        {
            return null;
        }
        return config;
    },

    processToolbarInfo: function(config) {
        if(this.withoutControl)
        {
            return null;
        }
        return config;
    },

    processSipasdisposisisessionList: function(config) {
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