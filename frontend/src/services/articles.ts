import { api } from "./api";
import { Article, UploadResponse } from "../types/articles";

export const ArticlesService = {
  upload: async (
    file: File,
    onProgress: (progress: number) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append("sourceLanguage", "en");
    formData.append("targetLanguage", "pt-BR");

    const response = await api.post<UploadResponse>(
      "api/articles/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      }
    );

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Article>(`/api/articles/${id}`);
    return response.data;
  },
};
