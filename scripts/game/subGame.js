define(['underscore', 'view', 'utils'], function (_, view, Utils) {
    //'use strict';    
	
    function getSubGameInfo(position) {
        var row = Utils.game.getRow(position),
            column = Utils.game.getColumn(position);
        return {
            position: position,
            row: row,
            column: column,
            id: Utils.game.positionToID(position)
        };
    }
    
    function render() {
        view.renderSubGame(this.subGameInfo);
    }
    
    function setDomain(domain) {
        // add prop of subGameInfo 'domain' and set it to the argumented parameter, supplied from render.js.
        
        // subGame is not visible to render.js, so maybe scrap this strategy once there
    }

	/**
     * @param {number, 0-8} position - discerns which subGame the instance corresponds to where top left board is 0, top right is 2, middle center is 4, bottom center is 7.
     */
	return function (position) {
		var subGameInfo = getSubGameInfo(position); // returns object with position (0-8), row#, column#, and id (like: r2c3)
		
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
