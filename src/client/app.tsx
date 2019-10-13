
import * as React from 'react';
import ReactDOM from 'react-dom';
import Home from '@modules/web/home';
import './assets/scss/main.scss';

export class App extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <Home />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
