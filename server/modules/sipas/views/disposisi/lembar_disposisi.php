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
	#maintable{
		border: 2px solid black; 
		border-top: double;
		width: 610px;
		margin: 0px auto;
	}
    </style>
    {/style}

    <div style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
        {header}
        <div id="maintable">
            <div class="border-bottom" style="display:block; padding: 3px;">
                <div style="text-align:center; font-size:18px; font-weight: color:#3B3535;"><em>{title}</em></div>
            </div>
            <div style="text-align: left; font-family:Arial; margin-top:10px; padding: 4px; font-size:14px;">
                {records}
                <table width="100%" cellpadding="3">
                  <tr>
                    <td width="25" style="width:25px">
                    <td colspan="3">{surat_masuk_pengirim}</td>
                    <td width="25" style="width:25px">
                    <td>Tanggal Masuk</td>
                    <td width="7">:</td>
                    <td>{surat_tanggal}</td>
                  </tr>
                  <tr>
                    <td width="25" style="width:25px">
                    <td>Indek</td>
                    <td width="7">:</td>
                    <td>{surat_?}</td>
                    <td width="25" style="width:25px">
                    <td>Kode</td>
                    <td width="7">:</td>
                    <td>{surat_?}</td>
                  </tr>
                </table>

                <hr>

                <table width="100%" cellpadding="3">
                  <tr>
                    <td width="25" style="width:25px">
                    <td width="150">Hal/isi Ringkas</td>
                    <td width="7">:</td>
                    <td>{surat_perihal}</td>
                  </tr>
                  <tr>
                    <td width="25" style="width:25px">
                    <td width="150">Tanggal/Nomor Surat</td>
                    <td width="7">:</td>
                    <td>{surat_nomor}</td>
                  </tr>
                  <tr>
                    <td width="25" style="width:25px">
                    <td width="150">Asal</td>
                    <td width="7">:</td>
                    <td>{surat_?}</td>
                  </tr>
                </table>

                <table width="100%" cellpadding="3">
                  <tr>
                    <td width="25" style="width:25px">
                    <td width="47%">Kepada :</td>
                    <td width="48%">Isi Disposisi :</td>
                  </tr>
                </table>

                <br>

                <table width="100%" style="border:1px solid black;" cellpadding="3">
                    <tr>
                        <td>Catatan :</td>
                    </tr>
                    <tr height="80">
                      <td></td>
                    </tr>
                </table>

                <table width="100%"cellpadding="3">
                    <tr>
                        <td>Tembusan :</td>
                    </tr>
                    <tr height="80">
                      <td></td>
                    </tr>
                </table>

                <table width="100%"cellpadding="3">
                    <tr>
                        <td>Catatan :</td>
                    </tr>
                    <tr height="80">
                      <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>