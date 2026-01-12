'use client'

import { useState, useCallback, useEffect } from 'react'
import {
    UploadCloud,
    FileText,
    CheckCircle2,
    ArrowRight,
    Languages,
    BrainCircuit,
    AlertCircle,
    Loader2,
    Sparkles 
} from 'lucide-react'
import Button from '@/components/ui/button'
import { ArticlesService } from '@/services/articles'
import { UploadResponse } from '@/types/articles'
import Link from 'next/link'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'

type TranslationState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error'

export default function TranslationPage() {
    const [status, setStatus] = useState<TranslationState>('idle')
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const [aiStep, setAiStep] = useState('Iniciando processamento...')
    const [result, setResult] = useState<UploadResponse | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (status === 'processing') {
            const steps = [
                "Extraindo texto do documento...",
                "Identificando terminologia médica...",
                "Enviando para o modelo Gemini...",
                "Traduzindo contexto clínico...",
                "Gerando versão final..."
            ]
            let currentStep = 0

            const interval = setInterval(() => {
                setAiStep(steps[currentStep % steps.length])
                currentStep++
            }, 3000)

            return () => clearInterval(interval)
        }
    }, [status])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx'))) {
            setFile(droppedFile)
        }
    }, [])

    const startTranslation = async () => {
        if (!file) return

        try {
            setStatus('uploading')
            setErrorMessage('')

            const data = await ArticlesService.upload(file, (percent) => {
                setProgress(percent)
                if (percent >= 100) {
                    setStatus('processing')
                }
            })

            setResult(data)
            setStatus('completed')

        } catch (error) {
            console.error(error)

            let message = "Ocorreu um erro ao conectar com o servidor."

            if (isAxiosError(error)) {
                message = error.response?.data?.details || error.response?.data?.error || error.message
            }
            else if (error instanceof Error) {
                message = error.message
            }

            setErrorMessage(message)
            setStatus('error')
        }
    }

    const reset = () => {
        setFile(null)
        setStatus('idle')
        setProgress(0)
        setResult(null)
    }

    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Nova Tradução</h1>
                <p className="text-slate-500 mt-2">
                    Faça upload do seu artigo científico (PDF ou DOCX). Nossa IA manterá a formatação original.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">

                    {status === 'idle' && (
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${file
                                ? 'border-teal-500 bg-teal-50/30'
                                : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50 bg-white'
                                }
            `}
                        >
                            {!file ? (
                                <div className="space-y-6">
                                    <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <UploadCloud className="w-10 h-10 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900">Arraste seu arquivo aqui</h3>
                                        <p className="text-slate-500 mt-2">ou clique para selecionar do computador</p>
                                    </div>
                                    <div className="inline-flex gap-3 text-xs text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                                        <span>PDF</span>
                                        <span>•</span>
                                        <span>DOCX</span>
                                        <span>•</span>
                                        <span>Até 50MB</span>
                                    </div>
                                    <div className="pt-4">
                                        <Button variant="secondary" onClick={() => document.getElementById('file-upload')?.click()}>
                                            Selecionar Arquivo
                                        </Button>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.docx"
                                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-fade-in-up">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">{file.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                                    <div className="flex items-center justify-center gap-3 mt-8">
                                        <Button variant="ghost" onClick={reset} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            Cancelar
                                        </Button>
                                        <Button onClick={startTranslation} className="pl-6 pr-8">
                                            Iniciar Tradução <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {(status === 'uploading' || status === 'processing') && (
                        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm animate-fade-in-up">
                            <div className="flex flex-col items-center text-center">

                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-teal-500 blur-xl opacity-20 animate-pulse"></div>
                                    <div className="relative w-20 h-20 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-lg">
                                        {status === 'uploading' ? (
                                            <UploadCloud className="w-10 h-10 text-teal-600 animate-bounce" />
                                        ) : (
                                            <BrainCircuit className="w-10 h-10 text-teal-600 animate-pulse" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {status === 'uploading' ? 'Enviando arquivo...' : 'Processando Tradução'}
                                </h3>

                                <p className="text-slate-500 h-6 mb-8 font-medium font-mono text-sm flex items-center justify-center gap-2">
                                    {status === 'processing' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {status === 'processing' && (
                                        <span className="animate-fade-in">
                                            {aiStep}
                                        </span>
                                    )}
                                </p>

                                <div className="w-full max-w-md bg-slate-100 rounded-full h-3 overflow-hidden mb-4 relative">
                                    {status === 'processing' && (
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem] animate-[progress-stripes_1s_linear_infinite] z-10 opacity-30"></div>
                                    )}
                                    <div
                                        className="bg-teal-600 h-full transition-all duration-300 ease-out relative"
                                        style={{ width: status === 'uploading' ? `${progress}%` : '100%' }}
                                    ></div>
                                </div>

                                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                                    {status === 'uploading' ? `${progress}%` : 'AI ENGINE V2.0 ACTIVE'}
                                </p>
                            </div>
                        </div>
                    )}

                    {status === 'completed' && result && (
                        <div className="bg-white border border-teal-100 rounded-3xl p-10 shadow-lg shadow-teal-900/5 animate-fade-in-up relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="flex items-start gap-6">
                                <div className="shrink-0">
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Tradução Concluída!</h3>
                                    <p className="text-slate-600 mb-6">
                                        O artigo <strong>{result.title}</strong> foi traduzido com sucesso.
                                    </p>

                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-8">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs font-bold text-slate-500 uppercase">Preview da Tradução</p>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">AI Gemini</span>
                                        </div>
                                        <p className="text-sm text-slate-600 italic">
                                            {result.previewTranslated}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Link href={`/Dashboard/articles/${result.articleId}`}>
                                            <Button size="lg" className="shadow-xl shadow-teal-600/20">
                                                <FileText className="w-5 h-5 mr-2" /> Ler Tradução
                                            </Button>
                                        </Link>

                                        <Button variant="outline" onClick={reset}>
                                            Nova Tradução
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 animate-fade-in-up flex items-start gap-4">
                            <AlertCircle className="w-8 h-8 text-red-600 shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-red-900">Erro na Tradução</h3>
                                <p className="text-red-700 mt-1 mb-4">{errorMessage}</p>
                                <Button variant="secondary" onClick={reset} className="bg-white text-red-600 hover:bg-red-50 border-red-200">
                                    Tentar Novamente
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Languages className="w-4 h-4 text-teal-600" /> Configuração
                        </h4>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">Idioma Original</label>
                                <select className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                                    <option value="en">Inglês</option>
                                    <option value="es">Espanhol</option>
                                    <option value="fr">Francês</option>
                                </select>
                            </div>
                            <div className="flex justify-center text-slate-400">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">Idioma de Destino</label>
                                <select className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                                    <option value="pt-BR">Português (Brasil)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-teal-100 p-2 rounded-lg">
                                <Sparkles className="w-5 h-5 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-slate-800">Glossário Inteligente</h3>
                        </div>

                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            Não quer traduzir o arquivo todo? Cole trechos específicos e deixe nossa IA identificar doenças e medicamentos para você.
                        </p>

                        <Button
                            variant="outline"
                            className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                            onClick={() => router.push('/Dashboard/glossary')}
                        >
                            Acessar Glossário
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}