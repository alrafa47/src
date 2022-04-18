/*
 * File: app/view/Sipas/dashboard/board/chart/Pane.js
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

Ext.define('SIPAS.view.Sipas.dashboard.board.chart.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_dasboard_board_chart_pane',

    requires: [
        'Ext.chart.Chart',
        'Ext.util.Point',
        'Ext.chart.series.Pie',
        'Ext.chart.Legend'
    ],

    title: 'Grafik Laporan Bulan Ini',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'chart',
                    flex: 1,
                    height: 250,
                    width: 400,
                    animate: true,
                    insetPadding: 30,
                    store: 'Sipas.dashboard.board.chart.List',
                    series: [
                        {
                            type: 'pie',
                            highlight: {
                                segment: {
                                    margin: 20
                                }
                            },
                            label: {
                                field: 'name',
                                renderer: function(label, storeItem, item, i, display, animate, index){
                                    var v = label;
                                    switch(v){
                                        case 'surat_masuk': v = 'Surat Masuk'; break;
                                        case 'surat_keluar': v = 'Surat Keluar'; break;
                                        case 'surat_edaran': v = 'Surat Edaran'; break;
                                        case 'surat_pengajuan': v = 'Surat Pengajuan'; break;
                                    }
                                    return v;
                                },
                                display: 'rotate',
                                contrast: true,
                                font: '12px Arial'
                            },
                            showInLegend: true,
                            tips: {
                                width: 140,
                                renderer: function(storeItem, item){
                                    var r = storeItem,
                                        total = r.store.sum('data')
                                        precentage = Math.round(r.get('data') / total * 100);
                                    this.setTitle(r.get('data') +'/'+ total +' ('+ precentage + '%)');
                                }
                            },
                            angleField: 'data'
                        }
                    ],
                    legend: {

                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});