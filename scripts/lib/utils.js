define(['underscore'], function (_) {
    
    function getObjectMethodNames(obj) {
        var methods = [];
        
        _(obj).each(function (value, key) {
            if (_(value).isFunction() === true) 
                methods.push(key);
        });
        
        return methods; 
    }
    
    /** 
     * @Func getRow returns the calculated value of row based on position
     */
    function getRow(position) {
        return Math.floor(position / 3) + 1;
    }
    
    /** 
     * @Func getColumn returns the calculated value of column based on position
     */
    function getColumn(position) {
        return (position % 3) + 1;
    }
    
    /**
     * @Func getRowFromID returns the numeric value that comes after 'r' in an ID
     */
    function getRowFromID(id) {
        if (/subGame/.test(id) && /square/.test(id)) { // if ID contains both subGame and square,
            throw "Error: getRowFromID requires an id consisting only of the row-column values for one of subGame or subGame-square";
        } else {
            return parseInt(id.match(/r[1-3]/)[0].substr(1,1)); // returns just the number following 'r'
        }
    }
    
    /**
     * @Func getColumnFromID returns the numeric value that comes after 'c' in an ID
     */
    function getColumnFromID(id) {
        if (/subGame/.test(id) && /square/.test(id)) { // if ID contains both subGame and square,
            throw "Error: getColumnFromID requires an id consisting only of the row-column values for one of subGame or subGame-square";
        } else {
            return parseInt(id.match(/c[1-3]/)[0].substr(1,1)); // returns just the number following 'c'
        }
    }
    
    /**
     * @Func positonToID - returns ID, such as r2c1, based on argument of position, such as 3
     * 
     * @param {number} position - 0-8, corresponds to subGame or subGame-square
     */
    function positionToID(position) {
        var row = getRow(position),
            column = getColumn(position);
        var ID = 'r' + row + 'c' + column;
        
        return ID;
    }
    
    /**
     * @Func IDtoPosition - returns a position, a number between 0 and 8, based on inputted id ('r3c1')
     *
     * @param {string} id - id of either a subGame or subGame-square in the format of 'r1c1'
     */
    function IDtoPosition(id) {
        var row = getRowFromID(id),
            column = getColumnFromID(id);
        
        var position = (3 * (row - 1) + column) - 1;
        
        return position;
    }
    
    function getSubGameFromID(fullID) {
        console.log(fullID);
        var subGameID = fullID.match(/subGame_r[1-3]c[1-3]/)[0]; // match returns object, prop '0' is matching string
        var row = getRowFromID(subGameID), // get just the number, without the 'r'
            column = getColumnFromID(subGameID);
        var position = IDtoPosition('r' + row + 'c' + column);
        return {
            id: subGameID,
            row: row,
            column: column,
            position: position
        };
    }
    
    function getSquareFromID(fullID) {
        var squareID = fullID.match(/square_r[1-3]c[1-3]/)[0]; // match returns object, prop '0' is matching string
        var row = getRowFromID(squareID), // get just the number, without the 'r'
            column = getColumnFromID(squareID);
        var position = IDtoPosition('r' + row + 'c' + column);
        return {
            id: squareID,
            row: row,
            column: column,
            position: position
        };
    }
    
    return {
        util: {
            getObjectMethodNames: getObjectMethodNames
        },
        game: {
            positionToID: positionToID,
            IDtoPosition: IDtoPosition,
            
            getRow: getRow,
            getColumn: getColumn,
            
            getRowFromID: getRowFromID,
            getColumnFromID: getColumnFromID,
            
            getSubGameInfoFromID: getSubGameFromID,
            getSquareInfoFromID: getSquareFromID
        }
    }
});
