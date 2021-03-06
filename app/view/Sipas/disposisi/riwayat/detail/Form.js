/*
 * File: app/view/Sipas/disposisi/riwayat/detail/Form.js
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

Ext.define('SIPAS.view.Sipas.disposisi.riwayat.detail.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_disposisi_riwayat_detail_form',

    requires: [
        'SIPAS.view.Sipas.disposisi.riwayat.detail.penerima.List',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.grid.Panel'
    ],

    autoScroll: true,
    layout: 'border',
    header: false,
    title: 'Detail Pengiriman Disposisi',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    region: 'west',
                    border: false,
                    hidden: true,
                    width: 275,
                    autoScroll: true,
                    bodyPadding: 10,
                    header: false,
                    title: 'My Form',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'disposisi_tanggal',
                            fieldLabel: 'Tgl.Disposisi',
                            labelWidth: 120,
                            name: 'disposisi_tgl',
                            readOnly: true,
                            format: 'd M Y',
                            submitFormat: 'd-M-Y'
                        },
                        {
                            xtype: 'combobox',
                            associated: true,
                            featureable: true,
                            featureName: 'perintahtindakan',
                            fieldLabel: 'Perintah',
                            labelAlign: 'top',
                            labelWidth: 120,
                            name: 'disposisi_perintah',
                            readOnly: true,
                            displayField: 'perintah_nama',
                            store: 'Sipas.perintah.Combo',
                            valueField: 'perintah_id'
                        },
                        {
                            xtype: 'textareafield',
                            frame: false,
                            fieldLabel: 'Uraian Disposisi',
                            hideLabel: true,
                            labelAlign: 'top',
                            labelWidth: 120,
                            name: 'disposisi_pesan',
                            readOnly: true,
                            emptyText: 'Uraian Disposisi'
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            collapsed: true,
                            collapsible: true,
                            title: 'Rincian',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    width: 360,
                                    fieldLabel: 'Kode Disposisi',
                                    name: 'disposisi_kode',
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'sipas_disposisi_riwayat_detail_penerima_list',
                    associated: true,
                    border: false,
                    minWidth: 300,
                    width: 150,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }

});