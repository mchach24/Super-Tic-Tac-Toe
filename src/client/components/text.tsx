
import { Color } from '@lib/colors';
import { Size } from '@lib/sizes';
import Util from '@lib/util';
import * as React from 'react';
import ComponentProps from '@lib/component-props';

interface TextProps extends ComponentProps {
    size?: Size;
    color?: Color;
}

export default class Text extends React.Component<TextProps> {

    constructor (props) {
        super(props);
    }

    public render() {

        const props = this.props;

        let className = 'text';

        if (Util.isNotNil(props.className)) {
            className += ` ${props.className}`;
        }

        if (Util.isNotNil(props.size)) {
            className += ` ${props.size}`;
        }

        if (Util.isNotNil(props.color)) {
            className += ` color-${props.color}`;
        }

        return (
            <p className = { className }> { props.children }</p>
        );
    }
}
