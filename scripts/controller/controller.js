define(['Game', 'utils'], function (Game, utils) {
    
    var game = new Game();
    
    function subGameSquareClicked(id) {
        var subGame = utils.game.getSubGameInfoFromID(id),                  
            square = utils.game.getSquareInfoFromID(id);
        
        game.playMove(subGame.id, square.id);
    }
    
    return {
        subGameSquareClicked: subGameSquareClicked
    }
});