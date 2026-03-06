import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export const useDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loadingDonations, setLoadingDonations] = useState(true);

    const fetchDonations = useCallback(async () => {
        setLoadingDonations(true);
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setDonations(data || []);
        setLoadingDonations(false);
    }, []);

    useEffect(() => {
        fetchDonations();

        const donationsSub = supabase
            .channel('donations_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, fetchDonations)
            .subscribe();

        const handleFocus = () => fetchDonations();
        window.addEventListener('focus', handleFocus);

        return () => {
            supabase.removeChannel(donationsSub);
            window.removeEventListener('focus', handleFocus);
        };
    }, [fetchDonations]);

    const handleNewDonation = async (newDonation) => {
        const { error } = await supabase.from('donations').insert([newDonation]);
        if (error) throw error;
        // Manual fetch backup if Realtime is slow/disabled
        fetchDonations();
    };

    return { donations, setDonations, loadingDonations, fetchDonations, handleNewDonation };
};
