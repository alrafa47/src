/*
 * File: app/view/Sipas/keluar/session/Compact.js
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

Ext.define('SIPAS.view.Sipas.keluar.session.Compact', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sipas_keluar_session_compact',

    requires: [
        'SIPAS.view.Sipas.keluar.agenda.List',
        'SIPAS.view.Sipas.internal.keluar.agenda.List',
        'Ext.grid.Panel',
        'Ext.tab.Tab'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'suratkeluar_list',
    bodyBorder: false,
    title: 'Surat Keluar',
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_keluar_agenda_list',
                    roleable: true,
                    roleName: 'keluar_session_eksternal',
                    languageCode: 'suratkeluar_eksternal_tab',
                    isSession: true,
                    title: 'Surat Keluar Eksternal',
                    store: 'Sipas.keluar.session.List'
                },
                {
                    xtype: 'sipas_internal_keluar_agenda_list',
                    roleable: true,
                    roleName: 'keluar_session_internal',
                    languageCode: 'suratkeluar_internal_tab',
                    isSession: true,
                    title: 'Surat Keluar Internal',
                    store: 'Sipas.internal.keluar.session.List'
                }
            ]
        });

        me.callParent(arguments);
    }

});