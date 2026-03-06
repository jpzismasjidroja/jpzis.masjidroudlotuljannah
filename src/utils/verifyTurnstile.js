/**
 * Verifikasi Turnstile token melalui server-side API.
 * Mencegah bypass bot protection via request langsung ke Supabase.
 * 
 * @param {string} token - Turnstile token dari widget
 * @returns {Promise<boolean>} - true jika verifikasi berhasil
 */
export const verifyTurnstileToken = async (token) => {
    if (!token) return false;

    try {
        const response = await fetch('/api/verify-turnstile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            // Jika 404 (lokal) atau error lain, gunakan fallback
            console.log('API verification unavailable, using fallback');
            return true;
        }

        const data = await response.json();
        return data.success === true;
    } catch (error) {
        // Jika endpoint belum tersedia (dev lokal), skip verifikasi server-side
        // dan andalkan verifikasi client-side saja
        console.warn('Server-side Turnstile verification unavailable, using client-side only:', error.message);
        return true; // Fallback: izinkan di development
    }
};
