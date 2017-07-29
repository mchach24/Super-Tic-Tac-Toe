define(['underscore', 'jquery', 'view', 'winCheck', 'utils'], function (_, $, view, winCheck, utils) {
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

        var subGame = (function () {
            var boardMap = [
                    [null, null, null],
                    [null, null, null],
                    [null, null, null]
                ],
                isWon = false,
                winner = null,
                disabled = false;
                
            return {
                boardMap: {
                    /**
                     * add these "get" and "set" functions for boardMap to its prototype
                     * 
                     * @method getSquareOfBoardMap - returns the square from the boardMap, based on row and column
                     * 
                     * @param {number} row - row#, 1-3
                     * @param {number} column - column#, 1-3
                     */
                    getSquare: function (row, column) {
                        return boardMap[row - 1][column - 1];
                    },
                    setSquare: function (row, column, player) {
                        boardMap[row - 1][column - 1] = player;
                    }
                },
                setWinner: function (player) {
                    isWon = true,
                    winner = player;

                    view.renderWin(subGameInfo, player);
                    view.disableSubGame(subGameInfo.position);
                },
                getWinner: function () {
                    return winner;
                },
                checkWin: function () {
                    var winner = winCheck.check(boardMap);
                    if (winner) {
                        this.setWinner(winner);
                    }
                },
                isWon: function () {
                    return isWon;
                },
                disable: function () {
                    disabled = true;
                    
                    view.disableSubGame(subGameInfo.position);
                },
                enable: function () {
                    if (!isWon) {
                        disabled = false;

                        view.enableSubGame(subGameInfo.position);
                    }
                },
                isDisabled: function () {
                    return disabled;
                }
            }
        })();
        
        function getSquareState(squareInfo) {
            var square = subGame.boardMap.getSquare(squareInfo.row, squareInfo.column);
            
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

        function updateSquareState(player, row, column) {
            subGame.boardMap.setSquare(row, column, player);

            subGame.checkWin();
        }
		
		return {
            subGameInfo: subGameInfo,
            
            // methods:
            render: render,

            isWon: subGame.isWon,
            getWinner: subGame.getWinner,

            squareState: getSquareState,
            updateSquare: updateSquareState,

            disable: subGame.disable,
            enable: subGame.enable,
            isDisabled: subGame.isDisabled
		}
	}
});
