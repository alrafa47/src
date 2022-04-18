Ext.define('Ext.ux.CKeditor', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.ckeditor',
    
    listeners: {
      instanceReady: 'onInstanceReady',
      resize: 'resize',
      boxready : 'onBoxReady'
    },

    defaultListenerScope: true,

    editorId: null,
    
    editor:null,
    CKConfig: {},

    constructor: function () {
        this.callParent(arguments);
    },

    initComponent: function () {
        this.callParent(arguments);
        this.on("afterrender", function () {
            Ext.apply(this.CKConfig, {
                height: this.getHeight(),
                width: this.getWidth()
            });

            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editorId = this.inputEl.id;
            this.editor.name = this.name;

            this.editor.on("instanceReady", function (ev) {
                this.fireEvent(
                    "instanceReady",
                    this,
                    this.editor
                );
            }, this);

        }, this);
    },
    onInstanceReady : function (ev) {
        // Set read only to false to avoid issue when created into or as a child of a disabled component.
        ev.editor.setReadOnly(false);
        // ev.editor.resize()
        ev.editor.resize(this.getWidth(), this.getHeight());
    },
    onRender: function (ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments)
    },

    setValue: function (value) {
        this.callParent(arguments);
        if (this.editor) {
            this.editor.setData(value);
        }
    },

    getValue: function () {
        if (this.editor) {
            return this.editor.getData();
        }
        else {
            return ''
        }
    },

    destroy: function(){
        // delete instance
        if(!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
            delete CKEDITOR.instances[this.editorId];
        }

    },

    resize: function(win,width, height,opt) {
        var eid = this.editorId,
            editor = CKEDITOR.instances[this.editorId];
        if (!Ext.isEmpty(editor) && editor.container){
            editor.resize(width, height);
        }       
    },
    onBoxReady : function(win, width, height, eOpts){
        // used to hook into the resize method
    }
});