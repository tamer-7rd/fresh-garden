import { motion } from 'framer-motion';
import { content } from '../content/content';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';

const ProductsPage = () => {
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
        <>
            <SEO page="products" />
            <main>
                {/* Page Header */}
                <section
                    className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${content.products.headerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-center px-4"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                            {content.products.title}
                        </h1>
                    </motion.div>
                </section>

                {/* Products Grid */}
                <section className="section-padding">
                    <div className="container">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {content.products.items.map((product, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className="group h-full"
                                >
                                    <div className="product-card h-full flex flex-col">
                                        <div className="relative overflow-hidden shrink-0">
                                            <OptimizedImage
                                                src={product.image}
                                                alt={product.name}
                                                aspectRatio="4/3"
                                                className="group-hover:scale-110 transition-transform duration-700"
                                                objectFit="cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                                <span className="text-white font-semibold text-lg tracking-wide">Daha ətraflı</span>
                                            </div>
                                        </div>
                                        <div className="product-card-content flex-grow flex flex-col p-6 text-center">
                                            <h3 className="product-card-title text-2xl font-bold mb-3">{product.name}</h3>
                                            <p className="product-card-desc text-base mb-4 leading-relaxed line-clamp-4">
                                                {product.description}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                <span className="text-[var(--color-primary)] font-bold">Mövcuddur</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Additional Info */}
                <section className="section-padding bg-alt">
                    <div className="container max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-3xl shadow-lg"
                            style={{ padding: '40px' }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]" style={{ marginBottom: '25px' }}>
                                Keyfiyyətli Meyvələr
                            </h2>
                            <p className="text-[var(--color-text-light)] text-lg md:text-xl leading-relaxed font-medium">
                                Fresh Garden alma, nektarin, şaftalı, gilas və digər mövsümi meyvələrin becərilməsi,
                                eləcə də topdan və pərakəndə satışının təşkili ilə məşğuldur. Hər bir məhsulumuz <span className="text-[var(--color-primary)] font-bold">təbii üsullarla</span> yetişdirilir, xüsusi qayğı ilə seçilir və müasir texnologiyalarla qablaşdırılır.
                            </p>
                            <div className="flex justify-center gap-8" style={{ marginTop: '40px' }}>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center" style={{ marginBottom: '10px' }}>
                                        <span className="text-3xl">🌱</span>
                                    </div>
                                    <span className="font-bold text-sm">100% Təbii</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center" style={{ marginBottom: '10px' }}>
                                        <span className="text-3xl">🚛</span>
                                    </div>
                                    <span className="font-bold text-sm">Sürətli Çatdırılma</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center" style={{ marginBottom: '10px' }}>
                                        <span className="text-3xl">⭐️</span>
                                    </div>
                                    <span className="font-bold text-sm">Yüksək Keyfiyyət</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ProductsPage;

