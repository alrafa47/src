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
                <div style="text-align:center; font-size:18px; font-weight: color:#3B3535;">{title}</div>
                <div style="text-align:center; font-size:12px; font-style: italic; ">{subtitle}</div>
            </div>
            <div style="text-align: left; font-family:Arial; margin-top:10px; padding: 4px; font-size:14px;">
                <span style="font-weight: bold; ">Penerima Disposisi</span>
                {records}
                <table>
                    <tr>
                        <td rowspan="4" style="width:25px">
                        <td style="width: 200px;">NIP</td>
                        <td class="label-separator">:</td>
                        <td>{penerima_nip}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td class="label-separator">:</td>
                        <td>{penerima_nama}</td>
                    </tr>
                    <tr>
                        <td>Jabatan</td>
                        <td class="label-separator">:</td>
                        <td>{penerima_jabatan_nama}</td>
                    </tr>
                    <tr>
                        <td>unitkerja</td>
                        <td class="label-separator">:</td>
                        <td>{penerima_unitkerja_nama}</td>
                    </tr>
                </table>
                {/records}
            </div>
            <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
                <span style="font-weight: bold; ">Rincian Surat</span>
                {records}
                <table>
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
                </table>
                {/records}
            </div>
            <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
                <span style="font-weight: bold; ">Tanggal Disposisi: {records}{disposisi_tanggal}{/records}</span>
                <table style="border:1px solid black; width:100%;">
                    <tr>
                        <td style="text-align: left; border: 1px solid black; border-bottom: 1px dotted black;">Memo</td>
                        <td style="text-align: center; border: 1px solid black; border-bottom: 1px dotted black !important; width: 20%;">Didisposisikan</td>
                        <td style="text-align: center; border: 1px solid black; border-bottom: 1px dotted black; width: 20%;">Disetujui</td>
                    </tr>
                    <tr>
                        <td rowspan="3">{records}{disposisi_pesan}{/records}</td>
                        <td style="text-align: center; border: 1px solid black; border-top: 0px; vertical-align: bottom;">
                            <div style="min-height:40px">&nbsp;</div>
                            <span>{pengirim}</span><br>
                            <span style="text-align: center; font-size: 12px; font-weight: bold;">NIP:&nbsp;{pengirim_nip}</span>
                        </td>
                        <td style="text-align: center; border: 1px solid black; border-top: 0px; vertical-align: bottom;">
                            <div style="min-height:40px">&nbsp;</div>
                            <span>{operator}</span><br/>
                            <span style="text-align: center; font-size: 12px; font-weight: bold;">NIP:&nbsp;{operator_nip}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>