/*
 * File: app/view/Sipas/kelas/Treelist.js
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

Ext.define('SIPAS.view.Sipas.kelas.Treelist', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.sipas_kelas_treelist',

    requires: [
        'SIPAS.view.Sipas.com.atribut.cascade.Toolbar',
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Add',
        'SIPAS.view.Sipas.com.button.View',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.ComboBox',
        'Ext.tree.View',
        'Ext.tree.Column',
        'SIPAS.store.Sipas.kelas.aktif.Treelist'
    ],

    cilckToView: true,
    clickToView: true,
    title: 'Klasifikasi Surat',
    emptyText: 'Tidak ada Data',
    hideHeaders: true,
    rowLines: true,
    store: 'Sipas.kelas.aktif.Treelist',
    rootVisible: false,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'sipas_com_atribut_cascade_toolbar',
                    dock: 'top'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        }
                    },
                    items: [
                        {
                            xtype: 'sipas_com_button_refresh'
                        },
                        {
                            xtype: 'sipas_com_button_add',
                            roleName: 'kelas_insert',
                            roleable: true
                        },
                        {
                            xtype: 'sipas_com_button_view',
                            roleable: false,
                            hidden: true
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'Aktif',
                            fieldLabel: 'Tampilkan',
                            labelAlign: 'right',
                            value: 'Aktif',
                            editable: false,
                            hideTrigger: true,
                            displayField: 'nama',
                            store: {
                                fields: [
                                    'value',
                                    'nama'
                                ],
                                data: [
                                    {
                                        value: 0,
                                        nama: 'Semua'
                                    },
                                    {
                                        value: 1,
                                        nama: 'Aktif'
                                    },
                                    {
                                        value: 2,
                                        nama: 'Tidak Aktif'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }
                    ]
                }
            ],
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'treecolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.get('kelas_isaktif') == '1'){
                            return (new Ext.Template('{kelas_kode} {kelas_nama}')).apply(record.getData());
                        } else {
                            return (new Ext.Template('<span class="alternative">{kelas_kode} {kelas_nama}</span>')).apply(record.getData());
                        }
                    },
                    dataIndex: 'kelas_nama',
                    text: 'Klasifikasi',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});