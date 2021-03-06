/*
 * File: app/view/Sipas/session/notification/List.js
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

Ext.define('SIPAS.view.Sipas.session.notification.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_session_notification_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Cross',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.toolbar.Fill',
        'Ext.grid.column.Column',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    itemId: 'listSipasSuratPegawai1',
    autoScroll: true,
    title: 'Notifikasi',
    allowDeselect: true,
    columnLines: false,
    emptyText: 'Tidak ada data',
    hideHeaders: true,
    store: 'Sipas.notif.user.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store){
                    if(record.get("notif_user_isbaca") == 0){
                        return "x-grid-row-bold";
                    }
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    border: false,
                    itemId: 'toolbarControl',
                    style: {
                        marginBottom: '10px'
                    },
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 8
                        }
                    },
                    items: [
                        {
                            xtype: 'sipas_com_button_refresh',
                            hidden: true
                        },
                        {
                            xtype: 'container',
                            cls: 'x-container-border x-container-border-primary',
                            height: 32,
                            itemId: 'search',
                            margin: '',
                            style: {
                                borderRadius: '4px',
                                margin: '0 0 12 0'
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'bottom'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'x-btn-circle',
                                            disabled: true,
                                            itemId: 'buttonDetailPenerima',
                                            margin: '0 4 0 0',
                                            ui: 'default-toolbar',
                                            iconCls: 'icon ion-md-search',
                                            menuAlign: 'tr-br?'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    filterable: true,
                                    items: {
                                        xtype: 'textfield',
                                        listeners: {
                                            change: function(textfield, e, eOpts){
                                                    this.up('gridpanel').filterHeader(this);
                                                },
                                            afterrender: function(){
                                                    this.show();
                                                }
                                        }
                                    },
                                    width: 550,
                                    name: 'notif_user_isi',
                                    emptyText: 'Cari Perihal Surat'
                                },
                                {
                                    xtype: 'sipas_com_button_cross'
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            cls: 'x-btn-primary',
                            itemId: 'readAll',
                            width: 140,
                            text: 'tandai baca semua'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.notif.user.List'
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var id = record.get('pengirim_id'),
                            nama = record.get('pengirim_nama') ? record.get('pengirim_nama') : '<span class="supporttext">(Tidak Ada Nama)</span>',
                            jabatan = record.get('pengirim_jabatan_nama') ? record.get('pengirim_jabatan_nama') : '(Tidak ada jabatan)',
                            unit = record.get('pengirim_unit_nama') ? record.get('pengirim_unit_nama') : '(Tidak ada unit)',
                            tgl = Ext.util.Format.date(record.get('notif_user_tanggal'), 'd M Y'),
                            waktu = Ext.util.Format.date(record.get('notif_user_tanggal'), 'H:i'),
                            perihal = record.get('notif_user_isi'),
                            tipe = record.get('notif_user_tipe'),
                            model = '';

                        if(record.get('notif_user_model')== 1){
                            model = 'Masuk Eksternal';
                        }else if(record.get('notif_user_model')== 2){
                            model = 'Keluar Eksternal';
                        }else if(record.get('notif_user_model')== 3){
                            model = 'Masuk Internal';
                        }else if(record.get('notif_user_model')== 4){
                            model = 'Keluar Internal';
                        }

                        if(tipe == 1){
                            tipe = 'Memberi respon';
                        }else if(tipe == 2){
                            tipe = 'Mengirim Nota Dinas';
                        }else if(tipe == 3){
                            tipe = 'Mengirim Surat Masuk';
                        }else if(tipe == 4){
                            tipe = 'Mengirim Tembusan';
                        }else if(tipe == 5){
                            tipe = 'Mengirim Draf';
                        }else if(tipe == 6){
                            tipe = 'Mengirim Revisi';
                        }else {
                            tipe = '-';
                        }

                        return new Ext.XTemplate([
                        "<div class='cell-row'>"+
                        "<div class='cell-text margin-right-48 margin-left-16'>"+
                        "<div class='subtext ellipsis'>{tgl}</div>"+
                        "<div class='supporttext supporttext-dark ellipsis'>{waktu}</div>"+
                        "</div>"+
                        "<div class='cell-visual cell-visual-left'>"+
                        "<img src='server.php/sipas/staf/get_image/foto?id={id}' class='img img-circle img-32'>"+
                        "</div>"+
                        "<div class='cell-text'>"+
                        "<div class='subtext ellipsis'>{nama} - {unit}</div>"+
                        // "<div class='supporttext supporttext-dark ellipsis'>{jabatan} - {unit}</div>"+
                        "<div class='supporttext supporttext-dark ellipsis'>{tipe} - {perihal}</div>"+
                        "</div>"+
                        "</div>"
                        ]).apply({
                            id: id,
                            nama: nama,
                            jabatan: jabatan,
                            unit: unit,
                            tipe: tipe,
                            perihal: perihal,
                            tgl: tgl,
                            waktu: waktu
                        });
                    },
                    margin: '0 0 0 8',
                    width: 850,
                    sortable: true,
                    dataIndex: 'notif_user_isi',
                    text: 'Perihal Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = '<div class="subtext">'+Ext.util.Format.date(value, 'd M Y')+'</div>',
                            jam = "<div class='subtext'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";

                        return val +jam;
                    },
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 100,
                    sortable: true,
                    dataIndex: 'notif_user_tanggal',
                    text: 'Tgl.Terima',
                    tooltip: '(Tahun-Bulan-Tanggal Jam:Menit:Detik)'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var model = '';

                        if(record.get('notif_user_model')== 1){
                            model = '<div class="supporttext">Masuk Eksternal</div>';
                        }else if(record.get('notif_user_model')== 2){
                            model = '<div class="supporttext">Keluar Eksternal</div>';
                        }else if(record.get('notif_user_model')== 3){
                            model = '<div class="supporttext">Masuk Internal</div>';
                        }else if(record.get('notif_user_model')== 4){
                            model = '<div class="supporttext">Keluar Internal</div>';
                        }

                        if(value == 1){
                            return '<div class="subtext">Respon</div>'+model;
                        }else if(value == 2){
                            return '<div class="subtext">Nota Dinas</div>';
                        }else if(value == 3){
                            return '<div class="subtext">Surat Masuk</div>';
                        }else if(value == 4){
                            return '<div class="subtext">Tembusan</div>';
                        }else if(value == 5){
                            return '<div class="subtext">Draf</div>';
                        }else if(value == 6){
                            return '<div class="subtext">Revisi</div>'+model;
                        }else {
                            return '-';
                        }
                    },
                    filterable: false,
                    hidden: true,
                    width: 186,
                    sortable: true,
                    dataIndex: 'notif_user_tipe',
                    text: 'Tipe'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            var val = value,
                                modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');

                            return modelPegawai.renderPegawaiList(record.get('pengirim_id'), val, record.get('pengirim_jabatan_nama'), record.get('pengirim_unit_nama'), record);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Pengirim',
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
                    dataIndex: 'pengirim_nama',
                    text: 'Pengirim'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '-';
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
                    width: 475,
                    sortable: true,
                    dataIndex: 'notif_user_isi',
                    text: 'Perihal'
                }
            ]
        });

        me.processSipasdisposisisessionList(me);
        me.callParent(arguments);
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