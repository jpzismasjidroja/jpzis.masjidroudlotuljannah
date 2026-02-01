import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = ({ user, showAdminLink = true }) => {
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
        { path: '/gallery', label: 'Galeri' },
        { path: '/donate', label: 'Infaq' },
        { path: '/transparency', label: 'Transparansi' },
        { path: '/articles', label: 'Artikel' },
        { path: '/contact', label: 'Hubungi' },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 transition-all duration-500 bg-[#29412d]/95 backdrop-blur-md border-b border-[#d0a237]/30 shadow-2xl h-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <Link to="/" className="flex items-center cursor-pointer gap-4 group">
                        {/* Logo without box, using drop-shadow for contrast */}
                        <div className="transition-transform transform group-hover:scale-105 duration-300">
                            <img
                                src="/header-logo.webp"
                                alt="JPZIS Masjid Jami' Raudlatul Jannah"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                        {/* Logo Container */}
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-[#d0a237]/20 backdrop-blur-sm">
                            <img src="/logo-masjid.webp" alt="Masjid Jami" className="h-12 w-auto object-contain rounded-md" />
                            <div className="w-px h-8 bg-[#d0a237]/30"></div>
                            <img src="/logo-jpzis.webp" alt="JPZIS" className="h-12 w-auto object-contain rounded-md" />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1 bg-[#1f3322] p-1.5 rounded-full border border-white/5 shadow-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-5 py-3 text-sm font-medium rounded-full transition-all duration-500 font-sans ${isActive(item.path)
                                    ? 'text-[#29412d] bg-gradient-to-r from-[#d0a237] to-[#fcd34d] shadow-lg shadow-[#d0a237]/20'
                                    : 'text-amber-50/90 hover:text-amber-50 hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        {showAdminLink && (
                            user ? (
                                <Link to="/admin" className="bg-[#113642] text-emerald-100 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0f392f] transition border border-[#1f3322]">
                                    Admin
                                </Link>
                            ) : (
                                <Link to="/login" className="text-[#d0a237]/90 hover:text-[#d0a237] font-bold text-sm p-3 flex gap-1 items-center" aria-label="Login">
                                    <LogIn size={20} />
                                </Link>
                            )
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-amber-100 p-2" aria-label="Toggle Menu">
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
