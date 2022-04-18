/*!
 * Copyright(c) 2014 CV Sekawan Media.
 * licensing@sekawanmedia.com
 * http://www.sekawanmedia.com/license
 */

/**
 * @class Ext.ux.role.ComponentSelector
 * <p>Collection of ComponentSelector with name as Role</p>
 *
 * @version 1.0.1
 */
Ext.define('Ext.ux.role.ComponentSelector', {

	selectors: [],

	constructor: function (config) {
		var me = this;
		config = config || {};
		if( Ext.isString(config) ){
			config = { selectors:config };
		}
		if( Ext.isArray(config) ){
			config = { selectors:config };
		}
		Ext.applyIf(config, {
			selectors: []
		});
		config.selectors = Ext.Array.from(config.selectors);
		me.selectors = config.selectors;
		me.initConfig(config);
	},

	/**
     * add query/component selector to colection
     * 
     * @param {String} selector    selector/query
     */
	addSelector: function(selector){
		Ext.Array.include(Ext.Array.from(this.selectors), selector);
		return this;
	},

	/**
     * remove selector from collection
     * 
     * @param {String} selector    selctor/query
     */
	removeSelector: function(selector){
		Ext.Array.remove(Ext.Array.from(this.selectors), selector);
		return this;
	},

	/**
     * check if selector is exist on its collection
     * 
     * @param {String} selector    selctor/query
     */
	containsSelector: function(selector){
		return Ext.Array.contains(Ext.Array.from(this.selectors), selector);
	},

	/**
     * clear selectors
     * 
     * @param {String} selector    selctor/query
     */
	clearSelectors: function(){
		this.selectors = [];
		return this;
	},

	/**
     * get Component matched depend on selectors
     * 
     * @param {Function} fn    Function to be applied on found component
     * @param {Ext.Component} parent (optional)    Root component for selector to be looked up from
     */
	getTarget: function(parent, fn, scope){
		console.log(parent);
		fn = fn || Ext.emptyFn;
		var target = [];
		Ext.Array.each(this.selectors, function(selector){
			var newtarget = Ext.ComponentQuery.query(selector, parent);
			target = Ext.Array.merge(target, newtarget);
		});
		Ext.Array.each(target, fn, scope);
		return target;
	},

	// start extra usefull function
	/**
     * show components match with selector
     * 
     * @param {Ext.Component} parent (optional)    Root component for selector to be looked up from
     */
	showTarget: function(parent){
		return this.getTarget(parent, function(target){
			if( ! target.isVisible() ){
				target.show();
			}
		}, this);
	},

	/**
     * hide components match with selector
     * 
     * @param {Ext.Component} parent (optional)    Root component for selector to be looked up from
     */
	hideTarget: function(parent){
		return this.getTarget(parent, function(target){
			target.hide();
		}, this);
	},

	/**
     * destroy components match with selector
     * 
     * @param {Ext.Component} parent (optional)    Root component for selector to be looked up from
     */
	destroyTarget: function(parent){
		return this.getTarget(parent, function(target){
			target.hide().destroy();
		}, this);
	}
	// end extra usefull function		
});