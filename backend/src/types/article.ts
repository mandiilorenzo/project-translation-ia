export interface Article {
  id: string;
  userId: string;
  originalTitle?: string;
  translatedTitle?: string;
  originalContent?: string;
  translatedContent?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  sourceLanguage?: string;
  targetLanguage?: string;
  wordCount?: number;
  processingTime?: number;
  errorMessage?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface ExtractionResult {
  text: string;
  metadata: {
    pages?: number;
    author?: string;
    title?: string;
    [key: string]: any;
  };
  method: 'pdf-parse' | 'mammoth' | 'unknown';
}
