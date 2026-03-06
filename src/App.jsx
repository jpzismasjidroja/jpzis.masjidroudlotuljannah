import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext } from './context/GlobalContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedPage from './components/AnimatedPage';

// Lazy-loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DonationPage = lazy(() => import('./pages/DonationPage'));
const TransparencyPage = lazy(() => import('./pages/TransparencyPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Fallback Loader
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064e3b] mx-auto mb-4" />
            <p className="text-slate-500 font-serif">Memuat halaman...</p>
        </div>
    </div>
);

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
    const { user, isAdminAccess, loadingAuth } = useGlobalContext();
    const location = useLocation();

    // Hide Navbar/Footer on Admin Routes
    const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

    if (loadingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064e3b] mx-auto mb-4" />
                    <p className="text-slate-500 font-serif">Memuat modul aplikasi...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800 relative">
            <GlobalBackground />
            <Toaster position="top-center" reverseOrder={false} />

            {/* Navbar */}
            {!isAdminRoute && <Navbar user={user} showAdminLink={isAdminAccess} />}

            <main className="flex-grow flex flex-col">
                <Suspense fallback={<PageLoader />}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
                            <Route path="/profile" element={<AnimatedPage><ProfilePage /></AnimatedPage>} />
                            <Route path="/donate" element={<AnimatedPage><DonationPage /></AnimatedPage>} />
                            <Route path="/transparency" element={<AnimatedPage><TransparencyPage /></AnimatedPage>} />
                            <Route path="/articles" element={<AnimatedPage><ArticlesPage /></AnimatedPage>} />
                            <Route path="/articles/:id" element={<AnimatedPage><ArticleDetailPage /></AnimatedPage>} />
                            <Route path="/gallery" element={<AnimatedPage><GalleryPage /></AnimatedPage>} />
                            <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />

                            {/* Admin Routes - Only accessible if isAdminAccess is true */}
                            {isAdminAccess ? (
                                <>
                                    <Route path="/login" element={!user ? <AnimatedPage><AdminLogin /></AnimatedPage> : <Navigate to="/admin" />} />
                                    <Route path="/admin" element={
                                        user ? (
                                            <ProtectedRoute requiredRole="admin">
                                                <AnimatedPage><AdminDashboard /></AnimatedPage>
                                            </ProtectedRoute>
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

                            {/* Fallback 404 - Show NotFoundPage */}
                            <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;