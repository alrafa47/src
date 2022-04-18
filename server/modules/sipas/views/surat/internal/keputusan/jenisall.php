<!DOCTYPE html>
<html>
<head>
	<title>{title}</title>
</head>
<!-- we dont use head style -->
<body style="-webkit-print-color-adjust: exact;">
	{style}
		<style {params}>{content}</style>
	{/style}

	<div class="paper" style="width:100%; margin:0px auto; padding: 0px; font-family:Arial; font-size:11px;">
		{header}
		<table style="width:100%; border: 1px; text-align:center;">
			<tr>
				<td style="font-size:18px; font-weight:bold; color:#212121; font-family:Arial;">{title}</td>
			</tr>
			<tr>
				<td style="font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px; font-family:Arial;">Periode {periode}</td>
			</tr>
		</table>

		{unit}
		<br>

		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<tr style="background-color:#757575; font-size:12px;">
				<td colspan="15" style="color:#FFFFFF; font-weight:bold; padding: 2px 8px; font-size: 14px; line-height: 28px;">Unit Pengolah : {unit_nama}</td>
			</tr>
			<tr style="background-color:#9E9E9E; font-size:12px;">
				<td style="color:#FFFFFF; vertical-align: center; width:2%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">#</td>
				<td style="color:#FFFFFF; vertical-align: center; width:14%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">Uraian Isi Berkas</td>
				<td style="color:#FFFFFF; vertical-align: center; width:7%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">Tipe SK</td>
				<td style="color:#FFFFFF; vertical-align: center; width:7%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">Jenis SK</td>
				<td style="color:#FFFFFF; vertical-align: center; width:7%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">TMT Baru</td>
				<td style="color:#FFFFFF; vertical-align: center; width:12%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">Nama Penerima</td>
				<td style="color:#FFFFFF; vertical-align: center; width:16%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" colspan="2">Jabatan</td>
				<td style="color:#FFFFFF; vertical-align: center; width:6%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" colspan="2">Golongan</td>
				<td style="color:#FFFFFF; vertical-align: center; width:6%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" colspan="2">SGT</td>
				<td style="color:#FFFFFF; vertical-align: center; width:7%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" rowspan="2">Gaji Pokok</td>
				<td style="color:#FFFFFF; vertical-align: center; width:16%; padding:2px; font-size: 13px; line-height:28px; text-align:center;" colspan="2">Jenjang Jabatan</td>
			</tr>
			<tr style="background-color:#9E9E9E; font-size:12px;">
				<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Lama</td>
				<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Baru</td>
				<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Lama</td>
				<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Baru</td>
				<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Lama</td>
				<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Baru</td>
				<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Lama</td>
				<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Baru</td>
			</tr>

			<tbody style="font-size:11px;">
				{records}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;" rowspan="{surat_penerimask_total}">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;" rowspan="{surat_penerimask_total}">{surat_nomor} tanggal {surat_tanggal} {surat_perihal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;" rowspan="{surat_penerimask_total}">{surat_model_sub_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;" rowspan="{surat_penerimask_total}">{surat_jenis_sub_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;" rowspan="{surat_penerimask_total}">{surat_tmt}</td>
				</tr>
				{penerimask}
				<tr style="{penerimask_bgcolor}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{staf_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{jabatan_lama_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{jabatan_baru_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{golongan_lama_level}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{golongan_baru_level}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_penerimask_sglama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_penerimask_sgbaru}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_penerimask_gpbaru}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_penerimask_jenjang_jabatan_lama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_penerimask_jenjang_jabatan_baru}</td>
				</tr>
				{/penerimask}
				{/records}
			</tbody>
		</table>

		{/unit}

		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="7"><span style="font-family:Arial; font-size:10px;">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></span></td>
			</tr>
		</table>
		
	</div>
</body>
</html>