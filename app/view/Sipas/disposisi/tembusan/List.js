/*
 * File: app/view/Sipas/disposisi/tembusan/List.js
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

Ext.define('SIPAS.view.Sipas.disposisi.tembusan.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_disposisi_tembusan_list',

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem'
    ],

    border: false,
    title: 'Daftar Penerima',
    emptyText: 'Tidak ada Data',
    store: 'Sipas.disposisi.tembusan.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    sortable: true,
                    dataIndex: 'disposisi_id',
                    text: 'MyColumn'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    sortable: true,
                    dataIndex: 'disposisi_surat',
                    text: 'MyColumn1'
                },
                {
                    xtype: 'datecolumn',
                    width: 160,
                    sortable: true,
                    dataIndex: 'disposisi_tanggal',
                    text: 'Tgl.Disposisi',
                    tooltip: '(Tahun-Bulan-Tanggal Jam:Menit:Detik)',
                    format: 'd M Y H:i'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Pengirim',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            sortable: true,
                            dataIndex: 'pengirim_nip',
                            text: 'NIP'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return this.gen_userdis(value);
                            },
                            width: 200,
                            sortable: true,
                            dataIndex: 'pengirim_nama',
                            text: 'Nama'
                        },
                        {
                            xtype: 'gridcolumn',
                            sortable: true,
                            dataIndex: 'pengirim_unitkerja_nama',
                            text: 'Unit Kerja'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            sortable: true,
                            dataIndex: 'pengirim_jabatan_nama',
                            text: 'Jabatan'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Penerima',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            sortable: true,
                            dataIndex: 'penerima_nip',
                            text: 'NIP'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            sortable: true,
                            dataIndex: 'penerima_nama',
                            text: 'Nama'
                        },
                        {
                            xtype: 'gridcolumn',
                            sortable: true,
                            dataIndex: 'penerima_unitkerja_nama',
                            text: 'Unit Kerja'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            sortable: true,
                            dataIndex: 'penerima_jabatan_nama',
                            text: 'Jabatan'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        padding: 2
                    },
                    items: [
                        {
                            xtype: 'tbtext'
                        }
                    ]
                }
            ]
        });

        me.processSipasdisposisitembusanList(me);
        me.callParent(arguments);
    },

    processSipasdisposisitembusanList: function(config) {
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
    },

    gen_userdis: function(val) {
        if(!val){
            return "<span style='color:darkgray'>[ mailroom ]</span>";
        }
        return val;
    }

});