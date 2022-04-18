/*
 * File: app/view/Sipas/disposisi/Lookup.js
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

Ext.define('SIPAS.view.Sipas.disposisi.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_disposisi_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    height: 500,
    width: 700,
    layout: 'fit',
    title: 'Pilih Disposisi',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    border: false,
                    header: false,
                    store: 'Sipas.disposisi.Lookup',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'datecolumn',
                            width: 160,
                            dataIndex: 'disposisi_tanggal',
                            text: 'Tgl.Disposisi',
                            format: 'd M Y H:i'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'perintah_text',
                            text: 'Isi Disposisi'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'pengirim_nama',
                            text: 'Dari'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'surat_nomor',
                            text: 'No.Surat'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    hidden: true,
                    defaultButtonUI: 'default',
                    items: [
                        {
                            xtype: 'tbfill'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
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
                            disabled: true,
                            itemId: 'buttonPilih'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});