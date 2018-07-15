import app from './app';

app.set('port', process.env.PORT || 3000);

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
