
import { Util } from '@lib/util/util';
import * as React from 'react';

interface BillboardProps {
    className?: string;
    header?: string;
}

export class Billboard extends React.Component<BillboardProps> {

    constructor(props) {
        super(props);
    }

    public render() {
        let className = 'billboard';

        const props = this.props;

        if (Util.isNotNil(props.className)) {
            className += props.className;
        }

        return (
            <div className={ className }>
                <h1 className='billboard-header'>{ props.header }</h1>
                { props.children }
            </div>
        );
    }
}
