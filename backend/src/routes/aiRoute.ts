import { Router } from 'express';
import { AIController } from '../controllers/aiController';
import { authenticate } from '../middleware/authMiddleware'; 

const router = Router();
router.use(authenticate);

router.post('/glossary', AIController.generateGlossary);

export default router;