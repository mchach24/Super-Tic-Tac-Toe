import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import io from 'socket.io';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

/*******************************************************************
ATTACH ROUTES
*******************************************************************/
(async () => {
    const router = express.Router();

    router.use(express.static(path.join(__dirname, "..", "client")));

    router.all("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.sendFile('index.html');
    });

    app.use("/", router);
})();

app.listen(app.get('port'), (err: Error) => {
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
