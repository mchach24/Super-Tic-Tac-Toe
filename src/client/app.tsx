
import Chat         from '@modules/chat/chat';
import * as React   from 'react';
import ReactDOM     from 'react-dom';

export class App extends React.Component<{}> {

    constructor(props) {
        super(props);

    }

    public render() {
        return (
            <Chat />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
