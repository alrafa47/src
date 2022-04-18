/* 
 * File: Manager.js 
 * Date: 11-Sep-2012 
 * By  : Kevin L. Esteb 
 * 
 * This module provides a simple queue mamanger for named queues. It is 
 * implemented as a singleton. Usage is a follows: 
 * 
 *    qmgr = Ext.ux.queue.Manager; 
 * 
 *    qmgr.createQueue('ajax', {fifo: true}); 
 *    qmgr.addItem('ajax', value); 
 * 
 *    while (value = qmgr.nextItem('ajax')) { 
 * 
 *    } 
 * 
 *    qmgr.deleteQueue('ajax'); 
 * 
 * It also exposes two events: 
 * 
 *    enqueued - when an item is placed into a queue. 
 *    dequeued - when an item is removed from a queue. 
 * 
 * Both of these events provides the name of the queue that this event 
 * happened on. 
 * 
 * --------------------------------------------------------------------- 
 * 
 *   Manager.js is free software: you can redistribute it and/or modify it 
 *   under the terms of the GNU General Public License as published by the 
 *   Free Software Foundation, either version 3 of the License, or 
 *   (at your option) any later version. 
 * 
 *   Manager.js is distributed in the hope that it will be useful, but 
 *   WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU 
 *   General Public License for more details. 
 * 
 *   You should have received a copy of the GNU General Public License 
 *   along with RemoteStorageProvider.js. If not, see 
 *   <http://www.gnu.org/licenses/>. 
 * 
 * --------------------------------------------------------------------- 
 * 
 */

Ext.define("Ext.ux.queue.Manager", {
	singleton: true,
	mixins: {
		observable: "Ext.util.Observable"
	},
	requires: ["Ext.ux.queue.Queues"],
	uses: ["Ext.util.Observable"],

	queues: [],

	constructor: function() 
	{
		this.mixins.observable.constructor.call(this);
		this.addEvents("enqueued", "dequeued");
	},

	createQueue: function(name, config) 
	{
		if (!this.queues[name]) {
			this.queues[name] = Ext.create("Ext.ux.queue.Queues", config);
		}
	},

	deleteQueue: function(name) 
	{
		var queue = null;

		if ((queue = this.getQueue(name))) {
			queue.clear();
			delete this.queues[name];
		} else {
			Ext.Error.raise('queue "' + name + '" is not defined');
		}
	},

	getQueue: function(name) 
	{
		return this.queues[name] || null;
	},

	nextItem: function(name) 
	{
		var queue = null,
			value = null;

		if ((queue = this.getQueue(name))) {
			value = queue.dequeue();
			this.fireEvent("dequeued", name);
		} else {
			Ext.Error.raise('queue "' + name + '" is not defined');
		}

		return value;
	},

	addItem: function(name, value) 
	{
		var queue = null;

		if ((queue = this.getQueue(name))) {
			queue.enqueue(value);
			this.fireEvent("enqueued", name);
		} else {
			Ext.Error.raise('queue "' + name + '" is not defined');
		}
	},

	countItems: function(name) 
	{
		var count = 0,
			queue = null;

		if ((queue = this.getQueue(name))) {
			count = queue.count();
		} else {
			Ext.Error.raise('queue "' + name + '" is not defined');
		}

		return count;
	}
});
