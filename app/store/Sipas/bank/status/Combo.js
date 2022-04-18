/*
 * File: app/store/Sipas/bank/status/Combo.js
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

Ext.define('SIPAS.store.Sipas.bank.status.Combo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'Sipas.bank.status.Combo',
            data: [
                {
                    status_id: '0',
                    status_nama: 'Semua'
                },
                {
                    status_id: '1',
                    status_nama: 'Aktif (Belum Terhapus)'
                },
                {
                    status_id: '2',
                    status_nama: 'Terhapus'
                },
                {
                    status_id: '3',
                    status_nama: 'Surat Dibatalkan'
                },
                {
                    status_id: '4',
                    status_nama: 'Surat Nomor Dipindahkan'
                },
                {
                    status_id: '5',
                    status_nama: 'Surat Diarsipkan'
                },
                {
                    status_id: '6',
                    status_nama: 'Surat Dimusnahkan'
                }
            ],
            fields: [
                {
                    name: 'status_id'
                },
                {
                    name: 'status_nama'
                }
            ]
        }, cfg)]);
    }
});