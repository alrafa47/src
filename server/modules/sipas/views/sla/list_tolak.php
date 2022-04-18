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
		<!-- <div style=" display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">({subtitle})</div>
		</div>
		<div style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Periode: {periode}</div> -->
		<table style="display:block; padding: 10px 0px;">
			<tr>
				<td style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode: {periode}</td>
			</tr>
		</table>
		{unitkerja}
		<br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="7" style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:24px;px;  padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px;">(No.Agenda) No.Surat Masuk</td>
					<td style="color:#FFFFFF; vertical-align: top; width:*; padding:2px; font-size: 13px; line-height:28px;">Perihal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px;">Dari</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px;">Kepada</td>
					<td style="color:#FFFFFF; vertical-align: top; width:10%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tgl.Tolak</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Keterangan</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{surat}
				<tr style="{bg_color}">
					<td style="color:#9E9E9E; padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">({surat_agenda_parsed}) {surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{surat_perihal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{surat_pengirim}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{penyetuju_unit_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_sla_tolak_tgl}</td>
					<td  style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_sla_tolak_komentar}</td>
				</tr>
				{/surat}
			</tbody>
		</table>
		{/unitkerja}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>