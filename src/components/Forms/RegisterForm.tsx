'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react'

// Componentes do Design System
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

// Schema de validação
const registerSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Insira um e-mail válido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [rootError, setRootError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        setRootError('')

        try {
            // Simulação de delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log('Dados de registro:', data)
            // Lógica real: const res = await fetch('/api/register', ...)

            router.push('/login?registered=true')

        } catch (err) {
            setRootError('Não foi possível criar a conta. Tente novamente mais tarde.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

            {rootError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm animate-fade-in-up">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{rootError}</span>
                </div>
            )}

            <Input
                label="Nome completo"
                type="text"
                placeholder="Ex: Dra. Ana Silva"
                icon={User}
                error={errors.name?.message}
                disabled={isLoading}
                {...register('name')}
            />

            <Input
                label="E-mail profissional"
                type="email"
                placeholder="nome@hospital.com"
                icon={Mail}
                error={errors.email?.message}
                disabled={isLoading}
                {...register('email')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="Senha"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    error={errors.password?.message}
                    disabled={isLoading}
                    {...register('password')}
                />

                <Input
                    label="Confirmar senha"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    error={errors.confirmPassword?.message}
                    disabled={isLoading}
                    {...register('confirmPassword')}
                />
            </div>

            {/* Checkbox de Termos estilizado */}
            <div className="flex items-start gap-3 pt-2">
                <div className="flex h-6 items-center">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
                    />
                </div>
                <div className="text-sm leading-6">
                    <label htmlFor="terms" className="text-slate-600">
                        Eu concordo com os{' '}
                        <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 hover:underline">
                            Termos de Uso
                        </a>{' '}
                        e{' '}
                        <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 hover:underline">
                            Privacidade
                        </a>.
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-teal-600/20 mt-2"
                isLoading={isLoading}
            >
                {isLoading ? 'Criando conta...' : 'Criar Conta Gratuita'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
        </form>
    )
}