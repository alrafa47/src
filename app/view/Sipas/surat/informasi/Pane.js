/*
 * File: app/view/Sipas/surat/informasi/Pane.js
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

Ext.define('SIPAS.view.Sipas.surat.informasi.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_surat_informasi_pane',

    requires: [
        'SIPAS.view.Sipas.surat.informasi.arsip.Pane',
        'SIPAS.view.Sipas.surat.informasi.musnah.Pane',
        'SIPAS.view.Sipas.surat.informasi.pembuatan.Pane',
        'SIPAS.view.Sipas.surat.informasi.penyetujuan.Pane',
        'SIPAS.view.Sipas.surat.informasi.terima.Pane',
        'SIPAS.view.Sipas.surat.informasi.batal.Pane',
        'SIPAS.view.Sipas.surat.informasi.distribusi.Pane',
        'SIPAS.view.Sipas.surat.informasi.ekspedisi.keluar.Pane',
        'SIPAS.view.Sipas.surat.informasi.selesai.Pane',
        'SIPAS.view.Sipas.surat.informasi.rating.Pane',
        'SIPAS.view.Sipas.surat.informasi.berkas.Pane',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Display',
        'Ext.form.FieldSet'
    ],

    cls: 'sipas_surat_informasi_pane',
    header: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    associated: true,
                    flex: 1,
                    dock: 'top',
                    itemId: 'toolbarStatusSurat',
                    margin: '0 0 8 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'suratStatus'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'sipas_surat_informasi_arsip_pane',
                    associated: true,
                    itemId: 'infoArsipSurat',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_musnah_pane',
                    associated: true,
                    itemId: 'infoMusnahSurat',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_pembuatan_pane',
                    associated: true,
                    margin: '0 0 8 0'
                },
                me.processContainerPenyetuju({
                    xtype: 'sipas_surat_informasi_penyetujuan_pane',
                    associated: true,
                    propType: true,
                    itemId: 'containerPenyetuju',
                    margin: '0 0 8 0'
                }),
                {
                    xtype: 'sipas_surat_informasi_terima_pane',
                    associated: true,
                    itemId: 'infoTerima',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_batal_pane',
                    associated: true,
                    itemId: 'infoBatalNomor',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_distribusi_pane',
                    associated: true,
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_ekspedisi_keluar_pane',
                    associated: true,
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_selesai_pane',
                    associated: true,
                    itemId: 'comSuratSelesai',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_rating_pane',
                    associated: true,
                    featureable: true,
                    featureName: 'ratingreview',
                    itemId: 'infoRating',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'sipas_surat_informasi_berkas_pane',
                    associated: true,
                    featureable: true,
                    featureName: 'disposisi_masuk_request_berkas',
                    itemId: 'infoBerkasFisik',
                    margin: '0 0 8 0'
                }
            ]
        });

        me.callParent(arguments);
    },

    processContainerPenyetuju: function(config) {
        config.propType = this.propType;
        return config;
    },

    constructor: function() {
        this.callParent(arguments);
            return Ext.applyIf(this,{
                form: new Ext.form.Basic(this)
        });
    }

});