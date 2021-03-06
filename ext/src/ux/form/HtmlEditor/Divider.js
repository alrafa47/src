/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Divider
 * @extends Ext.util.Observable
 * <p>A plugin that creates a divider on the HtmlEditor. Used for separating additional buttons.</p>
 */
Ext.define('Ext.ux.form.HtmlEditor.Divider',{
	extend: 'Ext.util.Observable',
	// private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('afterrender', this.onRender, this);
    },
    // private
    onRender: function(){
        // this.cmp.getToolbar().add([new Ext.Toolbar.Separator()]);
    }
})
