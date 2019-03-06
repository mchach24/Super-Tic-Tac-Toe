
import * as React           from 'react';
import { Icon }             from 'ui/icon/icon';
import { Icons }            from 'ui/icon/icons';

export default class Chat extends React.Component<{}> {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Icon icon={ Icons.Message } />
        );
    }
}
