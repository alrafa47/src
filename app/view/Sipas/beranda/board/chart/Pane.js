/*
 * File: app/view/Sipas/beranda/board/chart/Pane.js
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

Ext.define('SIPAS.view.Sipas.beranda.board.chart.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_beranda_board_chart_pane',

    requires: [
        'SIPAS.view.Sipas.com.form.field.Month',
        'SIPAS.view.Sipas.com.button.Refresh',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.chart.Chart',
        'Ext.util.Point',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.Legend'
    ],

    filterMonth: 'Bulan',
    header: false,
    title: 'Grafik Surat Yang Diterima',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 8,
                            left: 4
                        }
                    },
                    items: [
                        {
                            xtype: 'tbtext',
                            text: '<i></i><b style="color:#04408c">Grafik notifikasi</b>'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_form_field_month',
                            itemId: 'datefieldMonth',
                            width: 125,
                            emptyText: 'Bulan',
                            matchFieldWidth: true
                        },
                        {
                            xtype: 'sipas_com_button_refresh'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'chart',
                    flex: 1,
                    animate: true,
                    store: 'Sipas.beranda.chart.Line',
                    axes: [
                        {
                            type: 'Numeric',
                            fields: [
                                'data1',
                                'data2',
                                'data3',
                                'data4',
                                'data5'
                            ],
                            label: {
                                renderer: function(v) { return v; }
                            },
                            grid: true,
                            majorTickSteps: 2,
                            minorTickSteps: 1,
                            title: 'Jumlah',
                            adjustMaximumByMajorUnit: true,
                            adjustMinimumByMajorUnit: true,
                            decimals: 0,
                            minimum: 0,
                            position: 'left'
                        },
                        {
                            type: 'Category',
                            fields: [
                                'week'
                            ],
                            label: {
                                rotate: {
                                    degrees: -45
                                }
                            },
                            grid: true,
                            title: 'Minggu',
                            width: 400,
                            position: 'bottom'
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            highlight: {
                                fill: '#000',
                                radius: 2,
                                'stroke-width': 1,
                                stroke: '#fff'
                            },
                            tips: {
                                trackMouse: true,
                                style: 'background: #FFF',
                                height: 20,
                                width: 150,
                                renderer: function(storeItem, item) {
                                    var title = item.series.title;
                                    this.setTitle(title + ' ' + storeItem.get('week') + ' (' + storeItem.get(item.series.yField) +')');
                                }
                            },
                            title: 'Disposisi',
                            axis: 'left',
                            xField: 'week',
                            yField: 'data1',
                            markerConfig: {
                                radius: 2
                            },
                            style: {
                                'stroke-width': 2
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                fill: '#000',
                                radius: 2,
                                'stroke-width': 1,
                                stroke: '#fff'
                            },
                            tips: {
                                trackMouse: true,
                                style: 'background: #FFF',
                                height: 20,
                                width: 150,
                                renderer: function(storeItem, item) {
                                    var title = item.series.title;
                                    this.setTitle(title + ' ' + storeItem.get('week') + ' (' + storeItem.get(item.series.yField) +')');
                                }
                            },
                            title: 'Surat Masuk',
                            axis: 'left',
                            xField: 'week',
                            yField: 'data2',
                            markerConfig: {
                                radius: 2
                            },
                            style: {
                                'stroke-width': 2
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                fill: '#000',
                                radius: 2,
                                'stroke-width': 1,
                                stroke: '#fff'
                            },
                            tips: {
                                trackMouse: true,
                                style: 'background: #FFF',
                                height: 20,
                                width: 150,
                                renderer: function(storeItem, item) {
                                    var title = item.series.title;
                                    this.setTitle(title + ' ' + storeItem.get('week') + ' (' + storeItem.get(item.series.yField) +')');
                                }
                            },
                            title: 'Koreksi Surat',
                            axis: 'left',
                            xField: 'week',
                            yField: 'data3',
                            markerConfig: {
                                radius: 2
                            },
                            style: {
                                'stroke-width': 2
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                fill: '#000',
                                radius: 2,
                                'stroke-width': 1,
                                stroke: '#fff'
                            },
                            tips: {
                                trackMouse: true,
                                style: 'background: #FFF',
                                height: 20,
                                width: 150,
                                renderer: function(storeItem, item) {
                                    var title = item.series.title;
                                    this.setTitle(title + ' ' + storeItem.get('week') + ' (' + storeItem.get(item.series.yField) +')');
                                }
                            },
                            title: 'Status Koreksi',
                            axis: 'left',
                            xField: 'week',
                            yField: 'data4',
                            markerConfig: {
                                radius: 2
                            },
                            style: {
                                'stroke-width': 2
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                fill: '#000',
                                radius: 2,
                                'stroke-width': 1,
                                stroke: '#fff'
                            },
                            tips: {
                                trackMouse: true,
                                style: 'background: #FFF',
                                height: 20,
                                width: 150,
                                renderer: function(storeItem, item) {
                                    var title = item.series.title;
                                    this.setTitle(title + ' ' + storeItem.get('week') + ' (' + storeItem.get(item.series.yField) +')');
                                }
                            },
                            title: 'Nota Dinas',
                            axis: 'left',
                            xField: 'week',
                            yField: 'data5',
                            markerConfig: {
                                radius: 2
                            },
                            style: {
                                'stroke-width': 2
                            }
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