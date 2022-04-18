/*
 * File: app/view/Sipas/keluar/agenda/ekspedisi/Popup.js
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

Ext.define('SIPAS.view.Sipas.keluar.agenda.ekspedisi.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_keluar_agenda_ekspedisi_popup',

    requires: [
        'SIPAS.view.Sipas.com.button.Reload',
        'SIPAS.view.Sipas.com.button.Edit',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.button.Button'
    ],

    width: 500,
    layout: 'fit',
    title: 'Ekspedisi Surat Keluar',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'formSuratKeluarEkspedisi',
                    bodyPadding: '8 16 8 16',
                    header: false,
                    title: 'My Form',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            border: false,
                            itemId: 'paneDetailEks',
                            width: 150,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Tgl.Ekspedisi',
                                    labelWidth: 120,
                                    name: 'surat_log_tgl',
                                    emptyText: 'Pilih tanggal',
                                    editable: false,
                                    format: 'd M Y'
                                },
                                {
                                    xtype: 'combobox',
                                    associated: true,
                                    anchor: '100%',
                                    itemId: 'statusEkspedisi',
                                    fieldLabel: 'Status Ekspedisi',
                                    labelWidth: 120,
                                    name: 'surat_log_ekspedisi',
                                    allowBlank: false,
                                    emptyText: 'Pilih status ekspedisi',
                                    editable: false,
                                    displayField: 'ekspedisi_nama',
                                    forceSelection: true,
                                    store: 'Sipas.ekspedisi.aktif.Combo',
                                    valueField: 'ekspedisi_id'
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    fieldLabel: 'Catatan Ekspedisi',
                                    labelAlign: 'top',
                                    labelWidth: 120,
                                    name: 'surat_log_catatan',
                                    emptyText: 'Masukkan catatan',
                                    rows: 2
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Petugas',
                                    labelWidth: 120,
                                    name: 'surat_log_petugas',
                                    emptyText: 'Masukkan nama petugas',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'fieldset',
                                    hidden: true,
                                    collapsed: true,
                                    collapsible: true,
                                    title: 'Informasi Surat',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            fieldLabel: 'Tanggal Surat',
                                            name: 'surat_tanggal',
                                            readOnly: true,
                                            format: 'd M Y'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            fieldLabel: 'Nomor Surat',
                                            name: 'surat_nomor',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            fieldLabel: 'Pembuat',
                                            name: 'surat_properti_pembuat_nama',
                                            readOnly: true
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
                            itemId: 'toolbarControl',
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
                                    xtype: 'sipas_com_button_reload',
                                    hidden: true,
                                    text: 'Reset'
                                },
                                {
                                    xtype: 'sipas_com_button_edit',
                                    cls: 'x-btn-primary',
                                    text: 'Tambahkan'
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