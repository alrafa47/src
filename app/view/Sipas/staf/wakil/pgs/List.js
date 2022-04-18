/*
 * File: app/view/Sipas/staf/wakil/pgs/List.js
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

Ext.define('SIPAS.view.Sipas.staf.wakil.pgs.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_staf_wakil_pgs_list',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
        'Ext.grid.View',
        'Ext.grid.plugin.RowEditing'
    ],

    itemId: 'namaPgs',
    header: false,
    title: 'Pengganti Sementara',
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.staf.wakil.pgs.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    items: [
                        {
                            xtype: 'label',
                            cls: 'alternative bold',
                            padding: 4,
                            text: 'Daftar Asisten '
                        }
                    ]
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
                            xtype: 'combobox',
                            roleable: true,
                            roleName: 'staf_pgs_monitoring_save',
                            featureable: true,
                            featureName: 'asistensi',
                            flex: 1,
                            cls: 'x-field-search',
                            itemId: 'fieldSearch',
                            width: '100%',
                            emptyText: 'Tambah pengganti sementara',
                            enforceMaxLength: true,
                            hideTrigger: true,
                            anyMatch: true,
                            displayField: 'staf_nama',
                            forceSelection: true,
                            minChars: 2,
                            queryMode: 'local',
                            store: 'Sipas.staf.wakil.asisten.Combo',
                            valueField: 'staf_id',
                            listConfig: {
                                xtype: 'boundlist',
                                emptyText: 'Pencarian tidak ditemukan',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{staf_nama} <span class="alternative">({unit_nama})</span>'
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            roleable: true,
                            roleName: 'staf_pgs_monitoring_save',
                            featureable: true,
                            featureName: 'asistensi',
                            itemId: 'buttonManual',
                            text: 'Pilih Manual'
                        },
                        {
                            xtype: 'tbfill',
                            hidden: true
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'actioncolumn',
                    roleable: true,
                    roleName: 'staf_pgs_monitoring_save',
                    featureable: true,
                    featureName: 'asistensi',
                    itemId: 'btnHapus',
                    width: 36,
                    align: 'center',
                    menuDisabled: true,
                    items: [
                        {
                            action: 'removerecord',
                            iconCls: 'x-action-col-icon-bin'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var id = record.get('staf_id'),
                            tpl = this.dataTpl || (
                            this.tpl =
                            "<div class='cell-row'><div class='cell-visual cell-visual-left'>"+
                            "<img src='server.php/sipas/staf/get_image/foto?id="+id+"' class='img img-circle img-16'>"+
                            "</div><div class='cell-text'>"+value+"</div></div>"
                            );

                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    filterable: false,
                    languageable: true,
                    itemId: 'namaPgs',
                    minWidth: 200,
                    width: 200,
                    sortable: true,
                    dataIndex: 'staf_nama',
                    text: 'Daftar Pengganti',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'staf_wakil_tgl_mulai',
                    text: 'Tgl Mulai',
                    format: 'd M Y',
                    editor: {
                        xtype: 'datefield',
                        name: 'staf_wakil_tgl_mulai'
                    }
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'staf_wakil_tgl_selesai',
                    text: 'Tgl Selesai',
                    format: 'd M Y',
                    editor: {
                        xtype: 'datefield',
                        name: 'staf_wakil_tgl_selesai'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    roleable: true,
                    roleName: 'staf_pgs_monitoring_save',
                    featureable: true,
                    featureName: 'asistensi',
                    itemId: 'btnKonfirm',
                    width: 80,
                    align: 'center',
                    menuDisabled: true,
                    text: 'Konfirmasi',
                    items: [
                        {
                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                var status = r.get('staf_wakil_konfirmasi_asisten_status');

                                if(status == 2){
                                    metadata.tdAttr = 'data-qtip="Sudah Terkonfirmasi"';
                                    return 'x-action-col-icon-checkmark';
                                }else{
                                    metadata.tdAttr = 'data-qtip="Anda Perlu Konfirmasi"';
                                    return 'x-action-col-icon-compose';
                                }
                            },
                            action: 'konfirm'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var val = '';

                        if(value == 2){
                            metaData.tdAttr = 'data-qtip="Sudah Terkonfirmasi"';
                            val = "<span class='badge badge-solid'><i class='icon ion-md-checkmark-circle green-500-i'></i></span>";
                        }else{
                            metaData.tdAttr = 'data-qtip="Belum Terkonfirmasi"';
                            val = "<span class='badge badge-solid'><i class='icon ion-md-timer orange-500-i'></i></span>";
                        }

                        return val;
                    },
                    itemId: 'statusKonfirm',
                    width: 80,
                    align: 'center',
                    dataIndex: 'staf_wakil_konfirmasi_asisten_status',
                    text: 'Konfirmasi',
                    flex: 1
                }
            ],
            viewConfig: {
                loadMask: false
            },
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'rowEditorWakil'
                })
            ]
        });

        me.callParent(arguments);
    }

});