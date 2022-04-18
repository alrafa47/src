Ext.define('SIPAS.controller.Sipas.sistem.languageable.Language', function(){

    var grammarIsLoaded = false,
        grammarCollection = null;

return {
    extend: 'Ext.app.Controller',

    grammarUrl: 'language.json',

    messages: {
        grammarLoadFailed: [
            'Gagal memuat bahasa', 
            'Server tidak memberikan respon, silahkan cek koneksi jaringan anda.'
        ]
    },

    init: function(application)
    {
        var $this = this;
        Ext.apply(application, {
            Language: function(){
                return $this;
            },
            getGrammar: Ext.Function.alias(this, 'getGrammar')
        });
    },

    getGrammarCollection: function()
    {
        if( !(grammarCollection instanceof Ext.util.MixedCollection) )
        {
            var gColl = Ext.create('Ext.util.MixedCollection');
            gColl.addAll(grammarCollection || {});

            grammarCollection = gColl;
        }

        return grammarCollection;
    },

    getGrammar: function(code, data)
    {
        var grammar = this.getGrammarCollection().get(code);
        
        if(data === false) return grammar;

        return (new Ext.XTemplate(grammar)).apply(data || {});
    },

    loadGrammar: function(callback, scope)
    {
        var callback = callback || Ext.emptyFn,
            scope = scope || this;

        var $this = this,
            $app = this.getApplication(),
            url = this.grammarUrl;

        if(grammarIsLoaded)
        {
            var grammar = this.getGrammarCollection();
            Ext.callback(callback, scope, [grammar]);
            return grammar;
        }
            
        Ext.Ajax.request({
            url: url,
            success: function(response, operation){
                grammarIsLoaded = true;
                grammarCollection = Ext.decode(response.responseText, true) || {};
                var grammar = $this.getGrammarCollection(); // process to suitable format
                Ext.callback(callback, scope, [grammar]);
            },
            failure: function(){
                var msg = $this.getMessage('grammarLoadFailed');
                Ext.Msg.alert(msg[0], msg[1]);
            }
        });
    }

}
});