/*
 * File: app/view/Sipas/staf/tim/Prop.js
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

Ext.define('SIPAS.view.Sipas.staf.tim.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_staf_tim_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    minHeight: 125,
    width: 500,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Kelompok Pegawai',
    maximizable: true,
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
                    title: 'Kelompok',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'staf_tim_nama',
                                    fieldLabel: 'Nama Kelompok',
                                    labelWidth: 120,
                                    name: 'staf_tim_nama',
                                    emptyText: 'Masukkan nama kelompok'
                                },
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    itemId: 'staf_tim_unit',
                                    fieldLabel: 'Unit',
                                    labelWidth: 120,
                                    name: 'staf_tim_unit',
                                    emptyText: 'unit',
                                    displayField: 'unit_nama',
                                    store: 'Sipas.unit.ComboBagian',
                                    valueField: 'unit_id'
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
                            roleName: 'staf_tim_delete',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleable: true,
                            roleName: 'staf_tim_update'
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