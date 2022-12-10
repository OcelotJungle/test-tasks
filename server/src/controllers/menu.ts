import { Request, Response } from "express";
import MenuModel from "../models/menu";
import handleError from "../utils/handle-error";
import respond from "../utils/respond";

function handleNotFound(res: Response, data: unknown, okStatus = 200) {
    if(data) res.status(okStatus).json(data);
    else respond(res, 404);
}

export default class MenuController {
    static getCategories(_: Request, res: Response) {
        handleError(res, async () => {
            res.json(await MenuModel.getCategories());
        });
    }

    static getAll(_: Request, res: Response) {
        handleError(res, async () => {
            res.json(await MenuModel.getAll());
        });
    }

    static get({ params: { id } }: Request, res: Response) {
        handleError(res, async () => {
            handleNotFound(res, await MenuModel.get(Number(id)));
        });
    }

    static create({ body: { dish, photos } }: Request, res: Response) {
        handleError(res, async () => {
            res.status(201).json(await MenuModel.create(dish, photos));
        });
    }

    static update({ params: { id }, body: { dish, photos } }: Request, res: Response) {
        handleError(res, async () => {
            handleNotFound(res, await MenuModel.update(Number(id), dish, photos));
        });
    }

    static remove({ params: { id } }: Request, res: Response) {
        handleError(res, async () => {
            handleNotFound(res, await MenuModel.remove(Number(id)));
        });
    }
}