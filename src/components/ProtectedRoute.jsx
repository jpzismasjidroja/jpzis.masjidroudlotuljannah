import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useGlobalContext } from '../context/GlobalContext';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute — Verifikasi role admin sebelum render dashboard.
 * Mencegah user non-admin yang sudah login (punya session) mengakses admin panel.
 */
const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
    const { user } = useGlobalContext();
    const [isAuthorized, setIsAuthorized] = useState(null); // null = loading

    useEffect(() => {
        const verifyRole = async () => {
            if (!user?.email) {
                setIsAuthorized(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('admin_roles')
                    .select('role')
                    .eq('email', user.email)
                    .single();

                if (error || !data) {
                    setIsAuthorized(false);
                    return;
                }

                if (requiredRole === 'superadmin') {
                    setIsAuthorized(data.role === 'superadmin');
                } else {
                    // role 'admin' atau 'superadmin' keduanya boleh akses
                    setIsAuthorized(true);
                }
            } catch {
                setIsAuthorized(false);
            }
        };

        verifyRole();
    }, [user, requiredRole]);

    // Loading state
    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064e3b] mx-auto mb-4" />
                    <p className="text-slate-500 font-serif">Memverifikasi akses...</p>
                </div>
            </div>
        );
    }

    // Not authorized — redirect to home
    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string,
};

export default ProtectedRoute;
