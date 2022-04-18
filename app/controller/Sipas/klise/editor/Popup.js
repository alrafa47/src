Ext.define('SIPAS.controller.Sipas.klise.editor.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.klise.editor.Popup'
    ],
    refs: [
        {ref: 'mainview', selector: 'sipas_klise_editor_popup'},
        {ref: 'editor', selector: 'sipas_klise_editor_popup sipas_com_ckeditor'}
    ],

    init: function(application) {
        this.control({
            "sipas_klise_editor_popup sipas_com_button_save": {
                click: this.onBtnSave_Click
            }
        });
    },

    onBtnSave_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from: button}),
            editor = $this.getEditor({root: mainview});

        Ext.callback(mainview.callback || Ext.emptyFn, mainview.scope || this, [editor.getValue()]);
        mainview.close();
    },

    launch: function(value, callback, scope){
        var $this = this,
            mainview = this.createView(),
            editor = $this.getEditor({root: mainview});

        mainview.callback = callback;
        mainview.scope = scope;

        editor.setValue(value);
        mainview.show();
    }

});
