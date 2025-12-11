export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'PROFESSIONAL' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

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

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}