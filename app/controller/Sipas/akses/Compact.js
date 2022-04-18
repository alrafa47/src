Ext.define('SIPAS.controller.Sipas.akses.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.peran.List'
    ],

    model: [
        'Sipas.Fitur'
    ],

    views: [
        'Sipas.akses.Compact'
    ],

    stores: [
        'Sipas.akses.List',
        'Sipas.peran.aktif.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_akses_compact' },
        { ref: 'aksesList', selector: 'sipas_akses_compact sipas_akses_list' },
        { ref: 'peranList', selector: 'sipas_akses_compact sipas_peran_list' }
    ],

    init: function(){
        this.control({
            "sipas_akses_compact sipas_peran_list": {
                selectionchange: this.onGridpanelPeran_SelectionChange
            },
            "sipas_akses_compact sipas_peran_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },

            "sipas_akses_compact sipas_peran_list #Aktif": {
                select: this.onComboStatus_Select
            }
        });
    },

    launch: function(config) {
        config = Ext.applyIf(config || {}, {
            renderTo: null, 
            callback: Ext.emptyFn, 
            scope: this
        });

        var $this = this,
            view = this.getView($this.views[0]).create({
                renderTo: config.renderTo,
                border: (config.renderTo !== false)
            });
            $this.refresh(view);

        Ext.callback(config.callback, config.scope, [view, $this]);
        return view;
    },

    refresh: function(view){
        // this.getController('Sipas.akses.List').refresh();
        this.getController('Sipas.peran.List').refresh(view);
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            akses = $this.getAksesList({root:view});

        $this.refresh(view);
        akses.setDisabled(true);
    },

    onGridpanelPeran_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:model.view}),
            akses = $this.getController('Sipas.akses.List'),
            viewAkses = $this.getAksesList({root: mainview}),
            viewPeran = model.view;

        if(viewAkses)
        {
            if( selected.length)
            {
                viewAkses.setDisabled(false);
                
                viewPeran.setDisabled(true);
                akses.load(selected[0], function(){
                    viewPeran.setDisabled(false);
                }, $this, viewAkses);
            }
            else{
                viewAkses.setDisabled(true);
            }
        }
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            akses = $this.getAksesList({root:mainview}),
            peran = $this.getPeranList({root:mainview}),
            store = peran.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/peran/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/peran/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/peran/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
        akses.setDisabled(true);
    }

});
