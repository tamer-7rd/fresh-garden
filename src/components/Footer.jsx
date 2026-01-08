import { Link } from 'react-router-dom';
import { content } from '../content/content';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';
import logoImage from '../assets/images/logo.png';

const Footer = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer className="bg-[#1a1a1a] text-white" style={{ paddingTop: '40px', paddingBottom: '30px' }}>
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between text-center md:text-left gap-10 md:gap-4" style={{ marginBottom: '30px' }}>
                    {/* Company Info */}
                    <div className="flex-1 flex flex-col items-center md:items-start" style={{ marginTop: '-10px' }}>
                        <div className="flex items-center justify-center md:justify-start" style={{ marginBottom: '15px' }}>
                            <Link to="/" className="header-logo-container" style={{ marginLeft: '-15px' }}>
                                <img
                                    src={logoImage}
                                    alt={content.company.name}
                                    style={{ height: '80px' }}
                                />
                            </Link>
                            <div className="header-brand-title" style={{ fontSize: '24px', marginLeft: '1px' }}>
                                Fresh Garden <br className="mobile-only-br" /> Quba
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex-1 flex flex-col items-center">
                        <h4 className="font-bold text-lg" style={{ marginBottom: '15px' }}>{t.footer.sections}</h4>
                        <nav className="flex flex-col gap-3 text-gray-400 items-center" aria-label={t.header.footerNav}>
                            {t.navigation.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1 flex flex-col items-center md:items-end">
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="font-bold text-lg" style={{ marginBottom: '15px' }}>{t.footer.contact}</h4>
                            <div className="flex flex-col gap-3 text-gray-400">
                                <a
                                    href={`tel:${content.contact.phone}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors justify-center md:justify-start"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {content.contact.phone}
                                </a>
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors justify-center md:justify-start"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {content.contact.email}
                                </a>
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {content.contact.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-3" style={{ paddingTop: '20px' }}>
                    <span className="text-center md:text-left">
                        © {new Date().getFullYear()} {content.company.name}. {t.footer.copyright}
                    </span>
                    <span className="text-gray-400 text-xs md:text-sm">
                        Made by <span className="text-[var(--color-primary)] font-semibold">T&T Lab</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
