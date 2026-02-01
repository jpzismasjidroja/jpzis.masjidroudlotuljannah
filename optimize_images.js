
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const imagesToOptimize = [
    {
        src: 'public/hero-mosque.jpg',
        dest: 'public/hero-mosque.webp',
        width: 1920,
        options: { quality: 80 }
    },
    {
        src: 'public/header-logo.png',
        dest: 'public/header-logo.webp',
        width: 250,
        options: { quality: 90, lossless: true }
    },
    {
        src: 'public/logo-masjid.jpg',
        dest: 'public/logo-masjid.webp',
        width: 100,
        options: { quality: 85 }
    },
    {
        src: 'public/logo-jpzis.jpg',
        dest: 'public/logo-jpzis.webp',
        width: 100,
        options: { quality: 85 }
    },
    {
        src: 'public/assets/img/masjid-h.jpg',
        dest: 'public/assets/img/masjid-h.webp',
        width: 800,
        options: { quality: 80 }
    }
];

const optimize = async () => {
    for (const img of imagesToOptimize) {
        const inputPath = path.join(projectRoot, img.src);
        const outputPath = path.join(projectRoot, img.dest);

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .resize({ width: img.width, withoutEnlargement: true })
                    .webp(img.options)
                    .toFile(outputPath);
                console.log(`Optimized: ${img.src} -> ${img.dest}`);
            } catch (err) {
                console.error(`Error optimizing ${img.src}:`, err);
            }
        } else {
            console.warn(`File not found: ${img.src}`);
        }
    }
};

optimize();
