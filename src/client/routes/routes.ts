import { GameLayout }   from '../modules/web/game-layout';
import { WebLander }    from '../modules/web/web-lander';

export const routes = {
    gameLayout: {
        component: GameLayout,
        exact: true,
        path: '/play',
    },
    webLander: {
        component: WebLander,
        exact: true,
        path: '/',
    },
};
