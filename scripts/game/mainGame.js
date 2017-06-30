define(['underscore', 'SubGame', 'view'], function (_, SubGame, view) {
    //'use strict';
    
    var subGames;
    
    function initSubGames() {
        // this function returns an array of SubGames: one for each position
        
        subGames = _([0, 1, 2, 3, 4, 5, 6, 7, 8]).map(function (value) { return new SubGame(value) }); // maps SubGame(val) to each index
        
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
        
        console.log(subGamesWithProp);
        
        return subGamesWithProp;
    }
    
    function render() {         
        _(subGames).each(function (value) {
            var subGame = value;
            
            subGame.render();
        });
        
        view.renderGame();
    }
    
	return function () {
		subGames = initSubGames(); // returns array of instances; renders subGames
        
        render();
	};
});