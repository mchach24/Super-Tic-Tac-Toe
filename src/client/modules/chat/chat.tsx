
import * as React from 'react';
import Icon from 'components/icon/icon';
import { Icons } from 'components/icon/icons';
import { Colors } from '@lib/colors';

export default class Chat extends React.Component<{}> {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <div className='chat'>
                <Icon icon={ Icons.Message } color={ Colors.Standard.Green }/>
            </div>
        );
    }
}
