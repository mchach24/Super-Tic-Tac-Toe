define(['utils'], function (utils) {

    /**
     * @module winCheck - provides methods for both mainGame and subGame to check for wins in their respective subGames or squares
     */

    var boardMap;

    function getElement(row, column) {
        return boardMap[row - 1][column - 1];
    }

    /**
     * @method getSquaresOfBoardMap - gets multiple squares from boardMap
     * 
     * @param {...Object} identification - objects containing row and column properties.  old: identification to be passed to getSquareOfBoardMap
     */
    function getElements(identification) {
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
                    var square = getElement(row, column);
                    squares.push(square);
                }
            } else if (identification.column && !identification.row) {
                var column = identification.column;
                for (var row = 1; row <= 3; row++) {
                    var square = getElement(row, column);
                    squares.push(square);
                }
            } else {
                return getElement(identification.row, identification.column);
            }
        } else {
            for (identification in identifications) {
                identification = identifications[identification];
                var row = identification.row,
                    column = identification.column;
                var square = getElement(row, column);
                squares.push(square);
            }
        }
    
        return squares;
    }

    /**
     * @param {number, 1-3} row 
     */
    function getRow(row) {
        var squares = getElements({ 'row': row });
        return squares;
    }

    function getColumn(column) {
        var squares = getElements({ 'column': column });
        return squares;
    }

    function getDiagonal(columnStart) {
        var squares;
        if (columnStart === 1) {
            squares = getElements({
                row: 1, column: 1
            }, {
                row: 2, column: 2
            }, {
                row: 3, column: 3
            });
        } else if (columnStart === 3) {
            squares = getElements({
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
        } else return false;
    }


    function checkWin(boardMapArray) {
        boardMap = boardMapArray;

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
            return winner;
        }
    }
    
    return {
        check: checkWin
    }
});
