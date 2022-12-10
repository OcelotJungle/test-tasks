import dotenv from "dotenv";
dotenv.config();

import { CLIENT_DIST_FOLDER, DISH_IMAGES_FOLDER } from "./consts";
import { mkdir } from "node:fs/promises";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import apiRoutes from "./routes/api";
import { join } from "node:path";

async function start() {
    try { await mkdir(DISH_IMAGES_FOLDER, { recursive: true }) }
    catch(_) {}

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/dishes/:filename", ({ params }, res) => {
        res.sendFile(join(DISH_IMAGES_FOLDER, params.filename));
    });

    app.use("/api", apiRoutes);

    app.use(express.static(CLIENT_DIST_FOLDER));

    app.get("*", (_, res) => res.sendFile(join(CLIENT_DIST_FOLDER, "index.html")));
    

    const PORT = process.env.PORT ?? 3001;
    app.listen(PORT, () => console.info(`Server is listening on port ${PORT}...`));

    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
}

async function stop(code = 0) {
    await prisma?.$disconnect();
    process.exit(code);
}

start().catch(async e => {
    console.error(e);
    await stop(1);
});