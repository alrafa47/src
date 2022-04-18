Ext.define('SIPAS.controller.Sipas.session.notification.agenda.Entity', {
        extend: 'Ext.app.Controller',

    controllers: [
        'Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact',
        'Sipas.session.notification.agenda.eksternal.masuk.blmdistribusi.List',
        'Sipas.session.notification.agenda.eksternal.masuk.aktif7.List',
        'Sipas.session.notification.agenda.eksternal.masuk.aktif3.List',
        'Sipas.session.notification.agenda.eksternal.masuk.aktif1.List',
        'Sipas.session.notification.agenda.eksternal.masuk.berkas.List',
        'Sipas.session.notification.agenda.eksternal.keluar.blmkirim.Compact',
        'Sipas.session.notification.agenda.eksternal.keluar.blmnomor.List',
        'Sipas.session.notification.agenda.internal.masuk.baru.List',
        'Sipas.session.notification.agenda.internal.masuk.aktif7.List',
        'Sipas.session.notification.agenda.internal.masuk.aktif3.List',
        'Sipas.session.notification.agenda.internal.masuk.aktif1.List',
        'Sipas.session.notification.agenda.internal.masuk.berkas.List',
        'Sipas.session.notification.agenda.internal.keluar.blmnomor.List',
        'Sipas.session.notification.agenda.internal.keluar.tolak.List',
        'Sipas.session.notification.agenda.internal.keluar.slatolak.List',
        'Sipas.session.notification.agenda.internal.keluar.ulasan.List'
    ]   
});