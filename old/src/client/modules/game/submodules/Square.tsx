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
            svg = this.createSVG(props.player);
        }

        return (
            <div className={ className }>{ svg }</div>
        );
    }

    private createSVG(player: Player): React.ReactSVGElement {

        let children;

        if (player === 'X') {
            children = (
                <React.Fragment>
                    <line x1="5" y1="5" x2="95" y2="95" />
                    <line x1="95" y1="5" x2="5" y2="95" />
                </React.Fragment>
            );
        } else {
            children = (
                <circle cx="50" cy="50" r="45" />
            );
        }

        const className = `mark-${player}`;

        const svg = React.createElement(
            'svg',
            { className,
              width: 100,
              height: 100 },
            children
        );

        return svg;
    }
}
