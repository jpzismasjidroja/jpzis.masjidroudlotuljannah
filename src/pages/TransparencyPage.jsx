import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { formatRupiah } from '../utils';
import useSEO from '../hooks/useSEO';

const TransparencyPage = ({ donations }) => {
    // SEO Meta Tags
    useSEO({
        title: 'Transparansi Dana',
        description: 'Laporan transparansi pengelolaan dana zakat, infaq, dan sedekah di LAZIS Masjid Jami\' Roudlatul Jannah. Akuntabel dan amanah.',
        url: '/transparency',
        keywords: 'laporan keuangan, transparansi dana, zakat, infaq, sedekah, akuntabilitas'
    });

    const COLORS = ['#29412d', '#113642', '#d0a237', '#8c6b24', '#1f3322'];

    // Logic Data Chart
    const chartData = useMemo(() => {
        const agg = {};
        donations.forEach(d => {
            // Mengambil kata pertama dari tipe donasi (misal: "Zakat" dari "Zakat Maal")
            const type = d.type.split(' ')[0];
            if (!agg[type]) agg[type] = 0;
            agg[type] += d.amount;
        });
        return Object.keys(agg).map(key => ({ name: key, value: agg[key] }));
    }, [donations]);

    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#022c22] font-serif">Transparansi Dana Umat</h2>
                    <div className="h-1 w-24 bg-amber-400 mx-auto mt-4 mb-2"></div>
                    <p className="text-slate-600 italic">"Dan janganlah kamu campur adukkan yang hak dengan yang bathil..."</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* BAGIAN CHART */}
                    <div className="md:col-span-1 bg-[#022c22] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden flex flex-col">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
                        <h3 className="font-serif text-amber-200 text-xl mb-6 border-b border-white/10 pb-4">Sebaran Dana</h3>

                        <div className="w-full relative z-10" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value) => formatRupiah(value)}
                                        contentStyle={{ backgroundColor: '#022c22', borderColor: '#d97706', color: '#fff', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'serif', marginTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tabel Mutasi */}
                    <div className="md:col-span-2 bg-white rounded-[2rem] shadow-xl border border-amber-100 overflow-hidden">
                        <div className="p-8 border-b border-amber-50 bg-[#FFFCF5]"><h3 className="font-bold text-xl text-[#022c22] font-serif">Mutasi Infaq Terbaru</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-[#022c22] text-amber-100">
                                    <tr>
                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider font-serif">Donatur</th>
                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider font-serif">Jenis</th>
                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider font-serif">Nominal</th>
                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider font-serif">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-50">
                                    {donations.map((don) => (
                                        <tr key={don.id} className="hover:bg-amber-50/50 transition">
                                            <td className="px-6 py-4 text-sm font-bold text-[#022c22]">{don.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-serif italic">{don.type}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#064e3b] font-mono">{formatRupiah(don.amount)}</td>
                                            <td className="px-6 py-4 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${don.status === 'verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>{don.status === 'verified' ? 'Diterima' : 'Menunggu'}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransparencyPage;
