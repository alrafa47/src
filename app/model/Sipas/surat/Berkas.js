/*
 * File: app/model/Sipas/surat/Berkas.js
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

Ext.define('SIPAS.model.Sipas.surat.Berkas', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field',
        'Ext.data.association.HasOne'
    ],
    uses: [
        'SIPAS.model.Sipas.Surat'
    ],

    idProperty: 'surat_berkas_id',

    proxy: {
        type: 'ajax',
        api: {
            create: 'server.php/sipas/surat_berkas/create',
            read: 'server.php/sipas/surat_berkas/read',
            update: 'server.php/sipas/surat_berkas/update',
            destroy: 'server.php/sipas/surat_berkas/destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    fields: [
        {
            name: 'surat_berkas_id'
        },
        {
            name: 'surat_berkas_surat'
        },
        {
            name: 'surat_berkas_nama'
        },
        {
            name: 'surat_berkas_file',
            persist: false
        },
        {
            name: 'surat_berkas_preview',
            persist: false
        },
        {
            name: 'surat_berkas_download',
            persist: false
        },
        {
            name: 'surat_berkas_size',
            persist: false
        },
        {
            name: 'surat_berkas_date',
            type: 'date'
        },
        {
            name: 'surat_berkas_ext',
            persist: false
        },
        {
            name: 'surat_berkas_mime',
            persist: false
        },
        {
            defaultValue: 0,
            name: 'surat_berkas_progress',
            type: 'int'
        }
    ],

    hasOne: {
        model: 'SIPAS.model.Sipas.Surat',
        primaryKey: 'surat_id',
        foreignKey: 'surat_berkas_surat',
        getterName: 'getSurat',
        setterName: 'setSurat'
    },

    isDownloadable: function() {
        return !!this.get('surat_berkas_download');
    },

    isRemoveable: function() {

    },

    isPreviewable: function() {
        return !!this.get('surat_berkas_preview');
    },

    isSuccess: function() {
        return this.get('surat_berkas_progress') == this.statics.uploadStatus().SUCCESS
    },

    isUplading: function() {
        return this.get('surat_berkas_progress') == this.statics.uploadStatus().PROGRESS
    },

    isFailed: function() {
        return this.get('surat_berkas_progress') == this.statics.uploadStatus().FAILED
    }

});