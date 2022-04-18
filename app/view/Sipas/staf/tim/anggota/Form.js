/*
 * File: app/view/Sipas/staf/tim/anggota/Form.js
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

Ext.define('SIPAS.view.Sipas.staf.tim.anggota.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sipas_staf_tim_anggota_form',

    requires: [
        'SIPAS.view.Sipas.staf.tim.anggota.List',
        'SIPAS.view.Sipas.com.button.Save',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.grid.Panel',
        'Ext.button.Button'
    ],

    useDetail: false,
    border: false,
    bodyBorder: false,
    bodyPadding: 10,
    title: 'Anggota',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                me.processStaf_tim_nama({
                    xtype: 'textfield',
                    fieldLabel: 'Nama Kelompok',
                    labelWidth: 140,
                    name: 'staf_tim_nama',
                    readOnly: true,
                    emptyText: 'Masukkan nama kelompok'
                }),
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'ID Kelompok',
                    name: 'staf_tim_id'
                },
                {
                    xtype: 'sipas_staf_tim_anggota_list',
                    associated: true,
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    flex: 1,
                    dock: 'bottom',
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
                            xtype: 'sipas_com_button_save',
                            roleable: true,
                            roleName: 'staf_tim_insert'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    processStaf_tim_nama: function(config) {
        if(!this.useDetail)
        {
            return null;
        }
        return config;
    }

});