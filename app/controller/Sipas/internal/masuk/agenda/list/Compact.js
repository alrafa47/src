Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.list.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.internal.masuk.agenda.list.approved.List',
        'Sipas.internal.masuk.agenda.list.unapproved.List'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [ /*please do not re-order*/
        'Sipas.internal.masuk.agenda.list.approved.aktif.List', /*default*/
        'Sipas.internal.masuk.agenda.list.unapproved.pending.List', /*default*/
        'Sipas.internal.masuk.agenda.list.approved.nonaktif.List',
        'Sipas.internal.masuk.agenda.list.approved.semua.List',
        'Sipas.internal.masuk.agenda.list.unapproved.tolak.List',
        'Sipas.internal.masuk.agenda.list.unapproved.semua.List'
    ],

    views: [
        'Sipas.internal.masuk.agenda.list.Compact'
    ],

    api: {
        datasource: 'server.php/sipas/surat_imasuk/{status}?scope={scope}&tipe={tipe}'
    },

    refs:[
        { ref : 'mainview',      selector: 'sipas_internal_masuk_agenda_list_compact'},
        { ref : 'pendingList',   selector: 'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_unapproved_list'},
        { ref : 'approvedList',  selector: 'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list'},
        { ref : 'compScope',     selector: 'sipas_internal_masuk_agenda_list_compact #comboScope' },
        { ref : 'compTipe',      selector: 'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list #comboTipe' },
        { ref : 'compUnapprovedStatus', selector: 'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_unapproved_list #comboStatus' },
        { ref : 'compApprovedStatus',   selector: 'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list #comboApprovedStatus' }
    ],

    controllerProperty: 'Sipas.internal.masuk.agenda.Prop',
    controllerApproval: 'Sipas.internal.masuk.agenda.approval.Popup',

    init: function(application) {
        this.control({
            "sipas_internal_masuk_agenda_list_compact #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_unapproved_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list sipas_com_button_refresh": {
                click: this.onButtonRefreshApproved_Click
            },
            "sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_unapproved_list #comboStatus": {
                select: this.onComboStatusUnapproved_Select,
                afterrender: this.onComboStatusUnapproved_AfterRender
            },
            "sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list #comboApprovedStatus": {
                select: this.onComboStatusApproved_Select,
                afterrender: this.onComboStatusApproved_AfterRender
            },
            "sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list #comboTipe": {
                select: this.onComboTipe_Select,
                afterrender: this.onComboTipe_AfterRender
            },
            'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_approved_list[clickToView=true]': {
                itemclick: this.onMainviewApproved_ClickShow
            },
            'sipas_internal_masuk_agenda_list_compact sipas_internal_masuk_agenda_list_unapproved_list[clickToView=true]': {
                itemclick: this.onMainviewUnapproved_ClickShow
            },
            "sipas_internal_masuk_agenda_list_compact #buttonReset": {
                click: this.onButtonReset_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        return view;
    },

    onComboStatusUnapproved_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            list = $this.getPendingList({root:mainview}),
            store = $this.getStore(combo.getValue()),
            status = (combo.rawValue == 'Surat Masuk')? 'unapproved' : combo.rawValue,
            scope = $this.getCompScope({root:mainview}).getValue(),
            tipe = null;

        if(tipe == null) tipe = 'all';
        $this.updateList(store, status, scope, tipe, list);
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getPendingList({from: button});
        $this.refresh(mainview);
    },

    onButtonRefreshApproved_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button})
            approvedList = $this.getApprovedList({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            compTipe = $this.getCompTipe({root:mainview}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),

            approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue,
            scope = compScope.getValue(),
            tipe = compTipe.getValue();

        if(tipe == null) tipe = 'all';

        $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);
        // $this.refresh(mainview);
    },

    onComboStatusUnapproved_AfterRender: function(component, eOpts){
        /*after render for both unapproved and approved list*/
        component.setValue(this.stores[1]);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile(),

            mainview = $this.getMainview({from:component}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compTipe = $this.getCompTipe({root:mainview}),
            pendingList = $this.getPendingList({root:mainview}),
            approvedList = $this.getApprovedList({root:mainview}),

            unapprovedStore = $this.getStore(component.getValue()),

            unapprovedStatus = (component.rawValue == 'Surat Masuk')? 'unapproved' : component.rawValue,
            scope = profile.staf_unit;

        compApprovedStatus.setValue(this.stores[0]);

        var approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue,
            tipe = 'all';

        $this.updateList(unapprovedStore, unapprovedStatus, scope, null, pendingList);
        // $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);

    },

    onComboStatusApproved_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            approvedList = $this.getApprovedList({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            compTipe = $this.getCompTipe({root:mainview}),

            approvedStore = $this.getStore(combo.getValue()),
            approvedStatus = (combo.rawValue == 'Surat Diterima')? 'approved' : combo.rawValue,
            scope = compScope.getValue(),
            tipe = compTipe.getValue();

        if(tipe == null) tipe = 'all';
        $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);
    },

    onComboStatusApproved_AfterRender: function(component, eOpts){
        /*after render for both unapproved and approved list*/
        component.setValue(this.stores[1]);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile(),

            mainview = $this.getMainview({from:component}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compTipe = $this.getCompTipe({root:mainview}),
            pendingList = $this.getPendingList({root:mainview}),
            approvedList = $this.getApprovedList({root:mainview}),

            unapprovedStore = $this.getStore(component.getValue()),

            unapprovedStatus = (component.rawValue == 'Surat Masuk')? 'unapproved' : component.rawValue,
            scope = profile.staf_unit;

        compApprovedStatus.setValue(this.stores[0]);

        var approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue,
            tipe = 'all';

        // $this.updateList(unapprovedStore, unapprovedStatus, scope, null, pendingList);
        $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);
    },

    onComboTipe_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            approvedList = $this.getApprovedList({root:mainview}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),

            approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue,
            scope = compScope.getValue(),
            tipe = combo.getValue();

        $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);
    },

    onComboTipe_AfterRender: function (component, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:component}),
            approvedList = $this.getApprovedList({root:mainview}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            comboTipe = $this.getCompTipe({root:mainview}),

            approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue;

        // $this.updateList(approvedStore, approvedStatus, compScope.getValue(), 'all', approvedList);
    },

    onButtonReset_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            approvedList = $this.getApprovedList({root:mainview}),
            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            comboTipe = $this.getCompTipe({root:mainview}),

            approvedStore = $this.getStore(compApprovedStatus.getValue()),
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue;

        comboTipe.setValue(null);
        $this.updateList(approvedStore, approvedStatus, compScope.getValue(), 'all', approvedList);
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),

            compApprovedStatus = $this.getCompApprovedStatus({root:mainview}),
            compUnapprovedStatus = $this.getCompUnapprovedStatus({root:mainview}),
            compTipe = $this.getCompTipe({root:mainview}),
            pendingList = $this.getPendingList({root:mainview}),
            approvedList = $this.getApprovedList({root:mainview}),
            
            unapprovedStore = $this.getStore(compUnapprovedStatus.getValue()),
            approvedStore = $this.getStore(compApprovedStatus.getValue()),

            unapprovedStatus = (compUnapprovedStatus.rawValue == 'Surat Masuk')? 'unapproved' : compUnapprovedStatus.rawValue,
            approvedStatus = (compApprovedStatus.rawValue == 'Surat Diterima')? 'approved' : compApprovedStatus.rawValue,

            tipe = compTipe.getValue(),
            scope = combo.getValue();

        if(tipe == null) tipe = 'all';
        $this.updateList(unapprovedStore, unapprovedStatus, scope, null, pendingList);
        $this.updateList(approvedStore, approvedStatus, scope, tipe, approvedList);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setValue(profile.staf_unit);
            }
        });
    },

    updateList: function(store, status, scope, tipe, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            proxy = store.getProxy();
        
        switch(status){
            case 'Surat Aktif':
                status = 'aktif';
            break;
            case 'Surat Tidak Aktif':
                status = 'nonaktif';
            break;
            case 'Surat Belum Diterima':
                status = 'pending';
            break;
            case 'Surat Tolak':
                status = 'tolak';
            break;
            case 'Semua Surat Diterima':
                status = 'approved';
            break;
            default:
                status = status;
            break;
        }
        store.removeAll();
        proxy.url = this.getApi('datasource',{status:status, scope:scope, tipe: tipe});
        mainview.reconfigure(store);
        pagingtoolbar && pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        store.reload();
    },

    onMainviewApproved_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            approved= $this.getApprovedList({root:view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            propType: 'imasuk',
            unit: scopeValue,
            model: record.self.modelType().MODEL_IMASUK,
            mode:'view',
            record: record,
            callback: function(success, record){
                approved.getStore().reload();
            }
        });
    },

    onMainviewUnapproved_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            pending= $this.getPendingList({root:view}),
            approved= $this.getApprovedList({root:view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerApproval);

        controllerProperty.launch({
            unit: scopeValue,
            tipe: record.get('surat_unit'),
            model: record.self.modelType().MODEL_IMASUK,
            mode:'edit',
            record: record,
            callback: function(success, record){
                pending.getStore().reload();
                approved.getStore().reload();                
            }
        });
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        /*changing paging toolbar store based on mainview's store*/
        pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    }
});