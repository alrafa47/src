Ext.define('SIPAS.controller.Sipas.sistem.languageable.ComponentHandler', {
    extend: 'SIPAS.controller.Sipas.base.Base',    

    init: function()
    {
        this.control({
            'component[languageable=true]': {
                'afterrender': this.onComponent_AfterRender
            }
        })
    },

    onComponent_AfterRender: function(component, e, eOpts)
    {
        var $app = this.getApplication(),
            $language = $app.Language(),
            grammar = $language.getGrammar(component.languageCode, false),
            data = {};

        // it doesnt work for fieldset

        switch(component.languageMode)
        {
            case 'text': component.setText && component.setText(grammar); break;
            case 'title': component.setTitle && component.setTitle(grammar); break;
            case 'value': component.setValue && component.setValue(grammar); break;
            case 'valueTemplate': component.setValueTemplate && component.setValueTemplate(grammar); break;
            case 'label': component.setLabel && component.setLabel(grammar); break;
            case 'fieldLabel': component.setFieldLabel && component.setFieldLabel(grammar); break;
            case 'boxLabel': component.setBoxLabel && component.setBoxLabel(grammar); break;
        }
    }

});