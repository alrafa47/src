/*
 * File: app/store/Sipas/arsip/log/Treelist.js
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

Ext.define('SIPAS.store.Sipas.arsip.log.Treelist', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'SIPAS.model.Sipas.Dokumen',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'SIPAS.model.Sipas.Dokumen',
            storeId: 'Sipas.arsip.log.Treelist',
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/dokumen/riwayatdokumen',
                reader: {
                    type: 'json'
                }
            },
            listeners: {
                beforeload: {
                    fn: me.onTreeStoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onTreeStoreBeforeLoad: function(store, operation, eOpts) {
        if(store.isLoading()){
            return false;
        }
    }

});