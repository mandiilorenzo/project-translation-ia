import { Router } from "express";
import { ArticleController } from "../controllers/articlesController";
import { authenticate } from "../middleware/authMiddleware"; 
import { uploadConfig } from "../config/multer";

const router = Router();

router.use(authenticate);

router.post("/", uploadConfig.single("file"), ArticleController.upload);
router.put("/:id",ArticleController.upload);   
router.get("/", ArticleController.list);     
router.get("/:id", ArticleController.get);    

export default router;