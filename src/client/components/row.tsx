import * as React from 'react';

export default class Row extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <div className="row">
                { this.props.children }
            </div>
        );
    }
}
