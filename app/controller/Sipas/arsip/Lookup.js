Ext.define('SIPAS.controller.Sipas.arsip.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.arsip.bebas.unit.List',
        'Sipas.bebas.list.bagi.List',
        'Sipas.bebas.list.umum.List',
        'Sipas.surat.scope.Combo'
    ],

    api: {
        datasource: 'server.php/sipas/arsip/{bagian}?scope={scope}'
    },

    views: [
        'Sipas.arsip.Lookup'
    ],

    refs: [
        { ref: 'mainview',   selector: 'sipas_arsip_lookup'},
        { ref: 'grid',       selector: 'sipas_arsip_lookup grid'},
        // { ref: 'putin',      selector: 'sipas_arsip_lookup sipas_com_button_putin'},
        { ref: 'unitList',   selector: 'sipas_arsip_lookup #listUnit'},
        { ref: 'bagiList',   selector: 'sipas_arsip_lookup #listBagi'},
        { ref: 'umumList',   selector: 'sipas_arsip_lookup #listUmum'},
        // { ref: 'unitPutin',   selector: 'sipas_arsip_lookup #listUnit sipas_com_button_putin'},
        // { ref: 'bagiPutin',   selector: 'sipas_arsip_lookup #listBagi sipas_com_button_putin'},
        // { ref: 'umumPutin',   selector: 'sipas_arsip_lookup #listUmum sipas_com_button_putin'},
        { ref: 'compScope',  selector: 'sipas_arsip_lookup #comboScope' }
    ],

    defaultStore: 'Sipas.arsip.bebas.unit.List',

    init: function(application) {
        this.control({
            "sipas_arsip_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_arsip_lookup #listUnit": {
                selectionchange: this.onGridpanelUnit_SelectionChange
            },
            "sipas_arsip_lookup #listBagi": {
                selectionchange: this.onGridpanelBagi_SelectionChange
            },
            "sipas_arsip_lookup #listUmum": {
                selectionchange: this.onGridpanelUmum_SelectionChange
            },
            "sipas_arsip_lookup #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            }
        });
    },

    onGridpanelUnit_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view = $this.getUnitList({from:model.view}),
            putin = view.down('sipas_com_button_putin');
            // putin = $this.getUnitPutin({root:view});

        putin && putin.setDisabled(!selected.length);
    },

    onGridpanelBagi_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view = $this.getBagiList({from:model.view}),
            putin = view.down('sipas_com_button_putin');

        putin && putin.setDisabled(!selected.length);
    },

    onGridpanelUmum_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view = $this.getUmumList({from:model.view}),
            putin = view.down('sipas_com_button_putin');
            
        putin && putin.setDisabled(!selected.length);
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

    onButtonPutin_Click: function(button, e, eOpts){
        var $this = this,
            view = this.getMainview({from:button}),
            list = button.up('gridpanel'),
            selection = list.getSelectionModel().getSelection();

        view.close();
        Ext.callback(view.callback, view.scope || $this, [selection]);
    }
});