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

	<div class="paper" style="width:100%; margin:0px auto; padding: 10px; font-family:Arial; font-size:11px;">
		{header}
		<!-- <div style=" display:block; padding: 10px 0px;">
			<div style="display:block; font-size:18px; color:#212121;">{title}</div>
			<div style="display:block; font-size:12px; color:#212121;">{subtitle}</div>
		</div> -->
		<table style="display:block; padding: 10px 0px;">
			<tr>
				<td style="display:block; font-size:18px; color:#212121;">{title}</td>
			</tr>
			<tr>
				<td style="display:block; font-size:12px; color:#212121;">{subtitle}</td>
			</tr>
		</table>
		{korespondensi}
		</br>
		<table style="width: 100%; font-family: Arial; font-size: 14px;">
            <tbody>
                <tr style="height: 0px;">
                    <td style="width: 160px;"></td>
                    <td style="width: 4px;"></td>
                    <td></td>
                </tr>
                <tr>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Instansi</td>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">:</td>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">{korespondensi_pengirim}</td>
                </tr>
                <tr>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">Perihal</td>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">:</td>
                    <td style="text-align:left; font-weight:bold; color:#607D8B; font-size:13px;">{korespondensi_perihal}</td>
                </tr>
            </tbody>
        </table>
        <br>
		<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
			<thead style="font-size:12px;">
				<tr style="background-color:#757575; font-size:12px;">
					<td style="color:#FFFFFF; vertical-align: top; width:24px;  padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
					<td style="color:#FFFFFF; vertical-align: top; width:10%;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tgl.Registrasi</td>
					<td style="color:#FFFFFF; vertical-align: top; width:150px;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">(No.Agenda) No.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:center;">Tgl.Surat</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Dari</td>
					<td style="color:#FFFFFF; vertical-align: top; width:100px;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Kepada</td>
					<td style="color:#FFFFFF; vertical-align: top; width:30%;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Perihal</td>
				</tr>
			</thead>
			<tbody style="font-size:11px;">
				{records}
				<tr style="{bg_color}">
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_registrasi}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">({surat_agenda_converted}) {surat_nomor}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: center;">{surat_tanggal}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_pengirim}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_tujuan}</td>
					<td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_perihal}</td>
				</tr>
				{/records}
			</tbody>
		</table>
		{/korespondensi}
		<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
			<tr style="color: #9e9e9e;">
				<td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
			</tr>
		</table>
	</div>
</body>
</html>