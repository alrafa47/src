/*
 * File: app/view/Sipas/jabatan/Lookup.js
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

Ext.define('SIPAS.view.Sipas.jabatan.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_jabatan_lookup',

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
    title: 'Daftar Jabatan',
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
                    store: 'Sipas.jabatan.Lookup',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var id = record.getId(),
                                    tpl = this.dataTpl || (
                                    this.tpl =
                                    "<div class='cell-col'><div class='cell-row'><div class='cell-visual cell-visual-left'>"+
                                    "<div class='img img-circle img-16'><i class='bigger-1-25 icon ion-md-ribbon grey-600-i'></i></div>"+
                                    "</div><div class='cell-text'>"+value+"</div></div>"
                                    );
                                return (new Ext.Template(tpl)).apply(record.getData());
                            },
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Nama Jabatan',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                            this.up('gridpanel').filterHeader(this);
                                        }
                                }
                            },
                            width: 160,
                            dataIndex: 'jabatan_nama',
                            text: 'Nama',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Kode Jabatan',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                            this.up('gridpanel').filterHeader(this);
                                        }
                                }
                            },
                            width: 120,
                            dataIndex: 'jabatan_kode',
                            text: 'Kode Jabatan'
                        },
                        {
                            xtype: 'gridcolumn',
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Unit Kerja',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                            this.up('gridpanel').filterHeader(this);
                                        }
                                }
                            },
                            width: 160,
                            dataIndex: 'unit_nama',
                            text: 'Unit Kerja'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Sipas.jabatan.Lookup'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

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