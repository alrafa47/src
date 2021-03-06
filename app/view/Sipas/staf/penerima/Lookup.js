/*
 * File: app/view/Sipas/staf/penerima/Lookup.js
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

Ext.define('SIPAS.view.Sipas.staf.penerima.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_staf_penerima_lookup',

    requires: [
        'SIPAS.view.Sipas.staf.penerima.recent.Lookup',
        'SIPAS.view.Sipas.staf.penerima.staf.Lookup',
        'SIPAS.view.Sipas.staf.penerima.jabatan.Lookup',
        'SIPAS.view.Sipas.staf.penerima.unit.Lookup',
        'SIPAS.view.Sipas.staf.penerima.tim.Lookup',
        'SIPAS.view.Sipas.staf.penerima.available.Lookup',
        'SIPAS.view.Sipas.staf.penerima.List',
        'SIPAS.view.Sipas.com.button.Putin',
        'Ext.tab.Panel',
        'Ext.grid.Panel',
        'Ext.tab.Tab'
    ],

    height: 492,
    minHeight: 200,
    minWidth: 200,
    width: 950,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Daftar Pegawai',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            border: false,
                            margin: '0 0 0 2',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'sipas_staf_penerima_recent_lookup',
                                    margin: '0 0 0 5',
                                    title: 'Terakhir Kali'
                                },
                                {
                                    xtype: 'sipas_staf_penerima_staf_lookup',
                                    margin: '0 0 0 5',
                                    title: 'Staf Saya'
                                },
                                {
                                    xtype: 'sipas_staf_penerima_jabatan_lookup',
                                    hidden: true,
                                    margin: '0 0 0 5'
                                },
                                {
                                    xtype: 'sipas_staf_penerima_unit_lookup',
                                    margin: '0 0 0 5',
                                    title: 'Dalam Satu Unit'
                                },
                                {
                                    xtype: 'sipas_staf_penerima_tim_lookup',
                                    featureName: 'staf_kelompok',
                                    featureable: true,
                                    margin: '0 0 0 5'
                                },
                                {
                                    xtype: 'sipas_staf_penerima_available_lookup',
                                    margin: '0 0 0 5',
                                    title: 'Semua Pegawai'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            width: 320,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'sipas_staf_penerima_list',
                                    associated: true,
                                    itemId: 'stafPenerima',
                                    autoScroll: true,
                                    bodyBorder: false,
                                    flex: 1
                                },
                                {
                                    xtype: 'container',
                                    ui: 'footer',
                                    layout: {
                                        type: 'hbox',
                                        align: 'bottom',
                                        defaultMargins: {
                                            top: 4,
                                            right: 4,
                                            bottom: 6,
                                            left: 4
                                        },
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'sipas_com_button_putin',
                                            itemId: 'pilih'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});