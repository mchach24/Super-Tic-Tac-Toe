import * as React from 'react';
import SubBoard from './subboard';
import Row from 'components/row';

export default class Board extends React.Component {

  constructor (props) {
    super(props);
  }

  public render() {
    const props = this.props;

    const subboardIds: ISubBoard[][] = [
      [
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 1, column: 3 } ],
      [
        { row: 2, column: 1 },
        { row: 2, column: 2 },
        { row: 2, column: 3 } ],
      [
        { row: 3, column: 1 },
        { row: 3, column: 2 },
        { row: 3, column: 3 } ]
    ];

    const subboards = subboardIds.map((row, i) =>
      <Row key={ i }>
        { row.map((id, j) => <SubBoard id={ id } key={ j } />) }
      </Row>
    );

    return (
      <div className="board">
        { subboards }
      </div>
    );
  }
}