import * as dotenv      from 'dotenv';
import * as express     from 'express';
// import http         from 'http';
import * as path        from 'path';
import * as socketIO    from 'socket.io';
import chat             from './socket/chat';

dotenv.config();

const app = express();

app.set('port', process.env.PORT);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err: Error) => res.status(500).send(err));
});

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
