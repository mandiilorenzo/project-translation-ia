'use client'
import React, { useState, useRef } from 'react'
import {
  Brain,
  ShieldCheck,
  FileText,
  Zap,
  Clock,
  CheckCircle,
  Users,
  ArrowRight,
  Globe,
  Sparkles,
  Menu,
  X
} from 'lucide-react'

// Componente Navbar atualizado para Tailwind v4
const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Início', href: '#' },
    { label: 'Recursos', href: '#features' },
    { label: 'Como Funciona', href: '#how-it-works' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Contato', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container-narrow section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--color-brand-600)] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Medi<span className="text-[var(--color-brand-600)]">Translate</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-[var(--color-brand-600)] font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-[var(--color-brand-600)] font-medium transition-colors"
            >
              Entrar
            </a>
            <button className="btn-primary">
              Começar Gratuitamente
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-[var(--color-brand-600)] font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="#"
                  className="text-center text-gray-600 hover:text-[var(--color-brand-600)] font-medium py-2"
                >
                  Entrar
                </a>
                <button className="btn-primary w-full">
                  Começar Gratuitamente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const [featuresMousePosition, setFeaturesMousePosition] = useState({ x: 0, y: 0 })
  const featuresRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleFeaturesMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (featuresRef.current) {
      const rect = featuresRef.current.getBoundingClientRect()
      setFeaturesMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const features = [
    {
      icon: Brain,
      title: 'IA Especializada em Medicina',
      description: 'Modelos treinados com milhões de artigos médicos para garantir precisão terminológica absoluta.',
      color: 'from-blue-500 to-cyan-500',
      bgAccent: 'bg-blue-50',
      textAccent: 'text-blue-600',
      delay: '0ms'
    },
    {
      icon: ShieldCheck,
      title: 'Validação por Especialistas',
      description: 'O fluxo inclui verificação de terminologia validada por profissionais da área médica.',
      color: 'from-emerald-500 to-teal-500',
      bgAccent: 'bg-emerald-50',
      textAccent: 'text-emerald-600',
      delay: '100ms'
    },
    {
      icon: FileText,
      title: 'Preservação de Formato',
      description: 'A IA reconstrói o layout original, mantendo tabelas, gráficos e referências intactas.',
      color: 'from-violet-500 to-purple-500',
      bgAccent: 'bg-violet-50',
      textAccent: 'text-violet-600',
      delay: '200ms'
    },
    {
      icon: Zap,
      title: 'Processamento Rápido',
      description: 'Traduza papers complexos em minutos, acelerando drasticamente sua pesquisa.',
      color: 'from-amber-500 to-orange-500',
      bgAccent: 'bg-amber-50',
      textAccent: 'text-amber-600',
      delay: '300ms'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Upload Simples',
      description: 'Arraste seu PDF, DOCX ou cole o texto. Nossa plataforma segura aceita múltiplos formatos.'
    },
    {
      number: '02',
      title: 'Análise Contextual',
      description: 'A IA identifica o domínio médico específico e aplica a terminologia adequada ao contexto.'
    },
    {
      number: '03',
      title: 'Revisão Interativa',
      description: 'Visualize o resultado e faça ajustes finos em termos específicos se desejar.'
    },
    {
      number: '04',
      title: 'Download Formatado',
      description: 'Baixe o documento traduzido com a formatação idêntica ao original.'
    }
  ]

  const stats = [
    { value: '99.2%', label: 'Precisão Técnica', icon: CheckCircle },
    { value: '< 5min', label: 'Tempo Médio', icon: Clock },
    { value: '10K+', label: 'Artigos Traduzidos', icon: FileText },
    { value: '2K+', label: 'Pesquisadores', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-[var(--color-brand-200)] selection:text-[var(--color-brand-900)]">
      <AppBar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden group"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-brand-100)]/40 via-white to-white -z-20" />
        
        {/* Grid Pattern Background */}
        <div 
          className="absolute top-0 left-0 right-0 h-[500px] -z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230b8ce9' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gravity Spotlight Effect */}
        <div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(11, 140, 233, 0.15), transparent 40%),
              radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(11, 140, 233, 0.1), transparent 20%)
            `
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-[var(--color-brand-200)]/30 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite] -z-20" />
        <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-[var(--color-medical-teal)]/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite] -z-20" />

        <div className="container-narrow section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Modern Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-brand-100)] shadow-sm text-[var(--color-brand-700)] text-sm font-medium mb-8 animate-[fadeIn_0.6s_ease-out_forwards] hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-[ping_1s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-400)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-500)]"></span>
              </span>
              <span className="font-semibold tracking-wide text-xs uppercase">Nova Geração de IA Médica</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 animate-[slideUp_0.6s_ease-out_forwards]">
              Tradução Médica com <br className="hidden md:block" />
              <span className="gradient-text pb-2">Precisão Científica.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-[slideUp_0.6s_ease-out_forwards] animate-delay-100">
              Quebre barreiras linguísticas mantendo a exatidão técnica e a formatação original. A ferramenta essencial para pesquisadores globais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-[slideUp_0.6s_ease-out_forwards] animate-delay-200">
              <button className="btn-primary inline-flex items-center justify-center gap-2 text-lg group">
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-[var(--color-brand-500)]" />
                Ver Demonstração
              </button>
            </div>

            {/* Glassmorphism Stats Bar */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto animate-[slideUp_0.6s_ease-out_forwards] animate-delay-300 shadow-[0_4px_20px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)]">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3">
                      <div className="p-2.5 bg-[var(--color-brand-50)] rounded-xl group-hover:bg-[var(--color-brand-100)] transition-colors">
                        <Icon className="w-6 h-6 text-[var(--color-brand-600)]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={featuresRef}
        onMouseMove={handleFeaturesMouseMove}
        className="py-32 bg-[var(--color-surface-50)] relative group/features"
      >
        <div className="container-narrow section-padding">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Tecnologia que entende a <span className="text-[var(--color-brand-600)]">complexidade da saúde</span>
            </h2>
            <p className="text-xl text-slate-600">
              Não somos um tradutor genérico. Nossa plataforma foi construída do zero para entender o contexto de bulas, papers clínicos e protocolos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Shared Spotlight Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/features:opacity-100 transition-opacity duration-500 -z-10"
              style={{
                background: `radial-gradient(800px circle at ${featuresMousePosition.x}px ${featuresMousePosition.y}px, rgba(11, 140, 233, 0.05), transparent 40%)`
              }}
            />

            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 
                border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_10px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[var(--color-brand-100)]
                transition-all duration-300 ease-out relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Individual Card Spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at ${featuresMousePosition.x}px ${featuresMousePosition.y}px, rgba(11, 140, 233, 0.03), transparent 40%)`
                  }}
                />

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg shadow-[var(--color-brand-500)]/20 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm relative z-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="container-narrow section-padding">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Fluxo de trabalho <br /> <span className="text-[var(--color-brand-600)]">simplificado.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Um processo otimizado para a produtividade do pesquisador, eliminando etapas manuais e garantindo qualidade.
              </p>
              <button className="text-[var(--color-brand-600)] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Saiba mais sobre o processo <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-slate-100 hover:border-[var(--color-brand-300)] transition-colors duration-300 py-2">
                  <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-2 border-[var(--color-brand-200)] group-hover:border-[var(--color-brand-500)] transition-colors"></span>
                  <div className="text-xs font-bold text-[var(--color-brand-500)] mb-2 tracking-widest">{step.number}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Feel */}
      <section className="py-24 relative">
        <div className="container-narrow section-padding">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-[var(--color-brand-900)] shadow-2xl shadow-[var(--color-brand-900)]/30">
            {/* Background Art */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.8), rgba(15, 118, 110, 0.8)), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-900)] via-[var(--color-brand-900)]/90 to-[var(--color-brand-800)]/80"></div>

            <div className="relative z-10 px-8 py-16 md:p-20 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Acelere sua pesquisa global hoje.
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-brand-100)] mb-10 max-w-2xl mx-auto">
                Junte-se a mais de 2.000 pesquisadores que utilizam a MediTranslate para acessar e compartilhar conhecimento médico.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <button className="bg-white text-[var(--color-brand-900)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-brand-50)] hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
                  Criar Conta Gratuita
                </button>
                <p className="text-[var(--color-brand-200)] text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--color-medical-mint)]" />
                  3 primeiros artigos grátis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="container-narrow section-padding">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[var(--color-brand-600)] rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">MediTranslate</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                IA de tradução de precisão para a comunidade médica e científica global.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Produto</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Segurança</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Empresa</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>© {new Date().getFullYear()} MediTranslate Inc.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[var(--color-brand-600)] transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage