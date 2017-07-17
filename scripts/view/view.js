define(['underscore', 'render', 'utils'], function (_, render, utils) {
    //'use strict';
    
    function renderGame() {
        renderComponent('borders');

        render.initGameObjects();
    }
    
    function renderComponent(component, callerArgs) {
        var components = utils.util.getObjectMethodNames(render.components);
        
        if (_(components).contains(component)) {
            render.components[component](callerArgs);
        } else {
            throw 'Error: component method render.' + component + '() not recognized as a method of render.';
        }
    }

    /**
     * 
     * @param {string} player - x or o
     * @param {Object literal} subGameInfo - subGameInfo object 
     * @param {Object literal} squareInfo - squareInfo object
     */
    function renderMove(player, subGameInfo, squareInfo) {
        if (player === 'x' || player === 'o') {
            render.renderGameObject(player, subGameInfo, squareInfo);
        } else {
            throw "Error: view.renderMove method was called with invalid argument: " + player + " as player.";
        }
    }

    /**
     * @func getDomain takes position, gets the "domain" from render.js, which contains the minimum and maximum x and y coordinates of subGame at {position}.   
     * 
     * @param {number} position - discerns which subGame 
     */
    function getDomain(position) {
        var row = utils.game.getRow(position),
            column = utils.game.getColumn(position);

        return render.getDomain(row, column);
    }
    
    return {
        getDomain: getDomain,
        renderGame: renderGame,
        renderSubGame: _(renderComponent).partial('subGame'), // binds 'subGame' as argument
        renderMove: renderMove,
        initGameObjects: render.initGameObjects
    }
});
