/*==================================================================*/
/* View: v_properti_lite											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_properti_lite` AS
SELECT
	`p`.`properti_id`,
	`p`.`properti_buat_tgl`,
	`p`.`properti_buat_staf`,
	`p`.`properti_buat_data`,
	IFNULL(`p`.`properti_isubah`,0) as `properti_isubah`,
	`p`.`properti_ubah_tgl`,
	`p`.`properti_ubah_staf`,
	`p`.`properti_ubah_data`,
	IFNULL(`p`.`properti_ishapus`,0) as `properti_ishapus`,
	`p`.`properti_hapus_tgl`,
	`p`.`properti_hapus_staf`,
	`p`.`properti_hapus_data`,
	IFNULL(`properti_pulih_tgl`,0) AS `properti_ispulih`,
	`p`.`properti_pulih_tgl`,
	`p`.`properti_pulih_staf`,
	`p`.`properti_pulih_data`,
	`p`.`properti_data`,
	`p`.`properti_entitas`,
	`p`.`properti_entitas_id`,
	`p`.`properti_slug`
FROM `properti` `p`
;

/*==================================================================*/
/* View: v_unit_cakupan 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_unit_cakupan` AS 
SELECT
	`uc`.*,
	`j`.*,
	`u`.*
FROM `unit_cakupan` `uc`
LEFT JOIN `jabatan` `j` ON `j`.`jabatan_id` = `uc`.`unit_cakupan_jabatan`
LEFT JOIN `unit` `u` ON `u`.`unit_id` = `uc`.`unit_cakupan_unit`
;

CREATE OR REPLACE VIEW `v_unit_cakupan_hidup` AS
SELECT
	`uc`.*,
	`j`.*,
	`u`.*
FROM `unit_cakupan` `uc`
LEFT JOIN `jabatan` `j` ON `j`.`jabatan_id` = `uc`.`unit_cakupan_jabatan`
LEFT JOIN `unit` `u` ON `u`.`unit_id` = `uc`.`unit_cakupan_unit`
WHERE IFNULL(`u`.`unit_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_unit_cakupan_aktif` AS
SELECT
	`uc`.*
FROM `v_unit_cakupan_hidup` `uc`
WHERE `uc`.`unit_isaktif` = 1
;

-- CREATE OR REPLACE VIEW `v_unit_jabatan_jumlah` AS 
-- SELECT
--     `s`.`unit_cakupan_jabatan`,
--     COUNT(`s`.`unit_cakupan_id`) AS `jabatan_unit_jumlah`
-- FROM
--     `v_unit_cakupan_hidup` `s`
-- GROUP BY `s`.`unit_cakupan_jabatan`
-- HAVING 
--     `s`.`unit_cakupan_jabatan` IS NOT NULL
-- ;


/*==================================================================*/
/* View: v_staf 													*/
/* View: v_staf_lite												*/
/* View: v_staf_musnah												*/
/* View: v_staf_hidup												*/
/* View: v_staf_aktif												*/
/* View: v_staf_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_wakil_jumlah` AS 
SELECT
    `sw`.`staf_wakil_staf`,
    COUNT(`sw`.`staf_wakil_id`) AS `staf_wakil_jumlah`
FROM
    `staf_wakil` `sw`
WHERE IFNULL(`sw`.`staf_wakil_plt`, 0) = 0
GROUP BY `sw`.`staf_wakil_staf`
;
CREATE OR REPLACE VIEW `v_staf_atasan_jumlah` AS 
SELECT
    `sw`.`staf_wakil_asisten`,
    COUNT(`sw`.`staf_wakil_id`) AS `staf_atasan_jumlah`
FROM
    `staf_wakil` `sw`
WHERE IFNULL(`sw`.`staf_wakil_plt`, 0) = 0
GROUP BY `sw`.`staf_wakil_asisten`
;
CREATE OR REPLACE VIEW `v_staf_pgs_jumlah` AS 
SELECT
    `sw`.`staf_wakil_staf`,
    COUNT(`sw`.`staf_wakil_id`) AS `staf_pgs_jumlah`
FROM
    `staf_wakil` `sw`
WHERE `sw`.`staf_wakil_plt` = 1
GROUP BY `sw`.`staf_wakil_staf`
;
CREATE OR REPLACE VIEW `v_staf_kelompok_jumlah` AS 
SELECT
    `sw`.`staf_tim_anggota_staf`,
    COUNT(`sw`.`staf_tim_anggota_id`) AS `staf_kelompok_jumlah`
FROM
    `staf_tim_anggota` `sw`
GROUP BY `sw`.`staf_tim_anggota_staf`
;
CREATE OR REPLACE VIEW `v_staf` AS
SELECT
	`s`.`staf_id`,
	`s`.`staf_profil`,
	`s`.`staf_peran`,
	`s`.`staf_akun`,
	IFNULL(`s`.`staf_akun_isdefault`,0) 		AS `staf_akun_isdefault`,
	IFNULL(`s`.`staf_status`,0) 				AS `staf_status`,
	`s`.`staf_kode`,
	`s`.`staf_nama`,
	`s`.`staf_kelamin`,
	`s`.`staf_unit`,
	`s`.`staf_jabatan`,
	`s`.`staf_golongan`,
	`s`.`staf_sgt`,
	`ucj`.`jabatan_unit_jumlah`					AS `staf_jabatan_unit_jumlah`,
	IFNULL(`s`.`staf_isaktif`,0) 				AS `staf_isaktif`,
	`swj`.`staf_wakil_jumlah` 					AS `staf_wakil_jumlah`,
	`saj`.`staf_atasan_jumlah` 					AS `staf_atasan_jumlah`,
	-- `jsj`.`jabatan_asisten_jumlah` 				AS `jabatan_asisten_jumlah`,
	-- `jaj`.`jabatan_atasan_jumlah` 				AS `jabatan_atasan_jumlah`,
	`spj`.`staf_pgs_jumlah` 					AS `staf_pgs_jumlah`,
	`skj`.`staf_kelompok_jumlah` 				AS `staf_kelompok_jumlah`,
	`g`.`golongan_id`,
	`g`.`golongan_level`,
	`s`.`staf_properti`,
	`s`.`staf_ishapus`,
	`j`.*,
	`u`.*,
	`a`.*,
	`p`.*
FROM `staf` `s`
-- LEFT JOIN `staf_profil` `sp` 					ON `s`.`staf_profil` = `sp`.`staf_profil_id`
LEFT JOIN `jabatan` `j` 						ON `s`.`staf_jabatan` = `j`.`jabatan_id`
LEFT JOIN `golongan` `g` 						ON `s`.`staf_golongan` = `g`.`golongan_id`
LEFT JOIN `unit` `u` 							ON `s`.`staf_unit` = `u`.`unit_id`
LEFT JOIN `akun` `a` 							ON `s`.`staf_akun` = `a`.`akun_id`
LEFT JOIN `peran` `p` 							ON `s`.`staf_peran` = `p`.`peran_id`
LEFT JOIN `unit_jabatan_jumlah` `ucj` 		FORCE INDEX(PRIMARY)	ON `s`.`staf_jabatan` = `ucj`.`unit_cakupan_jabatan`
LEFT JOIN `staf_wakil_jumlah` `swj` 		FORCE INDEX(PRIMARY)	ON `s`.`staf_id` = `swj`.`staf_wakil_staf`
LEFT JOIN `staf_atasan_jumlah` `saj` 		FORCE INDEX(PRIMARY)	ON `s`.`staf_id` = `saj`.`staf_wakil_asisten`
LEFT JOIN `staf_pgs_jumlah` `spj` 			FORCE INDEX(PRIMARY)	ON `s`.`staf_id` = `spj`.`staf_wakil_staf`
LEFT JOIN `staf_kelompok_jumlah` `skj` 		FORCE INDEX(PRIMARY)	ON `s`.`staf_id` = `skj`.`staf_tim_anggota_staf`
-- LEFT JOIN `jabatan_asisten_jumlah` `jsj` 	FORCE INDEX(PRIMARY)	ON `s`.`staf_jabatan` = `jsj`.`jabatan_wakil_jabatan`
-- LEFT JOIN `jabatan_atasan_jumlah` `jaj` 	FORCE INDEX(PRIMARY)	ON `s`.`staf_jabatan` = `jaj`.`jabatan_wakil_asisten`
;

CREATE OR REPLACE VIEW `v_staf_akun` AS
SELECT
	`s`.`staf_id`,
	`s`.`staf_profil`,
	`s`.`staf_peran`,
	`s`.`staf_akun`,
	IFNULL(`s`.`staf_akun_isdefault`,0) 		AS `staf_akun_isdefault`,
	IFNULL(`s`.`staf_status`,0) 				AS `staf_status`,
	`s`.`staf_kode`,
	`s`.`staf_nama`,
	`s`.`staf_kelamin`,
	`s`.`staf_unit`,
	`s`.`staf_jabatan`,
	IFNULL(`s`.`staf_isaktif`,0) 				AS `staf_isaktif`,
	`s`.`staf_properti`,
	`j`.*,
	`a`.*,
	`u`.*
FROM `staf` `s`
-- LEFT JOIN `staf_profil` `sp` 					ON `s`.`staf_profil` = `sp`.`staf_profil_id`
LEFT JOIN `jabatan` `j` 						ON `s`.`staf_jabatan` = `j`.`jabatan_id`
LEFT JOIN `unit` `u` 							ON `s`.`staf_unit` = `u`.`unit_id`
LEFT JOIN `akun` `a` 							ON `s`.`staf_akun` = `a`.`akun_id`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_staf_lite` AS
SELECT
	`s`.`staf_id`,
	`s`.`staf_kode`,
	`s`.`staf_nama`,
	`s`.`staf_unit`,
	`s`.`staf_jabatan`,
	`s`.`staf_kelamin`,
	`s`.`staf_peran`,
	`s`.`staf_profil`,
	`s`.`staf_akun`,
	`a`.`akun_id`,
	`a`.`akun_nama`,
	IFNULL(`s`.`staf_isaktif`,0) 			AS `staf_isaktif`,
	IFNULL(`s`.`staf_status`,0) 			AS `staf_status`,
	`j`.`jabatan_id`,
	`j`.`jabatan_kode`,
	`j`.`jabatan_induk`,
	`j`.`jabatan_nama`,
	IFNULL(`j`.`jabatan_isnomor`,0) 		AS `jabatan_isnomor`,
	IFNULL(`j`.`jabatan_ispenerima`,0) 		AS `jabatan_ispenerima`,
	`u`.`unit_id`,
	`u`.`unit_kode`,
	`u`.`unit_nama`,
	`u`.`unit_rubrik`
FROM `staf` `s`
LEFT JOIN `staf_profil` `sp` 	ON `s`.`staf_profil` = `sp`.`staf_profil_id`
LEFT JOIN `jabatan` `j` 		ON `s`.`staf_jabatan` = `j`.`jabatan_id`
LEFT JOIN `unit` `u` 			ON `s`.`staf_unit` = `u`.`unit_id`
LEFT JOIN `akun` `a` 			ON `s`.`staf_akun` = `a`.`akun_id`
;

CREATE OR REPLACE VIEW `v_staf_musnah` AS
SELECT
	`s`.*
FROM `v_staf` `s`
WHERE `s`.`staf_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_staf_lite_hidup` AS
SELECT
	`s`.*
FROM `staf` `s`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_staf_hidup` AS
SELECT
	`s`.*
FROM `v_staf` `s`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_staf_aktif` AS
SELECT
	`s`.*
FROM `v_staf` `s`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0 AND `s`.`staf_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_staf_nonaktif` AS
SELECT
	`s`.*
FROM `v_staf` `s`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0 AND IFNULL(`s`.`staf_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_staf_unit_jumlah` AS 
SELECT
    `s`.`staf_unit`,
    COUNT(`s`.`staf_id`) AS `unit_staf_jumlah`
FROM
    `v_staf_aktif` `s`
GROUP BY `s`.`staf_unit`
HAVING 
    `s`.`staf_unit` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_staf_jabatan_jumlah` AS 
SELECT
    `s`.`staf_jabatan`,
    COUNT(`s`.`staf_id`) AS `jabatan_staf_jumlah`
FROM
    `v_staf_aktif` `s`
GROUP BY `s`.`staf_jabatan`
HAVING 
    `s`.`staf_jabatan` IS NOT NULL
;

/*==================================================================*/
/* View: v_akun 													*/
/* View: v_akun_musnah												*/
/* View: v_akun_hidup												*/
/* View: v_akun_aktif												*/
/* View: v_akun_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_akun_staf_jumlah` AS 
SELECT
    `s`.`staf_akun`,
    COUNT(`s`.`staf_id`) as `akun_staf_jumlah`
FROM
    `staf` `s`
WHERE IFNULL(`s`.`staf_ishapus`, 0) = 0
GROUP BY `s`.`staf_akun`
;
CREATE OR REPLACE VIEW `v_akun` AS
SELECT
	`a`.`akun_id`,
	`a`.`akun_staf`,
	`a`.`akun_nama`,
	`a`.`akun_sandi`,
	`a`.`akun_garam`,
	`a`.`akun_ponsel`,
	`a`.`akun_surel`,
	`a`.`akun_lastmasuk`,
	IFNULL(`a`.`akun_isaktif`,0) 					AS `akun_isaktif`,
	`a`.`akun_properti`,
	`a`.`akun_ishapus`,
	`asj`.`akun_staf_jumlah`,
	`s`.*,
	`p`.*,
    `u`.`unit_id` AS `akun_unit_id`,
    `u`.`unit_nama` AS `akun_unit_nama`,
    `u`.`unit_induk` AS `akun_unit_induk`,
    IFNULL(`u`.`unit_isaktif`, 0) AS `akun_unit_isaktif`
FROM `akun` `a`
LEFT JOIN `unit` `u` ON `a`.`akun_unit_id` = `u`.`unit_id`
LEFT JOIN `staf` `s` ON `s`.`staf_id` = `a`.`akun_staf`
LEFT JOIN `peran` `p` ON `s`.`staf_peran` = `p`.`peran_id`
LEFT JOIN `akun_staf_jumlah` `asj` FORCE INDEX(PRIMARY) ON `a`.`akun_id` = `asj`.`staf_akun`
;

CREATE OR REPLACE VIEW `v_akun_musnah` AS
SELECT
	`a`.*
FROM `v_akun` `a`
WHERE `a`.`akun_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_akun_hidup` AS
SELECT
	`a`.*
FROM `v_akun` `a`
WHERE IFNULL(`a`.`akun_ishapus`, 0) = 0
-- GROUP BY `a`.`akun_nama`
;

CREATE OR REPLACE VIEW `v_akun_aktif` AS
SELECT
	`a`.*
FROM `v_akun` `a`
WHERE IFNULL(`a`.`akun_ishapus`, 0) = 0 AND `a`.`akun_isaktif` = 1
-- GROUP BY `a`.`akun_nama`
;

CREATE OR REPLACE VIEW `v_akun_nonaktif` AS
SELECT
	`a`.*
FROM `v_akun` `a`
WHERE IFNULL(`a`.`akun_ishapus`, 0) = 0 AND IFNULL(`a`.`akun_isaktif`, 0) = 0
-- GROUP BY `a`.`akun_nama`
;

/*==================================================================*/
/* View: v_alat 													*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_alat` AS
SELECT
	`alat`.*,
	IFNULL(`alat_aktif_tgl`,0) AS `alat_isaktif`,
	`akun`.*
FROM `alat` `alat`
LEFT JOIN `akun` `akun` ON `alat`.`alat_akun` = `akun`.`akun_id`
;

/*==================================================================*/
/* View: v_properti 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_properti` AS
SELECT
	`p`.`properti_id` 			AS `properti_id`,
	`p`.`properti_buat_tgl` 		AS `properti_buat_tgl`,
	`p`.`properti_buat_staf` 		AS `properti_buat_staf`,
	`p`.`properti_buat_data` 		AS `properti_buat_data`,
	IFNULL(`p`.`properti_isubah`,0) 	AS `properti_isubah`,
	`p`.`properti_ubah_tgl` 		AS `properti_ubah_tgl`,
	`p`.`properti_ubah_staf` 		AS `properti_ubah_staf`,
	`p`.`properti_ubah_data` 		AS `properti_ubah_data`,
	IFNULL(`p`.`properti_ishapus`,0) 	AS `properti_ishapus`,
	`p`.`properti_hapus_tgl` 		AS `properti_hapus_tgl`,
	`p`.`properti_hapus_staf` 		AS `properti_hapus_staf`,
	`p`.`properti_hapus_data` 		AS `properti_hapus_data`,
	IFNULL(`properti_pulih_tgl`,0) 		AS `properti_ispulih`,
	`p`.`properti_pulih_tgl` 		AS `properti_pulih_tgl`,
	`p`.`properti_pulih_staf` 		AS `properti_pulih_staf`,
	`p`.`properti_pulih_data` 		AS `properti_pulih_data`,
	`p`.`properti_data` 			AS `properti_data`,
	`p`.`properti_entitas` 			AS `properti_entitas`,
	`p`.`properti_entitas_id` 		AS `properti_entitas_id`,
	`p`.`properti_slug` 			AS `properti_slug`,
	`b`.`staf_id` 				AS `properti_pembuat_id`,
	`b`.`staf_kode` 			AS `properti_pembuat_kode`,
	`b`.`staf_nama` 			AS `properti_pembuat_nama`,
	`b`.`staf_unit`				AS `properti_pembuat_unit`,
	`b`.`unit_nama` 			AS `properti_pembuat_unit_nama`,
	`b`.`unit_rubrik` 			AS `properti_pembuat_unit_rubrik`,
	`b`.`unit_kode` 			AS `properti_pembuat_unit_kode`,
	`b`.`staf_jabatan` 			AS `properti_pembuat_jabatan`,
	`b`.`jabatan_nama` 			AS `properti_pembuat_jabatan_nama`,
	`b`.`jabatan_kode` 			AS `properti_pembuat_jabatan_kode`,
	`u`.`staf_id` 				AS `properti_pengubah_id`,
	`u`.`staf_kode` 			AS `properti_pengubah_kode`,
	`u`.`staf_nama` 			AS `properti_pengubah_nama`,
	`u`.`staf_unit`				AS `properti_pengubah_unit`,
	`u`.`unit_nama` 			AS `properti_pengubah_unit_nama`,
	`u`.`staf_jabatan` 			AS `properti_pengubah_jabatan`,
	`u`.`jabatan_nama` 			AS `properti_pengubah_jabatan_nama`,
	`h`.`staf_id` 				AS `properti_penghapus_id`,
	`h`.`staf_kode` 			AS `properti_penghapus_kode`,
	`h`.`staf_nama` 			AS `properti_penghapus_nama`,
	`h`.`staf_unit`				AS `properti_penghapus_unit`,
	`h`.`unit_nama` 			AS `properti_penghapus_unit_nama`,
	`h`.`staf_jabatan` 			AS `properti_penghapus_jabatan`,
	`h`.`jabatan_nama` 			AS `properti_penghapus_jabatan_nama`,
	`r`.`staf_id` 				AS `properti_pemulih_id`,
	`r`.`staf_kode` 			AS `properti_pemulih_kode`,
	`r`.`staf_nama` 			AS `properti_pemulih_nama`,
	`r`.`staf_unit`				AS `properti_pemulih_unit`,
	`r`.`unit_nama` 			AS `properti_pemulih_unit_nama`,
	`r`.`staf_jabatan` 			AS `properti_pemulih_jabatan`,
	`r`.`jabatan_nama` 			AS `properti_pemulih_jabatan_nama`
FROM `properti` `p`
LEFT JOIN `v_staf_lite` `b` 	ON `b`.`staf_id` = `p`.`properti_buat_staf`
LEFT JOIN `v_staf_lite` `u` 	ON `u`.`staf_id` = `p`.`properti_ubah_staf`
LEFT JOIN `v_staf_lite` `h` 	ON `h`.`staf_id` = `p`.`properti_hapus_staf`
LEFT JOIN `v_staf_lite` `r` 	ON `r`.`staf_id` = `p`.`properti_pulih_staf`
;

/*==================================================================*/
/* View: v_properti_log */
/*==================================================================*/
CREATE OR REPLACE VIEW v_properti_log AS 
(
	SELECT 
	(SELECT MD5(`p`.`properti_id`)) AS `properti_log_id`,
	`p`.`properti_id` 			AS `properti_log_properti`, 
	`p`.`properti_buat_tgl` 		AS `properti_log_tgl`,
	`p`.`properti_buat_staf` 		AS `properti_log_staf`,
	`p`.`properti_slug` 			AS `properti_log_slug`,
	("buat") 				AS `properti_log_aksi`,

	`st`.`staf_nama` 			AS `properti_log_staf_nama`,
	`st`.`jabatan_nama`			AS `properti_log_staf_jabatan_nama`,
	`st`.`unit_nama`			AS `properti_log_staf_unit_nama`

	FROM `properti` `p`
	LEFT JOIN `v_staf_lite` `st` ON `st`.`staf_id` = `p`.`properti_buat_staf`
	WHERE `properti_buat_tgl` IS NOT NULL AND `properti_buat_staf` IS NOT NULL
)
UNION
(
	SELECT 
	(SELECT MD5(`p`.`properti_id`)) AS `properti_log_id`,
	`p`.`properti_id` 			AS `properti_log_properti`,
	`p`.`properti_ubah_tgl` 		AS `properti_log_tgl`,
	`p`.`properti_ubah_staf` 		AS `properti_log_staf`,
	`p`.`properti_slug` 			AS `properti_log_slug`,
	("ubah") 				AS `properti_log_aksi`,

	`st`.`staf_nama` 			AS `properti_log_staf_nama`,
	`st`.`jabatan_nama`			AS `properti_log_staf_jabatan_nama`,
	`st`.`unit_nama`			AS `properti_log_staf_unit_nama`

	FROM `properti` `p`
	LEFT JOIN `v_staf_lite` `st` ON `st`.`staf_id` = `p`.`properti_ubah_staf`
	WHERE `properti_ubah_tgl` IS NOT NULL AND `properti_ubah_staf` IS NOT NULL
)
UNION
(
	SELECT 
	(SELECT MD5(`p`.`properti_id`)) AS `properti_log_id`,
	`p`.`properti_id` 			AS `properti_log_properti`,
	`p`.`properti_hapus_tgl` 		AS `properti_log_tgl`,
	`p`.`properti_hapus_staf` 		AS `properti_log_staf`,
	`p`.`properti_slug` 			AS `properti_log_slug`,
	("hapus") 				AS `properti_log_aksi`,

	`st`.`staf_nama` 			AS `properti_log_staf_nama`,
	`st`.`jabatan_nama`			AS `properti_log_staf_jabatan_nama`,
	`st`.`unit_nama`			AS `properti_log_staf_unit_nama`

	FROM `properti` `p`
	LEFT JOIN `v_staf_lite` `st` ON `st`.`staf_id` = `p`.`properti_hapus_staf`
	WHERE `properti_hapus_tgl` IS NOT NULL AND `properti_hapus_staf` IS NOT NULL
)
UNION
(
	SELECT 
	(SELECT MD5(`p`.`properti_id`)) AS `properti_log_id`,
	`p`.`properti_id` 			AS `properti_log_properti`,
	`p`.`properti_pulih_tgl` 		AS `properti_log_tgl`,
	`p`.`properti_pulih_staf` 		AS `properti_log_staf`,
	`p`.`properti_slug` 			AS `properti_log_slug`,
	("pulih") 				AS `properti_log_aksi`,

	`st`.`staf_nama` 			AS `properti_log_staf_nama`,
	`st`.`jabatan_nama`			AS `properti_log_staf_jabatan_nama`,
	`st`.`unit_nama`			AS `properti_log_staf_unit_nama`

	FROM `properti` `p`
	LEFT JOIN `v_staf_lite` `st` ON `st`.`staf_id` = `p`.`properti_pulih_staf`
	WHERE `properti_pulih_tgl` IS NOT NULL AND `properti_pulih_staf` IS NOT NULL
)
ORDER BY `properti_log_tgl` DESC
;


/*==================================================================*/
/* View: v_peran 													*/
/* View: v_peran_musnah												*/
/* View: v_peran_hidup												*/
/* View: v_peran_aktif												*/
/* View: v_peran_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_jumlah_by_peran` AS 
SELECT
    `s`.`staf_peran`,
    COUNT(`s`.`staf_id`) AS `peran_staf_jumlah`
FROM
    `v_staf_aktif` `s`
GROUP BY `s`.`staf_peran`
HAVING 
    `s`.`staf_peran` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_peran` AS
SELECT
	`p`.`peran_id`,
	`p`.`peran_nama`,
	`p`.`peran_akses`,
	IFNULL(`p`.`peran_isaktif`,0) 				AS `peran_isaktif`,
	`sjp`.`peran_staf_jumlah` 					AS `peran_staf_jumlah`,
	IFNULL(`p`.`peran_ishapus`,0) 				AS `peran_ishapus`,
	`p`.`peran_properti`
FROM `peran` `p`
LEFT JOIN `staf_peran_jumlah` `sjp` FORCE INDEX(PRIMARY) ON `p`.`peran_id` = `sjp`.`staf_peran`
;

CREATE OR REPLACE VIEW `v_peran_musnah` AS
SELECT
	`p`.*
FROM `v_peran` `p`
WHERE `p`.`peran_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_peran_hidup` AS
SELECT
	`p`.*
FROM `v_peran` `p`
WHERE IFNULL(`p`.`peran_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_peran_aktif` AS
SELECT
	`p`.*
FROM `v_peran` `p`
WHERE IFNULL(`p`.`peran_ishapus`, 0) = 0 AND `p`.`peran_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_peran_nonaktif` AS
SELECT
	`p`.*
FROM `v_peran` `p`
WHERE IFNULL(`p`.`peran_ishapus`, 0) = 0 AND IFNULL(`p`.`peran_isaktif`,0) = 0
;

/*==================================================================*/
/* View: v_unit 													*/
/* View: v_unit_lite												*/
/* View: v_unit_musnah 												*/
/* View: v_unit_hidup 												*/
/* View: v_unit_aktif 												*/
/* View: v_unit_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_unit` AS
SELECT
	`u`.`unit_id`,
	`u`.`unit_nama`,
	`u`.`unit_kode`,
	`u`.`unit_rubrik`,
	`u`.`unit_pos_code`,
	`u`.`unit_manager`,
	`u`.`unit_induk`,
	`u`.`unit_parent_path`,
	IFNULL(`u`.`unit_isaktif`,0) 				AS `unit_isaktif`,
	`su`.`unit_staf_jumlah`,
	IFNULL(`u`.`unit_ishapus`,0) 				AS `unit_ishapus`,
	`u`.`unit_properti`,
	IFNULL(`u`.`unit_isbuatsurat`,0) 			AS `unit_isbuatsurat`,
	`induk`.`unit_id` 							AS `unit_induk_id`,
	`induk`.`unit_nama` 						AS `unit_induk_nama`,
	`manager`.`staf_id` 						AS `manager_id`,
	`manager`.`staf_kode` 						AS `manager_kode`,
	`manager`.`staf_nama` 						AS `manager_nama`,
	`manager`.`staf_unit` 						AS `manager_unit`,
	`manager`.`unit_nama` 						AS `manager_unit_nama`,
	`manager`.`staf_jabatan` 					AS `manager_jabatan`,
	`manager`.`jabatan_nama` 					AS `manager_jabatan_nama`	
FROM `unit` `u`
LEFT JOIN `unit` `induk` 										ON `induk`.`unit_id` = `u`.`unit_induk`
LEFT JOIN `v_staf_lite` `manager` 								ON `u`.`unit_manager` = `manager`.`staf_id`
LEFT JOIN `staf_unit_jumlah` `su` 		FORCE INDEX(PRIMARY)	ON `su`.`staf_unit` = `u`.`unit_id`
;

CREATE OR REPLACE VIEW `v_unit_lite` AS
SELECT
	`u`.`unit_id`,
	`u`.`unit_nama`,
	`u`.`unit_kode`,
	`u`.`unit_rubrik`,
	`u`.`unit_manager`,
	`u`.`unit_induk`,
	IFNULL(`u`.`unit_isaktif`,0) 				AS `unit_isaktif`,
	`u`.`unit_properti`
FROM `unit` `u`
;

CREATE OR REPLACE VIEW `v_unit_musnah` AS
SELECT
	`u`.*
FROM `v_unit` `u`
WHERE `u`.`unit_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_unit_hidup` AS
SELECT
	`u`.*
FROM `v_unit` `u`
WHERE IFNULL(`u`.`unit_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_unit_aktif` AS
SELECT
	`u`.*
FROM `v_unit` `u`
WHERE IFNULL(`u`.`unit_ishapus`, 0) = 0 AND `u`.`unit_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_unit_nonaktif` AS
SELECT
	`u`.*
FROM `v_unit` `u`
WHERE IFNULL(`u`.`unit_ishapus`, 0) = 0 AND IFNULL(`u`.`unit_isaktif`, 0) = 0
;

/*==================================================================*/
/* View: v_staf_tim_anggota */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_tim_anggota` AS
SELECT
	`sta`.*,
	`st`.*,
	`a`.`staf_id` 								AS `anggota_id`,
	`a`.`staf_kode` 							AS `anggota_kode`,
	`a`.`staf_nama` 							AS `anggota_nama`,
	`a`.`staf_profil` 							AS `anggota_profil`,
	`a`.`staf_unit`								AS `anggota_unit`,
	`a`.`unit_nama` 							AS `anggota_unit_nama`,
	`a`.`staf_jabatan` 							AS `anggota_jabatan`,
	`a`.`jabatan_nama` 							AS `anggota_jabatan_nama`,
	IFNULL(`a`.`jabatan_isnomor`, 0) 			AS `anggota_jabatan_isnomor`,
	IFNULL(`a`.`jabatan_ispenerima`, 0) 		AS `anggota_jabatan_ispenerima`
FROM `staf_tim_anggota` `sta`
LEFT JOIN `staf_tim` `st` 		FORCE INDEX(PRIMARY) 	ON `sta`.`staf_tim_anggota_tim` = `st`.`staf_tim_id`
LEFT JOIN `v_staf_aktif` `a` 							ON `sta`.`staf_tim_anggota_staf` = `a`.`staf_id`
WHERE 
	IFNULL(`st`.`staf_tim_ishapus`, 0) = 0 AND
	`a`.`staf_id` IS NOT NULL
;

/*==================================================================*/
/* View: v_staf_tim 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_tim_anggota_jumlah_by_staf_tim` AS 
SELECT
    `s`.`staf_tim_anggota_tim`,
    COUNT(`s`.`staf_tim_anggota_id`) AS `staf_tim_jumlah`
FROM
    `v_staf_tim_anggota` `s`
GROUP BY `s`.`staf_tim_anggota_tim`
HAVING 
    `s`.`staf_tim_anggota_tim` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_staf_tim` AS
SELECT
	`st`.*,
	`stast`.`staf_tim_jumlah` AS `staf_tim_jumlah`
FROM `staf_tim` `st`
LEFT JOIN `staf_tim_anggota_jumlah` `stast` FORCE INDEX(PRIMARY) ON `st`.`staf_tim_id` = `stast`.`staf_tim_anggota_tim`
;

/*==================================================================*/
/* View: v_staf_tim_hidup 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_tim_hidup` AS
SELECT
	`st`.*
FROM `v_staf_tim` `st`
WHERE IFNULL(`st`.`staf_tim_ishapus`, 0) = 0
;

