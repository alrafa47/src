/*
 * File: app/view/Sipas/jabatan/wakil/atasan/List.js
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

Ext.define('SIPAS.view.Sipas.jabatan.wakil.atasan.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jabatan_wakil_atasan_list',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    header: false,
    title: 'Asisten',
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.jabatan.wakil.atasan.List',

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
                            roleName: 'staf_pimpinan_monitoring_save',
                            featureable: true,
                            featureName: 'asistensi',
                            flex: 1,
                            cls: 'x-field-search',
                            itemId: 'fieldSearch',
                            width: '100%',
                            emptyText: 'Tambah pimpinan',
                            enforceMaxLength: true,
                            hideTrigger: true,
                            anyMatch: true,
                            displayField: 'jabatan_nama',
                            forceSelection: true,
                            minChars: 2,
                            queryMode: 'local',
                            store: 'Sipas.jabatan.wakil.Combo',
                            valueField: 'jabatan_id',
                            listConfig: {
                                xtype: 'boundlist',
                                emptyText: 'Pencarian tidak ditemukan',
                                itemSelector: 'div',
                                itemTpl: [
                                    '{jabatan_nama}'
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            roleable: true,
                            roleName: 'staf_pimpinan_monitoring_save',
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
                    roleName: 'staf_pimpinan_monitoring_save',
                    featureable: true,
                    featureName: 'asistensi',
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
                        var id = record.getId(),
                            tpl = this.dataTpl || (
                            this.tpl =
                            "<div class='cell-row'><div class='cell-visual cell-visual-left'>"+
                            //         "<img src='server.php/sipas/staf/get_image/foto?id="+record.get('staf_wakil_staf')+"' class='img img-circle img-16'>"+
                            "</div><div class='cell-text'>"+value+"</div></div>"
                            );

                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    filterable: false,
                    minWidth: 200,
                    width: 200,
                    sortable: true,
                    dataIndex: 'jabatan_wakil_jabatan_nama',
                    text: 'Daftar Pimpinan',
                    flex: 1
                }
            ],
            viewConfig: {
                emptyText: 'Tidak Ada Data'
            }
        });

        me.processSipasJabatanWakilList(me);
        me.callParent(arguments);
    },

    processSipasJabatanWakilList: function(config) {
        var filters = {
            ftype: 'filters',
            encode: true,
            local: true
        };

        if (! config.features) {
            config.features=filters;
        } else {
            config.features.push(filters);
        }

        return config;
    }

});