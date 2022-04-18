Ext.define('SIPAS.controller.Sipas.session.ActivityMonitor', {
	extend: 'Ext.app.Controller',

    requires: [
        'Ext.ux.component.ActivityMonitor'
    ],

    config: {
        maxInactive: 1000 * 60 * 10 // 6 minutes in miliseconds
    },

    init: function(application)
    {
        application.on({
            'sipas/session/start': this.onApp_SessionStart,
            'sipas/session/terminate': this.onApp_SessionStop,
            'sipas/session/activitymonitoring/start': this.onApp_ActivityMonitoringStart,
            'sipas/session/activitymonitoring/stop': this.onApp_ActivityMonitoringStop,
            'sipas/session/activitymonitoring/activityexpired': this.onApp_ActivityExpired,
            scope: this
        });
    },

    onApp_SessionStart: function()
    {
        var $this = this,
            $app = $this.getApplication(),
            $setting = $app.LocalSetting(),
            autoLogoutEnabled = parseInt($setting.getSetting('auto_logout') || 0);
            autoLogoutTimeConfig = parseInt($setting.getSetting('auto_logout_time') || 0) * 1000;

        this.setMaxInactive( autoLogoutTimeConfig );

        this.monitor = this.monitor || Ext.create('Ext.ux.component.ActivityMonitor',{
            target: Ext.getBody(),
            maxInactive: this.getMaxInactive(),
            listeners: {
                inactive: function(){
                    $app.fireEvent('sipas/session/activitymonitoring/stop');
                    $app.fireEvent('sipas/session/activitymonitoring/activityexpired');
                }
            }
        });

        if(autoLogoutEnabled)
        {
            this.monitor.start();
            this.getApplication().fireEvent('sipas/session/activitymonitoring/start', true);
        }
    },

    onApp_SessionStop: function()
    {
        if(this.monitor && this.monitor.isMonitoring())
        {
            this.monitor.stop();
            this.getApplication().fireEvent('sipas/session/activitymonitoring/stop');
        }
    },

    onApp_ActivityExpired: function()
    {
        this.getApplication().log('Activity Monitor: Activity already expired after', this.getMaxInactive(), 'seconds');
        this.getApplication().fireEvent('sipas/session/doterminate', true);
    },

    onApp_ActivityMonitoringStart: function()
    {
        // activity started on starting session
        this.getApplication().log('Activity Monitor: Start monitoring, expired in', this.getMaxInactive(), 'milliseconds');
    },

    onApp_ActivityMonitoringStop: function()
    {
        // activity stopped by terminating session
        this.getApplication().log('Activity Monitor: Stop monitoring');
    }
	
});