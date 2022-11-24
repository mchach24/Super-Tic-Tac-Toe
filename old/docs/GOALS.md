# Goals for Version 2 and Reflection of Version 1

This file contains commentary on the good, bad, and the ugly of the approaches I took in the first version of this project (created Summer 2017). Based on this reflection, I list some improvements to make and goals to reach in the second version.

## Version 1

I took a look at how my creation stacked up after 7 months. I pretty much hated everything I did.

So this is time to express my resentment for how my old self designed this web app.

### Where I Went Wrong

1. No planning  

    It is fairly evident that I did little to no planning for the interactions between the ES6 modules and the modules themselves. 
2. Lack of documentation

    No explanation of what the ES6 modules' purposes and usages are  
    
    Decent-but-could-be-much-better doucmentation of functions, methods, other inner-module components
    
3. Structure of JavaScript code  

    The code has weak barriers between modules of differing uses.
    
    It probably would make sense to separate code into client-code and the logical front-end code... or even better yet for the sake of online multiplayer, use NodeJS for the latter on the backend, and make the frontend do the basic client code (event handling, coordination of requests, etc.)
    
4. Messy scopes and dependencies

    Dependencies between modules do not follow a logical linear nor cyclical hierarchy.
    
    This is partly a result of poor planning (see point 1).

5. Using SnapSVG

    It's a very poorly-planned library. super confusing to use and almost no documentation at the time of creating v1. Why did I pick it? I don't know.

### What I Got Right

1. Following JSDoc documentation guidelines
2. Some of the javascript components were well created
3. Fairly good abstraction between mainGame and subGame module/pseudo-classes

## Version 2: Goals

1. Take full advantage of ES6

2. Add online multiplayer support

    Use NodeJS for the logic of the game; front-end JS for the visual processing of the game.
    
3. Ditch Bootstrap

    Use CSS Grid for the game board.
    
    Take control of the UI design
    
4. Find a different SVG library or create own

    It wouldn't be too far off to create a basic SVG library for just my needs... would certainly be an interesting challenge. But there are already other libraries out there, better than SnapSVG, that should suit my needs.
    
5. And of course use NPM for libraries, etc.
