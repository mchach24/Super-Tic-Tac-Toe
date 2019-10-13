
import { Color } from '@lib/colors';
import Util from '@lib/util';
import * as React from 'react';
import ComponentProps from '@lib/component-props';

interface ButtonProps extends ComponentProps {
    color?: Color;
    onClick?: () => void;
}

export default class Button extends React.Component<ButtonProps> {

    constructor (props) {
        super(props);
    }

    public render() {
        const props = this.props;
        const { color, onClick } = props;

        let className = 'btn';

        if (Util.isNotNil(props.className)) {
            className += ` ${props.className}`;
        }

        if (Util.isNotNil(color)) {
            className += ` color-${color}`;
        }

        return (
            <button className={ className } onClick={ onClick }>{ props.children }</button>
        );
    }
}
