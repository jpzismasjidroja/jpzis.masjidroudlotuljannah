import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file to WebP format with optimized settings.
 * @param {File} imageFile The original image file
 * @returns {Promise<File>} The compressed image file
 */
export const compressImage = async (imageFile) => {
    console.log('Original File:', imageFile.size / 1024 / 1024, 'MB');

    const options = {
        maxSizeMB: 0.5,           // Max size in MegaBytes
        maxWidthOrHeight: 1920,   // Max dimension
        useWebWorker: true,       // Use multi-threading
        fileType: 'image/webp',   // Force WebP format
        initialQuality: 0.8,      // Quality
    };

    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('Compressed File:', compressedFile.size / 1024 / 1024, 'MB');

        // Ensure the file extension is correct for the new blob
        const newFile = new File([compressedFile], imageFile.name.replace(/\.[^/.]+$/, "") + ".webp", {
            type: "image/webp",
            lastModified: Date.now(),
        });

        return newFile;
    } catch (error) {
        console.error('Compression Error:', error);
        throw error; // Rethrow to handle in UI
    }
};
