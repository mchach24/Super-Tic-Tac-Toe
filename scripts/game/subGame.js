define(['underscore', 'jquery', 'view', 'utils'], function (_, $, view, utils) {
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
                    /**
                     * @method getSquaresOfBoardMap - gets multiple squares from boardMap
                     * 
                     * @param {...Object} identification - objects containing row and column properties.  old: identification to be passed to getSquareOfBoardMap
                     */
                    getSquares: function (identification) {
                        var args = _(arguments).toArray();
                        var len = args.length,
                            squares = [];

                        var identifications = (function () {
                            var identifications = [];
                            for ( var i = 0; i < len; i++ ) {
                                var el = args[i];
                                if (typeof el === 'object') {
                                    identifications.push(el);
                                }
                            }
                        
                            return identifications;
                        })();
                    
                        if (identifications.length === 1) {
                            var identification = identifications[0];
                            if (identification.row && !identification.column) { // XOR: if only one of these properties are supplied
                                var row = identification.row;
                                for (var column = 1; column <= 3; column++) {
                                    var square = this.getSquare(row, column);
                                    squares.push(square);
                                }
                            } else if (identification.column && !identification.row) {
                                var column = identification.column;
                                for (var row = 1; row <= 3; row++) {
                                    var square = this.getSquare(row, column);
                                    squares.push(square);
                                }
                            } else {
                                return this.getSquare(identification.row, identification.column);
                            }
                        } else {
                            for (identification in identifications) {
                                identification = identifications[identification];
                                var row = identification.row,
                                    column = identification.column;
                                var square = this.getSquare(row, column);
                                squares.push(square);
                            }
                        }
                    
                        return squares;
                    },
                    setSquare: function (row, column, player) {
                        boardMap[row - 1][column - 1] = player;
                    }
                },
                setWinner: function (player) {
                    isWon = true,
                    winner = player;
                },
                getWinState: function () {
                    return {
                        isWon: isWon,
                        winner: winner
                    };
                },
                disable: function () {
                    disabled = true;
                    
                    view.disableSubGame(subGameInfo.position);
                },
                enable: function () {
                    disabled = false;

                    view.enableSubGame(subGameInfo.position);
                },
                isDisabled: function () {
                    return disabled;
                }
            }
        })();

        /**
         * 
         * @param {number, 1-3} row 
         */
        function getRow(row) {
            var squares = subGame.boardMap.getSquares({ 'row': row });

            return squares;
        }

        function getColumn(column) {
            var squares = subGame.boardMap.getSquares({ 'column': column });

            return squares;
        }

        function getDiagonal(columnStart) {
            var squares;
            if (columnStart === 1) {
                squares = subGame.boardMap.getSquares({
                    row: 1, column: 1
                }, {
                    row: 2, column: 2
                }, {
                    row: 3, column: 3
                });
            } else if (columnStart === 3) {
                squares = subGame.boardMap.getSquares({
                    row: 1, column: 3
                }, {
                    row: 2, column: 2
                }, {
                    row: 3, column: 1
                });
            } else {
                throw "Error: columnStart must be 1 or 3";
            }

            return squares;
        }

        function sectionIsWon(type, arg) {
            switch (type) {
                case 'row': 
                    var squares = getRow(arg);
                    break;
                case 'column':
                    var squares = getColumn(arg);
                    break;
                case 'diagonal':
                    var squares = getDiagonal(arg);
                    break;
                default: 
                    throw "Error: section type " + type + " not recognized.";
            }

            if (utils.arrayElementsAreEqual(squares)) {
                var winner = squares[0];
                return winner;
            }

            return false;
        }

        function checkWin() {
            var possibleWins = [
                sectionIsWon('row', 1),
                sectionIsWon('row', 2),
                sectionIsWon('row', 3),
                sectionIsWon('column', 1),
                sectionIsWon('column', 2),
                sectionIsWon('column', 3),
                sectionIsWon('diagonal', 1),
                sectionIsWon('diagonal', 3)
            ];

            var winner = _(possibleWins).find(function (value) { return value !== false; });

            if (!winner) {
                return;
            } else {
                subGame.setWinner(winner);
            }
        }
        
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

            checkWin();
        }
		
		return {
			subGameInfo: subGameInfo,
            render: render,
            winState: subGame.getWinState,
            isDisabled: subGame.isDisabled,
            squareState: getSquareState,
            updateSquare: updateSquareState,
            disable: subGame.disable,
            enable: subGame.enable
		}
	}
});
