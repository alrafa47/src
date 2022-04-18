Ext.define('SIPAS.controller.Sipas.Override', {
    extend: 'Ext.app.Controller',

    init: function(){}
});
// begin truth override

Ext.define('SIPAS.override.Component', {
    override: 'Ext.Component',

    addCls : function(cls) {
        var me = this,
            el = me.rendered ? me.el : (me.protoEl || me.setupProtoEl()) ;

        el && el.addCls.apply(el, arguments);
        return me;
    }
});
Ext.define('SIPAS.override.window.MessageBox', {
    override: 'Ext.window.MessageBox',

    defaultMinHeight: 72
});
Ext.define('SIPAS.override.form.field.Date', {
    override: 'Ext.form.field.Date',
    
    submitFormat: 'Y-m-d H:i:s'
});
Ext.define('SIPAS.override.data.Field', {
    override: 'Ext.data.Field',
    
    dateReadFormat: 'Y-m-d H:i:s',
    dateWriteFormat: 'Y-m-d H:i:s'
});

Ext.define('SIPAS.override.view.Table', {
    override: 'Ext.view.Table',

    doStripeRows: function(startRow, endRow) {
        var me = this,
            rows,
            rowsLn,
            i,
            row;


        if (me.rendered && me.stripeRows) {
            rows = me.getNodes(startRow, endRow);

            for (i = 0, rowsLn = rows.length; i < rowsLn; i++) {
                row = rows[i];

                if (row) { // self updating; check for row existence
                    row.className = row.className.replace(me.rowClsRe, ' ');
                    startRow++;

                    if (startRow % 2 === 0) {
                        row.className += (' ' + me.altRowCls);
                    }
                }
            }
        }
    },

    // Fixing selection different record for grouped list
    getRecord: function (node) {
        node = this.getNode(node);
        if (node) {
            return this.dataSource.data.get(node.getAttribute('data-recordId'));
        }
    },

    indexInStore: function (node) {
        node = this.getNode(node, true);
        if (!node && node !== 0) {
            return -1;
        }
        return this.dataSource.indexOf(this.getRecord(node));
    }
});

Ext.define('SIPAS.override.form.field.File', {
    override: 'Ext.form.field.File',
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            change: function(filefield, value) {
                filefield.setRawValue(value.replace('C:\\fakepath\\', ''));
                filefield.setValue(value.replace('C:\\fakepath\\', ''));
            }
        });
        me.callParent(arguments);
    }
});
Ext.define('SIPAS.override.selection.RowModel', {
    override: 'Ext.selection.RowModel',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            allowDeselect: true
        });
        me.callParent(arguments);
    }
});
Ext.define('SIPAS.override.grid.RowNumberer', {
    override: 'Ext.grid.RowNumberer',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            minWidth: 32,
            resizeable: true
        });
        me.callParent(arguments);
    }
});
Ext.define('SIPAS.override.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    emptyCellText: '-'
});

Ext.define("SIPAS.override.data.Model", {
    override: "Ext.data.Model",
    reload: function(callback) {
        var me = this;
        if(me.phantom) return;
        return Ext.getClass(this).load(this.getId(), {
            success: function(r, o) {
                var k;
                for (k in r.data) {
                    me.data[k] = r.data[k];
                }
                me.suspendEvents(true);
                me.commit();
                me.resumeEvents();
                if (Ext.isFunction(callback)) {
                    callback(true);
                }
            },
            failure: function() {
                if (Ext.isFunction(callback)) {
                    callback(false);
                }
            }
        });
    }
});
Ext.define('SIPAS.override.ux.grid.FiltersFeature', {
    override: 'Ext.ux.grid.FiltersFeature',

    updateBuffer : 2000,

    onBeforeLoad : function (store, options) {
        options.singletonRequest = this.grid.getId() + '-filterheader';
        this.callParent(arguments);
    }
});
// Ext.define('SIPAS.override.data.AbstractStore', {
//     override: 'Ext.data.AbstractStore',

//     lastOperation: null,
//     runningOperations: [],

//     load: function(options) {
//         var me = this,
//             operation = {
//                 action: 'read'
//             };