/*==================================================================*/
/* View: v_staf_tim_musnah 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_tim_musnah` AS
SELECT
	`st`.*
FROM `v_staf_tim` `st`
WHERE `st`.`staf_tim_ishapus` = 1
;

/*==================================================================*/
/* View: v_staf_wakil 												*/
/* View: v_staf_wakil_tersedia 										*/
/* View: v_staf_wakil_aktif 										*/
/* View: v_staf_pgs 												*/
/* View: v_staf_pgs_atasan 											*/
/* View: v_staf_atasan 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_wakil` AS
SELECT
	`sw`.*,
	`a`.`staf_kode` 							AS `staf_wakil_asisten_kode`,
	`a`.`staf_nama` 							AS `staf_wakil_asisten_nama`,
	IFNULL(`a`.`staf_isaktif`, 0) 				AS `staf_wakil_asisten_isaktif`,
	IFNULL(`a`.`staf_status`, 0) 				AS `staf_wakil_asisten_status`,
	`a`.`jabatan_id` 							AS `staf_wakil_asisten_jabatan`,
	`a`.`jabatan_nama` 							AS `staf_wakil_asisten_jabatan_nama`,
	`a`.`unit_id` 								AS `staf_wakil_asisten_unit`,
	`a`.`unit_nama` 							AS `staf_wakil_asisten_unit_nama`,
	`s`.`staf_id` 								AS `staf_id`,
	`s`.`staf_kode` 							AS `staf_kode`,
	`s`.`staf_nama` 							AS `staf_nama`,
	IFNULL(`s`.`staf_isaktif`, 0) 				AS `staf_isaktif`,
	IFNULL(`s`.`staf_status`, 0) 				AS `staf_status`,
	`s`.`jabatan_id` 							AS `jabatan_id`,
	`s`.`jabatan_nama` 							AS `jabatan_nama`,
	`s`.`unit_id` 								AS `unit_id`,
	`s`.`unit_nama` 							AS `unit_nama`
FROM `staf_wakil` `sw`
LEFT JOIN `v_staf_lite` `a` 					ON `a`.`staf_id` = `sw`.`staf_wakil_asisten`
LEFT JOIN `v_staf_lite` `s` 					ON `s`.`staf_id` = `sw`.`staf_wakil_staf`
;

CREATE OR REPLACE VIEW `v_staf_wakil_tersedia` AS
SELECT `p`.`staf_id`,
	   `p`.`staf_kode`,
	   `p`.`staf_nama`,
	   `p`.`staf_kelamin`,
	   `p`.`staf_unit`,
	   `p`.`staf_jabatan`,
	   `p`.`staf_akun`,
	   `p`.`staf_peran`,
	   `p`.`jabatan_id`,
	   `p`.`jabatan_induk`,
	   `p`.`jabatan_kode`,
	   `p`.`jabatan_nama`,
	   `p`.`unit_id`,
	   `p`.`unit_kode`,
	   `p`.`unit_nama`
FROM `v_staf_lite` `p`
WHERE `p`.`staf_id` NOT IN (SELECT IFNULL(`staf_wakil_asisten`, 0) FROM `staf_wakil`)
;

CREATE OR REPLACE VIEW `v_staf_wakil_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_staf_wakil` `s`
WHERE 
	(
		(IFNULL(`s`.`staf_wakil_plt`, 0) = 0
		AND ISNULL(`s`.`staf_wakil_tgl_mulai`)
		AND ISNULL(`s`.`staf_wakil_tgl_selesai`)) 
		OR 
		(`s`.`staf_wakil_plt` = 1 
		AND DATE_FORMAT(`s`.`staf_wakil_tgl_mulai`, '%Y-%m-%d') <= CURRENT_DATE
		AND CURRENT_DATE <= DATE_FORMAT(`s`.`staf_wakil_tgl_selesai`, '%Y-%m-%d'))
	)
;

CREATE OR REPLACE VIEW `v_staf_asisten` AS
SELECT
	`sw`.*,
	`a`.`staf_kode` 							AS `staf_wakil_asisten_kode`,
	`a`.`staf_nama` 							AS `staf_wakil_asisten_nama`,
	IFNULL(`a`.`staf_isaktif`, 0) 				AS `staf_wakil_asisten_isaktif`,
	IFNULL(`a`.`staf_status`, 0) 				AS `staf_wakil_asisten_status`,
	`a`.`jabatan_id` 							AS `staf_wakil_asisten_jabatan`,
	`a`.`jabatan_nama` 							AS `staf_wakil_asisten_jabatan_nama`,
	`a`.`unit_id` 								AS `staf_wakil_asisten_unit`,
	`a`.`unit_nama` 							AS `staf_wakil_asisten_unit_nama`,
	`s`.`staf_id` 								AS `staf_id`,
	`s`.`staf_kode` 							AS `staf_kode`,
	`s`.`staf_nama` 							AS `staf_nama`,
	IFNULL(`s`.`staf_isaktif`, 0) 				AS `staf_isaktif`,
	IFNULL(`s`.`staf_status`, 0) 				AS `staf_status`,
	`s`.`jabatan_id` 							AS `jabatan_id`,
	`s`.`jabatan_nama` 							AS `jabatan_nama`,
	`s`.`unit_id` 								AS `unit_id`,
	`s`.`unit_nama` 							AS `unit_nama`
FROM `staf_wakil` `sw`
LEFT JOIN `v_staf_lite` `a` 					ON `a`.`staf_id` = `sw`.`staf_wakil_asisten`
LEFT JOIN `v_staf_lite` `s` 					ON `s`.`staf_id` = `sw`.`staf_wakil_staf`
WHERE IFNULL(`sw`.`staf_wakil_plt`, 0) = 0
;

CREATE OR REPLACE VIEW `v_staf_pgs` AS
SELECT
	`sw`.*,
	`a`.`staf_kode` 							AS `staf_wakil_asisten_kode`,
	`a`.`staf_nama` 							AS `staf_wakil_asisten_nama`,
	IFNULL(`a`.`staf_isaktif`, 0) 				AS `staf_wakil_asisten_isaktif`,
	IFNULL(`a`.`staf_status`, 0) 				AS `staf_wakil_asisten_status`,
	`a`.`jabatan_id` 							AS `staf_wakil_asisten_jabatan`,
	`a`.`jabatan_nama` 							AS `staf_wakil_asisten_jabatan_nama`,
	`a`.`unit_id` 								AS `staf_wakil_asisten_unit`,
	`a`.`unit_nama` 							AS `staf_wakil_asisten_unit_nama`,
	`s`.`staf_id` 								AS `staf_id`,
	`s`.`staf_kode` 							AS `staf_kode`,
	`s`.`staf_nama` 							AS `staf_nama`,
	IFNULL(`s`.`staf_isaktif`, 0) 				AS `staf_isaktif`,
	IFNULL(`s`.`staf_status`, 0) 				AS `staf_status`,
	`s`.`jabatan_id` 							AS `jabatan_id`,
	`s`.`jabatan_nama` 							AS `jabatan_nama`,
	`s`.`unit_id` 								AS `unit_id`,
	`s`.`unit_nama` 							AS `unit_nama`
FROM `staf_wakil` `sw`
LEFT JOIN `v_staf_lite` `a` 					ON `a`.`staf_id` = `sw`.`staf_wakil_asisten`
LEFT JOIN `v_staf_lite` `s` 					ON `s`.`staf_id` = `sw`.`staf_wakil_staf`
WHERE `sw`.`staf_wakil_plt` = 1 AND CURRENT_DATE <= DATE_FORMAT(`sw`.`staf_wakil_tgl_selesai`, '%Y-%m-%d')
;

CREATE OR REPLACE VIEW `v_staf_pgs_atasan` AS
SELECT
	`sw`.*,
	`a`.`staf_id` 								AS `staf_id`,
	`a`.`staf_kode` 							AS `staf_kode`,
	`a`.`staf_nama` 							AS `staf_nama`,
	IFNULL(`a`.`staf_isaktif`, 0) 				AS `staf_isaktif`,
	IFNULL(`a`.`staf_status`, 0) 				AS `staf_status`,
	`a`.`jabatan_id` 							AS `jabatan_id`,
	`a`.`jabatan_nama` 							AS `jabatan_nama`,
	`a`.`unit_id` 								AS `unit_id`,
	`a`.`unit_nama` 							AS `unit_nama`,
	`s`.`staf_kode` 							AS `staf_wakil_staf_kode`,
	`s`.`staf_nama` 							AS `staf_wakil_staf_nama`,
	IFNULL(`s`.`staf_isaktif`, 0) 				AS `staf_wakil_staf_isaktif`,
	IFNULL(`s`.`staf_status`, 0) 				AS `staf_wakil_staf_status`,
	`s`.`jabatan_id` 							AS `staf_wakil_staf_jabatan`,
	`s`.`jabatan_nama` 							AS `staf_wakil_staf_jabatan_nama`,
	`s`.`unit_id` 								AS `staf_wakil_staf_unit`,
	`s`.`unit_nama` 							AS `staf_wakil_staf_unit_nama`
FROM `staf_wakil` `sw`
LEFT JOIN `v_staf_lite` `a` 					ON `a`.`staf_id` = `sw`.`staf_wakil_asisten`
LEFT JOIN `v_staf_lite` `s` 					ON `s`.`staf_id` = `sw`.`staf_wakil_staf`
WHERE `sw`.`staf_wakil_plt` = 1 AND CURRENT_DATE <= DATE_FORMAT(`sw`.`staf_wakil_tgl_selesai`, '%Y-%m-%d')
;

CREATE OR REPLACE VIEW `v_staf_atasan` AS
SELECT
	`sw`.*,
	`a`.`staf_id` 								AS `staf_id`,
	`a`.`staf_kode` 							AS `staf_kode`,
	`a`.`staf_nama` 							AS `staf_nama`,
	IFNULL(`a`.`staf_isaktif`, 0) 				AS `staf_isaktif`,
	IFNULL(`a`.`staf_status`, 0) 				AS `staf_status`,
	`a`.`jabatan_id` 							AS `jabatan_id`,
	`a`.`jabatan_nama` 							AS `jabatan_nama`,
	`a`.`unit_id` 								AS `unit_id`,
	`a`.`unit_nama` 							AS `unit_nama`,
	`s`.`staf_kode` 							AS `staf_wakil_staf_kode`,
	`s`.`staf_nama` 							AS `staf_wakil_staf_nama`,
	IFNULL(`s`.`staf_isaktif`, 0) 				AS `staf_wakil_staf_isaktif`,
	IFNULL(`s`.`staf_status`, 0) 				AS `staf_wakil_staf_status`,
	`s`.`jabatan_id` 							AS `staf_wakil_staf_jabatan`,
	`s`.`jabatan_nama` 							AS `staf_wakil_staf_jabatan_nama`,
	`s`.`unit_id` 								AS `staf_wakil_staf_unit`,
	`s`.`unit_nama` 							AS `staf_wakil_staf_unit_nama`
FROM `staf_wakil` `sw`
LEFT JOIN `v_staf_lite` `a` 					ON `a`.`staf_id` = `sw`.`staf_wakil_asisten`
LEFT JOIN `v_staf_lite` `s` 					ON `s`.`staf_id` = `sw`.`staf_wakil_staf`
WHERE IFNULL(`sw`.`staf_wakil_plt`, 0) = 0
;

/*==================================================================*/
/* View: v_staf_pgs_aktif 									 		*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_pgs_aktif` AS 
SELECT
	`sw`.`staf_wakil_staf` AS `staf_wakil_staf`,
	`sw`.`staf_wakil_asisten` AS `staf_wakil_asisten`,
	`sw`.`staf_wakil_tgl_mulai` AS `staf_wakil_tgl_mulai`,
	`sw`.`staf_wakil_tgl_selesai` AS `staf_wakil_tgl_selesai`
FROM 
	`staf_wakil` `sw`
WHERE 
	`sw`.`staf_wakil_plt` = 1 
	-- AND DATE_FORMAT(`sw`.`staf_wakil_tgl_mulai`, '%Y-%m-%d') <= CURRENT_DATE AND 
	-- DATE_FORMAT(`sw`.`staf_wakil_tgl_selesai`, '%Y-%m-%d') >= CURRENT_DATE 
;

/*==================================================================*/
/* View: v_staf_aktual 									 			*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_staf_aktual` AS
SELECT
	`sa`.*,
	
	`pengirim`.`staf_id` 						AS `staf_aktual_pengirim_id`,
	`pengirim`.`staf_kode` 						AS `staf_aktual_pengirim_kode`,
	`pengirim`.`staf_nama` 						AS `staf_aktual_pengirim_nama`,
	`pengirim`.`staf_profil` 					AS `staf_aktual_pengirim_profil`,
	`pengirim`.`unit_id` 			 			AS `staf_aktual_pengirim_unit`,
	`pengirim`.`unit_kode` 			 			AS `staf_aktual_pengirim_unit_kode`,
	`pengirim`.`unit_nama` 			 			AS `staf_aktual_pengirim_unit_nama`,
	`pengirim`.`jabatan_id` 					AS `staf_aktual_pengirim_jabatan`,
	`pengirim`.`jabatan_kode` 					AS `staf_aktual_pengirim_jabatan_kode`,
	`pengirim`.`jabatan_nama` 					AS `staf_aktual_pengirim_jabatan_nama`,
	IFNULL(`pengirim`.`jabatan_isnomor`, 0) 	AS `staf_aktual_pengirim_jabatan_isnomor`,
	IFNULL(`pengirim`.`jabatan_ispenerima`, 0) 	AS `staf_aktual_pengirim_jabatan_ispenerima`,
	IFNULL(`pengirim`.`staf_isaktif`, 0) 		AS `staf_aktual_pengirim_isaktif`,
	IFNULL(`pengirim`.`staf_status`, 0) 		AS `staf_aktual_pengirim_status`,

	`penerima`.`staf_id` 						AS `staf_aktual_penerima_id`,
	`penerima`.`staf_kode` 						AS `staf_aktual_penerima_kode`,
	`penerima`.`staf_nama` 						AS `staf_aktual_penerima_nama`,
	`penerima`.`staf_profil` 					AS `staf_aktual_penerima_profil`,
	`penerima`.`unit_id` 			 			AS `staf_aktual_penerima_unit`,
	`penerima`.`unit_kode` 			 			AS `staf_aktual_penerima_unit_kode`,
	`penerima`.`unit_nama` 			 			AS `staf_aktual_penerima_unit_nama`,
	`penerima`.`jabatan_id` 					AS `staf_aktual_penerima_jabatan`,
	`penerima`.`jabatan_kode` 					AS `staf_aktual_penerima_jabatan_kode`,
	`penerima`.`jabatan_nama` 					AS `staf_aktual_penerima_jabatan_nama`,
	IFNULL(`penerima`.`jabatan_isnomor`, 0) 	AS `staf_aktual_penerima_jabatan_isnomor`,
	IFNULL(`penerima`.`jabatan_ispenerima`, 0) 	AS `staf_aktual_penerima_jabatan_ispenerima`,
	IFNULL(`penerima`.`staf_isaktif`, 0) 		AS `staf_aktual_penerima_isaktif`,
	IFNULL(`penerima`.`staf_status`, 0) 		AS `staf_aktual_penerima_status`,
	`penerima`.`akun_nama`						as `staf_aktual_penerima_akun_nama`

FROM `staf_aktual` `sa`
LEFT JOIN `v_staf_lite` `pengirim` ON `sa`.`staf_aktual_pengirim`=`pengirim`.`staf_id`
LEFT JOIN `v_staf_lite` `penerima` ON `sa`.`staf_aktual_penerima`=`penerima`.`staf_id`
WHERE `penerima`.`staf_isaktif` = 1
ORDER BY `sa`.`staf_aktual_tgl` DESC
;

/*==================================================================*/
/* View: v_jabatan 													*/
/* View: v_jabatan_musnah											*/
/* View: v_jabatan_hidup											*/
/* View: v_jabatan_aktif 											*/
/* View: v_jabatan_nonaktif											*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_jabatan_asisten_jumlah` AS 
SELECT
    `jw`.`jabatan_wakil_jabatan`,
    COUNT(`jw`.`jabatan_wakil_id`) AS `jabatan_wakil_jumlah`
FROM
    `jabatan_wakil` `jw`
GROUP BY `jw`.`jabatan_wakil_jabatan`;

CREATE OR REPLACE VIEW `v_jabatan_atasan_jumlah` AS 
SELECT
    `jw`.`jabatan_wakil_asisten`,
    COUNT(`jw`.`jabatan_wakil_id`) AS `jabatan_atasan_jumlah`
FROM
    `jabatan_wakil` `jw`
GROUP BY `jw`.`jabatan_wakil_asisten`;

CREATE OR REPLACE VIEW v_h_jabatan_jmlstaf AS
SELECT
	`s`.`staf_jabatan` as `jabatan_id`,
    COUNT(`s`.`staf_id`) as `jabatan_jmlstaf`
FROM `staf` `s`
WHERE `s`.`staf_isaktif` = 1 AND IFNULL(`s`.`staf_ishapus`, 0) = 0
GROUP BY `staf_jabatan`
HAVING `staf_jabatan` IS NOT NULL;

CREATE OR REPLACE VIEW v_h_jabatan_jmlunit AS
SELECT 
    `uc`.`unit_cakupan_jabatan` AS `jabatan_id`,
    COUNT(`uc`.`unit_cakupan_unit`) AS `jabatan_jmlunit`
FROM `unit_cakupan` `uc`
LEFT JOIN `unit` `u` on `uc`.`unit_cakupan_unit` = `u`.`unit_id`
LEFT JOIN `properti` `up` on `u`.`unit_properti` = `up`.`properti_id`
WHERE `u`.`unit_isaktif` = 1 AND IFNULL(`u`.`unit_ishapus`, 0) = 0
GROUP BY `uc`.`unit_cakupan_jabatan`
HAVING `uc`.`unit_cakupan_jabatan` IS NOT NULL;

CREATE OR REPLACE VIEW `v_jabatan` AS
SELECT 
    `j`.`jabatan_id` AS `jabatan_id`,
    `j`.`jabatan_nama` AS `jabatan_nama`,
    `j`.`jabatan_kode` AS `jabatan_kode`,
    `j`.`jabatan_pos_code` AS `jabatan_pos_code`,
    `j`.`jabatan_unit` AS `jabatan_unit`,
    `j`.`jabatan_induk` AS `jabatan_induk`,
    IFNULL(`j`.`jabatan_isaktif`, 0) AS `jabatan_isaktif`,
    IFNULL(`j`.`jabatan_isnomor`, 0) AS `jabatan_isnomor`,
    IFNULL(`j`.`jabatan_ispenerima`, 0) AS `jabatan_ispenerima`,
	`sj`.`jabatan_jmlstaf` AS `jabatan_staf_jumlah`,
	`uj`.`jabatan_jmlunit` AS `jabatan_unit_jumlah`,
	-- `jsj`.`jabatan_asisten_jumlah` AS `jabatan_asisten_jumlah`,
	-- `jaj`.`jabatan_atasan_jumlah` AS `jabatan_atasan_jumlah`,
    IFNULL(`j`.`jabatan_ishapus`, 0) AS `jabatan_ishapus`,
    `j`.`jabatan_parent_path` AS `jabatan_parent_path`,
    `j`.`jabatan_properti` AS `jabatan_properti`,
    `u`.`unit_id` AS `unit_id`,
    `u`.`unit_nama` AS `unit_nama`,
    `u`.`unit_kode` AS `unit_kode`,
    `u`.`unit_rubrik` AS `unit_rubrik`,
    IFNULL(`u`.`unit_isaktif`, 0) AS `unit_isaktif`,
    `u`.`unit_manager` AS `unit_manager`,
    `u`.`unit_induk` AS `unit_induk`,
    `u`.`unit_properti` AS `unit_properti`,
    `induk`.`jabatan_id` AS `jabatan_induk_id`,
    `induk`.`jabatan_nama` AS `jabatan_induk_nama`
FROM
    `jabatan` `j`
    LEFT JOIN `jabatan` `induk` ON `j`.`jabatan_induk` = `induk`.`jabatan_id`
	LEFT JOIN `unit` `u` ON `j`.`jabatan_unit` = `u`.`unit_id`
    LEFT JOIN `jabatan_staf_jumlah` `sj` FORCE INDEX(PRIMARY) ON `j`.`jabatan_id` = `sj`.`jabatan_id`
    LEFT JOIN `jabatan_unit_jumlah` `uj` FORCE INDEX(PRIMARY) ON `j`.`jabatan_id` = `uj`.`jabatan_id`
	-- LEFT JOIN `jabatan_asisten_jumlah` `jsj`  FORCE INDEX(PRIMARY) ON `j`.`jabatan_id` = `jsj`.`jabatan_wakil_jabatan`
	-- LEFT JOIN `jabatan_atasan_jumlah` `jaj` FORCE INDEX(PRIMARY) ON `j`.`jabatan_id` = `jaj`.`jabatan_wakil_asisten`
;

CREATE OR REPLACE VIEW `v_jabatan_musnah` AS
SELECT
	`j`.*
FROM `v_jabatan` `j`
WHERE `j`.`jabatan_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_jabatan_hidup` AS
SELECT
	`j`.*
FROM `v_jabatan` `j`
WHERE IFNULL(`j`.`jabatan_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_jabatan_aktif` AS
SELECT
	`j`.*
FROM `v_jabatan` `j`
WHERE IFNULL(`j`.`jabatan_ishapus`, 0) = 0 AND `j`.`jabatan_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_jabatan_nonaktif` AS
SELECT
	`j`.*
FROM `v_jabatan` `j`
WHERE IFNULL(`j`.`jabatan_ishapus`, 0) = 0 AND IFNULL(`j`.`jabatan_isaktif`, 0) = 0
;

/*==================================================================*/
/* View: v_jabatan_wakil 											*/
/* View: v_jabatan_asisten 											*/
/* View: v_jabatan_atasan 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_wakil` AS
SELECT
	`jw`.*,
	`a`.`jabatan_nama` 					AS `jabatan_wakil_asisten_jabatan_nama`,
	`a`.`jabatan_kode` 					AS `jabatan_wakil_asisten_jabatan_kode`,
	IFNULL(`a`.`jabatan_isaktif`, 0) 	AS `jabatan_wakil_asisten_jabatan_isaktif`,
	`s`.`jabatan_id` 					AS `jabatan_id`,
	`s`.`jabatan_nama` 					AS `jabatan_nama`,
	`s`.`jabatan_kode` 					AS `jabatan_kode`,
	IFNULL(`s`.`jabatan_isaktif`, 0) 	AS `jabatan_isaktif`
FROM `jabatan_wakil` `jw`
LEFT JOIN `jabatan` `a` 		ON `a`.`jabatan_id` = `jw`.`jabatan_wakil_asisten`
LEFT JOIN `jabatan` `s` 		ON `s`.`jabatan_id` = `jw`.`jabatan_wakil_jabatan`
;

CREATE OR REPLACE VIEW `v_jabatan_asisten` AS
SELECT
	`jw`.*,
	`a`.`jabatan_nama` 					AS `jabatan_wakil_asisten_jabatan_nama`,
	`a`.`jabatan_kode` 					AS `jabatan_wakil_asisten_jabatan_kode`,
	IFNULL(`a`.`jabatan_isaktif`, 0) 	AS `jabatan_wakil_asisten_jabatan_isaktif`,
	`s`.`jabatan_id` 					AS `jabatan_id`,
	`s`.`jabatan_nama` 					AS `jabatan_nama`,
	`s`.`jabatan_kode` 					AS `jabatan_kode`,
	IFNULL(`s`.`jabatan_isaktif`, 0) 	AS `jabatan_isaktif`
FROM `jabatan_wakil` `jw`
LEFT JOIN `jabatan` `a` 		ON `a`.`jabatan_id` = `jw`.`jabatan_wakil_asisten`
LEFT JOIN `jabatan` `s` 		ON `s`.`jabatan_id` = `jw`.`jabatan_wakil_jabatan`
;

CREATE OR REPLACE VIEW `v_jabatan_atasan` AS
SELECT
	`jw`.*,
	`a`.`jabatan_id` 				AS `jabatan_id`,
	`a`.`jabatan_nama` 				AS `jabatan_nama`,
	`a`.`jabatan_kode` 				AS `jabatan_kode`,
	IFNULL(`a`.`jabatan_isaktif`, 0)AS `jabatan_isaktif`,
	`s`.`jabatan_nama` 				AS `jabatan_wakil_jabatan_nama`,
	`s`.`jabatan_kode` 				AS `jabatan_wakil_jabatan_kode`,
	IFNULL(`s`.`jabatan_isaktif`, 0)AS `jabatan_wakil_jabatan_isaktif`
FROM `jabatan_wakil` `jw`
LEFT JOIN `jabatan` `a` 		ON `a`.`jabatan_id` = `jw`.`jabatan_wakil_asisten`
LEFT JOIN `jabatan` `s` 		ON `s`.`jabatan_id` = `jw`.`jabatan_wakil_jabatan`
;

/*==================================================================*/
/* View: v_jabatan_aktual 									 			*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_aktual` AS
SELECT
	`ja`.*,
	
	`pengirim`.`jabatan_id` 					AS `jabatan_aktual_pengirim_id`,
	`pengirim`.`jabatan_kode` 					AS `jabatan_aktual_pengirim_kode`,
	`pengirim`.`jabatan_nama` 					AS `jabatan_aktual_pengirim_nama`,
	`pengirim`.`unit_id` 			 			AS `jabatan_aktual_pengirim_unit`,
	`pengirim`.`unit_kode` 			 			AS `jabatan_aktual_pengirim_unit_kode`,
	`pengirim`.`unit_nama` 			 			AS `jabatan_aktual_pengirim_unit_nama`,
	`pengirim`.`jabatan_isnomor` 				AS `jabatan_aktual_pengirim_jabatan_isnomor`,
	`pengirim`.`jabatan_ispenerima` 			AS `jabatan_aktual_pengirim_jabatan_ispenerima`,
	`pengirim`.`jabatan_isaktif` 				AS `jabatan_aktual_pengirim_isaktif`,

	`penerima`.`jabatan_id` 					AS `jabatan_aktual_penerima_id`,
	`penerima`.`jabatan_kode` 					AS `jabatan_aktual_penerima_kode`,
	`penerima`.`jabatan_nama` 					AS `jabatan_aktual_penerima_nama`,
	`penerima`.`unit_id` 			 			AS `jabatan_aktual_penerima_unit`,
	`penerima`.`unit_kode` 			 			AS `jabatan_aktual_penerima_unit_kode`,
	`penerima`.`unit_nama` 			 			AS `jabatan_aktual_penerima_unit_nama`,
	`penerima`.`jabatan_isnomor` 				AS `jabatan_aktual_penerima_jabatan_isnomor`,
	`penerima`.`jabatan_ispenerima` 			AS `jabatan_aktual_penerima_jabatan_ispenerima`,
	`penerima`.`jabatan_isaktif` 				AS `jabatan_aktual_penerima_isaktif`

FROM `jabatan_aktual` `ja`
LEFT JOIN `v_jabatan` `pengirim` ON `ja`.`jabatan_aktual_pengirim`=`pengirim`.`jabatan_id`
LEFT JOIN `v_jabatan` `penerima` ON `ja`.`jabatan_aktual_penerima`=`penerima`.`jabatan_id`
WHERE `penerima`.`jabatan_isaktif` = 1
ORDER BY `ja`.`jabatan_aktual_tgl` DESC
;

/*==================================================================*/
/* View: v_jabatan_tim_anggota */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_tim_anggota` AS
SELECT
	`jta`.*,
	`jt`.*,
	`a`.`jabatan_id` 							AS `anggota_id`,
	`a`.`jabatan_kode` 							AS `anggota_kode`,
	`a`.`jabatan_nama` 							AS `anggota_nama`,
	`a`.`jabatan_unit`							AS `anggota_unit`,
	`a`.`unit_nama` 							AS `anggota_unit_nama`,
	IFNULL(`a`.`jabatan_isnomor`, 0) 			AS `anggota_jabatan_isnomor`,
	IFNULL(`a`.`jabatan_ispenerima`, 0) 		AS `anggota_jabatan_ispenerima`
FROM `jabatan_tim_anggota` `jta`
LEFT JOIN `jabatan_tim` `jt` 		FORCE INDEX(PRIMARY) 	ON `jta`.`jabatan_tim_anggota_tim` = `jt`.`jabatan_tim_id`
LEFT JOIN `v_jabatan_aktif` `a` 							ON `jta`.`jabatan_tim_anggota_jabatan` = `a`.`jabatan_id`
WHERE 
	IFNULL(`jt`.`jabatan_tim_ishapus`, 0) = 0 AND
	`a`.`jabatan_id` IS NOT NULL
;

/*==================================================================*/
/* View: v_jabatan_tim 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_tim_anggota_jumlah` AS 
SELECT
    `j`.`jabatan_tim_anggota_tim`,
    COUNT(`j`.`jabatan_tim_anggota_id`) AS `jabatan_tim_jumlah`
FROM
    `jabatan_tim_anggota` `j`
GROUP BY `j`.`jabatan_tim_anggota_tim`
HAVING 
    `j`.`jabatan_tim_anggota_tim` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_jabatan_kelompok_jumlah` AS 
SELECT
    `jt`.`jabatan_tim_anggota_jabatan`,
    COUNT(`jt`.`jabatan_tim_anggota_id`) AS `jabatan_kelompok_jumlah`
FROM
    `jabatan_tim_anggota` `jt`
GROUP BY `jt`.`jabatan_tim_anggota_jabatan`
;

CREATE OR REPLACE VIEW `v_jabatan_tim` AS
SELECT
	`jt`.*,
	`jtajt`.`jabatan_tim_jumlah` AS `jabatan_tim_jumlah`
FROM `jabatan_tim` `jt`
LEFT JOIN `jabatan_tim_anggota_jumlah` `jtajt` FORCE INDEX(PRIMARY) ON `jt`.`jabatan_tim_id` = `jtajt`.`jabatan_tim_anggota_tim`
;

/*==================================================================*/
/* View: v_jabatan_tim_hidup 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_tim_hidup` AS
SELECT
	`jt`.*
FROM `v_jabatan_tim` `jt`
WHERE IFNULL(`jt`.`jabatan_tim_ishapus`, 0) = 0
;

