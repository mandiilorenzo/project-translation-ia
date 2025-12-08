import Link from 'next/link'
import LoginForm from '@/components/Forms/LoginForm'
import { ArrowLeft, Languages, ShieldCheck, Database, Lock } from 'lucide-react'

export const metadata = {
    title: 'Entrar - MedTranslate',
    description: 'Acesse sua conta.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex bg-white">

            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center px-12">

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 max-w-lg w-full">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="bg-teal-600/20 border border-teal-500/30 p-2.5 rounded-xl backdrop-blur-sm">
                            <Languages className="w-8 h-8 text-teal-400" />
                        </div>
                        <span className="text-3xl font-bold text-white tracking-tight">
                            Med<span className="text-teal-400">Translate</span>
                        </span>
                    </div>

                    <div className="space-y-10">
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            A inteligência que a <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-400">
                                medicina moderna exige.
                            </span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-300">
                                <div className="p-2.5 bg-teal-900/30 rounded-lg border border-teal-500/20">
                                    <ShieldCheck className="w-6 h-6 text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Compliance Total</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Seus dados são criptografados ponta-a-ponta e estão em conformidade com HIPAA e GDPR.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-300">
                                <div className="p-2.5 bg-blue-900/30 rounded-lg border border-blue-500/20">
                                    <Database className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Terminologia Validada</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Treinado em +10 milhões de papers do PubMed para garantir precisão em termos oncológicos e clínicos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
                            <Lock className="w-3 h-3" /> Ambiente Seguro Verificado
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 sm:px-12 lg:px-24 relative">

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
                            Bem-vindo de volta
                        </h1>
                        <p className="mt-3 text-slate-600">
                            Não tem uma conta?{' '}
                            <Link href="/Register" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                                Teste gratuitamente por 7 dias
                            </Link>
                        </p>
                    </div>

                        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1">
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-4.6667-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.7833-8.45 8.45 0 4.6667 3.7833 8.45 8.45 8.45Z" fill="#fff" fillOpacity="0" stroke="none" />
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm">Google</span>
                        </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-4 text-slate-500">Ou continue com e-mail</span>
                        </div>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </div>
    )
}