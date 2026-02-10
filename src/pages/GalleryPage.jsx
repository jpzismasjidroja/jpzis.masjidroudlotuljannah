import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Image, ZoomIn, Loader2 } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const GalleryPage = () => {

    useSEO({
        title: 'Galeri Kegiatan',
        description: 'Galeri dokumentasi kegiatan sosial dan keagamaan di Masjid Jami\' Roudlatul Jannah. Lihat momen-momen berkesan.',
        url: '/gallery',
        keywords: 'galeri masjid, foto kegiatan, dokumentasi, kegiatan masjid'
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setImages(data || []);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="bg-transparent min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-in slide-in-from-bottom-5 duration-1000">
                    <span className="text-[#d0a237] font-bold tracking-widest uppercase text-sm font-serif">Dokumentasi</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#022c22] font-serif mt-2 mb-6">Galeri Kegiatan</h1>
                    <div className="h-1 w-24 bg-[#d0a237] mx-auto rounded-full"></div>
                    <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg">
                        Momen-momen kegiatan di Masjid Roudlotul Jannah dalam membangun ukhuwah dan melayani umat.
                    </p>
                </div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-[#d0a237]" size={48} />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300">
                        <Image className="mx-auto text-slate-300 mb-4" size={64} />
                        <p className="text-slate-500 font-medium">Belum ada foto kegiatan.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-zoom-in bg-white border border-slate-100"
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.image_url}
                                    alt={img.caption || 'Dokumentasi Masjid'}
                                    loading="lazy"
                                    className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                                    <p className="text-white font-serif text-lg line-clamp-2">{img.caption}</p>
                                    <div className="flex items-center gap-2 text-[#d0a237] text-xs font-bold uppercase tracking-wider mt-2">
                                        <ZoomIn size={14} /> Lihat Foto
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition">
                        <ZoomIn size={32} className="rotate-45" /> {/* Use rotate-45 for X effect */}
                    </button>

                    <div
                        className="max-w-5xl w-full max-h-screen overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.image_url}
                            alt={selectedImage.caption}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        {selectedImage.caption && (
                            <p className="text-center text-white/90 font-serif text-xl mt-4 max-w-3xl mx-auto">
                                {selectedImage.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
