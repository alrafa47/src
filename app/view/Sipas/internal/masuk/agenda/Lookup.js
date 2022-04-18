/*
 * File: app/view/Sipas/internal/masuk/agenda/Lookup.js
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

Ext.define('SIPAS.view.Sipas.internal.masuk.agenda.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_internal_masuk_agenda_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.button.Button'
    ],

    height: 400,
    minHeight: 100,
    minWidth: 200,
    width: 750,
    layout: 'fit',
    title: 'Daftar Surat Masuk Internal',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'toolbarProperties',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'comboScope',
                            minWidth: 300,
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
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
                    itemId: 'toolbarControl',
                    ui: 'footer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        },
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'sipas_com_button_putin',
                            disabled: true
                        }
                    ]
                }
            ],
            items: [
                me.processMyGridPanel2({
                    xtype: 'gridpanel',
                    border: false,
                    allowDeselect: true,
                    emptyText: 'Tidak Ada Data',
                    store: 'Sipas.internal.masuk.agenda.Lookup',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value){
                                    return value;
                                } else {
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari No Regisrasi',
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
                                }
                                }
                            },
                            width: 140,
                            dataIndex: 'surat_nomor',
                            text: 'No.Surat'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value){
                                    return value;
                                } else {
                                    return '<span class="alternative">-</span>';
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
                            dataIndex: 'surat_perihal',
                            text: 'Perihal'
                        },
                        {
                            xtype: 'datecolumn',
                            filterable: true,
                            width: 100,
                            dataIndex: 'surat_tanggal',
                            text: 'Tgl.Surat',
                            format: 'd M Y'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value){
                                    return value;
                                } else {
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Jenis Surat',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                this.up('gridpanel').filterHeader(this);
                                }
                                }
                            },
                            width: 160,
                            dataIndex: 'itipe_nama',
                            text: 'Jenis'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value){
                                    return value;
                                } else {
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
                                }
                                }
                            },
                            width: 100,
                            dataIndex: 'surat_agenda',
                            text: 'No.Agenda'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        mode: 'SINGLE'
                    }),
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Sipas.internal.masuk.agenda.Lookup'
                        }
                    ]
                })
            ]
        });

        me.callParent(arguments);
    },

    processMyGridPanel2: function(config) {
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