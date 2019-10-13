import * as React from 'react';
import Util from '@lib/util';

interface SidebarProps {
  className?: string;
}

export default class Sidebar extends React.Component<SidebarProps> {

  constructor (props) {
    super(props);
  }

  public render() {
    const props = this.props;

    let className = 'sidebar';

    if (Util.isNotNil(props.className)) {
      className += ` ${props.className}`;
    }

    return (
      <div className={ className }> { props.children } </div>
    );
  }
}
