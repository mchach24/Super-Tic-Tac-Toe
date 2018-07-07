import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, (err: Error) => {
    if (err) {
      console.log(err);
    }

    console.log(
      "  App is running at http://localhost:%s in %s mode",
      port,
      app.get("env"),
    );
    console.log("  Press CTRL-C to stop\n");
  });
