define(['snapsvg'], function (Snap) {
    //'use strict';
    
    /**
     * @prop svg - Snap svg object of #gameSVG, to be used in rendering elements
     * @prop viewbox - an object containing nested properties and methods that apply to the viewbox of the svg:
     *      @prop viewbox.width - width of viewbox
     *      @prop viewbox.height - height of viewbox
     *      @method viewbox.thirdOf - returns a third increment of either width or height, numerator determined by its corresponding argument
     *      @method viewbox.ninthOf - same concept as thirdOf, but with 9 as the denominator
     * @prop objects - an object of any elements that are rendered on the svg, in the case that they need be referenced later
     */
    var gameSVG = {
        svg: Snap("#gameSVG"), // makes a snap svg object out of the svg element "#gameSVG" (which has a viewbox of 1800 units height and width)
        viewbox: {
            width: Snap("#gameSVG").attr("viewBox").width,
            height: Snap("#gameSVG").attr("viewBox").height,
            thirdOf: function (prop, numerator) {
                if (numerator < 0 || numerator > 3) throw "Error: thirdOf() parameter 'numerator' must be between 0 and 3";
                return this[prop] * (numerator / 3);
            },
            ninthOf: function (prop, numerator) {
                if (numerator < 0 || numerator > 9) throw "Error: ninthOf() parameter 'numerator' must be between 0 and 9";
                return this[prop] * (numerator / 9)
            }
        },
        objects: {
            subGames: Snap.set(),
            gameObjects: null // will be initiated as a <g>, which will contain any x's and o's, as they must be in the first group created so that they overlap over other earlier-created elements
        }
    };

    function initGameObjects() {
        gameSVG.objects.gameObjects = gameSVG.svg.group().attr({ 'id': 'gameObjects' });
    }

    /**
     * @function getDomain - returns an object called domain which contains the minimum and maximum values for each x and y in a subGame. subGame is determined by row# and column#
     * 
     * @param {*} row - row# of subGame
     * @param {*} column - column# of subGame
     */
    function getDomain(row, column) {
        var domain = {
            x: { 
                min: gameSVG.viewbox.thirdOf('width', 1) * (column - 1), 
                max: gameSVG.viewbox.thirdOf('width', 1) * column 
            },
            y: { 
                min: gameSVG.viewbox.thirdOf('height', 1) * (row - 1), 
                max: gameSVG.viewbox.thirdOf('height', 1) * row 
            },
            diff: function (prop) { 
                return (this[prop].max - this[prop].min) 
            }
        };

        return domain;
    }
    
    /**
     * @param {array} elements
     * 
     * @returns {SnapSVG group} of elements, puts elements in a <g> as a result
     */
    function groupElements(elements) {        
        var g = gameSVG.svg.group();
        
        for (var index in elements) {
            var element = elements[index];
            g.add(element);
        }
        
        return g;
    }

    /**
     * @param {Object} subGameInfo - information to identify subGame and where it should be positioned on the SVG
     */
    function renderSubGame(subGameInfo) {

        var subGameID = subGameInfo.id;
        
        /**
         * @func anonymous - IIFE, returns subGameSquares, argument input is subGameInfo.domain, sets return value to subGameSquares
         */
        var subGameSquares = (function () {
            var domain = subGameInfo.domain,
                subGameSquares = [];
            
            for (var r = 1; r <= 3; r++) { // row
                for (var c = 1; c <= 3; c++) { // column
                    var squareID = 'r' + r + 'c' + c;
                    var coordinates = {
                        x: domain.x.min + (((c - 1) / 3) * domain.diff('x')),
                        y: domain.y.min + (((r - 1) / 3) * domain.diff('y'))
                    };
                    
                    var subGameSquare = gameSVG.svg.el('rect', {
                        x: coordinates.x,
                        y: coordinates.y,
                        width: (1 / 3) * domain.diff('x'),
                        height: (1 / 3) * domain.diff('y'),
                        class: 'gameSVG_subGame-square',
                        id: 'subGame_' + subGameID + '-square_' + squareID
                    });
                    
                    subGameSquares.push(subGameSquare);
                }
            }
            
            return subGameSquares;
        })();
        
        var subGame = groupElements(subGameSquares).attr({
            class: 'gameSVG_subGame',
            id: 'subGame_' + subGameID
        });
        
        gameSVG.objects.subGames.push(subGame);
        
        renderSubGameInnerBorders(subGameInfo.domain, subGameID);
    }
    
    /**
     * @param {string} type - either 'inner', 'outer', or 'subGameIn, used to determine class of border
     * @param {object} coordinates - an object with properties x1, y1, x2, y2
     */
    function renderBorder(type, coordinates) {
        var borderClass;
        switch (type) {
            case 'subGameInner':
                borderClass = 'gameSVG_subGame_inner-border';
                break;
            case 'inner':
                borderClass = 'gameSVG_inner-border';
                break;
            case 'outer': 
                borderClass = 'gameSVG_outer-border';
                break;
        }
        
        var border = gameSVG.svg.el('line', {
            x1: coordinates.x1,
            y1: coordinates.y1,
            x2: coordinates.x2,
            y2: coordinates.y2,
            class: borderClass
        });
        
        return border;
    }
    
    /**
     * @param {object} domain - domain object from renderSubGame(), containing properties 'x', 'y', and method 'diff'
     * @param {string} subGameID - subGameID from renderSubGame(), in the format of 'r1c1', short for row 1, column 1
     */
    function renderSubGameInnerBorders(domain, subGameID) {
        var subGameInnerBorderLines = [
            renderBorder('subGameInner', {
                x1: domain.x.min + ((1 / 3) * domain.diff('x')), // x = third of subGame, uses min for making it relative to this subGame
                y1: domain.y.min,
                x2: domain.x.min + ((1 / 3) * domain.diff('x')),
                y2: domain.y.max 
            }),
            renderBorder('subGameInner', {
                x1: domain.x.min + ((2 / 3) * domain.diff('x')), // x = two thirds of subGame, again, uses min for making it relative
                y1: domain.y.min,
                x2: domain.x.min + ((2 / 3) * domain.diff('x')),
                y2: domain.y.max
            }),
            renderBorder('subGameInner', {
                x1: domain.x.min,
                y1: domain.y.min + ((1 / 3) * domain.diff('y')),
                x2: domain.x.max,
                y2: domain.y.min + ((1 / 3) * domain.diff('y'))
            }),
            renderBorder('subGameInner', {
                x1: domain.x.min,
                y1: domain.y.min + ((2 / 3) * domain.diff('y')),
                x2: domain.x.max,
                y2: domain.y.min + ((2 / 3) * domain.diff('y')) 
            })            
        ];
        
        groupElements(subGameInnerBorderLines).attr({
            id: 'subGame-' + subGameID + '_borders'
        });
    }
    
    /**
     * @func renderBorders - renders the borders for each subGame
     */
    function renderBorders() {
        // these lines form the outer border, the "box" around the game
        var outerBorderLines = [
            renderBorder('outer', { // far left, vertical
                x1: 0,
                y1: 0,
                x2: 0,
                y2: gameSVG.viewbox.height
            }),
            renderBorder('outer', { // far right, vertical
                x1: gameSVG.viewbox.width,
                y1: 0,
                x2: gameSVG.viewbox.width,
                y2: gameSVG.viewbox.height
            }),
            renderBorder('outer', { // far top, horizontal
                x1: 0,
                y1: 0,
                x2: gameSVG.viewbox.width,
                y2: 0
            }),
            renderBorder('outer', { // far bottom, horizontal
                x1: 0,
                y1: gameSVG.viewbox.height,
                x2: gameSVG.viewbox.width,
                y2: gameSVG.viewbox.height
            })            
        ];
        
        // these lines form the tic tac toe criss-cross, the borders between the subGames
        var innerBorderLines = [
            renderBorder('inner', { // left, vertical
                x1: gameSVG.viewbox.thirdOf('width', 1),
                y1: 0,
                x2: gameSVG.viewbox.thirdOf('width', 1),
                y2: gameSVG.viewbox.height
            }),
            renderBorder('inner', { // right, vertical
                x1: gameSVG.viewbox.thirdOf('width', 2),
                y1: 0,
                x2: gameSVG.viewbox.thirdOf('width', 2),
                y2: gameSVG.viewbox.height
            }),
            renderBorder('inner', { // top, horizontal
                x1: 0,
                y1: gameSVG.viewbox.thirdOf('height', 1),
                x2: gameSVG.viewbox.width,
                y2: gameSVG.viewbox.thirdOf('height', 1)
            }),
            renderBorder('inner', { // bottom, horizontal
                x1: 0,
                y1: gameSVG.viewbox.thirdOf('height', 2),
                x2: gameSVG.viewbox.width,
                y2: gameSVG.viewbox.thirdOf('height', 2)
            })
        ];
    }

    /**
     * @func createX creates an x, formed by two perpendicular lines
     * 
     * @param {SnapSVG matrix} matrix - a SnapSVG matrix, used for translating coordinates (based on the subGame and square positons) and scaling dimensions
     * @param {number} squareDimensions.width - width of square
     * @param {number} squareDimensions.height - height of square
     * 
     * @returns x, a SnapSVG group object (of the lines)
     */
    function createX(matrix, squareDimensions) {

        var squareWidth = squareDimensions.width,
            squareHeight = squareDimensions.height;

        var x = gameSVG.svg.group(
            gameSVG.svg.el('line', {
                x1: matrix.x(0, 0),
                y1: matrix.y(0, 0),
                x2: matrix.x(squareWidth, squareHeight),
                y2:  matrix.y(squareWidth, squareHeight)
            }),
            gameSVG.svg.el('line', {
                x1: matrix.x(squareWidth, 0),
                y1: matrix.y(squareWidth, 0),
                x2: matrix.x(0, squareHeight),
                y2: matrix.y(0, squareHeight)
            })
        ).addClass('x');

        return x;
    }
    
    function renderX(matrix, squareDimensions) {

        var x = createX(matrix, squareDimensions);
        
        /*
        if needed: could be used for fixing the issue with hovering over a subGame being obstructed by the x

        var subGameID = subGameInfo.id,
            squareID = squareInfo.id;
        x.attr({
            'id': 'x-in-subGame_' + subGameID + '-square_' + squareID
        });
        */

        gameSVG.objects.gameObjects.add(x);
    }

    /**
     * @func createO - creates an o, simply a hollow circle (hollowness done by CSS)
     * 
     * @param {SnapSVG matrix} matrix - a SnapSVG matrix, used for translating coordinates (based on the subGame and square positons) and scaling dimensions
     * @param {number} squareDimensions.width - width of square
     * @param {number} squareDimensions.height - height of square
     * @param {number} centerOrigin.x - x coordinate of the center origin of the square
     * @param {number} centerOrigin.y - y coordinate of the center origin of the square
     */
    function createO(matrix, squareDimensions, centerOrigin) {
        var radius = squareDimensions.width / 2;

        var o = gameSVG.svg.group(
            gameSVG.svg.el('circle', {
                cx: matrix.x(centerOrigin.x, centerOrigin.y),
                cy: matrix.y(centerOrigin.x, centerOrigin.y),
                r: matrix.split().scalex * radius
            })
        ).addClass('o');

        return o;
    }

    function renderO(matrix, squareDimensions, centerOrigin) {

        var o = createO(matrix, squareDimensions, centerOrigin);

        /*
        if needed: could be used for fixing the issue with hovering over a subGame being obstructed by the x

        var subGameID = subGameInfo.id,
            squareID = squareInfo.id;
        x.attr({
            'id': 'o-in-subGame_' + subGameID + '-square_' + squareID
        });
        */

        gameSVG.objects.gameObjects.add(o);
    }

    /**
     * @func renderGameObject - serves as a proxy for rendering an x or o, does some setup code, creates matrix for translating and scaling to fit an x or o on the board in the correct spot and with correct size
     * 
     * @param {string} player - 'x' or 'o'
     * @param {Object} subGameInfo - with row, column, position, id, domain
     * @param {Object} squareInfo - with row, column, position, id
     */
    function renderGameObject(player, subGameInfo, squareInfo) {
        var matrix = Snap.matrix();

        var subGameDomain = subGameInfo.domain,
            squareColumn = squareInfo.column,
            squareRow = squareInfo.row;

        var xSubGameOffset = subGameDomain.x.min, // offset from x=0 to start of subGame
            xSquareOffset = gameSVG.viewbox.ninthOf('width', squareColumn - 1); // offset from start of subGame to the beginning of the square in the x axis
        var xOffset = xSubGameOffset + xSquareOffset; // combined

        var ySubGameOffset = subGameDomain.y.min, // offset from y=0 to start of subGame
            ySquareOffset = gameSVG.viewbox.ninthOf('height', squareRow - 1); // offset from start of subGame to the beginning of the square in the y axis
        var yOffset = ySubGameOffset + ySquareOffset; // combined

        matrix.translate(xOffset, yOffset); // translateX and translateY based on the above values

        var squareDimensions = {
            width: gameSVG.viewbox.width / 9,
            height: gameSVG.viewbox.height / 9
        };

        var centerOrigin = {
            x: squareDimensions.width / 2,
            y: squareDimensions.height / 2
        }

        matrix.scale(0.8, 0.8, centerOrigin.x, centerOrigin.y); // scales any values down to 80% with centerOrigin as the reference point for scaling (so it scales from the center of the square)

        if (player === 'x') {
            renderX(matrix, squareDimensions);
        } else {
            renderO(matrix, squareDimensions, centerOrigin);
        }

    }

    function disableSubGame(position) {
        gameSVG.objects.subGames[position].addClass('sg-disabled');
    }

    function enableSubGame(position) {
        gameSVG.objects.subGames[position].removeClass('sg-disabled');
    }
    
    return {
        getDomain: getDomain,
        components: {
            subGame: renderSubGame,
            borders: renderBorders
        },
        renderGameObject: renderGameObject,
        initGameObjects: initGameObjects,
        disableSubGame: disableSubGame,
        enableSubGame: enableSubGame
    };
});