import { Response } from "express";
import { ArticleService } from "../services/articlesService";
import { AuthRequest } from "../types/auth"; 

export class ArticleController {
  
  static async upload(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const result = await ArticleService.create(userId, req.body);
        return res.status(201).json(result);

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id; 
        if (!userId) return res.status(401).json({ error: "Auth required" });

        const articles = await ArticleService.listByUser(userId);
        return res.status(200).json(articles);

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id; 
        const { id } = req.params;

        if (!userId) return res.status(401).json({ error: "Auth required" });

        const article = await ArticleService.getById(userId, id);
        return res.status(200).json(article);

    } catch (error: any) {

        return res.status(500).json({ error: error.message });
    }
  }
}