'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const loginSchema = z.object({
    email: z.string().email('Insira um e-mail válido'),
    password: z.string().min(1, 'A senha é obrigatória')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [rootError, setRootError] = useState('') 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setRootError('')

        try {
            console.log('Tentativa de login:', data)
            // Simulação de delay de rede
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Lógica de sucesso aqui
            // await signIn('credentials', { ... }) 

            router.push('/Dashboard')
        } catch (err) {
            console.error(err)
            setRootError('E-mail ou senha incorretos. Por favor, tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

            {rootError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm animate-fade-in-up">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{rootError}</span>
                </div>
            )}

            <div className="space-y-4">
                <Input
                    label="E-mail profissional"
                    type="email"
                    placeholder="nome@hospital.com"
                    icon={Mail}
                    error={errors.email?.message} 
                    disabled={isLoading}
                    {...register('email')}
                />

                <div className="space-y-1">
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        error={errors.password?.message}
                        disabled={isLoading}
                        {...register('password')}
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.push('/ForgotPassword')}
                            className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors focus:outline-none focus:underline"
                            disabled={isLoading}
                        >
                            Esqueceu a senha?
                        </button>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-teal-600/20"
                isLoading={isLoading}
            >
                {isLoading ? 'Autenticando...' : 'Acessar Conta'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>

            <p className="text-xs text-center text-slate-400 mt-6">
                Protegido por criptografia de ponta a ponta.
            </p>
        </form>
    )
}