/*==================================================================*/
/* View: v_jabatan_tim_musnah 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jabatan_tim_musnah` AS
SELECT
	`jt`.*
FROM `v_jabatan_tim` `jt`
WHERE `jt`.`jabatan_tim_ishapus` = 1
;

/*==================================================================*/
/* View: v_kontak 													*/
/* View: v_kontak_musnah											*/
/* View: v_kontak_hidup												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_kontak` AS
SELECT
	`k`.`kontak_id`,
	`k`.`kontak_nama`,
	`k`.`kontak_properti`,
	IFNULL(`k`.`kontak_ishapus`, 0) AS `kontak_ishapus`
FROM `kontak` `k`
;

CREATE OR REPLACE VIEW `v_kontak_musnah` AS
SELECT
	`k`.*
FROM `v_kontak` `k`
WHERE `k`.`kontak_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_kontak_hidup` AS
SELECT
	`k`.*
FROM `v_kontak` `k`
WHERE IFNULL(`k`.`kontak_ishapus`, 0) = 0
;

/*==================================================================*/
/* View: v_jenis 													*/
/* View: v_jenis_musnah												*/
/* View: v_jenis_hidup												*/
/* View: v_jenis_aktif												*/
/* View: v_jenis_nonaktif											*/
/* View: v_jenis_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jenis` AS
SELECT
	`j`.`jenis_id`,
	`j`.`jenis_nama`,
	`j`.`jenis_kode`,
	IFNULL(`j`.`jenis_isaktif`,0)				AS `jenis_isaktif`,
	`j`.`jenis_tampil_sk`,
	`j`.`jenis_tampil_sm`,
	`j`.`jenis_tampil_si`,
	`j`.`jenis_tampil_sik`,
	`j`.`jenis_terpusat`,
	`j`.`jenis_nomor_awal`,
	`j`.`jenis_batasibackdate`,
	`j`.`jenis_batasipenerima`,
	`j`.`jenis_ttd`,
	`j`.`jenis_tipe`,
	`j`.`jenis_retensi`,
	IFNULL(`j`.`jenis_ishapus`,0)				AS `jenis_ishapus`,
	`j`.`jenis_properti`,
	IFNULL(`j`.`jenis_isbatas`,0)				AS `jenis_isbatas`,
	`j`.`jenis_batas_jumlah`
FROM `jenis` `j`
;

CREATE OR REPLACE VIEW `v_jenis_musnah` AS
SELECT
	`j`.*
FROM `v_jenis` `j`
WHERE `j`.`jenis_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_jenis_hidup` AS
SELECT
	`j`.*
FROM `v_jenis` `j`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_jenis_aktif` AS
SELECT
	`j`.*
FROM `v_jenis` `j`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0 AND `j`.`jenis_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_jenis_nonaktif` AS
SELECT
	`j`.*
FROM `v_jenis` `j`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0 AND IFNULL(`j`.`jenis_isaktif`, 0) = 0
;

CREATE OR REPLACE VIEW `v_jenis_lite` AS
SELECT
	`j`.`jenis_id`,
	`j`.`jenis_kode`,
	`j`.`jenis_nama`,
	`j`.`jenis_batasibackdate`,
	`j`.`jenis_batasipenerima`
FROM `jenis` `j`
;

CREATE OR REPLACE VIEW `v_jenis_perunit_aktif` AS
SELECT
	`j`.*
FROM `jenis` `j`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0 AND `j`.`jenis_isaktif` = 1 AND `j`.`jenis_tipe` = 1
;

CREATE OR REPLACE VIEW `v_jenis_umum_aktif` AS
SELECT
	`j`.*
FROM `jenis` `j`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0 AND `j`.`jenis_isaktif` = 1 AND IFNULL(`j`.`jenis_tipe`,0) = 0
;

CREATE OR REPLACE VIEW `v_jenis_unit` AS
SELECT
	`j`.`jenis_id`,
	`j`.`jenis_nama`,
	`j`.`jenis_kode`,
	`j`.`jenis_batasibackdate`,
	`j`.`jenis_batasipenerima`,
	`j`.`jenis_tampil_sk`,
	`j`.`jenis_tampil_sm`,
	`j`.`jenis_tampil_si`,
	`j`.`jenis_tampil_sik`,
	`j`.`jenis_terpusat`,
	`j`.`jenis_tipe`,
	`j`.`jenis_ttd`,
	`u`.`unit_id`,
	`u`.`unit_nama`,
	`u`.`unit_kode`,
	`u`.`unit_rubrik`,
	`ju`.`jenis_unit_id`,
	`ju`.`jenis_unit_jenis`,
	`ju`.`jenis_unit_unit`
FROM `jenis_unit` `ju`
LEFT JOIN `jenis` `j` ON `j`.`jenis_id` = `ju`.`jenis_unit_jenis`
LEFT JOIN `unit` `u` ON `u`.`unit_id` = `ju`.`jenis_unit_unit`
WHERE IFNULL(`j`.`jenis_ishapus`, 0) = 0 AND `j`.`jenis_isaktif` = 1 AND `j`.`jenis_tipe` = 1 AND IFNULL(`u`.`unit_ishapus`, 0) = 0 AND `u`.`unit_isaktif` = 1
;

/*==================================================================*/
/* View: v_itipe 													*/
/* View: v_itipe_musnah												*/
/* View: v_itipe_hidup												*/
/* View: v_itipe_aktif												*/
/* View: v_itipe_nonaktif											*/
/* View: v_itipe_lite												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_itipe` AS
-- SELECT
-- 	`j`.`jenis_id` AS `itipe_id`,
-- 	`j`.`jenis_nama` AS `itipe_nama`,
-- 	`j`.`jenis_kode` AS `itipe_kode`,
-- 	IFNULL(`j`.`jenis_isaktif`,0) AS `itipe_isaktif`,
-- 	`j`.`jenis_properti` AS `itipe_properti`
-- FROM `jenis` `j`
-- WHERE `jenis_tampil_si` = 1
-- ;

-- CREATE OR REPLACE VIEW `v_itipe_musnah` AS
-- SELECT
-- 	`i`.*
-- FROM `v_itipe` `i`
-- LEFT JOIN `v_properti_lite` `pro` ON `i`.`itipe_properti` = `pro`.`properti_id`
-- WHERE `pro`.`properti_ishapus` = 1
-- ;

-- CREATE OR REPLACE VIEW `v_itipe_hidup` AS
-- SELECT
-- 	`i`.*
-- FROM `v_itipe` `i`
-- LEFT JOIN `v_properti_lite` `pro` ON `i`.`itipe_properti` = `pro`.`properti_id`
-- WHERE `pro`.`properti_ishapus` = 0
-- ;

-- CREATE OR REPLACE VIEW `v_itipe_aktif` AS
-- SELECT
-- 	`i`.*
-- FROM `v_itipe` `i`
-- LEFT JOIN `v_properti_lite` `pro` ON `i`.`itipe_properti` = `pro`.`properti_id`
-- WHERE `pro`.`properti_ishapus` = 0 AND `i`.`itipe_isaktif` = 1
-- ;

-- CREATE OR REPLACE VIEW `v_itipe_nonaktif` AS
-- SELECT
-- 	`i`.*
-- FROM `v_itipe` `i`
-- LEFT JOIN `v_properti_lite` `pro` ON `i`.`itipe_properti` = `pro`.`properti_id`
-- WHERE `pro`.`properti_ishapus` = 0 AND `i`.`itipe_isaktif` = 0
-- ;

-- CREATE OR REPLACE VIEW `v_itipe_lite` AS
-- SELECT
-- 	`j`.`jenis_id` AS `itipe_id`,
-- 	`j`.`jenis_nama` AS `itipe_nama`,
-- 	`j`.`jenis_kode` AS `itipe_kode`
-- FROM `jenis` `j`
-- WHERE `jenis_tampil_si` = 1
-- ;

/*==================================================================*/
/* View: v_kelas 													*/
/* View: v_kelas_musnah												*/
/* View: v_kelas_hidup												*/
/* View: v_kelas_aktif												*/
/* View: v_kelas_nonaktif											*/
/* View: v_kelas_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_jumlah_leaf_by_kelas` AS
SELECT
	`k`.`kelas_induk`,
	COUNT(`k`.`kelas_id`) AS `kelas_jumlah_anak`
FROM `kelas` `k`
LEFT JOIN `properti` `p` on `k`.`kelas_properti` = `p`.`properti_id`
WHERE ISNULL(`p`.`properti_hapus_tgl`) AND `k`.`kelas_isaktif` = 1
GROUP BY `k`.`kelas_induk`
HAVING 
    `k`.`kelas_induk` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_kelas` AS
SELECT
	`k`.`kelas_id`,
	`k`.`kelas_nama`,
	`k`.`kelas_kode`,
	`k`.`kelas_retensi`,
	`k`.`kelas_limitdays`,
	`k`.`kelas_induk`,
	`k`.`kelas_parent_path`,
	`k`.`kelas_jenis`,
	IFNULL(`k`.`kelas_isaktif`,0)					AS `kelas_isaktif`,
	IFNULL(`k`.`kelas_ishapus`,0)					AS `kelas_ishapus`,
	`k`.`kelas_properti`,
	`induk`.`kelas_id` AS `kelas_induk_id`,
	`induk`.`kelas_nama` AS `kelas_induk_nama`,
	`j`.`jenis_id` AS `kelas_jenis_id`,
	`j`.`jenis_kode` AS `kelas_jenis_kode`,
	`j`.`jenis_nama` AS `kelas_jenis_nama`,
	IFNULL(`kj`.`kelas_jumlah_anak`,0)				AS `kelas_jumlah_anak`
FROM `kelas` `k`
LEFT JOIN `kelas` `induk` 								ON `induk`.`kelas_id` = `k`.`kelas_induk`
LEFT JOIN `kelas_jumlah_anak` `kj` FORCE INDEX(PRIMARY) ON `k`.`kelas_id` = `kj`.`kelas_induk`
LEFT JOIN `jenis` `j` 									ON `j`.`jenis_id` = `k`.`kelas_jenis`
;

CREATE OR REPLACE VIEW `v_kelas_musnah` AS
SELECT
	`k`.*
FROM `v_kelas` `k`
WHERE `k`.`kelas_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_kelas_hidup` AS
SELECT
	`k`.*
FROM `v_kelas` `k`
WHERE IFNULL(`k`.`kelas_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_kelas_aktif` AS
SELECT
	`k`.*
FROM `v_kelas` `k`
WHERE IFNULL(`k`.`kelas_ishapus`, 0) = 0 AND `k`.`kelas_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_kelas_aktif_combo` AS
SELECT
	`k`.*,
	IFNULL(`kj`.`kelas_jumlah_anak`,0)	AS `kelas_jumlah_anak`
FROM `kelas` `k`
LEFT JOIN `kelas_jumlah_anak` `kj` FORCE INDEX(PRIMARY) ON `k`.`kelas_id` = `kj`.`kelas_induk`
WHERE IFNULL(`k`.`kelas_ishapus`, 0) = 0 AND `k`.`kelas_isaktif` = 1 AND IFNULL(`kj`.`kelas_jumlah_anak`,0) = 0
;

CREATE OR REPLACE VIEW `v_kelas_nonaktif` AS
SELECT
	`k`.*
FROM `v_kelas` `k`
WHERE IFNULL(`k`.`kelas_ishapus`, 0) = 0 AND IFNULL(`k`.`kelas_isaktif`, 0) = 0
;

CREATE OR REPLACE VIEW `v_kelas_lite` AS
SELECT
	`k`.`kelas_id`,
	`k`.`kelas_kode`,
	`k`.`kelas_nama`
FROM `kelas` `k`
;

/*==================================================================*/
/* View: v_sifat 													*/
/* View: v_sifat_musnah												*/
/* View: v_sifat_hidup												*/
/* View: v_sifat_aktif												*/
/* View: v_sifat_nonaktif											*/
/* View: v_sifat_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_sifat` AS
SELECT
	`s`.`sifat_id`,
	`s`.`sifat_nama`,
	`s`.`sifat_kode`,
	`s`.`sifat_color`,
	IFNULL(`s`.`sifat_isaktif`,0)		AS `sifat_isaktif`,
	IFNULL(`s`.`sifat_israhasia`,0)		AS `sifat_israhasia`,
	IFNULL(`s`.`sifat_ishapus`,0)		AS `sifat_ishapus`,
	`s`.`sifat_properti`
FROM `sifat` `s`
;

CREATE OR REPLACE VIEW `v_sifat_musnah` AS
SELECT
	`s`.*
FROM `v_sifat` `s`
WHERE `s`.`sifat_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_sifat_hidup` AS
SELECT
	`s`.*
FROM `v_sifat` `s`
WHERE IFNULL(`s`.`sifat_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_sifat_aktif` AS
SELECT
	`s`.*
FROM `v_sifat` `s`
WHERE IFNULL(`s`.`sifat_ishapus`, 0) = 0 AND `s`.`sifat_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_sifat_nonaktif` AS
SELECT
	`s`.*
FROM `v_sifat` `s`
WHERE IFNULL(`s`.`sifat_ishapus`, 0) = 0 AND IFNULL(`s`.`sifat_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_sifat_lite` AS
SELECT
	`s`.`sifat_id`,
	`s`.`sifat_kode`,
	`s`.`sifat_color`,
	`s`.`sifat_nama`,
	IFNULL(`s`.`sifat_israhasia`,0)		AS `sifat_israhasia`,
	IFNULL(`s`.`sifat_isaktif`,0)		AS `sifat_isaktif`
FROM `sifat` `s`
;

/*==================================================================*/
/* View: v_prioritas 												*/
/* View: v_prioritas_musnah											*/
/* View: v_prioritas_hidup											*/
/* View: v_prioritas_aktif											*/
/* View: v_prioritas_nonaktif										*/
/* View: v_prioritas_lite											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_prioritas` AS
SELECT
	`p`.`prioritas_id`,
	`p`.`prioritas_nama`,
	`p`.`prioritas_kode`,
	`p`.`prioritas_retensi`,
	IFNULL(`p`.`prioritas_isaktif`,0)				AS `prioritas_isaktif`,
	IFNULL(`p`.`prioritas_ishapus`,0)				AS `prioritas_ishapus`,
	`p`.`prioritas_properti`
FROM `prioritas` `p`
;

CREATE OR REPLACE VIEW `v_prioritas_musnah` AS
SELECT
	`p`.*
FROM `v_prioritas` `p`
WHERE `p`.`prioritas_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_prioritas_hidup` AS
SELECT
	`p`.*
FROM `v_prioritas` `p`
WHERE IFNULL(`p`.`prioritas_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_prioritas_aktif` AS
SELECT
	`p`.*
FROM `v_prioritas` `p`
WHERE IFNULL(`p`.`prioritas_ishapus`, 0) = 0 AND `p`.`prioritas_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_prioritas_balas_aktif` AS
SELECT
	`p`.`prioritas_id` 		AS `balas_prioritas_id`,
	`p`.`prioritas_nama` 	AS `balas_prioritas_nama`,
	`p`.`prioritas_kode` 	AS `balas_prioritas_kode`,
	`p`.`prioritas_retensi` AS `balas_prioritas_retensi`
FROM `v_prioritas_aktif` `p`
;

CREATE OR REPLACE VIEW `v_prioritas_nonaktif` AS
SELECT
	`p`.*
FROM `v_prioritas` `p`
WHERE IFNULL(`p`.`prioritas_ishapus`, 0) = 0 AND IFNULL(`p`.`prioritas_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_prioritas_lite` AS
SELECT
	`p`.`prioritas_id`,
	`p`.`prioritas_kode`,
	`p`.`prioritas_nama`,
	`p`.`prioritas_retensi`
FROM `prioritas` `p`
;

/*==================================================================*/
/* View: v_golongan 												*/
/* View: v_golongan_musnah											*/
/* View: v_golongan_hidup											*/
/* View: v_golongan_aktif											*/
/* View: v_golongan_nonaktif										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_golongan` AS
SELECT
	`g`.`golongan_id`,
	`g`.`golongan_level`,
	`g`.`golongan_sgt`,
	`g`.`golongan_gaji_pokok`,
	IFNULL(`g`.`golongan_isaktif`,0)				AS `golongan_isaktif`,
	IFNULL(`g`.`golongan_ishapus`,0)				AS `golongan_ishapus`,
	`g`.`golongan_properti`
FROM `golongan` `g`
;

CREATE OR REPLACE VIEW `v_golongan_musnah` AS
SELECT
	`g`.*
FROM `v_golongan` `g`
WHERE `g`.`golongan_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_golongan_hidup` AS
SELECT
	`g`.*
FROM `v_golongan` `g`
WHERE IFNULL(`g`.`golongan_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_golongan_aktif` AS
SELECT
	`g`.*
FROM `v_golongan` `g`
WHERE IFNULL(`g`.`golongan_ishapus`, 0) = 0 AND `g`.`golongan_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_golongan_nonaktif` AS
SELECT
	`g`.*
FROM `v_golongan` `g`
WHERE IFNULL(`g`.`golongan_ishapus`, 0) = 0 AND IFNULL(`g`.`golongan_isaktif`,0) = 0
;

/*==================================================================*/
/* View: v_media 													*/
/* View: v_media_musnah												*/
/* View: v_media_hidup												*/
/* View: v_media_aktif												*/
/* View: v_media_nonaktif											*/
/* View: v_media_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_media` AS
SELECT
	`m`.`media_id`,
	`m`.`media_nama`,
	`m`.`media_kode`,
	IFNULL(`m`.`media_isaktif`,0)				AS `media_isaktif`,
	IFNULL(`m`.`media_ishapus`,0)				AS `media_ishapus`,
	`m`.`media_properti`
FROM `media` `m`
;

CREATE OR REPLACE VIEW `v_media_musnah` AS
SELECT
	`m`.*
FROM `v_media` `m`
WHERE `m`.`media_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_media_hidup` AS
SELECT
	`m`.*
FROM `v_media` `m`
WHERE IFNULL(`m`.`media_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_media_aktif` AS
SELECT
	`m`.*
FROM `v_media` `m`
WHERE IFNULL(`m`.`media_ishapus`, 0) = 0 AND `m`.`media_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_media_nonaktif` AS
SELECT
	`m`.*
FROM `v_media` `m`
WHERE IFNULL(`m`.`media_ishapus`, 0) = 0 AND IFNULL(`m`.`media_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_media_lite` AS
SELECT
	`m`.`media_id`,
	`m`.`media_kode`,
	`m`.`media_nama`
FROM `media` `m`
;

/*==================================================================*/
/* View: v_lokasi 													*/
/* View: v_lokasi_musnah											*/
/* View: v_lokasi_hidup												*/
/* View: v_lokasi_aktif												*/
/* View: v_lokasi_nonaktif											*/
/* View: v_lokasi_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_lokasi` AS
SELECT
	`l`.`lokasi_id`,
	`l`.`lokasi_nama`,
	`l`.`lokasi_kode`,
	`l`.`lokasi_induk`,
	IFNULL(`l`.`lokasi_isaktif`,0)				AS `lokasi_isaktif`,
	IFNULL(`l`.`lokasi_ishapus`,0)				AS `lokasi_ishapus`,
	`l`.`lokasi_properti`,
	`induk`.`lokasi_id` AS `lokasi_induk_id`,
	`induk`.`lokasi_nama` AS `lokasi_induk_nama`
FROM `lokasi` `l`
LEFT JOIN `lokasi` `induk` ON `induk`.`lokasi_id` = `l`.`lokasi_induk`
;

CREATE OR REPLACE VIEW `v_lokasi_musnah` AS
SELECT
	`l`.*
FROM `v_lokasi` `l`
WHERE `l`.`lokasi_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_lokasi_hidup` AS
SELECT
	`l`.*
FROM `v_lokasi` `l`
WHERE IFNULL(`l`.`lokasi_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_lokasi_aktif` AS
SELECT
	`l`.*
FROM `v_lokasi` `l`
WHERE IFNULL(`l`.`lokasi_ishapus`, 0) = 0 AND `l`.`lokasi_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_lokasi_nonaktif` AS
SELECT
	`l`.*
FROM `v_lokasi` `l`
WHERE IFNULL(`l`.`lokasi_ishapus`, 0) = 0 AND IFNULL(`l`.`lokasi_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_lokasi_lite` AS
SELECT
	`l`.`lokasi_id`,
	`l`.`lokasi_kode`,
	`l`.`lokasi_nama`
FROM `lokasi` `l`
;

/*==================================================================*/
/* View: v_ekspedisi 												*/
/* View: v_ekspedisi_musnah											*/
/* View: v_ekspedisi_hidup											*/
/* View: v_ekspedisi_aktif											*/
/* View: v_ekspedisi_nonaktif										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_ekspedisi` AS
SELECT
	`i`.`ekspedisi_id`,
	`i`.`ekspedisi_nama`,
	`i`.`ekspedisi_kode`,
	IFNULL(`i`.`ekspedisi_isaktif`,0)				AS `ekspedisi_isaktif`,
	IFNULL(`i`.`ekspedisi_ishapus`,0)				AS `ekspedisi_ishapus`,
	`i`.`ekspedisi_properti`
FROM `ekspedisi` `i`
;

CREATE OR REPLACE VIEW `v_ekspedisi_musnah` AS
SELECT
	`i`.*
FROM `v_ekspedisi` `i`
WHERE `i`.`ekspedisi_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_ekspedisi_hidup` AS
SELECT
	`i`.*
FROM `v_ekspedisi` `i`
WHERE IFNULL(`i`.`ekspedisi_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_ekspedisi_aktif` AS
SELECT
	`i`.*
FROM `v_ekspedisi` `i`
WHERE IFNULL(`i`.`ekspedisi_ishapus`, 0) = 0 AND `i`.`ekspedisi_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_ekspedisi_nonaktif` AS
SELECT
	`i`.*
FROM `v_ekspedisi` `i`
WHERE IFNULL(`i`.`ekspedisi_ishapus`, 0) = 0 AND IFNULL(`i`.`ekspedisi_isaktif`,0) = 0
;

/*==================================================================*/
/* View: v_retensi 													*/
/* View: v_retensi_musnah											*/
/* View: v_retensi_hidup											*/
/* View: v_retensi_aktif											*/
/* View: v_retensi_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_retensi` AS
SELECT
	`r`.`retensi_id`,
	`r`.`retensi_nama`,
	IFNULL(`r`.`retensi_hari`,0)				AS `retensi_hari`,
	IFNULL(`r`.`retensi_isaktif`,0)				AS `retensi_isaktif`,
	IFNULL(`r`.`retensi_ishapus`,0)				AS `retensi_ishapus`,
	`r`.`retensi_properti`
FROM `retensi` `r`
;

CREATE OR REPLACE VIEW `v_retensi_musnah` AS
SELECT
	`r`.*
FROM `v_retensi` `r`
WHERE `r`.`retensi_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_retensi_hidup` AS
SELECT
	`r`.*
FROM `v_retensi` `r`
WHERE IFNULL(`r`.`retensi_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_retensi_aktif` AS
SELECT
	`r`.*
FROM `v_retensi` `r`
WHERE IFNULL(`r`.`retensi_ishapus`, 0) = 0 AND `r`.`retensi_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_retensi_nonaktif` AS
SELECT
	`r`.*
FROM `v_retensi` `r`
WHERE IFNULL(`r`.`retensi_ishapus`, 0) = 0 AND IFNULL(`r`.`retensi_isaktif`,0) = 0
;

/*==================================================================*/
/* View: v_klise 													*/
/* View: v_klise_musnah												*/
/* View: v_klise_hidup												*/
/* View: v_klise_aktif												*/
/* View: v_klise_nonaktif											*/
/* View: v_klise_lite												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_klise` AS
SELECT
	`k`.`klise_id`,
	`k`.`klise_nama`,
	`k`.`klise_kelompok`,
	`k`.`klise_isi`,
	IFNULL(`k`.`klise_ispetikan`,0)				AS `klise_ispetikan`,
	IFNULL(`k`.`klise_isaktif`,0)				AS `klise_isaktif`,
	IFNULL(`k`.`klise_ishapus`,0)				AS `klise_ishapus`,
	`k`.`klise_properti`
FROM `klise` `k`
;

CREATE OR REPLACE VIEW `v_klise_musnah` AS
SELECT
	`k`.*
FROM `v_klise` `k`
WHERE `k`.`klise_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_klise_hidup` AS
SELECT
	`k`.*
FROM `v_klise` `k`
WHERE IFNULL(`k`.`klise_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_klise_aktif` AS
SELECT
	`k`.*
FROM `v_klise` `k`
WHERE IFNULL(`k`.`klise_ishapus`, 0) = 0 AND `k`.`klise_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_klise_nonaktif` AS
SELECT
	`k`.*
FROM `v_klise` `k`
WHERE IFNULL(`k`.`klise_ishapus`, 0) = 0 AND IFNULL(`k`.`klise_isaktif`,0) = 0
;

CREATE OR REPLACE VIEW `v_klise_lite` AS
SELECT
	`k`.`klise_id`,
	`k`.`klise_nama`
FROM `klise` `k`
;

/*==============================================================*/
/* View: v_klise_kelompok */
/*==============================================================*/
CREATE OR REPLACE VIEW `v_klise_kelompok` AS
SELECT
	`k`.`klise_kelompok`
FROM `klise` `k`
GROUP BY `k`.`klise_kelompok`
HAVING 
    `k`.`klise_kelompok` IS NOT NULL
;

/*==================================================================*/
/* View: v_arsip 													*/
/* View: v_arsip_musnah 											*/
/* View: v_arsip_hidup 												*/
/* View: v_arsip_umum 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_dokumen_jumlah` AS 
SELECT
    `d`.`dokumen_arsip`,
    SUM(
    CASE WHEN(
        `d`.`dokumen_isactive` = 1
	    ) THEN 1 ELSE 0 END 
	) as `surat_jumlah_dokumen`,
    SUM(
    CASE WHEN(
        `dokumen_isactive` = 1 AND `dokumen_reupload` = 1
	    ) THEN 1 ELSE 0 END 
	) as `surat_jumlah_dokumen_reupload`
FROM
    `dokumen` `d`
GROUP BY `d`.`dokumen_arsip`
;

CREATE OR REPLACE VIEW `v_arsip` AS
SELECT
	`a`.`arsip_id` 				AS `arsip_id`,
	IFNULL(`a`.`arsip_ishapus`,0) AS `arsip_ishapus`,
	`a`.`arsip_induk` 			AS `arsip_induk`,
	`a`.`arsip_nama` 			AS `arsip_nama`,
	`a`.`arsip_unit` 			AS `arsip_unit`,
	`a`.`arsip_bagi_tgl` 		AS `arsip_bagi_tgl`,
	`a`.`arsip_bagi_staf` 		AS `arsip_bagi_staf`,
	`a`.`arsip_buat_tgl` 		AS `arsip_buat_tgl`,
	`a`.`arsip_buat_staf` 		AS `arsip_buat_staf`,
	IFNULL(`a`.`arsip_isumum`,0) AS `arsip_isumum`,
	IFNULL(`a`.`arsip_isbagi`,0) AS `arsip_isbagi`,
	`sdj`.`surat_jumlah_dokumen` AS `arsip_jumlah_dokumen`,
	`a`.`arsip_properti`,
	`induk`.`arsip_id` 		AS `arsip_induk_id`,
	`induk`.`arsip_nama` 	AS `arsip_induk_nama`,
	`u`.`unit_id` 			AS `unit_id`,
	`u`.`unit_kode` 		AS `unit_kode`,
	`u`.`unit_nama` 		AS `unit_nama`,
	`s`.`staf_id` 			AS `staf_id`,
	`s`.`staf_kode` 		AS `staf_kode`,
	`s`.`staf_nama` 		AS `staf_nama`,
	`a`.`arsip_buat_tgl` 					AS `properti_buat_tgl`,
	`arsip_buat_staf`.`staf_id` 			AS `properti_pembuat_id`,
	`arsip_buat_staf`.`staf_kode` 			AS `properti_pembuat_kode`,
	`arsip_buat_staf`.`staf_nama` 			AS `properti_pembuat_nama`,
	`arsip_buat_unit`.`unit_id` 			AS `properti_pembuat_unit`,
	`arsip_buat_unit`.`unit_nama` 			AS `properti_pembuat_unit_nama`,
	`arsip_buat_jabatan`.`jabatan_id` 		AS `properti_pembuat_jabatan`,
	`arsip_buat_jabatan`.`jabatan_nama` 	AS `properti_pembuat_jabatan_nama`
FROM `arsip` `a`
LEFT JOIN `arsip` `induk` 										ON `a`.`arsip_induk` = `induk`.`arsip_id`
LEFT JOIN `surat_dokumen_jumlah` `sdj` 	FORCE INDEX(PRIMARY) 	ON `a`.`arsip_id` = `sdj`.`dokumen_arsip`
LEFT JOIN `unit` `u` 											ON `u`.`unit_id` = `a`.`arsip_unit`
LEFT JOIN `staf` `s` 											ON `s`.`staf_id` = `a`.`arsip_bagi_staf`
LEFT JOIN `staf` `arsip_buat_staf` 								ON `arsip_buat_staf`.`staf_id` = `a`.`arsip_buat_staf`
LEFT JOIN `jabatan` `arsip_buat_jabatan` 						ON `arsip_buat_jabatan`.`jabatan_id` = `arsip_buat_staf`.`staf_jabatan`
LEFT JOIN `unit` `arsip_buat_unit` 								ON `arsip_buat_unit`.`unit_id` = `arsip_buat_staf`.`staf_unit`
;

CREATE OR REPLACE VIEW `v_arsip_musnah` AS
SELECT
	`a`.*
FROM `v_arsip` `a`
WHERE `a`.`arsip_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_arsip_hidup` AS
SELECT
	`a`.*
FROM `v_arsip` `a`
WHERE IFNULL(`a`.`arsip_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_arsip_umum` AS
SELECT
	`a`.*
FROM `v_arsip` `a`
WHERE IFNULL(`a`.`arsip_ishapus`,0) = 0 AND `a`.`arsip_isumum` = 1
;

/*==================================================================*/
/* View: v_arsip_bagi 													*/
/*==================================================================*/


CREATE OR REPLACE VIEW `v_arsip_bagi` AS
SELECT
	`ab`.*,
	`a`.*,
	`u`.`unit_id` 			AS `arsip_bagi_unit_id`,
	`u`.`unit_kode` 		AS `arsip_bagi_unit_kode`,
	`u`.`unit_nama` 		AS `arsip_bagi_unit_nama`
FROM `arsip_bagi` `ab`
LEFT JOIN `v_arsip_hidup` `a` ON `ab`.`arsip_bagi_arsip` = `a`.`arsip_id`
LEFT JOIN `unit` `u` 		ON `u`.`unit_id` = `ab`.`arsip_bagi_unit`
;

/*==================================================================*/
/* View: v_dokumen 													*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_dokumen` AS
SELECT
	`d`.*,
	`a`.*,
	`prev`.`dokumen_id` 						AS `dokumen_prev_id`,
	`prev`.`dokumen_nama` 						AS `dokumen_prev_nama`,
	`prev`.`dokumen_file` 						AS `dokumen_prev_file`,
	`prev`.`dokumen_preview`					AS `dokumen_prev_preview`,
	`induk`.`dokumen_id` 						AS `dokumen_induk_id`,
	`induk`.`dokumen_nama` 						AS `dokumen_induk_nama`,
	`induk`.`dokumen_file` 						AS `dokumen_induk_file`,
	`induk`.`dokumen_preview`					AS `dokumen_induk_preview`,
	`d`.`dokumen_buat_tgl`						AS `properti_buat_tgl`,
	`sp`.`staf_profil_staf`						AS `properti_pembuat_id`,
	`sp`.`staf_profil_staf_nama`				AS `properti_pembuat_nama`,
	`s`.`staf_kode`								AS `properti_pembuat_kode`,
	`sp`.`staf_profil_jabatan`					AS `properti_pembuat_jabatan`,
	`sp`.`staf_profil_jabatan_nama`				AS `properti_pembuat_jabatan_nama`,
	`sp`.`staf_profil_unit`						AS `properti_pembuat_unit`,
	`sp`.`staf_profil_unit_nama`				AS `properti_pembuat_unit_nama`,
  	`pelaku_profil`.`staf_profil_staf` 			AS `pelaku_id`,
  	`pelaku_profil`.`staf_profil_staf_nama` 	AS `pelaku_nama`,
  	`pelaku_profil`.`staf_profil_unit` 			AS `pelaku_unit_id`,
  	`pelaku_profil`.`staf_profil_unit_nama` 	AS `pelaku_unit_nama`,
  	`pelaku_profil`.`staf_profil_jabatan` 		AS `pelaku_jabatan_id`,
  	`pelaku_profil`.`staf_profil_jabatan_nama` 	AS `pelaku_jabatan_nama`

	-- `p`.*
FROM `dokumen` `d`
LEFT JOIN `arsip` `a` 							ON `d`.`dokumen_arsip` = `a`.`arsip_id`
LEFT JOIN `dokumen` `prev` 						ON `d`.`dokumen_previous` = `prev`.`dokumen_id`
LEFT JOIN `dokumen` `induk` 					ON `d`.`dokumen_induk` = `induk`.`dokumen_id`
LEFT JOIN `v_staf_lite` `s`		 				ON `d`.`dokumen_buat_staf` = `s`.`staf_id`
LEFT JOIN `staf_profil` `sp`		 			ON `d`.`dokumen_buat_profil` = `sp`.`staf_profil_id`
LEFT JOIN `v_staf_lite` `pelaku` 				ON `d`.`dokumen_buat_pelaku` = `pelaku`.`staf_id`
LEFT JOIN `staf_profil` `pelaku_profil`		 	ON `d`.`dokumen_buat_pelaku_profil` = `pelaku_profil`.`staf_profil_id`
-- LEFT JOIN `v_properti` `p` 						ON `d`.`dokumen_properti` = `p`.`properti_id`
;

/*==================================================================*/
/* View: v_dokumen_surat 													*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_dokumen_surat` AS
SELECT
	`a`.`arsip_id`,

	`d`.`dokumen_id`,
	`d`.`dokumen_nama`,
	`d`.`dokumen_isactive`,
	`d`.`dokumen_ext`,
	IFNULL(`d`.`dokumen_isimport`,0) 	AS `dokumen_isimport`,

	`s`.`surat_nomor`,
	`s`.`surat_perihal`,
	`s`.`surat_tanggal`,
	`s`.`surat_retensi_tgl`,
	`s`.`surat_israhasia`,
	`s`.`surat_model`,

	`u`.`unit_id`,
	`u`.`unit_kode`,
	`u`.`unit_nama`,

	`k`.`kelas_id`,
	`k`.`kelas_kode`,
	`k`.`kelas_nama`

FROM `dokumen` `d`
LEFT JOIN `arsip` `a`		 					ON `d`.`dokumen_arsip` = `a`.`arsip_id`
LEFT JOIN `surat` `s`	 						ON `a`.`arsip_id` = `s`.`surat_arsip`
LEFT JOIN `unit` `u` 							ON `s`.`surat_unit` = `u`.`unit_id`
LEFT JOIN `kelas` `k` 							ON `s`.`surat_kelas` = `k`.`kelas_id`
;

/*==================================================================*/
/* View: v_r_staf_akses 											*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_r_staf_akses` AS 
SELECT
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  `peran`.`peran_nama` AS `peran_nama`,
  COUNT(`peran`.`peran_nama`) AS `count_peran`,
  SUM(CASE WHEN `staf_isaktif` = 1 THEN 1 ELSE 0 END) AS `count_aktif`,
  SUM(CASE WHEN IFNULL(`staf_isaktif`,0) = 0 THEN 1 ELSE 0 END) AS `count_nonaktif`
FROM `staf` `s`
LEFT JOIN `peran`
    ON `peran`.`peran_id` = `s`.`staf_peran`
-- LEFT JOIN `properti` `pro`
--     ON `pro`.`properti_id` = `s`.`staf_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `s`.`staf_unit`
WHERE 
    IFNULL(`s`.`staf_ishapus`,0) = 0
GROUP BY `unit`.`unit_nama`,
  `peran`.`peran_nama` 
ORDER BY `unit`.`unit_nama` ASC, `peran`.`peran_nama`
;

/*==================================================================*/
/* View: v_r_rekap_staf */
/*==================================================================*/
CREATE OR REPLACE VIEW v_r_rekap_staf AS 
SELECT 
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  COUNT(`staf`.`staf_id`) AS `jumlah_staf`,
  SUM((
    CASE
      WHEN (`staf`.`staf_isaktif` = 1) 
      THEN 1 ELSE 0 END
  )) AS `jumlah_akun_staf_aktif`,
  SUM((
    CASE 
      WHEN (IFNULL(`staf`.`staf_isaktif`,0) = 0)
      THEN 1 ELSE 0 END
  )) AS `jumlah_akun_staf_nonaktif`
  FROM `staf` 
LEFT JOIN `unit` 
  ON `staf`.`staf_unit` = `unit`.`unit_id`
  WHERE 
    IFNULL(`staf`.`staf_ishapus`,0) = 0
  GROUP BY `unit_id`
  ORDER BY `unit_nama`;

/*==================================================================*/
/* View: v_surat */
/*==================================================================*/

CREATE OR REPLACE VIEW `v_surat_setuju_jumlah` AS 
SELECT
    `s`.`surat_stack_surat` AS `surat_setuju_surat`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 1 AND 
	    `s`.`surat_stack_status` = 2
	    ) THEN 1 ELSE 0 END 
	) as `surat_setuju_setuju`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 1 AND 
	    `s`.`surat_stack_status` = 4
	    ) THEN 1 ELSE 0 END 
	) as `surat_setuju_tolak`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 1 AND 
	    IFNULL(`s`.`surat_stack_status`,0) = 0
	    ) THEN 1 ELSE 0 END 
	) as `surat_setuju_pending`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 1
	    ) THEN 1 ELSE 0 END 
	) as `surat_setuju_total`
FROM
    `surat_stack` `s`
GROUP BY `s`.`surat_stack_surat`
;

CREATE OR REPLACE VIEW `v_surat_petikan_setuju_jumlah` AS 
SELECT
    `s`.`surat_stack_surat` AS `surat_petikan_setuju_surat`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 2 AND 
	    `s`.`surat_stack_status` = 2
	    ) THEN 1 ELSE 0 END 
	) as `surat_petikan_setuju_setuju`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 2 AND 
	    `s`.`surat_stack_status` = 4
	    ) THEN 1 ELSE 0 END 
	) as `surat_petikan_setuju_tolak`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 2 AND 
	    IFNULL(`s`.`surat_stack_status`,0) = 0
	    ) THEN 1 ELSE 0 END 
	) as `surat_petikan_setuju_pending`,
    SUM(
    CASE WHEN(
        `s`.`surat_stack_model` = 2
	    ) THEN 1 ELSE 0 END 
	) as `surat_petikan_setuju_total`
FROM
    `surat_stack` `s`
GROUP BY `s`.`surat_stack_surat`
;

CREATE OR REPLACE VIEW `v_surat_imasuk_jumlah_setuju` AS 
SELECT
    `s`.`surat_korespondensi_surat` AS `surat_imasuk_surat`,
    COUNT(DISTINCT `s`.`surat_unit`) AS `surat_imasuk_setuju`
FROM
    `surat` `s`
WHERE 
    `s`.`surat_setuju` = 2
GROUP BY `s`.`surat_korespondensi_surat`
;

CREATE OR REPLACE VIEW `v_surat_imasuk_jumlah_pending` AS 
SELECT
    `s`.`surat_korespondensi_surat` AS `surat_imasuk_pending_surat`,
    COUNT(DISTINCT `s`.`surat_unit`) AS `surat_imasuk_pending`
FROM
    `surat` `s`
WHERE 
    IFNULL(`s`.`surat_setuju`,0) = 0
GROUP BY `s`.`surat_korespondensi_surat`
;

CREATE OR REPLACE VIEW `v_surat_imasuk_jumlah_tolak` AS 
SELECT
    `s`.`surat_korespondensi_surat` AS `surat_imasuk_tolak_surat`,
    COUNT(DISTINCT `s`.`surat_unit`) AS `surat_imasuk_tolak`
FROM
    `surat` `s`
WHERE 
    `s`.`surat_setuju` = 4
GROUP BY `s`.`surat_korespondensi_surat`
;

CREATE OR REPLACE VIEW `v_surat_imasuk_jumlah` AS 
SELECT
    `s`.`surat_korespondensi_surat` AS `surat_imasuk_surat`,
    COUNT(DISTINCT `s`.`surat_unit`) AS `surat_imasuk_total`
FROM
    `surat` `s`
GROUP BY `s`.`surat_korespondensi_surat`
;

-- CREATE OR REPLACE VIEW `v_surat_sla_tolak_jumlah` AS 
-- SELECT
--     `s`.`surat_korespondensi_surat` AS `surat_sla_tolak_surat`,
--     COUNT(DISTINCT `s`.`surat_unit`) AS `surat_sla_tolak_jumlah`
-- FROM
--     `surat` `s`
-- WHERE
--     `s`.`surat_sla_tolak_tgl` IS NOT NULL
-- GROUP BY `s`.`surat_korespondensi_surat`
-- ;

-- CREATE OR REPLACE VIEW `v_surat_ulasan_jumlah` AS 
-- SELECT
--     `s`.`surat_ulasan_surat`,
--     COUNT(`s`.`surat_ulasan_id`) AS `surat_ulasan_jumlah`,
--     SUM(`s`.`surat_ulasan_nilai`) AS `surat_ulasan_nilai`
-- FROM
--     `surat_ulasan` `s`
-- GROUP BY `s`.`surat_ulasan_surat`
-- ;

-- CREATE OR REPLACE VIEW `v_surat_imasuk_ulasan_jumlah` AS 
-- SELECT
--     `s`.`surat_korespondensi_surat` AS `surat_imasuk_ulasan_surat`,
--     COUNT(DISTINCT `s`.`surat_unit`) AS `surat_imasuk_ulasan_jumlah`
-- FROM
--     `surat` `s`
-- GROUP BY `s`.`surat_korespondensi_surat`
-- ;

/*==================================================================*/
/* View: v_surat_libnomor 											*/
/*==================================================================*/

CREATE OR REPLACE VIEW v_surat_libnomor_list AS
SELECT
  `libnomor`.`surat_libnomor_id`                		AS `surat_libnomor_id`,
  `libnomor`.`surat_libnomor_model`             		AS `surat_libnomor_model`,
  `libnomor`.`surat_libnomor_tahun`             		AS `surat_libnomor_tahun`,
  `libnomor`.`surat_libnomor_unit_pembuat`      		AS `surat_libnomor_unit_pembuat`,
  `libnomor`.`surat_libnomor_jenis`             		AS `surat_libnomor_jenis`,
  `libnomor`.`surat_libnomor_value`             		AS `surat_libnomor_value`,
  `libnomor`.`surat_libnomor_booking`           		AS `surat_libnomor_booking`,
  `libnomor`.`surat_libnomor_last_generated`    		AS `surat_libnomor_last_generated`,
  `unitBuat`.`unit_nama`                        		AS `unit_pembuat_nama`,
  `jenis`.`jenis_nama`                          		AS `jenis_nama`
FROM `surat_libnomor` `libnomor`
LEFT JOIN `unit` `unitBuat` 	 	ON `unitBuat`.`unit_id` = `libnomor`.`surat_libnomor_unit_pembuat`
LEFT JOIN `jenis` `jenis` 			ON `jenis`.`jenis_id` = `libnomor`.`surat_libnomor_jenis`;

