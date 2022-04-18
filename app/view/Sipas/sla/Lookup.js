/*
 * File: app/view/Sipas/sla/Lookup.js
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

Ext.define('SIPAS.view.Sipas.sla.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_sla_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel',
        'Ext.button.Button'
    ],

    height: 400,
    minHeight: 200,
    minWidth: 200,
    width: 700,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Daftar SLA',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processMyGridPanel({
                    xtype: 'gridpanel',
                    border: false,
                    frameHeader: false,
                    allowDeselect: true,
                    emptyText: 'Tidak Ada Data',
                    store: 'Sipas.sla.Lookup',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'sla_id',
                            text: 'Id'
                        },
                        {
                            xtype: 'gridcolumn',
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                            this.up('gridpanel').filterHeader(this);
                                        }
                                }
                            },
                            width: 160,
                            dataIndex: 'sla_nama',
                            text: 'Nama',
                            flex: 1
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Sipas.sla.Lookup'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        mode: 'SINGLE'
                    })
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
                            disabled: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    processMyGridPanel: function(config) {
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