/*
 * File: app/view/Sipas/disposisi/forward/penerima/List.js
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

Ext.define('SIPAS.view.Sipas.disposisi.forward.penerima.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_disposisi_forward_penerima_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Plus',
        'Ext.form.field.Hidden',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.grid.column.Action',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View',
        'Ext.grid.plugin.RowEditing'
    ],

    itemId: 'Sipas.disposisi.forward.penerima.List',
    autoScroll: true,
    bodyBorder: false,
    frameHeader: false,
    header: false,
    title: 'Daftar Penerima',
    allowDeselect: true,
    store: 'Sipas.disposisi.forward.penerima.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'hiddenfield',
                    dock: 'left',
                    itemId: 'disposisi_penerima',
                    width: 100,
                    fieldLabel: 'Label',
                    name: 'disposisi_penerima_penerima'
                },
                {
                    xtype: 'container',
                    dock: 'top',
                    itemId: 'toolbarControl',
                    ui: 'default-toolbar',
                    width: 100,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        }
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'alternative bold',
                            padding: 10,
                            text: 'Penerima',
                            listeners: {
                                afterrender: {
                                    fn: me.onLabelAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'sipas_com_button_add',
                            roleable: false,
                            hidden: true,
                            ui: 'default-toolbar'
                        },
                        {
                            xtype: 'sipas_com_button_delete',
                            roleable: false,
                            cls: 'x-btn-danger',
                            hidden: true,
                            ui: 'default-toolbar'
                        },
                        {
                            xtype: 'sipas_com_button_plus',
                            cls: 'x-btn-info',
                            text: 'Tambah Penerima'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    itemId: 'toolbarControl1',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'tbseparator'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'actioncolumn',
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
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        modelStaf = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');
                        return modelStaf.renderPegawai(value, record);
                    },
                    sortable: true,
                    dataIndex: 'staf_nama',
                    menuDisabled: true,
                    flex: 1
                },
                {
                    xtype: 'checkcolumn',
                    itemId: 'tembusan',
                    width: 80,
                    sortable: false,
                    dataIndex: 'disposisi_masuk_istembusan',
                    menuDisabled: true,
                    text: 'Tembusan'
                },
                {
                    xtype: 'checkcolumn',
                    hidden: true,
                    width: 140,
                    sortable: false,
                    dataIndex: 'disposisi_masuk_isberkas',
                    menuDisabled: true,
                    text: 'Disertai Berkas Fisik'
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'roweditor'
                })
            ]
        });

        me.callParent(arguments);
    },

    onLabelAfterRender: function(component, eOpts) {
        component.setText(component.up('panel').title);
    }

});