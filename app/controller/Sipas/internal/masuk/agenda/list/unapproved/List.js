Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.list.unapproved.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',
        
    stores: [
        'Sipas.internal.masuk.agenda.list.unapproved.pending.List',
        'Sipas.internal.masuk.agenda.list.unapproved.tolak.List',
        'Sipas.internal.masuk.agenda.list.unapproved.semua.List'
    ],
    
    views: [
        'Sipas.internal.masuk.agenda.list.unapproved.List'
    ],

    refs: [
        { ref: 'mainview',   selector: 'sipas_internal_masuk_agenda_list_unapproved_list'},
        { ref: 'dataview',   selector: 'sipas_internal_masuk_agenda_list_unapproved_list dataview'},
        { ref: 'compInfo',   selector: 'sipas_internal_masuk_agenda_list_unapproved_list #groupInfo' },
        { ref: 'compStatus', selector: 'sipas_internal_masuk_agenda_list_unapproved_list #comboStatus' }
    ],

    api: {
        datasource: 'server.php/sipas/surat_imasuk/{status}?scope={scope}&tipe={tipe}'
    },

    controllerProperty: 'Sipas.internal.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            // "sipas_internal_masuk_agenda_list_unapproved_list sipas_com_button_refresh": {
            //     click: this.onButtonRefresh_Click
            // }
        });
    }
});