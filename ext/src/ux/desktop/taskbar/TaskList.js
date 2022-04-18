/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.taskbar.Tasklist
 * @extends Ext.button.Button
 */
Ext.define('Ext.ux.desktop.taskbar.Tasklist', {
    extend: 'Ext.button.Button',

    requires: [
        'Ext.menu.Menu'
    ],

    padding: '0',

    alias: 'widget.tasklist',

    cls: 'ux-tasklist',

    itemId: 'tasklit',

    initComponent: function () {
        var me = this;
        
        me.startMenu = Ext.create('Ext.ux.desktop.StartMenu', me.startConfig);

        /* edited */
        // me.startBtn = {
        //     xtype: 'button',
        //     cls: 'ux-start-button',
        //     menuAlign: 'bl-tl',
        //     text: me.startBtnText,
        //     iconCls: 'ux-start-button-icon',
        // }
        me.startBtn = Ext.isObject(me.startBtn) ? me.startBtn : {text:me.startBtnText};
        Ext.applyIf(me.startBtn, {
            xtype: 'button',
            cls: 'ux-start-button',
            menuAlign: 'bl-tl',
            text: me.startBtnText,
            iconCls: 'ux-start-button-icon'
        });
        Ext.apply(me.startBtn || {}, {
            menu: me.startMenu
        });
        /**/

        me.quickStart = Ext.create('Ext.toolbar.Toolbar', me.getQuickStart());

        me.windowBar = Ext.create('Ext.toolbar.Toolbar', me.getWindowBarConfig());

        me.tray = Ext.create('Ext.toolbar.Toolbar', me.getTrayConfig());

        me.callParent();

        me.on('closeAllTask', me.closeAllTask, me);
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    getTrayConfig: function () {
        var ret = {
            items: this.trayItems
        };
        delete this.trayItems;
        return ret;
    },
    
    addActiveTasklist: function(win){
        var config = {
            iconCls: (win.module && win.module.getIcon && win.module.getIcon('16')) || ( win.icons && win.icons['16'] ) || win.iconCls,
            text: Ext.util.Format.ellipsis(win.title, 30),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };
        var tasklist = this.down('#btnActiveTasklist');
        var cmp = null;
        if(tasklist){
            cmp = tasklist.menu.add(config);
        }
        return cmp;
    },

    removeActiveTasklist: function(win){
        var found, me = this;
        var tasklist = this.down('#btnActiveTasklist');
        tasklist.menu.items.each(function (item) {
            if (item.win === win) {
                found = item;
            }
            return !found;
        });
        if (found) {
            tasklist.menu.remove(found, true);
        }
        return found;
    },

    closeAllTask: function(){
        this.windowBar.items.each(function (item) {
            if(item.toggleGroup == 'taskbar-apps'){
                item.win.fireEvent('destroy', item.win);
            }
        });
    }
});
