import { Router } from "express";
import AuthController from "../../controllers/auth";
import authorize from "../../middleware/authorize";

const router = Router();

router.post("/authenticate", AuthController.authenticate);
router.get("/authorize", authorize, AuthController.authorize);

export default router;