Ext.define('SIPAS.controller.Sipas.koreksi.session.informasi.penyetujuan.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models:[
        'Sipas.Surat'
    ],

    views: [
        'Sipas.koreksi.session.informasi.penyetujuan.Pane'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_koreksi_session_informasi_penyetujuan_pane'},
        { ref: 'txtUrutanSetuju',   selector: 'sipas_koreksi_session_informasi_penyetujuan_pane #txtUrutanSetuju'}
    ],

    temp_id: null,

    init: function(application){
        this.control({
            'sipas_koreksi_session_informasi_penyetujuan_pane' :{
                load: this.onMainview_Load
            }
        });
    },

    onMainview_Load: function(mainview, record, disposisi){
        var $this = this,
            mainview = mainview || $this.getMainview(),
            txtUrutanSetuju = $this.getTxtUrutanSetuju({root:mainview});

        $this.temp_id = disposisi.get('disposisi_masuk_id');
        $this.renderUrutanSetuju(record, txtUrutanSetuju);
    },

    renderUrutanSetuju: function(data, cmp){
        var $this = this,
            tpl = new Ext.XTemplate([
            '<tpl if="values._index == values._last_index">'+
                '<div class="row-wrap x-dataview-timeline-node-end">'+
            '<tpl else>'+
                '<div class="row-wrap">'+
            '</tpl>'+
                '<tpl if="this.isMyKoreksi(values.disposisi_masuk_id)">'+
                    '<div class="row bg-yellow-300">'+
                '<tpl else>'+
                    '<div class="row bg-grey-200">'+
                '</tpl>'+
                        '<div class="padding-top-12 padding-right-12 padding-bottom-12 padding-left-12">'+
                            '{[this.penyetujuTitle(values)]}'+
                            '<div style="display:flex"><div class="cell-visual cell-visual-left">'+
                                '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={disposisi_masuk_penerima_id}">'+
                            '</div>'+
                            '<div class="cell-text">'+
                                '<div class="maintext">{disposisi_masuk_penerima_nama}</div>'+
                                '<div class="supporttext supporttext-black">{disposisi_masuk_penerima_jabatan_nama} - {disposisi_masuk_penerima_unit_nama}</div>'+
                                '{[this.renderStatus(values)]}'+
                            '</div></div>'+
                        '</div>'+
                    '</div>'+
                '</div>',{
                isMyKoreksi: function(id){
                    if ($this.temp_id == id){
                        return true;
                    } else {
                        return false;
                    }
                },
                penyetujuTitle: function(data){
                    if(data.surat_model == 6 && data.surat_model_sub == 2) {
                        if(data.disposisi_model_sub == 0) {
                            return '<div class="maintext margin-bottom-4">Kolektif :</div>';
                        } else {
                            return '<div class="maintext margin-bottom-4">Petikan :</div>';
                        }
                    } else {
                        return '';
                    }
                },
                renderStatus: function(data){
                    var template = '',
                        is_baca = data.disposisi_masuk_isbaca,
                        status = data.disposisi_masuk_status,
                        status_staf = data.disposisi_masuk_status_staf,
                        status_staf_nama = data.disposisi_masuk_status_staf_nama,
                        penerima_staf = data.disposisi_masuk_penerima_id,
                        terima_tgl = Ext.util.Format.date(data.disposisi_tgl, 'd M Y H:i'),
                        baca_tgl = Ext.util.Format.date(data.disposisi_masuk_baca_tgl, 'd M Y H:i'),
                        status_tgl = Ext.util.Format.date(data.disposisi_masuk_status_tgl, 'd M Y H:i'),
                        komentar = data.disposisi_masuk_pesan ? data.disposisi_masuk_pesan : '(Tidak ada komentar)',
                        tpl_via_asistensi = '';

                    if (status_staf !== null && status_staf !== penerima_staf){
                        tpl_via_asistensi = '<div class="supporttext supporttext-dark margin-top-4">Via asistensi oleh <span class="bold">'+status_staf_nama+'</span></div>';
                    }

                    if (is_baca == 0){
                        template = '<div class="supporttext supporttext-dark margin-top-4">'+
                                        '<span class="badge badge-solid">'+
                                            '<i class="icon ion-md-alert alternative"></i>'+
                                        '</span>'+
                                        '<span class="margin-left-4">Diterima pada '+terima_tgl+'</span>'+
                                    '</div>';
                    } else {
                        if (status == 2){
                            template = '<div class="supporttext margin-top-4">'+
                                            '<span class="badge badge-solid">'+
                                                '<i class="icon ion-md-checkmark-circle info"></i>'+
                                            '</span>'+
                                            '<span class="margin-left-4 info">Menyetujui pada '+status_tgl+'</span>'+
                                        '</div>'+
                                        '<div class="supporttext supporttext-dark">'+komentar+'</div>';
                        } else if (status == 4){
                            template = '<div class="supporttext margin-top-4">'+
                                            '<span class="badge badge-solid">'+
                                                '<i class="icon ion-md-close-circle danger"></i>'+
                                            '</span>'+
                                            '<span class="margin-left-4 danger">Menandai revisi pada '+status_tgl+'</span>'+
                                        '</div>'+
                                        '<div class="supporttext supporttext-dark">'+komentar+'</div>';
                        } else {
                            template = '<div class="supporttext margin-top-4">'+
                                            '<span class="badge badge-solid">'+
                                                '<i class="icon ion-md-alert warning"></i>'+
                                            '</span>'+
                                            '<span class="margin-left-4 warning">Belum menanggapi</span>'+
                                        '</div>';
                        }
                    }
                    return template + tpl_via_asistensi;
                }
            }]);

        cmp.setValue(cmp.getValue()+tpl.apply(data));
    }
});