import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ArrowRight, FileText, Wallet, CheckCircle, TrendingUp, Users, Image as ImageIcon } from 'lucide-react';
import { formatRupiah } from '../utils';
import ArticleCard from '../components/ArticleCard';
import useSEO from '../hooks/useSEO';
import { supabase } from '../supabaseClient';

const QuoteIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 11L8 11C8.00001 9.69762 8.32832 8.41908 8.9443 7.30006C9.56028 6.18103 10.4367 5.27131 11.464 4.68509C12.4914 4.09886 13.6242 3.86229 14.7196 4.00497C15.815 4.14765 16.8242 4.66318 17.619 5.48639L16.2048 6.9006C15.751 6.4302 15.1743 6.1356 14.5484 6.05408C13.9224 5.97255 13.2751 6.10773 12.688 6.44272C12.101 6.77771 11.6002 7.29755 11.2482 7.93699C10.8962 8.57643 10.7086 9.30702 10.7086 10.0513V11H13C13.5304 11 14.0391 11.2107 14.4142 11.5858C14.7893 11.9609 15 12.4696 15 13V18C15 18.5304 14.7893 19.0391 14.4142 19.4142C14.0391 19.7893 13.5304 20 13 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V13C8 12.4696 8.21071 11.9609 8.58579 11.5858C8.96086 11.2107 9.46957 11 10 11ZM22 11L20 11C20.0001 9.70425 20.3263 8.43232 20.9381 7.31885C21.5499 6.20539 22.4204 5.30058 23.4411 4.71761C24.4619 4.13463 25.5872 3.89955 26.6756 4.04153C27.764 4.18351 28.7668 4.69614 29.5566 5.51469L28.1424 6.9289C27.6911 6.46116 27.1181 6.16823 26.4962 6.0871C25.8742 6.00597 25.2312 6.1403 24.6479 6.47343C24.0646 6.80656 23.5672 7.32359 23.2176 7.95986C22.868 8.59613 22.6816 9.32323 22.6816 10.0636V11H25C25.5304 11 26.0391 11.2107 26.4142 11.5858C26.7893 11.9609 27 12.4696 27 13V18C27 18.5304 26.7893 19.0391 26.4142 19.4142C26.0391 19.7893 25.5304 20 25 20H22C21.4696 20 20.9609 19.7893 20.5858 19.4142C20.2107 19.0391 20 18.5304 20 18V13C20 12.4696 20.2107 11.9609 20.5858 11.5858C20.9609 11.2107 21.4696 11 22 11Z" fill="currentColor" />
    </svg>
);

