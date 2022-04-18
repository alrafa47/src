/*
 * File: app/view/Sipas/surat/penyetuju/Popup.js
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

Ext.define('SIPAS.view.Sipas.surat.penyetuju.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_surat_penyetuju_popup',

    requires: [
        'SIPAS.view.Sipas.com.button.Print',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    width: 600,
    title: 'Daftar Penerima',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    border: false,
                    cls: 'sipas_disposisi_penerima_detail_form',
                    autoScroll: true,
                    layout: 'fit',
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            itemId: 'listPenerima',
                            margin: '0 10 10 10',
                            header: false,
                            title: 'My Grid Panel',
                            emptyText: 'Tidak ada Data',
                            hideHeaders: true,
                            store: 'Sipas.surat.penyetuju.Popup',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 150,
                                    dataIndex: 'unit_nama',
                                    text: 'Unit'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf'),
                                            modelJabatan = Ext.ModelManager.getModel('SIPAS.model.Sipas.Jabatan'),
                                            is_terima = record.get('surat_stack_isterima'),
                                            is_baca = record.get('surat_stack_isbaca'),
                                            is_terus = record.get('surat_stack_isterus'),
                                            terima_tgl = Ext.util.Format.date(record.get('surat_stack_terima_tgl'), 'd M Y H:i'),
                                            baca_tgl = Ext.util.Format.date(record.get('surat_stack_baca_tgl'), 'd M Y H:i'),
                                            terus_tgl = Ext.util.Format.date(record.get('surat_stack_terus_tgl'), 'd M Y H:i'),
                                            url = record.get('staf_image_preview'),
                                            staf_nama = record.get('staf_nama'),
                                            staf_jabatan = record.get('jabatan_nama'),
                                            staf_unit = record.get('unit_nama'),
                                            supporttext = '',
                                            jabatan_id = record.get('jabatan_penerima_id'),
                                            jabatan_nama = record.get('jabatan_penerima_nama');

                                        if(jabatan_id) {
                                            return '<div class="margin-left-8">'+modelJabatan.renderJabatanAdditional(jabatan_id, jabatan_nama, null)+'</div>';;
                                        } else {
                                            return modelPegawai.renderPegawaiAdditional(url, staf_nama, staf_jabatan, staf_unit, supporttext, true);
                                        }
                                    },
                                    dataIndex: 'staf_nama',
                                    text: 'Penerima',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf'),
                                            is_terima = record.get('surat_stack_isterima'),
                                            is_baca = record.get('surat_stack_isbaca'),
                                            is_terus = record.get('surat_stack_isterus'),
                                            terima_tgl = Ext.util.Format.date(record.get('surat_stack_terima_tgl'), 'd M Y H:i'),
                                            baca_tgl = Ext.util.Format.date(record.get('surat_stack_baca_tgl'), 'd M Y H:i'),
                                            terus_tgl = Ext.util.Format.date(record.get('surat_stack_terus_tgl'), 'd M Y H:i'),
                                            url = record.get('staf_image_preview'),
                                            staf_nama = record.get('staf_nama'),
                                            staf_jabatan = record.get('jabatan_nama'),
                                            staf_unit = record.get('unit_nama'),
                                            is_cabut = record.get('disposisi_masuk_cabut_tgl') ? Ext.util.Format.date(record.get('disposisi_masuk_cabut_tgl'), 'd M Y H:i') : '',
                                            supporttext = '';

                                        if (is_terima != '1'){
                                            supporttext = '<div class="cell-text"><div class="subtext danger">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                            '<i class="icon ion-md-timer red-600-i"></i>'+
                                            '</span> Belum menerima'+
                                            '</div></div>';
                                        }

                                        if (is_terima == '1'){
                                            supporttext = '<div class="cell-text"><div class="subtext warning">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                            '<i class="icon ion-md-mail amber-600-i"></i>'+
                                            '</span>Diterima'+
                                            '</div><div class="supporttext supporttext-dark">Pada '+terima_tgl+'</div></div>';
                                        }

                                        if (is_baca == '1'){
                                            supporttext = '<div class="cell-text"><div class="subtext primary">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                            '<i class="icon ion-md-mail-open blue-600-i"></i>'+
                                            '</span>Dibaca'+
                                            '</div><div class="supporttext supporttext-dark">Pada '+baca_tgl+'</div></div>';
                                        }

                                        if (is_terus == '1'){
                                            supporttext = '<div class="cell-text"><div class="subtext info">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                            '<i class="icon ion-md-send green-600-i"></i>'+
                                            '</span>Diteruskan'+
                                            '</div><div class="supporttext supporttext-dark">Pada '+terus_tgl+'</div></div>';
                                        }

                                        if (is_cabut){
                                            supporttext = '<div class="cell-text"><div class="subtext danger">'+
                                            '<span class="badge badge-solid margin-right-4">'+
                                            '<i class="icon ion-md-close red-600-i"></i>'+
                                            '</span>Dibatalkan'+
                                            '</div><div class="supporttext supporttext-dark">Pada '+is_cabut+'</div></div>';
                                        }
                                        return supporttext;
                                    },
                                    dataIndex: 'staf_nama',
                                    text: 'Status',
                                    flex: 1
                                }
                            ],
                            features: [
                                {
                                    ftype: 'grouping',
                                    enableGroupingMenu: false,
                                    enableNoGroups: false,
                                    groupHeaderTpl: Ext.create('Ext.XTemplate', 
                                        '<div><tpl if="name"> {name} <tpl else>(Tidak ada unit)</tpl></div>{[this.render(this, values)]}',
                                        {
                                            render: function(scope, values) {
                                                var records = values.rows,
                                                    record = records[0],
                                                    setuju = record && record.get('surat_setuju'),
                                                    setuju_tgl = Ext.util.Format.date(record && record.get('surat_setuju_tgl'), 'd M Y H:i'),
                                                    penyetuju_nama = '',
                                                    sub = '',
                                                    support = '',
                                                    tpl = new Ext.XTemplate([
                                                    '<div class="cell-text">',
                                                    '<div class="subtext">{subtext}</div>',
                                                    '<div class="supporttext supporttext-dark smaller-0-5">{supporttext}</div>',
                                                    '</div>'
                                                    ]);

                                                if (setuju == '2'){
                                                    //     record.getStafPenyetuju(function(r){
                                                    //         penyetuju_nama = r.get('staf_nama');
                                                    //     });
                                                    sub = '<span class="info smaller-0-75">'+
                                                    '<span class="badge badge-solid margin-right-4">'+
                                                    '<i class="icon ion-md-checkmark green-600-i"></i>'+
                                                    //             '</span>Surat diterima oleh '+penyetuju_nama+
                                                    '</span>Surat diterima pada '+setuju_tgl+
                                                    '</span>';
                                                    //     support = '<span class="smaller-0-75 magin-left-16">Pada '+setuju_tgl+'</div>';
                                                } else if (setuju == '4'){
                                                    //     record.getStafPenyetuju(function(r){
                                                    //         penyetuju_nama = r.get('staf_nama');
                                                    //     });
                                                    sub = '<span class="danger smaller-0-75">'+
                                                    '<span class="badge badge-solid margin-right-4">'+
                                                    '<i class="icon ion-md-close red-600-i"></i>'+
                                                    //             '</span>Surat diterima oleh '+penyetuju_nama+
                                                    '</span>Surat ditolak pada '+setuju_tgl+
                                                    '</span>';
                                                    //     support = '<span class="smaller-0-75 magin-left-16">Pada '+setuju_tgl+'</div>';
                                                } else {
                                                    sub = '<span class="alternative smaller-0-75">'+
                                                    '<span class="badge badge-solid margin-right-4">'+
                                                    '<i class="icon ion-md-timer grey-600-i"></i>'+
                                                    '</span>Belum menerima'+
                                                    '</span>';
                                                }
                                                return tpl.apply({
                                                    subtext: sub,
                                                    supporttext: support
                                                });
                                            }
                                        }
                                    ),
                                    hideGroupedHeader: true
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            itemId: 'listPenerima1',
                            margin: '0 10 10 10',
                            header: false,
                            title: 'My Grid Panel',
                            emptyText: 'Tidak ada Data',
                            hideHeaders: true,
                            store: 'Sipas.surat.penyetuju.Popup',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 150,
                                    dataIndex: 'unit_nama',
                                    text: 'Unit'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf'),
                                            modelJabatan = Ext.ModelManager.getModel('SIPAS.model.Sipas.Jabatan'),
                                            is_terima = record.get('surat_stack_isterima'),
                                            is_baca = record.get('surat_stack_isbaca'),
                                            is_terus = record.get('surat_stack_isterus'),
                                            terima_tgl = Ext.util.Format.date(record.get('surat_stack_terima_tgl'), 'd M Y H:i'),
                                            baca_tgl = Ext.util.Format.date(record.get('surat_stack_baca_tgl'), 'd M Y H:i'),
                                            terus_tgl = Ext.util.Format.date(record.get('surat_stack_terus_tgl'), 'd M Y H:i'),
                                            url = record.get('staf_image_preview'),
                                            staf_nama = record.get('staf_nama'),
                                            staf_jabatan = record.get('jabatan_nama'),
                                            staf_unit = record.get('unit_nama'),
                                            jabatan_id = record.get('jabatan_penerima_id'),
                                            jabatan_nama = record.get('jabatan_penerima_nama'),
                                            supporttext = '';

                                        //     if (is_terima != '1'){
                                        // 		supporttext = '<span class="danger">'+
                                        //                 '<span class="badge badge-solid margin-right-4">'+
                                        //                     '<i class="icon ion-md-timer red-600-i"></i>'+
                                        //                 '</span> Belum menerima'+
                                        //             '</span>';
                                        //         supporttext = '<span class="danger">Belum menerima</span>';
                                        //     }

                                        //     if (is_terima == '1'){
                                        //         supporttext = '<span class="warning">'+
                                        //                 '<span class="badge badge-solid margin-right-4">'+
                                        //                     '<i class="icon ion-md-mail amber-600-i"></i>'+
                                        //                 '</span> Diterima pada '+terima_tgl+
                                        //             '</span>';
                                        // 		supporttext = '<span class="warning">Diterima pada '+terima_tgl+'</span>';
                                        //     }

                                        //     if (is_baca == '1'){
                                        //         supporttext = '<span class="primary">'+
                                        //                 '<span class="badge badge-solid margin-right-4">'+
                                        //                     '<i class="icon ion-md-mail-open blue-600-i"></i>'+
                                        //                 '</span> Dibaca pada '+baca_tgl+
                                        //             '</span>';
                                        // 		supporttext = '<span class="primary">Dibaca pada '+baca_tgl+'</span>';
                                        //     }

                                        //     if (is_terus == '1'){
                                        //         supporttext = '<span class="info">'+
                                        //                 '<span class="badge badge-solid margin-right-4">'+
                                        //                     '<i class="icon ion-md-send green-600-i"></i>'+
                                        //                 '</span> Diteruskan pada '+terus_tgl+
                                        //             '</span>';
                                        // 		supporttext = '<span class="info">Diteruskan pada '+terus_tgl+'</span>';
                                        //     }

                                        if(jabatan_id) {
                                            return modelJabatan.renderJabatanAdditional(jabatan_id, jabatan_nama, null);
                                        } else {
                                            return modelPegawai.renderPegawaiAdditional(url, staf_nama, staf_jabatan, staf_unit, supporttext, true);
                                        }

                                    },
                                    dataIndex: 'staf_nama',
                                    text: 'Penerima',
                                    flex: 1
                                }
                            ],
                            features: [
                                {
                                    ftype: 'grouping',
                                    enableGroupingMenu: false,
                                    enableNoGroups: false,
                                    groupHeaderTpl: [
                                        '{name}'
                                    ],
                                    hideGroupedHeader: true
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    flex: 1,
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
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'surat_ikeluar_print_penerima',
                            featureable: true,
                            featureName: 'print_penerima_ikeluar',
                            roleable: true,
                            roleName: 'print_penerima_ikeluar'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});