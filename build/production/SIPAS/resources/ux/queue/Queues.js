/* 
 * File: Queues.js 
 * Date: 11-Sep-2012 
 * By  : Kevin L. Esteb 
 * 
 * This module provides simple queue functionality. It supports 
 * FIFO and LIFO based queues. By default it is in FIFO mode. 
 * 
 * The constructor can be passed the following config: 
 * 
 *   config = { 
 *       fifo: true 
 *   }; 
 * 
 *   que = new Ext.ux.queue.Queues(config); 
 * 
 *   que.enqueue(value); 
 *   value = que.dequeue(); 
 * 
 * Where "fifo" can be either "true" or "false". When it is false, the 
 * queue is in LIFO mode. 
 * 
 * --------------------------------------------------------------------- 
 * 
 *   Queues.js is free software: you can redistribute it and/or modify it 
 *   under the terms of the GNU General Public License as published by the 
 *   Free Software Foundation, either version 3 of the License, or 
 *   (at your option) any later version. 
 * 
 *   Queues.js is distributed in the hope that it will be useful, but 
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

Ext.define('Ext.ux.queue.Queues', { 

    queue: [], 
    fifo: true, 

    constructor: function(config) 
    { 
       config = config || {}; 
       this.initialConfig = config; 

       Ext.apply(this, config);
    }, 

    enqueue: function(value) 
    { 
        this.queue.push(value); 
    }, 

    dequeue: function() 
    {
        var value = null; 

        if (this.queue.length > 0)
        { 
            if (this.fifo) { 
                value = this.queue.pop(); 
            } else { 
                value = this.queue.shift(); 
            } 
        } 

        return value; 

    }, 

    peek: function(pos)
    { 
        var value = null, 
            last = this.queue.length - 1; 

        if (this.queue.length > 1) 
        {
            if (pos < 0) { 
                value = this.queue[0]; 
            } else if (pos > last)  { 
                value = this.queue[last]; 
            } else { 
                value = this.queue[pos]; 
            } 
        } 

        return value; 
    }, 

    clear: function() 
    { 
        this.queue = []; 
    }, 

    count: function() 
    { 
        return this.queue.length; 
    } 

}); 