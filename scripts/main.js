// this file is the data-main entry point for require js

requirejs.config({
    baseUrl: 'scripts/',
    shim: {
        'bootstrap': {
            deps: ['jQuery'] 
        }
    },
    paths: {
		// lib/
        'jQuery': "../lib/jquery_3.2.1/jquery-3.2.1.min",
        'bootstrap': "../lib/bootstrap_3.3.7/js/bootstrap.min",
		'snapsvg': "../lib/snap.svg_0.5.1/snap.svg-min",
		'underscore': "../lib/underscore.js_1.8.3/underscore-min",
		// scripts/
            // game/
		'Game': "game/mainGame",
		'SubGame': "game/subGame",
            // view/
        'view': "view/view",
        'render': "view/render"
    }
});


require(['jQuery', 'Game', 'bootstrap'], function($, Game) {
    'use strict';
    
    /* temporary */ var game = new Game(); // this shall be eventually instantiated by controller.js
    
    //eventually remove this whole callback function
});
