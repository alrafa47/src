/*
 * File: app/model/Sipas/jabatan/tim/Anggota.js
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

Ext.define('SIPAS.model.Sipas.jabatan.tim.Anggota', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field',
        'Ext.data.association.HasOne'
    ],
    uses: [
        'SIPAS.model.Sipas.jabatan.Tim',
        'SIPAS.model.Sipas.Jabatan'
    ],

    idProperty: 'jabatan_tim_anggota_id',

    proxy: {
        type: 'ajax',
        api: {
            read: 'server.php/sipas/jabatan_tim_anggota/read',
            create: 'server.php/sipas/jabatan_tim_anggota/create',
            update: 'server.php/sipas/jabatan_tim_anggota/update',
            destroy: 'server.php/sipas/jabatan_tim_anggota/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    fields: [
        {
            name: 'jabatan_tim_anggota_id'
        },
        {
            name: 'jabatan_tim_anggota_tim'
        },
        {
            name: 'jabatan_tim_anggota_jabatan'
        },
        {
            name: 'jabatan_tim_anggota_properti'
        },
        {
            name: 'jabatan_tim_id'
        },
        {
            name: 'jabatan_tim_nama'
        },
        {
            name: 'anggota_id'
        },
        {
            name: 'anggota_nama'
        },
        {
            name: 'anggota_kode'
        },
        {
            name: 'anggota_jabatan_isnomor'
        },
        {
            name: 'anggota_jabatan_ispenerima'
        },
        {
            name: 'anggota_unit'
        },
        {
            name: 'anggota_unit_nama'
        }
    ],

    hasOne: [
        {
            model: 'SIPAS.model.Sipas.jabatan.Tim',
            primaryKey: 'jabatan_tim_id',
            foreignKey: 'jabatan_tim_anggota_tim',
            getterName: 'getKelompok',
            setterName: 'setKelompok'
        },
        {
            associationKey: 'jabatan_tim_jabatan_record',
            model: 'SIPAS.model.Sipas.Jabatan',
            primaryKey: 'jabatan_id',
            foreignKey: 'jabatan_tim_anggota_jabatan',
            getterName: 'getJabatan',
            setterName: 'setJabatan'
        }
    ]
});