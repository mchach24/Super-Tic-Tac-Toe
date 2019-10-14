import * as React from 'react';
import Util from '@lib/util';
import Text from './text';
import { Size } from '@lib/sizes';
import { Colors } from '@lib/colors';

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
        <Text size={ Size.Large } color={ Colors.Theme.Primary }>Super Tic Tac Toe</Text>
        {props.children}
      </div>
    );
  }
}
