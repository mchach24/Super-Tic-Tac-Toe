import * as dotenv      from 'dotenv';
import * as express     from 'express';
// import http         from 'http';
// import path         from 'path';
import * as socketIO    from 'socket.io';
import chat             from './socket/chat';

dotenv.config();

const app = express();

app.set('port', process.env.PORT);

/*******************************************************************
ATTACH ROUTES
*******************************************************************/
(() => {
    const router = express.Router();

    app.use("/", router);
})();

const server = app.listen(app.get('port'), (err: Error) => {
    if (err) {
        console.log(err);
    }

    console.log(
        "  App is running at http://localhost:%s in %s mode",
        app.get('port'),
        app.get('env'),
    );
    console.log("  Press CTRL-C to stop\n");
});

const io = socketIO(server);

chat(io);