//         // Only add filtering and sorting options if those options are remote
//         // if (me.remoteFilter) {
//         //     operation.filters = me.filters.items;
//         // }
//         // if (me.remoteSort) {
//         //     operation.sorters = me.getSorters();
//         // }
//         Ext.apply(operation, options);
//         me.lastOptions = operation;

//         // abort previous active connection with same skeleton
//         Ext.Array.each(me.runningOperations, function(item, i)
//         {
//             if(item.complete == true || item.error)
//             {
//                 Ext.Array.remove(me.runningOperations, item);
//             }
//         }, me, true);
//         Ext.Array.each(me.runningOperations, function(item, i)
//         {
//             if(item.singletonRequest)
//             {
//                 var requests = Ext.Ajax.requests;
//                 for (id in requests)
//                 {
//                     if (requests.hasOwnProperty(id) && requests[id].options.operation.singletonRequest == item.singletonRequest) {
//                         Ext.Ajax.abort(requests[id]);
//                     }
//                 }
//             }            
//         });
//         // end of mine

//         operation = new Ext.data.Operation(operation);
//         me.runningOperations.push(operation);

//         if (me.fireEvent('beforeload', me, operation) !== false) {
//             me.loading = true;
//             me.proxy.read(operation, me.onProxyLoad, me);
//         }

//         return me;
//     }
// });
Ext.define('SIPAS.override.window.Window', {
    override: 'Ext.window.Window',

    constrain: true,
    constrainTo: Ext.getBody()
});
Ext.define('SIPAS.override.form.Panel', {
    override: 'Ext.form.Panel',

    initComponent: function() {
        var me = this;
        me.addEvents('loadrecord', 'clearrecord');
        me.on('loadrecord', me.onLoadRecord);
        me.on('clearrecord', me.onClearRecord);
        me.callParent(arguments);
    },

    loadRecord: function(record){
        var me = this,
            config = {
                record: record
            };

        me.fireEventArgs('beforeload', [config.record, me, config]);
        me.callParent(arguments);
        me.fireEventArgs('loadrecord', [config.record, me, config]);
    },

    reset: function(unbind){
        var me = this;
        me.form.reset(unbind);
        me.fireEvent('clearrecord', me, unbind);
    },

    onClearRecord: function(form){
        Ext.each(Ext.ComponentQuery.query('[associated=true]', form), function(cmp){
            cmp.fireEvent('clearassociate', form, cmp);
        });
    },

    onLoadRecord: function(record, form){
        Ext.each(Ext.ComponentQuery.query('[associated=true]', form), function(cmp){
            cmp.fireEvent('loadassociate', record, form, cmp);
        });
    }
});
// add feature
Ext.define('SIPAS.override.app.Controller', {
    override: 'Ext.app.Controller',

    /**
     * new feature now config has 3 config items
     * .forceQuery to requey,
     * .uncache to not save the comp into cache,
     * .root to traverse down from
     * .from to traverse up from
     */
    getRef: function(ref, info, config) {
        var me = this,
            refCache = me.refCache || (me.refCache = {}),
            cached = refCache[ref];

        info = Ext.clone(info || {});
        config = config || {};

        Ext.apply(info, config);

        if (info.forceCreate) {
            return Ext.ComponentManager.create(info, 'component');
        }

        if(info.root || info.from){
            info.forceQuery = true;
            info.uncache = true;
        }

        if (!cached || info.forceQuery === true) {
            if (info.selector) {

                var selector = (info.selector || "").split(' ') || [];
                if(info.root instanceof Ext.Component && info.root.is(selector[0])) selector.shift();
                selector = selector.join(' ');

                if(info.from && info.from instanceof Ext.Component){
                    cached = info.from.up(selector);
                }else{
                    cached = Ext.ComponentQuery.query(selector, info.root)[0];
                }
            }

            if (!cached && info.autoCreate) {
                cached = Ext.ComponentManager.create(info, 'component');
            }

            if (cached && info.uncache !== true) {
                refCache[ref] = cached;
                cached.on('beforedestroy', function() {
                    refCache[ref] = null;
                });
            }
        }
        return cached;
    }
});
Ext.define('SIPAS.override.view.View', {
    override: 'Ext.view.View',
    emptyText: '<div class="x-dataview-empty">Data tidak ditemukan</div>'
});
Ext.define('SIPAS.override.view.BoundList', {
    override: 'Ext.view.BoundList',
    emptyText: '<div class="x-list-empty">Data tidak ditemukan</div>'
});

