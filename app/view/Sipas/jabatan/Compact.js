/*
 * File: app/view/Sipas/jabatan/Compact.js
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

Ext.define('SIPAS.view.Sipas.jabatan.Compact', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sipas_jabatan_compact',

    requires: [
        'SIPAS.view.Sipas.jabatan.List',
        'SIPAS.view.Sipas.jabatan.Treelist',
        'Ext.grid.Panel',
        'Ext.tab.Tab',
        'Ext.tree.Panel'
    ],

    languageCode: 'jabatan_list',
    languageMode: 'title',
    languageable: true,
    title: 'Daftar Jabatan',
    plain: true,
    tabPosition: 'bottom',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_jabatan_list',
                    border: false,
                    itemId: 'listSipasJabatan',
                    title: 'Tampilan Tabel'
                },
                {
                    xtype: 'sipas_jabatan_treelist',
                    border: false,
                    title: 'Tampilan Hirarki'
                }
            ]
        });

        me.callParent(arguments);
    }

});