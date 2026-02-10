import React from 'react';
import ArticleCard from '../components/ArticleCard';
import useSEO from '../hooks/useSEO';

const ArticlesPage = ({ articles }) => {

    useSEO({
        title: 'Kabar & Kajian',
        description: 'Kumpulan artikel kajian keislaman dan berita terbaru dari Masjid Jami\' Roudlatul Jannah.',
        url: '/articles',
        keywords: 'artikel islam, kajian, berita masjid, dakwah, kajian keislaman'
    });

    // Filter only published articles for the public view
    // Note: If no status field exists (legacy data), consider it published or handle accordingly.
    // Here we strictly filter 'published'. You might want to allow null for legacy compatibility.
    const publishedArticles = articles.filter(article => article.status === 'published');

    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#022c22] font-serif">Kabar & Kajian</h2>
                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Ikuti update terbaru kegiatan masjid dan kajian keislaman yang bermanfaat.</p>
                </div>

                {publishedArticles.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {publishedArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-slate-100">
                        <p className="text-slate-500 font-serif italic text-lg">Belum ada artikel yang diterbitkan saat ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlesPage;
