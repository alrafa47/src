/*
 * File: app/model/Sipas/Golongan.js
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

Ext.define('SIPAS.model.Sipas.Golongan', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    idProperty: 'golongan_id',

    fields: [
        {
            name: 'golongan_id'
        },
        {
            name: 'golongan_level'
        },
        {
            name: 'golongan_sgt'
        },
        {
            name: 'golongan_gaji_pokok'
        },
        {
            defaultValue: 1,
            name: 'golongan_isaktif',
            type: 'boolean'
        },
        {
            name: 'golongan_ishapus'
        },
        {
            name: 'golongan_properti'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/golongan/create',
            read: 'server.php/sipas/golongan/read',
            update: 'server.php/sipas/golongan/update',
            destroy: 'server.php/sipas/golongan/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});