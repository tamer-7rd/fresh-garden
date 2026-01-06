import { motion } from 'framer-motion';
import { content } from '../content/content';
import SEO from '../components/SEO';

const AboutPage = () => {
    return (
        <>
            <SEO page="about" />
            <main>
                {/* Page Header */}
                <section
                    className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${content.aboutPage.headerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
                    >
                        {content.aboutPage.title}
                    </motion.h1>
                </section>

                {/* Main Content */}
                <section className="section-padding">
                    <div className="container max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="prose prose-lg max-w-none"
                        >
                            <div className="text-[var(--color-text-light)] leading-relaxed text-lg whitespace-pre-line">
                                {content.aboutPage.content}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Video Section - Only show if video exists */}
                {content.aboutPage.videoUrl && (
                    <section className="pt-[35px] md:pt-[50px] pb-[70px] md:pb-[100px] bg-alt">
                        <div className="container max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-12"
                                style={{ marginBottom: '3rem' }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
                                    Məhsul yığımı
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-2xl overflow-hidden shadow-xl"
                                style={{ marginBottom: '3rem' }}
                            >
                                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                                    <iframe
                                        src={content.aboutPage.videoUrl}
                                        title="Məhsul yığımı"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full"
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};

export default AboutPage;
