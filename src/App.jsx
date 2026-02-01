import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { isAdminDomain } from './config';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DonationPage from './pages/DonationPage';
import TransparencyPage from './pages/TransparencyPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const GlobalBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FFFCF5]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23064E3B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#022c22] to-transparent opacity-10"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-amber-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px]"></div>
    </div>
);

function App() {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [articles, setArticles] = useState([]);

    const [isAdminAccess, setIsAdminAccess] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsAdminAccess(isAdminDomain());
    }, []);

    // --- FETCH DATA ---
    const fetchDonations = async () => {
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setDonations(data);
    };

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('date', { ascending: false });
        if (!error) setArticles(data);
    };

    // --- AUTH CHECK ---
    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        fetchDonations();
        fetchArticles();

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // --- SUBSCRIPTIONS ---
    useEffect(() => {
        const donationsSub = supabase
            .channel('donations_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, fetchDonations)
            .subscribe();

        const articlesSub = supabase
            .channel('articles_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, fetchArticles)
            .subscribe();

        return () => {
            supabase.removeChannel(donationsSub);
            supabase.removeChannel(articlesSub);
        };
    }, []);

    // --- HANDLERS ---
    const handleLogin = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Login Gagal: ' + error.message);
            return false;
        }
        return true;
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleNewDonation = async (newDonation) => {
        const { error } = await supabase.from('donations').insert([newDonation]);
        if (error) throw error;
        // fetchDonations triggered by realtime subscription
    };

    // Hide Navbar/Footer on Admin Routes
    const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

    return (
        <div className="font-sans text-slate-800 relative">
            <GlobalBackground />

            {/* Navbar */}
            {!location.pathname.startsWith('/admin') && location.pathname !== '/login' && <Navbar user={user} showAdminLink={isAdminAccess} />}

            <Routes>
                <Route path="/" element={<HomePage articles={articles} donations={donations} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/donate" element={<DonationPage onDonate={handleNewDonation} />} />
                <Route path="/transparency" element={<TransparencyPage donations={donations} />} />
                <Route path="/articles" element={<ArticlesPage articles={articles} />} />
                <Route path="/articles/:id" element={<ArticleDetailPage articles={articles} />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Admin Routes - Only accessible if isAdminAccess is true */}
                {isAdminAccess ? (
                    <>
                        <Route path="/login" element={!user ? <AdminLogin onLogin={handleLogin} /> : <Navigate to="/admin" />} />
                        <Route path="/admin" element={
                            user ? (
                                <AdminDashboard
                                    user={user}
                                    articles={articles}
                                    donations={donations}
                                    fetchArticles={fetchArticles}
                                    fetchDonations={fetchDonations}
                                    onLogout={handleLogout}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        } />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/admin" element={<Navigate to="/" replace />} />
                    </>
                )}

                {/* Fallback 404 - Redirect to Home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;