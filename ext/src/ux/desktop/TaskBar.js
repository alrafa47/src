/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.TaskBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('Ext.ux.desktop.TaskBar', {
    // This must be a toolbar. we rely on acquired toolbar classes and inherited toolbar methods for our
    // child items to instantiate and render correctly.
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'Ext.button.Button',
        'Ext.resizer.Splitter',
        'Ext.menu.Menu',

        'Ext.ux.desktop.StartMenu',
        'Ext.ux.desktop.TrayClock'
    ],

    padding: '0',

    alias: 'widget.taskbar',

    cls: 'ux-taskbar',

    itemId: 'taskbar',

    startMenu: undefined,

    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     */
    startBtnText: 'Start',

    initComponent: function() {
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
        me.startBtn = Ext.isObject(me.startBtn) ? me.startBtn : {
            text: me.startBtnText
        };
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

        var spliter = {
            xtype: 'splitter',
            html: '&#160;',
            padding: '0',
            height: 36,
            width: 2, // TODO - there should be a CSS way here
            cls: 'x-toolbar-separator x-toolbar-separator-horizontal',
            margin: '0 4 0 4'
        };
        me.items = [
            me.startBtn,
            // spliter,
            // {
            //     xtype: 'component',
            //     width: 10
            // },
            // me.quickStart,
            me.windowBar,
            // spliter,
            me.tray, {
                xtype: 'button',
                scale: 'large',
                text: '&#160;',
                overCls: '',
                margin: 0,
                // padding: 0,
                cls: 'x-btn-default-toolbar-large-over',
                handler: me.hideWindows
            }
        ];

        me.callParent();

        me.on('closeAllTask', me.closeAllTask, me);
    },

    afterLayout: function() {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function() {
        var me = this,
            ret = {
                minWidth: 20,
                //width: Ext.themeName === 'neptune' ? 70 : 60,
                items: [],
                enableOverflow: true
            };

        Ext.each(this.quickStart, function(item) {
            ret.items.push({
                tooltip: {
                    text: item.name,
                    align: 'bl-tl'
                },
                //tooltip: item.name,
                overflowText: item.name,
                iconCls: item.module.getIcon('24'),
                module: item.module,
                handler: me.onQuickStartClick,
                scope: me
            });
        });

        return ret;
    },

    /**
     * This method returns the configuration object for the Tray toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getTrayConfig: function() {
        var ret = {
            items: this.trayItems
        };
        delete this.trayItems;
        return ret;
    },

    getWindowBarConfig: function() {
        return {
            flex: 1,
            cls: 'ux-desktop-windowbar',
            items: ['&#160;'],
            layout: {
                overflowHandler: 'Scroller'
            }
        };
    },

    getWindowBtnFromEl: function(el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function(btn) {
        var module = this.app.getModule(btn.module),
            window;

        if (module) {
            window = module.createWindow();
            window.show();
        }
    },

    onButtonContextMenu: function(e) {
        var me = this,
            t = e.getTarget(),
            btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    hideWindows: function() {
        Ext.each(Ext.ComponentQuery.query('[toggleGroup=taskbar-apps]'), function(btn) {
            var win = btn.win;
            if (!(win.minimized || win.hidden)) {
                win.minimize();
            }
        });
    },

    onWindowBtnClick: function(btn, toggle) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            btn.disable();
            win.show(null, function() {
                btn.enable();
            });
        } else if (win.active) {
            btn.disable();
            win.on('hide', function() {
                btn.enable();
            }, null, {
                single: true
            });
            win.minimize();
        } else {
            win.toFront();
        }
    },

    addTaskButton: function(win) {
        var config = {
            overCls: '',
            cls: 'x-btn-default-toolbar-medium-over',
            iconCls: (win.module && win.module.getIcon && win.module.getIcon('24')) || (win.icons && win.icons['24']) || win.iconCls,
            enableToggle: true,
            toggleGroup: 'taskbar-apps',
            scale: 'medium',
            width: 160,
            margins: '0 1 0 1',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);

        this.addActiveTasklist(win);
        return cmp;
    },

    removeTaskButton: function(btn) {
        var found, me = this;
        me.windowBar.items.each(function(item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
            me.removeActiveTasklist(found.win);
        }
        return found;
    },

    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function(item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    },

    addActiveTasklist: function(win) {
        var config = {
            iconCls: (win.module && win.module.getIcon && win.module.getIcon('16')) || (win.icons && win.icons['16']) || win.iconCls,
            text: Ext.util.Format.ellipsis(win.title, 30),
            toggleGroup: 'taskbar-apps',
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };
        var tasklist = this.down('#btnActiveTasklist');
        var cmp = null;
        if (tasklist) {
            cmp = tasklist.menu.add(config);

            this.refreshTasklist()
        }
        return cmp;
    },

    removeActiveTasklist: function(win) {
        var found, me = this;
        var tasklist = this.down('#btnActiveTasklist');
        tasklist.menu.items.each(function(item) {
            if (item.win === win) {
                found = item;
            }
            return !found;
        });
        if (found) {
            tasklist.menu.remove(found, true);

            this.refreshTasklist()
        }
        return found;
    },

    refreshTasklist: function() {
        var tasklist = this.down('#btnActiveTasklist');
        if (tasklist) {
            var a = tasklist.menu.items.filterBy(function(item){
                return item.toggleGroup == 'taskbar-apps';
            });
            var a_count = a.getCount();
            tasklist.menu.items.each(function(item){
                item.getXType() == 'menuseparator' && !a_count ? item.hide() : item.show();
                item.setDisabled(!a_count);
            });
        }
    },

    closeAllTask: function() {
        this.windowBar.items.each(function(item) {
            if (item.toggleGroup == 'taskbar-apps') {
                item.win.destroy();
            }
        });
    }
});