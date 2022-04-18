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
  {header}
  <table width="100%" style="border:0px solid black; font-family:Arial; ">
    <tr>
      <td><div style="text-align: center; font-size: 18px;">Logo Perpusnas</div></td>
    </tr>
    </table>
    <table width="100%" style="border: 0px solid black; font-family: Arial;">
    <tbody>
    <tr>
      <td><div align="left" style="font-size: 11px;">Dicetak oleh</div></td>
      <td>:</td>
      <td><div align="right" style="font-size: 12px">Tgl Cetak</div></td>
      <td width="20%">:</td></tr>
      <tr>
      <td><div align="left" style="font-family: Arial; font-size: 15px;">PERPUSTAKAAN NASIONAL RI<br>
      <div align="left" style="font-family: Arial; font-size: 13px;">Jalan Medan Merdeka Selatan No. 11<br>Jakarta Pusat</br></div></td>
    </tr>
    </tbody>
  </table> 
  <div style="text-align:center; font-size:18px; font-weight: color:#3B3535;">LEMBAR DISPOSISI</div>
  <!-- <div style="text-align: left; font-family:Arial; margin-top:10px; padding: 4px; font-size:14px;"> -->
  <table>
    <tr>
      <td><div align="left" style="font-size: 12px;">DARI</div></td>
      <td>:</td>
    </tr>
    <tr>
      <td><div align="left" style="font-size: 12px;">NO / TGL SURAT / TGL TERIMA</div></td>
      <td width="20%">:</td> 
    </tr>
    <tr>
      <td><div align="left" style="font-size: 12px;">PERIHAL</div></td>
      <td>:</td>
    </tr>
  </table>
  <table width="100%" height="10%" style="border: 1px solid black; font-family: Arial;">
   <th>KEPALA PERPUSTAKAAN NASIONAL RI</th></table><br>
  <table width="100%" height="10%" style="border: 1px solid black;">
    <tr>
  <th>KEPADA</th>
  <th>DISPOSISI</th>
</tr>
<tr align="center">
  <td></td>
  <td></td>
</tr>
 </table><br>
  <table width="100%" style="border:1px solid black; font-family:Arial; font-size:12px;">
    <tbody>
      <tr>
        <td><div align="left" height="25px">No. Surat </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_nomor}</td>
      </tr>
      <tr>
        <td width="25%" height="25px"><div align="left">Pengirim </div></td>
        <td width="1%"><div align="center">:</div></td>
        <td width="79%">{surat_pengirim}</td>
      </tr>
      <tr>
        <td><div align="left" height="25px">Perihal</div></td>
        <td><div align="center">:</div></td>
        <td>{surat_perihal}</td>
      </tr>
      <tr        <td><div align="left" height="25px">Untuk</div></td>
        <td><div align="center">:</div></td>>

        <td>{surat_tujuan}</td>
      </tr>
      <tr>
        <td><div align="left" height="25px">Tgl. Surat </div></td>
        <td><div align="center">:</div></td>
        <td>{surat_tanggal}</td>
      </tr>
    </tbody>
  </table>
  {records}
  <div style="font-family:Arial; font-size:12px; text-align: left; border-top: 1px solid; margin-top: 10px; padding-top: 4px;">
    <span style="font-weight: bold">{disposisi_pengirim_nama}</span>: <span style="font-style: italic;">({disposisi_tgl}) {perintah_nama}, {disposisi_pesan}</span>
      <ul>
      {disposisi_penerima}
        <li>{disposisi_masuk_penerima_nama}</li>
      {/disposisi_penerima}
      </ul>
  </div>
  {/records}
</div>