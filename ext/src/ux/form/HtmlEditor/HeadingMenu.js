/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.HeadingMenu
 * @extends Ext.util.Observable
 * <p>A plugin that creates a menu on the HtmlEditor for selecting a heading size. Takes up less room than the heading buttons if your going to have all six heading sizes available.</p>
 */
Ext.define('Ext.ux.form.HtmlEditor.HeadingMenu', {
    extend: 'Ext.util.Observable',
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('afterrender', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().add({
            xtype: 'combo',
            displayField: 'display',
            valueField: 'value',
            name: 'headingsize',
            forceSelection: true,
            mode: 'local',
            triggerAction: 'all',
            width: 65,
            emptyText: 'Heading',
            store: {
                xtype: 'arraystore',
                autoDestroy: true,
                fields: ['value','display'],
                data: [
                    {
                        'value':'H1',
                        'display':'H1'
                    },
                    {
                        'value':'H2',
                        'display':'H2'
                    },
                    {
                        'value':'H3',
                        'display':'H3'
                    },
                    {
                        'value':'H4',
                        'display':'H4'
                    },
                    {
                        'value':'H5',
                        'display':'H5'
                    },
                    {
                        'value':'H6',
                        'display':'H6'
                    }
                ]
            },
            listeners: {
                'select': function(combo,selection){
                    var rec = selection[0]
                    this.relayCmd('formatblock', '<'+rec.get('value')+'>');
                    combo.reset();
                },
                scope: cmp
            }
        });
    }
});
