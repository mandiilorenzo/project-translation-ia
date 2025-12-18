import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
if (!AI_SERVICE_URL) {
  throw new Error("AI_SERVICE_URL não está definida no arquivo .env");
}

export class AIService {
  static async extractTerms(text: string) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/extract-terms`, {
        text: text,
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao conectar com AI Service:", error);
      return { terms: [] };
    }
  }
}
