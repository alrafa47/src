/*
 * File: app/model/Sipas/beranda/Notification.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SIPAS.model.Sipas.beranda.Notification', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field',
        'Ext.data.association.HasOne'
    ],
    uses: [
        'SIPAS.model.Sipas.disposisi.Masuk',
        'SIPAS.model.Sipas.koreksi.Masuk',
        'SIPAS.model.Sipas.Koreksi'
    ],

    idProperty: 'notification_id',

    proxy: {
        type: 'ajax',
        api: {
            read: 'server.php/sipas/account/newmail'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    fields: [
        {
            name: 'notification_id'
        },
        {
            convert: function(v, rec) {
                var id = rec.get('notification_id'),
                    result = [];
                if(id){
                    result = id.split('/');
                }
                return result[1];
            },
            name: 'notification_id_penerima'
        },
        {
            name: 'notification_disposisi'
        },
        {
            name: 'notification_masuk'
        },
        {
            name: 'notification_koreksi'
        },
        {
            name: 'notification_kelompok'
        },
        {
            name: 'notification_kelompok_kode'
        },
        {
            dateFormat: 'd-m-Y',
            name: 'notification_tanggal',
            type: 'date'
        },
        {
            name: 'notification_pengirim'
        },
        {
            name: 'notification_perihal'
        },
        {
            name: 'notification_isi'
        },
        {
            name: 'notification_jenis'
        },
        {
            name: 'notification_prioritas'
        },
        {
            name: 'notification_penyetuju'
        },
        {
            name: 'notification_record'
        },
        {
            name: 'notification_internal'
        },
        {
            name: 'notification_konsep'
        }
    ],

    hasOne: [
        {
            model: 'SIPAS.model.Sipas.disposisi.Masuk',
            primaryKey: 'disposisi_masuk_id',
            foreignKey: 'notification_id_penerima',
            getterName: 'getDisposisi',
            setterName: 'setDisposisi'
        },
        {
            model: 'SIPAS.model.Sipas.koreksi.Masuk',
            primaryKey: 'disposisi_masuk_id',
            foreignKey: 'notification_id_penerima',
            getterName: 'getKoreksiMasuk',
            setterName: 'setKoreksiMasuk'
        },
        {
            model: 'SIPAS.model.Sipas.Koreksi',
            primaryKey: 'koreksi_id',
            foreignKey: 'notification_koreksi',
            getterName: 'getKoreksi',
            setterName: 'setKoreksi'
        }
    ],

    isMasuk: function() {
        return !Ext.isEmpty(this.get('notification_masuk'));
    },

    isInternal: function() {
        return !Ext.isEmpty(this.get('notification_internal'));
    },

    isDisposisi: function() {
        return !Ext.isEmpty(this.get('notification_disposisi'));
    },

    isKoreksi: function() {
        return !Ext.isEmpty(this.get('notification_koreksi'));
    },

    getDateFormat: function() {
        var tgl = this.get('notification_tanggal'),
            date = tgl.getDate(),
            day_name = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'],
            today = new Date(),
            year_of_tgl = tgl.getFullYear(),
            year_of_today = tgl.getFullYear(),
            second_of_today = today.getSeconds(),
            second_of_tgl = tgl.getSeconds(),
            minutes_of_today = today.getMinutes(),
            minutes_of_tgl = tgl.getMinutes(),
            hours_of_today = today.getHours(),
            hours_of_tgl = tgl.getHours(),
            minutes = this.diffMinutes(today, tgl),
            hours = this.diffHours(today, tgl),
            is_yesterday = today.getDate() - 1,
            is_two_da = today.getDate() - 2,
            is_three_da = today.getDate() - 3,
            is_four_da = today.getDate() - 4,
            is_five_da = today.getDate() - 5,
            is_six_da = today.getDate() - 6,
            is_seven_da = today.getDate() - 7;

        if(!tgl) return;

        // still on this year
        if (year_of_today === year_of_tgl){

            // on this minute (second)
            // if (today.toDateString() == tgl.toDateString() && hours_of_today === hours_of_tgl && minutes_of_today === minutes_of_tgl){
            //     return second_of_today+' detik yang lalu';

            // on this hour (minutes)
            if (today.toDateString() == tgl.toDateString() && hours_of_today === hours_of_tgl && minutes < 60){
                return minutes+' menit yang lalu';

            // on last 5 hours ago
            // } else if (today.toDateString() == tgl.toDateString() && hours <= 5){
            //     return hours+' jam yang lalu';

            // today
            } else if (today.toDateString() == tgl.toDateString()){
                return Ext.util.Format.date(tgl,'H:i');
            // yesterday
            } else if (tgl.getDate() === is_yesterday){
                return 'Kemarin, pukul '+Ext.util.Format.date(tgl,'H:i');
            // yesterday (lusa)
            } else if (tgl.getDate() === is_two_da){
                return 'Kemarin lusa, pukul '+Ext.util.Format.date(tgl,'H:i');

            // on this week
            // } else if (date === is_two_da || date === is_three_da || date === is_four_da || date === is_five_da || date === is_six_da || date === is_seven_da){
            //     var day = tgl.getDay() - 1;
            //     return day_name[day]+', pukul '+Ext.util.Format.date(tgl,'H:i');

            // more than a week or another, but still in this year
            } else {
                return Ext.util.Format.date(tgl,'d M');
            }

        // not on this year
        } else {
            return Ext.util.Format.date(tgl,'d M Y');
        }
    },

    diffMinutes: function(now, past) {
        var diff =(past.getTime() - now.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    },

    diffHours: function(now, past) {
        var hours = Math.abs(past - now) / 36e5;
        return Math.round(hours);
    }

});