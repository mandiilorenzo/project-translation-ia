'use client'

import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/button'; 

export default function CTASection() {
    return (
        <section className="py-24 bg-teal-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                    Pronto para acelerar sua pesquisa?
                </h2>

                <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Junte-se a mais de 5.000 profissionais da saúde que usam o MedTranslate para romper barreiras linguísticas.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" variant="primary" className="shadow-xl shadow-teal-900/10">
                        Criar Conta Gratuita
                    </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Teste grátis de 7 dias • Sem cartão de crédito</span>
                </div>
            </div>
        </section>
    );
}