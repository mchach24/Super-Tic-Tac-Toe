
import Util from '@lib/util';
import * as React from 'react';

// INTERFACES

interface NavProps {
    className?: string;
}

// COMPONENT

export default class Navigation extends React.Component<NavProps> {

    constructor (props) {
        super(props);
    }

    public render() {

        const props = this.props;
        let className = 'navigation';

        if (Util.isNotNil(props.className)) {
            className += ` ${props.className}`;
        }

        return (
            <ul className={ className }>
                { this.renderNavItems(props.children) }
            </ul>
        );
    }

    // PRIVATE METHODS

    private renderNavItems(children) {
        return React.Children.map(children, (child, i) => {
            return <li className='nav-item'>{ child }</li>;
        });
    }

}
