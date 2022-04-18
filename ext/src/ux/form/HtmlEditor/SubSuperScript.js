/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.SubSuperScript
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for superscript and subscripting of selected text.</p>
 */
Ext.define('Ext.ux.form.HtmlEditor.SubSuperScript',{
    extend: 'Ext.ux.form.HtmlEditor.MidasCommand',
    // private
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'subscript',
        tooltip: 'Subscript',
        overflowText: 'Subscript'
    }, {
        enableOnSelection: true,
        cmd: 'superscript',
        tooltip: 'Superscript',
        overflowText: 'Superscript'
    }]
});
