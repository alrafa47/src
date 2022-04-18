<!DOCTYPE html>
<html>
<head>
	<title>{title}</title>
</head>
<!-- we dont use head style -->
<body>

	<style type="text/css">
		body{
			-webkit-print-color-adjust: exact;
		}
	</style>
	{style}
	<style {params}>
	{content}
	</style>
	{/style}

	<div class="paper" style="width:100%; margin:0px auto; padding: 0px; font-family:Arial; font-size:11px;">
		{header}
		<div style=" display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">{subtitle}</div>
		</div>
		<div style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Periode Laporan: {periode}</div>
		<br>
		<!--<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">unitkerja: {unit_nama}</div>-->
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td td style="color:#FFFFFF; vertical-align: top; width:24px; padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td td style="color:#FFFFFF; vertical-align: top; width:50%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Unit</td>
					<td td style="color:#FFFFFF; vertical-align: top; width:23%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Masuk Eksternal</td>
					<td td style="color:#FFFFFF; vertical-align: top; width:23%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Keluar Eksternal</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{unit}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{unit_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{emasuk}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{ekeluar}</td>
				</tr>
				{/unit}
			</tbody>
		</table>
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>