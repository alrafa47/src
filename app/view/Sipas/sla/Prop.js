/*
 * File: app/view/Sipas/sla/Prop.js
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

Ext.define('SIPAS.view.Sipas.sla.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_sla_prop',

    requires: [
        'SIPAS.view.Sipas.sla.rumus.List',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.button.Button'
    ],

    height: 450,
    width: 400,
    layout: 'fit',
    title: 'Kategori SLA',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: '8 16 8 16',
                    header: false,
                    title: 'My Form',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Nama',
                                    name: 'sla_nama'
                                },
                                {
                                    xtype: 'fieldset',
                                    padding: 0,
                                    title: 'Status Aktif',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            name: 'sla_isaktif',
                                            value: 1,
                                            boxLabel: 'Aktif',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'sipas_sla_rumus_list',
                            associated: true,
                            flex: 1
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
                            xtype: 'sipas_com_button_delete',
                            roleName: 'sla_delete',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'sla_update',
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