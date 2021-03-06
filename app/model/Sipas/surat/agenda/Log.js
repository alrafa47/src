/*
 * File: app/model/Sipas/surat/agenda/Log.js
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

Ext.define('SIPAS.model.Sipas.surat.agenda.Log', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    idProperty: 'surat_log_id',

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/surat_log/create',
            read: 'server.php/sipas/surat_log/read',
            update: 'server.php/sipas/surat_log/update',
            destroy: 'server.php/sipas/surat_log/destroy'
        },
        reader: {
            type: 'json',
            messageProperty: 'message',
            root: 'data'
        }
    },

    fields: [
        {
            name: 'surat_log_id'
        },
        {
            name: 'surat_log_staf'
        },
        {
            name: 'surat_log_profil'
        },
        {
            name: 'surat_log_surat'
        },
        {
            name: 'surat_log_arsip'
        },
        {
            name: 'surat_log_ekspedisi'
        },
        {
            name: 'surat_log_petugas'
        },
        {
            name: 'surat_log_setuju'
        },
        {
            name: 'surat_log_catatan'
        },
        {
            name: 'surat_log_data'
        },
        {
            name: 'surat_log_properti'
        },
        {
            name: 'surat_log_tipe',
            type: 'int'
        },
        {
            name: 'surat_log_tgl',
            type: 'date'
        },
        {
            name: 'surat_id'
        },
        {
            name: 'surat_arsip'
        },
        {
            name: 'surat_model'
        },
        {
            name: 'surat_itipe'
        },
        {
            name: 'surat_registrasi'
        },
        {
            name: 'surat_nomor'
        },
        {
            name: 'surat_agenda'
        },
        {
            name: 'surat_agenda_sub'
        },
        {
            name: 'surat_tanggal'
        },
        {
            name: 'surat_perihal'
        },
        {
            name: 'surat_pengirim'
        },
        {
            name: 'surat_tujuan'
        },
        {
            name: 'surat_kepada'
        },
        {
            name: 'surat_lampiran'
        },
        {
            name: 'surat_lampiran_sub'
        },
        {
            name: 'surat_usesetuju'
        },
        {
            name: 'surat_ringkasan'
        },
        {
            name: 'surat_catatan'
        },
        {
            name: 'surat_unit'
        },
        {
            name: 'surat_setuju_isurut'
        },
        {
            name: 'surat_setuju_komentar'
        },
        {
            name: 'surat_setuju'
        },
        {
            name: 'surat_setuju_staf'
        },
        {
            name: 'surat_setuju_profil'
        },
        {
            name: 'surat_setuju_tgl'
        },
        {
            name: 'surat_distribusi_staf'
        },
        {
            name: 'surat_distribusi_profil'
        },
        {
            name: 'surat_distribusi_tgl'
        },
        {
            name: 'surat_selesai_staf'
        },
        {
            name: 'surat_selesai_profil'
        },
        {
            name: 'surat_selesai_tgl'
        },
        {
            name: 'surat_terima_staf'
        },
        {
            name: 'surat_korespondensi'
        },
        {
            name: 'surat_korespondensi_surat'
        },
        {
            name: 'surat_useretensi'
        },
        {
            name: 'surat_retensi_tgl'
        },
        {
            name: 'surat_prioritas'
        },
        {
            name: 'surat_kelas'
        },
        {
            name: 'surat_lokasi'
        },
        {
            name: 'surat_jenis'
        },
        {
            name: 'surat_media'
        },
        {
            name: 'surat_sifat'
        },
        {
            name: 'surat_sla'
        },
        {
            name: 'surat_usesla'
        },
        {
            name: 'surat_israhasia'
        },
        {
            name: 'surat_properti'
        },
        {
            name: 'surat_ekspedisi'
        },
        {
            name: 'staf_id'
        },
        {
            name: 'staf_peran'
        },
        {
            name: 'staf_akun'
        },
        {
            name: 'staf_kode'
        },
        {
            name: 'staf_nama'
        },
        {
            name: 'staf_kelamin'
        },
        {
            name: 'staf_isaktif'
        },
        {
            name: 'staf_unit'
        },
        {
            name: 'unit_nama'
        },
        {
            name: 'staf_jabatan'
        },
        {
            name: 'jabatan_nama'
        },
        {
            name: 'ekspedisi_id'
        },
        {
            name: 'ekspedisi_nama'
        },
        {
            name: 'ekspedisi_kode'
        },
        {
            name: 'ekspedisi_isaktif'
        },
        {
            name: 'ekspedisi_properti'
        },
        {
            name: 'surat_useberkas',
            type: 'boolean'
        }
    ],

    reading: function(config) {
        config = Ext.apply({
            callback: Ext.emptyFn,
            success: Ext.emptyFn,
            failure: Ext.emptyFn,
            scope: this
        }, config);

        this.set({
            'surat_log_surat' : config.surat,
            'surat_log_staf' : config.staf,
            'surat_log_tgl': new Date(),
            'status': 0
        });
        this.save(config);
    },

    status: function(config) {
        config = Ext.apply({
            callback: Ext.emptyFn,
            success: Ext.emptyFn,
            failure: Ext.emptyFn,
            scope: this
        }, config);

        this.set({
            'surat_log_surat' : config.surat,
            'surat_log_staf' : config.staf,
            'surat_log_setuju' : config.status,
            'surat_log_pesan' : config.pesan,
            'surat_log_tgl': new Date(),
            'status': 1
        });
        this.save(config);
    }

});