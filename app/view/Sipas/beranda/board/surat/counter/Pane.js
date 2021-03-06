/*
 * File: app/view/Sipas/beranda/board/surat/counter/Pane.js
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

Ext.define('SIPAS.view.Sipas.beranda.board.surat.counter.Pane', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_beranda_board_surat_counter_pane',

    requires: [
        'SIPAS.view.Sipas.com.form.field.Month',
        'SIPAS.view.Sipas.com.button.Refresh',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.grid.column.Number',
        'Ext.grid.View'
    ],

    header: false,
    title: 'Rekap Jumlah Surat Yang Diterima',
    store: 'Sipas.beranda.surat.counter.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbtext',
                            text: '<i></i><b style="color:#04408c">Rekap Jumlah Surat Yang Diterima</b>'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_form_field_month',
                            itemId: 'datefieldMonth',
                            width: 125,
                            emptyText: 'Bulan',
                            hideTrigger: true
                        },
                        {
                            xtype: 'sipas_com_button_refresh'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'name',
                    text: 'Nama'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'week1',
                    text: 'M-1',
                    tooltip: 'Jumlah Minggu 1',
                    flex: 1,
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'week2',
                    text: 'M-2',
                    tooltip: 'Jumlah Minggu 2',
                    flex: 1,
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'week3',
                    text: 'M-3',
                    tooltip: 'Jumlah Minggu 3',
                    flex: 1,
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'week4',
                    text: 'M-4',
                    tooltip: 'Jumlah Minggu 4',
                    flex: 1,
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'week5',
                    text: 'M-5',
                    tooltip: 'Jumlah Minggu 5',
                    flex: 1,
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'count',
                    text: 'Total',
                    flex: 1,
                    format: '0'
                }
            ]
        });

        me.callParent(arguments);
    }

});