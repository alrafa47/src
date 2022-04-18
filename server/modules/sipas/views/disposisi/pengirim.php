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
        <div id="maintable">
            <div class="border-bottom-dash" style="display:block; padding: 10px;">
                <div style="text-align:center; font-size:18px; font-weight: bold; color:#3B3535;">{title}</div>
                <div style="text-align:center; font-size:12px; font-style: italic; ">{subtitle}</div>
            </div>
            <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
                <span style="font-weight: bold; ">Rincian Surat</span>
                <table>
                {surat}
                    <tr>
                        <td rowspan="4" style="width:25px">
                        <td style="width: 200px;">Nomor Agenda Surat</td>
                        <td>:</td>
                        <td>{surat_agenda}</td>
                    </tr>
                    <tr>
                        <td>Nomor Surat</td>
                        <td class="label-separator">:</td>
                        <td>{surat_nomor}</td>
                    </tr>
                    <tr>
                        <td>Pengirim</td>
                        <td class="label-separator">:</td>
                        <td>{surat_pengirim}</td>
                    </tr>
                    <tr>
                        <td>Perihal</td>
                        <td class="label-separator">:</td>
                        <td>{surat_perihal}</td>
                    </tr>
                {/surat}
                </table>
            </div>
            <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
                <span style="font-weight: bold; ">Rincian Disposisi</span>
                <table>
                    <tr>
                        <td rowspan="4" style="width:25px">
                        <td style="width: 200px;">Tanggal Disposisi</td>
                        <td>:</td>
                        <td>{disposisi}{disposisi_tanggal}{/disposisi}</td>
                    </tr>
                    <tr>
                        <td>Memo</td>
                        <td class="label-separator">:</td>
                        <td>{disposisi}{disposisi_pesan}{/disposisi}</td>
                    </tr>
                </table>
            </div>
        <div class="text-left" style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
            <strong>Didisposisikan kepada:</strong>
            <table class="fill-width" cellpadding="4">
                <thead style="font-size:12px;">
                    <tr style="padding:4px;line-height:18px; border-top:1px; border-bottom:1px; border-style: solid; border-color: black; background-color:lightgray;">
                        <td style="padding:4px; font-weight:bold; text-align:right; width:40px;">#</td>
                        <td style="padding:4px; font-weight:bold;">NIP</td>
                        <td style="padding:4px; font-weight:bold;">Nama</td>
                        <td style="padding:4px; font-weight:bold;">Jabatan</td>
                        <td style="padding:4px; font-weight:bold;">unitkerja</td>
                    </tr>
                </thead>
                <tbody style="font-size:11px;">
                    {penerima}
                    <tr style="border-bottom: 1px solid lightgray;">
                        <td style="color: #9E9E9E; padding:3px; text-align:right; width:40px; border-right:1px solid lightgray;">{no}</td>
                        <td style="padding:3px;">{penerima_nip}</td>
                        <td style="padding:3px;">{penerima_nama}</td>
                        <td style="padding:3px;">{penerima_jabatan_nama}</td>
                        <td style="padding:3px;">{penerima_unitkerja_nama}</td>
                    </tr>
                    {/penerima}
                </tbody>
            </table>
        </div>
        <div style="text-align: center; margin-top:10px; padding: 4px; font-size:14px;">
            <table style="border:1px solid black; width:100%;">
                <tr>
                    <td style="text-align: center; border: 1px solid black; border-bottom: 1px dashed black !important; width: 20%;">Didisposisikan Oleh</td>
                </tr>
                <tr>
                    <td style="text-align: center; border: 1px solid black; border-top: 0px; vertical-align:bottom;">
                        <div style="min-height:40px">&nbsp;</div>
                        <div>{pengirim}</div>
                        <div style="text-align: center; font-size: 12px; font-weight: bold;">NIP:&nbsp;{pengirim_nip}</div>
                    </td>
                </tr>
            </table>
        </div>
        </div>
    </div>
</body>
</html>