/*
 * File: app/view/Sipas/sistem/backup/proses/List.js
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

Ext.define('SIPAS.view.Sipas.sistem.backup.proses.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_sistem_backup_proses_list',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    itemId: 'gridProses',
    title: 'Detail Progres',
    store: 'Sipas.sistem.backup.process.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'process_nama',
                    text: 'Proses',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'process_status_convert',
                    text: 'Status'
                }
            ]
        });

        me.callParent(arguments);
    }

});