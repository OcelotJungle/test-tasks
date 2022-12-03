import { createServer } from "http";
import { WebSocketServer } from "ws";
import url from "node:url";
import querystring from "node:querystring";
import path from "path";
import fs from "fs";

const server = createServer((req, res) => {
    fs.createReadStream(path.join("../client/build/", req.url === "/" ? "index.html" : req.url)).pipe(res);
});

const clients = new Set();

function broadcast(author, text, type) {
    const message = JSON.stringify({ author, text, type });
    for(const client of clients) client.send(message);
}

const wss = new WebSocketServer({ server });
wss.on("connection", (ws, req) => {
    const nickname = querystring.parse(url.parse(req.url).query).nickname;
    if(!nickname) return ws.close();

    clients.add(ws);

    broadcast(nickname, "* joined chat *", "status");
    
    ws.on("message", data => broadcast(nickname, data.toString(), "message"));
    ws.on("close", () => {
        clients.delete(ws);
        broadcast(nickname, "* left chat *", "status");
    });
});

const PORT = process.env.NODE_ENV === "production" ? 80 : 3001;
server.listen(PORT);
console.info(`Server is listening on port ${PORT}...`);