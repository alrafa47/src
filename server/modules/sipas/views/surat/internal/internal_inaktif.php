<!DOCTYPE html>
<html>
<head>
	<title>{title}</title>
</head>
<!-- we dont use head style -->
<body style="-webkit-print-color-adjust: exact;">

	<!-- <style type="text/css">
		body{
			
		}
	</style> -->
	{style}
	<style {params}>
	{content}
	</style>
	{/style}

	<div class="paper" style="width:100%; margin:0px auto; padding: 0px; font-family:Arial; font-size:11px;">
		{header}
		<table style="width:100%; border: 1px; text-align:center;">
			<tr>
				<td style="font-size:18px; font-weight:bold; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td style="font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode {periode}</td>
			</tr>
		</table>
		{unit}
		<br>
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">{unitkerja_nama}</div> -->
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="11" style="color:#FFFFFF; font-weight:bold; padding: 2px 8px; font-size: 14px; line-height: 28px;">Unit Pengolah : {unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:2%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:5%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Kode Klasifikasi</td>
					<td style="color:#FFFFFF; vertical-align: top; width:5%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">No Urut Arsip</td>
					<td style="color:#FFFFFF; vertical-align: top; width:30%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Uraian</td>
					<td style="color:#FFFFFF; vertical-align: top; width:7%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tahun</td>
					<td style="color:#FFFFFF; vertical-align: top; width:10%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tingkat Perkembangan</td>
					<td style="color:#FFFFFF; vertical-align: top; width:10%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Media Simpan</td>
					<td style="color:#FFFFFF; vertical-align: top; width:10%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Kondisi</td>
					<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Jumlah Berkas</td>
					<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Box</td>
					<td style="color:#FFFFFF; vertical-align: top; width:8%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Folder</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{records}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_kelas_kode}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_agenda_converted}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_nomor} tanggal {surat_tanggal} {surat_perihal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{tahun}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">Asli</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">-</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">-</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">-</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">-</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">-</td>
				</tr>
				{/records}
			</tbody>
		</table>
		{/unit}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="7">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>