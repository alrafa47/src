<!DOCTYPE html>
<html>
<head>
    <title>{title}</title>
</head>
{style}
<style {params}>
{content}

.fontSize {
  font-family: sans-serif;
  font-size: 12px;
}

</style>
{/style}

<body class="fontSize">
<div>
    <p class="title">{header}</p>
</div>
<div class="border-bottom-dash" style="display:block; padding: 4px;">
    <div style="text-align: center; font-size: 20px; font-weight: bold; ">Lembar Verifikasi</div>
</div>
<br>
<div>Surat dengan informasi dibawah ini:</div>
<div>
  <table>
    <tr>
      <td width="120px">Nomor Registrasi</td><td width="5px"> :</td> <td>{surat_registrasi}</td>
    </tr>
    <tr>
      <td>Nomor Surat</td><td> :</td> <td>{surat_nomor}</td>
    </tr>
    <tr>
      <td>Tanggal Surat</td><td> :</td> <td>{surat_tanggal}</td>
    </tr>
    <tr>
      <td>Perihal</td><td> :</td> <td>{surat_perihal}</td>
    </tr>
    <tr>
      <td>Disetujui Oleh</td><td> :</td> <td>{nama_persetujuan}</td>
    </tr>
  </table>
</div>
<div>
    <p>
      Dinyatakan <b>VALID</b> dan {granted} oleh {nama_perusahaan} dan dengan ketentuan yang berlaku, {nama_perusahaan} mengatur bahwa surat ini telah ditanda tangani secara elektronik sehingga tidak diperlukan tanda tangan basah pada surat ini.
    </p>
</div>
<br>
<br>
<div>
<table border="0" style="min-width: 800px;" align="right">
  <tr>
    <td width="400px"></td>
    <td align="center">Jakarta, {tanggal_persetujuan}</td>
  </tr>
  <tr>
    <td></td>
    <td align="center"><img src="{qrcode}"></td>
  </tr>
  <tr>
    <td></td>
    <td align="center">{nama_persetujuan}</td>
  </tr>
</table>
</div>

</body>
</html>