<!DOCTYPE html>
<html>
<head>
    <title>Surat Keterangan Penbgiriman Disposisi</title>
    <link rel="stylesheet" href="<?= base_url(); ?>asset/style.css" media="all">
</head>
<body>
    <div id="maintable">
        <div class="border-bottom-bold">
            <?= varIsset($header) ?>
        </div>
        <div class="border-bottom-dash" style="display:block; padding: 4px;">
            <div style="text-align: center; font-size: 20px; font-weight: bold; ">Surat Keterangan Penerima Disposisi</div>
            <div style="text-align: center; font-size: 12px; font-style: italic; ">
                Surat ini menerangkan bahwa pegawai dibawah ini telah menerima disposisi dengan rincian sebagai berikut:
            </div>
        </div>
        <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
            <span style="font-weight: bold; ">Penerima Disposisi</span>
            <table>
                <tr>
                    <td rowspan="4" style="width:25px">
                    <td style="font-size: 12px; width: 200px;">NIP</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($receiver['nip'], '[nip]') ?></td>
                </tr>
                <tr>
                    <td>Nama</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($receiver['nama'], '[nama]') ?></td>
                </tr>
                <tr>
                    <td>Jabatan</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($receiver['jabatan'],'[jabatan]') ?></td>
                </tr>
                <tr>
                    <td>unitkerja</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($receiver['unitkerja'],'[perihal]') ?></td>
                </tr>
            </table>
        </div>
        <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
            <span style="font-weight: bold; ">Rincian Surat</span>
            <table>
                <tr>
                    <td rowspan="4" style="width:25px">
                    <td style="width: 200px;">Nomor Agenda Surat</td>
                    <td>:</td>
                    <td><?= varIsset($mail['noagenda'], '[nomor agenda surat]') ?></td>
                </tr>
                <tr>
                    <td>Nomor Surat</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($mail['nosurat'], '[nomor surat]') ?></td>
                </tr>
                <tr>
                    <td>Pengirim</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($mail['pengirim'], '[pengirim]') ?></td>
                </tr>
                <tr>
                    <td>Perihal</td>
                    <td class="label-separator">:</td>
                    <td><?= varIsset($mail['perihal'], '[perihal]') ?></td>
                </tr>
            </table>
        </div>
        <div style="text-align: left; margin-top:10px; padding: 4px; font-size:14px;">
            <span style="font-weight: bold; ">Tanggal Disposisi: <?= varIsset($disposisi['tanggal'], '[tanggal disposisi]') ?></span>
            <table style="border:1px solid black; width:100%;">
                <tr>
                    <td style="text-align: left; border: 1px solid black; border-bottom: 1px dotted black;">Memo</td>
                    <td style="text-align: center; border: 1px solid black; border-bottom: 1px dotted black !important; width: 20%;">Didisposisikan</td>
                    <td style="text-align: center; border: 1px solid black; border-bottom: 1px dotted black; width: 20%;">Disetujui</td>
                </tr>
                <tr>
                    <td rowspan="3"><?= varIsset($disposisi['memo'],'[memo]') ?></td>
                    <td style="text-align: center; border: 1px solid black; border-top: 0px; vertical-align: bottom;">
                        <div style="min-height:40px">&nbsp;</div>
                        <span><?= varIsset($dispositor['nama'],'[nama]') ?></span><br>
                        <span style="text-align: center; font-size: 12px; font-weight: bold;">NIP:&nbsp;<?= varIsset($dispositor['nip'],'[nip]') ?></span>
                    </td>
                    <td style="text-align: center; border: 1px solid black; border-top: 0px; vertical-align: bottom;">
                        <div style="min-height:40px">&nbsp;</div>
                        <span><?= varIsset($approver['nama'],'[nama]') ?></span><br/>
                        <span style="text-align: center; font-size: 12px; font-weight: bold;">NIP:&nbsp;<?= varIsset($approver['nip'],'[nip]') ?></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>