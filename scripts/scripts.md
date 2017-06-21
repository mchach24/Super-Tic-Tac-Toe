# Scripts

### This file is intended for documentation of scripts that go along with this repo. Explanations of purposes and uses of specific script files, map of files, and, while this is in development, future script files.

#### File Map

- scripts/
	* main.js
	* game/
		* mainGame.js
		* subGame.js

#### Documentation of Individual Script Files

###### main.js

The data-main entry point for require.js. Not sure what this will do yet.

###### game/mainGame.js

- Composed of an immediately-invoked function expression, which keeps track of, at the least, the following:
	- board Object: keeps track of 9 subGame instances
	- turn String: keeps track of whose turn it is, 'x' or 'o'
- and returns a public object containing:
	- render method: updates gameSVG
	- playMove method: takes TBD parameters (probably grid position and sub-grid position, possibly others) and plays a move on the board based on them. Another script file(s) will have to be responsible for listening for a click on the svg, discerning the position of the click, then calling this method.
	
###### game/subGame.js

- composed of a subGame closure function. Should contain:
	- position: variable to store the position in the grid of subGames (either as a number 0-8 or 1-9, or row[x]column[y])
	- public render method: most likely to be called by the render method of mainGame.js
	- boardStatus: array of 3 arrays that maps out the current status of the board ('x', 'o', or blank), as so:
	```javascript
	[['_','x','o'],
	 ['x','o','o'],
	 ['x','_','x']]
	```
	- variable winner (of subGame): to keep track of the winner, either null, 'x', or 'o'.
