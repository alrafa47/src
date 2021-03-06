/*
 * File: app/view/Sipas/akses/Compact.js
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

Ext.define('SIPAS.view.Sipas.akses.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_akses_compact',

    requires: [
        'SIPAS.view.Sipas.peran.List',
        'SIPAS.view.Sipas.akses.List',
        'Ext.grid.Panel',
        'Ext.tree.Panel'
    ],

    roleName: 'hakakses',
    border: 0,
    itemId: 'mainviewSipasAkses',
    layout: 'border',
    title: 'Daftar Hak Akses',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_peran_list',
                    dbclickToView: true,
                    roleable: true,
                    clickToView: false,
                    border: false,
                    width: 419,
                    flex: 1,
                    region: 'center'
                },
                {
                    xtype: 'sipas_akses_list',
                    border: false,
                    disabled: true,
                    width: 600,
                    header: false,
                    title: 'Menu yang DiAkses',
                    flex: 1,
                    region: 'east',
                    split: true
                }
            ]
        });

        me.callParent(arguments);
    }

});