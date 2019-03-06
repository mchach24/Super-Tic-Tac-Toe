
import * as React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';

export class App extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <h1>Hello world!</h1>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
