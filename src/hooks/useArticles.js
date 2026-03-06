import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export const useArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(true);

    const fetchArticles = useCallback(async () => {
        setLoadingArticles(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('date', { ascending: false });
        if (!error) setArticles(data || []);
        setLoadingArticles(false);
    }, []);

    useEffect(() => {
        fetchArticles();

        const articlesSub = supabase
            .channel('articles_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, fetchArticles)
            .subscribe();

        const handleFocus = () => fetchArticles();
        window.addEventListener('focus', handleFocus);

        return () => {
            supabase.removeChannel(articlesSub);
            window.removeEventListener('focus', handleFocus);
        };
    }, [fetchArticles]);

    return { articles, setArticles, loadingArticles, fetchArticles };
};
