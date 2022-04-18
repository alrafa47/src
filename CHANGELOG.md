### Daftar Perubahan
---

#### v5.22.19481 (Versi Saat Ini)
	+ Menambah multi profile

#### v5.22.19450
	+ Menambah penanda kode eselon pada jabatan sebagai penerima surat 
	* Penyesuaian penerima surat internal terhadap jenis surat (berdasarkan jabatan)
	* Perbaikan checkbox penerima tembusan saat edit via koreksi

#### v5.22.19380
	+ Pembatasan pengajuan surat backdate berdasarkan jenis dan hakakses
	+ Pembatasan penerima surat internal berdasarkan kode eselon jabatan penerima
	* Perbaikan warning surat backdate
	* Perbaikan bug aplikasi
	
#### v5.22.19141
	+ Menambah info 'Surat Selesai' dan surat korespondensi untuk surat yang membutuhkan balasan
	+ Menambah warning jika penyetuju/penerima kosong pada online dokumen
	+ Menambah filter pada pemilihan pelaksana harian sesuai dengan hirarki jabatan
	+ Menambah laporan surat semua unit
	+ Menambah laporan surat berdasarkan unit kewenangan
	+ Menambah tampilan pilihan klasifikasi surat sesuai hirarki pada panel Surat
	+ Menambah pilihan pembantu jumlah hari pada pengaturan masa aktif klasifikasi
	+ Menambah fitur reupload berkas pada Agenda Surat Masuk Eksternal 
	+ Menambah inputan penanda kode eselon pada Jabatan
	+ Menambah warning jika penyetuju terakhir yang dipilih tidak mempunyai kode eselon ketika meminta nomor surat

	* Menyesuaikan tampilan Draf berdasarkan surat (sebagai ganti tampilan per koreksi)
	* Mengubah default spasi/jarak paragraf di online dokumen editor
	* Penyesuaian parsing data multi dan single tujuan surat pada online dokumen
	* Penyempurnaan mekanisme nomor backdate surat
	* Penyesuaian format laporan surat
	* Perbaikan bug aplikasi


#### v5.21.19091 
	+ Penambahan informasi jam baca disposisi
	+ Penambahan mekanisme redis untuk notifikasi
	* Mengganti warna icon disposisi dari hijau menjadi merah
	* Penyesuaian tampilan pengirim disposisi via asistensi
	* Penyesuaian tampilan penyetuju draf via asistensi
	* Penyesuaian label Arsip Bebas menjadi Sharing Folder
	* Penyesuaian tampilan nomor surat di online dokumen
	* Perbaikan bug parsing data online dokumen ketika mengubah berkas
	* Perbaikan bug pengiriman surat internal
	* Perbaikan bug notif asistensi
	* Perbaikan halaman verifikasi persetujuan surat
	- Penghapusan tanggal persetujuan di QR Code Online Dokumen

#### v5.20.19060
	+ Fitur Tembusan Agenda Keluar Eksternal
	+ Fitur Tanda Tangan Digital dengan QRCode di Online dokumen
	+ Fitur Tambah berkas surat setelah surat disetujui (reupload berkas)
	+ Fitur upload file tanda tangan digital
	+ Fitur pembatasan akses untuk melihat disposisi bersifat rahasia pada ekspedisi
	+ Watermark 'DRAF' pada online dokumen saat surat masih draft/dalam persetujuan
	+ Pada pengaturan template terdapat pilihan untuk menggunakan tanda tangan digital atau QR Code
	+ Notif 'penerima disposisi memberi respon' bagi pengirim disposisi
	+ Alert jika sudah pernah distribusi surat untuk user yang sama
	+ Fitur Arahan Sebelumnya di menu Terkirim
	+ Otomasi kunci berkas untuk sifat tertentu
	+ Terdapat pembatasan pengiriman disposisi (tidak kirim ke diri sendiri)

	* Pengembangan UX dan UI sesuai mockup
	* Menampilkan info surat terkirim (tgl) pada draft
	* Menyesuaikan warna text nomor surat menjadi biru
	* Tooltip/marque untuk judul berkas yg panjang
	* Menampilkan fitur Status Penyetujuan di detail Draf dalam satu halaman
	* Panel Agenda Surat menampilkan data sesuai dengan informasi notif agenda
	* Menampilkan respon dan uraian respon pada Ekspedisi Surat Masuk
	* Nama berkas hasil upload otomatis sesuai dengan nama file dan dapat diubah
	* Perbaikan bug aplikasi

#### v5.10.18490
	+ Penambahan pengaturan batas reupload berkas
	+ Penambahan inputan Lokasi di Surat Internal
	+ Penambahan fitur Atur Lokasi di Surat Internal
	+ Penambahan pilihan Prioritas di Agenda Surat Masuk Eksternal
	+ Penambahan respon disposisi di Lembar Disposisi dan Lembar Ekspedisi
	+ Penambahan pilihan filter tipe surat di fitur Tugas
	+ Penambahan mekanisme fitur Worker untuk Notifikasi

	* Penyempurnaan tampilan fitur notif agenda
	* Penyesuaian lembar disposisi dan lembar ekspedisi
	* Perbaikan fitur Profil
	* Perbaikan fitur Riwayat
	* Perbaikan fitur Arsip Bebas
	* Perbaikan fitur Ekspedisi Surat Keluar
	* Perbaikan fitur SLA
	* Perbaikan fitur Pegawai Kelompok

