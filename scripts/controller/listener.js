define(['controller'], function (controller) {
    
    $('.gameSVG_subGame-square').on('click', function () {
        var id = $(this).attr('id');
        controller.subGameSquareClicked(id);
    });
    
    $('.btn_play-again').on('click', function () {
        controller.startNewGame();
    });

});