// components/forms/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Loader2 } from 'lucide-react'

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError('')

        try {
            // Simulação de API call
            console.log('Login attempt:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulação de login bem-sucedido
            // Em produção, você faria:
            // const response = await fetch('/api/auth/login', {...})

            // Redireciona para dashboard
            router.push('/dashboard')

        } catch (err) {
            setError('Credenciais inválidas. Tente novamente.')
            console.error('Login error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Acesse sua conta
            </h2>

            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* ... campos do formulário ... */}

                <button
                    type="submit" // ✅ IMPORTANTE: type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Entrando...
                        </>
                    ) : (
                        'Entrar'
                    )}
                </button>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <button
                            type="button" // ✅ IMPORTANTE: type="button" para não submeter o form
                            onClick={() => router.push('/register')}
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            Cadastre-se
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm