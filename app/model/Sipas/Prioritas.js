/*
 * File: app/model/Sipas/Prioritas.js
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

Ext.define('SIPAS.model.Sipas.Prioritas', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    idProperty: 'prioritas_id',

    fields: [
        {
            name: 'prioritas_id'
        },
        {
            name: 'prioritas_kode'
        },
        {
            name: 'prioritas_nama'
        },
        {
            defaultValue: 1,
            name: 'prioritas_isaktif',
            type: 'boolean'
        },
        {
            convert: function(v, rec) {
                return (new Ext.Template('{prioritas_nama} ({prioritas_kode})')).apply(rec.getData());
            },
            name: 'prioritas_display'
        },
        {
            name: 'prioritas_properti'
        },
        {
            name: 'prioritas_retensi',
            type: 'int'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/prioritas/create',
            read: 'server.php/sipas/prioritas/read',
            update: 'server.php/sipas/prioritas/update',
            destroy: 'server.php/sipas/prioritas/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});