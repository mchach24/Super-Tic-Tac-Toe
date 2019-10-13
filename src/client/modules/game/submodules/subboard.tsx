import * as React from 'react';
import Square from './square';
import Row from 'components/row';

interface SubBoardProps {
    id: ISubBoard;
}

export default class SubBoard extends React.Component<SubBoardProps> {

    constructor (props) {
        super(props);
    }

    public render() {
        const props = this.props;
        const subboard = props.id;

        const squareIds: ISquare[][] = [
            [
                { row: 1, column: 1, subboard },
                { row: 1, column: 2, subboard },
                { row: 1, column: 3, subboard } ],
            [
                { row: 2, column: 1, subboard },
                { row: 2, column: 2, subboard },
                { row: 2, column: 3, subboard } ],
            [
                { row: 3, column: 1, subboard },
                { row: 3, column: 2, subboard },
                { row: 3, column: 3, subboard } ],
        ];

        const squares = squareIds.map((row, i) =>
            <Row key={ i }>
                { row.map((id, j) => <Square id={ id } key={ j } />) }
            </Row>
        );

        return (
            <div className="subboard">
                { squares }
            </div>
        );
    }
}
