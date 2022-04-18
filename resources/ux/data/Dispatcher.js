/* 
 * File: Dispatcher.js 
 * Date: 11-Sep-2012 
 * By  : Kevin L. Esteb 
 * 
 * This module provides a method to perform queued ajax requests. It is 
 * implemented as a singleton. Usage is as follows: 
 * 
 *    var config = { 
 *        pending: 2, 
 *        queue: { 
 *            name: 'ajax', 
 *            fifo: false 
 *        } 
 *    }; 
 * 
 *    Ext.ux.data.Dispatcher(config).run(); 
 * 
 * Everything after this is event driven. 
 * 
 * --------------------------------------------------------------------- 
 * 
 *   Dispatcher.js is free software: you can redistribute it and/or modify 
 *   it under the terms of the GNU General Public License as published by 
 *   the Free Software Foundation, either version 3 of the License, or 
 *   (at your option) any later version. 
 * 
 *   Dispatcher.js is distributed in the hope that it will be useful, but 
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

Ext.define("Ext.ux.data.Dispatcher", {
	singleton: true,
	mixins: {
		observable: "Ext.util.Observable"
	},
	requires: ["Ext.ux.queue.Queues", "Ext.ux.queue.Manager"],
	uses: [
		"Ext.Ajax",
		"Ext.data.proxy.Ajax",
		"Ext.util.Observable",
		"Ext.data.Connection"
	],

	qmgr: {},
	count: 0,
	pending: 2,
	queue: {
		name: "ajax",
		fifo: false
	},

    constructor: function(config) 
    {
		config = config || {};
		this.initialConfig = config;

		Ext.apply(this, config);

		this.mixins.observable.constructor.call(this, config);

		this.qmgr = Ext.ux.queue.Manager;
	},

    run: function() 
    {
		this.qmgr.createQueue(this.queue.name, { fifo: this.queue.fifo });

		// The processing of the 'ajax' queue is event driven.
		//
		// Observe Ext.data.Connection so that we can respond to it's events.

		Ext.util.Observable.observe(Ext.data.Connection);
		Ext.data.Connection.on({
			requestcomplete: {
				fn: this.completed,
				scope: this
			},
			requestexception: {
				fn: this.exception,
				scope: this
			}
		});

		// Wait for any "enqueued" events and then start processing.

		this.qmgr.on({
			enqueued: {
				fn: this.dispatch,
				scope: this
			}
		});
	},

    dispatch: function(name) 
    {
		var request;

		if (name === this.queue.name) {
			if (this.count < this.pending) {
				if ((request = this.qmgr.nextItem(this.queue.name))) {
					Ext.Ajax.request(request);
					this.count++;
				}
			}
		}
	},

    completed: function() 
    {
		this.count--;

		if (this.count < 0) {
			this.count = 0;
		}

		this.dispatch(this.queue.name);
	},

    exception: function() 
    {
		this.count--;

		if (this.count < 0) {
			this.count = 0;
		}

		this.dispatch(this.queue.name);
	}
});
