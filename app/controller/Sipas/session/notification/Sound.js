Ext.define('SIPAS.controller.Sipas.session.notification.Sound', {
    extend: 'Ext.app.Controller',

    soundEnabled: true,

    config: {
        soundPath: 'resources/sound/notif.mp3'
    },

    init: function(application){
        
        // createjs.Sound.registerSound(this.getSoundPath(), 'sipas-notif');
        this.sound = soundManager.createSound({
          url: this.getSoundPath()
        });
        
        application.on({
            'sipas/session/notification/notify/sound': this.onApp_Notify,
            scope:this
        });
    },

    onLaunch: function(){
        this.callParent(arguments);
    },

    playSound: function(){
        // createjs.Sound.play('sipas-notif');
        this.sound && this.sound.play();
    },

    disableSound: function(){
        this.soundEnabled = false;
    },

    enableSound: function(){
        this.soundEnabled = true;
    },
    
    onApp_Notify: function(app){
        this.playSound();
    }

});