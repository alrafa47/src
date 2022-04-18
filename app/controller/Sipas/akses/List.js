Ext.define('SIPAS.controller.Sipas.akses.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Akses'
    ],
    stores: [
        'Sipas.akses.List'
    ],
    views: [
        'Sipas.akses.List'
    ],
    refs: [
        {ref: 'mainview',       selector: 'treepanel#listSipasAkses'},
        {ref: 'list',           selector: 'treepanel#listSipasAkses'}
    ],

    messages:{
        'sync_success': 'Akses menu berhasil disimpan',
        'sync_failed': 'Akses menu gagal disimpan'
    },

    delegateView: 'Sipas.akses.List',
    delegateViewSelector: '#listSipasAkses',

    init: function(application) {
        this.control({
            "treepanel#listSipasAkses sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "treepanel#listSipasAkses sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "treepanel#listSipasAkses sipas_com_button_check": {
                click: this.onButtonCheck_Click
            },
            "treepanel#listSipasAkses sipas_com_button_uncheck": {
                click: this.onButtonUncheck_Click
            },
            "#listSipasAkses":{
                selectionchange: this.onGridpanel_SelectionChange
            }
        });
    },

    launch: function(renderTo, fn, scope) {
        var view = this.getView('Sipas.akses.List').create({
            border: Boolean(renderTo),
            renderTo: renderTo
        });
        view.getStore().reload();
        Ext.callback(fn || Ext.emptyFn, scope || this, [view]);
        return view;
    },

    refresh: function(view){
        view = view || this.getList();
        if(view){
            view.getStore().load({
                url: Ext.Template.create(view.getStore().getProxy().url).apply({})
            });
        }
    },

    load: function(peranRecord, fn, scope, treepanel)
    {
        var $this = this,
            $app = this.getApplication(),
            $feature = $app.Feature(),
            view = treepanel || this.getList(),
            store = view && view.getStore(),
            peran_akses = peranRecord.get('peran_akses'),
            aksesList = {},
            aksesColl = new Ext.util.MixedCollection();
        
        view.record = peranRecord;
        if(peran_akses){

            try {
                JSON.parse(Ext.util.Format.htmlDecode(peran_akses));
                aksesList = Ext.decode(Ext.util.Format.htmlDecode(peran_akses));
            } catch (e) {
                aksesList = {};
            }
        }

        aksesColl.addAll(aksesList);

        store.load({
            callback: function(){
                Ext.callback(fn, scope, []);
                $this.eachNode(store, function(node)
                {
                    if(!node) return; // some hack of doing remove node

                    // apply `isallowed` value
                    var featureName = node.get('fitur_id'), //crc32(node.get('fitur_id')),
                        isboleh = aksesColl.get(featureName);

                    node.set('akses_isboleh', isboleh);
                    node.commit();

                    // apply `featureable` mode
                    if(node.get('featureable') || true)
                    {
                        var fitur_featureable = node.get('fitur_featureable'),
                            fitur_featureName = node.get('fitur_featureName'),
                            featureExist = $feature.getFeatureAccess(fitur_featureName),
                            parentNode = node.parentNode;

                        if(fitur_featureable && !featureExist && parentNode)
                        {
                            parentNode.removeChild(node);
                            if(!parentNode.hasChildNodes())
                            {
                                parentNode.set('leaf', true);
                            }
                        }
                    }
                });
            }
        });
    },

    eachNode: function(store, fn, scope, root){
        var $this = this,
            store = store || this.getStore('Sipas.akses.List'),
            root = root || store.getRootNode();
        
        if(!root) return;
        root.eachChild(function(item){
            Ext.callback(fn || Ext.emptyFn, scope || $this, [item]);
            if(!root.isLeaf()){
                $this.eachNode(store, fn, scope, item);    
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.getDelegateView(button).getStore().reload();
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = this.getApplication().Helper(),
            view = this.getDelegateView(button),
            store = view.getStore();

        if(!store.getModifiedRecords().length) return;
        
        var akses = {};

        $this.eachNode(store, function(node)
        {
            var featureName = node.get('fitur_id'); // crc32(node.get('fitur_id'));
            akses[featureName] = node.get('akses_isboleh');
        });
        
        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: "Simpan Perubahan",
            confirmText: "Apakah anda yakin ?",
            callback: function(button){
                if (button == 'yes'){
                    view.record.set('peran_akses', Ext.encode(akses));
        
                    $helper.saveRecord({
                        record: view.record,
                        wait: true,
                        message: true,
                        callback: function(success, record, eOpts){
                            view.setLoading(false);
                            $this.load(view.record);
                            // Ext.callback(view.callback, view, [success, record, eOpts]);
                        }
                    });
                } else {
                    view.setLoading(false);
                    // $this.load(view.record);
                }
            }
        });
    },

    onButtonCheck_Click: function(button, e, eOpts){
        this.eachNode(this.getDelegateView(button).getStore(), function(node){
            node.set('akses_isboleh', 1);
        });
    },

    onButtonUncheck_Click: function(button, e, eOpts){
        this.eachNode(this.getDelegateView(button).getStore(), function(node){
            node.set('akses_isboleh', 0);
        });
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            display = view.down('toolbar displayfield'),
            record = selected && selected[0],
            desc = record && record.get('fitur_desc');
            
            display.setValue( Ext.isEmpty(desc) ? '-' : desc );
    }

});
