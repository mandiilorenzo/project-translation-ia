'use client'

import { FileText, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const AppBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Efeito opcional: Adiciona uma sombra leve apenas quando rola a página
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: 'Início', href: '/' },
        // Atualizei os hrefs para apontarem para IDs que provavelmente usaríamos na landing page real
        { label: 'Recursos', href: '#features' },
        { label: 'Como Funciona', href: '#how-it-works' },
        // { label: 'Preços', href: '#pricing' }, // Removido pois não temos essa seção no design atual
        // { label: 'Contato', href: '#contact' }, // Removido para simplificar, focando no CTA
    ]

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b 
            ${isScrolled || isMenuOpen
                ? 'bg-white/90 backdrop-blur-lg border-brand-100/50 shadow-sm'
                : 'bg-white/60 backdrop-blur-md border-transparent'
            }`}>
            <div className="container-narrow section-padding">
                <div className="flex items-center justify-between h-20"> {/* Aumentei levemente a altura para h-20 */}

                    {/* Logo Refinado */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20 transition-transform group-hover:scale-105">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                            Medi<span className="text-brand-600">Translate</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-brand-600 font-semibold text-sm transition-colors duration-300"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <a
                            href="#"
                            className="text-gray-700 hover:text-brand-600 font-semibold text-sm transition-colors duration-300"
                        >
                            Entrar
                        </a>
                        {/* O btn-primary já está estilizado no globals.css, então ele vai combinar automaticamente */}
                        <button className="btn-primary py-2.5 px-6 text-sm">
                            Começar Gratuitamente
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-7 h-7" />
                        ) : (
                            <Menu className="w-7 h-7" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {/* Adicionei uma transição simples de opacidade/transformação */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-lg border-t border-brand-100/50 px-4 pt-2 pb-6 shadow-lg">
                    <div className="flex flex-col gap-2 container-narrow">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 font-semibold py-3 px-4 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="border-t border-gray-100 my-2 pt-4 flex flex-col gap-3 px-4">
                            <a
                                href="#"
                                className="text-center text-gray-700 hover:text-brand-600 font-semibold py-2"
                            >
                                Entrar
                            </a>
                            <button className="btn-primary w-full justify-center py-3">
                                Começar Gratuitamente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AppBar