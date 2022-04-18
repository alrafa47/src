/*
 * File: app/view/Sipas/lokasi/Prop.js
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

Ext.define('SIPAS.view.Sipas.lokasi.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_lokasi_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    minWidth: 400,
    width: 460,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Lokasi Arsip',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'propRak_form',
                    bodyPadding: '8 16 8 16',
                    frameHeader: false,
                    header: false,
                    title: 'Lokasi Arsip',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'rak_nama',
                            fieldLabel: 'Nama Lokasi',
                            name: 'lokasi_nama',
                            emptyText: 'Masukkan Nama Lokasi'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'rak_kode',
                            width: 240,
                            fieldLabel: 'Kode Lokasi',
                            name: 'lokasi_kode',
                            emptyText: 'Masukkan Kode Lokasi'
                        },
                        {
                            xtype: 'fieldset',
                            padding: 0,
                            title: 'Status Aktif',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'lokasi_isaktif',
                                    boxLabel: 'Aktif',
                                    inputValue: '1'
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            hidden: true,
                            itemId: 'rak_keterangan',
                            fieldLabel: 'Keterangan',
                            labelAlign: 'top',
                            name: 'lokasi_keterangan',
                            rows: 3
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    itemId: 'toolbarAction',
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
                            xtype: 'sipas_com_button_delete',
                            roleName: 'lokasi_delete',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'lokasi_update',
                            roleable: true
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