
import { GameLayout }   from '@modules/web/game-layout';
import { Home }         from '@modules/web/home';
import * as React       from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter,
        Route,
        Switch }        from 'react-router-dom';
import './assets/scss/main.scss';

export class App extends React.Component {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/game"   component={ GameLayout } />
                    <Route path="/game-over" component={ () => <h1>Game Over</h1> } />
                    <Route path="/find-game" component={ () => <h1>Find Game</h1> } />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
