define(['controller'], function (controller) {
    
    $('.gameSVG_subGame-square').on('click', function () {
        var id = $(this).attr('id');
        controller.subGameSquareClicked(id);
    });
    
    
    /*var events = {
        // format: "queryElement: { onevent, trigger}"
        '.gameSVG_subGame-square': { onevent: 'click', trigger: controller.subGameSquareClicked }
    };
    
    _(events).each(function (value, key) {
        
        var el = key,
            onevent = value.onevent,
            trigger = value.trigger;
        
        $(el).on(onevent, trigger);
    });*/
});