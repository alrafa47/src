<!DOCTYPE html>
<html>
<head>
	<title>{title}</title>
</head>
<!-- we dont use head style -->
<body style="-webkit-print-color-adjust: exact;">
	{style}
	<style {params}>
	{content}
	</style>
	{/style}

	<div class="paper" style="width:100%; margin:0px auto; padding: 0px; font-family:Arial; font-size:11px;">
		{header}
		<!-- <div style=" display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">{subtitle}</div>
		</div> -->
		<table style="display:block; padding: 10px 0px;">
			<tr><td colspan="16" style="display:block; font-size:18px; color:#212121;">{title}</td></tr>
			<tr><td colspan="16" style="display:block; font-size:12px; color:#212121;">{subtitle}</td></tr>
		</table>
		<!-- <div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">Periode: {periode}</div> -->
		<!--<div style="text-align:left; font-weight:bold; color:#3636ff; font-size:13px;">unitkerja: {unit_nama}</div>-->

		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<!-- <tr style="background-color:#757575;">
					<td colspan="15" style="color:#FFFFFF; font-weight:bold; padding: 4px; font-size: 14px; line-height: 28px; vertical-align: top; text-align: left;">Internal</td>
				</tr> -->
				<tr style="background-color:#757575; font-size:12px;">
					<td colspan="" style="color:#FFFFFF; font-weight:bold; padding: 4px; font-size: 14px; line-height: 28px; vertical-align: top; text-align: right;">#</td>
					<td colspan="" style="color:#FFFFFF; font-weight:bold; padding: 4px; font-size: 14px; line-height: 28px; vertical-align: top; text-align: left;">Unit</td>
					<td colspan="13" style="color:#FFFFFF; font-weight:bold; padding: 4px; font-size: 14px; line-height: 28px; vertical-align: top; text-align: center;">Bulan (Internal | Eksternal)</td>
					<td colspan="" style="color:#FFFFFF; font-weight:bold; padding: 4px; font-size: 14px; line-height: 28px; vertical-align: top;">Total</td>
				</tr>
				<tr style="background-color:#9E9E9E; font-size:12px;">
					<td></td>
					<td></td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Januari</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Februari</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Maret</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">April</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Mei</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Juni</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Juli</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Agustus</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">September</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Oktober</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">November</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Desember</td>
					<td style="color:#FFFFFF; padding: 2px 8px; font-size: 14px; line-height: 28px;">Total</td>
					<td></td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
			{rekap}
				<tr style="{bg_color}">
					<td style="color:#9E9E9E; padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right;">{no}.</td>
					<td style="line-height: 24px;padding:3px; vertical-align: center;">{unit_nama}</td>
					<td style="line-height: 24px;text-align:center;">{int_jan}   |  {eks_jan}</td>
					<td style="line-height: 24px;text-align:center;">{int_feb}   |  {eks_feb}</td>
					<td style="line-height: 24px;text-align:center;">{int_mar}   |  {eks_mar}</td>
					<td style="line-height: 24px;text-align:center;">{int_apr}   |  {eks_apr}</td>
					<td style="line-height: 24px;text-align:center;">{int_may}   |  {eks_may}</td>
					<td style="line-height: 24px;text-align:center;">{int_jun}   |  {eks_jun}</td>
					<td style="line-height: 24px;text-align:center;">{int_jul}   |  {eks_jul}</td>
					<td style="line-height: 24px;text-align:center;">{int_aug}   |  {eks_aug}</td>
					<td style="line-height: 24px;text-align:center;">{int_sep}   |  {eks_sep}</td>
					<td style="line-height: 24px;text-align:center;">{int_oct}   |  {eks_oct}</td>
					<td style="line-height: 24px;text-align:center;">{int_nov}   |  {eks_nov}</td>
					<td style="line-height: 24px;text-align:center;">{int_dec}   |  {eks_dec}</td>
					<td style="line-height: 24px;text-align:center;">{int_total} |  {eks_total}</td>
					<td style="vertical-align:middle; line-height: 24px; font-size:12px; padding:3px; text-align:center;">{total}</td>
				</tr>
			{/rekap}
			</tbody>
		</table>
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td colspan="16">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>