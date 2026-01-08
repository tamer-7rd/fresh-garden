import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';
import { content } from '../content/content';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';

const About = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section id="about" className="section-padding bg-alt">
            <div className="container">
                <SectionTitle
                    title={t.about.title}
                    center={false}
                    underline={false}
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" style={{ marginTop: '50px' }}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-[var(--color-text-light)] text-lg leading-relaxed whitespace-pre-line font-medium">
                            {t.about.text}
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Button to="/haqqimizda">
                                {t.about.buttonText}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <OptimizedImage
                                src={content.about.image}
                                alt="Fresh Garden"
                                className="transition-transform duration-700 group-hover:scale-105"
                                style={{ height: '400px' }}
                                objectFit="cover"
                            />
                            {/* Decorative frame */}
                            <div className="absolute inset-0 border-[6px] border-white/20 rounded-3xl z-10 pointer-events-none"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
