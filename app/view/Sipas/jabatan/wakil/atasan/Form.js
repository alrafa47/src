/*
 * File: app/view/Sipas/jabatan/wakil/atasan/Form.js
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

Ext.define('SIPAS.view.Sipas.jabatan.wakil.atasan.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_jabatan_wakil_atasan_form',

    requires: [
        'SIPAS.view.Sipas.jabatan.wakil.atasan.List',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.button.Button'
    ],

    isProfile: false,
    border: false,
    bodyBorder: false,
    bodyPadding: 10,
    title: 'Pimpinan Pegawai',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Pegawai',
                    name: 'staf_nama',
                    readOnly: true,
                    emptyText: 'Masukkan Nama Pegawai'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Kerja',
                    name: 'unit_nama',
                    readOnly: true,
                    emptyText: 'Masukkan Unit Kerja'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jabatan',
                    name: 'jabatan_nama',
                    readOnly: true,
                    emptyText: 'Masukkan Jabatan'
                },
                {
                    xtype: 'sipas_jabatan_wakil_atasan_list',
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    flex: 1,
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
                            roleable: true,
                            roleName: 'staf_pimpinan_monitoring_save',
                            featureName: 'asistensi',
                            featureable: true,
                            itemId: 'simpanAsisten'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});