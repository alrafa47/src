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
		{
			content
		}
	</style>
	{/style}

	<div class="paper" style="width:100%; margin:0px auto; padding: 0px; font-family:Arial; font-size:11px;">
		{header}
		<!-- <div style=" display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">{subtitle}</div>
		</div>
		<div style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Periode Laporan: {periode}</div> -->
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
			<tr>
				<td colspan="6" style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Unit: {nama_unit_induk}</td>
			</tr>
		</table>
		<br />
		{unit}
		<h3>{groupName}</h3>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:24px;  padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:30%;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Unit</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Masuk Eksternal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Keluar Eksternal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:90px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Masuk Internal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:90px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Agenda Keluar Internal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Total</td>
				</tr>
			</thead>
			<tbody>
				{data}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{unit_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{emasuk}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{ekeluar}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{imasuk}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{ikeluar}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{total}</td>
				</tr>
				{/data}
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