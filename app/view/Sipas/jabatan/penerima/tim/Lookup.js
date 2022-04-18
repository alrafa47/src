/*
 * File: app/view/Sipas/jabatan/penerima/tim/Lookup.js
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

Ext.define('SIPAS.view.Sipas.jabatan.penerima.tim.Lookup', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jabatan_penerima_tim_lookup',

    requires: [
        'SIPAS.view.Sipas.jabatan.penerima.tim.anggota.List',
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.grid.column.Column',
        'Ext.grid.Panel',
        'Ext.button.Button',
        'Ext.grid.View'
    ],

    title: 'Kelompok',
    emptyText: 'Tidak Ada Data',
    store: 'Sipas.jabatan.penerima.tim.Lookup',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var jml = record.get('jabatan_tim_jumlah')?record.get('jabatan_tim_jumlah'):0;

                        return value +' <span class="alternative">('+jml+')</span>';
                    },
                    filterable: true,
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Kelompok',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                                        this.up('gridpanel').filterHeader(this);
                                    }
                        }
                    },
                    featureable: true,
                    featureName: 'jabatan_kelompok',
                    width: 200,
                    sortable: true,
                    dataIndex: 'jabatan_tim_nama',
                    text: 'Kelompok'
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'right',
                    width: 320,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'sipas_jabatan_penerima_tim_anggota_list',
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
                    hidden: true,
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
    }

});