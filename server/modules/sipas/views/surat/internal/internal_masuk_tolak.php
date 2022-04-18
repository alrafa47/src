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

	<div class="paper" style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
		{header}
		<div style="text-align:center; display:block; padding:10px;">
			<div style="display:block; font-size:18px; font-weight:bold; color:#3B3535;">{title}</div>
			<div style="display:block; font-size:12px; font-style:italic;">({subtitle})</div>
		</div>
		{unit}
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div> -->
		<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">{unit_nama}</div>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#9E9E9E;">
					<td style="color: #FFFFFF; vertical-align: top; width:2%; padding:4px; font-weight:bold; text-align:right;">#</td>
					<td style="color: #FFFFFF; vertical-align: top; width:10%; padding:4px; font-weight:bold;">Tipe</td>
					<td style="color: #FFFFFF; vertical-align: top; width:15%; padding:4px; font-weight:bold;">Tgl.Surat</td>
					<td style="color: #FFFFFF; vertical-align: top; width:20%; padding:4px; font-weight:bold;">No.Surat</td>
					<td style="color: #FFFFFF; vertical-align: top; width:30%; padding:4px; font-weight:bold;">Penerima/Perihal</td>
					<td style="color: #FFFFFF; vertical-align: top; width:25%; padding:4px; font-weight:bold;">Rentang Penyetujuan</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{records}
				<tr style="vertical-align: top; border-bottom: 1px solid lightgray;">
					<td style="line-height: 24px; vertical-align: top; width:2%; padding:3px; text-align:center; color: #9E9E9E;">{no}.</td>
					<td style="line-height: 24px; vertical-align: top; width:10%; padding:3px;">{itipe_nama}</td>
					<td style="line-height: 24px; vertical-align: top; width:15%; padding:3px;">{surat_tanggal}</td>
					<td style="line-height: 24px; vertical-align: top; width:20%; padding:3px;">{surat_nomor}</td>
					<td style="line-height: 24px; vertical-align: top; width:30%; padding:3px;">
					<table>
					{penerima}
						<tr>
						<td>- {unit_nama}</td>
						</tr>
					{/penerima}
					</table>
					<strong>{surat_perihal}</strong>
					</td>
					<td style="line-height: 24px; vertical-align: top; width:25%; padding:3px;">{rentang_penyetujuan}</td>
				</tr>
				{/records}
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