define(['underscore', 'view', 'utils'], function (_, view, utils) {
    //'use strict';    
	
    function getSubGameInfo(position) {
        var row = utils.game.getRow(position),
            column = utils.game.getColumn(position),
            id = utils.game.positionToID(position),
            domain = view.getDomain(position);
        return {
            position: position,
            row: row,
            column: column,
            id: id,
            domain: domain
        };
    }
    
    function render() {
        view.renderSubGame(this.subGameInfo);
    }

	/**
     * @constructor SubGame - the returned function is the value of the SubGame module, thus calling it as 'new SubGame(0) creates a new instance of the SubGame constructor with position 0
     * 
     * @param {number, 0-8} position - discerns which subGame the instance corresponds to where top left board is 0, top right is 2, middle center is 4, bottom center is 7.
     */
	return function (position) {
		var subGameInfo = getSubGameInfo(position); // returns object with position (0-8), row#, column#, and id (like: r2c3)

		// private {array} boardStatus - stores the state of this subGame at each position, either null (not played), 'x', or 'o'
		var subGameStatus = {
            boardMap: [
			    [null,null,null],
			    [null,null,null],
                [null,null,null]
            ],
            isWon: false,
            winner: null
        };

        function getSubGameWinState() {
            return {
                isWon: subGameStatus.isWon,
                winner: subGameStatus.winner
            }
        }
        
        function getSquareState(squareInfo) {
            var square = subGameStatus.boardMap[squareInfo.row - 1][squareInfo.column - 1];
            
            var squareState = {
                occupant: square,
                isOccupied: null //bool
            };

            if (square == null) {
                squareState.isOccupied = false;
            } else {
                squareState.isOccupied = true;
            }

            return squareState;
        }

        function updateSquareState(player, squareInfo) {
            subGameStatus.boardMap[squareInfo.row - 1][squareInfo.column - 1] = player;

        }
		
		return {
			subGameInfo: subGameInfo,
            render: render,
            winState: getSubGameWinState,
            squareState: getSquareState,
            updateSquareState: updateSquareState
		}
	}
});
