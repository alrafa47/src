/*
 * File: app/view/Sipas/klise/Prop.js
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

Ext.define('SIPAS.view.Sipas.klise.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_klise_prop',

    requires: [
        'SIPAS.view.Sipas.klise.legend.List',
        'SIPAS.view.Sipas.com.CKEditor',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    height: 600,
    width: 600,
    layout: 'fit',
    title: 'Template Surat',
    maximizable: true,
    maximized: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    header: false,
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            border: false,
                            padding: 8,
                            width: 300,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama template',
                                    labelAlign: 'top',
                                    labelWidth: 120,
                                    name: 'klise_nama',
                                    emptyText: 'Masukkan nama template'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Kelompok',
                                    labelAlign: 'top',
                                    labelWidth: 120,
                                    name: 'klise_kelompok',
                                    emptyText: 'Masukkan kelompok template',
                                    enableKeyEvents: true,
                                    anyMatch: true,
                                    autoSelect: false,
                                    displayField: 'klise_kelompok',
                                    queryMode: 'local',
                                    store: 'Sipas.klise.kelompok.Combo',
                                    valueField: 'klise_kelompok'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Unit',
                                    labelAlign: 'top',
                                    labelWidth: 120,
                                    name: 'klise_unit_id',
                                    emptyText: 'Masukan Unit template',
                                    displayField: 'unit_nama',
                                    store: 'Sipas.unit.Combo',
                                    valueField: 'unit_id'
                                },
                                {
                                    xtype: 'fieldset',
                                    padding: 0,
                                    title: 'status aktif',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            labelWidth: 120,
                                            name: 'klise_isaktif',
                                            value: 1,
                                            boxLabel: 'Aktif',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            labelWidth: 120,
                                            name: 'klise_ispetikan',
                                            value: 0,
                                            boxLabel: 'Dokumen Petikan',
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'sipas_klise_legend_list',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 5,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'sipas_com_ckeditor',
                                    frame: true,
                                    name: 'klise_isi',
                                    emptyText: 'Isi Template'
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
                            roleName: 'template_delete',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'template_update',
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