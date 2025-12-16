import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import * as mammoth from 'mammoth';
import { ExtractionResult } from '../types/article';

export type SupportedMimeType = 
  | 'application/pdf' 
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export async function extractTextFromBuffer(buffer: Buffer, mimeType: string): Promise<ExtractionResult> {
  switch (mimeType) {
    case 'application/pdf':
      return await extractFromPdf(buffer);
    
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return await extractFromDocx(buffer);
    
    default:
      throw new Error(`Tipo de arquivo não suportado: ${mimeType}`);
  }
}

async function extractFromPdf(buffer: Buffer): Promise<ExtractionResult> {
  const data = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true, 
    verbosity: 0 
  });

  const pdfDocument = await loadingTask.promise;
  const maxPages = pdfDocument.numPages;
  
  let info: any = {};
  try {
    const metaData = await pdfDocument.getMetadata();
    info = metaData?.info || {};
  } catch (e) {
    console.warn("Aviso: Não foi possível ler metadados do PDF");
  }

  const pagePromises: Promise<string>[] = [];
  for (let i = 1; i <= maxPages; i++) {
    pagePromises.push(getPageText(pdfDocument, i));
  }
  
  const pageTexts = await Promise.all(pagePromises);
  const fullText = pageTexts.join('\n\n');

  return {
    text: fullText,
    method: 'pdf-parse',
    metadata: {
      pages: maxPages,
      title: info.Title,
      author: info.Author,
      producer: info.Producer
    }
  };
}

async function getPageText(pdfDocument: any, pageNum: number): Promise<string> {
  const page = await pdfDocument.getPage(pageNum);
  const textContent = await page.getTextContent();
  
  return textContent.items
    .map((item: any) => item.str)
    .join(' ');
}

async function extractFromDocx(buffer: Buffer): Promise<ExtractionResult> {
  const result = await mammoth.extractRawText({ buffer: buffer });
  
  return {
    text: result.value,
    method: 'mammoth',
    metadata: {
      pages: 0,
      author: 'Unknown',
    }
  };
}