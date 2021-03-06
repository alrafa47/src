/*
 * File: app/view/Sipas/surat/penyetujuan/informasi/Pane.js
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

Ext.define('SIPAS.view.Sipas.surat.penyetujuan.informasi.Pane', {
    extend: 'Ext.container.ButtonGroup',
    alias: 'widget.sipas_surat_penyetujuan_informasi_pane',

    mixins: {
        queryable: 'Ext.Queryable'
    },
    requires: [
        'Ext.form.field.Text',
        'Ext.form.Basic'
    ],

    cls: 'sipas_surat_penyetujuan_info_pane',
    padding: 3,
    columns: 1,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'textfieldInit',
                    width: 200,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    name: 'init',
                    fieldCls: 'x-form-field bold',
                    readOnly: true,
                    emptyText: '0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'textfieldApproved',
                    width: 200,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    name: 'approved',
                    fieldCls: 'x-form-field bold',
                    readOnly: true,
                    emptyText: '0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'textfieldDone',
                    width: 200,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    name: 'done',
                    fieldCls: 'x-form-field bold',
                    readOnly: true,
                    emptyText: '0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'textfieldTotal',
                    width: 200,
                    labelWidth: 150,
                    name: 'total',
                    fieldCls: 'x-form-field bold',
                    readOnly: true,
                    emptyText: '0'
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