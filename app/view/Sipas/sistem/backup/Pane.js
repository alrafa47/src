/*
 * File: app/view/Sipas/sistem/backup/Pane.js
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

Ext.define('SIPAS.view.Sipas.sistem.backup.Pane', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_sistem_backup_pane',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.toolbar.TextItem',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    clickToView: true,
    header: false,
    title: 'Daftar Backup',
    store: 'Sipas.sistem.backup.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'tbtext',
                            text: '<b>Daftar Backup</b>'
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'backup_id',
                    text: 'Daftar backup',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});