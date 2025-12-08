import Link from 'next/link'
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm'
import { ArrowLeft, Languages } from 'lucide-react'

export const metadata = {
    title: 'Recuperar Senha - HealthTranslatr',
    description: 'Redefina sua senha de acesso.',
}

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/" className="flex justify-center items-center gap-2 mb-8 group">
                    <div className="bg-teal-600 p-2 rounded-lg group-hover:bg-teal-700 transition-colors shadow-sm">
                        <Languages className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                        Med<span className="text-teal-600">Translate</span>
                    </span>
                </Link>

                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
                    Esqueceu sua senha?
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 sm:rounded-2xl sm:px-10 border border-slate-100">

                    <ForgotPasswordForm />

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <Link
                            href="/Login"
                            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors group"
                        >
                            <div className="p-1 rounded-full group-hover:bg-teal-50 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Voltar para o Login
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 relative z-10">
                &copy; {new Date().getFullYear()} MedTranslate. Segurança garantida.
            </div>
        </div>
    )
}