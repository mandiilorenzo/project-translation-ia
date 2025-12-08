'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const forgotPasswordSchema = z.object({
    email: z.string().email('Por favor, insira um e-mail válido')
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false) 

    const {
        register,
        handleSubmit,
        getValues, 
        formState: { errors }
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const onSubmit = async (data: ForgotPasswordData) => {
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Recovery email sent to:', data.email)

            setIsSuccess(true)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="text-center animate-fade-in-up">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-teal-600" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">Verifique seu e-mail</h3>

                <p className="text-slate-600 mb-8 leading-relaxed">
                    Enviamos as instruções de recuperação para:<br />
                    <span className="font-semibold text-slate-900">{getValues('email')}</span>
                </p>

                <div className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open('https://gmail.com', '_blank')}
                    >
                        Abrir aplicativo de e-mail
                    </Button>

                    <p className="text-xs text-slate-500">
                        Não recebeu?{' '}
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="text-teal-600 font-semibold hover:underline"
                        >
                            Clique para reenviar
                        </button>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                    Digite o e-mail associado à sua conta e enviaremos um link seguro para redefinir sua senha.
                </p>

                <Input
                    label="E-mail profissional"
                    type="email"
                    placeholder="nome@hospital.com"
                    icon={Mail}
                    error={errors.email?.message}
                    disabled={isLoading}
                    {...register('email')}
                />
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-teal-600/20"
                isLoading={isLoading}
            >
                {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
        </form>
    )
}