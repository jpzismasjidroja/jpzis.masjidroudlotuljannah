import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Calculator, CheckCircle, User, Wallet, CreditCard, Copy, UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import ZakatCalculator from '../components/ZakatCalculator';
import useSEO from '../hooks/useSEO';
import { compressImage } from '../utils/compressImage';

const DonationPage = ({ onDonate }) => {
    // SEO Meta Tags
    useSEO({
        title: 'Donasi Online',
        description: 'Salurkan zakat, infaq, sedekah, dan wakaf Anda secara online dengan mudah dan transparan di LAZIS Masjid Jami\' Roudlatul Jannah.',
        url: '/donate',
        keywords: 'donasi online, zakat online, infaq, sedekah, wakaf, LAZIS'
    });

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Infaq');
    const [method, setMethod] = useState('qris');
    const [message, setMessage] = useState('');
    const [proof, setProof] = useState(null);

    // State untuk Mobile Calculator Popup
    const [showMobileCalculator, setShowMobileCalculator] = useState(false);

    // State untuk UI
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // State Loading Upload
    const [isCompressing, setIsCompressing] = useState(false); // NEW: State Status Kompresi

    const BANK_DETAILS = {
        bsi: { name: "Bank Syariah Indonesia", number: "7101234567", holder: "Masjid Roudhotul Jannah" },
        muamalat: { name: "Bank Muamalat", number: "1019876543", holder: "Masjid Roudhotul Jannah" }
    };

    // --- LOGIC BARU: MENGUBAH TEKS BERDASARKAN KATEGORI ---
    const getDynamicText = () => {
        switch (category) {
            case 'Zakat Maal':
            case 'Zakat Fitrah': // Asumsi Zakat Fitrah ikut logika Zakat
                return {
                    header: "Mari Berzakat",
                    label: "Data Muzzaki",
                    submitBtn: "Konfirmasi Zakat"
                };
            case 'Sedekah':
                return {
                    header: "Mari Bersedekah",
                    label: "Data Mussaddiq",
                    submitBtn: "Konfirmasi Sedekah"
                };
            case 'Wakaf':
                return {
                    header: "Mari Berwakaf",
                    label: "Data Wakif",
                    submitBtn: "Konfirmasi Wakaf"
                };
            case 'Infaq':
            default:
                return {
                    header: "Mari Berinfaq",
                    label: "Data Munfiq", // Sesuai request (sebelumnya Data Muhsinin)
                    submitBtn: "Konfirmasi Infaq"
                };
        }
    };

    const textUI = getDynamicText();
    // -------------------------------------------------------

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- VALIDASI & SANITASI HELPER ---
    const sanitizeText = (text) => {
        // Menghapus karakter berbahaya untuk mencegah injection
        return text.replace(/<[^>]*>/g, '').trim();
    };

    const validatePhone = (phone) => {
        // Hanya angka, 10-15 digit
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    };

    const validateFile = (file) => {
        // Validasi tipe file (hanya image)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return { valid: false, error: 'Hanya file gambar (JPG, PNG, GIF, WEBP) yang diperbolehkan.' };
        }
        // Validasi ukuran (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return { valid: false, error: 'Ukuran file maksimal 5MB.' };
        }
        return { valid: true };
    };

    // NEW: Handler File Change dengan Kompresi
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setProof(null);
            return;
        }

        // Basic Type Validation Before Compression
        if (!file.type.startsWith('image/')) {
            alert('Mohon upload file gambar yang valid.');
            e.target.value = ''; // Reset input
            return;
        }

        setIsCompressing(true);
        try {
            const compressed = await compressImage(file);
            setProof(compressed);
        } catch (error) {
            console.error('Error compressing image:', error);
            alert('Gagal memproses gambar. Mohon gunakan file lain.');
            e.target.value = ''; // Reset input
        } finally {
            setIsCompressing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDASI INPUT
        if (!proof && !isCompressing) {
            alert("Mohon upload bukti pembayaran terlebih dahulu.");
            return;
        }

        if (isCompressing) {
            alert("Sedang memproses gambar. Mohon tunggu sebentar.");
            return;
        }

        // Validasi file (Safety Net)
        const fileValidation = validateFile(proof);
        if (!fileValidation.valid) {
            alert(fileValidation.error);
            return;
        }

        // Validasi phone
        if (!validatePhone(phone)) {
            alert("Nomor telepon tidak valid. Gunakan 10-15 digit angka.");
            return;
        }

        // Validasi amount
        // FIX: Ensure strict positive integer and reasonable range
        const numAmount = parseFloat(amount.toString().replace(/[^0-9.]/g, ''));
        if (isNaN(numAmount) || numAmount < 1000) { // Min donation Rp 1.000
            alert("Nominal donasi minimal Rp 1.000.");
            return;
        }
        if (numAmount > 1000000000000) {
            alert("Nominal donasi terlalu besar. Silakan hubungi admin untuk donasi khusus.");
            return;
        }

        setIsUploading(true);

        try {
            // 1. Upload Gambar ke Supabase Storage
            const fileExt = proof.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('donation-proofs')
                .upload(filePath, proof);

            if (uploadError) throw uploadError;

            // 2. Ambil Public URL dari gambar
            const { data: urlData } = supabase.storage
                .from('donation-proofs')
                .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl;

            // 3. Siapkan Data untuk Database (dengan sanitasi)
            const newDonation = {
                name: sanitizeText(name),
                phone: phone.replace(/[\s-]/g, ''),
                email,
                amount: numAmount,
                type: category,
                method,
                message: sanitizeText(message),
                proof_url: publicUrl,
                status: 'pending'
            };

            // 4. Kirim data ke function parent
            await onDonate(newDonation);

            setSubmitted(true);

        } catch (error) {
            console.error('Error saat upload:', error);
            alert('Gagal mengirim donasi: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 relative">
                    {/* LOGIC UPDATE 1: JUDUL HEADER BERUBAH */}
                    <h2 className="text-4xl md:text-5xl font-bold text-[#022c22] font-serif mb-4">
                        {textUI.header}
                    </h2>
                    <p className="text-[#064e3b]/70 text-lg font-serif italic max-w-2xl mx-auto">"Naungan orang beriman di hari Kiamat adalah sedekahnya." (HR. Ahmad)</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-1 mb-8 md:mb-0">
                        {/* TAMPILAN DESKTOP: Calculator selalu muncul */}
                        <div className="hidden md:block">
                            <ZakatCalculator />
                        </div>

                        {/* TAMPILAN MOBILE: Tombol untuk memunculkan Calculator */}
                        <button
                            onClick={() => setShowMobileCalculator(true)}
                            className="md:hidden w-full bg-[#022c22] text-amber-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg mb-6 border border-amber-500/30 font-serif tracking-widest uppercase hover:bg-[#064e3b] transition"
                        >
                            <Calculator className="text-amber-400" size={24} />
                            Hitung Zakat
                        </button>
                    </div>
                    <div className="md:col-span-2 min-w-0">
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-amber-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-[80px] -z-10"></div>
                            {submitted ? (
                                <div className="text-center py-16">
                                    <div className="bg-[#022c22] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-amber-100">
                                        <CheckCircle size={48} className="text-amber-400" />
                                    </div>
                                    <h3 className="font-serif font-bold text-3xl text-[#022c22] mb-4">Alhamdulillah!</h3>
                                    <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg leading-relaxed font-sans">Jazakumullah Khairan Katsiran, <strong>{name}</strong>. Semoga Allah menerima amal ibadah Anda dan menggantinya dengan kebaikan yang berlipat.</p>
                                    <button onClick={() => { setSubmitted(false); setProof(null); setAmount(''); setName(''); setPhone(''); setMessage(''); }} className="px-10 py-4 bg-[#064e3b] text-amber-100 rounded-full font-bold hover:bg-[#022c22] transition border border-amber-400/30 uppercase tracking-widest text-sm shadow-xl">Kembali Berinfaq</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="bg-amber-50/50 p-6 md:p-8 rounded-3xl space-y-6 border border-amber-100/50">
                                        {/* LOGIC UPDATE 2: LABEL DATA DIRI BERUBAH */}
                                        <h3 className="font-serif font-bold text-[#022c22] text-xl flex items-center gap-3 border-b border-amber-200 pb-4">
                                            <User className="text-amber-600" /> {textUI.label}
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-amber-200 bg-white rounded-xl outline-none focus:ring-2 focus:ring-[#064e3b] transition" placeholder="Nama Lengkap" />
                                            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border border-amber-200 bg-white rounded-xl outline-none focus:ring-2 focus:ring-[#064e3b] transition" placeholder="No. WhatsApp" />
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full md:col-span-2 p-4 border border-amber-200 bg-white rounded-xl outline-none focus:ring-2 focus:ring-[#064e3b] transition" placeholder="Alamat Email" />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="block font-serif font-bold text-xl text-[#022c22]">Niat & Nominal</label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {/* Button Kategori yang memicu perubahan state 'category' */}
                                            {['Zakat Maal', 'Zakat Fitrah', 'Infaq', 'Sedekah', 'Wakaf'].map((cat) => (
                                                <button key={cat} type="button" onClick={() => setCategory(cat)} className={`w-full px-2 py-3 rounded-xl text-sm font-bold border-2 transition-all ${category === cat ? 'bg-[#022c22] text-amber-400 border-[#022c22]' : 'bg-white text-slate-500 border-slate-100 hover:border-amber-400 hover:text-amber-700'}`}>
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative group">
                                            <span className="absolute left-6 top-5 text-[#064e3b] font-serif font-bold text-2xl">Rp</span>
                                            <input
                                                type="text"
                                                required
                                                value={amount}
                                                onChange={(e) => {
                                                    // Hanya ambil angka
                                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                                    // Format dengan titik
                                                    const formatted = val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                                    setAmount(formatted);
                                                }}
                                                className="w-full pl-16 p-6 text-3xl font-serif font-bold text-[#022c22] bg-white border-2 border-amber-100 rounded-2xl outline-none focus:border-[#064e3b] shadow-inner"
                                                placeholder="0"
                                            />
                                        </div>
                                        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 border border-amber-200 bg-white rounded-xl outline-none focus:ring-2 focus:ring-[#064e3b] text-sm font-serif placeholder:italic" placeholder="Tulis doa atau pesan khusus..."></textarea>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="block font-serif font-bold text-xl text-[#022c22]">Akad Pembayaran</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button type="button" onClick={() => setMethod('qris')} className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${method === 'qris' ? 'border-[#064e3b] bg-amber-50' : 'border-slate-100 bg-white hover:border-amber-300'}`}>
                                                <div className={`p-3 rounded-full ${method === 'qris' ? 'bg-[#064e3b] text-white' : 'bg-slate-100 text-slate-400'}`}><Wallet size={24} /></div>
                                                <div className="text-left"><span className="block font-bold text-[#022c22]">QRIS</span><span className="text-xs text-slate-500">Scan Cepat & Mudah</span></div>
                                            </button>
                                            <button type="button" onClick={() => setMethod('transfer')} className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${method === 'transfer' ? 'border-[#064e3b] bg-amber-50' : 'border-slate-100 bg-white hover:border-amber-300'}`}>
                                                <div className={`p-3 rounded-full ${method === 'transfer' ? 'bg-[#064e3b] text-white' : 'bg-slate-100 text-slate-400'}`}><CreditCard size={24} /></div>
                                                <div className="text-left"><span className="block font-bold text-[#022c22]">Transfer Bank</span><span className="text-xs text-slate-500">Konfirmasi Manual</span></div>
                                            </button>
                                        </div>

                                        <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-amber-200 text-center relative">
                                            {method === 'qris' ? (
                                                <div>
                                                    <p className="text-xs font-bold text-[#064e3b] mb-6 uppercase tracking-[0.2em]">A/N JPZIZ MASJID JAMI' <br />ROUDLATUL JANNAH</p>
                                                    <div className="bg-white p-4 inline-block rounded-2xl border-2 border-[#022c22] shadow-2xl">
                                                        <img src="/assets/img/qris.jpg" alt="QRIS" className="w-56 h-56 rounded-lg mix-blend-multiply" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4 text-left w-full">
                                                    {Object.values(BANK_DETAILS).map((bank, idx) => (
                                                        <div key={idx} className="bg-white p-5 rounded-xl border border-amber-100 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-4">
                                                            <div className="min-w-0 w-full">
                                                                <p className="text-lg font-serif font-bold text-[#022c22]">{bank.name}</p>
                                                                <p className="text-sm text-slate-500 mb-2 italic">a.n {bank.holder}</p>
                                                                <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100 w-fit">
                                                                    <p className="font-mono text-[#064e3b] font-bold text-lg tracking-wider">{bank.number}</p>
                                                                    <button type="button" onClick={() => handleCopy(bank.number)} className="text-amber-600 hover:text-[#064e3b]"><Copy size={16} /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-serif font-bold text-xl text-[#022c22] mb-4">Bukti Transfer</label>
                                        <div className="border-2 border-dashed border-amber-300 rounded-2xl p-10 text-center hover:bg-amber-50 transition relative cursor-pointer bg-white group">
                                            <input type="file" accept="image/*" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            <div className="flex flex-col items-center gap-4 text-slate-500 group-hover:text-[#064e3b] transition">
                                                {isCompressing ? (
                                                    <><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064e3b]"></div><span className="font-serif italic text-lg text-[#064e3b]">Memproses gambar...</span></>
                                                ) : proof ? (
                                                    <><ImageIcon size={48} className="text-[#064e3b] drop-shadow-lg" /><span className="font-bold text-[#022c22] text-lg truncate max-w-[250px]">{proof.name}</span></>
                                                ) : (
                                                    <><UploadCloud size={48} className="text-amber-400 group-hover:scale-110 transition" /><span className="font-serif italic text-lg">Sentuh untuk unggah gambar</span></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isUploading || isCompressing}
                                        className="w-full bg-gradient-to-r from-[#022c22] to-[#064e3b] text-amber-100 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#064e3b]/40 transition transform hover:-translate-y-1 font-serif tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {/* LOGIC UPDATE 3: TOMBOL SUBMIT SESUAI KATEGORI */}
                                        {isUploading ? 'Sedang Mengirim...' : isCompressing ? 'Memproses Gambar...' : textUI.submitBtn}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* POPUP MODAL CALCULATOR (MOBILE ONLY) */}
            {showMobileCalculator && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all"
                        onClick={() => setShowMobileCalculator(false)}
                    ></div>

                    {/* Content */}
                    <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowMobileCalculator(false)}
                            className="absolute -top-12 right-0 md:-right-12 text-white/80 hover:text-white transition"
                        >
                            <X size={32} />
                        </button>

                        <ZakatCalculator />

                        <p className="text-center text-white/60 text-sm mt-4 font-sans">
                            Tekan di luar area untuk menutup
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationPage;