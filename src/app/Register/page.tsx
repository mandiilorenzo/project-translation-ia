import Link from 'next/link'
import RegisterForm from '@/components/Forms/RegisterForm'
import { ArrowLeft, Languages, FileText, Zap, Star } from 'lucide-react'

export const metadata = {
    title: 'Criar Conta - MedTranslate',
    description: 'Comece a traduzir seus artigos científicos hoje.',
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex bg-white">

            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center px-12">

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-lg w-full">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-teal-600/20 border border-teal-500/30 p-2.5 rounded-xl backdrop-blur-sm">
                            <Languages className="w-8 h-8 text-teal-400" />
                        </div>
                        <span className="text-3xl font-bold text-white tracking-tight">
                            Med<span className="text-teal-400">Translate</span>
                        </span>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            Junte-se a <span className="text-teal-400">5.000+</span><br />
                            pesquisadores globais.
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed">
                            Acelere a publicação dos seus artigos eliminando a barreira do idioma com IA especializada.
                        </p>

                        <div className="grid gap-5">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="p-2 bg-teal-900/40 rounded-lg text-teal-400">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Tradução Instantânea</h4>
                                    <p className="text-sm text-slate-500">De dias para segundos.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="p-2 bg-blue-900/40 rounded-lg text-blue-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Layout Intacto</h4>
                                    <p className="text-sm text-slate-500">Preserva tabelas e imagens.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-slate-800/50">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                                ))}
                            </div>
                            <div className="text-sm text-slate-400">
                                <div className="flex items-center gap-1 text-amber-400">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-slate-500">Avaliado por médicos e PhDs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 sm:px-12 lg:px-24 relative py-12 lg:py-0">

                <div className="absolute top-8 left-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
                    >
                        <div className="p-1.5 rounded-full bg-slate-50 group-hover:bg-teal-50 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Voltar
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Crie sua conta
                        </h1>
                        <p className="mt-3 text-slate-600">
                            Já possui cadastro?{' '}
                            <Link href="/Login" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                                Fazer login
                            </Link>
                        </p>
                    </div>

                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}