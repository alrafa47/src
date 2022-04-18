Ext.define('Ext.ux.modular.Winmodule', function() {
    
    var modules = {};

    return {
        singleton: true,

        constructor : function () {
            if (!modules) {
                modules = [];
            }
        },
        createModule : function (config) {
            Ext.applyIf(config, {
                name : null,
                module : null,
                children : []
            })
            modules.push(config);
        },
        getModuleByName : function (module_name) {
            for (i in modules) {
                if (modules[i].name == module_name) {
                    return modules[i];
                }
            }
        },
        getModuleByInstance : function (module_instance) {
            for (i in modules) {
                if (modules[i] == module_instance) {
                    return module;
                }
            }
        },
        getModule : function (module_search) {
            if (typeof module_search == 'string') {
                return getModuleByName(module_search);
            } else if (typeof module_search == 'object') {
                return getModuleByInstance(module_search);
            } else {
                return modules;
            }
        },
        closeModule : function (module_name) {
            if (module = this.getModuleByName(module_name)) {
                module.module.close();
                delete module;
            }
        },
        closeAllModule : function () {
            for (i in modules) {
                if (modules[i].module.hasOwnProperty('close') && typeof modules[i].module.close == 'function') {
                    modules[i].module.close();
                }
            }
        }
    }
});