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
		<table style="display:block; padding: 10px 0px;">
			<tr>
				<td colspan="6" style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td colspan="6" style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td colspan="6" style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode Laporan: {periode}</td>
			</tr>
		</table>
		<br/>
		{unit}
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div> -->
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">{unit_nama}</div> -->
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="6" style="color:#FFFFFF; font-weight:bold; padding: 2px 8px; font-size: 14px; line-height: 28px;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:13%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Tipe</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tgl.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:17%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">No.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:30%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Perihal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:22%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Status Penyetujuan Terakhir</td>
				</tr>
			</thead>
			<tbody style="vertical-align: top; font-size:11px;">
				{records}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{itipe_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_tanggal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_perihal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">
						{penyetuju_nama} - {penyetuju_jabatan_nama}
					</td>
				</tr>
				{/records}
			</tbody>
		</table>
		{/unit}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="6">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>