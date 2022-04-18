/*
 * File: app/view/Sipas/disposisi/riwayat/detail/penerima/List.js
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

Ext.define('SIPAS.view.Sipas.disposisi.riwayat.detail.penerima.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_disposisi_riwayat_detail_penerima_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Print',
        'Ext.grid.column.Column',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    header: false,
    title: 'Penerima Disposisi',
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    hideHeaders: true,
    store: 'Sipas.disposisi.riwayat.detail.penerima.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store)
                {
                    if (record.get('disposisi_masuk_aksi') && !record.get("disposisi_masuk_aksi_baca_tgl")){         
                        return "x-grid-row-bold";
                    }
                }
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var id = record.getId(),
                            jabatan = record.get('disposisi_masuk_penerima_jabatan_nama') ? record.get('disposisi_masuk_penerima_jabatan_nama') : '(Tidak ada jabatan)',
                            unit = record.get('disposisi_masuk_penerima_unit_nama') ? record.get('disposisi_masuk_penerima_unit_nama') : '(Tidak ada unit)',
                            tpl = this.dataTpl || (
                            this.tpl =
                            "<div class='cell-col'><div class='cell-row margin-left-12'><div class='cell-visual cell-visual-left'>"+
                            "<img src='server.php/sipas/staf/get_image/foto?id={disposisi_masuk_penerima_id}' class='img img-circle img-32'>"+
                            "</div>"+
                            "<div class='cell-text'>"+
                            "<div class='subtext ellipsis'>"+record.get('disposisi_masuk_penerima_nama')+"</div>"+
                            //         "<div>"+jabatan+"</div>"+
                            "<div class='supporttext supporttext-dark ellipsis'>"+jabatan+" - "+unit+"</div>"+
                            "</div></div></div>"
                            );
                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    width: 300,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_penerima_nama',
                    text: 'Pegawai',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var tglbkr = record.get('disposisi_masuk_berkasterima_tgl'),
                            status = '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-mail"></i></span>Belum dibaca</span>',
                            berkas = '',
                            tindakan = '',
                            tpl = '',
                            cabut = '';

                        if(record.get('disposisi_masuk_isberkasterima') === 0){
                            berkas = '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-copy"></i></span><span class="alternative">Berkas belum diterima</span>';
                        }else if(record.get('disposisi_masuk_isberkasterima') === 1){
                            berkas = '<span class="badge badge-solid margin-right-4 info"><i class="icon ion-md-copy green-700-i"></i></span><span class="green-500-i">Berkas diterima pada '+Ext.util.Format.date(tglbkr, 'd M Y H:i')+'</span>';
                        }

                        if(value === 1){
                            status = '<span class="primary"><span class="badge badge-solid margin-right-4"><i class="icon ion-md-mail-open blue-500-i"></i></span>Dibaca pada ' + Ext.util.Format.date(record.get('disposisi_masuk_baca_tgl'), 'd M Y H:i')+'</span>';
                        }

                        if(record.get('disposisi_masuk_aksi') !== null){
                            if(record.get('disposisi_masuk_pesan') === null){
                                tindakan = '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-text"></i></span>' +record.get('aksi_nama');
                            }else{
                                tindakan = '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-text"></i></span>' +record.get('aksi_nama') + ', ' + record.get('disposisi_masuk_pesan');
                            }
                        }

                        if(record.get('disposisi_masuk_iscabut') === 1){
                            cabut = '<span class="badge badge-solid margin-right-4"><i class="icon ion-md-document red-700-i"></i></span><span class="danger">Disposisi ini telah direvisi</span><div class="supporttext supporttext-dark">Pada '+Ext.util.Format.date(record.get('disposisi_cabut_tgl'), 'd M Y H:i')+'</div>';
                        }

                        if(record.get('disposisi_masuk_istembusan') === 1)
                        {
                            if(record.get('disposisi_masuk_isberkas') === 1){
                                tpl = '<div class="supporttext supporttext-dark">'+cabut + '<span class="badge badge-solid margin-right-4"><i class="icon ion-logo-closed-captioning"></i></span>Tembusan </div><div class="supporttext supporttext-dark">' + status + '</div><div class="supporttext supporttext-dark">' + berkas + '</div><div class="supporttext supporttext-dark">' + tindakan + '</div>';
                            }else{
                                tpl = '<div class="supporttext supporttext-dark">'+cabut + '<span class="badge badge-solid margin-right-4"><i class="icon ion-logo-closed-captioning"></i></span>Tembusan </div><div class="supporttext supporttext-dark">' + status + '</div><div class="supporttext supporttext-dark">' + tindakan + '</div>';
                            }

                        }else{
                            if(record.get('disposisi_masuk_isberkas') === 1){
                                tpl = '<div class="supporttext supporttext-dark">' + cabut + status + '</div><div class="supporttext">' + berkas + '</div><div class="supporttext supporttext-dark">' + tindakan + '</div>';
                            }else{
                                tpl = '<div class="supporttext supporttext-dark">' + cabut + status + '</div><div class="supporttext">' + tindakan + '</div>';
                            }
                        }
                        return '<div class="cell-text margin-left-12">'+tpl+'</div>';
                    },
                    sortable: true,
                    dataIndex: 'disposisi_masuk_isbaca',
                    text: 'Status',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    width: 140,
                    sortable: true,
                    dataIndex: 'disposisi_masuk_nomor',
                    text: 'Kode Terima'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    items: [
                        {
                            xtype: 'tbtext',
                            cls: 'alternative bold',
                            padding: 4,
                            text: 'Penerima'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    processMyToolbar57: function(config) {
                        if(!this.editable) return null;
                        return config;
                    },
                    dock: 'top',
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
                            languageable: true,
                            languageCode: 'riwayat_disposisi_popup_list',
                            languageMode: 'text',
                            text: '<span class="bold">Status Riwayat</span>'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'sipas_com_button_print',
                            cls: 'x-btn-bordered'
                        },
                        {
                            xtype: 'button',
                            featureable: true,
                            featureName: 'riwayat_perintah',
                            cls: 'x-btn-bordered',
                            itemId: 'buttonArahan',
                            text: 'Ubah Arahan'
                        },
                        {
                            xtype: 'button',
                            roleName: 'disposisi_batal',
                            roleable: true,
                            featureable: true,
                            featureName: 'disposisi_batal',
                            languageable: true,
                            languageCode: 'riwayat_disposisi_batal',
                            languageMode: 'text',
                            cls: 'x-btn-bordered',
                            itemId: 'buttonCabutDisposisi',
                            text: 'Batal Disposisi'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});