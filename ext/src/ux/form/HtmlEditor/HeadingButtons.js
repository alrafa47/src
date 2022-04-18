/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @contributor Somani - http://www.sencha.com/forum/member.php?51567-Somani
 * @class Ext.ux.form.HtmlEditor.HeadingButtons
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates a button on the HtmlEditor that will have H1 and H2 options. This is used when you want to restrict users to just a few heading types.</p>
 * NOTE: while 'heading' should be the command used, it is not supported in IE, so 'formatblock' is used instead. Thank you IE.
 */

Ext.define('Ext.ux.form.HtmlEditor.HeadingButtons', {
    extend: 'Ext.ux.form.HtmlEditor.MidasCommand',

    requires: [
        'Ext.ux.form.HtmlEditor.MidasCommand'
    ],

    // private
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'formatblock',
        value: '<h1>',
        tooltip: '1st Heading',
        overflowText: '1st Heading'
    }, {
        enableOnSelection: true,
        cmd: 'formatblock',
        value: '<h2>',
        tooltip: '2nd Heading',
        overflowText: '2nd Heading'
    }]
}); 