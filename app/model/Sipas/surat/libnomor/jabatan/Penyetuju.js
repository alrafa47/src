/*
 * File: app/model/Sipas/surat/libnomor/jabatan/Penyetuju.js
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

Ext.define('SIPAS.model.Sipas.surat.libnomor.jabatan.Penyetuju', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.association.HasOne',
        'Ext.data.association.HasMany'
    ],
    uses: [
        'SIPAS.model.Sipas.Jabatan',
        'SIPAS.model.Sipas.Unit',
        'SIPAS.model.Sipas.unit.Cakupan',
        'SIPAS.model.Sipas.Staf'
    ],

    idProperty: 'jabatan_id',

    fields: [
        {
            name: 'jabatan_id'
        },
        {
            name: 'jabatan_kode'
        },
        {
            name: 'jabatan_nama'
        },
        {
            name: 'jabatan_induk'
        },
        {
            name: 'jabatan_keterangan'
        },
        {
            name: 'jabatan_unit'
        },
        {
            name: 'jabatan_induk_id'
        },
        {
            name: 'jabatan_induk_nama'
        },
        {
            name: 'jabatan_induk_keterangan'
        },
        {
            convert: function(v, rec) {
                return rec.get('leaf') ? 'icon ion-md-person':'icon ion-md-close grey-600-i';
            },
            defaultValue: 'icon ion-md-person',
            name: 'iconCls'
        },
        {
            name: 'unit_id'
        },
        {
            name: 'unit_nama'
        },
        {
            name: 'jabatan_properti'
        },
        {
            defaultValue: 1,
            name: 'jabatan_isaktif',
            type: 'boolean'
        },
        {
            defaultValue: 1,
            name: 'jabatan_isnomor',
            type: 'boolean'
        },
        {
            name: 'jabatan_unit_jumlah',
            type: 'int'
        },
        {
            name: 'jabatan_staf_jumlah',
            type: 'int'
        },
        {
            name: 'jabatan_ishapus',
            type: 'boolean'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/jabatan/create',
            read: 'server.php/sipas/jabatan/read',
            update: 'server.php/sipas/jabatan/update',
            destroy: 'server.php/sipas/jabatan/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    hasOne: [
        {
            model: 'SIPAS.model.Sipas.Jabatan',
            primaryKey: 'jabatan_id',
            foreignKey: 'jabatan_induk',
            getterName: 'getParent',
            setterName: 'setParent'
        },
        {
            model: 'SIPAS.model.Sipas.Unit',
            primaryKey: 'unit_id',
            foreignKey: 'jabatan_unit',
            getterName: 'getUnit',
            setterName: 'setUnit'
        }
    ],

    hasMany: [
        {
            model: 'SIPAS.model.Sipas.unit.Cakupan',
            primaryKey: 'jabatan_id',
            foreignKey: 'unit_cakupan_jabatan',
            name: 'fetchCakupan',
            storeConfig: {
                remoteFilter: false,
                remoteSort: false,
                remoteGroup: false,
                pageSize: 1000,
                proxy: {
                    type: 'ajax',
                    reader: {
                        root: 'data'
                    },
                    api: {
                        read: 'server.php/sipas/unit_cakupan/read',
                        create: 'server.php/sipas/unit_cakupan/create',
                        update: 'server.php/sipas/unit_cakupan/update',
                        destroy: 'server.php/sipas/unit_cakupan/destroy'
                    }
                }
            }
        },
        {
            model: 'SIPAS.model.Sipas.Staf',
            primaryKey: 'jabatan_id',
            foreignKey: 'staf_jabatan',
            name: 'fetchStaf',
            storeConfig: {
                remoteFilter: false,
                remoteSort: false,
                remoteGroup: false,
                proxy: {
                    type: 'ajax',
                    reader: {
                        root: 'data'
                    },
                    api: {
                        read: 'server.php/sipas/staf/read'
                    }
                },
                sorters: {
                    property: 'jabatan_nama'
                }
            }
        }
    ]
});