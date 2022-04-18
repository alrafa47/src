/*
 * File: app/model/Sipas/Sifat.js
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

Ext.define('SIPAS.model.Sipas.Sifat', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    idProperty: 'sifat_id',

    fields: [
        {
            name: 'sifat_id'
        },
        {
            name: 'sifat_kode'
        },
        {
            name: 'sifat_color'
        },
        {
            name: 'sifat_nama'
        },
        {
            defaultValue: 1,
            name: 'sifat_isaktif',
            type: 'boolean'
        },
        {
            convert: function(v, rec) {
                return (new Ext.Template('{sifat_nama} ({sifat_kode})')).apply(rec.getData());
            },
            name: 'sifat_display'
        },
        {
            name: 'sifat_israhasia',
            type: 'boolean'
        },
        {
            name: 'sifat_properti'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/sifat/create',
            read: 'server.php/sipas/sifat/read',
            update: 'server.php/sipas/sifat/update',
            destroy: 'server.php/sipas/sifat/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});