import { GameLayout }   from '@modules/web/game-layout';
import { Home  }    from '@modules/web/home';

export const routes = {
    gameLayout: {
        component: GameLayout,
        exact: true,
        path: '/play',
    },
    webLander: {
        component: Home,
        exact: true,
        path: '/',
    },
};
