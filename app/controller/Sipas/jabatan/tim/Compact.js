Ext.define('SIPAS.controller.Sipas.jabatan.tim.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.jabatan.tim.anggota.Form',
        'Sipas.jabatan.tim.List'
    ],

    views: [
        'Sipas.jabatan.tim.Compact'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_jabatan_tim_compact' },
        { ref: 'gridtim',       selector: 'sipas_jabatan_tim_compact sipas_jabatan_tim_list' },
        { ref: 'form',          selector: 'sipas_jabatan_tim_compact sipas_jabatan_tim_anggota_form' }
    ],

    controllerjabatantimList: 'Sipas.jabatan.tim.List',

    init: function(application) {
        this.control({
            'sipas_jabatan_tim_compact sipas_jabatan_tim_list': {
                selectionchange: this.onGridtimAnggota_SelectionChange
            }
        })
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        $this.getController($this.controllerjabatantimList).refresh();

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