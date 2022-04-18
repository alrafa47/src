/*
 * File: app/view/Sipas/disposisi/session/Prop.js
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

Ext.define('SIPAS.view.Sipas.disposisi.session.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_disposisi_session_prop',

    requires: [
        'SIPAS.view.Sipas.arsip.Pane',
        'SIPAS.view.Sipas.surat.informasi.detail.Pane',
        'SIPAS.view.Sipas.surat.informasi.selesai.Pane',
        'SIPAS.view.Sipas.surat.informasi.balasan.Pane',
        'SIPAS.view.Sipas.surat.informasi.Pane',
        'SIPAS.view.Sipas.disposisi.session.informasi.arahan.Pane',
        'SIPAS.view.Sipas.com.button.Print',
        'SIPAS.view.Sipas.com.button.Riwayat',
        'SIPAS.view.Sipas.com.button.Disposisi',
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.form.FieldSet'
    ],

    height: 600,
    minHeight: 600,
    minWidth: 700,
    width: 700,
    resizable: true,
    layout: 'fit',
    title: 'Detail Disposisi Surat',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    withAction: true,
                    withSender: true,
                    cls: 'sipas_disposisi_penerima_detail_form',
                    itemId: 'formDisposisi',
                    collapsed: false,
                    header: false,
                    layout: {
                        type: 'border',
                        padding: '0 4'
                    },
                    items: [
                        {
                            xtype: 'sipas_arsip_pane',
                            associated: true,
                            toolbarControl: false,
                            isSession: true,
                            cls: 'sipas_arsip_pane x-dataview-plainemptytext',
                            margin: '0 4',
                            maxWidth: 170,
                            style: 'border: 2px solid #e0e0e0; border-radius: 2px;',
                            autoScroll: true,
                            flex: 1,
                            region: 'west'
                        },
                        {
                            xtype: 'container',
                            flex: 2,
                            margins: '0 4',
                            region: 'center',
                            itemId: 'containerCompact',
                            autoScroll: true,
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                defaultMargins: {
                                    top: 0,
                                    right: 0,
                                    bottom: 8,
                                    left: 0
                                }
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'containerCabut',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            cls: 'x-field-boxed x-field-boxed-danger',
                                            itemId: 'txtCabut'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'containerProfil',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            cls: 'x-field-boxed x-field-boxed-warning',
                                            itemId: 'txtProfil'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'containerPgsAktif',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            cls: 'x-field-boxed x-field-boxed-warning',
                                            itemId: 'txtPgsAktif'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    cls: 'x-container-border x-container-border-info bg-light-green-100',
                                    itemId: 'containerInfoDisposisi',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            itemId: 'txtInfoDisposisi',
                                            margin: '0 0 0 4'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'x-btn-circle',
                                                    itemId: 'buttonDetailPenerima',
                                                    margin: '0 4 0 0',
                                                    ui: 'default-toolbar',
                                                    iconCls: 'icon ion-md-more',
                                                    menuAlign: 'tr-br?'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    associated: true,
                                    border: 2,
                                    cls: 'x-container-border x-container-border-round x-container-border-alternative',
                                    itemId: 'containerSurat',
                                    padding: 4,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'sipas_surat_informasi_detail_pane',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'sipas_surat_informasi_selesai_pane',
                                            itemId: 'containerSelesai',
                                            margin: '0 0 0 4',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'sipas_surat_informasi_balasan_pane',
                                            itemId: 'containerBalasan',
                                            margin: '0 0 0 4',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            margin: 0,
                                            padding: 0,
                                            collapsed: true,
                                            collapsible: true,
                                            title: 'Info lebih lanjut',
                                            items: [
                                                {
                                                    xtype: 'sipas_surat_informasi_pane',
                                                    margin: 6
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'containerDisposisi',
                                    padding: 0,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            associated: true,
                                            flex: 1,
                                            border: '2 2 0 2',
                                            cls: 'x-container-border x-container-border-round x-container-border-alternative',
                                            itemId: 'containerUrutanArahan',
                                            padding: 0,
                                            items: [
                                                {
                                                    xtype: 'sipas_disposisi_session_informasi_arahan_pane',
                                                    associated: true,
                                                    margin: '0 4 0 4'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            associated: true,
                                            flex: 1,
                                            border: '2 2 2 2',
                                            cls: 'x-dataview-timeline-node x-container-border x-container-border-alternative bg-yellow-200 ',
                                            itemId: 'containerPengirim',
                                            padding: '0 0 0 36',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txtInfoPengirim'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txtInfoArahan'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txtInfoPenerimaan'
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    flex: 1,
                                                    itemId: 'logArahan',
                                                    margin: '0 10 15 35',
                                                    padding: 0,
                                                    collapsed: true,
                                                    collapsible: true,
                                                    title: 'Log arahan',
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            anchor: '100%',
                                                            itemId: 'txtLogArahan',
                                                            padding: '0 0 0 5'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            associated: true,
                                            flex: 1,
                                            border: '0 2 2 2',
                                            cls: 'x-dataview-timeline-node x-dataview-timeline-node-end x-container-border x-container-border-round bd-yellow-200-i',
                                            itemId: 'containerPenerima',
                                            padding: '4 10 0 10',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                defaultMargins: {
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 8,
                                                    left: 0
                                                }
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'containerStaf',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch',
                                                        padding: '0 0 0 26'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            itemId: 'MyContainer11',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    associated: true,
                                                                    flex: 1,
                                                                    itemId: 'txtPenerima'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            featureable: true,
                                                                            featureName: 'disposisi_masuk_penerima',
                                                                            margins: '32 0 0 0',
                                                                            cls: 'x-btn-bordered x-btn-compact',
                                                                            itemId: 'buttonPenerima',
                                                                            ui: 'default-toolbar',
                                                                            text: 'Penerima'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'displayfield',
                                                            flex: 1,
                                                            itemId: 'txtInfoTglPenerima'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'containerRespon',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '0 0 0 26'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            flex: 1,
                                                            itemId: 'txtRespon'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'bottom'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    cls: 'x-btn-circle',
                                                                    height: 40,
                                                                    itemId: 'buttonRespon',
                                                                    ui: 'default-toolbar',
                                                                    width: 40,
                                                                    iconCls: 'icon ion-md-create'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    flex: 1,
                                                    margins: '0 0 0 60',
                                                    itemId: 'fieldLogRespon',
                                                    padding: 0,
                                                    collapsed: true,
                                                    collapsible: true,
                                                    title: 'Log respon',
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            anchor: '100%',
                                                            itemId: 'txtLogRespon',
                                                            padding: '0 0 0 5'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'containerBerkas',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        padding: '0 0 0 26'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            flex: 1,
                                                            itemId: 'txtBerkas'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            itemId: 'cmpBerkasFisik',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'bottom'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    languageable: true,
                                                                    languageMode: 'text',
                                                                    languageCode: 'disposisi_session_prop_confirm_berkas',
                                                                    cls: 'x-btn-fill x-btn-bordered x-btn-info',
                                                                    itemId: 'btnKonfBerkas',
                                                                    text: 'Konfirmasi'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    languageable: true,
                                                                    languageMode: 'text',
                                                                    languageCode: 'disposisi_session_prop_cancel_berkas',
                                                                    featureable: true,
                                                                    featureName: 'disposisi_masuk_request_berkas',
                                                                    cls: 'x-btn-fill x-btn-bordered x-btn-danger',
                                                                    itemId: 'btnBatalBerkas',
                                                                    text: 'Batal'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    languageable: true,
                                                                    languageMode: 'text',
                                                                    languageCode: 'disposisi_session_prop_request_berkas',
                                                                    featureable: true,
                                                                    featureName: 'disposisi_masuk_request_berkas',
                                                                    cls: 'x-btn-fill x-btn-bordered x-btn-warning',
                                                                    itemId: 'btnReqBerkas',
                                                                    text: 'Minta'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    itemId: 'toolbarAction',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        },
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'buttonLog',
                            text: 'LOG AKTIVITAS'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'disposisi_selesai',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_selesai',
                            featureName: 'surat_selesai',
                            featureable: true,
                            hidden: true,
                            itemId: 'buttonSelesai',
                            text: 'Selesai'
                        },
                        {
                            xtype: 'sipas_com_button_print',
                            action: 'doprint',
                            itemId: 'btnCetak'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageCode: 'buttonPengingat',
                            languageMode: 'text',
                            itemId: 'buttonPengingat',
                            text: 'PENGINGAT'
                        },
                        {
                            xtype: 'sipas_com_button_riwayat',
                            roleable: true,
                            roleName: 'kirim_disposisi',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'disposisi_masuk_riwayat_disposisi_button',
                            itemId: 'btnRiwDis'
                        },
                        {
                            xtype: 'sipas_com_button_disposisi',
                            action: 'dodisposisi',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_disposisi',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'disposisi_masuk_forward_disposisi_button',
                            itemId: 'btnTeruskan',
                            text: 'Teruskan'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
                    itemId: 'toolbarControlMasuk',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        },
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'buttonLog',
                            text: 'LOG AKTIVITAS'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'disposisi_selesai',
                            roleName: 'surat_masuk_penerima_selesai',
                            roleable: true,
                            featureName: 'surat_selesai',
                            featureable: true,
                            hidden: true,
                            itemId: 'buttonSelesai',
                            text: 'Selesai'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageCode: 'buttonPengingat',
                            languageMode: 'text',
                            itemId: 'buttonPengingat',
                            text: 'PENGINGAT'
                        },
                        {
                            xtype: 'sipas_com_button_disposisi',
                            action: 'riwayat',
                            roleName: 'surat_masuk_penerima_disposisi',
                            roleable: true,
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'suratmasuk_riwayat_disposisi',
                            itemId: 'btnRiwDis',
                            text: 'Riwayat Disposisi'
                        },
                        {
                            xtype: 'sipas_com_button_disposisi',
                            action: 'disposisi',
                            roleName: 'surat_masuk_penerima_disposisi',
                            roleable: true,
                            languageCode: 'suratmasuk_disposisi',
                            languageMode: 'text',
                            languageable: true,
                            itemId: 'btnTeruskan'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    dock: 'bottom',
                    itemId: 'toolbarActionNotadinas',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        defaultMargins: {
                            top: 4,
                            right: 4,
                            bottom: 6,
                            left: 4
                        },
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'buttonLog',
                            text: 'LOG AKTIVITAS'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'disposisi_selesai',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_selesai',
                            featureable: true,
                            featureName: 'surat_selesai',
                            hidden: true,
                            itemId: 'buttonSelesai',
                            text: 'Selesai'
                        },
                        {
                            xtype: 'sipas_com_button_print',
                            action: 'doprint',
                            itemId: 'btnCetak'
                        },
                        {
                            xtype: 'button',
                            languageable: true,
                            languageCode: 'buttonPengingat',
                            languageMode: 'text',
                            itemId: 'buttonPengingat',
                            text: 'PENGINGAT'
                        },
                        {
                            xtype: 'sipas_com_button_riwayat',
                            roleable: true,
                            roleName: 'kirim_notadinas',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'notadinas_riwayat_button',
                            itemId: 'btnRiwDis'
                        },
                        {
                            xtype: 'sipas_com_button_disposisi',
                            action: 'dodisposisi',
                            roleable: true,
                            roleName: 'surat_masuk_penerima_disposisi',
                            languageable: true,
                            languageMode: 'text',
                            languageCode: 'notadinas_forward_button',
                            itemId: 'btnTeruskanNota',
                            text: 'Teruskan'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});