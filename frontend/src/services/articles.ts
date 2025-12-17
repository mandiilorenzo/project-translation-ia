import { api } from "./api";

export interface UploadResponse {
  success: boolean;
  message: string;
  articleId: string;
  title: string;
  previewOriginal: string;
  previewTranslated: string;
}

export const ArticlesService = {
    upload: async ( file: File, onProgress: (progress: number) => void ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append("sourceLanguage", "en");
    formData.append("targetLanguage", "pt-BR");

    const response = await api.post<UploadResponse>( "api/articles/upload", formData,
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
};
