Ext.define('SIPAS.controller.Sipas.session.notification.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    requires: [
        'Ext.ux.controller.Hasview',
        'Ext.ux.controller.Template'
    ],

    views: [
        'Sipas.session.notification.Pane'
    ],

    refs: [
        { ref: 'mainview',                          selector: 'sipas_session_notification_pane'},
        { ref: 'compTugasSaya',                     selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#btnTugasSaya'},
        { ref: 'compKotakMasuk',                    selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#btnKotakMasuk'},
        { ref: 'compRiwayat',                       selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#btnTerkirim'},
        { ref: 'compAsistensi',                     selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#btnAsistensi'},
        { ref: 'compDraft',                         selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#btnDraft'},
        { ref: 'compLogout',                        selector: 'sipas_session_notification_pane sipas_com_menuitem_valueable#menuLogout'}
    ],

    messages: {
        'kotakmasuk_belumdibaca'        : [null,'Anda mendapat <span class="bold">{value} Surat Masuk</span> Baru'],
        'tugassaya_belumditindak'       : [null,'Anda mendapat <span class="bold">{value} Tugas</span> Baru'],
        'disposisi_status_baca_tindakan': ['info','<span class="text-bold">{value} Penerima Disposisi Masuk/Nota Dinas</span> Memperbarui Tindakan'],
        'draft_belumditindak'           : [null,'Anda mendapat <span class="bold">{value} Draf Baru Untuk Dikoreksi</span>'],
        'asistensi_all'                 : [null,'Anda mempunyai <span class="bold">{value} Surat</span> Baru Untuk Dimonitoring']
    },

    notifIgnoreAlert: [
        'penyetujuan_surat_masuk',
        'penyetujuan_surat_keluar',
        'penyetujuan_surat_internal',
        'penyetujuan_surat_edaran',
        'penyetujuan_surat_konsep'
    ],

    componentMapGetter: {
        tugassaya_belumditindak   : 'getCompTugasSaya',
        kotakmasuk_belumditindak  : 'getCompKotakMasuk',
        disposisi_status_baca_tindakan       : 'getCompRiwayat',
        draft_belumditindak       : 'getCompDraft',
        asistensi_all             : 'getCompAsistensi'
    },

    init: function(application) {
        application.on({
            'sipas/session/notification/notify': this.onApp_Notify,
            scope: this
        });

        this.control({
            "sipas_session_notification_pane": {
                afterrender: this.onMainView_AfterRender
            },
            "sipas_session_notification_pane [pageLauncher=true]": {
                click: this.onButtonNotif_Click
            },
            "sipas_session_notification_pane [popupLauncher=true]":{
                click: this.onButtonNotif_Click
            },
            "sipas_session_notification_pane #menuLogout":{
                click: this.onMenuLogout_Click
            }
        });
    },

    onMainView_AfterRender: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            tugasSaya = $this.getCompTugasSaya({root:mainview}),
            masuk = $this.getCompKotakMasuk({root:mainview}),
            terkirim = $this.getCompRiwayat({root:mainview}),
            draft = $this.getCompDraft({root:mainview}),
            asisten = $this.getCompAsistensi({root:mainview}),
            logout = $this.getCompLogout({root:mainview});

        tugasSaya && tugasSaya.setTooltip($language.getGrammar('tooltip_tugassaya', false));
        masuk && masuk.setTooltip($language.getGrammar('tooltip_masuk', false));
        terkirim && terkirim.setTooltip($language.getGrammar('tooltip_terkirim', false));
        draft && draft.setTooltip($language.getGrammar('tooltip_draft', false));
        asisten && asisten.setTooltip($language.getGrammar('tooltip_asisten', false));
        logout && logout.setTooltip($language.getGrammar('tooltip_logout', false));
    },

    onButtonNotif_Click: function(button){
        this.getApplication().fireEvent('sipas/page/boot', button.bootstrap, button.popupLauncher);
    },

    onMenuLogout_Click: function(menuitem, e, eOpts){
        this.getApplication().fireEvent('sipas/session/doterminate', false);
    },
    
    onApp_Notify: function(data){
        data = data || {};
        
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            newValue = parseInt(data.newValue || 0);

        var button = this[this.componentMapGetter[data.name]] && this[this.componentMapGetter[data.name]]();
        if(button)
        {
            button.setValue({badge:newValue});
            if(newValue && (newValue > 0) )
            {
                var tpl = $this.getMessage(data.name,{
                    value: newValue
                });

                if(!Ext.Array.contains($this.notifIgnoreAlert, data.name))
                {
                    tpl && $helper.showNotification(tpl[0] || '', tpl[1] || '');
                    $app.fireEvent('sipas/session/notification/notify/sound');
                }
                button.show();
            }
        }
    }

});
