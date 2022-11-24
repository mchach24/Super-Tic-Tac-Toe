import * as React from 'react';
import Text from 'components/text';
import { Size } from '@lib/sizes';
import { Colors } from '@lib/colors';

export default class Rules extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {

        const rules = 'get good';

        return (
            <div className='rules'>
                <Text size={ Size.Medium } color={ Colors.Text.Primary }>
                    How to Play
                </Text>
                <Text size={ Size.Small } color={ Colors.Text.Secondary }>
                    { rules }
                </Text>
            </div>
        )
    }
}
