/*
 * File: app/view/Sipas/dashboard/board/surat/masuk/toplast/Pane.js
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

Ext.define('SIPAS.view.Sipas.dashboard.board.surat.masuk.toplast.Pane', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_dashboard_board_surat_masuk_toplast_pane',

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View'
    ],

    title: '5 Surat Masuk Terbaru Bulan Ini',
    hideHeaders: true,
    store: 'Sipas.dashboard.board.surat.masuk.toplast.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                        var val = [
                        "<span>",
                        Ext.Date.format(record.get('surat_pembuatan_tanggal'), 'd M Y H:i'),
                        "<span class='bold margin-left-4 margin-right-4'>",
                        record.get('surat_registrasi'),
                        "</span>",
                        "<span>",
                        record.get('surat_masuk_pengirim'),
                        "</span> - ",
                        "<span class='alternative italic'>",
                        record.get('surat_masuk_perihal'),
                        "</span>",
                        "</span>"
                        ].join('');
                        return val;
                    },
                    sortable: true,
                    dataIndex: 'surat_masuk_pengirim',
                    text: 'Surat',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    hidden: true,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'surat_masuk_tanggal',
                    text: 'Tanggal Surat',
                    format: 'd M Y H:i'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    sortable: true,
                    dataIndex: 'surat_masuk_agenda',
                    text: 'No. Agenda'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    sortable: true,
                    dataIndex: 'surat_masuk_pengirim',
                    text: 'Pengirim'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    sortable: true,
                    dataIndex: 'surat_masuk_perihal',
                    text: 'Perihal',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});