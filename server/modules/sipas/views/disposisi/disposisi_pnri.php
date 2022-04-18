<style type="text/css">
<!--
.style {font-size: 12px}
.style2 {font-size: 14px}
-->
</style>
{style}
<style {params}>
{content}
</style>
{/style}

<style type="text/css">
    body{
        -webkit-print-color-adjust: exact;
    }
</style>

<div class="paper" style="width:100%; margin:0px auto; font-family:Arial; font-size:11px;">
  <!-- {header} -->
  <table width="100%" style="border:0px solid black; font-family:Arial; ">
    <tr>
      <td><div style="text-align: center; font-size: 18px;"><span style="text-align:center; font-size:18px; font-weight: color:#3B3535;"><img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Logo_Perpusnas.png" width="320" height="75" longdesc="https://commons.wikimedia.org/wiki/File:Logo_Perpusnas.png"></span></div></td>
    </tr>
  </table>
  <br>
  <br>
  <table width="100%" style="border: 0px solid black; font-family: Arial;">
    <tbody>
      <tr>
        <td width="30%"><div align="left" class="style" style="font-size: 11px;">Dicetak oleh</div></td>
        <td width="20%">: <span class="style">{operator}</span></td>
        <td width="30%"><div align="right" class="style" style="font-size: 12px">Tgl Cetak</div></td>
        <td width="20%" class="style2">: <span class="style">{dateReportFormated}</span></td>
      </tr>
      </tr>
    </tbody>
  </table>
  <table width="100%" style="border: 0px solid black; font-family: Arial;">
    <tbody>
      <tr>
        <td><div align="left" style="font-family: Arial; font-size: 15px;">
          <span class="style2">PERPUSTAKAAN NASIONAL RI</span><br>
        <div align="left" class="style2" style="font-family: Arial; font-size: 13px;">Jalan Medan Merdeka Selatan No. 11<br>
        Jakarta Pusat</br></div></td>
      </tr>
    </tbody>
  </table>
  <br>
  <br>
  <table width="100%" style="font-family: Arial;">
   <th>LEMBAR DISPOSISI</th>
  </table>
  <br><br>
  <!-- <div style="text-align: left; font-family:Arial; margin-top:10px; padding: 4px; font-size:14px;"> -->
  <table width="100%">
    <tr>
      <td width="30%"><div align="left" class="style2" style="font-size: 12px;">DARI</div></td>
      <td>: <span class="style2">{surat_pengirim}</span></td>
    </tr>
    <tr>
      <td><div align="left" class="style2" style="font-size: 12px;">NO / TGL SURAT / TGL TERIMA</div></td>
      <td width="70%">: <span class="style2">{surat_nomor} / {surat_tanggal} / {disposisi_tgl}</span></td>
    </tr>
    <tr>
      <td><div align="left" class="style2" style="font-size: 12px;">PERIHAL</div></td>
      <td>: <span class="style2">{surat_perihal}</span></td>
    </tr>
  </table>
  <br>
  <br>
  <table width="100%" style="border: 1px solid black; font-family: Arial; border-collapse: collapse;">
   <tr>
    <td width="98%" style="border: 1px solid black; text-align:center;"><strong>KEPALA PERPUSATAKAAN NASIONAL RI</strong></td>
    <td width="2%" style="border: 1px solid white; text-align:center;"></td>
   </tr>
  </table>
 <br>
  <table width="100%" style="border: 1px solid black; border-collapse: collapse;">
    <tr>
      <td width="49%" style="border: 1px solid black; text-align:center;"><strong>KEPADA</strong></td>
      <td width="49%" style="border: 1px solid black; text-align:center;"><strong>DISPOSISI</strong></td>
      <td width="2%"  style="border: 1px solid white; text-align:center;"><strong></strong></td>
    </tr>
    <tr>
      <td class="style2" style="border-right: 1px solid black">
        
        {disposisi_penerima}
          {disposisi_masuk_penerima_nama}
        {/disposisi_penerima}</td>
      <td class="style2" style="border-right: 1px solid black">
        {perintah_nama}, {disposisi_pesan}</td>
      <td class="style2" style="border: 1px solid white"></td>
    </tr>
    <tr>
      <td style="border-right: 1px solid black">&nbsp;</td>
      <td style="border-right: 1px solid black">&nbsp;</td>
      <td style="border: 1px solid white">&nbsp;</td>
    </tr>
    <tr>
      <td style="border-right: 1px solid black">&nbsp;</td>
      <td style="border-right: 1px solid black">&nbsp;</td>
      <td style="border: 1px solid white">&nbsp;</td>
    </tr>
  </table>
</div>