'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Languages, Menu, X } from 'lucide-react'
import Button from '@/components/ui/button'

const AppBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const navItems = [
        { label: 'Início', href: '/' },
        { label: 'Funcionalidades', href: '#features' },
        { label: 'Como Funciona', href: '#how-it-works' },
    ]

    const handleNavigation = (href: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault()

        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push(href)
        }
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-teal-600 p-1.5 rounded-lg group-hover:bg-teal-700 transition-colors">
                            <Languages className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight cursor-pointer">
                            Med<span className="text-teal-600">Translate</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={(e) => handleNavigation(item.href, e)}
                                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors cursor-pointer outline-none focus:text-teal-600"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/Login')}
                        >
                            Entrar
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => router.push('/Signup')}
                        >
                            Começar Agora
                        </Button>
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors outline-none focus:ring-2 focus:ring-teal-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        aria-label="Menu principal"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100 bg-white absolute left-0 right-0 px-4 shadow-xl animate-fade-in-up">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={(e) => handleNavigation(item.href, e)}
                                    className="text-slate-600 hover:text-teal-600 hover:bg-teal-50 font-medium py-3 px-4 rounded-lg text-left transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}

                            <div className="border-t border-slate-100 my-2 pt-4 flex flex-col gap-3">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-center"
                                    onClick={() => {
                                        router.push('/Login')
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    Entrar
                                </Button>

                                <Button
                                    variant="primary"
                                    className="w-full justify-center shadow-md"
                                    onClick={() => {
                                        router.push('/Signup')
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    Começar Agora
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default AppBar