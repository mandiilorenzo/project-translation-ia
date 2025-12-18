'use client'

import { useEffect, useState } from 'react'
import { User, Mail, Globe, Save, Shield, Loader2 } from 'lucide-react'
import Button from '@/components/ui/button'
import { AuthService } from '@/services/auth'
import { AxiosError } from 'axios'

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        language: 'pt-BR',
        theme: 'light'
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('medtranslate_user')
        if (storedUser) {
            const user = JSON.parse(storedUser)
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }))
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const result = await AuthService.updateProfile(formData.name)

            if (result.success && result.user) {
                const updatedUser = result.user

                const currentUserStorage = localStorage.getItem('medtranslate_user')
                if (currentUserStorage) {
                    const currentData = JSON.parse(currentUserStorage)
                    const newData = { ...currentData, ...updatedUser }

                    localStorage.setItem('medtranslate_user', JSON.stringify(newData))

                    window.dispatchEvent(new Event('storage'))
                }

                alert(result.message || 'Perfil atualizado com sucesso!')
                window.location.reload()
            } else {
                throw new Error(result.message || 'Erro desconhecido')
            }

        } catch (error) {
            console.error('Erro no update:', error)

            let msg = 'Erro ao atualizar perfil.'

            if (error instanceof AxiosError) {
                msg = error.response?.data?.message || error.message || msg
            }
            else if (error instanceof Error) {
                msg = error.message
            }

            alert(msg)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
                <p className="text-slate-500">Gerencie seu perfil e preferências do sistema.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">Perfil Público</h3>
                            <p className="text-sm text-slate-500">Informações visíveis na sua conta.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                placeholder="Seu nome"
                                required
                                minLength={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-xs text-slate-400">O e-mail não pode ser alterado por aqui.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">Preferências de Tradução</h3>
                            <p className="text-sm text-slate-500">Defina os padrões para suas novas traduções.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Idioma de Origem Padrão</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                disabled
                            >
                                <option>Inglês (English)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Idioma de Destino Padrão</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            >
                                <option value="pt-BR">Português (Brasil)</option>
                                <option value="es">Espanhol</option>
                                <option value="fr">Francês</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm opacity-75">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">Segurança</h3>
                            <p className="text-sm text-slate-500">Gerencie sua senha e acesso.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-700">Senha</p>
                            <p className="text-xs text-slate-500">Gerenciada pelo sistema de autenticação</p>
                        </div>
                        <Button variant="outline" type="button" disabled>Alterar Senha</Button>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                            </>
                        )}
                    </Button>
                </div>

            </form>
        </div>
    )
}