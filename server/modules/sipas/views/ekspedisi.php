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
  <div class="paper" style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
  {header}
  <br/>
  <div style="text-align:center; font-size:18px; font-weight: color:#3B3535;"><strong>{title}</strong></div>
  <div style="text-align: center; font-size: 12px; font-style: italic; ">{subtitle}</div>
  <br/>
  <table width="100%" style="border:1px solid black; font-family:Arial; font-size:12px;" cellpadding="4px">
    <tbody>
      <tr>
        <td><div align="left">No. Surat </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_nomor}</td>
      </tr>
      <tr>
        <td><div align="left">Tgl. Surat </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_tanggal}</td>
      </tr>
      <tr>
        <td width="25%"><div align="left">Dari </div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_pengirim}</td>
      </tr>
      <tr>
        <td><div align="left">Kepada </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_tujuan}</td>
      </tr>
      <tr>
        <td><div align="left">Perihal </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_perihal}</td>
      </tr>
    </tbody>
  </table>
  {records}
  <div style="font-family:Arial; font-size:12px; text-align: left; border-top: 1px solid; margin-top: 10px; padding-top: 4px;">
    <span style="font-weight: bold">{disposisi_pengirim_nama}</span>: <span style="font-style: italic;">({disposisi_tgl}) {disposisi_perintah_nama}, {disposisi_pesan}</span>
      <ul>
      {disposisi_masuk}
        <li>{disposisi_masuk_penerima_nama}</li>
      {/disposisi_masuk}
      </ul>
  </div>
  {/records}
</div>
</body>
</html>