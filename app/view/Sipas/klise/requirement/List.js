/*
 * File: app/view/Sipas/klise/requirement/List.js
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

Ext.define('SIPAS.view.Sipas.klise.requirement.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_klise_requirement_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Plus',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.grid.column.Boolean',
        'Ext.form.field.Checkbox',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.RowEditing'
    ],

    header: false,
    title: 'Kolom Tambahan',
    store: 'Sipas.klise.requirement.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            xtype: 'tbtext',
                            text: 'Kolom Tambahan'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_button_plus',
                            action: 'runadd'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    sortable: true,
                    dataIndex: 'name',
                    menuDisabled: true,
                    text: 'Nama Kolom',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'booleancolumn',
                    width: 80,
                    dataIndex: 'required',
                    menuDisabled: true,
                    text: 'Wajib Diisi ?',
                    editor: {
                        xtype: 'checkboxfield'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 24,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'rundelete',
                            iconCls: 'icon ion-md-close red-700-i',
                            tooltip: 'Hapus'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    width: 24,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'runmoveup',
                            iconCls: 'icon ion-md-arrow-up green-700-i',
                            tooltip: 'Naikkan'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    width: 24,
                    menuDisabled: true,
                    items: [
                        {
                            action: 'runmovedown',
                            iconCls: 'icon ion-md-arrow-down green-700-i',
                            tooltip: 'Turunkan'
                        }
                    ]
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
            },
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'roweditor'
                })
            ]
        });

        me.callParent(arguments);
    }

});