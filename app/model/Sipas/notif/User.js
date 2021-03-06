/*
 * File: app/model/Sipas/notif/User.js
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

Ext.define('SIPAS.model.Sipas.notif.User', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.association.HasOne'
    ],
    uses: [
        'SIPAS.model.Sipas.Disposisi',
        'SIPAS.model.Sipas.disposisi.Masuk',
        'SIPAS.model.Sipas.Surat'
    ],

    idProperty: 'notif_user_id',

    fields: [
        {
            name: 'notif_user_id'
        },
        {
            name: 'notif_user_tipe',
            type: 'int'
        },
        {
            name: 'notif_user_model',
            type: 'int'
        },
        {
            name: 'notif_user_tgl'
        },
        {
            name: 'notif_user_tanggal',
            type: 'date'
        },
        {
            name: 'notif_user_pengirim'
        },
        {
            name: 'notif_user_pengirim_profil'
        },
        {
            name: 'notif_user_penerima'
        },
        {
            name: 'notif_user_penerima_profil'
        },
        {
            name: 'notif_user_referensi'
        },
        {
            name: 'notif_user_isnew',
            type: 'int'
        },
        {
            name: 'notif_user_isbaca',
            type: 'int'
        },
        {
            name: 'notif_user_isi'
        },
        {
            name: 'penerima_id'
        },
        {
            name: 'penerima_nama'
        },
        {
            name: 'penerima_jabatan_id'
        },
        {
            name: 'penerima_jabatan_nama'
        },
        {
            name: 'penerima_unit_id'
        },
        {
            name: 'penerima_unit_nama'
        },
        {
            name: 'pengirim_id'
        },
        {
            name: 'pengirim_nama'
        },
        {
            name: 'pengirim_jabatan_id'
        },
        {
            name: 'pengirim_jabatan_nama'
        },
        {
            name: 'pengirim_unit_id'
        },
        {
            name: 'pengirim_unit_nama'
        }
    ],

    proxy: {
        type: 'ajax',
        api: {
            read: 'server.php/sipas/notif_user/all',
            update: 'server.php/sipas/notif_user/update'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    hasOne: [
        {
            model: 'SIPAS.model.Sipas.Disposisi',
            primaryKey: 'disposisi_id',
            foreignKey: 'notif_user_referensi',
            getterName: 'getDisposisi',
            setterName: 'setDisposisi'
        },
        {
            model: 'SIPAS.model.Sipas.disposisi.Masuk',
            primaryKey: 'disposisi_masuk_id',
            foreignKey: 'notif_user_referensi',
            getterName: 'getDisposisiMasuk',
            setterName: 'setDisposisiMasuk'
        },
        {
            model: 'SIPAS.model.Sipas.Surat',
            primaryKey: 'surat_id',
            foreignKey: 'notif_user_referensi',
            getterName: 'getSurat',
            setterName: 'setSurat'
        }
    ],

    reading: function(config) {
        if(this.get('notif_user_isbaca') == 1) return;
        config = Ext.apply({
            callback: Ext.emptyFn,
            success: Ext.emptyFn,
            failure: Ext.emptyFn,
            scope: this
        }, config);

        this.set({
            'notif_user_isbaca': 1
        });

        this.save(config);
    }

});