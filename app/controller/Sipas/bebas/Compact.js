Ext.define('SIPAS.controller.Sipas.bebas.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.bebas.List',
        'Sipas.bebas.list.bagi.List',
        'Sipas.bebas.list.umum.List'
    ],

    models: [
        'Sipas.Arsip',
        'Sipas.arsip.Bagi'
    ],

    stores: [
        'Sipas.bebas.List',
        'Sipas.bebas.list.bagi.List',
        'Sipas.bebas.list.umum.List',
        'Sipas.surat.scope.Combo'
    ],

    views: [
        'Sipas.bebas.Compact'
    ],

    api: {
        datasource: 'server.php/sipas/arsip/{bagian}?scope={scope}'
    },

    refs:[
        { ref : 'mainview',  selector: 'sipas_bebas_compact'},
        { ref : 'unitList',  selector: 'sipas_bebas_compact sipas_bebas_list'},
        { ref : 'bagiList',  selector: 'sipas_bebas_compact sipas_bebas_list_bagi_list'},
        { ref : 'umumList',  selector: 'sipas_bebas_compact sipas_bebas_list_umum_list'},
        { ref : 'compScope', selector: 'sipas_bebas_compact #comboScope' }
    ],

    controllerProperty: 'Sipas.bebas.Prop',

    init: function(application) {
        this.control({
            "sipas_bebas_compact sipas_bebas_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_bebas_compact #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            'sipas_bebas_compact sipas_bebas_list[clickToView=true]': {
                itemclick: this.onMainviewUnit_ClickShow
            },
            'sipas_bebas_compact sipas_bebas_list_bagi_list[clickToView=true]': {
                itemclick: this.onMainviewBagi_ClickShow
            },
            'sipas_bebas_compact sipas_bebas_list_umum_list[clickToView=true]': {
                itemclick: this.onMainviewUmum_ClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config),
            scope = $this.getCompScope({root:view});

        scope.getStore().reload();
        return view;
    },

    onComboScope_AfterRender: function(component, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:component}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile(),

            unitList = $this.getUnitList({root:mainview}),
            bagiList = $this.getBagiList({root:mainview}),
            umumList = $this.getUmumList({root:mainview});
        
        component.setLoading(true);
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);

                $this.updateList('hidup', profile.staf_unit, unitList);
                $this.updateList('bagi', profile.staf_unit, bagiList);
                $this.updateList('umum', profile.staf_unit, umumList);
            }
        });
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),

            unitList = $this.getUnitList({root:mainview}),
            bagiList = $this.getBagiList({root:mainview}),
            umumList = $this.getUmumList({root:mainview}),
            
            scope = combo.getValue();

        $this.updateList('hidup', scope, unitList);
        $this.updateList('bagi', scope, bagiList);
        $this.updateList('umum', scope, umumList);
    },

    updateList: function(bagian, scope, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            store = mainview.getStore(),
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = this.getApi('datasource',{bagian:bagian, scope:scope});
        
        mainview.reconfigure(store);
        pagingtoolbar && pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        store.reload();
    },

    onMainviewUnit_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            unit: scopeValue,
            mode:'view',
            // mode:'lihat',
            record: record
        });
    },

    onMainviewBagi_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            unit: scopeValue,
            mode:'view',
            record: record
        });
    },

    onMainviewUmum_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            unit: scopeValue,
            mode:'view',
            record: record
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            list = $this.getUnitList({root:view}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            unit: scopeValue,
            callback: function(success, record){
                if(success && list){
                    list.getStore().insert(0, record);
                    list.getView().refresh();
                }
            }
        });
    }
});