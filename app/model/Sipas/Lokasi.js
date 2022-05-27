/*
 * File: app/model/Sipas/Lokasi.js
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

Ext.define('SIPAS.model.Sipas.Lokasi', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    idProperty: 'lokasi_id',

    fields: [
        {
            name: 'lokasi_id'
        },
        {
            name: 'lokasi_kode'
        },
        {
            name: 'lokasi_nama'
        },
        {
            name: 'lokasi_unit_id'
        },
        {
            name: 'lokasi_unit_nama'
        },
        {
            defaultValue: 1,
            name: 'lokasi_isaktif',
            type: 'boolean'
        },
        {
            convert: function(v, rec) {
                return (new Ext.Template('{lokasi_nama} ({lokasi_kode})')).apply(rec.getData());
            },
            name: 'lokasi_display'
        },
        {
            name: 'lokasi_properti'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/lokasi/create',
            read: 'server.php/sipas/lokasi/read',
            update: 'server.php/sipas/lokasi/update',
            destroy: 'server.php/sipas/lokasi/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});