/*==================================================================*/
/* View: v_surat 											*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_surat` AS
SELECT
	`s`.`surat_id`,
	`s`.`surat_arsip`,
	IFNULL(`s`.`surat_model`,0) 							AS `surat_model`,
	IFNULL(`s`.`surat_model_sub`,0) 						AS `surat_model_sub`,
	-- `s`.`surat_itipe`,
	`s`.`surat_registrasi`,
	`s`.`surat_nomor`,
	(`s`.`surat_nomor` IS NOT NULL)							AS `surat_isnomor`,
	`s`.`surat_agenda`,
	`s`.`surat_agenda_sub`,
	`s`.`surat_tanggal`,
	`s`.`surat_berlaku_tgl`,
	`s`.`surat_perihal`,
	`s`.`surat_pengirim`,
	`s`.`surat_tujuan`,
	`s`.`surat_kepada`,
	`s`.`surat_alamat`,
	`s`.`surat_lampiran`,
	`s`.`surat_lampiran_sub`,
	`s`.`surat_ringkasan`,
	`s`.`surat_catatan`,
	`s`.`surat_korespondensi`,
	`s`.`surat_korespondensi_surat`,
	`s`.`surat_lokasi`,
	`s`.`surat_lokasi_sub`,
	`s`.`surat_kelas`,
	`s`.`surat_jenis`,
	`s`.`surat_jenis_sub`,
	`s`.`surat_sifat`,
	`s`.`surat_media`,
	`s`.`surat_prioritas`,
	`s`.`surat_prioritas_tgl`,
	`s`.`surat_tmt`,
	`s`.`surat_retensi_tgl`,
	`s`.`surat_inaktif_tgl`,
	IFNULL(`s`.`surat_useretensi`,0) 						AS `surat_useretensi`,
	`s`.`surat_properti`,
	`s`.`surat_keterangan`,
	`s`.`surat_unit`,
	`s`.`surat_unit_source`,
	IFNULL(`s`.`surat_setuju`,0) 							AS `surat_setuju`,
	`s`.`surat_setuju_tgl`,
	`s`.`surat_setuju_komentar`,
	IFNULL(`s`.`surat_setuju_isurut`,0) 					AS `surat_setuju_isurut`,
	IFNULL(`s`.`surat_usesetuju`,0) 						AS `surat_usesetuju`,
	`s`.`surat_setuju_staf`,
	`s`.`surat_setuju_profil`,
	`s`.`surat_petikan_setuju`,
	`s`.`surat_petikan_akhir_staf`,
	IFNULL(`s`.`surat_petikan_setuju_isurut`,0) 			AS `surat_petikan_setuju_isurut`,
	(`s`.`surat_distribusi_tgl` IS NOT NULL)				AS `surat_isdistribusi`,
	`s`.`surat_distribusi_tgl`,
	`s`.`surat_distribusi_staf`,
	`s`.`surat_distribusi_profil`,
	`s`.`surat_distribusi_otomatis`,
	(`s`.`surat_selesai_tgl` IS NOT NULL)					AS `surat_isselesai`,
	`s`.`surat_selesai_tgl`,
	`s`.`surat_selesai_staf`,
	`s`.`surat_selesai_profil`,
	(`s`.`surat_terima_staf` IS NOT NULL)					AS `surat_isterima`,
	`s`.`surat_terima_staf`,

	`s`.`surat_buat_tgl`,
	`s`.`surat_buat_staf`,
	`s`.`surat_buat_profil`,
	IFNULL(`s`.`surat_ishapus`,0) 							AS `surat_ishapus`,

	(`s`.`surat_ekspedisi_tgl` IS NOT NULL)					AS `surat_isekspedisi`,
	`s`.`surat_ekspedisi_tgl`,
	`s`.`surat_ekspedisi`,
	`s`.`surat_ekspedisi_staf`,
	`s`.`surat_ekspedisi_profil`,
	IFNULL(`s`.`surat_usebalas`,0) 							AS `surat_usebalas`,
	IFNULL(`s`.`surat_useberkas`,0) 						AS `surat_useberkas`,
	IFNULL(`s`.`surat_israhasia`,0) 						AS `surat_israhasia`,

	(`s`.`surat_arah_tgl` IS NOT NULL)						AS `surat_isarah`,
	`s`.`surat_arah_tgl`,
	`s`.`surat_arah_staf`,
	`s`.`surat_arah_profil`,

	`s`.`surat_nomor_tgl`,
	`s`.`surat_nomor_staf`,
	`s`.`surat_nomor_profil`,
	`s`.`surat_nomor_format`,
	`s`.`surat_nomor_otomatis`,
	`s`.`surat_nomor_booking`,
	`s`.`surat_nomor_urut`,
	`s`.`surat_nomor_backdate`,
	`s`.`surat_nomor_asli`,
	IFNULL(`s`.`surat_isbackdate`,0) 						AS `surat_isbackdate`,
	IFNULL(`s`.`surat_isbooking`,0) 						AS `surat_isbooking`,

	IFNULL(`s`.`surat_nomor_issalin`,0) 					AS `surat_nomor_issalin`,
	IFNULL(`s`.`surat_nomor_isbatal`,0) 					AS `surat_nomor_isbatal`,
	`s`.`surat_nomor_batal_tgl`,
	`s`.`surat_nomor_batal_staf`,
	`s`.`surat_nomor_batal_profil`,

	IFNULL(`s`.`surat_ismusnah`,0) 							AS `surat_ismusnah`,
	`s`.`surat_musnah_tgl`,
	`s`.`surat_musnah_staf`,
	`s`.`surat_musnah_profil`,
	IFNULL(`s`.`surat_isarsip`,0) 							AS `surat_isarsip`,
	`s`.`surat_arsip_tgl`,
	`s`.`surat_arsip_staf`,
	`s`.`surat_arsip_profil`,
	
	IFNULL(`s`.`surat_distribusi_iscabut`,0) 				AS `surat_distribusi_iscabut`,
	`s`.`surat_distribusi_cabut_tgl`,
	`s`.`surat_distribusi_cabut_staf`,
	`s`.`surat_distribusi_cabut_profil`,
	`s`.`surat_distribusi_cabut_pesan`,

	`s`.`surat_setuju_akhir_staf`,
	
	`surat_distribusi_profil`.`staf_profil_staf` 			AS `distributor_id`,
	`surat_distribusi_staf`.`staf_kode` 					AS `distributor_kode`,
	`surat_distribusi_profil`.`staf_profil_staf_nama` 		AS `distributor_nama`,
	`surat_distribusi_profil`.`staf_profil_unit` 			AS `distributor_unit`,
	`surat_distribusi_staf`.`unit_kode` 					AS `distributor_unit_kode`,
	`surat_distribusi_profil`.`staf_profil_unit_nama` 		AS `distributor_unit_nama`,
	`surat_distribusi_staf`.`unit_rubrik` 					AS `distributor_unit_rubrik`,
	`surat_distribusi_profil`.`staf_profil_jabatan` 		AS `distributor_jabatan`,
	`surat_distribusi_staf`.`jabatan_kode` 					AS `distributor_jabatan_kode`,
	`surat_distribusi_profil`.`staf_profil_jabatan_nama` 	AS `distributor_jabatan_nama`,

	`surat_nomor_batal_profil`.`staf_profil_staf` 			AS `pembatal_id`,
	`surat_nomor_batal_profil`.`staf_profil_staf_nama` 		AS `pembatal_nama`,
	`surat_nomor_batal_profil`.`staf_profil_unit` 			AS `pembatal_unit`,
	`surat_nomor_batal_profil`.`staf_profil_unit_nama` 		AS `pembatal_unit_nama`,
	`surat_nomor_batal_profil`.`staf_profil_jabatan` 		AS `pembatal_jabatan`,
	`surat_nomor_batal_profil`.`staf_profil_jabatan_nama` 	AS `pembatal_jabatan_nama`,

	-- `surat_musnah_profil`.`staf_profil_staf` 				AS `pemusnah_id`,
	-- `surat_musnah_profil`.`staf_profil_staf_nama` 			AS `pemusnah_nama`,
	-- `surat_musnah_profil`.`staf_profil_unit` 				AS `pemusnah_unit`,
	-- `surat_musnah_profil`.`staf_profil_unit_nama` 			AS `pemusnah_unit_nama`,
	-- `surat_musnah_profil`.`staf_profil_jabatan` 			AS `pemusnah_jabatan`,
	-- `surat_musnah_profil`.`staf_profil_jabatan_nama` 		AS `pemusnah_jabatan_nama`,

	-- `surat_arsip_profil`.`staf_profil_staf` 				AS `pengarsip_id`,
	-- `surat_arsip_profil`.`staf_profil_staf_nama` 			AS `pengarsip_nama`,
	-- `surat_arsip_profil`.`staf_profil_unit` 				AS `pengarsip_unit`,
	-- `surat_arsip_profil`.`staf_profil_unit_nama` 			AS `pengarsip_unit_nama`,
	-- `surat_arsip_profil`.`staf_profil_jabatan` 				AS `pengarsip_jabatan`,
	-- `surat_arsip_profil`.`staf_profil_jabatan_nama` 		AS `pengarsip_jabatan_nama`,

	`surat_distribusi_cabut_profil`.`staf_profil_staf` 				AS `distributor_cabut_id`,
	`surat_distribusi_cabut_profil`.`staf_profil_staf_nama` 		AS `distributor_cabut_nama`,
	`surat_distribusi_cabut_profil`.`staf_profil_unit` 				AS `distributor_cabut_unit`,
	`surat_distribusi_cabut_profil`.`staf_profil_unit_nama` 		AS `distributor_cabut_unit_nama`,
	`surat_distribusi_cabut_profil`.`staf_profil_jabatan` 			AS `distributor_cabut_jabatan`,
	`surat_distribusi_cabut_profil`.`staf_profil_jabatan_nama` 		AS `distributor_cabut_jabatan_nama`,

	`surat_selesai_profil`.`staf_profil_staf` 				AS `penyelesai_id`,
	`surat_selesai_staf`.`staf_kode` 						AS `penyelesai_kode`,
	`surat_selesai_profil`.`staf_profil_staf_nama` 			AS `penyelesai_nama`,
	`surat_selesai_profil`.`staf_profil_unit` 				AS `penyelesai_unit`,
	`surat_selesai_staf`.`unit_kode` 						AS `penyelesai_unit_kode`,
	`surat_selesai_profil`.`staf_profil_unit_nama` 			AS `penyelesai_unit_nama`,
	`surat_selesai_staf`.`unit_rubrik` 						AS `penyelesai_unit_rubrik`,
	`surat_selesai_profil`.`staf_profil_jabatan` 			AS `penyelesai_jabatan`,
	`surat_selesai_staf`.`jabatan_kode` 					AS `penyelesai_jabatan_kode`,
	`surat_selesai_profil`.`staf_profil_jabatan_nama` 		AS `penyelesai_jabatan_nama`,

	`surat_setuju_profil`.`staf_profil_staf` 				AS `penyetuju_id`,
	`surat_setuju_staf`.`staf_kode` 						AS `penyetuju_kode`,
	`surat_setuju_profil`.`staf_profil_staf_nama` 			AS `penyetuju_nama`,
	`surat_setuju_profil`.`staf_profil_unit` 				AS `penyetuju_unit`,
	`surat_setuju_staf`.`unit_kode` 						AS `penyetuju_unit_kode`,
	`surat_setuju_profil`.`staf_profil_unit_nama` 			AS `penyetuju_unit_nama`,
	`surat_setuju_staf`.`unit_rubrik` 						AS `penyetuju_unit_rubrik`,
	`surat_setuju_profil`.`staf_profil_jabatan` 			AS `penyetuju_jabatan`,
	`surat_setuju_staf`.`jabatan_kode` 						AS `penyetuju_jabatan_kode`,
	`surat_setuju_profil`.`staf_profil_jabatan_nama` 		AS `penyetuju_jabatan_nama`,
	IFNULL(`surat_setuju_staf`.`jabatan_isnomor`,0) 		AS `penyetuju_jabatan_isnomor`,
	IFNULL(`surat_setuju_staf`.`staf_isaktif`,0) 			AS `penyetuju_isaktif`,

	`surat_unit`.`unit_id` 									AS `unit_id`,
	`surat_unit`.`unit_kode` 								AS `unit_kode`,
	`surat_unit`.`unit_nama` 								AS `unit_nama`,

	`surat_unit_source`.`unit_id` 							AS `unit_source_id`,
	`surat_unit_source`.`unit_kode` 						AS `unit_source_kode`,
	`surat_unit_source`.`unit_nama` 						AS `unit_source_nama`,

	`eks`.`ekspedisi_id`,
	`eks`.`ekspedisi_kode`,
	`eks`.`ekspedisi_nama`,
	`m`.`media_id`,
	`m`.`media_kode`,
	`m`.`media_nama`,
	`p`.`prioritas_id`,
	`p`.`prioritas_kode`,
	`p`.`prioritas_nama`,
	`p`.`prioritas_retensi`,
	`j`.`jenis_id`,
	`j`.`jenis_kode`,
	`j`.`jenis_nama`,
	`j`.`jenis_nomor_awal`,
	`j`.`jenis_retensi`,
	`j`.`jenis_ttd`,
	`j`.`jenis_batasibackdate`,
	`j`.`jenis_batasipenerima`,
	`j`.`jenis_batas_jumlah`,
	`j`.`jenis_terpusat`,
	IFNULL(`j`.`jenis_isbatas`,0) 			AS `jenis_isbatas`,
	`sifat`.`sifat_id`,
	`sifat`.`sifat_kode`,
	`sifat`.`sifat_nama`,
	`sifat`.`sifat_color`,
	IFNULL(`sifat`.`sifat_israhasia`,0) 			AS `sifat_israhasia`,
	`k`.`kelas_id`,
	`k`.`kelas_kode`,
	`k`.`kelas_nama`,
	`k`.`kelas_retensi`,
	`k`.`kelas_limitdays`,
	`l`.`lokasi_id`,
	`l`.`lokasi_kode`,
	`l`.`lokasi_nama`,

	(`s`.`surat_tolak_baca_tgl` IS NOT NULL)				AS `surat_tolak_isbaca`,

	`ks`.`korespondensi_id` 								AS `korespondensi_id`,
	`ks`.`korespondensi_nomor` 								AS `korespondensi_nomor`,
	`ks`.`korespondensi_perihal` 							AS `korespondensi_perihal`,
	`ks`.`korespondensi_pengirim` 							AS `korespondensi_pengirim`,
	`ks`.`korespondensi_penerima` 							AS `korespondensi_penerima`,
	`ks`.`korespondensi_unitpengirim` 						AS `korespondensi_unitpengirim`,
	`ks`.`korespondensi_unitpenerima` 						AS `korespondensi_unitpenerima`,
	IFNULL(`ks`.`korespondensi_isinternal`,0) 				AS `korespondensi_isinternal`,
	`ks`.`korespondensi_properti` 							AS `korespondensi_properti`,

	`induk`.`surat_id` 										AS `surat_induk_id`,
	`induk`.`surat_nomor` 									AS `surat_induk_nomor`,
	`induk`.`surat_setuju_tgl` 								AS `surat_induk_setuju_tgl`,

	`iunit`.`unit_id` 										AS `surat_induk_unit`,
	`iunit`.`unit_nama` 									AS `surat_induk_unit_nama`,
	
	IFNULL(`sdj`.`surat_jumlah_dokumen`, 0) 				AS `surat_jumlah_dokumen`,
	IFNULL(`sdj`.`surat_jumlah_dokumen_reupload`, 0) 		AS `surat_jumlah_dokumen_reupload`,
	
	(SELECT date(`s`.`surat_setuju_tgl`) - date(`induk`.`surat_setuju_tgl`)) AS `surat_setuju_rentang`,

	IFNULL(`ssj`.`surat_setuju_setuju`, 0) 					AS `surat_setuju_setuju`,
	IFNULL(`ssj`.`surat_setuju_tolak`, 0) 					AS `surat_setuju_tolak`,
	IFNULL(`ssj`.`surat_setuju_pending`, 0) 				AS `surat_setuju_pending`,
	IFNULL(`ssj`.`surat_setuju_total`, 0) 					AS `surat_setuju_total`,
	
	IFNULL(`spsj`.`surat_petikan_setuju_setuju`, 0) 		AS `surat_petikan_setuju_setuju`,
	IFNULL(`spsj`.`surat_petikan_setuju_tolak`, 0) 			AS `surat_petikan_setuju_tolak`,
	IFNULL(`spsj`.`surat_petikan_setuju_pending`, 0) 		AS `surat_petikan_setuju_pending`,
	IFNULL(`spsj`.`surat_petikan_setuju_total`, 0) 			AS `surat_petikan_setuju_total`,

	IFNULL(`spj`.`surat_penerimask_total`, 0) 				AS `surat_penerimask_total`,

	IFNULL(`sij`.`surat_imasuk_total`, 0) 					AS `surat_imasuk_total`,
	IFNULL(`sijs`.`surat_imasuk_setuju`, 0) 				AS `surat_imasuk_setuju`,
	IFNULL(`sijt`.`surat_imasuk_tolak`, 0) 					AS `surat_imasuk_tolak`,
	IFNULL(`sijp`.`surat_imasuk_pending`, 0) 				AS `surat_imasuk_pending`,

	1 AS `surat_sorter`,

	(DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) <= 7 AND DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) > 3) AS `surat_m_7`,
	(DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) <= 3 AND DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) > 1) AS `surat_m_3`,
	(DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) <= 1 AND DATEDIFF(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d'), CURRENT_DATE) > -1) AS `surat_m_1`,

	`s`.`surat_buat_tgl` 											AS `pembuat_tgl`,
	`surat_buat_profil`.`staf_profil_staf` 							AS `pembuat_id`,
	`surat_properti_buat_staf`.`staf_kode` 							AS `pembuat_kode`,
	`surat_buat_profil`.`staf_profil_staf_nama` 					AS `pembuat_nama`,
	`surat_buat_profil`.`staf_profil_unit` 							AS `pembuat_unit`,
	`surat_buat_profil`.`staf_profil_unit_nama` 					AS `pembuat_unit_nama`,
	`surat_properti_buat_staf`.`unit_rubrik` 						AS `pembuat_unit_rubrik`,
	`surat_properti_buat_staf`.`unit_kode` 							AS `pembuat_unit_kode`,
	`surat_buat_profil`.`staf_profil_jabatan` 						AS `pembuat_jabatan`,
	`surat_buat_profil`.`staf_profil_jabatan_nama` 					AS `pembuat_jabatan_nama`,
	`surat_properti_buat_staf`.`jabatan_kode` 						AS `pembuat_jabatan_kode`,

	`s`.`surat_properti` 											AS `surat_properti_id`,
	`s`.`surat_buat_tgl` 											AS `surat_properti_buat_tgl`,
	`surat_buat_profil`.`staf_profil_staf` 							AS `surat_properti_pembuat_id`,
	`surat_properti_buat_staf`.`staf_kode` 							AS `surat_properti_pembuat_kode`,
	`surat_buat_profil`.`staf_profil_staf_nama` 					AS `surat_properti_pembuat_nama`,
	`surat_buat_profil`.`staf_profil_unit` 							AS `surat_properti_pembuat_unit`,
	`surat_buat_profil`.`staf_profil_unit_nama` 					AS `surat_properti_pembuat_unit_nama`,
	`surat_properti_buat_staf`.`unit_rubrik` 						AS `surat_properti_pembuat_unit_rubrik`,
	`surat_properti_buat_staf`.`unit_kode` 							AS `surat_properti_pembuat_unit_kode`,
	`surat_buat_profil`.`staf_profil_jabatan` 						AS `surat_properti_pembuat_jabatan`,
	`surat_buat_profil`.`staf_profil_jabatan_nama` 					AS `surat_properti_pembuat_jabatan_nama`,
	`surat_properti_buat_staf`.`jabatan_kode` 						AS `surat_properti_pembuat_jabatan_kode`,
	IFNULL(`s`.`surat_ishapus`,0) 									AS `surat_properti_ishapus`,
	IFNULL(`dmbr`.`disposisi_jumlah_berkas_request`,0)				AS `disposisi_jumlah_berkas_request`


FROM `surat` `s`
LEFT JOIN `jenis` `j` 										ON `j`.`jenis_id` = `s`.`surat_jenis`
LEFT JOIN `kelas` `k` 										ON `k`.`kelas_id` = `s`.`surat_kelas`
LEFT JOIN `sifat` `sifat` FORCE INDEX(PRIMARY) 				ON `sifat`.`sifat_id` = `s`.`surat_sifat`
LEFT JOIN `prioritas` `p` FORCE INDEX(PRIMARY)				ON `p`.`prioritas_id` = `s`.`surat_prioritas`
LEFT JOIN `media` `m` 										ON `m`.`media_id` = `s`.`surat_media`
LEFT JOIN `lokasi` `l` 										ON `l`.`lokasi_id` = `s`.`surat_lokasi`
LEFT JOIN `korespondensi` `ks` 								ON `ks`.`korespondensi_id` = `s`.`surat_korespondensi`
LEFT JOIN `ekspedisi` `eks` FORCE INDEX(PRIMARY)			ON `eks`.`ekspedisi_id` = `s`.`surat_ekspedisi`

LEFT JOIN `v_staf_lite` `surat_distribusi_staf` 			ON `surat_distribusi_staf`.`staf_id` = `s`.`surat_distribusi_staf`
LEFT JOIN `staf_profil` `surat_distribusi_profil` 			ON `surat_distribusi_profil`.`staf_profil_id` = `s`.`surat_distribusi_profil`
LEFT JOIN `v_staf_lite` `surat_selesai_staf` 				ON `surat_selesai_staf`.`staf_id` = `s`.`surat_selesai_staf`
LEFT JOIN `staf_profil` `surat_selesai_profil` 				ON `surat_selesai_profil`.`staf_profil_id` = `s`.`surat_selesai_profil`
LEFT JOIN `v_staf_lite` `surat_properti_buat_staf` 			ON `surat_properti_buat_staf`.`staf_id` = `s`.`surat_buat_staf`
LEFT JOIN `staf_profil` `surat_buat_profil` 				ON `surat_buat_profil`.`staf_profil_id` = `s`.`surat_buat_profil`
LEFT JOIN `v_staf_lite` `surat_setuju_staf` 				ON `surat_setuju_staf`.`staf_id` = `s`.`surat_setuju_staf`
LEFT JOIN `staf_profil` `surat_setuju_profil` 				ON `surat_setuju_profil`.`staf_profil_id` = `s`.`surat_setuju_profil`
-- LEFT JOIN `v_staf_lite` `surat_nomor_batal_staf` 			ON `surat_nomor_batal_staf`.`staf_id` = `s`.`surat_nomor_batal_staf`
LEFT JOIN `staf_profil` `surat_nomor_batal_profil` 			ON `surat_nomor_batal_profil`.`staf_profil_id` = `s`.`surat_nomor_batal_profil`
-- LEFT JOIN `v_staf_lite` `surat_musnah_staf` 					ON `surat_musnah_staf`.`staf_id` = `s`.`surat_musnah_staf`
-- LEFT JOIN `staf_profil` `surat_musnah_profil` 				ON `surat_musnah_profil`.`staf_profil_id` = `s`.`surat_musnah_profil`
-- LEFT JOIN `v_staf_lite` `surat_arsip_staf` 					ON `surat_arsip_staf`.`staf_id` = `s`.`surat_arsip_staf`
-- LEFT JOIN `staf_profil` `surat_arsip_profil` 				ON `surat_arsip_profil`.`staf_profil_id` = `s`.`surat_arsip_profil`
-- LEFT JOIN `v_staf_lite` `surat_distribusi_cabut_staf` 		ON `surat_distribusi_cabut_staf`.`staf_id` = `s`.`surat_distribusi_cabut_staf`
LEFT JOIN `staf_profil` `surat_distribusi_cabut_profil` 	ON `surat_distribusi_cabut_profil`.`staf_profil_id` = `s`.`surat_distribusi_cabut_profil`
LEFT JOIN `unit` `surat_unit` 								ON `surat_unit`.`unit_id` = `s`.`surat_unit`
LEFT JOIN `unit` `surat_unit_source` 						ON `surat_unit_source`.`unit_id` = `s`.`surat_unit_source`
LEFT JOIN `surat` `induk` 									ON `induk`.`surat_id` = `s`.`surat_korespondensi_surat`
LEFT JOIN `unit` `iunit` 									ON `iunit`.`unit_id` = `induk`.`surat_unit`

LEFT JOIN `surat_dokumen_jumlah` `sdj` FORCE INDEX(PRIMARY) ON `sdj`.`dokumen_arsip` = `s`.`surat_arsip`
LEFT JOIN `surat_setuju_jumlah` `ssj` FORCE INDEX(PRIMARY) ON `ssj`.`surat_setuju_surat` = `s`.`surat_id`
LEFT JOIN `surat_petikan_setuju_jumlah` `spsj` FORCE INDEX(PRIMARY) ON `spsj`.`surat_petikan_setuju_surat` = `s`.`surat_id`
LEFT JOIN `surat_penerimask_jumlah` `spj` FORCE INDEX(PRIMARY) ON `spj`.`surat_penerimask_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah_setuju` `sijs` FORCE INDEX(PRIMARY) ON `sijs`.`surat_imasuk_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah_tolak` `sijt` FORCE INDEX(PRIMARY) ON `sijt`.`surat_imasuk_tolak_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah_pending` `sijp` FORCE INDEX(PRIMARY) ON `sijp`.`surat_imasuk_pending_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah` `sij` FORCE INDEX(PRIMARY) ON `sij`.`surat_imasuk_surat` = `s`.`surat_id`
LEFT JOIN `disposisi_jumlah_berkas_request` `dmbr` FORCE INDEX(PRIMARY) ON `dmbr`.`disposisi_surat` = `s`.`surat_id`
;


/*==================================================================*/
/* View: v_surat_lite */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_lite` AS
SELECT
	`s`.`surat_id`,
	`s`.`surat_arsip`,
	IFNULL(`s`.`surat_model`,0) 						AS `surat_model`,
	IFNULL(`s`.`surat_model_sub`,0) 					AS `surat_model_sub`,
	-- `s`.`surat_itipe`,
	`s`.`surat_registrasi`,
	`s`.`surat_nomor`,
	(`s`.`surat_nomor` IS NOT NULL)						AS `surat_isnomor`,
	`s`.`surat_agenda`,
	`s`.`surat_agenda_sub`,
	`s`.`surat_tanggal`,
	`s`.`surat_tmt`,
	`s`.`surat_berlaku_tgl`,
	`s`.`surat_perihal`,
	`s`.`surat_pengirim`,
	-- `s`.`surat_keterangan`,
	`s`.`surat_tujuan`,
	`s`.`surat_kepada`,
	-- `s`.`surat_alamat`,
	`s`.`surat_lampiran`,
	-- `s`.`surat_ringkasan`,
	-- `s`.`surat_catatan`,
	`s`.`surat_korespondensi`,
	`s`.`surat_korespondensi_surat`,
	-- `s`.`surat_lokasi`,
	-- `s`.`surat_lokasi_sub`,
	-- `s`.`surat_kelas`,
	-- `s`.`surat_jenis`,
	-- `s`.`surat_sifat`,
	-- `s`.`surat_media`,
	`s`.`surat_prioritas`,
	`s`.`surat_prioritas_tgl`,
	`s`.`surat_retensi_tgl`,
	IFNULL(`s`.`surat_useretensi`,0) 					AS `surat_useretensi`,
	-- `s`.`surat_properti`,
	-- `s`.`surat_unit`,
	-- `s`.`surat_unit_source`,
	IFNULL(`s`.`surat_setuju`,0) 						AS `surat_setuju`,
	`s`.`surat_setuju_tgl`,
	IFNULL(`s`.`surat_setuju_isurut`,0)					AS `surat_setuju_isurut`,
	`s`.`surat_setuju_staf`,
	`s`.`surat_setuju_profil`,
	`s`.`surat_setuju_akhir_staf`,
	`s`.`surat_petikan_setuju`,
	`s`.`surat_petikan_akhir_staf`,
	IFNULL(`s`.`surat_petikan_setuju_isurut`,0)			AS `surat_petikan_setuju_isurut`,
	
	IFNULL(`s`.`surat_nomor_isbatal`,0) 				AS `surat_nomor_isbatal`,
	`s`.`surat_nomor_batal_tgl`,
	`s`.`surat_nomor_batal_staf`,
	`s`.`surat_nomor_batal_profil`,

	IFNULL(`s`.`surat_ismusnah`,0) 						AS `surat_ismusnah`,
	`s`.`surat_musnah_tgl`,
	`s`.`surat_musnah_staf`,
	`s`.`surat_musnah_profil`,

	IFNULL(`s`.`surat_distribusi_iscabut`,0) 			AS `surat_distribusi_iscabut`,
	-- (`s`.`surat_distribusi_tgl` IS NOT NULL)AS `surat_isdistribusi`,
	`s`.`surat_distribusi_tgl`,
	`s`.`surat_distribusi_staf`,
	`s`.`surat_distribusi_profil`,
	-- `s`.`surat_distribusi_otomatis`,
	-- (`s`.`surat_arah_tgl` IS NOT NULL)AS `surat_isarah`,
	-- `s`.`surat_arah_tgl`,
	-- `s`.`surat_arah_staf`,
	-- `s`.`surat_arah_profil`,
	-- (`s`.`surat_selesai_tgl` IS NOT NULL)AS `surat_isselesai`,
	-- `s`.`surat_selesai_tgl`,
	-- `s`.`surat_selesai_staf`,
	-- `s`.`surat_selesai_profil`,
	-- (`s`.`surat_terima_staf` IS NOT NULL)AS `surat_isterima`,
	-- `s`.`surat_terima_staf`,

	-- (`s`.`surat_sla_tolak_baca_tgl` IS NOT NULL)				AS `surat_sla_tolak_isbaca`,
	-- `s`.`surat_sla_tolak_baca_tgl`,
	-- `s`.`surat_sla_tolak_baca_staf`,

	-- (`s`.`surat_tolak_baca_tgl` IS NOT NULL)					AS `surat_tolak_isbaca`,
	-- `s`.`surat_tolak_baca_tgl`,
	-- `s`.`surat_tolak_baca_staf`,
	-- `s`.`surat_tolak_baca_profil`,

	-- (`s`.`surat_ulasan_baca_tgl` IS NOT NULL)				AS `surat_ulasan_isbaca`,
	-- `s`.`surat_ulasan_baca_tgl`,
	-- `s`.`surat_ulasan_baca_staf`,
	-- `s`.`surat_ulasan_baca_profil`,

	-- (`s`.`surat_ekspedisi_tgl` IS NOT NULL)					AS `surat_isekspedisi`,
	-- `s`.`surat_ekspedisi_tgl`,
	-- `s`.`surat_ekspedisi`,
	-- `s`.`surat_ekspedisi_staf`,
	-- `s`.`surat_ekspedisi_profil`,

	`s`.`surat_nomor_tgl`,
	`s`.`surat_nomor_staf`,
	`s`.`surat_nomor_profil`,
	`s`.`surat_nomor_format`,
	`s`.`surat_nomor_otomatis`,
	`s`.`surat_nomor_booking`,
	`s`.`surat_nomor_backdate`,
	`s`.`surat_nomor_urut`,
	IFNULL(`s`.`surat_isbackdate`,0) 					AS `surat_isbackdate`,
	IFNULL(`s`.`surat_isbooking`,0) 					AS `surat_isbooking`,

	IFNULL(`s`.`surat_usebalas`,0) 						AS `surat_usebalas`,
	IFNULL(`s`.`surat_useberkas`,0) 					AS `surat_useberkas`,
	
	`surat_unit`.`unit_id` 								AS `unit_id`,
	`surat_unit`.`unit_kode` 							AS `unit_kode`,
	`surat_unit`.`unit_nama` 							AS `unit_nama`,

	`surat_unit_source`.`unit_id` 						AS `unit_source_id`,
	`surat_unit_source`.`unit_kode` 					AS `unit_source_kode`,
	`surat_unit_source`.`unit_nama` 					AS `unit_source_nama`,

	IFNULL(`s`.`surat_israhasia`,0) 					AS `surat_israhasia`,

	-- `s`.`surat_sla_nilai`,
	-- `s`.`surat_sla_tgl`,
	-- `s`.`surat_sla_staf`,
	-- `s`.`surat_sla_formula`,

	-- (`s`.`surat_sla_tolak_tgl` IS NOT NULL)				AS `surat_sla_istolak`,
	-- `s`.`surat_sla_tolak_tgl`,
	-- `s`.`surat_sla_tolak_staf`,
	-- `s`.`surat_sla_tolak_komentar`,

	-- `eks`.`ekspedisi_id`,
	-- `eks`.`ekspedisi_kode`,
	-- `eks`.`ekspedisi_nama`,
	`m`.`media_id`,
	`m`.`media_kode`,
	`m`.`media_nama`,
	`p`.`prioritas_id`,
	`p`.`prioritas_kode`,
	`p`.`prioritas_nama`,
	-- `p`.`prioritas_retensi`,
	`j`.`jenis_id`,
	`j`.`jenis_kode`,
	`j`.`jenis_nama`,
	`j`.`jenis_ttd`,
	`j`.`jenis_nomor_awal`,
	
	`j`.`jenis_batas_jumlah`,
	IFNULL(`j`.`jenis_isbatas`,0) 					AS `jenis_isbatas`,
	-- `j`.`jenis_batasibackdate`,
	-- `j`.`jenis_batasipenerima`,
	`sifat`.`sifat_id`,
	`sifat`.`sifat_kode`,
	`sifat`.`sifat_nama`,
	`sifat`.`sifat_color`,
	IFNULL(`sifat`.`sifat_israhasia`,0) 					AS `sifat_israhasia`,
	`k`.`kelas_id`,
	`k`.`kelas_kode`,
	`k`.`kelas_nama`,
	`l`.`lokasi_id`,
	`l`.`lokasi_kode`,
	`l`.`lokasi_nama`,

	-- `ks`.`korespondensi_id` 			AS `korespondensi_id`,
	-- `ks`.`korespondensi_nomor` 			AS `korespondensi_nomor`,
	-- `ks`.`korespondensi_perihal` 		AS `korespondensi_perihal`,
	-- `ks`.`korespondensi_pengirim` 		AS `korespondensi_pengirim`,
	-- `ks`.`korespondensi_penerima` 		AS `korespondensi_penerima`,
	-- `ks`.`korespondensi_unitpengirim` 	AS `korespondensi_unitpengirim`,
	-- `ks`.`korespondensi_unitpenerima` 	AS `korespondensi_unitpenerima`,
	-- `ks`.`korespondensi_isinternal` 	AS `korespondensi_isinternal`,
	-- `ks`.`korespondensi_properti` 		AS `korespondensi_properti`,

	`s`.`surat_buat_tgl`	 										AS `pembuat_tgl`,
	`surat_buat_profil`.`staf_profil_staf` 							AS `pembuat_id`,
	`surat_properti_buat_staf`.`staf_kode` 							AS `pembuat_kode`,
	`surat_buat_profil`.`staf_profil_staf_nama` 					AS `pembuat_nama`,
	`surat_buat_profil`.`staf_profil_unit` 							AS `pembuat_unit`,
	`surat_buat_profil`.`staf_profil_unit_nama` 					AS `pembuat_unit_nama`,
	`surat_properti_buat_staf`.`unit_rubrik` 						AS `pembuat_unit_rubrik`,
	`surat_properti_buat_staf`.`unit_kode` 							AS `pembuat_unit_kode`,
	`surat_buat_profil`.`staf_profil_jabatan` 						AS `pembuat_jabatan`,
	`surat_buat_profil`.`staf_profil_jabatan_nama` 					AS `pembuat_jabatan_nama`,
	`surat_properti_buat_staf`.`jabatan_kode` 						AS `pembuat_jabatan_kode`,

	`s`.`surat_properti` 											AS `surat_properti_id`,
	`s`.`surat_buat_tgl`	 										AS `surat_properti_buat_tgl`,
	`surat_buat_profil`.`staf_profil_staf` 							AS `surat_properti_pembuat_id`,
	`surat_properti_buat_staf`.`staf_kode` 							AS `surat_properti_pembuat_kode`,
	`surat_buat_profil`.`staf_profil_staf_nama` 					AS `surat_properti_pembuat_nama`,
	`surat_buat_profil`.`staf_profil_unit` 							AS `surat_properti_pembuat_unit`,
	`surat_buat_profil`.`staf_profil_unit_nama` 					AS `surat_properti_pembuat_unit_nama`,
	`surat_properti_buat_staf`.`unit_rubrik` 						AS `surat_properti_pembuat_unit_rubrik`,
	`surat_properti_buat_staf`.`unit_kode` 							AS `surat_properti_pembuat_unit_kode`,
	`surat_buat_profil`.`staf_profil_jabatan` 						AS `surat_properti_pembuat_jabatan`,
	`surat_buat_profil`.`staf_profil_jabatan_nama` 					AS `surat_properti_pembuat_jabatan_nama`,
	`surat_properti_buat_staf`.`jabatan_kode` 						AS `surat_properti_pembuat_jabatan_kode`,
	IFNULL(`s`.`surat_ishapus`,0) 									AS `surat_properti_ishapus`

FROM `surat` `s`
LEFT JOIN `jenis` `j` 										ON `j`.`jenis_id` = `s`.`surat_jenis`
LEFT JOIN `kelas` `k` 										ON `k`.`kelas_id` = `s`.`surat_kelas`
LEFT JOIN `sifat` `sifat` FORCE INDEX(PRIMARY) 				ON `sifat`.`sifat_id` = `s`.`surat_sifat`
LEFT JOIN `prioritas` `p` FORCE INDEX(PRIMARY) 				ON `p`.`prioritas_id` = `s`.`surat_prioritas`
LEFT JOIN `media` `m` 										ON `m`.`media_id` = `s`.`surat_media`
LEFT JOIN `lokasi` `l` 										ON `l`.`lokasi_id` = `s`.`surat_lokasi`
-- LEFT JOIN `korespondensi` `ks` 								ON `ks`.`korespondensi_id` = `s`.`surat_korespondensi`
-- LEFT JOIN `ekspedisi` `eks` 								ON `eks`.`ekspedisi_id` = `s`.`surat_ekspedisi`

-- LEFT JOIN `properti` `pro` 									ON `pro`.`properti_id` = `s`.`surat_properti`
LEFT JOIN `v_staf_lite` `surat_properti_buat_staf` 			ON `surat_properti_buat_staf`.`staf_id` = `s`.`surat_buat_staf`
LEFT JOIN `staf_profil` `surat_buat_profil` 				ON `surat_buat_profil`.`staf_profil_id` = `s`.`surat_buat_profil`
LEFT JOIN `unit` `surat_unit` 								ON `surat_unit`.`unit_id` = `s`.`surat_unit`
LEFT JOIN `unit` `surat_unit_source` 						ON `surat_unit_source`.`unit_id` = `s`.`surat_unit_source`
;

/*==================================================================*/
/* View: v_surat_masuk 											*/
/* View: v_surat_masuk_musnah 									*/
/* View: v_surat_masuk_hidup 									*/
/* View: v_surat_masuk_aktif 									*/
/* View: v_surat_masuk_aktif_7 									*/
/* View: v_surat_masuk_aktif_3 									*/
/* View: v_surat_masuk_aktif_1 									*/
/* View: v_surat_masuk_nonaktif 								*/
/* View: v_surat_masuk_terlewat_nonaktif 						*/
/* View: v_surat_masuk_distribusi 								*/
/* View: v_surat_masuk_blmdistribusi 							*/
/* View: v_surat_masuk_arah 									*/
/* View: v_surat_masuk_blm_arah 								*/
/* View: v_surat_masuk_bataldistribusi 							*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_masuk` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_musnah` AS 
SELECT
  `s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	`s`.`surat_properti_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_hidup` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_masuk_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_masuk_aktif_7` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_m_7` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_aktif_3` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_m_3` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_aktif_1` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_m_1` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_masuk_terlewat_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_inaktif_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_masuk_distribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_aktif` `s`
WHERE 
	`s`.`surat_isdistribusi` = 1
;

CREATE OR REPLACE VIEW `v_surat_masuk_blmdistribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_aktif` `s`
WHERE 
	IFNULL(`s`.`surat_isdistribusi`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_masuk_arah` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_isarah` = 1 
;

CREATE OR REPLACE VIEW `v_surat_masuk_blm_arah` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 1 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	IFNULL(`s`.`surat_isarah`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_masuk_bataldistribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_aktif` `s`
WHERE 
	`s`.`surat_isdistribusi` = 1 AND
	`s`.`surat_distribusi_iscabut` = 1
