/*
 * File: app/view/Sipas/akun/List.js
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

Ext.define('SIPAS.view.Sipas.akun.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_akun_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.View',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    isProfile: false,
    dbclickToView: true,
    title: 'Daftar Akun',
    columnLines: false,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.akun.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            xtype: 'sipas_com_button_add',
                            roleable: true,
                            roleName: 'akun_insert'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'Aktif',
                            width: 175,
                            name: 'tampilcombo',
                            value: 'Akun Aktif',
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
                                        nama: 'Semua Akun'
                                    },
                                    {
                                        value: 1,
                                        nama: 'Akun Aktif'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Akun Tidak Aktif'
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
                    store: 'Sipas.akun.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('akun_isaktif'),
                            jml = record.get('akun_staf_jumlah') ? record.get('akun_staf_jumlah') : 0,
                            val = value +' <span class="alternative">('+jml+' Pegawai)</span>';
                        if(value){
                            return this.genAktif(val, aktif);
                        }else{
                            return "";
                        }

                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Akun',
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
                    dataIndex: 'akun_nama',
                    text: 'Nama Akun',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Unit',
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
                    dataIndex: 'akun_unit_nama',
                    text: 'Nama Akun',
                    flex: 1
                }
            ],
            selModel: Ext.create('Ext.selection.RowModel', {
                allowDeselect: false
            })
        });

        me.processSipasakunList(me);
        me.callParent(arguments);
    },

    processSipasakunList: function(config) {
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
            return '<span style="color:#9E9E9E;">'+value+'</span>';
        }else{
            return value;
        }
    }

});