define(['Game', 'utils'], function (Game, utils) {
    
    var game = new Game();

    /**
     * 
     * @param {string} id - HTML id attribute of the <rect>, representing a subGame-square, that was clicked. 
     * @example id would follow the format of "subGame-r1c1_square-r1c1"
     */
    function subGameSquareClicked(id) {
        var separateIDs = utils.game.getSeparateIDs(id); // object containing separated IDs, like so: { subGameID: "r[1-3]c[1-3]", squareID: "r[1-3]c[1-3]"}
        
        game.playMove(separateIDs);
    }

    function restartGame() {
        game.restart();
    }
    
    return {
        subGameSquareClicked: subGameSquareClicked,
        startNewGame: restartGame
    }
});