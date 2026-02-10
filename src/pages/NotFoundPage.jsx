import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Halaman Tidak Ditemukan | LAZIS Masjid Jami' Raudlatul Jannah";
        // Add noindex
        let meta = document.querySelector('meta[name="robots"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = "robots";
            document.head.appendChild(meta);
        }
        meta.content = "noindex, nofollow";

        return () => {
            // Cleanup: reset robots to index, follow when leaving? 
            // Usually valid pages set it themselves, but good practice to reset if we navigate away (though 404 is usually terminal)
            meta.content = "index, follow";
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFCF5] flex items-center justify-center p-4">

            <div className="text-center max-w-lg">
                <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                    <AlertCircle size={48} className="text-red-500" />
                </div>

                <h1 className="text-6xl font-serif font-bold text-[#29412d] mb-4">404</h1>
                <h2 className="text-2xl font-bold text-[#113642] mb-4 font-serif">Halaman Tidak Ditemukan</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau alamat URL salah.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#d0a237] text-[#29412d] px-8 py-3 rounded-full font-bold hover:bg-[#b88d2a] transition shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    <Home size={18} />
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
