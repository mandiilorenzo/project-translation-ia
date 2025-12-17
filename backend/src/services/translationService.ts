import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY não está definida no arquivo .env");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

export class TranslationService {
  static async translate(
    text: string,
    targetLang: string = "pt-BR"
  ): Promise<string> {

    try {
      const prompt = `
        Atue como um tradutor especialista em artigos científicos da área da saúde.
        
        Sua tarefa:
        Traduzir o texto abaixo do inglês para o Português do Brasil (${targetLang}).
        
        Regras Obrigatórias:
        1. Mantenha a terminologia médica técnica correta e formal.
        2. Não resuma o conteúdo. A tradução deve ser completa.
        3. Mantenha a formatação de parágrafos original sempre que possível.
        4. Retorne APENAS o texto traduzido, sem introduções do tipo "Aqui está a tradução".

        Texto para traduzir:
        "${text.substring(0, 30000)}"
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const translatedText = response.text;

      if (!translatedText) {
        throw new Error("A IA não retornou texto.");
      }

      return translatedText;
    } catch (error: any) {

      if (error.message?.includes("not found") || error.status === 404) {
        throw new Error(
          "O modelo 'gemini-2.5-flash' não foi encontrado. Tente alterar para 'gemini-1.5-flash' no código."
        );
      }

      throw new Error(`Erro na IA: ${error.message}`);
    }
  }
}
