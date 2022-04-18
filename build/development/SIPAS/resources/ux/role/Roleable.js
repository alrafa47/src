/*!
 * Copyright(c) 2014 CV Sekawan Media.
 * licensing@sekawanmedia.com
 * http://www.sekawanmedia.com/license
 */

/**
 * @class Ext.ux.role.Roleable
 * <p>Abstract class for Ext.Component that can be have a role</p>
 *
 * @version 1.0.1
 */
Ext.define('Ext.ux.role.Roleable',
    function() {
        applyRoleTo = function(selector, parent, roleCollection, action, scope) {
            parent = parent || this;
            var components = [];
            if (roleCollection instanceof Ext.util.MixedCollection && parent instanceof Ext.Component) {
                components = Ext.ComponentQuery.query(selector, parent);

                if (!action) {
                    Ext.Array.each(components, function(component) {
                        if (roleCollection.get(component.role) !== true) {
                            component.hide().destroy();
                        }
                    });
                } else {
                    Ext.Array.each(components, function(component) {
                        Ext.callback(action || Ext.emptyFn, scope, [component, component.role, roleCollection.get(component.role), components]);
                    });
                }
            }
            return this;
        }
        return {
            requires: [
                'Ext.ux.role.RoleCollection'
            ],

            statics: {
                applyRoleTo: function(selector, parent, roleCollection, action, scope) {
                    selector = selector || '[roleable=true]';
                    applyRoleTo(selector, parent, roleCollection, action, scope);
                }
            },

            config: {
                /**
                 * @cfg {Ext.ux.role.RoleCollection} roleCollection
                 * Collection of role library for its
                 * {@link Ext.ux.role.RoleCollection RoleCollection}.
                 */
                roleCollection: null,

                /**
                 * @cfg {String} role
                 * String role name to be lookup on role collection when applyRole triggered
                 */
                role: null,

                /**
                 * @cfg {String} selectorRoleable
                 * Selector for its child component to be fired a role
                 */
                selectorRoleable: '[roleable=true]',

                defaultAction: null // fn  
            },

            autoApplyRole: false,

            constructor: function() {
                var me = this;
                Ext.applyIf(me, {
                    autoApplyRole: false
                })
                me.callParent(arguments);

                if (me.autoApplyRole == true) {
                    me.on('beforeshow', function() {
                        me.applyRole();
                    }, this);
                }
                me.initConfig(config);
                return me;
            },

            /**
             * affect its view to a valid view as Role in RoleCollection given
             *
             * @param {Ext.ux.role.RoleCollection} roleCollection (optional) Ext.ux.role.RoleCollection if needed on demand instead of this RoleCollection
             */
            applyRole: function(roleCollection, action, scope) {
                roleCollection = roleCollection || this.getRoleCollection();
                action = action || this.getDefaultAction();
                scope = scope || this;

                applyRoleTo(this.getSelectorRoleable(), this, roleCollection, action, scope)
                return this;
            }
        }
    }
);