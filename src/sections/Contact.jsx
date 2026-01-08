import { motion } from 'framer-motion';
import { content } from '../content/content';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';

const Contact = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="bg-[var(--color-primary)]" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    style={{ marginBottom: '40px' }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white" style={{ marginBottom: '20px' }}>
                        {t.contact.title}
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-white">
                        {t.contact.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Phone */}
                    <motion.a
                        href={`tel:${content.contact.phone}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-colors"
                    >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white">{t.contact.phone}</h3>
                        <p className="text-white">{content.contact.phone}</p>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`mailto:${content.contact.email}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-colors"
                    >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white">{t.contact.email}</h3>
                        <p className="text-white">{content.contact.email}</p>
                    </motion.a>

                    {/* Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white"
                    >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-white">{t.contact.address}</h3>
                        <p className="text-white">{content.contact.address}</p>
                    </motion.div>
                </div>


            </div>
        </section>
    );
};

export default Contact;
