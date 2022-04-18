
/**
 * @class Ext.ux.component.ActivityMonitor
 * @author Eko Dedy Purnomo <eko.dedy.purnomo@gmail.com>
 * @singleton
 * @version 1.1.0
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) <2016> Eko Dedy Purnomo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
Ext.define('Ext.ux.component.ActivityMonitor', {
    extend: 'Ext.Base',

    requires: [
        'Ext.util.DelayedTask',
        'Ext.util.Observable'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * Delayed Task object
     * @type {Ext.util.DelayedTask}
     * @private
     */
    task: null,

    /**
     * Current monitoring status
     * @type {Boolean}
     * @private
     */
    monitoring: false,

    /**
     * Element/Component Target
     * @type {Ext.Component}
     * @cfg
     * @private
     */
    target: Ext.getBody(),
    
    /**
     * Maximum time of user inactivity for the target elemen (in miliseconds)
     * @type {integer}
     * @cfg
     */
    maxInactive: (1000 * 60 * 5), //5 minutes

    /**
     * Time of last activity
     * @type {Date}
     * @private
     */
    lastActive: null,

    /**
     * Time of next expired
     * @type {Date}
     * @private
     */
    nextExpired: null,
    
    /**
     * @param  {object|Element} config A set of config, or target Element 
     * @param  {function} callback A function to be passed to `inactive` event
     * @param  {object} scope Object for callback to called
     * @param  {integer} maxinactive Timeout for unser inactivity for the target element
     * @return {Ext.ux.component.ActivityMonitor}
     */
    constructor: function(config) {
        var me = this;

        if(arguments.length <= 1){
            config || {};
        }else{
            config = {
                target: arguments[0],
                listeners: {
                    inactive: arguments[1] || Ext.emptyFn,
                    scope: arguments[2] || me
                },
                maxInactive: arguments[3]
            }
        }

        me.initialConfig = config;

        this.mixins.observable.constructor.call(me, config);

        me.addEvents('inactive');

        Ext.apply(me, {
            target: me.initialConfig['target'],
            maxInactive: me.initialConfig['maxInactive']
        });

        var task = me.task = new Ext.util.DelayedTask(function() {
            me.stop();
            me.fireEvent('inactive', me);
        }, me);
    },

    /**
     * Return monitoring status
     * @return {Boolean}
     */
    isMonitoring : function() {
        return this.monitoring;
    },

    /**
     * Update lastActivity status
     * @access private
     * @return {Date} Last activity / current time
     */
    captureActivity: function() {
        this.monitoring = true;
        this.lastActive = new Date();
        this.nextExpired = Ext.Date.add(this.lastActive, Ext.Date.MILLI, this.maxInactive);
        
        this.task.delay(this.maxInactive);
        
        return this.lastActive;
    },

    /**
     * Return info for last activity
     * @return {Date} Null will be return if ActivityMonitor doesn't start
     */
    getLastActivity: function(){
        return this.lastActive;
    },

    /**
     * return next expired time
     * @return {Date}
     */
    getExpiredTime: function(){
        return this.nextExpired;
    },

    /**
     * return time for expired
     * @return {Number} Time in milliseconds
     */
    getTimeToExpired: function(){
        var now = new Date(),
            nextExpired = this.getExpiredTime() || now;

        return nextExpired - now;
    },
    
    /**
     * Start monitoring component
     * @return {Ext.ux.component.ActivityMonitor}
     */
    start : function() {
        // ActivityMonitor allow only one task, 
        // so if already started it will capture as a new activity
        if(this.monitoring === true){
            this.captureActivity();
            return;
        }

        this.target.on({
            mousemove: this.captureActivity,
            keydown: this.captureActivity,
            scope: this
        });
        
        this.captureActivity();
        
        return this;
    },
    
    /**
     * Stop monitoring component
     * @return {Ext.ux.component.ActivityMonitor}
     */
    stop : function() {
        this.task.cancel();

        this.target.un({
            mousemove: this.captureActivity,
            keydown: this.captureActivity,
            scope: this
        });

        // manual set values instead of create as function stopCaptureActivity
        // make this setter in one place within removeListener on target
        this.monitoring = false;
        this.lastActive = null;
        this.nextExpired = null;

        return this;
    }
    
});
