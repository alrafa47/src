/*
 * File: app/view/Sipas/kelas/Lookup.js
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

Ext.define('SIPAS.view.Sipas.kelas.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_kelas_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'SIPAS.store.Sipas.kelas.Lookup'
    ],

    border: 0,
    height: 450,
    width: 650,
    layout: 'fit',
    title: 'Klasifikasi Surat',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processMyGridPanel1({
                    xtype: 'gridpanel',
                    store: 'Sipas.kelas.Lookup',
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        allowDeselect: false
                    }),
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Nama Klasifikasi',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                }
                                }
                            },
                            dataIndex: 'kelas_nama',
                            text: 'Nama Klasifikasi',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Kode Klasifikasi',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                }
                                }
                            },
                            width: 160,
                            dataIndex: 'kelas_kode',
                            text: 'Kode Klasifikasi'
                        },
                        {
                            xtype: 'gridcolumn',
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Jenis',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                }
                                }
                            },
                            width: 160,
                            dataIndex: 'kelas_jenis_nama',
                            text: 'Jenis'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Sipas.kelas.Lookup'
                        }
                    ]
                })
            ],
            dockedItems: [
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
                            margins: '4 4 6 4'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    processMyGridPanel1: function(config) {
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