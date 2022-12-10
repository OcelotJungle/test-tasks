import { Router } from "express";
import multer from "multer";
import UploadController from "../../controllers/upload";

const router = Router();

router.use(multer({ fileFilter: (_, { mimetype }, cb) => cb(null,  /^image\//.test(mimetype)) }).array("images"));

router.post("/images", UploadController.images);

export default router;