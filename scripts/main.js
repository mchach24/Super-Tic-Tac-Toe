// this file is the data-main entry point for require js

requirejs.config({
    baseUrl: 'scripts/',
    shim: {
        'bootstrap': {
            deps: ['jquery'] 
        }
    },
    paths: {
		// lib/
        'jquery': "../lib/jquery_3.2.1/jquery-3.2.1.min",
        'bootstrap': "../lib/bootstrap_3.3.7/js/bootstrap.min",
		'snapsvg': "../lib/snap.svg_0.5.1/snap.svg-min",
		'underscore': "../lib/underscore.js_1.8.3/underscore-min",
        
		// scripts/
            // game/
		'Game': "game/mainGame",
        'SubGame': "game/subGame",
        "winCheck": "game/winCheck",
            // view/
        'view': "view/view",
        'render': "view/render",
            // controller/
        'listener': "controller/listener",
        'controller': "controller/controller",
            // lib/
        'utils': 'lib/utils'
    }
});

/*                         not sure where to load listener module yet */
require(['underscore', 'controller', 'listener', 'bootstrap'], function(_, controller) {
    'use strict';
});
