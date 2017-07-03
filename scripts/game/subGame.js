define(['underscore', 'view'], function (_, view) {
    //'use strict';    
	
    /* map for subGames to get subGameInfo, essentially identification */
    var positionDictionary = _({
			0: { position: 0, row: 1, column: 1, id: '' },
			1: { position: 1, row: 1, column: 2, id: '' },
			2: { position: 2, row: 1, column: 3, id: '' },
			3: { position: 3, row: 2, column: 1, id: '' },
			4: { position: 4, row: 2, column: 2, id: '' },
			5: { position: 5, row: 2, column: 3, id: '' },
			6: { position: 6, row: 3, column: 1, id: '' },
			7: { position: 7, row: 3, column: 2, id: '' },
			8: { position: 8, row: 3, column: 3, id: '' }
    }).each(function (key) { key['id'] = 'r' + key.row + 'c' + key.column; }); // takes row and column and formats it into a string, like so: r2c3 for position = 5
    
	function getBoardInfo(position) {
		// returns an object in positionDictionary based on 
		return positionDictionary[position];
	}
    
    function render() {
        view.renderSubGame(this.subGameInfo);
    }
    
	
	/**
     * @param {number, 0-8} position - discerns which subGame the instance corresponds to where top left board is 0, top right is 2, middle center is 4, bottom center is 7.
     */
	return function (position) {
		var subGameInfo = getBoardInfo(position); // stores position (0-8), row#, column#, and id (like: r2c3)
		
		// private {array} boardStatus - stores the state of this subGame at each position, either null (not played), 'x', or 'o'
		var subGameStatus = [
			[null,null,null],
			[null,null,null],
			[null,null,null]
		];
		
		return {
			subGameInfo: subGameInfo,
            render: render
		}
	}
});
