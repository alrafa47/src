/*
 * File: app/view/Sipas/keluar/agenda/registrasi/Compact.js
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

Ext.define('SIPAS.view.Sipas.keluar.agenda.registrasi.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_keluar_registrasi_compact',

    requires: [
        'SIPAS.view.Sipas.keluar.agenda.registrasi.List',
        'SIPAS.view.Sipas.keluar.agenda.registrasi.Form',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.Close',
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'ekspedisi_surat_keluar_eksternal_list',
    layout: 'border',
    title: 'Daftar Ekspedisi Surat Keluar Eksternal',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_keluar_agenda_registrasi_list',
                    border: false,
                    bodyBorder: false,
                    region: 'center'
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    split: true,
                    border: false,
                    disabled: true,
                    itemId: 'paneForm',
                    width: 400,
                    layout: 'fit',
                    bodyBorder: false,
                    collapsible: true,
                    header: false,
                    title: 'Form Ekspedisi',
                    items: [
                        {
                            xtype: 'sipas_keluar_agenda_registrasi_form',
                            header: false
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'sipas_com_button_add',
                                    roleable: false,
                                    enableToggle: true,
                                    text: 'Ekspedisi Baru',
                                    toggleGroup: 'sipas_keluar_agenda_registrasi_compact_buttonaction',
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
                                    toggleGroup: 'sipas_keluar_agenda_registrasi_compact_buttonaction',
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