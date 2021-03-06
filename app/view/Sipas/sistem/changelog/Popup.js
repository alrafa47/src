/*
 * File: app/view/Sipas/sistem/changelog/Popup.js
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

Ext.define('SIPAS.view.Sipas.sistem.changelog.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_sistem_changelog_popup',

    requires: [
        'Ext.panel.Panel'
    ],

    height: 560,
    itemId: 'popupApsSupportChangelog',
    width: 860,
    constrain: true,
    layout: 'fit',
    bodyStyle: 'background-color: #FFFFFF;',
    title: 'Daftar Perubahan',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'frame',
                    autoScroll: true,
                    bodyPadding: '10 10 10 10',
                    header: false,
                    title: 'My Panel'
                }
            ]
        });

        me.callParent(arguments);
    }

});