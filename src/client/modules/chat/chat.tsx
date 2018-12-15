import * as React from 'react';
import chatClientController from './chat-api';

export default class Chat extends React.Component<{}> {

    constructor(props) {
        super(props);

        chatClientController();
    }

    public render() {
        return (
            <button>Open Chat</button>
        );
    }
}
