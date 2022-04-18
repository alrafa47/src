Ext.define('SIPAS.controller.Sipas.surat.penyetuju.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.surat.penyetuju.List'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack' /*do not remove, for grid render*/
    ],
    
    stores:[
        'Sipas.surat.penyetuju.List'
    ],

    messages: {
        'receiver_exist': ['Info','Staf dengan nama {id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_surat_penyetuju_list' },
        { ref: 'form',     selector: 'sipas_surat_penyetuju_list > form' },
        { ref: 'cbUrut',   selector: 'sipas_surat_penyetuju_list > toolbar #penyetujuUrut' }
    ],

    controllerLookupPenerima        : 'Sipas.staf.penerima.Lookup',
    controllerPropRiwayat           : 'Sipas.surat.penyetuju.riwayat.Popup',
    // controllerPropRiwayat           : 'Sipas.koreksi.session.riwayat.List',

    storePenyetuju: 'Sipas.surat.penyetuju.List',

    init: function(application){
        this.control({
            'sipas_surat_penyetuju_list':{
                rundelete: this.onMainview_RunDelete,
                runmoveup: this.onMainview_RunMoveUp,
                runmovedown: this.onMainview_RunMoveDown
            },
            'sipas_surat_penyetuju_list sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
            'sipas_surat_penyetuju_list grid': {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_surat_penyetuju_list #toolbarRiwayat #btnRiwayatpersetujuan': {
                click: this.onButtonRiwayat_Click
            },
            'sipas_surat_penyetuju_list toolbar #penyetujuUrut': {
                change: this.onCheckboxUrut_Change
            }
        });
    },

    launch: function(config) {
        var $this =         this,
            $app =          $this.getApplication(),
            $session =      $app.getSession(),
            $helper =       $this.getApplication().Helper(),
            reference =     config.reference,
            storeStaf =     $this.getStore($this.storePenyetuju),
            sessionId =     $session.getProfileId(),
            view =          $this.createView(config);

        return view;
    },

    onGridpanel_Load: function(grid, record){
        var load = function(r){
            var s = r.fetchPenerima(); // assume record is Surat
            grid.reconfigure(s);

            s.reload({
                callback: function(){
                } 
            });
        }

        if(record && record.isModel){
            load(record);
        }else{
            this.getModel('Sipas.Surat').load(record, {
                callback: function(r){
                    load(r);
                }
            });
        }

    },

    onCheckboxUrut_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            cmp = $this.getMainview({from:checkbox});

        /*if urut, remove row number and up down column*/
        if(newValue){
            cmp.columns[0].show();
            cmp.columns[2].show();
            cmp.columns[3].show();
        }else{
            cmp.columns[0].hide();
            cmp.columns[2].hide();
            cmp.columns[3].hide();
        }
    },

    onButtonAdd_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            $helper = $this.getApplication().Helper(),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            controllerLookup = $this.getController($this.controllerLookupPenerima),
            form = view.up('form'),
            nomorSurat = form.down('#nomorSurat'),
            nomorLama = form.down('#nomorLama'),
            btnNomor = form.down('#btnNomorSurat'),
            btnSalin = form.down('#btnSalinNomor'),
            record = form && form.updateRecord().getRecord(),
            model = record.get('surat_model');
        
        if (nomorSurat && (record.get('surat_nomor') && record.get('surat_setuju') == 4) || (record.get('surat_setuju') == 0 && record.get('surat_nomor_urut')) && record.get('jenis_nomor_awal') == 1) {
            if(nomorLama && record.get('surat_nomor')){
                nomorLama.show();
                nomorLama.setValue(record.get('surat_nomor'));
            }
            nomorSurat.setValue(null);
            btnNomor.show();
            if(btnSalin){
                btnSalin && btnSalin.show();
            }
        }

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenyetuju.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storePenyetuju.add(selections[i].data);
                    }else{                 
                        var msg = $this.getMessage('receiver_exist',{id: selections[i].data.staf_nama});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }

                if(model == 6) view.setTitle('<b style="color:#04408c; font-size: 13px">Penyetuju ('+storePenyetuju.data.length+')</b>');
            }
        });
    },

    onButtonRiwayat_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        controllerProp.launch({
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        // view.close(); important do not remove
    },

    onGridpanel_SelectionChange: function(model, Selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_delete', 'sipas_com_button_action']
        });
    },

    onMainview_RunDelete: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            mainview = $this.getMainview({from:view}),
            store = view.getStore(),
            form = view.up('form'),
            nomorSurat = form.down('#nomorSurat'),
            nomorLama = form.down('#nomorLama'),
            btnNomor = form.down('#btnNomorSurat'),
            btnSalin = form.down('#btnSalinNomor'),
            records = form && form.updateRecord().getRecord(),
            model = records.get('surat_model');

        if (nomorSurat && (records.get('surat_nomor') && records.get('surat_setuju') == 4) || (records.get('surat_setuju') == 0 && records.get('surat_nomor_urut')) && records.get('jenis_nomor_awal') == 1) {
            if(nomorLama && records.get('surat_nomor')){
                nomorLama.show();
                nomorLama.setValue(records.get('surat_nomor'));
            }
            nomorSurat.setValue(null);
            btnNomor.show();
            if(btnSalin){
                btnSalin && btnSalin.show();
            }
        }

        store.removeAt(rowIdx);

        var records = Ext.Array.clone(store.data.items);
        Ext.Array.forEach(records, function(value, key) {
          value.index = key;
        });

        store.removeAll();
        Ext.Array.each(records, function(r){
            store.add(r);
        });

        if(model == 6) mainview.setTitle('<b style="color:#04408c; font-size: 13px">Penyetuju ('+store.data.length+')</b>');
    },

    onMainview_RunMoveUp: function(view, rowIdx, colIdx, item, e, record, row){
        var store = view.getStore();

        if(rowIdx == 0) return;

        var prevIndex = rowIdx - 1,
            prevRecord = store.getAt(prevIndex),
            form = view.up('form'),
            nomorSurat = form.down('#nomorSurat'),
            nomorLama = form.down('#nomorLama'),
            btnNomor = form.down('#btnNomorSurat'),
            btnSalin = form.down('#btnSalinNomor'),
            records = form && form.updateRecord().getRecord();
            
        if (nomorSurat && (records.get('surat_nomor') && records.get('surat_setuju') == 4) || (records.get('surat_setuju') == 0 && records.get('surat_nomor_urut')) && records.get('jenis_nomor_awal') == 1) {
            if(nomorLama && records.get('surat_nomor')){
                nomorLama.show();
                nomorLama.setValue(records.get('surat_nomor'));
            }
            nomorSurat.setValue(null);
            btnNomor.show();
            if(btnSalin){
                btnSalin && btnSalin.show();
            }
        }

        store.removeAt(rowIdx);
        store.removeAt(prevIndex);

        record.index = prevIndex;
        store.insert(prevIndex, record);

        prevRecord.index = rowIdx;
        store.insert(rowIdx, prevRecord);
    },

    onMainview_RunMoveDown: function(view, rowIdx, colIdx, item, e, record, row){
        var store = view.getStore();
        
        if(rowIdx == (store.getCount() - 1)) return;

        var nextIndex = rowIdx + 1,
            nextRecord = store.getAt(nextIndex),
            form = view.up('form'),
            nomorSurat = form.down('#nomorSurat'),
            nomorLama = form.down('#nomorLama'),
            btnNomor = form.down('#btnNomorSurat'),
            btnSalin = form.down('#btnSalinNomor'),
            records = form && form.updateRecord().getRecord();
        
        if (nomorSurat && (records.get('surat_nomor') && records.get('surat_setuju') == 4) || (records.get('surat_setuju') == 0 && records.get('surat_nomor_urut')) && records.get('jenis_nomor_awal') == 1) {
            if(nomorLama && records.get('surat_nomor')){
                nomorLama.show();
                nomorLama.setValue(records.get('surat_nomor'));
            }
            nomorSurat.setValue(null);
            btnNomor.show();
            if(btnSalin){
                btnSalin && btnSalin.show();
            }
        }

        store.removeAt(nextIndex);
        store.removeAt(rowIdx);

        nextRecord.index = rowIdx;
        store.insert(rowIdx, nextRecord);
        
        record.index = nextIndex;
        store.insert(nextIndex, record);
    }
});