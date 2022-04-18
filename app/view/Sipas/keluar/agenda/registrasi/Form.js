/*
 * File: app/view/Sipas/keluar/agenda/registrasi/Form.js
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

Ext.define('SIPAS.view.Sipas.keluar.agenda.registrasi.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_keluar_agenda_registrasi_form',

    requires: [
        'SIPAS.view.Sipas.keluar.agenda.ekspedisi.List',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.FieldContainer',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    useDetail: false,
    border: false,
    bodyBorder: false,
    bodyPadding: 10,
    title: 'Form Registrasi Surat Keluar',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelWidth: 160
            },
            items: [
                me.processMyContainer34({
                    xtype: 'container',
                    padding: 5,
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'No.Surat ',
                            labelClsExtra: 'bold',
                            labelWidth: 120,
                            name: 'surat_nomor',
                            fieldCls: 'x-form-field bold',
                            readOnly: true,
                            emptyText: 'Masukkan nomor surat'
                        },
                        {
                            xtype: 'fieldcontainer',
                            padding: 0,
                            labelWidth: 120,
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
                                    emptyText: 'Masukkan nomor agenda',
                                    hideTrigger: true
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            hidden: true,
                            fieldLabel: 'Pembuat',
                            labelWidth: 120,
                            name: 'surat_properti_pembuat_nama',
                            readOnly: true
                        },
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'Tgl.Surat',
                            labelWidth: 120,
                            name: 'surat_tanggal',
                            readOnly: true,
                            emptyText: 'Masukkan tanggal surat',
                            editable: false,
                            format: 'd M Y',
                            submitFormat: 'd-M-Y H:i',
                            listeners: {
                                afterrender: {
                                    fn: me.onDatefieldAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Kepada',
                            labelWidth: 120,
                            name: 'surat_tujuan',
                            readOnly: true,
                            emptyText: 'Masukkan kepada'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            fieldLabel: 'Perihal',
                            labelWidth: 120,
                            name: 'surat_perihal',
                            readOnly: true,
                            emptyText: 'Masukkan perihal',
                            growAppend: '-',
                            rows: 2
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            hidden: true,
                            fieldLabel: 'Status Ekspedisi',
                            labelWidth: 120,
                            name: 'ekspedisi_nama',
                            readOnly: true
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }),
                {
                    xtype: 'sipas_keluar_agenda_ekspedisi_list',
                    associated: true,
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    hidden: true,
                    itemId: 'toolbarAction',
                    defaultButtonUI: 'default',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'CbResi',
                            name: 'surat_masuk_resi',
                            boxLabel: 'Cetak Resi'
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

    processMyContainer34: function(config) {
        if(!this.useDetail)
        {
            return null;
        }
        return config;
    },

    onDatefieldAfterRender: function(component, eOpts) {
        component.setMaxValue(new Date());
    }

});