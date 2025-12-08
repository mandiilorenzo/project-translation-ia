import Link from 'next/link';
import { Languages, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
                            <div className="bg-teal-600 p-1.5 rounded-lg group-hover:bg-teal-700 transition-colors">
                                <Languages className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                Med<span className="text-teal-600">Translate</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs">
                            Inteligência Artificial especializada em tradução de literatura médica e científica com rigor acadêmico.
                        </p>

                        <div className="flex gap-3">
                            {[Linkedin, Instagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-teal-600 hover:text-white transition-all duration-300"
                                    aria-label="Social Media"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Produto</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#features" className="hover:text-teal-600 transition-colors">Funcionalidades</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Planos e Preços</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">API para Hospitais</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Integrações</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Recursos</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Blog Científico</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Documentação</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Casos de Uso</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Central de Ajuda</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition-colors">Compliance (HIPAA)</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {currentYear} MedTranslate. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}