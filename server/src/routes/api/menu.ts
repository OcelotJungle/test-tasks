import { Router } from "express";
import MenuController from "../../controllers/menu";
import authorize from "../../middleware/authorize";

const router = Router();

router.get("/categories", MenuController.getCategories);

router.get("/", MenuController.getAll);
router.get("/:id", MenuController.get);

router.post("/", authorize, MenuController.create);
router.put("/:id", authorize, MenuController.update);
router.delete("/:id", authorize, MenuController.remove);

export default router;