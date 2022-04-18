Ext.define('SIPAS.controller.Sipas.disposisi.tembusan.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    stores:[
        'Sipas.disposisi.tembusan.List'
    ],

    models:[
        'Sipas.disposisi.Masuk'
    ],

    views: [
        'Sipas.disposisi.tembusan.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_disposisi_tembusan_list' }
    ],

    defaultStore: 'Sipas.disposisi.tembusan.List',

    init: function(application) {
        this.control({
            'sipas_disposisi_tembusan_list': {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender,
                load: this.onGridpanel_Load
            }
        });
    },

    onGridpanel_Load: function(grid, record){
        var load = function(r){
            var s = r.fetchPenerima(); // assume record is Surat
            grid.reconfigure(s);

            s.reload({
                callback: function(){
                } 
            });
        }

        if(record && record.isModel){
            load(record);
        }else{
            this.getModel('Sipas.Surat').load(record, {
                callback: function(r){
                    load(r);
                }
            });
        }
    }
});