Ext.define('SIPAS.override.grid.column.Action', {
    override: 'Ext.grid.column.Action',
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        Ext.each(me.items, function(i, idx, allitem) {
            var itemCmp = this;
            if (itemCmp.action) {
                var handler = itemCmp.handler; // save configured handler
                this.handler = function(view, rowIdx, colIdx, item, e, record, row) {
                    view.up('grid').fireEventArgs(item.action, arguments);
                    handler && handler.apply(itemCmp, arguments);
                };
            }
        });
    }
});
Ext.define('SIPAS.override.form.field.Trigger', {
    override: 'Ext.form.field.Trigger',
    initComponent: function() {
        var me = this;
        if (me.xtype == 'triggerfield') {
            Ext.apply(me, {
                hiddenValue: undefined,
                getHiddenValue: function() {
                    return me.hiddenValue;
                },
                setHiddenValue: function(hiddenValue) {
                    me.hiddenValue = hiddenValue;
                },
                onTriggerClick: function(e) {
                    this.fireEvent("triggerclick", me, e);
                }
            });
        }
        me.callParent(arguments);
    }
});
Ext.define('SIPAS.override.form.HtmlEditor',{
    override: 'Ext.form.HtmlEditor',
    getSelectedText: function(clip){
        var doc = this.getDoc(), selDocFrag;
        var txt = '', hasHTML = false, selNodes = [], ret, html = '';
        if (this.win.getSelection || doc.getSelection) {
            // FF, Chrome, Safari
            var sel = this.win.getSelection();
            if (!sel) {
                sel = doc.getSelection();
            }
            if (clip) {
                selDocFrag = sel.getRangeAt(0).extractContents();
            } else {
                selDocFrag = this.win.getSelection().getRangeAt(0).cloneContents();
            }
            Ext.each(selDocFrag.childNodes, function(n){
                if (n.nodeType !== 3) {
                    hasHTML = true;
                }
            });
            if (hasHTML) {
                var div = document.createElement('div');
                div.appendChild(selDocFrag);
                html = div.innerHTML;
                txt = this.win.getSelection() + '';
            } else {
                html = txt = selDocFrag.textContent;
            }
            ret = {
                textContent: txt,
                hasHTML: hasHTML,
                html: html
            };
        } else if (doc.selection) {
            // IE
            this.win.focus();
            txt = doc.selection.createRange();
            if (txt.text !== txt.htmlText) {
                hasHTML = true;
            }
            ret = {
                textContent: txt.text,
                hasHTML: hasHTML,
                html: txt.htmlText
            };
        } else {
            return {
                textContent: ''
            };
        }

        return ret;
    }
});
Ext.define('SIPAS.override.grid.Panel', {
    override: 'Ext.grid.Panel',
    load: function() {
        var me = this, store = me.getStore();
        return store && Ext.callback(store.load, store, arguments);
    },
    reload: function() {
        var me = this, store = me.getStore();
        return store && Ext.callback(store.reload, store, arguments);
    },
    getSelection: function(){
        var me = this;
        return me.getSelectionModel().getSelection();
    },
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            filterHeader: function(filterheader, autoload) {
                var filters_plugin = filterheader.up('gridpanel').filters;
                var filter = filters_plugin.getFilter(filterheader.up('gridcolumn').dataIndex) || filters_plugin.addFilter({
                    dataIndex: filterheader.up('gridcolumn').dataIndex,
                    value: filterheader.value
                });
                filter.setValue(filterheader.value);
                filter.setActive(!(Ext.isEmpty(filterheader.getValue()) || (Ext.Object.isEmpty(filterheader.getValue()))));
                if (autoload) {
                    filters_plugin.reload();
                }
            }
        });
        me.callParent(arguments);
    }
});