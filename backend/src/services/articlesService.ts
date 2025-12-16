import { PrismaClient } from "@prisma/client";
import { extractTextFromBuffer } from "../utils/fileExtractor";
import { CreateArticleInput } from "@/types/article";
import fs from "fs";

const prisma = new PrismaClient();

export class ArticleService {
  static async create(userId: string, data: CreateArticleInput) {
    try {
      const buffer = fs.readFileSync(data.filePath);

      const { text, metadata, method } = await extractTextFromBuffer(
        buffer,
        data.fileType
      );

      if (!text || !text.trim()) {
        throw new Error("O texto extraído está vazio. Verifique se o arquivo contém texto selecionável.");
      }

      const title =
        metadata?.title ||
        data.originalTitle ||
        data.fileName.replace(/\.[^/.]+$/, "") ||
        "Artigo sem título";

      const article = await prisma.article.create({
        data: {
          userId,
          fileName: data.fileName,
          filePath: data.filePath,
          fileSize: data.fileSize,
          fileType: data.fileType,
          originalTitle: title,
          sourceLanguage: data.sourceLanguage || "en",
          targetLanguage: data.targetLanguage || "pt-BR",
          status: "PENDING",
          originalContent: text,
          metadata: {
            extractionMethod: method,
            pdfMetadata: metadata, 
            pageCount: metadata?.pages || 0,
            author: metadata?.author || "Desconhecido",
            characters: text.length,
            words: text.split(/\s+/).length,
          },
        },
      });

      return {
        success: true,
        message: `Upload realizado com sucesso (via ${method})`,
        articleId: article.id,
        title,
        author: metadata?.author || "Desconhecido",
        pages: metadata?.pages || "N/A",
        preview: text.substring(0, 200) + "...",
        statistics: {
          characters: text.length,
          words: text.split(/\s+/).length,
        },
      };

    } catch (error: any) {
      throw new Error(error.message || "Erro interno ao processar artigo.");
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
