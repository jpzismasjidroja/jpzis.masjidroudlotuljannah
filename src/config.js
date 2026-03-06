
// Logic to determine if the current domain allows Admin access
export const isAdminDomain = () => {
    const hostname = window.location.hostname;
    const allowedDomains = [
        'localhost',
        '127.0.0.1',
        'admin.masjidroja.com',      // Subdomain admin khusus (sesuaikan)
        'jpzis.masjidroja.com',      // Domain utama (hapus jika ingin pisah)
    ];
    return allowedDomains.includes(hostname);
};
