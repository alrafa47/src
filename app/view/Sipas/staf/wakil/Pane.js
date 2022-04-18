/*
 * File: app/view/Sipas/staf/wakil/Pane.js
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

Ext.define('SIPAS.view.Sipas.staf.wakil.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_staf_wakil_pane',

    requires: [
        'SIPAS.view.Sipas.staf.List',
        'SIPAS.view.Sipas.staf.wakil.Form',
        'Ext.grid.Panel',
        'Ext.form.Panel'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'assistensi_list',
    layout: 'border',
    bodyBorder: false,
    title: 'Daftar Pelaksana Harian',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'sipas_staf_list',
                    dbclickToView: true,
                    clickToView: false,
                    border: false,
                    header: false,
                    region: 'center'
                },
                {
                    xtype: 'sipas_staf_wakil_form',
                    disabled: true,
                    width: 500,
                    header: false,
                    region: 'east',
                    split: true
                }
            ]
        });

        me.callParent(arguments);
    }

});