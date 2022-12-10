import { DISH_IMAGES_FOLDER_NAME } from "../consts";
import { join, sep as separator } from "node:path";
import { extension } from "mime-types";
import { randomUUID } from "node:crypto";
import { Request, Response } from "express";
import { writeFile } from "node:fs/promises";
import handleError from "../utils/handle-error";
import respond from "../utils/respond";

export default class UploadController {
    static images({ files }: Request, res: Response) {
        handleError(res, async () => {
            if(!files) return respond(res, 406);

            const result = [];
    
            for(const { mimetype, buffer } of files as Express.Multer.File[]) {
                try {
                    const filename = `${randomUUID()}.${extension(mimetype)}`;

                    const localPath = join(DISH_IMAGES_FOLDER_NAME, filename);
                    const savePath = join(process.cwd(), localPath);

                    await writeFile(savePath, buffer);
                    result.push({ url: localPath.replaceAll(separator, "/") });
                } catch(e) { console.error(e) }
            }
    
            res.status(201).json(result);
        });
    }
}