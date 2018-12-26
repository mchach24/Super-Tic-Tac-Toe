
import * as React from 'react';

interface BillboardProps {
    header: string;
}

export class Billboard extends React.Component<BillboardProps> {

    constructor(props) {
        super(props);
    }

    public render() {
        const className = 'billboard';

        const { header } = this.props;

        return (
            <div className={ className }>
                <h1 className='billboard-header'>{ header }</h1>
                { this.props.children }
            </div>
        );
    }
}
