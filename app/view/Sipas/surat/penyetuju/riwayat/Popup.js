/*
 * File: app/view/Sipas/surat/penyetuju/riwayat/Popup.js
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

Ext.define('SIPAS.view.Sipas.surat.penyetuju.riwayat.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_surat_penyetuju_riwayat_popup',

    requires: [
        'SIPAS.view.Sipas.koreksi.session.riwayat.List',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    border: false,
    height: 500,
    width: 800,
    layout: 'fit',
    title: 'Riwayat Penyetujuan',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    cls: 'sipas_disposisi_penerima_detail_form',
                    autoScroll: true,
                    layout: 'fit',
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'sipas_koreksi_session_riwayat_list',
                            associated: true,
                            header: false
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    border: false,
                    hidden: true,
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'refNomor',
                            text: 'Ref Nomor'
                        },
                        {
                            xtype: 'tbfill'
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