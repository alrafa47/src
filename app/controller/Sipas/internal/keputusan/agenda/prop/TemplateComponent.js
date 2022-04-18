Ext.define('SIPAS.controller.Sipas.internal.keputusan.agenda.prop.TemplateComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    refs : [
        { ref: 'mainview',      selector: 'sipas_internal_keputusan_agenda_prop' },
        { ref: 'form',          selector: 'sipas_internal_keputusan_agenda_prop > form' },
        { ref: 'component',     selector: 'sipas_internal_keputusan_agenda_prop #paneTemplate' },
        { ref: 'editor',        selector: 'sipas_internal_keputusan_agenda_prop #paneTemplate sipas_com_ckeditor' },
        { ref: 'templateMaster',selector: 'sipas_internal_keputusan_agenda_prop #paneTemplate [name=surat_internal_template]' }
    ],

    controllerTemplateLookup    : 'Sipas.template.Lookup',
    controllerTemplateEditor    : 'Sipas.template.editor.Popup',

    init: function(application) {
        this.control({
            'sipas_internal_keputusan_agenda_prop #paneTemplate #buttonTemplate': {
                click: this.onButtonTemplate_Click
            },
            'sipas_internal_keputusan_agenda_prop #paneTemplate #buttonEdit': {
                click: this.onButtonEdit_Click
            },
            'sipas_internal_keputusan_agenda_prop #paneTemplate #buttonPrint': {
                click: this.onButtonPrint_Click
            }
        });
    },

    setTemplateValue: function(value, view){
        if(!view) return;

        var templateValue = this.getEditor({root: view});
        templateValue.setValue(value);

        var templateMaster = this.getTemplateMaster({root: view});
        templateMaster && templateMaster.setValue(value);
    },

    getTemplateValue: function(view){
        if(!view) return;

        var form = this.getForm({root: view}),
            record = form && form.updateRecord().getRecord(),
            templateValue = this.getEditor({root: view});

        return record.get('surat_internal_template');
    },

    onButtonTemplate_Click: function(button, e,eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            controllerTemplateLookup = $this.getController($this.controllerTemplateLookup);

        controllerTemplateLookup.launch({
            multiselect: false,
            afterload: function(records, success, store, viewInstance, grid){},
            callback: function(selection){
                $this.setTemplateValue(selection[0] && selection[0].get('surat_template_isi'), mainview);
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord(),
            controllerTemplateEditor = $this.getController($this.controllerTemplateEditor),
            params = {
                'template' : true
            };

        controllerTemplateEditor.launch($this.getTemplateValue(mainview), function(value){
            $this.setTemplateValue(value, mainview);
            $helper.saveRecord({
                record: record,
                params: params
            });
        }, $this);
    },

    onButtonPrint_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}), 
            template = $this.getEditor({root:mainview});

        template && template.print();
    }

});
