import * as React from 'react';
import Util from '@lib/util';

interface HeaderProps {
  className?: string;
  heading: string;
}

export default class Header extends React.Component<HeaderProps> {

  constructor (props) {
    super(props);
  }

  public render() {

    const props = this.props;

    let className = 'header';

    if (Util.isNotNil(props.className)) {
      className += ` ${props.className}`;
    }

    return (
      <div className={ className }>
        <h1>Super Tic Tac Toe</h1>
        {props.children}
      </div>
    );
  }
}
