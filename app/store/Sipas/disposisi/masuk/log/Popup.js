/*
 * File: app/store/Sipas/disposisi/masuk/log/Popup.js
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

Ext.define('SIPAS.store.Sipas.disposisi.masuk.log.Popup', {
    extend: 'Ext.data.Store',

    requires: [
        'SIPAS.model.Sipas.disposisi.masuk.Log',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'SIPAS.model.Sipas.disposisi.masuk.Log',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Sipas.disposisi.masuk.log.Popup',
            remoteGroup: true,
            proxy: {
                type: 'ajax',
                url: 'server.php/sipas/disposisi_masuk_log/read',
                reader: {
                    type: 'json',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true
                }
            },
            sorters: {
                direction: 'DESC',
                property: 'disposisi_masuk_log_tgl',
                root: 'data'
            }
        }, cfg)]);
    }
});