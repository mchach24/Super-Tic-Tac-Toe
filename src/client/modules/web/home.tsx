
import * as React from 'react';
import Button from 'components/button';
import Navigation from 'components/navigation';
import Text from 'components/text';
import Game from 'modules/game/game';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import Wrapper from 'components/wrapper';

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
                        <Navigation>
                            <Button><a href="/play"><Text>New Game</Text></a></Button>
                            <Button><a href="/find-game"><Text>Play Online</Text></a></Button>
                        </Navigation>
                    </Sidebar>
                </Wrapper>
            </Wrapper>
        );
    }
}
