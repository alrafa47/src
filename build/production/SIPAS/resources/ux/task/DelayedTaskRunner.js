/**
 * Ext.ux.task.DelayedtaskRunner help to make easy for queueing task in delayed time 
 * @author Eko Dedy Purnomo <eko.dedy.purnomo@gmail.com>
 *
 *     var tr = Ext.create('Ext.ux.task.DelayedTaskRunner', {
 *     		delay: 1000
 *     });
 *     tr.addTask(function(){
 *     		console.log('task 1 start');
 *     });
 *     tr.addTask(function(){
 *     		console.log('task 2 start');
 *     });
 *     var t3 = tr.addTask(function(){
 *     		console.log('task 3 start');
 *     });
 *     tr.addTask(function(){
 *     		console.log('task 4 start');
 *     });
 *     t3.cancel();
 *     // tr.reschedule();
 * 
 */
Ext.define('Ext.ux.task.DelayedTaskRunner', {

	requires: [
		'Ext.util.DelayedTask',
		'Ext.util.MixedCollection'
	],

	running: false,

	queues: [],

	config: {
		delay: 0,
		fifo: true
	},

	constructor: function(config){
		this.initConfig(config);

		this.queues = new Ext.util.MixedCollection;

		return this;
	},

	reschedule: function(){
		var now = Date.now();
		this.queues.each(function(task, idx){
			task.startTime = now + (this.delay * idx)
			task.delay(task.startTime - now);
			console.log(task.startTime);
		}, this);
	},

	addTask: function(fn, scope){
		var $this = this,
			now = Date.now(),
			lastTask = this.queues.last(),
			lastTaskStartTime = (lastTask && lastTask.startTime) || now,
			taskStartTime = lastTaskStartTime + this.delay,
			task = new Ext.util.DelayedTask();

		this.queues.add(task);
		
		task.taskFn = fn;
		task.taskScope = scope;
		task.startTime = taskStartTime;

		task.delay(task.startTime - now, function(){
			Ext.callback(this.taskFn, this.taskScope);
			$this.queues.remove(this);
		}, task);

		task.cancelParent = task.cancel;
		task.cancel = function(){
			this.cancelParent();
			$this.queues.remove(this);
		}

		return task;
	}

});