;


/*==================================================================*/
/* View: v_surat_keluar 										*/
/* View: v_surat_keluar_musnah 									*/
/* View: v_surat_keluar_hidup 									*/
/* View: v_surat_keluar_aktif 									*/
/* View: v_surat_keluar_nonaktif 								*/
/* View: v_surat_keluar_terlewat_nonaktif 						*/
/* View: v_surat_keluar_draft									*/
/* View: v_surat_keluar_dlm_setuju								*/
/* View: v_surat_keluar_revisi									*/
/* View: v_surat_keluar_tolak									*/
/* View: v_surat_keluar_blm_nomor								*/
/* View: v_surat_keluar_blm_ekspedisi							*/
/* View: v_surat_keluar_ekspedisi 								*/
/* View: v_surat_keluar_batal_nomor 							*/
/* View: v_surat_keluar_salin_nomor 							*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_keluar` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2
;

CREATE OR REPLACE VIEW `v_surat_keluar_musnah` AS 
SELECT
  `s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	`s`.`surat_properti_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_surat_keluar_hidup` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	`s`.`surat_nomor` IS NOT NULL AND
	`s`.`surat_setuju` = 2 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_keluar_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_keluar_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_keluar_terlewat_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_inaktif_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_keluar_draft` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	IFNULL(`s`.`surat_setuju`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_dlm_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 1
;

CREATE OR REPLACE VIEW `v_surat_keluar_setuju_list` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` <> 4 AND
	`s`.`surat_setuju_setuju` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_revisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 3
;

CREATE OR REPLACE VIEW `v_surat_keluar_tolak` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju_tolak` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_blm_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND
	IFNULL(`s`.`surat_isnomor`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_blm_ekspedisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_setuju` = 2 AND
	ISNULL(`s`.`surat_ekspedisi`)
;

CREATE OR REPLACE VIEW `v_surat_keluar_ekspedisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND
	`s`.`surat_ekspedisi` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_surat_keluar_batal_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	IFNULL(`s`.`surat_nomor_issalin`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keluar_salin_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 2 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	`s`.`surat_nomor_issalin` = 1
;


/*==================================================================*/
/* View: v_surat_imasuk 										*/
/* View: v_surat_imasuk_musnah 									*/
/* View: v_surat_imasuk_hidup 									*/
/* View: v_surat_imasuk_draft 									*/
/* View: v_surat_imasuk_unapproved 								*/
/* View: v_surat_imasuk_pending 								*/
/* View: v_surat_imasuk_terima 									*/
/* View: v_surat_imasuk_tolak 									*/
/* View: v_surat_imasuk_blmdistribusi 							*/
/* View: v_surat_imasuk_distribusi 								*/
/* View: v_surat_imasuk_approved 								*/
/* View: v_surat_imasuk_aktif 									*/
/* View: v_surat_imasuk_aktif_list 								*/
/* View: v_surat_imasuk_aktif_7 								*/
/* View: v_surat_imasuk_aktif_3 								*/
/* View: v_surat_imasuk_aktif_1 								*/
/* View: v_surat_imasuk_nonaktif 								*/
/* View: v_surat_imasuk_terlewat_nonaktif 						*/
/* View: v_surat_imasuk_bataldistribusi 						*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_imasuk` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3
;

CREATE OR REPLACE VIEW `v_surat_imasuk_musnah` AS 
SELECT
  `s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	`s`.`surat_properti_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_surat_imasuk_hidup` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_imasuk_draft` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_setuju` = 1 AND
	IFNULL(`s`.`surat_isdistribusi`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_imasuk_unapproved` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_setuju` <> 2
;

CREATE OR REPLACE VIEW `v_surat_imasuk_pending` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	IFNULL(`s`.`surat_setuju`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_imasuk_terima` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_setuju` = 2
;

CREATE OR REPLACE VIEW `v_surat_imasuk_tolak` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_setuju` = 4
;

CREATE OR REPLACE VIEW `v_surat_imasuk_blmdistribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	IFNULL(`s`.`surat_isdistribusi`,0) = 0 AND 
	`s`.`surat_setuju` = 2
;

CREATE OR REPLACE VIEW `v_surat_imasuk_distribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	`s`.`surat_isdistribusi` = 1 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_imasuk_approved` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	`s`.`surat_setuju` = 2
;

/*aktif dan sudah disetujui*/
CREATE OR REPLACE VIEW `v_surat_imasuk_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(`s`.`surat_setuju` = 2 OR `s`.`surat_setuju` = 1)  AND 
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_imasuk_aktif_list` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_imasuk_aktif_7` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND
	`s`.`surat_m_7` = 1
;

CREATE OR REPLACE VIEW `v_surat_imasuk_aktif_3` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND
	`s`.`surat_m_3` = 1
;

CREATE OR REPLACE VIEW `v_surat_imasuk_aktif_1` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND
	`s`.`surat_m_1` = 1
;

CREATE OR REPLACE VIEW `v_surat_imasuk_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;
CREATE OR REPLACE VIEW `v_surat_imasuk_terlewat_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 3 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_inaktif_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_imasuk_bataldistribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_aktif` `s`
WHERE 
	`s`.`surat_isdistribusi` = 1 AND
	`s`.`surat_distribusi_iscabut` = 1
;


/*==================================================================*/
/* View: v_surat_ikeluar 											*/
/* View: v_surat_ikeluar_musnah 									*/
/* View: v_surat_ikeluar_hidup 										*/
/* View: v_surat_ikeluar_aktif 										*/
/* View: v_surat_ikeluar_nonaktif 									*/
/* View: v_surat_ikeluar_terlewat_nonaktif 							*/
/* View: v_surat_ikeluar_setuju 									*/
/* View: v_surat_ikeluar_draft 										*/
/* View: v_surat_ikeluar_dlm_setuju 								*/
/* View: v_surat_ikeluar_blm_setuju 								*/
/* View: v_surat_ikeluar_revisi 									*/
/* View: v_surat_ikeluar_blm_nomor 									*/
/* View: v_surat_ikeluar_blm_kirim 									*/
/* View: v_surat_ikeluar_blm_terima 								*/
/* View: v_surat_ikeluar_terima 									*/
/* View: v_surat_ikeluar_tolak 										*/
/* View: v_surat_ikeluar_batal_nomor 								*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_ikeluar` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_musnah` AS 
SELECT
  `s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	`s`.`surat_properti_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_hidup` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_terlewat_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_inaktif_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_setuju` = 2 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_setuju_list` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND
	`s`.`surat_setuju` <> 4 AND
	`s`.`surat_setuju_setuju` <> 0 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_draft` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	IFNULL(`s`.`surat_setuju`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_dlm_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 1
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_blm_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 1 OR
	`s`.`surat_setuju` = 3 OR
	`s`.`surat_setuju` = 4
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_dlm_revisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 3
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_revisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju_tolak` <> 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_blm_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	IFNULL(`s`.`surat_isnomor`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_blm_terima` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_pending` <> 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_terima` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_setuju` <> 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_tolak` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_tolak` <> 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_batal_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	IFNULL(`s`.`surat_nomor_issalin`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_ikeluar_salin_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 4 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	`s`.`surat_nomor_issalin` = 1
;

/*==================================================================*/
/* View: v_surat_keputusan 											*/
/* View: v_surat_keputusan_musnah 									*/
/* View: v_surat_keputusan_hidup 									*/
/* View: v_surat_keputusan_aktif 									*/
/* View: v_surat_keputusan_nonaktif 								*/
/* View: v_surat_keputusan_terlewat_nonaktif 						*/
/* View: v_surat_keputusan_setuju 									*/
/* View: v_surat_keputusan_draft 									*/
/* View: v_surat_keputusan_dlm_setuju 								*/
/* View: v_surat_keputusan_blm_setuju 								*/
/* View: v_surat_keputusan_revisi 									*/
/* View: v_surat_keputusan_blm_nomor 								*/
/* View: v_surat_keputusan_blm_kirim 								*/
/* View: v_surat_keputusan_blm_terima 								*/
/* View: v_surat_keputusan_terima 									*/
/* View: v_surat_keputusan_tolak 									*/
/* View: v_surat_keputusan_batal_nomor 								*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_surat_keputusan` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6
;

CREATE OR REPLACE VIEW `v_surat_keputusan_musnah` AS 
SELECT
  `s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	`s`.`surat_properti_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_surat_keputusan_hidup` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 
;

CREATE OR REPLACE VIEW `v_surat_keputusan_aktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		IFNULL(`s`.`surat_useretensi`, 0) = 0 OR 
		(`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)
	)
;

CREATE OR REPLACE VIEW `v_surat_keputusan_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_keputusan_terlewat_nonaktif` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	(
		`s`.`surat_useretensi` = 1 AND 
		DATE_FORMAT(`s`.`surat_inaktif_tgl`, '%Y-%m-%d') < CURRENT_DATE
	)
;

CREATE OR REPLACE VIEW `v_surat_keputusan_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_setuju` = 2 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0  
;

CREATE OR REPLACE VIEW `v_surat_keputusan_setuju_list` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND
	`s`.`surat_setuju` <> 4 AND
	`s`.`surat_setuju_setuju` <> 0 AND
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0  
;

CREATE OR REPLACE VIEW `v_surat_keputusan_draft` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	IFNULL(`s`.`surat_setuju`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_dlm_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND  
	`s`.`surat_setuju` = 1
;

CREATE OR REPLACE VIEW `v_surat_keputusan_blm_setuju` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 1 OR
	`s`.`surat_setuju` = 3 OR
	`s`.`surat_setuju` = 4
;

CREATE OR REPLACE VIEW `v_surat_keputusan_dlm_revisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 3
;

CREATE OR REPLACE VIEW `v_surat_keputusan_revisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju_tolak` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_blm_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	IFNULL(`s`.`surat_isnomor`, 0) = 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_blm_terima` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_pending` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_terima` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_setuju` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_tolak` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_setuju` = 2 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_imasuk_tolak` <> 0
;

CREATE OR REPLACE VIEW `v_surat_keputusan_batal_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	IFNULL(`s`.`surat_nomor_issalin`, 0) = 0 
;

CREATE OR REPLACE VIEW `v_surat_keputusan_salin_nomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat` `s`
WHERE 
	`s`.`surat_model` = 6 AND 
	IFNULL(`s`.`surat_isarsip`, 0) = 0 AND 
	IFNULL(`s`.`surat_ismusnah`, 0) = 0 AND 
	IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
	`s`.`surat_isnomor` = 1 AND
	`s`.`surat_nomor_isbatal` = 1 AND
	`s`.`surat_nomor_issalin` = 1
;

/*==================================================================*/
/* View: v_surat_log */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_log` AS
SELECT
	`sl`.*,
  	`sp`.`staf_profil_staf` 						AS `staf_id`,
  	`sp`.`staf_profil_staf_nama` 					AS `staf_nama`,
  	`st`.`staf_peran` 								AS `staf_peran`,
  	`st`.`staf_akun` 								AS `staf_akun`,
  	`st`.`akun_nama` 								AS `akun_nama`,
  	`st`.`staf_kode` 								AS `staf_kode`,
  	`st`.`staf_kelamin` 							AS `staf_kelamin`,
  	`st`.`staf_isaktif` 							AS `staf_isaktif`,
  	`sp`.`staf_profil_unit` 						AS `staf_unit`,
  	`sp`.`staf_profil_unit_nama` 					AS `unit_nama`,
  	`sp`.`staf_profil_jabatan` 						AS `staf_jabatan`,
  	`sp`.`staf_profil_jabatan_nama` 				AS `jabatan_nama`,
	`s`.*,
	-- `st`.*,
	`eks`.*
FROM `surat_log` `sl`
LEFT JOIN `surat` `s`			 					ON `sl`.`surat_log_surat` = `s`.`surat_id`
LEFT JOIN `v_staf_lite` `st` 						ON `sl`.`surat_log_staf` = `st`.`staf_id`
LEFT JOIN `staf_profil` `sp` 						ON `sl`.`surat_log_profil` = `sp`.`staf_profil_id`
LEFT JOIN `ekspedisi` `eks` FORCE INDEX(PRIMARY) 	ON `sl`.`surat_log_ekspedisi` = `eks`.`ekspedisi_id`
;

CREATE OR REPLACE VIEW `v_surat_log_ekspedisi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_log` `s`
WHERE 
	`s`.`surat_log_tipe` = 9 AND
	`s`.`surat_log_tgl` IS NOT NULL
;

/*==================================================================*/
/* View: v_korespondensi_jumlah */
/* View: v_korespondensi */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_korespondensi_jumlah` AS 
SELECT
	`s`.`surat_korespondensi`,
	COUNT(`s`.`surat_id`) AS `korespondensi_jumlah`,
	MIN(`s`.`surat_properti_buat_tgl`) AS `korespondensi_tgl_mulai`,
	MAX(`s`.`surat_properti_buat_tgl`) AS `korespondensi_tgl_selesai`
FROM 
	`v_surat_lite` `s`
WHERE IFNULL(`s`.`surat_properti_ishapus`,0) = 0	
GROUP BY `s`.`surat_korespondensi`
;

CREATE OR REPLACE VIEW `v_korespondensi` AS
SELECT
	`s`.`surat_id`,
	IFNULL(`s`.`surat_model`,0) 					AS `surat_model`,
	`s`.`surat_tanggal`,
	`s`.`surat_agenda`,
	`s`.`surat_nomor`,
	`s`.`surat_registrasi`,
	`s`.`surat_perihal`,
	`s`.`surat_pengirim`,
	`s`.`surat_tujuan`,
	`s`.`surat_kepada`,
	`s`.`surat_korespondensi`,
	`s`.`surat_korespondensi_surat`,
	`k`.`korespondensi_id`,
	`k`.`korespondensi_nomor`,
	`k`.`korespondensi_perihal`,
	`k`.`korespondensi_pengirim`,
	`k`.`korespondensi_penerima`,
	`k`.`korespondensi_unitpengirim`,
	`k`.`korespondensi_unitpenerima`,
	 IFNULL(`k`.`korespondensi_isinternal`,0) 			AS `korespondensi_isinternal`,
	`unitpengirim`.`unit_id` 							AS `unitpengirim_id`,
	`unitpengirim`.`unit_nama` 							AS `unitpengirim_nama`,
	`unitpengirim`.`unit_kode` 							AS `unitpengirim_kode`,
	`unitpenerima`.`unit_id` 							AS `unitpenerima_id`,
	`unitpenerima`.`unit_nama` 							AS `unitpenerima_nama`,
	`unitpenerima`.`unit_kode` 							AS `unitpenerima_kode`,
	
	`kj`.`korespondensi_jumlah`,
  	`kj`.`korespondensi_tgl_mulai`,
  	`kj`.`korespondensi_tgl_selesai`,
	`k`.`korespondensi_properti`
	-- `p`.*
FROM `korespondensi` `k`
LEFT JOIN `surat` `s` ON `k`.`korespondensi_id` = `s`.`surat_korespondensi`
-- LEFT JOIN `v_properti` `p` ON `k`.`korespondensi_properti` = `p`.`properti_id`
LEFT JOIN `unit` `unitpengirim` ON `k`.`korespondensi_unitpengirim` = `unitpengirim`.`unit_id`
LEFT JOIN `unit` `unitpenerima` ON `k`.`korespondensi_unitpenerima` = `unitpenerima`.`unit_id`
LEFT JOIN `v_korespondensi_jumlah` `kj` ON `k`.`korespondensi_id` = `kj`.`surat_korespondensi`
;

/*==================================================================*/
/* View: v_korespondensi_internal */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_korespondensi_internal` AS
SELECT
	`k`.*
FROM `v_korespondensi` `k`
WHERE  `k`.`korespondensi_isinternal` = 1
;

/*==================================================================*/
/* View: v_korespondensi_eksternal */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_korespondensi_eksternal` AS
SELECT
	`k`.*
FROM `v_korespondensi` `k`
WHERE IFNULL(`k`.`korespondensi_isinternal`,0) = 0
;

/*==================================================================*/
/* View: v_korespondensi_perihal */
/*==================================================================*/
CREATE OR REPLACE VIEW `v_korespondensi_perihal` AS
SELECT
	`korespondensi_perihal` AS `template_perihal`
FROM `v_korespondensi`
;

/*==================================================================*/
/* View: v_surat_stack 												*/
/* View: v_surat_stack_disposisi 									*/
/* View: v_surat_stack_koreksi	 									*/
/* View: v_surat_stack_petikan	 									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_stack` AS 
SELECT
  `ss`.`surat_stack_id`,
  `ss`.`surat_stack_surat`,
  `ss`.`surat_stack_staf`,
  `ss`.`surat_stack_profil`,
  `ss`.`surat_stack_jabatan`,
  `ss`.`surat_stack_pelaku`,
  `ss`.`surat_stack_pelaku_profil`,
  `ss`.`surat_stack_pelaku_jabatan`,
  IFNULL(`ss`.`surat_stack_model`,0) 						AS `surat_stack_model`,
  `ss`.`surat_stack_level`,
  `ss`.`surat_stack_kirim`,
  `ss`.`surat_stack_komentar`,
  IFNULL(`ss`.`surat_stack_istembusan`,0) 					AS `surat_stack_istembusan`,
  (`ss`.`surat_stack_terima_tgl` IS NOT NULL)				AS `surat_stack_isterima`,
  `ss`.`surat_stack_terima_tgl`,
  IFNULL(`ss`.`surat_stack_status`,0) 						AS `surat_stack_status`,
  `ss`.`surat_stack_status_ttd`,
  `ss`.`surat_stack_status_tgl`,
  (`ss`.`surat_stack_baca_tgl` IS NOT NULL)					AS `surat_stack_isbaca`,
  `ss`.`surat_stack_baca_tgl`,
  IFNULL(`ss`.`surat_stack_isberkas`,0) 					AS `surat_stack_isberkas`,
  (`ss`.`surat_stack_berkasterima_tgl` IS NOT NULL)			AS `surat_stack_isberkasterima`,
  `ss`.`surat_stack_berkasterima_tgl`,
  `ss`.`surat_stack_properti`,
  `s`.*,
  `penerimaprofil`.`staf_profil_staf` 						AS `staf_id`,
  `penerima`.`staf_kode` 									AS `staf_kode`,
  `penerimaprofil`.`staf_profil_staf_nama` 					AS `staf_nama`,
  `penerimaprofil`.`staf_profil_unit` 						AS `unit_id`,
  `penerimaprofil`.`staf_profil_unit_nama` 					AS `unit_nama`,
  `penerima`.`unit_kode` 									AS `unit_kode`,
  `penerima`.`unit_rubrik` 									AS `unit_rubrik`,
  `penerimaprofil`.`staf_profil_jabatan` 					AS `jabatan_id`,
  `penerimaprofil`.`staf_profil_jabatan_nama` 				AS `jabatan_nama`,
  `penerima`.`jabatan_kode` 								AS `jabatan_kode`,
  IFNULL(`penerima`.`jabatan_isnomor`,0) 					AS `jabatan_isnomor`,
  IFNULL(`penerima`.`jabatan_ispenerima`,0) 				AS `jabatan_ispenerima`,

  `pelakuprofil`.`staf_profil_staf` 						AS `pelaku_id`,
  `pelakuprofil`.`staf_profil_staf_nama` 					AS `pelaku_nama`,
  `pelakuprofil`.`staf_profil_unit` 						AS `pelaku_unit_id`,
  `pelakuprofil`.`staf_profil_unit_nama` 					AS `pelaku_unit_nama`,
  `pelakuprofil`.`staf_profil_jabatan` 						AS `pelaku_jabatan_id`,
  `pelakuprofil`.`staf_profil_jabatan_nama` 				AS `pelaku_jabatan_nama`,
  
  `jabatanpelaku`.`jabatan_id` 								AS `jabatan_pelaku_id`,
  `jabatanpelaku`.`jabatan_nama` 							AS `jabatan_pelaku_nama`,

  `penyetujuprofil`.`staf_profil_staf` 						AS `penyetuju_id`,
  `penyetuju`.`staf_kode` 									AS `penyetuju_kode`,
  `penyetujuprofil`.`staf_profil_staf_nama` 				AS `penyetuju_nama`,
  `penyetujuprofil`.`staf_profil_unit` 						AS `penyetuju_unit_id`,
  `penyetujuprofil`.`staf_profil_unit_nama` 				AS `penyetuju_unit_nama`,
  `penyetujuprofil`.`staf_profil_jabatan` 					AS `penyetuju_jabatan_id`,
  `penyetujuprofil`.`staf_profil_jabatan_nama` 				AS `penyetuju_jabatan_nama`,
  IFNULL(`penyetuju`.`jabatan_isnomor`,0) 					AS `penyetuju_jabatan_isnomor`,
  IFNULL(`penyetuju`.`jabatan_ispenerima`,0) 				AS `penyetuju_jabatan_ispenerima`,

  `jabatanpenerima`.`jabatan_id`	 						AS `jabatan_penerima_id`,
  `jabatanpenerima`.`jabatan_nama` 							AS `jabatan_penerima_nama`,
  `jabatanpenerima`.`jabatan_isnomor` 						AS `jabatan_penerima_isnomor`,
  `jabatanpenerima`.`jabatan_ispenerima` 					AS `jabatan_penerima_ispenerima`,
  `jabatanpenerima`.`unit_id` 								AS `jabatan_penerima_unit_id`,
  `jabatanpenerima`.`unit_nama` 							AS `jabatan_penerima_unit_nama`

  -- `pr`.*
FROM `surat_stack` `ss`
LEFT JOIN `surat` `s` ON `ss`.`surat_stack_surat` = `s`.`surat_id`
LEFT JOIN `v_staf_lite` `penerima` ON `ss`.`surat_stack_staf` = `penerima`.`staf_id`
LEFT JOIN `staf_profil` `penerimaprofil` ON `ss`.`surat_stack_profil` = `penerimaprofil`.`staf_profil_id`
LEFT JOIN `v_staf_lite` `pelaku` ON `ss`.`surat_stack_pelaku` = `pelaku`.`staf_id`
LEFT JOIN `staf_profil` `pelakuprofil` ON `ss`.`surat_stack_pelaku_profil` = `pelakuprofil`.`staf_profil_id`
LEFT JOIN `v_staf_lite` `penyetuju` ON `s`.`surat_setuju_staf` = `penyetuju`.`staf_id`
LEFT JOIN `staf_profil` `penyetujuprofil` ON `s`.`surat_setuju_profil` = `penyetujuprofil`.`staf_profil_id`
LEFT JOIN `v_jabatan` `jabatanpenerima` ON `ss`.`surat_stack_jabatan` = `jabatanpenerima`.`jabatan_id`
LEFT JOIN `jabatan` `jabatanpelaku` ON `ss`.`surat_stack_pelaku_jabatan` = `jabatanpelaku`.`jabatan_id`
-- LEFT JOIN `v_properti_lite` `pr` ON `ss`.`surat_stack_properti` = `pr`.`properti_id`
;

CREATE OR REPLACE VIEW `v_surat_stack_disposisi` AS
SELECT
	`ss`.*
FROM `v_surat_stack` `ss`
WHERE IFNULL(`ss`.`surat_stack_model`,0) = 0
;

CREATE OR REPLACE VIEW `v_surat_stack_koreksi` AS
SELECT
	`ss`.*
FROM `v_surat_stack` `ss`
WHERE `ss`.`surat_stack_model` = 1
;

CREATE OR REPLACE VIEW `v_surat_stack_petikan` AS
SELECT
	`ss`.*
FROM `v_surat_stack` `ss`
WHERE `ss`.`surat_stack_model` = 2
;

/*==================================================================*/
/* View: v_surat_penerimask 										*/
/* View: v_surat_penerimask_jumlah 									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_penerimask` AS 
SELECT
  `sp`.`surat_penerimask_id`,
  `sp`.`surat_penerimask_staf`,
  `sp`.`surat_penerimask_profil`,
  `sp`.`surat_penerimask_pelaku`,
  `sp`.`surat_penerimask_pelaku_profil`,
  `sp`.`surat_penerimask_surat`,
  `sp`.`surat_penerimask_level`,
  `sp`.`surat_penerimask_terima_tgl`,
  `sp`.`surat_penerimask_status`,
  `sp`.`surat_penerimask_status_tgl`,
  `sp`.`surat_penerimask_baca_tgl`,
  `sp`.`surat_penerimask_properti`,
  `sp`.`surat_penerimask_gollama`,
  `sp`.`surat_penerimask_golbaru`,
  `sp`.`surat_penerimask_sglama`,
  `sp`.`surat_penerimask_sgbaru`,
  `sp`.`surat_penerimask_gplama`,
  `sp`.`surat_penerimask_gpbaru`,
  `sp`.`surat_penerimask_tmt`,
  `sp`.`surat_penerimask_jabatan_lama`,
  `sp`.`surat_penerimask_jabatan_baru`,
  `sp`.`surat_penerimask_jenjang_jabatan_lama`,
  `sp`.`surat_penerimask_jenjang_jabatan_baru`,
  `sp`.`surat_penerimask_keterangan`,

  `s`.*,
  `penerimaprofil`.`staf_profil_staf` 						AS `staf_id`,
  `penerima`.`staf_kode` 									AS `staf_kode`,
  `penerima`.`staf_kelamin`									AS `staf_kelamin`,
  `penerimaprofil`.`staf_profil_staf_nama` 					AS `staf_nama`,
  `penerimaprofil`.`staf_profil_unit` 						AS `unit_id`,
  `penerimaprofil`.`staf_profil_unit_nama` 					AS `unit_nama`,
  `penerima`.`unit_kode` 									AS `unit_kode`,
  `penerima`.`unit_rubrik` 									AS `unit_rubrik`,
  `penerimaprofil`.`staf_profil_jabatan` 					AS `jabatan_id`,
  `penerimaprofil`.`staf_profil_jabatan_nama` 				AS `jabatan_nama`,
  `penerima`.`jabatan_kode` 								AS `jabatan_kode`,
  IFNULL(`penerima`.`jabatan_isnomor`,0) 					AS `jabatan_isnomor`,
  IFNULL(`penerima`.`jabatan_ispenerima`,0) 				AS `jabatan_ispenerima`,

  `pelaku`.`staf_id` 										AS `pelaku_id`,
  `pelaku`.`staf_kode` 										AS `pelaku_kode`,
  `pelaku`.`staf_nama` 										AS `pelaku_nama`,
  `pelakuprofil`.`staf_profil_unit` 						AS `pelaku_unit_id`,
  `pelakuprofil`.`staf_profil_unit_nama` 					AS `pelaku_unit_nama`,
  `pelakuprofil`.`staf_profil_jabatan` 						AS `pelaku_jabatan_id`,
  `pelakuprofil`.`staf_profil_jabatan_nama` 				AS `pelaku_jabatan_nama`,

  `jl`.`jabatan_id`				 							AS `jabatan_lama_id`,
  `jl`.`jabatan_nama`			 							AS `jabatan_lama_nama`,
  `jl`.`jabatan_kode`			 							AS `jabatan_lama_kode`,
  `jl`.`unit_id`			 								AS `jabatan_lama_unit_id`,
  `jl`.`unit_nama`			 								AS `jabatan_lama_unit_nama`,

  `jb`.`jabatan_id`				 							AS `jabatan_baru_id`,
  `jb`.`jabatan_nama`			 							AS `jabatan_baru_nama`,
  `jb`.`jabatan_kode`			 							AS `jabatan_baru_kode`,
  `jb`.`unit_id`			 								AS `jabatan_baru_unit_id`,
  `jb`.`unit_nama`			 								AS `jabatan_baru_unit_nama`,

  `gl`.`golongan_id`										AS `golongan_lama_id`,
  `gl`.`golongan_level`										AS `golongan_lama_level`,
  `gl`.`golongan_sgt`										AS `golongan_lama_sgt`,
  `gl`.`golongan_gaji_pokok`								AS `golongan_lama_gaji_pokok`,

  `gb`.`golongan_id`										AS `golongan_baru_id`,
  `gb`.`golongan_level`										AS `golongan_baru_level`,
  `gb`.`golongan_sgt`										AS `golongan_baru_sgt`,
  `gb`.`golongan_gaji_pokok`								AS `golongan_baru_gaji_pokok`

--   `penyetujuprofil`.`staf_profil_staf` 						AS `penyetuju_id`,
--   `penyetuju`.`staf_kode` 									AS `penyetuju_kode`,
--   `penyetujuprofil`.`staf_profil_staf_nama` 				AS `penyetuju_nama`,
--   `penyetujuprofil`.`staf_profil_unit` 						AS `penyetuju_unit_id`,
--   `penyetujuprofil`.`staf_profil_unit_nama` 				AS `penyetuju_unit_nama`,
--   `penyetujuprofil`.`staf_profil_jabatan` 					AS `penyetuju_jabatan_id`,
--   `penyetujuprofil`.`staf_profil_jabatan_nama` 				AS `penyetuju_jabatan_nama`,
--   IFNULL(`penyetuju`.`jabatan_isnomor`,0) 					AS `penyetuju_jabatan_isnomor`,
--   IFNULL(`penyetuju`.`jabatan_ispenerima`,0) 				AS `penyetuju_jabatan_ispenerima`
  -- `pr`.*
FROM `surat_penerimask` `sp`
LEFT JOIN `surat` `s` ON `sp`.`surat_penerimask_surat` = `s`.`surat_id`
LEFT JOIN `v_staf_lite` `penerima` ON `sp`.`surat_penerimask_staf` = `penerima`.`staf_id`
LEFT JOIN `staf_profil` `penerimaprofil` ON `sp`.`surat_penerimask_profil` = `penerimaprofil`.`staf_profil_id`
LEFT JOIN `v_staf_lite` `pelaku` ON `sp`.`surat_penerimask_pelaku` = `pelaku`.`staf_id`
LEFT JOIN `staf_profil` `pelakuprofil` ON `sp`.`surat_penerimask_pelaku_profil` = `pelakuprofil`.`staf_profil_id`
LEFT JOIN `v_jabatan` `jl` ON `sp`.`surat_penerimask_jabatan_lama` = `jl`.`jabatan_id`
LEFT JOIN `v_jabatan` `jb` ON `sp`.`surat_penerimask_jabatan_baru` = `jb`.`jabatan_id`
LEFT JOIN `golongan` `gl` ON `sp`.`surat_penerimask_gollama` = `gl`.`golongan_id`
LEFT JOIN `golongan` `gb` ON `sp`.`surat_penerimask_golbaru` = `gb`.`golongan_id`
-- LEFT JOIN `v_staf_lite` `penyetuju` ON `s`.`surat_setuju_staf` = `penyetuju`.`staf_id`
-- LEFT JOIN `staf_profil` `penyetujuprofil` ON `s`.`surat_setuju_profil` = `penyetujuprofil`.`staf_profil_id`
-- LEFT JOIN `v_properti_lite` `pr` ON `sp`.`surat_penerimask_properti` = `pr`.`properti_id`
;

CREATE OR REPLACE VIEW `v_surat_penerimask_jumlah` AS 
SELECT
    `s`.`surat_penerimask_surat` AS `surat_penerimask_surat`,
    COUNT(DISTINCT `s`.`surat_penerimask_staf`) AS `surat_penerimask_jumlah`
FROM
    `surat_penerimask` `s`
GROUP BY `s`.`surat_penerimask_surat`
;

/*==================================================================*/
/* View: v_aksi 													*/
/* View: v_aksi_lite												*/
/* View: v_aksi_musnah												*/
/* View: v_aksi_hidup												*/
/* View: v_aksi_aktif												*/
/* View: v_aksi_nonaktif											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_aksi` AS
SELECT
	`a`.`aksi_id`,
	`a`.`aksi_nama`,
	`a`.`aksi_kode`,
	IFNULL(`a`.`aksi_isaktif`,0)				AS `aksi_isaktif`,
	`a`.`aksi_ishapus`,
	`a`.`aksi_properti`
FROM `aksi` `a`
;

CREATE OR REPLACE VIEW `v_aksi_lite` AS
SELECT
	`a`.`aksi_id`,
	`a`.`aksi_nama`,
	`a`.`aksi_kode`
FROM `aksi` `a`
;

CREATE OR REPLACE VIEW `v_aksi_musnah` AS
SELECT
	`a`.*
FROM `v_aksi` `a`
WHERE `a`.`aksi_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_aksi_hidup` AS
SELECT
	`a`.*
FROM `v_aksi` `a`
WHERE IFNULL(`a`.`aksi_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_aksi_aktif` AS
SELECT
	`a`.*
FROM `v_aksi` `a`
WHERE IFNULL(`a`.`aksi_ishapus`, 0) = 0 AND `a`.`aksi_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_aksi_nonaktif` AS
SELECT
	`a`.*
FROM `v_aksi` `a`
WHERE IFNULL(`a`.`aksi_ishapus`, 0) = 0 AND IFNULL(`a`.`aksi_isaktif`, 0) = 0
;

/*==================================================================*/
/* View: v_perintah 												*/
/* View: v_perintah_lite											*/
/* View: v_perintah_musnah											*/
/* View: v_perintah_hidup											*/
/* View: v_perintah_aktif											*/
/* View: v_perintah_nonaktif										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_perintah` AS
SELECT
	`p`.`perintah_id`,
	`p`.`perintah_nama`,
	`p`.`perintah_kode`,
	IFNULL(`p`.`perintah_isaktif`,0)				AS `perintah_isaktif`,
	`p`.`perintah_ishapus`,
	`p`.`perintah_properti`
FROM `perintah` `p`
;

CREATE OR REPLACE VIEW `v_perintah_lite` AS
SELECT
	`p`.`perintah_id`,
	`p`.`perintah_nama`,
	`p`.`perintah_kode`
FROM `perintah` `p`
;

CREATE OR REPLACE VIEW `v_perintah_musnah` AS
SELECT
	`p`.*
FROM `v_perintah` `p`
WHERE `p`.`perintah_ishapus` = 1
;

CREATE OR REPLACE VIEW `v_perintah_hidup` AS
SELECT
	`p`.*
FROM `v_perintah` `p`
WHERE IFNULL(`p`.`perintah_ishapus`, 0) = 0
;

CREATE OR REPLACE VIEW `v_perintah_aktif` AS
SELECT
	`p`.*
FROM `v_perintah` `p`
WHERE IFNULL(`p`.`perintah_ishapus`, 0) = 0 AND `p`.`perintah_isaktif` = 1
;

CREATE OR REPLACE VIEW `v_perintah_nonaktif` AS
SELECT
	`p`.*
FROM `v_perintah` `p`
WHERE IFNULL(`p`.`perintah_ishapus`, 0) = 0 AND IFNULL(`p`.`perintah_isaktif`, 0) = 0
;

/*==================================================================*/
/* View: v_disposisi_jumlah_penerima 								*/
/* View: v_disposisi_jumlah_penerima_baca 							*/
/* View: v_disposisi_jumlah_penerima_sama 							*/
/* View: v_disposisi_masuk_sorter 									*/
/* View: v_disposisi_jumlah_berkas_request 							*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_disposisi_jumlah_penerima` AS 
SELECT
    `dm`.`disposisi_masuk_disposisi`,
    COUNT(`dm`.`disposisi_masuk_id`) AS `disposisi_jumlah_penerima`
FROM
    `disposisi_masuk` `dm`
GROUP BY `dm`.`disposisi_masuk_disposisi`
;

CREATE OR REPLACE VIEW `v_disposisi_jumlah_penerima_baca` AS 
SELECT
    `dm`.`disposisi_masuk_disposisi`,
    COUNT(`dm`.`disposisi_masuk_id`) AS `disposisi_jumlah_penerima_baca`
FROM
    `disposisi_masuk` `dm`
WHERE 
    `dm`.`disposisi_masuk_baca_tgl` IS NOT NULL
GROUP BY `dm`.`disposisi_masuk_disposisi`
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_sorter` AS 
SELECT
    `dm`.`disposisi_masuk_disposisi`,
    COUNT(DISTINCT`dm`.`disposisi_masuk_id`) AS `disposisi_masuk_sorter`
FROM
    `disposisi_masuk` `dm`
WHERE 
    ISNULL(`dm`.`disposisi_masuk_aksi_baca_tgl`) AND
    ISNULL(`dm`.`disposisi_masuk_cabut_tgl`) AND 
    `dm`.`disposisi_masuk_aksi` IS NOT NULL
GROUP BY `dm`.`disposisi_masuk_disposisi`
;

CREATE OR REPLACE VIEW `v_disposisi_jumlah_penerima_sama` AS 
SELECT
    `d`.`disposisi_surat` 				AS `surat_id`,
    `dm`.`disposisi_masuk_jabatan`		AS `disposisi_masuk_jabatan`,
    COUNT(`dm`.`disposisi_masuk_id`) 	AS `jumlah_penerima`
FROM
    `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d` ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
WHERE
	IFNULL(`d`.`disposisi_model`,0) = 0 AND
	ISNULL(`d`.`disposisi_induk`) AND
	`dm`.`disposisi_masuk_jabatan` IS NOT NULL
GROUP BY 
	`d`.`disposisi_surat`,
	`dm`.`disposisi_masuk_jabatan`
;

CREATE OR REPLACE VIEW `v_disposisi_jumlah_penerima_disposisi_sama` AS 
SELECT
    `d`.`disposisi_surat` 				AS `surat_id`,
    `dm`.`disposisi_masuk_staf`			AS `disposisi_masuk_staf`,
    COUNT(`dm`.`disposisi_masuk_id`) 	AS `jumlah_penerima`
FROM
    `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d` ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
WHERE
    IFNULL(`d`.`disposisi_model`,0) = 0 AND
	-- `d`.`disposisi_induk` IS NOT NULL AND
	`dm`.`disposisi_masuk_staf` IS NOT NULL
GROUP BY 
	`d`.`disposisi_surat`,
	`dm`.`disposisi_masuk_staf`
;

CREATE OR REPLACE VIEW `v_disposisi_jumlah_berkas_request` AS
SELECT
	`d`.`disposisi_surat`,
	COUNT(`dm`.`disposisi_masuk_id`) AS `disposisi_jumlah_berkas_request`
FROM `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d`	ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
WHERE
	IFNULL(`d`.`disposisi_model`,0) = 0 AND
	`d`.`disposisi_surat` IS NOT NULL AND
	ISNULL(`dm`.`disposisi_masuk_cabut_tgl`) AND
	`dm`.`disposisi_masuk_berkas_status` = 1
GROUP BY `d`.`disposisi_surat`
;

/*==================================================================*/
/* View: v_disposisi_abstract 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_abstract` AS
SELECT
	`d`.`disposisi_id`,
	`d`.`disposisi_staf`,
	`d`.`disposisi_profil`,
	`d`.`disposisi_pelaku`,
	`d`.`disposisi_pelaku_profil`,
	`d`.`disposisi_pulih_staf`,
	`d`.`disposisi_surat`,
	`d`.`disposisi_perintah`,
	`d`.`disposisi_induk`,
	IFNULL(`d`.`disposisi_model`,0) 						AS `disposisi_model`,
	IFNULL(`d`.`disposisi_model_sub`,0) 					AS `disposisi_model_sub`,
	`d`.`disposisi_nomor`,
	`d`.`disposisi_tgl`,
	`d`.`disposisi_pesan`,
	`d`.`disposisi_baca_tgl`,
	`d`.`disposisi_cabut_tgl`,
	`d`.`disposisi_pulih_tgl`,
	`d`.`disposisi_cabut_induk`,
	`d`.`disposisi_parent_path`,
	`d`.`disposisi_properti`,
	IFNULL(`d`.`disposisi_istunggal`,0) 					AS `disposisi_istunggal`,
	IFNULL(`d`.`disposisi_israhasia`,0) 					AS `disposisi_israhasia`,
	(`d`.`disposisi_baca_tgl` IS NOT NULL)					AS `disposisi_isbaca`,
	(`d`.`disposisi_cabut_tgl` IS NOT NULL)					AS `disposisi_iscabut`,
	(`d`.`disposisi_pulih_tgl` IS NOT NULL)					AS `disposisi_ispulih`,
	(`d`.`disposisi_useprioritas` IS NOT NULL)				AS `disposisi_useprioritas`,
	`d`.`disposisi_prioritas_tgl`,

	`djp`.`disposisi_jumlah_penerima`,
	`djps`.`disposisi_jumlah_penerima_sdhproses`,
	`djpb`.`disposisi_jumlah_penerima_baca`,

	IF(`dms`.`disposisi_masuk_sorter`, 0, 1) AS `disposisi_sorter`,

	`pengirimprofil`.`staf_profil_staf` 					AS `disposisi_pengirim_id`,
	`pengirim`.`staf_kode` 									AS `disposisi_pengirim_kode`,
	IFNULL(`pengirim`.`staf_isaktif`,0) 					AS `disposisi_pengirim_isaktif`,
	`pengirimprofil`.`staf_profil_staf_nama` 				AS `disposisi_pengirim_nama`,
	`pengirimprofil`.`staf_profil_unit` 					AS `disposisi_pengirim_unit`,
	`pengirimprofil`.`staf_profil_unit_nama` 				AS `disposisi_pengirim_unit_nama`,
	`pengirimprofil`.`staf_profil_jabatan`					AS `disposisi_pengirim_jabatan`,
	`pengirimprofil`.`staf_profil_jabatan_nama` 			AS `disposisi_pengirim_jabatan_nama`,

	`pelakuprofil`.`staf_profil_staf` 						AS `disposisi_pelaku_id`,
	`pelaku`.`staf_kode` 									AS `disposisi_pelaku_kode`,
	IFNULL(`pelaku`.`staf_isaktif`,0) 						AS `disposisi_pelaku_isaktif`,
	`pelakuprofil`.`staf_profil_staf_nama` 					AS `disposisi_pelaku_nama`,
	`pelakuprofil`.`staf_profil_unit` 						AS `disposisi_pelaku_unit`,
	`pelakuprofil`.`staf_profil_unit_nama` 					AS `disposisi_pelaku_unit_nama`,
	`pelakuprofil`.`staf_profil_jabatan`					AS `disposisi_pelaku_jabatan`,
	`pelakuprofil`.`staf_profil_jabatan_nama` 				AS `disposisi_pelaku_jabatan_nama`,

	-- `pemulih`.`staf_id` 									AS `disposisi_pemulih_id`,
	-- `pemulih`.`staf_kode` 								AS `disposisi_pemulih_kode`,
	-- `pemulih`.`staf_nama` 								AS `disposisi_pemulih_nama`,
	-- `pemulih`.`staf_unit` 								AS `disposisi_pemulih_unit`,
	-- `pemulih`.`staf_isaktif` 							AS `disposisi_pemulih_isaktif`,
	-- `pemulih`.`unit_nama` 								AS `disposisi_pemulih_unit_nama`,
	-- `pemulih`.`staf_jabatan`								AS `disposisi_pemulih_jabatan`,
	-- `pemulih`.`jabatan_nama` 							AS `disposisi_pemulih_jabatan_nama`,
	`perintah`.`perintah_id` 								AS `perintah_id`,
	`perintah`.`perintah_kode` 								AS `perintah_kode`,
	`perintah`.`perintah_nama` 								AS `perintah_nama`,

	`s`.*

FROM `disposisi` `d`
LEFT JOIN `v_staf_lite` `pengirim` 							ON `d`.`disposisi_staf` = `pengirim`.`staf_id`
LEFT JOIN `staf_profil` `pengirimprofil` 					ON `d`.`disposisi_profil` = `pengirimprofil`.`staf_profil_id`
LEFT JOIN `v_staf_lite` `pelaku` 							ON `d`.`disposisi_pelaku` = `pelaku`.`staf_id`
LEFT JOIN `staf_profil` `pelakuprofil` 						ON `d`.`disposisi_pelaku_profil` = `pelakuprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `pemulih` 						ON `d`.`disposisi_pulih_staf` = `pemulih`.`staf_id`
LEFT JOIN `v_surat_lite` `s` 								ON `d`.`disposisi_surat` = `s`.`surat_id`
LEFT JOIN `perintah` `perintah` 							ON `d`.`disposisi_perintah` = `perintah`.`perintah_id`
LEFT JOIN `disposisi_jumlah_penerima` `djp` FORCE INDEX(PRIMARY) 				ON `d`.`disposisi_id` = `djp`.`disposisi_masuk_disposisi`
LEFT JOIN `disposisi_jumlah_penerima_sdhproses` `djps` FORCE INDEX(PRIMARY) 	ON `d`.`disposisi_id` = `djps`.`disposisi_masuk_disposisi`
LEFT JOIN `disposisi_jumlah_penerima_baca` `djpb` FORCE INDEX(PRIMARY)			ON `d`.`disposisi_id` = `djpb`.`disposisi_masuk_disposisi`
LEFT JOIN `disposisi_masuk_sorter` `dms` FORCE INDEX(PRIMARY)					ON `d`.`disposisi_id` = `dms`.`disposisi_masuk_disposisi`
;
CREATE OR REPLACE VIEW `v_disposisi_netral` AS
SELECT
	`d`.*
FROM `v_disposisi_abstract` `d`
WHERE IFNULL(`d`.`disposisi_model`,0) = 0
;
/*==================================================================*/
/* View: v_disposisi 												*/
/* View: v_disposisi_musnah 										*/
/* View: v_disposisi_hidup 											*/
/* View: v_disposisi_aktif 											*/
/* View: v_disposisi_nonaktif 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi` AS
SELECT
	`d`.*
FROM `v_disposisi_netral` `d`
WHERE IFNULL(`d`.`disposisi_model_sub`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_musnah` AS
SELECT
	`d`.*
FROM `v_disposisi` `d`
;

CREATE OR REPLACE VIEW `v_disposisi_hidup` AS
SELECT
	`d`.*
FROM `v_disposisi` `d`
;

CREATE OR REPLACE VIEW `v_disposisi_aktif` AS
SELECT
	`d`.*
FROM `v_disposisi` `d`
WHERE IFNULL(`disposisi_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_nonaktif` AS
SELECT
	`d`.*
FROM `v_disposisi` `d`
WHERE `disposisi_iscabut` = 1
;

/*==================================================================*/
/* View: v_notadinas 												*/
/* View: v_notadinas_musnah 										*/
/* View: v_notadinas_hidup 											*/
/* View: v_notadinas_aktif 											*/
/* View: v_notadinas_nonaktif 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notadinas` AS
SELECT
	`d`.*
FROM `v_disposisi_netral` `d`
WHERE `d`.`disposisi_model_sub` = 1
;

CREATE OR REPLACE VIEW `v_notadinas_musnah` AS
SELECT
	`d`.*
FROM `v_notadinas` `d`
;

CREATE OR REPLACE VIEW `v_notadinas_hidup` AS
SELECT
	`d`.*
FROM `v_notadinas` `d`
;

CREATE OR REPLACE VIEW `v_notadinas_aktif` AS
SELECT
	`d`.*
FROM `v_notadinas` `d`
WHERE IFNULL(`disposisi_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_notadinas_nonaktif` AS
SELECT
	`d`.*
FROM `v_notadinas` `d`
WHERE `disposisi_iscabut` = 1
;

/*==================================================================*/
/* View: v_koreksi 												*/
/* View: v_koreksi_musnah 										*/
/* View: v_koreksi_hidup 										*/
/* View: v_koreksi_aktif 										*/
/* View: v_koreksi_nonaktif 									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_koreksi` AS
SELECT
	`k`.*
FROM `v_disposisi_abstract` `k`
WHERE `k`.`disposisi_model` = 1
;

CREATE OR REPLACE VIEW `v_koreksi_musnah` AS
SELECT
	`k`.*
FROM `v_koreksi` `k`
;

CREATE OR REPLACE VIEW `v_koreksi_hidup` AS
SELECT
	`k`.*
FROM `v_koreksi` `k`
;

CREATE OR REPLACE VIEW `v_koreksi_aktif` AS
SELECT
	`k`.*
FROM `v_koreksi` `k`
WHERE IFNULL(`disposisi_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_koreksi_nonaktif` AS
SELECT
	`k`.*	
FROM `v_koreksi` `k`
WHERE `disposisi_iscabut` = 1
;

/*==============================================================*/
/* View: v_disposisi_riwayat 									*/
/* View: v_disposisi_riwayat_aktif 								*/ 
/* View: v_disposisi_riwayat_nonaktif 							*/
/*==============================================================*/
CREATE OR REPLACE VIEW `v_disposisi_riwayat` AS
SELECT
	`d`.*
