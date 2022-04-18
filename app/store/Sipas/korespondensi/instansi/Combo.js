/*
 * File: app/store/Sipas/korespondensi/instansi/Combo.js
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

Ext.define('SIPAS.store.Sipas.korespondensi.instansi.Combo', {
    extend: 'Ext.data.Store',
    alias: 'store.sipas_korespondensi_instansi_combo',

    requires: [
        'SIPAS.model.Sipas.Korespondensi',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'SIPAS.model.Sipas.Korespondensi',
            storeId: 'Sipas.korespondensi.instansi.Combo',
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/korespondensi/read/combo',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            sorters: {
                property: 'korespondensi_pengirim'
            }
        }, cfg)]);
    }
});