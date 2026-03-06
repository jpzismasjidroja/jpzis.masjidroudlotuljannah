export const uploadToGitHub = async (file, pathFolder = 'images', fileName = null) => {
    // Kredensial (pastikan ditambahkan di .env file)
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const githubRepoOwner = import.meta.env.VITE_GITHUB_REPO_OWNER;
    const githubRepoName = import.meta.env.VITE_GITHUB_REPO_NAME;

    if (!githubToken || !githubRepoOwner || !githubRepoName) {
        throw new Error('Konfigurasi GitHub (VITE_GITHUB_TOKEN, dll) belum diatur di .env');
    }

    // 1. Buat Nama File
    const ext = file.name.split('.').pop();
    const finalFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = `${pathFolder}/${finalFileName}`; // misal: images/123456-abc.webp

    // 2. Ubah File menjadi Base64
    const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Hilangkan header data:image/png;base64,
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });

    // 3. Upload ke GitHub menggunakan PUT Request (GitHub REST API)
    const url = `https://api.github.com/repos/${githubRepoOwner}/${githubRepoName}/contents/${filePath}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: `Upload ${finalFileName} via Admin Dashboard`,
            content: base64Data,
            branch: 'main' // Sesuaikan jika branch utama Anda bukan 'main'
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gagal upload ke GitHub: ${errorData.message}`);
    }

    // 4. Kembalikan URL jsDelivr
    // Format: https://cdn.jsdelivr.net/gh/user/repo@main/path/to/file
    return `https://cdn.jsdelivr.net/gh/${githubRepoOwner}/${githubRepoName}@main/${filePath}`;
};

export const deleteFromGitHub = async (imageUrl) => {
    // Fungsi ini bisa dikembangkan jika Anda ingin menghapus file dari GitHub API,
    // namun CDN (jsDelivr) mungkin masih menyimpan cache.
    // Sementara ini upload-only (menghapus record dari Supabase sudah cukup secara logika visual).
    console.log("Delete dari jsdelivr URL tidak wajib, mengabaikan hapus fisik:", imageUrl);
    return true;
};
