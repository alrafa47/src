/*
 * File: app/view/Sipas/surat/tembusan/List.js
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

Ext.define('SIPAS.view.Sipas.surat.tembusan.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_surat_tembusan_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Add',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point'
    ],

    border: false,
    title: 'Daftar Tembusan',
    emptyText: 'Tidak ada Data',
    hideHeaders: true,
    store: 'Sipas.surat.tembusan.List',

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
                            xtype: 'tbtext',
                            itemId: 'textTembusan',
                            text: '<b style="color:#04408c">Tembusan</b>'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_button_add',
                            roleable: false,
                            itemId: 'tambahPetikan'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    hidden: true,
                    itemId: 'toolbarRiwayat',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnRiwayatpersetujuan',
                            text: 'Riwayat persetujuan'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer',
                    draggable: true,
                    height: 25,
                    lockable: true
                },
                {
                    xtype: 'actioncolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    },
                    height: 25,
                    itemId: 'columnDelete',
                    width: 36,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'rundelete',
                            iconCls: 'x-action-col-icon-bin',
                            tooltip: 'Hapus'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    },
                    height: 25,
                    itemId: 'columnMoveUp',
                    width: 36,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'runmoveup',
                            iconCls: 'x-action-col-icon-up',
                            tooltip: 'Naikkan'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value;
                    },
                    height: 25,
                    itemId: 'columnMoveDown',
                    width: 36,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'runmovedown',
                            iconCls: 'x-action-col-icon-down',
                            tooltip: 'Turunkan'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    height: 25,
                    width: 250,
                    sortable: false,
                    dataIndex: 'staf_nama',
                    menuDisabled: true,
                    text: 'Nama Petikan',
                    flex: 1
                }
            ],
            viewConfig: {
                plugins: [
                    Ext.create('Ext.grid.plugin.DragDrop', {
                        pluginId: 'dragdrop',
                        ddGroup: 'aps_filetype_requirement_list_dd',
                        dragGroup: 'aps_filetype_requirement_list_drag',
                        dropGroup: 'aps_filetype_requirement_list_drop'
                    })
                ]
            }
        });

        me.callParent(arguments);
    },

    genAktif: function(value, aktif) {
        if(!aktif){
            return '<span style="color:#9E9E9E;">'+value+'</span>';
        }else{
            return value;
        }
    }

});