define(['underscore', 'snapsvg', 'render'], function (_, Snap, render) {
    //'use strict';
    
    _.mixin({
        getObjectMethodNames: function (obj) {
            var methods = [];
            
            _(obj).each(function (value, key) {
                if (_(value).isFunction() === true) 
                    methods.push(key);
            });
            
            return methods;
        } 
    });
    
    function renderGame() {
        renderComponent('borders');
        
        // do other stuff if needed
    }
    
    function renderComponent(component, callerArgs) {
        var renderMethods = _(render).getObjectMethodNames();
        
        if (_(renderMethods).contains(component)) {
            render[component](callerArgs);
        } else {
            throw 'Error: component method render.' + component + '() not recognized as a method of render.';
        }
    }
    
    return {
        renderGame: renderGame,
        renderSubGame: _(renderComponent).partial('subGame') // binds 'subGame' as argument
    }
});
