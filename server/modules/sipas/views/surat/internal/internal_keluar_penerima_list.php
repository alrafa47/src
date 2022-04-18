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
<style {params}="">
{content}
body{
    -webkit-print-color-adjust: exact;
}
</style>
{/style}
  <div class="paper" style=" margin:0px auto; font-family:Arial; font-size:11px;">
  {header_pelaporan}
  <br>
  <div style="text-align:center; font-size:18px; font-weight: color:#3B3535;"><strong>{title}</strong></div>
  <div style="text-align: center; font-size: 12px; font-style: italic; ">{subtitle}</div>
  <br>
  <table width="100%" style="border:1px solid black; font-family:Arial; font-size:12px;" cellpadding="4px">
    <tbody>
      <tr>
        <td width="20%"><div align="left">No. Registrasi</div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_registrasi}</td>
      </tr>
      <tr>
        <td width="20%"><div align="left">No. Surat </div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_nomor}</td>
      </tr>
      <tr>
        <td width="20%"><div align="left">Tgl. Surat </div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_tanggal}</td>
      </tr>
      <tr>
        <td width="20%"><div align="left">Perihal </div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_perihal}</td>
      </tr>
    </tbody>
  </table>
{unit}
  <div style="font-family:Arial; font-size:12px; text-align: left; border-top: 1px solid; margin-top: 10px; padding-top: 4px;">
    <span style="font-weight: bold">{surat_unit_nama}</span><br> <span style="font-weight: bold">{surat_setuju}</span>
{records}
    <ul>
<li>{staf_nama}</li>
      Jabatan : {jabatan_nama}
      <br>Unit : {unit_nama}
      <br>{surat_stack_status}
    </ul>
  {/records}
  </div>
{/unit}
<table style="width: 100%; line-height:20px; padding:0px 10px 0px 10px; font-style:italic; font-size:12px; color: #9e9e9e; text-align:right;">
      <tbody><tr style="color: #9e9e9e;">
        <td colspan="3">Laporan dicetak oleh <span style="font-weight: bold;">{operator}</span> pada <span style="font-weight: bold;">{dateReportFormated}</span></td>
      </tr>
    </tbody></table>
</div>
</body>
</html>