FROM `v_disposisi_netral` `d`
WHERE `d`.`disposisi_induk` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_disposisi_riwayat_aktif` AS
SELECT
	`d`.*
FROM `v_disposisi_riwayat` `d`
WHERE IFNULL(`d`.`disposisi_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_riwayat_nonaktif` AS
SELECT
	`d`.*
FROM `v_disposisi_riwayat` `d`
WHERE `d`.`disposisi_iscabut` = 1
;

/*==================================================================*/
/* View: v_koreksi_riwayat 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_koreksi_riwayat` AS
SELECT 
	`kp`.*
FROM `v_koreksi` `kp`
;

/*==================================================================*/
/* View: v_disposisi_masuk_abstract 								*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_masuk_abstract` AS
SELECT
	`dm`.`disposisi_masuk_id`,
	`dm`.`disposisi_masuk_disposisi`,
	IFNULL(`dm`.`disposisi_masuk_model`,0) 					AS `disposisi_masuk_model`,
	IFNULL(`dm`.`disposisi_masuk_model_sub`,0) 				AS `disposisi_masuk_model_sub`,
	`dm`.`disposisi_masuk_staf`,
	`dm`.`disposisi_masuk_profil`,
	`dm`.`disposisi_masuk_jabatan`,
	IFNULL(`dm`.`disposisi_masuk_istembusan`,0) 			AS `disposisi_masuk_istembusan`,
	IFNULL(`dm`.`disposisi_masuk_isberkas`,0) 				AS `disposisi_masuk_isberkas`,
	`dm`.`disposisi_masuk_nomor`,
	`dm`.`disposisi_masuk_pesan`,
	(`dm`.`disposisi_masuk_terima_tgl` IS NOT NULL)			AS `disposisi_masuk_isterima`,
	`dm`.`disposisi_masuk_terima_tgl`,
	`dm`.`disposisi_masuk_terima_staf`,
	`dm`.`disposisi_masuk_terima_profil`,
	`dm`.`disposisi_masuk_terima_jabatan`,
	(`dm`.`disposisi_masuk_baca_tgl` IS NOT NULL)			AS `disposisi_masuk_isbaca`,
	`dm`.`disposisi_masuk_baca_tgl`,
	`dm`.`disposisi_masuk_baca_staf`,
	`dm`.`disposisi_masuk_baca_profil`,
	(`dm`.`disposisi_masuk_berkasterima_tgl` IS NOT NULL)	AS `disposisi_masuk_isberkasterima`,
	`dm`.`disposisi_masuk_berkasterima_tgl`,
	`dm`.`disposisi_masuk_berkasterima_staf`,
	`dm`.`disposisi_masuk_berkasterima_profil`,
	IFNULL(`dm`.`disposisi_masuk_berkas_status`,0) 			AS `disposisi_masuk_berkas_status`,
	`dm`.`disposisi_masuk_berkas_status_staf`,
	`dm`.`disposisi_masuk_berkas_status_profil`,
	`dm`.`disposisi_masuk_berkas_status_tgl`,
	`dm`.`disposisi_masuk_berkas_komentar`,
	(`dm`.`disposisi_masuk_terus_tgl` IS NOT NULL)			AS `disposisi_masuk_isterus`,
	`dm`.`disposisi_masuk_terus_tgl`,
	`dm`.`disposisi_masuk_terus_staf`,
	`dm`.`disposisi_masuk_terus_profil`,
	(`dm`.`disposisi_masuk_cabut_tgl` IS NOT NULL)			AS `disposisi_masuk_iscabut`,
	`dm`.`disposisi_masuk_cabut_tgl`,
	`dm`.`disposisi_masuk_cabut_staf`,
	`dm`.`disposisi_masuk_cabut_profil`,
	(`dm`.`disposisi_masuk_pulih_tgl` IS NOT NULL)			AS `disposisi_masuk_ispulih`,
	`dm`.`disposisi_masuk_pulih_tgl`,
	`dm`.`disposisi_masuk_pulih_staf`,
	`dm`.`disposisi_masuk_pulih_profil`,
	IFNULL(`dm`.`disposisi_masuk_status`, 0) 				AS `disposisi_masuk_status`,
	`dm`.`disposisi_masuk_status_tgl`,
	`dm`.`disposisi_masuk_status_staf`,
	`dm`.`disposisi_masuk_status_profil`,
	`dm`.`disposisi_masuk_aksi`,
	`dm`.`disposisi_masuk_aksi_tgl`,
	`dm`.`disposisi_masuk_aksi_staf`,
	`dm`.`disposisi_masuk_aksi_profil`,
	(`dm`.`disposisi_masuk_induk_baca_tgl` IS NOT NULL)		AS `disposisi_masuk_induk_isbaca`,
	`dm`.`disposisi_masuk_induk_baca_tgl`,
	`dm`.`disposisi_masuk_induk_baca_staf`,
	`dm`.`disposisi_masuk_induk_baca_profil`,
	(`dm`.`disposisi_masuk_aksi_baca_tgl` IS NOT NULL)		AS `disposisi_masuk_aksi_isbaca`,
	`dm`.`disposisi_masuk_aksi_baca_tgl`,
	`dm`.`disposisi_masuk_aksi_baca_staf`,
	`dm`.`disposisi_masuk_aksi_baca_profil`,
	`dm`.`disposisi_masuk_parent_path`,
	`dm`.`disposisi_masuk_properti`,
	`djp`.`disposisi_jumlah_penerima` 						AS `disposisi_masuk_jumlah_penerima`,

	IFNULL(`dm`.`disposisi_masuk_koreksi_status`, 0) 		AS `disposisi_masuk_koreksi_status`,

	IFNULL(`dm`.`disposisi_masuk_ispengingat`, 0) 			AS `disposisi_masuk_ispengingat`,
	`dm`.`disposisi_masuk_pengingat_tgl`,
	`dm`.`disposisi_masuk_pengingat_staf`,

	(CASE 
	WHEN (IFNULL(`d`.`disposisi_model`, 0) = 0 AND IFNULL(`dm`.`disposisi_masuk_istembusan`, 0) = 0 AND ISNULL(`dm`.`disposisi_masuk_terus_tgl`) AND ISNULL(`dm`.`disposisi_masuk_aksi`) AND `s`.`surat_prioritas_tgl` IS NOT NULL) THEN 1
	ELSE 
		(CASE 
			WHEN (`d`.`disposisi_model` = 1 AND IFNULL(`dm`.`disposisi_masuk_status`, 0) = 0 AND `s`.`surat_prioritas_tgl` IS NOT NULL) THEN 1
			ELSE 0
		END)
   END) AS `disposisi_masuk_isprioritas`,
	`dm`.`disposisi_masuk_pengingat_profil`,
		
	`d`.`disposisi_id`,
	`d`.`disposisi_staf`,
	`d`.`disposisi_profil`,
	`d`.`disposisi_pelaku`,
	`d`.`disposisi_pelaku_profil`,
	`d`.`disposisi_pulih_staf`,
	`d`.`disposisi_surat`,
	`d`.`disposisi_perintah`,
	`d`.`disposisi_induk`,
	`d`.`disposisi_parent_path`,
	IFNULL(`d`.`disposisi_model`, 0) 		AS `disposisi_model`,
	IFNULL(`d`.`disposisi_model_sub`, 0) 	AS `disposisi_model_sub`,
	(CASE 
		WHEN `d`.`disposisi_model` = '1' THEN 
			(CASE
				WHEN `d`.`disposisi_model_sub` = '1' THEN 'Petikan'
				ELSE 'Draf'
			END)
		ELSE 
			(CASE 
				WHEN (ISNULL(`d`.`disposisi_induk`)) THEN 'Masuk'
				ELSE 
					(CASE 
						WHEN `d`.`disposisi_model_sub` = '1' THEN 'Nota Dinas'
						ELSE 'Disposisi'
					END)
			END)
    END) AS `disposisi_mode`,
	`d`.`disposisi_nomor`,
	`d`.`disposisi_tgl`,
	`d`.`disposisi_pesan`,
	`d`.`disposisi_baca_tgl`,
	`d`.`disposisi_cabut_tgl`,
	`d`.`disposisi_pulih_tgl`,
	`d`.`disposisi_cabut_induk`,
	`d`.`disposisi_properti`,
	`d`.`disposisi_useprioritas`,
	`d`.`disposisi_prioritas_tgl`,
	IFNULL(`d`.`disposisi_istunggal`,0) 					AS `disposisi_istunggal`,
	IFNULL(`d`.`disposisi_israhasia`,0) 					AS `disposisi_israhasia`,
	(`d`.`disposisi_baca_tgl` IS NOT NULL)					AS `disposisi_isbaca`,
	(`d`.`disposisi_cabut_tgl` IS NOT NULL)					AS `disposisi_iscabut`,
	(`d`.`disposisi_pulih_tgl` IS NOT NULL)					AS `disposisi_ispulih`,

	`pengirimprofil`.`staf_profil_staf` 					AS `disposisi_pengirim_id`,
	`pengirimprofil`.`staf_profil_staf_nama` 				AS `disposisi_pengirim_nama`,
	`pengirimprofil`.`staf_profil_unit` 					AS `disposisi_pengirim_unit`,
	`pengirimprofil`.`staf_profil_unit_nama` 				AS `disposisi_pengirim_unit_nama`,
	`pengirimprofil`.`staf_profil_jabatan` 					AS `disposisi_pengirim_jabatan`,
	`pengirimprofil`.`staf_profil_jabatan_nama` 			AS `disposisi_pengirim_jabatan_nama`,

	`pelakuprofil`.`staf_profil_staf` 						AS `disposisi_pelaku_id`,
	`pelakuprofil`.`staf_profil_staf_nama` 					AS `disposisi_pelaku_nama`,
	`pelakuprofil`.`staf_profil_unit_nama` 					AS `disposisi_pelaku_unit_nama`,
	`pelakuprofil`.`staf_profil_jabatan_nama` 				AS `disposisi_pelaku_jabatan_nama`,

	`penerimaprofil`.`staf_profil_staf` 					AS `disposisi_masuk_penerima_id`,
	`penerimaprofil`.`staf_profil_staf_nama` 				AS `disposisi_masuk_penerima_nama`,
	`penerimaprofil`.`staf_profil_unit` 					AS `disposisi_masuk_penerima_unit_id`,
	`penerimaprofil`.`staf_profil_unit_nama` 				AS `disposisi_masuk_penerima_unit_nama`,
	`penerimaprofil`.`staf_profil_jabatan` 					AS `disposisi_masuk_penerima_jabatan_id`,
	`penerimaprofil`.`staf_profil_jabatan_nama` 			AS `disposisi_masuk_penerima_jabatan_nama`,
	
	`jabatanpenerima`.`jabatan_id` 							AS `jabatan_penerima_id`,
	`jabatanpenerima`.`jabatan_nama` 						AS `jabatan_penerima_nama`,
	`jabatanpenerima`.`unit_id` 							AS `jabatan_penerima_unit_id`,
	`jabatanpenerima`.`unit_nama` 							AS `jabatan_penerima_unit_nama`,

	-- `terimaprofil`.`staf_profil_staf` 					AS `disposisi_masuk_terima_id`,
	-- `terimaprofil`.`staf_profil_staf_nama` 				AS `disposisi_masuk_terima_nama`,
	-- `terimaprofil`.`staf_profil_unit_nama` 				AS `disposisi_masuk_terima_unit_nama`,
	-- `terimaprofil`.`staf_profil_jabatan_nama` 			AS `disposisi_masuk_terima_jabatan_nama`,

	-- `pembacaprofil`.`staf_profil_staf` 					AS `pembaca_id`,
	-- `pembacaprofil`.`staf_profil_staf_nama` 				AS `pembaca_nama`,
	-- `pembacaprofil`.`staf_profil_unit_nama` 				AS `pembaca_unit_nama`,
	-- `pembacaprofil`.`staf_profil_jabatan_nama` 			AS `pembaca_jabatan_nama`,

	`penerimaberkasprofil`.`staf_profil_staf` 				AS `penerimaberkas_id`,
	`penerimaberkasprofil`.`staf_profil_staf_nama` 			AS `penerimaberkas_nama`,
	`penerimaberkasprofil`.`staf_profil_jabatan` 			AS `penerimaberkas_jabatan_id`,
	-- `penerimaberkasprofil`.`staf_profil_unit_nama` 			AS `penerimaberkas_unit_nama`,
	-- `penerimaberkasprofil`.`staf_profil_jabatan_nama` 		AS `penerimaberkas_jabatan_nama`,

	`berkasprofil`.`staf_profil_staf` 						AS `berkas_id`,
	`berkasprofil`.`staf_profil_staf_nama` 					AS `berkas_nama`,
	`berkasprofil`.`staf_profil_jabatan` 					AS `berkas_jabatan_id`,
	-- `berkasprofil`.`staf_profil_unit_nama` 					AS `berkas_unit_nama`,
	-- `berkasprofil`.`staf_profil_jabatan_nama` 				AS `berkas_jabatan_nama`,

	-- `penerusprofil`.`staf_profil_staf` 						AS `penerus_id`,
	-- `penerusprofil`.`staf_profil_staf_nama` 				AS `penerus_nama`,
	-- `penerusprofil`.`staf_profil_unit_nama` 				AS `penerus_unit_nama`,
	-- `penerusprofil`.`staf_profil_jabatan_nama` 				AS `penerus_jabatan_nama`,
	`penerusprofil`.`staf_profil_jabatan` 					AS `penerus_jabatan_id`,

	-- `pencabutprofil`.`staf_profil_staf` 					AS `pencabut_id`,
	-- `pencabutprofil`.`staf_profil_staf_nama` 			AS `pencabut_nama`,
	-- `pencabutprofil`.`staf_profil_unit_nama` 			AS `pencabut_unit_nama`,
	-- `pencabutprofil`.`staf_profil_jabatan_nama` 			AS `pencabut_jabatan_nama`,

	-- `pemulihprofil`.`staf_profil_staf` 					AS `pemulih_id`,
	-- `pemulihprofil`.`staf_profil_staf_nama` 				AS `pemulih_nama`,
	-- `pemulihprofil`.`staf_profil_unit_nama` 				AS `pemulih_unit_nama`,
	-- `pemulihprofil`.`staf_profil_jabatan_nama` 			AS `pemulih_jabatan_nama`,

	`statusprofil`.`staf_profil_staf_nama`					AS `disposisi_masuk_status_staf_nama`,

	`a`.`aksi_id`,
	`a`.`aksi_kode`,
	`a`.`aksi_nama`,

	`perintah`.`perintah_id`,
	`perintah`.`perintah_kode`,
	`perintah`.`perintah_nama`,

	`ssj`.`surat_setuju_setuju`,
	`ssj`.`surat_setuju_tolak`,
	`ssj`.`surat_setuju_pending`,
	`ssj`.`surat_setuju_total`,

	`sijs`.`surat_imasuk_setuju`,
	`sijt`.`surat_imasuk_tolak`,
	`sij`.`surat_imasuk_total`,

	`s`.*

FROM `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d` 									ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
-- LEFT JOIN `v_staf_lite` `pengirim` 							ON `d`.`disposisi_staf` = `pengirim`.`staf_id`
LEFT JOIN `staf_profil` `pengirimprofil` 					ON `d`.`disposisi_profil` = `pengirimprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `pelaku` 							ON `d`.`disposisi_pelaku` = `pelaku`.`staf_id`
LEFT JOIN `staf_profil` `pelakuprofil` 						ON `d`.`disposisi_pelaku_profil` = `pelakuprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `penerima` 							ON `dm`.`disposisi_masuk_staf` = `penerima`.`staf_id`
LEFT JOIN `staf_profil` `penerimaprofil` 					ON `dm`.`disposisi_masuk_profil` = `penerimaprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `status` 							ON `dm`.`disposisi_masuk_status_staf` = `status`.`staf_id`
LEFT JOIN `staf_profil` `statusprofil` 						ON `dm`.`disposisi_masuk_status_profil` = `statusprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `terima` 						ON `dm`.`disposisi_masuk_terima_staf` = `terima`.`staf_id`
-- LEFT JOIN `staf_profil` `terimaprofil` 					ON `dm`.`disposisi_masuk_terima_profil` = `terimaprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `pembaca` 						ON `dm`.`disposisi_masuk_baca_staf` = `pembaca`.`staf_id`
-- LEFT JOIN `staf_profil` `pembacaprofil` 					ON `dm`.`disposisi_masuk_baca_profil` = `pembacaprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `penerimaberkas` 					ON `dm`.`disposisi_masuk_berkasterima_staf` = `penerimaberkas`.`staf_id`
LEFT JOIN `staf_profil` `penerimaberkasprofil` 				ON `dm`.`disposisi_masuk_berkasterima_profil` = `penerimaberkasprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `berkas` 							ON `dm`.`disposisi_masuk_berkas_status_staf` = `berkas`.`staf_id`
LEFT JOIN `staf_profil` `berkasprofil` 						ON `dm`.`disposisi_masuk_berkas_status_profil` = `berkasprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `penerus` 							ON `dm`.`disposisi_masuk_terus_staf` = `penerus`.`staf_id`
LEFT JOIN `staf_profil` `penerusprofil` 					ON `dm`.`disposisi_masuk_terus_profil` = `penerusprofil`.`staf_profil_id`
LEFT JOIN `v_jabatan` `jabatanpenerima` 						ON `dm`.`disposisi_masuk_jabatan` = `jabatanpenerima`.`jabatan_id`
-- LEFT JOIN `v_staf_lite` `pencabut` 						ON `dm`.`disposisi_masuk_cabut_staf` = `pencabut`.`staf_id`
-- LEFT JOIN `staf_profil` `pencabutprofil` 				ON `dm`.`disposisi_masuk_cabut_profil` = `pencabutprofil`.`staf_profil_id`
-- LEFT JOIN `v_staf_lite` `pemulih` 						ON `dm`.`disposisi_masuk_pulih_staf` = `pemulih`.`staf_id`
-- LEFT JOIN `staf_profil` `pemulihprofil` 					ON `dm`.`disposisi_masuk_pulih_profil` = `pemulihprofil`.`staf_profil_id`
LEFT JOIN `aksi` `a` 										ON `dm`.`disposisi_masuk_aksi` = `a`.`aksi_id`
LEFT JOIN `perintah` `perintah` 							ON `d`.`disposisi_perintah` = `perintah`.`perintah_id`
LEFT JOIN `v_surat_lite` `s` 								ON `d`.`disposisi_surat` = `s`.`surat_id`
LEFT JOIN `disposisi_jumlah_penerima` `djp` FORCE INDEX(PRIMARY) 			ON `d`.`disposisi_id` = `djp`.`disposisi_masuk_disposisi`
LEFT JOIN `surat_setuju_jumlah` `ssj` FORCE INDEX(PRIMARY) 					ON `ssj`.`surat_setuju_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah_setuju` `sijs` FORCE INDEX(PRIMARY) 			ON `sijs`.`surat_imasuk_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah_tolak` `sijt` FORCE INDEX(PRIMARY) 			ON `sijt`.`surat_imasuk_tolak_surat` = `s`.`surat_id`
LEFT JOIN `surat_imasuk_jumlah` `sij` FORCE INDEX(PRIMARY) 					ON `sij`.`surat_imasuk_surat` = `s`.`surat_id`
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_lite` AS
SELECT
	`dm`.`disposisi_masuk_id`,
	`dm`.`disposisi_masuk_parent_path`,

	`d`.`disposisi_id`,
	`d`.`disposisi_induk`,
	`d`.`disposisi_parent_path`

FROM `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d` 									ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_abstract_lite` AS 
SELECT
	`dm`.`disposisi_masuk_staf`,
	`dm`.`disposisi_masuk_jabatan`,
	`dm`.`disposisi_masuk_profil`,
	IFNULL(`dm`.`disposisi_masuk_istembusan`,0) 			AS `disposisi_masuk_istembusan`,
	(`dm`.`disposisi_masuk_baca_tgl` IS NOT NULL)			AS `disposisi_masuk_isbaca`,
	(`dm`.`disposisi_masuk_terus_tgl` IS NOT NULL)			AS `disposisi_masuk_isterus`,
	(`dm`.`disposisi_masuk_cabut_tgl` IS NOT NULL)			AS `disposisi_masuk_iscabut`,
	IFNULL(`dm`.`disposisi_masuk_status`, 0) 				AS `disposisi_masuk_status`,
	IFNULL(`dm`.`disposisi_masuk_koreksi_status`, 0) 		AS `disposisi_masuk_koreksi_status`,
	`dm`.`disposisi_masuk_aksi`,

	`d`.`disposisi_induk`,
	IFNULL(`d`.`disposisi_model`, 0) 						AS `disposisi_model`

FROM `disposisi_masuk` `dm`
LEFT JOIN `disposisi` `d` 									ON `dm`.`disposisi_masuk_disposisi` = `d`.`disposisi_id`
;


CREATE OR REPLACE VIEW `v_notif_disposisi_masuk_staf` AS 
SELECT 
`v`.`disposisi_masuk_staf` AS `staf_id`,
SUM(
    CASE WHEN(
        (
        	IFNULL(`v`.`disposisi_model`,0) = 0 AND
	        ISNULL(`v`.`disposisi_masuk_aksi`) AND
	        IFNULL(`v`.`disposisi_masuk_istembusan`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
	    ) OR (
        	IFNULL(`v`.`disposisi_model`,0) = 0 AND
	        `v`.`disposisi_masuk_istembusan` = 1 AND
	        IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
        )
    ) THEN 1 ELSE 0 END 
) AS `kotakmasuk_belumditindak`,
SUM(
    CASE WHEN(
        IFNULL(`v`.`disposisi_model`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
    ) THEN 1 ELSE 0 END 
) AS `kotakmasuk_belumdibaca`,
SUM(
    CASE WHEN(
        `v`.`disposisi_model` = 1 AND
        IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_koreksi_status`,0) = 0
    ) THEN 1 ELSE 0 END 
) AS `draft_belumdibaca`,
SUM(
    CASE WHEN(
        `v`.`disposisi_model` = 1 AND 
        IFNULL(`v`.`disposisi_masuk_status`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_koreksi_status`,0) = 0
    ) THEN 1 ELSE 0 END 
) AS `draft_belumditindak`,
SUM(
    CASE WHEN(
        (
        	IFNULL(`v`.`disposisi_model`,0) = 0 AND
	        ISNULL(`v`.`disposisi_masuk_aksi`) AND
	        IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
	    )
	    OR
        (
        	`v`.`disposisi_model` = 1 AND 
        	IFNULL(`v`.`disposisi_masuk_status`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_koreksi_status`,0) = 0
        )
    ) THEN 1 ELSE 0 END 
) AS `tugassaya_belumditindak`
FROM
    `v_disposisi_masuk_abstract_lite` `v`
GROUP BY `v`.`disposisi_masuk_staf`
HAVING 
    `v`.`disposisi_masuk_staf` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_notif_disposisi_masuk_jabatan` AS 
SELECT 
`v`.`disposisi_masuk_jabatan` AS `jabatan_id`,
SUM(
    CASE WHEN(
        (
        	IFNULL(`v`.`disposisi_model`,0) = 0 AND
	    	ISNULL(`v`.`disposisi_induk`) AND
	        ISNULL(`v`.`disposisi_masuk_aksi`) AND
	        IFNULL(`v`.`disposisi_masuk_istembusan`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
        ) 
        OR 
        (
        	IFNULL(`v`.`disposisi_model`,0) = 0 AND
	    	ISNULL(`v`.`disposisi_induk`) AND
	        `v`.`disposisi_masuk_istembusan` = 1 AND
	        IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 AND
	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
        )
    ) THEN 1 ELSE 0 END 
) AS `kotakmasuk_belumditindak`,
SUM(
    CASE WHEN(
        IFNULL(`v`.`disposisi_model`,0) = 0 AND
    	ISNULL(`v`.`disposisi_induk`) AND
        IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
    ) THEN 1 ELSE 0 END 
) AS `kotakmasuk_belumdibaca`,
SUM(
    CASE WHEN(
    	IFNULL(`v`.`disposisi_model`,0) = 0 AND
    	ISNULL(`v`.`disposisi_induk`) AND
        ISNULL(`v`.`disposisi_masuk_aksi`) AND
        IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 AND
        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
    ) THEN 1 ELSE 0 END 
) AS `tugassaya_belumditindak`
FROM
    `v_disposisi_masuk_abstract_lite` `v`
GROUP BY `v`.`disposisi_masuk_jabatan`
HAVING 
    `v`.`disposisi_masuk_jabatan` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_netral` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_abstract` `dm`
WHERE IFNULL(`dm`.`disposisi_model`,0) = 0
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_netral_blm_tindak` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_abstract` `dm`
WHERE 
(IFNULL(`dm`.`disposisi_model`,0) = 0 AND IFNULL(`dm`.`disposisi_masuk_istembusan`, 0) = 0 AND ISNULL(`dm`.`disposisi_masuk_aksi`) AND IFNULL(`dm`.`disposisi_masuk_isterus`, 0) = 0 AND IFNULL(`dm`.`disposisi_masuk_iscabut`, 0) = 0) OR
(IFNULL(`dm`.`disposisi_model`,0) = 0 AND IFNULL(`dm`.`disposisi_masuk_isbaca`, 0) = 0 AND `dm`.`disposisi_masuk_istembusan` = 1 AND IFNULL(`dm`.`disposisi_masuk_iscabut`, 0) = 0) OR 
(`dm`.`disposisi_model` = 1 AND IFNULL(`dm`.`disposisi_masuk_status`, 0) = 0 AND IFNULL(`dm`.`disposisi_masuk_koreksi_status`, 0) = 0 )
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_netral_teruskan` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_netral` `dm`
WHERE `dm`.`disposisi_masuk_isterus` = 1
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_blm_tindak` AS
SELECT
	`dm`.*
FROM `v_mb_disposisi_masuk_netral_blm_tindak` `dm`
WHERE 
	IFNULL(`dm`.`disposisi_model`,0) = 0 AND
	NOT (`dm`.`disposisi_induk` <=> NULL)
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_eksternal_blm_tindak` AS
SELECT
	`dm`.*
FROM `v_mb_disposisi_masuk_netral_blm_tindak` `dm`
WHERE 
	ISNULL(`dm`.`disposisi_induk`) AND
	`dm`.`surat_model` = 1
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_internal_blm_tindak` AS
SELECT
	`dm`.*
FROM `v_mb_disposisi_masuk_netral_blm_tindak` `dm`
WHERE
	ISNULL(`dm`.`disposisi_induk`) AND
	`dm`.`surat_model` = 3
;

CREATE OR REPLACE VIEW `v_mb_disposisi_masuk_draf_blm_tindak` AS
SELECT
	`dm`.*
FROM `v_mb_disposisi_masuk_netral_blm_tindak` `dm`
WHERE `dm`.`disposisi_model` = 1
;

/*==================================================================*/
/* View: v_disposisi_masuk  										*/
/* View: v_disposisi_masuk_musnah									*/
/* View: v_disposisi_masuk_hidup									*/
/* View: v_disposisi_masuk_aktif									*/
/* View: v_disposisi_masuk_nonaktif									*/
/* View: v_disposisi_masuk_berkas									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_masuk` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_netral` `dm`
WHERE IFNULL(`dm`.`disposisi_model_sub`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_musnah` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_hidup` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_aktif` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_nonaktif` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
WHERE `dm`.`disposisi_masuk_iscabut` = 1
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_berkas` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_netral` `dm`
LEFT JOIN `v_properti` `pro` ON `dm`.`disposisi_masuk_properti` = `pro`.`properti_id`
WHERE 
	(
		IFNULL(`dm`.`disposisi_model_sub`,0) = 0 OR
		`dm`.`disposisi_model_sub` = 1
	) AND
	IFNULL(`pro`.`properti_ishapus`,0) = 0 AND
	`dm`.`surat_useberkas` = 1 AND
	`dm`.`disposisi_masuk_berkas_status` <> 0
;

/*==================================================================*/
/* View: v_disposisi_masuk_blmbaca									*/
/* View: v_disposisi_masuk_baca										*/
/* View: v_disposisi_masuk_terus									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_masuk_blmbaca` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_isbaca`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_baca` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
WHERE `dm`.`disposisi_masuk_isbaca` = 1 AND IFNULL(`dm`.`disposisi_masuk_isterus`,0) = 0
;

CREATE OR REPLACE VIEW `v_disposisi_masuk_terus` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk` `dm`
WHERE `dm`.`disposisi_masuk_isterus` = 1
;

/*==================================================================*/
/* View: v_notadinas_masuk_aktif									*/
/* View: v_notadinas_masuk_blmbaca									*/
/* View: v_notadinas_masuk_baca										*/
/* View: v_notadinas_masuk_terus									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notadinas_masuk` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_netral` `dm`
WHERE `dm`.`disposisi_model_sub` = 1
;

CREATE OR REPLACE VIEW `v_notadinas_masuk_aktif` AS
SELECT
	`dm`.*
FROM `v_notadinas_masuk` `dm`
WHERE IFNULL(`disposisi_masuk_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_notadinas_masuk_nonaktif` AS
SELECT
	`dm`.*
FROM `v_notadinas_masuk` `dm`
WHERE `disposisi_masuk_iscabut` = 1
;

CREATE OR REPLACE VIEW `v_notadinas_masuk_blmbaca` AS
SELECT
	`dm`.*
FROM `v_notadinas_masuk` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_isbaca`,0) = 0
;

CREATE OR REPLACE VIEW `v_notadinas_masuk_baca` AS
SELECT
	`dm`.*
FROM `v_notadinas_masuk` `dm`
WHERE `dm`.`disposisi_masuk_isbaca` = 1 AND IFNULL(`dm`.`disposisi_masuk_isterus`,0) = 0
;

CREATE OR REPLACE VIEW `v_notadinas_masuk_terus` AS
SELECT
	`dm`.*
FROM `v_notadinas_masuk` `dm`
WHERE `dm`.`disposisi_masuk_isterus` = 1
;

/*==================================================================*/
/* View: v_koreksi_masuk  											*/
/* View: v_koreksi_masuk_status										*/
/* View: v_koreksi_masuk_musnah										*/
/* View: v_koreksi_masuk_hidup										*/
/* View: v_koreksi_masuk_aktif										*/
/* View: v_koreksi_masuk_nonaktif									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_koreksi_masuk` AS
SELECT
	`dm`.*
FROM `v_disposisi_masuk_abstract` `dm`
WHERE `dm`.`disposisi_model` = 1
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_status` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_koreksi_status`,0) = 0
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_musnah` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk` `dm`
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_hidup` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk` `dm`
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_aktif` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_status` `dm`
WHERE IFNULL(`disposisi_iscabut`,0) = 0
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_nonaktif` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk` `dm`
WHERE `disposisi_iscabut` = 1
;

/*==================================================================*/
/* View: v_koreksi_masuk_blmtindak									*/
/* View: v_koreksi_masuk_setuju										*/
/* View: v_koreksi_masuk_tolak										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_koreksi_masuk_blmtindak` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_isbaca`,0) = 0 OR IFNULL(`dm`.`disposisi_masuk_status`,0) = 0
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_setuju` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE `dm`.`disposisi_masuk_status` = 2
;

CREATE OR REPLACE VIEW `v_koreksi_masuk_tolak` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE `dm`.`disposisi_masuk_status` = 4 AND IFNULL(`dm`.`disposisi_model_sub`,0) = 0
;

/*==================================================================*/
/* View: v_koreksi_petikan_blmtindak									*/
/* View: v_koreksi_petikan_setuju										*/
/* View: v_koreksi_petikan_tolak										*/
/*==================================================================*/

