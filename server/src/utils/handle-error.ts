import { Response } from "express";
import respond from "./respond";

export default function handleError(res: Response, fn: () => Promise<void>) {
    fn().catch(e => {
        console.error(e);
        respond(res, 500, e instanceof Error ? e.message : String(e));
    });
}