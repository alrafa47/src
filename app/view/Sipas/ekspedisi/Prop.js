/*
 * File: app/view/Sipas/ekspedisi/Prop.js
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

Ext.define('SIPAS.view.Sipas.ekspedisi.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_ekspedisi_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Save',
        'SIPAS.view.Sipas.com.button.Edit',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    minWidth: 400,
    width: 460,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Ekspedisi',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    margin: '8 16 8 16',
                    header: false,
                    title: 'Jenis Surat',
                    titleAlign: 'center',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Nama Ekspedisi',
                            labelWidth: 140,
                            name: 'ekspedisi_nama',
                            emptyText: 'Masukkan Nama Ekspedisi'
                        },
                        {
                            xtype: 'textfield',
                            width: 240,
                            fieldLabel: 'Kode Ekspedisi',
                            labelWidth: 140,
                            name: 'ekspedisi_kode',
                            emptyText: 'Masukkan Kode Ekspedisi'
                        },
                        {
                            xtype: 'fieldset',
                            padding: 0,
                            title: 'Status Aktif',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    labelWidth: 140,
                                    name: 'ekspedisi_isaktif',
                                    boxLabel: 'Aktif',
                                    inputValue: '1'
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
                        align: 'stretch',
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
                            roleName: 'ekspedisi_delete',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_save'
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'ekspedisi_update',
                            roleable: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});