'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArticlesService } from '@/services/articles'
import { Article } from '@/types/articles'
import { ArrowLeft, Download, SplitSquareHorizontal, Calendar, FileText, Loader2 } from 'lucide-react'
import Button from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import jsPDF from 'jspdf' 

export default function ArticleReadPage() {
    const params = useParams()
    const router = useRouter()
    const [article, setArticle] = useState<Article | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (params.id) {
                    const data = await ArticlesService.getById(params.id as string)
                    setArticle(data)
                }
            } catch (err) {
                console.error(err)
                setError('Não foi possível carregar o artigo.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchArticle()
    }, [params.id])

    // --- Lógica de Geração do PDF ---
    const handleExportPDF = () => {
        if (!article || !article.translatedContent) return

        const doc = new jsPDF()

        // Configurações iniciais
        const margin = 20
        const pageWidth = doc.internal.pageSize.getWidth()
        const maxLineWidth = pageWidth - (margin * 2)
        let cursorY = 20 // Posição vertical inicial

        // 1. Título
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        const title = article.translatedTitle || 'Tradução do Documento'

        // Quebra o título se for muito longo
        const titleLines = doc.splitTextToSize(title, maxLineWidth)
        doc.text(titleLines, margin, cursorY)
        cursorY += (titleLines.length * 10) // Desce o cursor

        // Linha divisória
        doc.setLineWidth(0.5)
        doc.line(margin, cursorY, pageWidth - margin, cursorY)
        cursorY += 10

        // 2. Conteúdo
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')

        // Função simples para limpar markdown básico (remove ** e #) para o PDF ficar limpo
        const cleanText = article.translatedContent
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove negrito
            .replace(/^#+\s+/gm, '')          // Remove headers (#)
            .replace(/\n\n/g, '\n')           // Remove quebras duplas excessivas

        // Quebra o texto em linhas que cabem na página
        const textLines = doc.splitTextToSize(cleanText, maxLineWidth)

        // Loop para imprimir linha por linha e criar novas páginas se necessário
        textLines.forEach((line: string) => {
            // Se o cursor estiver chegando no fim da página (altura A4 é ~297mm)
            if (cursorY > 280) {
                doc.addPage() // Cria nova página
                cursorY = 20  // Reseta o cursor para o topo
            }
            doc.text(line, margin, cursorY)
            cursorY += 7 // Espaçamento entre linhas
        })

        // 3. Rodapé
        const pageCount = doc.internal.pages.length - 1
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.setFontSize(10)
            doc.setTextColor(150)
            doc.text(`Página ${i} de ${pageCount} - Gerado por MedTranslate`, pageWidth - margin, 290, { align: 'right' })
        }

        // 4. Salvar
        doc.save(`traducao_${article.id}.pdf`)
    }

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-500">Carregando tradução...</p>
                </div>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center max-w-md">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Ops! Algo deu errado.</h2>
                    <p className="text-slate-500 mb-6">{error || 'Artigo não encontrado.'}</p>
                    <Button onClick={() => router.back()} variant="outline">
                        Voltar para o Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] -m-8">
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 truncate max-w-xl">
                            {article.translatedTitle || article.originalTitle || 'Sem título'}
                        </h1>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Tradução via IA Gemini
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    {/* Botão Agora Funcional */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex"
                        onClick={handleExportPDF}
                    >
                        <Download className="w-4 h-4 mr-2" /> Exportar Arquivo
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid md:grid-cols-2 overflow-hidden bg-slate-50">

                {/* Lado Esquerdo: Original (Inglês) */}
                <div className="border-r border-slate-200 flex flex-col h-full overflow-hidden">
                    <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between sticky top-0">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span> Original (EN)
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 bg-white/50 custom-scrollbar">
                        <div className="prose prose-slate max-w-none text-justify">
                            <ReactMarkdown>{article.originalContent || ''}</ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* Lado Direito: Tradução (Português) */}
                <div className="flex flex-col h-full overflow-hidden bg-white">
                    <div className="bg-teal-50 px-6 py-2 border-b border-teal-100 flex items-center justify-between sticky top-0">
                        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span> Tradução (PT-BR)
                        </span>
                        <SplitSquareHorizontal className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
                        <div className="prose prose-teal max-w-none text-justify">
                            <ReactMarkdown>{article.translatedContent || ''}</ReactMarkdown>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}