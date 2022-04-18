/*
 * File: app/view/Sipas/disposisi/riwayat/cabut/Popup.js
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

Ext.define('SIPAS.view.Sipas.disposisi.riwayat.cabut.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_disposisi_riwayat_cabut_popup',

    requires: [
        'SIPAS.view.Sipas.com.surat.Pane',
        'SIPAS.view.Sipas.com.perintah.Pane',
        'SIPAS.view.Sipas.disposisi.riwayat.cabut.List',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Display',
        'Ext.button.Button'
    ],

    languageable: true,
    languageCode: 'cabut_disposisi_popup_title',
    languageMode: 'title',
    width: 500,
    title: 'Pembatalan Disposisi',
    maximizable: true,
    modal: true,

    layout: {
        type: 'hbox',
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
                    margin: '0 10 0 10',
                    autoScroll: true,
                    bodyPadding: 10,
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'tanggalContainer1',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'datefield',
                                    cls: 'tanggalDateField',
                                    margin: '0 0 0 10',
                                    labelWidth: 150,
                                    name: 'disposisi_tgl',
                                    fieldCls: 'x-form-field text-right',
                                    readOnly: true,
                                    format: 'd M Y H:i'
                                }
                            ]
                        },
                        {
                            xtype: 'sipas_com_surat_pane',
                            associated: true,
                            border: false
                        },
                        {
                            xtype: 'sipas_com_perintah_pane',
                            associated: true,
                            featureable: true,
                            featureName: 'perintahtindakan',
                            border: false,
                            margin: '-15 0 0 0'
                        },
                        {
                            xtype: 'container',
                            featureable: true,
                            featureName: 'perintahtindakan',
                            hidden: true,
                            itemId: 'containerPerintah1',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'combobox',
                                    associated: true,
                                    anchor: '100%',
                                    width: 360,
                                    fieldLabel: 'Perintah',
                                    labelAlign: 'top',
                                    name: 'disposisi_perintah',
                                    readOnly: true,
                                    allowBlank: false,
                                    emptyText: 'Silahkan Pilih Perintah',
                                    displayField: 'perintah_nama',
                                    queryMode: 'local',
                                    store: 'Sipas.perintah.Combo',
                                    valueField: 'perintah_id'
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    frame: false,
                                    name: 'disposisi_pesan',
                                    readOnly: true,
                                    emptyText: 'Uraian Perintah',
                                    rows: 2
                                }
                            ]
                        },
                        {
                            xtype: 'sipas_disposisi_riwayat_cabut_list',
                            associated: true,
                            height: 200,
                            margin: '0 0 20 0'
                        },
                        {
                            xtype: 'fieldset',
                            associated: true,
                            margin: '0 0 -20 0',
                            title: 'Pilihan pembatalan',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'pilihanCabut',
                                    labelAlign: 'top',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            featureable: true,
                                            featureName: 'disposisi_batal_blm_baca',
                                            roleable: true,
                                            roleName: 'disposisi_batal_blm_baca',
                                            languageable: true,
                                            languageCode: 'riwayat_disposisi_batal_blm_baca',
                                            languageMode: 'boxLabel',
                                            flex: 1,
                                            itemId: 'unread',
                                            name: 'cbPersetujuan',
                                            boxLabel: 'Batalkan disposisi yang belum terbaca'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            languageable: true,
                                            languageMode: 'value',
                                            languageCode: 'riwayat_disposisi_batal_blm_baca_desc',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'unreadDetail',
                                            value: 'Disposisi yang akan dibatalkan adalah disposisi yang belum dibaca oleh penerima'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            featureable: true,
                                            featureName: 'disposisi_batal_semua',
                                            roleable: true,
                                            roleName: 'disposisi_batal_semua',
                                            languageable: true,
                                            languageCode: 'riwayat_disposisi_batal_semua',
                                            languageMode: 'boxLabel',
                                            itemId: 'all',
                                            name: 'cbPersetujuan',
                                            boxLabel: 'Batalkan semua disposisi'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            languageable: true,
                                            languageMode: 'value',
                                            languageCode: 'riwayat_disposisi_batal_semua_desc',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'allDetail',
                                            value: 'Semua disposisi terkirim yang akan dibatalkan'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            featureable: true,
                                            featureName: 'disposisi_batal_turunan',
                                            roleable: true,
                                            roleName: 'disposisi_batal_turunan',
                                            languageable: true,
                                            languageCode: 'riwayat_disposisi_batal_semua_turunan',
                                            languageMode: 'boxLabel',
                                            itemId: 'nested',
                                            name: 'cbPersetujuan',
                                            boxLabel: 'Batalkan semua disposisi dan turunannya'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            languageable: true,
                                            languageMode: 'value',
                                            languageCode: 'riwayat_disposisi_batal_semua_turunan_desc',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'nestedDetail',
                                            value: 'Disposisi yang akan dibatalkan adalah semua disposisi yang terkirim dan disposisi terusan yang dikirim oleh masing-masing penerima disposisi'
                                        }
                                    ]
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
                            xtype: 'button',
                            languageable: true,
                            languageCode: 'riwayat_disposisi_batal_btn',
                            languageMode: 'text',
                            cls: 'x-btn-bordered x-btn-danger',
                            hidden: true,
                            itemId: 'buttonCabutDisposisi',
                            text: 'Lakukan Pembatalan'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});