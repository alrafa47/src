/*
 * File: app/view/Sipas/internal/masuk/agenda/list/Compact.js
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

Ext.define('SIPAS.view.Sipas.internal.masuk.agenda.list.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_internal_masuk_agenda_list_compact',

    requires: [
        'SIPAS.view.Sipas.internal.masuk.agenda.list.unapproved.List',
        'SIPAS.view.Sipas.internal.masuk.agenda.list.approved.List',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.grid.Panel'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'agenda_surat_masuk_internal_list',
    title: 'Daftar Agenda Surat Masuk Internal',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
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
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'sipas_internal_masuk_agenda_list_unapproved_list',
                    border: false,
                    maxHeight: 200,
                    minHeight: 200,
                    autoScroll: true,
                    header: false,
                    scroll: true
                },
                {
                    xtype: 'sipas_internal_masuk_agenda_list_approved_list',
                    border: false,
                    width: 150,
                    header: false,
                    scroll: true,
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});