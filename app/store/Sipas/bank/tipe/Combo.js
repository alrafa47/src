/*
 * File: app/store/Sipas/bank/tipe/Combo.js
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

Ext.define('SIPAS.store.Sipas.bank.tipe.Combo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Sipas.bank.tipe.Combo',
            data: [
                {
                    tipe_id: 'surat_semua',
                    tipe_nama: '-- Semua Surat --'
                },
                {
                    tipe_id: 'surat_masuk',
                    tipe_nama: 'Surat Masuk'
                },
                {
                    tipe_id: 'surat_keluar',
                    tipe_nama: 'Surat Keluar'
                },
                {
                    tipe_id: 'surat_internal',
                    tipe_nama: 'Surat Internal'
                },
                {
                    tipe_id: 'surat_konsep',
                    tipe_nama: 'Konsep Surat'
                }
            ],
            fields: [
                {
                    name: 'tipe_id'
                },
                {
                    name: 'tipe_nama'
                }
            ]
        }, cfg)]);
    }
});