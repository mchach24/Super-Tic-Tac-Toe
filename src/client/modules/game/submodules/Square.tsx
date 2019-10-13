import * as React from 'react';
import Util from '@lib/util';

interface SquareProps {
    player?: Player;
    id: ISquare;
}

export default class Square extends React.Component<SquareProps> {

    constructor (props: SquareProps) {
        super(props);
    }

    public render() {
        const props = this.props;
        const className = 'square';

        let svg;

        if (Util.isNotNil(props.player)) {
            svg = (
                <p>{ props.player }</p>
            );
        }

        return (
            <div className={ className }> x </div>
        );
    }
}
