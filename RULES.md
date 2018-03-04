# Rules of Super Tic Tac Toe

## Introduction

Super Tic Tac Toe (also known as ultimate tic tac toe) is a extreme version of simple Tic Tac Toe (or Knots and Crosses) that incorporates more levels of strategy and game-theory than dull, vanilla Tic Tac Toe. 

Instead of a single 3x3 with a total of 9 squares, there is a 3x3 grid in which each cell of that grid contains another 3x3 grid. 

It's 9 simultaneous tic tac toe games with one simple main mechanic to tie them together: where you play determines where your opponent is limited to play on their next turn.

![image 1](URL)

## Objective

Just like in vanilla Tic Tac Toe, the objective is to get 3 x's or o's in a row, column, or diagonal. However, in Super Tic Tac Toe, the player must get three of the sub-games within the big 3x3 to win. This requires the player to first get three small squares within a small 3x3 grid.

## Terminology

- A small 3x3 with only squares inside is called a **sub-game**
- The squares inside are aptly called **squares**.
- The top-level 3x3 grid may be called **game-board**, or alternatively board or main-game.

Specific sub-games are referred to by their row and column within the game-board... `sub-game r1c1` is the top left; `sub-game r2c3` is the middle-row right; etc.

Squares are referred to using the same system, but with a prefix to discern which sub-game they belong to... `sub-game-r1c3 square-r3c1` is the bottom-left square in the top-right sub-game. If sub-game is irrelevant or is already established, it is acceptable to refer to a square simply as `square-r3c1`

## Rules

Now that background for the game has been provided, let's get on to the rules.

1. When a player chooses to play in a square – let's say r1c2 - (in any sub-game), then their opponent must play in one of the available squares in sub-game r1c2 on their next turn  
    - if sub-game r1c2 is already won (has three squares in a row of either x or o) or is otherwise disabled (tied), then the opponent may play in any available square on the board.
2. When a sub-game has a row, column, or diagonal filled with either one of x's or o's, then it is considered one and the respective winner is drawn over it.
    - if all 9 squares within a subgame are played with no winner, the subgame is disabled and assigned no winner; it is a dead sub-game.
3. When 3 sub-games are won in a row, column, or diagonal, the game is won by the respective player.
    - if there are no such group of 3 wins, whichever player has won more sub-games wins the whole game
    - if the number of wins of sub-games is also tied (at least one is tied), the game ends in a tie.
