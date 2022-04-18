/*
 * File: app/view/Sipas/pelaporan/report/surat/Masuk.js
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

Ext.define('SIPAS.view.Sipas.pelaporan.report.surat.Masuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_pelaporan_report_surat_masuk',

    requires: [
        'SIPAS.view.Sipas.com.reportfilter.Rekap',
        'SIPAS.view.Sipas.com.Iframe',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Print',
        'SIPAS.view.Sipas.com.button.Download',
        'Ext.toolbar.Toolbar',
        'Ext.form.FieldContainer',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    title: 'Laporan Rekap Surat Masuk',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'sipas_com_reportfilter_rekap'
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
                            xtype: 'sipas_com_button_download',
                            itemId: 'btnDownloadPdf',
                            text: 'Download Pdf'
                        },
                        {
                            xtype: 'sipas_com_button_download',
                            itemId: 'btnDownloadExcel',
                            text: 'Download Excel'
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