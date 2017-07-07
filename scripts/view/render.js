define(['snapsvg'], function (Snap) {
    //'use strict';
    
    var gameSVG = {
        svg: Snap("#gameSVG"), // makes a snap svg object out of the svg element "#gameSVG" (which has a viewbox of 1800 units height and width)
        viewbox: {
            width: Snap("#gameSVG").attr("viewBox").width,
            height: Snap("#gameSVG").attr("viewBox").height,
            thirdOf: function (prop, numerator) {
                if (numerator < 0 || numerator > 3) throw "Error: thirdOf() parameter 'numerator' must be between 0 and 3"
                return this[prop] * (numerator / 3);
            }
        },
        objects: {
            subGames: Snap.set()
        }
    };
    
    /**
     * @param {array} elements
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
        
        var subGameRow = subGameInfo.row,
            subGameColumn = subGameInfo.column,
            subGameID = subGameInfo.id;
        
        // subGameInfo (with domain) can be returned to another view method if ever need
        /**
         * @property {object} domain - stores the minimum and maximum values for each x and y in this subGame, and contains a method 'diff' that returns the difference between the maximum and minimum of either x or y.
         */
        subGameInfo.domain = { 
            x: { 
                min: gameSVG.viewbox.thirdOf('width', 1) * (subGameColumn - 1), 
                max: gameSVG.viewbox.thirdOf('width', 1) * subGameColumn 
            },
            y: { 
                min: gameSVG.viewbox.thirdOf('height', 1) * (subGameRow - 1), 
                max: gameSVG.viewbox.thirdOf('height', 1) * subGameRow 
            },
            diff: function (prop) { 
                return (this[prop].max - this[prop].min) 
            }
        };
        
        function createSubGameSquares(domain) {
            var subGameSquares = [];
            
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
        }
        
        var subGameSquares = createSubGameSquares(subGameInfo.domain);
        
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
    
    return {
        subGame: renderSubGame,
        borders: renderBorders
    };
});