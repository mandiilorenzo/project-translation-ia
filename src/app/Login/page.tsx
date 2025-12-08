// app/login/page.tsx
import Link from 'next/link'
import LoginForm from '@/components/Forms/LoginForm'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Login - MediTranslate',
    description: 'Faça login na sua conta MediTranslate',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="container-narrow section-padding">
                {/* Header */}
                <header className="py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o site
                    </Link>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-12">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left side - Illustration/Info */}
                        <div className="lg:w-1/2">
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Bem-vindo de volta
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Acesse sua conta para continuar traduzindo artigos médicos com precisão.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Acesso à biblioteca</h3>
                                        <p className="text-gray-600">Revise seus artigos traduzidos anteriormente</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">⚡</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Processamento rápido</h3>
                                        <p className="text-gray-600">Traduções em minutos com IA especializada</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">🔒</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Segurança garantida</h3>
                                        <p className="text-gray-600">Seus dados e documentos protegidos</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="lg:w-1/2">
                            <LoginForm />

                            {/* Alternative Login Options */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Ou continue com</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.152 6.896c-.438 0-.843.146-1.189.394-1.151.896-1.573 2.543-1.403 4.155.042.433.397.768.835.768.43 0 .78-.332.82-.762.126-1.283.469-2.562 1.318-3.193.264-.199.63-.362 1.05-.362 1.381 0 2.5 1.119 2.5 2.5 0 1.381-1.119 2.5-2.5 2.5h-4.5v2h4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5z" />
                                        </svg>
                                        Google
                                    </button>

                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}