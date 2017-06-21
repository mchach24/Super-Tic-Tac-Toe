// this file is the data-main entry point for require js

requirejs.config({
    baseUrl: './lib/',
    shim: {
        'bootstrap': {
            deps: ['jquery'] 
        }
    },
    paths: {
        'jquery': "./jquery_3.2.1/jquery-3.2.1.min",
        'bootstrap': "./bootstrap_3.3.7/js/bootstrap.min",
		'snapsvg': "./snap.svg_0.5.1/snap.svg-min"
    }
});

requirejs(['jquery', 'snapsvg', 'bootstrap'], function($, Snap) {
    var gameSVG = Snap('#gameSVG');
});