export interface UploadResponse {
  success: boolean;
  message: string;
  articleId: string;
  title: string;
  previewOriginal: string;
  previewTranslated: string;
}

export interface Article {
  id: string;
  originalTitle: string | null;
  translatedTitle: string | null;
  originalContent: string;
  translatedContent: string | null;
  status: "PENDING" | "TRANSLATING" | "COMPLETED" | "FAILED";
  createdAt: string;
}
