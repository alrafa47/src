Ext.define('SIPAS.controller.Sipas.sistem.about.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.sistem.about.Popup'
    ],

    init: function(application){
        this.control({
            'sipas_sistem_about_popup #buttonHandout': {
                click: this.onButtonHandout_Click
            },
            'sipas_sistem_about_popup #buttonMobile': {
                click: this.onButtonMobile_Click  
            },
            'sipas_sistem_about_popup #buttonChangelog': {
                click: this.onButtonChangeLog_Click  
            },
            'sipas_sistem_about_popup #toolbarLogo': {
                afterrender: this.onContainerLogo_AfterRender  
            }
        });
    },

    launch: function() {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            desc = $app.getMetadata('productDescription',$app.getMetadata()),
            view = $this.createView({html: desc});

        view.show();
        return view;
    },

    onContainerLogo_AfterRender: function(component, eOpts)
    {
        var $app = this.getApplication(),
            logo = $app.getMetadata('productLogo') || $app.getMetadata('productIcon');

        component.getEl().applyStyles({
            'background-image': 'url('+logo+')',
            'background-position': 'center center',
            'background-size': 'auto 56px',
            'background-repeat': 'no-repeat'
        });
    },

    onButtonHandout_Click: function(button, e, eOpts){
        this.getController('Sipas.sistem.doc.Popup').launch();
    },

    onButtonChangeLog_Click: function(button, e, eOpts){
        this.getController('Sipas.sistem.changelog.Popup').launch();
    },

    onButtonMobile_Click: function(button, e, eOpts){
        this.getController('Sipas.sistem.mobile.Popup').launch();
    }
});