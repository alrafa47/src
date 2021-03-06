/*
 * File: app/view/Sipas/klise/legend/List.js
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

Ext.define('SIPAS.view.Sipas.klise.legend.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_klise_legend_list',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate'
    ],

    title: 'Legenda',
    store: 'Sipas.klise.legend.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<div class="subtext">'+value+'</div><div class="subtext alternative">'+record.get('legend_code')+'</div>';
                    },
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Legenda Surat',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    filterable: true,
                    cls: 'x-column-header-notext',
                    width: 360,
                    sortable: true,
                    dataIndex: 'legend_description',
                    text: 'Inputan'
                },
                {
                    xtype: 'gridcolumn',
                    items: {
                        xtype: 'textfield',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        this.up('gridpanel').filterHeader(this);
                        }
                        }
                    },
                    filterable: true,
                    hidden: true,
                    width: 360,
                    sortable: true,
                    dataIndex: 'legend_group',
                    text: 'Kode'
                }
            ],
            features: [
                {
                    ftype: 'grouping',
                    enableNoGroups: false,
                    groupHeaderTpl: [
                        '{name}'
                    ]
                }
            ]
        });

        me.processSipaskliselegendList(me);
        me.callParent(arguments);
    },

    processSipaskliselegendList: function(config) {
        var filters = {
            ftype: 'filters',
            encode: true,
            local: true
        };

        if (! config.features) {
            config.features=filters;
        } else {
            config.features.push(filters);
        }

        return config;
    }

});