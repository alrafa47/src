/*
 * File: app/view/Sipas/session/notification/agenda/internal/masuk/berkas/List.js
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

Ext.define('SIPAS.view.Sipas.session.notification.agenda.internal.masuk.berkas.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_session_notification_agenda_internal_masuk_berkas_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    languageable: true,
    languageMode: 'title',
    languageCode: 'notif_agd_imasuk_berkas_list',
    autoScroll: true,
    titleAlign: 'left',
    allowDeselect: true,
    columnLines: false,
    disableSelection: true,
    emptyText: 'Tidak ada data',
    store: 'Sipas.session.notification.agenda.internal.masuk.berkas.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store)
            	{
                    if(record.get("surat_setuju") === 0){
                    
                        return "x-grid-row-bold";
                    } else {
                        var use_retensi = record.get('surat_useretensi'),
                            tanggal = new Date(),
                            retensi_tgl = record.get('surat_retensi_tgl'),
                            tanggal_display = Ext.util.Format.date(retensi_tgl, 'd M Y');
            
                        if (use_retensi){
                            retensi_tgl.setHours(0,0,0,0);
                            tanggal.setHours(0,0,0,0);
                            var isretensi = (retensi_tgl < tanggal)? 1 : 0;
            
                            if(isretensi){
                                return "x-grid-row-alternative";
                            }
                        }
                    }
            	}
            },
            dockedItems: [
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
                            xtype: 'combobox',
                            clickToView: true,
                            itemId: 'comboScope',
                            minWidth: 300,
                            fieldLabel: '',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'unit_nama',
                            store: 'Sipas.surat.scope.Combo',
                            valueField: 'unit_id',
                            listConfig: {
                                xtype: 'boundlist',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{unit_nama} <span style="color: gray">({unit_kode})</span>'
                                ]
                            }
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            itemId: 'comboTipe',
                            fieldLabel: '',
                            emptyText: 'Pilih Internal',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'itipe_nama',
                            store: 'Sipas.itipe.Combo',
                            valueField: 'itipe_id'
                        },
                        {
                            xtype: 'button',
                            cls: 'x-btn-danger',
                            hidden: true,
                            itemId: 'buttonReset',
                            iconCls: 'icon ion-md-remove-circle'
                        },
                        {
                            xtype: 'sipas_com_button_refresh',
                            action: 'reload'
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
                        }
                    ]
                },
                me.processMyPagingToolbar11({
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.session.notification.agenda.internal.masuk.berkas.List'
                })
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
                                }
                        }
                    },
                    width: 140,
                    dataIndex: 'surat_registrasi',
                    text: 'No.Registrasi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = Ext.util.Format.date(value, 'd M Y'),
                            jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(value, 'H:i') +"</span></div>";

                        return '<div class="subtext">'+val+'</div>'+jam;
                    },
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Registrasi',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderSurat(value, record, 3);
                    },
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
                    filterable: true,
                    width: 420,
                    dataIndex: 'surat_perihal',
                    text: 'Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderStatusDistribusiInternal(value, record);
                    },
                    width: 200,
                    sortable: true,
                    dataIndex: 'surat_isdistribusi',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        if(value){
                            return modelSurat.renderPrioritas(record.get('surat_prioritas'),value, record.get('surat_isselesai'), record);

                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    languageCode: 'prioritas_agenda_surat_masuk_internal_list',
                    languageMode: 'text',
                    languageable: true,
                    filter: {
                        type: 'date'
                    },
                    featureName: 'agenda_internal_masuk_tambah',
                    featureable: true,
                    roleable: true,
                    roleName: 'surat_internal_masuk_insert',
                    width: 140,
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
                        if(value)
                        {
                            metaData.tdAttr = 'data-qtip="'+value+' Pemberian Rating"';
                            return '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-flag orange-700"></i></span>'+value;
                        }else{
                            metaData.tdAttr = 'data-qtip="Belum Diberi Rating"';
                            return '<span class="alternative">-</span>';
                        }
                    },
                    featureable: true,
                    featureName: 'ratingreview',
                    hidden: true,
                    width: 60,
                    dataIndex: 'surat_ulasan_jumlah',
                    text: '<i class="icon ion-md-flag orange-700"></i>',
                    tooltip: 'Jumlah Pemberian Rating'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
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
                    width: 160,
                    dataIndex: 'jenis_nama',
                    text: 'Jenis'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelDefault = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                        return modelDefault.renderNomor(value, record);
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
                    dataIndex: 'surat_nomor',
                    text: 'No.Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = Ext.util.Format.date(value, 'd M Y'),
                            jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";

                        if(value){
                            return '<div class="subtext">'+val+'</div>'+jam;
                        }else{
                            return '<span class="alternative"> - </span>';
                        }
                    },
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    dataIndex: 'surat_setuju_tgl',
                    text: 'Tgl.Terima',
                    tooltip: '(Tanggal-Bulan-Tahun)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = value;
                        var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');

                        if(value){
                            return modelPegawai.renderPegawaiList(record.get('penyetuju_id'), val, record.get('penyetuju_jabatan_nama'), record.get('penyetuju_unit_nama'), record);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Penyetuju',
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
                    width: 140,
                    dataIndex: 'penyetuju_nama',
                    text: 'Penyetuju'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative"> - </span>';
                        }
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
                                },
                            afterrender: function(){
                                    this.show();
                                }
                        }
                    },
                    hidden: true,
                    width: 160,
                    dataIndex: 'korespondensi_unitpengirim_nama',
                    text: 'Pengirim'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Komentar',
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
                    filterable: true,
                    hidden: true,
                    width: 300,
                    dataIndex: 'surat_setuju_komentar',
                    text: 'Komentar'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value)
                        {
                            return '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-attach grey-700"></i></span>'+value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    hidden: true,
                    width: 60,
                    dataIndex: 'surat_jumlah_dokumen',
                    text: '<i class="icon ion-md-attach grey-700"></i>'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        // var badge = '<span class="badge badge-light margin-right-4" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                        //     perihal = '';
                        // // if(record.get('surat_jumlah_dokumen') != 0){
                        // //     perihal = ' - ('+record.get('surat_jumlah_dokumen') + ' berkas)';
                        // // }
                        // var subtext = "<div class='supporttext'>"+record.get('surat_registrasi')+perihal+"</div>";
                        // if(value){
                        //     if(record.get('sifat_color')){
                        //         return badge + value + subtext;
                        //     }else{
                        //         return value + subtext;
                        //     }
                        // }else{
                        //     return '<span class="alternative">-</span>' + subtext;
                        // }
                        if (value){
                            return value;
                        } else {
                            return '<span class="alternative">-</span>';
                        }
                    },
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
                    filterable: true,
                    hidden: true,
                    width: 300,
                    dataIndex: 'surat_perihal',
                    emptyCellText: '-',
                    text: 'Perihal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
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
                    width: 140,
                    dataIndex: 'surat_agenda',
                    text: 'No.Agenda'
                },
                {
                    xtype: 'datecolumn',
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    dataIndex: 'surat_tanggal',
                    text: 'Tgl.Surat',
                    tooltip: '(Tanggal-Bulan-Tahun)',
                    format: 'd M Y'
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
                    width: 220,
                    dataIndex: 'surat_properti_pembuat_nama',
                    text: 'Pembuat'
                }
            ]
        });

        me.processSipassessionnotificationagendainternalmasukberkasList(me);
        me.callParent(arguments);
    },

    processMyPagingToolbar11: function(config) {
        config.store = this.store;
        return config;
    },

    processSipassessionnotificationagendainternalmasukberkasList: function(config) {
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