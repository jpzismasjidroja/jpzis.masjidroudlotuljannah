import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#022c22] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                    <div className="md:w-1/2 p-12 text-amber-50 flex flex-col justify-center relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                        <h2 className="text-4xl font-serif font-bold mb-8 relative z-10">Hubungi Kami</h2>
                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-6">
                                <MapPin className="text-amber-400 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Alamat</h4>
                                    <p className="text-amber-100/70 font-light leading-relaxed">Jl. KH. Yusuf No.1, Tasikmadu,<br />Kec. Lowokwaru, Kota Malang</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <Phone className="text-amber-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Telepon</h4>
                                    <p className="text-amber-100/70 font-mono text-lg">+62 812-3456-7890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <Mail className="text-amber-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email</h4>
                                    <p className="text-amber-100/70">sekretariat@roudhotuljannah.id</p>
                                </div>
                            </div>
                        </div>
                        {/* Google Maps Embed Restored */}
                        <div className="mt-8 relative z-10 h-48 w-full rounded-2xl overflow-hidden border-2 border-amber-500/30">
                            <iframe
                                src="https://maps.google.com/maps?q=Masjid%20Roudhotul%20Jannah%20Malang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Masjid"
                            ></iframe>
                        </div>
                    </div>
                    <div className="md:w-1/2 bg-white p-12 relative">
                        <form className="space-y-6 relative z-10">
                            <h3 className="text-2xl font-bold text-[#022c22] font-serif mb-6">Kirim Pesan</h3>
                            <div>
                                <input type="text" className="w-full bg-[#FFFCF5] border-b-2 border-amber-200 p-4 outline-none focus:border-[#064e3b] transition text-[#022c22] placeholder-slate-400" placeholder="Nama Lengkap" />
                            </div>
                            <div>
                                <input type="email" className="w-full bg-[#FFFCF5] border-b-2 border-amber-200 p-4 outline-none focus:border-[#064e3b] transition text-[#022c22] placeholder-slate-400" placeholder="Email Anda" />
                            </div>
                            <div>
                                <textarea rows={4} className="w-full bg-[#FFFCF5] border-b-2 border-amber-200 p-4 outline-none focus:border-[#064e3b] transition text-[#022c22] placeholder-slate-400 resize-none" placeholder="Pesan..."></textarea>
                            </div>
                            <button className="bg-[#022c22] text-white px-8 py-4 rounded-xl font-bold font-serif tracking-widest hover:bg-[#064e3b] transition w-full flex justify-center items-center gap-2">KIRIM <Send size={16} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
