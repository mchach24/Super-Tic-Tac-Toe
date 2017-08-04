define(['underscore', 'jquery', 'render', 'utils'], function (_, $, render, utils) {
    
    $('[data-toggle="tooltip"]').tooltip();
    
    function renderGame() {
        renderComponent('borders');

        render.initGameObjects();
    }
    
    function renderComponent(component, callerArgs) {
        var components = utils.getObjectMethodNames(render.components);
        
        if (_(components).contains(component)) {
            render.components[component](callerArgs);
        } else {
            throw 'Error: component method render.' + component + '() not recognized as a method of render.';
        }
    }

    /**
     * @param {string} player - x or o
     * @param {Object} subGameInfo - subGameInfo object 
     * @param {Object} squareInfo - squareInfo object
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

    function displayGameWinner(winner) {
        $('#span_winner').text(winner.toUpperCase());
        $('#modal_win-display').modal('show');
    }

    function updateTurn(player) {
        $('.is-turn').removeClass('is-turn');
        $('#turn-' + player).addClass('is-turn');

        $('#turn-display').attr('title', 'It\'s player ' + player + '\'s turn')
                            .tooltip('fixTitle')
                            .tooltip('show');

        /*if (player === "x") {
            $('#turn-x').addClass('is-turn');
            $('#turn-o').removeClass('is-turn');

            $('#turn-display').attr('title', 'It\'s player X\'s turn')
                            .tooltip('fixTitle')
                            .tooltip('show');
        } else {
            $('#turn-o').addClass('is-turn');
            $('#turn-x').removeClass('is-turn');

            $('#turn-display').attr('title', 'It\'s player O\'s turn')
                            .tooltip('fixTitle')
                            .tooltip('show');
        }*/
    }
    
    return {
        clearGame: render.clearGameObjects,
        initGameObjects: render.initGameObjects,
        getDomain: getDomain,

        renderGame: renderGame,
        renderSubGame: _(renderComponent).partial('subGame'), // binds 'subGame' as argument
        renderMove: renderMove,

        // subGame logic-related view methods
        disableSubGame: render.disableSubGame,
        enableSubGame: render.enableSubGame,
        renderSubGameWin: render.renderSubGameWin,

        // mainGame logic-related view methods
        renderGameWin: render.renderGameWin,
        displayWinner: displayGameWinner,
        updateTurn: updateTurn
    }
});
