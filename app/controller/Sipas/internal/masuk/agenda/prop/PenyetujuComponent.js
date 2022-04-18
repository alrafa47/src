Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.prop.PenyetujuComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    refs : [
        { ref: 'mainview',      selector: 'sipas_internal_masuk_agenda_prop' },
        { ref: 'component',     selector: 'sipas_internal_masuk_agenda_prop sipas_internal_agenda_penyetuju_list' }
    ],

    init: function(application) {
        this.control({
            'sipas_internal_masuk_agenda_prop sipas_internal_agenda_penyetuju_list': {
                loadassociate: this.onComponent_LoadAssociate
            }
        });
    },

    onComponent_LoadAssociate: function(record, form, cmp) {
        var $this = this,
            storePenyetuju = $this.getStore($this.storePenyetuju);

        storePenyetuju.removeAll();

        var store = record.fetchStack();

        store.load(function() {
            store.each(function(record) {
                storePenyetuju.addSorted(record);
            });
        });
    }

});
