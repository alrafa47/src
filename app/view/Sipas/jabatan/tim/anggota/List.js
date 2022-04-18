/*
 * File: app/view/Sipas/jabatan/tim/anggota/List.js
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

Ext.define('SIPAS.view.Sipas.jabatan.tim.anggota.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_jabatan_tim_anggota_list',

    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.toolbar.Separator',
        'Ext.button.Button'
    ],

    header: false,
    title: 'Jabatan',
    disableSelection: true,
    emptyText: 'Tidak ada Data',
    store: 'Sipas.jabatan.tim.anggota.List',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var id = record.getId(),
                            tpl = this.dataTpl || (
                            this.tpl =
                            "<div class='cell-row'><div class='cell-visual cell-visual-left'>"+
                            "<div class='img img-circle img-16'><i class='bigger-1-25 icon ion-md-ribbon grey-600-i'></i></div>"+
                            "</div><div class='cell-text'>"+value+"</div></div>"
                            );
                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    items: {
                        xtype: 'textfield',
                        emptyText: 'Cari Daftar Anggota',
                        flex: 1,
                        margin: 2,
                        listeners: {
                            change: function(textfield, e, eOpts){
                        		                                    this.up('gridpanel').filterHeader(this);
                        		                                }
                        }
                    },
                    filterable: true,
                    minWidth: 200,
                    width: 200,
                    sortable: true,
                    dataIndex: 'anggota_nama',
                    text: 'Daftar Anggota',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    width: 40,
                    align: 'center',
                    menuDisabled: true,
                    items: [
                        {
                            action: 'removerecord',
                            iconCls: 'x-action-col-icon-bin'
                        }
                    ]
                }
            ],
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
                            text: 'Daftar Anggota'
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
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    cls: 'x-field-search',
                                    itemId: 'fieldSearch',
                                    width: 500,
                                    fieldLabel: '',
                                    labelWidth: 120,
                                    emptyText: 'Tambah anggota',
                                    enforceMaxLength: true,
                                    hideTrigger: true,
                                    anyMatch: true,
                                    displayField: 'jabatan_nama',
                                    forceSelection: true,
                                    minChars: 3,
                                    queryMode: 'local',
                                    store: 'Sipas.jabatan.tim.anggota.Combo',
                                    valueField: 'jabatan_id',
                                    listConfig: {
                                        xtype: 'boundlist',
                                        emptyText: 'Pencarian tidak ditemukan',
                                        itemSelector: 'div',
                                        itemTpl: [
                                            '{jabatan_nama} <span class="alternative">({unit_nama})</span>'
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tbseparator',
                            margins: '0 4 0 4'
                        },
                        {
                            xtype: 'button',
                            itemId: 'buttonManual',
                            text: 'Pilih Manual'
                        }
                    ]
                }
            ]
        });

        me.processSipasjabatanwakilList(me);
        me.callParent(arguments);
    },

    processSipasjabatanwakilList: function(config) {
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