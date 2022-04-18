/*
 * File: app/view/Sipas/masuk/registrasi/Form.js
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

Ext.define('SIPAS.view.Sipas.masuk.registrasi.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_masuk_registrasi_form',

    requires: [
        'SIPAS.view.Sipas.com.button.Minus',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.XTemplate',
        'Ext.form.FieldContainer',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.view.BoundList',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Checkbox'
    ],

    bodyPadding: 10,
    title: 'Form Registrasi Surat',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    cls: 'x-field-boldertext align-left align-right align-center',
                    width: 320,
                    afterSubTpl: [
                        '<span class="text-description">Catat No.Registrasi ini di amplop surat</span>'
                    ],
                    fieldLabel: 'No.Registrasi ',
                    labelClsExtra: 'bold',
                    name: 'surat_registrasi',
                    readOnly: true,
                    allowBlank: false,
                    emptyText: 'Otomatis'
                },
                {
                    xtype: 'fieldcontainer',
                    hidden: true,
                    padding: 0,
                    combineLabels: true,
                    labelConnector: ' ',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            flex: 1,
                            fieldLabel: 'No.Agenda',
                            labelPad: 3,
                            name: 'surat_agenda',
                            readOnly: true,
                            hideTrigger: true
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            width: 100,
                            fieldLabel: '',
                            name: 'surat_agenda_sub',
                            emptyText: '(sub)',
                            maxLength: 5
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    hidden: true,
                    fieldLabel: 'Tgl.Registrasi',
                    name: 'surat_properti_buat_tgl',
                    readOnly: true,
                    allowBlank: false,
                    editable: false,
                    format: 'd M Y H:i',
                    submitFormat: 'd M Y H:i'
                },
                {
                    xtype: 'textfield',
                    hidden: true,
                    fieldLabel: 'Operator',
                    name: 'surat_properti_pembuat_nama',
                    readOnly: true,
                    allowBlank: false
                },
                {
                    xtype: 'container',
                    itemId: 'containerAsal',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            associated: true,
                            flex: 1,
                            fieldLabel: 'Surat Diterima Melalui',
                            labelAlign: 'top',
                            labelWidth: 160,
                            name: 'surat_media',
                            allowBlank: false,
                            emptyText: 'Kurir surat',
                            editable: false,
                            anyMatch: true,
                            displayField: 'media_nama',
                            forceSelection: true,
                            store: 'Sipas.media.Combo',
                            valueField: 'media_id'
                        },
                        {
                            xtype: 'sipas_com_button_minus',
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    associated: true,
                    fieldLabel: 'Dari',
                    labelAlign: 'top',
                    name: 'surat_pengirim',
                    allowBlank: false,
                    emptyText: 'Anda bisa menambahkan data baru',
                    displayField: 'surat_kontak',
                    store: 'Sipas.surat.kontak.Combo',
                    valueField: 'surat_kontak',
                    listConfig: {
                        xtype: 'boundlist',
                        emptyText: '<div class="x-list-empty"> 	<div>Data tidak ditemukan</div>     <div>Inputan anda akan ditambahkan ketika proses simpan</div> </div>'
                    }
                },
                {
                    xtype: 'textfield',
                    hidden: true,
                    fieldLabel: 'Kepada',
                    name: 'surat_tujuan'
                },
                {
                    xtype: 'combobox',
                    associated: true,
                    roleable: true,
                    roleName: 'pengarahanmasuk',
                    featureName: 'agenda_masuk_pengarahan',
                    featureable: true,
                    itemId: 'comboUnit',
                    fieldLabel: 'Ditujukan Pada Unit :',
                    labelAlign: 'top',
                    name: 'surat_unit',
                    emptyText: 'Pilih unit',
                    anyMatch: true,
                    displayField: 'unit_nama',
                    forceSelection: true,
                    minChars: 2,
                    pageSize: 15,
                    store: 'Sipas.unit.Combo',
                    valueField: 'unit_id',
                    listConfig: {
                        xtype: 'boundlist',
                        itemSelector: 'div',
                        itemTpl: [
                            '{unit_nama} <span style="color: gray">({unit_kode})</span>'
                        ]
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    itemId: 'toolbarAction',
                    ui: 'footer',
                    defaultButtonUI: 'default',
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
                            xtype: 'checkboxfield',
                            itemId: 'CbResi',
                            name: 'surat_masuk_resi',
                            boxLabel: 'Cetak Resi'
                        },
                        {
                            xtype: 'sipas_com_button_save',
                            hidden: true,
                            itemId: 'savePrint',
                            text: 'SIMPAN DAN CETAK'
                        },
                        {
                            xtype: 'sipas_com_button_save'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});