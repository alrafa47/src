Ext.define('SIPAS.controller.Sipas.home.side.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.home.side.Pane'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_home_side_pane' },
        { ref: 'tab',           selector: 'sipas_home_side_pane tab' },
        { ref: 'compSession',   selector: 'sipas_home_side_pane #buttonSession' }
    ],

	api: {
		'profile_thumb': 'server.php/sipas/staf/get_image/foto/thumb?id={id}'
	},

    init: function(application) {
        this.control({
            'sipas_home_side_pane':{
                afterrender: this.onPane_AfterRender
            },
            'sipas_home_side_pane #buttonToggle':{
                afterrender: this.onButtonToggle_AfterRender,
                click: this.onButtonToggle_Click
            },
            'sipas_home_side_pane #buttonSession menu menuitem#menuLogout': {
                click: this.onMenuLogout_Click
            },
            'sipas_home_side_pane #buttonSession menu menuitem[popupLauncher=true]': {
                click: this.onPageAndPopupLauncher_Click
            }
        });
    },

    onPane_AfterRender: function(component, e, eOpts){
        this.getApplication().on({
            'sipas/home/side/collapse':function(){
                if(!component.getCollapsed()){
                    component.collapse();
                }
            },
            'sipas/home/side/expand':function(){
                if(component.getCollapsed()){
                    component.expand();
                }
            }
        });
    },

    onMenuLogout_Click: function(menuitem, e, eOpts)
    {
        this.getApplication().fireEvent('sipas/session/doterminate', false);
    },

    onPageAndPopupLauncher_Click: function(button, e, eOpts)
    {
        this.getApplication().fireEvent('sipas/page/boot', button.bootstrap, button.popupLauncher);
    },

    onButtonToggle_Click: function(button, e, eOpts)
    {
        var mainview = this.getMainview({from: button}),
            collapse = function()
            {
                var mainWidth = 40, 
                    mainHeight = 40;

                mainview.miniMode = true;
                mainview.query('menuitem').forEach(function(item){
                    item.addCls('x-menu-item-notext');
                    item.addCls('x-menu-item-toggled');
                });
                mainview.query('#buttonCopyright').forEach(function(item){
                    item.removeCls('x-menu-item-noicon');  
                });
                mainview.query('#buttonProfile').forEach(function(item){
                    item.addCls('x-btn-notext');
                    item.addCls('x-btn-profile-toggled');
                    item.setWidth(mainWidth);
                });
                mainview.query('#formProfile').forEach(function(item){
                    item.setSize(mainWidth,mainWidth);
                });
                mainview.query('sipas_session_profile_viewer_pane').forEach(function(item){
                    item.removeCls('x-panel-transparentbody');
                });
                button.setIconCls(button.iconClsExpand);
                
                mainview.setWidth(mainWidth);
            },
            expand = function()
            {
                var mainWidth = 256,
                    mainHeight = 160;

                mainview.miniMode = false;
                mainview.query('menuitem').forEach(function(item){
                    item.removeCls('x-menu-item-notext');
                    item.removeCls('x-menu-item-toggled');
                });
                mainview.query('#buttonCopyright').forEach(function(item){
                    item.addCls('x-menu-item-noicon')  
                });
                mainview.query('#buttonProfile').forEach(function(item){
                    item.removeCls('x-btn-notext');
                    item.removeCls('x-btn-profile-toggled');
                    item.setWidth(mainWidth);
                });
                mainview.query('#formProfile').forEach(function(item){
                    item.setSize(mainWidth,mainHeight);
                });
                mainview.query('sipas_session_profile_viewer_pane').forEach(function(item){
                    item.addCls('x-panel-transparentbody');
                });
                button.setIconCls(button.iconClsCollapse);

                mainview.setWidth(mainWidth);
            }
        
        if(mainview.miniMode)
        {
            expand();
        }else
        {
            collapse();
        }
    },

    onButtonToggle_AfterRender: function(component, e)
    {
        var mainview = this.getMainview({from: component}),
            iconState = mainview && mainview.collapsed ? component.iconClsExpand : component.iconClsCollapse;

        component.setIconCls(iconState);
    }

});
