import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Facebook, Instagram, Calendar, User, Tag, ArrowRight, Share2, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';
import useSEO from '../hooks/useSEO';

const ArticleDetailPage = ({ articles }) => {
    const { id } = useParams();

    // Find current article
    const articleIndex = articles.findIndex(a => a.id == id || a.slug === id);
    const selectedArticle = articles[articleIndex];

    // SEO Meta Tags - Dynamic berdasarkan artikel
    // SEO Meta Tags - Dynamic berdasarkan artikel
    useSEO({
        title: selectedArticle?.title || 'Artikel',
        description: selectedArticle?.excerpt || 'Baca artikel kajian dan berita dari Masjid Jami\' Roudlatul Jannah',
        image: selectedArticle?.image || '/assets/img/logo.jpg',
        url: `/articles/${selectedArticle?.slug || id}`,
        type: 'article',
        keywords: selectedArticle?.tags?.join(', ') || 'kajian islam, artikel, masjid',
        structuredData: selectedArticle ? {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": selectedArticle.title,
            "image": selectedArticle.image ? [`https://masjid-roudlatuljannah.or.id${selectedArticle.image}`] : [],
            "datePublished": selectedArticle.date,
            "author": [{
                "@type": "Person",
                "name": selectedArticle.author || "Admin"
            }]
        } : null
    });

    // Navigation logic
    const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
    const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

    // --- SECURE HTML SANITIZER menggunakan DOMPurify ---
    // Meniru perilaku sanitizer lama: hapus style & class, tapi tetap aman dari XSS
    const sanitizeHTML = (htmlString) => {
        if (!htmlString) return "";

        // SECURITY PATCH: Whitelist Iframe Sources via Hook
        DOMPurify.removeAllHooks(); // Reset previous hooks
        DOMPurify.addHook('uponSanitizeElement', (node, data) => {
            if (data.tagName === 'iframe') {
                const src = node.getAttribute('src') || '';
                // Daftar domain yang diizinkan (Youtube, Spotify, Google Maps)
                const allowedDomains = [
                    'www.youtube.com',
                    'www.youtube-nocookie.com',
                    'open.spotify.com',
                    'www.google.com',
                    'maps.google.com'
                ];

                try {
                    const url = new URL(src);
                    // Cek apalah hostname diakhiri dengan salah satu domain yang diizinkan
                    const isAllowed = allowedDomains.some(domain => url.hostname === domain || url.hostname.endsWith('.' + domain));

                    if (!isAllowed) {
                        node.remove(); // Hapus iframe jika domain tidak valid
                    }
                } catch (e) {
                    node.remove(); // Hapus iframe jika URL malformed
                }
            }
        });

        // Sanitize dengan DOMPurify (aman dari XSS)
        let cleanHTML = DOMPurify.sanitize(htmlString, {
            ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'a', 'ul', 'ol', 'li',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'img', 'figure',
                'figcaption', 'video', 'iframe', 'span', 'div', 'table', 'thead',
                'tbody', 'tr', 'th', 'td'],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'width', 'height', 'frameborder', 'allowfullscreen'],
            ALLOW_DATA_ATTR: false,
        });

        // Hapus style dan class seperti sanitizer lama untuk konsistensi layout
        cleanHTML = cleanHTML
            .replace(/style="[^"]*"/g, "")
            .replace(/class="[^"]*"/g, "")
            .replace(/&nbsp;/g, " ");

        return cleanHTML;
    };

    if (!selectedArticle) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-[#FFFCF5] w-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#022c22]">Artikel tidak ditemukan</h2>
                    <p className="mb-4">Artikel yang Anda cari mungkin telah dihapus atau ID salah.</p>
                    <Link to="/articles" className="inline-block px-6 py-3 bg-[#064e3b] text-white rounded-full font-bold">Kembali ke Daftar Artikel</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFCF5] min-h-screen font-sans">
            {/* HEADER BACKGROUND */}
            <div className="fixed top-0 inset-x-0 h-24 bg-[#022c22] z-40 shadow-md"></div>

            <div className="pt-32 pb-20">
                {/* BREADCRUMB */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Link to="/" className="hover:text-[#d0a237] transition">Beranda</Link>
                        <span>/</span>
                        <Link to="/articles" className="hover:text-[#d0a237] transition">Artikel</Link>
                        <span>/</span>
                        <span className="text-[#064e3b] font-bold truncate max-w-[200px]">{selectedArticle.title}</span>
                    </div>
                </div>

                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HERO SECTION */}
                    {/* HERO IMAGE SECTION */}
                    {selectedArticle.image && (
                        <div className="rounded-[2rem] shadow-xl overflow-hidden border border-amber-100 mb-8 w-full aspect-video md:aspect-[21/9] relative z-10">
                            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* ARTICLE HEADER (Title & Metadata) */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-[#d0a237] text-[#022c22] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{selectedArticle.category}</span>
                            {selectedArticle.tags && selectedArticle.tags.map(tag => (
                                <span key={tag} className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Tag size={12} /> {tag}</span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6 text-[#022c22]">
                            {selectedArticle.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#d0a237]" />
                                <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-[#d0a237]" />
                                <span>{selectedArticle.author || 'Administrator'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-[#d0a237]" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT BODY */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 overflow-hidden">
                        <div
                            className="prose prose-lg prose-slate max-w-none break-words overflow-x-hidden
                                prose-headings:font-serif prose-headings:text-[#022c22] 
                                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:break-words
                                prose-a:text-[#d0a237] prose-a:no-underline hover:prose-a:underline prose-a:break-all
                                prose-blockquote:border-l-[#d0a237] prose-blockquote:bg-amber-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-[#064e3b] prose-blockquote:not-italic
                                prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full"
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(selectedArticle.content) }}
                        />

                        {/* FOOTER ARTICLE: SHARE & TAGS */}
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex gap-2">
                                    {selectedArticle.tags && selectedArticle.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 cursor-pointer">#{tag}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400 font-serif italic text-sm flex items-center gap-2"><Share2 size={16} /> Bagikan:</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition"><Facebook size={18} /></button>
                                        <button className="p-2 rounded-full bg-[#E4405F] text-white hover:opacity-90 transition"><Instagram size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        {prevArticle && (
                            <Link to={`/articles/${prevArticle.id}`} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#d0a237] transition flex items-center gap-4 text-left">
                                <div className="p-3 bg-amber-50 text-[#d0a237] rounded-full group-hover:bg-[#d0a237] group-hover:text-white transition"><ArrowLeft size={20} /></div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Sebelumnya</span>
                                    <h4 className="font-bold text-[#022c22] line-clamp-1 group-hover:text-[#d0a237] transition">{prevArticle.title}</h4>
                                </div>
                            </Link>
                        )}
                        {nextArticle && (
                            <Link to={`/articles/${nextArticle.id}`} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#d0a237] transition flex items-center justify-end gap-4 text-right md:col-start-2">
                                <div>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Selanjutnya</span>
                                    <h4 className="font-bold text-[#022c22] line-clamp-1 group-hover:text-[#d0a237] transition">{nextArticle.title}</h4>
                                </div>
                                <div className="p-3 bg-amber-50 text-[#d0a237] rounded-full group-hover:bg-[#d0a237] group-hover:text-white transition"><ArrowRight size={20} /></div>
                            </Link>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ArticleDetailPage;
