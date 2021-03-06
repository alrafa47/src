/*
 * File: app/view/Sipas/masuk/registrasi/Compact.js
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

Ext.define('SIPAS.view.Sipas.masuk.registrasi.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_masuk_registrasi_compact',

    requires: [
        'SIPAS.view.Sipas.masuk.registrasi.Form',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.Close',
        'SIPAS.view.Sipas.masuk.registrasi.List',
        'SIPAS.view.Sipas.masuk.pengarahan.Form',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'agenda_registrasi_masuk_eksternal_list',
    title: 'Daftar Registrasi Surat Masuk Ekternal',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    roleName: 'registrasi',
                    roleable: true,
                    border: false,
                    itemId: 'paneForm',
                    width: 400,
                    layout: 'fit',
                    collapsible: true,
                    header: false,
                    title: 'Form Registrasi',
                    items: [
                        {
                            xtype: 'sipas_masuk_registrasi_form',
                            border: false,
                            disabled: true,
                            header: false
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 4,
                                    right: 4,
                                    bottom: 6,
                                    left: 4
                                }
                            },
                            items: [
                                {
                                    xtype: 'sipas_com_button_add',
                                    itemId: 'btnAdd',
                                    enableToggle: true,
                                    text: 'Registrasi Baru',
                                    toggleGroup: 'sipas_surat_masuk_registrasi_mainview_groupbuttonaction',
                                    listeners: {
                                        toggle: {
                                            fn: me.onButtonToggle,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'sipas_com_button_close',
                                    hidden: true,
                                    enableToggle: true,
                                    pressed: true,
                                    text: 'Batal',
                                    toggleGroup: 'sipas_surat_masuk_registrasi_mainview_groupbuttonaction',
                                    listeners: {
                                        toggle: {
                                            fn: me.onButtonToggle1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    width: 622,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'sipas_masuk_registrasi_list',
                            border: false,
                            title: 'Daftar Surat Masuk Terregistrasi',
                            flex: 1
                        },
                        {
                            xtype: 'sipas_masuk_pengarahan_form',
                            disabled: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonToggle: function(button, pressed, eOpts) {
        (pressed) ? button.hide() : button.show();
    },

    onButtonToggle1: function(button, pressed, eOpts) {
        (pressed) ? button.hide() : button.show();
    }

});