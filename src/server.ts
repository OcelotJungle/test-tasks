import * as dotenv from "dotenv";
if(process.env.NODE_ENV === "production") dotenv.config();
else dotenv.config({ path: ".dev.env" });

import express from "express";
import API from "./api";

const app = express();
const api = new API();

(async function start() {
    try { await api.openConnection() }
    catch(e) {
        console.error("Something went wrong during connection to DB:");
        console.error(e);
        return;
    }
    
    app.get("/room", (_, res) => api.getAllRooms(res));
    app.get("/room/free", (req, res) => api.getFreeRooms(req, res)); // From-to period in query
    app.put("/room/:roomId", (req, res) => api.bookRoom(req, res)); // From-to period, guest id, vip in query
    app.delete("/booking/:bookingId", (req, res) => api.deleteBookingById(req, res));
    
    app.listen(process.env.PORT);
    console.info(`Server is listening on port ${process.env.PORT}...`);
})();

async function stop() {
    try {
        await api.closeConnection();
        console.info("Server stopped");
        process.exit(0);
    } catch(e) {
        console.error("Something went wrong during disconnection from DB:");
        console.error(e);
    }
}

process.once("SIGINT", stop);
process.once("SIGTERM", stop);