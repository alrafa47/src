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
				<td colspan="3" style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td colspan="3" style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
			<tr>
				<td colspan="3" style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px; padding-top: 10px;">Periode: {periode}</td>
			</tr>
		</table>
		{unit}
		<br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="6" style="color:#FFFFFF; font-weight:bold; padding: 2px 8px; font-size: 14px; line-height: 28px;">{unit_nama}</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:25%; padding:2px 8px; font-size: 13px; line-height:28px; text-align:left;">Tipe Surat Keputusan</td>
					<td style="color:#FFFFFF; vertical-align: top; width:25%; padding:2px 8px; font-size: 13px; line-height:28px; text-align:left;">Jenis Sub</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tercatat</td>

					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Terdistribusikan</td>
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Belum Didistribusikan</td>

					<!-- <td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Proses</td> -->
					<td style="color:#FFFFFF; vertical-align: top; width:15%; padding:2px; font-size: 13px; line-height:28px; text-align:center;">Selesai</td>
				</tr>
			</thead>
			<tbody>
				{jenis_data}
					{kolektif}
					<tr>
						<td style=" padding:2px 8px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left; ">{tipe_nama}</td>
						<td style=" padding:2px 8px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{jenis_sub_nama}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{tercatat_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{terdistribusi_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{blm_distribusi_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{process_done_count}</td>
					</tr>
					{/kolektif}
					{perorangan}
					<tr style="{bg_color}">
						<td style=" padding:2px 8px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{tipe_nama}</td>
						<td style=" padding:2px 8px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{jenis_sub_nama}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{tercatat_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{terdistribusi_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{blm_distribusi_count}</td>
						<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{process_done_count}</td>
					</tr>
					{/perorangan}

				{/jenis_data}
			</tbody>
		</table>
		{/unit}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="3">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}{unit}{jenis_data}{tipe_nama{/jenis_data}{unit}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>