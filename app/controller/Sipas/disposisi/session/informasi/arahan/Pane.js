Ext.define('SIPAS.controller.Sipas.disposisi.session.informasi.arahan.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models:[
        'Sipas.disposisi.Masuk'
    ],

    views: [
        'Sipas.disposisi.session.informasi.arahan.Pane'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_disposisi_session_informasi_arahan_pane'},
        { ref: 'txtUrutanArahan',   selector: 'sipas_disposisi_session_informasi_arahan_pane #txtUrutanArahan'}
    ],

    disposisi_masuk_id: null,

    init: function(application){
        this.control({
            'sipas_disposisi_session_informasi_arahan_pane' :{
                load: this.onMainview_Load
            }
        });
    },

    onMainview_Load: function(mainview, data, id){
        var $this = this,
            mainview = mainview || $this.getMainview(),
            txtUrutanArahan = $this.getTxtUrutanArahan({root:mainview});

        $this.disposisi_masuk_id = id;
        $this.renderUrutanArahan(mainview, data, txtUrutanArahan);
    },

    renderUrutanArahan: function(mainview, data, cmp){
        var $this = this,
            tpl = new Ext.XTemplate([
            '<tpl for=".">'+
                '<tpl if="values.disposisi_induk">'+
                    '<tpl if="!this.isPengirim(values.disposisi_masuk_id)">'+
                        '<div class="row-wrap">'+
                            '<div class="row bg-grey-200">'+
                                '<tpl if="values.disposisi_pengirim_id != values.disposisi_pelaku_id">'+
                                    '<div class="padding-top-12 padding-right-12 padding-left-12">'+
                                        '<div class="cell-visual cell-visual-left">'+
                                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={disposisi_pengirim_id}">'+
                                        '</div>'+
                                        '<div class="cell-text">'+
                                            '<div class="maintext">{disposisi_pengirim_nama}</div>'+
                                            '<div class="supporttext supporttext-dark">{disposisi_pengirim_jabatan_nama} - {disposisi_pengirim_unit_nama}</div>'+
                                            '<div class="supporttext supporttext-dark">Via asistensi oleh <span class="bold">{disposisi_pelaku_nama}</span></div>'+
                                        '</div>'+
                                    '</div>'+
                                '<tpl else>'+
                                    '<div class="padding-top-12 padding-right-12 padding-left-12">'+
                                        '<div class="cell-visual cell-visual-left">'+
                                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={disposisi_pengirim_id}">'+
                                        '</div>'+
                                        '<div class="cell-text">'+
                                            '<div class="maintext">{disposisi_pengirim_nama}</div>'+
                                            '<div class="supporttext supporttext-dark">{disposisi_pengirim_jabatan_nama} - {disposisi_pengirim_unit_nama}</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</tpl>'+
                                '<tpl if="values.disposisi_israhasia == 1">'+
                                    '<div class="padding-top-12 padding-right-12 padding-bottom-12 padding-left-48">'+
                                        '<div class="cell-text padding-left-4">'+
                                            '<div class="subtext">'+
                                                '<span class="badge badge-danger">'+
                                                    '<i class="bigger-1-25 icon ion-md-lock margin-right-4"></i>Disposisi ini bersifat rahasia'+
                                                '</span>'+
                                            '</div>'+
                                            '<tpl if="values.disposisi_model_sub == 1">'+
                                                '<div class="supporttext supporttext-dark margin-top-8">mengirim <span class="bold">Nota Dinas</span> pada {[Ext.util.Format.date(values.disposisi_tgl,\'d M Y H:i\')]}</div>'+
                                            '<tpl else>'+
                                                '<div class="supporttext supporttext-dark margin-top-8">mengirim <span class="bold">Disposisi</span> pada {[Ext.util.Format.date(values.disposisi_tgl,\'d M Y H:i\')]}</div>'+
                                            '</tpl>'+
                                        '</div>'+
                                    '</div>'+
                                '<tpl else>'+
                                    '<div class="padding-top-12 padding-right-12 padding-bottom-12 padding-left-12">'+
                                        '<div class="cell-visual cell-visual-left">'+
                                            '<div class="img img-circle img-32 bg-grey-200-i">'+
                                                '<i class="bigger-1-25 icon ion-md-quote grey-500"></i>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="cell-text">'+
                                            '<tpl if="values.perintah_nama">'+
                                                '<div class="subtext bold">{perintah_nama}</div>'+
                                            '<tpl else>'+
                                                '<div class="subtext bold">(Tidak Ada Arahan)</div>'+
                                            '</tpl>'+
                                            '<tpl if="values.disposisi_pesan">'+
                                                '<div class="supporttext supporttext-dark">{disposisi_pesan}</div>'+
                                            '<tpl else>'+
                                                '<div class="supporttext supporttext-dark">(Tidak Ada Uraian)</div>'+
                                            '</tpl>'+
                                            '<tpl if="values.disposisi_model_sub == 1">'+
                                                '<div class="supporttext supporttext-dark margin-top-8">mengirim <span class="bold">Nota Dinas</span> pada {[Ext.util.Format.date(values.disposisi_tgl,\'d M Y H:i\')]}</div>'+
                                            '<tpl else>'+
                                                '<div class="supporttext supporttext-dark margin-top-8">mengirim <span class="bold">Disposisi</span> pada {[Ext.util.Format.date(values.disposisi_tgl,\'d M Y H:i\')]}</div>'+
                                            '</tpl>'+
                                        '</div>'+
                                    '</div>'+
                                '</tpl>'+
                            '</div>'+
                        '</div>'+
                    '</tpl>'+
                '</tpl>'+
            '</tpl>',{
                isPengirim: function(id){
                    if ($this.disposisi_masuk_id == id){
                        return true;
                    } else {
                        return false;
                    }
                }
            }]);

        cmp.setValue(tpl.apply(data));

        // do not remove this
        if (cmp.getValue().search('cell') < 0){
            var container = mainview.up('#containerUrutanArahan'),
                conPengirim = container.up('#containerDisposisi').down('#containerPengirim');

            if (conPengirim) { conPengirim.addCls('x-dataview-timeline-node-start'); }
            if (container) { container.hide(); }
        }
    }
});

