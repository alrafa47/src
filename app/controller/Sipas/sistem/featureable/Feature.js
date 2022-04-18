Ext.define('SIPAS.controller.Sipas.sistem.featureable.Feature', function(){
    
    var featureCollection = null;

    var updateFeatureCollection = function(collection)
    {
        var $this = this,
            validateVal = function(val) {
                result = Boolean(val);
                if (Ext.isString(val)) {
                    result = !Ext.isEmpty(val) && !Ext.Array.contains(['null', '0', 'undefined', 'false'], val.toLowerCase())
                }
                if (Ext.isNumber(val)) {
                    result = Boolean(val)
                }
                if (Ext.isObject(val) || Ext.isArray(val)) {
                    result = !Ext.Object.isEmpty(val)
                }
                return result;
            },
            applyFeatureCollection = function(features, purge)
            {
                var f = getFeatures();

                if(purge === true) f.removeAll();

                Ext.Object.each(features || {}, function(key, value) {
                    f.add(key, validateVal(value));
                });
            };

        // if(!collection)
        // {
        //     getRules().removeAll();
        // }
        if (Ext.isArray(collection))
        {
            var collectionObj = {}
            Ext.Array.each(collection, function(v, i, all){
                collectionObj[v] = true;
            });
            collection = collectionObj;
        }

        if (Ext.isObject(collection))
        {
            applyFeatureCollection(collection);
        }
    }

    var getFeatures = function()
    {
        return (featureCollection = featureCollection || Ext.create('Ext.util.MixedCollection'));
    };

return {
	extend: 'SIPAS.controller.Sipas.base.Base',

	init: function(application) 
    {
        var $this = this;
        Ext.apply(application, {
            Feature: function(){
                return $this;
            }
        });
    },

    initFeatures: function(callback, scope)
    {
        callback = callback || Ext.emptyFn;
        scope = scope || this;

        var $app = this.getApplication();

        updateFeatureCollection($app.getMetadata('feature'));
        Ext.callback(callback, scope, [getFeatures(), this]);
    },

    getFeatureAccess: function(featureName)
    {
        return getFeatures().get(featureName);
    }

};
});