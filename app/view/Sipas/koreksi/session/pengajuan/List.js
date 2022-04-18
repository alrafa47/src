/*
 * File: app/view/Sipas/koreksi/session/pengajuan/List.js
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

Ext.define('SIPAS.view.Sipas.koreksi.session.pengajuan.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_koreksi_session_pengajuan_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    clickToView: true,
    title: 'Koreksi Tertolak',
    allowDeselect: true,
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.koreksi.session.pengajuan.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'sipas_com_button_refresh'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Sipas.koreksi.session.pengajuan.List'
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        nvalue = (value)? value : 'Keluar Eksternal';
                        return modelSurat.renderBaca(record.get('disposisi_isbaca'), nvalue, 'Tipe');
                    },
                    width: 120,
                    dataIndex: 'itipe_nama',
                    text: 'Tipe Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        nvalue = Ext.Date.format(value, 'd M Y H:i');
                        if(record.get('disposisi_isbaca')){
                            return nvalue;
                        }else{
                            return '<b>'+nvalue+'</b>';
                        }
                    },
                    filter: {
                        type: 'date'
                    },
                    filterable: true,
                    width: 120,
                    dataIndex: 'disposisi_tgl',
                    text: 'Tgl.Kirim'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelDefault = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        if(record.get('disposisi_isbaca')){
                            return modelDefault.renderStatusPenyetujuanKoreksi(value, record);
                        }else{
                            return '<b>'+modelDefault.renderStatusPenyetujuanKoreksi(value, record)+'</b>';
                        }
                    },
                    width: 160,
                    dataIndex: 'surat_setuju',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        return modelSurat.renderBaca(record.get('disposisi_isbaca'), value, 'No.Surat');
                    },
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
                    width: 200,
                    dataIndex: 'surat_nomor',
                    text: 'No. Surat'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = value,
                            badge = '<span class="badge badge-light margin-right-4" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                            subtext = "<div class='supporttext supporttext-dark'>"+record.get('surat_registrasi')+"</div>",
                            isBaca = record.get('disposisi_isbaca'),
                            modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat'),
                            valRender = modelSurat.renderBaca(isBaca, val, 'Perihal');

                        if(record.get('sifat_color')){
                            return badge+valRender+subtext;
                        }else{
                            return valRender+subtext;
                        }
                    },
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
                    width: 300,
                    dataIndex: 'surat_perihal',
                    text: 'Perihal'
                }
            ]
        });

        me.processSipaskoreksisessionpengajuanList(me);
        me.callParent(arguments);
    },

    processSipaskoreksisessionpengajuanList: function(config) {
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
    }

});