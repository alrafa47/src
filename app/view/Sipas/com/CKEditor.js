/*
 * File: app/view/Sipas/com/CKEditor.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SIPAS.view.Sipas.com.CKEditor', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.sipas_com_ckeditor',

    defaultListenerScope: true,
    border: false,

    initComponent: function() {
        var me = this;

        me.addEvents(
            'editorReady'
        );

        Ext.applyIf(me, {
            CKConfig: {
                baseFloatZIndex: 100000,
                removePlugins: 'resize',
                imageUploadUrl: '/uploader/upload.php?type=Images',
                uploadUrl: '/uploader/upload.php?type=Images',
                // Default setting.
                toolbar: [
                    {
                        name: 'doc',
                        items: [
                            'Print',
                            'Preview',
                            'Maximize',
                            'Source'
                        ]
                    },
                    {
                        name: 'clipboard',
                        items: [
                            'Copy',
                            'Paste',
                            'Undo',
                            'Redo'
                        ]
                    },
                    {
                        name: 'styles',
                        items: [
                            'Format',
                            'Font',
                            'FontSize'
                        ]
                    },
                    {
                        name: 'basicstyles',
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',
                            'Strike',
                            'RemoveFormat',
                            'CopyFormatting',
                            'TextColor',
                            'BGColor'
                        ]
                    },
                    {
                        name: 'align',
                        items: [
                            'JustifyLeft',
                            'JustifyCenter',
                            'JustifyRight',
                            'JustifyBlock'
                        ]
                    },
                    {
                        name: 'links',
                        items: [
                            'Link',
                            'Unlink'
                        ]
                    },
                    {
                        name: 'paragraph',
                        items: [
                            'NumberedList',
                            'BulletedList'
                        ]
                    },
                    {
                        name: 'indentation',
                        items: [
                            'Outdent',
                            'Indent'
                        ]
                    },
                    {
                        name: 'separator',
                        items: [
                            'HorizontalRule',
                            'PageBreak'
                        ]
                    },
                    {
                        name: 'quote',
                        items: [
                            'Blockquote'
                        ]
                    },
                    {
                        name: 'insert',
                        items: [
                            'Image',
                            'Table'
                        ]
                    }
                    //{ name: 'editing', items: [ 'Scayt' ] }
                ],
                // readOnly: true,
                // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
                // One HTTP request less will result in a faster startup time.
                // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
                customConfig: '',
                // Sometimes applications that convert HTML to PDF prefer setting image width through attributes instead of CSS styles.
                // For more information check:
                //  - About Advanced Content Filter: http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
                //  - About Disallowed Content: http://docs.ckeditor.com/#!/guide/dev_disallowed_content
                //  - About Allowed Content: http://docs.ckeditor.com/#!/guide/dev_allowed_content_rules
                disallowedContent: 'img{width,height,float}',
                allowedContent: true,
                extraAllowedContent: 'img[width,height,align] p[var]',
                // Enabling extra plugins, available in the full-all preset: http://ckeditor.com/presets-all
                extraPlugins: 'tableresize,uploadimage,uploadfile,pastefromword',
                /********* File management support *********/// In order to turn on support for file uploads, CKEditor has to be configured to use some server side
                // solution with file upload/management capabilities, like for example CKFinder.
                // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration
                // Uncomment and correct these lines after you setup your local CKFinder instance.
                // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
                // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                /********* File management support *********/// An array of stylesheets to style the WYSIWYG area.
                // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
                contentsCss: [
                    'resources/ckeditor/contents.css',
                    'resources/ckeditor/doceditor.css'
                ],
                // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
                bodyClass: 'document-editor a4-80 margin-moderate',
                // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
                format_tags: 'p;h1;h2;h3;pre',
                // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
                removeDialogTabs: 'image:advanced;link:advanced',
                // Define the list of styles which should be available in the Styles dropdown list.
                // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
                // (and on your website so that it rendered in the same way).
                // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
                // that file, which means one HTTP request less (and a faster startup).
                // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
                stylesSet: [
                    /* Inline Styles */{
                        name: 'Marker',
                        element: 'span',
                        attributes: {
                            'class': 'marker'
                        }
                    },
                    {
                        name: 'Cited Work',
                        element: 'cite'
                    },
                    {
                        name: 'Inline Quotation',
                        element: 'q'
                    },
                    /* Object Styles */{
                        name: 'Special Container',
                        element: 'div',
                        styles: {
                            padding: '5px 10px',
                            background: '#eee',
                            border: '1px solid #ccc'
                        }
                    },
                    {
                        name: 'Compact table',
                        element: 'table',
                        attributes: {
                            cellpadding: '5',
                            cellspacing: '0',
                            border: '1',
                            bordercolor: '#ccc'
                        },
                        styles: {
                            'border-collapse': 'collapse'
                        }
                    },
                    {
                        name: 'Borderless Table',
                        element: 'table',
                        styles: {
                            'border-style': 'hidden',
                            'background-color': '#E6E6FA'
                        }
                    },
                    {
                        name: 'Square Bulleted List',
                        element: 'ul',
                        styles: {
                            'list-style-type': 'square'
                        }
                    }
                ]
            },
            editorConfig: {
                
            },
            listeners: {
                afterrender: {
                    fn: me.onTextareafieldAfterRender,
                    scope: me
                },
                editorReady: {
                    fn: me.onTextareafieldEditorReady,
                    scope: me
                },
                boxready: {
                    fn: me.onTextareafieldBoxReady,
                    scope: me
                },
                resize: {
                    fn: me.onTextareafieldResize,
                    scope: me
                },
                destroy: {
                    fn: me.onTextareafieldDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextareafieldAfterRender: function(component, eOpts) {
        Ext.apply(this.CKConfig, {
            height: this.getHeight(),
            width: this.getWidth()
        });

        var CKConfig = Ext.applyIf(this.editorConfig || {}, this.CKConfig);

        this.editor = CKEDITOR.replace(this.inputEl.id, CKConfig);
        this.editorId = this.inputEl.id;
        this.editor.name = this.name;

        this.setLoading(true);
        this.editor.on("instanceReady", function (ev) {
            this.setLoading(false);
            this.fireEvent(
                "editorReady",
                this,
                this.editor
            );
        }, this);
    },

    onTextareafieldEditorReady: function(textareafield, editor, eventOptions) {
        // Set read only to false to avoid issue when created into or as a child of a disabled component.

        if(textareafield.viewOnly)
        {
        	var toolbarTop = Ext.query('.cke_top', textareafield.getEl().dom)[0];
        		toolbarTop && (toolbarTop.style.display = 'none');
        	var toolbarBottom = Ext.query('.cke_bottom', textareafield.getEl().dom)[0];
        		toolbarBottom && (toolbarBottom.style.display = 'none');
            editor.setReadOnly(true);
        }

        textareafield.editor.resize(this.getWidth(), this.getHeight());
    },

    onTextareafieldBoxReady: function(component, width, height, eOpts) {
        // used to hook into the resize method
    },

    onTextareafieldResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var eid = this.editorId,
            editor = CKEDITOR.instances[this.editorId];
        if (!Ext.isEmpty(editor) && editor.container){
            editor.resize(width, height);
        }
    },

    onTextareafieldDestroy: function(component, eOpts) {
        // delete instance
        if(!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
            delete CKEDITOR.instances[this.editorId];
        }
    },

    constructor: function() {
        this.callParent(arguments);
    },

    onRender: function(ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments);
    },

    setValue: function(value) {
        this.callParent(arguments);
        if (this.editor) {
            this.editor.setData(value);
        }
    },

    getValue: function() {
        if (this.editor) {
            return this.editor.getData();
        }
        else {
            return false;
        }
    },

    setReadOnly: function(readonly) {

        // this.editor.setReadOnly(readonly);
        this.callParent(arguments);
    },

    print: function() {
        if(!this.editor) {return;}
        CKEDITOR.env.gecko?this.editor.window.$.print():this.editor.document.$.execCommand("Print");
    }

});