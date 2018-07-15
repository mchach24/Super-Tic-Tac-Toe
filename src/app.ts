import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();

        router.use("/", express.static(path.join(__dirname, "public")));

        this.express.use("/", router);
    }
}

export default new App().express;