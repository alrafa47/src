Ext.define('SIPAS.controller.Sipas.base.Prop', {
    extend: 'SIPAS.controller.Sipas.base.View',

    Model: function()
    {
        return this.getModel(this.defaultModel || this.models[0]);
    },

    createRecord: function(r)
    {
        if(r instanceof Ext.data.Model)
        {
            return r;
        }else
        {
            return this.Model().create(r);
        }
    },

    onMainview_AfterRender: function(mainview)
    {
        var record = this.createRecord(mainview.record);
            form = this.getForm({root:mainview});

        form.loadRecord(record);
    },

    onMainview_Close: function(mainview)
    {
        var form = this.getForm({root:mainview}),
            record = form && form.getRecord();

        record && record.reject();
    }
});
