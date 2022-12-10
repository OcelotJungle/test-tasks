import { Response } from "express";

export default function respond(res: Response, status = 200, message = "") {
    res.status(status).end(message);
}