/*
 * File: app/view/Sipas/korespondensi/internal/Popup.js
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

Ext.define('SIPAS.view.Sipas.korespondensi.internal.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_korespondensi_internal_popup',

    requires: [
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Print',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.button.Button',
        'Ext.toolbar.TextItem'
    ],

    height: 446,
    width: 750,
    layout: 'fit',
    title: 'Korespondensi Surat',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'form',
                    dock: 'top',
                    maxHeight: 200,
                    collapsible: true,
                    header: false,
                    title: 'Informasi Korespondensi',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        padding: 6
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 3,
                            hidden: true,
                            padding: 5,
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'korespondensi_kode',
                                    fieldLabel: 'No.Korespondensi',
                                    labelSeparator: ' ',
                                    name: 'korespondensi_nomor',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'korespondensi_jumlah_data',
                                    fieldLabel: 'Jumlah Surat',
                                    labelSeparator: ' ',
                                    name: 'korespondensi_jumlah',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 4,
                            hidden: true,
                            padding: 5,
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'korespondensi_tanggal_mulai',
                                    fieldLabel: 'Tgl. Mulai',
                                    name: 'korespondensi_tgl_mulai',
                                    editable: false,
                                    hideTrigger: true,
                                    format: 'd M Y',
                                    submitFormat: 'd M Y H:i'
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'korespondensi_tanggal_selesai',
                                    fieldLabel: 'Tgl. Selesai',
                                    name: 'korespondensi_tgl_selesai',
                                    editable: false,
                                    hideTrigger: true,
                                    format: 'd M Y',
                                    submitFormat: 'd M Y H:i:s'
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            margins: '0 10 10 10',
                            itemId: 'korespondensiInfo'
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'displayfield',
                            margins: '0 10 10 100',
                            hidden: true,
                            itemId: 'korespondensiLegenda'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
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
                            xtype: 'sipas_com_button_print',
                            text: 'Cetak Laporan'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
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
                        }
                    },
                    items: [
                        {
                            xtype: 'tbtext',
                            hidden: true,
                            text: '[<i class="icon ion-md-arrow-round-back indigo-700-i"></i>] Surat Masuk'
                        },
                        {
                            xtype: 'tbtext',
                            hidden: true,
                            text: '[<i class="icon ion-md-arrow-round-forward amber-700-i"></i>] Surat Keluar'
                        },
                        {
                            xtype: 'tbfill'
                        }
                    ]
                }
            ],
            items: [
                me.processMyGridPanel({
                    xtype: 'gridpanel',
                    border: false,
                    width: 150,
                    header: false,
                    allowDeselect: true,
                    columnLines: false,
                    disableSelection: true,
                    emptyText: 'Tidak Ada Data',
                    sortableColumns: false,
                    store: 'Sipas.korespondensi.internal.surat.List',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return "<div class='subtext'>"+value+"</div><div class='supporttext supporttext-dark'>"+Ext.util.Format.date(record.get('surat_properti_buat_tgl'), 'd M Y H:i')+"</div>";
                            },
                            width: 140,
                            dataIndex: 'surat_registrasi',
                            text: 'No.Registrasi'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var surat_model = record.get('surat_model'),
                                    modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                                if (surat_model === 3){
                                    return modelSurat.renderSurat(value, record, 3);
                                } else if (surat_model === 4){
                                    return modelSurat.renderSurat(value, record, 4);
                                } else if (surat_model === 6){
                                    return modelSurat.renderSurat(value, record, 6);
                                }
                            },
                            width: 420,
                            dataIndex: 'surat_perihal',
                            text: 'Surat'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var modelDefault = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                                return modelDefault.renderStatusSelesai(value, record, 'Pada '+Ext.util.Format.date(record.get('surat_selesai_tgl'), 'd M Y H:i'));
                            },
                            width: 200,
                            sortable: false,
                            dataIndex: 'surat_isselesai',
                            text: 'Status'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return value;
                            },
                            width: 200,
                            dataIndex: 'surat_induk_nomor',
                            text: 'No.Surat Referensi'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return value;
                            },
                            hidden: true,
                            width: 300,
                            dataIndex: 'surat_perihal',
                            text: 'Perihal'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return value;
                            },
                            hidden: true,
                            width: 300,
                            dataIndex: 'unit_nama',
                            text: 'Unit'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return value;
                            },
                            hidden: true,
                            width: 80,
                            dataIndex: 'surat_agenda',
                            text: 'No.Agenda'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(!value) return "<span class='alternative'>-</span>";
                                else return '<span class="blue-700-i">'+value+'</span>';
                            },
                            hidden: true,
                            width: 200,
                            dataIndex: 'surat_nomor',
                            text: 'No.Surat'
                        },
                        {
                            xtype: 'datecolumn',
                            filter: {
                                type: 'date'
                            },
                            hidden: true,
                            width: 100,
                            sortable: false,
                            dataIndex: 'surat_tanggal',
                            text: 'Tgl.Surat',
                            tooltip: '(Tanggal-Bulan-Tahun)',
                            format: 'd M Y'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'label',
                                    margins: '3',
                                    cls: 'bold',
                                    text: 'Daftar Surat',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onLabelAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'tbseparator',
                                    hidden: true
                                },
                                {
                                    xtype: 'sipas_com_button_view',
                                    disabled: true,
                                    hidden: true
                                }
                            ]
                        }
                    ]
                })
            ]
        });

        me.callParent(arguments);
    },

    processMyGridPanel: function(config) {
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

    onLabelAfterRender: function(component, eOpts) {
        component.setText(component.up('panel').title);
    }

});