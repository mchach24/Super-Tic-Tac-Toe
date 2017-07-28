define(['controller'], function (controller) {
    
    $('.gameSVG_subGame-square').on('click', function () {
        var id = $(this).attr('id');
        controller.subGameSquareClicked(id);
    });
    

});