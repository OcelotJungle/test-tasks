import { join, normalize } from "path";

export const CLIENT_DIST_FOLDER = join(process.cwd(), process.env.CLIENT_DIST_PATH ?? "../client/dist");

export const DISH_IMAGES_FOLDER_NAME = normalize(process.env.DISH_IMAGES_FOLDER_NAME ?? "/dishes");
export const DISH_IMAGES_FOLDER = join(process.cwd(), DISH_IMAGES_FOLDER_NAME);