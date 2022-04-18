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
		<!-- <div style="display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">{subtitle}</div>
		</div>
		<div style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Periode Laporan: {periode}</div> -->
		<table style="display:block; padding: 10px 0px;">
			<tr>
				<td colspan="4" style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td colspan="4" style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td colspan="4" style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode Laporan: {periode}</td>
			</tr>
		</table>
		{records}
		<br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size: 12px;">
				<tr style="background-color:#757575; font-size: 12px;">
					<td colspan="4" style="padding:2px; font-size:11px; line-height: 28px; vertical-align: top; text-align: left; color:#FFFFFF; font-size: 14px;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size: 12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:24px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:24px; text-align:left;">(No.Agenda)No.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:25%; padding:2px; font-size: 13px; line-height:24px; text-align:left;">Dari</td>
					<td style="color:#FFFFFF; vertical-align: top; width:50%; padding:2px; font-size: 13px; line-height:24px; text-align:left;">Perihal</td>
				</tr>
			</thead>
			<tbody>
				{surat}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}</td>
					<td style="padding:2px; font-size:11px; font-weight: bold; font-weight: bold; line-height: 24px; vertical-align: top; text-align: left; color: #000000;">({surat_agenda}){surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left; color: #000000; font-size: 12px;">{unit_pengirim_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left; color: #000000; font-size: 12px;">{surat_perihal}</td>
				</tr>
				{unit_penilai}
				<tr style="{bg_color}">
					<td style="padding-left:20px; font-size:11px; line-height: 18px; vertical-align: top; text-align: right; color: #9E9E9E;"></td>
					<td style="padding-left:20px; font-size:11px; line-height: 18px; vertical-align: top; text-align: left;">
						{penerima_unit_nama}<br><span style="color:#757575;">{ulasan_tanggal}</span>
					</td>
					<td colspan="2" style="padding-left:20px; font-size:11px; line-height: 18px; vertical-align: top; text-align: left;">
						{surat_ulasan_nilai}<br>{surat_ulasan_komentar}
					</td>
				</tr>
				{/unit_penilai}
				{/surat}
			</tbody>
		</table>
		{/records}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="4">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>