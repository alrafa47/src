/*
 * File: app/view/Sipas/surat/petikan/Prop.js
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

Ext.define('SIPAS.view.Sipas.surat.petikan.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_surat_petikan_prop',

    requires: [
        'SIPAS.view.Sipas.surat.petikan.List',
        'Ext.form.Panel',
        'Ext.grid.Panel'
    ],

    height: 383,
    width: 508,
    layout: 'fit',
    title: 'Daftar Petikan',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    layout: 'fit',
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'sipas_surat_petikan_list',
                            associated: true,
                            itemId: 'listPetikan',
                            width: 388,
                            header: false
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});