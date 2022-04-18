<table style="width:100%; font-family:Arial; font-size:11px; border-collapse: collapse; border: 1px solid #757575; border-collapse: collapse;">
    <thead style="font-size:12px;">
        <tr style="background-color:#757575; font-size:12px;">
            <td style="color:#FFFFFF; vertical-align: top; width:3%;  padding:2px; font-size: 13px; line-height:28px; text-align:right;">#</td>
            <td style="color:#FFFFFF; vertical-align: top; width:27%;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">(No.Agenda) No.Surat</td>
            <td style="color:#FFFFFF; vertical-align: top; width:20%;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Pengirim</td>
            <td style="color:#FFFFFF; vertical-align: top; width:30%;  padding:2px; font-size: 13px; line-height:28px; text-align:left;">Perihal</td>
        </tr>
    </thead>
    <tbody style="font-size:11px;">
        {records}
        <tr style="{bg_color}">
            <td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: right; color: #9E9E9E;">{no}.</td>
            <td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">({surat_agenda}) {surat_nomor}</td>
            <td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{unitpengirim_nama}{korespondensi_pengirim}</td>
            <!-- <td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_pengirim}</td> -->
            <td style="padding:2px; font-size:11px; line-height: 24px; vertical-align: top; text-align: left;">{surat_perihal}</td>
        </tr>
        {/records}
    </tbody>
    </table>
    <table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; color: #9e9e9e; text-align:right;">
    <tr style="color: #9e9e9e;">
        <td>Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
    </tr>
</table>