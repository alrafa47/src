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
				<td style="font-size:18px; font-weight:bold; color:#212121; font-family:Arial;">{title}</td>
			</tr>
			<!-- <tr>
				<td colspan="5" style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr> -->
		</table>
		{data}
		<br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td colspan="5" style="color:#FFFFFF; font-weight:bold; padding: 2px 8px; font-size: 14px; line-height: 28px;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E">
					<td style="color:#FFFFFF; vertical-align: top; width:3%; padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:37%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Hak Akses</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Jumlah Pegawai</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Pegawai Aktif</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Pegawai Nonaktif</td>
				</tr>
			</thead>
			<tbody>
				{hak_akses}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{peran_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{count_peran}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{count_aktif}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{count_nonaktif}</td>
				</tr>
				{/hak_akses}
			</tbody>
		</table>
		{/data}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="5">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>