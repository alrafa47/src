/*
 * File: app/view/Sipas/arsip/sdoc/Prop.js
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

Ext.define('SIPAS.view.Sipas.arsip.sdoc.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_arsip_sdoc_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.View',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    languageable: true,
    languageMode: 'title',
    languageCode: 'online_dokumen_popup',
    width: 400,
    layout: 'fit',
    title: 'SIPAS Dokumen',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: '8 16 8 16',
                    header: false,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'txtName',
                            fieldLabel: 'Nama Dokumen',
                            labelAlign: 'top',
                            name: 'dokumen_nama',
                            allowBlank: false,
                            blankText: 'Nama Dokumen harus di isi',
                            emptyText: 'Masukkan Nama Dokumen'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            itemId: 'hiddenFile',
                            fieldLabel: 'Label',
                            name: 'dokumen_file'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            itemId: 'hiddenIspetikan',
                            fieldLabel: 'Label',
                            name: 'dokumen_ispetikan'
                        },
                        {
                            xtype: 'fieldset',
                            languageable: true,
                            languageMode: 'title',
                            languageCode: 'template_berkas_fieldset',
                            itemId: 'containerTemplate',
                            padding: '10 0 5',
                            collapsed: true,
                            collapsible: true,
                            title: 'Gunakan template',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            languageable: true,
                                            languageMode: 'fieldLabel',
                                            languageCode: 'template_berkas_textfield',
                                            flex: 1,
                                            maxWidth: 240,
                                            minWidth: 240,
                                            fieldLabel: 'Template',
                                            labelAlign: 'top',
                                            name: 'dokumen_preview',
                                            readOnly: true,
                                            emptyText: 'Nama Template'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            width: 40,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    languageable: true,
                                                    languageMode: 'text',
                                                    languageCode: 'template_berkas_button',
                                                    itemId: 'btnChoose',
                                                    margin: '20 4 0 4',
                                                    text: 'Pilih Template'
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
                            itemId: 'toolbarBottom',
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
                                    xtype: 'sipas_com_button_edit',
                                    text: 'Mulai Edit'
                                },
                                {
                                    xtype: 'sipas_com_button_view'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'label',
                    text: 'My Label'
                }
            ]
        });

        me.callParent(arguments);
    }

});