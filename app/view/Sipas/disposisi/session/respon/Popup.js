/*
 * File: app/view/Sipas/disposisi/session/respon/Popup.js
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

Ext.define('SIPAS.view.Sipas.disposisi.session.respon.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_disposisi_session_respon_popup',

    requires: [
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.FieldContainer',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    languageable: true,
    languageCode: 'tindakan_prop',
    languageMode: 'title',
    minHeight: 250,
    minWidth: 500,
    width: 500,
    layout: 'fit',
    title: 'Respon',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'form',
                    autoScroll: true,
                    bodyPadding: '8 8 8 8',
                    frameHeader: false,
                    header: false,
                    title: 'My Form',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            height: 120,
                            itemId: 'paneTindakan',
                            margin: '0 7 0 7',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'combobox',
                                    associated: true,
                                    languageable: true,
                                    languageMode: 'fieldLabel',
                                    languageCode: 'tindakan_combo',
                                    anchor: '100%',
                                    itemId: 'comAksi',
                                    fieldLabel: 'Tindakan',
                                    labelAlign: 'top',
                                    name: 'disposisi_masuk_aksi',
                                    emptyText: 'Silahkan Pilih Respon',
                                    displayField: 'aksi_nama',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'Sipas.aksi.Combo',
                                    valueField: 'aksi_id'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'anchor',
                                    labelWidth: 140,
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            anchor: '100%',
                                            itemId: 'textAksi',
                                            fieldLabel: 'Uraian Tindakan',
                                            hideLabel: true,
                                            labelWidth: 140,
                                            name: 'disposisi_masuk_pesan',
                                            emptyText: 'Uraian'
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
                            xtype: 'sipas_com_button_save',
                            action: 'dosave',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'tindakan_button',
                            cls: 'x-btn-fill x-btn-bordered x-btn-info',
                            itemId: 'btnAksi',
                            text: 'Perbarui Tindakan'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});