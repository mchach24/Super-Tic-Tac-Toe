import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => res.send("Hello Word"));

export default app;
