Ext.define('SIPAS.controller.Sipas.jabatan.staf.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    store:[
        'Sipas.jabatan.staf.List'
    ],

    views: [
        'Sipas.jabatan.staf.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_jabatan_staf_popup' },
        { ref: 'form',      selector: 'sipas_jabatan_staf_popup > form' },
        { ref: 'grid',      selector: 'sipas_jabatan_staf_popup grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui']
    },

    // controllerstafList: 'Sipas.staf.List',

    init: function(application) {
        this.control({
            'sipas_jabatan_staf_popup': {
                show: this.onMainview_Show
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    
                    if(c.mode === 'edit') {
                        // c.removeComponents = ['#toolbarProperties'];
                    }

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var grid = this.getGrid({root:mainview}),
            record = mainview.record,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            newStore = record.fetchStaf();

        grid.reconfigure(newStore);
        pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(){
                newStore.each(function(record){
                });
            }
        });
    }

});