/*
 * File: app/view/Sipas/perintah/List.js
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

Ext.define('SIPAS.view.Sipas.perintah.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_perintah_list',

    requires: [
        'SIPAS.view.Sipas.com.atribut.cascade.Toolbar',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    title: 'Perintah Disposisi',
    allowDeselect: true,
    columnLines: false,
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.perintah.aktif.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'sipas_com_atribut_cascade_toolbar',
                    hidden: true,
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
                            roleName: 'perintah_insert',
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
                            width: 220,
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
                    store: 'Sipas.perintah.aktif.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var aktif = record.get('perintah_isaktif');

                        if(value){
                            return this.genAktif(value, aktif);
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Arahan',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    languageCode: 'perintah_list_kolom',
                    languageMode: 'text',
                    languageable: true,
                    minWidth: 400,
                    dataIndex: 'perintah_nama',
                    text: 'Perintah'
                }
            ],
            selModel: Ext.create('Ext.selection.RowModel', {

            })
        });

        me.processSipasasalList(me);
        me.callParent(arguments);
    },

    processSipasasalList: function(config) {
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