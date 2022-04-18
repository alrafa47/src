/*
 * File: app/view/Sipas/jenis/unit/List.js
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

Ext.define('SIPAS.view.Sipas.jenis.unit.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jenis_unit_list',

    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.button.Button'
    ],

    header: false,
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.jenis.unit.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Unit',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                        this.up('gridpanel').filterHeader(this);
                                    }
                        }
                    },
                    filterable: true,
                    minWidth: 200,
                    width: 200,
                    dataIndex: 'unit_nama',
                    text: 'Daftar Unit',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    featureName: 'unit',
                    featureable: true,
                    hidden: true,
                    minWidth: 200,
                    width: 200,
                    dataIndex: 'unit_cakupan_jabatan',
                    text: 'Nama Unit Kerja',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    itemId: 'colDeleteUnit',
                    width: 36,
                    align: 'center',
                    menuDisabled: true,
                    items: [
                        {
                            action: 'removerecord',
                            iconCls: 'x-action-col-icon-bin'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    items: [
                        {
                            xtype: 'label',
                            cls: 'alternative bold',
                            padding: 4,
                            text: 'Unit Kerja Kewenangan'
                        }
                    ]
                },
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
                            xtype: 'combobox',
                            flex: 1,
                            cls: 'x-field-search',
                            itemId: 'fieldSearch',
                            width: '100%',
                            emptyText: 'Tambahkan unit',
                            enforceMaxLength: true,
                            hideTrigger: true,
                            anyMatch: true,
                            displayField: 'unit_nama',
                            forceSelection: true,
                            pageSize: 15,
                            queryMode: 'local',
                            store: 'Sipas.jenis.unit.Combo',
                            valueField: 'unit_id',
                            listConfig: {
                                xtype: 'boundlist',
                                emptyText: 'Pencarian tidak ditemukan',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{unit_nama} ({unit_kode})'
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'buttonManual',
                            text: 'Pilih Manual'
                        }
                    ]
                }
            ]
        });

        me.processSipasunitcakupanList(me);
        me.callParent(arguments);
    },

    processSipasunitcakupanList: function(config) {
        var filters = {
            ftype: 'filters',
            encode: true,
            local: true
        };

        if (! config.features) {
            config.features=filters;
        } else {
            config.features.push(filters);
        }

        return config;
    }

});