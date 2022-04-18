/*!
 * Copyright(c) 2014 CV Sekawan Media.
 * licensing@sekawanmedia.com
 * http://www.sekawanmedia.com/license
 */

/**
 * @class Ext.ux.role.RoleCollection
 * <p>Collection of ComponentSelector with name as Role</p>
 *
 * @version 1.0.1
 */
Ext.define('Ext.ux.role.RoleCollection', {
	requires: [
		'Ext.ux.role.ComponentSelector'
	],
	
	roles: Ext.create('Ext.util.MixedCollection'),

	/**
     * RoleCollection is class to keep all selectors depend on a component to its child
     *
     * var rolecollection = new Ext.ux.role.RoleCollection({
	 *		'role1' : ['#button','button'],
	 *		'role2' : '#combobox,combo'
     * })
     * 
     * @param {Object} collection    role collection
	 */
	constructor: function(collection){
		this.callParent([arguments]);

		var me = this;
		Ext.Object.each(collection,function(key,value, obj){
			me.addRole(key,value);
		});
		return me;
	},

	/**
     * add Role ({@link Ext.ux.ComponentSelector Ext.ux.ComponentSelector} ) for the collection
     * 
     * @param {String} name    role name
	 * @param {Ext.ux.ComponentSelector|Object|String} role    selector for role 
     */
	addRole: function(name, role){
		if( !(role instanceof Ext.ux.role.ComponentSelector) ){
			role = Ext.create('Ext.ux.role.ComponentSelector',{
				selectors: role
			});
		}
		if(role instanceof Ext.ux.role.ComponentSelector){
			this.roles.add(name, role);
		}
		return this;
	},

	/**
     * Remove Role on Collection
     * 
     * @param {String} name    role name
     */
	removeRole: function(name){
		return this.roles.removeAtKey(name);
	},

	/**
     * Get Role on Collection by name
     * 
     * @param {String} name    role name
     */
	getRole: function(name){
		return this.roles.get(name);
	},

	/**
     * Get all role in the collection
     * 
     * @return {} role
     */
	getRoles: function(){
		return this.roles;
	},

	/**
     * Get Role on Collection by name
     * 
     * @param {Ext.Component} component    component to be fire a role based on it roleName
     * @param {String} roleName    name of role to be applied in
     * @param {String|Function} action    action name or a function to apply on each component selected by Role
     * @param {Object} scope (optional)    scope to where the function will be executed
     */
	applyRole: function(component, roleName, action, scope){
		if( component instanceof Ext.Component){
			var role = this.roles.get(roleName);
			if(role){
				switch(action){
					case 'show'		: role.showTarget(component); break;
					case 'hide'		: role.hideTarget(component); break;
					case 'destroy'	: role.destroyTarget(component); break;
					default			: 
						Ext.callback(action || Ext.emptyFn, scope || this, [component]);
						break;
				}
			}
		}
		return component;
	}
});