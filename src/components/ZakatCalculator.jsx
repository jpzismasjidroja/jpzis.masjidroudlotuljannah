import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { formatRupiah } from '../utils';

const ZakatCalculator = () => {
    const [activeTab, setActiveTab] = useState('penghasilan');
    const [gajiPokok, setGajiPokok] = useState('');
    const [penghasilanLain, setPenghasilanLain] = useState('');
    const [hutangPenghasilan, setHutangPenghasilan] = useState('');
    const [tabungan, setTabungan] = useState('');
    const [hutangMaal, setHutangMaal] = useState('');

    const HARGA_EMAS_PER_GRAM = 1000000;
    const NISAB_TAHUNAN = 85 * HARGA_EMAS_PER_GRAM;

    const calculateZakat = () => {
        let totalHarta = 0;
        let zakat = 0;
        let nisab = 0;
        let isWajib = false;

        if (activeTab === 'penghasilan') {
            const bersih = ((parseFloat(gajiPokok) || 0) + (parseFloat(penghasilanLain) || 0)) - (parseFloat(hutangPenghasilan) || 0);
            nisab = NISAB_TAHUNAN / 12;
            totalHarta = bersih;
            if (bersih >= nisab) { zakat = bersih * 0.025; isWajib = true; }
        } else {
            totalHarta = (parseFloat(tabungan) || 0) - (parseFloat(hutangMaal) || 0);
            nisab = NISAB_TAHUNAN;
            if (totalHarta >= nisab) { zakat = totalHarta * 0.025; isWajib = true; }
        }
        return { total: Math.max(0, zakat), isWajib, totalHarta, nisab };
    };

    const { total: zakatAmount, isWajib, totalHarta } = calculateZakat();

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-amber-100 overflow-hidden sticky top-32 relative">
            <div className="h-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200"></div>

            <div className="bg-[#022c22] p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <h3 className="text-xl font-bold text-amber-50 font-serif mb-1 relative z-10">Kalkulator Zakat</h3>
                <p className="text-amber-200/60 text-xs uppercase tracking-widest relative z-10">Hitung & Bersihkan Harta</p>
            </div>

            <div className="p-1 bg-amber-50 flex">
                <button onClick={() => setActiveTab('penghasilan')} className={`flex-1 py-3 text-sm font-bold font-serif uppercase tracking-wider transition-all ${activeTab === 'penghasilan' ? 'bg-white text-[#022c22] shadow-sm rounded-t-xl border-t-2 border-amber-400' : 'text-slate-400 hover:text-[#022c22]'}`}>Profesi</button>
                <button onClick={() => setActiveTab('maal')} className={`flex-1 py-3 text-sm font-bold font-serif uppercase tracking-wider transition-all ${activeTab === 'maal' ? 'bg-white text-[#022c22] shadow-sm rounded-t-xl border-t-2 border-amber-400' : 'text-slate-400 hover:text-[#022c22]'}`}>Maal</button>
            </div>

            <div className="p-6 space-y-4 bg-white">
                {activeTab === 'penghasilan' ? (
                    <>
                        <div><label className="block text-xs font-bold text-[#064e3b] uppercase mb-1">Gaji Bulanan</label><div className="relative"><span className="absolute left-3 top-3 text-amber-600 font-serif font-bold">Rp</span><input type="number" value={gajiPokok} onChange={(e) => setGajiPokok(e.target.value)} className="w-full pl-10 p-2.5 bg-amber-50/50 rounded-xl border border-amber-200 focus:ring-2 focus:ring-[#064e3b] outline-none transition font-sans text-[#022c22]" placeholder="0" /></div></div>
                        <div><label className="block text-xs font-bold text-[#064e3b] uppercase mb-1">Bonus / THR</label><div className="relative"><span className="absolute left-3 top-3 text-amber-600 font-serif font-bold">Rp</span><input type="number" value={penghasilanLain} onChange={(e) => setPenghasilanLain(e.target.value)} className="w-full pl-10 p-2.5 bg-amber-50/50 rounded-xl border border-amber-200 focus:ring-2 focus:ring-[#064e3b] outline-none transition font-sans text-[#022c22]" placeholder="0" /></div></div>
                        <div><label className="block text-xs font-bold text-[#064e3b] uppercase mb-1">Hutang / Cicilan</label><div className="relative"><span className="absolute left-3 top-3 text-amber-600 font-serif font-bold">Rp</span><input type="number" value={hutangPenghasilan} onChange={(e) => setHutangPenghasilan(e.target.value)} className="w-full pl-10 p-2.5 bg-amber-50/50 rounded-xl border border-amber-200 focus:ring-2 focus:ring-[#064e3b] outline-none transition font-sans text-[#022c22]" placeholder="0" /></div></div>
                    </>
                ) : (
                    <>
                        <div><label className="block text-xs font-bold text-[#064e3b] uppercase mb-1">Total Uang/Emas</label><div className="relative"><span className="absolute left-3 top-3 text-amber-600 font-serif font-bold">Rp</span><input type="number" value={tabungan} onChange={(e) => setTabungan(e.target.value)} className="w-full pl-10 p-2.5 bg-amber-50/50 rounded-xl border border-amber-200 focus:ring-2 focus:ring-[#064e3b] outline-none transition font-sans text-[#022c22]" placeholder="0" /></div></div>
                        <div><label className="block text-xs font-bold text-[#064e3b] uppercase mb-1">Hutang Jatuh Tempo</label><div className="relative"><span className="absolute left-3 top-3 text-amber-600 font-serif font-bold">Rp</span><input type="number" value={hutangMaal} onChange={(e) => setHutangMaal(e.target.value)} className="w-full pl-10 p-2.5 bg-amber-50/50 rounded-xl border border-amber-200 focus:ring-2 focus:ring-[#064e3b] outline-none transition font-sans text-[#022c22]" placeholder="0" /></div></div>
                    </>
                )}
            </div>
            <div className="bg-[#022c22] p-6 border-t-4 border-amber-500">
                <div className="flex justify-between items-center mb-3 text-sm border-b border-amber-500/30 pb-3"><span className="text-amber-100/60 font-serif">Total Harta Bersih</span><span className="font-bold text-amber-100 font-mono">{formatRupiah(totalHarta)}</span></div>
                <div className={`p-4 rounded-xl border transition-all relative overflow-hidden ${isWajib ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400' : 'bg-white/10 border-white/10'}`}>
                    <div className="relative z-10 flex justify-between items-center">
                        <div><p className={`text-[10px] font-bold uppercase mb-1 tracking-widest ${isWajib ? 'text-[#064e3b]' : 'text-amber-200/50'}`}>{isWajib ? 'Wajib Zakat Sebesar' : 'Belum Wajib Zakat'}</p><p className={`text-2xl font-serif font-bold ${isWajib ? 'text-[#022c22]' : 'text-white'}`}>{formatRupiah(zakatAmount)}</p></div>
                        {isWajib && <div className="bg-[#064e3b] text-amber-400 p-1.5 rounded-full"><CheckCircle size={20} /></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZakatCalculator;