#### v5.0.18443
	+ Peluncuran pertama versi 5
	+ Penambahan fitur Tugas
	+ Penambahan fitur Multi Asisten pada menu Pelaksana Harian
	+ Penambahan fitur Mode Mini pada menu user (kiri)
	+ Penambahan fungsi buka link pada fitur Berkas Surat
	+ Penambahan fitur memperpanjang masa aktif surat
	+ Penambahan inputan Uraian di Agenda Surat
	+ Penambahan fitur Log Aktifitas Surat
	+ Penambahan inputan Tgl.Berlaku pada Agenda Surat Keluar Eksternal
	+ Penambahan fitur Hapus Permanen pada Bank Surat
	+ Penambahan fitur Pengaturan Template Lembar Resi, Disposisi, Korespondensi, Ekspedisi, Penyetujuan Surat Keluar
	+ Penambahan fitur Konfirmasi Surat Selesai pada Surat Masuk dan Disposisi
	+ Penambahan fitur Notifikasi Reminder Masa Aktif Surat
	+ Penambahan pilihan opsi penomoran pada fitur Pengaturan Penomoran Surat
	+ Penambahan fitur Ubah Lokasi Surat
	+ Penambahan fitur Upload Berkas setelah surat disetujui
	+ Penambahan fitur Tembusan Surat Keluar
	+ Penambahan fitur notifikasi untuk Tindakan Disposisi pada menu Riwayat/Terkirim
	+ Penambahan fungsi pilih per-pegawai pada fitur Kelompok Pegawai
	+ Penambahan fitur Perbesar dan Perkecil pada Berkas
	+ Penambahan tampilan tindakan dan uraian pada Ekspedisi
	+ Penambahan fitur Daftar Penerima pada fitur Tugas dan Masuk

	* Pembaruan tema aplikasi
	* Perubahan letak notifikasi agenda surat
	* Penggabungan menu Surat Masuk, Disposisi, Nota Dinas ke dalam menu Masuk
	* Perubahan menu Koreksi Masuk menjadi menu Draf
	* Perubahan menu Riwayat menjadi menu Terkirim
	* Penggabungan menu Surat Keluar ke dalam menu Draf
	* Penyempurnaan menu Pelaksana Harian/Asistensi Monitoring
	* Penyempurnaan fitur Agenda Masuk Eksternal
	* Penyempurnaan fitur Agenda Keluar Eksternal
	* Penyempurnaan fitur Agenda Surat Internal
	* Penyempurnaan fitur Transfer Agenda Masuk Internal
	* Penyempurnaan fitur Korespondensi
	* Penyempurnaan fitur Kunci Berkas di Agenda Surat
	* Penyempurnaan fitur Prioritas surat di Agenda Surat
	* Penyempurnaan fitur Butuh Balas surat di Agenda Surat Masuk Eksternal
	* Penyempurnaan fitur Masa Aktif surat di Agenda Surat
	* Penyempurnaan fitur Kirim Disposisi
	* Penyempurnaan fitur Bank Surat
	* Penyempurnaan fitur Riwayat Perubahan Dokumen
	* Penyempurnaan fitur Arsip Bebas
	* Penyempurnaan fitur Share Link Arsip Bebas
	* Penyempurnaan fitur Pelaporan
	* Penyempurnaan fitur Unit Kerja
	* Penyempurnaan fitur Jabatan
	* Penyempurnaan fitur Pegawai
	* Penyempurnaan fitur Kelompok Pegawai
	* Penyempurnaan fitur Hak Akses
	* Penyempurnaan fitur Jenis Surat
	* Penyempurnaan fitur Klasifikasi Surat
	* Penyempurnaan fitur Sifat Surat
	* Penyempurnaan fitur Prioritas Surat
	* Penyempurnaan fitur Media Surat
	* Penyempurnaan fitur Lokasi Arsip
	* Penyempurnaan fitur Kontak
	* Penyempurnaan fitur Masa Aktif
	* Penyempurnaan fitur Template
	* Penyempurnaan fitur Perintah dan Tindakan Disposisi
	* Penyempurnaan fitur Pengaturan Sistem
	* Penyempurnaan fitur Ekspedisi Surat
	* Penyempurnaan fitur Backup Restore
	* Penyempurnaan fitur Audit Trail
	* Penyempurnaan fitur Rating Review
	* Penyempurnaan fitur SLA
	* Perbaikan Bug Aplikasi

	- Penghapusan fitur Beranda
	- Penghapusan fitur Proritas Disposisi