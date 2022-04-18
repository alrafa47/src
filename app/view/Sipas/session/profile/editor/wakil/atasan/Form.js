/*
 * File: app/view/Sipas/session/profile/editor/wakil/atasan/Form.js
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

Ext.define('SIPAS.view.Sipas.session.profile.editor.wakil.atasan.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_session_profile_editor_wakil_atasan_form',

    requires: [
        'SIPAS.view.Sipas.session.profile.editor.wakil.atasan.List',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.button.Button'
    ],

    isProfile: false,
    border: false,
    bodyBorder: false,
    bodyPadding: '8 16 8 16',
    title: 'Pimpinan',

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
                    emptyText: 'Masukkan nama pegawai'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Kerja',
                    name: 'unit_nama',
                    readOnly: true,
                    emptyText: 'Masukkan unit kerja'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jabatan',
                    name: 'jabatan_nama',
                    readOnly: true,
                    emptyText: 'Masukkan jabatan'
                },
                {
                    xtype: 'sipas_session_profile_editor_wakil_atasan_list',
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
                            roleName: 'simpan_pimpinan_profile',
                            featureable: true,
                            featureName: 'asistensi',
                            itemId: 'simpanAsisten'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});