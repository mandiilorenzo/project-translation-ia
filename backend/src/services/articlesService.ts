import { PrismaClient } from "@prisma/client";
import { CreateArticleInput } from "../types/article";


const prisma = new PrismaClient();

export class ArticleService {
  static async create(userId: string, data: CreateArticleInput) {
    try {
      const article = await prisma.article.create({
        data: {
          userId, 
          originalTitle: data.originalTitle,
          originalContent: data.originalContent,
          sourceLanguage: data.sourceLanguage || "en",
          targetLanguage: data.targetLanguage || "pt-BR",
          fileName: data.fileName,
          status: "PENDING", 
        },
      });

      return { success: true, article };
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
      throw new Error("Erro ao salvar artigo no banco.");
    }
  }

  static async listByUser(userId: string) {
    try {
      const articles = await prisma.article.findMany({
        where: { userId }, 
        orderBy: { createdAt: "desc" }, 
        select: {
          id: true,
          originalTitle: true,
          status: true,
          createdAt: true,
          fileName: true,
        },
      });
      return articles;
    } catch (error) {
      throw new Error("Erro ao buscar lista de artigos.");
    }
  }

  static async getById(userId: string, articleId: string) {
    try {
      const article = await prisma.article.findFirst({
        where: {
          id: articleId,
          userId, 
        },
      });

      if (!article) {
        throw new Error("Artigo não encontrado ou acesso negado.");
      }

      return article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
