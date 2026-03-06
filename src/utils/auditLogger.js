import { supabase } from '../supabaseClient';

/**
 * Mencatat aktivitas admin ke database
 * @param {string} userEmail - Email admin yang melakukan aksi
 * @param {string} action - Jenis aksi (CREATE, UPDATE, DELETE, VERIFY)
 * @param {string} targetTable - Tabel yang dimanipulasi
 * @param {string} details - Keterangan (misal: Judul artikel atau Nama donatur)
 */
export const logActivity = async (userEmail, action, targetTable, details) => {
    try {
        const { error } = await supabase.from('audit_logs').insert([{
            user_email: userEmail,
            action: action,
            target_table: targetTable,
            details: details
        }]);

        if (error) console.error('Gagal mencatat log:', error);
    } catch (err) {
        console.error('Error logging activity:', err);
    }
};
