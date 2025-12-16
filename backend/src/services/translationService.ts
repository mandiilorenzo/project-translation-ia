import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export class TranslationService {
  /**
   * @param text 
   * @param targetLang
   */
  static async translate(
    text: string,
    targetLang: string = "pt-BR"
  ): Promise<string> {

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        "${text}"
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text();

      if (!translatedText) {
        throw new Error("A IA retornou uma resposta vazia.");
      }

      return translatedText;
    } catch (error: any) {
      throw new Error("Falha ao conectar com o serviço de tradução IA.");
    }
  }
}
