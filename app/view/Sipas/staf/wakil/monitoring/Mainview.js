/*
 * File: app/view/Sipas/staf/wakil/monitoring/Mainview.js
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

Ext.define('SIPAS.view.Sipas.staf.wakil.monitoring.Mainview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_staf_wakil_monitoring_mainview',

    requires: [
        'SIPAS.view.Sipas.staf.wakil.monitoring.tugassaya.List',
        'SIPAS.view.Sipas.staf.wakil.monitoring.masuk.List',
        'SIPAS.view.Sipas.staf.wakil.monitoring.riwayat.List',
        'SIPAS.view.Sipas.staf.wakil.monitoring.koreksi.List',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.view.BoundList',
        'Ext.XTemplate',
        'Ext.form.field.Display',
        'Ext.tab.Panel',
        'Ext.grid.Panel',
        'Ext.tab.Tab'
    ],

    languageCode: 'monitoring_list',
    languageMode: 'title',
    languageable: true,
    layout: 'border',
    bodyBorder: false,
    title: 'Pelaksana Harian',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    region: 'north',
                    border: false,
                    padding: 0,
                    bodyPadding: '0 16',
                    header: false,
                    title: 'Pegawai Yang Dimonitor',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 64,
                            itemId: 'containerImage',
                            margin: '0 0 16 0',
                            width: 64,
                            layout: 'fit'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0 0 0 16',
                            itemId: 'containerProfile',
                            width: 250,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'comboStaf',
                                    width: 350,
                                    emptyText: '(Pilih Staf)',
                                    editable: false,
                                    displayField: 'staf_nama',
                                    store: 'Sipas.staf.wakil.monitor.Combo',
                                    valueField: 'staf_id',
                                    listConfig: {
                                        xtype: 'boundlist',
                                        itemSelector: 'div',
                                        itemTpl: [
                                            '<tpl for=".">',
                                            '    <tpl if="values.staf_wakil_plt == true">',
                                            '        {staf_nama} <span style="color: gray">({staf_kode})</span> - Pengganti Sementara',
                                            '        <tpl else>',
                                            '            {staf_nama} <span style="color: gray">({staf_kode})</span> - Pimpinan',
                                            '        </tpl>',
                                            '    </tpl>'
                                        ]
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    renderer: function(value, displayField) {
                                        if(value){
                                            return '<b>'+Ext.util.Format.ellipsis(value,50)+'</b>';
                                        }else{
                                            return '';
                                        }
                                    },
                                    anchor: '100%',
                                    hidden: true,
                                    labelAlign: 'top',
                                    name: 'staf_nama',
                                    value: '(nama pegawai)',
                                    fieldStyle: 'font-weight:bold;'
                                },
                                {
                                    xtype: 'displayfield',
                                    renderer: function(value, displayField) {
                                        return Ext.util.Format.ellipsis(value,50);
                                    },
                                    anchor: '100%',
                                    hidden: true,
                                    margin: 0,
                                    padding: 0,
                                    labelAlign: 'top',
                                    name: 'jabatan_nama',
                                    value: '(jabatan)'
                                },
                                {
                                    xtype: 'displayfield',
                                    renderer: function(value, displayField) {
                                        return Ext.util.Format.ellipsis(value,50);
                                    },
                                    anchor: '100%',
                                    margin: 0,
                                    padding: 0,
                                    labelAlign: 'top',
                                    name: 'unit_nama'
                                },
                                {
                                    xtype: 'displayfield',
                                    renderer: function(value, displayField) {
                                        return Ext.util.Format.ellipsis(value,50);
                                    },
                                    anchor: '100%',
                                    hidden: true,
                                    margin: 0,
                                    padding: 0,
                                    labelAlign: 'top',
                                    name: 'staf_wakil_plt'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    disabled: true,
                    itemId: 'panelMonitoring',
                    header: false,
                    title: 'Monitoring',
                    titleAlign: 'center',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'sipas_staf_wakil_monitoring_tugassaya_list',
                            roleable: false,
                            roleName: 'asistensi_monitoring_tugassaya',
                            languageCode: 'tugassaya_asisten_tab_list',
                            iconCls: 'icon ion-md-list blue-700-i',
                            store: 'Sipas.staf.wakil.monitoring.tugassaya.List',
                            tabConfig: {
                                xtype: 'tab',
                                roleable: false,
                                roleName: 'asistensi_monitoring_tugassaya'
                            }
                        },
                        {
                            xtype: 'sipas_staf_wakil_monitoring_masuk_list',
                            featureable: true,
                            featureName: 'asistensi_masuk',
                            roleable: false,
                            roleName: 'asistensi_monitoring_masuk',
                            languageCode: 'masuk_asisten_tab_list',
                            iconCls: 'icon ion-md-mail blue-700-i',
                            title: 'Masuk',
                            store: 'Sipas.staf.wakil.monitoring.kotak.List'
                        },
                        {
                            xtype: 'sipas_staf_wakil_monitoring_riwayat_list',
                            withoutControl: true,
                            roleable: false,
                            roleName: 'asistensi_monitoring_riwayat',
                            featureable: true,
                            featureName: 'asistensi_riwayat',
                            languageCode: 'terkirim_asisten_tab_list',
                            iconCls: 'icon ion-md-send green-700-i',
                            title: 'Terkirim',
                            store: 'Sipas.staf.wakil.monitoring.disposisi.riwayat.Aktif',
                            tabConfig: {
                                xtype: 'tab',
                                featureable: true,
                                featureName: 'asistensi_riwayat',
                                roleName: 'asistensi_monitoring_riwayat',
                                closable: false
                            }
                        },
                        {
                            xtype: 'sipas_staf_wakil_monitoring_koreksi_list',
                            roleable: false,
                            roleName: 'asistensi_monitoring_konsep',
                            withoutControl: true,
                            withoutAsistensi: false,
                            featureable: true,
                            featureName: 'asistensi_koreksi',
                            languageCode: 'draft_asisten_tab_list',
                            iconCls: 'con ion-md-document brown-500-i',
                            title: 'Draf Untuk Dikoreksi',
                            store: 'Sipas.staf.wakil.monitoring.draf.List',
                            tabConfig: {
                                xtype: 'tab',
                                featureable: true,
                                featureName: 'asistensi_koreksi',
                                roleName: 'asistensi_monitoring_riwayat'
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});