const HomePage = ({ articles, donations }) => {
    // SEO Meta Tags
    // SEO Meta Tags
    useSEO({
        title: 'Beranda',
        description: 'Website resmi LAZIS Masjid Jami\' Roudlatul Jannah. Salurkan zakat, infaq, dan sedekah Anda dengan mudah dan transparan.',
        url: '/',
        keywords: 'masjid, roudlatul jannah, lazis, zakat, infaq, sedekah, donasi online'
    });

    const navigate = useNavigate();
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const [visible, setVisible] = useState(true);

    // FETCH BENEFICIARIES STATS
    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await supabase
                .from('beneficiaries')
                .select('*')
                .order('created_at', { ascending: true });
            if (data) setStatsList(data);
        };
        fetchStats();

        // Optional: Realtime subscription for stats update without refresh
        const statsSub = supabase
            .channel('public:beneficiaries')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'beneficiaries' }, fetchStats)
            .subscribe();

        return () => {
            supabase.removeChannel(statsSub);
        };
    }, []);

    const quotesData = [
        { text: "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian...", source: "(QS. At-Taubah: 18)" },
        { text: "Dan janganlah kamu menyerupai orang-orang yang memecah belah agama mereka...", source: "(QS. Al-Rum: 32)" },
        { text: "Sesungguhnya Allah tidak akan mengubah nasib suatu kaum sebelum mereka mengubah nasib diri mereka sendiri.", source: "(HR. Al-Rad: 11)" },
        { text: "Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pelajaran yang baik.", source: "(QS. Al-Nahl: 125)" },
        { text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.", source: "(HR. Al-Thabrani)" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false); // Fade out
            setTimeout(() => {
                setCurrentQuoteIndex((prev) => (prev + 1) % quotesData.length);
                setVisible(true); // Fade in
            }, 500); // Wait for fade out duration
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Calculate total donation
    const totalDonation = donations ? donations.reduce((sum, item) => sum + parseInt(item.amount || 0), 0) : 0;

    return (
        <div className="bg-transparent">
            {/* 1. HERO SECTION */}
            <div className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-[#29412d] min-h-[85vh] flex items-center">
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-[#FFFCF5]"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-[#FFFCF5]"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-[#FFFCF5]"></path>
                    </svg>
                </div>
                <div className="absolute inset-0 z-0">
                    <img src="/hero-mosque.webp" alt="Mosque Aerial View" className="w-full h-full object-cover" fetchPriority="high" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#29412d] via-[#29412d]/70 to-[#000]/60"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                </div>
                <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#a0781e]/30 bg-[#000]/20 backdrop-blur-sm text-[#a0781e] text-sm font-serif tracking-widest mb-8 mx-auto animate-in slide-in-from-bottom-4 fade-in duration-1000 uppercase">
                        <Star size={14} className="fill-[#a0781e]" /> Ahlan Wa Sahlan <Star size={14} className="fill-[#a0781e]" />
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-amber-50 tracking-tight leading-none mb-8 drop-shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
                        Lazis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a0781e] via-yellow-200 to-[#a0781e] italic">Masjid</span><br />
                        Roudlatul <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a0781e] via-yellow-200 to-[#a0781e] italic">Jannah</span>
                    </h1>

                    {/* QUOTES HERO */}
                    <div className="min-h-[100px] mb-8">
                        <p className={`text-lg md:text-2xl text-white max-w-3xl mx-auto leading-relaxed transition-opacity duration-500 font-sans font-light ${visible ? 'opacity-100' : 'opacity-0'}`}>
                            "{quotesData[currentQuoteIndex].text}"
                            <span className="block mt-3 text-sm text-[#d0a237] font-serif tracking-widest font-bold">
                                {quotesData[currentQuoteIndex].source}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-16 fade-in duration-1000 delay-300">
                        <Link to="/donate" className="group relative bg-gradient-to-b from-[#d0a237] to-[#b48624] text-[#29412d] px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(208,162,55,0.5)] transition-all transform hover:-translate-y-1 overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-3 font-serif tracking-wider"><Heart fill="currentColor" size={20} /> Salurkan Zakat</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </Link>
                        <Link to="/profile" className="group bg-transparent border border-[#d0a237]/50 text-[#d0a237] px-10 py-4 rounded-full font-serif tracking-wider text-lg transition-all hover:bg-[#d0a237]/10 hover:border-[#d0a237]">Tentang Kami</Link>
                    </div>
                </div>
            </div>

            {/* 2. OVERLAY CARDS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32 relative z-30">
                <h2 className="sr-only">Layanan Utama</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <Link to="/donate" className="bg-[#FFFCF5] p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#d0a237]/30 hover:-translate-y-2 transition duration-500 cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-[100px] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition"></div>
                        <div className="bg-[#29412d] w-14 h-14 rounded-full flex items-center justify-center text-[#d0a237] mb-6 shadow-lg group-hover:bg-[#d0a237] group-hover:text-[#29412d] transition"><Heart size={24} /></div>
                        <h3 className="text-2xl font-bold text-[#29412d] mb-2 font-serif">Zakat, Infaq, & Sedekah</h3>
                        <p className="text-slate-600 mb-6 text-sm leading-relaxed">Sucikan harta dengan berbagi kepada sesama.</p>
                        <span className="text-[#113642] font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Mulai Donasi <ArrowRight size={16} /></span>
                    </Link>

                    {/* Card 2 */}
                    <Link to="/transparency" className="bg-[#29412d] p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#d0a237]/30 hover:-translate-y-2 transition duration-500 cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                        <div className="bg-[#d0a237] w-14 h-14 rounded-full flex items-center justify-center text-[#29412d] mb-6 shadow-lg group-hover:bg-white group-hover:text-[#29412d] transition"><FileText size={24} /></div>
                        <h3 className="text-2xl font-bold text-amber-50 mb-2 font-serif">Laporan Keuangan</h3>
                        <p className="text-amber-50/90 mb-6 text-sm leading-relaxed">Transparansi penuh dalam pengelolaan dana umat.</p>
                        <span className="text-[#d0a237] font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Lihat Data <ArrowRight size={16} /></span>
                    </Link>

                    {/* Card 3 */}
                    {/* Card 3 - Galeri */}
                    <Link to="/gallery" className="bg-[#113642] p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#d0a237]/30 hover:-translate-y-2 transition duration-500 cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d0a237] rounded-bl-[100px] -mr-8 -mt-8 opacity-20 group-hover:scale-110 transition"></div>
                        <div className="bg-[#d0a237] w-14 h-14 rounded-full flex items-center justify-center text-[#113642] mb-6 shadow-lg group-hover:bg-white group-hover:text-[#113642] transition"><ImageIcon size={24} /></div>
                        <h3 className="text-2xl font-bold text-amber-50 mb-2 font-serif">Galeri Kegiatan</h3>
                        <p className="text-amber-50/90 mb-6 text-sm leading-relaxed">Dokumentasi kegiatan sosial dan keagamaan masjid.</p>
                        <span className="text-[#d0a237] font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">Lihat Foto <ArrowRight size={16} /></span>
                    </Link>
                </div>
            </div>

            {/* 3. VISI & MISI SECTION */}
            <div className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Kolom Gambar */}
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-[#d0a237] rounded-[3rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
                            <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                                <img src="/assets/img/masjid-h.webp" alt="Masjid Roudlotul Jannah" className="w-full h-[500px] object-cover hover:scale-105 transition duration-700" />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#022c22] to-transparent p-8">
                                    <p className="text-[#ffffff] font-serif italic text-lg">"Sebaik-baik tempat adalah Masjid"</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Teks Visi Misi */}
                        <div className="md:w-1/2">
                            <span className="text-[#854d0e] font-bold tracking-widest uppercase text-sm font-serif">Profil Singkat</span>
                            <h2 className="text-4xl font-bold text-[#29412d] font-serif mt-2 mb-6">Visi & Misi Masjid</h2>

                            <div className="space-y-8">
                                <div className="bg-[#f8fafc] p-6 rounded-2xl border-l-4 border-[#d0a237]">
                                    <h3 className="text-xl font-bold text-[#113642] font-serif mb-2">Visi Kami</h3>
                                    <p className="text-slate-600 italic">"Menjadi lembaga pengelola dana ZIS yang amanah, profesional, dan transparan guna mewujudkan kesejahteraan serta kemandirian umat."</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#113642] font-serif mb-4">Misi Utama</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Optimalisasi penghimpunan ZIS yang mudah & menjangkau akar rumput.",
                                            "Manajemen profesional, transparan & akuntabel sesuai syariat.",
                                            "Pendayagunaan dana yang produktif & memberdayakan ekonomi umat."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <div className="bg-[#d0a237] p-1 rounded-full mt-1 h-fit"><CheckCircle size={14} className="text-white" /></div>
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link to="/profile" className="group flex items-center gap-2 text-[#113642] font-bold border-b-2 border-[#d0a237] pb-1 hover:gap-4 transition-all">
                                    Baca Sejarah & Profil Lengkap <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. SPOILER: STATISTIK & TRANSPARANSI */}
            <div className="py-24 bg-[#113642] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-amber-50 font-serif">Amanah & Transparansi</h2>
                        <div className="h-1 w-20 bg-[#d0a237] mx-auto mt-4 rounded-full"></div>
                        <p className="text-amber-50/90 mt-4 max-w-2xl mx-auto">Kami menyajikan data secara terbuka sebagai bentuk pertanggungjawaban kepada umat.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SPOILER 1: DONASI MASUK */}
                        <div className="bg-[#29412d] rounded-3xl p-8 border border-[#d0a237]/30 relative overflow-hidden group hover:border-[#d0a237] transition">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={100} className="text-[#d0a237]" /></div>
                            <h3 className="text-xl text-[#d0a237] font-bold font-serif mb-2 uppercase tracking-widest">Total Donasi Masuk</h3>
                            {/* Menghitung total donasi dari state 'donations' */}
                            <p className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {formatRupiah(totalDonation)}
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm mb-6">
                                <TrendingUp size={16} />
                                <span>Update Realtime</span>
                            </div>
                            <Link to="/transparency" className="inline-block w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center hover:bg-[#d0a237] hover:text-[#29412d] transition font-bold">
                                Lihat Rincian Laporan
                            </Link>
                        </div>

                        {/* SPOILER 2: PENERIMA MANFAAT */}
                        <div className="bg-[#fffcf5] rounded-3xl p-8 border border-[#d0a237] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={100} className="text-[#113642]" /></div>
                            <h3 className="text-xl text-[#113642] font-bold font-serif mb-6 uppercase tracking-widest">Penerima Manfaat</h3>

                            <div className="space-y-4">
                                {statsList.length > 0 ? (
                                    statsList.map((stat) => (
                                        <div key={stat.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                                                <span className="text-slate-700 font-medium">{stat.label}</span>
                                            </div>
                                            <span className="font-bold text-[#29412d]">{stat.count}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-slate-400 text-sm">Belum ada data.</p>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-xs text-slate-500 text-center">Data diperbarui setiap bulan berdasarkan penyaluran program.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 5. INTEGRASI ARTIKEL */}
            <div className="py-20 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#022c22] font-serif">Kajian Terkini</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {articles && articles.slice(0, 3).map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
