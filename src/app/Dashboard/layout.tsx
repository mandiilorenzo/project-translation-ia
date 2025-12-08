import Link from 'next/link'
import {
    Languages,
    LayoutDashboard,
    History,
    Book,
    Settings,
    LogOut,
    Bell,
} from 'lucide-react'
import NavItemProps from '@/types/navItem'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">

            <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 fixed h-full z-20 transition-all">
                <div className="p-6 h-20 flex items-center border-b border-slate-800">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="bg-teal-600/20 border border-teal-500/30 p-2 rounded-lg group-hover:bg-teal-600 group-hover:border-teal-500 transition-all duration-300">
                            <Languages className="w-5 h-5 text-teal-400 group-hover:text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Med<span className="text-teal-400">Translate</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Principal</p>
                    <NavItem href="/dashboard" icon={LayoutDashboard} active>Nova Tradução</NavItem>
                    <NavItem href="/dashboard/history" icon={History}>Histórico</NavItem>

                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-2">Ferramentas</p>
                    <NavItem href="/dashboard/glossary" icon={Book}>Glossário Pessoal</NavItem>
                    <NavItem href="/dashboard/settings" icon={Settings}>Configurações</NavItem>
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-slate-800">
                            AS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Dra. Ana Silva</p>
                            <p className="text-xs text-slate-500 truncate">Plano Profissional</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </aside>

            <main className="lg:ml-72 flex-1 flex flex-col min-h-screen relative z-10">

                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                </div>

                <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm bg-slate-50/80 border-b border-slate-200/60">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Workspace</h2>
                        <p className="text-xs text-slate-500">Gerencie suas traduções científicas</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-semibold text-slate-600">Sistema Online</span>
                            </div>
                        </div>

                        <button className="relative p-2 text-slate-400 hover:text-teal-600 hover:bg-white rounded-full transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="p-8 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavItem({ href, icon: Icon, children, active = false }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`
        flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mb-1
        ${active
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
    `}
        >
            <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            {children}
        </Link>
    )
}