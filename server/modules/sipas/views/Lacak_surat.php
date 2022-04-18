<!DOCTYPE html>
<html>
<head>
    <title>{title}</title>
</head>
<body>
{style}
<style {params}>
{content}
body{
    -webkit-print-color-adjust: exact;
}
</style>
{/style}
    {header}
    <div id="maintable" style="height:400px; background-color:#FFFFFF;" >
        <div class="border-bottom-dash" style="display:block; padding: 4px;">
            <div style="text-align: center; font-size: 20px; font-weight: bold; ">{title}</div>
            <div style="text-align: center; font-size: 12px; font-style: italic; ">
                {subtitle}
            </div>
        </div>
        <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
            <span style="font-weight: bold; font-size:16px">Rincian Surat</span>
            <table>
                <tr>
                    <td style="width:150px;">Nomor Registrasi Surat</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_registrasi}</td>
                </tr>
                <tr>
                    <td>Tanggal Pencatatan</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_pembuatan_tanggal}</td>
                </tr>
                <tr>
                    <td>No Agenda</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_agenda}</td>
                </tr>
                <tr>
                    <td>Nomor Surat</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_nomor}</td>
                </tr>
                <tr>
                    <td>Pengirim</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_pengirim}</td>
                </tr>
                <tr>
                    <td>Tanggal Surat</td>
                    <td class="label-separator">:</td>
                    <td>&nbsp;{surat_tanggal}</td>
                </tr>
            </table>
        </div><br />
        <div style="text-align:left; font-weight:bold; font-size:15px;">berikut yang dibawah ini adalah penerima dari surat diatas : </div>
        <table style="width:100%; border:1px solid black; font-family:Arial; font-size:11px;">
            <thead style="font-size:12px;">
                <tr style="padding:4px; line-height:18px; border-bottom: 1px solid black; background: lightgray;">
                    <td style="padding:4px; font-weight:bold; text-align:right; width:40px;">No.</td>
                    <td style="padding:4px; font-weight:bold;">Tanggal</td>
                    <td style="padding:4px; font-weight:bold;">Pegawai</td>
                    <td style="padding:4px; font-weight:bold;">Tindakan</td>
                    <td style="padding:4px; font-weight:bold;">Status</td>
                </tr>
            </thead>
            <tbody style="font-size:11px;">
                {records}
                <tr style="border-left: 1px solid black; border-right:1px solid black; border-bottom:1px solid lightgray;">
                    <td style="padding:3px; text-align:right; background-color: #F2F2F2; width:40px; border-right:1px solid lightgray;">{no}.</td>
                    <td style="padding:3px;">{disposisi_tanggal}</td>
                    <td style="padding:3px;">{penerima_nama}</td>
                    <td style="padding:3px;">{disposisi_aksi_text}</td>
                    <td style="padding:3px;">{disposisi_penerima_status_generate}</td>
                </tr>
                {/records}
            </tbody>
            <tfoot style="font-size:12px;">
                <tr style="padding:4px;line-height:18px; border-left:1px; border-right: 1px; border-bottom:1px; border-style: solid; border-color:black; background-color:lightgray;">
                    <td colspan="3" style="padding:4px; font-style: italic; font-size:11px;">
                        Laporan di proses pada tanggal {dateReport}
                    </td>
                    <td colspan="2" style="padding:4px; text-align:right; font-weight:bold; font-size:12px;">
                        Total Data: {recordsCount} Baris
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>