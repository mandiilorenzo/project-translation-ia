export interface CreateArticleInput {
  originalTitle?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  originalContent?: string; 
}