CREATE OR REPLACE VIEW `v_koreksi_petikan_blmtindak` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE IFNULL(`dm`.`disposisi_masuk_isbaca`,0) = 0 OR IFNULL(`dm`.`disposisi_masuk_status`,0) = 0 AND `dm`.`disposisi_model_sub` = 1
;

CREATE OR REPLACE VIEW `v_koreksi_petikan_setuju` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE `dm`.`disposisi_masuk_status` = 2 AND `dm`.`disposisi_model_sub` = 1
;

CREATE OR REPLACE VIEW `v_koreksi_petikan_tolak` AS
SELECT
	`dm`.*
FROM `v_koreksi_masuk_aktif` `dm`
WHERE `dm`.`disposisi_masuk_status` = 4 AND `dm`.`disposisi_model_sub` = 1
;

/*==================================================================*/
/* View: v_disposisi_masuk_log 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_masuk_log` AS
SELECT
	`dml`.*,
	(`dml`.`disposisi_masuk_log_tipe` = 1)		AS `disposisi_masuk_log_isbaca`,
	(`dml`.`disposisi_masuk_log_tipe` = 2) 		AS `disposisi_masuk_log_isberkasterima`,
	(`dml`.`disposisi_masuk_log_tipe` = 3) 		AS `disposisi_masuk_log_isterus`,
	(`dml`.`disposisi_masuk_log_tipe` = 4) 		AS `disposisi_masuk_log_iscabut`,
	(`dml`.`disposisi_masuk_log_tipe` = 5) 		AS `disposisi_masuk_log_isaksi`,
	`dm`.*,
	`penerimaprofil`.`staf_profil_staf` 					AS `staf_id`,
	`penerimaprofil`.`staf_profil_staf_nama` 				AS `staf_nama`,
	`penerima`.`staf_isaktif` 								AS `staf_isaktif`,
	`penerimaprofil`.`staf_profil_unit_nama` 				AS `unit_nama`,
	`penerimaprofil`.`staf_profil_jabatan_nama` 			AS `jabatan_nama`,
	`aksi`.`aksi_id` 										AS `aksi_id`,
	`aksi`.`aksi_kode` 										AS `aksi_kode`,
	`aksi`.`aksi_nama` 										AS `aksi_nama`
FROM `disposisi_masuk_log` `dml`
LEFT JOIN `disposisi_masuk` `dm` 							ON `dml`.`disposisi_masuk_log_masuk` = `dm`.`disposisi_masuk_id`
LEFT JOIN `v_staf_lite` `penerima` 							ON `dml`.`disposisi_masuk_log_staf` = `penerima`.`staf_id`
LEFT JOIN `staf_profil` `penerimaprofil` 					ON `dml`.`disposisi_masuk_log_profil` = `penerimaprofil`.`staf_profil_id`
LEFT JOIN `aksi` `aksi` 									ON `dml`.`disposisi_masuk_log_aksi` = `aksi`.`aksi_id`
;

/*==================================================================*/
/* View: v_disposisi_masuk_log 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_masuk_respon_log` AS
SELECT
	`dml`.*
FROM `v_disposisi_masuk_log` `dml`
WHERE 
	`dml`.`disposisi_masuk_log_tipe` = 5 AND 
	`dml`.`disposisi_masuk_log_tgl` IS NOT NULL AND 
	`dml`.`disposisi_masuk_log_aksi` IS NOT NULL;

/*==================================================================*/
/* View: v_disposisi_perintah_log 									*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_disposisi_perintah_log` AS
SELECT
	`dpl`.`disposisi_perintah_log_id` 						AS `disposisi_perintah_log_id`,
	`dpl`.`disposisi_perintah_log_disposisi` 				AS `disposisi_perintah_log_disposisi`,
	`dpl`.`disposisi_perintah_log_perintah` 				AS `disposisi_perintah_log_perintah`,
	`dpl`.`disposisi_perintah_log_pesan`  					AS `disposisi_perintah_log_pesan`,
	`dpl`.`disposisi_perintah_log_staf`  					AS `disposisi_perintah_log_staf`,
	`dpl`.`disposisi_perintah_log_profil`  					AS `disposisi_perintah_log_profil`,
	`dpl`.`disposisi_perintah_log_tgl` 						AS `disposisi_perintah_log_tgl`,	
	`penerimaprofil`.`staf_profil_staf` 					AS `staf_id`,
	`penerimaprofil`.`staf_profil_staf_nama` 				AS `staf_nama`,
	`penerima`.`staf_isaktif` 								AS `staf_isaktif`,
	`penerimaprofil`.`staf_profil_unit_nama` 				AS `unit_nama`,
	`penerimaprofil`.`staf_profil_jabatan_nama` 			AS `jabatan_nama`,
	`p`.`perintah_id` 										AS `perintah_id`,
	`p`.`perintah_nama` 									AS `perintah_nama`,
	`p`.`perintah_kode` 									AS `perintah_kode`
FROM `disposisi_perintah_log` `dpl`
LEFT JOIN `perintah` `p` 									ON `dpl`.`disposisi_perintah_log_perintah` = `p`.`perintah_id`
LEFT JOIN `v_staf_lite` `penerima` 							ON `dpl`.`disposisi_perintah_log_staf` = `penerima`.`staf_id`
LEFT JOIN `staf_profil` `penerimaprofil` 					ON `dpl`.`disposisi_perintah_log_profil` = `penerimaprofil`.`staf_profil_id`
ORDER BY `dpl`.`disposisi_perintah_log_tgl` DESC
;

/*==================================================================*/
/* View: v_surat_kontak 											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_kontak` AS
SELECT
	`surat_pengirim` AS `surat_kontak`
FROM `surat`
WHERE
	`surat_pengirim` IS NOT NULL
UNION
SELECT
	`surat_tujuan` AS `surat_kontak`
FROM `surat`
WHERE
`surat_tujuan` IS NOT NULL
UNION
SELECT
	`kontak_nama` AS `surat_kontak`
FROM `kontak`
;

/*==================================================================*/
/* View: v_surat_unit 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_surat_unit` AS
SELECT
	`unitpenerima_nama` AS `surat_unit`
FROM `v_korespondensi_internal`
WHERE
	`unitpenerima_nama` IS NOT NULL
UNION
SELECT
	`unitpengirim_nama` AS `surat_unit`
FROM `v_korespondensi_internal`
WHERE
`unitpengirim_nama` IS NOT NULL
;
/*==================================================================*/
/* View: v_sla  													*/
/* View: v_sla_musnah												*/
/* View: v_sla_hidup												*/
/* View: v_sla_aktif												*/
/* View: v_sla_nonaktif												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_sla` AS
-- SELECT
-- 	`s`.`sla_id`,
-- 	`s`.`sla_nama`,
-- 	`s`.`sla_hasil`,
-- 	`s`.`sla_kriteria`,
-- 	IFNULL(`s`.`sla_isaktif`,0)						AS `sla_isaktif`,
-- 	(SELECT COUNT(`sla_unit_id`) from `sla_unit` WHERE `sla_unit_sla` = `s`.`sla_id`) AS `sla_unit_jumlah`,
-- 	`s`.`sla_properti`,

-- 	`pro`.`properti_id` 									AS `sla_properti_id`,
-- 	`pro`.`properti_buat_tgl` 								AS `sla_properti_buat_tgl`,
-- 	(`pro`.`properti_ubah_tgl` IS NOT NULL) 				AS `sla_properti_isubah`,
-- 	`pro`.`properti_ubah_tgl` 								AS `sla_properti_ubah_tgl`,
-- 	(`pro`.`properti_hapus_tgl` IS NOT NULL) 				AS `sla_properti_ishapus`,
-- 	`pro`.`properti_hapus_tgl` 								AS `sla_properti_hapus_tgl`,
-- 	(`pro`.`properti_pulih_tgl` IS NOT NULL) 				AS `sla_properti_ispulih`,
-- 	`pro`.`properti_pulih_tgl` 								AS `sla_properti_pulih_tgl`,
-- 	`pro`.`properti_data` 									AS `sla_properti_data`
-- FROM `sla` `s`
-- LEFT JOIN `v_properti_lite` `pro` ON `s`.`sla_properti` = `pro`.`properti_id`
-- ;

-- CREATE OR REPLACE VIEW `v_sla_musnah` AS
-- SELECT
-- 	`s`.*
-- FROM `v_sla` `s`
-- WHERE `s`.`sla_properti_ishapus` = 1
-- ;

-- CREATE OR REPLACE VIEW `v_sla_hidup` AS
-- SELECT
-- 	`s`.*
-- FROM `v_sla` `s`
-- WHERE `s`.`sla_properti_ishapus` = 0
-- ;

-- CREATE OR REPLACE VIEW `v_sla_aktif` AS
-- SELECT
-- 	`s`.*
-- FROM `v_sla` `s`
-- WHERE `s`.`sla_properti_ishapus` = 0 AND `sla_isaktif` = 1
-- ;

-- CREATE OR REPLACE VIEW `v_sla_nonaktif` AS
-- SELECT
-- 	`s`.*
-- FROM `v_sla` `s`
-- WHERE `s`.`sla_properti_ishapus` = 0 AND `sla_isaktif` = 0
-- ;

/*==================================================================*/
/* View: v_sla_kuis 												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_sla_kuis` AS
-- SELECT
-- 	`sk`.*,
-- 	`su`.*,
-- 	`sa`.*
-- FROM `sla_kuis` `sk`
-- LEFT JOIN `sla_ujian` `su` ON `sk`.`sla_kuis_ujian` = `su`.`sla_ujian_id`
-- LEFT JOIN `sla` `sa` ON `sk`.`sla_kuis_sla` = `sa`.`sla_id`
-- ;

/*==================================================================*/
/* View: v_sla_rumus 												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_sla_rumus` AS
-- SELECT
-- 	`sr`.*,
-- 	`sa`.*
-- FROM `sla_rumus` `sr`
-- LEFT JOIN `sla` `sa` ON `sr`.`sla_rumus_sla` = `sa`.`sla_id`
-- ;

/*==================================================================*/
/* View: v_sla_unit 												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_sla_unit` AS
-- SELECT
-- 	`su`.*,
-- 	`s`.*,
-- 	`u`.*
-- FROM `sla_unit` `su`
-- LEFT JOIN `sla` `s` ON `su`.`sla_unit_sla` = `s`.`sla_id`
-- LEFT JOIN `unit` `u` ON `su`.`sla_unit_unit` = `u`.`unit_id`
-- ;

-- CREATE OR REPLACE VIEW `v_sla_unit_de` AS
-- SELECT
-- 	`su`.*,
-- 	`s`.`sla_id`,
-- 	`s`.`sla_nama`,
-- 	`s`.`sla_isaktif`,
-- 	`u`.`unit_id`,
-- 	`u`.`unit_nama`,
-- 	`u`.`unit_kode`
-- FROM `sla_unit` `su`
-- LEFT JOIN `v_sla_hidup` `s` ON `su`.`sla_unit_sla` = `s`.`sla_id`
-- LEFT JOIN `v_unit_aktif` `u` ON `su`.`sla_unit_unit` = `u`.`unit_id`
-- WHERE `su`.`sla_unit_default` = 1 AND
-- 	  `u`.`unit_id` IS NOT NULL
-- ;

/*==================================================================*/
/* View: v_surat_ulasan 												*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_surat_ulasan` AS
-- SELECT
--     `su`.`surat_ulasan_id`          AS `surat_ulasan_id`,
--     `su`.`surat_ulasan_surat`       AS `surat_ulasan_surat`,
--     `su`.`surat_ulasan_ulasan`      AS `surat_ulasan_ulasan`,
--     `su`.`surat_ulasan_staf`        AS `surat_ulasan_staf`,
--     `su`.`surat_ulasan_tgl`         AS `surat_ulasan_tgl`,
--     `su`.`surat_ulasan_nilai`       AS `surat_ulasan_nilai`,
--     `su`.`surat_ulasan_komentar`    AS `surat_ulasan_komentar`,
-- 	(`su`.`surat_ulasan_baca_tgl` IS NOT NULL)					AS `suratulasan_isbaca`,
-- 	`su`.`surat_ulasan_baca_tgl`								AS `suratulasan_baca_tgl`,
-- 	`su`.`surat_ulasan_baca_staf`								AS `suratulasan_baca_staf`,
--     `s`.*,
--     `st`.`staf_id`                  AS `pengulas_id`,
--     `st`.`staf_peran`               AS `pengulas_peran`,
--     `st`.`staf_akun`                AS `pengulas_akun`,
--     `st`.`staf_kode`                AS `pengulas_kode`,
--     `st`.`staf_nama`                AS `pengulas_nama`,
--     `st`.`staf_kelamin`             AS `pengulas_kelamin`,
--     `st`.`staf_isaktif`             AS `pengulas_isaktif`,
--     `st`.`staf_unit`                AS `pengulas_unit`,
--     `st`.`unit_nama`                AS `pengulas_unit_nama`,
--     `st`.`staf_jabatan`             AS `pengulas_jabatan`,
--     `st`.`jabatan_nama`             AS `pengulas_jabatan_nama`
-- FROM `surat_ulasan` `su`
-- LEFT JOIN `v_surat` `s`
--     ON `su`.`surat_ulasan_surat` = `s`.`surat_id`
-- LEFT JOIN `v_staf_lite` `st`
--     ON `su`.`surat_ulasan_staf` = `st`.`staf_id`
-- ;

/*==================================================================*/
/* View: v_notifikasi 												*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notifikasi` AS 
SELECT
  `n`.*,
  (`n`.`notifikasi_terima_tgl` IS NOT NULL) 				AS `notifikasi_isterima`,
  (`n`.`notifikasi_baca_tgl` IS NOT NULL) 					AS `notifikasi_isbaca`,
  `pengirim`.`staf_id` 										AS `pengirim_id`,
  `pengirim`.`staf_kode` 									AS `pengirim_kode`,
  `pengirim`.`staf_nama` 									AS `pengirim_nama`,
  `pengirim`.`staf_unit` 									AS `pengirim_unit`,
  `pengirim`.`unit_nama` 									AS `pengirim_unit_nama`,
  `pengirim`.`staf_jabatan` 								AS `pengirim_jabatan`,
  `pengirim`.`jabatan_nama` 								AS `pengirim_jabatan_nama`,
  `pengirim`.`akun_surel` 									AS `pengirim_surel`,
  `pengirim`.`akun_ponsel` 									AS `pengirim_ponsel`,
  `penerima`.`staf_id` 										AS `penerima_id`,
  `penerima`.`staf_kode` 									AS `penerima_kode`,
  `penerima`.`staf_nama` 									AS `penerima_nama`,
  `penerima`.`staf_unit` 									AS `penerima_unit`,
  `penerima`.`unit_nama` 									AS `penerima_unit_nama`,
  `penerima`.`staf_jabatan` 								AS `penerima_jabatan`,
  `penerima`.`jabatan_nama` 								AS `penerima_jabatan_nama`,
  `penerima`.`akun_surel` 									AS `penerima_surel`,
  `penerima`.`akun_ponsel` 									AS `penerima_ponsel`
FROM `notifikasi` `n`
LEFT JOIN `v_staf` `pengirim` ON `n`.`notifikasi_pengirim` = `pengirim`.`staf_id`
LEFT JOIN `v_staf` `penerima` ON `n`.`notifikasi_penerima` = `penerima`.`staf_id`
;

/*==================================================================*/
/* View: v_notifikasi_app  											*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notifikasi_app` AS 
SELECT
  `n`.*
FROM `v_notifikasi` `n`
WHERE IFNULL(`notifikasi_model`, 0) = 0
;

/*==================================================================*/
/* View: v_notifikasi_email 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notifikasi_email` AS 
SELECT
  `n`.*
FROM `v_notifikasi` `n`
WHERE `notifikasi_model` = 1
;

/*==================================================================*/
/* View: v_notifikasi_sms 	 										*/
/*==================================================================*/
CREATE OR REPLACE VIEW `v_notifikasi_sms` AS 
SELECT
  `n`.*
FROM `v_notifikasi` `n`
WHERE `notifikasi_model` = 2
;


/*==================================================================*/
/* View: v_r_surat_rating_view 	 										*/
/*==================================================================*/
-- CREATE OR REPLACE VIEW `v_r_surat_rating_view` AS 
-- SELECT
--   `u`.`surat_ulasan_id`       AS `surat_ulasan_id`,
--   `u`.`surat_ulasan_komentar` AS `surat_ulasan_komentar`,
--   `u`.`surat_ulasan_nilai`    AS `surat_ulasan_nilai`,
--   `u`.`surat_ulasan_staf`     AS `surat_ulasan_staf`,
--   `u`.`surat_ulasan_surat`    AS `surat_ulasan_surat`,
--   `u`.`surat_ulasan_tgl`      AS `surat_ulasan_tgl`,
--   DATE_FORMAT(`u`.`surat_ulasan_tgl`,'%d-%m-%y %H:%i') AS `surat_ulasan_tgl_view`,
--   `u`.`surat_ulasan_ulasan`   AS `surat_ulasan_ulasan`,
--   `s`.`surat_id`              AS `penerima_surat_id`,
--   `s`.`surat_tanggal`         AS `penerima_surat_tgl`,
--   DATE_FORMAT(`s`.`surat_tanggal`,'%d-%m-%y %H:%i') AS `penerima_surat_tgl_view`,
--   IF(ISNULL(`s`.`surat_agenda_sub`),`s`.`surat_agenda`,CONCAT(`s`.`surat_agenda`,'.',`s`.`surat_agenda_sub`)) AS `penerima_surat_agenda`,
--   `s`.`surat_nomor`           AS `penerima_surat_nomor`,
--   `s`.`surat_perihal`         AS `penerima_surat_perihal`,
--   `st`.`staf_nama`            AS `penerima_staf_nama`,
--   `un`.`unit_id`              AS `penerima_unit_id`,
--   `un`.`unit_nama`            AS `penerima_unit_nama`,
--   `un`.`unit_kode`            AS `penerima_unit_kode`,
--   `un`.`unit_isaktif`         AS `penerima_unit_isaktif`,
--   `sp`.`surat_id`             AS `pengirim_surat_id`,
--   `s`.`surat_tanggal`         AS `pengirim_surat_tgl`,
--   DATE_FORMAT(`sp`.`surat_tanggal`,'%d-%m-%y %H:%i') AS `pengirim_surat_tgl_view`,
--   IF(ISNULL(`sp`.`surat_agenda_sub`),`sp`.`surat_agenda`,CONCAT(`sp`.`surat_agenda`,'.',`sp`.`surat_agenda_sub`)) AS `pengirim_surat_agenda`,
--   `sp`.`surat_nomor`          AS `pengirim_surat_nomor`,
--   `sp`.`surat_perihal`        AS `pengirim_surat_perihal`,
--   `unp`.`unit_id`             AS `pengirim_unit_id`,
--   `unp`.`unit_nama`           AS `pengirim_unit_nama`,
--   `unp`.`unit_kode`           AS `pengirim_unit_kode`,
--   `unp`.`unit_isaktif`        AS `pengirim_unit_isaktif`
-- FROM ((((`surat_ulasan` `u`
--       LEFT JOIN `surat` `s`
--         ON ((`u`.`surat_ulasan_surat` = `s`.`surat_id`)))
--      LEFT JOIN `unit` `un`
--        ON ((`s`.`surat_unit` = `un`.`unit_id`)))
--      LEFT JOIN `staf` `st`
-- 	ON `u`.`surat_ulasan_staf` = `st`.`staf_id`
--    INNER JOIN `surat` `sp`
--       ON (((`sp`.`surat_id` = `s`.`surat_korespondensi_surat`)
--            AND (`sp`.`surat_korespondensi` = `s`.`surat_korespondensi`))))
--    LEFT JOIN `unit` `unp`
--      ON ((`sp`.`surat_unit` = `unp`.`unit_id`)))
-- ;

/*==============================================================*/
/* View: v_r_rekap_surat_retensi */
/*==============================================================*/
CREATE OR REPLACE VIEW `v_r_rekap_surat_retensi` AS 
SELECT 
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  `unit`.`unit_induk` AS `unit_induk`,
  COUNT(`surat`.`surat_id`) AS `jumlah_surat`,
  YEAR(`surat`.`surat_retensi_tgl`) AS `tahun`,
  MONTH(`surat`.`surat_retensi_tgl`) AS `bulan`,
  (
    CASE
      `surat`.`surat_model`
      WHEN (1 
        OR 2) 
      THEN 'eksternal' 
      WHEN (3
      	OR 4) 
      THEN 'internal' 
      ELSE 'lain' 
    END
  ) AS `tipe` 
FROM
  `surat` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `surat`.`surat_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `surat`.`surat_unit`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
WHERE 
	IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
  	AND `surat`.`surat_distribusi_tgl` IS NOT NULL
	AND `surat`.`surat_useretensi` = 1
GROUP BY `unit`.`unit_nama`,
  `unit`.`unit_kode`,
  YEAR(`surat`.`surat_retensi_tgl`),
  MONTH(`surat`.`surat_retensi_tgl`),
  `surat`.`surat_model` 
ORDER BY `unit`.`unit_kode`;
/*==============================================================*/
/* View: v_r_rekap_surat_masuk */
/*==============================================================*/
CREATE OR REPLACE VIEW v_r_rekap_surat_masuk AS
SELECT 
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  COUNT(`surat`.`surat_id`) AS `jumlah_surat`,
  YEAR(`surat`.`surat_tanggal`) AS `tahun`,
  MONTH(`surat`.`surat_tanggal`) AS `bulan`,
  (
    CASE
      `surat`.`surat_model` 
      WHEN 1 
      THEN 'eksternal'
      WHEN 3 
      THEN 'internal' 
      ELSE 'lain' 
    END
  ) AS `tipe` 
FROM
  `surat` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `surat`.`surat_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `surat`.`surat_unit`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
WHERE 
    IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
    AND (`surat`.`surat_model` IN (1,3))
	AND `unit`.`unit_nama` IS NOT NULL
GROUP BY `unit`.`unit_nama`,
  `unit`.`unit_kode`,
  YEAR(`surat`.`surat_tanggal`),
  MONTH(`surat`.`surat_tanggal`),
  `surat`.`surat_model` 
ORDER BY `unit`.`unit_kode`;

/*==============================================================*/
/* View: v_r_rekap_surat_keluar */
/*==============================================================*/
CREATE OR REPLACE VIEW v_r_rekap_surat_keluar AS
SELECT 
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  `unit`.`unit_induk` AS `unit_induk`,
  `uInduk`.`unit_nama` AS `unit_induk_nama`,
  COUNT(`surat`.`surat_id`) AS `jumlah_surat`,
  YEAR(`surat`.`surat_tanggal`) AS `tahun`,
  MONTH(`surat`.`surat_tanggal`) AS `bulan`,
  (
    CASE
      `surat`.`surat_model` 
      WHEN 2 
      THEN 'eksternal' 
      WHEN 4 
      THEN 'internal' 
      ELSE 'lain'
    END
  ) AS `tipe` 
FROM
  `surat` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `surat`.`surat_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `surat`.`surat_unit`
LEFT JOIN `unit` `uInduk`
    ON `uInduk`.`unit_id` = `unit`.`unit_induk`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
WHERE 
    IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
    AND (`surat`.`surat_model` IN(2,4))
	AND `unit`.`unit_nama` IS NOT NULL
GROUP BY `unit`.`unit_nama`,
  `unit`.`unit_kode`,
  YEAR(`surat`.`surat_tanggal`),
  MONTH(`surat`.`surat_tanggal`),
  `surat`.`surat_model` 
ORDER BY `unit`.`unit_kode`;

/*==============================================================*/
/* View: v_r_rekap_arsip */
/*==============================================================*/
CREATE OR REPLACE VIEW v_r_rekap_arsip AS
SELECT 
	`pro`.`properti_buat_tgl` AS `properti_buat_tgl`, 
 	`unit`.`unit_nama` AS `unit_nama`,
 	`unit`.`unit_kode` AS `unit_kode`,
	COUNT(`arsip`.`arsip_isumum`) AS `arsip_isumum`,
	COUNT(`arsip`.`arsip_isbagi`) AS `arsip_isbagi`,
	COUNT(`arsip`.`arsip_id`) AS `jumlah`
FROM
  `arsip` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `arsip`.`arsip_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `arsip`.`arsip_unit`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
WHERE 
    IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
	AND `unit`.`unit_nama` IS NOT NULL
GROUP BY `unit`.`unit_nama`,
  `unit`.`unit_kode`
ORDER BY `unit`.`unit_kode`;

/*==============================================================*/
/* View: v_r_rekap_surat */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat AS
SELECT 
  `surat`.`surat_tanggal` AS `surat_tanggal`,
  (
    CASE
      `surat`.`surat_model` 
      WHEN 1 
      THEN 'surat_masuk' 
      WHEN 2 
      THEN 'surat_keluar' 
      WHEN 3 
      THEN 'surat_imasuk' 
      WHEN 4 
      THEN 'surat_ikeluar' 
    END
  ) AS `surat_model`,
  `unit`.`unit_nama` AS `unit_nama`,
  `unit`.`unit_kode` AS `unit_kode`,
  `unit`.`unit_induk` AS `unit_induk`,
  `uInduk`.`unit_nama` AS `unit_induk_nama`,
  COUNT(`surat`.`surat_id`) AS `surat_jumlah` 
