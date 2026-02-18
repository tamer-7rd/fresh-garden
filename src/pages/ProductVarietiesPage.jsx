import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';
import { getProductBySlug, productsData } from '../data/productsData';
import SEO from '../components/SEO';

const ProductVarietiesPage = () => {
    const { productSlug } = useParams();
    const { language } = useLanguage();
    const t = translations[language];
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const product = getProductBySlug(productSlug);

    // Product not found
    if (!product) {
        return (
            <main className="varieties-page">
                <div className="container">
                    <div className="varieties-not-found">
                        <h1>{t.varietiesPage.notFound}</h1>
                        <Link to="/mehsullarimiz" className="varieties-back-btn">
                            {t.varietiesPage.backButton}
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Get translated product name
    const slugOrder = ['alma', 'nektarin', 'yasti-shaftali', 'gilas'];
    const productIndex = slugOrder.indexOf(product.slug);
    const translatedName = t.products.items[productIndex]?.name || product.title;

    // Filter varieties based on search
    const filteredVarieties = product.varieties.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <>
            <SEO page="products" />
            <main className="varieties-page">
                {/* Header section — uses pageImage for full-width hero */}
                <section
                    className="varieties-header"
                    style={{
                        backgroundImage: `url(${product.pageImage || product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="varieties-header-overlay"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="varieties-header-content"
                    >
                        <h1 className="varieties-title">{translatedName}</h1>
                        <p className="varieties-subtitle">{t.varietiesPage.subtitle}</p>
                    </motion.div>
                </section>

                {/* Content */}
                <section className="section-padding">
                    <div className="container">
                        {/* Top bar: search + product chips */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="varieties-toolbar"
                        >
                            <div className="varieties-search-wrapper">
                                <svg className="varieties-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <input
                                    type="text"
                                    className="varieties-search"
                                    placeholder={t.varietiesPage.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {/* Product selector chips */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="varieties-product-chips"
                            >
                                {productsData.map((p, idx) => {
                                    const chipName = t.products.items[idx]?.name || p.title;
                                    const isActive = p.slug === product.slug;
                                    return (
                                        <button
                                            key={p.slug}
                                            className={`varieties-product-chip${isActive ? ' active' : ''}`}
                                            onClick={() => {
                                                if (!isActive) {
                                                    setSearchQuery('');
                                                    navigate(`/mehsullarimiz/${p.slug}`);
                                                }
                                            }}
                                        >
                                            {chipName}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        {/* Variety cards grid */}
                        {filteredVarieties.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="varieties-no-results"
                            >
                                <p>{t.varietiesPage.noResults}</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="varieties-grid"
                            >
                                {filteredVarieties.map((variety, index) => (
                                    <motion.div
                                        key={variety.name}
                                        variants={cardVariants}
                                        className="variety-card"
                                    >
                                        <div className="variety-card-image-wrapper">
                                            {variety.imageSrc ? (
                                                <img
                                                    src={variety.imageSrc}
                                                    alt={variety.name}
                                                    className="variety-card-image"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="variety-card-fallback">
                                                    <span>🍎</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="variety-card-info">
                                            <h3 className="variety-card-name">{variety.name}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Mobile back button at bottom */}
                        <div className="varieties-back-btn-wrapper">
                            <Link to="/mehsullarimiz" className="varieties-back-btn-mobile">
                                {t.varietiesPage.backButton}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ProductVarietiesPage;
