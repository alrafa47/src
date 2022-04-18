/*
 * File: app/view/Sipas/unit/Prop.js
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

Ext.define('SIPAS.view.Sipas.unit.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_unit_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Cross',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox'
    ],

    minHeight: 200,
    minWidth: 400,
    width: 504,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Unit Kerja',
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
                    title: 'Unit Kerja',
                    titleAlign: 'center',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'unitkerja_nama',
                            fieldLabel: 'Nama Unit Kerja',
                            labelWidth: 120,
                            name: 'unit_nama',
                            emptyText: 'Masukkan nama unit'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'unitkerja_kode',
                            width: 300,
                            fieldLabel: 'Kode Unit Kerja',
                            labelWidth: 120,
                            name: 'unit_kode',
                            emptyText: 'Masukkan kode unit'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'unitkerja_kode_rubrik',
                            width: 300,
                            fieldLabel: 'Kode Rubrik',
                            labelWidth: 120,
                            name: 'unit_rubrik',
                            emptyText: 'Masukkan kode rubrik'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'unit_pos_code',
                            width: 300,
                            fieldLabel: 'Pos Code',
                            labelWidth: 120,
                            name: 'unit_pos_code',
                            emptyText: 'Masukkan pos code'
                        },
                        {
                            xtype: 'fieldcontainer',
                            anchor: '100%',
                            itemId: 'containerManager',
                            fieldLabel: 'Kepala Unit Kerja',
                            labelWidth: 120,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    itemId: 'hiddenManager',
                                    fieldLabel: 'Label',
                                    name: 'unit_manager'
                                },
                                {
                                    xtype: 'triggerfield',
                                    associated: true,
                                    flex: 4,
                                    itemId: 'comboManager',
                                    fieldLabel: '',
                                    name: 'staf_nama',
                                    submitValue: false,
                                    emptyText: 'Pilih kepala unit',
                                    editable: false,
                                    triggerCls: 'x-form-arrow-trigger'
                                },
                                {
                                    xtype: 'sipas_com_button_cross',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnCrossClick,
                                            scope: me
                                        },
                                        afterrender: {
                                            fn: me.onButtonCrossAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            anchor: '100%',
                            itemId: 'containerParent',
                            fieldLabel: 'Anak Dari',
                            labelWidth: 120,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    bootstrapProperty: 'Sipas.unit.Prop',
                                    associated: true,
                                    flex: 1,
                                    itemId: 'comboParent',
                                    name: 'unit_induk',
                                    emptyText: 'Pilih indukan',
                                    anyMatch: true,
                                    displayField: 'unit_nama',
                                    forceSelection: true,
                                    minChars: 2,
                                    store: 'Sipas.unit.Combo',
                                    valueField: 'unit_id',
                                    listConfig: {
                                        xtype: 'boundlist',
                                        itemSelector: 'div',
                                        itemTpl: [
                                            '{unit_nama} <span style="color: gray">({unit_kode})</span>'
                                        ]
                                    }
                                },
                                {
                                    xtype: 'sipas_com_button_cross',
                                    listeners: {
                                        click: {
                                            fn: me.onBtnCrossClick1,
                                            scope: me
                                        },
                                        afterrender: {
                                            fn: me.onButtonCrossAfterRender1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 0 0 0',
                            title: 'Status Aktif',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'unit_isaktif',
                                    boxLabel: 'Aktif',
                                    inputValue: '1',
                                    uncheckedValue: '0'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Pembuatan Surat',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'unit_isbuatsurat',
                                    boxLabel: 'User dapat membuat agenda surat pada unit',
                                    inputValue: '1',
                                    uncheckedValue: '0'
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
                            roleName: 'unitkerja_delete',
                            roleable: true
                        },
                        {
                            xtype: 'button',
                            languageMode: 'title',
                            languageCode: 'pegawai_list',
                            languageable: true,
                            cls: 'x-btn-bordered',
                            itemId: 'btnStafUnit',
                            text: 'DAFTAR pEGAWAI'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'sla_unit_list',
                            roleable: true,
                            roleName: 'sla_unit',
                            featureName: 'sla',
                            featureable: true,
                            cls: 'x-btn-bordered',
                            itemId: 'btnUnit',
                            text: 'Unit'
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleName: 'unitkerja_update',
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
    },

    onBtnCrossClick: function(button, e, eOpts) {
        var cmp = button.previousSibling('triggerfield,combobox,texfield');
        if(cmp){
            cmp.setValue(null);
        }
    },

    onButtonCrossAfterRender: function(component, eOpts) {
        if(component.prev('triggerfield,combobox,textfield').readOnly){
            component.up('container').remove(component,true);
        }
    },

    onBtnCrossClick1: function(button, e, eOpts) {
        var cmp = button.previousSibling('triggerfield,combobox,texfield');
        if(cmp){
            cmp.setValue(null);
        }
    },

    onButtonCrossAfterRender1: function(component, eOpts) {
        if(component.prev('triggerfield,combobox,textfield').readOnly){
            component.up('container').remove(component,true);
        }
    }

});