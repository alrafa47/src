/*
 * File: app/store/Sipas/sla/aktif/Combo.js
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

Ext.define('SIPAS.store.Sipas.sla.aktif.Combo', {
    extend: 'Ext.data.Store',
    alias: 'store.sipas_sla_combo',

    requires: [
        'SIPAS.model.Sipas.Sla',
        'Ext.util.Sorter',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'SIPAS.model.Sipas.Sla',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Sipas.sla.aktif.Combo',
            pageSize: 1000,
            remoteGroup: true,
            sorters: {
                property: 'sla_nama'
            },
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/sla/aktif',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});