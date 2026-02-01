import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    // Prioritize slug for the link, fall back to ID
    const linkTarget = article.slug ? `/articles/${article.slug}` : `/articles/${article.id}`;

    return (
        <Link to={linkTarget} className="group bg-white rounded-3xl shadow-lg border border-amber-100/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full cursor-pointer">
            <div className="relative h-64 overflow-hidden shrink-0">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-[#022c22]/20 group-hover:bg-[#022c22]/0 transition"></div>
                <div className="absolute top-4 inset-x-0 flex justify-center">
                    <span className="bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-[#064e3b] uppercase tracking-widest shadow-sm border border-amber-200">{article.category}</span>
                </div>
            </div>
            <div className="p-8 text-center relative flex flex-col grow">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#022c22] text-amber-100 px-4 py-1 rounded-b-xl text-xs font-mono shadow-lg">{new Date(article.date).toLocaleDateString()}</div>
                <h3 className="text-2xl font-serif font-bold text-[#022c22] mb-4 leading-tight group-hover:text-amber-600 transition mt-2 line-clamp-2">{article.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 font-sans leading-relaxed grow">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {article.tags && article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">#{tag}</span>
                    ))}
                </div>
                <button className="text-[#064e3b] font-bold text-sm flex items-center gap-2 mx-auto hover:text-amber-600 transition-all font-serif italic border-b border-transparent hover:border-amber-600 pb-2 mt-auto p-2">Baca Selengkapnya <ArrowRight size={14} /></button>
            </div>
        </Link>
    );
};

export default ArticleCard;
