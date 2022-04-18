/*
 * File: app/view/Sipas/kontak/List.js
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

Ext.define('SIPAS.view.Sipas.kontak.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_kontak_list',

    requires: [
        'SIPAS.view.Sipas.com.atribut.cascade.Toolbar',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'SIPAS.view.Sipas.com.button.View',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    languageCode: 'kontak_list',
    languageMode: 'title',
    languageable: true,
    title: 'Daftar Kontak',
    allowDeselect: true,
    columnLines: false,
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.kontak.List',

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
                            roleName: 'kontak_insert'
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
                            xtype: 'sipas_com_button_view',
                            roleable: true,
                            roleName: 'media',
                            disabled: true,
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.kontak.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Kontak',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    minWidth: 400,
                    sortable: true,
                    dataIndex: 'kontak_nama',
                    text: 'Nama Kontak',
                    flex: 1
                }
            ],
            selModel: Ext.create('Ext.selection.RowModel', {

            })
        });

        me.processSipasmediaList(me);
        me.callParent(arguments);
    },

    processSipasmediaList: function(config) {
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