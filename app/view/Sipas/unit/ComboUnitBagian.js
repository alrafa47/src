/*
 * File: app/view/Sipas/unit/ComboUnitBagian.js
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

Ext.define('SIPAS.view.Sipas.unit.ComboUnitBagian', {
    extend: 'Ext.container.Container',
    alias: 'widget.sipas_unit_combounitbagian',

    requires: [
        'SIPAS.view.Sipas.unit.Combo',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox'
    ],

    height: 35,
    itemId: 'ContainerComboUnitBagian',
    width: 354,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    itemId: 'toolbar',
                    width: 413,
                    items: [
                        {
                            xtype: 'sipasunitcombo'
                        },
                        {
                            xtype: 'sipasunitcombo',
                            itemId: 'comboBagian',
                            emptyText: 'Unit Bagian',
                            store: 'Sipas.unit.ComboBagian'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});