Ext.define('SIPAS.controller.Sipas.pelaporan.Page', function(){ 

    var menuList = [
        //Arsip Bebas
        { 
            grup: 'Sharing Folder', 
            title: 'Rekap Sharing Folder',
            subtitle: 'Rekapitulasi arsip pada menu Sharing Folder yang diinput oleh instansi pengguna aplikasi',
            bootstrap: 'Sipas.pelaporan.bebas.rekap.Pane',
            roleable: true, roleName: 'pelaporan_arsip_bebas',
            languageable: true, languageCode: 'pelaporan_rekap_arsip_bebas',       
            featureable: true, featureName: 'pelaporan_arsip_bebas'
        },
        {   
            grup: 'Sharing Folder', 
            title: 'Daftar Sharing Folder <span class="alternative">(per unit)</span>',
            subtitle: 'Semua arsip yang sudah dibagikan kepada unit lain oleh instansi pengguna aplikasi pada menu Sharing Folder',
            bootstrap: 'Sipas.pelaporan.bebas.Pane',
            roleable: true, roleName: 'pelaporan_arsip_bebas',
            languageable: true, languageCode: 'pelaporan_arsip_bebas',
            featureable: true, featureName: 'pelaporan_arsip_bebas'
        },

        // Surat
        {
            grup: 'Surat',
            title: 'Rekap Jumlah Surat',
            subtitle: 'Rekapitulasi jumlah surat masuk dan keluar yang tercatat pada aplikasi',
            bootstrap: 'Sipas.pelaporan.rekap.unit.jumlah.Pane',
            roleable: true, roleName: 'pelaporan_surat',
            languageable: true, languageCode: 'pelaporan_rekap_jumlah',
            featureable: true, featureName: 'pelaporan_surat'
        },
        {   
            grup: 'Surat', 
            title: 'Daftar Tindak Lanjut Surat <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat yang sudah dan belum mempunyai tindak lanjut',
            bootstrap: 'Sipas.pelaporan.report.surat.Tindaklanjut',
            roleable: true, roleName: 'pelaporan_naskah',
            languageable: true, languageCode: 'pelaporan_naskah_ditindaklanjuti',   
            featureable: true, featureName: 'pelaporan_naskah'
        },
        {   
            grup: 'Surat', 
            title: 'Daftar Top Urgent Surat <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat berdasarkan prioritas surat',
            bootstrap: 'Sipas.pelaporan.report.surat.Topurgent',
            roleable: true, roleName: 'pelaporan_naskah',
            languageable: true, languageCode: 'pelaporan_naskah_urgent',
            featureable: true, featureName: 'pelaporan_naskah'
        },
        {   
            grup: 'Surat', 
            title: 'Rekap Masa Retensi Arsip Tahunan',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.report.rekap.Retensi',
            roleable: true, roleName: 'pelaporan_surat',
            languageable: true, languageCode: 'pelaporan_retensi',       
            featureable: true, featureName: 'pelaporan_surat_retensi'
        },

        // Korespondensi
        // {
        //     grup: 'Korespondensi',
        //     title: 'Laporan Korespondensi Eksternal <span class="alternative">(per unit)</span>',
        //     subtitle: 'Keterkaitan atau korespondensi antara surat yang dikeluarkan dan yang diterima oleh instansi pengguna aplikasi.',
        //     bootstrap: 'Sipas.pelaporan.eksternal.korespondensi.Pane',
        //     roleable: true, roleName: 'pelaporan_korespondensi',
        //     languageable: true, languageCode: 'pelaporan_rekap_korespondensi_eksternal',  
        //     featureable: true, featureName: 'pelaporan_korespondensi'
        // },
        // {
        //     grup: 'Korespondensi',
        //     title: 'Laporan Korespondensi Internal <span class="alternative">(per unit)</span>',
        //     subtitle: 'Keterkaitan atau korespondensi antara surat yang dikeluarkan dan yang diterima oleh divisi di dalam instansi pengguna aplikasi',
        //     bootstrap: 'Sipas.pelaporan.internal.korespondensi.Pane',
        //     roleable: true, roleName: 'pelaporan_korespondensi',
        //     languageable: true, languageCode: 'pelaporan_rekap_korespondensi_internal', 
        //     featureable: true, featureName: 'pelaporan_korespondensi'
        // },

        // Surat Keluar
        {   
            grup: 'Surat Keluar', 
            title: 'Rekap Surat Keluar Tahunan',
            subtitle: 'Rekap jumlah surat keluar eksternal dan internal berdasarkan tahun, ditampilkan sesuai bulan',
            bootstrap: 'Sipas.pelaporan.report.rekap.surat.Keluar',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_rekap_keluar',       
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Rekap Surat Keluar Eksternal <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat keluar eksternal yang dikeluarkan oleh instansi pengguna aplikasi.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.rekap.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_rekap_keluar_eksternal',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Eksternal Aktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit dalam instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.aktif.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks_semua',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_semua_eksternal',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Eksternal Aktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.aktif.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_eksternal',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Eksternal Aktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.aktif.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks_kewenangan',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_kewenangan_eksternal',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Eksternal Backdated <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.backdate.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_keluar_backdated',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks_backdate'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Eksternal Belum Disetujui <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, ditampilkan sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.unprocessed.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_keluar_blmsetuju',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks_blmsetuju'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Eksternal Inaktif <span class="alternative">(semua)</span>',
            subtitle: 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.retensi.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks_semua',
            languageable: true, languageCode: 'pelaporan_rekap_surat_keluar_retensi_semua',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Eksternal Inaktif <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.retensi.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks',
            languageable: true, languageCode: 'pelaporan_rekap_surat_keluar_retensi',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Eksternal Inaktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.eksternal.keluar.retensi.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_eks_kewenangan',
            languageable: true, languageCode: 'pelaporan_rekap_surat_keluar_retensi_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_keluar_eks'
        },
        {
            grup: 'Surat Keluar',
            title: 'Rekap Surat Keluar Internal <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat keluar internal yang dikeluarkan oleh instansi pengguna aplikasi.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.rekap.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int',
            languageable: true, languageCode: 'pelaporan_rekap_keluar_internal',       
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Aktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit dalam instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.aktif.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_semua',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_semua_internal',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Aktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.aktif.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_internal',  
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Aktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.aktif.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_keluar_aktif_kewenangan_internal',  
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Belum Disetujui <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh semua unit di instansi pengguna aplikasi, ditampilan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.blmsetuju.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_semua',
            languageable: true, languageCode: 'pelaporan_keluar_internal_blmsetuju_semua',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Belum Disetujui <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.blmsetuju.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int',
            languageable: true, languageCode: 'pelaporan_keluar_internal_blmsetuju',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar',
            title: 'Daftar Surat Keluar Internal Belum Disetujui <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.blmsetuju.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_keluar_internal_blmsetuju_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Internal Inaktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat keluar internal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.retensi.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_semua',
            languageable: true, languageCode: 'pelaporan_rekap_surat_ikeluar_retensi_semua',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Internal Inaktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat keluar internal inaktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.retensi.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int',
            languageable: true, languageCode: 'pelaporan_rekap_surat_ikeluar_retensi',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },
        {
            grup: 'Surat Keluar', 
            title: 'Daftar Surat Keluar Internal Inaktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat keluar internal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keluar.retensi.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keluar_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_rekap_surat_ikeluar_retensi_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_keluar_int'
        },

        //Surat Keputusan
        {
            grup: 'Surat Keputusan',
            title: 'Rekap Surat Keputusan <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat keputusan yang dikeluarkan oleh instansi pengguna aplikasi.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.rekap.Pane',
            roleable: true, roleName: 'pelaporan_surat',
            languageable: true, languageCode: 'pelaporan_rekap_keputusan',       
            featureable: true, featureName: 'pelaporan_surat'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Aktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat keputusan aktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit dalam instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.aktif.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_aktif_semua',
            languageable: true, languageCode: 'pelaporan_keputusan_aktif_semua',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Aktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat keputusan aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.aktif.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_aktif',
            languageable: true, languageCode: 'pelaporan_keputusan_aktif',  
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Aktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat keputusan aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.aktif.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_aktif_kewenangan',
            languageable: true, languageCode: 'pelaporan_keputusan_aktif_kewenangan',  
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Belum Disetujui <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat keputusan dengan status dalam persetujuan atau revisi yang dikeluarkan oleh semua unit di instansi pengguna aplikasi, ditampilan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.blmsetuju.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_blmsetuju_semua',
            languageable: true, languageCode: 'pelaporan_keputusan_blmsetuju_semua',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Belum Disetujui <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat keputusan dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.blmsetuju.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_blmsetuju',
            languageable: true, languageCode: 'pelaporan_keputusan_blmsetuju',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan',
            title: 'Daftar Surat Keputusan Belum Disetujui <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat keputusan dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.blmsetuju.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_blmsetuju_kewenangan',
            languageable: true, languageCode: 'pelaporan_keputusan_blmsetuju_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan', 
            title: 'Daftar Surat Keputusan Inaktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat keputusan inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.retensi.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_retensi_semua',
            languageable: true, languageCode: 'pelaporan_keputusan_retensi_semua',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan', 
            title: 'Daftar Surat Keputusan Inaktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat keputusan inaktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.retensi.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_retensi',
            languageable: true, languageCode: 'pelaporan_keputusan_retensi',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },
        {
            grup: 'Surat Keputusan', 
            title: 'Daftar Surat Keputusan Inaktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat keputusan inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.keputusan.retensi.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_keputusan_retensi_kewenangan',
            languageable: true, languageCode: 'pelaporan_keputusan_retensi_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_keputusan_int'
        },

        // Surat Masuk
        {   
            grup: 'Surat Masuk', 
            title: 'Rekap Surat Masuk Tahunan',
            subtitle: 'Rekap jumlah surat masuk eksternal dan internal berdasarkan tahun, ditampilkan sesuai bulan',
            bootstrap: 'Sipas.pelaporan.report.rekap.surat.Masuk',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks',
            languageable: true, languageCode: 'pelaporan_rekap_masuk',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Rekap Surat Masuk Eksternal <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat masuk eksternal yang diterima oleh instansi pengguna aplikasi.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.rekap.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks',
            languageable: true, languageCode: 'pelaporan_rekap_masuk_eksternal',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Aktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat eksternal aktif yang diterima oleh semua unit dalam instansi pengguna aplikasi (dengan status draf, belum didistribusikan dan didistribusikan), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.aktif.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_semua',
            languageable: true, languageCode: 'pelaporan_masuk_aktif_semua_eksternal',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Aktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat eksternal aktif yang diterima oleh instansi pengguna aplikasi (dengan status draf, belum didistribusikan dan didistribusikan), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.aktif.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks',
            languageable: true, languageCode: 'pelaporan_masuk_aktif_eksternal',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Aktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat eksternal aktif yang diterima oleh instansi pengguna aplikasi (dengan status draf, belum didistribusikan dan didistribusikan), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.aktif.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_kewenangan', 
            languageable: true, languageCode: 'pelaporan_masuk_aktif_kewenangan_eksternal',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Belum Didistribusikan <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat eksternal yang diterima oleh semua unit dalam instansi pengguna aplikasi dan belum didistribusikan ke penerima, ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.blmdistribusi.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_semua',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_blmdistribusi_semua',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Belum Didistribusikan <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat eksternal yang diterima oleh instansi pengguna aplikasi dan belum didistribusikan ke penerima, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.blmdistribusi.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_blmdistribusi',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Belum Didistribusikan <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat eksternal yang diterima oleh instansi pengguna aplikasi dan belum didistribusikan ke penerima, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.blmdistribusi.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_kewenangan',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_blmdistribusi_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Inaktif <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat masuk eksternal inaktif yang diterima oleh semua unit di instansi pengguna aplikasi, ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.retensi.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_semua',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_retensi_semua',       
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Inaktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat masuk eksternal inaktif yang diterima oleh instansi pengguna aplikasi, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.retensi.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_retensi',       
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Eksternal Inaktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat masuk eksternal inaktif yang diterima oleh instansi pengguna aplikasi, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.eksternal.masuk.retensi.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_eks_kewenangan',
            languageable: true, languageCode: 'pelaporan_masuk_eksternal_retensi_kewenangan',       
            featureable: true, featureName: 'pelaporan_surat_masuk_eks'
        },
        {
            grup: 'Surat Masuk',
            title: 'Rekap Surat Masuk Internal <span class="alternative">(per unit)</span>',
            subtitle: 'Rekap jumlah surat masuk internal yang diterima oleh instansi pengguna aplikasi.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.rekap.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int',
            languageable: true, languageCode: 'pelaporan_rekap_masuk_internal',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Aktif <span class=alternative>(semua)</span>',
            subtitle: 'Semua surat internal aktif yang diterima oleh semua unit dalam instansi pengguna aplikasi (dengan status draf, pending, belum didistribusikan dan didistribusikan), ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.aktif.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_semua',
            languageable: true, languageCode: 'pelaporan_masuk_semua_internal',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Aktif <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat internal aktif yang diterima oleh instansi pengguna aplikasi (dengan status draf, pending, belum didistribusikan dan didistribusikan), dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.aktif.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int',
            languageable: true, languageCode: 'pelaporan_masuk_internal',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Aktif <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat internal aktif yang diterima oleh instansi pengguna aplikasi (dengan status draf, pending, belum didistribusikan dan didistribusikan), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.aktif.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_masuk_kewenangan_internal',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Tertunda <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat internal yang diterima oleh semua unit dalam instansi pengguna aplikasi dan belum diterima oleh unit atau masih dalam status pending, ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tunda.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_semua',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tunda_semua',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Tertunda <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat internal yang diterima oleh instansi pengguna aplikasi dan belum diterima oleh unit atau masih dalam status pending, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tunda.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tunda',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Tertunda <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat internal yang diterima oleh instansi pengguna aplikasi dan belum diterima oleh unit atau masih dalam status pending, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tunda.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tunda_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Ditolak <span class="alternative">(semua)</span>',
            subtitle: 'Semua surat masuk internal yang dikirim dari unit lain dan ditolak oleh unit penerima di semua unit di instansi pengguna aplikasi, ditampilkan berdasarkan unit yang memiliki surat.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tolak.semua.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_semua',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tolak_semua',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Ditolak <span class="alternative">(per unit)</span>',
            subtitle: 'Semua surat masuk internal yang dikirim dari unit lain dan ditolak oleh unit penerima di instansi pengguna aplikasi, dibagi sesuai unit yang dipilih.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tolak.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tolak',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },
        {
            grup: 'Surat Masuk',
            title: 'Daftar Surat Masuk Internal Ditolak <span class="alternative">(kewenangan)</span>',
            subtitle: 'Semua surat masuk internal yang dikirim dari unit lain dan ditolak oleh unit penerima di semua unit di instansi pengguna aplikasi, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.',
            bootstrap: 'Sipas.pelaporan.internal.masuk.tolak.kewenangan.Pane',
            roleable: true, roleName: 'pelaporan_surat_masuk_int_kewenangan',
            languageable: true, languageCode: 'pelaporan_masuk_internal_tolak_kewenangan',
            featureable: true, featureName: 'pelaporan_surat_masuk_int'
        },

        // Rating Review
        {
            grup: 'Rating Review',
            title: 'Daftar Rating Review Surat Dari Pemberi Rating <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.internal.rating.penerima.Pane',
            roleable: true, roleName: 'pelaporan_rating',
            languageable: true, languageCode: 'pelaporan_rating_penerima',       
            featureable: true, featureName: 'pelaporan_rating'
        },
        {
            grup: 'Rating Review',
            title: 'Daftar Rating Review Surat Dari Penerima Rating <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.internal.rating.pengirim.Pane',
            roleable: true, roleName: 'pelaporan_rating',
            languageable: true, languageCode: 'pelaporan_rating_pengirim',
            featureable: true, featureName: 'pelaporan_rating'
        },

        //Umum
        { 
            grup: 'Umum', 
            title: 'Rekap Pegawai',
            subtitle: 'Rekap jumlah staf aktif dan nonaktif berdasarkan unit',
            bootstrap: 'Sipas.pelaporan.rekap.staf.Pane',
            roleable: true, roleName: 'pelaporan_pegawai',
            languageable: true, languageCode: 'pelaporan_rekap_jumlah_pegawai',
            featureable: true, featureName: 'pelaporan_pegawai'
        },
        {   
            grup: 'Umum', 
            title: 'Rekap Pegawai Per Hak Akses',
            subtitle: 'Rekap jumlah staf aktif dan nonaktif berdasarkan hakakses di tiap unit',
            bootstrap: 'Sipas.pelaporan.rekap.staf.akses.Pane',
            roleable: true, roleName: 'pelaporan_pegawai',
            languageable: true, languageCode: 'pelaporan_rekap_jumlah_pegawai_akses',
            featureable: true, featureName: 'pelaporan_pegawai'
        },
        {
            grup: 'Umum', 
            title: 'Laporan Jenis Surat',
            subtitle: 'Rekap jumlah surat berdasarkan jenis surat',
            bootstrap: 'Sipas.pelaporan.umum.jenis.Pane',
            roleable: true, roleName: 'pelaporan_jenis_surat',
            languageable: true, languageCode: 'pelaporan_rekap_jumlah_jenis_surat',
            featureable: true, featureName: 'pelaporan_jenis_surat'
        },

        //SLA
        {   
            grup: 'SLA', 
            title: 'Dafar Nilai SLA Unit',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.sla.unit.Pane',
            roleable: true, roleName: 'pelaporan_sla',
            languageable: true, languageCode: 'pelaporan_sla_perunit',       
            featureable: true, featureName: 'pelaporan_sla'
        },
        {   
            grup: 'SLA', 
            title: 'Daftar Permintaan SLA <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.sla.request.Pane',
            roleable: true, roleName: 'pelaporan_sla',
            languageable: true, languageCode: 'pelaporan_sla_request_penilaian',
            featureable: true, featureName: 'pelaporan_sla'
        },
        {   
            grup: 'SLA', 
            title: 'Daftar Permintaan SLA Selesai <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.sla.selesai.Pane',
            roleable: true, roleName: 'pelaporan_sla',
            languageable: true, languageCode: 'pelaporan_sla_penilaian_fix',
            featureable: true, featureName: 'pelaporan_sla'
        },
        {   
            grup: 'SLA', 
            title: 'Daftar Permintaan SLA Dalam Proses <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.sla.proses.Pane',
            roleable: true, roleName: 'pelaporan_sla',
            languageable: true, languageCode: 'pelaporan_sla_penilaian_proses',
            featureable: true, featureName: 'pelaporan_sla'
        },
        {   
            grup: 'SLA', 
            title: 'Daftar Permintaan SLA Ditolak <span class="alternative">(per unit)</span>',
            subtitle: '',
            bootstrap: 'Sipas.pelaporan.sla.tolak.Pane',
            roleable: true, roleName: 'pelaporan_sla',
            languageable: true, languageCode: 'pelaporan_sla_penilaian_tolak',
            featureable: true, featureName: 'pelaporan_sla'
        }
    ];

return {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.pelaporan.laporan.surat.Pane',
        'Sipas.pelaporan.rekap.unit.jumlah.Pane',
        'Sipas.pelaporan.eksternal.rekap.Pane',
        'Sipas.pelaporan.eksternal.masuk.Pane',
        'Sipas.pelaporan.eksternal.masuk.blmdistribusi.Pane',
        'Sipas.pelaporan.eksternal.masuk.aktif.semua.Pane',
        'Sipas.pelaporan.eksternal.masuk.aktif.Pane',
        'Sipas.pelaporan.eksternal.masuk.aktif.kewenangan.Pane',
        'Sipas.pelaporan.eksternal.masuk.blmdistribusi.Pane',
        'Sipas.pelaporan.eksternal.masuk.blmdistribusi.semua.Pane',
        'Sipas.pelaporan.eksternal.masuk.blmdistribusi.kewenangan.Pane',
        'Sipas.pelaporan.eksternal.masuk.rekap.Pane',
        'Sipas.pelaporan.eksternal.masuk.retensi.Pane',
        'Sipas.pelaporan.eksternal.masuk.retensi.semua.Pane',
        'Sipas.pelaporan.eksternal.masuk.retensi.kewenangan.Pane',
        'Sipas.pelaporan.eksternal.keluar.aktif.semua.Pane',
        'Sipas.pelaporan.eksternal.keluar.aktif.Pane',
        'Sipas.pelaporan.eksternal.keluar.aktif.kewenangan.Pane',
        'Sipas.pelaporan.eksternal.keluar.unprocessed.Pane',
        'Sipas.pelaporan.eksternal.keluar.backdate.Pane',
        'Sipas.pelaporan.eksternal.keluar.retensi.semua.Pane',
        'Sipas.pelaporan.eksternal.keluar.retensi.Pane',
        'Sipas.pelaporan.eksternal.keluar.retensi.kewenangan.Pane',
        'Sipas.pelaporan.eksternal.keluar.rekap.Pane',
        'Sipas.pelaporan.eksternal.korespondensi.Pane',
        'Sipas.pelaporan.laporan.ekspedisi.Pane',
        'Sipas.pelaporan.laporan.surat.edaran.Pane',
        'Sipas.pelaporan.laporan.surat.edaran.unprocessed.Pane',
        'Sipas.pelaporan.internal.rekap.Pane',
        'Sipas.pelaporan.internal.masuk.aktif.semua.Pane',
        'Sipas.pelaporan.internal.masuk.aktif.Pane',
        'Sipas.pelaporan.internal.masuk.aktif.kewenangan.Pane',
        'Sipas.pelaporan.internal.masuk.tolak.Pane',
        'Sipas.pelaporan.internal.masuk.tolak.semua.Pane',
        'Sipas.pelaporan.internal.masuk.tolak.kewenangan.Pane',
        'Sipas.pelaporan.internal.masuk.tunda.Pane',
        'Sipas.pelaporan.internal.masuk.tunda.semua.Pane',
        'Sipas.pelaporan.internal.masuk.tunda.kewenangan.Pane',
        'Sipas.pelaporan.internal.masuk.rekap.Pane',
        
        'Sipas.pelaporan.internal.keluar.aktif.semua.Pane',
        'Sipas.pelaporan.internal.keluar.aktif.Pane',
        'Sipas.pelaporan.internal.keluar.aktif.kewenangan.Pane',

        'Sipas.pelaporan.internal.keluar.blmsetuju.Pane',
        'Sipas.pelaporan.internal.keluar.blmsetuju.semua.Pane',
        'Sipas.pelaporan.internal.keluar.blmsetuju.kewenangan.Pane',

        'Sipas.pelaporan.internal.keluar.retensi.Pane',
        'Sipas.pelaporan.internal.keluar.retensi.semua.Pane',
        'Sipas.pelaporan.internal.keluar.retensi.kewenangan.Pane',
        'Sipas.pelaporan.internal.keluar.rekap.Pane',

        'Sipas.pelaporan.internal.keputusan.aktif.Pane',
        'Sipas.pelaporan.internal.keputusan.aktif.kewenangan.Pane',
        'Sipas.pelaporan.internal.keputusan.aktif.semua.Pane',

        'Sipas.pelaporan.internal.keputusan.blmsetuju.Pane',
        'Sipas.pelaporan.internal.keputusan.blmsetuju.kewenangan.Pane',
        'Sipas.pelaporan.internal.keputusan.blmsetuju.semua.Pane',

        'Sipas.pelaporan.internal.keputusan.retensi.Pane',
        'Sipas.pelaporan.internal.keputusan.retensi.kewenangan.Pane',
        'Sipas.pelaporan.internal.keputusan.retensi.semua.Pane',

        'Sipas.pelaporan.internal.keputusan.rekap.Pane',

        'Sipas.pelaporan.internal.korespondensi.Pane',
        'Sipas.pelaporan.bebas.rekap.Pane',
        'Sipas.pelaporan.bebas.Pane',
        'Sipas.pelaporan.umum.Pane',
        'Sipas.pelaporan.umum.jenis.Pane',
        'Sipas.pelaporan.rekap.staf.Pane',
        'Sipas.pelaporan.rekap.staf.akses.Pane',
        'Sipas.pelaporan.eksternal.rekap.bulan.Pane',
        'Sipas.pelaporan.eksternal.rekap.hari.Pane',

        'Sipas.pelaporan.dashboard.Pane',
        'Sipas.pelaporan.report.surat.Masuk',
        'Sipas.pelaporan.report.surat.Tindaklanjut',
        'Sipas.pelaporan.report.surat.Topurgent',
        'Sipas.pelaporan.report.rekap.surat.Masuk',
        'Sipas.pelaporan.report.rekap.surat.Keluar',
        'Sipas.pelaporan.report.rekap.Retensi',

        'Sipas.pelaporan.sla.request.Pane',
        'Sipas.pelaporan.sla.proses.Pane',
        'Sipas.pelaporan.sla.selesai.Pane',
        'Sipas.pelaporan.sla.tolak.Pane',
        'Sipas.pelaporan.sla.unit.Pane',

        'Sipas.pelaporan.internal.rating.penerima.Pane',
        'Sipas.pelaporan.internal.rating.pengirim.Pane'
    ],

    stores: [
        'Sipas.pelaporan.List'
    ],

    views: [
        'Sipas.pelaporan.Pane'
    ],

    umumChildConfig: {
        closable:true
        // iconCls:'icon ion-md-clipboard grey-600-i'
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_pelaporan_pane' },
        { ref: 'list', selector: 'sipas_pelaporan_pane gridpanel#paneList' }
    ],

    init: function(){
        this.control({
            'sipas_pelaporan_pane gridpanel#paneList dataview':{
                itemclick: this.onItem_Click
            }
        });
    },

    launch: function(){
        var $this = this,
            $app = this.getApplication(),
            mainview = this.createView(),
            $session = $app.Session(),
            $feature = $app.Feature(),
            $language = $app.Language(),
            menuListCopy = Ext.clone(menuList);

        // filter for accessible or not
        // eliminate roleable|featurable
        // set language
        Ext.each(menuListCopy, function(item, index, all)
        {
            if(item.featureable && !$feature.getFeatureAccess(item.featureName))
            {
                all.splice(index, 1); return;
            }
            if(item.roleable && !$session.getRuleAccess(item.roleName))
            {
                all.splice(index, 1); return;
            }

            // if(!item.iconCls)
            // {
            //     item.iconCls = '<i class="icon ion-md-clipboard grey-600-i"></i>';
            // }
            if(item.languageable)
            {
                var grammar = $language.getGrammar(item.languageCode, false);
                item.title = grammar;
            }
        }, this, true);
        
        var list = this.getList({root:mainview}),
            store = list.getStore();

        store.removeAll();
        store.add(menuListCopy);

        return mainview;
    },

    onItem_Click: function(dv, record, item, index, e, eOpts){
        // dv.tabView = dv.tabView || this.getMainview({from:dv}).down('tabpanel#tabList');
        dv.tabView = dv.tabView || this.getMainview({from:dv});

        // disable duplicate pane
        var found = null;
        dv.tabView && dv.tabView.items.each(function(child){
            if(child.bootstrap == record.get('bootstrap')){
                found = child;
                return false;
            }
        });

        if(!found){
            var bootstrap = record.get('bootstrap').split('@'),
                controller = this.getController(bootstrap[0]),
                controllerFn = controller && (controller[bootstrap[1]] || controller['launch']);

            found = Ext.callback(controllerFn, controller, [Ext.apply(record.getData(), {
                record: record
            }, this.umumChildConfig)]);

            // compatibility view
            if(found.rendered)
            {
                found.setBorder(false);
                // found.setIconCls('icon ion-md-clipboard grey-600-i');
            }else
            {
                // found.iconCls = 'icon ion-md-clipboard grey-600-i';
                found.border = false;
            }

            found.bootstrap = bootstrap;
            
            dv.tabView.add(found);
        }
        found && dv.tabView.setActiveTab(found);
    }
};
});