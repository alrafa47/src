/*
 * File: app/view/Sipas/disposisi/forward/Prop.js
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

Ext.define('SIPAS.view.Sipas.disposisi.forward.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_disposisi_forward_prop',

    requires: [
        'SIPAS.view.Sipas.disposisi.forward.Form',
        'Ext.form.Panel'
    ],

    height: 500,
    maxHeight: 700,
    minHeight: 500,
    minWidth: 900,
    layout: 'fit',
    title: 'Meneruskan Disposisi',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_disposisi_forward_form',
                    padding: '0 8 0 8'
                }
            ]
        });

        me.callParent(arguments);
    }

});