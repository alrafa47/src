/*
 * File: app/view/Sipas/arsip/Lookup.js
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

Ext.define('SIPAS.view.Sipas.arsip.Lookup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_arsip_lookup',

    requires: [
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'SIPAS.view.Sipas.arsip.lookup.List',
        'SIPAS.view.Sipas.arsip.lookup.bagi.List',
        'SIPAS.view.Sipas.arsip.lookup.umum.List',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.tab.Panel',
        'Ext.grid.Panel',
        'Ext.tab.Tab'
    ],

    height: 550,
    minHeight: 100,
    minWidth: 200,
    width: 720,
    layout: 'fit',
    title: 'Daftar Arsip Bebas',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        }
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            clickToView: true,
                            itemId: 'comboScope',
                            minWidth: 300,
                            fieldLabel: '',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'unit_nama',
                            store: 'Sipas.surat.scope.Combo',
                            valueField: 'unit_id',
                            listConfig: {
                                xtype: 'boundlist',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{unit_nama} <span style="color: gray">({unit_kode})</span>'
                                ]
                            }
                        },
                        {
                            xtype: 'sipas_com_button_togglefilter',
                            toggleHandler: function(button, state) {
                                var window = button.up('window');
                                window.down('sipas_arsip_lookup_list').query('gridcolumn textfield').forEach(function(field){
                                    state ? field.show():field.hide();
                                });
                                window.down('sipas_arsip_lookup_bagi_list').query('gridcolumn textfield').forEach(function(field){
                                    state ? field.show():field.hide();
                                });
                                window.down('sipas_arsip_lookup_umum_list').query('gridcolumn textfield').forEach(function(field){
                                    state ? field.show():field.hide();
                                });
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'sipas_arsip_lookup_list'
                        },
                        {
                            xtype: 'sipas_arsip_lookup_bagi_list'
                        },
                        {
                            xtype: 'sipas_arsip_lookup_umum_list'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});