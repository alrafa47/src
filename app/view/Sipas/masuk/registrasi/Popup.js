/*
 * File: app/view/Sipas/masuk/registrasi/Popup.js
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

Ext.define('SIPAS.view.Sipas.masuk.registrasi.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_masuk_registrasi_popup',

    requires: [
        'SIPAS.view.Sipas.masuk.registrasi.Form',
        'SIPAS.view.Sipas.surat.penerima.staf.List',
        'Ext.form.Panel',
        'Ext.grid.Panel'
    ],

    border: false,
    title: 'Form Registrasi Surat',
    maximizable: true,
    maximized: true,
    modal: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_masuk_registrasi_form',
                    frameHeader: false,
                    titleAlign: 'center',
                    flex: 3
                },
                {
                    xtype: 'sipas_surat_penerima_staf_list',
                    flex: 4
                }
            ]
        });

        me.callParent(arguments);
    }

});