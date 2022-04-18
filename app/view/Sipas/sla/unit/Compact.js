/*
 * File: app/view/Sipas/sla/unit/Compact.js
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

Ext.define('SIPAS.view.Sipas.sla.unit.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_sla_unit_compact',

    requires: [
        'SIPAS.view.Sipas.unit.Compact',
        'SIPAS.view.Sipas.sla.unit.Form',
        'Ext.tab.Panel',
        'Ext.form.Panel'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'sla_unit_list',
    layout: 'border',
    bodyBorder: false,
    title: 'Daftar SLA Unit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_unit_compact',
                    dbclickToView: true,
                    clickToView: false,
                    header: false,
                    region: 'center'
                },
                {
                    xtype: 'sipas_sla_unit_form',
                    disabled: true,
                    width: 480,
                    header: false,
                    title: 'SLA',
                    region: 'east',
                    split: true
                }
            ]
        });

        me.callParent(arguments);
    }

});