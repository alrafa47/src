Ext.define('SIPAS.controller.Sipas.akun.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.akun.staf.Form',
        'Sipas.akun.List'
    ],

    views: [
        'Sipas.akun.Compact'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_akun_compact' },
        { ref: 'gridtim',       selector: 'sipas_akun_compact sipas_akun_list' },
        { ref: 'form',          selector: 'sipas_akun_compact sipas_akun_staf_form' }
    ],

    controllerstaftimList: 'Sipas.akun.List',

    init: function(application) {
        this.control({
            'sipas_akun_compact sipas_akun_list': {
                selectionchange: this.onGridtimAnggota_SelectionChange
            }
        })
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        $this.getController($this.controllerstaftimList).refresh();

        return view;
    },

    onGridtimAnggota_SelectionChange: function(grid, selection, eOpts){
        var form = this.getForm({
            root:this.getMainview('grid')
        });

        if(!form) return;

        form.setDisabled(selection.length != 1);
        if(selection.length){
            form.loadRecord(selection[0]);
        }else{
            form.reset(true);
        }
    }

});