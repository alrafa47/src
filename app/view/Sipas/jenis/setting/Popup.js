/*
 * File: app/view/Sipas/jenis/setting/Popup.js
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

Ext.define('SIPAS.view.Sipas.jenis.setting.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_jenis_setting_popup',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'SIPAS.view.Sipas.com.button.Close',
        'Ext.grid.Panel',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Fill'
    ],

    height: 450,
    width: 600,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Daftar Jenis Surat',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processSipasjenisList({
                    xtype: 'gridpanel',
                    genAktif: function(value, aktif) {
                        if(!aktif){
                            return '<span class="alternative">'+value+'</span>';
                        }else{
                            return value;
                        }
                    },
                    clickToView: true,
                    allowDeselect: true,
                    columnLines: false,
                    disableSelection: true,
                    emptyText: 'Tidak ada Data',
                    store: 'Sipas.jenis.aktif.List',
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
                                    xtype: 'sipas_com_button_refresh'
                                },
                                {
                                    xtype: 'sipas_com_button_togglefilter',
                                    toggleHandler: function(button, state) {
                                        button.up('grid').query('gridcolumn textfield').forEach(function(field){
                                            state ? field.show():field.hide();
                                        });
                                    }
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
                            width: 400,
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
                                emptyText: 'Cari Kode Jenis',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                this.up('gridpanel').filterHeader(this);
                                }
                                }
                            },
                            width: 160,
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
                                        value = "Terpusat";
                                    }
                                    else if(value === 2){
                                        value = "Perunit";
                                    }
                                }else{
                                    value = "Mengikuti Pengaturan Sistem";
                                }

                                return this.genAktif(value, aktif);
                            },
                            width: 200,
                            align: 'center',
                            dataIndex: 'jenis_terpusat',
                            text: 'Pernomoran'
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
                            featureable: false,
                            featureName: 'agenda_internal',
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
                            align: 'center',
                            dataIndex: 'jenis_tampil_sm',
                            text: 'Tampil di<br/>Surat Masuk'
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
                            dataIndex: 'jenis_tampil_sk',
                            text: 'Tampil di<br/>Surat Keluar'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {
                        allowDeselect: false,
                        mode: 'SINGLE'
                    })
                })
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    itemId: 'toolbarControl',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_button_close',
                            cls: 'bold',
                            hidden: true
                        }
                    ]
                }
            ]
        });

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
    }

});