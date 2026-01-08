import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
    az: { code: 'az', name: 'AZ', fullName: 'Azərbaycan' },
    ru: { code: 'ru', name: 'RU', fullName: 'Русский' },
    en: { code: 'en', name: 'EN', fullName: 'English' }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get from localStorage or default to 'az'
        const saved = localStorage.getItem('language');
        return saved && languages[saved] ? saved : 'az';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Update html lang attribute
        document.documentElement.lang = language;
    }, [language]);

    const changeLanguage = (lang) => {
        if (languages[lang]) {
            setLanguage(lang);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, languages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
