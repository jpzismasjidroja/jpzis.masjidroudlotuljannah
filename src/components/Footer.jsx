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
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="bg-[#113642] p-1 rounded-full border border-[#d0a237]/30">
                            <img src="/assets/img/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-amber-50 font-serif">JPZIS/LAZIZ</h3>
                            <p className="text-xs text-[#d0a237] tracking-widest uppercase">Masjid Jami' Raudlatul Jannah</p>
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
                        <li><a href="#" className="hover:text-[#d0a237] transition flex items-center justify-center md:justify-start gap-2"><ChevronRight size={14} /> Jadwal Sholat</a></li>
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
            <div className="border-t border-white/10 pt-8 text-center text-sm font-sans text-amber-50/40">
                © 2026 JPZIS Masjid Jami' Raudlatul Jannah. All Rights Reserved. <br />
            </div>
        </div>
    </footer>
);

export default Footer;
