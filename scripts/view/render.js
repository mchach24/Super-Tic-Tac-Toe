define(['snapsvg', 'utils'], function (Snap, utils) {
    //'use strict';
    
    /**
     * @prop {Snap SVG Object} svg Snap svg object of #gameSVG, to be used in rendering elements
     * @prop {Object} viewbox an object containing nested properties and methods that apply to the viewbox of the svg:
     *      @prop {number} viewbox.width width of viewbox
     *      @prop {number} viewbox.height height of viewbox
     *      @method viewbox.thirdOf returns a third increment of either width or height, numerator determined by its corresponding argument
     *      @method viewbox.ninthOf same concept as thirdOf, but with 9 as the denominator
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
     * @param {number} row - row# of subGame
     * @param {number} column - column# of subGame
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

    function removeGameObjects() {
        gameSVG.objects.gameObjects.remove();

        initGameObjects();
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
     * @param {string} type either 'inner', 'outer', or 'subGameIn, used to determine class of border
     * @param {object} coordinates an object with properties x1, y1, x2, y2
     * 
     * @returns SnapSVG element of border
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

    /**
     * @func createX creates an x, formed by two perpendicular lines
     * 
     * @param {SnapSVG matrix} matrix - a SnapSVG matrix, used for translating coordinates (based on the subGame and square positons) and scaling dimensions
     * @param {number} squareDimensions.width - width of square
     * @param {number} squareDimensions.height - height of square
     * 
     * @returns x, a SnapSVG group object (of the lines)
     *
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
    }*/
    
    /**
     * @func renderX renders an X, either for a whole subGame after it is won, or for an individual square within a subGame
     * 
     * @param {SnapSVG Matrix} matrix relative scope of the x within the SVG
     * @param {Object} squareDimensions relative max x and y (width and height) within the matrix
     * @param {string} type OPTIONAL 'square' or null if small-x, 'subGame' if big-x
     */
    function renderX(matrix, squareDimensions, type) {
        if (!type) type = 'square'; // optional type paramter. Default value 'square'

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
        );

        var xClass = type === 'square' ? 'x' : 'sg-x';

        x.addClass(xClass);

        gameSVG.objects.gameObjects.add(x);
    }

    /**
     * @func renderO renders an O, either for a whole subGame after it is won, or for an individual square within a subGame
     * 
     * @param {SnapSVG Matrix} matrix relative scope (coordinates) of the o within the SVG
     * @param {Object} squareDimensions relative maximum x and y (width and height) within the matrix
     * @param {Object} centerOrigin x and y values of the center/origin of the square
     * @param {string} type OPTIONAL 'square' or null if small-o. 'subGame' if big-x
     */
    function renderO(matrix, squareDimensions, centerOrigin, type) {
        if (!type) type = 'square'; // default value of parameter: 'square'

        var radius = squareDimensions.width / 2;

        var o = gameSVG.svg.group(
            gameSVG.svg.el('circle', {
                cx: matrix.x(centerOrigin.x, centerOrigin.y),
                cy: matrix.y(centerOrigin.x, centerOrigin.y),
                r: matrix.split().scalex * radius
            })
        )

        var oClass = type === 'square' ? 'o' : 'sg-o';

        o.addClass(oClass);

        gameSVG.objects.gameObjects.add(o);
    }

    function disableSubGame(position) {
        gameSVG.objects.subGames[position].addClass('sg-disabled');
    }

    function enableSubGame(position) {
        gameSVG.objects.subGames[position].removeClass('sg-disabled');
    }

    function renderSubGameWin(subGameInfo, winner) {
        var matrix = Snap.matrix();

        var domain = subGameInfo.domain;

        var xOffset = domain.x.min,
            yOffset = domain.y.min;

        matrix.translate(xOffset, yOffset);

        var subGameDimensions = {
            width: domain.diff('x'),
            height: domain.diff('y')
        };

        var centerOrigin = {
            x: subGameDimensions.width / 2,
            y: subGameDimensions.height / 2
        };

        matrix.scale(0.8, 0.8, centerOrigin.x, centerOrigin.y);

        if (winner === 'x') {
            renderX(matrix, subGameDimensions, 'subGame');
        } else {
            renderO(matrix, subGameDimensions, centerOrigin, 'subGame');
        }
    }


    function renderWinLine(winner, startCoordinates, endCoordinates) {
        var centerOfViewbox = { x: gameSVG.viewbox.width / 2, y: gameSVG.viewbox.height / 2 };

        var scaler = Snap.matrix().scale(1.0, 1.0, centerOfViewbox.x, centerOfViewbox.y);

        console.log(scaler.x(1800, 900), scaler.y(1800, 900));
        console.log(startCoordinates, endCoordinates);

        var winLine = gameSVG.svg.el('line', {
            x1: scaler.x(startCoordinates.x, startCoordinates.y), y1: scaler.y(startCoordinates.x, startCoordinates.y),
            x2: scaler.x(endCoordinates.x, endCoordinates.y), y2: scaler.y(endCoordinates.x, endCoordinates.y),
            class: 'game-win-line winner-' + winner
        });

        gameSVG.objects.gameObjects.add(winLine);
    }

    function renderGameWin(winner, type, startSubGame) {
        var startCoordinates = { x: undefined, y: undefined }, 
            endCoordinates = { x: undefined, y: undefined };

        if (type === 'row') {
            startCoordinates.x = 0;
            startCoordinates.y = utils.game.getRow(startSubGame) * gameSVG.viewbox.thirdOf('height', 1) - (0.5 * gameSVG.viewbox.thirdOf('height', 1));

            endCoordinates.x = gameSVG.viewbox.width;
            endCoordinates.y = startCoordinates.y;
        } else if (type === 'column') {
            startCoordinates.x = utils.game.getColumn(startSubGame) * gameSVG.viewbox.thirdOf('width', 1) - (0.5 * gameSVG.viewbox.thirdOf('width', 1));
            startCoordinates.y = 0;

            endCoordinates.x = startCoordinates.x;
            endCoordinates.y = gameSVG.viewbox.height;
        } else { // type === 'diagonal'
            if (startSubGame === 0) {
                startCoordinates.x = 0;
                startCoordinates.y = 0;

                endCoordinates.x = gameSVG.viewbox.width;
                endCoordinates.y = gameSVG.viewbox.height;
            } else if (startSubGame === 2) {
                startCoordinates.x = gameSVG.viewbox.width;
                startCoordinates.y = 0;

                endCoordinates.x = 0;
                endCoordinates.y = gameSVG.viewbox.height;
            } else { // ( startSubGame !== 0 || startSubGame !== 2 ) 
                throw "Error: a diagonal must start on either subGame position 0 or subGame position 2"
            }
        }

        renderWinLine(winner, startCoordinates, endCoordinates);
    }
    
    return {
        clearGameObjects: removeGameObjects,
        getDomain: getDomain,

        initGameObjects: initGameObjects,
        renderGameObject: renderGameObject,

        components: {
            subGame: renderSubGame,
            borders: renderBorders
        },

        disableSubGame: disableSubGame,
        enableSubGame: enableSubGame,
        renderSubGameWin: renderSubGameWin,

        renderGameWin: renderGameWin 
    };
});