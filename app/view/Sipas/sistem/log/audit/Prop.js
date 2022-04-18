/*
 * File: app/view/Sipas/sistem/log/audit/Prop.js
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

Ext.define('SIPAS.view.Sipas.sistem.log.audit.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_sistem_log_audit_prop',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column'
    ],

    minWidth: 400,
    width: 700,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Audit Trail',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: '8 16 8 16',
                    header: false,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Kode',
                            name: 'properti_slug'
                        },
                        {
                            xtype: 'label',
                            text: 'Pembuatan:'
                        },
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            border: false,
                            height: 100,
                            itemId: 'pembuatan',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'Sipas.sistem.log.audit.Buat',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'at',
                                    text: 'Tgl'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'by',
                                    text: 'Pembuat'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'data',
                                    text: 'Data',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Perubahan Terakhir:'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Tanggal',
                            name: 'properti_ubah_tgl'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Perubah',
                            name: 'properti_pengubah_nama'
                        },
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            border: false,
                            height: 100,
                            itemId: 'perubahan',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'Sipas.sistem.log.audit.Ubah',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'at',
                                    text: 'Tgl'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'by',
                                    text: 'Perubah'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'data',
                                    text: 'Data',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Penghapusan:'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Tanggal',
                            name: 'properti_hapus_tgl'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Penghapus',
                            name: 'properti_penghapus_nama'
                        },
                        {
                            xtype: 'gridpanel',
                            associated: true,
                            border: false,
                            height: 100,
                            itemId: 'penghapusan',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'Sipas.sistem.log.audit.Hapus',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'at',
                                    text: 'Tgl'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    dataIndex: 'by',
                                    text: 'Penghapus'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'data',
                                    text: 'Data',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});