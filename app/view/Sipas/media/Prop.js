/*
 * File: app/view/Sipas/media/Prop.js
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

Ext.define('SIPAS.view.Sipas.media.Prop', {
    extend: 'Ext.window.Window',
    alias: 'widget.sipas_media_prop',

    requires: [
        'SIPAS.view.Sipas.com.button.Delete',
        'SIPAS.view.Sipas.com.button.Edit',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    minWidth: 460,
    width: 460,
    constrain: true,
    layout: 'fit',
    constrainHeader: true,
    title: 'Media Pengiriman Surat',
    maximizable: true,
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
                    title: 'Media Surat',
                    titleAlign: 'center',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Nama Media',
                            name: 'media_nama',
                            emptyText: 'Masukkan nama media'
                        },
                        {
                            xtype: 'textfield',
                            width: 240,
                            fieldLabel: 'Kode Media',
                            name: 'media_kode',
                            emptyText: 'Masukkan kode media'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            hidden: true,
                            fieldLabel: 'Keterangan',
                            name: 'media_keterangan',
                            rows: 3
                        },
                        {
                            xtype: 'fieldset',
                            padding: 0,
                            title: 'Status Aktif',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'media_isaktif',
                                    boxLabel: 'Aktif',
                                    inputValue: '1'
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
                    ui: 'footer',
                    layout: {
                        type: 'hbox',
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
                            xtype: 'sipas_com_button_delete',
                            roleable: true,
                            roleName: 'media_delete'
                        },
                        {
                            xtype: 'sipas_com_button_edit',
                            roleable: true,
                            roleName: 'media_update'
                        },
                        {
                            xtype: 'sipas_com_button_save'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});