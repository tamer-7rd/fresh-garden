import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import OptimizedImage from '../components/OptimizedImage';
import FruitModal from '../components/FruitModal';
import { content } from '../content/content';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';

const Products = () => {
    const { language } = useLanguage();
    const t = translations[language];

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState({ index: 0, name: '' });

    const openModal = (index, name, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFruit({ index, name });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="section-padding bg-alt">
            <div className="container">
                <SectionTitle
                    title={t.products.title}
                    subtitle={t.products.subtitle}
                    center={false}
                    underline={false}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {t.products.items.map((product, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group h-full"
                        >
                            <Link to="/mehsullarimiz" className="block h-full">
                                <div className="product-card h-full flex flex-col">
                                    <div className="relative overflow-hidden shrink-0">
                                        <OptimizedImage
                                            src={content.products.items[index]?.image}
                                            alt={product.name}
                                            aspectRatio="4/3"
                                            className="group-hover:scale-110 transition-transform duration-700"
                                            objectFit="cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute bottom-4 left-0 right-0 text-center text-white p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <button
                                                    onClick={(e) => openModal(index, product.name, e)}
                                                    className="inline-block px-4 py-1.5 border border-white/40 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold hover:bg-white/30 transition-colors cursor-pointer"
                                                >
                                                    {t.products.viewDetails}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card-content flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="product-card-title text-xl md:text-2xl mb-3">
                                                {product.name}
                                            </h3>
                                            <p className="product-card-desc mb-4 line-clamp-3">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="mt-2 w-12 h-1 bg-[var(--color-primary-light)] mx-auto rounded-full opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-300"></div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                    style={{ marginTop: '60px' }}
                >
                    <Link
                        to="/mehsullarimiz"
                        className="btn btn-secondary inline-flex"
                    >
                        {t.products.allProducts}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            {/* Fruit Modal */}
            <FruitModal
                isOpen={isModalOpen}
                onClose={closeModal}
                fruitIndex={selectedFruit.index}
                fruitName={selectedFruit.name}
            />
        </section>
    );
};

export default Products;
