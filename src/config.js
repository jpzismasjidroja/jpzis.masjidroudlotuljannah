
// Logic to determine if the current domain allows Admin access
export const isAdminDomain = () => {
    const hostname = window.location.hostname;
    // Allow admin on:
    // 1. localhost (for development)
    // 2. admin.masjid.com (production admin subdomain)
    // 3. Any subdomain starting with 'admin.' (flexible)
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('admin.');
};
