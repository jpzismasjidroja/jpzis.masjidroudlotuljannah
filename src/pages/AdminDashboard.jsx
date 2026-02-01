import React, { useState, useMemo, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'; // Import createClient direct
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    LogOut, LayoutDashboard, FileText, Wallet, CheckCircle, TrendingUp, Users,
    Plus, Edit, Trash2, Camera, ExternalLink, Save, Eye, EyeOff, Download, Menu, X, Image as ImageIcon, Loader2,
    Shield, UserPlus, ShieldAlert
} from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../supabaseClient';
import { formatRupiah } from '../utils';
import { compressImage } from '../utils/compressImage';
import ReactQuill, { Quill } from 'react-quill-new';
// Register Quill Modules
// Quill.register('modules/imageResize', ImageResize);

const AdminDashboard = ({ user, articles, donations, fetchArticles, fetchDonations, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Can manage content
    const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Can manage admins

    // Editor States
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('Kajian');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [status, setStatus] = useState('draft'); // 'draft' | 'published'
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('Administrator');
    const [loading, setLoading] = useState(false);

    // CSV Export State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Gallery State
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editingImageId, setEditingImageId] = useState(null);
    const [editCaption, setEditCaption] = useState('');

    // Admin Management State
    const [adminList, setAdminList] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [adminLoading, setAdminLoading] = useState(false);

    // --- CHECK ROLE ON LOAD ---
    useEffect(() => {
        const checkRole = async () => {
            console.log("Checking role for user:", user?.email); // DEBUG
            if (user?.email) {
                const { data, error } = await supabase
                    .from('admin_roles')
                    .select('role')
                    .eq('email', user.email)
                    .single();

                console.log("Role data:", data, "Error:", error); // DEBUG

                if (data) {
                    setIsAdmin(true); // Both can access dashboard
                    if (data.role === 'superadmin') {
                        console.log("User is Superadmin!"); // DEBUG
                        setIsSuperAdmin(true);
                    }
                }
            }
        };
        checkRole();
    }, [user]);

    // Fetch Gallery
    const fetchGallery = async () => {
        setGalleryLoading(true);
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setGalleryImages(data);
        setGalleryLoading(false);
    };

    // Fetch Admin List (Superadmin Only)
    const fetchAdmins = async () => {
        if (!isSuperAdmin) return;
        setAdminLoading(true);
        const { data, error } = await supabase
            .from('admin_roles')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setAdminList(data);
        setAdminLoading(false);
    };

    // Initial Fetch (Gallery & Admins if Superadmin)
    useEffect(() => {
        if (activeTab === 'gallery') fetchGallery();
        if (activeTab === 'admins' && isSuperAdmin) fetchAdmins();
    }, [activeTab, isSuperAdmin]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && title) {
            const autoSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setSlug(autoSlug);
        }
    }, [title, isEditing]);

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'indent' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image', 'video'
    ];

    const COLORS = ['#29412d', '#113642', '#d0a237', '#8c6b24', '#1f3322'];

    // --- CHART DATA ---
    const chartData = useMemo(() => {
        const agg = {};
        donations.forEach(d => {
            const type = d.type.split(' ')[0];
            if (!agg[type]) agg[type] = 0;
            agg[type] += d.amount;
        });
        return Object.keys(agg).map(key => ({ name: key, value: agg[key] }));
    }, [donations]);

    // --- HANDLERS ---
    const resetForm = () => {
        setTitle('');
        setSlug('');
        setCategory('Kajian');
        setExcerpt('');
        setContent('');
        setImageFile(null);
        setPreviewImage(null);
        setStatus('draft');
        setTags('');
        setAuthor('Administrator');
        setIsEditing(false);
        setSelectedArticle(null);
    };

    const handleEditArticle = (article) => {
        setIsEditing(true);
        setSelectedArticle(article);
        setTitle(article.title);
        setSlug(article.slug || '');
        setCategory(article.category);
        setExcerpt(article.excerpt);
        setContent(article.content);
        setPreviewImage(article.image);
        setStatus(article.status || 'draft');
        setTags(article.tags ? article.tags.join(', ') : '');
        setAuthor(article.author || 'Administrator');
        setActiveTab('content');
    };

    const handleDeleteArticle = async (id) => {
        if (!confirm('Yakin ingin menghapus artikel ini?')) return;
        try {
            const { error } = await supabase.from('articles').delete().eq('id', id);
            if (error) throw error;
            fetchArticles();
        } catch (error) {
            alert('Gagal menghapus: ' + error.message);
        }
    };

    const handleArticleSubmit = async (e, targetStatus = null) => {
        e.preventDefault();
        setLoading(true);

        const finalStatus = targetStatus || status;

        try {
            let imageUrl = previewImage;

            if (imageFile) {
                // Compress Image
                const compressedFile = await compressImage(imageFile);

                // Option: Delete old image if editing and replacing
                if (isEditing && selectedArticle && selectedArticle.image) {
                    try {
                        const oldFileName = selectedArticle.image.substring(selectedArticle.image.lastIndexOf('/') + 1);
                        if (oldFileName) await supabase.storage.from('article-images').remove([oldFileName]);
                    } catch (err) {
                        console.warn('Failed to delete old image', err);
                    }
                }

                // Upload new compressed image
                const fileExt = compressedFile.name.split('.').pop();
                const fileName = `${Date.now()}-${slug}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('article-images')
                    .upload(fileName, compressedFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('article-images')
                    .getPublicUrl(fileName);
                imageUrl = urlData.publicUrl;
            }

            // Process tags
            const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);

            const articleData = {
                title,
                slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                category,
                excerpt,
                content,
                image: imageUrl,
                status: finalStatus,
                tags: tagsArray,
                author,
                updated_at: new Date().toISOString(),
                // Only set created_at/date if new
                ...(isEditing ? {} : { date: new Date().toISOString().split('T')[0] })
            };

            if (isEditing && selectedArticle) {
                const { error } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', selectedArticle.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('articles')
                    .insert([articleData]);
                if (error) throw error;
            }

            fetchArticles();
            resetForm();
            alert(isEditing ? 'Artikel diperbarui!' : 'Artikel disimpan!');
            setActiveTab('content');

        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        // Filter Data
        let filteredData = donations;
        if (startDate) {
            filteredData = filteredData.filter(d => new Date(d.created_at) >= new Date(startDate));
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59); // Include the whole end day
            filteredData = filteredData.filter(d => new Date(d.created_at) <= end);
        }

        if (filteredData.length === 0) {
            alert('Tidak ada data pada periode yang dipilih.');
            return;
        }

        // Generate CSV Content
        const headers = ['Tanggal', 'Donatur', 'Email', 'Telepon', 'Tipe', 'Metode', 'Nominal', 'Status', 'Bukti URL'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(d => [
                new Date(d.created_at).toLocaleDateString(),
                `"${d.name}"`, // Quote to handle commas in names
                d.email || '-',
                d.phone || '-',
                d.type,
                d.method,
                d.amount,
                d.status,
                d.proof_url
            ].join(','))
        ].join('\n');

        // Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `rekap_donasi_${startDate || 'awal'}_sd_${endDate || 'akhir'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const verifyDonation = async (id, status) => {
        if (!confirm(`Ubah status menjadi ${status}?`)) return;
        try {
            const { error } = await supabase
                .from('donations')
                .update({ status })
                .eq('id', id);
            if (error) throw error;
            fetchDonations();
        } catch (error) {
            alert('Gagal update status: ' + error.message);
        }
    };

    // --- GALLERY HANDLERS ---
    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            for (const file of files) {
                // Compress Image
                const compressedFile = await compressImage(file);

                // Upload to Storage
                const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}.webp`;
                const { error: uploadError } = await supabase.storage
                    .from('gallery-images')
                    .upload(fileName, compressedFile);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: urlData } = supabase.storage
                    .from('gallery-images')
                    .getPublicUrl(fileName);

                // Save to Database
                const { error: dbError } = await supabase
                    .from('gallery')
                    .insert([{
                        image_url: urlData.publicUrl,
                        caption: file.name.split('.')[0] // Default caption from filename
                    }]);

                if (dbError) throw dbError;
            }
            alert('Berhasil mengupload foto!');
            fetchGallery();
        } catch (error) {
            console.error(error);
            alert('Gagal upload: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteGallery = async (id, imageUrl) => {
        if (!confirm('Hapus foto ini dari galeri?')) return;
        try {
            // Delete from DB
            const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
            if (dbError) throw dbError;

            // Extract filename from URL to delete from storage (Optional but recommended)
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            if (fileName) {
                await supabase.storage.from('gallery-images').remove([fileName]);
            }

            fetchGallery();
        } catch (error) {
            alert('Gagal menghapus: ' + error.message);
        }
    };

    const startEditCaption = (img) => {
        setEditingImageId(img.id);
        setEditCaption(img.caption || '');
    };

    const handleSaveCaption = async (id) => {
        try {
            const { error } = await supabase
                .from('gallery')
                .update({ caption: editCaption })
                .eq('id', id);

            if (error) throw error;

            setEditingImageId(null);
            fetchGallery();
        } catch (error) {
            alert('Gagal update caption: ' + error.message);
        }
    };

    // --- ADMIN MANAGEMENT HANDLERS (SUPERADMIN ONLY) ---
    const handleAddAdmin = async (e) => {
        e.preventDefault();
        if (!isSuperAdmin) return;

        if (newAdminPassword.length < 6) {
            alert('Password minimal 6 karakter');
            return;
        }

        setAdminLoading(true);
        try {
            // STRATEGY: Create a SECOND, temporary Supabase client that DOES NOT persist the session.
            // This allows us to "Sign Up" the new user without logging out the current Superadmin.

            // Hardcode credentials from supabaseClient.js (since they are visible there) OR better, use the env vars if available.
            // Since we saw the file content, we can re-use the values.
            const supabaseUrl = 'https://wphiberzrkkcqibwmamo.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwaGliZXJ6cmtrY3FpYndtYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMzY1OTEsImV4cCI6MjA4MzgxMjU5MX0.dxWI4wBPCsASOYzvLczgvMwn95BcB9cqSH0fbup_4d0';

            const tempClient = createClient(supabaseUrl, supabaseKey, {
                auth: {
                    persistSession: false, // CRITICAL: Do not overwrite local storage
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            });

            // 1. Create Auth User (Sign Up)
            const { data: authData, error: authError } = await tempClient.auth.signUp({
                email: newAdminEmail,
                password: newAdminPassword,
            });

            if (authError) throw authError;

            // 2. Add to Whitelist (Using MAIN client which has RLS access)
            const { error: dbError } = await supabase
                .from('admin_roles')
                .insert([{ email: newAdminEmail, role: 'admin' }]);

            if (dbError) {
                // Determine if error is "Already exists"
                if (dbError.code === '23505') { // Unique violation
                    alert('Email sudah terdaftar sebagai admin d database.');
                } else {
                    throw dbError;
                }
            }

            alert(`Sukses! Admin baru dibuat.\nEmail: ${newAdminEmail}\nPassword: ${newAdminPassword}`);
            setNewAdminEmail('');
            setNewAdminPassword('');
            fetchAdmins();

        } catch (error) {
            console.error(error);
            alert('Gagal menambah admin: ' + error.message);
        } finally {
            setAdminLoading(false);
        }
    };

    const handleDeleteAdmin = async (email) => {
        if (!confirm(`Hapus akses admin untuk ${email}?`)) return;
        try {
            const { error } = await supabase
                .from('admin_roles')
                .delete()
                .eq('email', email);
            if (error) throw error;
            fetchAdmins();
        } catch (error) {
            alert('Gagal menghapus: ' + error.message);
        }
    };

    // Calculate Totals
    const totalDonation = donations.reduce((sum, item) => sum + item.amount, 0);
    const verifiedDonation = donations.filter(d => d.status === 'verified').reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* MOBILE SIDEBAR OVERLAY */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-[#022c22] text-amber-50 shadow-2xl z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-amber-500/20 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">Admin Panel</h2>
                        <p className="text-xs text-amber-200/50 mt-1">Masjid Roudlotul Jannah</p>
                    </div>
                    {/* Close Button Mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-amber-200 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <button onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-[#d0a237] text-[#022c22] font-bold shadow-lg' : 'hover:bg-white/5 text-amber-100/70'}`}><LayoutDashboard size={20} /> Dashboard</button>
                    <button onClick={() => { setActiveTab('content'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'content' ? 'bg-[#d0a237] text-[#022c22] font-bold shadow-lg' : 'hover:bg-white/5 text-amber-100/70'}`}><FileText size={20} /> Manajemen Artikel</button>
                    <button onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'gallery' ? 'bg-[#d0a237] text-[#022c22] font-bold shadow-lg' : 'hover:bg-white/5 text-amber-100/70'}`}><ImageIcon size={20} /> Galeri Foto</button>
                    <button onClick={() => { setActiveTab('donations'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'donations' ? 'bg-[#d0a237] text-[#022c22] font-bold shadow-lg' : 'hover:bg-white/5 text-amber-100/70'}`}><Wallet size={20} /> Data Donasi</button>

                    {isSuperAdmin && (
                        <button onClick={() => { setActiveTab('admins'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'admins' ? 'bg-[#d0a237] text-[#022c22] font-bold shadow-lg' : 'hover:bg-white/5 text-amber-100/70'}`}>
                            <Shield size={20} /> Manajemen Admin
                        </button>
                    )}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-amber-500/20">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-900/20 rounded-xl transition"><LogOut size={20} /> Keluar</button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen w-full">
                {/* HEADER */}
                <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 bg-white rounded-lg text-[#022c22] shadow-sm border border-slate-200">
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#022c22] capitalize">{activeTab} Overview</h1>
                            <p className="text-slate-500 text-sm hidden md:block">Selamat datang kembali, Administrator.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <a href="/" target="_blank" className="text-[#064e3b] hover:text-[#d0a237] transition flex items-center gap-1 font-bold text-sm bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 md:bg-transparent md:shadow-none md:border-none justify-center md:justify-start">
                            <ExternalLink size={16} /> <span className="md:inline">Lihat Website</span>
                        </a>
                        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-sm font-bold text-slate-600">Sistem Online</span>
                        </div>
                    </div>
                </header>

                {/* --- TAB DASHBOARD --- */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4"><div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Wallet size={24} /></div><span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">+12%</span></div>
                                <p className="text-slate-500 text-sm mb-1">Total Donasi Masuk</p>
                                <h3 className="text-2xl font-bold text-[#022c22]">{formatRupiah(totalDonation)}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4"><div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={24} /></div></div>
                                <p className="text-slate-500 text-sm mb-1">Donasi Terverifikasi</p>
                                <h3 className="text-2xl font-bold text-[#022c22]">{formatRupiah(verifiedDonation)}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText size={24} /></div></div>
                                <p className="text-slate-500 text-sm mb-1">Total Artikel</p>
                                <h3 className="text-2xl font-bold text-[#022c22]">{articles.length}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4"><div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users size={24} /></div></div>
                                <p className="text-slate-500 text-sm mb-1">Total Donatur</p>
                                <h3 className="text-2xl font-bold text-[#022c22]">{donations.length}</h3>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full overflow-hidden">
                                <h3 className="font-bold text-[#022c22] mb-6">Analitik Donasi</h3>
                                <div className="h-64 md:h-80 w-full" style={{ minHeight: '300px' }}><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" interval={0} fontSize={12} tick={{ dy: 5 }} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#d0a237" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
                            </div>
                            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full overflow-hidden">
                                <h3 className="font-bold text-[#022c22] mb-6">Sebaran Tipe</h3>
                                <div className="h-64 md:h-80 w-full" style={{ minHeight: '300px' }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB ARTIKEL --- */}
                {activeTab === 'content' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <h2 className="text-xl font-bold text-[#022c22]">Manajemen Artikel</h2>
                            <button onClick={resetForm} className="bg-[#022c22] text-amber-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#064e3b] w-full md:w-auto justify-center"><Plus size={18} /> Buat Baru</button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Editor */}
                            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 order-2 lg:order-1">
                                <h3 className="font-bold mb-6 text-lg border-b pb-2">{isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]" placeholder="Judul yang menarik..." required /></div>
                                        <div><label className="block text-sm font-bold text-slate-700 mb-2">Penulis (Author)</label><input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]" placeholder="Nama Penulis" /></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-slate-700 mb-2">Slug URL (Auto)</label><input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237] bg-slate-50 font-mono text-sm" placeholder="judul-artikel" /></div>
                                        <div><label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none"><option>Kajian</option><option>Berita</option><option>Kegiatan</option><option>Opini</option></select></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-slate-700 mb-2">Tags (Pisahkan koma)</label><input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]" placeholder="islam, zakat, ramadhan..." /></div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Sampul</label>
                                        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-slate-50 transition text-center cursor-pointer">
                                            <input type="file" onChange={(e) => { setImageFile(e.target.files[0]); setPreviewImage(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            {previewImage ? (
                                                <div className="relative h-40 rounded-lg overflow-hidden w-full"><img src={previewImage} alt="Preview" className="w-full h-full object-cover" /></div>
                                            ) : (
                                                <div className="py-8 text-slate-500"><Camera size={24} className="mx-auto mb-2" /><span>Upload Gambar Sampul</span></div>
                                            )}
                                        </div>
                                    </div>

                                    <div><label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan (Excerpt)</label><textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]" placeholder="Deskripsi singkat untuk preview..." required></textarea></div>

                                    <div><label className="block text-sm font-bold text-slate-700 mb-2">Konten Lengkap</label><div className="bg-white"><ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} className="h-80 mb-12" /></div></div>

                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-100">
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <button type="button" onClick={() => handleArticleSubmit(null, 'draft')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-bold border flex items-center justify-center gap-2 transition ${status === 'draft' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}><Save size={16} /> Simpan Draft</button>

                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            {isEditing && <button type="button" onClick={resetForm} className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Batal</button>}
                                            <button type="button" onClick={(e) => handleArticleSubmit(e, 'published')} disabled={loading} className="flex-1 md:flex-none px-6 py-3 bg-[#d0a237] text-[#022c22] rounded-xl font-bold hover:bg-[#b48624] transition shadow-lg flex items-center justify-center gap-2">
                                                {loading ? 'Menyimpan...' : <><ExternalLink size={18} /> {isEditing ? 'Update & Publish' : 'Terbitkan'}</>}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* List Artikel */}
                            <div className="lg:col-span-1 space-y-4 h-auto lg:h-[1000px] overflow-y-auto pr-2 order-1 lg:order-2">
                                <h3 className="font-bold text-slate-700 mb-2">Daftar Artikel</h3>
                                {articles.map((article) => (
                                    <div key={article.id} className={`bg-white p-4 rounded-xl shadow-sm border transition group relative ${selectedArticle?.id === article.id ? 'border-[#d0a237] ring-1 ring-[#d0a237]' : 'border-slate-100 hover:shadow-md'}`}>
                                        {/* Status Badge */}
                                        <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${article.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                                            {article.status || 'Draft'}
                                        </div>

                                        <div className="h-32 rounded-lg bg-slate-100 mb-3 overflow-hidden relative"><img src={article.image} alt={article.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2"><button onClick={() => handleEditArticle(article)} className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50"><Edit size={16} /></button><button onClick={() => handleDeleteArticle(article.id)} className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={16} /></button></div></div>
                                        <span className="text-xs font-bold text-[#d0a237] uppercase tracking-wider">{article.category}</span>
                                        <h4 className="font-bold text-[#022c22] leading-tight mt-1 mb-2 line-clamp-2">{article.title}</h4>
                                        <p className="text-xs text-slate-400">{new Date(article.date).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB GALLERY --- */}
                {activeTab === 'gallery' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#022c22]">Manajemen Galeri</h2>
                                <p className="text-sm text-slate-500">Upload foto kegiatan masjid (Otomatis dikompres ke WebP).</p>
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleGalleryUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                                <button disabled={uploading} className="bg-[#d0a237] text-[#022c22] px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b48624] shadow-lg transition disabled:opacity-50">
                                    {uploading ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                                    {uploading ? 'Mengupload...' : 'Upload Foto'}
                                </button>
                            </div>
                        </div>

                        {galleryLoading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#d0a237]" size={32} /></div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {galleryImages.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                        <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
                                        <p>Belum ada foto di galeri.</p>
                                    </div>
                                )}
                                {galleryImages.map((img) => (
                                    <div key={img.id} className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                                        <img src={img.image_url} alt="Gallery" className="w-full h-full object-cover" />

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                            <a href={img.image_url} target="_blank" rel="noreferrer" className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50" title="Lihat"><Eye size={16} /></a>
                                            <button onClick={() => startEditCaption(img)} className="p-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50" title="Edit Caption"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteGallery(img.id, img.image_url)} className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50" title="Hapus"><Trash2 size={16} /></button>
                                        </div>

                                        {/* Caption Area */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-2">
                                            {editingImageId === img.id ? (
                                                <div className="flex gap-1">
                                                    <input
                                                        type="text"
                                                        value={editCaption}
                                                        onChange={(e) => setEditCaption(e.target.value)}
                                                        className="w-full bg-white/90 text-xs px-2 py-1 rounded outline-none text-black"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => handleSaveCaption(img.id)} className="bg-[#d0a237] text-white p-1 rounded hover:bg-[#b48624]"><Save size={12} /></button>
                                                </div>
                                            ) : (
                                                <p className="text-white text-xs truncate max-w-full px-1">{img.caption}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB DONASI --- */}
                {activeTab === 'donations' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="font-bold text-lg text-[#022c22]">Riwayat Donasi Masuk</h3>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <span className="text-xs text-slate-500 font-bold">Dari:</span>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-sm outline-none text-slate-700" />
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <span className="text-xs text-slate-500 font-bold">Sampai:</span>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-sm outline-none text-slate-700" />
                                </div>
                                <button onClick={handleDownloadCSV} className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#022c22] transition shadow-md md:ml-2">
                                    <Download size={16} /> Export CSV
                                </button>
                                <button onClick={fetchDonations} className="text-sm text-[#d0a237] font-bold hover:underline ml-2">Refresh</button>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#f8fafc] text-slate-500 text-xs uppercase tracking-wider"><tr><th className="p-4 font-bold">Tanggal</th><th className="p-4 font-bold">Donatur</th><th className="p-4 font-bold">Tipe</th><th className="p-4 font-bold">Nominal</th><th className="p-4 font-bold">Bukti</th><th className="p-4 font-bold text-center">Aksi</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                                {donations.map((don) => (
                                    <tr key={don.id} className="hover:bg-slate-50">
                                        <td className="p-4 text-sm text-slate-500">{new Date(don.created_at).toLocaleDateString()}</td>
                                        <td className="p-4"><div className="font-bold text-[#022c22]">{don.name}</div><div className="text-xs text-slate-400">{don.email} | {don.phone}</div></td>
                                        <td className="p-4 text-sm text-slate-600">{don.type} ({don.method})</td>
                                        <td className="p-4 font-mono font-bold text-[#022c22]">{formatRupiah(don.amount)}</td>
                                        <td className="p-4"><a href={don.proof_url} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline flex items-center gap-1"><Camera size={12} /> Lihat Bukti</a></td>
                                        <td className="p-4 text-center">
                                            {don.status === 'pending' ? (
                                                <div className="flex justify-center gap-2"><button onClick={() => verifyDonation(don.id, 'verified')} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-200">Terima</button><button onClick={() => verifyDonation(don.id, 'rejected')} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200">Tolak</button></div>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${don.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{don.status === 'verified' ? 'Diterima' : 'Ditolak'}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TAB ADMINS (SUPERADMIN ONLY) --- */}
                {activeTab === 'admins' && isSuperAdmin && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#022c22]">Manajemen Admin</h2>
                                <p className="text-sm text-slate-500">Kelola siapa saja yang bisa mengakses dashboard.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
                                <h3 className="font-bold mb-4 text-[#022c22] flex items-center gap-2"><UserPlus size={18} /> Tambah Admin Baru</h3>
                                <form onSubmit={handleAddAdmin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Admin Baru</label>
                                        <input
                                            type="email"
                                            value={newAdminEmail}
                                            onChange={(e) => setNewAdminEmail(e.target.value)}
                                            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]"
                                            placeholder="email@contoh.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Password Awal</label>
                                        <input
                                            type="text"
                                            value={newAdminPassword}
                                            onChange={(e) => setNewAdminPassword(e.target.value)}
                                            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#d0a237]"
                                            placeholder="Minimal 6 karakter"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-800">
                                        <ShieldAlert size={16} className="mb-2" />
                                        <p>Admin yang ditambahkan akan memiliki role <strong>'admin'</strong>. Mereka hanya bisa mengelola Konten & Donasi, tidak bisa menambah admin lain.</p>
                                    </div>
                                    <button type="submit" disabled={adminLoading} className="w-full bg-[#022c22] text-amber-50 py-3 rounded-xl font-bold hover:bg-[#064e3b] transition">
                                        {adminLoading ? 'Memproses...' : 'Tambah Akses'}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden lg:col-span-2">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="font-bold text-[#022c22]">Daftar Pengguna Admin</h3>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-[#f8fafc] text-slate-500 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="p-4 font-bold">Email</th>
                                            <th className="p-4 font-bold">Role</th>
                                            <th className="p-4 font-bold">Terdaftar</th>
                                            <th className="p-4 font-bold text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {adminList.map((admin) => (
                                            <tr key={admin.email} className="hover:bg-slate-50">
                                                <td className="p-4 font-bold text-[#022c22]">{admin.email}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${admin.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {admin.role}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-slate-500">{new Date(admin.created_at).toLocaleDateString()}</td>
                                                <td className="p-4 text-center">
                                                    {admin.role !== 'superadmin' && (
                                                        <button
                                                            onClick={() => handleDeleteAdmin(admin.email)}
                                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                                            title="Hapus Akses"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
