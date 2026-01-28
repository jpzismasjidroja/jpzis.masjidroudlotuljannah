import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Helper to determine active state
    // Simple check: if pathname is '/' then 'home', else match the path
    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { path: '/', label: 'Beranda' },
        { path: '/profile', label: 'Profil' },
        { path: '/donate', label: 'Infaq' },
        { path: '/transparency', label: 'Transparansi' },
        { path: '/articles', label: 'Kajian' },
        { path: '/contact', label: 'Hubungi' },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 transition-all duration-500 bg-[#29412d]/95 backdrop-blur-md border-b border-[#d0a237]/30 shadow-2xl h-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <Link to="/" className="flex items-center cursor-pointer gap-4 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#d0a237] rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
                            <div className="bg-gradient-to-br from-[#d0a237] to-[#8c6b24] p-0.5 rounded-full shadow-lg">
                                <div className="bg-[#29412d] p-1 rounded-full border border-[#d0a237]/50 overflow-hidden w-12 h-12 flex items-center justify-center">
                                    <img src="/assets/img/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-50 tracking-wide uppercase drop-shadow-md">JPZIS/LAZIZ</h1>
                            <p className="text-[7.6px] text-[#d0a237] tracking-[0.1em] uppercase font-medium">Masjid Jami' Raudlatul Jannah</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1 bg-[#1f3322] p-1.5 rounded-full border border-white/5 shadow-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-500 font-sans ${isActive(item.path)
                                    ? 'text-[#29412d] bg-gradient-to-r from-[#d0a237] to-[#fcd34d] shadow-lg shadow-[#d0a237]/20'
                                    : 'text-amber-100/70 hover:text-amber-50 hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        {user ? (
                            <Link to="/admin" className="bg-[#113642] text-emerald-100 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0f392f] transition border border-[#1f3322]">
                                Admin
                            </Link>
                        ) : (
                            <Link to="/login" className="text-[#d0a237]/60 hover:text-[#d0a237] font-bold text-sm px-3 flex gap-1 items-center">
                                <LogIn size={16} />
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-amber-100 p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#29412d] border-t border-[#d0a237]/30 shadow-2xl animate-in slide-in-from-top-5">
                    <div className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`block w-full text-center px-4 py-4 rounded-xl text-lg font-serif ${isActive(item.path) ? 'bg-[#d0a237]/10 text-[#d0a237] border border-[#d0a237]/20' : 'text-amber-100/60'}`}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
