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
		<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div>
		{unit}
		<br>
		<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">{unit_nama}</div>
		<br>
		<table style="width:190px; border-style:none; border-color: black; font-family:Arial; font-size:11px;">
			<tbody>
			<tr>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">Proses Selesai</td>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">: {process_done_count}</td>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">surat</td>
			</tr>
			<tr>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">Belum Diproses</td>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">: {blm_distribusi_count}</td>
				<td style="text-align:left; font-weight:bold; color:#000000; font-size:13px;">surat</td>
			</tr>
			</tbody>
		</table>
		<!--<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">unitkerja: {unit_nama}</div>-->
		<table style="width:100%; border-bottom:1px; border-style:solid; border-color: black; font-family:Arial; font-size:11px;">
			<thead style="font-size:12px;">
				<tr style="padding:4px;line-height:18px; border-top:1px; border-bottom:1px; border-style: solid; border-color: black; background-color:lightgray;">
					<td style="vertical-align: top; width:2%; padding:4px; font-weight:bold; text-align:center;" colspan="6">
						{detail_title}
					</td>
				</tr>
				<tr style="padding:4px;line-height:18px; border-top:1px; border-bottom:1px; border-style: solid; border-color: black; background-color:lightgray;">
					<td style="vertical-align: top; width:2%; padding:4px; font-weight:bold; text-align:right; width:40px;">No.</td>
					<td style="vertical-align: top; width:15%; padding:4px; font-weight:bold; width:80px;">Tgl.Surat</td>
					<td style="vertical-align: top; width:10%; padding:4px; font-weight:bold; width:80px;">No. Regirstrasi</td>
					<td style="vertical-align: top; width:20%; padding:4px; font-weight:bold;">(No.Agenda) No.Surat</td>
					<td style="vertical-align: top; width:15%; padding:4px; font-weight:bold; width:100px;">Untuk</td>
					<td style="vertical-align: top; width:40%; padding:4px; font-weight:bold;">Dari/Perihal</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{records_unprocessed}
				<tr style="border-bottom: 1px solid lightgray;">
					<td style="vertical-align: top; width:2%; padding:3px; text-align:right; background-color: #F2F2F2; width:40px; border-right:1px solid lightgray;">{no}.</td>
					<td style="vertical-align: top; width:15%; padding:3px;">{surat_tanggal}</td>
					<td style="vertical-align: top; width:10%; padding:3px;">{surat_registrasi}</td>
					<td style="vertical-align: top; width:20%; padding:3px;">({surat_agenda_converted}) {surat_nomor}</td>
					<td style="vertical-align: top; width:15%; padding:3px;">{surat_tujuan}</td>
					<td style="vertical-align: top; width:40%; padding:3px;">{surat_pengirim}, </br><b>{surat_perihal}</b></td>
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