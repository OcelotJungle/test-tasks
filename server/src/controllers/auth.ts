import { Request, Response } from "express";
import AuthModel from "../models/auth";
import handleError from "../utils/handle-error";
import respond from "../utils/respond";

export default class AuthController {
    static authenticate({ body }: Request, res: Response) {
        handleError(res, async () => {
            const jwt = await AuthModel.authenticate(body);

            if(jwt) res.end(jwt);
            else respond(res, 401);
        });
    }

    static authorize(_: Request, res: Response) {
        respond(res);
    }
}