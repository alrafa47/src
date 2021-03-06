/*
 * File: app/view/Sipas/surat/penyetujuan/detail/Pane.js
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

Ext.define('SIPAS.view.Sipas.surat.penyetujuan.detail.Pane', {
    extend: 'Ext.container.ButtonGroup',
    alias: 'widget.sipas_surat_penyetujuan_detail_pane',

    mixins: {
        queryable: 'Ext.Queryable'
    },
    requires: [
        'Ext.form.field.Display',
        'Ext.form.Basic'
    ],

    cls: 'sipas_surat_penyetujuan_detail_pane',
    frame: false,
    padding: 3,
    title: 'Informasi Surat</span>',
    columns: 1,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            if (value.length > 27){
                                return value.substring(0,27)+'...';
                            }
                            else{
                                return value;
                            }
                        }else{
                            return '';
                        }
                    },
                    itemId: 'textfieldPengirim',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'surat_pengirim',
                    fieldCls: 'x-form-field'
                },
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            if (value.length > 27){
                                return value.substring(0,27)+'...';
                            }
                            else{
                                return value;
                            }
                        }else{
                            return '';
                        }
                    },
                    itemId: 'textfieldPerihal',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'surat_perihal',
                    fieldCls: 'x-form-field'
                },
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            if (value.length > 27){
                                return value.substring(0,27)+'...';
                            }
                            else{
                                return value;
                            }
                        }else{
                            return '';
                        }
                    },
                    anchorSize: 1,
                    saveDelay: 0,
                    hidden: true,
                    itemId: 'textfieldNoRegistrasi',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'surat_registrasi',
                    fieldCls: 'x-form-field'
                },
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            if (value.length > 27){
                                return value.substring(0,27)+'...';
                            }
                            else{
                                return value;
                            }
                        }else{
                            return '';
                        }
                    },
                    anchorSize: 1,
                    saveDelay: 0,
                    itemId: 'textfieldStatus',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'surat_penyetujuan_status_text',
                    fieldCls: 'x-form-field'
                },
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            if (value.length > 27){
                                return value.substring(0,27)+'...';
                            }
                            else{
                                return value;
                            }
                        }else{
                            return '';
                        }
                    },
                    itemId: 'textfieldPembuatNama',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'pembuat_nama',
                    fieldCls: 'x-form-field'
                },
                {
                    xtype: 'displayfield',
                    renderer: function(value, displayField) {
                        if(value){
                            var tanggal =  Ext.util.Format.date(value, 'd-M-Y H:i');
                            if (tanggal.length > 27){
                                return tanggal.substring(0,27)+'...';
                            }
                            else{
                                return tanggal;
                            }
                        }else{
                            return '';
                        }
                    },
                    itemId: 'textfieldTanggal',
                    labelAlign: 'top',
                    labelWidth: 120,
                    name: 'surat_tanggal',
                    fieldCls: 'x-form-field'
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