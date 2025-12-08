import { UploadCloud, Zap, Download, FileText } from 'lucide-react';

export default function HowItWorksSection() {
    const steps = [
        {
            icon: UploadCloud,
            title: "1. Faça o Upload",
            desc: "Arraste seu arquivo PDF ou DOCX. Suportamos documentos escaneados e LaTeX."
        },
        {
            icon: Zap,
            title: "2. A IA Trabalha",
            desc: "Nossa IA especialista analisa o contexto clínico, siglas e referências em segundos."
        },
        {
            icon: Download,
            title: "3. Baixe Pronto",
            desc: "Receba o arquivo traduzido mantendo a formatação original (tabelas e imagens)."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
                            Simples como um upload.
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            Foque na sua pesquisa, não no dicionário. Nossa plataforma resolve a barreira do idioma mantendo o rigor científico.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex gap-5 group">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-colors duration-300">
                                            <span className="text-teal-400 font-bold text-sm">
                                                {idx + 1}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2 group-hover:text-teal-400 transition-colors">
                                            <step.icon className="w-5 h-5 text-teal-500" />
                                            {step.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 sm:p-12 text-center bg-slate-900/20 hover:border-teal-500/30 transition-colors duration-300">
                                <UploadCloud className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                                <p className="text-slate-300 font-medium">Arraste seu artigo aqui</p>
                                <p className="text-xs text-slate-500 mt-2">PDF, DOCX ou LaTeX até 50MB</p>

                                <div className="mt-8 bg-slate-800 rounded-lg p-4 flex items-center gap-3 text-left border border-slate-700">
                                    <div className="bg-teal-500/10 p-2 rounded">
                                        <FileText className="w-6 h-6 text-teal-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <p className="text-xs font-medium text-white truncate max-w-[150px]">nature_neuroscience_v2.pdf</p>
                                            <span className="text-xs text-teal-400 font-mono">67%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-teal-500 h-1.5 rounded-full w-2/3 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}