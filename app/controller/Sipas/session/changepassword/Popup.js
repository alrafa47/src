Ext.define('SIPAS.controller.Sipas.session.changepassword.Popup', {
    extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views: [
        'Sipas.session.changepassword.Popup'
    ],

    messages: {
        process_failed: 'Gagal mengubah password.'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_session_changepassword_popup'}
    ],

    init: function(application) {
        this.control({
            "sipas_session_changepassword_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function() {
        var view = this.createView({
            requireComponents: ['textfield']
        });
        view && view.show();
        return view;
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.Session(),
            view = $this.getMainview({from:button}),
            form = view.down('form'),
            msgFail = $this.getMessage('process_failed');

        if(form.getForm().isValid()){
            $session.changePassword({
                wait:true,
                oldpassword: view.down('#textfieldOldpassword').getValue(),
                newpassword: view.down('#textfieldNewpassword').getValue(),
                callback: function(success, responseJson, response){
                    $helper.showMsg({
                        success: success,
                        message: responseJson.message || msgFail,
                        callback: function(){
                            if(success) view.close();
                        }
                    });
                }
            })
        }
    }

});