FROM
  `surat` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `surat`.`surat_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `surat`.`surat_unit`
LEFT JOIN `unit` `uInduk`
    ON `uInduk`.`unit_id` = `unit`.`unit_induk`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
WHERE 
    IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
	AND `unit`.`unit_nama` IS NOT NULL
GROUP BY `surat`.`surat_tanggal`,
  `unit`.`unit_nama`,
  `unit`.`unit_kode`,
  `surat`.`surat_model` 
ORDER BY `unit`.`unit_kode`;

/*==============================================================*/
/* View: v_r_rekap_surat_keluar_eksternal */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat_by_model AS
SELECT
  IFNULL(`surat`.`surat_model`, 0)		AS `surat_model`,
  `surat`.`surat_model_sub`				AS `surat_model_sub`,
  `surat`.`surat_jenis_sub`				AS `surat_jenis_sub`,
  `unit`.`unit_id`						AS `unit_id`,
  `unit`.`unit_nama`					AS `unit_nama`,
  `unit`.`unit_kode`					AS `unit_kode`,
  `jenis`.`jenis_id`					AS `jenis_id`,
  `jenis`.`jenis_nama` 					AS `jenis_nama`,
  `surat`.`surat_tanggal`				AS `surat_tanggal`,
  SUM((CASE WHEN (`surat`.`surat_distribusi_tgl` IS NOT NULL) THEN 1 ELSE 0 END)) AS `terdistribusi_count`,
  SUM((CASE WHEN (ISNULL (`surat`.`surat_distribusi_tgl`)) THEN 1 ELSE 0 END)) AS `blm_distribusi_count`,
  SUM((CASE WHEN (`surat`.`surat_setuju` = 1) THEN 1 ELSE 0 END)) AS `onprocess_count`,
  SUM((CASE WHEN (`surat`.`surat_setuju` = 2) THEN 1 ELSE 0 END)) AS `setuju_count`,
  SUM((CASE WHEN (`surat`.`surat_setuju` = 3) THEN 1 ELSE 0 END)) AS `revisi_count`,
  SUM((CASE WHEN (`surat`.`surat_setuju` = 4) THEN 1 ELSE 0 END)) AS `tolak_count`,
  SUM((CASE WHEN (`surat`.`surat_id` IS NOT NULL) THEN 1 ELSE 0 END)) AS `tercatat_count`,
  SUM((CASE WHEN (`surat`.`surat_selesai_tgl`IS NOT NULL) THEN 1 ELSE 0 END)) AS `process_done_count`,
  SUM(CASE 
        WHEN (
            `surat`.`surat_setuju` = 1 OR 
            `surat`.`surat_setuju` = 3 OR 
            `surat`.`surat_setuju` = 4 
        ) THEN 1 ELSE 0 END
    ) AS `proses`
FROM 
  `surat` 
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `surat`.`surat_properti`
LEFT JOIN `unit`
    ON `unit`.`unit_id` = `surat`.`surat_unit`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `unit`.`unit_properti`
LEFT JOIN `jenis`
    ON `jenis`.`jenis_id` = `surat`.`surat_jenis`
LEFT JOIN `properti` `pJenis`
    ON `pJenis`.`properti_id` = `jenis`.`jenis_properti`
WHERE 
    IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
	AND IFNULL(`pJenis`.`properti_ishapus`,0) = 0
	AND `unit`.`unit_nama` IS NOT NULL
GROUP BY `unit`.`unit_id`,
	`surat`.`surat_model`,
	`surat`.`surat_distribusi_tgl`, 
	`surat`.`surat_setuju`, 
	`surat`.`surat_id`, 
	`surat`.`surat_selesai_tgl`, 
	CAST(`surat`.`surat_tanggal` AS DATE), `jenis_id`
ORDER BY `unit_nama` ASC;

/*==============================================================*/
/* View: v_surat_batas_reupload */
/*==============================================================*/

CREATE OR REPLACE VIEW v_surat_batas_reupload AS
SELECT
	`s`.`surat_buat_staf`				  AS `surat_buat_staf`,
	`s`.`surat_jenis`					  AS `surat_jenis`,
  	IFNULL(`s`.`surat_model`, 0)		  AS `surat_model`,
	`s`.`surat_unit`					  AS `surat_unit`,
  	IFNULL(`s`.`surat_setuju`, 0)		  AS `surat_setuju`,
	`s`.`surat_arsip`					  AS `surat_arsip`,
	`sdj`.`surat_jumlah_dokumen` 		  AS `surat_jumlah_dokumen`,
	`sdj`.`surat_jumlah_dokumen_reupload` AS `surat_jumlah_dokumen_reupload`,
	`j`.`jenis_id`						  AS `jenis_id`,
	`j`.`jenis_nama`					  AS `jenis_nama`,
	`j`.`jenis_isbatas`					  AS `jenis_isbatas`,
	`j`.`jenis_batas_jumlah`			  AS `jenis_batas_jumlah`
FROM `surat` `s`
LEFT JOIN `jenis` `j`
    ON `j`.`jenis_id` = `s`.`surat_jenis`
LEFT JOIN `surat_dokumen_jumlah` `sdj` FORCE INDEX(PRIMARY) 
	ON `sdj`.`dokumen_arsip` = `s`.`surat_arsip`
WHERE
	`s`.`surat_setuju` = 2 AND
	IFNULL(`sdj`.`surat_jumlah_dokumen_reupload`, 0) = 0;

/*==============================================================*/
/* View: v_r_rekap_surat_by_jenis */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat_by_jenis AS
SELECT
	`s`.`surat_jenis`					AS `surat_jenis`,
	`s`.`surat_unit`					AS `surat_unit`,
	CAST(`s`.`surat_tanggal` AS DATE)	AS `surat_tanggal`,
	IFNULL(`s`.`surat_model`, 0)		AS `surat_model`,
	`j`.`jenis_id`						AS `jenis_id`,
	`j`.`jenis_nama`					AS `jenis_nama`,
	`u`.`unit_id`						AS `unit_id`,
	`u`.`unit_nama`						AS `unit_nama`,
  	COUNT(`s`.`surat_jenis`)			AS `surat_jenis_count`
FROM `surat` `s`
LEFT JOIN `properti` `pro`
    ON `pro`.`properti_id` = `s`.`surat_properti`
LEFT JOIN `unit` `u`
    ON `u`.`unit_id` = `s`.`surat_unit`
LEFT JOIN `properti` `pUnit`
    ON `pUnit`.`properti_id` = `u`.`unit_properti`
LEFT JOIN `jenis` `j`
    ON `j`.`jenis_id` = `s`.`surat_jenis`
LEFT JOIN `properti` `pJenis`
    ON `pJenis`.`properti_id` = `j`.`jenis_properti`
WHERE
	`s`.`surat_jenis` IS NOT NULL 
	AND IFNULL(`pro`.`properti_ishapus`,0) = 0
	AND IFNULL(`pUnit`.`properti_ishapus`,0) = 0
	AND IFNULL(`pJenis`.`properti_ishapus`,0) = 0
GROUP BY `s`.`surat_jenis`,`s`.`surat_unit`
ORDER BY `u`.`unit_nama` ASC, `j`.`jenis_nama` ASC;

/*==============================================================*/
/* View: v_r_surat_keluar_berakhir */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat_keluar_berakhir AS
SELECT
	`s`.`surat_agenda`					AS `surat_agenda`,
	`s`.`surat_nomor`					AS `surat_nomor`,
	`s`.`surat_registrasi`				AS `surat_registrasi`,
	`s`.`surat_perihal`					AS `surat_perihal`,
	CAST(`s`.`surat_tanggal` AS DATE)	AS `surat_tanggal`,
	`s`.`surat_berlaku_tgl`				AS `surat_berlaku_tgl`,
	IFNULL(`s`.`surat_useretensi`,0)	AS `surat_useretensi`,
	`s`.`surat_retensi_tgl`				AS `surat_retensi_tgl`,
	IFNULL(`s`.`surat_model`, 0)		AS `surat_model`,
	`s`.`surat_unit`					AS `surat_unit`,
	`u`.`unit_id`						AS `unit_id`,
	`u`.`unit_nama`						AS `unit_nama`,
	`p`.`properti_buat_tgl`				AS `surat_properti_buat_tgl`
FROM `surat` `s`
LEFT JOIN `unit` `u` 		ON `s`.`surat_unit` = `u`.`unit_id`
LEFT JOIN `properti` `p`	ON `s`.`surat_properti` = `p`.`properti_id`
WHERE
	`s`.`surat_model` = 2 AND
	`s`.`surat_useretensi` = 1 AND 
	DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') < CURRENT_DATE AND
	ISNULL(`p`.`properti_hapus_tgl`)
ORDER BY `u`.`unit_nama` ASC, `s`.`surat_tanggal` DESC;

/*==============================================================*/
/* View: v_r_surat_ikeluar_berakhir */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat_ikeluar_berakhir AS
SELECT
	`s`.`surat_agenda`					AS `surat_agenda`,
	`s`.`surat_nomor`					AS `surat_nomor`,
	`s`.`surat_registrasi`				AS `surat_registrasi`,
	`s`.`surat_perihal`					AS `surat_perihal`,
	`s`.`surat_jenis`					AS `surat_jenis`,
	CAST(`s`.`surat_tanggal` AS DATE)	AS `surat_tanggal`,
	`s`.`surat_berlaku_tgl`				AS `surat_berlaku_tgl`,
	IFNULL(`s`.`surat_useretensi`,0)	AS `surat_useretensi`,
	`s`.`surat_retensi_tgl`				AS `surat_retensi_tgl`,
	IFNULL(`s`.`surat_model`, 0)		AS `surat_model`,
	`s`.`surat_unit`					AS `surat_unit`,
	`u`.`unit_id`						AS `unit_id`,
	`u`.`unit_nama`						AS `unit_nama`,
	`p`.`properti_buat_tgl`				AS `surat_properti_buat_tgl`
FROM `surat` `s`
LEFT JOIN `unit` `u` 		ON `s`.`surat_unit` = `u`.`unit_id`
LEFT JOIN `properti` `p`	ON `s`.`surat_properti` = `p`.`properti_id`
WHERE
	`s`.`surat_model` = 4 AND
	`s`.`surat_useretensi` = 1 AND 
	DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE AND
	ISNULL(`p`.`properti_hapus_tgl`)
ORDER BY `u`.`unit_nama` ASC, `s`.`surat_tanggal` DESC;

/*==============================================================*/
/* View: v_r_surat_keputusan_berakhir */
/*==============================================================*/

CREATE OR REPLACE VIEW v_r_rekap_surat_keputusan_berakhir AS
SELECT
	`s`.`surat_agenda`					AS `surat_agenda`,
	`s`.`surat_nomor`					AS `surat_nomor`,
	`s`.`surat_registrasi`				AS `surat_registrasi`,
	`s`.`surat_perihal`					AS `surat_perihal`,
	`s`.`surat_jenis`					AS `surat_jenis`,
	CAST(`s`.`surat_tanggal` AS DATE)	AS `surat_tanggal`,
	`s`.`surat_berlaku_tgl`				AS `surat_berlaku_tgl`,
	IFNULL(`s`.`surat_useretensi`,0)	AS `surat_useretensi`,
	`s`.`surat_retensi_tgl`				AS `surat_retensi_tgl`,
	`s`.`surat_model`					AS `surat_model`,
	`s`.`surat_unit`					AS `surat_unit`,
	`u`.`unit_id`						AS `unit_id`,
	`u`.`unit_nama`						AS `unit_nama`,
	`p`.`properti_buat_tgl`				AS `surat_properti_buat_tgl`
FROM `surat` `s`
LEFT JOIN `unit` `u` 		ON `s`.`surat_unit` = `u`.`unit_id`
LEFT JOIN `properti` `p`	ON `s`.`surat_properti` = `p`.`properti_id`
WHERE
	`s`.`surat_model` = 6 AND
	`s`.`surat_useretensi` = 1 AND 
	DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE AND
	ISNULL(`p`.`properti_hapus_tgl`)
ORDER BY `u`.`unit_nama` ASC, `s`.`surat_tanggal` DESC;

------------------------------------------------------------------
------------------ V_SURAT_LITE_NOTIF ----------------------------
------------------------------------------------------------------

CREATE OR REPLACE VIEW v_surat_lite_notif AS
SELECT 
	u.unit_id,
    u.unit_nama,
    IFNULL(s.surat_model, 0) AS surat_model,
    IFNULL(s.surat_useretensi, 0) AS surat_useretensi,
    (((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) <= 7)
            AND ((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) > 3)) AS `surat_m_7`,
        (((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) <= 3)
            AND ((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) > 1)) AS `surat_m_3`,
        (((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) <= 1)
            AND ((TO_DAYS(DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d')) - TO_DAYS(CURDATE())) > -(1))) AS `surat_m_1`,
	surat_retensi_tgl,
    IF(s.surat_distribusi_cabut_tgl, 1, 0) AS surat_distribusi_iscabut,
    IF(s.surat_distribusi_tgl, 1, 0) AS surat_isdistribusi,
    IFNULL(s.surat_setuju, 0) AS surat_setuju,
    IF(s.surat_nomor, 1, 0) AS surat_isnomor,
    s.surat_ekspedisi,
    sijt.surat_imasuk_tolak,
    IF(s.surat_tolak_baca_tgl, 1, 0) AS surat_tolak_isbaca,
    IF(s.surat_ishapus, 1, 0) AS surat_properti_ishapus,
    -- IF(siuj.surat_imasuk_ulasan_jumlah, 1, 0) AS surat_imasuk_ulasan_jumlah,
    -- IF(s.surat_ulasan_baca_tgl, 1, 0) AS surat_ulasan_isbaca,
    -- IF(ssltj.surat_sla_tolak_jumlah, 1, 0) AS surat_sla_tolak_jumlah,
    -- IF(s.surat_sla_tolak_baca_tgl, 1, 0) AS surat_sla_tolak_isbaca,
    IF(dmbr.disposisi_jumlah_berkas_request, 1, 0) AS disposisi_jumlah_berkas_request
FROM surat s
LEFT JOIN unit u on u.unit_id = s.surat_unit
LEFT JOIN surat_imasuk_jumlah_tolak sijt FORCE INDEX(PRIMARY) ON sijt.surat_imasuk_tolak_surat = s.surat_id
-- LEFT JOIN surat_sla_tolak_jumlah ssltj FORCE INDEX(PRIMARY) ON ssltj.surat_sla_tolak_surat = s.surat_id
-- LEFT JOIN surat_imasuk_ulasan_jumlah siuj FORCE INDEX(PRIMARY) ON siuj.surat_imasuk_ulasan_surat = s.surat_id
LEFT JOIN disposisi_jumlah_berkas_request dmbr FORCE INDEX(PRIMARY) ON dmbr.disposisi_surat = s.surat_id
;

/*==============================================================*/
/* View: v_notif_user */
/*==============================================================*/

CREATE OR REPLACE VIEW v_notif_user AS
SELECT
	`nu`.*,
	`penerima`.`staf_profil_staf`			AS `penerima_id`,
	`penerima`.`staf_profil_staf_nama`		AS `penerima_nama`,
	`penerima`.`staf_profil_jabatan`		AS `penerima_jabatan_id`,
	`penerima`.`staf_profil_jabatan_nama`	AS `penerima_jabatan_nama`,
	`penerima`.`staf_profil_unit`			AS `penerima_unit_id`,
	`penerima`.`staf_profil_unit_nama`		AS `penerima_unit_nama`,
	`pengirim`.`staf_profil_staf`			AS `pengirim_id`,
	`pengirim`.`staf_profil_staf_nama`		AS `pengirim_nama`,
	`pengirim`.`staf_profil_jabatan`		AS `pengirim_jabatan_id`,
	`pengirim`.`staf_profil_jabatan_nama`	AS `pengirim_jabatan_nama`,
	`pengirim`.`staf_profil_unit`			AS `pengirim_unit_id`,
	`pengirim`.`staf_profil_unit_nama`		AS `pengirim_unit_nama`
FROM `notif_user` `nu`
LEFT JOIN `staf_profil` `penerima` ON `nu`.`notif_user_penerima_profil` = `penerima`.`staf_profil_id`
LEFT JOIN `staf_profil` `pengirim` ON `nu`.`notif_user_pengirim_profil` = `pengirim`.`staf_profil_id`;

/*==============================================================*/
/* View: v_notif_agenda_unit */
/*==============================================================*/

CREATE OR REPLACE VIEW `v_notif_agenda_unit` AS 
SELECT
    `s`.`unit_id`,
    `s`.`unit_nama`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 1 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_7` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasuk_reminder_7`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 1 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_3` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasuk_reminder_3`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 1 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_1` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasuk_reminder_1`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 3 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_7` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasukinternal_reminder_7`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 3 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_3` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasukinternal_reminder_3`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 3 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_useretensi` = 1 AND
            `s`.`surat_m_1` = 1
        ) THEN 1 ELSE 0 END
    ) AS `agmasukinternal_reminder_1`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 1 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            ((`s`.`surat_useretensi` = 0) OR (`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)) AND
            IFNULL(`s`.`surat_isdistribusi`,0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agmasuk_pendistribusian`,
    SUM(CASE 
        WHEN (
            `s`.`surat_model` = 2 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            ((`s`.`surat_useretensi` = 0) OR (`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)) AND
            `s`.`surat_setuju` = 2 AND
            `s`.`surat_isnomor` = 1 AND
            ISNULL(`s`.`surat_ekspedisi`)
        ) THEN 1 ELSE 0 END
    ) AS `agkeluar_blmekspedisi`,
    SUM(CASE 
        WHEN(
            `s`.`surat_model` = 2 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            ((`s`.`surat_useretensi` = 0) OR (`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)) AND
            `s`.`surat_setuju` = 2 AND
            IFNULL(`s`.`surat_isnomor`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agkeluar_blmnomor`,
    SUM(CASE 
        WHEN(
            `s`.`surat_model` = 3 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            IFNULL(`s`.`surat_setuju`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agmasukinternal_pending`,
    SUM(CASE
        WHEN (
            `s`.`surat_model` = 4 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            ((`s`.`surat_useretensi` = 0) OR (`s`.`surat_useretensi` = 1 AND DATE_FORMAT(`s`.`surat_retensi_tgl`, '%Y-%m-%d') >= CURRENT_DATE)) AND
            `s`.`surat_setuju` = 2 AND 
            IFNULL(`s`.`surat_isnomor`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agkeluarinternal_blmnomor`,
    SUM(CASE
        WHEN( 
            `s`.`surat_model` = 4 AND 
            IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
            `s`.`surat_imasuk_tolak` > 0 AND
            `s`.`surat_tolak_isbaca` = 0
        ) THEN 1 ELSE 0 END
    ) AS `agkeluarinternal_tolak`,
    -- SUM(CASE
    --     WHEN( 
    --         `s`.`surat_model` = 4 AND 
    --         IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
    --         `s`.`surat_sla_tolak_jumlah` > 0 AND
    --         `s`.`surat_sla_tolak_isbaca` = 0
    --     ) THEN 1 ELSE 0 END
    -- ) AS `agkeluarinternal_slatolak`,
    -- SUM(CASE
    --     WHEN( 
    --         `s`.`surat_model` = 4 AND 
    --         IFNULL(`s`.`surat_properti_ishapus`,0) = 0 AND 
    --         `s`.`surat_imasuk_ulasan_jumlah` > 0 AND
    --         `s`.`surat_ulasan_isbaca` = 0
    --     ) THEN 1 ELSE 0 END
    -- ) AS `agkeluarinternal_ulasan`,
    SUM(CASE
        WHEN( 
            `s`.`surat_model` = 1 AND
            `s`.`surat_isdistribusi` = 1 AND
            `s`.`disposisi_jumlah_berkas_request` > 0 AND
			IFNULL(`s`.`surat_distribusi_iscabut`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agmasuk_request_berkas`,
    SUM(CASE
        WHEN( 
            `s`.`surat_model` = 2 AND 
            `s`.`surat_isdistribusi` = 1 AND
            `s`.`disposisi_jumlah_berkas_request` > 0 AND
			IFNULL(`s`.`surat_distribusi_iscabut`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agkeluar_request_berkas`,
    SUM(CASE
        WHEN( 
            `s`.`surat_model` = 3 AND 
            `s`.`surat_isdistribusi` = 1 AND
            `s`.`disposisi_jumlah_berkas_request` > 0 AND
			IFNULL(`s`.`surat_distribusi_iscabut`, 0) = 0
        ) THEN 1 ELSE 0 END
    ) AS `agmasukinternal_request_berkas`
FROM
    `v_surat_lite_notif` `s`
GROUP BY `s`.`unit_id`
HAVING 
    `s`.`unit_id` IS NOT NULL
;

/*==============================================================*/
/* View: v_notif_agenda_jabatan_cakupan */
/*==============================================================*/

-- create or replace view `v_notif_agenda_jabatan` as 

-- select 
-- 	`uc`.`jabatan_id`, `uc`.`jabatan_nama`,
-- 	IFNULL(SUM(`nu`.`agmasuk_reminder_7`),0) as `agmasuk_reminder_7`,
-- 	IFNULL(SUM(`nu`.`agmasuk_reminder_3`),0) as `agmasuk_reminder_3`,
-- 	IFNULL(SUM(`nu`.`agmasuk_reminder_1`),0) as `agmasuk_reminder_1`,
-- 	IFNULL(SUM(`nu`.`agmasukinternal_reminder_7`),0) as `agmasukinternal_reminder_7`,
-- 	IFNULL(SUM(`nu`.`agmasukinternal_reminder_3`),0) as `agmasukinternal_reminder_3`,
-- 	IFNULL(SUM(`nu`.`agmasukinternal_reminder_1`),0) as `agmasukinternal_reminder_1`,
-- 	IFNULL(SUM(`nu`.`agmasuk_pendistribusian`),0) as `agmasuk_pendistribusian`,
-- 	IFNULL(SUM(`nu`.`agkeluar_blmekspedisi`),0) as `agkeluar_blmekspedisi`,
-- 	IFNULL(SUM(`nu`.`agkeluar_blmnomor`),0) as `agkeluar_blmnomor`,
-- 	IFNULL(SUM(`nu`.`agmasukinternal_pending`),0) as `agmasukinternal_pending`,
-- 	IFNULL(SUM(`nu`.`agkeluarinternal_blmnomor`),0) as `agkeluarinternal_blmnomor`,
-- 	IFNULL(SUM(`nu`.`agkeluarinternal_tolak`),0) as `agkeluarinternal_tolak`,
-- 	-- IFNULL(SUM(`nu`.`agkeluarinternal_slatolak`),0) as `agkeluarinternal_slatolak`,
-- 	-- 0 as `agkeluarinternal_slatolak`,
-- 	IFNULL(SUM(`nu`.`agkeluarinternal_ulasan`),0) as `agkeluarinternal_ulasan`,
-- 	IFNULL(SUM(`nu`.`agmasuk_request_berkas`),0) as `agmasuk_request_berkas`,
-- 	IFNULL(SUM(`nu`.`agkeluar_request_berkas`),0) as `agkeluar_request_berkas`,
-- 	IFNULL(SUM(`nu`.`agmasukinternal_request_berkas`),0) as `agmasukinternal_request_berkas`
-- from `v_unit_cakupan_aktif` `uc` 
-- left join `v_notif_agenda_unit` `nu` on `uc`.`unit_cakupan_unit` = `nu`.`unit_id`

-- group by `jabatan_id`;

/*==============================================================*/
/* View: v_notif_disposisi_masuk_staf */
/*==============================================================*/

-- CREATE OR REPLACE VIEW `v_notif_disposisi_masuk_staf` AS

-- select 
-- `v`.`disposisi_masuk_penerima_id` as `staf_id`,
-- `v`.`disposisi_masuk_penerima_nama` as `staf_nama`,
-- SUM(
--     CASE WHEN(
--         (IFNULL(`v`.`disposisi_model`,0) = 0 and
--         ISNULL(`v`.`disposisi_masuk_aksi`) and
--         IFNULL(`v`.`disposisi_masuk_istembusan`,0) = 0 and
--         IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 and
--         IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0 and
--         `v`.`surat_isdistribusi` = 1) OR 
--         (IFNULL(`v`.`disposisi_model`,0) = 0 and
--         `v`.`disposisi_masuk_istembusan` = 1 and
--         IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0)
--     ) THEN 1 ELSE 0 END 
-- ) as `kotakmasuk_belumditindak`,
-- SUM(
--     CASE WHEN(
--         IFNULL(`v`.`disposisi_model`,0) = 0 and
--         IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0 and
--         IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0 and
--         `v`.`disposisi_surat` IS NOT NULL
--     ) THEN 1 ELSE 0 END 
-- ) as `kotakmasuk_belumdibaca`,
-- SUM(
--     CASE WHEN(
--         `v`.`disposisi_model` = 1 and
--         IFNULL(`v`.`disposisi_masuk_isbaca`,0) = 0
--     ) THEN 1 ELSE 0 END 
-- ) as `draft_belumdibaca`,
-- SUM(
--     CASE WHEN(
--         `v`.`disposisi_model` = 1 and 
--         IFNULL(`v`.`disposisi_masuk_status`,0) = 0
--     ) THEN 1 ELSE 0 END 
-- ) as `draft_belumditindak`,
-- SUM(
--     CASE WHEN(
--         (
--         	IFNULL(`v`.`disposisi_model`,0) = 0 and
-- 	        ISNULL(`v`.`disposisi_masuk_aksi`) and
-- 	        IFNULL(`v`.`disposisi_masuk_isterus`,0) = 0 and
-- 	        IFNULL(`v`.`disposisi_masuk_iscabut`,0) = 0
-- 	    )
-- 	    OR
--         (
--         	`v`.`disposisi_model` = 1 and 
--         	IFNULL(`v`.`disposisi_masuk_status`,0) = 0
--         )
--     ) THEN 1 ELSE 0 END 
-- ) as `tugassaya_belumditindak`
-- -- SUM(CASE(
-- --     WHEN(
-- --         from `v_koreksi_riwayat` `v`
-- --         where `v`.`disposisi_staf` = `s`.`staf_id`
-- --         and `v`.`disposisi_isbaca` = 0
-- --     ) THEN 1 ELSE 0 END 
-- -- ) as `koreksi_status`
-- FROM
--     `v_disposisi_masuk_abstract` `v`
-- GROUP BY `v`.`disposisi_masuk_penerima_id`
-- HAVING 
--     `v`.`disposisi_masuk_penerima_id` IS NOT NULL
-- ;

/*==============================================================*/
/* View: v_disposisi_abstract_lite */
/*==============================================================*/
-- for v_notif_disposisi_staf --
CREATE  or replace VIEW `v_disposisi_abstract_lite` AS
    SELECT 
        `d`.`disposisi_staf` AS `disposisi_pengirim_id`,
        IFNULL(`d`.`disposisi_model`, 0) AS `disposisi_model`,
        `d`.`disposisi_induk` AS `disposisi_induk`,
        IF(`dms`.`disposisi_masuk_sorter`, 0, 1) AS `disposisi_sorter`
    FROM
        (`disposisi` `d`
        LEFT JOIN `disposisi_masuk_sorter` `dms` FORCE INDEX(PRIMARY) ON ((`d`.`disposisi_id` = `dms`.`disposisi_masuk_disposisi`)))

;

/*==============================================================*/
/* View: v_notif_disposisi_staf */
/*==============================================================*/

CREATE OR REPLACE VIEW `v_notif_disposisi_staf` AS

SELECT 
`v`.`disposisi_pengirim_id` as `staf_id`,
SUM(
	CASE WHEN(
        IFNULL(`v`.`disposisi_model`, 0) = 0 AND
        IFNULL(`v`.`disposisi_sorter`, 0) = 0 AND
        `v`.`disposisi_induk` IS NOT NULL
    ) THEN 1 ELSE 0 END 
) as `disposisi_status_baca_tindakan`
FROM
    `v_disposisi_abstract_lite` `v`
GROUP BY `v`.`disposisi_pengirim_id`
HAVING 
    `v`.`disposisi_pengirim_id` IS NOT NULL
;

CREATE OR REPLACE VIEW `v_notif_helper_staf_wakil_aktif` AS 
SELECT
	`s`.*
FROM 
	`staf_wakil` `s`
WHERE 
	(
		IFNULL(`s`.`staf_wakil_plt`, 0) = 0 OR 
		(`s`.`staf_wakil_plt` = 1 AND DATE_FORMAT(`s`.`staf_wakil_tgl_selesai`, '%Y-%m-%d') >= CURRENT_DATE 
		AND DATE_FORMAT(`s`.`staf_wakil_tgl_mulai`, '%Y-%m-%d') <= CURRENT_DATE)
	)
;

/*==============================================================*/
/* View: v_notif_agenda_jabatan_cakupan */
/*==============================================================*/

create or replace view `v_notif_staf_asisten` as 

select 
	`uc`.`staf_wakil_asisten`,
	IFNULL(SUM(`nd`.`disposisi_status_baca_tindakan`),0) as `disposisi_status_baca_tindakan`,
	IFNULL(SUM(`nu`.`kotakmasuk_belumditindak`),0) as `kotakmasuk_belumditindak`,
	IFNULL(SUM(`nu`.`draft_belumditindak`),0) as `draft_belumditindak`
from `v_notif_helper_staf_wakil_aktif` `uc` 
left join `v_notif_disposisi_masuk_staf` `nu` on `uc`.`staf_wakil_staf` = `nu`.`staf_id`
left join `v_notif_disposisi_staf` `nd` on `uc`.`staf_wakil_staf` = `nd`.`staf_id`

group by `staf_wakil_asisten`;

/*==============================================================*/
/* SOON 														*/
/* View: v_notif_agenda_masuk_blmdistribusi 					*/
/* View: v_notif_agenda_masuk_aktif7 							*/
/* View: v_notif_agenda_masuk_aktif3 							*/
/* View: v_notif_agenda_masuk_aktif1 							*/
/* View: v_notif_agenda_masuk_request_berkas 					*/
/* View: v_notif_agenda_keluar_blmkirim 						*/
/* View: v_notif_agenda_keluar_blmnomor 						*/
/* View: v_notif_agenda_keluar_request_berkas 					*/
/* View: v_notif_agenda_imasuk_pending 							*/
/* View: v_notif_agenda_imasuk_aktif7 							*/
/* View: v_notif_agenda_imasuk_aktif3 							*/
/* View: v_notif_agenda_imasuk_aktif1 							*/
/* View: v_notif_agenda_imasuk_request_berkas 					*/
/* View: v_notif_agenda_ikeluar_tolak 							*/
/* View: v_notif_agenda_ikeluar_slatolak 						*/
/* View: v_notif_agenda_ikeluar_ulasan 							*/
/* View: v_notif_agenda_ikeluar_blmnomor 						*/
/*==============================================================*/

CREATE OR REPLACE VIEW `v_notif_agenda_masuk_blmdistribusi` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_aktif` `s`
WHERE 
	IFNULL(`s`.`surat_isdistribusi`,0) = 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_masuk_aktif7` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_hidup` `s`
WHERE 
	`s`.`surat_m_7` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_masuk_aktif3` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_hidup` `s`
WHERE 
	`s`.`surat_m_3` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_masuk_aktif1` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_hidup` `s`
WHERE 
	`s`.`surat_m_1` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_masuk_request_berkas` AS 
SELECT
	`s`.*
FROM 
	`v_surat_masuk_distribusi` `s`
WHERE 
	`s`.`disposisi_jumlah_berkas_request` > 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_keluar_blmkirim` AS 
SELECT
	`s`.*
FROM 
	`v_surat_keluar_aktif` `s`
WHERE 
	`s`.`surat_setuju` = 2 AND
	`s`.`surat_isnomor` = 1 AND
	ISNULL(`s`.`surat_ekspedisi`)
;

CREATE OR REPLACE VIEW `v_notif_agenda_keluar_blmnomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat_keluar_aktif` `s`
WHERE 
	`s`.`surat_setuju` = 2 AND
	IFNULL(`s`.`surat_isnomor`, 0) = 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_keluar_request_berkas` AS 
SELECT
	`s`.*
FROM 
	`v_surat_keluar_aktif` `s`
WHERE 
	`s`.`disposisi_jumlah_berkas_request` > 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_imasuk_pending` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_hidup` `s`
WHERE 
 IFNULL(`s`.`surat_setuju`, 0) = 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_imasuk_aktif7` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_hidup` `s`
WHERE 
 	`s`.`surat_m_7` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_imasuk_aktif3` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_hidup` `s`
WHERE 
 	`s`.`surat_m_3` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_imasuk_aktif1` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_hidup` `s`
WHERE 
 	`s`.`surat_m_1` = 1
;

CREATE OR REPLACE VIEW `v_notif_agenda_imasuk_request_berkas` AS 
SELECT
	`s`.*
FROM 
	`v_surat_imasuk_distribusi` `s`
WHERE 
	`s`.`disposisi_jumlah_berkas_request` > 0
;

CREATE OR REPLACE VIEW `v_notif_agenda_ikeluar_tolak` AS 
SELECT
	`s`.*
FROM 
	`v_surat_ikeluar_aktif` `s`
WHERE 
	`s`.`surat_imasuk_tolak` > 0 AND
	`s`.`surat_tolak_isbaca` = 0
;

-- CREATE OR REPLACE VIEW `v_notif_agenda_ikeluar_slatolak` AS 
-- SELECT
-- 	`s`.*
-- FROM 
-- 	`v_surat_ikeluar_aktif` `s`
-- WHERE 
--  	`s`.`surat_sla_tolak_jumlah` > 0 AND
-- 	`s`.`surat_sla_tolak_isbaca` = 0
-- ;

-- CREATE OR REPLACE VIEW `v_notif_agenda_ikeluar_ulasan` AS 
-- SELECT
-- 	`s`.*
-- FROM 
-- 	`v_surat_ikeluar_aktif` `s`
-- WHERE 
--  	`s`.`surat_imasuk_ulasan_jumlah` > 0 AND
-- 	`s`.`surat_ulasan_isbaca` = 0
-- ;

CREATE OR REPLACE VIEW `v_notif_agenda_ikeluar_blmnomor` AS 
SELECT
	`s`.*
FROM 
	`v_surat_ikeluar_aktif` `s`
WHERE 
	`s`.`surat_setuju` = 2 AND 
	IFNULL(`s`.`surat_isnomor`, 0) = 0
;

-- /*==============================================================*/
-- /* Trigger: t_peran_del_af */
-- /*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_peran_del_af`$$

-- CREATE

--     TRIGGER `t_peran_del_af` AFTER DELETE
--     ON `peran`
--     FOR EACH ROW BEGIN
-- 	DELETE FROM `akses` WHERE `akses_peran` = OLD.`peran_id`;
--     END$$

-- DELIMITER ;


-- /*==============================================================*/
-- /* Trigger: t_fitur_del_af */
-- /*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_fitur_del_af`$$

-- CREATE

--     TRIGGER `t_fitur_del_af` AFTER DELETE
--     ON `fitur`
--     FOR EACH ROW BEGIN
-- 	DELETE FROM `akses` WHERE `akses_fitur` = OLD.`fitur_id`;
--     END$$

-- DELIMITER ;


/*==============================================================*/
/* Trigger: t_akun_in_af */
/*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_akun_in_af`$$

-- CREATE
--     TRIGGER `t_akun_in_af` AFTER INSERT
--     ON `akun`
--     FOR EACH ROW BEGIN
-- 	IF(NEW.akun_staf IS NOT NULL AND TRIM(NEW.akun_staf) <> "") THEN
-- 		UPDATE staf SET staf_akun = NEW.akun_id WHERE staf_id = NEW.akun_staf;
-- 	END IF;
--     END$$

-- DELIMITER ;


/*==============================================================*/
/* Trigger: t_staf_in_af */
/*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_staf_in_af`$$

-- CREATE
--     TRIGGER `t_staf_in_af` AFTER INSERT
--     ON `staf`
--     FOR EACH ROW BEGIN
-- 		IF(NEW.staf_akun IS NOT NULL AND TRIM(NEW.staf_akun) <> "") THEN
-- 			UPDATE akun SET akun_staf = NEW.staf_id WHERE akun_id = NEW.staf_akun;
-- 		END IF;
--     END$$

-- DELIMITER ;


/*==============================================================*/
/* Trigger: t_staf_up_af */
/*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_staf_up_af`$$

-- CREATE
--     TRIGGER `t_staf_up_af` AFTER UPDATE ON `staf`
--     FOR EACH ROW BEGIN
-- 	/* make sure only connected with one akun */
-- 	IF(new.staf_akun <> old.staf_akun )THEN
-- 		UPDATE `akun` SET akun_staf = NEW.staf_id WHERE akun_id = NEW.staf_akun;
-- 		-- UPDATE `akun` SET akun_staf = NULL WHERE akun_id <> NEW.staf_akun;
-- 	END IF;
-- 	/* end */
--     END;
-- $$

-- DELIMITER ;

/*==============================================================*/
/* Trigger: t_akun_up_af */
/*==============================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_akun_up_af`$$

-- CREATE
--     TRIGGER `t_akun_up_af` AFTER UPDATE ON `akun`
--     FOR EACH ROW BEGIN
-- 	/* make sure only connected with one akun */
-- 	IF( new.akun_staf <> old.akun_staf )THEN
-- 		UPDATE `staf` SET staf_akun = NEW.akun_id WHERE staf_id = NEW.akun_staf;
-- 		-- update `staf` set staf_akun = null where staf_id <> NEW.akun_staf;
-- 	END IF;
-- 	/* end */
--     END;
-- $$

-- DELIMITER ;

/*==================================================================*/
/* Trigger: t_staf_del_bef */
/*==================================================================*/
-- DELIMITER $$

-- DROP TRIGGER /*!50032 IF EXISTS */ `t_staf_del_bef`$$

-- CREATE
--     TRIGGER `t_staf_del_bef` BEFORE DELETE ON `staf`
--     FOR EACH ROW BEGIN
-- 	DELETE FROM `akun` WHERE akun_id = OLD.`staf_akun`;
--     END;
-- $$

-- DELIMITER ;
