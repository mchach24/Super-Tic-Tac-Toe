define(['underscore', 'render', 'utils'], function (_, render, utils) {
    //'use strict';
    
    function renderGame() {
        renderComponent('borders');
        
        // do other stuff if needed
    }
    
    function renderComponent(component, callerArgs) {
        var renderMethods = utils.util.getObjectMethodNames(render);
        
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
