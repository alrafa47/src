/*
 * File: app/view/Sipas/staf/wakil/List.js
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

Ext.define('SIPAS.view.Sipas.staf.wakil.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sipas_staf_wakil_list',

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
    store: 'Sipas.staf.wakil.List',

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
                            featureable: true,
                            featureName: 'asistensi',
                            roleable: true,
                            roleName: 'staf_wakil_monitoring_save',
                            flex: 1,
                            cls: 'x-field-search',
                            itemId: 'fieldSearch',
                            width: '100%',
                            emptyText: 'Tambah asisten',
                            enforceMaxLength: true,
                            hideTrigger: true,
                            anyMatch: true,
                            displayField: 'staf_nama',
                            forceSelection: true,
                            minChars: 2,
                            queryMode: 'local',
                            store: 'Sipas.jabatan.wakil.Combo',
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
                            roleName: 'staf_wakil_monitoring_save',
                            roleable: true,
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
                    featureable: true,
                    featureName: 'asistensi',
                    roleable: true,
                    roleName: 'staf_wakil_monitoring_save',
                    width: 40,
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
                            "<img src='server.php/sipas/staf/get_image/foto?id="+record.get('staf_wakil_asisten')+"' class='img img-circle img-16'>"+
                            "</div><div class='cell-text'>"+value+"</div></div>"
                            );

                        return (new Ext.Template(tpl)).apply(record.getData());
                    },
                    filterable: false,
                    minWidth: 200,
                    width: 200,
                    sortable: true,
                    dataIndex: 'staf_wakil_asisten_nama',
                    text: 'Daftar Asisten',
                    flex: 1
                }
            ]
        });

        me.processSipasstafwakilList(me);
        me.callParent(arguments);
    },

    processSipasstafwakilList: function(config) {
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