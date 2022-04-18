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
				<td style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode Laporan: {periode}</td>
			</tr>
		</table>
		{unit}
		<br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead>
				<tr style="background-color:#757575;">
					<td colspan="3" style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">{unit_nama}</td>
				</tr>
			<thead>
			<tbody>
				<tr>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #FFFFFF; font-size:13px;">Proses Selesai</td>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #FFFFFF; font-size:13px;">: {process_done_count}</td>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #FFFFFF; font-size:13px;">surat</td>
				</tr>
				<tr>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #F5F5F5; font-size:13px;">Belum Diproses</td>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #F5F5F5; font-size:13px;">: {blm_distribusi_count}</td>
					<td style="padding:3px; text-align:left; color:#000000; background-color: #F5F5F5; font-size:13px;">surat</td>
				</tr>
			</tbody>
		</table>
		<br>
		<!--<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">unitkerja: {unit_nama}</div>-->
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;" colspan="6">
						{detail_title}
					</td>
				</tr>
				<tr style="background-color:#9E9E9E">
					<td style="color:#FFFFFF; vertical-align: top; width:24px; padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">(No.Agenda) No.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tgl.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">No. Regirstrasi</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Kepada</td>
					<td style="color:#FFFFFF; vertical-align: top; width:30%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Dari/Perihal</td>
				</tr>
			</thead>
			<tbody>
				{records_unprocessed}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">({surat_agenda_converted}) {surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_tanggal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_registrasi}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_tujuan}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_pengirim}, </br><b>{surat_perihal}</b></td>
				</tr>
				{/records_unprocessed}
			</tbody>
		</table>
		{/unit}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>