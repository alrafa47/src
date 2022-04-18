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
    <div id="maintable">
        <div class="border-bottom-bold">
        </div>
        <div class="border-bottom-dash" style="display:block; padding: 4px;">
            <div style="text-align: center; font-size: 20px; font-weight: bold; ">{title}</div>
            <div style="text-align: center; font-size: 12px; font-style: italic; ">
                {subtitle}
            </div>
        </div>
<div class="paper" style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
            <span style="font-weight: bold; font-size:16px">Rincian Surat</span>
            <table>
                <tr>
                    <td rowspan="5" style="width:25px">
                    <td>No Surat</td>
                    <td class="label-separator">:</td>
                    <td>{surat_nomor}</td>
                </tr>
                <tr>
                    <td>Pembuat</td>
                    <td class="label-separator">:</td>
                    <td>{pembuat_nama}</td>
                </tr>
                <tr>
                    <td>Unit Kerja</td>
                    <td class="label-separator">:</td>
                    <td>{pembuat_unitkerja_nama}</td>
                </tr>
                <tr>
                    <td>Perihal</td>
                    <td class="label-separator">:</td>
                    <td>{surat_draft_perihal}</td>
                </tr>
                <tr>
                    <td>Tanggal Surat</td>
                    <td class="label-separator">:</td>
                    <td>{surat_tanggal}</td>
                </tr>
            </table>
        </div>
        <div style="text-align:left; font-weight:bold; font-size:15px;">berikut yang dibawah ini adalah penerima dari surat diatas : </div>
        <table style="width:100%; border-bottom:1px; border-style:solid; border-color: black; font-family:Arial; font-size:11px;">
            <thead style="font-size:12px;">
                <tr style="padding:4px;line-height:18px; border-top:1px; border-bottom:1px; border-style: solid; border-color: black; background-color:lightgray;">
                    <td style="padding:4px; font-weight:bold; text-align:right; width:40px;">No.</td>
                    <td style="padding:4px; font-weight:bold;">NIP</td>
                    <td style="padding:4px; font-weight:bold;">Nama</td>
                    <td style="padding:4px; font-weight:bold;">unitkerja</td>
                    <td style="padding:4px; font-weight:bold;">Jabatan</td>
                    <td style="padding:4px; font-weight:bold;">Status</td>
                    <td style="padding:4px; font-weight:bold;">Komentar</td>
                </tr>
            </thead>
            <tbody style="font-size:11px;">
                {records}
                <tr style="border-bottom: 1px solid lightgray;">
                    <td style="padding:3px; text-align:right; background-color: #F2F2F2; width:40px; border-right:1px solid lightgray;">{no}.</td>
                    <td style="padding:3px;">{penerima_nip}</td>
                    <td style="padding:3px;">{penerima_nama}</td>
                    <td style="padding:3px;">{penerima_unitkerja_nama}</td>
                    <td style="padding:3px;">{penerima_jabatan_nama}</td>
                    <td style="padding:3px;">{disposisi_penerima_status_generate}</td>
                    <td style="padding:3px;">{disposisi_penerima_komentar}</td>
                </tr>
                {/records}
            </tbody>
            <tfoot style="font-size:12px;">
                <tr style="padding:4px;line-height:18px; border-bottom:1px; border-style: solid; border-color: gray; background-color:lightgray;">
                    <td colspan="4" style="padding:4px; font-style: italic; font-size:11px;">
                        Laporan di proses pada tanggal {dateReport} oleh {operator}
                    </td>
                    <td colspan="4" style="padding:4px; text-align:right; font-weight:bold; font-size:12px;">
                        Total Data: {recordsCount} Baris
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>