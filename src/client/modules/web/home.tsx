
import * as React from 'react';
import Game from 'modules/game/game';
import Chat from '@modules/chat/chat';
import Button from 'components/button';
import Navigation from 'components/navigation';
import Text from 'components/text';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import Wrapper from 'components/wrapper';
import Rules from 'components/rules';
import { Colors } from '@lib/colors';
import { Size } from '@lib/sizes';

export default class Home extends React.Component {

    constructor (props) {
        super(props);
    }

    public render() {
        return (
            <Wrapper id="main-wrapper">
                <Header heading='Super Tic Tac Toe' />
                <Wrapper id="game-wrapper">
                    <Game />
                    <Sidebar>
                        <Rules />
                        <Navigation>
                            <Button color={ Colors.Theme.Primary }>
                                <a className="link" href="/play">
                                    <Text size={ Size.Small } color={ Colors.Standard.White }>New Game</Text>
                                </a>
                            </Button>
                            <Button color={ Colors.Theme.Primary }>
                                <a className="link" href="/find-game">
                                    <Text size={ Size.Small } color={ Colors.Standard.White }>Play Online</Text>
                                </a>
                            </Button>
                        </Navigation>
                        <Chat />
                    </Sidebar>
                </Wrapper>
            </Wrapper>
        );
    }
}
