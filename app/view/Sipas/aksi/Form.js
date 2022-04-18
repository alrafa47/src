/*
 * File: app/view/Sipas/aksi/Form.js
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

Ext.define('SIPAS.view.Sipas.aksi.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_aksi_form',

    requires: [
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    bodyPadding: '8 16 8 16',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    languageCode: 'tindakan_prop_textfield',
                    languageMode: 'fieldLabel',
                    languageable: true,
                    anchor: '100%',
                    width: 240,
                    fieldLabel: 'Tindakan Disposisi',
                    labelWidth: 130,
                    name: 'aksi_nama',
                    allowBlank: false,
                    emptyText: 'Masukkan Arahan Disposisi'
                },
                {
                    xtype: 'fieldset',
                    padding: 0,
                    title: 'Status Aktif',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            labelWidth: 130,
                            name: 'aksi_isaktif',
                            boxLabel: 'Aktif',
                            inputValue: '1'
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
                            roleable: true,
                            roleName: 'aksi_delete'
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'ekspedisi_update',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_save',
                            roleName: 'aksi_insert',
                            roleable: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});