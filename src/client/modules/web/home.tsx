
import * as React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import { Billboard } from 'ui/billboard/billboard';
import { Button } from 'ui/button/button';
import { Navigation } from 'ui/navigation/navigation';
import { Text } from 'ui/text/text';

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Billboard header='Super Tic Tac Toe'>
                    <Navigation>
                        <Button><Link href="/play"><Text>Play</Text></Link></Button>
                        <Button><Link href="/find-game"><Text>Play Online</Text></Link></Button>
                    </Navigation>
                </Billboard>
            </div>
        );
    }
}
