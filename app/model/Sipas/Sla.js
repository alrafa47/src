/*
 * File: app/model/Sipas/Sla.js
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

Ext.define('SIPAS.model.Sipas.Sla', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.association.HasMany'
    ],
    uses: [
        'SIPAS.model.Sipas.sla.Rumus',
        'SIPAS.model.Sipas.sla.Unit'
    ],

    idProperty: 'sla_id',

    fields: [
        {
            name: 'sla_id'
        },
        {
            name: 'sla_nama'
        },
        {
            name: 'sla_properti'
        },
        {
            name: 'sla_properti_id'
        },
        {
            name: 'sla_properti_buat_tgl',
            type: 'date'
        },
        {
            name: 'sla_properti_pembuat_id'
        },
        {
            name: 'sla_properti_pembuat_kode'
        },
        {
            name: 'sla_properti_pembuat_nama'
        },
        {
            name: 'sla_properti_pembuat_unit'
        },
        {
            name: 'sla_properti_pembuat_unit_nama'
        },
        {
            name: 'sla_properti_pembuat_jabatan'
        },
        {
            name: 'sla_properti_pembuat_jabatan_nama'
        },
        {
            name: 'sla_properti_isubah'
        },
        {
            name: 'sla_properti_ubah_tgl',
            type: 'date'
        },
        {
            name: 'sla_properti_pengubah_id'
        },
        {
            name: 'sla_properti_pengubah_kode'
        },
        {
            name: 'sla_properti_pengubah_nama'
        },
        {
            name: 'sla_properti_pengubah_unit'
        },
        {
            name: 'sla_properti_pengubah_unit_nama'
        },
        {
            name: 'sla_properti_pengubah_jabatan'
        },
        {
            name: 'sla_properti_pengubah_jabatan_nama'
        },
        {
            name: 'sla_properti_ishapus'
        },
        {
            name: 'sla_properti_hapus_tgl',
            type: 'date'
        },
        {
            name: 'sla_properti_penghapus_id'
        },
        {
            name: 'sla_properti_penghapus_kode'
        },
        {
            name: 'sla_properti_penghapus_nama'
        },
        {
            name: 'sla_properti_penghapus_unit'
        },
        {
            name: 'sla_properti_penghapus_unit_nama'
        },
        {
            name: 'sla_properti_penghapus_jabatan'
        },
        {
            name: 'sla_properti_penghapus_jabatan_nama'
        },
        {
            name: 'sla_properti_ispulih'
        },
        {
            name: 'sla_properti_pulih_tgl',
            type: 'date'
        },
        {
            name: 'sla_properti_pemulih_id'
        },
        {
            name: 'sla_properti_pemulih_kode'
        },
        {
            name: 'sla_properti_pemulih_nama'
        },
        {
            name: 'sla_properti_pemulih_unit'
        },
        {
            name: 'sla_properti_pemulih_unit_nama'
        },
        {
            name: 'sla_properti_pemulih_jabatan'
        },
        {
            name: 'sla_properti_pemulih_jabatan_nama'
        },
        {
            name: 'sla_properti_data'
        },
        {
            name: 'sla_hasil',
            type: 'int'
        },
        {
            name: 'sla_kriteria'
        },
        {
            defaultValue: 1,
            name: 'sla_isaktif',
            type: 'boolean'
        },
        {
            name: 'sla_unit_jumlah',
            type: 'int'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/sla/create',
            read: 'server.php/sipas/sla/read',
            update: 'server.php/sipas/sla/update',
            destroy: 'server.php/sipas/sla/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    hasMany: [
        {
            model: 'SIPAS.model.Sipas.sla.Rumus',
            primaryKey: 'sla_id',
            foreignKey: 'sla_rumus_sla',
            name: 'fetchRumus',
            storeConfig: {
                remoteFilter: false,
                remoteSort: false,
                remoteGroup: false,
                pageSize: 100,
                proxy: {
                    type: 'ajax',
                    reader: {
                        root: 'data'
                    },
                    api: {
                        read: 'server.php/sipas/sla_rumus/read',
                        create: 'server.php/sipas/sla_rumus/create',
                        update: 'server.php/sipas/sla_rumus/update',
                        destroy: 'server.php/sipas/sla_rumus/destroy'
                    }
                },
                sorters: {
                    property: 'sla_rumus_nilai'
                }
            }
        },
        {
            model: 'SIPAS.model.Sipas.sla.Unit',
            primaryKey: 'sla_id',
            foreignKey: 'sla_unit_sla',
            name: 'fetchSLAUnit'
        }
    ]
});