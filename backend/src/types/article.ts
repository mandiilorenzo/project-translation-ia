export interface CreateArticleInput {
  originalTitle: string;
  originalContent: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  fileName?: string;
}