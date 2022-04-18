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
		<div style="text-align:center; padding:10px;">
		<table style="width: 100%; text-align:center; padding:10px;">
			<tr>
				<td style="font-size:18px; font-weight:bold; color:#3B3535;">{title}</td>
			</tr>
			<tr>
				<td style="font-size:12px; font-style:italic;">({subtitle})</td>
			</tr>
			<tr>
				<td style="text-align:center; font-weight:bold; font-size:13px; color:#607D8B; padding-top: 10px;">{unit_nama}</td>
			</tr>
		</table>
			<!-- <div style="display:block; font-size:18px; font-weight:bold; color:#3B3535;">{title}</div>
			<div style="display:block; font-size:12px; font-style:italic;">({subtitle})</div> -->
		</div>
		<!-- <div style="text-align:center; font-weight:bold; font-size:13px; color:#607D8B;">Periode: {periode}</div> -->
		<!-- <div style="text-align:center; font-weight:bold; font-size:13px; color:#607D8B;"></div	> -->
		<div style="text-align:center;"><img src="{chart}"></div><br/>
		{data}
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align:left;">Unit Nama</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Masuk</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Keluar</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Internal Masuk</td>
					<td style="color:#FFFFFF; vertical-align: top; width:20%; padding:2px; font-size: 13px; line-height:28px; text-align: center;">Internal Keluar</td>
				</tr>
			</thead>
			<tbody>
				{data}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{unit_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_masuk}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_keluar}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_masuk_internal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_keluar_internal}</td>
				</tr>
				{/data}
			</tbody>
		</table>
		{data}
		<!-- <table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td colspan="3" style="color:#FFFFFF; padding: 6px 8px; font-size: 14px; line-height: 28px;">Top 10 Penerima Disposisi</td>
				</tr>
				<tr style="background-color:#9E9E9E;">
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:2%; padding:8px; text-align:right;">#</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:30%; padding:8px;">Penerima Nama</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:25%; padding:8px; text-align: center;">Unit</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
			{disposisi}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color:#9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{disposisi_masuk_penerima_nama}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{disposisi_pengirim_unit_nama}</td>
				</tr>
			{/disposisi}
			</tbody>
		</table>
		<br />
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td colspan="3" style="color:#FFFFFF; vertical-align: top; width:30%; padding:8px; font-size: 14px; line-height: 28px;">Surat Masuk Terbaru</td>
				</tr>
				<tr style="background-color:#9E9E9E;">
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:2%; padding:8px; text-align:right;">#</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:30%; padding:8px;">Nomor Surat</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:25%; padding:8px; text-align: center;">Perihal</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
			{surat_masuk}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color:#9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align:center;">{surat_perihal}</td>
				</tr>
			{/surat_masuk}
			</tbody>
		</table>
		<br />
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575;">
					<td colspan="3" style="color:#FFFFFF; vertical-align: top; width:30%; padding:8px; font-size: 14px; line-height: 28px;">Surat Keluar Terbaru</td>
				</tr>
				<tr style="background-color:#9E9E9E;">
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:2%; padding:8px; text-align:right;">#</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:30%; padding:8px;">Nomor Surat</td>
					<td style="color:#FFFFFF; font-size: 13px; vertical-align: top; width:25%; padding:8px; text-align: center;">Perihal</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
			{surat_keluar}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top;">{surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align:center;">{surat_perihal}</td>
				</tr>
			{/surat_keluar}
			</tbody>
		</table> -->
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>