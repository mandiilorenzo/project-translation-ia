import { Request, Response } from "express";
import { AIService } from "../services/aiService";

export class AIController {
  static async generateGlossary(req: Request, res: Response) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Texto é obrigatório." });
      }

      const result = await AIService.extractTerms(text);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao gerar glossário." });
    }
  }
}
