import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDonations } from '../hooks/useDonations';
import { useArticles } from '../hooks/useArticles';
import { isAdminDomain } from '../config';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const auth = useAuth();
    const donationsData = useDonations();
    const articlesData = useArticles();

    const [isAdminAccess, setIsAdminAccess] = useState(false);

    useEffect(() => {
        setIsAdminAccess(isAdminDomain());
    }, []);

    const value = {
        ...auth,
        ...donationsData, // donations, setDonations, loadingDonations, fetchDonations, handleNewDonation
        ...articlesData,  // articles, setArticles, loadingArticles, fetchArticles
        isAdminAccess,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
