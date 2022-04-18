/*
 * File: app/view/Sipas/draft/session/Compact.js
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

Ext.define('SIPAS.view.Sipas.draft.session.Compact', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sipas_draft_session_compact',

    requires: [
        'SIPAS.view.Sipas.koreksi.session.List',
        'SIPAS.view.Sipas.keluar.agenda.List',
        'SIPAS.view.Sipas.internal.keluar.agenda.List',
        'Ext.grid.Panel',
        'Ext.tab.Tab',
        'Ext.tab.Bar'
    ],

    languageable: true,
    languageCode: 'draft_session',
    languageMode: 'title',
    bodyBorder: false,
    title: 'Draft Surat',
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_koreksi_session_list',
                    featureable: false,
                    featureName: 'koreksi',
                    roleable: false,
                    roleName: 'koreksi_list',
                    languageCode: 'draft_list'
                },
                {
                    xtype: 'sipas_keluar_agenda_list',
                    roleable: true,
                    roleName: 'keluar_session_eksternal',
                    featureable: true,
                    featureName: 'surat_keluar',
                    languageCode: 'suratkeluar_eksternal_tab',
                    title: 'Buat Draft Baru (Keluar Eksternal)',
                    store: 'Sipas.keluar.agenda.session.List',
                    tabConfig: {
                        xtype: 'tab',
                        featureable: true,
                        featureName: 'surat_keluar',
                        roleable: true,
                        roleName: 'keluar_session_eksternal',
                        languageable: true,
                        languageMode: 'title',
                        languageCode: 'suratkeluar_eksternal_tab'
                    }
                },
                {
                    xtype: 'sipas_internal_keluar_agenda_list',
                    roleable: true,
                    roleName: 'keluar_session_internal',
                    featureName: 'surat_keluar',
                    featureable: true,
                    languageCode: 'suratkeluar_internal_tab',
                    title: 'Buat Draft Baru (Keluar Internal)',
                    store: 'Sipas.internal.keluar.agenda.session.List',
                    tabConfig: {
                        xtype: 'tab',
                        languageCode: 'suratkeluar_internal_tab',
                        featureable: true,
                        featureName: 'surat_keluar',
                        roleable: true,
                        roleName: 'keluar_session_internal',
                        languageable: true,
                        languageMode: 'title'
                    }
                }
            ],
            tabBar: {
                xtype: 'tabbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                }
            }
        });

        me.callParent(arguments);
    }

});