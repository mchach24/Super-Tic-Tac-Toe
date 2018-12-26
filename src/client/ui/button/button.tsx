
import { Color } from '@lib/globals/colors';
import { Util } from '@lib/util/util';
import * as React from 'react';

interface ButtonProps {
    className?: string;
    color?: Color;
    onClick?: () => void;
}

export class Button extends React.Component<ButtonProps> {

    constructor(props) {
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
        )
    }
}
