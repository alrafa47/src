/*
 * File: app/view/Sipas/koreksi/setuju/ttd/Popup.js
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

Ext.define('SIPAS.view.Sipas.koreksi.setuju.ttd.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_koreksi_setuju_ttd_popup',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button'
    ],

    height: 250,
    width: 400,
    layout: 'fit',
    title: 'Tanda Tangan',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'container',
                            associated: true,
                            height: '100%',
                            html: '<canvas id="ttd" style="position: absolute; left: 0; top: 0; width:400px; height:200px;"></canvas>',
                            itemId: 'ttd',
                            width: '100%'
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
                            xtype: 'button',
                            cls: 'x-btn-bordered x-btn-danger',
                            itemId: 'btnClear',
                            text: 'clear'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
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
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'x-btn-bordered x-btn-primary',
                            itemId: 'btnSimpan',
                            text: 'Simpan'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});