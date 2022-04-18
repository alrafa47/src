/*
 * File: app/view/Sipas/session/notification/agenda/eksternal/masuk/blmarah/Compact.js
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

Ext.define('SIPAS.view.Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_session_notification_agenda_eksternal_masuk_blmarah_compact',

    requires: [
        'SIPAS.view.Sipas.com.button.Refresh',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.ToggleFilter',
        'SIPAS.view.Sipas.masuk.pengarahan.Form',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'notif_agd_masuk_blm_arah_list',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processList({
                    xtype: 'gridpanel',
                    featureable: true,
                    featureName: 'agenda_masuk',
                    clickToView: true,
                    flex: 1,
                    itemId: 'List',
                    header: false,
                    emptyText: 'Tidak Ada Data',
                    store: 'Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: ''
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var val = "<div class='subtext'>"+Ext.util.Format.date(value, 'd M Y')+"</div>",
                                    jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(value, 'H:i') +"</div>";

                                return val+jam;
                            },
                            filterable: true,
                            filter: {
                                type: 'date'
                            },
                            hidden: true,
                            width: 140,
                            sortable: true,
                            dataIndex: 'surat_properti_buat_tgl',
                            text: 'Tgl.Registrasi'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var jam = "<div class='supporttext supporttext-dark'>"+ Ext.util.Format.date(record.get('surat_properti_buat_tgl'), 'd M Y H:i') +"</div>";
                                if(value){
                                    return "<div class='subtext'>"+value+"</div>"+jam;
                                }else{
                                    return '<span class="alternative">-</span>';
                                }


                            },
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari No Registrasi',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                this.up('gridpanel').filterHeader(this);
                                }
                                }
                            },
                            filterable: true,
                            width: 140,
                            sortable: true,
                            dataIndex: 'surat_registrasi',
                            text: 'No.Registrasi'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value){
                                    var val = value;
                                    var modelPegawai = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf');

                                    return modelPegawai.renderPegawaiList(record.get('surat_properti_pembuat_id'), val, record.get('surat_properti_pembuat_jabatan_nama'), record.get('surat_properti_pembuat_unit_nama'), record);
                                }else{
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Operator',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                },
                                    afterrender: function(){
                                            this.show();
                                        }
                                }
                            },
                            filterable: true,
                            sortable: true,
                            dataIndex: 'surat_properti_pembuat_nama',
                            text: 'Operator',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value){
                                    return value;
                                }else{
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari No Agenda',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                this.up('gridpanel').filterHeader(this);
                                },
                                    afterrender: function(){
                                            this.show();
                                        }
                                }
                            },
                            filterable: true,
                            hidden: true,
                            width: 120,
                            sortable: true,
                            dataIndex: 'surat_agenda',
                            text: 'No.Agenda'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value){
                                    return value;
                                }else{
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Surat Dari',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                }
                                }
                            },
                            width: 300,
                            dataIndex: 'surat_pengirim',
                            text: 'Dari',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value){
                                    return value;
                                }else{
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            filterable: true,
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Penerima Unit',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                }
                                }
                            },
                            width: 200,
                            dataIndex: 'unit_nama',
                            text: 'Ditujukan Untuk Unit',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value){
                                    return value;
                                }else{
                                    return '<span class="alternative">-</span>';
                                }
                            },
                            items: {
                                xtype: 'textfield',
                                emptyText: 'Cari Media',
                                flex: 1,
                                margin: 2,
                                listeners: {
                                    change: function(textfield, e, eOpts){
                                		                                    this.up('gridpanel').filterHeader(this);
                                		                                },
                                    afterrender: function(){
                                            this.show();
                                        }
                                }
                            },
                            filterable: true,
                            hidden: true,
                            sortable: true,
                            dataIndex: 'media_nama',
                            text: 'Media'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact'
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
                                    xtype: 'sipas_com_button_edit',
                                    roleName: 'surat_registrasi_update',
                                    roleable: true,
                                    disabled: true,
                                    hidden: true,
                                    text: 'Perubahan'
                                },
                                {
                                    xtype: 'sipas_com_button_delete',
                                    roleName: 'surat_registrasi_delete',
                                    roleable: true,
                                    disabled: true,
                                    hidden: true
                                },
                                {
                                    xtype: 'sipas_com_button_togglefilter',
                                    toggleHandler: function(button, state) {
                                        button.up('grid').query('gridcolumn textfield').forEach(function(field){
                                            state ? field.show():field.hide();
                                        });
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                }
                            ]
                        }
                    ]
                })
            ],
            dockedItems: [
                {
                    xtype: 'sipas_masuk_pengarahan_form',
                    disabled: true,
                    flex: 1,
                    dock: 'bottom'
                }
            ]
        });

        me.callParent(arguments);
    },

    processList: function(config) {
        var filters = {
            ftype: 'filters',
            encode: true,
            local: false
        };

        if (! config.features) {
            config.features=filters;
        } else {
            config.features.push(filters);
        }

        return config;
    }

});