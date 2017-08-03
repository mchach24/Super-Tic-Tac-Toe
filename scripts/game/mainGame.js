define(['underscore', 'SubGame', 'view', 'winCheck', 'utils'], function (_, SubGame, view, winCheck, utils) {
    //'use strict';
    
    var subGames = [],
        turn = {
            player: null, // set later
            nextTurn: function () {
                if (this.player === 'x') this.player = 'o';
                else this.player = 'x';

                view.updateTurn(this.player);
            }
        },
        gameOver;
    
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
        renderSubGames();
        
        view.renderGame();
    }

    function renderSubGames() {
        _(subGames).each(function (value) {
            var subGame = value;
            
            subGame.render();
        });
    }

    function isValidMove(subGame, squareInfo) {
        var subGameIsWon = subGame.isWon(),
            subGameIsDisabled = subGame.isDisabled(),
            squareIsOccupied = subGame.squareState(squareInfo).isOccupied;

        //console.log(subGameIsWon, subGameIsDisabled, squareIsOccupied);

        if (subGameIsWon || squareIsOccupied || subGameIsDisabled) {
            return false; // move is not valid if the subGame has already been won or if a move has already been played at that square in the subGame
        } else {
            return true;
        }
    }
    
    /**
     * @func moveHandler
     * 
     * @param {Object} ids - contains subGameID and squareID of square that was clicked.
     */
    function moveHandler(ids) {
        if (gameOver) return;

        var subGameID = ids.subGameID,
            squareID = ids.squareID;
        
        var subGamePosition = utils.game.IDtoPosition(subGameID);
        var subGame = getSubGame(subGamePosition);
        var subGameInfo = subGame.subGameInfo;

        var squarePosition = utils.game.IDtoPosition(squareID);
        var squareInfo = {
            position: utils.game.IDtoPosition(squareID),
            row: utils.game.getRowFromID(squareID),
            column: utils.game.getColumnFromID(squareID),
            id: squareID
        }

        if (isValidMove(subGame, squareInfo)) {
            view.renderMove(turn.player, subGameInfo, squareInfo);

            subGame.updateSquare(turn.player, squareInfo.row, squareInfo.column);

            checkWin();

            disableAllSubGamesExcept(squareInfo.position);

            turn.nextTurn();
        }
    }

    /**
     * @func checkWin - checks whether 3 subGames in either a row, column, or digonal have been won, using winCheck module
     */
    function checkWin() {
        var boardMap = (function () {
            /* flat array of winners of every SubGame */
            var subGameWins = _(getPropertyOfSubGames('getWinner')).map(function (getWinner) { 
                return getWinner();
            });

            /* nested array of winners of every SubGame, nested at every new row */
            var nestedSubGameWinMap = _(subGameWins).groupBy(function (placehldr, index) {
                return Math.floor(index / 3);
            });
            
            return nestedSubGameWinMap;
        })();

        var gameWinner = winCheck.check(boardMap);

        if (gameWinner) {
            view.displayWinner(gameWinner);
            gameOver = true;
        }
    }

    /**
     * @func disableAllSubGamesExcept - prevents moves from being made in every subGame except for one
     * 
     * @param {number} positionToNotBeDisabled 
     * 
     * @example when a move is played in square r2c3 in any subGame, the only subGame that is still enabled for the next player is subGame r2c3
     */
    function disableAllSubGamesExcept(positionToNotBeDisabled) {
        if (gameOver) {
            disableAllSubGames();
        } else if (getSubGame(positionToNotBeDisabled).isWon()) { // if the subGame that is supposed to be enabled is already won, enable all other subGames that aren't already won
            _(subGames).each(function (subGame) {
                if (!subGame.isWon()) {
                    subGame.enable();
                }
            });
        } else { // default case: if the subGame is not won, disable all subGames except for it
            _(subGames).each(function (subGame, position) {
                if (position !== positionToNotBeDisabled) {
                    subGame.disable();
                } else {
                    subGame.enable();
                }
            });
        }
    }

    function disableAllSubGames() {
        _(subGames).each(function (subGame) {
            subGame.disable();
        });
    }

    function enableAllSubGames() {
        _(subGames).each(function (subGame) {
            subGame.enable();
        });
    }

    function restartGame() {
        view.clearGame();

        gameOver = false;

        turn.player = 'x';

        subGames = initSubGames();

        enableAllSubGames();
    }
    
    /**
     * @constructor Game - this is the constructor for Game, which is instantiated once by controller
     */
	return function () {
        gameOver = false;

        turn.player = 'x';
        
		subGames = initSubGames(); // returns array of instances; renders subGames
    
        render();
        
        return {
            playMove: moveHandler,
            restart: restartGame
        }
	};
});
