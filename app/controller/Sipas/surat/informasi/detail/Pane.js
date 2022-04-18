Ext.define('SIPAS.controller.Sipas.surat.informasi.detail.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models:[
        'Sipas.Surat'
    ],

    views: [
        'Sipas.surat.informasi.detail.Pane'
    ],

    refs : [
        { ref: 'mainview',                    selector: 'sipas_surat_informasi_detail_pane'},
        { ref: 'thumbInfoSurat',              selector: 'sipas_surat_informasi_detail_pane #thumbInfoSurat'},
        { ref: 'infoSurat',                   selector: 'sipas_surat_informasi_detail_pane #infoSurat'},
        { ref: 'titleInfo',                   selector: 'sipas_surat_informasi_detail_pane #titleThumbInfoSurat'}
    ],

    init: function(application){
        this.control({
            'sipas_surat_informasi_detail_pane' :{
                load: this.onMainview_Load
            }
        });
    },

    onMainview_Load: function(mainview, record, disposisi){
        var $this = this,
            mainview = mainview || $this.getMainview(),
            comThumbInfo = $this.getThumbInfoSurat({root:mainview}),
            comInfoSurat = $this.getInfoSurat({root:mainview});

        $this.renderThumbInfoSurat(mainview, record, disposisi, comThumbInfo);
        $this.renderInfoSurat(mainview, record, comInfoSurat);
    },

    renderThumbInfoSurat: function(mainview, record, disposisi, cmp){
        var $this = this,
            comTitle = $this.getTitleInfo({root:mainview}),
            ignoreRe = /PT|CV|DIVISI|BIDANG|SEKSI|DRS|IR|DR|WWW|HTTP|FTP|[^\w\s]/gi,
            tpl = null,
            icon = '',
            pengirim = '',
            perihal = record && record.get('surat_perihal') ? record.get('surat_perihal') : '<span class="alternative">(Tidak ada perihal)</span>',
            nomor = record && record.get('surat_nomor') ? '<span class="blue-700-i">'+record.get('surat_nomor')+'</span>' : '<span class="alternative">(Tidak ada nomor)</span>',
            model = record && record.get('surat_model'),
            sifat_color = record && record.get('sifat_color'),
            prioritas = '',
            badges = '',
            badges2 = new Ext.XTemplate([
                '<div class="supporttext supporttext-dark margin-top-4 margin-bottom-4">'+
                    '<tpl if="values.surat_nomor">'+
                    //'<tpl if="!values.jenis_nomor_awal && ((values.surat_setuju != 2 && values.surat_model != 6) || (values.surat_setuju != 2 && values.surat_model == 6 && values.surat_model_sub == 1) || ((values.surat_setuju != 2 || values.surat_petikan_setuju != 2) && values.surat_model == 6 && values.surat_model_sub == 2))">'+
                        '<tpl if="!values.jenis_nomor_awal && values.surat_setuju != 2">'+
                            '<span class="badge badge-outline badge-primary margin-right-8">No.Surat: -</span>'+
                        '<tpl else>'+    
                            '<span class="badge badge-outline badge-primary margin-right-8">No.Surat: {surat_nomor}</span>'+
                        '</tpl>'+
                    '<tpl else>'+
                        '<span class="badge badge-outline badge-primary margin-right-8">No.Surat: -</span>'+
                    '</tpl>'+
                    '<tpl if="values.surat_registrasi">'+
                        '<span class="badge badge-outline margin-right-8">'+
                            '<span class="alternative">No.Reg: {surat_registrasi}</span>'+
                        '</span>'+
                    '<tpl else>'+
                        '<span class="badge badge-outline margin-right-8">'+
                            '<span class="alternative">No.Reg: -</span>'+
                        '</span>'+
                    '</tpl>'+
                '</div>']).apply(record.getData());

        tpl = new Ext.XTemplate([
        '<span class="blue-700">{surat_model}</span>'+
        '<div class="cell-visual cell-visual-left">'+
            '{icon}'+
        '</div>'+
        '<div class="cell-text">'+
            '<div class="subtext">{pengirim}</div>'+
            '<div class="subtext">{perihal}</div>'+
            '<div class="subtext">{badges2}</div>'+
            '<div class="subtext margin-top-4">{badges}</div>'+
            '<div class="supporttext supporttext-dark margin-top-4">{prioritas}</div>'+
        '</div>']);

        if (sifat_color){
            perihal = '<span class="badge badge-light margin-right-4" style="background-color:'+sifat_color+'">'+record.get('sifat_kode')+'</span>'+perihal;
        }

        // render for badges
        switch (model){
            case 1:
                // masuk
                var model = "Surat Masuk Eksternal",
                    pengirim = record.get('surat_pengirim'),
                    letter_pengirim = (pengirim || "").toUpperCase().replace(ignoreRe, "").trim();

                var badge1 = '<span class="badge badge-light bg-blue-100-i margin-right-8">'+
                                    '<span class="blue-700">Instansi</span>'+
                                '</span>',
                    badge2 = record.get('jenis_nama') ? '<span class="badge badge-light bg-pink-100-i margin-right-8">'+
                                    '<span class="pink-700">'+record.get('jenis_nama')+'</span>'+
                                '</span>' : '',
                    badge3 = $this.renderPrioritasSurat(record, true);

                icon    = '<div class="img img-icon img-icon-20 img-circle img-icon-maildownload bg-blue-500-i"></div>';
                badges  = badge1 + '<span class="margin-left-2 margin-right-2">'+badge2+'</span>' + badge3;
            break;
            case 2:
                // keluar
                var model = "Surat Keluar Eksternal",
                    pengirim = record.get('unit_nama'),
                    letter_tujuan = (pengirim || "").toUpperCase().replace(ignoreRe, "").trim(),
                    unit_kode = record.get('unit_kode');

                var badge1 = '<span class="badge badge-light bg-brown-100-i margin-right-8">'+
                                    '<span class="brown-700">'+unit_kode+'</span>'+
                                '</span>',
                    badge2 = record.get('jenis_nama') ? '<span class="badge badge-light bg-pink-100-i margin-right-8">'+
                                    '<span class="pink-700">'+record.get('jenis_nama')+'</span>'+
                                '</span>' : '',
                    badge3 = $this.renderPrioritasSurat(record, true);
                
                icon    = '<div class="img img-icon img-icon-20 img-circle img-icon-mailupload bg-amber-500-i"></div>';
                badges  = badge1 + '<span class="margin-left-2 margin-right-2">'+badge2+'</span>' + badge3;
            break;
            case 3:
                // imasuk
                var model = "Surat Masuk Internal",
                    pengirim = record.get('unit_source_nama'),
                    letter_unit = (pengirim || "").toUpperCase().replace(ignoreRe, "").trim(),
                    unit_kode = record.get('unit_source_kode');

                if(record.get('surat_model_sub') == 2) {
                    model += ' (Kolektif)';
                } else {
                    model += ' (Perorangan)';
                }

                var badge1 = '<span class="badge badge-light bg-brown-100-i margin-right-8">'+
                                    '<span class="brown-700">'+unit_kode+'</span>'+
                                '</span>',
                    badge2 = record.get('jenis_nama') ? '<span class="badge badge-light bg-pink-100-i margin-right-8">'+
                                    '<span class="pink-700">'+record.get('jenis_nama')+'</span>'+
                                '</span>' : '',
                    badge3 = $this.renderPrioritasSurat(record, true);
                
                icon    = '<div class="img img-icon img-icon-20 img-circle img-icon-mailforward bg-deep-purple-500-i"></div>';
                badges  = badge1 + '<span class="margin-left-2 margin-right-2">'+badge2+'</span>' + badge3;
            break;
            case 4:
                // ikeluar
                var model = "Surat Keluar Internal",
                    pengirim = record.get('unit_nama'),
                    letter_unit_ikeluar = (pengirim || "").toUpperCase().replace(ignoreRe, "").trim(),
                    unit_kode = record.get('unit_kode');

                var badge1 = '<span class="badge badge-light bg-brown-100-i margin-right-8">'+
                                    '<span class="brown-700">'+unit_kode+'</span>'+
                                '</span>',
                    badge2 = record.get('jenis_nama') ? '<span class="badge badge-light bg-pink-100-i margin-right-8">'+
                                    '<span class="pink-700">'+record.get('jenis_nama')+'</span>'+
                                '</span>' : '',
                    badge3 = $this.renderPrioritasSurat(record, true);
                
                icon    = '<div class="img img-icon img-icon-20 img-circle img-icon-mailforward bg-deep-orange-500-i"></div>';
                badges  = badge1 + '<span class="margin-left-2 margin-right-2">'+badge2+'</span>' + badge3;
            break;
            case 6:
                // keputusan
                var model = "Surat Keputusan Internal",
                    pengirim = record.get('unit_nama'),
                    letter_unit_keputusan = (pengirim || "").toUpperCase().replace(ignoreRe, "").trim(),
                    unit_kode = record.get('unit_kode');

                if(record.get('surat_model_sub') == 2) {
                    model += ' (Kolektif)';
                } else {
                    model += ' (Perorangan)';
                }

                var badge1 = '<span class="badge badge-light bg-brown-100-i margin-right-8">'+
                                    '<span class="brown-700">'+unit_kode+'</span>'+
                                '</span>',
                    badge2 = record.get('jenis_nama') ? '<span class="badge badge-light bg-pink-100-i margin-right-8">'+
                                    '<span class="pink-700">'+record.get('jenis_nama')+'</span>'+
                                '</span>' : '',
                    badge3 = $this.renderPrioritasSurat(record, true);
                
                icon    = '<div class="img img-icon img-icon-20 img-circle img-icon-mailforward bg-deep-orange-500-i"></div>';
                badges  = badge1 + '<span class="margin-left-2 margin-right-2">'+badge2+'</span>' + badge3;
            break;
        }

        var surat_model         = record && record.get('surat_model'),
            disposisi_model     = disposisi && disposisi.get('disposisi_model'),
            disposisi_model_sub = disposisi && disposisi.get('disposisi_model_sub'),
            disposisi_induk     = disposisi && disposisi.get('disposisi_induk');

        if (disposisi_model == 1){
            // draf
            if (disposisi_model_sub == 0 || disposisi_model_sub == 1){
                prioritas = $this.renderPrioritasDisposisi(disposisi);
            } else {
                prioritas = $this.renderPrioritasSurat(record, false);
            }
        } else {
            if (disposisi_model_sub == 1){
                // nota dinas
                prioritas = $this.renderPrioritasDisposisi(disposisi);
            } else {
                if (disposisi_induk){
                    // disposisi
                    prioritas = $this.renderPrioritasDisposisi(disposisi);
                } else {
                    // surat
                    switch (surat_model){
                        case 1:
                            // masuk
                        break;
                        case 2:
                            // keluar
                        break;
                        case 3:
                            // imasuk
                        break;
                        case 4:
                            // ikeluar
                        break;
                    }
                    prioritas = $this.renderPrioritasSurat(record, false);
                }
            }
        }

        cmp.setValue(tpl.apply({
            icon: icon,
            pengirim: pengirim,
            perihal: perihal,
            badges2: badges2,
            badges: badges,
            prioritas: prioritas
        }));

        comTitle.setValue(tpl.apply({
            surat_model: model
        }));
    },

    renderInfoSurat: function(mainview, record, cmp){
        var $this = this,
            tpl = '',
            no_reg      = record.get('surat_registrasi') === null || record.get('surat_registrasi') === "" ? '' : $this.renderTableRow('No.Registrasi', record.get('surat_registrasi')),
            no_agd      = record.get('surat_agenda') === null || record.get('surat_agenda') === "" ? '' : $this.renderTableRow('No.Agenda', record.get('surat_agenda')),
            kepada      = record.get('surat_tujuan') === null || record.get('surat_tujuan') === "" ? '' : $this.renderTableRow('Kepada', record.get('surat_tujuan')),
            alamat      = record.get('surat_alamat') === null || record.get('surat_alamat') === "" ? '' : $this.renderTableRow('Alamat', record.get('surat_alamat')),
            pengirim    = record.get('surat_pengirim') === null || record.get('surat_pengirim') === "" ? '' : $this.renderTableRow('Pengirim', record.get('surat_pengirim')),
            tgl_surat   = record.get('surat_tanggal') === null || record.get('surat_tanggal') === "" ? '' : $this.renderTableRow('Tgl.Surat', Ext.Date.format(record.get('surat_tanggal'), 'd M Y')),
            tgl_berlaku = record.get('surat_berlaku_tgl') === null || record.get('surat_berlaku_tgl') === "" ? '' : $this.renderTableRow('Tgl.Berlaku', Ext.Date.format(record.get('surat_berlaku_tgl'), 'd M Y')),
            lampiran    = record.get('surat_lampiran') === null || record.get('surat_lampiran') === "" ? '' : $this.renderTableRow('Lampiran', record.get('surat_lampiran')),
            prioritas   = record.get('prioritas_nama') === null || record.get('prioritas_nama') === "" ? '' : $this.renderTableRow('Prioritas', record.get('prioritas_nama')),
            // jenis       = record.get('jenis_nama') === null || record.get('jenis_nama') === "" ? '' : $this.renderTableRow('Jenis', record.get('jenis_nama')),
            kelas       = record.get('kelas_nama') === null || record.get('kelas_nama') === "" ? '' : $this.renderTableRow('Klasifikasi', "("+record.get('kelas_kode')+") "+record.get('kelas_nama')),
            sifat       = record.get('sifat_nama') === null || record.get('sifat_nama') === "" ? '' : $this.renderTableRow('Sifat', record.get('sifat_nama')),
            media       = record.get('media_nama') === null || record.get('media_nama') === "" ? '' : $this.renderTableRow('Dikirim Via', record.get('media_nama')),
            lokasi      = record.get('lokasi_nama') === null || record.get('lokasi_nama') === "" ? '' : $this.renderTableRow('Lokasi Arsip', record.get('lokasi_nama')),
            masa_aktif  = record.get('surat_retensi_tgl') === null || record.get('surat_retensi_tgl') === "" ? '' : $this.renderTableRow('Masa Aktif', Ext.Date.format(record.get('surat_retensi_tgl'), 'd M Y')),
            tembusan    = record.get('surat_kepada') === null || record.get('surat_kepada') === "" ? '' : $this.renderTableRow('Tembusan', record.get('surat_kepada')),
            uraian      = record.get('surat_keterangan') === null || record.get('surat_keterangan') === "" ? '' : $this.renderTableRow('Uraian', record.get('surat_keterangan'));

        tableTpl = new Ext.XTemplate(['<table cellpadding="0" cellspacing="0" style="width:100%; padding-left:42px;"><tbody>{data}</tbody></table>']);
        
        cmp.setValue(tableTpl.apply({
            data: no_reg + no_agd + kepada + alamat + pengirim + tgl_surat + tgl_berlaku + lampiran +
                  /*jenis +*/ kelas + sifat + media + lokasi + masa_aktif + tembusan + uraian
        }));
    },

    renderTableRow: function(title, data){
        return new Ext.XTemplate([
            '<tr><td style="vertical-align:top;" width="80"><span class="supporttext">{title}</span></td>'+
            '<td style="vertical-align:top;" align="center"><span class="supporttext">:</span></td>'+
            '<td style="font-size:12px;">{data}</td></tr>']).apply({
                title: title,
                data: data
            });
    },

    renderPrioritasSurat: function(record, is_badge){
        var prioritas_nama = record.get('prioritas_nama'),
            useprioritas = record.get('surat_prioritas') ? true : false,
            prioritas_tgl = record.get('surat_prioritas_tgl'),
            is_selesai = record.get('surat_isselesai'),
            tpl_badge = '',
            tpl = '';

        if(useprioritas){
            var tanggal = new Date(),
                tanggal_selesai_display = Ext.util.Format.date(record.get('surat_selesai_tgl'), 'd M Y H:i'),
                tanggal_display = Ext.util.Format.date(prioritas_tgl, 'd M Y');

            // prioritas_tgl.setHours(0,0,0,0);
            tanggal.setHours(0,0,0,0);
            var isprioritas = (prioritas_tgl < tanggal)? 1 : 0,
                selisih = (prioritas_tgl-tanggal)/1000,
                hasil = Math.floor(selisih/(86400));

            if(!isprioritas){
                if (is_selesai == 1){
                    tpl_badge = '<span class="badge badge-light bg-green-100-i margin-right-8">'+
                            '<span class="green-700">'+prioritas_nama+'</span></span>';
                } else {
                    tpl = '<span class="badge badge-solid margin-right-4">'+
                            '<i class="icon ion-md-alert grey-700-i"></i>'+
                          '</span><span class="grey-700-i">'+hasil+' hari lagi</span>'+
                          '<span class="alternative"> ('+tanggal_display+')</span>';

                    tpl_badge = '<span class="badge badge-light bg-grey-300-i margin-right-8">'+
                            '<span class="grey-700">'+prioritas_nama+'</span></span>';

                    if (hasil <= 7){
                        tpl_badge = '<span class="badge badge-light bg-yellow-100-i margin-right-8">'+
                            '<span class="yellow-800">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert yellow-700-i"></i>'+
                              '</span><span class="yellow-700-i">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if (hasil <= 3){
                        tpl_badge = '<span class="badge badge-light bg-orange-100-i margin-right-8">'+
                            '<span class="orange-700">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert orange-700-i"></i>'+
                              '</span><span class="orange-700-i">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if (hasil == 1){
                        tpl_badge = '<span class="badge badge-light bg-red-100-i margin-right-8">'+
                            '<span class="danger">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if(hasil == 0){
                        tpl_badge = '<span class="badge badge-light bg-red-100-i margin-right-8">'+
                            '<span class="danger">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Sampai hari ini</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }
                }
            }else{
                var selisih = (tanggal-prioritas_tgl)/1000;

                if(is_selesai == 1){
                    tpl_badge = '<span class="badge badge-light bg-green-100-i margin-right-8">'+
                            '<span class="green-700">'+prioritas_nama+'</span></span>';
                }else{
                    if(selisih == 0){
                        tpl_badge = '<span class="badge badge-light bg-red-100-i margin-right-8">'+
                            '<span class="danger">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Sampai hari ini</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }else{
                        tpl_badge = '<span class="badge badge-light bg-grey-300-i margin-right-8">'+
                            '<span class="alternative">'+prioritas_nama+'</span></span>';

                        tpl = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Terlewat '+Math.abs(hasil)+' hari</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }
                }
            }
        }

        if (is_badge){
            return tpl_badge;
        } else {
            return tpl;
        }
    },

    renderPrioritasDisposisi: function(record){
        var useprioritas = record.get('disposisi_useprioritas') == 1 ? true : false,
            prioritas_tgl = record.get('disposisi_prioritas_tgl'),
            is_selesai = record.get('disposisi_masuk_aksi'),
            _return = '';

        if(useprioritas){
            var tanggal = new Date(),
                tanggal_selesai_display = Ext.util.Format.date(record.get('disposisi_masuk_aksi_tgl'), 'd M Y H:i'),
                tanggal_display = Ext.util.Format.date(prioritas_tgl, 'd M Y');

            // prioritas_tgl.setHours(0,0,0,0);
            tanggal.setHours(0,0,0,0);
            var isprioritas = (prioritas_tgl < tanggal) ? true : false,
                selisih = (prioritas_tgl-tanggal)/1000,
                hasil = Math.floor(selisih/(86400));

            if(!isprioritas){
                if (is_selesai){
                    return '';
                } else {
                    _return = '<span class="badge badge-solid margin-right-4">'+
                            '<i class="icon ion-md-alert grey-700-i"></i>'+
                          '</span><span class="grey-700-i">'+hasil+' hari lagi</span>'+
                          '<span class="alternative"> ('+tanggal_display+')</span>';

                    if (hasil <= 7){
                        _return = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert yellow-700-i"></i>'+
                              '</span><span class="yellow-700-i">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if (hasil <= 3){
                        _return = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert orange-700-i"></i>'+
                              '</span><span class="orange-700-i">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if (hasil == 1){
                        _return = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">'+hasil+' hari lagi</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }

                    if(hasil == 0){
                        _return = '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Sampai hari ini</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }
                    return _return;
                }
            }else{
                var selisih = (tanggal-prioritas_tgl)/1000;

                if(is_selesai){
                    return '';
                }else{
                    if(selisih == 0){
                        return '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Sampai hari ini</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }else{
                        return '<span class="badge badge-solid margin-right-4">'+
                                '<i class="icon ion-md-alert danger"></i>'+
                              '</span><span class="danger">Terlewat '+Math.abs(hasil)+' hari</span>'+
                              '<span class="alternative"> ('+tanggal_display+')</span>';
                    }
                }
            }
        }
    }
});