define(['underscore', 'SubGame', 'view', 'utils'], function (_, SubGame, view, utils) {
    //'use strict';
    
    var subGames; // array
    var turn = {
        player: null, // set later
        nextTurn: function () {
            if (this.player === 'x') this.player = 'o';
            else this.player = 'x';
        }
    }
    
    function initSubGames() {
        // this function returns an array of SubGame instances: one for each position
        
        var subGames = _([0, 1, 2, 3, 4, 5, 6, 7, 8]).map(function (value) { return new SubGame(value) }); // maps SubGame(val) to each index
        
		return subGames;
	}
    
    function getSubGame(position) {
        if (position >= 0 && position <= 8) {
            return subGames[position];
        } else throw "Error: getSubGame() requires a position parameter between 0 and 8";
    }
    
    function getPropertyOfSubgame(position, prop) {
        var subGameAtPos = getSubGame(position);
        if (_(subGameAtPos).has(prop)) return subGameAtPos[prop];
    }
    
    function getPropertyOfSubGames(prop) {
        var subGamesWithProp = _(subGames).map(function (subGame) {
            return getPropertyOfSubgame(subGame.subGameInfo.position, prop);
        });
        
        return subGamesWithProp;
    }
    
    function render() {         
        _(subGames).each(function (value) {
            var subGame = value;
            
            subGame.render();
        });
        
        view.renderGame();
    }

    function isValidMove(subGame, squareInfo) {
        var subGameIsWon = subGame.winState().isWon,
            squareIsOccupied = subGame.squareState(squareInfo).isOccupied;

        if (subGameIsWon || squareIsOccupied) {
            return false; // move is not valid if the subGame has already been won or if a move has already been played at that square in the subGame
        } else {
            return true;
        }
    }
    
    /**
     * @func moveHandler
     * 
     * @param {*} ids 
     */
    function moveHandler(ids) {
        var subGameID = ids.subGameID,
            squareID = ids.squareID;
        
        var subGamePosition = utils.game.IDtoPosition(subGameID);
        var subGame = subGames[subGamePosition];
        var subGameInfo = subGame.subGameInfo;

        var squarePosition = utils.game.IDtoPosition(squareID);
        var squareInfo = {
            position: utils.game.IDtoPosition(squareID),
            row: utils.game.getRowFromID(squareID),
            column: utils.game.getColumnFromID(squareID),
            id: squareID
        }

        if (isValidMove(subGame, squareInfo)) {
            view.renderMove(turn.player, subGameInfo, squareInfo); // hard-coded x is temporary

            subGame.updateSquareState(turn.player, squareInfo);

            turn.nextTurn();
        }
    }
    
    /**
     * @constructor Game - this is the constructor for Game, which is instantiated once by controller
     */
	return function () {
		subGames = initSubGames(); // returns array of instances; renders subGames
        
        render();

        turn.player = 'x';
        
        return {
            playMove: moveHandler
        }
	};
});
