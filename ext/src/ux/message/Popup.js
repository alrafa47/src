Ext.define('Ext.ux.message.Popup', function() {
    
    var msgCt;

    function createBox(t, s) {
        return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }

    return {
        singleton: true,
        
        msg : function (title, format) {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(document.body, {
                    id : 'msg-div'
                }, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('b', {
                easing : 'easeOut',
                duration : 500
            }).ghost("t", {
                delay : 4000,
                remove : true
            });
        }
    }
});