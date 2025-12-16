import { Response } from "express";
import { ArticleService } from "../services/articlesService";
import { AuthRequest } from "../types/auth"; 
import { uploadConfig } from "../config/multer";
import fs from "fs"; 

const upload = uploadConfig;

export class ArticleController {
  static uploadMiddleware = upload.single("file");

  static async upload(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
      }

      const result = await ArticleService.create(userId, {
        fileName: file.originalname,
        filePath: file.path, 
        fileSize: file.size,
        fileType: file.mimetype,
        originalTitle: req.body.title || req.body.originalTitle,
        sourceLanguage: req.body.sourceLanguage,
        targetLanguage: req.body.targetLanguage,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (error) => {
          if (error) console.error("Erro ao limpar arquivo temporário:", error);
        });
      }

      return res.status(400).json({
        error: error.message,
        details:
          "Verifique se o arquivo é válido e não está protegido por senha.",
      });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Não autenticado" });

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

      if (!userId) return res.status(401).json({ error: "Não autenticado" });

      const article = await ArticleService.getById(userId, id);
      return res.status(200).json(article);
    } catch (error: any) {
      const statusCode = error.message.includes("não encontrado") ? 404 : 500;
      return res.status(statusCode).json({ error: error.message });
    }
  }
}
