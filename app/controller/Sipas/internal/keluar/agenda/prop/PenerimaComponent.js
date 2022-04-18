Ext.define('SIPAS.controller.Sipas.internal.keluar.agenda.prop.PenerimaComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    refs : [
        { ref: 'mainview',      selector: 'sipas_internal_keluar_agenda_prop' },
        { ref: 'component',     selector: 'sipas_internal_keluar_agenda_prop sipas_internal_agenda_penerima_list' }
    ],

    init: function(application) {
        this.control({
            'sipas_internal_keluar_agenda_prop sipas_internal_agenda_penerima_list': {
                loadassociate: this.onComponent_LoadAssociate
            }
        });
    },

    onComponent_LoadAssociate: function(record, form, cmp) {
        var $this = this,
            storePenerima = $this.getStore($this.storePenerima);

        storePenerima.removeAll();

        var store = record.fetchStack();

        store.load(function() {
            store.each(function(record) {
                storePenerima.addSorted(record);
            });
        });
    }

});
