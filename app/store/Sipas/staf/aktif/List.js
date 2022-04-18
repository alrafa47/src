/*
 * File: app/store/Sipas/staf/aktif/List.js
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

Ext.define('SIPAS.store.Sipas.staf.aktif.List', {
    extend: 'Ext.data.Store',

    requires: [
        'SIPAS.model.Sipas.Staf',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'SIPAS.model.Sipas.Staf',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Sipas.staf.aktif.List',
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/staf/aktif',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            sorters: {
                property: 'staf_nama'
            }
        }, cfg)]);
    }
});