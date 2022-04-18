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
		<table style="text-align: left; width: 100%; padding: 10px 0px;">
			<tr>
				<td colspan="5" style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td colspan="5" style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td colspan="5" style="font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode Laporan: {periode}</td>
			</tr>
		</table>
		<div style="text-align:left;"><img src="{chart}"></div>

		{data}
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="5" style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">{type}</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Masuk Eksternal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Masuk Internal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Keluar Eksternal</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Keluar Internal</td>
				</tr>
			</thead>
			<tbody>
				{value}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{title}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{masuk_eks}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{masuk_int}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{keluar_eks}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{keluar_int}</td>
				</tr>{/value}
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