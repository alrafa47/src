Ext.define('SIPAS.controller.Sipas.staf.tim.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.tim.anggota.Form',
        'Sipas.staf.tim.List'
    ],

    views: [
        'Sipas.staf.tim.Compact'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_staf_tim_compact' },
        { ref: 'gridtim',       selector: 'sipas_staf_tim_compact sipas_staf_tim_list' },
        { ref: 'form',          selector: 'sipas_staf_tim_compact sipas_staf_tim_anggota_form' }
    ],

    controllerstaftimList: 'Sipas.staf.tim.List',

    init: function(application) {
        this.control({
            'sipas_staf_tim_compact sipas_staf_tim_list': {
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