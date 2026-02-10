import { useEffect } from 'react';

/**
 * Custom hook untuk dynamic SEO meta tags
 * Mengupdate document head berdasarkan halaman yang aktif
 * FIX: Typo corrected (raudlatul -> roudlatul)
 */
export const useSEO = ({
    title,
    description,
    image = '/assets/img/logo.jpg',
    url,
    type = 'website',
    keywords = '',
    structuredData = null
}) => {
    const siteName = "LAZIS Masjid Jami' Roudlotul Jannah";
    // FIX: Typo correction
    const baseUrl = 'https://masjid-roudlatuljannah.or.id';

    useEffect(() => {
        // Update title
        document.title = title ? `${title} | ${siteName}` : siteName;

        // Helper function untuk update/create meta tag
        const updateMeta = (property, content, isName = false) => {
            const attr = isName ? 'name' : 'property';
            let meta = document.querySelector(`meta[${attr}="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, property);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
        const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

        // Basic Meta Tags
        if (description) {
            updateMeta('description', description, true);
        }
        if (keywords) {
            updateMeta('keywords', keywords, true);
        }

        // Open Graph Tags
        updateMeta('og:title', title || siteName);
        updateMeta('og:description', description || '');
        updateMeta('og:image', fullImage);
        updateMeta('og:url', fullUrl);
        updateMeta('og:type', type);
        updateMeta('og:site_name', siteName);
        updateMeta('og:locale', 'id_ID');

        // Twitter Card Tags
        updateMeta('twitter:card', 'summary_large_image', true);
        updateMeta('twitter:title', title || siteName, true);
        updateMeta('twitter:description', description || '', true);
        updateMeta('twitter:image', fullImage, true);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

        // JSON-LD Structured Data Injection
        if (structuredData) {
            let script = document.querySelector('script[type="application/ld+json"][id="dynamic-jsonld"]');
            if (!script) {
                script = document.createElement('script');
                script.type = 'application/ld+json';
                script.id = 'dynamic-jsonld';
                document.head.appendChild(script);
            }
            script.text = JSON.stringify(structuredData);
        }

        // Cleanup function (optional, usually not needed for meta tags unless SPA navigation is weird)
    }, [title, description, image, url, type, keywords, structuredData]);

    // Return null because we are not rendering a component anymore
    return null;
};

export default useSEO;
