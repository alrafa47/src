Ext.define('SIPAS.controller.Sipas.koreksi.session.informasi.penyetujuan.status.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models:[
        'Sipas.Surat'
    ],

    views: [
        'Sipas.koreksi.session.informasi.penyetujuan.status.Pane'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_koreksi_session_informasi_penyetujuan_status_pane'},
        { ref: 'txtStatusSetuju',   selector: 'sipas_koreksi_session_informasi_penyetujuan_status_pane #txtStatusSetuju'}
    ],

    init: function(application){
        this.control({
            'sipas_koreksi_session_informasi_penyetujuan_status_pane' :{
                load: this.onMainview_Load
            }
        });
    },

    onMainview_Load: function(mainview, data, disposisi, is_urut){
        var $this = this,
            mainview = mainview || $this.getMainview(),
            txtStatusSetuju = $this.getTxtStatusSetuju({root:mainview});

        $this.renderPenyetujuan(data, txtStatusSetuju, is_urut);
    },

    renderPenyetujuan: function(data, cmp, is_urut){
        var $this = this,
            statusSetuju = data.disposisi_masuk_status,
            data_length = data.length - 1,
            tpl = '';

        if (is_urut){
            Ext.each(data, function(item, index, all)
            {
                if (index != data_length){
                    item['arrow_tpl'] = '<div class="cell-visual padding-top-8"><div class="badge badge-solid"><i class="ion ion-md-arrow-round-forward"></i></div></div>';
                }
            }, this, true);

            tpl = new Ext.XTemplate([
                    '<div class="margin-left-8 margin-right-8"><span class="blue-700-i">Status Penyetujuan (Penyetujuan Urut)</span></div>'+
                    '<div class="margin-top-8 margin-left-8 margin-right-8">'+
                        '<tpl for=".">'+
                            '<div class="cell-visual">'+
                                '<div class="padding-top-12">'+
                                    '<div style="display:flex"><div class="cell-visual cell-visual-left margin-right-8">'+
                                        '<div class="img img-circle img-32 bg-brown-500-i grey-100-i" data-qtip="{staf_nama}">'+
                                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={staf_id}">'+
                                            '{[this.renderBadge(values)]}'+
                                        '</div>'+
                                    '</div>{arrow_tpl}</div>'+
                                '</div>'+
                                '<div class="padding-top-4 padding-bottom-4">'+
                                    '<div class="cell-text">'+
                                        '<div class="supporttext grey-100-i">{[this.renderSub(values)]}</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</tpl>'+
                    '</div>',{
                        renderBadge: function(data){
                            var return_badge = '',
                                status_baca = data.surat_stack_isbaca,
                                status = data.surat_stack_status;

                            if (status_baca != 1){
                                return_badge = '<div class="badge badge-right badge-bottom bg-grey-500-i">'+
                                                    '<i class="ion ion-md-warning"></i>'+
                                                '</div>';
                            } else {
                                if (status == 2){
                                    return_badge = '<div class="badge badge-right badge-bottom bg-green-500-i">'+
                                                        '<i class="ion ion-md-checkmark"></i>'+
                                                    '</div>';
                                } else if (status == 4){
                                    return_badge = '<div class="badge badge-right badge-bottom bg-red-700-i">'+
                                                        '<i class="ion ion-md-close"></i>'+
                                                    '</div>';
                                } else {
                                    return_badge = '<div class="badge badge-right badge-bottom bg-orange-700-i">'+
                                                        '<i class="ion ion-md-warning"></i>'+
                                                    '</div>';
                                }
                            }
                            return return_badge;
                        },
                        renderSub: function(data){
                            var return_sub = '',
                                nama = data.staf_nama,
                                status_baca = data.surat_stack_isbaca,
                                status = data.surat_stack_status;

                            if (status_baca != 1){
                                return_sub = '<div class="supporttext supporttext-black grey-500-i">Diterima</div>';
                                // return_sub = '<div class="padding-right-8 supporttext supporttext-black grey-500-i">'+nama+'</div>';
                            } else {
                                if (status == 2){
                                    return_sub = '<div class="supporttext supporttext-black green-500-i margin-left-4">Setuju</div>';
                                    // return_sub = '<div class="padding-right-8 supporttext supporttext-black green-500-i">'+nama+'</div>';
                                } else if (status == 4){
                                    return_sub = '<div class="supporttext supporttext-black red-700-i margin-left-4">Revisi</div>';
                                    // return_sub = '<div class="padding-right-8 supporttext supporttext-black red-700-i">'+nama+'</div>';
                                } else {
                                    return_sub = '<div class="supporttext supporttext-black orange-700-i margin-left-4">Proses</div>';
                                    // return_sub = '<div class="padding-right-8 supporttext supporttext-black orange-700-i">'+nama+'</div>';
                                }
                            }
                            return return_sub;
                        }
                    }]);
        } else {
            tpl = new Ext.XTemplate([
                    '<div><span class="blue-700-i">Status Penyetujuan (Penyetujuan Tidak Urut)</span></div>'+
                    '<div class="margin-top-8">'+
                        '<tpl for=".">'+
                            '<div class="cell-visual">'+
                                '<div class="padding-top-12">'+
                                    '<div style="display:flex"><div class="cell-visual cell-visual-left margin-right-8">'+
                                        '<div class="img img-circle img-32 bg-brown-500-i grey-100-i"  data-qtip="{staf_nama}">'+
                                            '<img class="img img-circle img-32" src="server.php/sipas/staf/get_image/foto?id={staf_id}">'+
                                            '{[this.renderBadge(values)]}'+
                                        '</div>'+
                                    '</div></div>'+
                                '</div>'+
                                '<div class="padding-top-4 padding-bottom-4">'+
                                    '<div class="cell-text">'+
                                        '{[this.renderSub(values)]}'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</tpl>'+
                    '</div>',{
                        renderBadge: function(data){
                            var return_badge = '',
                                status_baca = data.surat_stack_isbaca,
                                status = data.surat_stack_status;

                            if (status_baca != 1){
                                return_badge = '<div class="badge badge-right badge-bottom bg-grey-500-i">'+
                                                    '<i class="ion ion-md-warning"></i>'+
                                                '</div>';
                            } else {
                                if (status == 2){
                                    return_badge = '<div class="badge badge-right badge-bottom bg-green-500-i">'+
                                                        '<i class="ion ion-md-checkmark"></i>'+
                                                    '</div>';
                                } else if (status == 4){
                                    return_badge = '<div class="badge badge-right badge-bottom bg-red-700-i">'+
                                                        '<i class="ion ion-md-close"></i>'+
                                                    '</div>';
                                } else {
                                    return_badge = '<div class="badge badge-right badge-bottom bg-orange-700-i">'+
                                                        '<i class="ion ion-md-warning"></i>'+
                                                    '</div>';
                                }
                            }
                            return return_badge;
                        },
                        renderSub: function(data){
                            var return_sub = '',
                                nama = data.staf_nama,
                                status_baca = data.surat_stack_isbaca,
                                status = data.surat_stack_status;

                            if (status_baca != 1){
                                return_sub = '<div class="supporttext supporttext-black grey-500-i">Diterima</div>';
                                // return_sub = '<div class="margin-right-8 supporttext supporttext-black grey-500-i">'+nama+'</div>';
                            } else {
                                if (status == 2){
                                    return_sub = '<div class="supporttext supporttext-black green-500-i margin-left-4">Setuju</div>';
                                    // return_sub = '<div class="margin-right-8 supporttext supporttext-black green-500-i">'+nama+'</div>';
                                } else if (status == 4){
                                    return_sub = '<div class="supporttext supporttext-black red-700-i margin-left-4">Revisi</div>';
                                    // return_sub = '<div class="margin-right-8 supporttext supporttext-black red-700-i">'+nama+'</div>';
                                } else {
                                    return_sub = '<div class="supporttext supporttext-black orange-700-i margin-left-4">Proses</div>';
                                    // return_sub = '<div class="margin-right-8 supporttext supporttext-black orange-700-i">'+nama+'</div>';
                                }
                            }
                            return return_sub;
                        }
                    }]);
        }

        cmp.setValue(tpl.apply(data));
    }
});