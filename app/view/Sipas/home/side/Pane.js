/*
 * File: app/view/Sipas/home/side/Pane.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SIPAS.view.Sipas.home.side.Pane', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sipas_home_side_pane',

    requires: [
        'SIPAS.view.Sipas.session.profile.viewer.Pane',
        'SIPAS.view.Sipas.session.notification.Pane',
        'SIPAS.view.Sipas.com.button.Valuable',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill'
    ],

    border: 0,
    cls: 'sipas_home_side_pane',
    width: 256,
    overflowY: 'auto',
    bodyBorder: false,
    header: false,
    hideCollapseTool: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                header: false,
                border: false
            },
            items: [
                {
                    xtype: 'sipas_session_profile_viewer_pane',
                    height: 160,
                    width: 256
                },
                {
                    xtype: 'sipas_session_notification_pane',
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    padding: '0 5',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'sipas_com_button_valuable',
                            bootstrap: 'Sipas.sistem.about.Popup',
                            popupLauncher: true,
                            valueTemplate: '<span style=\'color:grey;\'>{productCode} {productVariant} v{productVersion}</span>',
                            cls: 'x-btn-small',
                            hidden: true,
                            itemId: 'buttonCopyright1',
                            text: '<span style=\'color:grey;\'>{productCode} {productVariant} v{productVersion}</span>'
                        },
                        {
                            xtype: 'tbfill',
                            hidden: true
                        },
                        {
                            xtype: 'button',
                            iconClsExpand: 'icon ion-md-arrow-dropright-circle',
                            iconClsCollapse: 'icon ion-md-arrow-dropleft-circle',
                            margins: '0',
                            cls: 'x-btn-circle',
                            itemId: 'buttonToggle',
                            margin: 0,
                            iconCls: 'icon ion-md-arrow-dropleft-circle'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});