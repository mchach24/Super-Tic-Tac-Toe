
import * as React from 'react';
import Icon from 'components/icon/icon';
import { Icons } from 'components/icon/icons';

export default class Chat extends React.Component<{}> {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <Icon icon={ Icons.Message } />
        );
    }
}
