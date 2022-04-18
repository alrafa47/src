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

	<div class="paper" style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
		{header}
		<div style="text-align:center; display:block; padding:10px;">
			<div style="display:block; font-size:18px; font-weight:bold; color:#3B3535;">{title}</div>
			<div style="display:block; font-size:12px; font-style:italic;">({subtitle})</div>
		</div>
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div> -->
		<!--<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">unitkerja: {unit_nama}</div>-->
		<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div>
		<table style="width:100%; border-bottom:1px; border-style:solid; border-color: black; font-family:Arial; font-size:11px;">
			<!-- <thead style="font-size:12px;"> -->
				<tr style="padding:4px;line-height:18px; border-top:1px; border-bottom:1px; border-style: solid; border-color: black; background-color:lightgray; font-size:12px;">
					<td style="vertical-align: top; width:2%; padding:4px; font-weight:bold; text-align:center;">#</td>
					<td style="vertical-align: top; width:25%; padding:4px; font-weight:bold;">Unit</td>
					<td style="vertical-align: top; width:15%; padding:4px; font-weight:bold; text-align:center;">Jumlah Korespondensi</td>
				</tr>
			<!-- </thead> -->
			<tbody style="font-size:11px;">
				{data}
				<tr style="border-bottom: 1px solid lightgray;">
					<td style="vertical-align: top; width:2%; padding:3px; text-align:center; width:40px; border-right:1px solid lightgray; color: #9E9E9E;">{no}.</td>
					<td style="vertical-align: top; width:25%; padding:3px;">{unit_nama}</td>
					<td style="vertical-align: top; width:15%; padding:3px; text-align:center; ">{jumlah_korespondensi}</td>
				</tr>
				{/data}
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