/*
 * File: app/view/Sipas/jabatan/penerima/available/Lookup.js
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

Ext.define('SIPAS.view.Sipas.jabatan.penerima.available.Lookup', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jabatan_penerima_available_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.button.Button',
        'Ext.toolbar.Paging'
    ],

    border: false,
    frameHeader: false,
    title: 'Daftar Penerima',
    allowDeselect: true,
    emptyText: 'Tidak Ada Data',
    store: 'Sipas.jabatan.penerima.available.Lookup',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
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
                    width: 240,
                    sortable: true,
                    dataIndex: 'jabatan_nama',
                    text: 'Nama Jabatan'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var id = record.getId(),
                            tpl = this.dataTpl || (
                            this.tpl =
                            "<div class='cell-row'><div class='cell-visual cell-visual-left'>"+
                            "<img src='server.php/sipas/staf/get_image/foto?id={staf_id}' class='img img-circle img-16'>"+
                            "</div><div class='cell-text'>"+value+"</div></div>"
                            );
                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Nama Staf',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                    this.up('gridpanel').filterHeader(this);
                                }
                        }
                    },
                    width: 240,
                    sortable: true,
                    dataIndex: 'staf_nama',
                    text: 'Nama Staf'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
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
                    width: 200,
                    sortable: true,
                    dataIndex: 'jabatan_kode',
                    text: 'Kode Jabatan'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span class="alternative">-</span>';
                        }
                    },
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
                    width: 200,
                    sortable: true,
                    dataIndex: 'unit_nama',
                    text: 'Unit Kerja'
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    hidden: true,
                    itemId: 'toolbarControl1',
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
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.jabatan.penerima.available.Lookup'
                }
            ]
        });

        me.processMyGridPanel(me);
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