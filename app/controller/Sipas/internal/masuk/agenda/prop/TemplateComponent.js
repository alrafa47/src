Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.prop.TemplateComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    refs : [
        { ref: 'mainview',      selector: 'sipas_internal_masuk_agenda_prop' },
        { ref: 'component',     selector: 'sipas_internal_masuk_agenda_prop #paneTemplate' },
        { ref: 'editor',        selector: 'sipas_internal_masuk_agenda_prop #paneTemplate sipas_com_ckeditor' },
        { ref: 'templateMaster',selector: 'sipas_internal_masuk_agenda_prop #paneTemplate [name=surat_internal_template]' }
    ],

    controllerTemplateLookup    : 'Sipas.template.Lookup',
    controllerTemplateEditor    : 'Sipas.template.editor.Popup',

    init: function(application) {
        this.control({
            'sipas_internal_masuk_agenda_prop #paneTemplate #buttonTemplate': {
                click: this.onButtonTemplate_Click
            },
            'sipas_internal_masuk_agenda_prop #paneTemplate #buttonEdit': {
                click: this.onButtonEdit_Click
            },
            'sipas_internal_masuk_agenda_prop #paneTemplate #buttonPrint': {
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

        var templateValue = this.getEditor({root: view});
        return templateValue.getValue();
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
            mainview = $this.getMainview({from:button}), 
            controllerTemplateEditor = $this.getController($this.controllerTemplateEditor);

        controllerTemplateEditor.launch($this.getTemplateValue(mainview), function(value){
            $this.setTemplateValue(value, mainview);
        }, $this);
    },

    onButtonPrint_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}), 
            template = $this.getEditor({root:mainview});

        template && template.print();
    }

});
