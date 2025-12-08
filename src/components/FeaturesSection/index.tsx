import { ShieldCheck, FileText, Zap } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function FeaturesSection() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Precisão Terminológica",
            desc: "Distingue 'Heart Failure' de 'Cardiac Arrest' com precisão. Vocabulário técnico validado por bases médicas."
        },
        {
            icon: FileText,
            title: "Formatação Preservada",
            desc: "Mantemos tabelas, legendas de figuras e referências ABNT/Vancouver exatamente onde devem estar."
        },
        {
            icon: Zap,
            title: "Velocidade de Processamento",
            desc: "Traduza um paper de 50 páginas em menos de 2 minutos. Economize horas de revisão manual."
        }
    ];

    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    badge="Diferenciais"
                    title="Por que não usar o Google Translate?"
                    subtitle="Ferramentas genéricas falham em contextos clínicos. O MedTranslate foi treinado em milhões de papers do PubMed e Scielo."
                />

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <feature.icon className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}