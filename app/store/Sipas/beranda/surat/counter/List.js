/*
 * File: app/store/Sipas/beranda/surat/counter/List.js
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

Ext.define('SIPAS.store.Sipas.beranda.surat.counter.List', {
    extend: 'Ext.data.Store',

    requires: [
        'SIPAS.model.Sipas.beranda.Counter',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'SIPAS.model.Sipas.beranda.Counter',
            remoteFilter: true,
            storeId: 'Sipas.beranda.surat.counter.List',
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/beranda/suratcount',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});