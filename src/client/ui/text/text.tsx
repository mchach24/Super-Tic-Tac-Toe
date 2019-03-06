
import { TextColor } from '@globals/colors';
import { Size } from '@globals/sizes';
import { Util } from '@lib/util/util';
import * as React from 'react';

interface TextProps {
    size?: Size;
    className?: string;
    color?: TextColor;
}

export class Text extends React.Component<TextProps> {

    constructor(props) {
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
            className += ` ${props.color}`;
        }

        return (
            <p className = { className }> { props.children }</p>
        );
    }
}
