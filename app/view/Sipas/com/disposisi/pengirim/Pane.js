/*
 * File: app/view/Sipas/com/disposisi/pengirim/Pane.js
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

Ext.define('SIPAS.view.Sipas.com.disposisi.pengirim.Pane', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sipas_com_disposisi_pengirim_pane',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Display'
    ],

    enableButtonView: true,
    border: 0,
    cls: 'sipas_com_disposisi_pengirim_pane x-form-fieldset-noborder',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            formConfig: {
                
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'pengirimDetail'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'container',
                            height: 48,
                            itemId: 'pengirimImg',
                            width: 48,
                            listeners: {
                                render: {
                                    fn: me.onPengirimImgRender,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    itemId: 'pengirimData',
                    margin: '0 0 0 10',
                    defaults: {
                        margin: 0,
                        margins: 0,
                        padding: 0
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            renderer: function(value, displayField) {
                                if(value){
                                    return '<strong>'+value+'</strong>';
                                }else{
                                    return '';
                                }
                            },
                            name: 'disposisi_pengirim_nama'
                        },
                        {
                            xtype: 'displayfield',
                            hidden: true,
                            name: 'disposisi_pengirim_jabatan_nama'
                        },
                        {
                            xtype: 'displayfield',
                            name: 'disposisi_pengirim_unit_nama'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPengirimImgRender: function(component, eOpts) {
        Ext.create('Ext.tip.ToolTip',{
            target: component.getEl(),
            html: 'Pengirim'
        });
    },

    constructor: function() {
        this.callParent(arguments);
        return Ext.applyIf(this,{
            form: new Ext.form.Basic(this)
        });
    }

});