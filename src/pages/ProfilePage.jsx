import React, { useState } from 'react';
import { Award, History, BookOpen, Users, Star, Leaf } from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('visi_misi');

    const staffMembers = [
        { name: "Ust. Farhan Al-Ghifari", role: "Wakil Ketua", image: "/assets/img/1 (1).jpeg" },
        { name: "Dimas Anggara, S.Kom.", role: "Sekretaris 1", image: "/assets/img/1 (2).jpeg" },
        { name: "H. Irwan Wijaya, S.E.", role: "Bendahara 1", image: "/assets/img/1 (1).jpg" },
        { name: "Ust. Zulkifli Hasan", role: "Kabid. Ibadah & Dakwah", image: "/assets/img/1 (2).jpg" },
        { name: "Ibu Hj. Siti Aminah", role: "Kabid. Pendidikan", image: "/assets/img/1 (3).jpg" },
        { name: "Ahmad Syauqi", role: "Kabid. Sosial & ZISWAF", image: "/assets/img/1 (4).jpg" },
        { name: "Bapak Joko Susilo", role: "Kabid. Sarana Prasarana", image: "/assets/img/1 (1).jpeg" },
        { name: "Fikri Haikal", role: "Kabid. Humas & Multimedia", image: "/assets/img/1 (2).jpeg" },
        { name: "Rizky Pratama", role: "Sekretaris 2", image: "/assets/img/1 (1).jpg" }
    ];

    const historyData = [
        { year: "1965", text: "Masjid Jami’ Roudlotul Jannah terletak di RW 05, Kelurahan Tasikmadu, dan telah menjadi pusat ibadah serta kegiatan keagamaan masyarakat sejak tahun 1965. Masjid ini didirikan atas inisiatif KH. Yusuf bersama warga setempat, bermula dari bangunan sederhana berukuran 6 x 10 meter yang menjadi tonggak awal kehidupan spiritual masyarakat sekitar." },
        { year: "1978", text: "Seiring pertumbuhan jumlah jemaah, masjid mengalami beberapa tahap renovasi dan pengembangan. Renovasi pertama dilakukan pada tahun 1978 di bawah kepemimpinan KH. A.S. Mahfudz Y, dengan perluasan bangunan menjadi 10 x 15 meter berkat dukungan masyarakat dan wakaf tanah keluarga almarhum KH. Yusuf." },
        { year: "1985", text: "Pada tahun 1985, masjid kembali direnovasi secara besar-besaran di bawah kepemimpinan KH. A.S. Mahfudz Y dan Ta’mir Masjid yang dipimpin H. Zaini Anuran. Pada fase ini, Masjid Jami’ Roudlotul Jannah mulai mengusung ciri khas arsitektur bergaya Spanyol—terlihat pada menara, kubah, jendela, dan pintu—dengan rancangan Ir. H. Hariyanto. Luas bangunan pun bertambah menjadi 12 x 20 meter melalui tambahan tanah wakaf dari Kyai Mudin Saleh K." },
        { year: "2007", text: "Setelah wafatnya KH. A.S. Mahfudz Y, estafet perjuangan dakwah dilanjutkan oleh Gus H. A. Thoha. Pada tahun 2007, renovasi ketiga dilaksanakan dengan fokus pada perluasan area masjid hingga mencapai ukuran 15 x 27 meter, sambil tetap mempertahankan estetika arsitektur yang telah menjadi identitas masjid." },
        { year: "2017", text: "Transformasi besar kembali dilakukan sejak tahun 2017 hingga sekarang. Di bawah prakarsa Gus H. A. Thoha dan jajaran Ta’mir, serta dengan dukungan penuh swadaya masyarakat, masjid mengalami modernisasi arsitektur dengan mengadopsi gaya Turki dan Madinah, ditandai dengan penggunaan kubah model Madinah serta dua menara megah." },
        { year: "2026", text: "Memasuki tahun 2026, Masjid Jami’ Roudlotul Jannah berdiri megah sebagai perpaduan harmonis arsitektur Madinah dan Turki. Lebih dari sekadar tempat ibadah, masjid ini menjadi simbol persatuan, kekompakan, dan kesadaran spiritual masyarakat RW 05 Kelurahan Tasikmadu yang terus terjaga selama lebih dari enam dekade." }
    ];

    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#29412d] font-serif">Profil Masjid</h2>
                    <p className="text-[#d0a237] italic mt-2 font-serif">"Pusat Pemberdayaan Dakwah Islam"</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                    {[
                        { id: 'visi_misi', label: 'Visi & Misi', icon: <Award size={18} /> },
                        { id: 'sejarah', label: 'Sejarah', icon: <History size={18} /> },
                        { id: 'peran', label: 'Peran & Fungsi', icon: <BookOpen size={18} /> },
                        { id: 'struktur', label: 'Pengurus', icon: <Users size={18} /> },
                    ].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-serif font-bold text-sm transition-all duration-300 border ${activeTab === tab.id ? 'bg-[#29412d] text-[#d0a237] border-[#29412d] shadow-lg transform scale-105' : 'bg-white text-slate-500 border-amber-200 hover:border-[#113642] hover:bg-slate-50'}`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-[#d0a237]/30 min-h-[600px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>

                    {/* === TAB 1: VISI MISI === */}
                    {activeTab === 'visi_misi' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10">
                            {/* VISI CARD */}
                            <div className="bg-[#29412d] rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg border-b-4 border-[#d0a237]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                                <h3 className="text-3xl font-bold text-white mb-4 font-serif relative z-10">Visi JPZIS</h3>
                                <p className="text-xl text-[#d0a237] font-serif italic leading-relaxed max-w-4xl mx-auto relative z-10">
                                    "Menjadi lembaga pengelola dana ZIS (Zakat, Infaq, Shadaqah) yang amanah, profesional, dan transparan guna mewujudkan kesejahteraan serta kemandirian umat."
                                </p>
                            </div>

                            {/* MISI LIST */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px bg-[#d0a237]/50 flex-1"></div>
                                    <h3 className="text-2xl font-bold text-[#113642] font-serif uppercase tracking-widest">Misi Utama</h3>
                                    <div className="h-px bg-[#d0a237]/50 flex-1"></div>
                                </div>

                                <p className="text-center text-slate-600 mb-8 italic">Untuk mencapai visi tersebut, JPZIS biasanya menjalankan beberapa misi kunci:</p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { t: "Optimalisasi Penghimpunan", d: "Mendorong kesadaran masyarakat untuk menunaikan zakat, infaq, dan shadaqah melalui sistem yang mudah dan menjangkau hingga akar rumput." },
                                        { t: "Manajemen Profesional", d: "Mengelola dana umat dengan prinsip transparansi (keterbukaan) dan akuntabilitas (dapat dipertanggungjawabkan) sesuai syariat Islam dan regulasi negara." },
                                        { t: "Pendayagunaan yang Tepat Sasaran", d: "Menyalurkan dana melalui program-program yang kreatif dan produktif, tidak hanya bersifat konsumtif (bantuan langsung) tetapi juga pemberdayaan ekonomi." },
                                        { t: "Peningkatan Kualitas Hidup", d: "Memfokuskan penyaluran pada pilar-pilar penting seperti pendidikan, kesehatan, ekonomi mandiri, dan tanggap bencana." },
                                        { t: "Penguatan Jaringan", d: "Memperluas jangkauan layanan hingga ke tingkat desa atau komunitas terkecil (melalui JPZIS) agar bantuan lebih merata." }
                                    ].map((item, idx) => (
                                        <div key={idx} className={`p-6 rounded-2xl border border-slate-100 hover:border-[#d0a237] transition hover:shadow-lg ${idx === 4 ? 'md:col-span-2 bg-[#fffcf5]' : 'bg-white'}`}>
                                            <div className="flex gap-4">
                                                <div className="bg-[#113642] text-[#d0a237] w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">{idx + 1}</div>
                                                <div>
                                                    <h4 className="font-bold text-[#29412d] text-lg mb-2">{item.t}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item.d}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === TAB 2: SEJARAH (TIMELINE LAYOUT) === */}
                    {activeTab === 'sejarah' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="max-w-4xl mx-auto">
                                {historyData.map((item, index) => (
                                    <div key={index} className="flex gap-6 mb-8 group last:mb-0">
                                        <div className="flex flex-col items-end w-24 flex-shrink-0">
                                            <span className="text-2xl font-bold text-[#d0a237] font-serif">{item.year}</span>
                                            <div className="h-full w-px bg-[#d0a237]/30 mt-2 relative group-last:hidden">
                                                <div className="absolute top-0 -right-[5px] w-2.5 h-2.5 rounded-full bg-[#113642] ring-4 ring-white"></div>
                                            </div>
                                        </div>
                                        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 group-hover:border-[#d0a237]/50 group-hover:bg-[#fffcf5] transition flex-1 shadow-sm">
                                            <p className="text-slate-700 leading-relaxed text-justify">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* === TAB 3: PERAN (TEXT LENGKAP) === */}
                    {activeTab === 'peran' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                            <style>{`
                           .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                           .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
                           .custom-scrollbar::-webkit-scrollbar-thumb { background: #d0a237; border-radius: 4px; }
                           `}</style>

                            {/* BAGIAN 1 */}
                            <div className="bg-[#fffbeb] p-8 rounded-3xl mb-8 border border-amber-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#d0a237] rounded-lg text-white"><Star size={20} /></div>
                                    <h3 className="text-xl font-bold text-[#29412d] font-serif uppercase tracking-wider">Pusat Pemberdayaan Dakwah Islam</h3>
                                </div>
                                <div className="space-y-6 text-slate-700 leading-relaxed text-justify">
                                    <div>
                                        <h4 className="font-bold text-[#113642] mb-2 border-l-4 border-[#d0a237] pl-3">Latar Belakang dan Konsep</h4>
                                        <p>Masjid merupakan institusi yang sangat penting dalam Islam, tidak hanya sebagai tempat ibadah, tetapi juga sebagai pusat pemberdayaan dakwah Islam. Allah SWT berfirman dalam Al-Qur'an, "Dan janganlah kamu menyerupai orang-orang yang memecah belah agama mereka dan mereka menjadi beberapa golongan. Setiap golongan merasa gembira dengan apa yang ada pada mereka." (QS. Al-Rum: 32). Ayat ini menunjukkan bahwa umat Islam harus bersatu dan tidak memecah belah, dan masjid dapat menjadi pusat persatuan dan pemberdayaan dakwah Islam.</p>
                                        <p className="mt-2">Konsep pemberdayaan dakwah Islam di masjid meliputi kegiatan pendidikan, sosial, ekonomi, dan budaya yang dapat meningkatkan kualitas hidup masyarakat. Rasulullah SAW bersabda, "Sesungguhnya Allah tidak akan mengubah nasib suatu kaum sebelum mereka mengubah nasib diri mereka sendiri." (HR. Al-Rad: 11). Hadits ini menunjukkan bahwa perubahan harus dimulai dari diri sendiri, dan masjid dapat menjadi pusat perubahan dan pemberdayaan masyarakat.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#113642] mb-2 border-l-4 border-[#d0a237] pl-3">Meningkatkan Kesadaran Masyarakat</h4>
                                        <p>Masjid memiliki peran yang sangat penting dalam meningkatkan kesadaran masyarakat tentang Islam. Allah SWT berfirman, "Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pelajaran yang baik, dan bantahlah mereka dengan cara yang baik." (QS. Al-Nahl: 125). Ayat ini menunjukkan bahwa dakwah Islam harus dilakukan dengan cara yang baik dan bijak, dan masjid dapat menjadi pusat dakwah Islam yang efektif.</p>
                                        <p className="mt-2">Strategi dan program dakwah Islam yang efektif di masjid antara lain pengajian rutin, kegiatan sosial, pendidikan Islam, dan kegiatan ekonomi. Rasulullah SAW bersabda, "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya." (HR. Al-Thabrani). Hadits ini menunjukkan bahwa umat Islam harus bermanfaat bagi orang lain, dan masjid dapat menjadi pusat kegiatan sosial dan ekonomi yang bermanfaat bagi masyarakat.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#113642] mb-2 border-l-4 border-[#d0a237] pl-3">Pemberdayaan Sosial dan Ekonomi</h4>
                                        <p>Masjid dapat melakukan kegiatan sosial dan ekonomi yang dapat meningkatkan kesadaran masyarakat. Allah SWT berfirman, "Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan janganlah tolong-menolong dalam (mengerjakan) dosa dan permusuhan." (QS. Al-Maidah: 2). Ayat ini menunjukkan bahwa umat Islam harus tolong-menolong dalam kebajikan, dan masjid dapat menjadi pusat kegiatan sosial dan ekonomi yang bermanfaat bagi masyarakat.</p>
                                        <p className="mt-2">Kegiatan sosial dan ekonomi di masjid dapat memiliki dampak yang positif dalam meningkatkan kesadaran masyarakat. Rasulullah SAW bersabda, "Sesungguhnya sedekah itu dapat menghapuskan dosa, seperti air yang dapat memadamkan api." (HR. Al-Tirmidzi). Hadits ini menunjukkan bahwa kegiatan sosial dan ekonomi di masjid dapat memiliki dampak yang positif dalam meningkatkan kesadaran masyarakat.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#113642] mb-2 border-l-4 border-[#d0a237] pl-3">Tantangan dan Strategi</h4>
                                        <p>Pemberdayaan dakwah Islam di masjid menghadapi beberapa tantangan, antara lain kurangnya sumber daya manusia yang berkualitas, kurangnya dana, dan kurangnya kesadaran masyarakat. Namun, Allah SWT berfirman, "Dan barangsiapa yang bertakwa kepada Allah, niscaya Allah akan memberikan jalan keluar (dari kesulitan) dan memberinya rezeki dari arah yang tidak disangka-sangka." (QS. Al-Thalaq: 2-3). Ayat ini menunjukkan bahwa dengan takwa dan kesabaran, Allah akan memberikan jalan keluar dari kesulitan.</p>
                                        <p className="mt-2">Strategi pengembangan pemberdayaan dakwah Islam di masjid antara lain meningkatkan kualitas sumber daya manusia, meningkatkan kesadaran masyarakat, dan meningkatkan kerja sama dengan lembaga lain. Rasulullah SAW bersabda, "Sesungguhnya Allah akan menolong umat ini dengan orang-orang yang lemah, dengan doa mereka, shalat mereka, dan keikhlasan mereka." (HR. Al-Nasai). Hadits ini menunjukkan bahwa dengan kesabaran dan keikhlasan, Allah akan menolong umat Islam dalam pemberdayaan dakwah Islam di masjid.</p>
                                    </div>
                                </div>
                            </div>

                            {/* BAGIAN 2 */}
                            <div className="bg-[#f0fdf4] p-8 rounded-3xl mb-8 border border-green-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#113642] rounded-lg text-white"><Leaf size={20} /></div>
                                    <h3 className="text-xl font-bold text-[#29412d] font-serif uppercase tracking-wider">Meningkatkan Kualitas Hidup Umat</h3>
                                </div>
                                <div className="space-y-4 text-slate-700 leading-relaxed text-justify">
                                    <p>Masjid merupakan institusi yang sangat penting dalam Islam, tidak hanya sebagai tempat ibadah, tetapi juga sebagai pusat pemberdayaan masyarakat. Pemberdayaan masyarakat di masjid bertujuan untuk meningkatkan kualitas hidup umat Islam dengan memberikan pendidikan, pelatihan, dan pelayanan yang dibutuhkan oleh masyarakat.</p>
                                    <p>Masjid memiliki peran yang sangat penting dalam meningkatkan kualitas hidup umat Islam. Beberapa peran masjid antara lain:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li><strong>Pendidikan dan Pelatihan:</strong> Masjid dapat menjadi pusat pendidikan dan pelatihan bagi masyarakat, seperti pengajian Al-Qur'an, hadits, dan fiqh.</li>
                                        <li><strong>Kegiatan Sosial dan Ekonomi:</strong> Masjid dapat menjadi pusat kegiatan sosial dan ekonomi, seperti koperasi, pelatihan keterampilan, dan bantuan sosial.</li>
                                        <li><strong>Pelayanan Kesehatan dan Kesejahteraan:</strong> Masjid dapat menjadi pusat pelayanan kesehatan dan kesejahteraan, seperti klinik kesehatan, posyandu, dan bantuan sosial.</li>
                                    </ul>
                                    <p>Untuk meningkatkan peran masjid dalam pemberdayaan masyarakat, perlu dilakukan beberapa strategi, antara lain:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li><em>Pengembangan Sumber Daya Manusia:</em> Meningkatkan kualitas sumber daya manusia di masjid, seperti pengajar, pengurus, dan masyarakat.</li>
                                        <li><em>Peningkatan Kesadaran Masyarakat:</em> Meningkatkan kesadaran masyarakat tentang pentingnya pemberdayaan masyarakat di masjid.</li>
                                        <li><em>Kerja Sama dengan Lembaga Lain:</em> Meningkatkan kerja sama dengan lembaga lain, seperti pemerintah, swasta, dan organisasi masyarakat.</li>
                                    </ul>
                                    <p><strong>Tantangan dan Peluang:</strong> Pemberdayaan masyarakat di masjid menghadapi beberapa tantangan, seperti kurangnya sumber daya, kurangnya kesadaran masyarakat, dan kurangnya kerja sama dengan lembaga lain. Namun, pemberdayaan masyarakat di masjid juga memiliki peluang, seperti meningkatkan kualitas hidup umat Islam, meningkatkan kesadaran masyarakat, dan meningkatkan kerja sama dengan lembaga lain.</p>
                                </div>
                            </div>

                            {/* BAGIAN 3 */}
                            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#29412d] rounded-lg text-white"><BookOpen size={20} /></div>
                                    <h3 className="text-xl font-bold text-[#29412d] font-serif uppercase tracking-wider">Institusi Pendidikan Islam</h3>
                                </div>
                                <div className="space-y-4 text-slate-700 leading-relaxed text-justify">
                                    <p>Masjid merupakan institusi pendidikan Islam yang sangat penting, tidak hanya sebagai tempat ibadah, tetapi juga sebagai pusat pendidikan dan pelatihan. Pendidikan Islam di masjid bertujuan untuk meningkatkan pengetahuan dan pemahaman Islam, meningkatkan kualitas hidup masyarakat, dan meningkatkan kesadaran sosial dan kemasyarakatan.</p>
                                    <p>Masjid memiliki beberapa fungsi sebagai institusi pendidikan Islam, antara lain:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li><strong>Pendidikan Formal:</strong> Masjid dapat menjadi pusat pendidikan formal, seperti madrasah, pesantren, dan universitas.</li>
                                        <li><strong>Pendidikan Non-Formal:</strong> Masjid dapat menjadi pusat pendidikan non-formal, seperti pengajian, pelatihan, dan seminar.</li>
                                        <li><strong>Pendidikan Informal:</strong> Masjid dapat menjadi pusat pendidikan informal, seperti pengajian keluarga, pengajian remaja, dan pengajian anak-anak.</li>
                                    </ul>
                                    <p>Masjid memiliki peranan yang sangat penting dalam meningkatkan kesadaran masyarakat, antara lain:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li><em>Meningkatkan Pengetahuan dan Pemahaman Islam:</em> Masjid dapat meningkatkan pengetahuan dan pemahaman Islam masyarakat.</li>
                                        <li><em>Meningkatkan Kualitas Hidup Masyarakat:</em> Masjid dapat meningkatkan kualitas hidup masyarakat dengan memberikan pendidikan, pelatihan, dan pelayanan.</li>
                                        <li><em>Meningkatkan Kesadaran Sosial dan Kemasyarakatan:</em> Masjid dapat meningkatkan kesadaran sosial dan kemasyarakatan masyarakat.</li>
                                    </ul>
                                    <p>Untuk meningkatkan peran masjid dalam pendidikan Islam, perlu dilakukan beberapa strategi, antara lain:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li><em>Peningkatan Kualitas Guru dan Pengajar:</em> Meningkatkan kualitas guru dan pengajar di masjid.</li>
                                        <li><em>Peningkatan Sumber Daya dan Fasilitas:</em> Meningkatkan sumber daya dan fasilitas di masjid.</li>
                                        <li><em>Peningkatan Kerja Sama dengan Lembaga Lain:</em> Meningkatkan kerja sama dengan lembaga lain, seperti pemerintah, swasta, dan organisasi masyarakat.</li>
                                    </ul>
                                    <p>Pengembangan pendidikan Islam di masjid menghadapi beberapa tantangan, seperti kurangnya sumber daya, kurangnya kesadaran masyarakat, dan kurangnya kerja sama dengan lembaga lain. Namun, pengembangan pendidikan Islam di masjid juga memiliki peluang, seperti meningkatkan kualitas hidup masyarakat, meningkatkan kesadaran masyarakat, dan meningkatkan kerja sama dengan lembaga lain.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === TAB 4: STRUKTUR PENGURUS === */}
                    {activeTab === 'struktur' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 text-center">
                            <div className="mb-10">
                                <h3 className="font-bold text-2xl text-[#29412d] font-serif mb-2">Dewan Kemakmuran Masjid (DKM)</h3>
                                <p className="text-[#d0a237] font-bold italic font-serif">Penasihat: KH. Abdullah Faqih</p>
                            </div>

                            {/* KETUA DKM */}
                            <div className="flex justify-center mb-12">
                                <div className="bg-[#29412d] p-8 rounded-[2rem] shadow-xl relative overflow-hidden group max-w-sm w-full transform hover:-translate-y-2 transition duration-500">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                                    <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#d0a237] relative z-10 overflow-hidden shadow-lg bg-white">
                                        <img src="/assets/img/1 (4).jpg" alt="Ketua DKM" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                                    </div>
                                    <h4 className="font-serif font-bold text-xl text-amber-50 relative z-10">H. Muhammad Salman, S.T.</h4>
                                    <p className="text-[#d0a237] text-sm uppercase tracking-widest mt-2 relative z-10 font-bold">Ketua DKM</p>
                                </div>
                            </div>

                            {/* GRID ANGGOTA */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {staffMembers.map((member, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition group hover:-translate-y-1">
                                        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-slate-200 group-hover:border-[#d0a237] transition shadow-sm bg-slate-50">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Foto"; e.target.className = "p-2 opacity-50" }}
                                            />
                                        </div>
                                        <h4 className="font-bold text-[#113642] font-serif text-lg">{member.name}</h4>
                                        <div className="h-0.5 w-10 bg-[#d0a237]/50 mx-auto my-3"></div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
