
// game-specific

declare global {

    type Player = "X" | "O";

    interface ISubBoard {
        row: 1 | 2 | 3;
        column: 1 | 2 | 3;
    }

    interface ISquare extends ISubBoard {
        subboard: ISubBoard; /* subboard this square belongs to */
    }
}

// exports nothing
export {}
