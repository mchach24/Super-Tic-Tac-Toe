define(['controller'], function (controller) {
    
    $('.gameSVG_subGame-square').on('click', function () {
        var id = $(this).attr('id');
        controller.subGameSquareClicked(id);
    });
    
    $('.btn_play-again').on('click', function () {
        controller.startNewGame();
    });

    $('.navbar-toggle').on('click', function () {

        if ($(this).hasClass('collapsed')) {
            $('#gameSVG').css('top', '55%');
        } else {
            $('#gameSVG').css('top', '50%');
        }
    });

});