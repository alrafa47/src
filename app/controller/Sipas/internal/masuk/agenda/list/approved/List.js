Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.list.approved.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',
        
    stores: [
        'Sipas.internal.masuk.agenda.list.approved.aktif.List'
    ],
    
    views: [
        'Sipas.internal.masuk.agenda.list.approved.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_internal_masuk_agenda_list_approved_list'},
        { ref: 'dataview',          selector: 'sipas_internal_masuk_agenda_list_approved_list dataview'},
        { ref: 'compApprovalInfo',  selector: 'sipas_internal_masuk_agenda_list_approved_list sipas_surat_penyetujuan_informasi_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_internal_masuk_agenda_list_approved_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_internal_masuk_agenda_list_approved_list #groupInfo' },
        { ref: 'compTipe',          selector: 'sipas_internal_masuk_agenda_list_approved_list #comboTipe' }
    ],

    api: {
        datasource: 'server.php/sipas/surat_imasuk/read/scope/?list=approve&scope={scope}&status={status}&tipe={tipe}'
    },

    controllerDistribusi: 'Sipas.internal.masuk.agenda.distribusi.Prop',

    init: function(application) {
        this.control({
            // "sipas_internal_masuk_agenda_list_approved_list sipas_com_button_refresh": {
            //     click: this.onButtonRefresh_Click
            // }
            /*onClick function is placed on Compact because it needs scope from another controller*/
        });
    }
});