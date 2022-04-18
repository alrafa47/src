/*
 * File: app/view/Sipas/surat/informasi/rating/Pane.js
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

Ext.define('SIPAS.view.Sipas.surat.informasi.rating.Pane', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sipas_surat_informasi_rating_pane',

    requires: [
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    border: false,
    padding: 0,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'containerRating',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            disabledCls: 'disabled',
                            itemId: 'textRating',
                            maxWidth: 400,
                            width: 400,
                            labelClsExtra: 'f11',
                            labelSeparator: '&nbsp;',
                            labelStyle: 'color:gray;',
                            value: 'Surat ini belum diberi Rating',
                            fieldStyle: 'display:flex'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                defaultMargins: {
                                    top: 4,
                                    right: 4,
                                    bottom: 6,
                                    left: 4
                                },
                                padding: '0 0 0 40'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    roleable: true,
                                    roleName: 'surat_internal_masuk_rating',
                                    featureName: 'ratingreview',
                                    featureable: true,
                                    languageCode: 'surat_prop_rating_tombol',
                                    languageMode: 'text',
                                    languageable: true,
                                    cls: 'x-btn-bordered',
                                    itemId: 'buttonRating',
                                    ui: 'default-toolbar',
                                    text: 'Rating'
                                },
                                {
                                    xtype: 'button',
                                    roleable: true,
                                    roleName: 'surat_internal_masuk_rating',
                                    featureName: 'ratingreview',
                                    featureable: true,
                                    languageCode: 'surat_prop_rating_tombol_lihat',
                                    languageMode: 'text',
                                    languageable: true,
                                    cls: 'x-btn-bordered',
                                    itemId: 'buttonLihatRating',
                                    ui: 'default-toolbar',
                                    text: 'Lihat Rating'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 4,
                                    right: 4,
                                    bottom: 6,
                                    left: 4
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    constructor: function() {
        this.callParent(arguments);
            return Ext.applyIf(this,{
                form: new Ext.form.Basic(this)
        });
    }

});