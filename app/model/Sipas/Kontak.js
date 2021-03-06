/*
 * File: app/model/Sipas/Kontak.js
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

Ext.define('SIPAS.model.Sipas.Kontak', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    idProperty: 'kontak_id',

    fields: [
        {
            name: 'kontak_id'
        },
        {
            name: 'kontak_nama'
        },
        {
            name: 'kontak_unit_id'
        },
        {
            name: 'kontak_unit_nama'
        },
        {
            name: 'kontak_properti'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/kontak/create',
            read: 'server.php/sipas/kontak/read',
            update: 'server.php/sipas/kontak/update',
            destroy: 'server.php/sipas/kontak/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});