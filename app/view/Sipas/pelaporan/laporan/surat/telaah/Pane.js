/*
 * File: app/view/Sipas/pelaporan/laporan/surat/telaah/Pane.js
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

Ext.define('SIPAS.view.Sipas.pelaporan.laporan.surat.telaah.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_pelaporan_laporan_surat_telaah_pane',

    requires: [
        'SIPAS.view.Sipas.com.Iframe',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Print',
        'SIPAS.view.Sipas.com.button.Download',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    title: 'Laporan Surat Telaah',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            width: 300,
                            fieldLabel: 'Nomor Surat',
                            labelWidth: 80,
                            name: 'surat_telaah_id',
                            emptyText: 'Masukkan Nomor Surat',
                            hideTrigger: true,
                            anyMatch: true,
                            forceSelection: true,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'button',
                            cls: 'x-btn-bordered',
                            itemId: 'buttonProcess',
                            text: '<b>PROSES</b>'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_print'
                        },
                        {
                            xtype: 'sipas_com_button_download'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'sipas_com_iframe',
                    itemId: 'Iframe'
                }
            ]
        });

        me.callParent(arguments);
    }

});