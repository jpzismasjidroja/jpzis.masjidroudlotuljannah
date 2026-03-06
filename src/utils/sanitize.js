import DOMPurify from 'dompurify';

/**
 * Sanitasi teks murni — hapus SEMUA HTML tags dan atribut berbahaya.
 * Gunakan untuk input user biasa (nama, pesan, komentar).
 */
export const sanitizeText = (text) => {
    if (!text) return '';
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] }).trim();
};

/**
 * Sanitasi HTML — izinkan tag formatting dasar yang aman.
 * Gunakan untuk konten rich text editor (artikel).
 */
export const sanitizeHTML = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'b', 'i', 'em', 'strong', 'a', 'p', 'br',
            'ul', 'ol', 'li', 'h1', 'h2', 'h3',
            'blockquote', 'img', 'video', 'iframe',
            'strike', 'u', 'span'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'target', 'rel', 'class', 'width', 'height'],
        ALLOW_DATA_ATTR: false,
    });
};
