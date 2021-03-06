/*
 * File: app/view/Sipas/korespondensi/Compact.js
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

Ext.define('SIPAS.view.Sipas.korespondensi.Compact', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sipas_korespondensi_compact',

    requires: [
        'SIPAS.view.Sipas.korespondensi.eksternal.List',
        'SIPAS.view.Sipas.korespondensi.internal.List',
        'Ext.grid.Panel',
        'Ext.tab.Tab'
    ],

    title: 'Daftar Korespondensi Surat',
    activeTab: 0,
    tabPosition: 'bottom',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_korespondensi_eksternal_list'
                },
                {
                    xtype: 'sipas_korespondensi_internal_list'
                }
            ]
        });

        me.callParent(arguments);
    }

});