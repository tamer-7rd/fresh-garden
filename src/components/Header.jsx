import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content/content';
import { useLanguage, languages } from '../context/LanguageContext';
import { translations } from '../content/translations';
import { productsData } from '../data/productsData';
import logoImage from '../assets/images/logo.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
    const location = useLocation();
    const navigate = useNavigate();
    const { language, changeLanguage } = useLanguage();
    const langDropdownRef = useRef(null);
    const servicesDropdownRef = useRef(null);
    const searchRef = useRef(null);

    // Get translations for current language
    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsLangDropdownOpen(false);
        setIsServicesDropdownOpen(false);
        setIsMobileServicesOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedResultIndex(-1);
    }, [location]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
                setIsServicesDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const results = [];

        // Search through products and their varieties
        productsData.forEach((product, productIndex) => {
            const productName = t.products.items[productIndex]?.name || product.title;
            const productNameLower = productName.toLowerCase();
            
            // Check if product name matches
            if (productNameLower.includes(query)) {
                results.push({
                    type: 'product',
                    productIndex,
                    productSlug: product.slug,
                    productName,
                    image: product.image,
                    description: t.products.items[productIndex]?.description || ''
                });
            }

            // Search through varieties of this product
            product.varieties.forEach((variety) => {
                const varietyNameLower = variety.name.toLowerCase();
                if (varietyNameLower.includes(query)) {
                    results.push({
                        type: 'variety',
                        productIndex,
                        productSlug: product.slug,
                        productName,
                        varietyName: variety.name,
                        image: variety.imageSrc,
                        productImage: product.image
                    });
                }
            });
        });

        setSearchResults(results.slice(0, 8)); // Limit to 8 results
        setSelectedResultIndex(-1); // Reset selection when results change
    }, [searchQuery, language, t]);

    // Handle keyboard navigation in search
    const handleSearchKeyDown = (e) => {
        if (!searchResults.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedResultIndex(prev => 
                prev < searchResults.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedResultIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
            e.preventDefault();
            const result = searchResults[selectedResultIndex];
            navigate(`/mehsullarimiz/${result.productSlug}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        } else if (e.key === 'Escape') {
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleResultClick = (result) => {
        navigate(`/mehsullarimiz/${result.productSlug}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    // Desktop language dropdown button
    const LanguageDropdown = () => (
        <div className="language-dropdown-container" ref={langDropdownRef}>
            <button
                className="language-dropdown-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label="Select language"
            >
                <span className="lang-code">{languages[language].name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isLangDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="language-dropdown-menu"
                    >
                        {Object.values(languages).map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    changeLanguage(lang.code);
                                    setIsLangDropdownOpen(false);
                                }}
                                className={`language-dropdown-item ${language === lang.code ? 'active' : ''}`}
                            >
                                <span className="lang-name">{lang.fullName}</span>
                                <span className="lang-code-small">{lang.name}</span>
                                {language === lang.code && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // Mobile language switcher (keep as is)
    const LanguageSwitcher = ({ isMobile = false }) => (
        <div className={`language-switcher ${isMobile ? 'language-switcher-mobile' : ''}`}>
            {Object.values(languages).map((lang, index) => (
                <span key={lang.code} className="lang-item-wrapper">
                    <button
                        onClick={() => changeLanguage(lang.code)}
                        className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                        aria-label={`Switch to ${lang.fullName}`}
                    >
                        {lang.name}
                    </button>
                    {index < Object.values(languages).length - 1 && (
                        <span className="lang-separator">|</span>
                    )}
                </span>
            ))}
        </div>
    );

    return (
        <>
            {/* Top Bar */}
            <div className="header-top-bar">
                <div className="header-container header-top-content">
                    <a href={`tel:${content.company.phone}`} className="header-top-link">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {content.company.phone}
                    </a>
                    <a href={`mailto:${content.company.email}`} className="header-top-link">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {content.company.email}
                    </a>
                </div>
            </div>

            {/* Main Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`header-main ${isScrolled ? 'header-scrolled' : 'header-transparent'}`}
            >
                <div className="header-container header-inner">
                    {/* Left Section: Logo + Navigation */}
                    <div className="header-left-section">
                        {/* Logo */}
                        <Link to="/" className="header-logo-container">
                            <img
                                src={logoImage}
                                alt={content.company.name}
                                className="header-logo-img"
                            />
                        </Link>

                        <div className="header-brand-title">
                            Fresh Garden <br className="mobile-only-br" /> Quba
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="header-nav" aria-label={t.header.mainNav}>
                            {t.navigation.map((item) => (
                                item.hasDropdown ? (
                                    <div key={item.name} className="services-dropdown-container" ref={servicesDropdownRef}>
                                        <button
                                            className={`nav-link services-nav-btn ${isServicesDropdownOpen ? 'active' : ''}`}
                                            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                                        >
                                            {item.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`services-chevron ${isServicesDropdownOpen ? 'rotate' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <AnimatePresence>
                                            {isServicesDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="services-dropdown-menu"
                                                >
                                                    {t.services.dropdownItems.map((service) => (
                                                        <button
                                                            key={service.id}
                                                            className="services-dropdown-item"
                                                            onClick={() => {
                                                                alert(t.services.comingSoon);
                                                                setIsServicesDropdownOpen(false);
                                                            }}
                                                        >
                                                            {service.name}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </nav>
                    </div>

                    {/* Right Section: Language Switcher + Search + Contact Button */}
                    <div className="header-right-desktop">
                        {/* Language Dropdown */}
                        <LanguageDropdown />

                        {/* Search Button */}
                        <button
                            className="search-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label={t.buttons.search}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Phone Button - CasaAgro Style */}
                        <a
                            href={`tel:${content.company.phone}`}
                            className="header-contact-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {content.company.phone}
                        </a>
                    </div>

                    {/* Mobile: Search + Menu Button */}
                    <div className="header-mobile-controls">
                        <button
                            className="search-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label={t.buttons.search}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={t.buttons.menu}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Dropdown */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            ref={searchRef}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="search-dropdown"
                        >
                            <div className="header-container">
                                <div className="search-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder={t.buttons.searchPlaceholder}
                                        className="search-input"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                    />
                                    <button className="search-icon-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search Results */}
                                {searchQuery.trim() && (
                                    <div className="search-results">
                                        {searchResults.length > 0 ? (
                                            <>
                                                <div className="search-results-header">
                                                    {language === 'az' && `${searchResults.length} nəticə tapıldı`}
                                                    {language === 'ru' && `Найдено ${searchResults.length} результатов`}
                                                    {language === 'en' && `Found ${searchResults.length} results`}
                                                </div>
                                                <div className="search-results-list">
                                                    {searchResults.map((result, index) => (
                                                        <div
                                                            key={`${result.type}-${result.productIndex}-${result.varietyName || ''}-${index}`}
                                                            className={`search-result-item ${selectedResultIndex === index ? 'selected' : ''}`}
                                                            onClick={() => handleResultClick(result)}
                                                            onMouseEnter={() => setSelectedResultIndex(index)}
                                                        >
                                                            <div className="search-result-image">
                                                                <img 
                                                                    src={result.image || result.productImage} 
                                                                    alt={result.varietyName || result.productName}
                                                                    onError={(e) => {
                                                                        e.target.src = result.productImage;
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="search-result-content">
                                                                <div className="search-result-type">
                                                                    {result.type === 'product' ? (
                                                                        <span className="search-badge search-badge-product">
                                                                            {language === 'az' && 'Məhsul'}
                                                                            {language === 'ru' && 'Продукт'}
                                                                            {language === 'en' && 'Product'}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="search-badge search-badge-variety">
                                                                            {language === 'az' && 'Çeşid'}
                                                                            {language === 'ru' && 'Сорт'}
                                                                            {language === 'en' && 'Variety'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="search-result-title">
                                                                    {result.varietyName || result.productName}
                                                                </div>
                                                                {result.type === 'variety' && (
                                                                    <div className="search-result-subtitle">
                                                                        {result.productName}
                                                                    </div>
                                                                )}
                                                                {result.type === 'product' && result.description && (
                                                                    <div className="search-result-description">
                                                                        {result.description}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="search-result-arrow">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="search-no-results">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <p>
                                                    {language === 'az' && 'Heç bir nəticə tapılmadı'}
                                                    {language === 'ru' && 'Ничего не найдено'}
                                                    {language === 'en' && 'No results found'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mobile-menu-dropdown"
                        >
                            <div className="header-container mobile-nav-container">
                                {/* Language Switcher for Mobile */}
                                <div className="mobile-language-switcher">
                                    <LanguageSwitcher isMobile={true} />
                                </div>

                                {t.navigation.map((item) => (
                                    item.hasDropdown ? (
                                        <div key={item.name} className="mobile-services-container">
                                            <button
                                                className={`mobile-nav-link mobile-services-btn ${isMobileServicesOpen ? 'active' : ''}`}
                                                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                            >
                                                {item.name}
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`mobile-services-chevron ${isMobileServicesOpen ? 'rotate' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <AnimatePresence>
                                                {isMobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mobile-services-submenu"
                                                    >
                                                        {t.services.dropdownItems.map((service) => (
                                                            <button
                                                                key={service.id}
                                                                className="mobile-services-item"
                                                                onClick={() => {
                                                                    alert(t.services.comingSoon);
                                                                }}
                                                            >
                                                                {service.name}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                                <a
                                    href={`tel:${content.company.phone}`}
                                    className="mobile-contact-btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {content.company.phone}
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
};

export default Header;
