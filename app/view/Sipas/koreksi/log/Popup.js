/*
 * File: app/view/Sipas/koreksi/log/Popup.js
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

Ext.define('SIPAS.view.Sipas.koreksi.log.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_koreksi_log_popup',

    requires: [
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column'
    ],

    height: 400,
    width: 700,
    layout: 'fit',
    title: 'Log Aktivitas',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    autoScroll: true,
                    layout: 'fit',
                    frameHeader: false,
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            border: false,
                            itemId: 'listLog',
                            header: false,
                            title: 'My Grid Panel',
                            disableSelection: true,
                            hideHeaders: true,
                            store: 'Sipas.koreksi.masuk.log.Popup',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        modelStaf = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');
                                        return '<div class="margin-left-8">'+modelStaf.renderPegawai(value, record)+'</div>';
                                    },
                                    dataIndex: 'penerima_nama',
                                    text: 'ID',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var isbaca = record.get('disposisi_masuk_log_isbaca'),
                                            status = record.get('disposisi_masuk_log_status'),
                                            tipe = record.get('disposisi_masuk_log_tipe'),
                                            tgl = Ext.util.Format.date(record.get('disposisi_masuk_log_tgl'), 'd M Y H:i'),
                                            pesan = record.get('disposisi_masuk_log_pesan'),
                                            uraian = '',
                                            tpl = new Ext.XTemplate(['<div class="margin-left-8"><div class="cell-text">',
                                            '<div class="subtext {color}">',
                                            '<span class="badge badge-solid margin-right-4">',
                                            '<i class="{icon}"></i>',
                                            '</span> {word}',
                                            '</div>',
                                            '<div class="supporttext supporttext-dark">{uraian}</div>',
                                            '<div class="supporttext supporttext-dark">Pada '+tgl+'</div>',
                                            '</div></div>'
                                            ]);

                                        if(pesan){
                                            pesan = pesan;
                                        }else{
                                            pesan = '<span class="alternative">(Tidak ada komentar)</span>';
                                        }


                                        if(isbaca === '1'){
                                            return tpl.apply({
                                                color: '',
                                                icon: 'icon ion-md-mail-open blue-700-i',
                                                word: 'Membaca draf'
                                            });
                                        }else if(status === 2){
                                            return tpl.apply({
                                                color: 'green-700-i',
                                                icon: 'icon ion-md-checkmark green-700-i',
                                                word: 'Mengubah status menjadi disetujui',
                                                uraian: pesan
                                            });
                                        }else if(status === 4){
                                            return tpl.apply({
                                                color: 'red-700-i',
                                                icon: 'icon ion-md-close red-700-i',
                                                word: 'Mengubah status menjadi ditolak',
                                                uraian: pesan
                                            });
                                        } else if (tipe == 7){
                                            return tpl.apply({
                                                color: '',
                                                icon: 'icon ion-md-text supporttext-dark',
                                                word: 'Di ingatkan oleh asisten',
                                            });
                                        } else if (tipe == 8){
                                            return tpl.apply({
                                                color: '',
                                                icon: 'icon ion-md-text supporttext-dark',
                                                word: 'Membaca pesan yang di ingatkan asisten',
                                            });
                                        }
                                    },
                                    dataIndex: 'penerima_nama',
                                    text: 'Nama',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});