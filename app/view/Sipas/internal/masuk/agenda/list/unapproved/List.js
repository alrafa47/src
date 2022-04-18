/*
 * File: app/view/Sipas/internal/masuk/agenda/list/unapproved/List.js
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

Ext.define('SIPAS.view.Sipas.internal.masuk.agenda.list.unapproved.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_internal_masuk_agenda_list_unapproved_list',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.View',
        'SIPAS.view.Sipas.com.button.Approve',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.Label',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View'
    ],

    clickToView: true,
    title: 'Agenda Surat Internal Masuk - Pending',
    emptyText: 'Tidak ada data',
    store: 'Sipas.internal.masuk.agenda.list.unapproved.pending.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
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
                            xtype: 'combobox',
                            itemId: 'comboStatus',
                            fieldLabel: '',
                            emptyText: 'Pilih Status',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'nama',
                            store: {
                                fields: [
                                    'value',
                                    'nama'
                                ],
                                data: [
                                    {
                                        value: 'Sipas.internal.masuk.agenda.list.unapproved.semua.List',
                                        nama: 'Surat Masuk'
                                    },
                                    {
                                        value: 'Sipas.internal.masuk.agenda.list.unapproved.pending.List',
                                        nama: 'Surat Belum Diterima'
                                    },
                                    {
                                        value: 'Sipas.internal.masuk.agenda.list.unapproved.tolak.List',
                                        nama: 'Surat Tolak'
                                    }
                                ]
                            },
                            valueField: 'value'
                        },
                        {
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            disabled: true,
                            hidden: true
                        },
                        {
                            xtype: 'sipas_com_button_approve',
                            disabled: true,
                            hidden: true,
                            text: 'Penyetujuan'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'label',
                            html: '<b>Surat belum disetujui</b>'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    filterable: true,
                    width: 150,
                    dataIndex: 'itipe_nama',
                    text: 'Tipe Surat Internal'
                },
                {
                    xtype: 'datecolumn',
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 120,
                    dataIndex: 'surat_properti_buat_tgl',
                    text: 'Tgl.Registrasi',
                    format: 'd M Y H:i'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    filterable: true,
                    hidden: true,
                    width: 120,
                    dataIndex: 'surat_registrasi',
                    text: 'No.Registrasi'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value)
                        {
                            return '<i class="icon ion-md-attach grey-700-i"></i> '+value;
                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    hidden: true,
                    width: 60,
                    dataIndex: 'surat_jumlah_dokumen',
                    text: '<i class="icon ion-md-attach grey-700-i"></i>'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var badge = '<span class="badge badge-light margin-right-4" style="background-color:'+record.get('sifat_color')+';">'+record.get('sifat_kode')+'</span>',
                            perihal = '';
                        if(record.get('surat_jumlah_dokumen') != 0){
                            perihal = ' - ('+record.get('surat_jumlah_dokumen') + ' berkas)';
                        }
                        var subtext = "<div class='supporttext'>"+record.get('surat_registrasi')+perihal+"</div>";
                        if(value){
                            if(record.get('sifat_color')){
                                return badge + value + subtext;
                            }else{
                                return value + subtext;
                            }
                        }else{
                            return '<span style="color:#999999;">-</span>' + subtext;
                        }
                    },
                    filterable: true,
                    width: 300,
                    dataIndex: 'surat_perihal',
                    text: 'Perihal'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    filterable: true,
                    width: 300,
                    dataIndex: 'surat_induk_unit_nama',
                    text: 'Pengirim'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    filterable: true,
                    hidden: true,
                    width: 80,
                    dataIndex: 'surat_agenda',
                    text: 'No.Agenda'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelDefault = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');

                        return modelDefault.renderNomor(value, record);
                    },
                    filterable: true,
                    width: 200,
                    dataIndex: 'surat_nomor',
                    text: 'No.Surat'
                },
                {
                    xtype: 'datecolumn',
                    filterable: true,
                    filter: {
                        type: 'date'
                    },
                    width: 100,
                    dataIndex: 'surat_tanggal',
                    text: 'Tgl.Surat',
                    format: 'd M Y'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value){
                            return value;
                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    filterable: true,
                    hidden: true,
                    dataIndex: 'jenis_nama',
                    text: 'Jenis'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var modelSurat = Ext.ModelManager.getModel('SIPAS.model.Sipas.Surat');
                        if(value){
                            return modelSurat.renderPrioritas(record.get('surat_prioritas'),value, record.get('surat_isselesai'), record);

                        }else{
                            return '<span style="color:#999999;">-</span>';
                        }
                    },
                    filterable: true,
                    languageCode: 'prioritas_agenda_surat_masuk_internal_list',
                    languageMode: 'text',
                    languageable: true,
                    filter: {
                        type: 'date'
                    },
                    hidden: true,
                    width: 140,
                    dataIndex: 'surat_prioritas_tgl',
                    text: 'Urgensi'
                }
            ]
        });

        me.processSipasinternalmasukagendalistunapprovedList(me);
        me.callParent(arguments);
    },

    processSipasinternalmasukagendalistunapprovedList: function(config) {
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

    genStatus: function(value, pending) {
        if(pending === 3){
            return '<span style="color:#9E9E9E;">'+value+'</span>';
        }else{
            return value;
        }
    }

});