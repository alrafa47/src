<!DOCTYPE html>
<html>
<head>
    <title>{title}</title>
</head>
<style type="text/css">
.table1 {
    font-family: sans-serif;
    font-size: 16px;
    min-width: 800px;
    border-color: #000;
    border-collapse: collapse;
}
 
.table1, th, tr{
    border: 1px solid #999;
    padding: 8px 20px;
}
.table2{
    min-width: 800px;
}
</style>

<body>
<div>
    <p class="title">{header}</p>
</div>
<div class="border-bottom-dash" style="display:block; padding: 4px;">
    <div style="text-align: center; font-size: 20px; font-weight: bold; ">Validasi Persetujuan</div>
</div>
<br>
<div align="center">
  <table class="table1">
    <tr>
      <td colspan="3" align="right"><b>{granted}</b></td>
    </tr>
    <tr>
      <td width="200px">Nomor Registrasi</td><td> :</td> <td>{surat_registrasi}</td>
    </tr>
    <tr>
      <td>Nomor Surat / Agenda</td><td> :</td> <td>{surat_nomor} / {surat_agenda}</td>
    </tr>
    <tr>
      <td>Tanggal Surat</td><td> :</td> <td>{surat_tanggal}</td>
    </tr>
    <tr>
      <td>Perihal</td><td> :</td> <td>{record}{surat_perihal}</td>
    </tr>
  </table>
</div>
<br>
<br>
<div align="center">
<table align="center">
    <tr>
        <td></td>
    </tr>
</table>
</div>

</body>
</html>