import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content/content';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

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
    }, [location]);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-[var(--color-primary)] text-white py-2.5 text-sm hidden lg:block">
                <div className="container flex justify-end items-center gap-10">
                    <a href={`tel:${content.company.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {content.company.phone}
                    </a>
                    <a href={`mailto:${content.company.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
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
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-white/98 backdrop-blur-sm'
                    }`}
                style={{
                    minHeight: isScrolled ? '80px' : '100px'
                }}
            >
                <div className="container h-full flex items-center py-4 lg:py-5">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 shrink-0">
                        <div className="w-11 h-11 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-xl">🌱</span>
                        </div>
                        <div>
                            <h1 className="font-extrabold text-xl lg:text-2xl text-[var(--color-primary)] tracking-tight">
                                {content.company.name}
                            </h1>
                            <span className="text-xs font-semibold text-[var(--color-text-light)] tracking-wide uppercase">
                                {content.company.tagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - centered with flex-1 */}
                    <nav className="hidden lg:flex items-center justify-center flex-1 gap-12">
                        {content.navigation.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section: Search + Contact Button */}
                    <div className="hidden lg:flex items-center gap-6 shrink-0 ml-auto lg:ml-0">
                        {/* Search Button */}
                        <button
                            className="search-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Axtarış"
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
                    <div className="flex lg:hidden items-center gap-2">
                        <button
                            className="search-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Axtarış"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menyu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4"
                        >
                            <div className="container">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Məhsul axtar..."
                                        className="w-full px-5 py-3 pr-12 text-base font-medium border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                        autoFocus
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
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
                            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
                        >
                            <div className="container py-6 flex flex-col gap-4">
                                {content.navigation.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`text-lg font-semibold py-3 px-4 rounded-lg transition-colors ${location.pathname === item.path
                                            ? 'text-[var(--color-primary)] bg-green-50'
                                            : 'text-[var(--color-text)] hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <a
                                    href={`tel:${content.company.phone}`}
                                    className="flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white px-6 py-4 rounded-xl font-bold text-lg mt-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
