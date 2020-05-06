import * as React from 'react';
import ComponentProps from '@lib/component-props';
import Util from '@lib/util';

export default class Wrapper extends React.Component<ComponentProps> {

    constructor (props) {
        super(props);
    }

    public render() {
        const props = this.props;

        let className = 'wrapper';
        if (Util.isNotNil(props.className)) {
            className += ` ${props.className}`;
        }

        let id: string;
        if (Util.isNotNil(props.id)) {
            id = props.id;
        }

        return (
            <div className={ className } id={ id }> { props.children } </div>
        );
    }
}
