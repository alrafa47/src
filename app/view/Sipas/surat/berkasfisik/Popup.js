/*
 * File: app/view/Sipas/surat/berkasfisik/Popup.js
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

Ext.define('SIPAS.view.Sipas.surat.berkasfisik.Popup', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_surat_berkasfisik_popup',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    languageable: true,
    languageCode: 'disposisi_masuk_request_berkas_popup',
    languageMode: 'title',
    height: 500,
    width: 600,
    layout: 'fit',
    title: 'Permintaan Berkas Fisik',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'list',
                    autoScroll: true,
                    bodyBorder: false,
                    header: false,
                    disableSelection: true,
                    emptyText: 'Tidak ada Data',
                    store: 'Sipas.surat.berkasfisik.Popup',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var modelStaf = Ext.ModelManager.getModel('SIPAS.model.Sipas.Staf'),
                                    modelJabatan = Ext.ModelManager.getModel('SIPAS.model.Sipas.Jabatan'),
                                    id = record.get('disposisi_masuk_penerima_id'),
                                    nama = record.get('disposisi_masuk_penerima_nama'),
                                    jabatan = record.get('disposisi_masuk_penerima_jabatan_nama'),
                                    unit = record.get('disposisi_masuk_penerima_unit_nama'),
                                    pelaku = record.get('berkas_id'),
                                    pelaku_nama = record.get('berkas_nama'),
                                    via_asistensi = '',
                                    jabatan_penerima = record.get('disposisi_masuk_jabatan') ? record.get('disposisi_masuk_jabatan') : '(Tidak Ada Jabatan)',
                                    berkas_jabatan_id = record.get('berkas_jabatan_id') ? record.get('berkas_jabatan_id') : '(Tidak Ada Jabatan)';

                                if(record.get('disposisi_masuk_jabatan')){
                                    tpl = modelJabatan.renderJabatanAdditional(jabatan_penerima, record.get('jabatan_penerima_nama'), null);
                                }else{
                                    tpl = modelStaf.renderPegawaiList(id, nama, jabatan, unit);
                                }

                                if((id != pelaku) && record.get('disposisi_induk')){
                                    via_asistensi = '<div class="supporttext supporttext-dark margin-bottom-8 margin-left-40">Via asistensi oleh <span class="bold">'+pelaku_nama+'</span></div>';
                                }else if(!record.get('disposisi_induk') && (jabatan_penerima != berkas_jabatan_id)){
                                    via_asistensi = '<div class="supporttext supporttext-dark margin-bottom-8 margin-left-40">Via asistensi oleh <span class="bold">'+pelaku_nama+'</span></div>';
                                }

                                return '<div class="margin-left-8">'+tpl+via_asistensi+'</div>';
                            },
                            sortable: false,
                            dataIndex: 'disposisi_masuk_penerima_nama',
                            menuDisabled: true,
                            text: 'Pemohon Berkas Fisik',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            itemId: 'status',
                            sortable: false,
                            dataIndex: 'disposisi_masuk_berkas_status',
                            menuDisabled: true,
                            text: 'Status',
                            flex: 1
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});