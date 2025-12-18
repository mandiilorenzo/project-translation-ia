'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArticlesService } from '@/services/articles'
import { Article } from '@/types/articles'
import { FileText, Calendar, Clock, ArrowRight, Search, Loader2, Trash2, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/button'

export default function HistoryPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = async () => {
        try {
            const data = await ArticlesService.getAll()
            const sortedData = data.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            setArticles(sortedData)
        } catch (error) {
            console.error('Erro ao carregar histórico:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const requestDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setArticleToDelete(id) 
    }

    const confirmDelete = async () => {
        if (!articleToDelete) return

        try {
            setIsDeleting(true)
            await ArticlesService.delete(articleToDelete)

            setArticles(prev => prev.filter(article => article.id !== articleToDelete))
            setArticleToDelete(null) 
        } catch (error) {
            alert('Erro ao excluir. Tente novamente.')
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    const filteredArticles = articles.filter(article => {
        const title = article.translatedTitle || article.originalTitle || 'Sem título'
        return title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="space-y-8 relative">
            {articleToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Excluir documento?</h3>
                                <p className="text-sm text-slate-500">
                                    Essa ação é permanente e não poderá ser desfeita. O arquivo será removido do seu histórico.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setArticleToDelete(null)}
                                disabled={isDeleting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className={!isDeleting ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : ""}
                                onClick={confirmDelete}
                                isLoading={isDeleting}
                            >
                                {isDeleting ? 'Excluindo...' : 'Sim, excluir'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Histórico de Traduções</h1>
                    <p className="text-slate-500">Gerencie e acesse seus documentos traduzidos.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar documentos..."
                        className="pl-10 w-full rounded-md border border-slate-200 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-teal-600 animate-spin mb-2" />
                    <p className="text-slate-500">Buscando seus arquivos...</p>
                </div>
            )}

            {!isLoading && filteredArticles.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Nenhum documento encontrado</h3>
                    <p className="text-slate-500 mb-6">Você ainda não realizou nenhuma tradução.</p>
                    <Link href="/Dashboard">
                        <Button variant="primary">
                            Começar Nova Tradução
                        </Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-200 transition-all duration-300 flex flex-col justify-between h-full relative"
                    >
                        <button
                            onClick={(e) => requestDelete(article.id, e)}
                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors z-10 opacity-0 group-hover:opacity-100"
                            title="Excluir documento"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg ${article.status === 'COMPLETED' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'}`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide mr-8 ${article.status === 'COMPLETED'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {article.status === 'COMPLETED' ? 'Concluído' : 'Processando'}
                                </span>
                            </div>

                            <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors pr-6">
                                {article.translatedTitle || article.originalTitle || 'Documento sem título'}
                            </h3>

                            <div className="space-y-2 text-sm text-slate-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{new Date(article.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{new Date(article.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>

                        <Link href={`/Dashboard/articles/${article.id}`} className="block">
                            <Button
                                variant="outline"
                                className="w-full justify-between group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200"
                            >
                                Acessar Tradução
                                <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}