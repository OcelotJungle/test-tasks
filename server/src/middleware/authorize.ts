import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import respond from "../utils/respond";

export default function authorize(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) throw Error();

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY!);
        next();
    }
    catch(e) { respond(res, 401) }
}