/*
 * File: app/view/Sipas/com/form/field/Month.js
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

Ext.define('SIPAS.view.Sipas.com.form.field.Month', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.sipas_com_form_field_month',

    format: 'F, Y',
    submitFormat: 'Y-m',

    initComponent: function() {
        var me = this;

        me.processSipascomformfieldMonth(me);
        me.callParent(arguments);
    },

    processSipascomformfieldMonth: function(config) {
                var me = this;
                return Ext.apply(config, me.filterMonthConfig);
    },

    createPicker: function() {
        var me = this,
                    format = Ext.String.format;
                return Ext.create('Ext.picker.Month', {
                    pickerField: me,
                    ownerCt: me.ownerCt,
                    renderTo: document.body,
                    floating: true,
                    hidden: true,
                    focusOnShow: true,
                    minDate: me.minValue,
                    maxDate: me.maxValue,
                    disabledDatesRE: me.disabledDatesRE,
                    disabledDatesText: me.disabledDatesText,
                    disabledDays: me.disabledDays,
                    disabledDaysText: me.disabledDaysText,
                    format: me.format,
                    showToday: me.showToday,
                    startDay: me.startDay,
                    minText: format(me.minText, me.formatDate(me.minValue)),
                    maxText: format(me.maxText, me.formatDate(me.maxValue)),
                    listeners: {
                select:        { scope: me,   fn: me.onSelect     },
                monthdblclick: { scope: me,   fn: me.onOKClick     },
                yeardblclick:  { scope: me,   fn: me.onOKClick     },
                OkClick:       { scope: me,   fn: me.onOKClick     },
                CancelClick:   { scope: me,   fn: me.onCancelClick }
                    },
                    keyNavConfig: {
                        esc: function() {
                            me.collapse();
                        }
                    }
                });
    },

    onCancelClick: function() {
        var me = this;
            me.selectMonth = null;
                me.collapse();
    },

    onOKClick: function() {
        var me = this;
            if( me.selectMonth ) {
                       me.setValue(me.selectMonth);
                    me.fireEvent('select', me, me.selectMonth);
            }
                me.collapse();
    },

    onSelect: function(m, d) {
        var me = this;
        me.selectMonth = new Date(( d[0]+1 ) +'/1/'+d[1]);
    }

});