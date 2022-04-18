/*
 * File: app/view/Sipas/jabatan/penerima/List.js
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

Ext.define('SIPAS.view.Sipas.jabatan.penerima.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jabatan_penerima_list',

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.jabatan.penerima.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer',
                    hidden: true,
                    width: 10
                },
                {
                    xtype: 'actioncolumn',
                    itemId: 'colDelete',
                    width: 40,
                    align: 'center',
                    menuDisabled: true,
                    items: [
                        {
                            action: 'removerecord',
                            iconCls: 'x-action-col-icon-bin'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    height: 40,
                    minWidth: 160,
                    sortable: false,
                    dataIndex: 'jabatan_nama',
                    menuDisabled: true,
                    text: 'Daftar Pilihan',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});