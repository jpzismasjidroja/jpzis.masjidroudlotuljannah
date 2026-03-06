import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoadingAuth(false);
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoadingAuth(false);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const handleLogin = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast.error('Login Gagal: ' + error.message);
            return false;
        }
        return true;
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return { user, loadingAuth, handleLogin, handleLogout };
};
