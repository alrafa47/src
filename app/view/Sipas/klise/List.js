/*
 * File: app/view/Sipas/klise/List.js
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

Ext.define('SIPAS.view.Sipas.klise.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_klise_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.toolbar.Paging'
    ],

    dbclickToView: true,
    border: false,
    title: 'Template Surat',
    titleAlign: 'center',
    emptyText: 'Tidak ada Data',
    store: 'Sipas.klise.aktif.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store)
                {
                    if(!record.get("klise_isaktif")){
                        return "x-grid-row-alternative";
                    }
                }
            },
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
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_add',
                            roleName: 'template_insert',
                            roleable: true
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
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboUnit',
                            labelAlign: 'right',
                            emptyText: 'Unit',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'unit_nama',
                            store: 'Sipas.unit.Combo',
                            valueField: 'unit_id'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.klise.aktif.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var tpl = new Ext.XTemplate([
                        '<span class="badge badge-solid margin-right-4">',
                        '<i class="icon ion-md-clipboard grey-700-i"></i>',
                        '</span>{nama}']);

                        return tpl.apply({
                            nama: value
                        });
                    },
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Template',
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
                    dataIndex: 'klise_nama',
                    text: 'Nama Template',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    sortable: true,
                    dataIndex: 'klise_unit_nama',
                    text: 'Unit',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('klise_isaktif');

                        if(value){
                            return this.genAktif(value, aktif);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Kelompok',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    width: 140,
                    sortable: true,
                    dataIndex: 'klise_kelompok',
                    text: 'Kelompok'
                }
            ],
            features: [
                {
                    ftype: 'grouping',
                    enableGroupingMenu: false,
                    enableNoGroups: false,
                    groupHeaderTpl: [
                        '{name}'
                    ],
                    hideGroupedHeader: true
                }
            ]
        });

        me.processSipaskliseList(me);
        me.callParent(arguments);
    },

    processSipaskliseList: function(config) {
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