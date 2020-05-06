import * as React from 'react';
import Board from './submodules/board';

export default class Game extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {

        return (
            <Board />
        );
    }
}
