'use client'

import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const [showTranslation, setShowTranslation] = useState(false);
    const router = useRouter();

    const englishText =
        "The efficacy of novel immunotherapeutic agents in treating advanced malignancies has demonstrated significant clinical outcomes in recent meta-analyses.";

    const portugueseText =
        "A eficácia de novos agentes imunoterapêuticos no tratamento de malignidades avançadas demonstrou resultados clínicos significativos em meta-análises recentes.";

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" role="main">

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/4" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 rounded-full border border-teal-100 mx-auto lg:mx-0">
                            <Zap className="w-4 h-4 text-teal-600" aria-hidden="true" />
                            <span className="text-xs font-semibold tracking-wide uppercase text-teal-700">
                                Powered by Advanced AI
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                            Tradução Científica <br className="hidden lg:block" />
                            <span className="text-teal-600">Precisa e Contextual</span>
                        </h1>

                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            O MedTranslate utiliza inteligência artificial especializada para
                            traduzir artigos da área da saúde, mantendo terminologia técnica,
                            referências e formatação intactos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <Button
                                size="lg"
                                variant="primary"
                                className="gap-2"
                                onClick={() => router.push('/Register')}
                            >
                                Começar Agora
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-slate-200/60">
                            <div>
                                <p className="text-2xl font-bold text-slate-900">99.2%</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Precisão</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">&lt;2min</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Tempo Médio</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">10K+</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Artigos</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-fade-in-up [animation-delay:200ms]">
                        <div className="absolute -inset-1 bg-linear-to-r from-teal-500 to-blue-600 rounded-2xl blur opacity-20 animate-pulse-slow"></div>

                        <div className="relative bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
                            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                    </div>
                                </div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    AI Translation Engine v2.0
                                </p>
                            </div>

                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">EN</div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                            Original Source
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 relative group transition-colors hover:border-slate-200">
                                        <div className="absolute left-0 top-4 bottom-4 w-1 bg-slate-300 rounded-r"></div>
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic pl-2">
                                            {englishText}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center py-2 relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-slate-100"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <button
                                            onClick={() => setShowTranslation(!showTranslation)}
                                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-teal-600 hover:text-teal-700 hover:border-teal-300 hover:shadow-md shadow-sm text-xs font-bold uppercase tracking-wide transition-all z-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 cursor-pointer"
                                        >
                                            {showTranslation ? 'Ocultar Tradução' : 'Traduzir com IA'}
                                            <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${showTranslation ? 'rotate-90' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className={`space-y-2 transition-all duration-500 ease-in-out overflow-hidden ${showTranslation ? 'opacity-100 max-h-48' : 'opacity-50 max-h-0'}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[10px] font-bold text-teal-600">PT</div>
                                        <p className="text-xs font-bold text-teal-600 uppercase tracking-wide">
                                            Saída (MedTranslate)
                                        </p>
                                    </div>
                                    <div className="bg-teal-50/50 rounded-lg p-4 border border-teal-100 relative animate-fade-in-up">
                                        <div className="absolute left-0 top-4 bottom-4 w-1 bg-teal-500 rounded-r"></div>
                                        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pl-2">
                                            {portugueseText}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-medium border-t border-slate-100">
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-teal-500" /> Termos Médicos</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-teal-500" /> Formatação ABNT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}