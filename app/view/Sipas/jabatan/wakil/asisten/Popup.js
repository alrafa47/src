/*
 * File: app/view/Sipas/jabatan/wakil/asisten/Popup.js
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

Ext.define('SIPAS.view.Sipas.jabatan.wakil.asisten.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_jabatan_wakil_asisten_popup',

    requires: [
        'SIPAS.view.Sipas.jabatan.wakil.asisten.Form',
        'Ext.form.Panel'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'asistensi_list',
    height: 600,
    width: 700,
    layout: 'fit',
    title: 'Daftar Asisten',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_jabatan_wakil_asisten_form',
                    bodyPadding: '8 16 8 16',
                    header: false
                }
            ]
        });

        me.callParent(arguments);
    }

});