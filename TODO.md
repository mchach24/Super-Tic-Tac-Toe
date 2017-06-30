# To-Do List


## General List

~1. Write basic structure of mainGame and subGame model(s)~
~2. Write javascript rendering and view~
3. Write the logic of the game (controller, listener, add to model)

#### Far Along

1. Re-write the JavaScript using Backbone.js once the vanilla-MVC JavaScript is completed 
	- For the purpose of gaining experience doing it without Backbone first
2. Add server-side and add online multiplayer
	- probably just username matching, or perhaps use something like what kahoot.it uses
	- add random oppenent for the challenge, or if this game is ever noticed by more than myself.

## Issues

[x] While the `<use>` element did appear to work for SVG, it doesn't allow for the inner contents to be referenced. That is, the individual squares in the subGames could not be assigned event listeners to themselves, only to the `<use>` element as a whole (couldn't assign a hover > color change without changing the whole `<use>`'s color. I first considered writing a script that just replaces the `<use>` elements with the symbol they reference verbatim. Or *each subGame instance could draw its own board via another script file with the needed methods to do so.*

## Specific List

~1. Add underscore.js to lib and set that up.~
~2. Learn more about requirejs: `define` function, ~
