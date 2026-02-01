import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-[#113642] text-amber-50/60 py-16 border-t border-[#d0a237]/30 relative overflow-hidden">
        {/* Gradient strip atas footer */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#29412d] via-[#d0a237] to-[#29412d]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12 text-center md:text-left">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-6">
                        {/* Logo Container */}
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-[#d0a237]/20 backdrop-blur-sm">
                            <img src="/logo-masjid.webp" alt="Masjid Jami" className="h-12 w-auto object-contain rounded-md" />
                            <div className="w-px h-8 bg-[#d0a237]/30"></div>
                            <img src="/logo-jpzis.webp" alt="JPZIS" className="h-12 w-auto object-contain rounded-md" />
                        </div>
                        {/* Logo without box, using drop-shadow for contrast */}
                        <div className="transition-transform transform group-hover:scale-105 duration-300">
                            <img
                                src="/header-logo.webp"
                                alt="JPZIS Masjid Jami' Raudlatul Jannah"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <p className="font-sans text-sm leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
                        Pusat peradaban umat yang melayani dengan hati, mengelola amanah dengan transparan, dan menebarkan nilai-nilai Islam Rahmatan Lil Alamin.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-[#113642] flex items-center justify-center text-[#d0a237] hover:bg-[#d0a237] hover:text-[#29412d] transition cursor-pointer border border-[#d0a237]/20"><Facebook size={18} /></div>
                        <div className="w-10 h-10 rounded-full bg-[#113642] flex items-center justify-center text-[#d0a237] hover:bg-[#d0a237] hover:text-[#29412d] transition cursor-pointer border border-[#d0a237]/20"><Instagram size={18} /></div>
                        <div className="w-10 h-10 rounded-full bg-[#113642] flex items-center justify-center text-[#d0a237] hover:bg-[#d0a237] hover:text-[#29412d] transition cursor-pointer border border-[#d0a237]/20"><Youtube size={18} /></div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 font-serif">Tautan Cepat</h4>
                    <ul className="space-y-3 text-sm font-sans">
                        <li><Link to="/profile" className="hover:text-[#d0a237] transition flex items-center justify-center md:justify-start gap-2"><ChevronRight size={14} /> Profil Masjid</Link></li>
                        <li><Link to="/transparency" className="hover:text-[#d0a237] transition flex items-center justify-center md:justify-start gap-2"><ChevronRight size={14} /> Laporan Keuangan</Link></li>
                        <li><a href="/articles" className="hover:text-[#d0a237] transition flex items-center justify-center md:justify-start gap-2"><ChevronRight size={14} /> Artikel</a></li>
                        <li><Link to="/donate" className="hover:text-[#d0a237] transition flex items-center justify-center md:justify-start gap-2"><ChevronRight size={14} /> Kalkulator Zakat</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 font-serif">Kontak Kami</h4>
                    <ul className="space-y-4 text-sm font-sans">
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                            <MapPin size={18} className="text-[#d0a237] shrink-0" />
                            <span>Jl. KH. Yusuf No.1, Tasikmadu,<br />Kota Malang, Jawa Timur</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                            <Phone size={18} className="text-[#d0a237] shrink-0" />
                            <span>+62 812-3456-7890</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                            <Mail size={18} className="text-[#d0a237] shrink-0" />
                            <span>sekretariat@roudhotuljannah.id</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm font-sans text-amber-50/80">
                © 2026 JPZIS Masjid Jami' Raudlatul Jannah. All Rights Reserved. <br />
            </div>
        </div>
    </footer>
);

export default Footer;
