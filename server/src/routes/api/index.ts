import { Router } from "express";
import authorize from "../../middleware/authorize";
import authRoutes from "./auth";
import menuRoutes from "./menu";
import uploadRoutes from "./upload";

const router = Router();

router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);
router.use("/upload", authorize, uploadRoutes);

export default router;