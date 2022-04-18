/*
 * File: app/view/Sipas/jenis/List.js
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

Ext.define('SIPAS.view.Sipas.jenis.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jenis_list',

    requires: [
        'SIPAS.view.Sipas.com.atribut.cascade.Toolbar',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    languageCode: 'jenis_list',
    languageMode: 'title',
    languageable: true,
    title: 'Daftar Jenis Surat',
    allowDeselect: true,
    columnLines: false,
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.jenis.aktif.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'sipas_com_atribut_cascade_toolbar',
                    dock: 'top'
                },
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
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_add',
                            roleable: true,
                            roleName: 'jenis_insert'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            roleable: true,
                            roleName: 'jabatan',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleable: true,
                            roleName: 'jenis_update',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'sipas_com_button_delete',
                            roleable: true,
                            roleName: 'jenis_delete',
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
                        {
                            xtype: 'combobox',
                            itemId: 'Aktif',
                            labelAlign: 'right',
                            value: 'Aktif',
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
                                        nama: 'Semua'
                                    },
                                    {
                                        value: 1,
                                        nama: 'Aktif'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Tidak Aktif'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.jenis.aktif.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            return this.genAktif(value, aktif);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Jenis',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    width: 250,
                    sortable: true,
                    dataIndex: 'jenis_nama',
                    text: 'Nama Jenis'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            return this.genAktif(value, aktif);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Kode',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    width: 85,
                    sortable: true,
                    dataIndex: 'jenis_kode',
                    text: 'Kode Jenis'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');
                        if(value){
                            if(value === 1){
                                value = "Terpusat Perjenis";
                            }
                            else if(value === 2){
                                value = "Perunit Perjenis";
                            }
                        }else{
                            value = "Mengikuti Pengaturan Sistem";
                        }

                        return this.genAktif(value, aktif);
                    },
                    width: 200,
                    align: 'center',
                    dataIndex: 'jenis_terpusat',
                    text: 'Penomoran'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i' </i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    align: 'center',
                    dataIndex: 'jenis_nomor_awal',
                    text: 'Gunakan<br>Penomoran Awal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    align: 'center',
                    dataIndex: 'jenis_batasibackdate',
                    text: 'Batasi<br/>Backdate'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    align: 'center',
                    dataIndex: 'jenis_batasipenerima',
                    text: 'Batasi<br/>Penerima'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    align: 'center',
                    dataIndex: 'jenis_isbatas',
                    text: 'Batasi<br/>Reupload'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    featureable: true,
                    featureName: 'jenis_perunit',
                    align: 'center',
                    dataIndex: 'jenis_tipe',
                    text: 'Tampil di<br/>Unit Khusus'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    featureable: true,
                    featureName: 'agenda_internal',
                    align: 'center',
                    dataIndex: 'jenis_tampil_si',
                    text: 'Tampil di<br/>Surat Internal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    width: 140,
                    align: 'center',
                    dataIndex: 'jenis_tampil_sm',
                    text: 'Tampil di<br/>Surat Masuk Eksternal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    width: 140,
                    align: 'center',
                    dataIndex: 'jenis_tampil_sk',
                    text: 'Tampil di<br/>Surat Keluar Eksternal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    align: 'center',
                    dataIndex: 'jenis_ttd',
                    text: 'Perlu<br/>Tanda Tangan'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('jenis_isaktif');

                        if(value){
                            value = value + " hari";
                            return this.genAktif(value, aktif);
                        }else{
                            value = '<span class="alternative">-</span>';
                            return value;
                        }
                    },
                    featureable: true,
                    featureName: 'jenis_retensi',
                    align: 'center',
                    dataIndex: 'jenis_retensi',
                    text: 'Lama<br>Masa Aktif'
                }
            ],
            selModel: Ext.create('Ext.selection.RowModel', {
                allowDeselect: false,
                mode: 'SINGLE'
            })
        });

        me.processSipasjenisList(me);
        me.callParent(arguments);
    },

    processSipasjenisList: function(config) {
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
    },

    genAktif: function(value, aktif) {
        if(!aktif){
            return '<span class="alternative">'+value+'</span>';
        }else{
            return value;
        }
    }

});