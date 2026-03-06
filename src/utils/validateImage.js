/**
 * Validasi file gambar menggunakan magic bytes (file signature).
 * Mencegah file berbahaya (.html, .exe, .svg) yang di-rename menjadi .jpg/.png.
 */

const IMAGE_SIGNATURES = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
};

const ALLOWED_TYPES = Object.keys(IMAGE_SIGNATURES);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Map MIME type ke ekstensi file yang aman (menghindari ekstensi dari user).
 */
export const MIME_TO_EXT = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
};

/**
 * Validasi file gambar secara menyeluruh:
 * 1. Cek MIME type
 * 2. Cek ukuran file
 * 3. Cek magic bytes (file signature header)
 * 
 * @param {File} file - File yang akan divalidasi
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
export const validateImageFile = (file) => {
    return new Promise((resolve) => {
        // 1. Cek MIME type
        if (!ALLOWED_TYPES.includes(file.type)) {
            resolve({
                valid: false,
                error: 'Hanya file gambar (JPG, PNG, GIF, WEBP) yang diperbolehkan.'
            });
            return;
        }

        // 2. Cek ukuran file
        if (file.size > MAX_FILE_SIZE) {
            resolve({
                valid: false,
                error: 'Ukuran file maksimal 5MB.'
            });
            return;
        }

        // 3. Cek magic bytes
        const reader = new FileReader();
        reader.onloadend = () => {
            const arr = new Uint8Array(reader.result).subarray(0, 8);
            const signatures = IMAGE_SIGNATURES[file.type];

            const isValid = signatures.some(sig =>
                sig.every((byte, i) => arr[i] === byte)
            );

            if (isValid) {
                resolve({ valid: true });
            } else {
                resolve({
                    valid: false,
                    error: 'File tidak valid. Pastikan file adalah gambar asli, bukan file yang di-rename.'
                });
            }
        };

        reader.onerror = () => {
            resolve({
                valid: false,
                error: 'Gagal membaca file. Silakan coba file lain.'
            });
        };

        // Baca hanya 8 byte pertama untuk cek header
        reader.readAsArrayBuffer(file.slice(0, 8));
    });
};
