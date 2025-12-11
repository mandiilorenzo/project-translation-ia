import { Router } from "express";
import { ArticleController } from "../controllers/articlesController";
import { authenticate } from "../middleware/authMiddleware"; 

const router = Router();

router.use(authenticate);

router.post("/", ArticleController.upload);   
router.get("/", ArticleController.list);     
router.get("/:id", ArticleController.get);    

export default router;