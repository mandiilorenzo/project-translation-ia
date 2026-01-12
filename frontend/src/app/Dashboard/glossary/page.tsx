'use client'

import { useState } from 'react'
import { api } from '@/services/api'
import {
    Book,
    Sparkles,
    Stethoscope,
    Pill,
    Activity,
    AlertCircle,
    Loader2,
    Copy,
    Check,
    Trash2,
    Info
} from 'lucide-react'
import Button from '@/components/ui/button'
import { Term } from '@/types/glossary'

export default function GlossaryPage() {
    const [inputText, setInputText] = useState('')
    const [terms, setTerms] = useState<Term[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleAnalyze = async () => {
        if (!inputText.trim()) return

        setIsLoading(true)
        setHasSearched(true)
        setTerms([])
        setCopied(false)

        try {
            const response = await api.post('/api/ai/glossary', {
                text: inputText
            })
            setTerms(response.data.terms)
        } catch (error) {
            console.error(error)
            alert('Erro ao analisar termos. O serviço de IA pode estar offline.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClear = () => {
        setInputText('')
        setTerms([])
        setHasSearched(false)
    }

    const handleCopy = () => {
        const textToCopy = terms.map(t => `${t.term} (${t.category})`).join('\n')
        navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getCategoryStyle = (category: string) => {
        const cat = category.toLowerCase()

        if (cat.includes('medication'))
            return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: Pill, label: 'Medicamento' }

        if (cat.includes('disease') || cat.includes('diagnostic'))
            return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: Activity, label: 'Doença/Diagnóstico' }

        if (cat.includes('symptom') || cat.includes('sign'))
            return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: AlertCircle, label: 'Sintoma/Sinal' }

        if (cat.includes('anatomy') || cat.includes('body'))
            return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: Stethoscope, label: 'Anatomia' }

        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', icon: Info, label: category }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-100 p-3 rounded-xl shadow-sm">
                        <Book className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Glossário Inteligente</h1>
                        <p className="text-slate-500">Extraia e entenda termos técnicos usando IA.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Texto Original (Inglês)</span>
                    {inputText && (
                        <button onClick={handleClear} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                            <Trash2 className="w-3 h-3" /> Limpar
                        </button>
                    )}
                </div>
                <div className="p-4">
                    <textarea
                        className="w-full h-40 p-2 focus:outline-none resize-none text-slate-700 placeholder:text-slate-300"
                        placeholder="Cole aqui o trecho do artigo médico. Ex: The patient was diagnosed with severe pneumonia and treated with Azithromycin..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <Button
                        onClick={handleAnalyze}
                        disabled={isLoading || !inputText}
                        className="bg-teal-600 hover:bg-teal-700 text-white min-w-[140px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analisando...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" /> Analisar com IA
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {hasSearched && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Resultados Encontrados
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                                {terms.length} termos
                            </span>
                        </h3>
                        {terms.length > 0 && (
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copiado!' : 'Copiar Lista'}
                            </Button>
                        )}
                    </div>

                    {terms.length === 0 && !isLoading ? (
                        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
                                <Info className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-slate-900 font-medium">Nenhum termo técnico específico encontrado.</p>
                            <p className="text-sm text-slate-500">Tente usar um texto com nomes de doenças, remédios ou sintomas.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {terms.map((item, index) => {
                                const style = getCategoryStyle(item.category)
                                const Icon = style.icon
                                const percentage = Math.round(item.confidence * 100)

                                return (
                                    <div key={index} className={`bg-white rounded-xl border ${style.border} p-5 shadow-sm hover:shadow-md transition-all group`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`p-2 rounded-lg ${style.bg} ${style.text}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.bg} ${style.text} opacity-75`}>
                                                {style.label}
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold text-slate-800 capitalize mb-1 group-hover:text-teal-600 transition-colors">
                                            {item.term}
                                        </h4>

                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Precisão da IA</span>
                                                <span>{percentage}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${percentage > 90 ? 'bg-teal-500' : 'bg-yellow-500'}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}