Ext.define('Ext.ux.task.Tasklist', function() {

    var tasklist;

    return {
        singleton: true,

        constructor : function () {
            if (! tasklist ) {
                tasklist = [];
            }
        },
        getAllTask : function () {
            return tasklist;
        },
        getTask : function (taskname) {
            if (typeof taskname == 'undefined') {
                return tasklist;
            } else if (typeof tasklist[taskname] != 'undefined') {
                return tasklist[taskname];
            } else {
                return null;
            }
        },

        createTask : function (taskname, func, interval, autostart) {
            tasklist[taskname] = Ext.TaskManager.newTask({
                run : func,
                interval : interval
            });
            if (autostart === undefined || autostart === null){
                autostart = true;
            }
            if (autostart === true) {
                tasklist[taskname].start();
            }
            return tasklist[taskname];
        },
        startAll : function () {
            for (var i in tasklist) {
                tasklist[i].start();
            }
        },
        stopAll : function () {
            for (var i in tasklist) {
                tasklist[i].stop();
            }
        }
    }
});