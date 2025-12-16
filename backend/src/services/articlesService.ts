import { PrismaClient, ArticleStatus } from "@prisma/client";
import { extractTextFromBuffer } from "../utils/fileExtractor";
import { CreateArticleInput } from "@/types/article";
import { TranslationService } from "../services/translationService";
import fs from "fs";

const prisma = new PrismaClient();

export class ArticleService {
  static async create(userId: string, data: CreateArticleInput) {
    console.log(`🚀 Processando: ${data.fileName}`);

    try {
      const buffer = fs.readFileSync(data.filePath);
      const { text, metadata, method } = await extractTextFromBuffer(
        buffer,
        data.fileType
      );

      if (!text.trim()) throw new Error("Texto extraído está vazio");

      const title = metadata?.title || data.originalTitle || data.fileName;

      const article = await prisma.article.create({
        data: {
          userId,
          fileName: data.fileName,
          filePath: data.filePath,
          fileSize: data.fileSize,
          fileType: data.fileType,
          originalTitle: title,
          sourceLanguage: "en",
          targetLanguage: "pt-BR",
          status: ArticleStatus.TRANSLATING,
          originalContent: text,
          metadata: {
            extractionMethod: method,
            pageCount: metadata?.pages || 0,
            author: metadata?.author,
          },
        },
      });

      const translatedContent = await TranslationService.translate(text);

      const updatedArticle = await prisma.article.update({
        where: { id: article.id },
        data: {
          translatedContent: translatedContent,
          translatedTitle: `(PT) ${title}`,
          status: ArticleStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      return {
        success: true,
        message: "Artigo processado e traduzido!",
        articleId: updatedArticle.id,
        previewOriginal: text.substring(0, 100) + "...",
        previewTranslated: translatedContent.substring(0, 100) + "..."
      };
    } catch (error: any) {
      throw new Error(error.message);
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
          fileType: true,
        },
      });

      return articles;
    } catch (error: any) {
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
